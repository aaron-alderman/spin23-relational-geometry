"""Reevaluate a source-versus-index byte bound against live verification caches."""

import argparse
from contextlib import ExitStack
import importlib.util
import json
from pathlib import Path
import subprocess


STEM = "live-bound-routing"


def load_partition():
    path = Path(__file__).with_name("measure-departure-change-partition.py")
    spec = importlib.util.spec_from_file_location("change_partition", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def bound(service, maximum):
    service.stdin.write(json.dumps({"upperBound": maximum, "target": 0, "required": ">"}) + "\n")
    service.stdin.flush()
    answer = service.stdout.readline().strip()
    if answer not in ("certified-impossible", "unresolved"):
        raise RuntimeError("Bound process returned no proof decision")
    return answer


def verify_root(persistence, raw, layout):
    if persistence.sha(raw) != layout["rootSha256"] or len(raw) != layout["rootBytes"]:
        raise ValueError("Unavailable verified partition root")
    return json.loads(raw)


class VerifiedReaders:
    def __init__(self, partition, persistence, index, scan, store, name, manifest, layout, stack, *, cache=None):
        self.partition, self.persistence, self.index, self.scan = partition, persistence, index, scan
        self.store, self.name, self.manifest, self.layout = store, name, manifest, layout
        source = stack.enter_context((store / f"{name}-packed.bin").open("rb", buffering=0))
        self.packed = persistence.ChunkReader(source, manifest["reader"])
        self.cache = cache
        if cache is not None:
            self.packed.cache = cache["packed"]
        self.index_files = stack.enter_context(ExitStack())
        self.indexed = None

    def packed_upper(self, arm):
        return sum(size for chunk, size in self.index.packed_chunks(self.manifest, arm).items()
                   if chunk not in self.packed.cache)

    def root_floor(self):
        return self.layout["rootBytes"] if self.indexed is None else 0

    def evict(self):
        self.packed.cache.clear()
        self.index_files.close()
        self.indexed = None

    def use_packed(self, arm, threshold):
        before = self.packed.bytes
        answer, bounds = self.index.packed_decision(self.scan, self.packed, arm, threshold)
        return answer, bounds, {"packed": self.packed.bytes - before, "root": 0, "directory": 0, "changes": 0}

    def use_index(self, arm, threshold):
        root_cost = 0
        if self.indexed is None:
            stem = f"{self.name}-changes-{self.layout['blockLabels']}"
            raw = (self.store / f"{stem}.root").read_bytes()
            root = verify_root(self.persistence, raw, self.layout)
            assert root["sourceTraceSha256"] == self.manifest["sourceTraceSha256"]
            assert root["labels"] == self.manifest["labels"] and root["blockLabels"] == self.layout["blockLabels"]
            directory = self.index_files.enter_context((self.store / f"{stem}.dir").open("rb", buffering=0))
            payload = self.index_files.enter_context((self.store / f"{stem}.bin").open("rb", buffering=0))
            self.indexed = self.partition.PartitionReader(root, directory, payload, self.persistence.sha)
            if self.cache is not None:
                self.indexed.pages = self.cache["directory"]
                self.indexed.blocks = self.cache["changes"]
            root_cost = len(raw)
        previous = self.indexed.work()
        answer, bounds = self.index.change_decision(self.indexed.has_change, arm, threshold)
        after = self.indexed.work()
        return answer, bounds, {
            "packed": 0, "root": root_cost, "directory": after["directoryBytes"] - previous["directoryBytes"],
            "changes": after["changeBytes"] - previous["changeBytes"],
        }

    def alternate_packed(self, arm, threshold):
        # Keep the real stream's cache unchanged during the paired comparison.
        with (self.store / f"{self.name}-packed.bin").open("rb", buffering=0) as stream:
            reader = self.persistence.ChunkReader(stream, self.manifest["reader"])
            reader.cache = self.packed.cache.copy()
            answer, bounds = self.index.packed_decision(self.scan, reader, arm, threshold)
        return answer, bounds, reader.bytes

    def verify_packed_scope(self, arm):
        before = self.packed.bytes
        for chunk in sorted(self.index.packed_chunks(self.manifest, arm)):
            self.packed.read(chunk * self.manifest["reader"]["chunkLabels"])
        return self.packed.bytes - before


def key(row):
    return row["region"], row["steps"], row["phase"], row["initial"]


def run_trace(service, partition, persistence, index, scan, store, entry, layout, transfer_trace, reference_trace):
    name, manifest = partition.load_trace(persistence, store, entry)
    selected = next(row for row in transfer_trace["rows"] if row["reject"])
    arms = {key(arm): arm for arm in manifest["contexts"]}
    target = arms[key(selected)]
    threshold = selected["threshold"]
    counts = {(key(row), row["threshold"]): row["answer"] for row in reference_trace["rows"]}
    rows = []
    with ExitStack() as stack:
        readers = VerifiedReaders(partition, persistence, index, scan, store, name, manifest, layout, stack)

        def dispatch(stage, arm, request_threshold, compare=False):
            upper = readers.packed_upper(arm)
            floor = readers.root_floor()
            decision = bound(service, upper - floor)
            alternate = readers.alternate_packed(arm, request_threshold) if compare else None
            route = "packed" if decision == "certified-impossible" else "partition"
            evaluate = readers.use_packed if route == "packed" else readers.use_index
            answer, bounds, work = evaluate(arm, request_threshold)
            actual = arm["exactDepartures"]
            assert bounds[0] <= actual <= bounds[1]
            assert answer == counts[key(arm), request_threshold] == (actual >= request_threshold)
            if route == "packed":
                assert work["packed"] <= upper
            else:
                assert work["root"] == floor and sum(work.values()) >= floor
            row = {
                "stage": stage, "region": arm["region"], "windowSteps": arm["steps"], "phase": arm["phase"],
                "initial": arm["initial"], "threshold": request_threshold, "windows": len(arm["starts"]),
                "unreadPackedUpper": upper, "unpaidRootFloor": floor,
                "decision": decision, "route": route, "answer": answer, "bounds": bounds, "bytes": work,
            }
            if alternate is not None:
                alt_answer, alt_bounds, alt_bytes = alternate
                assert alt_answer == answer and alt_bounds[0] <= actual <= alt_bounds[1]
                row["staleRootControl"] = {
                    "decisionAtOriginalRootPrice": bound(service, upper - layout["rootBytes"]),
                    "alternatePackedBytes": alt_bytes, "actualPartitionBytes": sum(work.values()),
                }
            rows.append(row)
            return row

        a = dispatch("cold repeat question", target, threshold)
        full_regions = ("full-trace", "trace-divided-by-1")
        for arm in manifest["contexts"]:
            if arm["region"] in full_regions and index.packed_footprint(manifest, arm) > layout["rootBytes"]:
                for value in arm["thresholds"]:
                    dispatch("archived broad stream", arm, value)
        assert readers.indexed is not None
        readers.packed.cache.clear()
        b = dispatch("repeat with index verified", target, threshold, compare=True)
        prefetched = readers.verify_packed_scope(target)
        c = dispatch("repeat with both verified", target, threshold)
        readers.evict()
        d = dispatch("repeat after both evictions", target, threshold)
    assert [row["decision"] for row in (a, b, c, d)] == [
        "certified-impossible", "unresolved", "certified-impossible", "certified-impossible"
    ]
    assert [row["unpaidRootFloor"] for row in (a, b, c, d)] == [layout["rootBytes"], 0, 0, layout["rootBytes"]]
    assert a["unreadPackedUpper"] == d["unreadPackedUpper"] == selected["packedFootprint"]
    assert c["unreadPackedUpper"] == 0 and sum(c["bytes"].values()) == 0
    control = b["staleRootControl"]
    assert control["decisionAtOriginalRootPrice"] == "certified-impossible"
    assert control["actualPartitionBytes"] < control["alternatePackedBytes"]
    root_path = store / f"{name}-changes-{layout['blockLabels']}.root"
    root_bytes = root_path.read_bytes()
    try:
        verify_root(persistence, bytes([root_bytes[0] ^ 1]) + root_bytes[1:], layout)
    except ValueError as exc:
        assert str(exc) == "Unavailable verified partition root"
    else:
        raise AssertionError("Damaged root must be refused before being marked verified")
    return {
        "trace": name, "rows": rows, "verifiedPrefetchBytes": prefetched,
        "streamBytes": sum(sum(row["bytes"].values()) for row in rows) + prefetched,
        "stalePriceExtraBytesOnWarmQuestion": control["alternatePackedBytes"] - control["actualPartitionBytes"],
        "changedRootControl": "refused before opening directory or change data",
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("store", type=Path)
    args = parser.parse_args()
    partition = load_partition()
    index = partition.load_index()
    persistence = index.load_local("measure-parity-persistence")
    scan = persistence.load_scan()
    plan, plan_pin = scan.record(STEM + "-plan.json")
    transfer, transfer_pin = scan.record("bound-pruning-transfer-replay.json", plan["boundTransferSha256"])
    layouts, layouts_pin = scan.record("departure-change-partition-prepared.json", plan["partitionPreparedSha256"])
    flat, flat_pin = scan.record("departure-change-index-prepared.json", plan["flatPreparedSha256"])
    reference, reference_pin = scan.record("departure-change-index-replay.json", plan["flatReplaySha256"])
    assert reference["preparationReceiptSha256"] == flat_pin["sha256"]
    sources = [plan_pin, transfer_pin, layouts_pin, flat_pin, reference_pin]
    command = ["node", str(Path(__file__).with_name("bounded-target.mjs")), "--lines"]
    with subprocess.Popen(command, stdin=subprocess.PIPE, stdout=subprocess.PIPE, text=True, bufsize=1) as service:
        runs = []
        for entry in flat["traces"]:
            name = entry["trace"]
            layout = next(item for item in layouts["partitions"]
                          if item["trace"] == name and item["blockLabels"] == plan["partitionLabels"])
            held = next(item for item in transfer["held"]["partitionCost"]
                        if item["trace"] == name and item["blockLabels"] == plan["partitionLabels"])
            oracle = next(item for item in reference["traces"] if item["trace"] == name)
            runs.append(run_trace(service, partition, persistence, index, scan, args.store, entry, layout, held, oracle))
        service.stdin.close()
        if service.wait() != 0:
            raise RuntimeError("Bound process failed")
    print(json.dumps({
        "sources": sources, "traces": runs,
        "authority": "A rejection concerns marginal bytes for the current verified trace and cache state. An unresolved comparison leaves a route available. The experiment charges recorded representation reads and separately records its controlled prefetch.",
    }, indent=2, allow_nan=False))
