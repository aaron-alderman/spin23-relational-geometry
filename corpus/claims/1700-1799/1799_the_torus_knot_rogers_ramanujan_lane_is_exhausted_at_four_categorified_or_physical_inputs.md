# The Torus-Knot Rogers--Ramanujan Lane Is Exhausted at Four Categorified or Physical Inputs

**Date:** 29 October 2026

**Status:** current-input exhaustion checkpoint; theorem, reconstruction and CFT faces separated from open refinements

**Parents:** [1796](1796_the_torus_knot_rogers_ramanujan_theorem_is_a_typed_three_face_arithmetic_programme_not_yet_a_physics_bridge.md), [1797](1797_the_periodic_product_exactly_reconstructs_the_coprime_torus_knot_type_but_not_its_module_category.md), [1798](1798_the_product_has_a_precise_nonunitary_w_algebra_and_yang_lee_bridge_not_a_spin23_or_monster_bridge.md)

## Exhaustion result

The lane no longer contains an unexecuted inference that can promote the
admitted theorem toward Monster physics or Spin(2,3). Every continuation now
requires one of four new inputs:

1. **Categorified refinement:** prove the proposed finite-rank
   Quot/Hilbert/colored-HOMFLY identifications and the perverse third grading.
2. **Extended character family:** prove the full linear-term family
   (N^{(r)}_{a,b}=P^{(r)}_{a,b}), including the Dirac-rhythm/colored-Jones
   endpoint beyond the cases already covered by classical identities.
3. **Operational CFT lift:** measure a complete finite-size character tower in
   a declared Yang--Lee/(mathcal W_a) sector, not only a critical exponent or
   partition-function zero.
4. **Cross-face physical map:** construct preparations, dynamics and detectors
   whose operational equivalence to the finite-module/groupoid face is proved.

None is present in the current sources. More coefficient expansion, looser
analogy to braids or modular groups, or repetition of the Rogers--Ramanujan
identity cannot substitute for them.

## Closed questions

| question | verdict |
|---|---|
| Is the threefold equality proved for every coprime (1<a<b)? | yes, including a stronger finite identity and a public Lean certificate |
| Does (P_{a,b}) remember the torus-knot type? | yes; exact period gives (a+b), maximum gives (a-1) |
| Does it remember the numerical semigroup and gap poset? | yes, through the reconstructed pair |
| Does it reconstruct the module category or Quot geometry? | no; groupoid volume and specialization are non-injective |
| Is there an exact representation-theoretic endpoint? | yes; a normalized nonunitary (mathcal W_a(a,a+b)) character |
| Is there a physical endpoint for ((2,3))? | yes at Yang--Lee universality/experimental-simulation level, not at module-carrier identity level |
| Does the theorem imply (B_3), (Sp(4,\mathbb Z)) or (Spin(2,3))? | no |
| Does it imply Monster Moonshine? | no; it is a comparison control only |
| Is the admitted character already a full partition function? | no; it is one normalized component of a modular character vector |
| Is the colored-Jones/HOMFLY/perverse completion proved by the 2026 theorem? | no |

## Nearby branch that does not reopen the claim

Huang--Jiang--Oblomkov's later work on nodal singularities proves a Hilb--Quot
correspondence for the node and formulates a branchwise HOMFLY conjecture. It
shows that the compiler architecture extends beyond irreducible torus-knot
singularities. It does not prove the torus-knot categorified conjectures above
and therefore does not reopen this lane.

## Stopping rule

Resume only when a source supplies at least one of:

- a proof or formal certificate for one of the categorified refinements;
- full modular/sector data tied to a new operational realization;
- measured character degeneracies with a declared sector and nuisance model;
- an explicit functor or experimentally checkable correspondence between the
  finite-module and CFT carriers;
- a genuine Monster action, genus-two sewing object or Spin(2,3) intertwiner.

Until then, the strongest honest synthesis is:

\[
 \boxed{
 \text{finite modules}
 \xrightarrow{\text{groupoid volume}}
 \text{gap-vector series}
 =\text{periodic product}
 =\text{nonunitary }\mathcal W\text{-character},
 }
\]

with exact recovery of the coprime pair but irreversible loss of category-level
and operational information.

## Sources

- [Huang--Lau--Ono theorem and formal-certificate reference](https://arxiv.org/abs/2609.20567).
- [AxiomMath/HJO Lean repository](https://github.com/AxiomMath/HJO).
- [Huang--Jiang--Oblomkov geometric source and conjectural refinements](https://arxiv.org/abs/2608.16086).
- [Huang--Jiang--Oblomkov nodal continuation](https://arxiv.org/abs/2610.34676).

