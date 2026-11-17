"""Compare re-verification-aware replacement with recency on fixed query orders."""

import argparse
from collections import Counter
from itertools import islice, zip_longest
import importlib.util
import json
from pathlib import Path


STEM = "departure-cache-replacement"


def load_capacity():
    path = Path(__file__).with_name("replay-departure-cache-capacity.py")
    spec = importlib.util.spec_from_file_location("departure_cache_capacity", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def replacements(cache_module, plan, per_page, directory_record_bytes, directory_bytes, capacity):
    blocks, remainder = divmod(directory_bytes, directory_record_bytes)
    assert remainder == 0

    class CostAware(cache_module.VerifiedCache):
        def __init__(self, dependency):
            super().__init__(capacity)
            self.dependency = dependency

        def victim(self):
            def reload_cost(identity):
                kind, key = identity
                value, weight = self.entries[identity]
                cost = 0 if kind == "changes" and not value else weight
                if self.dependency and kind == "changes":
                    page = key // per_page
                    if ("directory", page) not in self.entries:
                        cost += min(per_page, blocks - page * per_page) * directory_record_bytes
                return cost

            # min keeps the oldest candidate on an exact cost tie.
            return min(islice(self.entries, plan["oldestCandidates"]), key=reload_cost)

    return {
        "recency": cache_module.VerifiedCache(capacity),
        "encoded-cost": CostAware(False),
        "dependency-cost": CostAware(True),
    }


def question_key(arm, threshold):
    return arm["region"], arm["steps"], arm["phase"], arm["initial"], threshold


def orderings(adaptive, persistence, contexts, plan):
    reference = adaptive.questions(contexts, "mixed")
    reverse = [
        (arm, threshold)
        for column in zip_longest(*(reversed(arm["thresholds"]) for arm in contexts))
        for arm, threshold in zip(contexts, column, strict=True)
        if threshold is not None
    ]

    def hashed(question):
        key = question_key(*question)
        return persistence.sha((plan["permutationSalt"] + "\n" + json.dumps(key)).encode()), key

    permuted = sorted(reference, key=hashed)
    orders = {"reference": reference, "reverse-thresholds": reverse, "fixed-permutation": permuted}
    keys = {name: [question_key(*question) for question in rows] for name, rows in orders.items()}
    assert all(Counter(key) == Counter(keys["reference"]) for key in keys.values())
    assert len({tuple(key) for key in keys.values()}) == len(keys)
    return orders


def measure(module, live, adaptive, partition, index, persistence, scan, store, plan, capacity_plan, previous, flat, oracle,
            layouts, per_page):
    traces = []
    for entry in flat["traces"]:
        name, manifest = partition.load_trace(persistence, store, entry)
        layout = next(item for item in layouts["partitions"]
                      if item["trace"] == name and item["blockLabels"] == capacity_plan["partitionLabels"])
        prior = next(item for item in previous["traces"] if item["trace"] == name)
        actual = next(item for item in oracle["traces"] if item["trace"] == name)
        answers = {(row["region"], row["steps"], row["phase"], row["initial"], row["threshold"]): row["answer"]
                   for row in actual["rows"]}
        streams = []
        for order, questions in orderings(adaptive, persistence, manifest["contexts"], plan).items():
            for capacity in plan["capacities"]:
                for route in plan["routes"]:
                    cases = {}
                    for kind, cache in replacements(
                        module, plan, per_page, partition.RECORD.size, layout["directoryBytes"], capacity
                    ).items():
                        result = module.run(
                            live, partition, index, persistence, scan, None, store, entry, layout, manifest,
                            questions, capacity, route, replacement=cache
                        )
                        outcomes = [row["answer"] for row in result["rows"]]
                        assert outcomes == [answers[question_key(*question)] for question in questions]
                        if order == "reference" and kind == "recency":
                            earlier = next(item for item in prior["runs"]
                                           if item["capacityBytes"] == capacity and item["policy"] == route)
                            assert result == earlier
                        cases[kind] = {key: result[key] for key in (
                            "totalBytes", "readBytes", "rereadAfterEvictionBytes", "evictions", "peakCacheWeight"
                        )}
                    base = cases["recency"]["totalBytes"]
                    streams.append({
                        "order": order, "capacityBytes": capacity, "route": route, "questions": len(questions),
                        "replacement": cases, "additionalBytesVersusRecency": {
                            key: value["totalBytes"] - base for key, value in cases.items() if key != "recency"
                        },
                    })
        traces.append({"trace": name, "streams": streams})
    return traces


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("store", type=Path)
    args = parser.parse_args()
    module = load_capacity()
    live = module.load_local("replay-live-bound-routing")
    adaptive = module.load_local("measure-departure-adaptive")
    partition = live.load_partition()
    index = partition.load_index()
    persistence = index.load_local("measure-parity-persistence")
    scan = persistence.load_scan()
    plan, plan_pin = scan.record(STEM + "-plan.json")
    capacity, capacity_pin = scan.record("departure-cache-capacity-plan.json", plan["capacityPlanSha256"])
    previous, previous_pin = scan.record("departure-cache-capacity-replay.json", plan["capacityReplaySha256"])
    layouts, layouts_pin = scan.record("departure-change-partition-prepared.json", capacity["partitionPreparedSha256"])
    flat, flat_pin = scan.record("departure-change-index-prepared.json", capacity["flatPreparedSha256"])
    oracle, oracle_pin = scan.record("departure-change-index-replay.json", capacity["flatReplaySha256"])
    partition_plan_pin = next(pin for pin in layouts["sources"] if pin["path"].endswith("departure-change-partition-plan.json"))
    layout_plan, _ = scan.record("departure-change-partition-plan.json", partition_plan_pin["sha256"])
    assert capacity_pin in previous["sources"]
    assert oracle["preparationReceiptSha256"] == flat_pin["sha256"]
    traces = measure(module, live, adaptive, partition, index, persistence, scan, args.store, plan, capacity,
                     previous, flat, oracle, layouts, layout_plan["recordsPerDirectoryPage"])
    held = [stream for trace in traces for stream in trace["streams"] if stream["order"] != "reference"]
    summary = {}
    for policy in ("encoded-cost", "dependency-cost"):
        deltas = [point["additionalBytesVersusRecency"][policy] for point in held]
        summary[policy] = {
            "better": sum(delta < 0 for delta in deltas), "equal": sum(delta == 0 for delta in deltas),
            "worse": sum(delta > 0 for delta in deltas), "totalAdditionalBytes": sum(deltas),
            "largestSavings": -min(deltas), "largestPenalty": max(deltas),
        }
    print(json.dumps({
        "sources": [plan_pin, capacity_pin, previous_pin, layouts_pin, flat_pin, oracle_pin, partition_plan_pin],
        "heldComparison": summary, "traces": traces,
        "authority": "Held orders permute the same archived questions. Costs are encoded read bytes under fixed route and capacity controls. The dependency estimate uses the directory page's current residence.",
    }, indent=2, allow_nan=False))
