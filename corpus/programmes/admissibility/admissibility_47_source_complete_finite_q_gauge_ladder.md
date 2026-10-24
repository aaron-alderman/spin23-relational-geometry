# Source-complete finite-q gauge ladder

**Date:** 24 October 2026  
**Status:** all audited source families converge on an exact dilute ladder; fixed-density gate remains  
**Target:** [FPT-004](../frontier-physics-targets/frontier_physics_target_assessments_v1.md#fpt-004)  
**Parent:** [AZ-046](admissibility_46_screened_finite_q_order_of_limits_ladder.md)  
**Evidence:** [Machine-readable register](../../../evidence/data/admissibility-planckian-source-complete-finite-q-ladder-v1.json)

## Decision

The exact odd-torus oracle now includes spin, no double occupancy, nearest and diagonal hopping, nearest and diagonal exchange, and the two-dimensional Ewald density interaction: all five audited production families (t,t',J,J',V). This removes omitted source channels as an explanation for the earlier spinless convergence while retaining an exactly evaluated two-particle sector.

| L | basis | normalized centre/endpoint separation |
|---:|---:|---:|
| 3 | 144 | 0.274707 |
| 5 | 1,200 | 0.137805 |
| 7 | 4,704 | 0.070890 |
| 9 | 12,960 | 0.043826 |
| 11 | 29,040 | 0.030447 |

The all-size power-law exponent is 1.718. More importantly, the L>=5 exponent is 1.919 and the separation divided by q-min squared is 0.0873, 0.0880, 0.0899 and 0.0933. The source-complete dilute sequence therefore approaches the same quadratic long-wavelength law after a stronger L=3 crossover. Exact continuity residuals remain below 3.4e-14.

Repeating L=3,5,7,9 with fixed reciprocal Yukawa mass 0.5 and with mass equal to q-min gives exponents 1.687 and 1.698, versus 1.675 unscreened on the same four sizes. At L=9 their normalized separations differ from unscreened by only 1.44% and 2.10%.

## Boundary now isolated

Channel completeness and the tested screening paths no longer form the immediate obstruction. Particle density does. At fixed production-like density the projected Hilbert space grows exponentially; for one hole on N sites its dimension is N times 2^(N-1). The next admitted calculation must therefore be a source-complete matrix-free stochastic trace or a linked/local-algebra evaluation of equal-time moments. It must reproduce exact 3x3 results before extrapolating any larger odd cluster.

Low-frequency spectra, determinant rank and Planckian interpretation remain withheld. This is a conventional gauge-convergence result, not Spin(2,3) evidence.

## Continuation

[AZ-048](admissibility_48_matrix_free_fixed_density_moment_convergence.md) crosses the density wall with matrix-free one-hole moments through L=9. Unscreened and both screened paths share an approximately q-min-squared limit, admitting finite-frequency block/cross work while leaving thermodynamic rank open.
