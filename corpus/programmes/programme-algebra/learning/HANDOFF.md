# Grand Theory Programme Algebra Handoff

## Purpose and current state

The research goal is to make a computer learn reusable operations from its investigations. A run keeps the original inputs, rejected routes, repaired calculation, and verification receipt. Later runs receive facts and a requested result. They discover candidate operations from the saved records, check that each candidate applies, and reuse the parts of the calculation that have matching inputs. The longer-term aim is a computer that can explain which facts admit an answer, what could change the answer, and where probability enters.

Jordan algebra and Lie algebra motivated the distinction between admissibility and allowed change. The executable work currently expresses that distinction with typed inputs and outputs, explicit conditions, and numerical operations. A formal Jordan–Lie algebra account of the implementation remains open.

The research goal is **paused**. The working checkout is `C:/Users/aaron/grand-theory/worktrees/transition-learning`, branch `codex/transition-learning`, HEAD `b7d7f248`. The learning records and most runners are untracked in this worktree, and the programme README has local edits. Carry the worktree files forward with the Git revision. The [learning README](README.md) indexes the original transition and detector work.

## What the computer learned

| Investigation | Result and scope |
| --- | --- |
| AZ-121 → AZ-122 | The scattering-to-bound overlap was an amplitude per square root of energy. The repair normalized a packet, evolved the coupled electron and phonon state with its phases intact, and projected onto the capture sector. The saved lesson requires a supported conversion from the supplied quantity to the requested observable. [Journey](az-121-to-122.json) |
| Helium → calcium → iron-57 | Helium’s measured lifetime gave a 7.34% exit probability within 600 s under constant intrinsic hazard. A fresh agent reused the operation for free calcium and obtained 19.27% within 250 ms. The same operation refused beam-on calcium because the intrinsic lifetime alone supplies no calibrated driven-loss model. Iron-57 composed survival, branching, detector acceptance, independent repetitions, and calibration-box planning. [Helium](az-127-helium-replay.json) · [Calcium](fresh-agent-calcium/README.md) · [Iron-57 calibration box](fresh-agent-calibration-box/README.md) |
| Candidate extraction | A product and a fitted acceptance-only shortcut both matched the first detector replay. Changing the source probability separated them. That exercised the extraction method against computed outputs. A separate caesium-137 comparison tested the normalization against published acquisitions and rejected substitution of the frozen iron-57 factor. [Proposal audit](proposal-audit.md) |
| No-route execution | The facts-only planner discovered chains of one to five operations from the requested output and the saved types. It checked admissibility before numerical evaluation, reused shared pieces of admitted cases, and preserved driven-calcium refusal. Mean lifetime and population half-life became alternate inputs to the same survival law. Conflicting values stopped evaluation. [Mixed-chain replay](admitted-chain-transfer.md) · [Timing routes](timing-routes.md) |
| Return and readout | Being away at readout and having been observed away are distinct when return is possible. Thinning Delft’s interior samples preserved the endpoint forecast and changed the sampled-departure forecast. One held 551.5 mV repeat qualified the higher-start endpoint at a one-point tolerance. At 551.75 mV, none of the four forecasts passed across both whole-trace holdouts. The decoded data leave continuous physical first exit undetermined. [Return routes](return-routes.md) · [Held qualification](return-path-delft-qualification.md) · [Neighboring setting](return-path-delft-row75.md) |

## Reusable rules and their boundaries

