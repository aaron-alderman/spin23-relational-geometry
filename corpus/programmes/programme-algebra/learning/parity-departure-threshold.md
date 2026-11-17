# Certify a departure count with fewer label inspections

The [Delft investigation](return-path-delft-row75-abstention.md)
separated a failed forecast interval from an exact relation
between grids. This test transfers the exact relation to
Iaia et al.'s independently archived QA parity trace and its
author-decoded labels. It preserves the three horizons and
disjoint windows from the [parity case](return-path-parity.md).

For a fixed starting label, seeing a different label at any
retained sample proves one departure in that window on the
full grid. A window with no observed departure on a coarse
grid remains unresolved. Only checking every base-grid sample
can prove absence. These facts bound the count between the
number of witnesses and the number of windows minus the
confirmed absences. A threshold is decided as soon as either
bound settles it.

The [plan](parity-departure-threshold-plan.json) compares
three orders for checking samples. Each stops early when the
same bounds allow it. It tests every integer threshold for
each horizon and starting label, with no memoization across
questions. All **77 decisions** match direct counts on the
archived labels. The [receipt](parity-departure-threshold-replay.json)
keeps the witness indices, confirmed absences, and bounds.

| Scan order | Post-start label inspections | Decisions resolved before the full grid |
| --- | ---: | ---: |
| Direct in sample order | 78,626 | 0 |
| Endpoints, then remaining samples | 52,066 | 22 |
| Endpoints, then strides 50, 10, and 1 | 54,302 | 27 |

On the primary 5.001 s horizon, six windows start at the
higher label. Four depart and only two end at the other
label. To verify at least four departures, the direct
early-stopping scan inspected 544 labels. Checking endpoints
first reduced that to 116, and adding the intermediate
grid reduced it to nine. Across all questions, the
intermediate grids resolved five extra questions before
the full grid and used 2,236 more inspections than
the endpoint-first scan.

This measures comparisons after the trace is loaded and
the window starts are identified. It supplies no timing
claim or evidence about switches between decoded samples.
Changing the windows, starting-level denominator, or
underlying decoder breaks the reuse premise. An invalid
non-nested schedule is refused in the replay. All questions
reuse one figure excerpt, so their count measures the scope
of the replay rather than independent experimental evidence.

The [threshold stream](parity-departure-stream.md) retains
the witness and absence bounds between questions and
measures the inspections saved as the threshold changes.

```powershell
python -B tooling/programme-algebra/compare-parity-thresholds.py $parityArchive
```
