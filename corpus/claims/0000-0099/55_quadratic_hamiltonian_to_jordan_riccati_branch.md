# Quadratic Hamiltonians to Jordan–Riccati Flow

**Date:** 16 October 2026  
**Branches:** B07 phase space and B02 stress-compatible transport  
**Claim status:** exact finite-dimensional bridge established; field-theoretic stress map remains open

## 1. Canonical energy-to-generator map

Let \(z\in\mathbb R^4\) and

\[
H(z)=\frac12z^TSz,
\qquad S=S^T.
\]

With canonical symplectic matrix \(J\), Hamilton’s equation is

\[
\dot z=Kz,
\qquad K=JS.
\]

Because

\[
K^TJ+JK=0,
\]

we have \(K\in\mathfrak{sp}(4,\mathbb R)\). Conversely, \(-JK\) is symmetric for every \(K\in\mathfrak{sp}(4,\mathbb R)\). Hence

\[
\boxed{
\operatorname{Sym}_4(\mathbb R)
\cong\mathfrak{sp}(4,\mathbb R),
\qquad S\leftrightarrow JS.
}
\]

Both spaces have dimension ten, but the displayed inverse shows this is more than dimension matching.

## 2. Induced flow on the Jordan carrier

Write

\[
K=\begin{pmatrix}A&B\\C&-A^T\end{pmatrix},
\qquad B=B^T,\quad C=C^T.
\]

For a Lagrangian graph \(p=Xq\), differentiation gives the matrix Riccati equation

\[
\boxed{
\dot X=C-A^TX-XA-XBX.
}
\]

Every term has an exact role:

- \(C\): Jordan translation;
- \(-A^TX-XA\): linear structure action;
- \(-XBX\): quadratic special-conformal action.

Polarizing the last term recovers

\[
XBY+YBX,
\]

the Jordan triple product with middle element \(B\).

## 3. Reassessment of the original (AXB) intuition

The sandwich now has a direct dynamical origin. It is the quadratic part of the Riccati evolution of a Lagrangian relation under a quadratic Hamiltonian.

This suggests the identifications

\[
X=\text{response/polarization relation},
\qquad
B=\text{Hamiltonian Hessian block},
\]

rather than taking every factor to be a stress component.

The outer-symmetric triple appears when comparing or polarizing flows about two relations. This is the strongest dynamical realization of the remembered nesting found so far.

## 4. Relation to stress–energy

A local field theory has a Hamiltonian obtained from its stress tensor:

\[
H=\int_\Sigma T_{00}\,d^3x.
\]

Linearizing around a background produces a quadratic Hessian \(S_T\). If a controlled four-dimensional reduced phase space is selected, then

\[
T_{\mu\nu}
\longrightarrow H
\longrightarrow S_T
\longrightarrow K_T=JS_T
\in\mathfrak{sp}(4,\mathbb R).
\]

This is a legitimate candidate map from stress to symplectic transport. It does not require the local stress current itself to be triple-closed.

The unresolved step is the reduction from the infinite-dimensional field phase space to a preferred four-dimensional symplectic sector. Normal modes, collective coordinates, boundary modes or two-channel response could supply it.

## 5. Positivity

If \(S\) is positive definite, the quadratic Hamiltonian is bounded below. The generator \(JS\) is noncompact as a matrix but produces stable oscillatory dynamics after the appropriate spectral conditions. This is a healthier use of noncompact \(Sp(4)\) than treating its indefinite vector representation as an internal scalar kinetic metric.

Instability is diagnosed by the Hamiltonian spectrum, not simply by noncompactness.

## 6. Branch consequences

This result materially reopens B02:

- the failed claim remains false: local conserved stress currents are not triple-closed;
- the surviving claim is stronger and better motivated: quadratic energy generates a Jordan-compatible \(Sp(4)\) flow.

The next calculation is to perform the reduction for an explicit two-mode truncation of a scalar, Dirac or gauge system and test whether \(S_T\) is selected covariantly.

## 7. Stop-everything and falsification tests

**Positive:** a physically forced four-dimensional mode sector yields the same \(S_T\), Riccati carrier and measurable response across independent derivations.

**Negative:** every reduction requires arbitrary mode choices and produces unrelated \(Sp(4)\) systems with no invariant observable.

## 8. Certificate

[`verification/verify/verify-quadratic-hamiltonian-jordan-flow.mjs`](../../../verification/verify/verify-quadratic-hamiltonian-jordan-flow.mjs) verifies the ten-dimensional Hessian–symplectic isomorphism and the Riccati equation with exact integer matrices.

## Companion documents

- [Lagrangian phase-space branch](52_phase_space_lagrangian_grassmannian_branch.md)
- [Stress closure counterexample](51_stress_jordan_dynamical_closure_branch.md)
- [Multi-branch registry](49_multi_branch_research_registry.md)
