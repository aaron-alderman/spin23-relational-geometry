# No Unbroken Internal Gauge Transformation Can Supply the Missing Sign on Completed Lepton and Color Dirac Responses

**Date:** 17 October 2026  
**Branches:** gauge covariance, Dirac/Yukawa responses, color contraction, weak center, and the missing $A_2$ local coefficient  
**Claim status:** exact representation-theoretic no-go for ordinary internal gauge actions; spurionic, boundary and nonminimal-mediator routes remain open  
**Certificate:** [prove_no_unbroken_internal_gauge_action_induces_the_lepton_color_response_sign.mjs](../../../verification/prove/prove_no_unbroken_internal_gauge_action_induces_the_lepton_color_response_sign.mjs)

**Subsequent resolution:** document 902 finds the missing sign as $h\chi$, the product of two established response gradings. This confirms rather than contradicts the no-go below: $h\chi$ is a composite response/local-coefficient operation, not an unbroken one-body gauge transformation.

## Executive result

The missing response sign

\[
D=\operatorname{diag}(1,-1)
\]

cannot be induced by an ordinary unbroken Standard-Model or Pati–Salam gauge transformation once the lepton and quark bilinears are completed to gauge-invariant Dirac/Yukawa responses.

For a representation $R$ and its dual $R^*$,

\[
v\mapsto Uv,
\qquad
w\mapsto U^{-T}w.
\]

Their invariant contraction obeys

\[
(U^{-T}w)^T(Uv)=w^Tv.
\]

The color-contracted quark response is therefore fixed by every $SU(3)_c$ transformation and its center. The lepton response is fixed trivially.

Every additive $U(1)$ gauge charge also cancels between dual partners. This includes electric charge and $B-L$ on a completed Dirac response.

Before electroweak symmetry breaking, the fermion bilinear alone is a weak-doublet component. Its gauge-invariant Yukawa completion contains the Higgs doublet, whose weak-center sign cancels the fermion-doublet sign. Therefore the fully typed operator is fixed by the weak center as well.

Hence the induced action on the completed two-response space is

\[
I_2,
\]

not $D$.

The missing sign is not an undiscovered element of the ordinary internal gauge group. It must be spurionic, topological/boundary, emergent at composite level, or arise from interference between inequivalent mediator channels.

## 1. Color contraction

Let

\[
q\in\mathbf3,
\qquad
q^c\in\bar{\mathbf3}.
\]

The Dirac color contraction is

\[
B_q=(q^c)^Tq.
\]

For every $U\in SU(3)$,

\[
B_q\mapsto
(U^{-T}q^c)^T(Uq)
=(q^c)^TU^{-1}Uq
=B_q.
\]

This remains true for the center and for the color Weyl group represented consistently on the triplet and dual triplet. A color operation can permute or phase the microscopic components, but it cannot multiply the completed scalar contraction by $-1$ while leaving the lepton scalar fixed.

An oriented determinant or augmentation mode may transform nontrivially before contraction. Once it is contracted to the ordinary color singlet, that nontrivial character is lost unless an explicit local coefficient is retained as extra boundary data.

## 2. Abelian charges

If a field has charge $Q$, its dual partner has charge $-Q$. Consequently

\[
f^cf\mapsto
e^{-iQ\alpha}e^{iQ\alpha}f^cf
=f^cf.
\]

No element of $U(1)_{\rm em}$ or $U(1)_{B-L}$ distinguishes the completed lepton and quark Dirac contractions by a sign.

Discrete subgroups inherited from those additive charges do not help: the cancellation occurs before restricting the phase to a root of unity.

## 3. Weak completion

The bare left/right fermion bilinear is not an $SU(2)_L$ scalar. A typed Yukawa response is schematically

\[
f^c(H^\dagger F_L)
\quad\text{or}\quad
f^c(\widetilde H^\dagger F_L).
\]

Under the weak center, both $F_L$ and the Higgs doublet change sign, while $f^c$ is a singlet. Their product is invariant:

\[
(+1)(-1)(-1)=+1.
\]

Document 900 considered the undressed fermion bilinear and found the common sign $-1$. Higgs completion removes even that overall sign. In neither description does weak parity become a relative lepton/color sign.

## 4. Relation to the conditional Coxeter construction

Documents 898–900 isolate the desired operation:

\[
(B_\ell,B_q)\mapsto(B_\ell,-B_q).
\]

The present theorem shows that no unbroken one-body gauge action descends to this map on completed responses.

This is consistent with earlier Schur-typing results: after both operators are gauge singlets, their relative transformations belong to an emergent response symmetry or to external sewing data, not to the microscopic color group.

## 5. Surviving routes

### A. Retained local coefficient

A color augmentation or orientation line could survive contraction as an additional label. Then the response is not merely the ordinary scalar $B_q$; it is a scalar tensored with a boundary sign line. This must be demonstrated by the response functor.

### B. Spurionic vacuum comparison

A transformation may relate two different Higgs or GUT vacua rather than fix one vacuum. It can then act nontrivially on response coefficients while remaining a covariance of the family of theories.

### C. Nonminimal mediator interference

Two inequivalent $Spin(10)$ mediator representations may couple to different lepton/color directions. Their relative phase can act as $D$ without pretending it is a gauge transformation.

### D. Boundary or Floquet holonomy

A transport operation on the composite response bundle may distinguish the two channels after gauge reduction. This is the natural setting for the previously identified pulse and monodromy language.

## 6. Stop-everything and falsification criteria

**Local-system trigger:** a fully typed contraction retains a one-dimensional color orientation line on which a boundary involution acts by $-1$.

**Mediator trigger:** two explicit irreducible Yukawa channels yield projectively distinct coupling vectors and their normalized reflections reproduce the active $A_2$ block.

**Holonomy trigger:** a gauge-invariant loop in source/vacuum space has monodromy $D$ on the two completed responses.

**Falsifier:** an ordinary gauge transformation acts contragrediently on a representation and its dual yet changes their invariant contraction, or the Higgs-completed weak scalar retains a weak-center sign. Both contradict the defining invariance equations.

## 7. Verdict

| Candidate source of $D$ | Verdict |
|---|---|
| $SU(3)_c$ transformation or center | **no; color contraction is invariant** |
| $U(1)_{\rm em}$ or $B-L$ | **no; dual charges cancel** |
| weak center on bare fermion bilinears | **common $-I_2$, not $D$** |
| weak center on Higgs-completed responses | **identity** |
| ordinary unbroken internal gauge group | **cannot supply $D$** |
| retained local coefficient / boundary / nonminimal mediator | **still open** |

## 8. Position in the corpus

- [weak-center response-sign no-go](900_the_weak_center_incidence_twist_acts_as_overall_minus_on_every_dirac_response_and_cannot_supply_the_missing_lepton_color_sign.md)
- [explicit minimal vector Clebsch map](../0800-0899/899_the_explicit_spin10_16_16_10_clebsch_map_gives_only_an_overall_weak_sign_so_the_minimal_paired_mediator_c3_route_closes_negatively.md)
- [conditional $A_2$ reflection construction](../0800-0899/898_color_multiplicity_and_an_oriented_weak_sign_turn_the_paired_so10_mediator_reflections_into_the_exact_a2_coxeter_generator.md)
- [gauge/color cannot directly act as the response handle](../0800-0899/846_the_neutral_furey_exchange_cannot_lock_the_singlet_and_triplet_symplectic_scales.md)
