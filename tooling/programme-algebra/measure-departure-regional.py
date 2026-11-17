"""Price only the verified index pages relevant to a declared window region."""

import argparse
import importlib.util
import json
from pathlib import Path
import struct


STEM = "departure-regional-budget"


def load_adaptive():
    path = Path(__file__).with_name("measure-departure-adaptive.py")
    spec = importlib.util.spec_from_file_location("departure_adaptive", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def prices_for_region(partition, manifest, root, lengths, packed_chunks, blocks):
    per_page = root["recordsPerPage"]
    pages = {block // per_page for block in blocks}
    directory_cost = sum(
        min(per_page, root["blocks"] - page * per_page) * partition.RECORD.size for page in pages
    )
    index_cap = root["rootBytes"] + directory_cost + sum(lengths[block] for block in blocks)
    return {
        "indexCap": index_cap, "packedChunks": {
            chunk: min(manifest["reader"]["chunkLabels"],
                       manifest["reader"]["traceLabels"] - chunk * manifest["reader"]["chunkLabels"])
            for chunk in packed_chunks
        },
        "directoryBytes": directory_cost, "changeBytes": sum(lengths[block] for block in blocks),
        "blocks": len(blocks), "directoryPages": len(pages),
    }


def region_workload(adaptive, partition, manifest, root, lengths, declaration):
    contexts = manifest["contexts"]
    width = manifest["chunkLabels"]
    block_width = root["blockLabels"]
    workload, per_question, phases = [], [], []
    packed, blocks = set(), set()
    for phase in declaration:
        if phase == "first-eighth":
            selected = adaptive.questions(contexts, "narrow-only")
        else:
            full = [arm for arm in contexts if arm["region"] == "trace-divided-by-1"]
            selected = adaptive.questions(full, "easy-prefix" if phase == "easy-full" else "mixed")
        for arm, _ in selected:
            for start in arm["starts"]:
                end = start + arm["steps"]
                packed.update(range((start + 1) // width, end // width + 1))
                blocks.update(range((start + 1) // block_width, end // block_width + 1))
        price = prices_for_region(partition, manifest, root, lengths, packed, blocks)
        per_question.extend([price] * len(selected))
        workload.extend(selected)
        phases.append({
            "name": phase, "queries": len(selected),
            **{key: value for key, value in price.items() if key != "packedChunks"},
            "packedFootprint": sum(price["packedChunks"].values()),
        })
    return workload, per_question, phases


def root_for(persistence, store, item):
    stem = f"{item['trace']}-changes-{item['blockLabels']}"
    raw = (store / f"{stem}.root").read_bytes()
    if persistence.sha(raw) != item["rootSha256"] or len(raw) != item["rootBytes"]:
        raise ValueError("Partition root changed")
    return stem, {**json.loads(raw), "rootBytes": len(raw)}


def prepare(partition, persistence, store, metadata, sources):
    stem, root = root_for(persistence, store, metadata)
    with (store / f"{stem}.dir").open("rb", buffering=0) as directory:
        reader = partition.PartitionReader(root, directory, None, persistence.sha)
        lengths = [2 * reader.lookup(block)[1] for block in range(root["blocks"])]
    assert sum(lengths) == metadata["changeBytes"] and reader.directory_bytes == metadata["directoryBytes"]
    raw = struct.pack(f"<{len(lengths)}H", *lengths)
    (store / f"{stem}.prices").write_bytes(raw)
    return {
        "sources": sources, "rootSha256": metadata["rootSha256"], "priceTableSha256": persistence.sha(raw),
        "priceTableBytes": len(raw),
        "geometry": {key: root[key] for key in (
            "labels", "blockLabels", "recordsPerPage", "blocks", "rootBytes", "sourceTraceSha256"
        )},
    }


def prices(persistence, raw, receipt):
    if persistence.sha(raw) != receipt["priceTableSha256"] or len(raw) != receipt["priceTableBytes"]:
        raise ValueError("Price table changed")
    return struct.unpack(f"<{receipt['geometry']['blocks']}H", raw)


def measure(adaptive, partition, index, persistence, scan, store, plan, baseline, entry, metadata, receipt_path, sources):
    raw_receipt = receipt_path.read_bytes()
    receipt = json.loads(raw_receipt)
    assert receipt["sources"] == sources and receipt["rootSha256"] == metadata["rootSha256"]
    stem = f"{metadata['trace']}-changes-{metadata['blockLabels']}"
    root = receipt["geometry"]
    assert (root["blockLabels"], root["rootBytes"]) == (metadata["blockLabels"], metadata["rootBytes"])
    name, manifest = partition.load_trace(persistence, store, entry)
    assert root["sourceTraceSha256"] == manifest["sourceTraceSha256"] and root["labels"] == manifest["labels"]
    raw_prices = (store / f"{stem}.prices").read_bytes()
    lengths = prices(persistence, raw_prices, receipt)
    assert len(lengths) == root["blocks"] and sum(lengths) == metadata["changeBytes"]
    pricing = len(raw_prices) + len(raw_receipt)
    changed = bytes([raw_prices[0] ^ 1]) + raw_prices[1:]
    try:
        prices(persistence, changed, receipt)
    except ValueError as exc:
        assert str(exc) == "Price table changed"
    else:
        raise AssertionError("Changed prices must be refused")
    purchase = f"partition-{metadata['blockLabels']}"
    candidates = {
        "flat": {"fullBytes": baseline["indexBytes"] + baseline["additionalIndexProofBytesOncePerInvocation"]},
        purchase: {
            "fullBytes": metadata["rootBytes"] + metadata["directoryBytes"] + metadata["changeBytes"],
            "partition": metadata,
        },
    }
    results = []
    for label, declaration in plan["workloads"].items():
        workload, scoped, phases = region_workload(adaptive, partition, manifest, root, lengths, declaration)
        assert scoped and all(a["indexCap"] <= b["indexCap"] for a, b in zip(scoped, scoped[1:]))
        runs = {}
        for policy, mode in (("packed", "packed"), ("fixedPartition", purchase), ("wholeBudget", "adaptive"),
                             ("regionBudget", "adaptive"), ("regionGuard", "adaptive")):
            regional = policy in ("regionBudget", "regionGuard")
            scope = {"index": purchase, "phases": scoped, "guard": policy == "regionGuard"} if regional else None
            run = adaptive.run_stream(
                index, partition, persistence, scan, store, entry, manifest, candidates, workload, mode, regional=scope
            )
            run["pricingBytes"] = pricing if regional else 0
            run["includingPricingBytes"] = run["totalBytes"] + run["pricingBytes"]
            runs[policy] = run
        packed = runs["packed"]["totalBytes"]
        for key in ("regionBudget", "regionGuard"):
            run = runs[key]
            cap = phases[-1]["indexCap"]
            if run["switch"]:
                bound = run["packedBytes"] + cap
                if key == "regionBudget":
                    assert run["packedBytes"] <= run["switch"]["regionalCapAtSwitch"]
            else:
                assert run["totalBytes"] == packed
                bound = packed
            assert run["totalBytes"] <= bound
            if len(phases) == 1:
                assert run["totalBytes"] <= 2 * min(packed, cap)
            run["verifiedUpperBoundBeforePricing"] = bound
        results.append({
            "workload": label, "phases": phases, "queries": len(workload),
            "summary": {key: {"bytes": row["includingPricingBytes"], "switch": row["switch"]} for key, row in runs.items()},
            "runs": runs,
        })
    narrow = next(workload for workload in results if workload["workload"] == "narrow")
    expanding = next(workload for workload in results if workload["workload"] == "expanding")
    for policy in plan["policies"]:
        assert narrow["runs"][policy]["answers"] == expanding["runs"][policy]["answers"][:narrow["queries"]]
    return {
        "sources": sources, "priceReceiptSha256": persistence.sha(raw_receipt),
        "pricingBytes": {"table": len(raw_prices), "bindingReceipt": len(raw_receipt)},
        "control": "Changed price table refused", "trace": name, "workloads": results,
        "sharedPrefix": {
            "questions": narrow["queries"], "narrowOnly": "stops after the prefix",
            "expanding": "announces the full-trace region after the prefix",
            "verified": "All policies execute identical representation choices and decisions on the shared prefix.",
        },
        "authority": "Index caps use only declared window positions and verified block lengths. Prepared-file application bytes include representation proof and price verification. Scope changes share live caches and preserve verified window decisions.",
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("store", type=Path)
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--prepare", action="store_true")
    mode.add_argument("--measure", type=Path, metavar="TRUSTED_PRICE_RECEIPT")
    args = parser.parse_args()
    adaptive = load_adaptive()
    partition = adaptive.load_partition()
    index = partition.load_index()
    persistence = index.load_local("measure-parity-persistence")
    scan = persistence.load_scan()
    plan, plan_pin = scan.record(STEM + "-plan.json")
    adaptive_plan, adaptive_pin = scan.record("departure-adaptive-scan-plan.json", plan["adaptivePlanSha256"])
    previous, previous_pin = scan.record("departure-adaptive-scan-replay.json", plan["adaptiveReplaySha256"])
    flat, flat_pin = scan.record("departure-change-index-prepared.json", adaptive_plan["flatPreparedSha256"])
    oracle, oracle_pin = scan.record("departure-change-index-replay.json", adaptive_plan["flatReplaySha256"])
    partitions, partition_pin = scan.record(
        "departure-change-partition-prepared.json", adaptive_plan["partitionPreparedSha256"]
    )
    assert all(pin in previous["sources"] for pin in (adaptive_pin, flat_pin, oracle_pin, partition_pin))
    sources = [plan_pin, previous_pin, flat_pin, oracle_pin, partition_pin]
    entry = next(item for item in flat["traces"] if item["trace"] == plan["trace"])
    metadata = next(item for item in partitions["partitions"]
                    if item["trace"] == plan["trace"] and item["blockLabels"] == plan["partitionLabels"])
    baseline = next(item for item in oracle["traces"] if item["trace"] == plan["trace"])
    if args.prepare:
        result = prepare(partition, persistence, args.store, metadata, sources)
    else:
        result = measure(adaptive, partition, index, persistence, scan, args.store, plan, baseline,
                         entry, metadata, args.measure, sources)
    print(json.dumps(result, indent=2, allow_nan=False))
