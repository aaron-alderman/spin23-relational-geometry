# Imperfect Face Reversal Remains Identifying Except at the Same-Sign Boundary, but Can Be Arbitrarily Ill-Conditioned

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09, B11, B13, B14 and the reversal-calibration branch  
**Claim status:** exact two-score Fisher theorem and executable conditioning sweep; physical reversal calibration remains open  
**Certificate:** [verify_imperfect_two_face_reversal_identifiability_and_conditioning.mjs](scripts/verify_imperfect_two_face_reversal_identifiability_and_conditioning.mjs)

## Executive result

Perfect sign reversal is sufficient but not necessary for two-face identifiability. What matters is that the two channel score rows are not parallel.

Let

\[
\begin{array}{c|cc}
&s_{CP}&s_A\\ \hline
+&g&g\\
-&g&-\kappa g
\end{array}
\]

with exposures \(L_+\) and \(L_-\), and \(I_g=\langle g,g\rangle\). Then

\[
\boxed{
\det I=I_g^2L_+L_-(1+\kappa)^2
}
\]

and the nuisance-profiled CP information is

\[
\boxed{
I_{CP}^{\rm eff}
=\frac{I_gL_+L_-(1+\kappa)^2}
{L_++\kappa^2L_-}.
}
\]

The only exact degeneracy in this one-shape model occurs at \(\kappa=-1\), where the nominal second face actually transforms the nuisance with the same sign and magnitude as the first.

## 1. Identifiability is not stability

For every \(\kappa\neq-1\) and positive exposures, the Fisher matrix has positive determinant. But as \(\kappa\to-1\), its smallest eigenvalue approaches zero quadratically and its condition number diverges.

Therefore a mathematically identifiable design can remain practically unusable. Small calibration errors in \(\kappa\), background shape, or exposure normalization can dominate the weak Fisher eigenvector.

The certificate explicitly verifies this transition and reports the condition number across a reversal-strength sweep.

## 2. Interpretation of special points

- \(\kappa=1\): perfect reversal; balanced exposure makes the two tangents orthogonal and retains all raw CP information.
- \(\kappa=0\): the nuisance disappears from the second face; the pair remains identifying, although not orthogonal.
- \(-1<\kappa<0\): the nuisance has the same sign in both faces but different magnitude; amplitude contrast still breaks degeneracy.
- \(\kappa=-1\): identical score rows; no degeneracy breaking occurs.

Calling every \(\kappa<0\) a “failed reversal” would therefore miss a useful amplitude-calibration route. Calling every nonzero determinant robust would be equally wrong.

## 3. Calibration requirement

The relevant quantity is the observed nuisance score ratio, not a nominal control setting. A hardware reversal may fail to reverse the reconstructed odd efficiency, or it may reverse only part of it.

The calibration programme must estimate:

1. the sign and magnitude of \(\kappa\);
2. its uncertainty and correlations with CP-sensitive shape parameters;
3. the smallest Fisher eigenvalue after all additional nuisance scores are included;
4. and the bias induced by misspecifying the reversal map.

## 4. Relational-carrier reading

The two faces supply row vectors \((1,1)\) and \((1,-\kappa)\) in physical/nuisance tangent space. Their exterior product has magnitude \(|1+\kappa|\). The Fisher determinant is the squared oriented area, weighted by exposure and \(I_g^2\).

This gives the two-face relational invariant a concrete meaning:

\[
\text{identifiable area}
\propto
\bigl| (1,1)\wedge(1,-\kappa) \bigr|^2.
\]

It is a Gram-determinant statement, not yet a dynamical derivation of the programme's spacetime carrier.

## 5. Stop-everything criteria

Stop claiming reversal-based identification when the calibrated score rows are parallel within uncertainty.

Stop using determinant positivity alone when the Fisher condition number makes the result calibration dominated.

Stop treating the nominal reversal label as evidence for the sign of the observed nuisance score.

Stop the two-face design if realistic additional nuisances reintroduce a null direction containing the CP tangent.

## 6. Highest-value next calculations

1. Propagate uncertainty in \(\kappa\) into CP bias and variance.
2. Add orientation-tag dilution and determine the joint design boundary.
3. Generalize the Gram-area criterion to several faces and nuisance directions.
4. Derive \(\kappa\) from a polarization-reversed helicity amplitude plus detector response.
5. Compare the Fisher Gram determinant with the positive \(H_2(\mathbb R)\) carrier determinant.

## Companion documents

- [Perfect two-face degeneracy breaking](740_two_reversed_measurement_faces_can_break_an_exact_single_face_cp_acceptance_degeneracy.md)
- [Efficient-score identifiability theorem](738_the_efficient_cp_score_is_the_nuisance_orthogonal_jordan_tangent_and_its_schur_complement_is_the_identifiability_test.md)
- [Detector-folding Fisher contraction](739_detector_folding_is_a_positive_markov_compression_that_can_only_contract_cp_fisher_information.md)
