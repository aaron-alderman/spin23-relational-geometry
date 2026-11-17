"""Replay observation equivalence and find probes that separate frozen candidates."""

import argparse
import hashlib
from itertools import combinations
import json
import math
from pathlib import Path


def pinned(directory, pin):
    path = directory / pin["file"]
    data = path.read_bytes()
    if hashlib.sha256(data).hexdigest() != pin["sha256"]:
        raise ValueError(f"Source changed: {path}")
    return json.loads(data)


def exact_classes(fingerprints):
    classes = {}
    for candidate, values in fingerprints.items():
        key = tuple(values)
        if not key or not all(map(math.isfinite, key)):
            raise ValueError("Every candidate needs finite predictions on the observation basis")
        classes.setdefault(key, []).append(candidate)
    if len({len(v) for v in fingerprints.values()}) != 1:
        raise ValueError("Candidate fingerprints must use the same observation basis")
    return list(classes.values())


def interval_clearance(intervals):
    """Minimum signed gap across pairs. A zero gap allows a shared boundary observation."""
    if len(intervals) < 2:
        raise ValueError("A discriminating probe needs at least two candidates")
    return min(max(left[0] - right[1], right[0] - left[1])
               for left, right in combinations(intervals.values(), 2))


def edge_design(directory, spec):
    import numpy as np
    from return_path_shape import step_response

    plan = pinned(directory, spec["plan"])
    receipt = pinned(directory, spec["receipt"])
    if receipt["comparisonPlanSha256"] != spec["plan"]["sha256"]:
        raise ValueError("Edge receipt uses a different plan")
    widths = receipt["calibrationLeadingWidthsNativeSamples"]
    half = plan["edge"]["scoreHalfWidthFromAlignedCenterNativeSamples"]
    offsets = [offset for offset in range(-half, half + 1) if offset % 2 == 0]
    signatures = {width: step_response(np.asarray(offsets), width).tolist() for width in widths}
    query = spec["downstream"]
    run = next(row for row in receipt["scoreTraces"] if row["acquisition"]["replicateIndex"] == query["replicate"])
    recovery = {}
    for width in widths:
        arm = next(row for row in run["injectionByKernel"][str(width)] if row["initialState"] == query["initialState"])
        row = next(row for row in arm["runs"] if row["durationNativeSamples"] == query["durationNativeSamples"] and
                   row["onsetOffset"] == query["onsetOffset"])
        recovery[width] = row["scores"][query["decoder"]]["injectionCalls"] / arm["pairedBackgrounds"]
    probes = []
    for offset in spec["probeOffsetsNativeSamples"]:
        for radius in spec["timingRadiiNativeSamples"]:
            if radius < 0:
                raise ValueError("Timing radius must be nonnegative")
            ranges = {width: step_response(np.array([offset - radius, offset + radius]), width).tolist()
                      for width in widths}
            clearance = interval_clearance(ranges)
            probes.append({
                "offsetNativeSamples": offset,
                "timingRadiusNativeSamples": radius,
                "predictedRangesInStateGaps": ranges,
                "signedClearanceInStateGaps": clearance,
                "requiresAmplitudeErrorStrictlyBelowStateGaps": clearance / 2 if clearance > 0 else None,
            })
    ranked = []
    for radius in spec["timingRadiiNativeSamples"]:
        eligible = [p for p in probes if p["timingRadiusNativeSamples"] == radius and
                    p["signedClearanceInStateGaps"] > 0]
        best = max((p["signedClearanceInStateGaps"] for p in eligible), default=None)
        ranked.append({
            "timingRadiusNativeSamples": radius,
            "bestOffsets": [p["offsetNativeSamples"] for p in eligible
                            if math.isclose(p["signedClearanceInStateGaps"], best, abs_tol=1e-12)],
        })
    return {
        "sources": [spec["plan"], spec["receipt"]],
        "basisOffsetsNativeSamples": offsets,
        "exactClasses": exact_classes(signatures),
        "downstream": {"query": query, "recoveryByWidth": recovery,
                       "spread": max(recovery.values()) - min(recovery.values())},
        "probeOptions": probes,
        "bestOffsetsByTimingBudget": ranked,
        "boundary": spec["boundary"],
    }


def count_intervals(predictions, tolerance):
    if not 0 <= tolerance < 1 or any(not math.isfinite(p) or p <= 0 for p in predictions.values()):
        raise ValueError("Relative net-count comparison needs positive finite counts and tolerance below one")
    return {candidate: [p / (1 + tolerance), p / (1 - tolerance)] for candidate, p in predictions.items()}


