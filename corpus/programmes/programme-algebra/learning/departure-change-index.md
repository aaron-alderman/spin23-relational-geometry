# Answer departure questions from label changes

The [packed-source test](parity-departure-bit-source.md)
found that a complete binary label block cost less to read
than saved partial observations. The
[change-index plan](departure-change-index-plan.json)
tests a smaller input for the same questions. A window
contains an observed departure exactly when the first label
change strictly after its start is at or before its endpoint.
Binary search in a complete change list supplies that fact.
The scan can stop once confirmed windows settle the count
threshold.

The [preparation record](departure-change-index-prepared.json)
pins both packed source chunks and each sorted index. Packing
checks that the change positions reconstruct the label runs.
The replay uses all 154 shifted-window questions from the
Iaia trace and 40 questions from Delft repeat 9. The Delft
windows use the previously frozen decoder, either the full
trace or the first eighth. Every decision matches an
independent direct count in its windows. The replay also
refuses a changed index payload.

| Decoded trace | Labels | Changes | Packed source bytes | Flat index bytes |
| --- | ---: | ---: | ---: | ---: |
| Iaia parity | 5,001 | 12 | 626 | 24 |
| Delft repeat 9 | 175,781 | 4,219 | 21,973 | 16,876 |

| Workload | Cold source, reopen per question | Flat index, reopen per question | Shared source within batch | Shared index within batch |
| --- | ---: | ---: | ---: | ---: |
| Parity, 154 questions | 41,682 | 3,696 | 626 | 24 |
| Delft full trace, 20 questions | 226,216 | 337,520 | 21,973 | 16,876 |
| Delft first eighth, 20 questions | 27,568 | 337,520 | 2,752 | 16,876 |

The table measures payload bytes; the index adds a
verification record of 229 bytes for parity or 234 bytes
for Delft once per invocation. Including that verification,
the shared parity index costs **253 bytes** versus **626**
for shared source. The shared full Delft index costs
**17,110** versus **21,973**. For the first eighth of Delft,
the whole index costs more than six times the packed source
read by the batch. [Replay and verification counts](departure-change-index-replay.json)

The size check can reject an index before opening it if
its payload reaches the cost of every source chunk
intersecting the windows. It selected packed source for
all first-eighth Delft questions and ten full-trace Delft
questions. Its full-trace Delft payload was 222,328 bytes
across independent queries, before the index proof. The
check rules out a provably unhelpful index. Early stopping
can still make a cold scan cheaper than an allowed index.

The [partition replay](departure-change-partition.md) verifies
only the blocks touched by the query and tests changes at
block boundaries.

```powershell
$runner = 'tooling/programme-algebra/measure-departure-change-index.py'
python -B $runner $store --parity-archive $parityArchive --delft-dir $traceDir
python -B $runner $store --measure corpus/programmes/programme-algebra/learning/departure-change-index-prepared.json
```
