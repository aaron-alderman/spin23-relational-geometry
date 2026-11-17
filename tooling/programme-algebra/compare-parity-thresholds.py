"""Certify observed-departure count thresholds from nested samples."""

import argparse
from bisect import bisect_right
import csv
import hashlib
import io
import json
import math
from itertools import zip_longest
from pathlib import Path
from zipfile import ZipFile


ROOT = Path(__file__).resolve().parents[2]
LANE = ROOT / "corpus/programmes/programme-algebra/learning"


def record(name, expected=None):
    path = LANE / name
    raw = path.read_bytes()
    sha = hashlib.sha256(raw).hexdigest()
    if expected is not None and sha != expected:
        raise ValueError(f"Source changed: {name}")
    return json.loads(raw), {"path": path.relative_to(ROOT).as_posix(), "sha256": sha}


def read_trace(archive_path, trace):
    with ZipFile(archive_path) as archive:
        member = archive.read(trace["member"])
    digest = hashlib.sha256(member).hexdigest()
    if digest != trace["sha256"]:
        raise ValueError("Unexpected trace")
    rows = list(csv.DictReader(io.StringIO(member.decode("utf-8"))))
    times = [float(row[trace["timeColumn"]]) for row in rows]
    labels = [float(row[trace["stateColumn"]]) for row in rows]
    if len(times) < 2 or not all(
        math.isclose(b - a, trace["samplePeriodSeconds"], abs_tol=1e-9)
        for a, b in zip(times, times[1:])
    ):
        raise ValueError("Trace does not match the declared sample grid")
    levels = sorted(set(labels))
    if len(levels) != 2 or not all(map(math.isfinite, levels)):
        raise ValueError("Expected exactly two finite resolved labels")
    return labels, levels, digest


def nested_grids(steps, schedule):
    if type(steps) is not int or steps < 1:
        raise ValueError("Require a positive integer window length")
    strides = [steps if value == "endpoint" else value for value in schedule]
    if not strides or strides[-1] != 1 or any(
        type(stride) is not int or stride < 1 or steps % stride for stride in strides
    ) or any(old <= new or old % new for old, new in zip(strides, strides[1:])):
        raise ValueError("Require successively finer nested grids ending at stride 1")
    previous = set()
    grids = []
    for stride in strides:
        offsets = list(range(stride, steps + 1, stride))
        grids.append((stride, [offset for offset in offsets if offset not in previous]))
        previous.update(offsets)
    return grids


