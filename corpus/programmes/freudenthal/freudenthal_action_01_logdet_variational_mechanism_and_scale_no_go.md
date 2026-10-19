# Freudenthal Action Branch 01: Log-Det Variational Mechanism and Scale No-Go

**Date:** 17 October 2026  
**Status:** exact action-level mechanism with a typing condition; the existing programme does not yet fix its coefficient  
**Certificate:** [verify_freudenthal_logdet_action_and_scale_no_go.mjs](../../../verification/verify/verify_freudenthal_logdet_action_and_scale_no_go.mjs)

## Executive result

There is an independently familiar action whose unique positive saddle is exactly the Freudenthal critical-null relation. For fixed positive stiffness (A), define

\[
\Gamma_{A,\kappa}(C)
=\operatorname{tr}(AC)-\kappa\log\det C,
\qquad C>0,quad \kappa>0.
\]

Then

\[
\boxed{
\frac{\delta\Gamma}{\delta C}=0
\iff C=\kappa A^{-1}.
}
\]

The action is strictly convex, so this is its unique global minimum. The linear term is the mean quadratic energy of a fluctuation with covariance (C); the log determinant is its Gaussian entropy or fluctuation-volume term. Thus the inverse relation can arise without beginning from exceptional algebra.

However, this mechanism fixes the previously free scale only to

\[
\lambda=\kappa.
\]

The programme must still derive (kappa) and prove that its two matrices are a stiffness and its dual covariance. A pure Freudenthal-quartic action cannot fix (lambda): every positive inverse ray is a degenerate critical-null ray.

## 1. Everyday picture before the matrix formula

Imagine two competing effects on a spring:

1. a stiff spring charges energy when fluctuations spread out;
2. thermal or statistical freedom rewards a wider cloud of fluctuations.

For a two-direction system, (A) is the stiffness ruler and (C) is the ellipse describing the fluctuation cloud. The trace measures the energy cost of that ellipse. The determinant measures its area, and the logarithm turns multiplicative area into an additive entropy.

Balancing cost against available area makes the covariance ellipse the inverse of the stiffness ellipse.

## 2. Exact Euler equation

For a symmetric variation (delta C),

\[
d\,\operatorname{tr}(AC)[\delta C]
=\operatorname{tr}(A\delta C),
\]

and

\[
d\log\det C[\delta C]
=\operatorname{tr}(C^{-1}\delta C).
\]

Therefore

\[
d\Gamma[\delta C]
=\operatorname{tr}\!\left[
(A-\kappa C^{-1})\delta C
\right].
\]

Stationarity for every symmetric variation gives

\[
A=\kappa C^{-1},
\qquad
C=\kappa A^{-1}.
\]

This is precisely the positive Freudenthal critical-null locus with (lambda=\kappa).

## 3. Uniqueness and stability

The second variation is

\[
d^2\Gamma[\delta C,\delta C]
=\kappa\operatorname{tr}
\left(C^{-1}\delta C\,C^{-1}\delta C\right)>0
\]

for every nonzero symmetric (delta C). The action also diverges when an eigenvalue of (C) approaches zero or infinity. Hence the saddle is the unique global minimum on the positive cone.

This is stronger dynamically than merely imposing (q(A,C)=0): small departures have a positive restoring Hessian.

## 4. Natural transformation typing

Under the source/dual-response frame change

\[
A\mapsto GAG^T,
\qquad
C\mapsto G^{-T}CG^{-1},
\]

both

\[
s=\operatorname{tr}(AC)
\quad\text{and}\quad
p=\det A\det C
\]

are invariant. The joint action

