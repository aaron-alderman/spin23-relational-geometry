# Sums of Rank-One Schur Packets Preserve the Texture Only When All Mediator Paths Share One Projective Coupling Ray

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact real/common-phase same-sign multi-packet theorem; complex and indefinite cancellation branches remain open

**Depends on:** [the typed-path Schur matching law](1508_the_typed_path_matching_law_maps_the_required_composite_to_a_rank_one_Schur_packet_not_an_independent_leakage_arrow.md), [the three tree-bridge topology census](../1400-1499/1496_exactly_three_single_mediator_tree_bridges_generate_the_dimension_five_Dirac_leakage_and_each_requires_two_incidence_portals.md), and [the minimal Pati--Salam mediator triage](../1400-1499/1498_the_minimal_spectral_Pati_Salam_inventory_reduces_the_three_Dirac_bridges_to_one_conditional_family_charged_bidoublet_threat.md)

**Evidence:** [packet-sum alignment ledger](../../../evidence/data/spin23-Schur-packet-sum-alignment.json) and [Cauchy--Binet verifier](../../../verification/verify/verify_spin23_sum_of_Schur_packets_requires_projective_alignment.mjs)

## Result

The rank-one Schur matching ideal of claim 1508 is not closed under arbitrary
addition. Two individually correlated mediator paths generically produce a
rank-two sum and lift the protected cofactor.

For

\[
G_i=w_i v_iv_i^T,
\qquad
v_i=\begin{pmatrix}d_i\\y_i\end{pmatrix},
\]

one has

\[
\boxed{
\det(G_1+G_2)
=w_1w_2(d_1y_2-d_2y_1)^2.}
\]

When the weights have the same sign, the sum remains rank one if and only if

\[
\boxed{d_1:y_1=d_2:y_2.}
\]

Thus packet-by-packet correlation is insufficient. Exact multi-mediator
protection requires every coupling vector to lie on one projective ray.

## 1. Two-packet derivation

Write

\[
G_i=rac1{a_i}
\begin{pmatrix}
d_i^2&d_iy_i\\
d_iy_i&y_i^2
\end{pmatrix},
\qquad a_i>0.
\]

Direct expansion gives

\[
\det(G_1+G_2)
=\frac{(d_1y_2-d_2y_1)^2}{a_1a_2}.
\]

Each summand has zero determinant, but their sum does not unless their two
generating vectors are linearly dependent. The obstruction is the squared
oriented area of the two coupling vectors.

## 2. Arbitrarily many mediators

For

\[
G=\sum_i w_i v_iv_i^T,
\]

the two-row Cauchy--Binet identity gives

\[
\boxed{
\det G
=\sum_{i<j}w_iw_j(d_iy_j-d_jy_i)^2.}
\]

If every \(w_i\) has the same sign, every term is nonnegative. Hence

\[
\det G=0
\Longleftrightarrow
d_iy_j-d_jy_i=0
\quad\text{for all }i,j.
\]

All nonzero paths must share one ratio \(d_i/y_i\).

## 3. Exhaustive finite audit

The verifier takes

\[
a_1,a_2\in\{1,2,3\},
\qquad
d_i,y_i\in\{-2,-1,1,2\}.
\]

Among 2,304 two-packet cases:

- 432 are projectively aligned and retain zero determinant;
- 1,872 are nonaligned and acquire strictly positive determinant;
- no case violates the squared-minor formula.

It separately verifies the three-vector Cauchy--Binet identity.

## 4. Fan downward: multi-mediator texture stability

The EFT consequence is immediate. It is not enough to establish that every
mediator is individually integrated out with its complete Schur packet.
Different packets must also be mutually aligned.

The three tree topologies of claim 1496 therefore divide into:

1. absent paths;
2. paths using the same one-dimensional coupling ray;
3. paths introducing an independent ray and lifting the cofactor.

The minimal sourced Pati--Salam inventory remains promising because only the
existing selected-neutrino packet is compulsory. Any added heavy-left or
charged-bidoublet completion must pass the stronger common-ray test.

## 5. Fan upward: one-dimensional typed Hom space

The clean structural implementation is not a numerical equality imposed on
many couplings. It is a one-dimensional typed morphism space:

\[
\dim\operatorname{Hom}_{\rm typed}(L\oplus N,P)=1
\]

in the relevant coupling direction. Then every allowed mediator path is a
scalar multiple of the same vector, and projective alignment is automatic.

This is stronger than relation-sheet parity and stronger than remembering
each path separately. The categorical middle must constrain the span of all
admissible matching vectors, not only their individual provenance.

## 6. Spin(2,3) joining interpretation

The common ray is a shared hinge direction for all paths joining the Dirac
and Majorana wheels. Multiple hinges spanning a plane inflate the rank-one
Schur face and destroy the bottom-up cofactor zero. One typed hinge keeps the
joined face rank one.

This gives a new convergence diagnostic:

\[
\boxed{
\text{top-down morphism rank one}
\Longleftrightarrow
\text{all Schur paths projectively aligned}
\Longleftrightarrow
\text{bottom-up cofactor protected}.}
\]

## Boundaries

**Phase boundary:** for complex vectors with transpose rather than Hermitian
Gram structure, squared minors can cancel by phase.

**Indefinite boundary:** opposite-sign inverse masses can cancel distinct
minor contributions. Such cancellations are tuned branches, not the positive
same-sign theorem.

**Loop boundary:** loop form factors can depend on momentum and need not lie
on a constant common ray.

**Derivation boundary:** the current relation category has not yet derived a
one-dimensional global Hom space from the Spin(2,3) or Jordan data.

## Verdict

The first categorical construction needs one further global condition:

\[
\boxed{
\text{all contributing Schur paths must span one projective coupling ray}.}
\]

The next gate is to test whether the typed twin-wheel/Jordan representation
forces this one-dimensional Hom space, or whether it admits multiple
independent intertwiners and therefore generically loses the texture.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_sum_of_Schur_packets_requires_projective_alignment.mjs
node verification/verify/verify_spin23_typed_path_Schur_packet.mjs
~~~