- **Prune against the actual comparison.** A bound equal to a strict improvement target rules out the route. Equality at an inclusive probability target leaves the result unresolved. The rule reproduced ten robust-budget screens and identified partition queries whose unpaid verification root already exceeded the packed-source read ceiling. [Bound transfer](bound-pruning-transfer.md)
- **Keep admitted facts, numerical dependencies, and costs separate.** Independently admitted cases can share a survival calculation or branch fraction when the inputs match. For data access, verified samples can seed a new window’s certificate only within its actual boundaries. A root that has already been verified has zero marginal root cost. Eviction restores the cost. [Corner dependencies](corner-dependencies.md) · [Shifted windows](parity-departure-overlap.md) · [Live routing](live-bound-routing.md)
- **Price the strongest equivalent fallback.** Compact saved observations helped against a byte-per-label source and lost that advantage against a bit-packed source. A flat change index worked well on sparse parity. Verified partitions helped Delft’s broader streams. Routing cost depends on the representation, query scope, and reuse of verification. [Packed source](parity-departure-bit-source.md) · [Change index](departure-change-index.md) · [Partitions](departure-change-partition.md)
- **Separate a break-even probability from an observed frequency.** Controlled Delft endings establish the cost of acting on an expansion hint. Against the no-hint policy, break-even ranges from 18.1% to 30.1% expansion depending on how often nonexpanding streams stop early. The audit found no naturally ended departure-query cohort with paired read costs. [Scope calibration](departure-scope-calibration.md)

## Last verified benchmark

Reuse-weighted eviction reduced encoded reads by 46,441 bytes versus recency across 24 held order, trace, capacity, and route combinations. It won 12, tied 10, and lost two. Those orders rearrange the same archived parity and Delft questions. Exact shortcuts then matched all **62,574** eviction decisions and cut the median selection loop from **223.9 ms to 135.3 ms**. The guarded policy read fewer bytes and took longer than recency on the two timed warm-file streams. Verification, actual read calls, and CPU time are separate costs. [Bundle replay](departure-cache-bundle.md) · [Timing benchmark](departure-cache-bundle-fast.md)

## Next experiment

1. Count actual verified read calls by representation in the two benchmark streams. Track packed chunks, directory pages, change payloads, and root reads separately. Compare recency with the guarded bundle solver using identical questions and cache capacities.
2. Compute the extra miss latency needed to repay the guarded solver’s warm-run overhead. If the guarded solver saves `N` reads and takes `T` extra warm milliseconds, a uniform added delay breaks even at `T / N` milliseconds per read. For different read types, weight each read-count difference by its own delay. A nonpositive reduction in read calls leaves the uniform-delay crossover unavailable.
3. Run controlled delays below and above that crossover, rotating policy order after warmup. Report per-stream answer equality, bytes, reads, selection time, and end-to-end time. Keep the injected-delay measurements separate from claims about any storage device.

## Reproduction commands

Run from the worktree root. The last verified environment used Node **24.22.1** and bundled Python **3.12.14**. The Delft preparation uses NumPy.

```powershell
$tools = 'tooling/programme-algebra'
$lane = 'corpus/programmes/programme-algebra/learning'
$python = 'C:/Users/aaron/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe'
$store = Join-Path $env:TEMP 'grand-theory-change-index-1394efd2b26d2'

node "$tools/plan-admitted-budget.mjs" transfer
node "$tools/plan-admitted-budget.mjs" return-routes
node "$tools/audit-bound-pruning.mjs"
& $python -B "$tools/benchmark-departure-cache-bundles.py" $store
& $python -B "$tools/benchmark-departure-cache-bundles.py" $store --benchmark
```

The prepared store and its source inputs were present when this handoff was written. Rebuild the store if needed with the archived inputs and the checked receipts:

```powershell
$parityArchive = Join-Path $env:TEMP 'grand-theory-parity-7249678/figure_data.zip'
$traceDir = Join-Path $env:TEMP 'grand-theory-parity-19103525'

& $python -B "$tools/measure-departure-change-index.py" $store --parity-archive $parityArchive --delft-dir $traceDir
& $python -B "$tools/measure-departure-change-partition.py" $store --prepare
```

Match the preparation outputs against the [flat](departure-change-index-prepared.json) and [partition](departure-change-partition-prepared.json) receipts. The source acquisition instructions are in the [parity](return-path-parity.md) and [Delft](return-path-delft.md) records. The untimed benchmark output matches the `replay` field of the [timed receipt](departure-cache-bundle-fast-benchmark.json). The timing samples vary by run.
