# Resume a departure scan across threshold questions

The [cold parity replay](parity-departure-threshold.md) found
that endpoints-first used the fewest label inspections over
the tested questions. The [stream plan](parity-departure-stream-plan.json)
keeps that order and interleaves questions across three
horizons and both starting labels. It asks every threshold
and repeats two requests per context.

The scan state retains each departure witness, each
fully scanned absence, and its position in the remaining
grid. A question whose threshold is outside the unresolved
range is answered from those facts. A harder question
resumes scanning. The live state is keyed by the trace hash,
horizon, starting label, ordered windows and schedule.
Changing the threshold reuses the same state. The six
contexts keep their own states.

| Same endpoint-first scan | Requests | Post-start label inspections |
| --- | ---: | ---: |
| Start cold for every request | 89 | 56,631 |
| Retain scan state | 89 | 7,956 |

The retained scan used **86% fewer inspections**, and
**69 requests** used only accumulated bounds. The
[receipt](parity-departure-stream-replay.json) records
each bound before and after the query. The replay checks
all decisions against the archived full counts and
independently validates the witness samples and scanned
absences. The cold scan still reproduces its earlier receipt.

At 5.001 s for the higher starting label, a request for
at least six departures left the count bounded by **four
and five**. That was enough to reject six and immediately
answer a later request for at least three. A request for
at least five required more work and narrowed the bounds to
**four and four**. A subsequent request for at least four
needed zero new inspections, compared with 116 when cold.

The count excludes trace ingestion, work to identify
starting labels, and validation reads. These are decisions
on one decoded figure excerpt. The scan cursor currently
lives for one invocation. A saved receipt carries the
bounds and evidence but cannot resume the cursor by itself.

The [shifted-window test](parity-departure-overlap.md) reuses
inspected labels while establishing fresh certificates for
the new windows and denominators.

```powershell
python -B tooling/programme-algebra/compare-parity-thresholds.py $parityArchive --stream
```
