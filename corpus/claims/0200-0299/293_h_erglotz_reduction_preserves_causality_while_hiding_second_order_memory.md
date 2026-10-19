# Herglotz Reduction Preserves Causality While Hiding Second-Order Memory

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B06, B07, B08 and B11  
**Claim status:** exact upper-half-plane positivity and second-order resolvent bound; physical spectral measure and subtraction scheme remain open

## 1. Dynamic continuation of the flavor-gap result

Let \(H=H^*\) be the full face–flavor parent and define, for \(z=x+iy\) with \(y>0\),

\[
R(z)=(H-zI)^{-1}.
\]

With this sign convention,

\[
\operatorname{Im}R(z)=y\,R(z)^*R(z)\geq0.
\]

The normalized flavor trace \(E\) is positive, so

\[
G(z)=E(R(z))
\]

is matrix-valued Herglotz: it is analytic in the upper half-plane and \(\operatorname{Im}G(z)\geq0\). Reduction therefore preserves causal/passive sign structure even though it does not preserve inversion.

## 2. Centered hidden correlations remain second order

Take

\[
H=H_0+\varepsilon V,\qquad H_0=A\otimes I_n,\qquad E(V)=0,
\]

with \(A=A^*\), \(V=V^*\), and \(\|V\|\leq v\). Write \(R_0=(H_0-zI)^{-1}\). The exact second resolvent identity is

\[
R=R_0-\varepsilon R_0VR_0+\varepsilon^2R_0VR_0VR.
\]

The first-order term vanishes under \(E\), giving

\[
G(z)-(A-zI)^{-1}
=\varepsilon^2E(R_0VR_0VR).
\]

For self-adjoint \(H\) and \(H_0\), both resolvent norms are at most \(1/y\). Therefore

\[
\boxed{
\left\|G(z)-(A-zI)^{-1}\right\|
\leq \frac{\varepsilon^2v^2}{(\operatorname{Im}z)^3}
}
\]

without assuming \(|\varepsilon|v<y\). The price is that the bound becomes weak near the real axis, precisely where resolved poles and thresholds matter.

## 3. Exact two-pole model

For \(H=aI+\varepsilon X\), \(X^2=I\), \(E(X)=0\), let \(c=a-z\). Then

\[
G(z)=\frac{c}{c^2-\varepsilon^2}I
=\frac12\left(\frac1{a-\varepsilon-z}+\frac1{a+\varepsilon-z}\right)I.
\]

The reduced response is a positive average of two parent poles, while premature reduction gives only \(G_0(z)=c^{-1}I\). Their exact difference is

\[
G(z)-G_0(z)=\frac{\varepsilon^2}{c(c^2-\varepsilon^2)}I.
\]

Thus hidden correlations do not violate causality; they split spectral weight and generate a frequency-dependent memory correction.

## 4. The key conceptual distinction

There are now three separate statements:

1. **Causality descends:** positivity of \(E\) makes \(G\) Herglotz.
2. **Algebra does not descend:** \(E(R)\neq(E(H)-zI)^{-1}\) in general.
3. **Approximate closure can descend:** centered weak correlations give a quantified second-order error away from the spectrum.

This is a much firmer place for the external \(Spin(2,3)\) proposal. The carrier need not be the full microscopic algebra. It may be the low-resolution causal response, provided the hidden spectral splitting is bounded or explicitly retained as self-energy.

## 5. Boundary values and the real experimental question

The upper-half-plane bound alone does not justify taking \(y\to0^+\) uniformly. On the real axis, the two-pole model visibly differs from the single reduced pole. A physical claim therefore needs one of:

- finite experimental resolution larger than the hidden splitting;
- a true spectral gap around the probed energy;
- a controlled distributional boundary-value calculation;
- an explicit self-energy retaining the additional poles.

The programme should search for observables whose resolution dependence distinguishes a genuine hidden parent from a merely fitted three-component response.

## 6. Stop-everything and falsification gates

**Stop-everything trigger:** a Standard-Model/Furey channel yields a positive spectral measure whose unresolved multiplet collapses to the external \(H_2(\mathbb R)\) response with the predicted quadratic error.

**Memory trigger:** the same hidden operator predicts both pole splitting and the dispersive correction required by the Herglotz representation.

**Causality falsifier:** a proposed reduction produces a negative imaginary part in the upper half-plane.

**Boundary falsifier:** an upper-half-plane norm estimate is presented as a uniform real-axis approximation across a pole or threshold.

## 7. Certificate

The [Herglotz flavor-reduction certificate](../../../verification/verify/verify_h_erglotz_flavor_reduction_bound.mjs) checks positivity, the exact dynamic defect, its upper-half-plane bound, Schwarz reflection and the two parent pole locations.

## Companion documents

- [Controlled static flavor-gap reduction](292_flavor_gap_makes_the_external_h2r_carrier_a_controlled_second_order_approximation.md)
- [Flavor trace is not a Jordan/Schur homomorphism](291_flavor_trace_is_positive_but_does_not_transmit_parent_jordan_or_schur_dynamics.md)
- [Finite domain-wall resolvent as a Schur–Herglotz carrier](229_finite_domain_wall_resolvent_is_a_schur_herglotz_carrier.md)
- [Fixed-temperature KMS/Herglotz Schur sewing](213_fixed_temperature_kms_herglotz_schur_sewing.md)
