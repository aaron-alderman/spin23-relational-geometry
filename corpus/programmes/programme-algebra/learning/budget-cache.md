# Reuse a budget calculation while the facts hold

The [same-process benchmark](budget-decision-kernels.md) found that
reusing the exact negative log miss probability per trial was faster
than rebuilding an upper bound. The new stream runner uses the
[robust planner](calibration-bounds.md) on the first request for a
set of facts. Once the planner admits the case, the runner retains
the per-trial quantity from its least favorable corner.

The runner compares the full canonical JSON of the declared facts,
source, model, and other case inputs. It excludes the requested budget,
probability threshold, case ID, and question text. Reordering object
fields preserves identity. A changed time window, calibration bound,
branch rate, or trial model needs its own planner call. Only successful
admissions enter the cache. Equality within a numerical margin and
estimates near the safe-integer limit go to the original planner.
The cache lasts for one invocation with a fixed planner and evidence
set. The receipt hashes identify the input snapshots.

The [replay receipt](budget-cache-replay.json) compares each of 16
requests with a fresh planner call. It starts from the saved BART
and LORAX iron-57 facts. Shortening the emission window, lowering
the detector endpoint, and increasing the maximum competing branch
weight are controlled perturbations to those existing cases. They
test invalidation using the same case IDs. The original budgets
passed at 99%. Each of the three changed facts made its corresponding
budget fail. A dependent-trial declaration was refused twice, and a
reversed detector range was refused once.

| Policy | Exact planner calls | Incorrect decisions or admissions |
| --- | ---: | ---: |
| Fresh calculation for every request | 16 | 0 |
| Reuse keyed by admitted facts | 9 | 0 |
| Reuse keyed by case ID | — | 6 |

Seven requests reused the saved quantity, including changes in budget,
target, wording, and field order. The cache also reused results after
intervening requests with different facts. At a target equal to the
computed run chance, the original planner decided the comparison.
The case-ID control gave three stale passes and three answers for
inadmissible requests. Work counts describe planner calls, excluding
the fresh controls run to verify the replay.

The conservative identity includes source descriptions and nominal
values even when a change would leave the least favorable corner
unchanged. The [corner-dependency replay](corner-dependencies.md)
checks what can be shared across independently admitted cases.

```powershell
node tooling/programme-algebra/replay-budget-cache.mjs replay
node tooling/programme-algebra/replay-budget-cache.mjs stream requests.json
```

For `stream`, supply a JSON array of objects with `factsFile`,
`trials`, and optionally `targetProbability`. Each facts file uses
the robust planner's facts-only format and resolves relative to the
request file. Omitting the override uses the target in the facts file.
