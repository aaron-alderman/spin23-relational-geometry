"""Test whether persisted parity observations save verified file reads."""

import argparse
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import struct
from tempfile import TemporaryFile


SAMPLE = struct.Struct("<IB")
STEM = "parity-departure"


def sha(data):
    return hashlib.sha256(data).hexdigest()


def json_bytes(value):
    return (json.dumps(value, indent=2, allow_nan=False) + "\n").encode("utf-8")


def load_scan():
    spec = importlib.util.spec_from_file_location(
        "parity_scan", Path(__file__).with_name("compare-parity-thresholds.py")
    )
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class ChunkReader:
    def __init__(self, stream, manifest):
        self.stream = stream
        self.manifest = manifest
        self.cache = {}
        self.reads = 0
        self.bytes = 0
        if os.fstat(stream.fileno()).st_size != manifest["traceLabels"]:
            raise ValueError("Packed trace length changed")

    def read(self, index):
        manifest = self.manifest
        if not 0 <= index < manifest["traceLabels"]:
            raise ValueError("Sample index outside packed trace")
        chunk, offset = divmod(index, manifest["chunkLabels"])
        if chunk not in self.cache:
            start = chunk * manifest["chunkLabels"]
            count = min(manifest["chunkLabels"], manifest["traceLabels"] - start)
            self.stream.seek(start)
            data = self.stream.read(count)
            self.reads += 1
            self.bytes += len(data)
            if len(data) != count or sha(data) != manifest["chunkSha256"][chunk]:
                raise ValueError("Packed chunk changed")
            self.cache[chunk] = data
        return self.cache[chunk][offset]


def restore_samples(payload, record, reader, policy):
    if len(payload) != record["bytes"] or len(payload) % SAMPLE.size:
        raise ValueError("Saved sample length changed")
    if policy == "pinned" and sha(payload) != record["sha256"]:
        raise ValueError("Saved samples changed")
    samples = {}
    for index, label in SAMPLE.iter_unpack(payload):
        if index in samples or index >= reader.manifest["traceLabels"] or label not in (0, 1):
            raise ValueError("Invalid saved sample")
        if policy == "rechecked" and reader.read(index) != label:
            raise ValueError("Saved sample differs from source")
        samples[index] = label
    return samples


def references(scan):
    plan, plan_pin = scan.record(STEM + "-persistence-plan.json")
    parity, parity_pin = scan.record("return-path-parity-plan.json", plan["parityPlanSha256"])
    overlap, overlap_pin = scan.record(STEM + "-overlap-replay.json", plan["overlapReplaySha256"])
    return plan, parity, overlap, [plan_pin, parity_pin, overlap_pin]


