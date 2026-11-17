"""Check exact eviction shortcuts and measure their selection overhead."""

import argparse
from collections import Counter
import importlib.util
import json
from pathlib import Path
from statistics import median
from time import perf_counter_ns


STEM = "departure-cache-bundle-fast"


def load_bundles():
    path = Path(__file__).with_name("replay-departure-cache-bundles.py")
    spec = importlib.util.spec_from_file_location("departure_cache_bundles", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def guarded_bundle(solve, weights, costs, needed):
    if sum(weights) - min(weights) < needed:
        return tuple(range(len(weights))), 0, "whole-pool-required"
    if min(weights) == max(weights):
        count = (needed + weights[0] - 1) // weights[0]
        by_cost = sorted(range(len(weights)), key=lambda i: (costs[i], i))
        return tuple(sorted(by_cost[:count])), 0, "equal-weights"
    feasible = [i for i, weight in enumerate(weights) if weight >= needed]
    if feasible:
        winner = min(feasible, key=lambda i: (costs[i], weights[i], i))
        cheapest_two = sorted(costs)[:2]
        if costs[winner] < sum(cheapest_two):
            return (winner,), 0, "single-below-any-pair"
    ages, examined = solve(weights, costs, needed)
    return ages, examined, "dynamic-programming"


def bench_time(policies, rounds):
    loop = list(policies)
    samples = {key: [] for key in loop}
    values = {key: policies[key]() for key in loop}
    for start in range(rounds):
        for offset in range(len(loop)):
            key = loop[(start + offset) % len(loop)]
            before = perf_counter_ns()
            result = policies[key]()
            samples[key].append(perf_counter_ns() - before)
            assert values[key] == result
    return {
        key: {"samplesNs": values_, "medianNs": median(values_), "verifiedResult": values[key]}
        for key, values_ in samples.items()
    }


def measure(args, bundles, replacement, module, live, adaptive, partition, index, persistence, scan):
    plan, plan_pin = scan.record(STEM + "-plan.json")
    bundle_plan, bundle_pin = scan.record("departure-cache-bundle-plan.json", plan["bundlePlanSha256"])
    previous, previous_pin = scan.record("departure-cache-bundle-replay.json", plan["bundleReplaySha256"])
    earlier, earlier_pin = scan.record("departure-cache-replacement-plan.json", bundle_plan["replacementPlanSha256"])
    capacity, capacity_pin = scan.record("departure-cache-capacity-plan.json", earlier["capacityPlanSha256"])
    layouts, layout_pin = scan.record("departure-change-partition-prepared.json", capacity["partitionPreparedSha256"])
    flat, flat_pin = scan.record("departure-change-index-prepared.json", capacity["flatPreparedSha256"])
    assert bundle_pin in previous["sources"]
    cases = []
    guards, states = Counter(), Counter()
    solve = bundles.cheapest_bundle

    def guard(weights, costs, needed):
        ages, examined, _ = guarded_bundle(solve, weights, costs, needed)
        return ages, examined

    def audit(weights, costs, needed):
        exact, examined = solve(weights, costs, needed)
        chosen, guarded_work, reason = guarded_bundle(solve, weights, costs, needed)
        assert chosen == exact
        if args.benchmark:
            cases.append((tuple(weights), tuple(costs), needed))
        guards[reason] += 1
        states.update({"full": examined, "guarded": guarded_work})
        return chosen, examined

    def execute(entry, manifest, layout, questions, size, route, selector):
        cache = module.VerifiedCache(size) if selector is None else bundles.bundle_cache(
            module, size, earlier["oldestCandidates"], True, selector=selector
        )
        return module.run(
            live, partition, index, persistence, scan, None, args.store, entry, layout, manifest,
            questions, size, route, replacement=cache
        )

    verified = []
    timed = []
    for entry in flat["traces"]:
        name, manifest = partition.load_trace(persistence, args.store, entry)
        layout = next(item for item in layouts["partitions"]
                      if item["trace"] == name and item["blockLabels"] == capacity["partitionLabels"])
        orders = bundles.fresh_orders(replacement, adaptive, persistence, manifest, earlier, bundle_plan)
        trace = next(item for item in previous["traces"] if item["trace"] == name)
        for stream in trace["streams"]:
            order, size, route = stream["order"], stream["capacityBytes"], stream["route"]
            if order == "reference":
                continue
            questions = orders[order]
            result = execute(entry, manifest, layout, questions, size, route, audit)
            assert result["totalBytes"] == stream["policies"]["bundle-reuse"]["totalBytes"]
            assert result["rereadAfterEvictionBytes"] == stream["policies"]["bundle-reuse"]["rereadAfterEvictionBytes"]
            match = {"trace": name, "order": order, "capacityBytes": size, "route": route}
            verified.append({**match, "readBytes": result["totalBytes"], "questions": len(questions)})
            if args.benchmark and match in plan["endToEndTiming"]["streams"]:
                def run_timed(selector, task=(entry, manifest, layout, questions, size, route)):
                    measured = execute(*task, selector)
                    return {"readBytes": measured["totalBytes"], "questions": len(measured["rows"])}

                times = bench_time({
                    "recency": lambda: run_timed(None),
                    "full": lambda: run_timed(solve),
                    "guarded": lambda: run_timed(guard),
                }, plan["endToEndTiming"]["rounds"])
                assert times["full"]["verifiedResult"] == times["guarded"]["verifiedResult"]
                timed.append({**match, "timing": times})
    result = {
        "sources": [plan_pin, bundle_pin, previous_pin, earlier_pin, capacity_pin, layout_pin, flat_pin],
        "heldStreams": verified, "identicalBundleDecisions": sum(guards.values()),
        "selectionRoutes": dict(guards), "dynamicStatesExamined": dict(states),
        "authority": "Guarded eviction matches every full-solver bundle in the held replay. Read work uses archived decoded traces. Timing is separate, measured after warmup with operating-system file caching left in place.",
    }
    if args.benchmark:
        assert len(timed) == len(plan["endToEndTiming"]["streams"])

        def selection_loop(selector):
            return sum(len(selector(*case)[0]) for case in cases)

        selection = bench_time({"full": lambda: selection_loop(solve), "guarded": lambda: selection_loop(guard)}, 8)
        assert selection["full"]["verifiedResult"] == selection["guarded"]["verifiedResult"]
        return {"replay": result, "timing": {"selection": selection, "endToEnd": timed}}
    return result


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("store", type=Path)
    parser.add_argument("--benchmark", action="store_true")
    args = parser.parse_args()
    bundles = load_bundles()
    replacement = bundles.load_replacement()
    module = replacement.load_capacity()
    live = module.load_local("replay-live-bound-routing")
    adaptive = module.load_local("measure-departure-adaptive")
    partition = live.load_partition()
    index = partition.load_index()
    persistence = index.load_local("measure-parity-persistence")
    scan = persistence.load_scan()
    output = measure(args, bundles, replacement, module, live, adaptive, partition, index, persistence, scan)
    print(json.dumps(output, indent=2, allow_nan=False))
