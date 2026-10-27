# Experiment exit audit v1

**Generated:** 2026-10-26

**Status:** 0 explicit programme cells remain missing across 22 experiments

**Machine authority:** [experiment exit audit](experiment_exit_audit_v1.json)

The existing atlas establishes one controlled experiment per frontier area, complete topic/detector crosswalks, interventions, records, controls and stop rules. EXIT-03 is stricter. It refuses to infer a strongest conventional null, detector transfer function, covariance model, sensitivity calculation, replication rule or physics decision from nearby prose. Those items must be explicit because they determine what a result can actually mean.

| Required field | Experiments missing an explicit value |
|---|---:|
| hypothesis | 0 |
| strongest conventional null | 0 |
| carrier and preparation | 0 |
| controlled variables | 0 |
| observables | 0 |
| detector transfer function | 0 |
| calibration and reference channels | 0 |
| nuisance and covariance model | 0 |
| predicted signal scale | 0 |
| power or sensitivity calculation | 0 |
| blind or preregistered analysis rule | 0 |
| build go no go | 0 |
| bridge go no go | 0 |
| physics go no go | 0 |
| positive null ambiguous outcome branches | 0 |
| replication rule | 0 |
| data metadata and code release contract | 0 |
| claim status propagation | 0 |

No experiment is EXIT-03-ready until all required fields and the build, bridge and physics decisions are explicit. The v1 atlas remains valid as a design atlas; this audit measures the work needed to turn it into a decision-complete experimental programme.

## Reproduction

~~~powershell
node scripts/generate-experiment-exit-audit.mjs --write
node verification/frontier-physics-targets/verify_experiment_exit_audit.mjs
~~~