class DepartureEvidence:
    """Accumulate only facts witnessed on this exact sequence of windows."""

    def __init__(self, labels, starts, steps, initial, schedule, *, samples=None, index_first=False):
        labels = tuple(labels)
        starts = tuple(starts)
        grids = nested_grids(steps, schedule)
        if len(starts) != len(set(starts)) or any(
            type(start) is not int or start < 0 or start + steps >= len(labels) or labels[start] != initial
            for start in starts
        ):
            raise ValueError("Require distinct, complete windows with the declared starting label")
        if samples is not None and samples.labels is not labels:
            raise ValueError("Cached observations belong to a different trace snapshot")
        seed = ({}, [])
        if index_first:
            if samples is None:
                raise ValueError("Require scoped sample evidence to seed windows")
            seed = samples.seed(starts, steps, initial)
        read = labels.__getitem__ if samples is None else samples.read
        self._initialize(read, starts, initial, grids, seed)

    def _initialize(self, read, starts, initial, grids, seed):
        self._starts = tuple(starts)
        self._witnesses, self._negatives = seed
        self._inspections = 0
        self._stride = None
        self._updates = self._scan(read, grids, initial)

    @classmethod
    def from_verified_windows(cls, read, starts, steps, initial, schedule, observations):
        """The caller supplies starts and observations verified against its trace manifest."""
        scan = cls.__new__(cls)
        grids = nested_grids(steps, schedule)
        starts = tuple(starts)
        seed = seed_windows(observations, starts, steps, initial)
        scan._initialize(read, starts, initial, grids, seed)
        return scan

    def _scan(self, read, grids, initial):
        seeded_negatives = set(self._negatives)
        for stride, offsets in grids:
            for start in self._starts:
                if start in self._witnesses or start in seeded_negatives:
                    continue
                for offset in offsets:
                    self._inspections += 1
                    index = start + offset
                    if read(index) != initial:
                        self._witnesses[start] = index
                        yield stride
                        break
                else:
                    if stride == 1:
                        self._negatives.append(start)
                        yield stride

    def bounds(self):
        return len(self._witnesses), len(self._starts) - len(self._negatives)

    def resolved_windows(self):
        """Return only complete window decisions, suitable for resuming with another reader."""
        return dict.fromkeys(self._witnesses, True) | dict.fromkeys(self._negatives, False)

    def decide(self, threshold):
        if type(threshold) is not int or not 1 <= threshold <= len(self._starts):
            raise ValueError("Require a count threshold within the window denominator")
        before = self._inspections
        lower, upper = self.bounds()
        while lower < threshold <= upper:
            self._stride = next(self._updates, None)
            assert self._stride is not None, "Full grid must resolve the decision"
            lower, upper = self.bounds()
        return {
            "meetsThreshold": lower >= threshold, "countBounds": [lower, upper],
            "resolvedAtStride": self._stride, "inspectedLabels": self._inspections - before,
            "witnesses": [{"windowStart": start, "sample": index} for start, index in self._witnesses.items()],
            "fullyScannedNegativeStarts": self._negatives.copy(),
        }


def scan_threshold(labels, starts, steps, initial, threshold, schedule):
    return DepartureEvidence(labels, starts, steps, initial, schedule).decide(threshold)


class SampleEvidence:
    """Remember a decoded state only at its absolute index in an immutable trace."""

    def __init__(self, labels):
        self._labels = tuple(labels)
        self._seen = {}
        self.hits = 0
        self.new_reads = 0
        self.seed_windows = 0

    @property
    def labels(self):
        return self._labels

    def fork(self):
        copy = SampleEvidence(self.labels)
        copy._seen = self._seen.copy()
        return copy

    def read(self, index):
        if index in self._seen:
            self.hits += 1
            return self._seen[index]
        label = self.labels[index]
        self._seen[index] = label
        self.new_reads += 1
        return label

    def seed(self, starts, steps, initial):
        self.seed_windows += len(starts)
        return seed_windows(self._seen, starts, steps, initial)

    def observations(self):
        return self._seen.copy()


def seed_windows(observations, starts, steps, initial):
    positions = sorted(observations)
    away = [index for index in positions if observations[index] != initial]
    witnesses = {}
    negatives = []
    for start in starts:
        end = start + steps
        first = bisect_right(away, start)
        if first < len(away) and away[first] <= end:
            witnesses[start] = away[first]
        elif bisect_right(positions, end) - bisect_right(positions, start) == steps:
            negatives.append(start)
    return witnesses, negatives


