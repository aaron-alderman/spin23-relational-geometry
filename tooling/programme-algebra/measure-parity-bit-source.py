"""Replay compact evidence against a bit-packed authoritative trace."""

import argparse
import importlib.util
import json
from pathlib import Path
from tempfile import TemporaryFile


STEM = "parity-departure"


def load_compact():
    spec = importlib.util.spec_from_file_location(
        "parity_compact", Path(__file__).with_name("measure-parity-compact.py")
    )
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def inputs(compact, persistence, scan, store):
    plan, plan_pin = scan.record(STEM + "-bit-source-plan.json")
    _, base, overlap, prior, manifest, compact_sources = compact.inputs(persistence, scan, store)
    assert compact_sources[0]["sha256"] == plan["compactPlanSha256"]
    prepared, prepared_pin = scan.record(STEM + "-compact-prepared.json", plan["compactPreparedSha256"])
    replay, replay_pin = scan.record(STEM + "-compact-replay.json", plan["compactReplaySha256"])
    assert prepared["sources"] == compact_sources and prepared["manifestSha256"] == base["manifestSha256"]
    assert replay["trustedCompactReceiptSha256"] == prepared_pin["sha256"]
    return plan, overlap, prior, manifest, prepared, replay, [plan_pin, prepared_pin, replay_pin]


def pack(persistence, store, manifest, sources):
    width = manifest["chunkLabels"]
    if width % 8:
        raise ValueError("Packed source needs byte-aligned sample chunks")
    hashes = []
    byte_count = 0
    with (store / "trace.bin").open("rb", buffering=0) as raw, (store / "trace-packed.bin").open("wb") as output:
        reader = persistence.ChunkReader(raw, manifest)
        for start in range(0, manifest["traceLabels"], width):
            count = min(width, manifest["traceLabels"] - start)
            values = [reader.read(i) for i in range(start, start + count)]
            assert set(values) <= {0, 1}
            bits = sum(value << i for i, value in enumerate(values))
            payload = bits.to_bytes((count + 7) // 8, "little")
            assert [(bits >> i) & 1 for i in range(count)] == values
            output.write(payload)
            hashes.append(persistence.sha(payload))
            byte_count += len(payload)
    return {
        "sources": sources, "sourceTraceSha256": manifest["sourceTraceSha256"],
        "packing": "least-significant-bit first, one bit per resolved label",
        "reader": {"traceLabels": byte_count, "chunkLabels": width // 8, "chunkSha256": hashes},
    }


def control(persistence, store, packed):
    with TemporaryFile() as stream:
        payload = bytearray((store / "trace-packed.bin").read_bytes())
        payload[0] ^= 1
        stream.write(payload)
        stream.flush()
        try:
            persistence.ChunkReader(stream, packed).read(0)
        except ValueError as exc:
            assert str(exc) == "Packed chunk changed"
        else:
            raise AssertionError("Changed packed source chunk must be refused")
    return {"changedPackedChunk": "refused"}


def measure(compact, persistence, scan, store, packed_path, plan, overlap, prior, manifest, prepared, replay, sources):
    packed_bytes = packed_path.read_bytes()
    receipt = json.loads(packed_bytes)
    assert receipt["sources"] == sources and receipt["sourceTraceSha256"] == manifest["sourceTraceSha256"]
    packed = receipt["reader"]
    assert packed["traceLabels"] == (manifest["traceLabels"] + 7) // 8
    assert packed["chunkLabels"] * 8 == manifest["chunkLabels"]
    assert len(packed["chunkSha256"]) == len(manifest["chunkSha256"])

    # A two-plane block necessarily costs twice the bit-packed source chunk.
    # The guarded query can route directly to source without consulting the index.
    for context in prepared["contexts"]:
        for block in context["blocks"]:
            assert block["bytes"] == 2 * compact.chunk_size(packed, block["chunk"])
    rows = []
    for reference, old in zip(overlap["rows"], prior["rows"], strict=True):
        index, phase, threshold = old["contextIndex"], old["phase"], old["threshold"]
        exact = reference["firstObservedDepartures"]
        assert (phase, threshold, exact) == (reference["phase"], reference["threshold"], old["exact"])
        policies = {
            name: compact.answer(
                persistence, scan, store, manifest, prepared if name == "eager" else None,
                index, phase, threshold, name, packed=packed
            )
            for name in plan["policies"]
        }
        cold, guard = policies["cold"], policies["guarded"]
        assert cold == guard
        assert cold["sourceChunkReads"] == old["policies"]["cold"]["sourceChunkReads"]
        assert cold["bounds"] == old["policies"]["cold"]["bounds"]
        for result in policies.values():
            assert result["bounds"][0] <= exact <= result["bounds"][1]
            assert result["meetsThreshold"] == (exact >= threshold)
        rows.append({"contextIndex": index, "phase": phase, "threshold": threshold, "exact": exact, "policies": policies})
    fields = ("sourceChunkReads", "sourceBytes", "compactBlockReads", "compactBytes", "payloadBytes")
    totals = {
        name: {
            **{key: sum(row["policies"][name][key] for row in rows) for key in fields},
            "fewerBytesThanPackedCold": sum(row["policies"][name]["payloadBytes"] < row["policies"]["cold"]["payloadBytes"]
                                          for row in rows),
            "moreBytesThanPackedCold": sum(row["policies"][name]["payloadBytes"] > row["policies"]["cold"]["payloadBytes"]
                                          for row in rows),
        }
        for name in plan["policies"]
    }
    return {
        "sources": sources, "packedPreparationSha256": persistence.sha(packed_bytes), "queries": len(rows),
        "packedTraceBytes": packed["traceLabels"], "byteTraceBytes": manifest["traceLabels"],
        "priorByteColdPayload": replay["totals"]["cold"]["payloadBytes"],
        "commonMetadataBytes": replay["commonMetadataBytes"] + len(packed_bytes),
        "eagerAdditionalMetadataBytes": replay["additionalCompactMetadataBytesOncePerBatch"],
        "guardSizeDecision": "Use the packed source for every chunk. Skip the compact index in a guard-only invocation.",
        "controls": control(persistence, store, packed), "totals": totals,
        "authority": "Application reads on a prepared store. Bounds and decisions concern the fixed decoded trace. Shared receipt bytes are charged once per batch.",
        "rows": rows,
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("store", type=Path)
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--pack", action="store_true")
    mode.add_argument("--measure", type=Path, metavar="TRUSTED_PACKED_RECEIPT")
    args = parser.parse_args()
    compact = load_compact()
    persistence = compact.load_persistence()
    scan = persistence.load_scan()
    plan, overlap, prior, manifest, prepared, replay, sources = inputs(compact, persistence, scan, args.store)
    if args.pack:
        result = pack(persistence, args.store, manifest, sources)
    else:
        result = measure(compact, persistence, scan, args.store, args.measure,
                         plan, overlap, prior, manifest, prepared, replay, sources)
    print(json.dumps(result, indent=2, allow_nan=False))
