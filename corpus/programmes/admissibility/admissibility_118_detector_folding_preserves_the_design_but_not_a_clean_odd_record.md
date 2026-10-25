# Detector folding preserves the design, but not a clean odd record

**Date:** 25 October 2026

**Status:** synthetic detector-transfer certificate closed; physical helicity likelihood open

**Topics:** OT-047, OT-048

**Parent:** [AZ-117 odd resonance moment](admissibility_117_an_odd_resonance_moment_can_supply_the_missing_sign.md)

**Evidence:** [detector-fold audit](../../../evidence/data/alp-odd-moment-detector-fold-gate-v1.json)

**Generator:** [finite convolution and factorial transfer](../../../scripts/run-alp-odd-moment-detector-fold-gate.mjs)

**Verifier:** [parity, leakage and held-out certificate](../../../verification/admissibility/verify_alp_odd_moment_detector_fold_gate.mjs)

## What was actually tested

AZ-117 found a signed statistic before detector effects. This gate asks what survives a finite, deliberately modest detector model. The local continuum is allowed a real slope and an absorptive part; the resonance has a signed residue and finite width. The truth-level rate is convolved with a symmetric Gaussian resolution and then multiplied by an acceptance with a small odd component across the mass window.

This is a transfer test, not a collider forecast. Its numbers are declared synthetic values. They establish which statements follow from parity and linear folding; they do not estimate the sensitivity of an existing or proposed detector.

## Result

A symmetric resolution kernel maps even functions to even functions and odd functions to odd functions. It therefore attenuates the odd interference moment without reversing its sign, while a constant-background odd moment remains zero to numerical precision. Resolution alone does not erase the phase reference.

An acceptance that differs above and below the resonance changes the answer. It folds even background and signal-square terms into the odd record. A sloping or complex continuum adds further odd and even interference pieces. The raw odd moment is therefore not self-authenticating: the detector can make an odd record without supplying the desired source sign.

The useful closure is narrower. For a fixed linear response and an amplitude linear in three declared source coefficients, every reconstructed bin and every linear moment remains a quadratic function of those coefficients. The same 19 coordinate-plane templates recover that quadratic response, and the eight all-nonzero templates remain genuine held-out predictions. In the finite audit all eight close to numerical precision after smearing, acceptance and continuum slope are applied.

## The 27 settings are not 27 universes

The signed settings in AZ-074 are generator or template settings. They are how a source-complete calculation learns and checks the response surface. Collider data supply one unknown physical coefficient point; nature does not provide a switch that reverses an ALP coupling on request.

This matters for nuisance rejection. The half-difference between templates at residue (S) and (-S) cancels terms even in (S), so it is an excellent implementation diagnostic. It is not by itself an experimental subtraction. In data, acceptance-odd leakage and background slope must instead be constrained by calibrated response matrices, sidebands, control categories and their covariance. The signed templates then enter one joint likelihood for the observed record.

## Why this is hopeful

The detector does not destroy the proposed design merely by being finite. If its action is fixed and linear, it changes the response matrix but does not increase the polynomial degree. This gives the experiment a sharp engineering target: publish the response and covariance well enough that the eight held-out simulations close before looking for a residual in data.

The same statement gives a kill test. Coupling-dependent widths, selections, migrations or hidden decay assumptions can make the detector map coefficient-dependent and spoil the quadratic prediction. A failed corner is then useful: it locates missing model or detector structure before it is mistaken for new physics.

## What remains

The physical bridge still requires one named charged-production diphoton channel, a gauge-complete continuum and resonant helicity calculation in a single frozen EFT basis, a realistic mass window, the full response matrix and nuisance covariance, and a likelihood evaluated on public or newly acquired records. Only after the 27 templates close on held-out simulations should the single observed data set be used to compare the seven-coordinate EFT with its declared slices.

New physics is not “a nonzero odd moment.” It begins only with a replicated residual that survives the complete EFT coordinates, calibrated detector leakage, background alternatives, held-out categories and an independently specified channel.

## Reproduction

~~~powershell
node scripts/run-alp-odd-moment-detector-fold-gate.mjs --write
node verification/admissibility/verify_alp_odd_moment_detector_fold_gate.mjs
~~~
