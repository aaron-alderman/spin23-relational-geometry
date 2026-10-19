# Locking Gauge Mixing: The Weinberg-Angle Formula Appears, but Hypercharge Is Not Yet Derived

**Date:** 17 October 2026  
**Branches:** B01, B05 and B11  
**Claim status:** exact gauge-mass diagonalization; direct identification with the sole electroweak Higgs is now falsified by the triplet charge and custodial mass ratio

## 1. Unequal gauge couplings

Let the internal \(SO(3)\) coupling be \(g\) and the external \(SO(2)\) coupling be \(g_E\). For the isotropic vacuum

\[
K_0=k
\begin{pmatrix}
1&0\\0&1\\0&0
\end{pmatrix},
\]

the two internal generators orthogonal to the locking plane normal have masses

\[
m_1^2=m_2^2=g^2k^2.
\]

The neutral \(T_3\)–\(T_E\) mass block is

\[
M_0^2
=2k^2
\begin{pmatrix}
g^2&-gg_E\\
-gg_E&g_E^2
\end{pmatrix}.
\]

## 2. Exact diagonalization

The null direction is

\[
A_\gamma
=\frac{g_E A^3+g B_E}{\sqrt{g^2+g_E^2}},
\]

and the massive direction is

\[
Z_K
=\frac{g A^3-g_E B_E}{\sqrt{g^2+g_E^2}}.
\]

Define

\[
\sin\theta_K=\frac{g_E}{\sqrt{g^2+g_E^2}},
\qquad
\cos\theta_K=\frac{g}{\sqrt{g^2+g_E^2}}.
\]

Then

\[
\tan\theta_K=\frac{g_E}{g},
\qquad
e_K=\frac{gg_E}{\sqrt{g^2+g_E^2}}.
\]

These are algebraically identical to the electroweak mixing relations.

## 3. Exact numerical checkpoint

For

\[
g=3,\qquad g_E=4,\qquad k=1,
\]

the neutral mass block is

\[
\begin{pmatrix}
18&-24\\
-24&32
\end{pmatrix},
\]

with eigenvalues \(0\) and \(50\). The massless direction is proportional to \((4,3)\), the massive direction to \((3,-4)\), and

\[
e_K=\frac{12}{5}.
\]

## 4. The hypercharge gate

The unbroken generator is formally

\[
Q_K=T_3+T_E.
\]

To identify this with

\[
Q=T_3+Y,
\]

one must prove

\[
T_E|_{\text{every matter multiplet}}
=Y.
\]

That has not been established. The external \(SO(2)\) began as a rotation of the two-dimensional relational carrier, not as an internal phase acting on quarks, leptons and the Higgs.

Matching the mixing matrix alone does not derive hypercharge.

## 5. Required representation test

A complete model must provide a representation

\[
\rho_E:\mathfrak{so}(2)_{\rm ext}
\longrightarrow
\operatorname{End}(\mathcal F_{\rm matter})
\]

whose eigenvalues reproduce

\[
\frac16,\ -\frac23,\ \frac13,\ -\frac12,\ 1,\ 0
\]

in a consistent left-handed convention. It must also:

- commute with color;
- combine with \(T_3\) to give observed electric charges;
- preserve anomaly cancellation;
- remain compatible with the Furey block hypercharge operator;
- avoid turning a spacetime/response rotation into an internal charge by declaration.

## 6. Coleman–Mandula and ontology

If \(SO(2)_{\rm ext}\) is an actual spacetime or phase-space symmetry, identifying it with hypercharge risks forbidden mixing of spacetime and internal symmetries under the usual \(S\)-matrix assumptions. Possible escapes include:

- treating the external \(SO(2)\) as an internalized boundary-frame redundancy;
- using a gauge or constrained system outside the theorem’s assumptions;
- interpreting \(K\) as a portal between two groups rather than identifying them;
- deriving a diagonal low-energy symmetry after spontaneous breaking.

The ontology must be fixed before the attractive mixing formula can be promoted.

## 7. Stop-everything and falsification tests

**Positive:** the same source construction assigns \(T_E=Y\) on the complete anomaly-free chiral module and predicts \(\theta_K\) or \(g_E/g\).

**Negative:** \(T_E\) acts only on the external carrier, or its matter charges disagree with hypercharge.

**Current result:** the gauge-mixing algebra matches electroweak form, but making the external generator hypercharge turns \(K\) into a complex \(|Y|=1\) weak triplet with \(\rho=1/2\). It cannot be the sole Standard-Model Higgs field.

## 8. Certificate

The [gauge-mixing certificate](scripts/verify-locking-gauge-mixing.mjs) diagonalizes the exact neutral mass block, verifies its null and massive eigenvectors and computes the diagonal coupling.

## Companion documents

- [Locking-field spectrum](80_locking_field_gauge_and_scalar_spectrum.md)
- [Furey weak Jordan ladder](69_furey_weak_jordan_ladder_spin23.md)
- [Standard-Model anomaly gate](62_standard_model_anomaly_gate.md)
- [Locking complex triplet and custodial obstruction](85_locking_complex_triplet_and_custodial_obstruction.md)
- [Furey charged-triplet obstruction](86_furey_charged_triplet_locking_obstruction.md)
