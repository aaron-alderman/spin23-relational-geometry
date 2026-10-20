# The Selected Heavy-Neutrino Bridge Generates an Apparent Dirac Leakage, but Its Complete Schur Package Preserves the Texture Zero

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact sequential-matching theorem for the rank-one seesaw block; independent mediators, loops and full Pati--Salam matching remain open

**Depends on:** [the one-mediator portal census](1496_exactly_three_single_mediator_tree_bridges_generate_the_dimension_five_Dirac_leakage_and_each_requires_two_incidence_portals.md), [the operator-dimension moat](1495_the_charge_three_operator_dimension_moat_is_renormalizable_for_Majorana_sewing_but_the_leading_Dirac_texture_lift_forgets_the_breaking_vev.md), and [the rank-one seesaw texture theorem](../1100-1199/1111_a_rank_one_complementary_Majorana_block_can_give_three_heavy_masses_but_block_preserving_seesaw_forces_a_selected_flavour_texture_zero.md)

**Primary-source inventory:** [Chamseddine--Connes--van Suijlekom, arXiv:1304.8050](https://arxiv.org/abs/1304.8050) supplies sixteen fermions in \((2,1,4)+(1,2,4)\), including the right-neutrino carrier used below.

**Evidence:** [sequential-matching ledger](../../../evidence/data/spin23-sequential-seesaw-bridge-cancellation.json) and [executable verifier](../../../verification/verify/verify_spin23_sequential_seesaw_bridge_cancellation.mjs)

## Result

The first application of the three-portal census reveals a necessary
correction. A mediator bridge does not always represent independent Dirac
leakage.

The selected right-handed neutrino already present in the seesaw can mediate

\[
L_PH\longrightarrow \nu_P^c
\longrightarrow S\nu_N^c.
\]

If it is integrated out before the other heavy neutrinos, this path generates
an apparent selected-to-null Dirac operator. But it simultaneously generates
a direct Weinberg contact and changes the remaining Majorana block. The full
Schur-complement package cancels exactly.

For

\[
M_R=
\begin{pmatrix}
a&x&y\\
x&d&0\\
y&0&0
\end{pmatrix},
\qquad
m_D^{(P)}=(d_P,0,0),
\]

integrating out the selected state first gives

\[
M_Q^{\rm eff}
=
\begin{pmatrix}d&0\\0&0\end{pmatrix}
-\frac1a
\begin{pmatrix}x\\y\end{pmatrix}
\begin{pmatrix}x&y\end{pmatrix},
\]

\[
r_Q^{\rm eff}=-\frac{d_P}{a}(x,y),
\qquad
\kappa_P=-\frac{d_P^2}{a}.
\]

Although the induced null component

\[
(r_Q^{\rm eff})_N=-\frac{d_Py}{a}
\]

is nonzero, later exchange of the remaining \(Q\) states gives

\[
-r_Q^{\rm eff}(M_Q^{\rm eff})^{-1}(r_Q^{\rm eff})^T
=+\frac{d_P^2}{a}.
\]

Therefore

\[
\boxed{
\kappa_P-r_Q^{\rm eff}(M_Q^{\rm eff})^{-1}(r_Q^{\rm eff})^T=0.
}
\]

The apparent Dirac bridge is harmless when its correlated matching package
is retained. An **independent** null-line Dirac coefficient still lifts the
texture linearly.

## 1. Why this bridge exists in the physical inventory

The source Pati--Salam model contains the usual sixteen fermions per family
in

\[
(2,1,4)+(1,2,4).
\]

The right-handed neutrino is therefore already a singlet-like low-energy
component of the physical fermion carrier. No new vectorlike fermion is
needed to realize the first topology of claim 1496 after Pati--Salam
breaking.

The two portals are also precisely the desired ones:

- \(L_PH\nu_P^c\) is the selected neutral Dirac coupling;
- \(S\nu_P^c\nu_N^c\) is the rank-restoring charge-three Majorana sewing.

A rule demanding that one of these portals vanish would destroy the intended
seesaw construction. The correct question is whether their induced operators
form the complete Schur package.

## 2. Sequential matching

Write the heavy matrix in selected/complementary block form,

\[
M_R=
\begin{pmatrix}
a&c^T\\
c&B
\end{pmatrix},
\qquad
c=(x,y)^T,
\qquad
B=\operatorname{diag}(d,0).
\]

Eliminating the selected heavy state produces three linked coefficients:

\[
M_Q^{\rm eff}=B-\frac{cc^T}{a},
\]

\[
r_Q^{\rm eff}=-\frac{d_Pc^T}{a},
\]

and

\[
\kappa_P=-\frac{d_P^2}{a}.
\]

They are not separately adjustable Wilson coefficients. Direct inversion
gives

\[
c^T(M_Q^{\rm eff})^{-1}c=-a,
\]

whenever \(d\ne0\), \(y\ne0\) and the displayed inverses exist. Hence the
remaining-heavy exchange is

\[
-\frac{d_P^2}{a^2}
c^T(M_Q^{\rm eff})^{-1}c
=+\frac{d_P^2}{a},
\]

which cancels the contact term.

This is the sequential form of the original cofactor identity

\[
(M_R^{-1})_{PP}=0.
\]

## 3. Independent leakage remains dangerous

Now add an independent Dirac null coefficient \(r_N\) in the unintegrated
theory:

\[
m_D^{(P)}=(d_P,0,r_N).
\]

The exact full-theory result becomes

\[
(m_\nu)_{PP}
=-\frac{2d_Pr_N}{y}
-r_N^2\frac{x^2-ad}{dy^2}.
\]

This does not belong to the correlated Schur package above. Its linear term
is generically nonzero. Thus the physically meaningful distinction is not

\[
\text{bridge present versus bridge absent},
\]

but

\[
\boxed{
\text{correlated reducible bridge versus independent leakage coefficient}.}
\]

## 4. Correction to the portal census

Claim 1496 remains an exhaustive classification of one-mediator topologies,
but its original protection criterion was too strong. The selected-neutrino
fermion topology need not be cut when it is merely a partial matching of the
same full seesaw system.

The corrected criterion is:

1. retain any bridge whose complete induced operator packet satisfies the
   Schur relation and preserves the cofactor zero;
2. cut or constrain every independent mediator packet whose matching adds a
   freely variable Dirac null coefficient;
3. never diagnose leakage from one operator extracted from a sequential EFT
   while discarding its correlated contact and mass terms.

This replaces graph disconnection by **correlation closure**.

## 5. Spin(2,3) interpretation

The result improves the missing middle. The Spin(2,3) branch does not require
an absolutely disconnected selected/null graph. It requires a relational
packet whose full response has a null Schur complement in the selected light
channel.

\[
\begin{array}{c}
\text{rank-restoring Majorana relation}\\
\Downarrow\\
\text{apparent sequential Dirac bridge}
\end{array}
\quad\longleftrightarrow\quad
\boxed{\text{complete Schur-correlated packet}}
\quad\longleftrightarrow\quad
\begin{array}{c}
\kappa_P+\text{remaining exchange}=0\\
\Downarrow\\
(m_\nu)_{PP}=0.
\end{array}
\]

This is a more genuinely relational condition than a simple forbidden-edge
rule: the individual edge is visible, but the completed response vanishes.

## 6. Boundaries

**Sequential-EFT stop:** never retain the induced Dirac operator while
discarding the simultaneously induced Weinberg contact or Majorana shift.

**Independent-mediator stop:** the cancellation does not apply to a new
mediator with unrelated portal coefficients.

**Hierarchy boundary:** the intermediate EFT description assumes a scale at
which the selected state can be eliminated before the complementary states.
The full cofactor identity itself does not require a hierarchy.

**Loop boundary:** radiative corrections preserve the cancellation only if
they renormalize the correlated packet consistently or an exact identity
enforces it.

**Positive trigger:** classify the remaining two mediator topologies and any
extra singlet-fermion states by whether their complete matching packets obey
an analogous Schur identity.

## Verdict

The first physical mediator test turns a prospective no-go into a stronger
joining principle:

\[
\boxed{
\text{a generated Dirac-looking bridge is harmless when it is the correlated
shadow of the same rank-one seesaw block}.}
\]

Exact protection is therefore not synonymous with deleting every path. It is
the closure of every retained path into the complete response packet required
by the cofactor zero.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_sequential_seesaw_bridge_cancellation.mjs
~~~
