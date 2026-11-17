# Treat scope hints as forecasts about read cost

The [regional-budget replay](departure-regional-budget.md)
found a shared prefix where an early index purchase pays
if the stream expands and costs extra if it stops. The
[hint plan](departure-scope-hint-plan.json) makes those
endings explicit. It replays an early stop after four
questions, the complete narrow stream, and that same
narrow stream followed by the full trace. The endings
and hints are controlled replay inputs. All questions use
the archived Delft labels and the original thresholds.

A final-scope hint keeps the scan packed inside the named
region. If a query expands it, the planner drops the hint
and resumes with the whole-index budget. An expansion hint
loads the regional price table and permits an earlier switch.
These hints are about expected future requests. The index
and source still establish the answer from verified windows.

| Actual ending | Packed | Fixed partition | No hint | Final hint | Expansion hint |
| --- | ---: | ---: | ---: | ---: | ---: |
| Stops after four questions | 48 B | 1,171 B | 48 B | 97 B | 1,605 B |
| Completes the narrow region | 2,752 B | 2,119 B | 2,752 B | 2,801 B | 5,788 B |
| Expands to the full trace | 21,973 B | 10,361 B | 21,065 B | 21,114 B | 14,030 B |

The [replay](departure-scope-hint-replay.json) charges
49 or 50 UTF-8 bytes for the hint and 1,507 pricing bytes
when the expansion policy uses them. The hint charge
covers the delivered payload. Generating a reliable
forecast about future questions is a separate task.
Every answer matches the archived count, including
runs with false hints. Each policy behaves identically
on the prefix shared by its possible endings.

Against the no-hint policy, a true expansion hint saves
**7,035 bytes** and a false expansion hint on the complete
narrow stream costs **3,036 bytes**. The fixed partition
was cheaper on both the complete narrow and expanding
streams; packed was cheapest on the short stream.

Between the two hint policies, choosing expansion costs
2,987 extra bytes if the stream completes the narrow
region and saves 7,084 if it expands. In a workload known
to have only those two endings with these costs, the
expansion policy has lower expected cost above
`2987 / (2987 + 7084)`, about **29.7%**. That is a
break-even probability, with future frequencies still
to be measured.

The [calibration audit](departure-scope-calibration.md)
adds early endings to the cost boundary and prepares the
comparison for naturally ended request streams.

Run with the prepared [regional store](departure-regional-budget.md).

```powershell
python -B tooling/programme-algebra/measure-departure-scope-hints.py $store
```
