# Phase Space and the Lagrangian Grassmannian: A Natural Home for the Jordan Carrier

**Date:** 16 October 2026  
**Branch:** B07 symplectic/phase-space route  
**Claim status:** exact geometric identification established; physical carrier interpretation remains open

---

## 1. Main result

Let

\[
W=Q\oplus P\cong\mathbb R^2\oplus(\mathbb R^2)^*
\]

be a four-dimensional symplectic vector space. A linear map \(X:Q\to P\) defines a graph

\[
L_X=\{(q,Xq):q\in Q\}\subset W.
\]

The graph is Lagrangian precisely when

\[
X=X^T.
\]

Therefore the big cell of the Lagrangian Grassmannian is coordinatized by

\[
\boxed{
J=\operatorname{Sym}_2(\mathbb R).
}
\]

This supplies an exact phase-space meaning for the three-dimensional Jordan carrier: it parametrizes Lagrangian planes transverse to the chosen momentum plane.

---

## 2. The fractional (Sp(4,\mathbb R)) action

Write

\[
g=\begin{pmatrix}a&b\\c&d\end{pmatrix}
\in Sp(4,\mathbb R).
\]

Acting on \((q,Xq)\) gives

\[
q'=(a+bX)q,
\qquad
p'=(c+dX)q.
\]

Whenever \(a+bX\) is invertible, the transformed Lagrangian plane is another graph with

\[
\boxed{
X'=(c+dX)(a+bX)^{-1}.
}
\]

The symplectic identities guarantee \(X'^T=X'\). Thus the full \(Sp(4,\mathbb R)\) group acts naturally on the compactification of the Jordan carrier, not merely on an unrelated four-dimensional space.

---

## 3. The (3+4+3) grading as phase-space transformations

The three pieces of

\[
\mathfrak{sp}(4,\mathbb R)
=J^-\oplus\mathfrak{gl}(2,\mathbb R)\oplus J^+
\]

become vector fields on the Lagrangian chart.

### Lower shear: translations

For

\[
g_C=\begin{pmatrix}I&0\\C&I\end{pmatrix},
\qquad C=C^T,
\]

one gets

\[
X\mapsto X+C.
\]

### Linear block

For

\[
g_G=\begin{pmatrix}G&0\\0&G^{-T}\end{pmatrix},
\]

one gets

\[
X\mapsto G^{-T}XG^{-1}.
\]

### Upper shear: quadratic or special transformation

For

\[
g_B=\begin{pmatrix}I&B\\0&I\end{pmatrix},
\qquad B=B^T,
\]

one gets

\[
X\mapsto X(I+BX)^{-1}.
\]

Infinitesimally,

\[
\delta_BX=-XBX.
\]

The polarization of this quadratic vector field is the outer-symmetric product

\[
XBY+YBX.
\]

This is the same Jordan triple already recovered from the double Lie bracket. The triple is therefore built into the nonlinear action of canonical transformations on Lagrangian relations.

---

## 4. A stronger interpretation of “relational carrier”

The matrix \(X\) need not be a stress tensor. Depending on the physical realization it can be:

- a linear relation \(p=Xq\) between conjugate variables;
- a Hessian of a generating function;
- a response or susceptibility matrix;
- a quadratic phase or wavefront curvature;
- a boundary condition defining a Lagrangian subspace;
- a local polarization choice.

All of these are naturally symmetric and transform through symplectic fractional action. This is substantially less forced than mapping a ten-component stress tensor into three components.

The phrase “one carrier, two faces” acquires an exact meaning:

\[
W=Q\oplus P,
\]

while \(X\) records the relation between those two faces.

---

## 5. What this changes in the stress branch

The stress-current counterexample showed that arbitrary local conserved currents are not closed under pointwise Jordan composition. The phase-space interpretation suggests that stress may instead enter as a generator or Hamiltonian that transports the Lagrangian relation:

\[
\dot L_X=K_T\cdot L_X,
\qquad K_T\in\mathfrak{sp}(4,\mathbb R),
\]

rather than being identified with \(X\) itself.

This separates roles:

- \(X\): polarization, response, or relational state;
- \(K_T\): stress-dependent symplectic generator;
- \(Sp(4)\): transport group;
- Jordan triple: nonlinear geometry of the chart.

This may reopen B02 through a compatible connection. The required new object is a covariant map

\[
T_{\mu\nu}\longmapsto K_T\in\mathfrak{sp}(4,\mathbb R)
\]

whose Hamiltonian flow preserves the relevant positive domain.

---

## 6. Important distinction from covariance matrices

A general two-mode Gaussian covariance matrix is a positive symmetric \(4\times4\) matrix with ten real entries. It is not the three-dimensional Jordan carrier.

Likewise, a single-mode covariance matrix is symmetric \(2\times2\), but its ordinary canonical group is \(Sp(2,\mathbb R)\), not \(Sp(4,\mathbb R)\).

The exact \(Sp(4)\) interpretation found here is different:

> \(H_2(\mathbb R)\) is a chart on the Lagrangian Grassmannian of a four-dimensional symplectic space.

This avoids a common dimension-counting mistake.

---

## 7. Positivity and caustics

The formula fails when

\[
\det(a+bX)=0.
\]

This does not mean the transformed Lagrangian plane ceases to exist. It means the chosen graph chart becomes singular: the plane is no longer transverse to the selected momentum subspace. Physically this resembles a caustic, focal point, or change of polarization.

The compactified carrier is therefore the full Lagrangian Grassmannian, while \(\operatorname{Sym}_2(\mathbb R)\) is only one affine chart. “Russian-doll recursion” may encounter chart singularities even when the underlying symplectic evolution is regular.

---

## 8. Stop-everything and falsification tests

### Positive

Re-root the carrier interpretation around phase space if a physical response or generating-function Hessian:

1. takes values in this Lagrangian chart;
2. is transported by a stress-dependent \(Sp(4)\) connection;
3. preserves a physically meaningful positivity or causality domain;
4. produces an observable phase, caustic, or response identity.

### Negative

Demote the phase-space branch if every proposed \(X\) is merely an arbitrary choice of polarization and no observable or dynamics depends on its Jordan structure.

---

## 9. Executable certificate

[`scripts/verify-lagrangian-chart-sp4-action.mjs`](scripts/verify-lagrangian-chart-sp4-action.mjs) verifies exact integer examples of:

- graph isotropy iff \(X\) is symmetric;
- symplectic translation, linear and upper-shear transformations;
- the fractional action;
- preservation of the Lagrangian condition and matrix symmetry.

## Branch state

**Established:** the Jordan carrier is the big-cell coordinate space of \(Lag(2,4)\), and its triple is encoded in the nonlinear \(Sp(4)\) action.

**Active:** identify the physical relational matrix and construct \(T\mapsto K_T\).

**Cross-branch effect:** B02 is reopened in the weaker but more natural form “stress generates Jordan-compatible transport” rather than “stress is the Jordan element.”

## Companion documents

- [Global group isomorphism](47_global_group_isomorphism_sp4r_spin023.md)
- [Stress dynamical closure](51_stress_jordan_dynamical_closure_branch.md)
- [Multi-branch registry](49_multi_branch_research_registry.md)
