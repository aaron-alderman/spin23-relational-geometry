"""Compare eagerly seeded and on-demand compact observation blocks."""

import argparse
from contextlib import ExitStack
import importlib.util
import json
from pathlib import Path
from tempfile import TemporaryFile


STEM = "parity-departure"


def load_persistence():
    spec = importlib.util.spec_from_file_location(
        "parity_persistence", Path(__file__).with_name("measure-parity-persistence.py")
    )
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def chunk_size(manifest, chunk):
    width = manifest["chunkLabels"]
    return min(width, manifest["traceLabels"] - chunk * width)


def encode_block(samples, labels):
    known = values = 0
    for index, label in samples.items():
        known |= 1 << index
        values |= label << index
    size = (labels + 7) // 8
    return known.to_bytes(size, "little") + values.to_bytes(size, "little")


def decode_block(payload, labels):
    size = (labels + 7) // 8
    if len(payload) != 2 * size:
        raise ValueError("Compact block length changed")
    known = int.from_bytes(payload[:size], "little")
    values = int.from_bytes(payload[size:], "little")
    if known >> labels or values & ~known:
        raise ValueError("Compact block mask is invalid")
    return {i: (values >> i) & 1 for i in range(labels) if (known >> i) & 1}


class CompactReader:
    def __init__(self, open_stream, blocks, manifest, digest):
        self.open_stream = open_stream
        self.stream = None
        self.blocks = blocks
        self.manifest = manifest
        self.digest = digest
        self.cache = {}
        self.reads = 0
        self.bytes = 0

    def read(self, chunk):
        if chunk not in self.cache:
            record = self.blocks[chunk]
            if self.stream is None:
                self.stream = self.open_stream()
            self.stream.seek(record["offset"])
            payload = self.stream.read(record["bytes"])
            self.reads += 1
            self.bytes += len(payload)
            if self.digest(payload) != record["sha256"]:
                raise ValueError("Compact block changed")
            samples = decode_block(payload, chunk_size(self.manifest, chunk))
            if len(samples) != record["knownLabels"]:
                raise ValueError("Compact block coverage changed")
            self.cache[chunk] = samples
        return self.cache[chunk]


def inputs(persistence, scan, store):
    plan, plan_pin = scan.record(STEM + "-compact-plan.json")
    base_plan, _, overlap, base_sources = persistence.references(scan)
    assert base_sources[0]["sha256"] == plan["persistencePlanSha256"]
    base, base_pin = scan.record(STEM + "-persistence-prepared.json", plan["preparedSha256"])
    prior, prior_pin = scan.record(STEM + "-persistence-replay.json", plan["persistenceReplaySha256"])
    manifest_bytes = (store / "manifest.json").read_bytes()
    if base["sources"] != base_sources or persistence.sha(manifest_bytes) != base["manifestSha256"]:
        raise ValueError("Prepared trace manifest changed")
    manifest = json.loads(manifest_bytes)
    assert manifest["chunkLabels"] == base_plan["chunkLabels"]
    assert manifest["sourceTraceSha256"] == overlap["traceSha256"]
    assert prior["preparationReceiptSha256"] == base_pin["sha256"]
    return plan, base, overlap, prior, manifest, [plan_pin, base_pin, prior_pin]


def pack(persistence, store, base, manifest, sources):
    contexts = []
    width = manifest["chunkLabels"]
    for index, record in enumerate(base["samplePayloads"]):
        payload = (store / record["file"]).read_bytes()
        with (store / "trace.bin").open("rb", buffering=0) as stream:
            reader = persistence.ChunkReader(stream, manifest)
            samples = persistence.restore_samples(payload, record, reader, "pinned")
        grouped = {}
        for position, label in samples.items():
            chunk, local = divmod(position, width)
            grouped.setdefault(chunk, {})[local] = label
        name = f"compact-{index}.bin"
        blocks = []
        with (store / name).open("wb") as stream:
            for chunk, retained in sorted(grouped.items()):
                encoded = encode_block(retained, chunk_size(manifest, chunk))
                assert decode_block(encoded, chunk_size(manifest, chunk)) == retained
                blocks.append({
                    "chunk": chunk, "offset": stream.tell(), "bytes": len(encoded),
                    "knownLabels": len(retained), "sha256": persistence.sha(encoded),
                })
                stream.write(encoded)
        contexts.append({"file": name, "blocks": blocks})
    return {"sources": sources, "manifestSha256": base["manifestSha256"], "contexts": contexts}


