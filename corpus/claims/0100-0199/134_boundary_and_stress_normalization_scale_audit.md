# Boundary and Stress Candidates for the Carrier Normalization Scale

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B07 and B08  
**Claim status:** exact dimensional and interface-response audit; no universal normalization selected

## 1. Why this branch reopened

The corrected dressed faces require a dimension-one scale:

\[
\widetilde\chi_L
=
\frac{H^\dagger L}{\mu},
\qquad
\widetilde\chi_R=e_R.
\]

In the broken phase, \(\mu=v/\sqrt2\) is natural. Before symmetry breaking it is unselected.

The stress and boundary branches already contain dimensionful response data, so they are candidates for deriving \(\mu\).

## 2. Stress-derived scales

Since

\[
[T_{\mu\nu}]=4,
\]

several dimension-one quantities can be formed:

\[
\mu_{\rm tr}
=
|T^\mu{}_\mu|^{1/4},
\]

\[
\mu_{\rm quad}
=
|T_{\mu\nu}T^{\mu\nu}|^{1/8},
\]

\[
\mu_u
=
(T_{\mu\nu}u^\mu u^\nu)^{1/4}.
\]

None is universal.

### Trace scale

The trace vanishes in a classically conformal regime and for radiation, except for masses and anomalies. It cannot normalize the carrier precisely where the symmetric theory is closest to conformal.

### Quadratic invariant

For null radiation,

\[
T_{\mu\nu}=\rho k_\mu k_\nu,
\qquad
k^2=0,
\]

one has

\[
T^\mu{}_\mu=0,
\qquad
T_{\mu\nu}T^{\mu\nu}=0,
\]

despite nonzero energy.

### Observer energy

\(\mu_u\) is positive for suitable matter and a timelike observer, but it requires the extra vector \(u^\mu\). A Landau eigenvector can sometimes derive \(u\) from \(T\), but degeneracies and non-type-I stress tensors remain.

Thus no displayed stress scalar is simultaneously local, positive, frame-free and nonzero for all relevant states.

## 3. Boundary geometry supplies dimension one

A boundary or interface can provide

\[
L^{-1}
\]

from a proper separation, or extrinsic-curvature eigenvalues

\[
K^a{}_b
\]

with dimension one.

These are genuine geometric scales, but they exist only after the boundary branch is physically selected. The boundary normal chooses the real form; it does not by itself fix \(L\) or \(K\).

## 4. Exact Dirichlet-to-Neumann scale

For the massive scalar interval, the response eigenvalues are

\[
\lambda_+
=
m\tanh\frac{mL}{2},
\qquad
\lambda_-
=
m\coth\frac{mL}{2}.
\]

Their product is exact:

\[
\boxed{
\lambda_+\lambda_-=m^2.
}
\]

Therefore

\[
\mu_{\rm DtN}
=
\sqrt{\det X_{m,L}}
=m
\]

is a canonical dimension-one response scale once the bulk fluctuation operator is fixed.

This scale is independent of the interval length even though the separate even and odd responses depend on \(L\).

## 5. The massless obstruction

As \(m\to0\),

\[
\lambda_+\to0,
\qquad
\lambda_-\to\frac2L.
\]

Hence

\[
\det X_{0,L}=0.
\]

The determinant no longer supplies a nonzero normalization. One may use \(2/L\), but only after selecting the odd face sector and the interface length.

The zero mode is physical, not an algebraic accident. A massless conformal boundary therefore does not automatically produce the normalization needed by the dressed carrier.

## 6. Cross-branch interpretation

The boundary branch can perform two distinct jobs:

1. its normal selects
   \[
   H_2(\mathbb R)\subset H_2(\mathbb C);
   \]
2. its response spectrum can select \(\mu\).

These are logically independent. A normal without a nonzero response scale selects the real form but not the face normalization.

The stress branch can also supply \(\mu\), but only after choosing a state, invariant or observer. It does not yet derive one universal carrier scale.

## 7. Best current candidate

The strongest exact candidate is:

\[
\boxed{
\mu=\sqrt{\det X_{\rm boundary}}
}
\]

for a positive nondegenerate two-face boundary response.

It has three advantages:

- it is intrinsic to the same \(H_2(\mathbb R)\) response matrix;
- it has dimension one when \(X\) is a Dirichlet-to-Neumann operator;
- it is invariant under face exchange.

Its limitations are equally clear:

- it vanishes at rank-one or massless boundary rays;
- its transformation under arbitrary face congruence must be fixed;
- using it to define the carrier risks circularity if \(X\) itself was constructed from the normalized faces.

The response must therefore come from an independent boundary/bulk sector.

## 8. Stop-everything criteria

**Advance:** an independently derived boundary response has \(\det X>0\), and \(\sqrt{\det X}\) normalizes the dressed faces while preserving gluing and spectral positivity.

**Pin:** the only available response is rank one or massless, so the determinant scale vanishes.

**Reject stress normalization:** every candidate requires an arbitrary observer or fails on physically required states.

**Circularity falsifier:** the same dressed carrier is used both to define \(X\) and to extract the scale that defines the carrier.

## 9. Certificate

The [boundary/stress normalization certificate](../../../verification/verify/verify-boundary-stress-normalization-scales.mjs) checks dimensions, null-radiation failures, the exact Dirichlet-to-Neumann determinant identity and its massless limit.

## Companion documents

- [Symmetric-phase carrier options](133_symmetric_phase_dressed_carrier_options.md)
- [Stress-energy reduction gate](../0000-0099/46_stress_energy_to_jordan_carrier_reduction_gate.md)
- [Boundary/defect selector](../0000-0099/53_boundary_defect_selector_branch.md)
- [Scalar interval Dirichlet-to-Neumann response](../0000-0099/64_scalar_interval_dirichlet_to_neumann_branch.md)
