# Price an index for the declared region

The [adaptive scan](departure-adaptive-scan.md) switched
representations at the cost of a whole index. The
[regional plan](departure-regional-budget-plan.json)
prices only the pages and change blocks intersecting
the declared windows, plus the verification root. The
[prepared price table](departure-regional-budget-prepared.json)
comes from verified directory records. Pricing adds
**86 table bytes and a 1,421-byte binding receipt** once
per regional run.

In Delft, the cap is **2,119 bytes** for the first
eighth and **10,711 bytes** for the full trace. A
plain regional budget switches before packed spend
would exceed the current cap. A guarded version also
checks the entire unread packed footprint for that
scope. If reading it costs at most the index cap,
the guard stays packed and reconsiders when the scope
expands.

| Workload | Packed | Fixed partition | Whole budget | Regional budget | Regional with guard |
| --- | ---: | ---: | ---: | ---: | ---: |
| First eighth only | 2,752 B | 2,119 B | 2,752 B | 5,738 B | 4,259 B |
| First eighth, then full trace | 21,973 B | 10,361 B | 21,065 B | 13,980 B | 22,572 B |
| Easy full-trace questions | 48 B | 1,171 B | 48 B | 1,555 B | 1,555 B |

The table charges pricing bytes to both regional policies.
All answers match the archived counts. The
[replay](departure-regional-budget-replay.json) verifies
that the narrow and expanding streams share their first
20 questions and each policy behaves identically on that
prefix. At question 6, the regional budget has spent
2,112 packed bytes and switches. The guard sees just
**640 unread packed bytes** in the declared region and
stays packed. Continuing that region makes the guard
cheaper. Expanding the scope makes the earlier purchase
cheaper across the complete stream.

For a fixed scope, both regional policies stay within
twice the smaller of packed stream cost and the regional
cap, before pricing overhead. If the guard declines at
the budget crossing, the remaining packed footprint is
at most another cap. For an expanding scope, the replay
bounds total work by packed bytes spent at switching
plus the final verified cap, again before pricing. It
charges actual proof and payload bytes and refuses a
changed price table.

The [scope-hint replay](departure-scope-hint.md) tests
ending and expansion hints, including cases where the
hint is wrong.

With the [partition store](departure-change-partition.md)
prepared, save the preparation output as the trusted
price receipt before scoring.

```powershell
$runner = 'tooling/programme-algebra/measure-departure-regional.py'
python -B $runner $store --prepare
python -B $runner $store --measure corpus/programmes/programme-algebra/learning/departure-regional-budget-prepared.json
```
