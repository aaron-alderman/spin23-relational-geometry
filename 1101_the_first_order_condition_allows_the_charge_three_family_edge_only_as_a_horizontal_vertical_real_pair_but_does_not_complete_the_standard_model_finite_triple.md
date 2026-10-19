# The First-Order Condition Allows the Charge-Three Family Edge Only as a Horizontal/Vertical Real Pair, but Does Not Complete the Standard-Model Finite Triple

**Date:** 18 October 2026  
**Branches:** two-point family algebra, Krajewski bimodule, first-order condition, real structure, charge-three scalar  
**Claim status:** exact finite-bimodule compatibility theorem; KO-dimension, grading, physical Hilbert-space and full Standard-Model embedding remain open  
**Certificate:** [prove_the_charge_three_family_edge_passes_first_order_as_a_real_Krajewski_pair.mjs](scripts/prove_the_charge_three_family_edge_passes_first_order_as_a_real_Krajewski_pair.mjs)

## Executive result

The first-order condition does not automatically kill the charge-three
one-form of document 1100. It dictates how the edge must be represented.

For the two-point algebra

\[
\mathcal A_{\rm fam}=\mathbb C\oplus\mathbb C,
\]

label a bimodule sector by

\[
(i,j),\qquad i,j\in\{0,1\},
\]

where \(i\) is the left-algebra character and \(j\) is the opposite-algebra
character.

An entry of \(D_F\) from \((i,j)\) to \((k,\ell)\) obeys the first-order
condition for all algebra elements iff

\[
\boxed{i=k\quad\text{or}\quad j=\ell.}
\]

Therefore the desired family-changing edge is admissible when it is
horizontal:

\[
(0,r)\longleftrightarrow(1,r).
\]

The real structure sends \((i,j)\mapsto(j,i)\), so its conjugate is the
vertical edge

\[
(r,0)\longleftrightarrow(r,1).
\]

With unimodular family weights

\[
(q_0,q_1)=(-2,1),
\]

the two orientations carry charges \(+3\) and \(-3\). A diagonal edge

\[
(0,0)\longleftrightarrow(1,1)
\]

changes both labels and is forbidden.

Thus a real first-order completion exists at the Krajewski-diagram level, but
it necessarily contains a horizontal/vertical conjugate pair rather than one
isolated arrow.

## 1. General first-order coefficient

On a bimodule basis state \(|i,j\rangle\), let

\[
L(a)|i,j\rangle=a_i|i,j\rangle,
\qquad
R(b)|i,j\rangle=b_j|i,j\rangle.
\]

For a Dirac entry

\[
D_{(i,j),(k,\ell)},
\]

the first commutator has coefficient

\[
[D,L(a)]_{(i,j),(k,\ell)}
=(a_k-a_i)D_{(i,j),(k,\ell)}.
\]

The double commutator is

\[
\bigl[[D,L(a)],R(b)\bigr]_{(i,j),(k,\ell)}
=(a_k-a_i)(b_\ell-b_j)
D_{(i,j),(k,\ell)}.
\]

For this to vanish for all \(a,b\), one factor must vanish identically:

\[
i=k
\quad\text{or}\quad
j=\ell.
\]

This is the horizontal/vertical edge rule.

## 2. The charge-three horizontal edge

Choose a common opposite label \(r\) and connect

\[
(0,r)\longleftrightarrow(1,r).
\]

The left label changes, so the algebra commutator is nonzero and the edge
generates a one-form. The opposite label is unchanged, so the second
commutator vanishes.

For the primitive unimodular weights

\[
q_0=-2,\qquad q_1=1,
\]

the gauge-charge difference is

\[
q_1-q_0=3.
\]

The reverse orientation has charge \(-3\). This recovers the flavon and its
adjoint.

## 3. Real-structure completion

At the level of bimodule labels, the real structure exchanges left and
opposite actions:

\[
J:(i,j)\mapsto(j,i).
\]

It therefore maps the horizontal edge to

\[
(r,0)\longleftrightarrow(r,1),
\]

which changes only the opposite label. This vertical edge also obeys first
order.

The pair is the minimal real closure of the family-changing arrow:

\[
\boxed{
\text{horizontal }S_{+3}
\quad\overset{J}{\longleftrightarrow}\quad
\text{vertical }S_{-3}.
}
\]