def replay(archive_path):
    plan, plan_pin = record("parity-departure-threshold-plan.json")
    pins = plan["origin"]
    _, delft_pin = record("return-path-delft-row75-abstention-result.json", pins["delftAbstentionSha256"])
    parity, parity_pin = record("return-path-parity-plan.json", pins["parityPlanSha256"])
    previous, previous_pin = record("return-path-parity-result.json", pins["parityResultSha256"])
    labels, levels, digest = read_trace(archive_path, parity["trace"])
    labels = tuple(labels)
    if previous["planSha256"] != parity_pin["sha256"] or previous["traceSha256"] != digest:
        raise ValueError("Historical counts refer to different inputs")

    rows = []
    for window in previous["windows"]:
        steps = window["steps"]
        for initial, reference in zip(levels, window["byStartingLevel"], strict=True):
            starts = [i for i in range(0, len(labels) - steps, steps + 1) if labels[i] == initial]
            simple_count = sum(any(label != initial for label in labels[i + 1:i + steps + 1]) for i in starts)
            endpoint_count = sum(labels[i + steps] != initial for i in starts)
            assert initial == reference["level"] and len(starts) == reference["startWindows"]
            assert simple_count == reference["firstObservedExits"] and endpoint_count == reference["changedEndpoints"]
            for count in range(1, len(starts) + 1):
                policies = {
                    name: scan_threshold(labels, starts, steps, initial, count, schedule)
                    for name, schedule in plan["schedules"].items()
                }
                for result in policies.values():
                    lo, hi = result["countBounds"]
                    assert lo <= simple_count <= hi
                    assert result["meetsThreshold"] == (simple_count >= count)
                rows.append({
                    "steps": steps, "initialLabel": initial, "windows": len(starts), "threshold": count,
                    "observedDepartures": simple_count, "changedEndpoints": endpoint_count, "policies": policies,
                })

    totals = {
        name: {
            "inspectedLabels": sum(row["policies"][name]["inspectedLabels"] for row in rows),
            "resolvedBeforeFullStride": sum(row["policies"][name]["resolvedAtStride"] > 1 for row in rows),
            "lessWorkThanDirect": sum(row["policies"][name]["inspectedLabels"] < row["policies"]["direct"]["inspectedLabels"]
                                      for row in rows),
            "moreWorkThanDirect": sum(row["policies"][name]["inspectedLabels"] > row["policies"]["direct"]["inspectedLabels"]
                                      for row in rows),
        }
        for name in plan["schedules"]
    }
    try:
        nested_grids(100, [100, 20, 25, 1])
    except ValueError:
        grid_control = "non-nested schedule refused"
    else:
        raise AssertionError("Non-nested schedule must be refused")
    return {
        "sources": [plan_pin, parity_pin, previous_pin, delft_pin], "traceSha256": digest,
        "operation": {
            "id": "resolved-labels/certify-observed-departure-threshold",
            "inputType": "fixed-windows-of-nested-resolved-state-observations",
            "outputType": "observed-departure-count-at-least-threshold",
            "rule": "A differing retained label proves departure in that window. A fully scanned window with no change proves absence. Use the sum of proven departures as the lower bound and the denominator minus proven absences as the upper bound.",
            "limits": "Exactly the same window boundaries, starting states, and nested subsets of one decoded label stream. No claim about missed events between base samples or about new acquisition frequencies.",
        },
        "control": grid_control, "thresholds": len(rows), "work": totals, "rows": rows,
    }


def threshold_order(windows):
    middle = (windows + 1) // 2
    first = [1, middle, windows, 1, middle]
    remaining = [threshold for threshold in range(1, windows + 1) if threshold not in first]
    half = (len(remaining) + 1) // 2
    alternating = zip_longest(remaining[:half], reversed(remaining[half:]))
    return first + [threshold for pair in alternating for threshold in pair if threshold is not None]


def check_certificate(labels, starts, steps, initial, result):
    witnessed = set()
    for witness in result["witnesses"]:
        start, sample = witness["windowStart"], witness["sample"]
        assert start in starts and start < sample <= start + steps and labels[sample] != initial
        assert start not in witnessed
        witnessed.add(start)
    negatives = result["fullyScannedNegativeStarts"]
    assert len(negatives) == len(set(negatives)) and not witnessed.intersection(negatives)
    for start in negatives:
        assert start in starts and all(label == initial for label in labels[start + 1:start + steps + 1])
    assert result["countBounds"] == [len(witnessed), len(starts) - len(negatives)]


