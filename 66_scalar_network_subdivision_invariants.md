# Scalar Interface Networks: Subdivision, Sewing and the First Protected Invariant

**Date:** 16 October 2026  
**Branches:** B04, B06, B07, B08 and B12  
**Claim status:** exact for the free scalar interval network; extension to interacting defects open

## 1. Question

The single interval produces a positive response matrix in (H_2(\mathbb R)). The next question is whether anything survives an arbitrary choice of subdivision. If the formalism changes when an unphysical internal boundary is inserted, it is presentation-dependent and cannot support the larger programme.

For a mass-(m) interval of length (L), write (u=mL). The transfer matrix is

\[
T(u)=
\begin{pmatrix}
\cosh u&m^{-1}\sinh u\\
m\sinh u&\cosh u
\end{pmatrix},
\qquad \det T(u)=1.
\]

It obeys

\[
T(u_1)T(u_2)=T(u_1+u_2).
\]

Thus inserting or removing internal cuts does not change the outer transfer data.

## 2. Sewing in Jordan-response language

Let adjacent intervals have boundary Hessians (X) and (Y). Their combined quadratic form has one shared boundary variable. Extremizing over that variable is a Schur complement. If

\[
X=\begin{pmatrix}A&B\\B&C\end{pmatrix},
\qquad
Y=\begin{pmatrix}D&E\\E&F\end{pmatrix},
\]

then

\[
X\star Y=
\begin{pmatrix}
A-\dfrac{B^2}{C+D}&-\dfrac{BE}{C+D}\\[2mm]
-\dfrac{BE}{C+D}&F-\dfrac{E^2}{C+D}
\end{pmatrix}.
\]

For interval responses this sewing law is associative wherever the eliminated block is invertible:

\[
(X_1\star X_2)\star X_3=X_1\star(X_2\star X_3).
\]

This is not an extra Jordan product. It is composition of Lagrangian relations expressed in one graph chart. Calling it a Jordan product would obscure the actual mechanism.

## 3. Exact three-segment certificate

Choose (m=1) and lengths

\[
L_1=\log2,
\qquad L_2=\log3,
\qquad L_3=\log5.
\]

Every hyperbolic function is rational. Exact arithmetic verifies that both possible Schur-complement associations equal the response for one interval of length

\[
L_1+L_2+L_3=\log30.
\]

The transfer matrices likewise multiply to (T(\log30)). This proves subdivision independence in the model without floating-point tolerance.

## 4. Which invariant actually carries length?

An initially attractive candidate fails:

\[
\det X_{m,L}=m^2.
\]

The determinant is independent of (L). It identifies the bulk mass scale but contains no interval-length information. This is a useful negative result: the simplest Jordan determinant is not the desired geometric observable.

The transfer matrix instead has eigenvalues (e^{\pm u}). For the chosen orientation,

\[
\rho(T)=T_{11}+mT_{12}=e^{mL},
\]

and therefore

\[
\rho(T_1T_2)=\rho(T_1)\rho(T_2),
\qquad
\eta(T):=\log\rho(T)=mL.
\]

The multiplicative spectral parameter (ho), or additive rapidity (eta), is invariant under arbitrary subdivision of a homogeneous interval. It is the first nontrivial sewing observable produced by this branch.

For a general (Sp(4)) network there will be more spectral data and possible Maslov information. The scalar calculation says what to look for: conjugacy or spectral invariants of the composed transfer relation, not determinants of individual response charts alone.

## 5. Relation to the modular branch

This is sewing, but it is not yet modular or Moonshine sewing. It supplies a concrete local composition object and an associative law, which is one prerequisite for reopening B12. It does not supply:

- a genus-two surface;
- a partition function or character vector;
- an action of (Sp(4,\mathbb Z));
- a modular anomaly or automorphic constraint.

B12 therefore remains pinned. The dependency is narrower: a network partition function must now be constructed from the transfer data and shown to have a nontrivial arithmetic mapping-class action.

## 6. Stop-everything and falsification tests

**Stop-everything positive:** a realistic defect or Standard-Model fluctuation sector has subdivision-independent transfer spectra that fall into a forced (Sp(4,\mathbb Z)) or genus-two modular representation.

**Falsification in scope:** interactions or channel mixing destroy every presentation-independent spectral quantity, leaving only regulator-dependent interface matrices.

**Current result:** exact associativity and an additive rapidity exist for the homogeneous free scalar; no arithmetic quantization follows.

## 7. Certificate

[`scripts/verify-scalar-network-subdivision.mjs`](scripts/verify-scalar-network-subdivision.mjs) uses rational arithmetic for the (log2,log3,log5) subdivision, verifies transfer multiplication, both Schur associations, unit determinant, the response determinant and the multiplicative spectral parameter.

## Companion documents

- [Scalar interval Dirichlet-to-Neumann branch](64_scalar_interval_dirichlet_to_neumann_branch.md)
- [Lagrangian phase-space branch](52_phase_space_lagrangian_grassmannian_branch.md)
- [Braid and integral symplectic branch](57_braid_central_twist_to_sp4z_branch.md)
- [Multi-branch registry](49_multi_branch_research_registry.md)
