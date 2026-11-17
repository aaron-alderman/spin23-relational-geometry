# Switch representations at a verified read budget

The [partition replay](departure-change-partition.md)
found that the cheapest representation depends on the
trace, query scope and whether questions share a cache.
The [adaptive plan](departure-adaptive-scan-plan.json)
starts with packed source without knowing how many
questions will arrive. Let the purchase cap be the lowest
announced cost of opening an entire verified index.
The cap includes the index's verification record and
all directory and payload bytes. The scan switches
before its next new source chunk would exceed that cap.
The chosen index then serves the rest of the stream.

At a switch, confirmed departures and fully scanned
absences carry forward for the current windows. The
index classifies the still-unresolved windows. The
control checks both kinds of carried evidence and
leaves a partially scanned window unresolved. The Delft
mixed stream carried **240 departure witnesses** into
the partition query at the handoff.

| Stream | Packed source | Cheapest fixed policy | Adaptive |
| --- | ---: | ---: | ---: |
| Parity, mixed | 626 B | Flat, 253 B | 493 B |
| Parity, easiest threshold per context | 256 B | Flat, 253 B | 493 B |
| Delft, mixed | 21,973 B | 4,096-label partition, 10,361 B | 21,065 B |
| Delft, easiest threshold per context | 48 B | Packed, 48 B | 48 B |
| Delft, first eighth only | 2,752 B | 4,096-label partition, 2,119 B | 2,752 B |

All decisions match the archived counts. The
[replay](departure-adaptive-scan-replay.json) charges actual
representation proof, directory and payload reads, with
common preparation descriptors and window manifests
already loaded. Its mixed sequences interleave window
contexts. The shorter sequences expose the cost of an
early end to a stream.

When the whole packed stream costs at most the cap, the
adaptive scan stays packed. A switch spends at most the
cap on packed reads and at most the cap on index reads.
This bounds total cost by twice the smaller of the
packed stream cost and the **announced** cap. Actual
partition reads can be smaller than that cap. In the
Delft mixed stream the adaptive cost even exceeds twice
the cheapest fixed cost, which is consistent with the
cap-based guarantee.

The [regional budget replay](departure-regional-budget.md)
prices only the pages and blocks intersecting each declared
region, then tests narrow and expanding streams.

Run against the prepared [partition store](departure-change-partition.md).

```powershell
python -B tooling/programme-algebra/measure-departure-adaptive.py $store
```
