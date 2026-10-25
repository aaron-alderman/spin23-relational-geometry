# Frontier Wave 7.173: Leech Hardware-Basis Pareto Frontier

**Date:** 25 October 2026

**Status:** finite-scan engineering frontier; platform cost dictionary open

**Evidence:** [Pareto frontier record](../../../../evidence/data/leech-hardware-basis-pareto-frontier-v1.json)

**Certificate:** [nondominance and tolerance verifier](../../../../verification/verify/verify_leech_hardware_basis_pareto_frontier.mjs)

## There is no platform-independent winning basis

The 3000-candidate Wave 7.172 scan was re-read as a three-objective hardware
search: condition number, transformed-Gram pair count and integral-transform
entry count. Four useful, mutually nondominated designs remain below condition
number 1000:

| design | (kappa_2) | nonzero Gram pairs | nonzero transform entries | largest transform entry |
|---|---:|---:|---:|---:|
| precision-first | 740.225 | 195 | 160 | 7 |
| transform-first | 916.479 | 200 | 143 | 7 |
| Gram-first | 953.032 | 179 | 184 | 8 |
| coordinate-small-entry | 954.159 | 182 | 165 | 6 |

All four improve the catalogue-basis conditioning by more than a factor of
33. Their sufficient one-percent worst-case inverse tolerances lie between
(1.04	imes10^{-5}) and (1.34	imes10^{-5}).

## The missing dictionary is now empirical

Choosing among them requires four platform measurements:

1. the calibrated 24-port admittance error covariance;
2. loss and bandwidth cost per nonzero transformer coefficient;
3. layout or control cost per nonzero Gram pair; and
4. the fabrication penalty for the largest signed turns or parametric-coupling
   ratio.

If calibration precision is binding, use the precision-first basis. If the
integral mixer dominates, use transform-first. If pair routing dominates, use
Gram-first. If the largest integral coordinate-map coefficient dominates, use
coordinate-small-entry. This last quantity is not yet the physical (LDL^T)
transformer turns ratio; Wave 7.174 performs that synthesis. A
universal selection before those measurements would replace physics with an
unstated engineering preference.

## Implication for the Monster claim

The Leech carrier no longer lacks a finite set of quantitative hardware
coordinates. What remains is platform identification and measurement. This
is progress toward Gate A, not evidence that a device has passed it. The
Monster-specific orbifold, defect and Griess gates remain downstream and must
be tested on the same selected carrier.

## Boundary

Nondominance is relative to the declared finite scan and three recorded
objectives, not all of (GL(24,mathbb Z)) or every fabrication cost. The
shortlist does not establish a planar realization, noise tolerance or an
infrared Leech edge.

## Corpus links

- [Integral hardware-basis search](frontier_wave7_172_leech_integral_hardware_basis_search.md)
- [Conditioning and tolerance audit](frontier_wave7_171_leech_transformer_conditioning_tolerance.md)
- [Exact transformer recovery](frontier_wave7_170_leech_transformer_capacitance_recovery.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
- [Pareto transformer-factor audit](frontier_wave7_174_leech_pareto_transformer_factor_audit.md)
