# Positive Diagonal Locking Conflicts with Exact Noncompact Carrier Symmetry

**Date:** 17 October 2026  
**Branches:** B01, B03, B05, B07, B08 and B11  
**Claim status:** exact quadratic locking and symmetry-signature analysis; nonlinear and constrained completions remain open  
**Certificate:** [analyze_diagonal_locking_of_topology_and_chiral_carriers.mjs](../../../verification/analyze/analyze_diagonal_locking_of_topology_and_chiral_carriers.mjs)

## Executive result

After the quarter-turn of [document 638](638_the_seesaw_h2r_carrier_and_the_furey_topology_h2r_carrier_are_isomorphic_but_differently_typed.md), write both carrier coordinates as real vectors

\[
q_{\rm top},q_{\rm chi}\in\mathbb R^3.
\]

A positive quadratic lock

\[
S_E=rac a2\|q_{\rm top}\|^2
+\frac b2\|q_{\rm chi}\|^2
+\frac\kappa2\|q_{\rm top}-q_{\rm chi}\|^2
\]

has a healthy Euclidean Hessian for \(a,b\ge0\), \(\kappa>0\). It breaks the independent carrier transformations to a diagonal compact symmetry and can make the relative mode massive.

But the determinant form of \(H_2(\mathbb R)\) is Lorentzian:

\[
\Delta(q)=t^2-x^2-y^2.
\]

Replacing the Euclidean norm by this invariant form makes the relative locking quadratic indefinite. Therefore

\[
\boxed{
\text{positive unconstrained quadratic lock}
\quad\text{and}\quad
\text{exact noncompact determinant symmetry}
}
\]

cannot coexist in this elementary model.

## 1. Diagonal and relative spectra

For each aligned carrier coordinate, the Hessian is

\[
H=
\begin{pmatrix}
a+\kappa&-\kappa\\
-\kappa&b+\kappa
\end{pmatrix}.
\]

Its determinant is

\[
\det H=ab+\kappa(a+b).
\]

For \(a=b=m^2\), the eigenvalues are

\[
m^2,qquad m^2+2\kappa.
\]

The first is the diagonal mode and the second the relative mode. At \(a=b=0\), the diagonal mode is flat and the relative mode has eigenvalue \(2\kappa\).

The certificate checks \((a,b,\kappa)=(2,2,5)\), giving eigenvalues \((2,12)\), and the pure lock \((0,0,5)\), giving \((0,10)\).

## 2. Auxiliary topology mode

If \(q_{\rm top}\) has no derivative term, its equation is algebraic:

\[
q_{\rm top}=\frac\kappa{a+\kappa}q_{\rm chi}.
\]

Schur elimination gives the effective chiral coefficient

\[
b+\kappa-\frac{\kappa^2}{a+\kappa}
=b+\frac{a\kappa}{a+\kappa}\ge0.
\]

No topology propagator pole is added. At \(a=0\), exact locking \(q_{\rm top}=q_{\rm chi}\) occurs and the original chiral coefficient \(b\) is unchanged.

This is a mathematically consistent auxiliary realization of the missing vertical arrow in the carrier diagram. It does not prove the coupling is produced by the Furey or seesaw action.

## 3. Noncompact symmetry audit

Let

\[
\eta=\operatorname{diag}(1,-1,-1).
\]

A carrier boost \(B\) satisfies

\[
B^T\eta B=\eta,
\]

but not

\[
B^TIB=I.
\]

The certificate verifies both statements for a nonzero rapidity. Hence the positive Euclidean norm is not invariant under the determinant-preserving noncompact group.

Conversely, the invariant relative term

\[
\frac\kappa2(q_{\rm top}-q_{\rm chi})^T
\eta(q_{\rm top}-q_{\rm chi})
\]

has signature \((+,-,-)\). Treated as an unconstrained potential or kinetic norm, it is unbounded in two directions.

## 4. What this says about (Spin(2,3))

The programme must distinguish three meanings of the group:

1. **Response-domain automorphism:** \(Sp(4,\mathbb R)\cong Spin_0(2,3)\) organizes positive kernels by fractional transformations; it need not be a linearly realized symmetry of a local potential.
2. **Broken organizing symmetry:** a positive lock chooses a frame or vacuum and leaves a smaller compact/diagonal subgroup.
3. **Exact gauge or dynamical symmetry:** negative directions must be removed by constraints, gauge redundancy or a nonlinear coset construction before positivity can be claimed.

Conflating these roles is the action-level version of conflating isomorphic carrier indices.

## 5. Surviving completion routes

- **Auxiliary route:** keep the topology coordinate nondynamical and accept that the positive locking norm selects a response frame.
- **Gauge route:** promote negative directions to gauge redundancy and perform a full constraint/BRST count.
- **Nonlinear cone route:** formulate dynamics directly on the positive cone or a bounded realization rather than on unconstrained \(\mathbb R^{1,2}\).
- **Boundary route:** treat \(Sp(4,\mathbb R)\) as a transfer-domain automorphism, with positivity supplied by the bulk boundary-value problem.
- **Spontaneous-lock route:** introduce an order parameter and audit Goldstone, radial and relative modes.

## 6. Stop-everything criteria

Stop any model that simultaneously claims:

1. an unconstrained positive Euclidean locking potential;
2. exact linear invariance under the full noncompact determinant group;
3. no gauge constraints or symmetry breaking;
4. automatic ghost freedom from face-cone positivity.

At least one of those claims must be weakened or supplemented.

## 7. Next gates

1. Formulate the auxiliary lock on the Siegel or bounded response domain and test contractivity instead of Euclidean potential invariance.
2. Build the minimal constrained Lorentzian lock and count first- and second-class constraints.
3. Determine which subgroup survives a positive diagonal vacuum and whether it still supports the required \(Spin(2,3)\) response interpretation.

The nonlinear response-domain route is executed in [document 640](640_siegel_geodesic_locking_reconciles_positive_relative_modes_with_diagonal_sp4_symmetry.md). The Siegel invariant metric supplies a positive diagonal lock with full fractional \(Sp(4,\mathbb R)\) covariance, while shifting the remaining gate to UV normalization and microscopic realization.

## Reproducibility

```powershell
node scripts\analyze_diagonal_locking_of_topology_and_chiral_carriers.mjs
```
