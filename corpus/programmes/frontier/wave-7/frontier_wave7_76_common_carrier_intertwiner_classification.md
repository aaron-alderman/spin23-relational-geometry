# Frontier Wave 7.76: Common-Carrier Intertwiner Classification

**Date:** 25 October 2026  
**Status:** exact no-go for the naive endpoint actions; minimal representation repair classified  
**Ledger:** [post-Q programme](post_q_five_option_programme_v1.json)  
**Certificate:** [intertwiner verifier](../../../../verification/verify/verify_common_carrier_intertwiner_options.mjs)

## Result

The selector-derived two- and three-sectors do not carry the naive endpoint
representations assumed in the first rectangular comparison.

On the two-sector, the selector fingerprints are

\[
R_2:(\operatorname{tr},\det,\operatorname{ord})=(-1,1,3),
\qquad H_2=-I_2.
\]

Thus the order-two operation is a central parity. It is not the reflection of
the standard two-dimensional \(S_3\) representation.

On the three-sector,

\[
R_3:(0,1,3),
\qquad H_3:(-1,1,2).
\]

This is the sign-twisted permutation representation

\[
\operatorname{sgn}\oplus A_2,
\]

not the untwisted environmental representation

\[
\mathbf1\oplus A_2.
\]

## Naive endpoint no-go

For the two-sector, the Hom-space between the standard \(S_3\) doublet and
the selector representation has dimension zero. For the three-sector, the
untwisted and sign-twisted permutation representations share only their
two-dimensional standard summand:

\[
\dim\operatorname{Hom}=1,
\qquad \max\operatorname{rank}=2.
\]

Consequently no invertible five-carrier intertwiner exists for the naive
authored endpoint actions.

## Minimal representation repair

An invertible block transport becomes possible if the channel endpoints
physically realize:

1. the central parity \(-I_2\) on the two-sector; and
2. odd parity on the three-sector singlet, changing
   \(\mathbf1\oplus A_2\) to \(\operatorname{sgn}\oplus A_2\).

After this repair, both endpoint Hom-spaces have dimension two. Metric
normalization reduces the remaining continuous freedom to an \(SO(2)\) phase
on the two-sector, with discrete signs on the two irreducible three-sector
summands.

This is a precise candidate, not a derivation: the extra parity assignments
must come from a response, boundary or time-reversal operation.

## Implication

The earlier endpoint mismatch was not generic basis ambiguity. It is a parity
mismatch visible in traces and determinants. A calibration can therefore
falsify the bridge without reconstructing every matrix entry.

