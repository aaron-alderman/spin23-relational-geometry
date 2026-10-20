# One Matter Copy Turns the Two-Symmetric-Copy Escape into a Protection--Portal Trilemma

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact selector/Yukawa compatibility no-go; bare two-scalar-copy completion insufficient

**Depends on:** [the two-copy gauge-orthogonal construction](1571_two_symmetric_E6_copies_create_a_gauge_inert_orthogonal_bidoublet_but_require_a_new_Yukawa_orientation_law.md) and [the multiplicity-one selector no-go](1570_every_ordinary_multiplicity_one_internal_selector_preserving_E6_allows_the_nonfactorized_quartic.md)

**Evidence:** [selector/Yukawa trilemma ledger](../../../evidence/data/spin23-e6-two-copy-selector-yukawa-trilemma.json) and [deterministic verifier](../../../verification/verify/verify_spin23_e6_two_copy_selector_yukawa_trilemma.mjs)

## Result

Claim 1571 found a kinematic opening: two symmetric-Higgs copies contain a
copy-orthogonal bidoublet that pure E6 gauge loops do not mix with the
\(27_H\) bidoublet.  An ordinary exact copy symmetry cannot simultaneously
protect that separation and let a single matter bilinear couple to both
the VEV and light axes.

Let the one matter \(27_F\) have selector character \(f\).  Let the
symmetric-copy VEV axis \(S_w\) and orthogonal light axis \(S_d\) have
characters \(s_w\) and \(s_d\).  Nonzero invariant Yukawa projections on
both axes require

\[
2f+s_w=0,
\qquad
2f+s_d=0.
\]

Therefore

\[
\boxed{s_w=s_d=-2f.}
\]

But then the cross-copy bilinear and every balanced cross-copy quartic have
zero selector character:

\[
q(S_w^\dagger S_d)=-s_w+s_d=0.
\]

Conversely, assigning distinct characters \(s_w\ne s_d\) forbids the
dangerous cross-copy tensors but makes at most one of the two Yukawa
projections invariant.  The alternatives are

\[
\boxed{
\begin{array}{c|c|c}
&\text{cross-copy protection}&\text{mass and portal from one }27_F27_F\\
\hline
s_w\ne s_d&\mathrm{YES}&\mathrm{NO}\\
s_w=s_d=-2f&\mathrm{NO}&\mathrm{YES}
\end{array}}
\]

Thus two symmetric scalar copies alone do not produce a protected nonzero
mass-plus-portal construction with one matter copy.  The positive
gauge-orthogonal direction remains real, but an additional relation carrier
is required to populate and protect it.

## 1. Representation-theoretic form

Let \(G\) be any compact unitary selector commuting with E6, not
necessarily Abelian as an abstract group.  Because the matter E6 irrep has
multiplicity one, the selector acts on \(27_F\) through a one-dimensional
character \(\chi_f\).  The matter bilinear therefore transforms through
\(\chi_f^2\).

If \(W\cong\mathbb C^2\) is the symmetric-Higgs copy module, an invariant
numerical Yukawa covector belongs to

\[
\operatorname{Hom}_G(W,\chi_f^{-2}).
\]

It has support only on the \(\chi_f^{-2}\) isotypic component of \(W\).
If \(S_w\) and \(S_d\) lie in inequivalent selector sectors, no such
covector is nonzero on both.  If both lie in the same character sector,
the selector acts as the same scalar on their two-dimensional multiplicity
space and permits arbitrary Hermitian cross bilinears there.

This proves the trilemma for finite groups, continuous groups, and their
products.  The additive charge equations are its one-dimensional
coordinate form.

## 2. Why spontaneous breaking does not rescue the Ward identity

The obstruction concerns invariance of the ultraviolet Yukawa and scalar
operators before choosing the vacuum.  A VEV may spontaneously break the
selector, but it cannot turn a forbidden ultraviolet Yukawa projection
into an invariant numerical coupling.  Conversely, when both projections
are allowed because the axes carry the same character, the ultraviolet
theory already permits the cross-copy scalar tensors that can rotate the
orthogonal light projector.

One can choose those tensors to vanish at a matching scale.  That is a
parameter restriction, not protection by the stated selector.  Scalar and
Yukawa loops then test the restriction just as the gauge loop tested
\(\lambda_2=0\) in the multiplicity-one theory.

## 3. Relation to the positive gauge result

The no-go does not undo claim 1571.  Pure gauge interactions remain
proportional to the copy identity and preserve the orthogonal direction.
The conflict enters only when one asks the same ordinary selector to do
three jobs:

1. distinguish the VEV and light axes;
2. allow the singlet-mass projection \(y\cdot w\); and
3. allow the light-portal projection \(y\cdot d\).

With one matter copy and invariant numerical couplings, any two imply the
failure of the third.

## 4. Minimum next enlargement

At least one assumption of the proof must be relaxed:

1. **Matter multiplicity:** two matter copies give the bilinear sector a
   nontrivial selector representation rather than one character.
2. **Transforming relation spurion:** replace the fixed numerical covector
   by a field or correspondence object whose expectation value carries the
   missing selector transformation.
3. **Noncommuting enlargement:** embed the copy action and E6 into a larger
   algebra so Schur's multiplicity-one reduction no longer applies.
4. **Accept an unprotected orientation:** retain the kinematic construction
   but treat its cross-copy zeros and Yukawa ray as tunings.

The first two are finite, auditable next models.  A matter-copy extension
must still recover one chiral family after its enlarged mass matrix is
diagonalized.  A transforming-spurion extension must exhibit a potential
that fixes the required tilted covector without reintroducing the forbidden
scalar tensor.

## Spin(2,3) status

The result turns “relation space” from a metaphor into a representation
requirement.  A useful Spin(2,3)-derived object cannot be a fixed pair of
ordinary Yukawa numbers.  It must transform so that a single invariant
source can connect selector-distinct copy axes, or it must supply a matter
multiplicity on which the bilinear is no longer a lone character.

The next beautiful ansatz is therefore a typed two-state correspondence
spurion \(Y_a\): its transformation law compensates the two scalar-axis
characters, while a separate invariant fixes its two nonzero projections.
That is only a signpost until its stabilizing potential and Ward identities
are written explicitly.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_e6_two_copy_selector_yukawa_trilemma.mjs
~~~
