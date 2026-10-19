# The Spectral Pati–Salam Algebra Does Not Supply the Family Anchor by Itself, but Its Non-First-Order Quadratic Fluctuation Is the Natural Charge-Six Completion

**Date:** 18 October 2026  
**Branches:** sourced spectral Pati–Salam audit, generation multiplicity, first-order fork, family anchor, quadratic inner fluctuations, charge-six Majorana completion  
**Claim status:** primary-source-backed structural boundary plus exact charge/commutant arithmetic; no claim that the quadratic term has the required nonzero coefficient  
**Certificate:** [prove_the_Pati_Salam_generation_commutant_and_charge_six_quadratic_candidate.mjs](scripts/prove_the_Pati_Salam_generation_commutant_and_charge_six_quadratic_candidate.mjs)  
**Primary source:** [Chamseddine–Connes–van Suijlekom, arXiv:1304.8050](https://arxiv.org/abs/1304.8050)

## Executive result

> **Correction from document 1105.** The exact generalized-fluctuation
> formula is \(A_{(2)}=\sum_r\widehat a_r[A_{(1)},\widehat b_r]\).
> It is a first-order-defect dressing, not the operator square
> \(A_{(1)}^2\). In particular, the horizontal charge-three family edge has
> \(A_{(2)}=0\). The charge-six observation below remains a target for an
> explicitly exhibited non-first-order Majorana block, not a consequence of
> two copies of the first-order family arrow. See
> [document 1105](1105_the_generalized_quadratic_inner_fluctuation_is_a_first_order_defect_dressing_not_the_square_of_the_charge_three_family_edge.md).

The actual spectral Pati–Salam construction does not presently provide the
family anchor and spectator required by documents 1102--1103.

Its finite algebra is

\[
\boxed{
\mathcal A_{\rm PS}
=\mathbb H_R\oplus\mathbb H_L\oplus M_4(\mathbb C),
}
\]

and the fermions of one generation transform through the weak index
\(\alpha\) and colour--lepton index \(I\). Three generations enter through
the Yukawa and Majorana matrices, not through three additional algebra
summands. Consequently the represented Pati–Salam algebra still acts as

\[
\pi_{\rm PS}(a)\otimes I_3
\]

on generation space and commutes with \(U(3)_F\).

The same primary source makes a second distinction decisive:

- imposing first order together with the right-neutrino Majorana block
  restricts the algebra to
  \(\mathbb C\oplus\mathbb H\oplus M_3(\mathbb C)\);
- retaining the larger Pati–Salam algebra requires generalized inner
  fluctuations with a quadratic term \(A_{(2)}\).

Therefore the first-order family-arrow model cannot simply be declared an
existing subdiagram of the full spectral Pati–Salam theory.

But the non-first-order fork offers a precise constructive possibility. If a
linear fluctuation supplies the charge-three field \(S\), its quadratic
fluctuation sector naturally contains charge

\[
q(S^2)=2q(S)=\pm6,
\]

exactly the charge needed for the exceptional Majorana diagonal.

This is a strong mechanism candidate, not yet a derivation: the actual
\(A_{(2)}\) tensor support and coefficient must be computed in the
family-extended representation.

## 1. What the primary construction actually contains

The 2013 construction starts from the KO-6 finite geometry and obtains, after
the symplectic and grading restrictions,

\[
\mathbb H_R\oplus\mathbb H_L\oplus M_4(\mathbb C).
\]

The finite fermion index is

\[
A=\alpha I,
\]

where:

- \(\alpha\) is acted on by the quaternionic weak algebra;
- \(I\) is acted on by \(M_4(\mathbb C)\);
- grading splits the weak index into right and left quaternionic pieces;
- breaking \(M_4(\mathbb C)\) separates the lepton direction from the three
  colour directions.

This explains weak chirality and colour--lepton unification. It does not
introduce an algebra index for \(e,\mu,\tau\).

The paper explicitly treats

\[
k^\nu,\ k^e,\ k^u,\ k^d,\ k^{\nu_R}
\]

as \(3\times3\) matrices in generation space. They are finite-Dirac
coefficients. The algebra representation remains generation blind.

## 2. Why existing Pati–Salam summands do not solve family selection

Tensoring one generation by \(F\cong\mathbb C^3\) gives

\[
\mathcal H_{\rm one}\otimes F,
\qquad
\pi(a)=\pi_{\rm one}(a)\otimes I_F.
\]

For every \(U\in U(3)_F\),

\[
[\pi(a),I\otimes U]=0.
\]

Hence neither \(\mathbb H_R\), \(\mathbb H_L\) nor \(M_4(\mathbb C)\) acts as
the family projector \(P_\alpha\). Their internal labels can potentially
serve as the opposite-algebra anchor \(s\) **after** a family algebra is
adjoined, but they do not create that family algebra or choose \(\alpha\).

The earlier “existing-anchor” branch must therefore be stated conditionally:

\[
\boxed{
\text{existing internal summand}
\;+\;
\text{new family split}
\quad\text{may supply the anchored bimodule}.
}
\]

The existing summand alone does not.

## 3. The first-order fork

The primary construction states that a nonzero primed/unprimed
right-neutrino Majorana mixing satisfies first order only after restricting
the large algebra to

\[
\mathcal A_{\rm SM}
=\mathbb C\oplus\mathbb H\oplus M_3(\mathbb C).
\]

The larger Pati–Salam model is obtained by relaxing first order. Its inner
fluctuation contains:

\[
D_A
=D+A_{(1)}+\widetilde A_{(1)}+A_{(2)},
\]

where \(A_{(2)}\) is quadratic in the linear fluctuation data.

This splits the family-extension programme into two mathematically different
branches:

1. **strict first-order branch:** work after reduction toward the
   Standard-Model algebra and use the horizontal/vertical Krajewski pair;
2. **full Pati–Salam branch:** abandon the claim that the scalar calculus is
   exhausted by ordinary one-forms and compute the generalized quadratic
   fluctuation explicitly.

The two branches must not be mixed in one proof.

## 4. The charge-six opportunity

The minimal flavor texture requires:

- one charge-three insertion for exceptional/pair Dirac cross-blocks;
- two charge-three insertions for the exceptional Majorana diagonal.

If the generalized linear fluctuation contains

\[
S_{-3},
\]

then its quadratic products include a sector of charge

\[
S_{-3}^2:\qquad q=-6.
\]

This is exactly what is needed to neutralize the exceptional
\(\nu^c_\alpha\nu^c_\alpha\) bilinear of charge \(+6\).

Likewise,

\[
S_{+3}^2
\]

supplies the conjugate charge \(+6\), as required by reality.

The non-first-order fluctuation therefore mirrors the Froggatt--Nielsen
insertion hierarchy:

\[
\boxed{
A_{(1)}\sim S_{\pm3},
\qquad
A_{(2)}\sim S_{\pm3}^2.
}
\]

This is the most direct structural convergence yet between the spectral
Pati–Salam fluctuation law and the minimal family texture.

## 5. Why this is not yet a derivation

Charge addition alone does not prove that the quadratic term contains the
correct matrix element. One must show:

1. the family-extended representation admits \(S_{\pm3}\) in the linear
   fluctuation;
2. the semigroup normalization does not cancel its square;
3. the \(A_{(2)}\) tensor indices land on the exceptional Majorana block;
4. the resulting field is a Standard-Model singlet;
5. junk or algebraic relations do not remove it;
6. its coefficient is nonzero and has the correct reality property;
7. the potential permits the desired VEV while preserving baryon triality.

Until this calculation is done, \(A_{(2)}\sim S^2\) is a typed target, not a
result of the source model.

## 6. Consequence for the anchor/spectator search

The actual Pati–Salam representation provides rich non-family bimodule labels:
right weak, left weak and colour--lepton indices. These may be usable as
anchor and spectator labels in the sense of the toy diagrams.

However, because the simple summands are quaternionic and matrix-valued, the
physical intersection form cannot be inferred by replacing them with four
complex points. The full minimal projections, multiplicities and real
structure must be used.

Accordingly:

- document 1103 remains an exact warning about odd complex toy models;
- its determinant-one repair is not yet the Pati–Salam intersection form;
- the next physical calculation must use the published tensor-index
  representation rather than only its center.

## 7. Stop-everything and falsification criteria

**Generation stop:** do not identify Pati–Salam weak or colour indices with
family indices; the published algebra acts trivially on generation.

**First-order stop:** do not use an ordinary first-order one-form proof while
simultaneously claiming the unrestricted spectral Pati–Salam scalar sector.

**Center stop:** do not replace quaternionic and matrix summands by complex
points when computing the physical intersection form.

**Quadratic stop:** matching charge \(\pm6\) is necessary but not sufficient;
the actual \(A_{(2)}\) component and coefficient must be exhibited.

**Positive trigger:** an explicit family-extended generalized fluctuation
contains \(S_{\pm3}\) in \(A_{(1)}\), \(S_{\pm3}^2\) in the exceptional
Majorana component of \(A_{(2)}\), and passes the complete gauge/reality
audit.

## 8. Verdict

The sourced Pati–Salam geometry closes one tempting shortcut:

\[
\boxed{
\mathcal A_{\rm PS}
\text{ does not itself distinguish }e,\mu,\tau.
}
\]

It also opens a better-matched nonlinear branch:

\[
\boxed{
\text{linear charge-three fluctuation}
\longrightarrow
\text{quadratic charge-six completion}.
}
\]

The programme should now pursue the strict first-order and generalized
non-first-order branches separately. The former tests a Standard-Model-level
family extension; the latter tests whether the characteristic quadratic
Pati–Salam fluctuation supplies the exceptional Majorana entry automatically.

## Position in the corpus

- [Poincaré-duality and connectedness audit](1103_the_orientable_three_character_family_model_fails_Poincare_duality_while_a_fourth_spectator_repairs_the_intersection_form_but_not_Dirac_connectedness.md)
- [KO-6 anchor repair](1102_the_minimal_two_point_KO6_family_quartet_fails_orientability_but_one_anchor_character_gives_an_explicit_real_even_first_order_completion.md)
- [minimal two-point family algebra](1100_the_minimal_two_point_family_algebra_produces_the_A2_vertex_by_unimodularity_and_a_charge_three_one_form_but_its_full_NCG_embedding_remains_open.md)
- [spectral Pati–Salam Model C source audit](1079_NCG_Pati_Salam_Model_C_realizes_the_safe_source_split_but_its_minimal_left_right_pair_still_closes_the_Wilson_triangle.md)
- [quadratic-fluctuation support correction](1105_the_generalized_quadratic_inner_fluctuation_is_a_first_order_defect_dressing_not_the_square_of_the_charge_three_family_edge.md)
- [Pati–Salam character obstruction and null-mask branch split](1122_the_unreduced_Pati_Salam_algebra_has_no_character_for_S_so_the_null_mask_splits_into_reduced_first_order_and_generalized_branches.md)
