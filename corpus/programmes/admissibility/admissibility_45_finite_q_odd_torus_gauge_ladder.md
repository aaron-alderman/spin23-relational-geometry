# Finite-q odd-torus gauge ladder

**Date:** 24 October 2026  
**Status:** scalable surrogate supports long-wavelength gauge convergence; production-density confirmation open  
**Target:** [FPT-004](../frontier-physics-targets/frontier_physics_target_assessments_v1.md#fpt-004)  
**Parent:** [AZ-044](admissibility_44_finite_q_energy_continuity_kernel_and_gauge_boundary.md)  
**Evidence:** [Machine-readable execution register](../../../evidence/data/admissibility-planckian-finite-q-gauge-ladder-v1.json)

## Decision

The first exact odd-size ladder is positive. A scalable two-particle spinless surrogate retains periodic fermion hopping, the unchanged two-dimensional Ewald kernel, and the same centre-versus-endpoint energy-density choice. It is not the full t-J production Hilbert space, but it isolates the long-wavelength gauge question without stochastic or Krylov error.

| L | Sites | Basis | q-min | Normalized current-gauge difference |
|---:|---:|---:|---:|---:|
| 3 | 9 | 36 | 2.0944 | 0.30137 |
| 5 | 25 | 300 | 1.2566 | 0.11414 |
| 7 | 49 | 1,176 | 0.8976 | 0.05945 |
| 9 | 81 | 3,240 | 0.6981 | 0.03748 |

The log-log exponent is 1.902. Dividing the normalized difference by (q_{\min}^2) gives 0.0687, 0.0723, 0.0738 and 0.0769. The data therefore support an (O(q^2)) gauge separation over this ladder. Both gauges satisfy their exact continuity equations at or below (1.24\times10^{-14}).

## Implication

The large 3x3 separation in AZ-044 is consistent with a finite-wavevector redistribution effect rather than a persistent bulk ambiguity. This is the first evidence in this lane that centre and endpoint gauges can approach one long-wavelength current despite being very different on the smallest torus.

The result does not yet admit the full response atlas. Fixed two-particle density is a dilute limit, omits spin and exchange, and does not test the near-filled production sector. Nor does it collide screened and unscreened orders of limits. It upgrades thermodynamic gauge convergence from an untested requirement to a supported scaling hypothesis.

## Next admitted tranche

1. reproduce the equal-time normalized moment ladder with source-complete (t,t',J,J',V) local algebra or stochastic traces at fixed density;
2. add a screened reciprocal kernel and compare screening-before-size with size-before-screening;
3. require the fitted gauge-separation exponent to remain positive and the extrapolated intercept to be zero;
4. only then run low-frequency block/cross spectra on the converged current sequence.

## Corpus adjudication

This is useful conventional progress: a previously open gauge limit now has an explicit scaling law and falsifiable production test. It is not evidence for anomalous transport, a universal rank, or Spin(2,3).

## Continuation

[AZ-046](admissibility_46_screened_finite_q_order_of_limits_ladder.md) collides the unscreened path with fixed and size-scaled reciprocal Yukawa screening. All three retain a zero-intercept, approximately quadratic gauge limit on this oracle; source-complete fixed-density moments are now the remaining gate.
