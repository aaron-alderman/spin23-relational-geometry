# A Factor-Local Selector Commutes with the Full One-Generation Yukawa Operator

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B08 and B11  
**Claim status:** exact finite tensor-factor compatibility theorem; dynamical derivation of factorization and radiative stability remain open

## 1. Corrected architecture

The previous obstruction rules out applying diagonal/conjugation locking entrywise to charged matter or flavor. The viable construction separates factors:

\[
\mathcal H_{\rm total}
=
\mathcal H_{\rm response}
\otimes
\mathcal H_{\rm matter/flavor}.
\]

The neutral Peirce selector acts as

\[
L_{\rm sel}\otimes I,
\]

while the gauge and Yukawa operators act as

\[
I\otimes \rho(g),
\qquad
I\otimes H_Y.
\]

## 2. Complete one-generation mass operator

After electroweak symmetry breaking, order the eight particle channels as

\[
(u_r,u_g,u_b,d_r,d_g,d_b,\nu,e)
\]

on each chirality face. Let

\[
D=
\operatorname{diag}
(m_uI_3,m_dI_3,m_\nu,m_e),
\]

with arbitrary complex masses. The Hermitian sixteen-dimensional mass operator is

\[
H_Y=
\begin{pmatrix}
0&D\\
D^\dagger&0
\end{pmatrix}.
\]

This is the broken-phase form of the four gauge-covariant Higgs channels established earlier.

## 3. Exact commutant theorem

Tensor-factor locality gives

\[
\boxed{
[L_{\rm sel}\otimes I_{16},
 I_8\otimes H_Y]=0.}
\]

The result holds for arbitrary complex \(m_u,m_d,m_\nu,m_e\). It neither makes them real nor relates their magnitudes.

The selector kernel is the three-dimensional diagonal real Peirce space:

\[
\ker L_{\rm sel}\cong H_2(\mathbb R).
\]

On the low-energy subspace,

\[
\ker L_{\rm sel}\otimes\mathbb C^{16},
\]

the complete Yukawa operator remains unchanged and appears in three response-coordinate copies.

## 4. Electromagnetic compatibility

The left and right components of each Dirac channel have equal electric charge. With

\[
Q_{\rm em}
=\operatorname{diag}
\left(
\tfrac23I_3,-\tfrac13I_3,0,-1;
\tfrac23I_3,-\tfrac13I_3,0,-1
\right),
\]

one has

\[
[Q_{\rm em},H_Y]=0.
\]

Because the neutral selector is gauge trivial,

\[
[L_{\rm sel}\otimes I,
 I\otimes Q_{\rm em}]=0.
\]

The response locking therefore does not break the surviving photon symmetry.

## 5. Complex flavor remains available

For three generations, replace scalar masses by complex flavor matrices. The same identity gives

\[
[L_{\rm sel}\otimes I_{\rm flavor},
 I_{\rm response}\otimes H_f]=0
\]

for every complex Hermitian flavor observable \(H_f\).

The certificate includes an explicitly imaginary flavor entry and verifies exact commutation. No conjugation is applied to the flavor coefficients, so nonzero Jarlskog and Majorana invariants remain possible.

## 6. What factorization does and does not solve

It solves the algebraic compatibility problem:

- real neutral response carrier;
- complete complex one-generation Yukawa operator;
- unbroken electromagnetism;
- complex flavor algebra;
- no forced real matter form.

It does not explain why the interacting theory factorizes this way. Mixed counterterms could couple selector generators to matter/flavor operators:

\[
\sum_a R_a\otimes F_a.
\]

Such terms must be classified. A mixed term is harmless only if it preserves the selector kernel or is parametrically suppressed after Schur elimination.

## 7. Radiative and Schur gate

Let \(P\) project onto \(\ker L_{\rm sel}\) and \(Q=1-P\). Mixed interactions induce

\[
\Sigma(z)
=PHQ(QHQ-z)^{-1}QHP.
\]

The low-energy theory remains factor-local only if \(\Sigma\):

1. preserves the \(H_2(\mathbb R)\) response subspace;
2. commutes with the required gauge action;
3. does not impose conjugation on flavor;
4. remains small relative to the selector gap.

This is the next quantitative stability calculation.

## 8. Stop-everything and falsification gates

**Derivation trigger:** Furey's linking/Peirce algebra forces the tensor-factor action and forbids dangerous mixed counterterms.

**Radiative trigger:** all symmetry-allowed mixed terms preserve the real response kernel and complex flavor commutant.

**Observable trigger:** integrating out selector-heavy modes produces a constrained, measurable correction rather than arbitrary portal coefficients.

**Falsifier:** a required Higgs/Yukawa or gauge operator acts nontrivially on the selector factor and drives the kernel outside \(H_2(\mathbb R)\), or factorization is merely imposed with no protecting symmetry.

## 9. Certificate

The [factor-local selector/full-Yukawa certificate](scripts/verify_factor_local_selector_full_yukawa_commutant.mjs) constructs the full sixteen-dimensional four-channel mass operator with complex entries, verifies electromagnetic invariance, computes its exact commutator with the eight-coordinate selector and confirms independent complex flavor matrices commute with the selector.

## Companion documents

- [Full-matter locking obstruction](254_diagonal_peirce_locking_cannot_be_lifted_entrywise_to_full_matter.md)
- [Positive Peirce selector locking](253_positive_exchange_diagonal_locking_leaves_exactly_h2r.md)
- [Full one-generation Higgs/Yukawa covariance](237_full_one_generation_higgs_yukawa_portal_is_gauge_covariant.md)
- [Real face carrier with complex flavor CP](120_real_face_carrier_complex_flavor_cp.md)