def stream_replay(archive_path):
    plan, plan_pin = record("parity-departure-stream-plan.json")
    prior_plan, prior_pin = record("parity-departure-threshold-plan.json", plan["thresholdPlanSha256"])
    prior, replay_pin = record("parity-departure-threshold-replay.json", plan["thresholdReplaySha256"])
    trace, trace_pin = record("return-path-parity-plan.json", prior_plan["origin"]["parityPlanSha256"])
    labels, _, digest = read_trace(archive_path, trace["trace"])
    assert digest == prior["traceSha256"]
    labels = tuple(labels)
    schedule = tuple(prior_plan["schedules"][plan["schedule"]])
    reference = {(row["steps"], row["initialLabel"], row["threshold"]): row for row in prior["rows"]}
    contexts = sorted({(steps, initial) for steps, initial, _ in reference})
    windows = {
        (steps, initial): tuple(i for i in range(0, len(labels) - steps, steps + 1) if labels[i] == initial)
        for steps, initial in contexts
    }
    evidence = {}
    rows = []
    orders = [threshold_order(len(windows[context])) for context in contexts]
    for thresholds in zip_longest(*orders):
        for (steps, initial), threshold in zip(contexts, thresholds, strict=True):
            if threshold is None:
                continue
            starts = windows[(steps, initial)]
            scope = (digest, steps, initial, starts, schedule)
            if scope not in evidence:
                evidence[scope] = DepartureEvidence(labels, starts, steps, initial, schedule)
            scan = evidence[scope]
            before = scan.bounds()
            retained = scan.decide(threshold)
            check_certificate(labels, starts, steps, initial, retained)
            archived = reference[(steps, initial, threshold)]
            cold = scan_threshold(labels, starts, steps, initial, threshold, schedule)
            assert cold == archived["policies"][plan["schedule"]]
            actual = archived["observedDepartures"]
            after = retained["countBounds"]
            assert before[0] <= after[0] <= actual <= after[1] <= before[1]
            assert retained["meetsThreshold"] == cold["meetsThreshold"] == (actual >= threshold)
            if not before[0] < threshold <= before[1]:
                assert retained["inspectedLabels"] == 0
            rows.append({
                "steps": steps, "initialLabel": initial, "threshold": threshold,
                "boundsBefore": list(before), "retained": retained, "coldInspections": cold["inspectedLabels"],
            })
    assert len(evidence) == len(contexts)
    for (steps, initial), starts in windows.items():
        actual = reference[(steps, initial, 1)]["observedDepartures"]
        assert evidence[(digest, steps, initial, starts, schedule)].bounds() == (actual, actual)
    return {
        "sources": [plan_pin, prior_pin, replay_pin, trace_pin], "traceSha256": digest,
        "scope": {
            "contexts": len(evidence), "schedule": schedule,
            "identity": "Trace hash, horizon, initial label, ordered window starts, and scan schedule.",
        },
        "work": {
            "requests": len(rows),
            "coldLabelInspections": sum(row["coldInspections"] for row in rows),
            "retainedLabelInspections": sum(row["retained"]["inspectedLabels"] for row in rows),
            "requestsUsingOnlyRetainedBounds": sum(row["retained"]["inspectedLabels"] == 0 for row in rows),
        },
        "rows": rows,
        "authority": "Live immutable trace and one stream invocation. Receipts expose witnesses and absences for audit. The scan cursor is in memory. The replay compares counts on this decoded archive and does not estimate future acquisition probabilities.",
    }


