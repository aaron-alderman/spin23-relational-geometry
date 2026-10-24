# Frontier Wave 7.80: Two-by-Three Selector Calibration Protocol

**Date:** 25 October 2026  
**Status:** executable emulator and preregistered branch discriminator  
**Ledger:** [post-Q programme](post_q_five_option_programme_v1.json)  
**Certificate:** [calibration emulator](../../../../verification/verify/verify_two_by_three_selector_calibration_emulator.mjs)

## Minimum protocol

The common-carrier proposal can be tested with six calibrated operations:

1. two source-basis probes;
2. three target-basis probes;
3. an order-three selector pulse;
4. an order-two selector pulse;
5. forward-channel tomography; and
6. reverse-channel tomography.

The endpoint operations must first reproduce

| sector | order-three \((\operatorname{tr},\det,\operatorname{ord})\) | order-two \((\operatorname{tr},\det,\operatorname{ord})\) |
|---|---|---|
| two | \((-1,1,3)\) | \((-2,1,2)\) |
| three | \((0,1,3)\) | \((-1,1,2)\) |

This checks the parity repair before fitting the channel.

For reconstructed forward and reverse transfers \(E\) and \(B\), compute

\[
r_+=\frac{\|B-E^T\|_F}{\|E\|_F},
\qquad
r_-=\frac{\|B+E^T\|_F}{\|E\|_F}.
\]

The smaller residual selects the noncompact or compact branch. If their
difference is below a preregistered calibration floor, the result is
unresolved rather than assigned post hoc.

## Frozen emulator benchmark

With entry noise \(0.02\), 32 repeats per matrix entry and 500 trials per
branch, the deterministic benchmark obtains:

- maximum selector-fingerprint error \(0.01251\);
- \(+E^T\) classification accuracy \(1.000\);
- \(-E^T\) classification accuracy \(1.000\);
- minimum signed-residual margin above \(1.975\).

The large margin is expected because the two hypotheses differ by an overall
reverse-transfer sign. Real difficulty will lie in port-phase calibration,
not statistical separation once that calibration is controlled.

## Required controls

- blind the branch label;
- independently measure detector transfer and cable phase;
- repeat after swapping source and target labels;
- reverse the endpoint time-reversal parity where physically possible;
- reject runs whose selector fingerprints miss the table;
- retain the null outcome in which neither signed reciprocity model fits.

## Boundary

The emulator proves identifiability. It does not construct physical selector
pulses or establish that an observed port system carries the corpus module.

