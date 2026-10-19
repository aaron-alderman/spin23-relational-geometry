# Exceptional-parent frontier 03: distinct \(Spin(10)\) Clebsches admit a tuned safe vector, not a protected seven-channel theory

**Date:** 18 October 2026  
**Frontier:** distinct-representation second-stage selector  
**Status:** algebraic witness found; representation-only protection obstructed  
**Certificate:** [analyze_exceptional_distinct_clebsch_selector.mjs](../../../../verification/analyze/analyze_exceptional_distinct_clebsch_selector.mjs)

## Result

A \(10_H\oplus\overline{126}_H\) scalar sector contains enough linearly independent Clebsch vectors to construct a particular Standard-Model triplet and antitriplet combination which:

- retains the \(QL\), \(u^ce^c\), and \(d^c\nu^c\) links;
- cancels the \(QQ\) and \(u^cd^c\) links;
- preserves the equal-and-opposite orientation between \(u^ce^c\) and \(d^c\nu^c\).

This is a genuine algebraic result, but not a symmetry-protected result. It requires:

1. proportional symmetric family tensors \(F=\kappa H\);
2. specific mixing coefficients among inequivalent \(10\) and \(\overline{126}\) scalar components;
3. a heavy mass/kinetic operator preserving those kernel directions.

None of these relations follows from \(Spin(10)\) itself. The \(120_H\) does not repair the problem: its family Yukawa tensor is antisymmetric, so it vanishes on same-family channels and cannot cancel a symmetric \(10/\overline{126}\) source matrix.

The scoped conclusion is therefore

\[
\boxed{
\text{distinct Clebsches can engineer the seven-channel vector,}
\quad
\text{but do not protect it.}
}
\]

## 1. Primary representation input

The renormalizable matter bilinear is multiplicity-free:

\[
16\otimes16=(10\oplus126)_{\rm sym}\oplus120_{\rm antisym}.
\]

Thus the Yukawa matrices obey

\[
H^T=H,
\qquad F^T=F,
\qquad G^T=-G
\]

