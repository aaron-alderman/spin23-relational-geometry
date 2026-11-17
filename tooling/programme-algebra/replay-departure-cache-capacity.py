"""Measure the cost of evicting verified source and index blocks."""

import argparse
from collections import Counter, OrderedDict
from contextlib import ExitStack
import importlib.util
import json
from pathlib import Path
import subprocess


STEM = "departure-cache-capacity"


def load_local(name):
    path = Path(__file__).with_name(name + ".py")
    spec = importlib.util.spec_from_file_location(name.replace("-", "_"), path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class CacheView:
    def __init__(self, cache, kind, size):
        self.cache, self.kind, self.size = cache, kind, size

    def __contains__(self, key):
        return (self.kind, key) in self.cache.entries

    def __getitem__(self, key):
        identity = (self.kind, key)
        value, _ = self.cache.entries[identity]
        self.cache.entries.move_to_end(identity)
        self.cache.observe(identity)
        return value

    def __setitem__(self, key, value):
        self.cache.remember((self.kind, key), value, self.size(value))

    def __len__(self):
        return self.cache.resident[self.kind]


class VerifiedCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.entries = OrderedDict()
        self.seen = set()
        self.resident = Counter()
        self.reads = Counter()
        self.rereads = Counter()
        self.evictions = Counter()
        self.used = 0
        self.peak = 0

    def views(self, directory_record_bytes):
        return {
            "packed": CacheView(self, "packed", len),
            "directory": CacheView(self, "directory", lambda rows: len(rows) * directory_record_bytes),
            "changes": CacheView(self, "changes", lambda rows: 2 * len(rows)),
        }

    def victim(self):
        return next(iter(self.entries))

    def victims(self, needed):
        return (self.victim(),)

    def observe(self, identity):
        pass

    def complete_query(self):
        pass

    def remember(self, identity, value, bytes_):
        assert identity not in self.entries
        kind = identity[0]
        weight = max(1, bytes_)
        self.reads[kind] += bytes_
        if identity in self.seen:
            self.rereads[kind] += bytes_
        self.seen.add(identity)
        if self.capacity is not None:
            if weight > self.capacity:
                raise ValueError("Cache capacity is smaller than a verified item")
            while self.used + weight > self.capacity:
                for victim in self.victims(self.used + weight - self.capacity):
                    _, old_weight = self.entries.pop(victim)
                    evicted = victim[0]
                    self.resident[evicted] -= 1
                    self.used -= old_weight
                    self.evictions[kind + " displaced " + evicted] += 1
        self.entries[identity] = (value, weight)
        self.resident[kind] += 1
        self.used += weight
        self.peak = max(self.peak, self.used)


def packed_bound(manifest, arm, unread):
    if unread == 0:
        return 0
    width = manifest["chunkLabels"]
    packed = manifest["reader"]

    def bytes_in(chunk):
        return min(packed["chunkLabels"], packed["traceLabels"] - chunk * packed["chunkLabels"])

    total = 0
    for start in arm["starts"]:
        end = start + arm["steps"]
        total += bytes_in(end // width)
        if start + 1 < end:
            total += sum(bytes_in(chunk) for chunk in range((start + 1) // width, (end - 1) // width + 1))
    return total


def run(live, partition, index, persistence, scan, service, store, entry, layout, manifest, workload, capacity, policy,
        *, replacement=None):
    cache = VerifiedCache(capacity) if replacement is None else replacement
    assert cache.capacity == capacity
    rows = []
    total = Counter()
    routes = Counter()
    with ExitStack() as stack:
        readers = live.VerifiedReaders(
            partition, persistence, index, scan, store, entry["trace"], manifest, layout, stack,
            cache=cache.views(partition.RECORD.size)
        )
        for ordinal, (arm, threshold) in enumerate(workload):
            unread = sum(size for chunk, size in index.packed_chunks(manifest, arm).items()
                         if chunk not in readers.packed.cache)
            upper = packed_bound(manifest, arm, unread)
            floor = readers.root_floor()
            if policy == "bounded":
                decision = live.bound(service, upper - floor)
                route = "packed" if decision == "certified-impossible" else "partition"
            elif policy == "alternating":
                route = "partition" if ordinal % 2 else "packed"
            else:
                route = policy
            method = readers.use_packed if route == "packed" else readers.use_index
            answer, bounds, work = method(arm, threshold)
            actual = arm["exactDepartures"]
            assert answer == (actual >= threshold) and bounds[0] <= actual <= bounds[1]
            assert work["packed"] <= upper and (route != "partition" or work["root"] == floor)
            assert capacity is None or cache.used <= capacity
            cache.complete_query()
            total.update(work)
            routes.update([route])
            rows.append({
                "region": arm["region"], "steps": arm["steps"], "phase": arm["phase"], "start": arm["initial"],
                "threshold": threshold, "route": route, "answer": answer,
                "oncePerMissingPackedChunk": unread, "packedUpper": upper, "unpaidRoot": floor,
                "bytes": work, "cacheBytesAfter": cache.used,
            })
    assert all(total[kind] == cache.reads[kind] for kind in ("packed", "directory", "changes"))
    return {
        "capacityBytes": capacity, "policy": policy, "routes": routes, "readBytes": dict(total),
        "totalBytes": sum(total.values()), "rereadAfterEvictionBytes": dict(cache.rereads),
        "evictions": dict(cache.evictions), "peakCacheWeight": cache.peak, "rows": rows,
        "oncePerChunkBoundFailures": sum(row["bytes"]["packed"] > row["oncePerMissingPackedChunk"] for row in rows),
    }


def matched_index_reads(runs, capacity):
    a = next(run for run in runs if run["capacityBytes"] == capacity and run["policy"] == "alternating")
    b = next(run for run in runs if run["capacityBytes"] == capacity and run["policy"] == "partition")
    matched = []
    for query, (alternating, fixed) in enumerate(zip(a["rows"], b["rows"], strict=True), 1):
        if alternating["route"] != "partition" or alternating["bytes"]["root"] or fixed["bytes"]["root"]:
            continue
        cost = lambda row: row["bytes"]["directory"] + row["bytes"]["changes"]
        matched.append({
            "question": query, "region": alternating["region"], "threshold": alternating["threshold"],
            "alternatingBytes": cost(alternating), "fixedPartitionBytes": cost(fixed),
            "extraBytesAfterAlternation": cost(alternating) - cost(fixed),
        })
    return {
        "capacityBytes": capacity,
        "matchedQuestionsAfterRootOpened": len(matched),
        "moreAfterAlternation": sum(row["extraBytesAfterAlternation"] > 0 for row in matched),
        "lessAfterAlternation": sum(row["extraBytesAfterAlternation"] < 0 for row in matched),
        "example": max(matched, key=lambda row: row["extraBytesAfterAlternation"], default=None),
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("store", type=Path)
    args = parser.parse_args()
    live = load_local("replay-live-bound-routing")
    adaptive = load_local("measure-departure-adaptive")
    partition = live.load_partition()
    index = partition.load_index()
    persistence = index.load_local("measure-parity-persistence")
    scan = persistence.load_scan()
    plan, plan_pin = scan.record(STEM + "-plan.json")
    _, live_pin = scan.record("live-bound-routing-replay.json", plan["liveReplaySha256"])
    layouts, layouts_pin = scan.record("departure-change-partition-prepared.json", plan["partitionPreparedSha256"])
    flat, flat_pin = scan.record("departure-change-index-prepared.json", plan["flatPreparedSha256"])
    reference, reference_pin = scan.record("departure-change-index-replay.json", plan["flatReplaySha256"])
    assert reference["preparationReceiptSha256"] == flat_pin["sha256"]
    command = ["node", str(Path(__file__).with_name("bounded-target.mjs")), "--lines"]
    traces = []
    with subprocess.Popen(command, stdin=subprocess.PIPE, stdout=subprocess.PIPE, text=True, bufsize=1) as service:
        for entry in flat["traces"]:
            name, manifest = partition.load_trace(persistence, args.store, entry)
            layout = next(item for item in layouts["partitions"]
                          if item["trace"] == name and item["blockLabels"] == plan["partitionLabels"])
            workload = adaptive.questions(manifest["contexts"], "mixed")
            truth = next(trace for trace in reference["traces"] if trace["trace"] == name)
            assert len(workload) == len(truth["rows"])
            outcomes = {(row["region"], row["steps"], row["phase"], row["initial"], row["threshold"]): row["answer"]
                        for row in truth["rows"]}
            for arm, threshold in workload:
                key = (arm["region"], arm["steps"], arm["phase"], arm["initial"], threshold)
                assert (arm["exactDepartures"] >= threshold) == outcomes[key]
            runs = [
                run(live, partition, index, persistence, scan, service, args.store, entry, layout, manifest, workload,
                    capacity, policy)
                for capacity in plan["capacityBytes"] for policy in plan["policies"]
            ]
            traces.append({
                "trace": name, "queries": len(workload), "runs": runs,
                "matchedIndexReads": [matched_index_reads(runs, capacity) for capacity in plan["capacityBytes"]],
            })
        service.stdin.close()
        if service.wait() != 0:
            raise RuntimeError("Bound process failed")
    print(json.dumps({
        "sources": [plan_pin, live_pin, layouts_pin, flat_pin, reference_pin], "traces": traces,
        "authority": "Counts charge verified application reads. Cache weights use encoded bytes; the retained root and manifest are separate. Counterfactual routing policies each start with fresh caches.",
    }, indent=2, allow_nan=False))
