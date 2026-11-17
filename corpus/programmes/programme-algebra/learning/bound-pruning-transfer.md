# Preserve the requested comparison when pruning by a bound

The [scope calibration](departure-scope-calibration.md)
left expansion frequency unmeasured. A separate choice in
the same system needs no frequency estimate. An operation
can be ruled out whenever its best possible result falls
short of the actual request.

The [transfer audit](bound-pruning-transfer-replay.json)
extracts 20 decisions from the detector fit-gain and
nominal registration-budget replays. All three candidate
comparisons fit those decisions. None of the archived
ceilings lands exactly on the effective threshold. The
[plan](bound-pruning-transfer-plan.json) uses two equality
controls derived from the requests. A fit must improve
loss by **more than** its threshold, so equality rules it
out. A probability must reach **at least** its target,
so equality leaves the question open.

The [reusable calculation](../../../../tooling/programme-algebra/bounded-target.mjs)
accepts a sound upper bound, a requested comparison and
an optional conservative numerical margin. It returns
either certified impossibility or an unresolved result.
Each caller must establish the scope and validity of
its bound before using the calculation.

On ten held robust-budget queries it reproduced the
previous planner's screen. Six calls to the exact
planner could be skipped. All six match the exact
planner's failures. This is a replay of the archived
workload and certified bound.

The same rule tests a new accounting choice on the
[partition replay](departure-change-partition.md).
A fresh partition query must read its verification
root. The root gives a lower cost bound for the
partition, and the relevant packed footprint gives
an upper bound for a cold source query. The claimed
gain is strictly positive bytes saved by an equivalent
answer. With those scopes, the audit can eliminate:

| Index layout | Parity queries | Delft queries |
| --- | ---: | ---: |
| 1,024-label blocks | 10 of 154 | 10 of 40 |
| 4,096-label blocks | 10 of 154 | 0 of 40 |

For example, a shifted parity question can read all
relevant packed chunks in at most 272 bytes. The
partition root alone costs 276 bytes. The recorded
packed scan answered in 16 bytes. After the root is
already verified and held, the lower bound on marginal
root cost becomes zero and these eliminations disappear.
Both cases use the same thresholds and exact answers.

The [live replay](live-bound-routing.md) reevaluates
that bound when verification state changes and preserves
the original answer across route changes.

```powershell
node tooling/programme-algebra/audit-bound-pruning.mjs
```