def detector_design(directory, spec):
    fit = pinned(directory, spec["fit"])
    candidates = {item["expression"]: item for item in fit["remaining"]}
    basis = [row["at"] for row in fit["fitRows"]]
    fingerprints = {}
    for item in fit["fitted"]:
        candidate = item["candidate"]
        if candidate == candidates.get(candidate["expression"]):
            rows = item["observations"]
            if not item["passed"] or [row["at"] for row in rows] != basis:
                raise ValueError("Surviving candidate lacks the common fit basis")
            fingerprints[candidate["expression"]] = [row["prediction"] for row in rows]
    if fingerprints.keys() != candidates.keys():
        raise ValueError("Fit receipt does not reproduce the surviving candidates")

    families = []
    seen = set()
    for source in spec["forecasts"]:
        forecast = pinned(directory, source)
        family = forecast["evidenceFamily"]
        if family in seen:
            raise ValueError("A repeated evidence family cannot supply another independent family")
        seen.add(family)
        criterion = forecast["criterion"]
        if criterion["metric"] != "absolute-relative-error-to-positive-net-count":
            raise ValueError("Unsupported detector forecast criterion")
        tolerance = criterion["maximum"]
        probes = []
        for row in forecast["predictions"]:
            rows = row["candidates"]
            if {r["candidate"]["expression"]: r["candidate"] for r in rows} != candidates or len(rows) != len(candidates):
                raise ValueError("Detector probe changed a frozen candidate")
            predictions = {r["candidate"]["expression"]: r["predictedNetPeakArea"] for r in rows}
            intervals = count_intervals(predictions, tolerance)
            relative_margin = min(abs(a - b) / (a + b) for a, b in combinations(predictions.values(), 2))
            probes.append({
                "id": row["id"],
                "predictedNetCounts": predictions,
                "compatibleObservedCounts": intervals,
                "signedClearanceCounts": interval_clearance(intervals),
                "relativeToleranceMustBeBelow": relative_margin,
            })
        usable = [p for p in probes if p["signedClearanceCounts"] > 0]
        # Compare scale-free margins. Round only for ranking so an
        # arithmetic difference between equal physical ratios cannot break a tie.
        rank = max((round(p["relativeToleranceMustBeBelow"], 12) for p in usable), default=None)
        tied = [p["id"] for p in usable if round(p["relativeToleranceMustBeBelow"], 12) == rank]
        families.append({"evidenceFamily": family, "source": source, "relativeTolerance": tolerance,
                         "probes": probes, "tiedBestProbeIds": tied, "selectedProbeId": tied[0] if tied else None})
    return {
        "fit": spec["fit"],
        "basis": basis,
        "exactClasses": exact_classes(fingerprints),
        "families": families,
        "selectedProbeCount": sum(f["selectedProbeId"] is not None for f in families),
        "availableProbeCount": sum(len(f["probes"]) for f in families),
        "boundary": spec["boundary"],
    }


def design(path):
    data = path.read_bytes()
    recipe = json.loads(data)
    return {"planSha256": hashlib.sha256(data).hexdigest(),
            "edge": edge_design(path.parent, recipe["edge"]),
            "detector": detector_design(path.parent, recipe["detector"])}


def score(frozen, labels_path):
    families = {}
    for pin in json.loads(labels_path.read_bytes()):
        label = pinned(labels_path.parent, pin)
        family = label["evidenceFamily"]
        if family in families:
            raise ValueError("Observation family appears twice")
        families[family] = (pin, label)
    results = []
    for row in frozen["detector"]["families"]:
        family, probe = row["evidenceFamily"], row["selectedProbeId"]
        if probe is None:
            continue
        pin, labels = families[family]
        counts = [x["netPeakArea"] for x in labels["observations"] if x["id"] == probe]
        if len(counts) != 1 or not math.isfinite(counts[0]) or counts[0] <= 0:
            raise ValueError("Expected one positive measurement for the selected probe")
        observed = counts[0]
        intervals = next(p["compatibleObservedCounts"] for p in row["probes"] if p["id"] == probe)
        accepted = [candidate for candidate, (lo, hi) in intervals.items() if lo <= observed <= hi]
        results.append({"evidenceFamily": family, "probe": probe, "observationSource": pin,
                        "observedNetCounts": observed, "acceptedCandidates": accepted})
    return {"planSha256": frozen["planSha256"], "scoredProbes": results,
            "authority": "Retrospective measured-count replay. No calibration-edge outcome is supplied."}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("plan", type=Path)
    parser.add_argument("--score", type=Path, nargs=2, metavar=("FROZEN_DESIGN", "OBSERVATION_PINS"))
    args = parser.parse_args()
    current = design(args.plan)
    if args.score:
        path, labels = args.score
        # Compare JSON-normalized objects because edge widths are integer keys in memory.
        if json.loads(path.read_bytes()) != json.loads(json.dumps(current)):
            raise ValueError("Frozen probe selection does not reproduce")
        current = score(current, labels)
    print(json.dumps(current, indent=2))
