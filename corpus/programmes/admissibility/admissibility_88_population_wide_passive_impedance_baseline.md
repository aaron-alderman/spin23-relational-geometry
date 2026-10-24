# The frozen passive basis predicts all 54 measured cells

**Date:** 25 October 2026  
**Status:** population held-out baseline closed under per-cell fitting; shared-law and covariance gates open  
**Topics:** OT-027  
**Parent:** [AZ-087 one-cell measured bridge](admissibility_87_source_native_measured_impedance_held_out_prediction.md)  
**Evidence:** [population audit](../../../evidence/data/zenodo-eis-population-passive-audit-v1.json)  
**Verifier:** [population certificate](../../../verification/admissibility/verify_zenodo_eis_population_passive_audit.mjs)

## Result

The AZ-087 protocol was frozen and applied independently to all 54 Zenodo cells. Every cell retains the same 44-point frequency grid, 29/15 training/held-out split, nonnegative series-R/L plus five fixed-centre Debye arcs and Warburg basis, and 5% median / 20% maximum relative-error decision rule.

All 54 cells pass. Across cells:

- median of the cellwise median held-out errors: **0.576%**;
- worst cellwise median held-out error: **0.713%** (`ID15`);
- median of the cellwise maximum errors: **3.623%**;
- worst held-out maximum: **3.914%** (`ID21`).

The conventional passive family therefore covers the measured population comfortably under per-cell parameter fitting.

## What closed—and what did not

This closes cross-cell generalization of the *basis and decision rule*. It does not establish one shared parameter vector: each cell was calibrated separately inside the frozen cone. It also does not supply pointwise measurement covariance, replicate variance or a detector likelihood.

The implication is restrictive in the useful sense. Residuals at the few-percent level in this dataset are already compatible with a small passive family. A frontier claim cannot use such a residual without first beating this population baseline, instrument/fixture nuisance terms and uncertainty.

The next exact gate is hierarchical: fit a shared population distribution or leave-one-cell-out parameter predictor using only other cells, then predict the held-out cell without recalibration. That separates a common law from a reusable model class. No new-physics reading is licensed here.

## Reproduction

~~~powershell
node scripts/run-zenodo-eis-population-passive-audit.mjs --write
node verification/admissibility/verify_zenodo_eis_population_passive_audit.mjs
~~~
