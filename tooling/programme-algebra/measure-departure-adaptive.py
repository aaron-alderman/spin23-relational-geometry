"""Switch from verified source chunks to an index at a known byte budget."""

import argparse
from contextlib import ExitStack
from itertools import zip_longest
import importlib.util
import json
from pathlib import Path


STEM = "departure-adaptive-scan"


def load_partition():
    path = Path(__file__).with_name("measure-departure-change-partition.py")
    spec = importlib.util.spec_from_file_location("change_partition", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class SwitchRepresentation(Exception):
    pass


def questions(contexts, scope):
    arms = contexts
    if scope == "narrow-only":
        arms = [arm for arm in arms if arm["region"] == "trace-divided-by-8"]
    threshold_lists = [arm["thresholds"][:1] if scope == "easy-prefix" else arm["thresholds"] for arm in arms]
    return [
        (arm, threshold)
        for column in zip_longest(*threshold_lists)
        for arm, threshold in zip(arms, column, strict=True)
        if threshold is not None
    ]


def run_stream(index, partition, persistence, scan, store, entry, manifest, candidates, workload, policy, *,
               regional=None, postpone_in_region=None):
    name = entry["trace"]
    packed = manifest["reader"]
    purchase = min(candidates, key=lambda key: candidates[key]["fullBytes"]) if regional is None else regional["index"]
    cap = candidates[purchase]["fullBytes"]
    active = "packed" if policy == "adaptive" else policy
    source = None
    positions = None
    indexed = None
    proof_cost = flat_cost = carried = 0
    switched = None
    guard_declines = {}
    rows = []
    with ExitStack() as stack:
        if active == "packed":
            file = stack.enter_context((store / f"{name}-packed.bin").open("rb", buffering=0))
            source = persistence.ChunkReader(file, packed)

        def read(index_):
            byte, bit = divmod(index_, 8)
            chunk = byte // packed["chunkLabels"]
            if policy == "adaptive" and chunk not in source.cache and arm["region"] != postpone_in_region:
                size = min(packed["chunkLabels"], packed["traceLabels"] - chunk * packed["chunkLabels"])
                current_cap = cap if regional is None else regional["phases"][ordinal - 1]["indexCap"]
                if source.bytes + size > current_cap:
                    if regional is None or not regional["guard"]:
                        raise SwitchRepresentation()
                    footprint = regional["phases"][ordinal - 1]["packedChunks"]
                    remaining = sum(bytes_ for page, bytes_ in footprint.items() if page not in source.cache)
                    if remaining > current_cap:
                        raise SwitchRepresentation()
                    guard_declines.setdefault(current_cap, {
                        "question": ordinal, "packedBytesSpent": source.bytes,
                        "unreadPackedFootprint": remaining, "regionalCap": current_cap,
                    })
            return (source.read(byte) >> bit) & 1

        def answer_with_index(arm, threshold, resolved):
            nonlocal positions, indexed, proof_cost, flat_cost
            if active == "flat":
                if positions is None:
                    raw = (store / f"{name}-changes.json").read_bytes()
                    assert persistence.sha(raw) == entry["indexRecordSha256"]
                    payload = (store / f"{name}-changes.bin").read_bytes()
                    positions = index.verified_positions(persistence, payload, json.loads(raw), manifest["labels"])
                    proof_cost, flat_cost = len(raw), len(payload)
                return index.indexed_decision(positions, arm, threshold, resolved=resolved)
            if indexed is None:
                metadata = candidates[active]["partition"]
                stem = f"{name}-changes-{metadata['blockLabels']}"
                raw = (store / f"{stem}.root").read_bytes()
                assert persistence.sha(raw) == metadata["rootSha256"]
                root = json.loads(raw)
                assert root["sourceTraceSha256"] == manifest["sourceTraceSha256"]
                directory = stack.enter_context((store / f"{stem}.dir").open("rb", buffering=0))
                payload = stack.enter_context((store / f"{stem}.bin").open("rb", buffering=0))
                indexed = partition.PartitionReader(root, directory, payload, persistence.sha)
                proof_cost = len(raw)
            return index.change_decision(indexed.has_change, arm, threshold, resolved)

        for ordinal, (arm, threshold) in enumerate(workload, 1):
            if postpone_in_region is not None and arm["region"] != postpone_in_region:
                postpone_in_region = None
            if active == "packed":
                scan_state = scan.DepartureEvidence.from_verified_windows(
                    read, arm["starts"], arm["steps"], arm["initial"], index.SCHEDULE, {}
                )
                try:
                    result = scan_state.decide(threshold)
                except SwitchRepresentation:
                    active = purchase
                    resolved = scan_state.resolved_windows()
                    carried = len(resolved)
                    switched = {
                        "question": ordinal, "representation": active, "packedBytesSpent": source.bytes,
                        "carriedDepartureWitnesses": sum(resolved.values()),
                        "carriedCompleteAbsences": len(resolved) - sum(resolved.values()),
                    }
                    if regional is not None:
                        switched["regionalCapAtSwitch"] = regional["phases"][ordinal - 1]["indexCap"]
                    answer, bounds = answer_with_index(arm, threshold, resolved)
                else:
                    answer, bounds = result["meetsThreshold"], result["countBounds"]
            else:
                answer, bounds = answer_with_index(arm, threshold, None)
            actual = arm["exactDepartures"]
            assert answer == (actual >= threshold) and bounds[0] <= actual <= bounds[1]
            if regional is not None and indexed is not None:
                assert indexed.work()["totalBytes"] + proof_cost <= regional["phases"][ordinal - 1]["indexCap"]
            rows.append({"active": active, "answer": answer, "bounds": list(bounds)})
        packed_cost = source.bytes if source is not None else 0
        index_work = indexed.work() if indexed is not None else {"totalBytes": flat_cost}
        index_cost = index_work["totalBytes"] + proof_cost
        if active in candidates:
            assert index_cost <= candidates[active]["fullBytes"]
        return {
            "packedBytes": packed_cost, "indexProofBytes": proof_cost, "indexDataAndDirectoryBytes": index_work["totalBytes"],
            "totalBytes": packed_cost + index_cost,
            "announcedPurchaseCap": (cap if regional is None else regional["phases"][-1]["indexCap"])
            if policy == "adaptive" else None,
            "switch": switched, "windowDecisionsCarried": carried, "answers": rows,
            **({"guardDeclines": list(guard_declines.values())} if regional is not None and regional["guard"] else {}),
        }


def replay(index, partition, persistence, scan, store, plan, flat, baseline, prepared):
    results = []
    for entry in flat["traces"]:
        name, manifest = partition.load_trace(persistence, store, entry)
        oracle = next(trace for trace in baseline["traces"] if trace["trace"] == name)
        candidates = {"flat": {"fullBytes": oracle["indexBytes"] + oracle["additionalIndexProofBytesOncePerInvocation"]}}
        for item in prepared["partitions"]:
            if item["trace"] == name:
                candidates[f"partition-{item['blockLabels']}"] = {
                    "fullBytes": item["rootBytes"] + item["directoryBytes"] + item["changeBytes"], "partition": item,
                }
        cases = []
        for scope in plan["streams"]:
            workload = questions(manifest["contexts"], scope)
            if not workload:
                continue
            strategies = {
                policy: run_stream(index, partition, persistence, scan, store, entry, manifest, candidates, workload, policy)
                for policy in ["packed", *candidates, "adaptive"]
            }
            adaptive = strategies["adaptive"]
            cap = adaptive["announcedPurchaseCap"]
            packed = strategies["packed"]["totalBytes"]
            bound = 2 * min(packed, cap)
            assert adaptive["totalBytes"] <= bound
            if adaptive["switch"]:
                assert adaptive["packedBytes"] <= cap < packed
            else:
                assert adaptive["totalBytes"] == packed
            fixed = {key: result["totalBytes"] for key, result in strategies.items() if key != "adaptive"}
            best = min(fixed, key=fixed.get)
            cases.append({
                "scope": scope, "questions": len(workload), "fixedBytes": fixed, "bestFixed": best,
                "adaptiveBytes": adaptive["totalBytes"], "adaptiveCapBound": bound,
                "selectedIndexCap": cap, "switch": adaptive["switch"], "runs": strategies,
            })
        results.append({"trace": name, "streams": cases})
    return results


def verify_handoff(index, scan):
    labels = (0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1)
    arm = {"starts": [0, 3, 6, 9], "steps": 2}

    def read(sample):
        if sample == 7:
            raise SwitchRepresentation()
        return labels[sample]

    state = scan.DepartureEvidence.from_verified_windows(read, arm["starts"], 2, 0, index.SCHEDULE, {})
    try:
        state.decide(3)
    except SwitchRepresentation:
        carried = state.resolved_windows()
    else:
        raise AssertionError("Expected handoff in the unfinished window")
    assert carried == {0: True, 9: True, 3: False}
    visited = []

    def has_change(start, end):
        visited.append(start)
        return any(labels[i] != labels[start] for i in range(start + 1, end + 1))

    assert index.change_decision(has_change, arm, 3, carried) == (False, (2, 2))
    assert visited == [6]
    return {"carriedWitnesses": 2, "carriedCompleteAbsences": 1, "revisitedUnresolvedWindows": visited}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("store", type=Path)
    args = parser.parse_args()
    partition = load_partition()
    index = partition.load_index()
    persistence = index.load_local("measure-parity-persistence")
    scan = persistence.load_scan()
    plan, plan_pin = scan.record(STEM + "-plan.json")
    flat, flat_pin = scan.record("departure-change-index-prepared.json", plan["flatPreparedSha256"])
    baseline, baseline_pin = scan.record("departure-change-index-replay.json", plan["flatReplaySha256"])
    prepared, prepared_pin = scan.record("departure-change-partition-prepared.json", plan["partitionPreparedSha256"])
    _, partition_pin = scan.record("departure-change-partition-replay.json", plan["partitionReplaySha256"])
    assert baseline["preparationReceiptSha256"] == flat_pin["sha256"]
    result = {
        "sources": [plan_pin, flat_pin, baseline_pin, prepared_pin, partition_pin],
        "operation": {
            "id": "verified-reads/switch-at-announced-index-budget",
            "condition": "One immutable trace, fixed window identity within a question, shared representation caches within the stream, and an authenticated upper bound on index purchase bytes.",
            "calculation": "Start packed. Switch before the next new packed chunk would exceed the cheapest announced cap. Preserve certified windows and use the verified index for the unresolved ones.",
            "bound": "At most twice the minimum of the packed stream cost and the announced index cap. The actual best partition may read a strict subset of its announced cap.",
        },
        "handoffControl": verify_handoff(index, scan),
        "traces": replay(index, partition, persistence, scan, args.store, plan, flat, baseline, prepared),
        "authority": "Work starts with trusted preparation descriptors and window manifests loaded. Representation proof and payload bytes count. The two-times bound uses the smallest announced whole-index cost cap and the packed streaming cost. The cheapest actual fixed stream is reported separately.",
    }
    print(json.dumps(result, indent=2, allow_nan=False))
