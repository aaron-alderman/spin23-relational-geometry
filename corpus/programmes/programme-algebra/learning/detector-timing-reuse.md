# Extract and challenge a timing-profile reuse candidate

The [reuse plan](detector-timing-reuse-plan.json) reads the
third calibration run and field-filter score receipts.
It verifies per-block coverage against the existing
50-net-wide-pair floor, then recomputes each forecast's
median error from the held blocks. A policy becomes a
candidate when it has the lowest median in every scored
training band and run. Ties stay in the candidate set.
The [frozen proposal](detector-timing-reuse-candidate.json)
selects the unchanged reference. Both training runs share
channels 1 and 2 and one apparatus. The score floor comes
from the earlier design. [Air-filter archive](https://doi.org/10.57804/0tjh-3b49)

The challenge uses Uppsala sodium-22 and bismuth-207, which
had previously been examined with cumulative gates and
were new to the signed comparison. The two archives use
different detector readouts. The challenge declines direct
carry of the numerical air-filter profile and uses the
Uppsala cobalt template with its existing energy bands,
centers and controls. It compares the unchanged local
template with a shift and a profile fitted to the first
40% of each target when that early band has at least 100
net wide pairs. [Uppsala archive](https://doi.org/10.57804/43jy-vw03)

| Target | Band-blocks supporting all three forecasts | Median unchanged error | Median shifted error | Median early target error |
| --- | ---: | ---: | ---: | ---: |
| Sodium-22 | 12 | 17.60 points | 15.16 points | 3.98 points |
| Bismuth-207 | 9 | 21.02 points | 22.39 points | 12.65 points |

The unchanged profile loses to the early target profile in
all twelve sodium comparisons. That sets a limit on taking
the air-filter winner as the default policy across archives.
The errors are half the summed absolute difference in
normalized net bin counts. Each matched band and block
gets equal weight in the table.

Bismuth's lowest band has 98.25 net wide pairs in its early
segment, below the adaptation floor. The unchanged local
template can still be scored in the first two late blocks,
with 64 and 61 net wide pairs. The third has 31.25. The
[challenge receipt](detector-timing-reuse-challenge.json)
preserves the raw counts there and withholds a score.

Candidate extraction from the saved run receipts needs
zero pulse reads. The support decision saves a fit in the
sparse early bismuth band and provides two judgments from the
existing calibration. Retain the count check and the failed
attempt to transfer the winner. The next test should freeze
a choice between unchanged and adapted profiles using only
early target evidence, then check that choice on held time
blocks of a new source. Use the measured early discrepancy
and count support as inputs to that decision.

The [early routing replay](detector-timing-routing.md)
tests that choice on caesium and replays sodium and bismuth.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$runner = 'tooling/programme-algebra/audit-detector-timing.py'
$dir = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-hpge-2025-324'
$base = "$lane/detector-timing-uppsala-inclusive-plan.json"
$plan = "$lane/detector-timing-reuse-plan.json"
python -B $runner $base $dir --profile-reuse $plan
python -B $runner $base $dir --profile-reuse $plan --score "$lane/detector-timing-reuse-candidate.json"
```
