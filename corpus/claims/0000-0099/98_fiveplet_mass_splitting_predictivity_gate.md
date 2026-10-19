# Fiveplet Mass Splitting: What Group Theory Does Not Predict

**Date:** 17 October 2026  
**Branches:** B05, B06 and B11  
**Claim status:** exact renormalization/predictivity diagnosis; finite pole-mass splittings require a specified renormalized theory

## 1. Tree-level degeneracy

At the exact custodial point, all five physical components have

\[
m_5^2=-2\kappa k+8\lambda_2k^2.
\]

This degeneracy follows from global custodial \(SO(3)\), not from electromagnetic gauge symmetry.

## 2. Why electroweak loops split the multiplet

Right-Abelian gauging generates

\[
\Delta_E
=(2g^2g_E^2+g_E^4)B^2-2g^2g_E^2D.
\]

These are Jordan-native but custodial-breaking operators. Their Hessians distinguish the charged complex-triplet directions from the neutral real-triplet direction and therefore split custodial charge sectors after symmetry breaking.

Photon, \(Z\) and \(W\) self-energies also differ because the fiveplet components have different fixed vertices. Charge conjugation preserves

\[
m_{+q}=m_{-q},
\]

but no remaining symmetry requires

\[
m_0=m_{\pm1}=m_{\pm2}.
\]

## 3. Why a numerical splitting is not yet predicted

The general Jordan-native action already contains independent coefficients multiplying \(B^2\) and \(D\), as well as trace/traceless quadratic terms. Gauge loops make their renormalization mandatory. A finite pole-mass prediction therefore requires:

1. renormalized values or ultraviolet boundary conditions for every native custodial-breaking coupling;
2. a specified renormalization scheme and scale;
3. vacuum re-minimization, including the induced \(w/k-1\);
4. gauge, Goldstone and ghost contributions in a consistent gauge;
5. any Higgs-doublet, Furey-matter and Yukawa contributions;
6. conversion from running Hessian masses to gauge-independent pole masses.

The exact gauge divergence is evidence that these inputs cannot be omitted. It is not itself a finite mass prediction.

## 4. The maximum model-independent statement

Without additional UV data, the robust spectrum has the form

\[
\boxed{
m_{+2}=m_{-2},
\qquad
m_{+1}=m_{-1},
\qquad
m_0\ \text{independent},
}
\]

with equality among the three groups only on the custodial locus.

The vertices derived in the companion document determine loop integrands and production couplings, but counterterm boundary data determine the renormalized splitting.

## 5. How the branch can become predictive

A calculable splitting would emerge if one of the following is supplied:

- a UV custodial boundary condition at a specified scale;
- a Furey/Jordan relation fixing the native breaking couplings;
- a matching calculation from a composite completion;
- an RG-attractive trajectory erasing sensitivity to the boundary data;
- a measured subset of masses used to predict the remaining one through a source-derived relation.

## 6. Stop-everything and falsification tests

**Positive:** the programme fixes one nontrivial relation among \(m_0,m_{\pm1},m_{\pm2}\) after all allowed counterterms are included.

**Negative:** every splitting can be varied independently through allowed renormalized couplings, leaving no Jordan-specific observable.

**Current result:** the representation fixes charges and vertices, while the present effective theory does not fix finite mass splittings.

**Unsafe shortcut:** quote a universal electroweak loop splitting borrowed from a more restrictive multiplet model without matching its counterterm and field-content assumptions.

## 7. Evidence

This gate is supported jointly by the [exact gauge-counterterm certificate](../../../verification/verify/verify-full-lock-gauge-counterterms.mjs), the [fiveplet Hessian certificate](../../../verification/verify/verify-full-lock-custodial-hessian.mjs), and the [electroweak-vertex certificate](../../../verification/verify/verify-custodial-fiveplet-electroweak-vertices.mjs).

## Companion documents

- [Full electroweak fiveplet vertices](97_custodial_fiveplet_full_electroweak_vertices.md)
- [Gauge-counterterm splitting](95_full_lock_gauge_counterterm_splitting.md)
- [General Jordan-native potential](89_jordan_native_full_lock_potential.md)
- [Custodial alignment and rho sensitivity](92_custodial_alignment_rho_sensitivity.md)
- [Full-lock fermion bilinear and fermiophobia gate](99_full_lock_fermion_bilinear_and_fermiophobia_gate.md)

