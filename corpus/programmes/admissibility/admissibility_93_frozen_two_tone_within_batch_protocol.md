# The two-tone population bridge survives complete protocol freezing

**Date:** 25 October 2026
**Status:** fixed within-batch point-prediction protocol closed; joint uncertainty and external replication open
**Topics:** OT-027
**Parent:** [AZ-092 adaptive two-point bridge](admissibility_92_two_point_population_state_bridge.md)
**Evidence:** [frozen two-tone audit](../../../evidence/data/zenodo-eis-frozen-two-tone-protocol-v1.json)
**Verifier:** [frozen-protocol certificate](../../../verification/admissibility/verify_zenodo_eis_frozen_two_tone_protocol.mjs)

## Result

The protocol is now fixed before each target is considered: measure complex impedance at exactly **10 kHz** and **2.8219349 Hz**, standardize those four real coordinates using the other 53 cells, select exactly **three** nearest donors, average their frozen passive parameter vectors, and predict the fifteen modulo-three evaluation rows.

All **54 of 54** cells pass. The population median cellwise median error is **0.674%**; the worst median is **2.290%** (`ID22`); the worst maximum is **5.503%** (`ID07`). There are no target-specific frequency, neighbour-count or basis choices.

## Implication

AZ-092's adaptive discovery promotes to a single reproducible within-batch rule. The two measurements retain complementary state: the high-frequency port coordinate and a low-frequency relaxation/diffusion coordinate. Their relationship to the donor population is enough to select a passive response that predicts the remainder of the spectrum under the declared accuracy ceiling.

This is a concrete theoretical-engineering improvement, not new physics. It does not provide a simultaneous predictive distribution, measurement or fixture covariance, causal material identification, detector likelihood, generated dynamics or external-batch validation. The two frequencies are learned from this batch and must be tested unchanged on a separately acquired batch.

## Next gate

Use donor residual vectors to predeclare a simultaneous whole-spectrum prediction region, then evaluate calibration and coverage without changing the two tones or three-neighbour rule. Separately acquired cells are the decisive external gate.

## Reproduction

~~~powershell
node scripts/run-zenodo-eis-frozen-two-tone-protocol.mjs --write
node verification/admissibility/verify_zenodo_eis_frozen_two_tone_protocol.mjs
~~~
