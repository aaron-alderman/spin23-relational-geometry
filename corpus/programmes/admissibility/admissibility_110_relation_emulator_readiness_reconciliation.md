# The relation emulator is ready to build, not waiting to be chosen

**Date:** 25 October 2026

**Status:** OT-024 specification layer closed and promoted from gated to active laboratory execution

**Topic:** OT-024

**Evidence:** [readiness reconciliation](../../../evidence/data/relation-emulator-readiness-reconciliation-v1.json)

**Generator:** [readiness auditor](../../../scripts/run-relation-emulator-readiness-reconciliation.mjs)

**Verifier:** [readiness certificate](../../../verification/admissibility/verify_relation_emulator_readiness_reconciliation.mjs)

## Result

The open-topic register still said to choose a sixteen-mode network and assign its links. The corpus had already done both. AZ-110 reconciles the completed design evidence without claiming that the unbuilt experiment has run.

The frozen contract contains sixteen addressable modes, twenty-four directed links, three disabled shared-action seams and QR-003 as the isolated wall link. Composition records have rank 23 and the direct QR-003 record raises the completed detector to rank 24. The minimal schedule contains nine path, fourteen triangle and one direct channel. Its determinant is \(-1\), its inverse is integral, and its condition number is below 9.27.

Imperfections are already typed. Reciprocal leakage lifts the wall singular value with slope four; QR-002 is the first-order seam contaminant; forward gain disorder cannot connect the isolated component; and \(\kappa>7|g|\) is a sufficient stability bound. Equal-noise reconstruction identifies QR-001 as the hardest coordinate, while 33 unused nonzero composition records remain available for precision and genuinely withheld validation.

The design layer is therefore closed. OT-024 moves from gated to active.

## What remains

No sixteen-mode device has been built. Its complex channel covariance, drift, amplifier noise and bandwidth have not been measured. The equal-noise detector ordering must be replaced by a weighted design after calibration, without opening the withheld witnesses. The final QR-003 residual must then be tested against independently measured reverse leakage, seam response and direct pickup.

Even a passing emulator would validate a programmed relation-to-operator construction, not show that nature uses the sixteen corpus sectors. The physics-promotion gate still requires an independent observable dictionary and source-derived amplitudes.

## Implication

This is a practical change in the frontier. No further abstract network design is needed before procurement. The next work is ordinary but decisive theoretical engineering: build, calibrate, blind and test. A failure would identify which directed-link or detector assumption was wrong. A passing residual test would validate the corpus's operatorization protocol. Only an independently occurring carrier with the same no-refit structure could support a new-physics reading.

## Reproduction

~~~powershell
node scripts/run-relation-emulator-readiness-reconciliation.mjs --write
node verification/admissibility/verify_relation_emulator_readiness_reconciliation.mjs
~~~
