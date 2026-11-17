# Route questions while verified blocks compete for space

The [live bound replay](live-bound-routing.md) repriced
routes after verification and eviction. The
[bounded-cache plan](departure-cache-capacity-plan.json)
lets packed chunks, index directory pages, and change
blocks compete in one least-recently-used cache. Each
entry consumes its encoded byte length, with a one-byte
minimum for empty blocks. The verified root and common
manifest remain outside that cache. Opening the root
still incurs its read cost.

The [replay](departure-cache-capacity-replay.json) runs
the 154 archived parity questions and 40 Delft questions
under four routing policies at each capacity. Every
answer agrees with the archived counts. The bounded
router reassesses marginal bytes before each question.
On these streams it chooses the partition every time
and matches the fixed partition policy.

| Delft cache capacity | Packed | Partition | Alternating | Bound-based router |
| --- | ---: | ---: | ---: | ---: |
| 512 B | 325,592 B | 105,795 B | 121,323 B | 105,795 B |
| 2,048 B | 316,872 B | 75,639 B | 103,851 B | 75,639 B |
| 8,192 B | 276,552 B | 35,327 B | 90,825 B | 35,327 B |
| Unbounded | 21,973 B | 10,361 B | 23,865 B | 10,361 B |

At 512 bytes, the Delft packed route rereads **303,619
bytes** after eviction. The partition rereads **95,434**.
On parity at the same capacity, the partition fits and
uses 376 bytes across the stream. Alternating routes
uses 11,610 bytes and rereads 10,608. The counters show
packed chunks displacing verified directories and change
blocks, as well as index entries displacing source chunks.

The paired comparison holds the current question and
route fixed and changes the preceding routing history.
At 8,192 bytes, Delft question 18 uses the partition
under both policies with the root already open. It reads
9,118 bytes after alternation and 3,642 after the fixed
partition history. This comparison reflects all earlier
choices. The eviction counters separately record when a
previously verified item was lost.

Counting every initially missing chunk once gives an
unsafe upper bound with eviction. In the 512-byte
Delft packed run, actual work exceeds that estimate on
16 questions. The new bound allows a chunk to be loaded
once per window and scan phase, even if it was resident
before the query. It returns zero when every relevant
packed chunk is resident and the query needs no insertion.
No packed decision exceeded the revised bound.

These counters measure encoded cache weight and verified
application reads. The [replacement replay](departure-cache-replacement.md)
tests whether accounting for re-verification cost helps
on held query orders.

```powershell
python -B tooling/programme-algebra/replay-departure-cache-capacity.py $store
```
