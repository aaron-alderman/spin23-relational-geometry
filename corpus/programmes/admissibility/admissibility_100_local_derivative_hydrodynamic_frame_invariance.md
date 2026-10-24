# A local derivative change of Gaussian hydrodynamic coordinates leaves the source record unchanged

**Date:** 25 October 2026

**Status:** Gaussian local-derivative frame gate closed; Ward-complete nonlinear theory and microscopic matching open

**Topic:** OT-016

**Parent:** [AZ-098 Gaussian source-frame invariance](admissibility_98_gaussian_hydrodynamic_source_frame_invariance.md)

**Evidence:** [local derivative-frame audit](../../../evidence/data/hydrodynamic-local-derivative-frame-invariance-v1.json)

**Generator:** [two-momentum-leg source calculation](../../../scripts/run-hydrodynamic-local-derivative-frame-invariance.mjs)

**Verifier:** [derivative-frame certificate](../../../verification/admissibility/verify_hydrodynamic_local_derivative_frame_invariance.mjs)

## Result

AZ-098 mixed the retained shear and sound fields by one constant matrix. This packet tests the next possible loophole: a local change of variables that depends on time and spatial derivatives.

For a right field at momentum (p), use the triangular local operator

\[
M(p)=
\begin{pmatrix}
1&i\alpha z+\beta k^2\\
0&1
\end{pmatrix},
\qquad \alpha=0.37,
\quad \beta=0.22.
\]

Its determinant is exactly one. Because its off-diagonal generator squares to zero, its inverse is also a finite polynomial in the declared derivatives rather than an infinite or nonlocal inverse. For real frequency and momentum, (M(-p)=M(p)^*), so the paired momentum legs obey the ordinary reality condition.

Write the Gaussian source response with its two momentum legs exposed:

\[
G(p)=A(p)+B_R(p)D(p)^{-1}B_L(p).
\]

Under

\[
\phi'_R(p)=M(p)\phi_R(p),
\qquad
\phi'_L(-p)=M(-p)\phi_L(-p),
\]

consistency requires

\[
D'=M(-p)^{-T}DM(p)^{-1},
\quad
B'_R=B_RM(p)^{-1},
\quad
B'_L=M(-p)^{-T}B_L.
\]

These factors cancel exactly in the source response. Five real and complex frequency samples agree to a maximum numerical difference of (7.11\times10^{-15}), while both frame determinants remain exactly one.

## Why the two momentum legs matter

A derivative operator changes sign on odd derivatives when (p) is replaced by (-p). Applying the same numerical matrix to both sides of a Fourier-space bilinear would therefore test the wrong transformation. The left/right bookkeeping here is not cosmetic: it is what makes the local real-space redefinition and the source functional describe the same object.

The source-facing consequence is stronger than equality of a few internal kernel entries. The complete meromorphic response is unchanged, so its physical poles, residues and spectral matrix are unchanged. Applying the common-temperature KMS factor to that same spectral matrix also gives the same Gaussian noise response. Internal kernel entries can move because they are coordinate-dependent; a moved internal entry is not by itself a new mode.

## Open and closed

**Closed here**

- constant coordinate naming is no longer the only tested ambiguity;
- one genuinely time- and space-derivative-dependent local field change is explicit;
- the inverse transformation remains finite and local;
- (p) and (-p) legs, kernel and source couplings transform together;
- the complete Gaussian source response, physical poles, residues, spectral matrix and derived KMS response remain invariant.

**Still open**

- the effective shear/sound functional has not been embedded in a complete Schwinger–Keldysh action with doubled fields and dynamical KMS symmetry;
- stress-tensor Ward identities, improvement terms and all allowed contact terms have not been classified under nonlinear hydrodynamic frame changes;
- no microscopic OT-008 carrier or measured covariance has been matched to the effective coefficients;
- no (Spin(2,3)) dynamics or new physics follows.

## Implication

The extra response direction in AZ-097 cannot be blamed on the first local derivative-coordinate ambiguity one would naturally introduce. The honest remaining attack is narrower: build the Ward-complete nonlinear source theory, classify improvements and contacts there, then ask whether a source-facing direction survives microscopic or measured matching. Repeating unconstrained basis changes is no longer useful.

## Reproduction

~~~powershell
node scripts/run-hydrodynamic-local-derivative-frame-invariance.mjs --write
node verification/admissibility/verify_hydrodynamic_local_derivative_frame_invariance.mjs
~~~
