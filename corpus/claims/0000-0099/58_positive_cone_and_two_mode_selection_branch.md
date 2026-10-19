# Positive Jordan Cone and a Stable Two-Mode Realization

**Date:** 16 October 2026  
**Branches:** B04 operational selection, B05 health, B07 phase space  
**Claim status:** symmetric-cone properties established; universal physical selection remains open

## 1. The positive domain

Inside

\[
J=\operatorname{Sym}_2(\mathbb R)
\]

consider the cone

\[
J_+=\{X:X\succeq0\}.
\]

Its interior consists of positive-definite response or Hessian matrices. This cone is homogeneous and self-dual.

### Homogeneity

For positive-definite \(X,Y\), there exists \(G\in GL(2,\mathbb R)\) such that

\[
Y=GXG^T.
\]

For example one may take \(G=Y^{1/2}X^{-1/2}\) with the appropriate ordering or any congruence factor obtained from Cholesky decompositions. Thus the cone automorphism group acts transitively on its interior.

### Self-duality

Under

\[
\langle X,Y\rangle=\operatorname{tr}(XY),
\]

every pair of positive semidefinite matrices has nonnegative pairing. Conversely, if

\[
\operatorname{tr}(Xvv^T)=v^TXv\ge0
\]

for every \(v\), then \(X\succeq0\). Hence \(J_+^*=J_+\).

This supplies the homogeneous self-dual cone required by the Koecher–Vinberg route directly from positivity of a response or energy Hessian.

## 2. Lorentz-cone form

Writing

\[
X=\begin{pmatrix}x_0+x_1&x_2\\x_2&x_0-x_1\end{pmatrix},
\]

positivity becomes

\[
x_0\ge0,
\qquad x_0^2-x_1^2-x_2^2\ge0.
\]

Thus the positive matrix cone and the future Lorentz cone are the same ordered geometry.

## 3. Explicit two-mode Hamiltonian

Take

\[
H=\frac12p^Tp+\frac12q^TVq,
\qquad
V=\begin{pmatrix}2&1\\1&2\end{pmatrix}.
\]

The eigenvalues of \(V\) are \(1\) and \(3\), so the normal-mode frequencies are

\[
\omega_1=1,
\qquad\omega_2=\sqrt3.
\]

The Hamiltonian is bounded below. Its generator is

\[
K=\begin{pmatrix}0&I\\-V&0\end{pmatrix}
\in\mathfrak{sp}(4,\mathbb R),
\]

with

\[
K^2=\begin{pmatrix}-V&0\\0&-V\end{pmatrix}.
\]

This is a fully healthy, elementary realization of the symplectic carrier. Noncompact \(Sp(4,\mathbb R)\) does not itself imply unstable dynamics; health is controlled by the Hamiltonian Hessian.

## 4. What this derives and what it assumes

If the physical carrier is a positive response or convex generating-function Hessian, then:

- self-duality follows from the trace pairing;
- homogeneity follows from congruence transformations;
- dimension three and rank two follow from choosing a two-channel symmetric response;
- the Jordan algebra follows from Koecher–Vinberg.

The remaining inserted assumption is “two channels.” The operational branch has reduced its unexplained package from several axioms to the selection of a two-dimensional seed space.

## 5. Caveat: the full (Sp(4)) action

The congruence subgroup preserves the positive cone globally. A general fractional \(Sp(4)\) transformation need not preserve one affine positive chart for every input; denominators can become singular and chart changes occur.

The correct global object is the compactified Lagrangian geometry or an appropriate tube/Siegel domain. Positivity does not authorize treating every real fractional transformation as a physical positive evolution.

## 6. Stop-everything and falsification tests

**Positive:** two channels arise independently from conjugate boundary data, a binary operational capacity, or a forced pair of modes, and the same positive Hessian controls observed response.

**Negative:** “two channels” is only chosen to recover \(2\times2\) matrices, or physical evolution repeatedly leaves every meaningful positive domain.

## 7. Certificate

[`verification/verify/verify-positive-cone-two-mode.mjs`](../../../verification/verify/verify-positive-cone-two-mode.mjs) checks an exact congruence orbit example and the stable coupled-oscillator realization.

## Sources

- [Levent Tunçel and Lieven Vandenberghe, *Linear optimization over homogeneous matrix cones*](https://arxiv.org/abs/2211.00761)
- [Jordan selection axioms and Koecher–Vinberg route](44_jordan_selection_axioms_and_spin24_to_spin23_descent.md)

## Branch state

B04 advances: positivity supplies homogeneity and self-duality naturally. The binary/two-channel selector remains open.
