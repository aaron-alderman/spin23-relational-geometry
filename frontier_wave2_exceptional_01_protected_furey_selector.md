# Frontier wave 2 exceptional 01: the smallest protected Furey selector needs a new broken-phase metric/incidence datum

**Date:** 18 October 2026  
**Frontier:** protection of the tuned \(10_H\oplus\overline{126}_H\) kernel  
**Status:** exchange and family mechanisms partially succeed; inherited unitary selector obstructed; enriched finite-calculus mechanism remains conditional  
**Certificate:** [test_wave2_exceptional_protected_selector.mjs](scripts/test_wave2_exceptional_protected_selector.mjs)

## Result

The tuned Clebsch kernel from exceptional frontier 03 cannot be protected by an ordinary exchange symmetry, a family algebra, or a represented projection inherited from the canonical \(Spin(10)\) Hilbert metric.

The failure is localized:

- the antitriplet pair admits an exact exchange parity separating \(QL\) from \(u^cd^c\);
- an irreducible real family-triplet algebra can force \(H=hI\) and \(F=fI\), and therefore \(F\propto H\);
- the triplet source geometry prevents a unitary safe/danger separation in the inherited metric;
- the algebraic projector that performs the desired separation is oblique rather than self-adjoint, and adjoint closure restores the dangerous direction.

The smallest still-live completion is therefore not “one more symmetry” on the existing data. It is a broken-phase finite-calculus sector which supplies both:

1. a central safe/danger incidence projector;
2. a compatible positive kinetic/heavy metric in which that projector is self-adjoint.

That completion is mathematically possible, but it is not derived by the current \(Spin(10)\), exceptional, Furey, or represented-calculus data. It must be treated as new structure until an explicit \((\mathcal A_F,\mathcal H_F,D_F,J_F,\gamma_F)\) and junk quotient produce it.

## 1. Starting Clebsch data

In the normalized triplet basis

\[
V_T=(10,\overline{126}_{5},\overline{126}_{50}),
\]

the three source covectors established in frontier 03 are

\[
q_{QQ}=(1,1,1),
\quad
q_{ue}=(2,-2,2),
\quad
q_{d\nu}=(-2,0,0).
\]

In the antitriplet basis

\[
V_{\bar T}=(10,\overline{126}_{\overline{45}}),
\]

they are

\[
q_{ud}=(1,1),
\qquad
q_{QL}=(-1,1).
\]

