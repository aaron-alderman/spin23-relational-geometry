# SU(4) Breaking to SU(3) × B−L Reopens the Two-Scale Pencil Unless a Transitive Discrete Response Symmetry Survives

**Date:** 17 October 2026  
**Branches:** Pati–Salam breaking, symplectic matching, radiative stability, and discrete response symmetry  
**Claim status:** exact residual-invariant classification; threshold matching and emergent discrete protection remain open  
**Certificate:** [classify_protection_of_the_equal_symplectic_line_after_su4_breaking_to_su3_times_u1.mjs](scripts/classify_protection_of_the_equal_symplectic_line_after_su4_breaking_to_su3_times_u1.mjs)

## Executive result

Pati–Salam \(SU(4)\) selects the equal-component symplectic line

\[
K_s+K_t
\]

at the unification-symmetric level. Ordinary breaking to

\[
SU(3)_c\times U(1)_{B-L}
\]

does not protect that equality.

The residual invariant alternating space is again two-dimensional:

\[
\boxed{
\left(\Lambda^2V^*\right)^{SU(3)\times U(1)_{B-L}}
=
\mathbb RK_s\oplus\mathbb RK_t.
}
\]

In particular, the splitting direction

\[
K_s-K_t
\]

is allowed by the residual symmetry. Independent renormalization of the two coefficients is therefore permitted after symmetry breaking.

An additional discrete transformation exchanging the lepton coordinate with one color coordinate, together with color transitivity, would force \(a=b\). But it does not preserve the distinguished \(B-L\) generator. It cannot be an unbroken symmetry of the ordinary low-energy gauge typing.

## 1. Residual invariant calculation

The certificate works on the same eight-real carrier as document 852. It retains:

- compact \(SU(3)\) Cartan and root generators acting on the three color coordinates;
- the compact \(B-L\) generator proportional to
  \[
  \operatorname{diag}(-3,1,1,1)
  \]
  in an integer normalization.

Solving the complete alternating invariance equations gives dimension two. Both \(K_s\) and \(K_t\) remain separately invariant because phase rotation on a complex plane preserves its area form.

Thus \(B-L\) distinguishes the sectors but does not relate their symplectic normalizations.

## 2. High-scale matching versus low-scale protection

The \(SU(4)\) theorem supplies a boundary condition

\[
a(\Lambda_{PS})=b(\Lambda_{PS})
\]

at a Pati–Salam matching scale.

Below that scale, the residual symmetry permits

\[
a(\mu)\ne b(\mu).
\]

Thresholds from broken leptoquark gauge bosons, unequal matter masses, Yukawa couplings and distinct anomalous dimensions can split the coefficients. Equality at low energy therefore requires one of:

- an exact surviving discrete response symmetry;
- equal anomalous dimensions and threshold corrections by a further mechanism;
- an infrared fixed relation;
- a topological or quantized normalization immune to ordinary running;
- a measurement performed at or above the restoration scale.

Without one of these, \(SU(4)\) selects a UV matching condition, not the infrared \(Spin(2,3)\) pole.

## 3. Discrete transitivity test

Let \(P\) exchange the lepton complex coordinate with one chosen color coordinate. Requiring invariance under \(P\), together with \(SU(3)\) which permutes/rotates all colors, forces equal coefficients on all four component planes:

\[
a=b.
\]

However,

\[
P(B-L)P^{-1}\ne B-L.
\]

The operation moves the distinguished lepton charge into a color slot. Consequently a transitive four-coordinate permutation cannot coexist as an ordinary unbroken internal symmetry with fixed low-energy \(B-L\) typing.

It could still survive as:

- a duality acting also on the symmetry-breaking background;
- a spurionic covariance relating different vacua;
- an emergent symmetry of normalized gauge-singlet responses;
- a boundary sewing operation rather than a local gauge symmetry.

## 4. Consequence for the programme

The Pati–Salam branch now has a precise three-stage status:

\[
\begin{array}{ccl}
SU(4)\text{ exact} &:& a=b\text{ is protected},\\
SU(4)\to SU(3)\times U(1) &:& a=b\text{ is matching data},\\
\text{low-energy SM} &:& a-b\text{ is symmetry-allowed and must be calculated}.
\end{array}
\]

This converts “Pati–Salam might explain equality” into a renormalization and threshold question with a clear falsifier.

## 5. Stop-everything criteria

**Positive trigger:** calculate the breaking thresholds and renormalization group flow and find that \(a=b\) remains exact or flows to a protected infrared relation which reduces to \(J_0\).

**Spurionic trigger:** construct a discrete transformation of both fields and the \(SU(4)\)-breaking order parameter that preserves the full action and forces equal response coefficients in the chosen vacuum orbit.

**Negative trigger:** generic allowed threshold corrections produce \(a-b\ne0\) and no residual duality relates them. Then Pati–Salam supplies only a UV initial condition.

**Falsifier:** residual \(SU(3)\times U(1)_{B-L}\) invariance by itself excluding \(K_s-K_t\). The exact invariant-space calculation shows that it does not.

## 6. Verdict

| Question | Verdict |
|---|---|
| Does exact \(SU(4)\) protect \(a=b\)? | **yes** |
| Does \(SU(3)\times U(1)_{B-L}\) protect it? | **no** |
| Is \(K_s-K_t\) residual-symmetry allowed? | **yes** |
| Can a transitive discrete coordinate symmetry force equality? | **yes** |
| Can it preserve fixed low-energy \(B-L\) simultaneously? | **no** |
| What remains? | **threshold/RG calculation or spurionic response duality** |

## 7. Position in the corpus

- [exact conditional SU(4) equal-component lock](852_pati_salam_su4_collapses_the_full_color_symplectic_pencil_to_the_equal_component_line_but_is_not_a_furey_tro_symmetry.md)
- [left–right symmetry and Pati–Salam boundary](768_left_right_symmetry_is_the_minimal_gauge_envelope_of_the_furey_handle_exchange_but_equal_area_requires_an_invariant_response_phase.md)
- [linear natural functors retain a relative normalization](850_rescaling_naturality_classifies_linear_stress_to_symplectic_maps_but_leaves_one_relative_normalization_free.md)
- [exact RG and threshold row-sum protection conditions](854_the_pati_salam_equal_line_is_rg_invariant_exactly_when_beta_and_threshold_row_sums_match.md)

