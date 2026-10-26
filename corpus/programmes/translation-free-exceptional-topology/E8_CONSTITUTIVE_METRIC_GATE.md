# E8 constitutive-metric gate

**Date:** 26 October 2026

**Status:** topological/constitutive separation closed; physical metric calibration open

**Parent:** [clock-to-rotor convergence](E8_CLOCK_TO_ROTOR_CONVERGENCE.md)

**Evidence:** [conditional metric ledger](../../../evidence/data/translation-free-e8-constitutive-metric-gate-v1.json)

**Certificate:** [Coxeter-spectrum and branch verifier](../../../verification/verify/verify_translation_free_e8_constitutive_metric_gate.mjs)

## The joined metric is not selected by topology

The effective E8 edge fixes an integral commutator form (K_{E_8}), while its
positive energy/velocity matrix (V) is independent constitutive data. Moving
to the integral dual variables sends the compact algebra to (K^{-1}), but it
does not say whether a laboratory (K^{-1}) is the charging kernel, a
capacitance/Gram matrix whose inverse is the charging kernel, or only a
coordinate relation implemented ahead of a different positive quadratic
form. Those readings cannot be merged.

For the conditional compact cell

\[
 H={1\over2}n^TMn+\sum_{i=1}^8(1-\cos\theta_i),
 \qquad [\theta_i,n_j]=i\delta_{ij},
\]

the harmonic frequencies are (omega_a=\sqrt{\lambda_a(M)}). The corpus
therefore contains three distinct experimental hypotheses, not one automatic
"E8 spectrum."

| constitutive assumption | softest | hardest | span |
|---|---:|---:|---:|
| (M=K^{-1}) | 0.500686 | 9.553661 | 19.0811 |
| (G=K^{-1},\ M=G^{-1}=K) | 0.104672 | 1.997259 | 19.0811 |
| (M=I) control | 1 | 1 | 1 |

The equal spans of the two E8 branches do not make their spectra equal. After
one scale fit, the (K^{-1})-kernel branch begins
((1,1.070,1.191,1.285,\ldots)), whereas the (K)-kernel branch begins
((1,6.847,10.407,12.025,\ldots)). Seven held-out ratios separate them.

## Exact Coxeter fingerprint

The Cartan eigenvalues need no numerical fitting. With Coxeter number 30 and
exponents

\[
 m\in\{1,7,11,13,17,19,23,29\},
\]

they are

\[
 \lambda_m(K)=2-2\cos(\pi m/30)=4\sin^2(\pi m/60).
\]

This supplies an exact eight-mode fingerprint conditional on physically
realizing (K) or (K^{-1}). It is not a topological prediction for an
arbitrary positive (V).

## Apparatus decision

Measure the small-signal eight-port admittance or transfer matrix before
installing, cooling into, or strongly driving the nonlinear locks. Reconstruct
the positive quadratic kernel (M), fit one overall energy scale, and blind
the remaining seven resonance ratios. Only then select the compact
Hamiltonian whose nonlinear spectrum will be computed and tested.

This ordering prevents a serious category error: observing (c_-=8), an
integral E8 current lattice, or the 240-root shell does not determine the
device capacitance or velocity matrix. Conversely, matching a Coxeter
resonance fingerprint tests a constitutive implementation of the E8 form but
does not by itself establish the chiral anomaly or current algebra.

## Next gate

Freeze one measured (M), include its uncertainty and parasitics, and compute
cutoff-stable low nonlinear levels of the eight-dimensional compact
Hamiltonian. The first useful output is a held-out anharmonic spectroscopy
table; the claimed many-body gap waits until that spectrum stabilizes and the
edge response is recovered on the same carrier.
