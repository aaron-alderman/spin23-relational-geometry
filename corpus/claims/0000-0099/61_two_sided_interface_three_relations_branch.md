# A Two-Sided Interface: One Carrier, Two Faces, Three Relations

**Date:** 16 October 2026  
**Branches:** B04, B07 and B08  
**Claim status:** exact response geometry established; identification with a fundamental physical interface remains open

## 1. Independent origin of two channels

A codimension-one interface has two sides. Let

\[
q=\begin{pmatrix}q_L\\q_R\end{pmatrix}
\]

denote boundary values on its left and right faces, and let

\[
p=\begin{pmatrix}p_L\\p_R\end{pmatrix}
\]

be their conjugate fluxes. Then

\[
(q,p)\in\mathbb R^2\oplus(\mathbb R^2)^*
\]

is exactly the four-dimensional symplectic carrier.

This supplies a non-numerological two-dimensional seed: the channels are the two physical faces of one interface.

## 2. Three independent relations

For a linear reciprocal interface,

\[
p=Xq,
\qquad
X=\begin{pmatrix}
x_{LL}&x_{LR}\\
x_{LR}&x_{RR}
\end{pmatrix}.
\]

There are exactly three independent response coefficients:

1. left self-response \(x_{LL}\);
2. right self-response \(x_{RR}\);
3. cross-face response \(x_{LR}=x_{RL}\).

Thus

\[
\boxed{
\text{one interface carrier}
\;\longrightarrow\;
\text{two faces}
\;\longrightarrow\;
\text{three reciprocal relations}.
}
\]

This is an exact realization of the programme’s organizing phrase.

## 3. Why (X) is symmetric

Let the on-shell boundary action be

\[
S_\partial(q)=\frac12q^TXq.
\]

Then

\[
p=\frac{\partial S_\partial}{\partial q}=Xq.
\]

Equality of mixed second derivatives gives reciprocity:

\[
X_{LR}=X_{RL}.
\]

The response matrix is therefore an element of

\[
H_2(\mathbb R)=\operatorname{Sym}_2(\mathbb R).
\]

The Jordan carrier is the Hessian of the boundary generating functional.

## 4. Positivity and passivity

If the Euclidean on-shell action is convex, or the static interface is passive, then

\[
X\succeq0.
\]

The allowed responses occupy the homogeneous self-dual Jordan cone. For a symmetric interface

\[
X=\begin{pmatrix}a&c\\c&a\end{pmatrix},
\]

the even and odd face combinations have responses \(a+c\) and \(a-c\). Positivity requires both to be nonnegative.

## 5. Symplectic evolution and Riccati flow

Changing polarization, integrating through a layer, or composing interfaces acts by a symplectic transfer matrix. Consequently

\[
X\mapsto(c+dX)(a+bX)^{-1}
\]

and continuous propagation produces the Riccati equation already derived.

This gives one framework for:

- boundary conditions;
- impedance and scattering response;
- transfer matrices;
- holographic radial evolution;
- two-sided defects or membranes;
- coupled source/response channels.

## 6. Cross-branch effect

This branch materially advances the selector problem:

- B04 obtains the missing two-channel seed from two physical faces;
- B07 obtains a concrete meaning for the Lagrangian matrix;
- B08 obtains a boundary observable rather than only a subgroup;
- B02 may interpret stress as generating radial or temporal transfer of \(X\).

It does not prove that the universe is fundamentally an interface. It supplies a coherent model whose ingredients are independently standard.

## 7. Observable candidates

The three coefficients can be measured through:

- reflection and transmission amplitudes;
- cross-susceptibility between faces;
- even/odd mode splitting;
- interface free-energy Hessians;
- boundary two-point functions;
- displacement response under normal deformation.

The determinant

\[
\det X=x_{LL}x_{RR}-x_{LR}^2
\]

is the simplest invariant positivity margin.

## 8. Stop-everything and falsification tests

**Positive:** the same physically derived interface Hessian obeys Jordan–Riccati evolution, fixes a displacement coefficient, and couples compatibly to the internal matter module.

**Negative:** the left/right split is artificial, reciprocity fails in the intended regime, or every response coefficient remains arbitrary and system-specific.

## 9. Certificate

[`verification/verify/verify-two-sided-interface-response.mjs`](../../../verification/verify/verify-two-sided-interface-response.mjs) checks the three-coefficient reciprocal matrix, positivity, flux gradient and even/odd eigenresponses for an exact example.

## Companion documents

- [Boundary selector](53_boundary_defect_selector_branch.md)
- [Positive cone](58_positive_cone_and_two_mode_selection_branch.md)
- [Lagrangian phase space](52_phase_space_lagrangian_grassmannian_branch.md)
- [Exact scalar interval realization](64_scalar_interval_dirichlet_to_neumann_branch.md)
