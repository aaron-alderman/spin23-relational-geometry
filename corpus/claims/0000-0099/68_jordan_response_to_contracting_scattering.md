# From Positive Jordan Response to Contractive Two-Port Scattering

**Date:** 16 October 2026  
**Branches:** B05, B06, B07 and B08  
**Claim status:** exact linear-response correspondence; identification with a relativistic quantum (S)-matrix is not claimed

## 1. Why change coordinates?

The Jordan carrier (X\in\operatorname{Sym}_2^+(\mathbb R)) is naturally a response or impedance matrix. Experiments more often report reflection and transmission amplitudes. With positive reference impedance (Z_0), define the Cayley transform

\[
S=(X-Z_0I)(X+Z_0I)^{-1}.
\]

Because (X) is real symmetric and commutes with every rational function of itself, (S) is real symmetric. If (x_i>0) are the eigenvalues of (X), then

\[
s_i=\frac{x_i-Z_0}{x_i+Z_0}
\]

satisfy (|s_i|<1). Therefore

\[
I-S^TS>0.
\]

Conversely, every real symmetric strict contraction with no eigenvalue (1) gives

\[
X=Z_0(I+S)(I-S)^{-1}>0.
\]

Thus the positive Jordan cone and the open symmetric contraction ball are two coordinate descriptions of the same two-channel linear-response data.

## 2. Exact scalar example

For the scalar interval with (m=1,L=\log3),

\[
X=
\begin{pmatrix}
5/4&-3/4\\
-3/4&5/4
\end{pmatrix}.
\]

At (Z_0=1), its Cayley transform is

\[
\boxed{
S=
\begin{pmatrix}
0&-1/3\\
-1/3&0
\end{pmatrix}.
}
\]

The even and odd scattering eigenvalues are (-1/3) and (+1/3), and

\[
I-S^TS=\frac89I.
\]

In these coordinates the example has zero same-face reflection coefficient and a pure cross-face amplitude. This property depends on the choice (Z_0=1=m); it is not universal.

## 3. What this does and does not establish

It establishes an observable parametrization:

\[
H_2(\mathbb R)^+
\longleftrightarrow
\{S=S^T:\|S\|<1\}.
\]

It also makes reciprocity and passivity operational:

- symmetry of (S) is reciprocal two-port response;
- strict contractivity is loss into, or storage by, degrees of freedom not represented as asymptotic ports;
- boundary eigenchannels diagonalize both (X) and (S).

It does **not** establish a unitary particle-scattering matrix. A closed relativistic system requires frequency dependence, analytic continuation, threshold structure, optical-theorem normalization and inclusion of every open channel. The static Cayley matrix is a network/scattering observable in linear-response language.

## 4. Relation to (Sp(4,\mathbb R))

The Lagrangian Grassmannian admits several bounded and unbounded coordinate charts. The Cayley map is the response-level shadow of passing from an unbounded positive chart to a bounded domain. Symplectic transfer acts nonlinearly on either coordinate system.

This suggests a practical observable strategy for B06: calculate protected constraints on eigenvalues, poles or cross-ratios of the bounded response (S(\omega,\mathbf k)), rather than trying to measure an abstract (Spin(2,3)) generator.

## 5. Stop-everything and falsification tests

**Stop-everything positive:** the same internally derived selector that produces (H_2(\mathbb R)^+) also fixes a nontrivial reflection/transmission relation independent of portal coefficients.

**Falsification in scope:** every Cayley observable can be varied freely by local boundary counterterms, leaving no symmetry-protected relation among eigenchannels.

## 6. Certificate

[`verification/verify/verify-jordan-response-cayley-scattering.mjs`](../../../verification/verify/verify-jordan-response-cayley-scattering.mjs) verifies the exact Cayley transform, strict contraction, positivity defect and inverse reconstruction using rational arithmetic.

## Companion documents

- [Scalar interval response](64_scalar_interval_dirichlet_to_neumann_branch.md)
- [Scalar network sewing](66_scalar_network_subdivision_invariants.md)
- [Phase space and the Lagrangian Grassmannian](52_phase_space_lagrangian_grassmannian_branch.md)
