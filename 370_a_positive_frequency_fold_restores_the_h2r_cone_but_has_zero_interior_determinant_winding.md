# A Positive Frequency Fold Restores the \(H_2(\mathbb R)\) Cone but Has Zero Interior Determinant Winding

**Date:** 17 October 2026  
**Branches:** B01, B02, B04, B05, B06, B08, B09 and B11  
**Claim status:** exact fold, Herglotz invertibility and zero-winding theorem; boundary singularities and additional periodic coordinates remain open

## 1. A safe fold

Let \(A(\omega)\succeq0\) be a positive-frequency Nambu spectral density and let

\[
\Theta(A)=\sigma_x\overline A\,\sigma_x.
\]

Define the normalized fold

\[
\boxed{
\rho_{\rm f}(\omega)
=\frac12\bigl(A(\omega)+\Theta A(\omega)\bigr),
\qquad \omega>0.}
\]

Both terms are positive, so \(\rho_{\rm f}\succeq0\). It is pointwise
exchange-fixed and consequently has the form

\[
\rho_{\rm f}=
\begin{pmatrix}p&z\\\bar z&p\end{pmatrix},
\qquad p\geq|z|.
\]

The factor \(1/2\) preserves the averaged zeroth spectral moment. Other
normalizations are possible, but they change ultraviolet coefficients and must
be stated rather than hidden.

## 2. Folded retarded response

Define

\[
F(\zeta)=
\int_0^\infty
\frac{\rho_{\rm f}(\omega)}{\omega-\zeta}\,d\omega,
\qquad \operatorname{Im}\zeta>0.
\]

Then

\[
\operatorname{Im}F(\zeta)
=\int_0^\infty
\frac{\operatorname{Im}\zeta}
{(\omega-\operatorname{Re}\zeta)^2+(\operatorname{Im}\zeta)^2}
\rho_{\rm f}(\omega)\,d\omega
\succeq0.
\]

If the integrated spectral measure is positive in every face direction, the
inequality is strict:

\[
\operatorname{Im}F(\zeta)\succ0.
\]

The fold therefore restores the full exchange-real causal cone without
violating passivity.

## 3. Strict passivity forbids interior zeros

Suppose \(F(\zeta)v=0\) for nonzero \(v\). Then

\[
v^\dagger\operatorname{Im}F(\zeta)v=0,
\]

contradicting strict positivity. Hence

\[
\boxed{\det F(\zeta)\neq0
\quad\text{for }\operatorname{Im}\zeta>0.}
\]

The same statement applies to any finite positive matrix Herglotz response with
full directional spectral support.

## 4. The determinant winding theorem

The upper half-plane is simply connected. A closed contour lying wholly inside
it is contractible. Because \(\det F\) is analytic and nonzero throughout the
contraction,

\[
\boxed{
\frac{1}{2\pi i}\oint_\gamma d\log\det F=0.}
\]

Thus a strictly passive folded response cannot realize the nonzero selector
determinant winding on an interior frequency loop.

This is a topological obstruction, not a failure of the chosen two-pole
example.

## 5. Where apparent frequency winding can occur

Nonzero phase accumulation can occur when a contour:

- runs on the real boundary through or around spectral poles;
- encloses a zero or pole after analytic continuation outside the passive
  domain;
- surrounds a branch cut;
- uses a compactified real-frequency line whose point at infinity contributes;
- includes an independent periodic momentum, defect angle or pump parameter.

In every case the relevant singularity, boundary prescription or extra
coordinate must be included in the invariant. Phase jumps at response poles are
not a gapped bulk winding.

## 6. Two-pole certificate model

The executable model uses two positive folded residues at distinct positive
masses. It verifies:

\[
\operatorname{Im}F(\zeta)\succ0,\qquad
\det F(\zeta)\neq0
\]

throughout sampled upper-half-plane points and obtains zero determinant winding
on a closed contour with \(\operatorname{Im}\zeta\geq1\).

At large \(|\zeta|\),

\[
F(\zeta)
=-\frac{M_0}{\zeta}
+O(\zeta^{-2}),
\qquad
M_0=\int_0^\infty\rho_{\rm f}(\omega)\,d\omega.
\]

The explicit \(1/2\) fold retains the intended averaged leading moment.

## 7. Consequence for the selector programme

The causal-frequency route now divides sharply:

1. **Cone realization:** successful. Folding yields a positive,
   exchange-real \(H_2(\mathbb R)\) response.
2. **Interior determinant winding:** impossible under strict passivity.
3. **Boundary topology:** possible only with a precisely treated pole, zero,
   branch cut or gap closing.
4. **Mixed topology:** still viable when frequency is combined with momentum,
   defect azimuth or an adiabatic pump cycle.

The selector winding found in the finite-range and vortex branches cannot be
reinterpreted as a pure upper-half-plane frequency winding.

## 8. Relation to Green-function topology

Topological Green-function invariants often use inverse propagators and combine
frequency with momentum. Their nontriviality does not contradict the theorem:
the parameter domain is then higher-dimensional or compactified around
singular structure, rather than a contractible loop inside the passive
upper-half-plane.

Any future Green-function claim must specify:

- whether the invariant uses \(F\), \(F^{-1}\), or a flattened operator;
- the complete parameter domain;
- ultraviolet compactification;
- all poles and zeros;
- the symmetry class and gap condition.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** a mixed frequency/defect or frequency/momentum
invariant reproduces the selector parity while preserving Herglotz positivity
and the physical gap.

**Interior-winding falsifier:** a nonzero determinant winding is assigned to a
closed contractible contour where \(\operatorname{Im}F\succ0\).

**Pole falsifier:** phase accumulation through a spectral pole is called a
gapped invariant.

**Normalization falsifier:** folding doubles or changes the ultraviolet moment
without recording the normalization.

**Analyticity falsifier:** positive and negative frequency terms are folded with
incompatible retarded prescriptions.

## 10. Pinned dependency and continuation

Pin pure interior frequency winding negatively. Continue with two viable
branches:

1. combine the folded Herglotz response with the already-derived defect angle
   and compute a mixed invariant;
2. formulate the primitive \(\mathbb{RP}^2\) defect directly as an equivariant
   Dirac family, avoiding a forced frequency interpretation.

## 11. Certificate

The [folded Herglotz winding certificate](scripts/verify_folded_h2r_herglotz_has_zero_interior_determinant_winding.mjs) constructs positive exchange-real folded residues, verifies strict Herglotz positivity and ultraviolet normalization, proves numerical invertibility, and obtains zero determinant winding on a contractible upper-half-plane contour.

## Companion documents

- [Nambu superselection and frequency gate](369_unbroken_bminusl_collapses_a_nambu_two_face_response_while_car_sews_opposite_frequencies.md)
- [Neutral matrix-unit spectral carrier](368_the_neutral_matrix_units_support_an_exact_exchange_real_causal_carrier_but_are_not_yet_spacetime_operators.md)
- [Finite-range selector winding](357_odd_selector_winding_has_a_finite_range_lattice_representative_but_no_derived_coordinate.md)
- [Matrix vortex and primitive selector gate](358_the_full_matrix_vortex_has_index_three_but_the_primitive_rp2_defect_is_twisted.md)
- [Toeplitz edge index](354_the_selector_determinant_winding_has_an_exact_toeplitz_edge_index.md)
