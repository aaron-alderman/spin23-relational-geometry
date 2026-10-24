# Frontier Wave 7.26: Minimal Unimodular Detector Schedule and the Index-Eight False Lead

**Date:** 24 October 2026  
**Status:** exact minimal schedule; conditioning is best sampled, not globally optimized  
**Schedule:** [relation minimal detector schedule v1](relation_minimal_detector_schedule_v1.json)  
**Verifiers:** [basis search and challenge](../../../../verification/verify/verify_relation_minimal_detector_basis.mjs) and [frozen schedule audit](../../../../verification/verify/verify_relation_minimal_detector_schedule.mjs)

## Result

The directed relation emulator needs exactly 24 independent scalar channels to reconstruct its 24 backbone amplitudes. Composition observables span only rank 23 and have the single kernel `QR-003`; consequently no composition-only schedule can suffice. Twenty-three independent path/triangle channels plus the direct `QR-003` channel are both necessary and sufficient.

A deterministic search of the 57 formal composition rows found one identically zero row, `path_probe:QR-003`, and 56 nonzero candidates. These contain a unimodular response basis:

\[
\boxed{|\det R|=1,\qquad \operatorname{rank}R=24.}
\]

Therefore the relation amplitudes can be reconstructed by an integer inverse. No fractional denominator, finite-index completion or detector-side glue is required.

## Minimal acquisition schedule

Acquire the following 23 composition channels, then the direct wall channel.

| order | channel |
|---:|---|
| 1 | `path_probe:QR-020` |
| 2 | `triangle_pair:QR-023*QR-027` |
| 3 | `triangle_pair:QR-019*QR-023` |
| 4 | `triangle_pair:QR-018*QR-019` |
| 5 | `triangle_pair:QR-021*QR-024` |
| 6 | `triangle_pair:QR-016*QR-018` |
| 7 | `path_probe:QR-006` |
| 8 | `triangle_pair:QR-014*QR-015` |
| 9 | `triangle_pair:QR-021*QR-023` |
| 10 | `triangle_pair:QR-009*QR-015` |
| 11 | `path_probe:QR-005` |
| 12 | `path_probe:QR-027` |
| 13 | `triangle_pair:QR-012*QR-016` |
| 14 | `path_probe:QR-008` |
| 15 | `triangle_pair:QR-022*QR-024` |
| 16 | `triangle_pair:QR-009*QR-011` |
| 17 | `path_probe:QR-009` |
| 18 | `triangle_pair:QR-006*QR-009` |
| 19 | `path_probe:QR-026` |
| 20 | `triangle_pair:QR-015*QR-016` |
| 21 | `path_probe:QR-007` |
| 22 | `triangle_pair:QR-008*QR-009` |
| 23 | `path_probe:QR-025` |
| 24 | `direct:QR-003` |

This is nine path channels, fourteen triangle channels and one direct channel. Its singular values satisfy

\[
\sigma_{\min}=0.32844972406400064,
\qquad
\sigma_{\max}=3.044605998223162,
\qquad
\kappa_2(R)=9.269625684416468.
\]

The schedule is the best-conditioned unimodular basis encountered among 500 deterministic shuffled greedy bases. That is a reproducible construction, not a proof of global condition-number optimality.

## The determinant-eight false lead

Row-pivoted Gram--Schmidt followed by local maximum-volume swaps produced a natural-looking first basis with

\[
|\det R_{\mathrm{seed}}|=8.
\]

Because wave 7.21 independently found an index-eight overlattice in the five-type path pairing, the numerical recurrence was a plausible signal. It does not survive the admissibility test. Across 500 alternative minimal bases, absolute determinants 1 and 2 occur and their gcd is 1. The detector response lattice is already saturated.

Thus:

- the index eight in wave 7.21 remains an exact invariant of the five-type integral pairing and its discriminant glue;
- the determinant eight of the first detector basis is only a coordinate volume;
- there is no justified bridge equating the two;
- the failed coincidence is retained because it marks precisely where arithmetic resemblance ceases to be structure.

This is the intended behavior of the admissibility programme: a promising repeated number is allowed to nominate a test, but not to survive as ontology after a basis-independent challenge fails.

## Experimental use

The schedule reduces the full 324-row composition stack to the minimum 23 composition records without losing any visible relation direction. The 24th direct record measures the otherwise invisible wall amplitude. In practice:

1. calibrate all directed links, reverse leakage and direct pickup;
2. acquire the nine two-tone path derivatives;
3. acquire the fourteen polarized triangle derivatives;
4. acquire `direct:QR-003` independently;
5. solve the integral linear system and propagate complex measurement covariance through the same inverse;
6. compare redundant withheld channels from the 33 unused candidates against the reconstruction as out-of-sample graph checks.

The last step matters: minimality economizes acquisition, while withheld channels test whether the device implements the declared relation graph rather than merely fitting 24 numbers.

## Boundary

Unimodularity is a reconstruction result, not evidence for a fundamental lattice, exceptional symmetry or `Spin(2,3)` carrier. The schedule validates the formal graph-to-observable map if implemented. Promotion to physics still requires a source-derived observable dictionary and action.
