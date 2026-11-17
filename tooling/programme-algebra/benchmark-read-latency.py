"""Measure application read calls and calibrated busy-wait delay on two frozen streams."""
import argparse
from collections import Counter
from contextlib import contextmanager
import hashlib
import json
from pathlib import Path
import runpy
from statistics import median
from time import perf_counter_ns as clock

bench = runpy.run_path(str(Path(__file__).with_name("benchmark-departure-cache-bundles.py")))
bundles = bench["load_bundles"]()
replacement = bundles.load_replacement()
module = replacement.load_capacity()
live = module.load_local("replay-live-bound-routing")
adaptive = module.load_local("measure-departure-adaptive")
partition = live.load_partition()
index = partition.load_index()
persistence = index.load_local("measure-parity-persistence")
scan = persistence.load_scan()
kinds = ("packed", "directory", "changes", "root")


class Meter:
    def __init__(self, store, delay):
        self.store, self.delay = store, delay
        self.calls, self.sizes = Counter(), Counter()

    def __truediv__(self, name):
        path = self.store / name
        kind = ("packed" if name.endswith("-packed.bin") else
                {".bin": "changes", ".dir": "directory", ".root": "root"}[path.suffix])
        meter = self

        class File:
            def charge(self, data):
                meter.calls[kind] += 1
                meter.sizes[kind] += len(data)
                if meter.delay:
                    until = clock() + meter.delay
                    while clock() < until:
                        pass
                return data

            def read_bytes(self):
                return self.charge(path.read_bytes())

            @contextmanager
            def open(self, *args, **kwargs):
                with path.open(*args, **kwargs) as stream:
                    self.fileno = stream.fileno
                    self.seek = stream.seek
                    self.read = lambda size: self.charge(stream.read(size))
                    yield self

        return File()


def trial(store, spec, entry, layout, manifest, questions, oldest, policy, delay):
    meter = Meter(store, delay)
    size = spec["capacityBytes"]
    def guard(weights, costs, needed):
        ages, states, _ = bench["guarded_bundle"](bundles.cheapest_bundle, weights, costs, needed)
        return ages, states
    cache = (module.VerifiedCache(size) if policy == "recency" else
             bundles.bundle_cache(module, size, oldest, True, selector=guard))
    select = cache.victims
    selection = 0
    def timed_select(needed):
        nonlocal selection
        start = clock()
        victims = select(needed)
        selection += clock() - start
        return victims
    cache.victims = timed_select
    start = clock()
    result = module.run(live, partition, index, persistence, scan, None, meter, entry,
                        layout, manifest, questions, size, spec["route"], replacement=cache)
    elapsed = clock() - start
    assert meter.sizes == Counter(result["readBytes"])
    digest = hashlib.sha256(bytes(row["answer"] for row in result["rows"])).hexdigest()
    return dict(ns=elapsed, selectionNs=selection, bytes=result["totalBytes"], answers=digest,
                calls={k: meter.calls[k] for k in kinds})


def experiment(store, confirmation=False):
    plan, _ = scan.record("departure-cache-bundle-fast-plan.json")
    bundle, _ = scan.record("departure-cache-bundle-plan.json", plan["bundlePlanSha256"])
    prior, _ = scan.record("departure-cache-replacement-plan.json", bundle["replacementPlanSha256"])
    cap, _ = scan.record("departure-cache-capacity-plan.json", prior["capacityPlanSha256"])
    layouts, _ = scan.record("departure-change-partition-prepared.json", cap["partitionPreparedSha256"])
    flat, _ = scan.record("departure-change-index-prepared.json", cap["flatPreparedSha256"])
    results = []
    for spec in plan["endToEndTiming"]["streams"]:
        entry = next(e for e in flat["traces"] if e["trace"] == spec["trace"])
        name, manifest = partition.load_trace(persistence, store, entry)
        layout = next(e for e in layouts["partitions"] if e["trace"] == name and e["blockLabels"] == cap["partitionLabels"])
        questions = bundles.fresh_orders(replacement, adaptive, persistence, manifest, prior, bundle)[spec["order"]]
        stages = []
        def stage(delay):
            samples = {"recency": [], "guarded": []}
            for i in range(9):  # warm pair, then eight counterbalanced pairs
                for policy in list(samples)[::1 if i % 2 else -1]:
                    row = trial(store, spec, entry, layout, manifest, questions, prior["oldestCandidates"], policy, delay)
                    if i:
                        samples[policy].append(row)
            summaries = {}
            for policy, rows in samples.items():
                stable = {k: rows[0][k] for k in ("calls", "bytes", "answers")}
                assert all(all(row[k] == v for k, v in stable.items()) for row in rows)
                summaries[policy] = dict(**stable, samplesNs=[r["ns"] for r in rows],
                    medianNs=median(r["ns"] for r in rows), medianSelectionNs=median(r["selectionNs"] for r in rows))
            assert summaries["recency"]["answers"] == summaries["guarded"]["answers"]
            diff = [g["ns"]-r["ns"] for g,r in zip(samples["guarded"],samples["recency"],strict=True)]
            stages.append(dict(delayNs=delay, policies=summaries, pairedDifferenceNs=diff, medianDifferenceNs=median(diff)))
            return summaries
        base = stage(0)
        saved = {k: base["recency"]["calls"][k]-base["guarded"]["calls"][k] for k in kinds}
        n = sum(saved.values())
        threshold = stages[0]["medianDifferenceNs"]/n if n > 0 else None
        if confirmation:
            for delay in (20000, 150000, 500000):
                stage(delay)
        elif threshold and threshold > 0:
            for factor in (0.25, 3):
                stage(round(threshold * factor))
        results.append(dict(**spec, questions=len(questions), savedCalls=saved, crossoverNs=threshold, stages=stages))
    return results


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("store", type=Path)
    parser.add_argument("--confirmation", action="store_true")
    args = parser.parse_args()
    print(json.dumps(experiment(args.store, args.confirmation), indent=2))



