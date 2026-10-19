# Heterogeneous Boundary Transfer Scales

**Date:** 17 October 2026  
**Branches:** B02, B03, B07 and B08  
**Claim status:** exact piecewise-free transfer analysis; physical normalization remains nonunique

## 1. Transfer matrix

For a Euclidean segment with mass \(m\) and length \(L\), propagate

\[
\begin{pmatrix}q\\p\end{pmatrix}
\]

with

\[
T(m,L)
=
\begin{pmatrix}
\cosh(mL)&\dfrac{\sinh(mL)}m\\[1ex]
m\sinh(mL)&\cosh(mL)
\end{pmatrix}.
\]

It satisfies

\[
\det T=1.
\]

For a piecewise interface,

\[
T_{\rm tot}=T_n\cdots T_2T_1.
\]

Subdivision of any constant segment leaves this ordered product unchanged.

## 2. Boundary response from transfer data

Write

\[
T_{\rm tot}
=
\begin{pmatrix}a&b\\c&d\end{pmatrix}.
\]

The Dirichlet-to-Neumann response is

\[
X=
\begin{pmatrix}
a/b&-1/b\\
-1/b&d/b
\end{pmatrix},
\]

and

\[
\det X=\frac cb.
\]

This gives the determinant scale

\[
\mu_{\det}
=
\sqrt{\frac cb}.
\]

It is intrinsic to the sewn boundary response whenever \(b,c>0\).

## 3. Effective decay scale

For a hyperbolic transfer matrix, define

\[
\mu_{\rm F}
=
\frac1{L_{\rm tot}}
\operatorname{arcosh}
\left(\frac{\operatorname{tr}T_{\rm tot}}2\right).
\]

This is the effective Floquet or decay exponent per unit length.

For a homogeneous interface,

\[
T_{\rm tot}=T(m,L_{\rm tot}),
\]

so

\[
\mu_{\det}=\mu_{\rm F}=m.
\]

## 4. Heterogeneous splitting

For piecewise masses \(m_i\), both scales remain invariant under refinement of the same physical profile:

\[
T(m_i,L_i)
=
T(m_i,L_i^{(2)})
T(m_i,L_i^{(1)})
\]

when

\[
L_i^{(1)}+L_i^{(2)}=L_i.
\]

Therefore \(\mu_{\det}\) and \(\mu_{\rm F}\) are both subdivision-independent.

But generally,

\[
\boxed{
\mu_{\det}\ne\mu_{\rm F}.
}
\]

Homogeneity had hidden this ambiguity by making the two invariants coincide.

## 5. Reversal

For the tested positive scalar segments, reversing the layer order leaves both displayed scalar invariants unchanged, although it exchanges the two diagonal boundary responses. More general matrix-valued or nonreciprocal channels need not share this property.

The important point is not order sensitivity but nonuniqueness: transfer data contains more than one natural dimension-one invariant.

## 6. Consequence for carrier normalization

The homogeneous result

\[
\sqrt{\det X}=m
\]

is robust and exact. In a heterogeneous environment, selecting \(\mu_{\det}\) rather than \(\mu_{\rm F}\) requires a physical principle.

Possible selectors are:

- direct normalization by boundary flux response, favoring \(\mu_{\det}\);
- long-distance decay, favoring \(\mu_{\rm F}\);
- a gluing law for coupled matrix channels;
- an observed pole or threshold;
- a stress-energy functional.

Subdivision invariance alone does not choose.

## 7. Stop-everything criteria

**Advance determinant scale:** the dressed carrier couples directly to the boundary Hessian, making \(\sqrt{\det X}\) operational.

**Advance Floquet scale:** the carrier is defined by asymptotic transfer/decay rather than local boundary flux.

**Reject uniqueness:** both scales affect observables independently and no symmetry relates them.

**Generalize:** find a unique symplectic spectral invariant for interacting matrix-valued transfer that reduces to both in the relevant limit.

## 8. Certificate

The [heterogeneous transfer certificate](../../../verification/verify/verify-heterogeneous_transfer_scales.mjs) compares both scales for homogeneous and piecewise masses, verifies exact refinement invariance and checks the reversal behavior.

## Companion documents

- [DtN determinant scale under gluing](139_dtn_determinant_scale_under_gluing.md)
- [Boundary/stress normalization audit](134_boundary_and_stress_normalization_scale_audit.md)
- [Scalar network subdivision invariants](../0000-0099/66_scalar_network_subdivision_invariants.md)
- [Phase-space/Lagrangian branch](../0000-0099/52_phase_space_lagrangian_grassmannian_branch.md)