These are rescaled component Clebsches from the explicit \(10_H\), \(\overline{126}_H\), and \(120_H\) decomposition of [Patel and Shukla](https://arxiv.org/abs/2203.07748), together with the right-pair orientation certified in document 1073. The family symmetry types follow from the multiplicity-free decomposition

\[
16\otimes16=(10\oplus126)_S\oplus120_A,
\]

given explicitly by [Nath and Syed](https://arxiv.org/abs/hep-ph/0103165) and [Grimus and Kühböck](https://arxiv.org/abs/hep-ph/0607197).

## 2. Exchange symmetry: exact on one side, impossible on the other

For the antitriplet pair, the exchange

\[
E=\begin{pmatrix}0&1\\1&0\end{pmatrix}
\]

has

\[
E q_{ud}=+q_{ud},
\qquad
E q_{QL}=-q_{QL}.
\]

Thus a post-breaking \(\mathbb Z_2\) can make the dangerous and desired antitriplet sources opposite parity sectors. This exactly protects the kernel vector \((1,-1)\), provided the two component kinetic normalizations and mass matrix respect the exchange.

But this is not an unbroken \(Spin(10)\) symmetry. It exchanges a component of a \(10\) with a component of a \(\overline{126}\). Since those are inequivalent irreducible representations of different dimensions, no linear symmetry commuting with \(Spin(10)\) can exchange the complete multiplets. The parity is necessarily a broken-phase component rule.

For the triplet sector, the canonical Gram tests give

\[
\langle q_{QQ},q_{ue}\rangle=2,
\qquad
\langle q_{QQ},q_{d\nu}\rangle=-2.
\]

In any unitary finite symmetry, inequivalent character or isotypic sectors are orthogonal. If \(QQ\) is assigned a different charge from the two retained currents, its mediator coupling vector must therefore be orthogonal to both retained coupling vectors. The displayed nonzero inner products rule this out.

This is independent of whether the proposed symmetry is called exchange, cyclic, dihedral, or non-Abelian. With the inherited positive metric, no unitary symmetry can simultaneously:

- retain the complete \(u^ce^c\) and \(d^c\nu^c\) couplings;
- place \(QQ\) in a distinct forbidden sector;
- leave all original Clebsch entries present.

The antitriplet half passes; the triplet half is an exact no-go.

## 3. Family algebra: it solves alignment but not normalization

Let the three generations transform in the defining real irreducible representation of a family \(SO(3)_F\). The certificate solves

\[
[X,L_i]=0,
\qquad i=1,2,3,
\]

for the three rotation generators and finds a one-dimensional commutant. Consequently an invariant symmetric family tensor is scalar:

\[
H=hI_3,
\qquad
F=fI_3.
\]

For nonzero \(h,f\), this enforces the proportionality needed by the algebraic Clebsch witness:

\[
F=\frac fh H.
\]

It also excludes the antisymmetric \(120\) tensor at the exact family-symmetric point.

This is real progress, but it is insufficient. The family algebra does not determine \(f/h\), because \(H\) and \(F\) multiply inequivalent \(Spin(10)\) invariants. Nor does it act on the mediator multiplicity space, so it cannot fix

\[
v_T=(-2,1,1),
\qquad
v_{\bar T}=(1,-1).
\]

Breaking \(SO(3)_F\) to obtain observed masses and mixing also reopens the alignment question. A flavon completion could correlate the two tensors, but its contractions and vacuum would be new data requiring their own stability audit.

## 4. The represented-one-form attempt

Algebraically, the triplet space has a direct-sum decomposition

\[
V_T=V_{\rm safe}\oplus V_{\rm danger},
\]

where

\[
V_{\rm safe}=\ker q_{QQ}
=\operatorname{span}\{(1,-1,0),(1,0,-1)\},
\]

and

\[
V_{\rm danger}
=\ker q_{ue}\cap\ker q_{d\nu}
=\operatorname{span}\{(0,1,1)\}.
\]

The unique projector onto \(V_{\rm safe}\) along \(V_{\rm danger}\) is

\[
P_{\rm obl}=
\begin{pmatrix}
1&0&0\\
-\tfrac12&\tfrac12&-\tfrac12\\
-\tfrac12&-\tfrac12&\tfrac12
\end{pmatrix}.
\]

It satisfies

\[
P_{\rm obl}^2=P_{\rm obl},
\qquad
q_{QQ}P_{\rm obl}=0,
\]

so as plain linear algebra it is exactly the desired incidence selector.

But

\[
P_{\rm obl}^\dagger\ne P_{\rm obl}.
\]

Its maximal self-adjointness defect in the canonical basis is \(1/2\). More decisively,

\[
q_{QQ}P_{\rm obl}^\dagger
=(1,-\tfrac12,-\tfrac12)\ne0.
\]

A projection in a represented finite \(*\)-algebra must be self-adjoint. A non-self-adjoint one-form may occur as one orientation of an arrow, but the physical real/self-adjoint fluctuation includes its adjoint. Here that closure restores the dangerous source.

This is the exceptional analogue of the earlier Möbius-calculus lesson: a useful directed arrow is not yet a physical selector unless it survives adjoint/reality closure and the junk quotient.

## 5. The smallest mathematical repair

Any direct-sum decomposition can be made orthogonal by changing the positive metric. Let

\[
B=\bigl[(1,-1,0),(1,0,-1),(0,1,1)\bigr]
\]

and define

\[
G=(B^{-1})^\dagger B^{-1}.
\]

Then \(G\) is positive definite and

\[
GP_{\rm obl}=P_{\rm obl}^\dagger G.
\]

So the oblique selector becomes an orthogonal projection in the \(G\)-inner product. This proves that the protected mechanism is mathematically possible.

It also identifies the exact missing datum. The inherited \(Spin(10)\) kinetic form is block diagonal between inequivalent irreps and gives one common normalization to the two \(\overline{126}\) components before breaking. The adapted \(G\) contains broken-phase cross-representation kinetic information. It is not supplied by the Clebsch tensors, the rank-one exceptional vacuum, the \(\mathbb Z_9\) lift, or the family commutant.

The minimal live finite-calculus proposal is therefore:

\[
\boxed{
SO(3)_F\text{ scalar family commutant}
+(\mathbb C_{\rm safe}\oplus\mathbb C_{\rm danger})
\text{ represented with the adapted }G.
}
\]

Its central idempotents would protect all orders of the heavy inverse propagator if and only if:

1. they are represented as \(G\)-self-adjoint projections;
2. \(D_F\), \(J_F\), and \(\gamma_F\) preserve the safe/danger block structure;
3. the first-order condition does not identify the two central characters;
4. the junk quotient retains the safe arrows and kills the two dangerous arrows;
5. every heavy scalar threshold respects the same central decomposition.

No existing finite-triple data in the corpus determine these five facts. The construction is a precise specification for a new model, not yet a derivation.

## 6. Orthogonal heavy states

A unitary basis rotation cannot make a nonzero source covector vanish on the whole mediator space; it preserves its norm. Therefore selecting one safe mass eigenstate is never enough. The remaining states must be assigned to a genuinely separate central block, and that block must not couple simultaneously to desired and dangerous currents.

The canonical triplet Gram obstruction shows that the existing complete Clebsch inventory does not have this property. The adapted metric/incidence algebra changes the physical orthogonality relation so that it can. Without that added datum, orthogonal heavy states regenerate threshold operators even if the light eigenstate sits exactly on \(v_T\).

The \(\mathbb Z_9\) result from frontier 02 can then be reused only after the split exists: it can label the safe and danger blocks with different charges and forbid their mixing. It cannot manufacture the noncanonical split from the original \(Spin(10)\) metric.

## 7. Radiative protection contract

If the two central projectors are exact symmetries of the complete action, counterterms are block diagonal and the kernel is technically natural. If they are imposed only on the tree-level mass matrix, all gauge-allowed off-block kinetic and mass terms return.

Thus a valid protection proof must establish a Ward identity for the full quadratic and cubic action, not merely display the tree-level vectors \(v_T\) and \(v_{\bar T}\).

The family algebra separately needs a protection statement for its breaking sector. Once flavon expectation values make \(H\) and \(F\) non-scalar, the relation \(F\propto H\) must either remain an exact common-spurion identity or the diquark kernel is radiatively reopened.

## 8. Decision table

| candidate | exact result | disposition |
|---|---|---|
| antitriplet \(10\leftrightarrow\overline{126}\) exchange | safe/danger covectors are orthogonal parity eigenvectors | viable only after \(Spin(10)\) breaking |
| triplet exchange or charge symmetry | nonzero danger--safe Gram overlaps | exact no-go in canonical metric |
| irreducible \(SO(3)_F\) family algebra | forces \(H=hI\), \(F=fI\) | solves proportionality but not \(f/h\) or mediator mixing |
| canonical represented \(*\)-projection | desired algebraic idempotent is not self-adjoint | no-go |
| directed one-form without adjoint | kills \(QQ\) | unphysical alone; adjoint restores danger |
| adapted-metric central projector | mathematically consistent | live but new, underived structure |
| light safe eigenstate alone | orthogonal heavy states retain sources | insufficient |

## 9. Stop and reopening criteria

**Exchange stop:** do not describe the antitriplet component exchange as a symmetry of complete \(Spin(10)\) multiplets.

**Family stop:** do not infer a fixed nonzero \(F/H\) ratio from the one-dimensional family commutant. It fixes texture shape, not coupling normalization.

**One-form stop:** do not use \(P_{\rm obl}\) as a represented algebra projection in the canonical Hilbert metric; it is not self-adjoint, and adjoint closure restores \(QQ\).

**Threshold stop:** do not call one safe light eigenstate a full seven-channel theory while orthogonal heavy states remain unaudited.

**Positive reopening trigger:** construct an explicit finite spectral datum whose represented central idempotent equals the safe projector in its physical positive metric and verify reality, grading, first-order, junk, and full heavy-threshold closure.

**Negative trigger:** prove that every admissible finite Hilbert metric remains block diagonal on the \(10\oplus\overline{126}\) multiplicity space. Then even the adapted-metric route closes.

## Position in the corpus

- [exceptional rank-one selector no-go](frontier_parallel_exceptional_01_rank_one_vacuum_selector_no_go.md)
- [\(\mathbb Z_9\) is a block selector, not a vertex selector](frontier_parallel_exceptional_02_z9_threshold_and_seven_nine_mask.md)
- [tuned distinct-Clebsch kernel](frontier_parallel_exceptional_03_distinct_clebsch_selector.md)
- [full \(Spin(10)\) Clebsch channel restoration](1073_the_spin10_16_16_10_Clebsch_tensor_supplies_the_FCp_relative_minus_but_also_restores_the_third_edge_and_diquark_channels.md)
- [proton-safe projector requires broken colour--lepton roots](1076_the_proton_safe_current_projector_exists_only_after_breaking_the_pati_salam_colour_lepton_roots.md)
- [represented-calculus topology stop](frontier_parallel_topology_05_mixed_dga_and_superconnection_stop.md)
