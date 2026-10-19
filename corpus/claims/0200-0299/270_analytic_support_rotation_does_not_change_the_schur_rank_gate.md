# Analytic Support Rotation Does Not Change the Schur Rank Gate

**Date:** 17 October 2026  
**Branches:** B02, B04, B06, B07, B08, B09 and B11  
**Claim status:** exact local orthogonal-covariance result for an analytically diagonalizable real-symmetric pivot; non-analytic degeneracies and global bundle holonomy remain open

## 1. The suspected obstruction

At a rank-changing locus, the active eigenvector of the interior pivot may rotate with frequency or momentum. It is natural to worry that derivatives of this moving frame alter the pole/remnant/zero classification.

For the algebraic Schur term itself, they do not.

Let

\[
C(t)=O(t)D(t)O(t)^T,
\qquad O(t)^TO(t)=I,
\]

where \(O(t)\) is analytic and

\[
D(t)=\operatorname{diag}(t^m,d_2(t),\ldots,d_n(t)).
\]

Write the boundary coupling in the same moving frame as

\[
X(t)=Y(t)O(t)^T.
\]

## 2. Exact cancellation

Where the inverse exists,

\[
C(t)^{-1}=O(t)D(t)^{-1}O(t)^T,
\]

and therefore

\[
\boxed{
X(t)C(t)^{-1}X(t)^T
=
Y(t)D(t)^{-1}Y(t)^T.}
\]

The same equation holds with Moore--Penrose inverses at a fixed singular fiber:

\[
XC^+X^T=YD^+Y^T.
\]

The rotation cancels algebraically. Its angular velocity and higher derivatives do not enter the pointwise Schur quadratic.

## 3. The valuation gate is frame covariant

If the column of \(Y(t)\) along the vanishing eigenchannel behaves as

\[
y_1(t)=t^pv+O(t^{p+1}),
\]

then its contribution is

\[
t^{2p-m}vv^T+\cdots.
\]

Thus the earlier trichotomy survives unchanged:

- \(2p<m\): matrix pole in the positive direction \(vv^T\);
- \(2p=m\): finite positive rank-one remnant \(vv^T\);
- \(2p>m\): removable zero agreeing with the pointwise pseudoinverse.

The criterion is not tied to a fixed coordinate axis. It is a statement about coupling order along an analytic eigenline.

## 4. What rotation can still affect

The cancellation concerns the algebraic elimination term. Rotation remains relevant in four other places.

### 4.1 Derivative actions

If the effective action contains derivatives of the eigenbasis, transforming kinetic operators into the moving frame introduces a connection

\[
\mathcal A=O^T dO.
\]

That connection can mix active channels. It is additional dynamical data, not part of the static Schur quadratic.

### 4.2 Non-analytic eigenframes

At a multiple eigenvalue collision, no single analytic eigenvector may exist even though an analytic spectral subspace does. The correct object is then the projector bundle, not individually labelled eigenvectors.

### 4.3 Global holonomy

Local analytic frames may glue by nontrivial orthogonal transition functions. The Schur response can be globally well defined while a global real frame is obstructed. This matches the earlier twisted-carrier results.

### 4.4 Cross-channel identification

Each Yukawa channel may admit its own local frame. Comparing their normalized kernels still requires specified intertwiners. Independent rotations cannot be silently treated as one common interior basis.

## 5. Local versus global conclusion

The local rank-change analysis is now robust:

\[
\text{analytic support rotation}
\not\Rightarrow
\text{new local Schur singularity}.
\]

The surviving global question is instead:

\[
\text{do the channel support bundles admit compatible intertwiners and holonomy?}
\]

This is exactly where the Furey linking algebra, the twisted \(H_2(\mathbb C)\) parent and the celestial Chern-class branch could become relevant. Their role would be to determine the gluing data, not to alter the local exponent arithmetic.

## 6. Implication for the “twisted string” intuition

The twist can live in the transport of the carrier without changing the local elimination law. In the user's language, the carrier can return with one twist while every local patch still obeys the same Jordan/Schur recursion.

That is a mathematically cleaner interpretation than inserting a twist directly into the local scalar norm. The local response is invariant; the global identification acquires holonomy.

## 7. Stop-everything and falsification gates

**Stop-everything trigger:** the four physical channel-support bundles are canonically identified by one Furey/Jordan intertwiner whose holonomy reproduces an already required gauge or helicity twist.

**Connection trigger:** the moving-frame connection \(O^TdO\) produces a calculable physical mixing or Berry phase while preserving the positive Schur response.

**Local falsifier:** a concrete analytic symmetric pivot produces a Schur singularity not captured by the eigenvalue/coupling vanishing orders.

**Global falsifier:** the required channel bundles have incompatible characteristic classes, so no common sewing kernel can exist globally.

## 8. Certificate

The [rotating-support Schur certificate](../../../verification/verify/verify_rotating_support_schur_invariance.mjs) uses a nonlinear analytic rotation of a rank-changing two-mode pivot, verifies exact rotation cancellation and checks all three valuation regimes.

## Companion documents

- [Rank-changing Schur trichotomy](269_rank_changing_schur_channels_have_a_three_way_analytic_gate.md)
- [Twisted-bundle Schur recursion](221_twisted_bundle_schur_recursion_is_globally_covariant.md)
- [Twisted helicity carrier glues as \(H_2(\mathbb C)\)](219_twisted_helicity_carrier_glues_as_h2c_spin24_before_spin23_reduction.md)
- [Degree-eight selector defects](220_degree_eight_selector_gives_eight_local_spin23_defects.md)
