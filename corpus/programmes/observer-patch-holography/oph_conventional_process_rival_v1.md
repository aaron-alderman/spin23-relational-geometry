# OPH conventional instrument and process rival

**Date:** 27 October 2026  
**Status:** synthetic rival and anomaly control passed; device fitting remains open  
**Topic:** OT-055  
**Evidence:** [deterministic receipt](../../../evidence/data/oph-conventional-process-rival-v1.json)  
**Replay:** `node scripts/run-oph-conventional-process-rival.mjs --write evidence/data/oph-conventional-process-rival-v1.json`  
**Verification:** `node verification/admissibility/verify_oph_conventional_process_rival.mjs`

## Result in ordinary language

The digital OPH benchmark does not yet require new physics. An ordinary finite-dimensional quantum instrument with four shared imperfections—loss of contrast, dephasing with repetition depth, a phase-reference offset and readout flips—was fitted only to designated training settings. The frozen fit then predicted eight held-out phase/depth records across `C0`, `C`, `E` and `T`; the largest standardized residual was `1.41`, below the predeclared `4.5` threshold. A fifth shared parameter also reproduced the noisy adjacent-order distributions.

This is good news of the disciplined kind. It says the target is coherent enough to engineer and sharp enough to test, while preventing an ideal emulator from being mistaken for evidence beyond ordinary quantum mechanics.

## What was tested

The retained receipt uses a fixed random seed and synthetic qualification data. The generating values are hidden from the fit except through the training records. A common model predicts

\[
p_+(L,n,\theta)=r+(1-2r)\left[\frac38+
\frac12V\lambda^{n-1}g_L^n\cos(\theta+\phi)\right],
\]

where `V` is visibility, `lambda` is per-step dephasing, `phi` is the phase offset, `r` is readout flip probability and `g_L` is the exact law multiplier. No setting receives its own nuisance refit. The best grid fit is

| quantity | fitted value |
|---|---:|
| visibility | `0.940` |
| per-step dephasing | `0.965` |
| phase offset | `0.080 rad` |
| readout flip | `0.014` |
| schedule visibility | `0.915` |

The exercise is a pipeline qualification, not an empirical likelihood analysis. Real data will require calibrated covariance, model comparison and uncertainty on fitted parameters rather than this deterministic grid receipt.

## The anomaly ladder

A probability displacement of `+0.04` was injected into one held-out `C`, depth-three setting. The frozen model rejected it at `19.63` standard errors. That is an anomaly trigger, but it is not a cause. A freely added setting-specific offset can reproduce one such point exactly. The offset is intentionally over-flexible: it demonstrates why one residual cannot identify new physics.

The escalation rule is therefore:

1. reject the frozen common model on preregistered held-out records;
2. repeat the residual over phase, depth, preparation and time so that an arbitrary offset no longer suffices;
3. fit physically constrained coherent-error, leakage, reset, drift and finite-memory alternatives;
4. predict new schedules and records without per-setting refits;
5. reproduce the surviving residual on an independently calibrated platform;
6. only then admit it for a physical-anomaly review.

## Why order dependence is not yet distinctive

The adjacent-seam witness is an ordinary definite-order process. A finite-memory process tensor can add a schedule-dependent bias. The receipt includes a control with memory parameter `mu=0.02`, producing total-variation distance `0.04` even on a nominal disjoint comparison. Such a residual invalidates the OPH-specific test until the memory term is learned from training schedules and predicts held-out schedules.

This separates three statements that must not be collapsed:

- **source theorem:** the ideal named instruments commute on disjoint seams and not on adjacent seams;
- **engineering result:** the compiled implementation reproduces those distributions within its declared error budget;
- **physical anomaly:** a replicated residual defeats a frozen, sufficiently broad process model.

Only the first two are currently filled, and the second only in a digital emulator.

## Go/no-go table

| question | current answer | next decision |
|---|---|---|
| can a common conventional model predict held-out ideal-benchmark data? | yes | retain it as the null model |
| can the pipeline detect a large injected residual? | yes | use as positive control |
| does one detected residual identify new physics? | no | require structured replication and constrained rivals |
| can ordinary finite memory fake order residue? | yes | fit and predict held-out schedules |
| has hardware Gate 5 passed? | no | transpile, calibrate, run and retain outcome-resolved records |

## Implication

The executable frontier has moved. The immediate question is no longer whether the four laws can be represented or whether an ideal circuit can reproduce them. It is whether one physical device can preserve the phase and order distinctions while a single calibrated conventional model predicts everything else. A clean pass is useful theoretical engineering: an instrument, feedback and compiler benchmark. A clean, replicated failure is where a search for missing physics may begin.

## Remaining boundary

The receipt contains no hardware data and no claim about nature. Backend routing, calibration drift, leakage, reset correlations, process-tensor reconstruction, schedule-quotient semantics and independent-platform replication remain open. The next internal question is narrower: which detector quotients erase the adjacent-order witness, what information they discard, and whether the phase-law distinction can survive that coarsening.