def prepare(scan, archive, store, plan, parity, overlap, sources):
    labels, levels, digest = scan.read_trace(archive, parity["trace"])
    if digest != overlap["traceSha256"]:
        raise ValueError("Wrong trace for overlap replay")
    packed = bytes(levels.index(label) for label in labels)
    labels = tuple(packed)
    schedule = ["endpoint", 1]
    width = plan["chunkLabels"]
    contexts = []
    payloads = []
    for entry in overlap["sourceQuestions"]:
        initial = levels.index(entry["initialLabel"])
        steps, starts = entry["steps"], entry["starts"]
        samples = scan.SampleEvidence(labels)
        result = scan.DepartureEvidence(labels, starts, steps, initial, schedule, samples=samples).decide(entry["threshold"])
        assert result == entry["certificate"]
        payloads.append(b"".join(SAMPLE.pack(index, label) for index, label in sorted(samples.observations().items())))
        contexts.append({
            "steps": steps, "initial": initial,
            "starts": {
                str(phase): [i for i in range(phase, len(labels) - steps, steps + 1) if labels[i] == initial]
                for phase in (1, steps // 2)
            },
        })
    manifest = {
        "sourceTraceSha256": digest, "levels": levels, "traceLabels": len(labels), "chunkLabels": width,
        "chunkSha256": [sha(packed[i:i + width]) for i in range(0, len(labels), width)],
        "contexts": contexts, "schedule": schedule,
    }
    manifest_bytes = json_bytes(manifest)
    store.mkdir(parents=True, exist_ok=True)
    (store / "trace.bin").write_bytes(packed)
    (store / "manifest.json").write_bytes(manifest_bytes)
    saved = []
    for index, payload in enumerate(payloads):
        name = f"samples-{index}.bin"
        (store / name).write_bytes(payload)
        saved.append({"file": name, "bytes": len(payload), "sha256": sha(payload)})
    return {
        "sources": sources, "traceSha256": digest, "manifestSha256": sha(manifest_bytes),
        "packedTraceBytes": len(packed), "manifestBytes": len(manifest_bytes), "samplePayloads": saved,
    }


def answer(scan, store, manifest, receipt, context_index, phase, threshold, policy):
    context = manifest["contexts"][context_index]
    starts = context["starts"][str(phase)]
    payload_bytes = 0
    with (store / "trace.bin").open("rb", buffering=0) as stream:
        reader = ChunkReader(stream, manifest)
        samples = {}
        if policy != "cold":
            record = receipt["samplePayloads"][context_index]
            payload = (store / record["file"]).read_bytes()
            payload_bytes = len(payload)
            samples = restore_samples(payload, record, reader, policy)
        verification_reads = reader.reads

        def read(index):
            return samples[index] if index in samples else reader.read(index)

        evidence = scan.DepartureEvidence.from_verified_windows(
            read, starts, context["steps"], context["initial"], manifest["schedule"], samples
        )
        initial_bounds = evidence.bounds()
        result = evidence.decide(threshold)
        return {
            "meetsThreshold": result["meetsThreshold"], "boundsBeforeScan": initial_bounds,
            "bounds": result["countBounds"], "sourceChunkReads": reader.reads,
            "sourceChunkReadsForSavedVerification": verification_reads,
            "sourceBytes": reader.bytes, "savedSampleFileReads": int(policy != "cold"),
            "savedSampleBytes": payload_bytes, "totalPayloadBytes": reader.bytes + payload_bytes,
        }


def controls(store, manifest, receipt):
    record = receipt["samplePayloads"][0]
    payload = bytearray((store / record["file"]).read_bytes())
    payload[SAMPLE.size - 1] ^= 1
    for policy in ("pinned", "rechecked"):
        with (store / "trace.bin").open("rb", buffering=0) as stream:
            reader = ChunkReader(stream, manifest)
            try:
                restore_samples(payload, record, reader, policy)
            except ValueError as exc:
                assert str(exc) in ("Saved samples changed", "Saved sample differs from source")
            else:
                raise AssertionError("Changed observation must be refused")
    with TemporaryFile() as stream:
        packed = bytearray((store / "trace.bin").read_bytes())
        packed[0] ^= 1
        stream.write(packed)
        stream.flush()
        try:
            ChunkReader(stream, manifest).read(0)
        except ValueError as exc:
            assert str(exc) == "Packed chunk changed"
        else:
            raise AssertionError("Changed chunk must be refused")
    return {"changedObservation": "refused under both verification modes", "changedSourceChunk": "refused"}


def measure(scan, store, receipt_path, plan, overlap, sources):
    receipt_bytes = receipt_path.read_bytes()
    receipt = json.loads(receipt_bytes)
    manifest_bytes = (store / "manifest.json").read_bytes()
    if receipt["sources"] != sources or sha(manifest_bytes) != receipt["manifestSha256"]:
        raise ValueError("Trace manifest differs from the trusted preparation record")
    manifest = json.loads(manifest_bytes)
    if manifest["sourceTraceSha256"] != overlap["traceSha256"] or manifest["chunkLabels"] != plan["chunkLabels"]:
        raise ValueError("Prepared trace or chunk layout differs from the plan")
    context_index = {
        (item["steps"], manifest["levels"][item["initial"]]): index for index, item in enumerate(manifest["contexts"])
    }
    rows = []
    for row in overlap["rows"]:
        index = context_index[(row["steps"], row["initialLabel"])]
        phase, threshold, exact = row["phase"], row["threshold"], row["firstObservedDepartures"]
        assert len(manifest["contexts"][index]["starts"][str(phase)]) == row["windows"]
        policies = {
            name: answer(scan, store, manifest, receipt, index, phase, threshold, name)
            for name in plan["policies"]
        }
        for result in policies.values():
            lower, upper = result["bounds"]
            assert lower <= exact <= upper and result["meetsThreshold"] == (exact >= threshold)
        assert policies["rechecked"]["bounds"] == policies["pinned"]["bounds"]
        rows.append({"contextIndex": index, "phase": phase, "threshold": threshold, "exact": exact, "policies": policies})
    fields = (
        "sourceChunkReads", "sourceChunkReadsForSavedVerification", "sourceBytes",
        "savedSampleFileReads", "savedSampleBytes", "totalPayloadBytes",
    )
    totals = {
        name: {key: sum(row["policies"][name][key] for row in rows) for key in fields} for name in plan["policies"]
    }
    return {
        "sources": sources, "preparationReceiptSha256": sha(receipt_bytes),
        "commonMetadataBytes": len(receipt_bytes) + len(manifest_bytes), "queries": len(rows),
        "controls": controls(store, manifest, receipt), "totals": totals,
        "authority": "Counts are logical file payload reads on a prepared decoded trace. Each policy opens its own payload files per question. The trusted preparation receipt anchors the manifest and the pinned sample files. Counters start after preparation and describe application reads.",
        "rows": rows,
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("store", type=Path)
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--prepare", type=Path, metavar="ARCHIVE")
    mode.add_argument("--measure", type=Path, metavar="TRUSTED_RECEIPT")
    args = parser.parse_args()
    scan = load_scan()
    plan, parity, overlap, sources = references(scan)
    if args.prepare:
        result = prepare(scan, args.prepare, args.store, plan, parity, overlap, sources)
    else:
        result = measure(scan, args.store, args.measure, plan, overlap, sources)
    print(json.dumps(result, indent=2, allow_nan=False))
