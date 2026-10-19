# Source-Filter Hessians Make the Jordan Triple Operational but Not Dynamical

**Date:** 17 October 2026  
**Branches:** B04, B05, B07, B08, B11 and the operational Jordan-polarization branch  
**Claim status:** exact source-tomography identity; dynamical symmetry remains unproved  
**Certificate:** [verify_jordan_triple_as_polarized_feshbach_self_energy.mjs](../../../verification/verify/verify_jordan_triple_as_polarized_feshbach_self_energy.mjs)

## Executive result

Let a positive internal response induce a fixed two-face carrier kernel

\[
K=B^TGB.
\]

Apply a tunable symmetric source filter

\[
L(s,t)=sA+tC
\]

before and after that kernel. The measured quadratic response is

\[
\Sigma(s,t)=L(s,t)K L(s,t).
\]

Its mixed source Hessian is

\[
\boxed{
\frac12\frac{\partial^2\Sigma}{\partial s\,\partial t}
\bigg|_{s=t=0}
=\frac12(AKC+CKA)
=\{A,K,C\}.
}
\]

Thus arbitrary linear combinations of two operational sources make the Jordan triple directly reconstructible from cross-responses. This closes the *tomographic polarization* gate.

It does not show that the system dynamically evolves by the Jordan triple or that \(Sp(4,\mathbb R)\) is a symmetry of one fixed Hamiltonian.

## 1. Finite-difference reconstruction

No infinitesimal idealization is required. Define

\[
\Sigma_K(X)=XKX.
\]

Then

\[
\boxed{
\{A,K,C\}
=\frac14\left[
\Sigma_K(A+C)-\Sigma_K(A-C)
\right].
}
\]

Equivalently,

\[
\{A,K,C\}
=\frac12\left[
\Sigma_K(A+C)-\Sigma_K(A)-\Sigma_K(C)
\right].
\]

The triple can therefore be reconstructed from a finite set of positive-response measurements using sum and difference source filters.

## 2. Application to incidence and \(B-L\)

Let the source vector be

\[
J=
\begin{pmatrix}
J_{\rm inc}\\
J_{B-L}
\end{pmatrix}.
\]

An external probe may couple to any calibrated real linear combination \(u^TJ\). Measuring autocorrelations for several vectors \(u\) reconstructs the full symmetric two-source kernel by ordinary polarization. Adding calibrated two-by-two preprocessing filters reconstructs the quadratic and triple responses above.

This makes the Jordan operations operational in the same limited sense that a covariance matrix and its congruence transforms are operational:

- the source frame is fixed by named operators;
- linear combinations are chosen by the probe;
- mixed responses recover off-diagonal relational information;
- positivity is retained at the level of each measured autocorrelation.

The nonconservation of \(J_{\rm inc}\) means its calibration runs with scale. The experiment or calculation must carry the renormalization matrix along with the source filter.

## 3. Tomography is not symmetry

There are three logically distinct claims:

1. **Algebraic:** the polarized quadratic map is the Jordan triple. This is proved.
2. **Operational:** a family of calibrated source filters can reconstruct the triple. This follows whenever both sources are independently addressable.
3. **Dynamical:** the microscopic action is invariant under, or evolves by, the resulting TKK algebra. This remains open and is generically false after Ward and UV data are fixed.

The first two claims justify using \(H_2(\mathbb R)\) and its Jordan triple as the natural language of the response family. They do not upgrade the ten-dimensional TKK completion into an exact Standard-Model symmetry.

## 4. Relation to the \(Spin(2,3)\) claim

If the operational response family spans \(H_2(\mathbb R)\), then its full algebraic conformal completion is

\[
Co(H_2(\mathbb R))
\simeq Sp(4,\mathbb R)
\cong Spin_0(2,3).
\]

The correct present statement is:

\[
\boxed{
Spin_0(2,3)
\text{ is the canonical conformal completion of the operational two-source response geometry.}
}
\]

It is not yet:

\[
Spin_0(2,3)
\text{ is an unbroken microscopic symmetry of the Standard Model.}
\]

This distinction reconciles the exact Jordan result with the severe Ward-compatible subgroup reductions found in documents 657 and 658.

## 5. Stop-everything criteria

Stop calling the polarization operational if:

1. one of the two sources cannot be independently coupled or reconstructed;
2. source mixing is unknown rather than calibrated;
3. contact terms dominate and cannot be fixed across measurements;
4. the incidence insertion fails to define a renormalized composite operator;
5. an algebraic subtraction is presented as a single positive experiment.

Stop calling the completion a dynamical symmetry unless the action, measure, Ward identities and normalization data transform covariantly.

## 6. Next gates

1. Construct the renormalization matrix for the incidence/\(B-L\) source pair.
2. Determine which source filters survive the conserved \(B-L\) Ward identity.
3. Formulate the triple using scale-covariant sources and a connection on source-frame space.
4. Test whether the resulting connection has nontrivial holonomy corresponding to the proposed loop-and-twist picture.

