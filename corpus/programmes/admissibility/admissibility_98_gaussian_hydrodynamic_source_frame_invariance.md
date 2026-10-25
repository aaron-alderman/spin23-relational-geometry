# Gaussian internal-frame changes leave the source response unchanged

**Date:** 25 October 2026
**Status:** quadratic source-functional frame test closed; nonlinear Ward-complete frame theorem open
**Topic:** OT-016
**Parent:** [AZ-097 pole/residue ledger](admissibility_97_hydrodynamic_pole_residue_response_ledger.md)
**Evidence:** [Gaussian source-frame audit](../../../evidence/data/hydrodynamic-gaussian-source-frame-invariance-v1.json)
**Generator:** [source-functional calculation](../../../scripts/run-hydrodynamic-gaussian-source-frame-invariance.mjs)
**Verifier:** [frame-invariance certificate](../../../verification/admissibility/verify_hydrodynamic_gaussian_source_frame_invariance.mjs)

## Result

The shear and sound modes of AZ-097 now live inside one quadratic source functional. With external ports \(J\), internal modes \(\phi\), local tensor term \(A\), coupling \(B\) and inverse mode kernel \(D\), its source response is

\[
W[J]=\frac12J^TAJ+\frac12J^TBD^{-1}B^TJ,
\qquad
\frac{\delta^2W}{\delta J\delta J}=A+BD^{-1}B^T.
\]

Apply a nontrivial invertible mixing \(\phi'=M\phi\). Consistency requires

\[
D'=M^{-T}DM^{-1},
\qquad
B'=BM^{-1}.
\]

Then

\[
B'D'^{-1}B'^T=BD^{-1}B^T
\]

exactly. Four complex-frequency samples agree to a maximum numerical difference of approximately \(8.9\times10^{-15}\). Because \(\det D'=\det(M)^{-2}\det D\), pole positions and multiplicities are unchanged; equality of the complete meromorphic source response also preserves residues.

## Meaning

This removes one important false explanation of the multichannel cone. Mixing the retained Gaussian hydrodynamic coordinates cannot create or erase a source-facing response direction when both the internal kernel and source coupling are transformed. The observable object is the source Hessian, not the names assigned to the internal modes.

The result also clarifies why a bare basis change is insufficient. Transforming \(D\) while leaving \(B\) fixed changes the physical source coupling and therefore describes a different experiment, not another frame.

## Boundary

This is a Gaussian, frequency-independent internal-coordinate test. A general hydrodynamic frame change may depend on derivatives, mix temperature, chemical potential and velocity, reshuffle contact terms, and must preserve Ward identities inside a Schwinger–Keldysh generating functional. AZ-098 does not prove that nonlinear theorem. It also does not match the effective coefficients to the microscopic OT-008 carrier.

The remaining gate is narrower:

- construct a Ward-complete quadratic or nonlinear source action;
- admit only local derivative-ordered hydrodynamic field redefinitions;
- verify source derivatives, KMS symmetry, poles and residues after the change;
- match the surviving directions to microscopic or measured records with covariance.

No \(Spin(2,3)\) dynamics or new physics is inferred.

## Reproduction

~~~powershell
node scripts/run-hydrodynamic-gaussian-source-frame-invariance.mjs --write
node verification/admissibility/verify_hydrodynamic_gaussian_source_frame_invariance.mjs
~~~
