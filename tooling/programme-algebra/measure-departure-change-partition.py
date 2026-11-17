"""Compare verified change-index partitions with packed and flat baselines."""

import argparse
from bisect import bisect_right
import importlib.util
from io import BytesIO
import json
from pathlib import Path
import struct


RECORD = struct.Struct("<IH32s")
STEM = "departure-change-partition"


def load_index():
    path = Path(__file__).with_name("measure-departure-change-index.py")
    spec = importlib.util.spec_from_file_location("change_index", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def pack_partition(positions, labels, width, per_page, digest):
    if not 1 <= width <= 65535 or per_page <= 0:
        raise ValueError("Require two-byte offsets and positive directory page size")
    groups = [[] for _ in range((labels + width - 1) // width)]
    for position in positions:
        block, local = divmod(position, width)
        groups[block].append(local)
    payloads = bytearray()
    directory = bytearray()
    for group in groups:
        data = struct.pack(f"<{len(group)}H", *group)
        directory.extend(RECORD.pack(len(payloads), len(group), bytes.fromhex(digest(data))))
        payloads.extend(data)
    page_bytes = RECORD.size * per_page
    root = {
        "labels": labels, "blockLabels": width, "recordsPerPage": per_page, "blocks": len(groups),
        "directoryPageSha256": [digest(directory[i:i + page_bytes]) for i in range(0, len(directory), page_bytes)],
    }
    return root, directory, payloads


class PartitionReader:
    def __init__(self, root, directory, payload, digest):
        self.root = root
        self.directory = directory
        self.payload = payload
        self.digest = digest
        self.pages = {}
        self.blocks = {}
        self.directory_bytes = 0
        self.payload_bytes = 0

    def lookup(self, block):
        page, within = divmod(block, self.root["recordsPerPage"])
        if page not in self.pages:
            start = page * self.root["recordsPerPage"]
            records = min(self.root["recordsPerPage"], self.root["blocks"] - start)
            self.directory.seek(start * RECORD.size)
            data = self.directory.read(records * RECORD.size)
            self.directory_bytes += len(data)
            if len(data) != records * RECORD.size or self.digest(data) != self.root["directoryPageSha256"][page]:
                raise ValueError("Directory page changed")
            self.pages[page] = tuple(RECORD.iter_unpack(data))
        return self.pages[page][within]

    def changes(self, block):
        if block not in self.blocks:
            offset, count, expected = self.lookup(block)
            self.payload.seek(offset)
            data = self.payload.read(count * 2) if count else b""
            self.payload_bytes += len(data)
            if len(data) != count * 2 or self.digest(data) != expected.hex():
                raise ValueError("Change block changed")
            changes = struct.unpack(f"<{count}H", data)
            width = self.root["blockLabels"]
            length = min(width, self.root["labels"] - block * width)
            if any(i >= length for i in changes) or any(a >= b for a, b in zip(changes, changes[1:])):
                raise ValueError("Change offsets are invalid for the declared block")
            self.blocks[block] = changes
        return self.blocks[block]

    def has_change(self, start, end):
        if not 0 <= start < end < self.root["labels"]:
            raise ValueError("Window lies outside the verified trace")
        width = self.root["blockLabels"]
        for block in range((start + 1) // width, end // width + 1):
            changes = self.changes(block)
            origin = block * width
            position = bisect_right(changes, start - origin)
            if position < len(changes) and origin + changes[position] <= end:
                return True
        return False

    def work(self):
        return {
            "directoryBytes": self.directory_bytes, "changeBytes": self.payload_bytes,
            "totalBytes": self.directory_bytes + self.payload_bytes,
            "directoryPages": len(self.pages), "blocksVerified": len(self.blocks),
        }


def load_trace(persistence, store, entry):
    name = entry["trace"]
    manifest_raw = (store / f"{name}-manifest.json").read_bytes()
    if persistence.sha(manifest_raw) != entry["manifestSha256"]:
        raise ValueError("Trace manifest changed")
    manifest = json.loads(manifest_raw)
    assert manifest["sourceTraceSha256"] == entry["sourceTraceSha256"]
    return name, manifest


def prepare(index, persistence, store, flat, plan, sources):
    partitions = []
    for entry in flat["traces"]:
        name, manifest = load_trace(persistence, store, entry)
        proof_bytes = (store / f"{name}-changes.json").read_bytes()
        if persistence.sha(proof_bytes) != entry["indexRecordSha256"]:
            raise ValueError("Flat index metadata changed")
        proof = json.loads(proof_bytes)
        assert proof["sourceTraceSha256"] == manifest["sourceTraceSha256"]
        positions = index.verified_positions(
            persistence, (store / f"{name}-changes.bin").read_bytes(), proof, manifest["labels"]
        )
        for width in plan["blockLabels"]:
            root, directory, payload = pack_partition(
                positions, manifest["labels"], width, plan["recordsPerDirectoryPage"], persistence.sha
            )
            boundary = [position for position in positions if position % width == 0]
            position_set = set(positions)
            reader = PartitionReader(root, BytesIO(directory), BytesIO(payload), persistence.sha)
            for position in boundary:
                assert reader.has_change(position - 1, position)
                if position + 1 < manifest["labels"]:
                    assert reader.has_change(position, position + 1) == (position + 1 in position_set)
            root["sourceTraceSha256"] = manifest["sourceTraceSha256"]
            stem = f"{name}-changes-{width}"
            rooted = persistence.json_bytes(root)
            (store / f"{stem}.root").write_bytes(rooted)
            (store / f"{stem}.dir").write_bytes(directory)
            (store / f"{stem}.bin").write_bytes(payload)
            partitions.append({
                "trace": name, "blockLabels": width, "rootSha256": persistence.sha(rooted),
                "positions": len(positions), "changesAtBlockStart": len(boundary),
                "rootBytes": len(rooted), "directoryBytes": len(directory), "changeBytes": len(payload),
            })
    return {"sources": sources, "partitions": partitions}


def assess(index, persistence, store, flat_entry, flat_trace, entry):
    name, manifest = load_trace(persistence, store, flat_entry)
    stem = f"{name}-changes-{entry['blockLabels']}"
    root_bytes = (store / f"{stem}.root").read_bytes()
    if persistence.sha(root_bytes) != entry["rootSha256"]:
        raise ValueError("Partition root changed")
    root = json.loads(root_bytes)
    assert root["sourceTraceSha256"] == manifest["sourceTraceSha256"]
    assert root["labels"] == manifest["labels"] and root["blockLabels"] == entry["blockLabels"]
    reference = {(row["region"], row["initial"], row["phase"], row["steps"], row["threshold"]): row
                 for row in flat_trace["rows"]}

    def decide(reader, arm, threshold):
        oracle = reference[(arm["region"], arm["initial"], arm["phase"], arm["steps"], threshold)]
        answer, (lower, upper) = index.change_decision(reader.has_change, arm, threshold)
        assert answer == oracle["answer"]
        assert lower <= arm["exactDepartures"] == oracle["exactDepartures"] <= upper
        return {**oracle, "partitionBounds": [lower, upper], **reader.work()}

    rows = []
    directory_path, payload_path = store / f"{stem}.dir", store / f"{stem}.bin"
    for arm in manifest["contexts"]:
        for threshold in arm["thresholds"]:
            with directory_path.open("rb", buffering=0) as directory, payload_path.open("rb", buffering=0) as payload:
                reader = PartitionReader(root, directory, payload, persistence.sha)
                rows.append(decide(reader, arm, threshold))
    assert len(rows) == len(reference)

    batches = []
    for old in flat_trace["batches"]:
        region = old["region"]
        chosen = [row for row in rows if row["region"] == region]
        with directory_path.open("rb", buffering=0) as directory, payload_path.open("rb", buffering=0) as payload:
            reader = PartitionReader(root, directory, payload, persistence.sha)
            for arm in (arm for arm in manifest["contexts"] if arm["region"] == region):
                for threshold in arm["thresholds"]:
                    decide(reader, arm, threshold)
        independent = sum(row["totalBytes"] for row in chosen)
        index_proof = flat_trace["additionalIndexProofBytesOncePerInvocation"]
        batches.append({
            "region": region, "queries": len(chosen),
            "independentQuestions": {
                "packed": old["coldPayloadPerQuerySummed"],
                "flatIncludingProof": old["flatIndexPayloadPerQuerySummed"] + index_proof,
                "partitionIncludingRoot": independent + len(root_bytes),
                "partitionDirectory": sum(row["directoryBytes"] for row in chosen),
                "partitionChanges": sum(row["changeBytes"] for row in chosen),
            },
            "oneSharedCache": {
                "packed": old["sharedColdPayload"],
                "flatIncludingProof": old["sharedIndexPayload"] + index_proof,
                "partitionIncludingRoot": reader.work()["totalBytes"] + len(root_bytes),
                "partitionDirectory": reader.directory_bytes, "partitionChanges": reader.payload_bytes,
            },
        })
    return {**entry, "batches": batches, "rows": rows}


def controls(digest):
    root, directory, payload = pack_partition([4, 10], 12, 4, 2, digest)
    reader = PartitionReader(root, BytesIO(directory), BytesIO(payload), digest)
    assert reader.has_change(3, 4)
    assert not reader.has_change(4, 8)
    assert not reader.has_change(1, 3)
    assert reader.has_change(5, 10)
    for kind, bad_directory, bad_payload, expected in (
        ("directory", bytes([directory[0] ^ 1]) + directory[1:], payload, "Directory page changed"),
        ("payload", directory, bytes([payload[0] ^ 1]) + payload[1:], "Change block changed"),
    ):
        reader = PartitionReader(root, BytesIO(bad_directory), BytesIO(bad_payload), digest)
        try:
            reader.has_change(3, 4)
        except ValueError as exc:
            assert str(exc) == expected, kind
        else:
            raise AssertionError(f"Changed {kind} must be refused")
    return {
        "firstSampleOfBlockCountsAtWindowEnd": True, "startingSampleChangeExcluded": True,
        "damagedDirectoryPage": "refused", "damagedChangePayload": "refused",
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("store", type=Path)
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--prepare", action="store_true")
    mode.add_argument("--measure", type=Path, metavar="TRUSTED_PREPARATION")
    args = parser.parse_args()
    index = load_index()
    persistence = index.load_local("measure-parity-persistence")
    scan = persistence.load_scan()
    plan, plan_pin = scan.record(STEM + "-plan.json")
    _, flat_plan_pin = scan.record("departure-change-index-plan.json", plan["changeIndexPlanSha256"])
    flat, flat_pin = scan.record("departure-change-index-prepared.json", plan["changeIndexPreparedSha256"])
    replay, replay_pin = scan.record("departure-change-index-replay.json", plan["changeIndexReplaySha256"])
    assert replay["preparationReceiptSha256"] == flat_pin["sha256"] and flat_plan_pin in flat["sources"]
    sources = [plan_pin, flat_plan_pin, flat_pin, replay_pin]
    if args.prepare:
        output = prepare(index, persistence, args.store, flat, plan, sources)
    else:
        raw = args.measure.read_bytes()
        prepared = json.loads(raw)
        assert prepared["sources"] == sources
        output = {
            "sources": sources, "preparationSha256": persistence.sha(raw), "controls": controls(persistence.sha),
            "partitions": [
                assess(index, persistence, args.store,
                       next(row for row in flat["traces"] if row["trace"] == entry["trace"]),
                       next(row for row in replay["traces"] if row["trace"] == entry["trace"]), entry)
                for entry in prepared["partitions"]
            ],
            "authority": "Application bytes from prepared decoded traces. Root receipts and authenticated directory pages count toward partition costs. Shared-cache and independent-query policies reuse the same archived window starts.",
        }
    print(json.dumps(output, indent=2, allow_nan=False))
