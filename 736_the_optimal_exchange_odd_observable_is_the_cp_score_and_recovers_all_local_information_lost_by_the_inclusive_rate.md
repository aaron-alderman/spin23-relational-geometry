# The Optimal Exchange-Odd Observable Is the CP Score and Recovers All Local Information Lost by the Inclusive Rate

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09, B11, B13, B14 and the measurement-optimization branch  
**Claim status:** exact local statistical theorem and executable routed-propagator toy; realistic likelihood and nuisance projection remain open  
**Certificate:** [verify_optimal_exchange_odd_score_recovers_pairing_cancelled_cp_information.mjs](scripts/verify_optimal_exchange_odd_score_recovers_pairing_cancelled_cp_information.mjs)

## Executive result

Document 735 showed that pairing exchange can erase a CP-odd differential kernel from an inclusive rate. The statistically optimal way to retain it is not guessed: it is the score of the differential likelihood.

Write a local CP-sensitive intensity as

\[
f(\Phi;\epsilon)=f_0(\Phi)+\epsilon f_1(\Phi)+O(\epsilon^2),
\]

where \(f_0>0\) is the CP-even reference distribution and \(f_1\) is the CP-odd differential response. For any real event weight \(w\), the local squared signal-to-noise functional is

\[
\mathcal R[w]
=\frac{\left(\int d\Phi\,w f_1\right)^2}
{\int d\Phi\,w^2f_0}.
\]

Cauchy–Schwarz gives

\[
\boxed{
\mathcal R[w]\leq
\int d\Phi\,\frac{f_1^2}{f_0}
}
\]

with equality precisely when

\[
\boxed{
w_{\rm opt}(\Phi)\propto\frac{f_1(\Phi)}{f_0(\Phi)}
=\left.\partial_\epsilon\log f(\Phi;\epsilon)\right|_{\epsilon=0}.
}
\]

Thus the optimal weight is the CP score, and the maximum local information is the Fisher integral \(\int f_1^2/f_0\).

## 1. Pairing exchange fixes the parity of the score

Let \(\tau\) be the measure-preserving pairing involution. If

\[
f_0(\tau\Phi)=f_0(\Phi),
\qquad
f_1(\tau\Phi)=-f_1(\Phi),
\]

then

\[
w_{\rm opt}(\tau\Phi)=-w_{\rm opt}(\Phi).
\]

The unweighted rate uses \(w=1\), so \(\int f_1=0\). The optimal weighted response instead equals

\[
\int d\Phi\,w_{\rm opt}f_1
=\int d\Phi\,\frac{f_1^2}{f_0}>0
\]

unless the CP-sensitive kernel vanishes almost everywhere. Pairing cancellation therefore destroys the inclusive first moment, not the differential Fisher information.

## 2. Routed-propagator certificate

Use the exchanged paths

\[
P(x)=\frac{1}{x-a+i\Gamma},
\qquad Q(x)=P(-x),
\]

and define

\[
f_0(x)=|P(x)|^2+|Q(x)|^2,
\qquad
f_1(x)=-4J\operatorname{Im}[P(x)Q(x)^*].
\]

The certificate verifies that:

- \(f_1\) integrates to zero on the symmetric domain;
- the score \(f_1/f_0\) is exactly exchange odd;
- its weighted signal and variance both equal the Fisher integral;
- a crude sign weight works but has lower statistical efficiency;
- and a finite local deformation \(f_0+\epsilon f_1\) remains positive for the tested parameters.

## 3. Jordan-carrier interpretation

At each phase-space point the two coherent paths define a positive \(H_2(\mathbb R)\) Gram carrier. Pairing exchange reverses its odd coordinate. Inclusive summation applies an even functional and deletes that coordinate.

The score is the dual measurement direction matched to the local odd tangent of the probability cone. It does not add a new physical phase; it reads out, with maximum local efficiency, the relational orientation already present in the differential carrier.

This supplies a precise statistical meaning for “selection by measurement”:

\[
\text{odd carrier tangent}
\longrightarrow
\text{likelihood score}
\longrightarrow
\text{maximal retained local information}.
\]

## 4. What this does not establish

The theorem does not prove that a realistic Standard Model process has nonzero \(f_1\). It assumes the coherent quartet, its relative kinematic phase and its differential kernel have survived the amplitude calculation.

Nor is the raw score automatically optimal after experimental complications. If the likelihood contains nuisance parameters \(\eta_a\), the physically useful weight is the efficient score obtained by subtracting the projection of the CP score onto the nuisance-score span. Acceptance, resolution and missing momenta must be included in the observed likelihood before that projection.

## 5. Stop-everything criteria

Stop the collider realization if the complete accepted differential kernel satisfies \(f_1=0\) almost everywhere.

Stop calling a sign weight optimal unless it is proportional to \(f_1/f_0\), or its efficiency loss has been quantified.

Stop using a parton-level score after detector folding if the folding changes the conditional likelihood materially.

Stop interpreting Fisher information as an expected discovery without specifying luminosity, backgrounds, nuisance parameters and reconstructibility.

## 6. Highest-value next calculations

1. Add a spin-density matrix and determine whether spin sums kill or rotate the odd kernel.
2. Promote the one-dimensional toy to a normalized differential likelihood with backgrounds.
3. Derive the efficient score in the presence of width, normalization and acceptance nuisances.
4. Compare resolved, partially reconstructed and inclusive Fisher information.
5. Search explicit LNV decay chains for a reconstructible exchange orientation.

## Companion documents

- [Pairing-exchange cancellation and signed recovery](735_pairing_exchange_can_cancel_the_inclusive_majorana_quartet_asymmetry_while_a_signed_differential_moment_restores_it.md)
- [Four-mode Pfaffian interference](734_the_four_mode_majorana_pfaffian_contains_the_quartet_interference_but_a_cp_rate_asymmetry_needs_a_relative_kinematic_phase.md)
- [Positive two-copy LNV interferometer](733_a_two_copy_lnv_interferometer_embeds_the_minimal_majorana_cp_quartet_in_a_positive_h2r_carrier.md)