def overlap_replay(archive_path):
    plan, plan_pin = record("parity-departure-overlap-plan.json")
    old_plan, old_pin = record("parity-departure-threshold-plan.json", plan["thresholdPlanSha256"])
    stream, stream_pin = record("parity-departure-stream-replay.json", plan["streamReplaySha256"])
    parity, parity_pin = record("return-path-parity-plan.json", plan["parityPlanSha256"])
    labels, levels, digest = read_trace(archive_path, parity["trace"])
    labels = tuple(labels)
    assert stream["traceSha256"] == digest
    schedule = old_plan["schedules"][plan["schedule"]]
    sources = []
    rows = []
    for steps in parity["design"]["windowSteps"]:
        for initial in levels:
            starts = tuple(i for i in range(0, len(labels) - steps, steps + 1) if labels[i] == initial)
            samples = SampleEvidence(labels)
            source_threshold = (len(starts) + 1) // 2
            old = DepartureEvidence(labels, starts, steps, initial, schedule, samples=samples).decide(source_threshold)
            check_certificate(labels, starts, steps, initial, old)
            sources.append({
                "steps": steps, "initialLabel": initial, "starts": starts, "threshold": source_threshold,
                "retainedSamples": samples.new_reads, "certificate": old,
            })
            for phase in (1, steps // 2):
                shifted = tuple(i for i in range(phase, len(labels) - steps, steps + 1) if labels[i] == initial)
                assert set(starts).isdisjoint(shifted)
                exact = sum(any(value != initial for value in labels[i + 1:i + steps + 1]) for i in shifted)
                for threshold in range(1, len(shifted) + 1):
                    policies = {}
                    for name in plan["policies"]:
                        memory = None if name == "fresh" else samples.fork()
                        scan = DepartureEvidence(
                            labels, shifted, steps, initial, schedule, samples=memory, index_first=name == "indexed"
                        )
                        seeded = scan.bounds()
                        result = scan.decide(threshold)
                        check_certificate(labels, shifted, steps, initial, result)
                        assert seeded[0] <= exact <= seeded[1]
                        assert result["meetsThreshold"] == (exact >= threshold)
                        probes = result["inspectedLabels"]
                        if memory is not None:
                            assert memory.hits + memory.new_reads == probes
                        policies[name] = {
                            "boundsBeforeScanning": seeded, "certificate": result,
                            "newLabelReads": probes if memory is None else memory.new_reads,
                            "cacheHits": 0 if memory is None else memory.hits,
                            "indexedWindowChecks": 0 if memory is None else memory.seed_windows,
                        }
                    assert policies["memoized"]["certificate"] == policies["fresh"]["certificate"]
                    rows.append({
                        "steps": steps, "initialLabel": initial, "phase": phase, "windows": len(shifted),
                        "threshold": threshold, "firstObservedDepartures": exact, "policies": policies,
                    })

    changed = (*labels[:-1], levels[0] if labels[-1] == levels[1] else levels[1])
    try:
        DepartureEvidence(changed, starts, steps, initial, schedule, samples=samples, index_first=True)
    except ValueError as exc:
        assert "different trace snapshot" in str(exc)
    else:
        raise AssertionError("Trace scope mismatch must be refused")
    return {
        "sources": [plan_pin, old_pin, stream_pin, parity_pin], "traceSha256": digest,
        "sourceQuestions": sources, "targetQuestionCount": len(rows),
        "workOnTargets": {
            name: {
                "newLabelReads": sum(row["policies"][name]["newLabelReads"] for row in rows),
                "logicalLabelProbes": sum(row["policies"][name]["certificate"]["inspectedLabels"] for row in rows),
                "indexedWindowChecks": sum(row["policies"][name]["indexedWindowChecks"] for row in rows),
                "zeroNewReads": sum(row["policies"][name]["newLabelReads"] == 0 for row in rows),
            }
            for name in plan["policies"]
        },
        "controls": {"changedTrace": "cache refused", "shiftedWindows": "rebuilt bound and denominator"},
        "authority": "Reuse transfers sample observations within one immutable author-decoded trace. Every target establishes its own certificate. The work counters cover target post-start label reads, logical probes, and seed-window checks.",
        "rows": rows,
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("archive", type=Path)
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--stream", action="store_true", help="Replay interleaved threshold queries with a retained scan cursor")
    mode.add_argument("--overlap", action="store_true", help="Replay shifted windows using retained sample observations")
    args = parser.parse_args()
    run = overlap_replay if args.overlap else stream_replay if args.stream else replay
    print(json.dumps(run(args.archive), indent=2, allow_nan=False))
