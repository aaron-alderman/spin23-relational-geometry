# Test whether costly verification deserves cache space

The [capacity replay](departure-cache-capacity.md)
measured rereads after eviction. The
[replacement plan](departure-cache-replacement-plan.json)
fixes two alternatives to least-recently-used eviction.
Both consider the four oldest entries. One evicts
the entry with the smallest encoded read cost. The
other also counts a change block's directory page
when that page is absent. Cost ties go to the oldest
entry.

The [replay](departure-cache-replacement-replay.json)
reproduces the earlier recency results in their original
order, then compares two held orders. One reverses
thresholds within each context rotation. The other
uses a fixed hash permutation of question keys. These
orders use the same archived traces and questions.
The capacities, verification routines, and route
sequences are identical across replacement policies
within each comparison.

| Policy against recency | Fewer bytes | Equal bytes | More bytes | Net bytes saved |
| --- | ---: | ---: | ---: | ---: |
| Encoded cost | 8 | 12 | 4 | 18,728 |
| Cost with directory dependency | 8 | 12 | 4 | 17,946 |

Each comparison includes 24 held streams. Every
answer matches the archived count. The encoded-cost
rule's largest saving is **4,176 bytes** on the
permuted Delft alternating stream with a 2,048-byte
cache. Its largest loss is **2,474 bytes** on the
reverse-threshold parity alternating stream at 512
bytes. There it saves 608 directory bytes and reads
3,082 extra packed bytes. Retaining the expensive
directory consumes space that the nearby packed
queries use repeatedly.

The same 8,192-byte Delft partition changes which
replacement policy wins when the order changes.
Encoded cost saves 3,708 bytes in reverse-threshold
order and adds 812 under the fixed permutation.
Including directory dependencies changes some costs
again and yields fewer aggregate savings than encoded
cost alone in this replay.

Absolute reread cost is useful evidence for replacement,
with its benefit depending on the space an entry occupies
and how soon it is reused. The [bundle replay](departure-cache-bundle.md)
prices the whole eviction set and tests a reuse estimate
from completed queries.

Run with the prepared [partition store](departure-change-partition.md).

```powershell
python -B tooling/programme-algebra/replay-departure-cache-replacement.py $store
```
