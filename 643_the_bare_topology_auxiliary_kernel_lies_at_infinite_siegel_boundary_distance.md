# The Bare Topology Auxiliary Kernel Lies at Infinite Siegel-Boundary Distance

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B05, B07, B08 and B11  
**Claim status:** exact boundary classification and divergence theorem; dressed microscopic response remains open  
**Certificate:** [test_auxiliary_contact_kernel_siegel_boundary.mjs](scripts/test_auxiliary_contact_kernel_siegel_boundary.mjs)

## Executive result

The current concrete topology-face construction is the nondynamical auxiliary kernel

\[
K_{\rm aux}=g^2M^{-1},
\]

which is real, positive and frequency independent. Therefore

\[
\operatorname{Im}K_{\rm aux}=0.
\]

It belongs to the boundary of the closed positive response cone, not to the open Siegel domain

\[
\mathfrak H_2=\{Z=Z^T:\operatorname{Im}Z>0\}.
\]

The bare auxiliary kernel consequently cannot be one endpoint of the proposed finite geodesic lock. Its regulated distance from any fixed interior point diverges logarithmically.

The physical lock must act on a **dressed causal composite response** with strictly positive spectral imaginary part, or use a different geometry that consistently includes boundary strata.

## 1. Exact divergence

On the scalar vertical slice

\[
Z=iyI_2,
\]

the Siegel trace metric reduces to

\[
ds^2=2\frac{dy^2}{y^2}.
\]

Hence

\[
d_{\mathfrak H_2}(i\epsilon I_2,iI_2)
=\sqrt2\log\frac1\epsilon.
\]

As \(\epsilon\to0^+\),

\[
\boxed{d_{\mathfrak H_2}\to\infty.}
\]

This is not a small regularization correction. The open-domain metric places the zero-absorption boundary at infinite distance.

## 2. What the auxiliary construction still accomplishes

[Document 627](627_a_nondynamical_two_face_field_realizes_the_h2r_response_without_mirror_poles.md) remains valid. It proves that an exchange-fixed positive \(H_2(\mathbb R)\) contact response can be generated without a mirror pole. The new result only sharpens its role:

\[
\text{positive Jordan contact kernel}
\ne
\text{strictly interior causal Siegel response}.
\]

The algebraic field supplies a local term and a two-face tensor structure. It does not by itself supply absorption, a spectral measure or an interior Herglotz point.

## 3. Minimal dressing that enters the domain

A positive spectral atom gives

\[
K(z)=Q+\frac{\rho}{s-z},
\qquad \rho>0.
\]

For \(z=x+iy\) with \(y>0\),

\[
\operatorname{Im}K(z)
=\frac{\rho y}{(s-x)^2+y^2}>0.
\]

For matrices, full-rank positive spectral support makes the imaginary part positive definite. This is the correct kind of object on which the Siegel geodesic lock may act.

The existing exchange-fixed spectral closure theorem in [document 626](626_exchange_fixed_matrix_spectral_measures_preserve_the_h2r_carrier.md) therefore supplies the mathematical target, but not yet its Standard-Model source.

## 4. Revised physical diagram

The viable chain is

\[
\text{Furey topology labels}
\longrightarrow
\text{composite sources }O_A,O_B
\longrightarrow
\text{dressed matrix correlator }K_{\rm top}(z)
\in\mathfrak H_2
\longrightarrow
\text{lock to }K_{\rm chi}(z).
\]

The bare field \(h_A,h_B\) may mediate the contact algebra, but it is not itself the finite-distance causal response endpoint.

## 5. Consequences for ultraviolet matching

The coefficients \(M_{\rm top}\) and \(M_{\rm chi}\) in a Herglotz asymptotic expansion cannot be read from the real matrix \(g^2M^{-1}\) of the algebraic auxiliary action. They must be derived from the dressed correlators and their subtraction convention.

This prevents a false comparison between:

- an auxiliary mass/contact matrix;
- a spectral-growth coefficient;
- a propagator residue;
- a finite real subtraction tensor.

They have different analytic roles even when each is represented by a positive two-by-two matrix.

## 6. Stop-everything criterion

Stop the current geodesic-lock realization if:

1. the only topology object is the real algebraic kernel \(g^2M^{-1}\);
2. no existing composite sources generate a positive full-rank spectral measure;
3. entering the interior requires adding an unwanted propagating mirror field;
4. the proposed finite lock is obtained only by inserting an arbitrary \(i\epsilon I\).

An arbitrary regulator does not produce a finite physical lock because its removal sends the distance to infinity.

## 7. Highest-value next gate

Construct the topology response from correlators of gauge-invariant Standard-Model composites already present in the completed Furey module. The required test is

\[
\operatorname{Im}K_{\rm top}(z)>0
\]

on the relevant two-face support, together with exchange equality of the two diagonal spectral populations and a common subtraction relation to the chiral response.

## Reproducibility

```powershell
node scripts\test_auxiliary_contact_kernel_siegel_boundary.mjs
```