def answer(persistence, scan, store, manifest, compact, context_index, phase, threshold, policy, *, packed=None):
    context = manifest["contexts"][context_index]
    starts = context["starts"][str(phase)]
    steps, initial = context["steps"], context["initial"]
    width = manifest["chunkLabels"]
    record = compact["contexts"][context_index] if compact is not None else {"blocks": []}
    blocks = {block["chunk"]: block for block in record["blocks"]}
    source_only = 0
    with ExitStack() as stack:
        if packed is None:
            raw = stack.enter_context((store / "trace.bin").open("rb", buffering=0))
            reader = persistence.ChunkReader(raw, manifest)
            read_source = reader.read

            def stored_size(chunk):
                return chunk_size(manifest, chunk)
        else:
            raw = stack.enter_context((store / "trace-packed.bin").open("rb", buffering=0))
            reader = persistence.ChunkReader(raw, packed)

            def read_source(index):
                byte_index, bit = divmod(index, 8)
                return (reader.read(byte_index) >> bit) & 1

            def stored_size(chunk):
                return chunk_size(packed, chunk)
        proofs = CompactReader(
            lambda: stack.enter_context((store / record["file"]).open("rb", buffering=0)),
            blocks, manifest, persistence.sha
        )
        observed = {}
        if policy == "eager":
            relevant = {chunk for start in starts for chunk in range((start + 1) // width, (start + steps) // width + 1)}
            available = [chunk for chunk in sorted(relevant.intersection(blocks))
                         if packed is not None or blocks[chunk]["bytes"] < stored_size(chunk)]
            if sum(blocks[chunk]["bytes"] for chunk in available) < sum(stored_size(chunk) for chunk in relevant):
                for chunk in available:
                    observed.update({chunk * width + i: value for i, value in proofs.read(chunk).items()})

        def read(index):
            nonlocal source_only
            if policy == "eager" and index in observed:
                return observed[index]
            chunk, local = divmod(index, width)
            block = blocks.get(chunk)
            size = chunk_size(manifest, chunk)
            if policy == "guarded" and block and block["knownLabels"] == size and block["bytes"] < stored_size(chunk):
                return proofs.read(chunk)[local]
            if policy == "guarded" and chunk not in reader.cache and block:
                source_only += 1
            return read_source(index)

        evidence = scan.DepartureEvidence.from_verified_windows(
            read, starts, steps, initial, manifest["schedule"], observed
        )
        result = evidence.decide(threshold)
        return {
            "meetsThreshold": result["meetsThreshold"], "bounds": result["countBounds"],
            "sourceChunkReads": reader.reads, "sourceBytes": reader.bytes,
            "compactBlockReads": proofs.reads, "compactBytes": proofs.bytes,
            "sourceChosenOverCompact": source_only, "payloadBytes": reader.bytes + proofs.bytes,
        }


def controls(persistence, store, manifest, compact):
    record = compact["contexts"][0]
    block = record["blocks"][0]
    chunk = block["chunk"]
    with TemporaryFile() as stream:
        payload = bytearray((store / record["file"]).read_bytes())
        payload[block["offset"]] ^= 1
        stream.write(payload)
        stream.flush()
        reader = CompactReader(lambda: stream, {chunk: block}, manifest, persistence.sha)
        try:
            reader.read(chunk)
        except ValueError as exc:
            assert str(exc) == "Compact block changed"
        else:
            raise AssertionError("Changed compact payload must be refused")
    return {"changedCompactBlock": "refused"}


def measure(persistence, scan, store, compact_path, plan, overlap, prior, manifest, sources):
    compact_bytes = compact_path.read_bytes()
    compact = json.loads(compact_bytes)
    assert compact["sources"] == sources
    assert compact["manifestSha256"] == persistence.sha((store / "manifest.json").read_bytes())
    rows = []
    for old, row in zip(prior["rows"], overlap["rows"], strict=True):
        index, phase, threshold = old["contextIndex"], old["phase"], old["threshold"]
        exact = row["firstObservedDepartures"]
        assert (phase, threshold, exact) == (row["phase"], row["threshold"], old["exact"])
        policies = {
            name: answer(persistence, scan, store, manifest, compact, index, phase, threshold, name)
            for name in plan["policies"]
        }
        for result in policies.values():
            assert result["meetsThreshold"] == (exact >= threshold)
            assert result["bounds"][0] <= exact <= result["bounds"][1]
        cold, previous = policies["cold"], old["policies"]["cold"]
        assert cold["payloadBytes"] == previous["totalPayloadBytes"]
        assert cold["bounds"] == previous["bounds"]
        guarded = policies["guarded"]
        assert guarded["bounds"] == cold["bounds"] and guarded["payloadBytes"] <= cold["payloadBytes"]
        assert guarded["sourceChunkReads"] + guarded["compactBlockReads"] == cold["sourceChunkReads"]
        rows.append({"contextIndex": index, "phase": phase, "threshold": threshold, "exact": exact, "policies": policies})
    fields = ("sourceChunkReads", "sourceBytes", "compactBlockReads", "compactBytes", "sourceChosenOverCompact", "payloadBytes")
    totals = {
        name: {
            **{key: sum(row["policies"][name][key] for row in rows) for key in fields},
            "fewerBytesThanCold": sum(row["policies"][name]["payloadBytes"] < row["policies"]["cold"]["payloadBytes"]
                                     for row in rows),
            "moreBytesThanCold": sum(row["policies"][name]["payloadBytes"] > row["policies"]["cold"]["payloadBytes"]
                                    for row in rows),
        }
        for name in plan["policies"]
    }
    return {
        "sources": sources, "trustedCompactReceiptSha256": persistence.sha(compact_bytes),
        "queries": len(rows), "commonMetadataBytes": prior["commonMetadataBytes"],
        "additionalCompactMetadataBytesOncePerBatch": len(compact_bytes),
        "compactStorePayloadBytes": sum(block["bytes"] for ctx in compact["contexts"] for block in ctx["blocks"]),
        "controls": controls(persistence, store, manifest, compact), "totals": totals,
        "authority": "Measures application payload bytes per question after loading the trusted receipts and preparing files. Cold and guarded inspect the same labels in the same order. Eager can change the scan order by seeding bounds.",
        "rows": rows,
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("store", type=Path)
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--pack", action="store_true")
    mode.add_argument("--measure", type=Path, metavar="TRUSTED_COMPACT_RECEIPT")
    args = parser.parse_args()
    persistence = load_persistence()
    scan = persistence.load_scan()
    plan, base, overlap, prior, manifest, sources = inputs(persistence, scan, args.store)
    if args.pack:
        result = pack(persistence, args.store, base, manifest, sources)
    else:
        result = measure(persistence, scan, args.store, args.measure, plan, overlap, prior, manifest, sources)
    print(json.dumps(result, indent=2, allow_nan=False))
