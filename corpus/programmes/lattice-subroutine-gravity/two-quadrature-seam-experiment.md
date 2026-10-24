# A realistic two-quadrature seam experiment

**Date:** 24 October 2026
**Status:** buildable interface experiment with preregistered observables; tests the seam carrier, not new gravity
**Evidence:** [machine-readable protocol](../../../evidence/data/lattice-subroutine-two-quadrature-seam-experiment-v1.json)
**Certificate:** [signal-model verifier](../../../verification/verify/verify_lattice_subroutine_two_quadrature_seam_experiment.mjs)

## Purpose

Test the exact prediction of the sewing-response gate:

> a coherent two-quadrature detector can retain an orientation-odd seam amplitude that a power-only detector necessarily squares away.

This is a test of the proposed *interface type*. Conventional coupled-mode theory predicts the basic effect, so observing it is theoretical engineering rather than evidence for new physics. Its value is to establish a calibrated physical carrier on which the stronger corpus intertwiners can later be tested.

## Preferred platform

Use two coupled microwave resonators with a parametrically controlled complex coupling

\[
\epsilon=g_x+i g_y=r e^{i\phi}.
\]

A vector network analyser or coherent microwave source plus IQ mixer measures the complex transmission amplitude. Tunable superconducting-resonator couplers and phase-sensitive microwave detection are established technologies; an optical Mach--Zehnder or programmable photonic mesh with balanced homodyne readout is a direct alternative.

The minimal effective model is

\[
H_{\rm eff}=
\begin{pmatrix}
\omega_1-i\kappa_1/2 & \epsilon\\
\epsilon^* & \omega_2-i\kappa_2/2
\end{pmatrix}.
\]

The two independently programmed pump quadratures set \(g_x\) and \(g_y\). The seam reversal is implemented by shifting the pump phase by \(\pi\):

\[
\epsilon\longmapsto-\epsilon.
\]

## Measurement channels

Calibrate the background and extract the complex seam-dependent amplitude

\[
A_{\rm seam}=c\,\epsilon+O(|\epsilon|^2).
\]

Measure two records from the same acquisition.

### Orientation-even control

\[
P_{\rm even}=|A_{\rm seam}|^2
=|c|^2r^2+O(r^3).
\]

It is unchanged under \(\epsilon\mapsto-\epsilon\).

### Orientation-odd record

With a coherent reference \(A_{\rm ref}=|A_{\rm ref}|e^{i\theta}\), record

\[
X_\theta
=2\operatorname{Re}(A_{\rm ref}^*A_{\rm seam}).
\]

The antisymmetrized statistic

\[
D_{\rm odd}
=\frac{X_\theta(+\epsilon)-X_\theta(-\epsilon)}{2}
\]

is linear in \(r\), reverses sign with the seam, and varies sinusoidally with \(\phi-\theta\).

## Run matrix

For each radius \(r\), acquire a randomized sequence over

\[
\phi\in
\left\{
0,\frac{\pi}{2},\pi,\frac{3\pi}{2}
\right\},
\]

plus:

- reference on and reference off;
- \(+\epsilon\) and \(-\epsilon\);
- both quadratures, \(g_x\)-only and \(g_y\)-only;
- coherent averaging and deliberately phase-scrambled averaging;
- coupled device and coupling-disabled baseline.

Use at least five nonzero radii spanning the linear-response range and repeat the full randomized block across multiple thermal/drift cycles.

## Preregistered fits

Fit

\[
D_{\rm odd}(r,\phi)
=\alpha r\cos(\phi-\phi_0)+\alpha_3r^3+\cdots
\]

and

\[
P_{\rm even}(r)
=\beta r^2+\beta_4r^4+\cdots.
\]

The interface passes only if:

1. \(D_{\rm odd}\) is linear at small \(r\) and reverses under \(\epsilon\mapsto-\epsilon\);
2. its fitted phase follows the programmed pump phase;
3. it vanishes under reference removal or phase scrambling;
4. \(P_{\rm even}\) is unchanged by seam reversal and begins quadratically;
5. the result survives a held-out calibration block and a second readout phase.

## Nuisance model

Fit or independently calibrate:

- IQ gain imbalance and quadrature skew;
- cable delay and reference-phase drift;
- direct feedthrough around the resonators;
- unequal linewidths and detuning;
- pump leakage into the readout;
- amplifier compression;
- nonreciprocal or dissipative coupling;
- slow temperature and bias drift.

The primary falsifier is a purported odd record reproduced by IQ leakage from the even power channel. Phase scrambling and reference-off runs directly test that failure.

The [two-resonator transfer preflight](two-resonator-transfer-preflight.md) adds a second essential control. Coherent direct feedthrough can manufacture a linear odd term in raw power. Measuring and subtracting the coupling-disabled complex baseline removes that false channel while retaining the calibrated homodyne reference.

## Interpretation ladder

| Outcome | Meaning |
|---|---|
| odd channel absent after calibration | this implementation does not retain the seam |
| odd channel present but removable by port rephasing | ordinary convention-dependent coherent response |
| odd channel obeys the full run matrix | operational two-quadrature seam carrier |
| response additionally follows a source-derived modular/Leech parameter map with no refit | evidence for the proposed mathematical interface |
| unexplained residual survives the complete conventional model and independent replication | candidate anomaly requiring a new-physics audit |

The first successful experiment should be expected to stop at the third row. That is still useful: it builds the detector required by the theory without claiming the theory has already supplied the coupling.

The [two-mode phase-gauge gate](two-mode-phase-gauge-gate.md) further limits that interpretation. A single complex coupling phase is removable inside an isolated two-mode Hamiltonian. The measured odd phase is meaningful relative to the pump and local oscillator; an intrinsic device phase requires a closed three-mode coupling loop.

## Existing technical precedents

- Peropadre et al., [tunable complex couplings and effective gauge fields between superconducting resonators](https://arxiv.org/abs/1207.3408)
- Taballione et al., [a fully tunable twelve-mode photonic interferometer](https://arxiv.org/abs/2012.05673)
- Tuite and Zuevsky, [genus-two fermionic sewing](https://arxiv.org/abs/1007.5203)
