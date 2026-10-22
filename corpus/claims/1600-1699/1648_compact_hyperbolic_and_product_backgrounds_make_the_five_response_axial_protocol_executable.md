# Compact Hyperbolic and Product Backgrounds Make the Five-Response Axial Protocol Executable

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** explicit boundaryless background-and-source suite for the quadratic axial matching protocol

**Depends on:** [the full-rank five-response protocol](1647_one_pseudoscalar_correlator_has_rank_two_but_five_responses_identify_the_quadratic_axial_eft.md)

**Evidence:** [background-suite ledger](../../../evidence/data/spin23-axial-torsion-matching-background-suite-v1.json) and [verifier](../../../verification/verify/verify_spin23_axial_torsion_matching_background_suite.mjs)

## Result

The abstract five-response protocol can be implemented on smooth compact
boundaryless Euclidean backgrounds. No physical boundary counterterms or
continuous-momentum idealization is required.

Use two compact hyperbolic four-manifolds with sectional curvatures
\(K_1=-1\) and \(K_2=-2\), together with a product of compact hyperbolic
surfaces of sectional curvatures \(k_1=-2\) and \(k_2=-4\). Scalar and
coexact one-form Laplacian eigenmodes supply the longitudinal and transverse
probes.

## Backgrounds

Let

\[
\mathcal M_1=H^4_{K=-1}/\Gamma_1,
\qquad
\mathcal M_2=H^4_{K=-2}/\Gamma_2,
\]

with freely acting cocompact discrete groups. In four dimensions,

\[
R_{\mu\nu}=3K g_{\mu\nu},
\qquad R=12K,
\]

so

\[
R_1=-12,\qquad R_2=-24.
\]

For the non-Einstein probe use

\[
\mathcal M_3=
\big(H^2_{k_1=-2}/\Gamma_3\big)
\times
\big(H^2_{k_2=-4}/\Gamma_4\big).
\]

Each two-dimensional factor obeys \(R_{ij}=k\,g_{ij}\). Therefore

\[
R_3=2k_1+2k_2=-12,
\]

while an axial polarization tangent to the first factor sees

\[
r_\parallel=k_1=-2\ne R_3/4=-3.
\]

All three spaces are locally symmetric, \(\nabla R_{\mu\nu\rho\sigma}=0\).
The product is non-Einstein because \(k_1\ne k_2\).

## Source modes

On each compact manifold, use normalized eigenmodes and omit genuine zero
modes according to the packet:

- longitudinal probes \(S_\mu=\nabla_\mu\sigma_n\), with
  \(-\nabla^2\sigma_n=\lambda_n\sigma_n\);
- transverse probes \(S_\mu=v_\mu^{(n)}\), with
  \(\nabla^\mu v_\mu^{(n)}=0\) and
  \(\Delta_1v_\mu^{(n)}=\lambda_n^{(1)}v_\mu^{(n)}\); and
- product-background longitudinal modes whose gradient lies in the first
  surface factor.

The large-eigenvalue slope of the longitudinal inverse response determines
\(B\). Its intercept/pole determines \(A_{R_i}\). The coexact one-form slope
determines \(Z\). The product mode determines the distinct
\(\xi_{\rm Ric}\) projection.

## Exact design determinant

For general response curvatures, the five-by-five design determinant is,
up to row/column orientation,

\[
\det M=(R_2-R_1)\left(r_\parallel-{R_3\over4}\right).
\]

The proposed suite gives

\[
\det M=(-24+12)(-2+3)=-12\ne0.
\]

The same formula supplies the experimental-design rule: separate the two
Einstein curvatures and maximize the traceless-Ricci eigenvalue
\(|r_\parallel-R_3/4|\), subject to remaining within the weak-curvature EFT
domain.

## Why these are evaluation backgrounds, not new vacua

An off-shell background-field effective action is a local functional and may
be evaluated on backgrounds that do not solve the critical theory's field
equations. \(\mathcal M_2\) and \(\mathcal M_3\) are projectors on invariant
coefficients; they are not proposed as additional physical vacua.

The curvature magnitudes must ultimately be restored as
\(|R_i|/M_{\rm Pl}^2\ll1\). The integer values above are dimensionless design
units. Rescaling every metric makes all curvatures arbitrarily weak without
changing the response-matrix rank.

## Execution packet for the next loop

The torsionful calculation should now:

1. expand the packet-v1 action about each \(\mathcal M_i\) with a weak axial
   background/source;
2. use the same BRST gauge fermion and subtraction scheme;
3. retain terms quadratic in the axial source and through two source
   derivatives;
4. evaluate the divergent form factors on longitudinal and coexact
   eigenmodes;
5. fit the five responses with the inverse design matrix; and
6. separately record cubic \(RTT,TT\nabla T\) and quartic \(T^4\) terms
   rather than contaminating the quadratic fit.

This is an executable specification. What remains is the nonminimal
torsionful Hessian/heat-kernel calculation itself.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_axial_torsion_matching_background_suite.mjs
~~~
