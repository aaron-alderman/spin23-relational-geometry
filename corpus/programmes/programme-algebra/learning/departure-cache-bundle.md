# Price an eviction set using completed-query reuse

The [one-victim replay](departure-cache-replacement.md)
found that protecting a costly item can force many
smaller rereads. The [bundle plan](departure-cache-bundle-plan.json)
prices the whole set of entries needed to make room.
It starts with the four oldest entries and extends
that prefix until enough bytes are available.
The solver finds the least estimated reread cost
among feasible subsets of that prefix. It breaks
ties by the fewest bytes freed and then by age.

One rule uses encoded reread bytes directly. The
other weights that cost by an entry's past query
frequency. An entry touched ten times in one query
counts once. Before a choice, the estimate uses
only completed queries and adds one used and one
unused observation. The shared denominator leaves
the same ranking when the solver uses integer
numerators.

The [replay](departure-cache-bundle-replay.json)
reproduces the earlier recency and one-victim costs
on their reference order. It then tests two fresh
fixed permutations of the archived questions,
covering 24 trace, order, capacity and route
combinations. All answers match the independent
counts. The new orders reuse the same two decoded
traces.

| Policy against recency | Fewer bytes | Equal bytes | More bytes | Net bytes saved |
| --- | ---: | ---: | ---: | ---: |
| Encoded cost, one victim at a time | 9 | 12 | 3 | 24,492 |
| Bundle priced in bytes | 11 | 10 | 3 | 21,780 |
| Bundle weighted by past reuse | 12 | 10 | 2 | 46,441 |

The solver matched exhaustive subset search in 200
small mechanical controls. Exact bundle sizing alone
cost 2,712 bytes more than the one-victim rule in
aggregate. The completed-query history is what improved
the bundle result here. The reuse-weighted policy saved
6,320 bytes on one Delft partition stream at 2,048 bytes
of capacity. It added 1,628 on a different Delft
partition order at 512 bytes.

The reuse-weighted solver examined **299,071 candidate
states** on the held orders. The receipt reports those
states and history counts separately from encoded
cache weight and read bytes. The [timing comparison](departure-cache-bundle-fast.md)
tests exact shortcuts and charges selection time as
well as reread work.

Run with the prepared [partition store](departure-change-partition.md).

```powershell
python -B tooling/programme-algebra/replay-departure-cache-bundles.py $store
```
