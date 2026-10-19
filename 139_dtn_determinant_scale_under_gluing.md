# Dirichlet-to-Neumann Determinant Scale under Arbitrary Gluing

**Date:** 17 October 2026  
**Branches:** B02, B03, B07 and B08  
**Claim status:** exact homogeneous free-interface theorem; heterogeneous and interacting cases remain open

## 1. Candidate normalization

The scalar interval response is

\[
X_{m,L}
=
\frac{m}{\sinh(mL)}
\begin{pmatrix}
\cosh(mL)&-1\\
-1&\cosh(mL)
\end{pmatrix},
\]

with

\[
\det X_{m,L}=m^2.
\]

The proposed carrier scale is

\[
\mu_X=\sqrt{\det X}=m.
\]

For this to be meaningful as boundary data, it should not depend on how the bulk is subdivided.

## 2. Unequal interval gluing

Let two segments have the same bulk mass \(m\) but arbitrary lengths \(L_1,L_2\). Write

\[
X_i=
\begin{pmatrix}
a_i&b_i\\
b_i&a_i
\end{pmatrix}.
\]

Eliminating their common boundary value by a Schur complement gives

\[
X_1\star X_2
=
\begin{pmatrix}
a_1-\dfrac{b_1^2}{a_1+a_2}
&
-\dfrac{b_1b_2}{a_1+a_2}
\\[1.2ex]
-\dfrac{b_1b_2}{a_1+a_2}
&
a_2-\dfrac{b_2^2}{a_1+a_2}
\end{pmatrix}.
\]

Hyperbolic addition identities give

\[
\boxed{
X_{m,L_1}\star X_{m,L_2}
=
X_{m,L_1+L_2}.
}
\]

Therefore

\[
\det(X_{m,L_1}\star X_{m,L_2})=m^2.
\]

## 3. Arbitrary subdivision

By associativity of Schur elimination,

\[
X_{m,L_1}\star\cdots\star X_{m,L_n}
=
X_{m,\sum_iL_i}.
\]

At every intermediate stage,

\[
\sqrt{\det X}=m.
\]

The normalization is therefore:

- independent of subdivision;
- independent of total interval length;
- compatible with exact boundary sewing;
- determined by the homogeneous bulk fluctuation operator.

This strengthens it as a possible external normalization for the dressed faces.

## 4. What the theorem does not cover

If adjacent segments have different masses,

\[
m_1\ne m_2,
\]

the sewn determinant is generally neither \(m_1^2\) nor \(m_2^2\). The same is expected for:

- position-dependent bulk masses;
- interacting bulk theories;
- boundary kinetic terms;
- matrix-valued channel mixing;
- renormalized nonlocal boundary actions.

A generalized scale may involve a transfer-matrix invariant, spectral determinant or renormalization condition. The simple theorem is homogeneous.

## 5. Noncircular use

The scale can normalize the dressed Standard-Model faces only if the boundary response is derived independently:

\[
\text{bulk/boundary sector}
\longrightarrow X
\longrightarrow\mu_X
\longrightarrow\text{normalized dressed carrier}.
\]

If the dressed carrier is used to construct \(X\) first, the argument is circular.

## 6. Stop-everything criteria

**Advance:** a physically motivated homogeneous boundary sector couples to the dressed faces and its \(m\) is fixed by an independent observable or symmetry.

**Generalize:** an interacting or matrix-valued gluing invariant replaces \(\sqrt{\det X}\) while retaining subdivision independence.

**Reject:** renormalization or heterogeneous matching makes the extracted scale path- or subdivision-dependent.

## 7. Certificate

The [DtN gluing-scale certificate](scripts/verify-dtn_determinant_gluing_scale.mjs) sews five unequal segment lengths, verifies equality with the direct total interval at every stage, checks \(\det X=m^2\), and demonstrates the heterogeneous-mass failure.

## Companion documents

- [Boundary and stress normalization audit](134_boundary_and_stress_normalization_scale_audit.md)
- [Scalar interval Dirichlet-to-Neumann response](64_scalar_interval_dirichlet_to_neumann_branch.md)
- [Scalar network subdivision invariants](66_scalar_network_subdivision_invariants.md)
- [Symmetric-phase dressed-carrier options](133_symmetric_phase_dressed_carrier_options.md)