This is a structural improvement over adding a standalone flavon by hand.
Reality predicts its conjugate orientation.

## 4. The forbidden diagonal shortcut

An edge from \((0,0)\) to \((1,1)\) changes both the left and opposite
characters. For suitable \(a,b\),

\[
(a_1-a_0)(b_1-b_0)\ne0.
\]

Hence

\[
[[D,L(a)],R(b)]\ne0,
\]

and the edge violates first order.

This matters because a naive particle-to-conjugate or exceptional-to-pair
shortcut may look like the desired scalar by charge counting while failing
the actual bimodule condition.

## 5. Multiplicity \(1+2\)

The point label \(0\) represents the rank-one exceptional block and \(1\) the
rank-two paired block. The horizontal Dirac entry is therefore not a scalar
number but a row or column

\[
K:P_\alpha F\longleftrightarrow(I-P_\alpha)F.
\]

Its two complex components are Yukawa-direction data inside the paired plane.
The algebra fixes their common charge, not their relative orientation.

Consequently the one-form sector contains a charge-three representation, but
the precise number of propagating scalar components after the junk quotient
and kinetic normalization is not yet determined by this label theorem.

## 6. Interaction with family selection

Choosing which spectral projector is the rank-one block remains prior data:

\[
P_\alpha\in\{P_e,P_\mu,P_\tau\}.
\]

For each choice, the same horizontal/vertical construction works. The
first-order condition therefore validates the mechanism class but does not
choose the exceptional family.

Within the rank-two complement there is also a residual \(U(2)\) basis
freedom until further Yukawa or neutrino data select the direction of \(K\).
Thus the construction separates two questions:

1. which line is exceptional;
2. which vector in the complementary plane the flavon edge couples to.

## 7. Remaining full-triple gates

The Krajewski-level result does not yet establish:

- the physical KO dimension and the signs of \(J^2\), \(JD\) and
  \(J\gamma\);
- a grading assignment for all arrow endpoints;
- orientability and Poincaré duality;
- compatibility with the existing Standard-Model/Pati–Salam algebra;
- the complete particle/conjugate multiplicity table;
- physical unimodularity over that table;
- the junk-quotiented represented one-form dimension;
- the scalar kinetic form and potential.

Those must be checked in an explicit matrix model.

## 8. Stop-everything and falsification criteria

**First-order stop:** any proposed charge-three edge changing both left and
opposite characters is forbidden.

**Reality stop:** a purported real completion that includes the horizontal
edge but omits its \(J\)-reflected vertical partner is incomplete.

**Multiplicity stop:** the label theorem does not prove that the row/column
\(K\) reduces to one complex scalar.

**Selection stop:** first-order compatibility holds for all three
\(P_\alpha\) and selects none.

**Full-triple stop:** do not infer KO signs, grading, orientability or physical
unimodularity from the two-point diagram alone.

**Positive trigger:** a complete finite matrix model realizes this arrow pair,
passes all real-even spectral-triple axioms and leaves exactly one
charge-three Standard-Model singlet after the junk quotient.

## 9. Verdict

\[
\boxed{
[[D,L(a)],R(b)]=0
\iff
\text{every nonzero edge is horizontal or vertical}.
}
\]

The charge-three family edge passes this test when its endpoints share the
opposite character. Reality completes it with the perpendicular conjugate
edge. This removes the first-order condition as an immediate obstruction.

The programme is now pinned one level deeper: at the explicit real-even
finite matrix representation and its junk-quotiented scalar calculus.

## Position in the corpus

- [KO-6 orientability obstruction and anchor repair](1102_the_minimal_two_point_KO6_family_quartet_fails_orientability_but_one_anchor_character_gives_an_explicit_real_even_first_order_completion.md)
- [minimal two-point family algebra and charge-three one-form](1100_the_minimal_two_point_family_algebra_produces_the_A2_vertex_by_unimodularity_and_a_charge_three_one_form_but_its_full_NCG_embedding_remains_open.md)
- [finite-one-form multiplicity underdetermination](1077_coarse_Furey_arrow_incidence_cannot_determine_the_represented_one_form_or_S1_copy_number.md)
- [charged-lepton projector selection boundary](1099_the_charged_lepton_Dirac_spectrum_canonically_labels_all_three_family_projectors_but_neither_selects_one_B_minus_3Li_vertex_nor_generates_its_charge_three_flavon.md)
