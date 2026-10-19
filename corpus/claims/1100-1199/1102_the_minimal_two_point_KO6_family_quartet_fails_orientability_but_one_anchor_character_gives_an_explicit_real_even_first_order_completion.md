# The Minimal Two-Point KO-6 Family Quartet Fails Orientability, but One Anchor Character Gives an Explicit Real-Even First-Order Completion

**Date:** 18 October 2026  
**Branches:** family spectral triple, KO dimension six, orientability, Krajewski diagram, charge-three one-form, anchor character  
**Claim status:** exact toy finite-spectral-triple theorem; embedding into the physical Standard-Model/Pati–Salam triple and Poincaré duality remain open  
**Certificate:** [prove_the_two_point_KO6_orientability_obstruction_and_anchor_repair.mjs](../../../verification/prove/prove_the_two_point_KO6_orientability_obstruction_and_anchor_repair.mjs)

## Executive result

The horizontal/vertical real pair of document 1101 can be realized by explicit
matrices with the finite Standard-Model KO-6 signs

\[
J^2=1,\qquad JD=DJ,\qquad J\gamma=-\gamma J.
\]

For the pure two-point algebra, however, the smallest four-state realization
necessarily duplicates a self-conjugate bimodule label \((r,r)\) with opposite
gradings. Every represented Hochschild zero-cycle acts identically on those
two copies, so it cannot reproduce \(\gamma\). The minimal quartet therefore
fails orientability.

There is a clean repair. Introduce one distinct anchor character \(s\), and
use the four bimodule sectors

\[
(0,s),\quad(1,s),\quad(s,0),\quad(s,1).
\]

The first pair carries the horizontal charge-three edge and the second is its
\(J\)-reflected vertical conjugate. With

\[
\gamma=(+,-,-,+),
\]

the resulting four-state model satisfies:

- faithful left and opposite actions;
- order zero;
- first order;
- self-adjoint odd \(D\);
- \(J^2=1\);
- \(JD=DJ\);
- \(J\gamma=-\gamma J\);
- orientability by an explicit zero-cycle.

Thus the first real-even obstruction is not the charge-three edge. It is the
lack of a third anchor character in the standalone two-point model.

## 1. The minimal two-point quartet

Take the horizontal edge

\[
(0,0)\longleftrightarrow(1,0)
\]

and close it under

\[
J:(i,j)\mapsto(j,i).
\]

The conjugate edge is

\[
(0,0)\longleftrightarrow(0,1).
\]

To implement \(J\gamma=-\gamma J\), the self-conjugate label \((0,0)\) must
occur twice, once in each grading. A four-state basis can be written

\[
(0,0)_+,\quad(1,0)_-,\quad(0,0)_-,\quad(0,1)_+.
\]

With \(J\) exchanging the first and third states and the second and fourth,
and with \(D\) connecting the first pair and the second pair, all KO-6 sign,
oddness, order-zero and first-order relations can be satisfied.

## 2. Why orientability fails

For a zero-dimensional finite triple, orientability asks for a zero-cycle
whose representation gives the grading:

\[
\gamma
=\sum_n\pi(a_n)J\pi(b_n)J^{-1}.
\]

Every term acts on a bimodule sector \((i,j)\) by a function of the pair
\((i,j)\). Therefore it has the same value on repeated copies of the same
bimodule label.

But the two copies of \((0,0)\) above have opposite grading:

\[
\gamma(0,0)_+=+1,\qquad
\gamma(0,0)_-=-1.
\]

No represented zero-cycle can distinguish them. Hence:

\[
\boxed{
\text{the minimal two-point KO-6 quartet is not orientable}.
}
\]

The same obstruction occurs if the common opposite label is \(1\): the
self-conjugate sector \((1,1)\) must be doubled with opposite grading.

## 3. The anchor-character repair

Let \(s\) be a third algebra character distinct from the exceptional and
paired family characters. Use

\[
\mathcal A_{\rm toy}=\mathbb C_0\oplus\mathbb C_1\oplus\mathbb C_s
\]

and the four sectors

\[
h_0=(0,s),\qquad
h_1=(1,s),\qquad
Jh_0=(s,0),\qquad
Jh_1=(s,1).
\]

No sector label is repeated. Define

\[
\gamma h_0=+h_0,\quad
\gamma h_1=-h_1,\quad
\gamma Jh_0=-Jh_0,\quad
\gamma Jh_1=+Jh_1.
\]

Let

\[
D h_0=k h_1,\qquad
D h_1=\bar k h_0,
\]

