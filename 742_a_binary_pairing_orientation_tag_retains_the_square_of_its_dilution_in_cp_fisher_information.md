# A Binary Pairing-Orientation Tag Retains the Square of Its Dilution in CP Fisher Information

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09, B11, B13, B14 and the orientation-tag branch  
**Claim status:** exact binary-channel theorem and executable fidelity sweep; process-specific tagger remains open  
**Certificate:** [verify_binary_orientation_tag_dilutes_odd_cp_fisher_information_quadratically.mjs](scripts/verify_binary_orientation_tag_dilutes_odd_cp_fisher_information_quadratically.mjs)

## Executive result

If the CP score is odd under a true pairing orientation \(Z=\pm1\), a binary observed tag \(T\) with fidelity

\[
\Pr(T=Z)=r,
\qquad
\Pr(T=-Z)=1-r
\]

has dilution

\[
D=2r-1.
\]

For a balanced prior on the two orientations and an otherwise perfectly reconstructed magnitude variable \(u\), let

\[
s_{\rm latent}(Z,u)=Z h(u).
\]

Conditional expectation gives

\[
\boxed{
s_{\rm obs}(T,u)=DT h(u)
}
\]

and therefore

\[
\boxed{
I_{\rm obs}=D^2I_{\rm latent}=(2r-1)^2I_{\rm latent}.
}
\]

Orientation mistagging costs information quadratically.

## 1. Fidelity thresholds

For a better-than-random tag \(r\geq1/2\), retaining a target fraction \(q\) requires

\[
\boxed{
r\geq\frac{1+\sqrt q}{2}.
}
\]

Examples:

- retaining 50% requires \(r\geq0.8536\);
- retaining 90% requires \(r\geq0.9743\);
- retaining 99% requires \(r\geq0.9975\).

A superficially respectable 90% tag retains only 64% of the orientation information.

## 2. Random tags and anti-tags

At \(r=1/2\), \(D=0\): the observed tag is independent of orientation and all exchange-odd information vanishes.

At \(r=0\), the tag is always wrong but perfectly invertible. Its dilution is \(-1\), so it retains all information after the sign convention is corrected. The relevant quantity is calibrated correlation, not raw classification accuracy.

## 3. Calibration degeneracy

At leading order the observed CP deformation is proportional to \(D\epsilon\), where \(\epsilon\) is the physical CP amplitude. If \(D\) is unconstrained, the signal sample measures only their product.

Thus tag dilution must be calibrated independently or constrained jointly by control data. A wrong sign for \(D\) reverses the inferred CP sign; uncertainty near \(D=0\) makes the amplitude effectively unidentifiable.

## 4. Positive-channel interpretation

The binary mistag matrix is

\[
R=
\begin{pmatrix}
r&1-r\\
1-r&r
\end{pmatrix}.
\]

Its even eigenvector has eigenvalue one and its odd eigenvector has eigenvalue \(D\). Fisher information is quadratic in the odd tangent, producing \(D^2\).

This is an exact two-face spectral statement: the observation channel preserves the carrier coordinate and contracts the relational orientation coordinate.

## 5. Stop-everything criteria

Stop the orientation-tag branch if calibrated \(|D|\) is consistent with zero at the required precision.

Stop quoting classification accuracy without converting it to odd-mode dilution and Fisher retention.

Stop fitting the CP amplitude and an unconstrained common dilution using only their product-sensitive signal sample.

Stop treating a below-random tag as useless before checking whether it is a stable invertible anti-tag.

## 6. Highest-value next calculations

1. Combine \(D^2\) dilution with imperfect face reversal and exposure imbalance.
2. Allow kinematics-dependent fidelity \(D(u)\) and derive the optimal calibrated score.
3. Include asymmetric mistag probabilities and orientation-prior imbalance.
4. Propagate tag-calibration uncertainty into CP bias and profiled information.
5. Design a physical orientation tag for an explicit LNV topology.

## Companion documents

- [Detector-folding Fisher contraction](739_detector_folding_is_a_positive_markov_compression_that_can_only_contract_cp_fisher_information.md)
- [Two-face degeneracy breaking](740_two_reversed_measurement_faces_can_break_an_exact_single_face_cp_acceptance_degeneracy.md)
- [Imperfect reversal and conditioning](741_imperfect_face_reversal_remains_identifying_except_at_the_same_sign_boundary_but_can_be_arbitrarily_ill_conditioned.md)
