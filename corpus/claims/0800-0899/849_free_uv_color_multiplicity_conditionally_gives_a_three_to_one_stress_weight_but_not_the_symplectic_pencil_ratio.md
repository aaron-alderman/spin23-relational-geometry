# Free-UV Color Multiplicity Conditionally Gives a Three-to-One Stress Weight but Not the Symplectic-Pencil Ratio

**Date:** 17 October 2026  
**Branches:** Standard-Model stress response, ultraviolet normalization, full-color carrier, and symplectic sector locking  
**Claim status:** exact conditional free-copy result and exact mapping ambiguity; interacting and typed response calculation remains open  
**Certificate:** [derive_the_conditional_free_uv_singlet_triplet_stress_ratio_and_its_response_map_ambiguity.mjs](../../../verification/derive/derive_the_conditional_free_uv_singlet_triplet_stress_ratio_and_its_response_map_ambiguity.mjs)

## Executive result

The existing stress-energy corpus supplies one conditional candidate ratio.

For one free conformal complex singlet and one otherwise identical free conformal complex color triplet, with equal stress normalization per complex component,

\[
c_s=c_0,
\qquad
c_t=3c_0,
\qquad
\boxed{c_t/c_s=3}.
\]

This is ordinary additivity over the three color components. It is exact under the stated assumptions.

It does **not** yet determine the symplectic-pencil ratio \(b/a\). If pencil coefficients track spectral weights directly, the candidate is \(3\). If they track canonically normalized response amplitudes, the candidate is \(\sqrt3\). The choice depends on the missing typed map from stress correlators to the alternating response form.

Moreover, singlet, triplet and total free-conformal projected stress matrices are all collinear. The multiplicity changes the weight of one Jordan ray; it does not create the missing relationship direction.

## 1. Conditional calculation

Normalize the spin-two stress coefficient of one free complex component to \(c_0\). For otherwise identical decoupled copies, stress two-point functions add. Therefore

\[
\begin{aligned}
c_s&=1\cdot c_0,\\
c_t&=3\cdot c_0.
\end{aligned}
\]

For common projected probes with Gram matrix \(G_2\),

\[
\rho_s(s)=c_0s^2G_2,
\qquad
\rho_t(s)=3c_0s^2G_2,
\qquad
\rho_{\rm total}(s)=4c_0s^2G_2.
\]

Every matrix lies on the same positive ray.

This agrees with document 209: adding free conformal species changes only the total stress central charge, not the normalized projected matrix shape.

## 2. Raw coupling versus normalized response direction

The total metric couples linearly as

\[
h^{\mu\nu}(T^{(s)}_{\mu\nu}+T^{(t)}_{\mu\nu}),
\]

so the raw source coefficient vector is \((1,1)\).

After whitening the two channels by their stress two-point norms, the same total source has direction

\[
(\sqrt{c_s},\sqrt{c_t})
=(1,\sqrt3)
\]

in the conditional normalization.

There are therefore already three distinct objects:

| Object | Conditional ratio |
|---|---:|
| Raw total-stress source coefficients | \(1\) |
| Stress spectral weights \(c_t/c_s\) | \(3\) |
| Canonically whitened amplitudes | \(\sqrt3\) |

Calling any one of these \(b/a\) requires a declared response functor.

## 3. Why this does not yet describe the Standard Model

The conditional comparison assumes identical free conformal species differing only by color multiplicity. The physical Standard Model violates this simplification through:

- different gauge representations and hypercharges;
- weak multiplicities and chirality;
- Higgs and gauge-field contributions;
- masses and thresholds;
- interactions and running couplings;
- improvement and contact terms;
- operator mixing under renormalization.

More decisively, document 632 proved that sector stress tensors are not independently conserved after interactions are restored. Only total stress obeys the universal diffeomorphism Ward identity. A split into \(c_s\) and \(c_t\) is then a scheme- and scale-sensitive composite-operator decomposition unless the response protocol defines it operationally.

## 4. Relation to the five-sector stress branch

Document 624 found a four-simplex of positive Standard-Model sector aggregations. Dimension weighting appears only after assuming equal per-component residues. The present \(1:3\) result is the two-sector version of that same conditional rule:

\[
\text{multiplicity} + \text{equal microscopic residue}
\Longrightarrow
\text{dimension-weighted UV coefficient}.
\]

It is not representation-theoretic selection without the equal-residue assumption.

The result is nevertheless useful as a benchmark. Any proposed stress-to-symplectic map should recover the appropriate multiplicity limit when masses and interactions are removed.

## 5. Revised dependency

The sector-lock chain is now

\[
\text{SM action and normalized metric source}
\to
\rho_{rs}^{TT}(s)
\to
\text{operational singlet/triplet response basis}
\to
(a,b)
\to
J_0.
\]

The first arrow exists for total stress. The conditional free limit constrains the second. The third arrow—the stress-to-symplectic response functor—is missing.

## 6. Stop-everything criteria

**Positive trigger:** derive a response functor for which the interacting spectral matrix has a well-defined ultraviolet limit and sends its normalized eigenline to a unique \(aK_s+bK_t\), then show reduction to \(J_0\).

**Consistency trigger:** in the identical free limit, the functor must reproduce the multiplicity weight \(c_t/c_s=3\).

**Negative trigger:** the singlet/triplet decomposition is not renormalization stable or observable, and only the total one-ray stress response exists. Then stress cannot lock the internal symplectic pencil without additional ports.

**Falsifier of the conditional calculation:** failure of additive stress two-point coefficients for three decoupled identical color copies. This would contradict the assumptions themselves.

## 7. Verdict

| Question | Verdict |
|---|---|
| Does free color multiplicity give a conditional stress ratio? | **yes; \(3:1\)** |
| Does it create another Jordan response direction? | **no; one ray** |
| Does it determine \(b/a\)? | **no** |
| Is the amplitude ratio necessarily \(3\)? | **no; canonical whitening gives \(\sqrt3\)** |
| Is the split separately conserved in the interacting SM? | **no** |
| Is the result useful? | **yes, as a UV consistency benchmark** |

## 8. Position in the corpus

- [common Schur/stress mediator normalization boundary](847_a_common_schur_or_stress_mediator_transmits_but_does_not_select_the_singlet_triplet_symplectic_ratio.md)
- [free conformal stress spectrum is one Jordan ray](../0200-0299/209_free_conformal_field_stress_spectrum_is_one_jordan_ray.md)
- [positive sector aggregations form a simplex](../0600-0699/624_positive_sector_aggregations_form_a_four_simplex_and_do_not_select_one_universal_carrier.md)
- [interaction closure leaves only total stress conserved](../0600-0699/632_interaction_closure_forces_lepton_stress_back_to_the_total_standard_model_tensor.md)
- [stress conservation does not select the topology face kernel](../0600-0699/649_total_stress_conservation_does_not_select_the_topology_face_kernel.md)
- [linear natural stress-to-symplectic functors retain one relative normalization](850_rescaling_naturality_classifies_linear_stress_to_symplectic_maps_but_leaves_one_relative_normalization_free.md)