and close this edge under \(J\) on the conjugate pair. Then \(D\) is
self-adjoint, odd and \(J\)-real.

## 4. Explicit orienting cycle

Let \(e_i\) be the minimal idempotent of the \(i\)-th algebra character. The
zero-cycle

\[
c=
e_0\otimes e_s^o
-e_1\otimes e_s^o
-e_s\otimes e_0^o
+e_s\otimes e_1^o
\]

acts with signs

\[
(+,-,-,+)
\]

on the ordered four sectors. Therefore

\[
\boxed{\pi(c)=\gamma.}
\]

This is an explicit orientability certificate for the anchored toy model.

## 5. First-order and charge audit

The particle edge

\[
(0,s)\longleftrightarrow(1,s)
\]

shares its opposite label and is first-order compatible. The conjugate edge

\[
(s,0)\longleftrightarrow(s,1)
\]

shares its left label and is also compatible.

Assign the family weights

\[
q_0=-2,\qquad q_1=1.
\]

The anchor charge cancels from the difference, so the horizontal edge carries

\[
q_1-q_0=3,
\]

and its \(J\)-partner carries \(-3\). The anchor repairs orientability without
changing the flavon charge.

## 6. What the anchor may mean

The theorem does not require a third independent family gauge symmetry in the
physical theory. In a complete almost-commutative geometry, the anchor
character could be supplied by an existing internal summand or an already
present particle-type bimodule label.

There are therefore two branches:

1. **new-summand branch:** adjoin a genuine third complex summand and then
   remove or Higgs any unwanted extra \(U(1)\);
2. **existing-anchor branch:** realize \(s\) using a character already present
   in the Standard-Model/Pati–Salam finite algebra.

The second is structurally preferable, but it requires the complete
representation table.

## 7. Remaining axioms and physical gates

The anchored toy model still does not prove:

- the correct embedding in the physical fermion Hilbert space;
- compatibility with all existing Standard-Model Dirac entries;
- Poincaré duality of the complete intersection form;
- physical unimodularity and removal of extra abelian directions;
- absence of fermion doubling beyond the usual real-triple construction;
- the junk-quotiented one-form multiplicity;
- positive scalar kinetic normalization;
- a viable scalar potential and residual baryon triality.

It proves only that KO-6 reality, grading, first order and orientability can
coexist with the charge-three arrow once an anchor character is available.

## 8. Stop-everything and falsification criteria

**Orientability stop:** the standalone two-point quartet cannot be called an
orientable KO-6 finite triple.

**Anchor stop:** adding a duplicate Hilbert-space state without a distinct
bimodule character does not repair orientability.

**Gauge stop:** a new anchor summand that leaves an unwanted massless \(U(1)\)
is not an acceptable physical completion.

**Embedding stop:** an existing algebra character counts as an anchor only if
the full representation, \(J\), grading and Dirac support realize the four
required sectors.

**Duality stop:** orientability alone does not establish Poincaré duality.

**Positive trigger:** an existing Standard-Model/Pati–Salam summand supplies
the anchor, the complete intersection form is nondegenerate, and physical
unimodularity retains exactly the desired \(U(1)_X\).

## 9. Verdict

\[
\boxed{
\begin{array}{c}
\mathbb C\oplus\mathbb C:
\quad J,\gamma,D,\text{ first order pass, orientability fails};\\[2mm]
\mathbb C\oplus\mathbb C\oplus\mathbb C_s:
\quad\text{an anchored KO-6 orientable completion exists}.
\end{array}
}
\]

The next highest-value calculation is no longer an abstract axiom search. It
is a representation-table search for an existing internal character that can
serve as \(s\), followed by the full intersection-form and unimodularity
audit.

## Position in the corpus

- [Poincaré-duality obstruction and four-character repair](1103_the_orientable_three_character_family_model_fails_Poincare_duality_while_a_fourth_spectator_repairs_the_intersection_form_but_not_Dirac_connectedness.md)
- [first-order horizontal/vertical real pair](1101_the_first_order_condition_allows_the_charge_three_family_edge_only_as_a_horizontal_vertical_real_pair_but_does_not_complete_the_standard_model_finite_triple.md)
- [minimal two-point family algebra and charge-three one-form](1100_the_minimal_two_point_family_algebra_produces_the_A2_vertex_by_unimodularity_and_a_charge_three_one_form_but_its_full_NCG_embedding_remains_open.md)
- [finite-one-form multiplicity underdetermination](../1000-1099/1077_coarse_Furey_arrow_incidence_cannot_determine_the_represented_one_form_or_S1_copy_number.md)
