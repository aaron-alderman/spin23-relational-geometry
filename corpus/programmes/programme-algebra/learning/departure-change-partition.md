# Read only the change blocks a question touches

The [flat change-index replay](departure-change-index.md)
found that opening the entire Delft index was expensive
for narrow queries. The [partition plan](departure-change-partition-plan.json)
tests blocks of 1,024 and 4,096 decoded labels. Each change
is stored as a two-byte offset in the block containing its
new label. A directory entry holds the payload offset,
count and hash. The [preparation receipt](departure-change-partition-prepared.json)
pins each root, which authenticates the directory pages.
The reader opens and verifies pages and change blocks
as the scanned windows require them.

The [replay](departure-change-partition-replay.json) matches
all **194 archived answers** at both block widths. A change
at a block's first sample is included for a window ending
there and excluded when that sample is the window's start.
The preparation checks the three actual block-start changes
in Delft's 1,024-label layout. A controlled boundary case
also checks windows spanning multiple blocks. Corruption
controls refuse a changed directory page and a changed
payload block.

| Workload and cache use | Packed source | Flat index | Partition, 1,024 labels | Partition, 4,096 labels |
| --- | ---: | ---: | ---: | ---: |
| Parity, independent questions | 41,682 B | 3,925 B | 32,312 B | 15,676 B |
| Delft full trace, independent questions | 226,216 B | 337,754 B | 113,678 B | 79,227 B |
| Delft first eighth, independent questions | 27,568 B | 337,754 B | 20,022 B | 16,947 B |
| Parity, one shared cache | 626 B | 253 B | 490 B | 376 B |
| Delft full trace, one shared cache | 21,973 B | 17,110 B | 16,240 B | 10,361 B |
| Delft first eighth, one shared cache | 2,752 B | 17,110 B | 3,782 B | 2,119 B |

Each cell includes the representation's verification
metadata once for that workload, plus directory and
payload reads. The common window manifest is shared.
For the first-eighth shared Delft workload, the 4,096
layout reads a 639-byte root, 304 directory bytes and
1,176 bytes of changes. The 1,024 layout reads fewer
change bytes, at 1,078, and pays more for its directory
and root. The flat index remains cheapest on parity.
These costs cover application reads of the prepared
decoded traces.

The [adaptive replay](departure-adaptive-scan.md) starts
with packed source and tests when to switch to an index
across a mixed stream.

With the [flat store](departure-change-index.md) available,
save the preparation output as the trusted receipt and
run the replay.

```powershell
$runner = 'tooling/programme-algebra/measure-departure-change-partition.py'
python -B $runner $store --prepare
python -B $runner $store --measure corpus/programmes/programme-algebra/learning/departure-change-partition-prepared.json
```
