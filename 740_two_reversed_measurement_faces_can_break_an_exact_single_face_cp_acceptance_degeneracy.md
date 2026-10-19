# Two Reversed Measurement Faces Can Break an Exact Single-Face CP–Acceptance Degeneracy

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09, B11, B13, B14 and the multi-face-identifiability branch  
**Claim status:** exact two-channel Fisher theorem and executable certificate; physical reversal assignment remains open  
**Certificate:** [verify_two_reversed_channels_break_single_channel_cp_acceptance_degeneracy.mjs](scripts/verify_two_reversed_channels_break_single_channel_cp_acceptance_degeneracy.mjs)

## Executive result

Two measurements can each be unable to distinguish CP from acceptance and yet become fully identifying when combined.

Let \(g(x)\) be an odd score shape. Suppose two controlled measurement faces have score pairs

\[
\begin{array}{c|cc}
&s_{CP}&s_A\\ \hline
+&g&g\\
-&g&-g
\end{array}
\]

where the physical CP direction is aligned between channels while the instrumental acceptance direction reverses.

Each channel alone has a rank-one Fisher matrix. Its efficient CP information is zero because \(s_{CP}\) lies in the nuisance span.

With exposures \(L_+>0\) and \(L_->0\), however, the joint Fisher determinant is

\[
\boxed{
\det I=4I_g^2L_+L_->0,
}
\]

where \(I_g=\langle g,g\rangle\). The profiled CP information becomes

\[
\boxed{
I_{CP}^{\rm eff}
=\frac{4I_gL_+L_-}{L_++L_-}.
}
\]

Balanced exposures make the two joint tangents orthogonal and retain all of the joint raw CP information.

## 1. Why the degeneracy breaks

In the direct-sum channel space, the two tangent vectors are

\[
s_{CP}^{\oplus}=(g,g),
\qquad
s_A^{\oplus}=(g,-g).
\]

They are linearly independent as soon as both faces are observed. Equal exposure makes them orthogonal.

The escape is not “more events” in the same face. It is a second orientation in which the nuisance and physical transformations differ.

## 2. Candidate physical realizations

Possible reversal controls include:

- opposite beam or parent polarization;
- magnet-polarity reversal;
- detector-arm interchange;
- charge-conjugate control samples with a CP-aligned kinematic convention;
- or complementary pairing-orientation tags.

None may be assumed to realize the score table. The complete amplitude, detector response and CP transformation must demonstrate that the CP score is common while the selected nuisance score reverses.

## 3. Exposure imbalance

The retained fraction of joint raw CP information is

\[
\frac{I_{CP}^{\rm eff}}{I_{CP,CP}}
=\frac{4L_+L_-}{(L_++L_-)^2}.
\]

It equals one for balanced exposure and tends to zero when either face disappears. This supplies a direct design rule: orientation balance is part of identifiability, not merely systematic convenience.

## 4. Relational and Jordan interpretation

One face sees only the sum of two coincident tangent directions. The reversed face changes the gluing sign of the nuisance direction while preserving the physical direction. Their direct sum separates the relational axes.

This is a concrete multi-face gluing rule:

\[
\text{common direction}=(g,g),
\qquad
\text{reversing direction}=(g,-g).
\]

It resembles an even/odd decomposition under a two-face involution. It is not yet a derivation of \(Spin(2,3)\), but it shows how a symmetry action on measurement faces can make a previously quotient-killed coordinate observable.

## 5. Stop-everything criteria

Stop claiming degeneracy breaking unless the two score vectors are linearly independent after detector folding.

Stop treating a duplicated sample with the same nuisance transformation as a second face; it only adds exposure to the same rank-one geometry.

Stop assuming polarization or magnet reversal flips the nuisance but not CP without deriving the transformation.

Stop using the balanced-exposure result if cross-channel nuisance correlations introduce additional common odd directions.

## 6. Highest-value next calculations

1. Derive the sign table for a concrete polarization-reversed LNV amplitude and detector geometry.
2. Generalize to several nuisance scores and compute the minimum number of faces required for full rank.
3. Include imperfect reversal and determine the condition number of the Fisher matrix.
4. Combine channel reversal with finite orientation-tag fidelity.
5. Test whether the even/odd direct-sum decomposition matches the programme's two-face carrier construction.

## Companion documents

- [Efficient-score identifiability theorem](738_the_efficient_cp_score_is_the_nuisance_orthogonal_jordan_tangent_and_its_schur_complement_is_the_identifiability_test.md)
- [Detector-folding Fisher contraction](739_detector_folding_is_a_positive_markov_compression_that_can_only_contract_cp_fisher_information.md)
- [Spin-trace erasure and polarization recovery](737_an_unpolarized_spin_trace_can_erase_the_majorana_quartet_interference_while_polarization_restores_it_unless_the_paths_are_operator_orthogonal.md)
