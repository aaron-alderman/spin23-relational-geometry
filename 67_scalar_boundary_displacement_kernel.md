# Moving the Boundary: The Scalar Displacement Kernel Is Indefinite

**Date:** 16 October 2026  
**Branches:** B06 and B08  
**Claim status:** exact model result; BCFT displacement-operator identification remains open

## 1. Why vary the interval length?

The boundary branch needs more than a static response matrix. A displacement operator measures the response to moving a boundary or defect. In the interval model, the elementary geometric deformation is (L\mapsto L+\delta L). At fixed boundary sources,

\[
\delta S_{\rm os}
=\frac12q^T(\partial_LX_{m,L})q\,\delta L.
\]

The matrix

\[
D_{m,L}:=\partial_LX_{m,L}
\]

is therefore the fixed-source displacement-response kernel of this reduced model.

It is not yet the full local BCFT displacement two-point function. That stronger identification requires a codimension-one relativistic theory, Ward-identity normalization and contact-term control.

## 2. Exact eigenresponses

The static even and odd face responses are

\[
\lambda_+=m\tanh\frac{mL}{2},
\qquad
\lambda_-=m\coth\frac{mL}{2}.
\]

Their length derivatives are

\[
\partial_L\lambda_+
=\frac{m^2}{2}\operatorname{sech}^2\frac{mL}{2}>0,
\]

and

\[
\partial_L\lambda_-
=-\frac{m^2}{2}\operatorname{csch}^2\frac{mL}{2}<0.
\]

Consequently

\[
\boxed{\operatorname{sig}(D_{m,L})=(1,1).}
\]

The positive static Jordan Hessian has an indefinite geometric derivative.

## 3. Exact rational example

For (m=1) and (L=\log3),

\[
\partial_L\lambda_+=\frac38,
\qquad
\partial_L\lambda_-=-\frac32,
\]

so in the left/right face basis

\[
D_{1,\log3}=
\begin{pmatrix}
-9/16&15/16\\
15/16&-9/16
\end{pmatrix}.
\]

Its determinant is negative. This is not a numerical accident; the opposite monotonicities hold for all (m,L>0).

## 4. The uncomfortable lesson

Three notions must not be conflated:

1. (X>0): convexity of the on-shell action in boundary values;
2. (D=\partial_LX): response at fixed sources to a geometric displacement;
3. positivity of a properly normalized displacement-operator two-point function in a unitary boundary QFT.

Only the first has been proved here. The second is indefinite. The third lives in a different positivity statement and cannot be inferred from either sign of (D) without deriving the Ward identity and removing scheme-dependent contact terms.

This blocks a tempting shortcut in B08: the positive Jordan cone cannot simply be relabeled as a positive displacement sector.

## 5. Interpretation through Hamilton–Jacobi evolution

The on-shell action is Hamilton’s principal function for evolution in the interval direction. Its length derivative is controlled by the radial Hamiltonian. The opposing even/odd signs reflect the fact that increasing separation softens the antisymmetric gradient-dominated mode while increasing the symmetric massive response toward its asymptotic value.

This supports the phase-space interpretation: geometric evolution is a Riccati/Hamilton–Jacobi flow on positive response matrices, but its tangent vector need not remain inside the positive cone.

## 6. Branch consequence

B08 remains viable, but its next gate is now precise. A relativistic boundary model must derive:

- the local displacement operator from broken normal translations;
- its Ward identity and normalization;
- the relation, if any, between its integrated kernel and (partial_LX);
- the appropriate spectral/reflection positivity statement.

If that calculation forces the same (H_2(\mathbb R)) carrier while explaining the indefinite fixed-source derivative, the branch strengthens. If it requires an unrelated structure, the present interface model remains an effective analogy.

## 7. Stop-everything and falsification tests

**Stop-everything positive:** the normalized displacement Ward identity reconstructs the same response matrix and fixes one of its coefficients independently.

**Stop-everything negative:** unitarity requires a displacement kernel whose representation content is incompatible with every (H_2(\mathbb R)) response interpretation.

## 8. Certificate

[`scripts/verify-scalar-displacement-kernel.mjs`](scripts/verify-scalar-displacement-kernel.mjs) verifies the exact derivative matrix, its even/odd eigenvalues and its ((1,1)) signature at (m=1,L=\log3).

## Companion documents

- [Boundary and defect selector](53_boundary_defect_selector_branch.md)
- [Scalar interval response](64_scalar_interval_dirichlet_to_neumann_branch.md)
- [Quadratic Hamiltonians and Riccati flow](55_quadratic_hamiltonian_to_jordan_riccati_branch.md)
