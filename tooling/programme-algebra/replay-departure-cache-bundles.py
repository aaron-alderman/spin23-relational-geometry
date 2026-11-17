"""Price feasible eviction sets using only completed-query evidence."""

import argparse
from collections import Counter
import importlib.util
import json
from pathlib import Path


STEM = "departure-cache-bundle"


def load_replacement():
    path = Path(__file__).with_name("replay-departure-cache-replacement.py")
    spec = importlib.util.spec_from_file_location("departure_cache_replacement", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def cheapest_bundle(weights, costs, needed):
    # Keep the best combination for each number of freed bytes, clamped at needed.
    states = {0: (0, 0, ())}
    examined = 0
    for age, (weight, cost) in enumerate(zip(weights, costs, strict=True)):
        for freed, (old_cost, actual, ages) in list(states.items()):
            if freed == needed:
                continue
            examined += 1
            candidate = (old_cost + cost, actual + weight, (*ages, age))
            key = min(needed, actual + weight)
            if key not in states or candidate < states[key]:
                states[key] = candidate
    return states[needed][2], examined


def bundle_cache(module, capacity, oldest, use_history, *, selector=cheapest_bundle):
    class BundleCache(module.VerifiedCache):
        def __init__(self):
            super().__init__(capacity)
            self.touches = set()
            self.query_uses = Counter()
            self.completed_queries = 0
            self.bundle_decisions = 0
            self.multi_victim_decisions = 0
            self.examined_states = 0

        def observe(self, identity):
            if use_history:
                self.touches.add(identity)

        def complete_query(self):
            if use_history:
                self.query_uses.update(self.touches)
                self.touches.clear()
                self.completed_queries += 1

        def victims(self, needed):
            pool, weights, costs = [], [], []
            feasible_bytes = 0
            for identity, (value, weight) in self.entries.items():
                pool.append(identity)
                weights.append(weight)
                byte_cost = 0 if identity[0] == "changes" and not value else weight
                # The smoothed frequency denominator is shared by every entry.
                # Multiplying by the integer numerator gives the same ordering.
                costs.append(byte_cost * (self.query_uses[identity] + 1) if use_history else byte_cost)
                feasible_bytes += weight
                if len(pool) >= oldest and feasible_bytes >= needed:
                    break
            ages, examined = selector(weights, costs, needed)
            self.bundle_decisions += 1
            self.multi_victim_decisions += len(ages) > 1
            self.examined_states += examined
            return tuple(pool[age] for age in ages)

    return BundleCache()


def fresh_orders(replacement, adaptive, persistence, manifest, prior_plan, plan):
    old = replacement.orderings(adaptive, persistence, manifest["contexts"], prior_plan)
    orders = {"reference": old["fixed-permutation"]}
    for ordinal, salt in enumerate(plan["heldOrderSalts"], 1):
        def key(question):
            request = replacement.question_key(*question)
            return persistence.sha((salt + "\n" + json.dumps(request)).encode()), request

        orders[f"held-{ordinal}"] = sorted(old["reference"], key=key)
    def sequence(questions):
        return tuple(replacement.question_key(*question) for question in questions)

    assert not {sequence(orders[label]) for label in orders if label != "reference"} & {
        sequence(questions) for questions in old.values()
    }
    assert len({sequence(questions) for questions in orders.values()}) == len(orders)
    return orders


def measure(replacement, module, live, adaptive, partition, index, persistence, scan, store, plan, prior_plan,
            capacity_plan, previous, flat, oracle, layouts, per_page):
    traces = []
    for entry in flat["traces"]:
        name, manifest = partition.load_trace(persistence, store, entry)
        layout = next(item for item in layouts["partitions"]
                      if item["trace"] == name and item["blockLabels"] == capacity_plan["partitionLabels"])
        previous_trace = next(trace for trace in previous["traces"] if trace["trace"] == name)
        actual = next(item for item in oracle["traces"] if item["trace"] == name)
        answers = {(row["region"], row["steps"], row["phase"], row["initial"], row["threshold"]): row["answer"]
                   for row in actual["rows"]}
        streams = []
        for order, questions in fresh_orders(replacement, adaptive, persistence, manifest, prior_plan, plan).items():
            for capacity in prior_plan["capacities"]:
                for route in prior_plan["routes"]:
                    old = replacement.replacements(
                        module, prior_plan, per_page, partition.RECORD.size, layout["directoryBytes"], capacity
                    )
                    candidates = {
                        "recency": old["recency"], "encoded-cost": old["encoded-cost"],
                        "bundle-bytes": bundle_cache(module, capacity, prior_plan["oldestCandidates"], False),
                        "bundle-reuse": bundle_cache(module, capacity, prior_plan["oldestCandidates"], True),
                    }
                    results = {}
                    for kind, cache in candidates.items():
                        result = module.run(
                            live, partition, index, persistence, scan, None, store, entry, layout, manifest,
                            questions, capacity, route, replacement=cache
                        )
                        assert [row["answer"] for row in result["rows"]] == [
                            answers[replacement.question_key(*question)] for question in questions
                        ]
                        summary = {key: result[key] for key in (
                            "totalBytes", "readBytes", "rereadAfterEvictionBytes", "evictions", "peakCacheWeight"
                        )}
                        if kind.startswith("bundle"):
                            summary["selectionWork"] = {
                                "bundleDecisions": cache.bundle_decisions,
                                "multiVictimDecisions": cache.multi_victim_decisions,
                                "candidateStatesExamined": cache.examined_states,
                                "entriesWithQueryHistory": len(cache.query_uses),
                            }
                        elif order == "reference":
                            check = next(row for row in previous_trace["streams"] if row["order"] == "fixed-permutation"
                                         and row["capacityBytes"] == capacity and row["route"] == route)
                            assert summary == check["replacement"][kind]
                        results[kind] = summary
                    streams.append({
                        "order": order, "capacityBytes": capacity, "route": route, "questions": len(questions),
                        "policies": results,
                    })
        traces.append({"trace": name, "streams": streams})
    return traces


def compare(held, candidate, baseline):
    delta = [run["policies"][candidate]["totalBytes"] - run["policies"][baseline]["totalBytes"] for run in held]
    examples = []
    for pos in (delta.index(min(delta)), delta.index(max(delta))):
        row = held[pos]
        examples.append({
            **{key: row[key] for key in ("trace", "order", "capacityBytes", "route")},
            "additionalBytes": delta[pos],
        })
    return {
        "better": sum(cost < 0 for cost in delta), "equal": delta.count(0), "worse": sum(cost > 0 for cost in delta),
        "netBytesSaved": -sum(delta), "bestAndWorstCases": examples,
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("store", type=Path)
    args = parser.parse_args()
    assert cheapest_bundle([37, 50], [37, 50], 50)[0] == (1,)
    assert cheapest_bundle([40, 64], [160, 64], 40)[0] == (1,)
    replacement = load_replacement()
    module = replacement.load_capacity()
    live = module.load_local("replay-live-bound-routing")
    adaptive = module.load_local("measure-departure-adaptive")
    partition = live.load_partition()
    index = partition.load_index()
    persistence = index.load_local("measure-parity-persistence")
    scan = persistence.load_scan()
    plan, plan_pin = scan.record(STEM + "-plan.json")
    previous_plan, previous_plan_pin = scan.record("departure-cache-replacement-plan.json", plan["replacementPlanSha256"])
    previous, previous_pin = scan.record("departure-cache-replacement-replay.json", plan["replacementReplaySha256"])
    capacity_plan, capacity_pin = scan.record("departure-cache-capacity-plan.json", previous_plan["capacityPlanSha256"])
    layouts, layout_pin = scan.record("departure-change-partition-prepared.json", capacity_plan["partitionPreparedSha256"])
    flat, flat_pin = scan.record("departure-change-index-prepared.json", capacity_plan["flatPreparedSha256"])
    oracle, oracle_pin = scan.record("departure-change-index-replay.json", capacity_plan["flatReplaySha256"])
    partition_plan_pin = next(pin for pin in layouts["sources"] if pin["path"].endswith("departure-change-partition-plan.json"))
    layout_plan, _ = scan.record("departure-change-partition-plan.json", partition_plan_pin["sha256"])
    assert previous_plan_pin in previous["sources"] and oracle["preparationReceiptSha256"] == flat_pin["sha256"]
    traces = measure(replacement, module, live, adaptive, partition, index, persistence, scan, args.store,
                     plan, previous_plan, capacity_plan, previous, flat, oracle, layouts, layout_plan["recordsPerDirectoryPage"])
    held = [{"trace": trace["trace"], **row} for trace in traces for row in trace["streams"] if row["order"] != "reference"]
    comparison = {
        f"{candidate} vs {baseline}": compare(held, candidate, baseline)
        for candidate, baseline in (
            ("encoded-cost", "recency"), ("bundle-bytes", "recency"), ("bundle-reuse", "recency"),
            ("bundle-bytes", "encoded-cost"), ("bundle-reuse", "bundle-bytes"),
        )
    }
    print(json.dumps({
        "sources": [plan_pin, previous_plan_pin, previous_pin, capacity_pin, layout_pin, flat_pin, oracle_pin, partition_plan_pin],
        "controls": {"exactFitBeatSequentialEviction": True, "completedUseWeightCanChangeVictim": True},
        "heldComparison": comparison, "traces": traces,
        "authority": "Order holdouts use the same archived traces and questions. Encoded payload reads and bundle-selection states are separate counters. The frequency score uses completed-query touches and is a prediction, with no future-access guarantee.",
    }, indent=2, allow_nan=False))