for \(10_H\), \(\overline{126}_H\), and \(120_H\), respectively. This decomposition and the symmetry types are given explicitly by [Grimus and Kühböck](https://arxiv.org/abs/hep-ph/0607197) and by the complete coupling construction of [Nath and Syed](https://arxiv.org/abs/hep-ph/0103165).

For the component Clebsches, the audit uses the normalized couplings tabulated by [Patel and Shukla](https://arxiv.org/abs/2203.07748):

- their Eq. (8) gives the \(10_H\) antitriplet combination \(u^cd^c-QL\);
- Eq. (15) gives the \(\overline{126}_H\) \(\overline{45}\) combination \(u^cd^c+QL\);
- Eqs. (11) and (17) give the two \(\overline{126}_H\) triplet ratios from its \(SU(5)\) \(5\) and \(50\);
- Eqs. (18)--(24) show that the \(120_H\) tensor is family-antisymmetric and supplies additional triplet classes rather than a symmetric-family cancellation.

The same paper's complete spectrum contains one triplet pair in \(10_H\), multiple copies in \(\overline{126}_H\) and \(120_H\), and explicitly finds scalar-mediated proton-decay channels. This matters: an algebraically safe combination does not erase the orthogonal heavy inventory.

## 2. Clebsch linear algebra

Absorb representation-wide normalizations and phases into scalar mixing coefficients. In the triplet mediator basis

\[
(10,\overline{126}_{5},\overline{126}_{50}),
\]

the relevant source covectors can be chosen as

\[
\begin{array}{c|ccc}
 &10&\overline{126}_{5}&\overline{126}_{50}\\ \hline
QQ&1&1&1\\
u^ce^c&2&-2&2\\
d^c\nu^c&-2&0&0
\end{array}
\]

The \(10\) row uses the standard \(SU(5)\) ratio \(QQ:u^ce^c=1:2\), while the relative \(u^ce^c-d^c\nu^c\) orientation is the exact \(Spin(10)\) result already certified in document 1073. The two \(\overline{126}\) columns are rescaled versions of Eqs. (11) and (17) of Patel--Shukla. Common column rescalings do not affect the existence or nonexistence of a kernel.

The unique direction which both kills \(QQ\) and preserves the right-pair orientation is

\[
v_T=(-2,1,1).
\]

Indeed,

\[
QQ(v_T)=0,
\qquad
u^ce^c(v_T)=-4,
\qquad
d^c\nu^c(v_T)=+4.
\]

For the antitriplet basis

\[
(10,\overline{126}_{\overline{45}}),
\]

the two covectors are

\[
u^cd^c=(1,1),
\qquad
QL=(-1,1).
\]

The direction

\[
v_{\bar T}=(1,-1)
\]

therefore gives

\[
u^cd^c(v_{\bar T})=0,
\qquad
QL(v_{\bar T})=-2.
\]

This proves that a component-level seven-channel combination is not algebraically impossible.

## 3. The family-matrix obstruction

The preceding numbers suppress the matrices multiplying each representation. Restoring them, the antitriplet cancellation is

\[
aH+bF=0.
\]

For the triplet it is

\[
cH+(d+e)F=0,
\]

with the orientation constraint fixing \(d=e\) in the displayed normalization.

For generic independent symmetric \(3\times3\) matrices \(H\) and \(F\), these matrix equations have only the trivial coefficient solution. A nonzero solution requires

\[
F=\kappa H.
\]

That is five independent alignment conditions in the six-dimensional space of complex symmetric family textures, before phases and scalar-potential constraints are counted. For one family, proportionality is automatic, but the required scalar mixing ratios remain unconstrained parameters rather than a theorem.

The \(120_H\) contribution cannot cancel this symmetric matrix equation. Since

\[
G^T=-G,
\]

an equation of the form

\[
aH+bF+cG=0
\]

splits uniquely into

\[
aH+bF=0,
\qquad cG=0.
\]

Moreover,

\[
G_{AA}=0,
\]

so the \(120_H\) supplies no same-generation Furey link at all. It can add interfamily structure and realistic flavour freedom, but it is not the missing diagonal selector.

## 4. Why the algebraic zero is not symmetry protected

The \(10\), \(120\), and \(126\) are inequivalent irreducible \(Spin(10)\) representations. A symmetry commuting with \(Spin(10)\) cannot exchange them. By Schur's lemma it acts separately on their irreducible sectors; it may forbid one invariant or allow another, but it does not force the nonzero numerical relations

\[
F=\kappa H,
\qquad
v_T=(-2,1,1),
\qquad
v_{\bar T}=(1,-1).
\]

After \(Spin(10)\) breaking, the component fields share Standard-Model quantum numbers and can mix. But their mass matrix is then an additional broken-phase object. A symmetry that fixes its kernel would be a new second-stage selector, not a consequence of having distinct Clebsches.

There is also no full-theory symmetry enhancement at the cancellation point. A unitary rotation of mediator basis preserves the norm of every nonzero source covector. It can place one light state in the kernel of the diquark map, but the orthogonal heavy states retain the omitted vertices. The complete theory has not acquired baryon number merely because one selected eigenstate is safe.

For the triplet columns above, the canonical positive-metric inner products are

\[
\langle QQ,u^ce^c\rangle=2,
\qquad
\langle QQ,d^c\nu^c\rangle=-2.
\]

Thus the danger direction is not orthogonal to the desired source span. Canonical unitary diagonalization cannot split the entire triplet inventory into a purely dangerous block and a purely desired block. A noncanonical metric or specially structured mass inverse can cancel the cross Schur complement, but that is another tuned tensor.

## 5. Radiative stability

Hold the tree-level kernel weights fixed and perturb the allowed relation by

\[
F=(1+\epsilon)H.
\]

The two cancelled sources immediately return:

\[
u^cd^c\propto-\epsilon H,
\qquad
QQ\propto2\epsilon H.
\]

The counterterms producing these shifts are permitted by all the assumed symmetries. The \(10\) and \(\overline{126}\) have different gauge and scalar interactions, so their wave-function, Yukawa and mass-mixing renormalizations are not tied by \(Spin(10)\) after breaking. Order-by-order retuning would be required.

A baryon-number or discrete symmetry acting on the separated source blocks could protect the zero, but then that symmetry—not the Clebsch cancellation—is doing the protection. This is consistent with frontier 02: the \(\mathbb Z_9\) lift is valuable once a source split exists, but it does not derive the split from the complete unified invariant.

Patel and Shukla explicitly find that the \(10_H\), \(\overline{126}_H\), and \(120_H\) inventories contain scalar-mediated proton-decay channels; they also note that several cancellations depend on scalar mixing and masses. Their result is direct phenomenological evidence that representation multiplicity alone is not a nonrenormalization theorem.

## 6. Ordinary Yukawa channels

Both \(10_H\) and \(\overline{126}_H\) contain electroweak doublets, so the four ordinary Dirac channel types can remain nonzero while the displayed coloured combination is selected. The cancellation does not force those four supports to vanish.

However, \(F\propto H\) aligns their symmetric family textures. With only these two tensors it removes much of the flavour freedom normally used to fit masses and mixing. Adding \(120_H\) can restore antisymmetric flavour structure, but it simultaneously enlarges the coloured scalar inventory. A realistic flavour fit therefore does not promote the cancellation into a protected incidence rule.

## 7. Exact decision table

| question | verdict |
|---|---|
| Can \(10\oplus\overline{126}\) cancel both displayed diquark vertices for a selected mediator combination? | yes |
| Can it retain all three Furey links? | yes |
| Can it preserve \(u^ce^c-d^c\nu^c\)? | yes, using both \(\overline{126}\) triplet copies |
| Does the construction retain ordinary Yukawa channel support? | yes |
| Does it work for generic three-family \(H,F\)? | no; it requires \(F\propto H\) |
| Can \(120_H\) cancel the symmetric-family obstruction? | no |
| Does \(120_H\) contribute to same-family links? | no, because \(G_{AA}=0\) |
| Does a basis rotation erase the dangerous vertices from the full inventory? | no |
| Is the cancellation protected by \(Spin(10)\) representation theory alone? | no |
| Is it stable under generic allowed radiative corrections? | no |

## 8. Branch disposition

### Retain as an algebraic engineering template

The kernel vectors \(v_T\) and \(v_{\bar T}\) are useful targets for any independently motivated finite-calculus, boundary, or discrete selector. They show exactly which broken-phase combination such a mechanism would need to stabilize.

### Close as a representation-only naturalness mechanism

Merely adding \(120_H\) or \(\overline{126}_H\) does not protect the seven-channel mask. The cancellation locus is a relation among independent Yukawa and scalar-sector parameters and is radiatively unstable.

### Reopening criterion

The branch reopens only if an explicit enlarged symmetry or finite-geometry rule is supplied which:

1. derives \(F=\kappa H\) or replaces it with a stronger texture theorem;
2. fixes both displayed mediator kernel vectors;
3. block-diagonalizes the complete heavy mass and kinetic operators;
4. remains anomaly-consistent and stable under renormalization;
5. does not delete the four ordinary Yukawas or the three desired Furey links.

Without all five, “Clebsch cancellation” means algebraic tuning, not a derived selector.

## Position in the corpus

- [rank-one exceptional vacuum selector no-go](frontier_parallel_exceptional_01_rank_one_vacuum_selector_no_go.md)
- [\(\mathbb Z_9\) threshold and mask obstruction](frontier_parallel_exceptional_02_z9_threshold_and_seven_nine_mask.md)
- [exact \(Spin(10)\) Clebsch orientation and restored channels](../../../claims/1000-1099/1073_the_spin10_16_16_10_Clebsch_tensor_supplies_the_FCp_relative_minus_but_also_restores_the_third_edge_and_diquark_channels.md)
- [positive-metric mediator-copy obstruction](../../../claims/1000-1099/1074_positive_Spin10_Clebsch_preserving_copies_can_never_remove_the_third_edge_but_a_twisted_two_copy_involution_can.md)
- [proton-safe projector requires broken colour--lepton roots](../../../claims/1000-1099/1076_the_proton_safe_current_projector_exists_only_after_breaking_the_pati_salam_colour_lepton_roots.md)
