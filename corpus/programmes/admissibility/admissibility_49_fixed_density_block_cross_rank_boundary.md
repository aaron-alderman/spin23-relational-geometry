# Fixed-density block/cross rank boundary

**Date:** 24 October 2026  
**Status:** frequency-integrated rank two supported; low-frequency thermodynamic rank remains open  
**Target:** [FPT-004](../frontier-physics-targets/frontier_physics_target_assessments_v1.md#fpt-004)  
**Parent:** [AZ-048](admissibility_48_matrix_free_fixed_density_moment_convergence.md)  
**Evidence:** [Machine-readable register](../../../evidence/data/admissibility-planckian-fixed-density-block-cross-rank-v1.json)

## Exact finite-frequency pilot

After the finite-q operator gate passed, the balanced 3x3 one-hole sector was materialized exactly. The Hermitian cosine quadratures of the finite-q particle current and centre/endpoint energy currents produce positive 2x2 Lehmann spectra. Across beta=0.5,1,2 and Gaussian broadening 0.15,0.25,0.4, every active bin is rank two. Median normalized determinants lie between 0.575 and 0.688 for the centre gauge and between 0.575 and 0.621 for the endpoint gauge.

This does not establish gauge-independent resolved transport: on 3x3 the full centre/endpoint spectral arrays still differ by 45.5--49.9%. The exact pilot demonstrates that rank two is present, while confirming that the smallest-torus frequency distribution is convention dominated.

## Matrix-free integrated rank scaling

The positive frequency-integrated block is the Hilbert-Schmidt Gram matrix of finite-q particle and energy currents. It is available from the same matrix-free column samples as AZ-048 and therefore scales without diagonalization.

| L | centre normalized determinant | endpoint normalized determinant |
|---:|---:|---:|
| 3 | 0.60291 exact | 0.62948 exact |
| 5 | 0.83876 +/- 0.00514 | 0.83190 +/- 0.00531 |
| 7 | 0.88162 +/- 0.00451 | 0.88098 +/- 0.00451 |
| 9 | 0.91791 +/- 0.00453 | 0.91852 +/- 0.00449 |

An independent 24-column L=9 seed gives 0.92593 and 0.92627. The determinant moves away from zero with size, and the gauge difference becomes smaller than stochastic error. Thus the integrated two-current response is not approaching a scalar ray in this one-hole sequence; it occupies the interior of the positive cone.

## Remaining frontier

The unresolved question is now narrower: does the rank-two integrated weight remain in a controlled low-frequency window as L grows, or is it pushed to finite frequency while the transport window collapses to a ray? Answering that requires a common-sample matrix-free Chebyshev or block-Krylov spectral estimator, with simultaneous size, temperature, frequency-window and broadening convergence. A 3x3 broadened spectrum cannot decide it.

The result is a conventional two-current transport statement. It neither supplies a universal Planckian coefficient nor supports Spin(2,3).

## Continuation and exhaustion

[AZ-050](admissibility_50_frequency_moment_bounds_and_compute_boundary.md) shows that the two generalized RMS frequency scales remain finite rather than sending the second response direction to an ultraviolet scale. It also quantifies why the remaining low-frequency window requires a compiled, symmetry-resolved typicality/KPM implementation beyond the current workspace execution path.