\[
\boxed{
I_\kappa(A,C)=s-\kappa\log p
}

is therefore exactly (GL(2,\mathbb R))-invariant under the dual action. For fixed (A), it differs from (Gamma_{A,\kappa}) only by the constant (-\kappa\log\det A).

This is the same typing boundary found in the Freudenthal restriction: it is natural for a stiffness and covariance, not for two matrices both transforming as responses.

## 5. Classification of invariant two-scalar actions

Consider any differentiable restricted action

\[
I(A,C)=f(s,p),
\qquad
s=\operatorname{tr}(AC),
\quad p=\det A\det C.
\]

Its (C)-stationarity equation is

\[
f_s A+f_p\det(A)C^\#=0.
\]

Multiplying by (C) gives

\[
f_s AC+f_p p I=0.
\]

Whenever (f_s\ne0), every positive stationary point must satisfy

\[
AC=\lambda I,
\qquad C=\lambda A^{-1}.
\]

The remaining scalar equation is

\[
\boxed{
f_s(2\lambda,\lambda^2)
+\lambda f_p(2\lambda,\lambda^2)=0.
}
\]

Thus a large class of invariant actions selects the inverse ray. What distinguishes a predictive action is whether this last equation fixes (lambda) from independently known coefficients.

For

\[
f=s-\kappa\log p,
\]

it gives (lambda=\kappa).

## 6. No-go for the exceptional quartic alone

On the paired face,

\[
q=-2(s^2-4p).
\]

Let the action depend only on the exceptional quartic,

\[
I=F(q).
\]

Along every inverse ray,

\[
s=2\lambda,
\qquad p=\lambda^2,
\qquad q=0.
\]

The scalar stationarity equation vanishes identically for every (lambda>0). Consequently:

\[
\boxed{
\text{Freudenthal invariance alone cannot fix }\lambda.
}

A scale requires additional data: temperature, an ultraviolet normalization, a determinant constraint, a measured susceptibility, a boundary unit, or another dimensionful coupling.

## 7. Gaussian and thermodynamic interpretation

For a centered classical Gaussian with stiffness (A) and covariance (C), the variational free energy has the form

\[
\mathcal F(C)
=\frac12\operatorname{tr}(AC)
-\frac{k_BT}{2}\log\det C
+\text{constant}.
\]

Its minimum is

\[
C=k_BT\,A^{-1}.
\]

In units with (k_BT=1), this is the ordinary Gaussian covariance/precision relation. A Euclidean Gaussian path integral similarly gives the inverse of its quadratic Hessian, subject to zero-mode, gauge and regularization qualifications.

This is an action-level mechanism, but its physical interpretation is specific:

- (A) must be a quadratic stiffness or inverse propagator;
- (C) must be a covariance or Green function;
- the trace pairing must use their dual transformation laws;
- (kappa) must come from a specified fluctuation normalization.

## 8. Causal/Herglotz qualification

For an analytic matrix (A(z)) with positive imaginary part,

\[
-A(z)^{-1}
\]

also has positive imaginary part. The causal half-plane automorphism therefore carries a minus sign. The static positive-cone saddle instead has

\[
C=+\kappa A^{-1}.
\]

There is no contradiction: a positive Euclidean stiffness, an inverse retarded kernel and a Herglotz response are differently typed objects with different sign conventions. But it prevents directly declaring

\[
C(z)=\kappa A(z)^{-1}
\]

for two Herglotz functions. A Wick rotation or an explicit inverse-kernel/response dictionary is required.

## 9. Ward, contacts and orientation

- **Ward identities:** they can restrict the allowed support and remove null directions, but do not determine (kappa). The log determinant is only legal on the physical non-null quotient.
- **UV normalization:** it can supply a unit or fixed leading matrix, but no current result equates that datum to the entropy coefficient.
- **Contact terms:** (C\mapsto C+Q) changes the action and generally moves its minimum. The mechanism selects a renormalized contact scheme rather than being contact independent.
- **Furey/flux orientation:** trace and determinant are invariant under simultaneous link reversal. This action cannot choose the final orientation bit.

## 10. Verdict and next gate

The action mechanism passes the mathematical and stability gates. It does not yet pass the programme-specific identification gate.

The next calculation must start from one of the programme's explicit Gaussian boundary or quadratic field models, identify its Hessian (A), compute its covariance/Green function (C), and test whether both coincide with the already established Freudenthal source and response slots after Ward quotient and causal continuation. Only then can (kappa) be called derived rather than assigned.

## References

- [Lami et al., log-determinant entropy for Gaussian covariance matrices](https://arxiv.org/abs/1703.06149)
- [Gesztesy and Tsekanovskii, matrix-valued Herglotz functions](https://arxiv.org/abs/funct-an/9712004)
- [Existing Gaussian boundary network](../../claims/0200-0299/203_three_boundary_scalar_star_realizes_peirce_schur_recursion.md)
- [Existing KMS--Herglotz sewing theorem](../../claims/0200-0299/213_fixed_temperature_kms_herglotz_schur_sewing.md)
- [Existing response inversion duality](../../claims/0600-0699/660_symplectic_inversion_is_a_spectrum_generating_duality_not_a_fixed_spectrum_symmetry.md)

## Stop conditions

Do not call (lambda) predicted merely because it equals an introduced coefficient (kappa). Do not identify covariance inversion with causal response inversion until the analytic continuation and sign are derived. Do not use a log determinant before Ward or gauge zero modes have been quotiented or regulated physically.
