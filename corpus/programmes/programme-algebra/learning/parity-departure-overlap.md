# Reuse inspected samples across shifted windows

The [threshold stream](parity-departure-stream.md) carries a
certificate between questions with identical windows. The
[overlap plan](parity-departure-overlap-plan.json) asks what
can carry when the windows move. For each of the six
original horizon and starting-label pairs, ask whether at
least half the windows depart, rounded up. Retain exactly
the post-start labels inspected in answering that question.

The target windows start one sample later or half a horizon
later. Each target uses its own starting-label denominator.
The replay asks every integer threshold through that
denominator. Each target starts with the original question's
observations, so the test measures transfer between windows
without additional reuse between target questions.

A retained label keeps its absolute index in the same
immutable trace. If that label lies inside a target window
and differs from the target starting label, it certifies a
departure there. An absence requires coverage of the entire
post-start interval. The indexed scan checks those conditions
before advancing its cursor. The simple cache checks each
label in the usual endpoint-first order.

| Target policy | New label reads | Logical scan probes | Windows checked against the index |
| --- | ---: | ---: | ---: |
| Fresh scan | 110,538 | 110,538 | 0 |
| Simple cache | 29,942 | 110,538 | 0 |
| Indexed cache | 28,362 | 106,884 | 2,974 |

All **154 decisions** match independent counts in the shifted
windows. The [receipt](parity-departure-overlap-replay.json)
records the initial seeded bounds and later certificates.
Collecting the source observations took 4,556 reads across
the six source questions. The target counters cover use of
those already available observations. They exclude trace
ingestion, validation reads, index building and elapsed time.
The trace was already loaded in memory.

For the higher starting label at 5.001 s, moving the origin
by half a horizon changes the denominator from six to five.
The old certificate's bounds were `[3, 6]`. Only one of
its inspected samples certified a departure in the new
windows, so the rebuilt bounds began at `[1, 5]`. Moving
the origin by just one sample carried three witnesses across.
That answered “at least three” with zero new reads instead
of 48 from a fresh scan. Across all target questions, the
indexed cache answered **37** without inspecting a new label.
The replay also refuses a cache from a changed trace snapshot.

The [persistence replay](parity-departure-persistence.md)
measures the cost of reopening, verifying and using saved
observations in a separate invocation.

```powershell
python -B tooling/programme-algebra/compare-parity-thresholds.py $parityArchive --overlap
```
