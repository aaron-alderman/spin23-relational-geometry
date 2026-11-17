"""Replay advisory scope hints without using them as evidence for answers."""

import argparse
import importlib.util
import json
from pathlib import Path


STEM = "departure-scope-hint"


def load_regional():
    path = Path(__file__).with_name("measure-departure-regional.py")
    spec = importlib.util.spec_from_file_location("departure_regional", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def route_hint(prefix_scope, forecast):
    encoded = json.dumps({"scope": prefix_scope, "forecast": forecast}, separators=(",", ":")).encode("utf-8")
    data = json.loads(encoded)
    if data["scope"] != prefix_scope or data["forecast"] not in ("final", "expand"):
        raise ValueError("Expected an advisory scope forecast")
    return data, len(encoded)


def measure(regional, adaptive, partition, index, persistence, scan, store):
    plan, plan_pin = scan.record(STEM + "-plan.json")
    region, region_pin = scan.record("departure-regional-budget-plan.json", plan["regionalPlanSha256"])
    prepared, prepared_pin = scan.record("departure-regional-budget-prepared.json", plan["regionalPreparedSha256"])
    prior, prior_pin = scan.record("departure-regional-budget-replay.json", plan["regionalReplaySha256"])
    assert prior["priceReceiptSha256"] == prepared_pin["sha256"] and region_pin in prepared["sources"]
    adaptive_plan, adaptive_pin = scan.record("departure-adaptive-scan-plan.json", region["adaptivePlanSha256"])
    flat, flat_pin = scan.record("departure-change-index-prepared.json", adaptive_plan["flatPreparedSha256"])
    baseline, baseline_pin = scan.record("departure-change-index-replay.json", adaptive_plan["flatReplaySha256"])
    partitions, partitions_pin = scan.record("departure-change-partition-prepared.json", adaptive_plan["partitionPreparedSha256"])
    trace = region["trace"]
    entry = next(item for item in flat["traces"] if item["trace"] == trace)
    metadata = next(item for item in partitions["partitions"]
                    if item["trace"] == trace and item["blockLabels"] == region["partitionLabels"])
    _, manifest = partition.load_trace(persistence, store, entry)
    root = prepared["geometry"]
    assert prepared["rootSha256"] == metadata["rootSha256"]
    assert root["sourceTraceSha256"] == manifest["sourceTraceSha256"]
    stem = f"{trace}-changes-{metadata['blockLabels']}"
    raw = (store / f"{stem}.prices").read_bytes()
    lengths = regional.prices(persistence, raw, prepared)
    fee = len(raw) + (scan.ROOT / prepared_pin["path"]).stat().st_size
    assert fee == sum(prior["pricingBytes"].values())
    oracle = next(item for item in baseline["traces"] if item["trace"] == trace)
    purchase = f"partition-{metadata['blockLabels']}"
    candidates = {
        "flat": {"fullBytes": oracle["indexBytes"] + oracle["additionalIndexProofBytesOncePerInvocation"]},
        purchase: {
            "fullBytes": metadata["rootBytes"] + metadata["directoryBytes"] + metadata["changeBytes"],
            "partition": metadata,
        },
    }
    histories = {}
    for case in plan["cases"]:
        decl = region["workloads"]["expanding" if case == "expanding" else "narrow"]
        questions, scoped, _ = regional.region_workload(adaptive, partition, manifest, root, lengths, decl)
        if case == "short":
            questions, scoped = questions[:plan["shortQuestions"]], scoped[:plan["shortQuestions"]]
        expanded_at = next((n for n, (arm, _) in enumerate(questions, 1) if arm["region"] != plan["scope"]), None)
        runs = {}
        for key, control in (("packed", "packed"), ("fixedPartition", purchase), ("missing", "adaptive"),
                             ("final", "adaptive"), ("expand", "adaptive")):
            hint, hint_bytes = route_hint(plan["scope"], key) if key in ("final", "expand") else (None, 0)
            regional_budget = {"index": purchase, "phases": scoped, "guard": False} if key == "expand" else None
            result = adaptive.run_stream(
                index, partition, persistence, scan, store, entry, manifest, candidates, questions, control,
                regional=regional_budget, postpone_in_region=hint["scope"] if key == "final" else None,
            )
            pricing = fee if regional_budget else 0
            runs[key] = {
                **result, "receivedHint": hint, "hintBytes": hint_bytes, "pricingBytes": pricing,
                "totalIncludingHint": result["totalBytes"] + pricing + hint_bytes,
                "hintAccurate": (key == "expand") == (expanded_at is not None) if hint else None,
            }
        # The narrow prefix contains all the facts the earlier policies had.
        if case in ("narrow", "expanding"):
            recorded = next(item for item in prior["workloads"] if item["workload"] == case)
            assert runs["missing"]["totalBytes"] == recorded["summary"]["wholeBudget"]["bytes"]
            assert runs["expand"]["totalBytes"] + fee == recorded["summary"]["regionBudget"]["bytes"]
        if expanded_at is not None and runs["final"]["switch"]:
            assert runs["final"]["switch"]["question"] >= expanded_at
        if expanded_at is None:
            assert runs["final"]["switch"] is None
        histories[case] = {"questions": len(questions), "observedExpansionAt": expanded_at, "runs": runs}

    for key in histories["narrow"]["runs"]:
        a = histories["narrow"]["runs"][key]["answers"]
        b = histories["expanding"]["runs"][key]["answers"]
        short = histories["short"]["runs"][key]["answers"]
        assert a == b[:len(a)] and short == a[:len(short)]
    narrow, expanding = (histories[case]["runs"] for case in ("narrow", "expanding"))
    loss_if_narrow = narrow["expand"]["totalIncludingHint"] - narrow["final"]["totalIncludingHint"]
    gain_if_expands = expanding["final"]["totalIncludingHint"] - expanding["expand"]["totalIncludingHint"]
    assert loss_if_narrow > 0 and gain_if_expands > 0
    return {
        "sources": [plan_pin, region_pin, prepared_pin, prior_pin, adaptive_pin, flat_pin, baseline_pin, partitions_pin],
        "sharedPrefixQuestions": histories["narrow"]["questions"],
        "workloads": histories,
        "conditionalCostComparison": {
            "extraBytesForExpandHintIfNarrow": loss_if_narrow,
            "bytesSavedByExpandHintIfExpanding": gain_if_expands,
            "expansionProbabilityBreakEven": loss_if_narrow / (loss_if_narrow + gain_if_expands),
            "scope": "Break-even compares the two received-hint policies between the narrow and expanding endings only. Endings and hints are replay interventions. The experiment supplies no probability that future streams expand.",
        },
        "authority": "Every computation uses the archived decoded trace and verified windows. Advisory hints affect read strategy only. Byte counts include encoded hint payload, pricing data when used, and verified representation reads.",
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("store", type=Path)
    args = parser.parse_args()
    regional = load_regional()
    adaptive = regional.load_adaptive()
    partition = adaptive.load_partition()
    index = partition.load_index()
    persistence = index.load_local("measure-parity-persistence")
    scan = persistence.load_scan()
    print(json.dumps(measure(regional, adaptive, partition, index, persistence, scan, args.store),
                     indent=2, allow_nan=False))
