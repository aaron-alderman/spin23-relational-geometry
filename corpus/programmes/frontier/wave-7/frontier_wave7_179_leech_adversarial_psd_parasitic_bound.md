# Frontier Wave 7.179: Adversarial PSD Parasitic Bound

**Date:** 25 October 2026

**Status:** exact static passive bound; indefinite and dissipative errors open

**Evidence:** [adversarial parasitic bound](../../../../evidence/data/leech-adversarial-psd-parasitic-bound-v1.json)

**Certificate:** [condition-number and RLC-band verifier](../../../../verification/verify/verify_leech_adversarial_psd_parasitic_bound.mjs)

## The 10 ppm observation has a theorem behind it

Let (A) be the calibrated positive-definite target capacitance matrix and
(E\succeq0) any sum of unresolved passive static parasitic capacitances. If
(eta=\lVert E\rVert_2/\lVert A\rVert_2), then

\[
 {\lVert(A+E)^{-1}-A^{-1}\rVert_2\over\lVert A^{-1}\rVert_2}
 \leq {\kappa_2(A)\eta\over1+\kappa_2(A)\eta}.
\]

The bound follows by writing (F=A^{-1/2}EA^{-1/2}\succeq0) and bounding
(I-(I+F)^{-1}). It is tight: equality occurs when (E) is rank one and
aligned with the soft eigenvector of (A).

For the selected Gram-first basis, (kappa_2=953.0317687). A one-percent
inverse-error budget therefore permits an exact static strength

\[
 \eta\leq {0.01\over0.99\kappa_2}
 =1.0598818\times10^{-5},
\]

or 10.599 ppm. This covers multiple coherent PSD modes through their total
operator norm; it is not restricted to the random rank-one ensemble.

## Frequency dependence tightens the low-frequency specification

The series-RLC capacitance extracted by the seven-frequency packet is
amplified as a pole is approached. For (Q=30), the mean amplification is
1.2850 for the (4\omega_0) pole and 1.0226 for the (10\omega_0) pole.
The corresponding adversarial low-frequency limits for the joint fit are
8.248 and 10.365 ppm.

Therefore the cross-pole joint-packet target is rounded down to **8 ppm**.
If one-percent inverse agreement is claimed independently at every frequency,
the near-pole maximum amplification instead requires **3.9 ppm**.

## Implication

Wave 7.178's 10 ppm random-orientation result remains valid as a conditional
yield statement, but it is not an adversarial guarantee. The exact soft-mode
bound now controls design. A larger resolved parasitic is admissible only if
its pole and coupling vector are included in the model and it predicts fresh
held-out frequencies and drives.

## Epistemic boundary

The inequality is a theorem for additive PSD capacitance after scale
calibration. Its RLC application assumes the recorded frequency grid,
(Q=30) and below-pole positive extracted capacitance. Indefinite de-embedding
errors, active or nonreciprocal coupling, dissipative mismatch and poles
inside the band are not covered and remain direct rejection or explicit-model
cases.

## Corpus links

- [Parasitic-pole stress test](frontier_wave7_178_leech_admittance_parasitic_pole_stress.md)
- [24-port commissioning packet](frontier_wave7_177_leech_24port_admittance_commissioning_packet.md)
- [Conditioning and tolerance](frontier_wave7_171_leech_transformer_conditioning_tolerance.md)
