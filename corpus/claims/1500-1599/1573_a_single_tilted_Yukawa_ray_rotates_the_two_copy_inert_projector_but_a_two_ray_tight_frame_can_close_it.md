# A Single Tilted Yukawa Ray Rotates the Two-Copy Inert Projector, but a Two-Ray Tight Frame Can Close It

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** one-loop copy-space obstruction plus minimal balanced-source criterion

**Depends on:** [the two-copy selector/Yukawa trilemma](1572_one_matter_copy_turns_the_two_symmetric_copy_escape_into_a_protection_portal_trilemma.md) and [the two-copy gauge-orthogonal construction](1571_two_symmetric_E6_copies_create_a_gauge_inert_orthogonal_bidoublet_but_require_a_new_Yukawa_orientation_law.md)

**Primary RGE source:** [Schienbein et al., general gauge-theory RGEs](https://arxiv.org/abs/1809.06797), especially the matrix-valued scalar Yukawa invariant in equation (17)

**Evidence:** [Yukawa Gram ledger](../../../evidence/data/spin23-e6-two-copy-yukawa-gram-obstruction.json) and [deterministic verifier](../../../verification/verify/verify_spin23_e6_two_copy_yukawa_gram_obstruction.mjs)

## Result

The tilted Yukawa covector required by claim 1571 is not radiatively
neutral.  In the copy basis aligned with the symmetric-singlet VEV and the
gauge-inert light bidoublet,

\[
w=(|w|,0),
\qquad
d=(0,1),
\qquad
y=(y_\parallel,y_\perp),
\]

nonzero singlet mass and portal require

\[
y_\parallel\ne0,
\qquad
y_\perp\ne0.
\]

The one-loop scalar wave-function counterterm contains the copy-space Gram
matrix

\[
G_y=y^\dagger y=
\begin{pmatrix}
|y_\parallel|^2&y_\parallel^*y_\perp\\
y_\perp^*y_\parallel&|y_\perp|^2
\end{pmatrix}.
\]

Exactly when both physical projections are nonzero,

\[
\boxed{(G_y)_{\parallel\perp}=y_\parallel^*y_\perp\ne0.}
\]

Thus the VEV and light axes are not multiplicatively renormalized.  The
single tilted source rotates the copy-space projector that made the light
bidoublet gauge inert.  The bare two-symmetric-copy route is therefore not
RG closed once its required Yukawa is included.

There is, however, a minimal algebraic cure.  For independent source rays
\(y_r\), the counterterm depends on

\[
G=\sum_r y_r^\dagger y_r.
\]

Two rays can form a tight frame.  The witness

\[
y_1={1\over\sqrt2}(1,1),
\qquad
y_2={1\over\sqrt2}(1,-1)
\]

gives

\[
\boxed{y_1^\dagger y_1+y_2^\dagger y_2=\mathbf1_2.}
\]

The off-diagonal rotations cancel as an identity while the diagonal
renormalization is isotropic.  The next constructive target is therefore
not an arbitrary extra coupling: it is a symmetry-derived two-ray tight
frame in the matter or relation-source space.

## 1. General RGE origin

In a theory with several scalars carrying identical gauge quantum numbers,
the scalar anomalous dimension is a matrix rather than a list of unrelated
numbers.  The general one-loop invariant includes

\[
Y_2^{ab}(S)={1\over2}
\operatorname{Tr}(Y^{\dagger a}Y^b+Y^{\dagger b}Y^a).
\]

For one E6 Yukawa tensor \(Y_0\) multiplied by copy coefficients \(y_a\),

\[
Y^a=y_aY_0,
\]

so, apart from the positive common trace normalization, the complex-field
counterterm is the Hermitian outer product

\[
G_{ab}=y_a^*y_b.
\]

This is rank one whenever \(y\ne0\).  In the \((w,d)\) basis it is diagonal
only if one component vanishes.  Those two diagonal cases remove either
the singlet mass or the light portal.

After canonical normalization, an off-diagonal wave-function counterterm
rotates all copy-space tensors.  Equivalently, the condition
\(w^\dagger d=0\) does not remain a fixed statement about the same physical
VEV and light eigenvector unless an additional Ward identity cancels or
locks the rotation.

## 2. Why phases do not evade the result

A relative complex phase can make the real part of
\(y_\parallel^*y_\perp\) vanish, but it does not make the Hermitian
off-diagonal matrix element vanish.  Its magnitude is

\[
|(G_y)_{\parallel\perp}|=|y_\parallel||y_\perp|,
\]

which is strictly positive under the mass-plus-portal condition.  A basis
rephasing moves the phase between the off-diagonal entries; it cannot
remove the matrix invariant.

## 3. Minimal frame cure

With \(r\) independent matter or relation sources,

\[
G=Y^\dagger Y=\sum_{i=1}^r y_i^\dagger y_i
\]

is positive semidefinite and has rank at most \(r\).  Isotropic closure on
the two-dimensional copy carrier requires rank two, so at least two source
rays are necessary.  Two are sufficient, as the displayed orthonormal
Hadamard pair proves.

The weaker requirement \(G_{\parallel\perp}=0\) admits unequal diagonal
entries, but those entries run the two axes differently and can spoil a
normalized portal ratio at later stages.  The tight-frame condition

\[
G=c\mathbf1_2
\]

is the cleanest closure because it preserves every copy-space angle at
this loop order.

## 4. Scope

The result establishes

\[
\boxed{
\begin{array}{rcl}
\text{pure-gauge preservation of }d\perp w&=&\mathrm{YES},\\
\text{one tilted Yukawa preserves }d\perp w&=&\mathrm{NO},\\
\text{two balanced rays can preserve all angles}&=&\mathrm{YES},\\
\text{current E6 model derives those rays}&=&\mathrm{NO}.
\end{array}}
\]

The tight-frame witness proves algebraic sufficiency only for the
wave-function Gram tensor.  A full completion must also check scalar
quartic beta functions, thresholds, the enlarged fermion mass rank, and
whether one chiral family survives.

## Spin(2,3) status

This is a direct bridge back to the programme's recurring frame geometry.
The required new object is a two-ray Parseval frame on the two-state
relation carrier.  Its frame operator is the identity, so radiative
renormalization sees no preferred copy axis even though the individual
rays have nonzero projections on both axes.

A Spin(2,3)-derived correspondence would become useful here if it supplies
the two signed rays as an orbit and fixes their equal norms.  The
\((1,1)\), \((1,-1)\) witness is not evidence that Spin(2,3) does so; it is
the smallest exact target to search for.  Larger highly symmetric frames,
including code- or lattice-derived frames, become relevant only if this
two-ray closure survives the remaining E6 mass and quartic tests.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_e6_two_copy_yukawa_gram_obstruction.mjs
~~~
