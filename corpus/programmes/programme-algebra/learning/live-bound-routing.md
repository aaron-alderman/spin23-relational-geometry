# Reprice a route when its verification state changes

The [bound transfer audit](bound-pruning-transfer.md)
found that some indexes could be pruned when their
unpaid root cost exceeded the whole relevant packed
footprint. The [live replay](live-bound-routing-replay.json)
now calls the same strict-improvement check while
running actual scans. Each question takes the unpaid
root as the partition's lower cost bound and the
unread relevant chunks as the packed upper bound.
Both bounds concern the same verified decoded trace
and window denominator.

The [plan](live-bound-routing-plan.json) asks a narrow
question cold, verifies the index through broader
archived questions, and repeats the original question
with the packed cache cleared. It then warms the
remaining packed chunks as a controlled prefetch and
repeats the question before and after eviction. The
answer stays the same in all four states.

| State, Delft narrow question | Unread packed upper bound | Unpaid root floor | Route | New bytes |
| --- | ---: | ---: | --- | ---: |
| Both cold | 1,232 B | 1,792 B | Packed | 16 B |
| Verified index, packed cache cleared | 1,232 B | 0 B | Partition | 0 B |
| Verified index and packed scope | 0 B | 0 B | Packed | 0 B |
| Both evicted | 1,232 B | 1,792 B | Packed | 16 B |

Parity shows the same decision sequence, starting with
a 272-byte packed upper bound and a 276-byte root floor.
The broader questions also verify the relevant index
blocks, so the warm repeat reads zero bytes. A separate
packed replay from that same cache state reads 16 bytes
on each trace. Reusing the old cold-root price would
therefore wrongly eliminate the cheaper route in both
cases. At equality with both caches warm, the request
for a strict byte saving again rules out the index.

All 172 answers, including repeated controls, agree
with the archived counts. The replay refuses a changed
root before opening directory or change data. It charges
the controlled packed prefetch separately at 272 bytes
for parity and 1,232 for Delft. The warm-repeat comparison
uses the cache left by the broader queries. An unresolved
bound leaves the route available; this replay prefers the
index in that case to exercise the verification state.

The [bounded-cache replay](departure-cache-capacity.md)
measures how earlier route choices affect subsequent
questions when verified blocks compete for space.

Run with the prepared [partition store](departure-change-partition.md).

```powershell
python -B tooling/programme-algebra/replay-live-bound-routing.py $store
```
