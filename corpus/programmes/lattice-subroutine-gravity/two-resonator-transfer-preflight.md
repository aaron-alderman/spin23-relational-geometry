# Two-resonator transfer-function preflight

**Date:** 24 October 2026
**Status:** verified synthetic transfer-function and nuisance-rejection preflight; measured-device execution open
**Evidence:** [nominal preflight parameters](../../../evidence/data/lattice-subroutine-two-resonator-transfer-preflight-v1.json)
**Certificate:** [transfer-function verifier](../../../verification/verify/verify_lattice_subroutine_two_resonator_transfer_preflight.mjs)

## Result

The proposed two-quadrature experiment survives a realistic first nuisance: coherent direct feedthrough.

For two damped resonators driven through port 1 and read at port 2, the frequency-domain equations can be written

\[
\begin{pmatrix}
d_1&i\epsilon\\
i\epsilon^*&d_2
\end{pmatrix}
\begin{pmatrix}a_1\\a_2\end{pmatrix}
=
\begin{pmatrix}\sqrt{\kappa_{e1}}\,s_{\rm in}\\0\end{pmatrix},
\qquad
d_j=\frac{\kappa_j}{2}-i\Delta_j.
\]

The seam-dependent cross-port amplitude is proportional to

\[
t_{21}(\epsilon)
=
\frac{-i\sqrt{\kappa_{e1}\kappa_{e2}}\,\epsilon^*}
{d_1d_2+|\epsilon|^2}.
\]

Hence

\[
t_{21}(-\epsilon)=-t_{21}(\epsilon),
\qquad
|t_{21}(-\epsilon)|^2=|t_{21}(\epsilon)|^2
\]

even with unequal linewidths and detunings.

## The false odd-power channel

A real instrument often measures

\[
S_{21}=f+t_{21},
\]

where \(f\) is coherent cable, package or on-chip feedthrough. Then

\[
|f+t|^2-|f-t|^2
=4\operatorname{Re}(f^*t),
\]

so raw power can falsely appear orientation odd and linear in the coupling.

This is not new seam physics. It is ordinary interference with an undeclared reference.

The remedy is operationally exact in the linear model:

1. acquire the coupling-disabled complex baseline \(f=S_{21}(0)\);
2. subtract it at the complex-amplitude level;
3. form the even power from \(|S_{21}-f|^2\);
4. separately retain the calibrated reference as the declared homodyne local oscillator.

The same physical background can therefore be either a nuisance or a useful phase reference, depending on whether it is measured and typed.

## Nominal simulation

The certificate uses:

- unequal total linewidths \(\kappa_1=1\), \(\kappa_2=1.3\);
- unequal external linewidths \(\kappa_{e1}=0.8\), \(\kappa_{e2}=0.9\);
- detunings \(0.07\) and \(-0.04\);
- a complex feedthrough of magnitude \(0.08\);
- four coupling phases and five coupling radii.

It verifies:

- exact oddness of the background-subtracted complex transfer amplitude;
- exact evenness of the corrected seam power;
- nonzero false oddness in raw power;
- small-coupling log slopes of one for homodyne amplitude and two for corrected power.

## Hardware calibration order

1. measure open/through standards and remove cable delay;
2. acquire \(S_{21}(0)\) at every slow bias and temperature block;
3. estimate the \(2\times2\) IQ calibration matrix with independent phase standards;
4. randomize seam reversal within each drift block;
5. fit the full complex transfer function before reducing to power;
6. reserve one phase and one radius as held-out prediction points.

## Decision boundary

The conventional model survives if one parameter set predicts:

- both complex quadratures;
- both seam orientations;
- all programmed phases;
- the feedthrough-disabled baseline;
- the held-out points.

Only a structured residual that survives those tests should be promoted to an anomaly. A failure of background subtraction is not a frontier signal.

## Implication

This preflight illustrates the detector-boundary thesis concretely. Squaring the raw record does not merely lose information; it can mix the seam with an uncontrolled reference and manufacture an apparent odd effect. Keeping the complex record allows the nuisance and the desired orientation channel to be separated.
