# Experiment exit audit v1

**Generated:** 2026-10-25  
**Status:** 357 explicit programme cells remain missing across 21 experiments  
**Machine authority:** [experiment exit audit](experiment_exit_audit_v1.json)

The existing atlas establishes one controlled experiment per frontier area, complete topic/detector crosswalks, interventions, records, controls and stop rules. EXIT-03 is stricter. It refuses to infer a strongest conventional null, detector transfer function, covariance model, sensitivity calculation, replication rule or physics decision from nearby prose. Those items must be explicit because they determine what a result can actually mean.

| Required field | Experiments missing an explicit value |
|---|---:|
| hypothesis | 0 |
| strongest conventional null | 21 |
| carrier and preparation | 21 |
| controlled variables | 21 |
| observables | 21 |
| detector transfer function | 21 |
| calibration and reference channels | 21 |
| nuisance and covariance model | 21 |
| predicted signal scale | 21 |
| power or sensitivity calculation | 21 |
| blind or preregistered analysis rule | 21 |
| build go no go | 21 |
| bridge go no go | 21 |
| physics go no go | 21 |
| positive null ambiguous outcome branches | 21 |
| replication rule | 21 |
| data metadata and code release contract | 21 |
| claim status propagation | 21 |

No experiment is EXIT-03-ready until all required fields and the build, bridge and physics decisions are explicit. The v1 atlas remains valid as a design atlas; this audit measures the work needed to turn it into a decision-complete experimental programme.

## Reproduction

~~~powershell
node scripts/generate-experiment-exit-audit.mjs --write
node verification/frontier-physics-targets/verify_experiment_exit_audit.mjs
~~~
