# Pay for saved observations one block at a time

The [persistence replay](parity-departure-persistence.md)
found that reopening whole observation files cost more than
starting cold. The [compact plan](parity-departure-compact-plan.json)
stores two bitmaps per populated chunk, one for known sample
positions and one for their decoded labels. A full 128-label
chunk uses 32 bytes. The [preparation receipt](parity-departure-compact-prepared.json)
pins the offset, length, known-label count and hash of each
block in the 2,816-byte compact store.

The eager policy reads saved blocks intersecting the target
windows and uses their observations to seed the count bounds.
It declines the seed pass if its announced bytes alone reach
the cost of reading the entire relevant part of the source.
The guarded policy follows the cold scan order. When it first
needs a chunk, it opens a saved block only if the block covers
every label in that chunk and is smaller than the source
chunk. It otherwise opens the verified source. Full coverage
ensures the saved block replaces a source read for the query.

| Policy | Source bytes | Saved bytes | Total payload bytes | Queries with more bytes than cold |
| --- | ---: | ---: | ---: | ---: |
| Cold | 333,281 | 0 | 333,281 | 0 |
| Eager compact | 199,009 | 95,008 | 294,017 | 40 |
| Guarded compact | 322,273 | 2,752 | 325,025 | 0 |

All **154 decisions** agree with the independent shifted-window
counts. The guarded run also reproduces the cold scan's bounds
and substitutes compact blocks for 86 source chunks. The
[replay](parity-departure-compact-replay.json) records each
query's bytes and rejects a damaged compact block.

The compact receipt adds **19,378 bytes** once per batch.
Including it, the eager policy saves **19,886 bytes** versus
cold, about six percent. The guarded policy costs **11,122
bytes** more once that receipt is charged. The byte guarantee
for guarded applies per query after metadata is available.
Eager also raised block reads from 2,627 to 4,547. The
measurements cover application file reads from a prepared
store, with operating-system caching left in place.

The [bit-packed source replay](parity-departure-bit-source.md)
rechecks the comparison when the source stores one bit per
decoded label.

After preparing the store with the [persistence runner](parity-departure-persistence.md),
retain the compact preparation output at the receipt path
shown below and use it for the replay.

```powershell
$runner = 'tooling/programme-algebra/measure-parity-compact.py'
python -B $runner $store --pack
python -B $runner $store --measure corpus/programmes/programme-algebra/learning/parity-departure-compact-prepared.json
```
