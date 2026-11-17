"""Compare packed-label scans with a verified index of decoded changes."""

import argparse
from bisect import bisect_right
import importlib.util
import json
from pathlib import Path
import struct


STEM = "departure-change-index"
SCHEDULE = ("endpoint", 1)


def load_local(name):
    path = Path(__file__).with_name(name + ".py")
    spec = importlib.util.spec_from_file_location(name.replace("-", "_"), path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def inputs(scan):
    plan, plan_pin = scan.record(STEM + "-plan.json")
    filenames = {
        "parity": "return-path-parity-plan.json",
        "parityOverlap": "parity-departure-overlap-replay.json",
        "parityBitSource": "parity-departure-bit-source-replay.json",
        "delft": "return-path-delft-plan.json",
        "delftCalibration": "return-path-delft-calibration.json",
        "delftScore": "return-path-delft-qualification-result.json",
    }
    entries = {name: scan.record(path, plan["pins"][name]) for name, path in filenames.items()}
    return plan, {name: data for name, (data, _) in entries.items()}, [plan_pin, *(pin for _, pin in entries.values())]


def context(labels, steps, phase, level, limit, thresholds, region):
    starts = [i for i in range(phase, limit - steps, steps + 1) if labels[i] == level]
    count = len(starts)
    assert count
    queries = list(range(1, count + 1)) if thresholds is None else sorted(
        {1, *((count * q + 3) // 4 for q in thresholds)}
    )
    return {
        "region": region, "initial": level, "steps": steps, "phase": phase, "starts": starts, "thresholds": queries,
        "exactDepartures": sum(any(labels[j] != level for j in range(i + 1, i + steps + 1)) for i in starts),
        "exactEndpoints": sum(labels[i + steps] != level for i in starts),
    }


def parity_trace(scan, archive, data):
    labels, levels, digest = scan.read_trace(archive, data["parity"]["trace"])
    labels = bytes(levels.index(value) for value in labels)
    prior = data["parityOverlap"]
    assert prior["traceSha256"] == digest
    contexts = {}
    for row in prior["rows"]:
        level = levels.index(row["initialLabel"])
        key = (row["steps"], row["phase"], level)
        if key not in contexts:
            contexts[key] = context(labels, *key, len(labels), None, "full-trace")
        arm = contexts[key]
        assert arm["exactDepartures"] == row["firstObservedDepartures"] and len(arm["starts"]) == row["windows"]
    return labels, digest, list(contexts.values())


def delft_trace(directory, data, selection):
    audit = load_local("audit-return-path")
    source, labels = next(audit.iq_score_labels(
        data["delft"], directory, data["delftCalibration"], [selection["replicate"]]
    ))
    original = data["delftScore"]["held"][0]
    assert source == original["acquisition"]
    labels = bytes(labels)
    assert selection["includeOne"] is True
    contexts = [
        context(labels, selection["windowSteps"], phase, level, len(labels) // divisor,
                selection["thresholdQuarters"], f"trace-divided-by-{divisor}")
        for divisor in selection["regionDivisors"] for phase in selection["phases"] for level in (0, 1)
    ]
    for arm in contexts:
        if arm["region"] == "trace-divided-by-1" and arm["phase"] == 0:
            observed = {row["target"]: row for row in original["comparisons"]
                        if row["stride"] == 1 and row["startLevel"] == arm["initial"]}
            for target, count_field in (("changed-endpoint-probability", "exactEndpoints"),
                                        ("first-observed-exit-probability", "exactDepartures")):
                comparator = observed[target]
                assert comparator["windows"] == len(arm["starts"])
                assert comparator["observed"] == arm[count_field] / comparator["windows"]
    return labels, source["sha256"], contexts


def pack_trace(persistence, store, name, labels, digest, contexts, width):
    if width % 8 or not labels or set(labels).difference((0, 1)):
        raise ValueError("Need binary labels and byte-aligned chunks")
    changes = [i for i in range(1, len(labels)) if labels[i - 1] != labels[i]]
    label = labels[0]
    previous = 0
    for end in [*changes, len(labels)]:
        assert labels[previous:end] == bytes([label]) * (end - previous)
        label ^= 1
        previous = end
    word = "H" if len(labels) <= 65536 else "I"
    index = struct.pack(f"<{len(changes)}{word}", *changes)
    index_record = {
        "sourceTraceSha256": digest, "positions": len(changes), "wordFormat": word,
        "sha256": persistence.sha(index), "bytes": len(index),
    }
    index_bytes = persistence.json_bytes(index_record)
    chunks = []
    for start in range(0, len(labels), width):
        values = labels[start:start + width]
        bits = sum(value << i for i, value in enumerate(values))
        chunks.append(bits.to_bytes((len(values) + 7) // 8, "little"))
    packed = b"".join(chunks)
    manifest = {
        "sourceTraceSha256": digest, "labels": len(labels), "chunkLabels": width, "contexts": contexts,
        "reader": {
            "traceLabels": len(packed), "chunkLabels": width // 8,
            "chunkSha256": [persistence.sha(block) for block in chunks],
        },
    }
    metadata = persistence.json_bytes(manifest)
    (store / f"{name}-packed.bin").write_bytes(packed)
    (store / f"{name}-changes.bin").write_bytes(index)
    (store / f"{name}-manifest.json").write_bytes(metadata)
    (store / f"{name}-changes.json").write_bytes(index_bytes)
    return {
        "trace": name, "sourceTraceSha256": digest, "manifestSha256": persistence.sha(metadata),
        "indexRecordSha256": persistence.sha(index_bytes), "announcedIndexBytes": len(index),
    }


def verified_positions(persistence, index, proof, labels):
    if persistence.sha(index) != proof["sha256"] or len(index) != proof["bytes"]:
        raise ValueError("Change index changed")
    positions = struct.unpack(f"<{proof['positions']}{proof['wordFormat']}", index)
    if any(a >= b for a, b in zip(positions, positions[1:])) or any(not 0 < i < labels for i in positions):
        raise ValueError("Change positions are outside the valid ordered trace")
    return positions


def indexed_decision(positions, arm, threshold, resolved=None):
    def has_change(start, end):
        after = bisect_right(positions, start)
        return after < len(positions) and positions[after] <= end

    return change_decision(has_change, arm, threshold, resolved)


def change_decision(has_change, arm, threshold, resolved=None):
    starts, steps = arm["starts"], arm["steps"]
    resolved = {} if resolved is None else resolved
    lower = sum(resolved.values())
    upper = len(starts) - len(resolved) + lower
    if lower >= threshold or upper < threshold:
        return lower >= threshold, (lower, upper)
    for start in starts:
        if start in resolved:
            continue
        if has_change(start, start + steps):
            lower += 1
        else:
            upper -= 1
        if lower >= threshold or upper < threshold:
            return lower >= threshold, (lower, upper)
    raise AssertionError("Every window has an exact answer")


def packed_decision(scan, reader, arm, threshold):
    def label(index):
        byte, bit = divmod(index, 8)
        return (reader.read(byte) >> bit) & 1

    evidence = scan.DepartureEvidence.from_verified_windows(
        label, arm["starts"], arm["steps"], arm["initial"], SCHEDULE, {}
    )
    reply = evidence.decide(threshold)
    return reply["meetsThreshold"], tuple(reply["countBounds"])


def packed_chunks(manifest, arm):
    width = manifest["chunkLabels"]
    chunks = {chunk for start in arm["starts"]
              for chunk in range((start + 1) // width, (start + arm["steps"]) // width + 1)}
    return {chunk: (min(width, manifest["labels"] - chunk * width) + 7) // 8 for chunk in chunks}


def packed_footprint(manifest, arm):
    return sum(packed_chunks(manifest, arm).values())


def evaluate_trace(persistence, scan, store, entry, data):
    name = entry["trace"]
    manifest_raw = (store / f"{name}-manifest.json").read_bytes()
    proof_raw = (store / f"{name}-changes.json").read_bytes()
    if persistence.sha(manifest_raw) != entry["manifestSha256"] or persistence.sha(proof_raw) != entry["indexRecordSha256"]:
        raise ValueError("Trusted trace metadata changed")
    manifest, proof = json.loads(manifest_raw), json.loads(proof_raw)
    assert manifest["sourceTraceSha256"] == proof["sourceTraceSha256"] == entry["sourceTraceSha256"]
    assert proof["bytes"] == entry["announcedIndexBytes"]
    source_path = store / f"{name}-packed.bin"
    index_path = store / f"{name}-changes.bin"
    packed = manifest["reader"]
    rows = []
    prior = {(row["steps"], row["phase"], row["initialLabel"], row["threshold"]): result
             for row, result in zip(data["parityOverlap"]["rows"], data["parityBitSource"]["rows"], strict=True)}
    for arm in manifest["contexts"]:
        footprint = packed_footprint(manifest, arm)
        for threshold in arm["thresholds"]:
            with source_path.open("rb", buffering=0) as stream:
                reader = persistence.ChunkReader(stream, packed)
                cold, cold_bounds = packed_decision(scan, reader, arm, threshold)
            payload = index_path.read_bytes()
            positions = verified_positions(persistence, payload, proof, manifest["labels"])
            indexed, indexed_bounds = indexed_decision(positions, arm, threshold)
            exact = arm["exactDepartures"]
            assert cold == indexed == (exact >= threshold)
            assert cold_bounds[0] <= exact <= cold_bounds[1] and indexed_bounds[0] <= exact <= indexed_bounds[1]
            if name == "parity":
                levels = sorted({row["initialLabel"] for row in data["parityOverlap"]["rows"]})
                key = (arm["steps"], arm["phase"], levels[arm["initial"]], threshold)
                assert reader.bytes == prior[key]["policies"]["cold"]["payloadBytes"]
                assert list(cold_bounds) == prior[key]["policies"]["cold"]["bounds"]
            use_index = entry["announcedIndexBytes"] < footprint
            rows.append({
                "region": arm["region"], "steps": arm["steps"], "initial": arm["initial"], "phase": arm["phase"],
                "threshold": threshold, "answer": cold, "exactDepartures": exact, "windows": len(arm["starts"]),
                "packedFootprint": footprint, "coldBytes": reader.bytes, "indexBytes": len(payload),
                "sizeGuard": "index" if use_index else "cold",
                "sizeGuardBytes": len(payload) if use_index else reader.bytes,
            })
    batches = []
    for region in dict.fromkeys(arm["region"] for arm in manifest["contexts"]):
        with source_path.open("rb", buffering=0) as stream:
            reader = persistence.ChunkReader(stream, packed)
            for arm in (item for item in manifest["contexts"] if item["region"] == region):
                for threshold in arm["thresholds"]:
                    assert packed_decision(scan, reader, arm, threshold)[0] == (arm["exactDepartures"] >= threshold)
        payload = index_path.read_bytes()
        positions = verified_positions(persistence, payload, proof, manifest["labels"])
        for arm in (item for item in manifest["contexts"] if item["region"] == region):
            for threshold in arm["thresholds"]:
                assert indexed_decision(positions, arm, threshold)[0] == (arm["exactDepartures"] >= threshold)
        regional = [row for row in rows if row["region"] == region]
        batches.append({
            "region": region, "queries": len(regional),
            "coldPayloadPerQuerySummed": sum(row["coldBytes"] for row in regional),
            "flatIndexPayloadPerQuerySummed": sum(row["indexBytes"] for row in regional),
            "sizeGuardPayloadPerQuerySummed": sum(row["sizeGuardBytes"] for row in regional),
            "flatIndexWinsPerQuery": sum(row["indexBytes"] < row["coldBytes"] for row in regional),
            "guardColdChoices": sum(row["sizeGuard"] == "cold" for row in regional),
            "sharedColdPayload": reader.bytes, "sharedIndexPayload": len(payload),
        })
    damaged = bytearray(payload)
    damaged[0] ^= 1
    try:
        verified_positions(persistence, damaged, proof, manifest["labels"])
    except ValueError as exc:
        assert str(exc) == "Change index changed"
    else:
        raise AssertionError("Damaged change index must be refused")
    return {
        "trace": name, "labels": manifest["labels"], "changes": proof["positions"],
        "packedTraceBytes": packed["traceLabels"], "indexBytes": proof["bytes"],
        "commonManifestBytes": len(manifest_raw), "additionalIndexProofBytesOncePerInvocation": len(proof_raw),
        "control": "changed index bytes refused", "batches": batches, "rows": rows,
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("store", type=Path)
    parser.add_argument("--parity-archive", type=Path)
    parser.add_argument("--delft-dir", type=Path)
    parser.add_argument("--measure", type=Path, metavar="TRUSTED_RECEIPT")
    args = parser.parse_args()
    persistence = load_local("measure-parity-persistence")
    scan = persistence.load_scan()
    plan, data, sources = inputs(scan)
    if args.measure:
        receipt_bytes = args.measure.read_bytes()
        receipt = json.loads(receipt_bytes)
        assert receipt["sources"] == sources
        output = {
            "sources": sources, "preparationReceiptSha256": persistence.sha(receipt_bytes),
            "operation": {
                "id": "resolved-labels/observed-departure-from-next-change",
                "inputType": "verified-complete-change-positions-and-fixed-window-starts",
                "outputType": "observed-departure-count-at-least-threshold",
                "condition": "The index covers the same immutable decoded trace and base grid as the windows.",
                "calculation": "For each window, find the first change strictly after its start. A departure occurred on the base grid if that change is at or before the endpoint. Accumulate count bounds.",
                "costBoundary": "Compare the full verified index payload to the relevant packed-source footprint and account for invocation reuse.",
            },
            "traces": [evaluate_trace(persistence, scan, args.store, entry, data) for entry in receipt["traces"]],
            "authority": "Decoded label changes in two archived traces. Counters measure application reads from prepared files. Each trace charges its additional index proof once per invocation.",
        }
    elif args.parity_archive and args.delft_dir:
        args.store.mkdir(parents=True, exist_ok=True)
        prepared = [
            ("parity", parity_trace(scan, args.parity_archive, data)),
            ("delft", delft_trace(args.delft_dir, data, plan["delftQueries"])),
        ]
        output = {
            "sources": sources,
            "traces": [pack_trace(persistence, args.store, name, *trace, plan["chunkLabels"])
                       for name, trace in prepared],
        }
    else:
        parser.error("Prepare with both --parity-archive and --delft-dir, or provide --measure.")
    print(json.dumps(output, indent=2, allow_nan=False))
