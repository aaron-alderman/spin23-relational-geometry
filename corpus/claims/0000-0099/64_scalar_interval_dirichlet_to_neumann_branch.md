# Scalar Interval Dirichlet-to-Neumann Matrix: A Concrete Jordan Interface

**Date:** 16 October 2026  
**Branches:** B04, B07, B08 and B06  
**Claim status:** exact field-theory response established; fundamental interpretation open

## 1. Bulk model

Consider a Euclidean massive scalar on an interval \([0,L]\):

\[
S[\phi]=\frac12\int_0^L
\left[(\partial_x\phi)^2+m^2\phi^2\right]dx,
\]

with boundary values

\[
q_L=\phi(0),
\qquad q_R=\phi(L).
\]

Solving

\[
(-\partial_x^2+m^2)\phi=0
\]

and evaluating the action on shell gives

\[
S_{\rm os}(q_L,q_R)=\frac12q^TX_{m,L}q,
\]

where

\[
\boxed{
X_{m,L}=\frac{m}{\sinh(mL)}
\begin{pmatrix}
\cosh(mL)&-1\\
-1&\cosh(mL)
\end{pmatrix}.
}
\]

This is the Dirichlet-to-Neumann response relating the two boundary values to outward fluxes.

## 2. Positivity and face eigenmodes

The symmetric and antisymmetric face combinations have eigenresponses

\[
\lambda_+=m\tanh\left(\frac{mL}{2}\right),
\qquad
\lambda_-=m\coth\left(\frac{mL}{2}\right).
\]

Both are positive for \(m,L>0\), so

\[
X_{m,L}>0.
\]

The field theory therefore produces the positive Jordan cone without adding passivity as a separate assumption.

In the massless limit,

\[
X_{0,L}=\frac1L
\begin{pmatrix}1&-1\\-1&1\end{pmatrix},
\]

which is positive semidefinite. Its zero eigenvalue is the constant bulk mode, giving the boundary zero mode a direct physical explanation.

## 3. Exact rational example

Take \(m=1\) and \(L=\log3\). Then

\[
\cosh L=\frac53,
\qquad
\sinh L=\frac43,
\]

and

\[
X=\begin{pmatrix}5/4&-3/4\\-3/4&5/4\end{pmatrix}.
\]

Its even and odd responses are \(1/2\) and \(2\).

## 4. Gluing as Schur composition

Glue two intervals by identifying the right boundary of the first with the left boundary of the second and extremizing over the common value. For identical response matrices

\[
X=\begin{pmatrix}a&b\\b&a\end{pmatrix},
\]

the effective outer response is

\[
X_{\rm eff}=
\begin{pmatrix}
a-\frac{b^2}{2a}&-\frac{b^2}{2a}\\
-\frac{b^2}{2a}&a-\frac{b^2}{2a}
\end{pmatrix}.
\]

For the rational example,

\[
X_{\rm eff}=
\begin{pmatrix}41/40&-9/40\\-9/40&41/40\end{pmatrix},
\]

exactly equal to \(X_{1,2\log3}\).

Thus interface composition is a Schur complement in response language and multiplication of symplectic transfer matrices in phase-space language.

## 5. Why this matters

The programme now has a complete small model connecting:

\[
\text{bulk action}
\to
\text{two boundary faces}
\to
X\in H_2(\mathbb R)^+
\to
\text{symplectic transfer}
\to
\text{composition/Riccati flow}.
\]

No stress-tensor projection is required. Stress and energy enter through the bulk action and its quadratic fluctuation operator.

## 6. Observable content

The eigenresponses, cross-response, determinant and their dependence on \(mL\) are measurable interface data. In a boundary QFT they correspond to two-point response kernels after mode decomposition.

The next physical step is to replace the one-dimensional interval by a mode of an actual \(3+1\)-dimensional bulk or defect system and determine whether conformal \(SO(2,3)\) symmetry constrains its response.

## 7. Stop-everything and falsification tests

**Positive:** a realistic bulk/defect mode produces this same positive Jordan response, while its displacement coefficient or scattering data fixes \(mL\) or an analogue.

**Negative:** the result depends entirely on choosing a free one-dimensional model and no symmetry-protected feature survives interactions or higher-dimensional mode integration.

## 8. Certificate

[`verification/verify/verify-scalar-interval-dtn.mjs`](../../../verification/verify/verify-scalar-interval-dtn.mjs) uses exact rational arithmetic to verify positivity, unit-determinant transfer and exact gluing into the doubled interval.

## Companion documents

- [Two-sided interface](61_two_sided_interface_three_relations_branch.md)
- [Positive cone](58_positive_cone_and_two_mode_selection_branch.md)
- [Jordan–Riccati flow](55_quadratic_hamiltonian_to_jordan_riccati_branch.md)
- [Scalar network subdivision and sewing](66_scalar_network_subdivision_invariants.md)
- [Boundary displacement kernel](67_scalar_boundary_displacement_kernel.md)
- [Contractive scattering coordinates](68_jordan_response_to_contracting_scattering.md)
