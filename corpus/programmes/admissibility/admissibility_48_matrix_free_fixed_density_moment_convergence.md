# Matrix-free fixed-density moment convergence

**Date:** 24 October 2026  
**Status:** finite-q equal-time operator gate passes; finite-frequency rank scaling admitted  
**Target:** [FPT-004](../frontier-physics-targets/frontier_physics_target_assessments_v1.md#fpt-004)  
**Parent:** [AZ-047](admissibility_47_source_complete_finite_q_gauge_ladder.md)  
**Evidence:** [Machine-readable register](../../../evidence/data/admissibility-planckian-matrix-free-fixed-density-moments-v1.json)

## Decision

The source-complete finite-q current has now crossed the fixed-density wall without enumerating the Hilbert space. A matrix-free estimator samples balanced one-hole computational-basis columns, applies H and h(q) locally, and evaluates the Frobenius moments of -(Hh-hH)/|q|. The common sector dimension cancels from the normalized gauge separation. The operator includes t,t',J,J', neutral two-dimensional Ewald V, no double occupancy, and centre and endpoint energy-density gauges.

| L | balanced-sector dimension | columns | normalized separation | bootstrap s.e. |
|---:|---:|---:|---:|---:|
| 3 | 630 | all 630 | 0.432069 | exact |
| 5 | 67,603,900 | 64 | 0.174489 | 0.001946 |
| 7 | 1,580,132,580,471,900 | 96 | 0.090045 | 0.000979 |
| 9 | 8,708,083,907,400,230,293,391,220 | 64 | 0.052388 | 0.000566 |

The all-size exponent is 1.912 and the L>=5 exponent is 2.043. Separation/q-min-squared is 0.0985, 0.1105, 0.1118 and 0.1075. Independent 64-column seeds give 0.17247 and 0.17332 on L=5, and 0.08934 and 0.08836 on L=7, consistent with their bootstrap uncertainties.

Fixed reciprocal screening mass 0.5 and size-scaled mass q-min give all-size exponents 1.910 and 1.905 and L>=5 exponents 2.045 and 2.044. At L=9 all three routes lie between 0.05226 and 0.05239. No screened or unscreened nonzero gauge intercept is supported.

## What has and has not been admitted

This passes the equal-time operator-convergence gate for the declared one-hole, balanced-spin, neutral-Ewald model. It admits finite-frequency block/cross work beginning with an exact 3x3 reproduction and then a common-sample matrix-free/Krylov extension.

It does not establish low-frequency transport rank. The estimator measures infinite-temperature Hilbert-Schmidt moments, not a thermally weighted spectrum; one-hole density approaches half filling as size grows; and only one screening functional was collided. Any robust-rank or Planckian claim still requires frequency, broadening, temperature and size stability.

This is conventional many-body numerical evidence, not Spin(2,3) evidence.

## Continuation

[AZ-049](admissibility_49_fixed_density_block_cross_rank_boundary.md) admits the block/cross tranche. Exact 3x3 spectra are rank two but gauge-sensitive, while matrix-free integrated determinants converge between gauges and rise above 0.91 through L=9. Only low-frequency thermodynamic rank remains open.
