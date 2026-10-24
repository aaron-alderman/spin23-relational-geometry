# Planckian two-current execution and convention boundary

**Date:** 24 October 2026  
**Status:** AZ-040 executed through adjudication; useful numerical extension; physical rank unresolved  
**Target:** [FPT-004](../frontier-physics-targets/frontier_physics_target_assessments_v1.md#fpt-004)  
**Parent:** [AZ-040 execution tranches](admissibility_40_planckian_two_current_execution_tranches_and_literature_review.md)  
**Evidence:** [Execution register](../../../evidence/data/admissibility-planckian-two-current-execution-v1.json)

## Result

The production-source bottleneck has been removed, and the result stops at the next honest boundary. The two-dimensional Planckian-tJ builder now preserves one sparse contribution and a stable descriptor for every hopping, exchange, Ewald pair and Ewald self-image term before coalescence. On the source-native 3x3, two-particle sector, 117 tagged terms reconstruct the legacy 72-dimensional Hamiltonian to (3.04\times10^{-16}), with zero Hermiticity residual. The 2x2 sector reconstructs equally well but contains 38 antipodal descriptors and is retained as a negative convention control rather than silently oriented.

The physical energy current is integrated into the existing scalar operator selector as `energy_physical` and `sum_physical`, and a companion common-sample Krylov estimator retains the full complex particle/energy cross spectrum. All 33 tests pass. This is a real implementation result. It is not yet a production-scale transport conclusion.

## Tranche adjudication

| Tranche | Result | Consequence |
|---|---|---|
| T0 | Pass | The AZ-039 oracle and source hashes are frozen and reproducible. |
| T1 | Pass on source-native small clusters | Production provenance is no longer destroyed during assembly. |
| T2 | Quarantine reached | On odd 3x3, (J_{\rm seam}=J_{\rm min}+J_{\rm winding}) closes to (9.34\times10^{-15}); 2x2 antipodal pairs are rejected. Ewald thermodynamic equivalence is not established. |
| T3 | Admission-cluster pass | At full 72-state Krylov depth, common-sample spectra approach exact diagonalization; the physical operator can be carried by the spectral machinery. |
| T4 | Provisional small-cluster mask | Depth 18 and 36 retain 72% and 31--35% spectral bias. A held-out 32-vector run reaches 10.2% error. A 128-vector held-out run gives 2.08% spectral, 2.10% moment and 1.33% partition error. No production-size mask is claimed. |
| T5 | Unresolved | Exact spectra contain ray, boundary and cone-interior bins, but their populations move strongly with periodic convention. |
| T6 | Algebraic pass; material claim withheld | The heat-current congruence, reduced Seebeck response and open-circuit Schur complement are implemented and preserve determinant/rank as required. |
| T7 | Useful numerical extension | The implementation is valuable; the physical rank and any corpus-specific interpretation remain unadmitted. |

## What the rank atlas actually says

At the original exploratory point ((\beta,\eta)=(0.7,0.12)), all three resolved current conventions produce positive-semidefinite response matrices and some cone-interior bins. Their median normalized determinants differ by almost an order of magnitude: (9.95\times10^{-4}) for minimum image, (9.59\times10^{-3}) for the oriented seam and (6.77\times10^{-3}) for the winding/twist candidate. This already shows that “rank two occurs somewhere” is more stable than its frequency-resolved magnitude, but it is not enough to declare a physical atlas.

After fixing exploratory class thresholds—ray at (\det C/(\operatorname{tr}C)^2\le10^{-4}), interior at (\ge10^{-2})—a held-out ((\beta,\eta)=(1.1,0.08)) run made the obstruction unmistakable:

| Convention | Active bins | Ray | Boundary | Interior |
|---|---:|---:|---:|---:|
| minimum image | 175 | 93 | 69 | 13 |
| oriented seam | 320 | 84 | 93 | 143 |
| winding/twist candidate | 293 | 69 | 122 | 102 |

These are not small numerical shifts. Convention systematic error dominates the proposed rank class. T5 therefore terminates in `unresolved`, exactly as the AZ-040 failure branch required.

## Estimator implication

The depth scan separates two errors that are otherwise easy to confuse. Increasing random-vector count improves stochastic trace error, but cannot repair an insufficient Krylov space: depth 18 remains near 72% spectral error and depth 36 near 30--35%. Full depth removes the projection bias on this oracle, after which sample-to-sample error is visible directly. The 32-vector tier is not uniformly admitted; the 128-vector held-out check passes the provisional 5% thresholds, but one seed on one 72-state sector is not a scalable validity theorem.

The practical next estimator change is therefore a native block/cross Krylov routine with bootstrap intervals, not three independently seeded scalar runs. Production scans must add size, filling, twist, temperature, bin-width and broadening axes and must leave failed pixels blank.

## Thermoelectric implication

The transformation (J_Q=J_E-\mu J_N) is an invertible congruence, so it preserves response rank and changes the determinant only by the squared determinant of the basis map, which is one here. In the declared reduced convention,

\[
S=\frac{L_{NQ}}{qT L_{NN}},\qquad
\kappa_{\rm open}=\frac{L_{QQ}-L_{QN}L_{NN}^{-1}L_{NQ}}{T}.
\]

The code now performs this translation and verifies the Schur identity. Because the input current remains convention-sensitive, no material Seebeck or thermal-conductivity number is admitted. Transverse Nernst and thermal-Hall response remain outside this result because magnetization-current subtraction has not been implemented.

## Frontier decision

The closest non-experimental bridge has yielded something useful: a source-channel-complete physical-energy-current implementation, exact production-cluster oracles, a common-sample complex response estimator and a quantified demonstration of where the inference fails. The failure is not positivity, continuity or FTLM carriage. It is the physical identification of energy transport on the finite periodic long-range Hamiltonian.

The reopening packet below was executed in [AZ-042](admissibility_42_ewald_image_cohomology_and_block_cross_boundary.md), which separates seam and minimum-image currents into exact and cycle graph sectors, closes image provenance, and finds the reciprocal thermal-twist compensator still missing:

1. implement an explicit image-resolved Ewald energy density and an independent thermal-twist derivative;
2. prove or numerically bound their difference as a total derivative/circulating current in longitudinal zero-frequency transport;
3. implement native block FTLM cross correlation with common samples and bootstrap uncertainty;
4. repeat the held-out rank atlas across size and broadening inside a preregistered validity mask; and
5. only then translate stable longitudinal coefficients to Seebeck and open-circuit thermal response.

The adjudication is **useful numerical extension, physical rank unresolved**. The response cone remains a productive diagnostic language, but positivity, a Lorentz determinant and mixed ray/interior bins do not establish Spin(2,3) symmetry. A corpus-specific promotion would require a source-derived transformation law or a held-out prediction not supplied by ordinary Kubo, continuity and finite-size transport theory.
