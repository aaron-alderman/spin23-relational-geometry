# Ewald image cohomology and block-cross boundary

**Date:** 24 October 2026  
**Status:** reopening packet executed; Ewald image provenance closed; reciprocal thermal twist open  
**Target:** [FPT-004](../frontier-physics-targets/frontier_physics_target_assessments_v1.md#fpt-004)  
**Parent:** [AZ-041](admissibility_41_planckian_two_current_execution_and_convention_boundary.md)  
**Evidence:** [Machine-readable execution register](../../../evidence/data/admissibility-planckian-ewald-cohomology-block-cross-v1.json)
**Continuation:** [AZ-043](admissibility_43_coulomb_twist_differentiability_and_finite_q_boundary.md) derives the Poisson reciprocal term, validates it on a convergent control and finds that the production Coulomb zero mode has no uniform twist derivative.

## Decision

The periodic-convention collision is not merely three competing choices. It has an exact/cohomological decomposition. On the 117-vertex production term graph there are 1,332 noncommuting edges and cycle rank 1,216. With the declared unweighted edge inner product, the oriented-seam displacement field lies in the graph-coboundary subspace to (2.57\times10^{-15}) and its operator equals (i[H,P_E]) to (3.08\times10^{-16}). The minimum-image field has unit relative distance from that subspace: it is entirely in the complementary cycle sector on this oracle.

This corrects the earlier naming. In

\[
J_{\rm seam}=J_{\rm minimum}+J_{\rm winding},
\]

the seam current is the bounded-polarization derivative, the minimum-image current carries the finite-torus transport/cohomology candidate, and `winding_twist` is historically named but is only their correction. It is not an independently derived thermal twist.

The exact degenerate-energy blocks confirm the distinction. The seam block has norm (2.08\times10^{-14}), while the minimum-image block has norm (30.8304); their difference has the same norm. This is expected for a total derivative versus a topological current on a finite periodic system. It does not yet prove that the minimum-image representative is the unique thermodynamic heat current, but it rejects treating the seam spectrum as an equal physical alternative.

## Image-resolved Ewald audit

The production Ewald kernel is now expanded into a ledger containing every reciprocal mode, real-space image, reference-image subtraction, zero-class reset and neutralizing-background shift. On 3x3 it contains 3,267 components and reconstructs the source kernel to (1.11\times10^{-16}), with internal component closure at (8.33\times10^{-17}).

The decisive test varies the arbitrary Ewald splitting parameter while increasing the replica cutoff. The total kernel remains unchanged from zero to (2.72\times10^{-16}). The first winding moment of the real-image branch alone moves by 0.507 and 0.358. Therefore a phase or thermal twist applied only to real images is representation-dependent and inadmissible. The missing reciprocal-space contribution is not optional bookkeeping; it is the compensator required to make the flux independent of how the same interaction was divided between real and reciprocal space.

This result matches the external control literature. Petravic derives a reciprocal-space Ewald contribution to the molecular heat flux. Galamba, Nieto de Castro and Ely state more sharply that reciprocal Ewald forces are not pairwise additive and that the corresponding energy-flux term must be evaluated in reciprocal space. Ballenegger's derivation separately emphasizes the real/reciprocal split and surface term. These classical Coulomb formulas cannot be copied into the quantum t-J operator, but they establish the structural control: a real-image-only flux is incomplete. [Petravic 2005](https://doi.org/10.1063/1.2102867), [Galamba et al. 2007](https://doi.org/10.1063/1.2734965), [Ballenegger 2014](https://doi.org/10.1063/1.4872019).

## Native block/cross estimator

The estimator branch advanced independently. A native shared block Krylov space is seeded by (|r\rangle), (J_N|r\rangle) and (J_E|r\rangle), and evaluates the complex cross spectrum directly rather than reconstructing it from separately sampled scalar runs.

| Total projected depth | Scalar spectral error | Block/cross spectral error | Scalar moment error | Block/cross moment error |
|---:|---:|---:|---:|---:|
| 18 | 72.1% | 44.6% | 72.0% | 32.6% |
| 36 | 35.0% | 24.7% | 36.2% | 18.3% |
| 72, 64 vectors | 4.04% | 3.39% | 3.57% | 2.82% |

The block construction materially improves response convergence because it includes current-excited directions that a Hamiltonian-only Krylov space can miss. It does not rescue shallow depth: neither 18 nor 36 passes the five-percent admission threshold. At full depth its spectrum, moment and partition errors are 3.39%, 2.82% and 3.20%, its invariance residual is (9.47\times10^{-16}), and the spectral matrix remains positive semidefinite up to roundoff.

## Implication for the rank atlas

No new rank or thermoelectric atlas is admitted in this packet. The estimator carrier is ready on the admission cluster, and the minimum/seam distinction is now typed, but the quantum reciprocal-space thermal-twist compensator has not been derived. Rerunning a large parameter scan would turn an operator-definition hole into false precision.

The shortest reopening calculation is now narrower than AZ-041:

1. express the full finite-torus density interaction in reciprocal density modes;
2. couple the reciprocal branch to a declared gravitational/energy twist and differentiate it;
3. show cancellation of the Ewald-splitting dependence against the real-image branch;
4. compare the resulting operator's graph-cohomology class and degenerate block with the minimum-image candidate; and
5. only if those agree, run the block/cross estimator and rank atlas beyond the oracle.

## Corpus adjudication

The appearance of an exact-versus-cycle decomposition is a genuine structural gain: dynamics on the finite term graph separates into bounded polarization motion and noncontractible transport. It is also conventional periodic transport mathematics. It supports the corpus's insistence that topology changes what is admissible, but it is not evidence for a microscopic Spin(2,3) symmetry. The positive (2\times2) response cone remains the measurement geometry after a current is admitted; it cannot admit the current by itself.
