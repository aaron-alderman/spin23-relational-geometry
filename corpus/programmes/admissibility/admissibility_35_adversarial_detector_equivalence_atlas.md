# Adversarial detector-equivalence atlas

**Date:** 24 October 2026  
**Status:** exact detector quotient and cross-frontier experiment-design map; several physical minimality proofs remain open  
**Parent:** [Wide frontier atlas](admissibility_32_wide_frontier_atlas_and_iterative_research_queue.md)  
**Evidence:** [Adversarial detector atlas](../../../evidence/data/admissibility-adversarial-detector-atlas-v1.json)  
**Verifier:** [Minimum-channel design certificate](../../../verification/admissibility/verify_adversarial_detector_atlas.mjs)

## Result

Across the corpus, the most reusable frontier is not a particular force, mode or symmetry. It is the boundary between **physically different mechanisms that the present detector maps to the same record**. That boundary can be made exact.

Let two mechanisms predict latent means (mu_0,mu_1), let (D) be the complete detector map, let (Beta) contain allowed calibration and background deformations, and let (W=Sigma^{-1}) be the observed inverse covariance. Define

\[
\delta=D(\mu_1-\mu_0),
\qquad
M_B=I-B(B^TWB)^+B^TW.
\]

Their locally identifiable separation is

\[
\boxed{I_{\rm eff}=\delta^TWM_B\delta.}
\]

If (I_{\rm eff}=0), the mechanisms occupy one detector-equivalence class. More repetitions of the same channel only estimate that class more precisely. They do not identify its members.

The constructive response is **inverse detector design**: add the least expensive calibrated channel (k) that maximizes the worst unresolved pair's conditional (I_{\rm eff}) per cost. Candidate channels naturally come from the map already built in this programme—reversal, phase, frequency, geometry, waiting time, linewidth, higher moments, or a second material/species.

## What is already exact

Three corpus results assemble into one theorem stack:

1. a parameter-independent detector is a positive Markov compression and cannot increase latent Fisher information;
2. nuisance profiling is an orthogonal quotient, with efficient information given by a Schur complement;
3. a signal tangent inside the nuisance span has zero identifiable information, however many identical observations are collected.

The new verifier makes the design step executable. A headline channel is constructed with signal and nuisance tangents exactly collinear. Replication retains zero information. A reversal channel changes the signal sign but not the nuisance sign and opens an orthogonal direction; a weaker frequency channel also helps but loses on information per cost. Averaging the two reversal states erases the signal again, explicitly realizing detector contraction.

## Eight collision frontiers

| Collision | Same headline record | Cheapest known augmentation | State of the gate |
|---|---|---|---|
| coherent holonomy / differential loss | endpoint or projector return | forward/reverse complex process tomography plus singular values | specified |
| magnon-polaron Berry curvature / many-body skew | field-odd thermal Hall, including sign change | avoided-crossing spectroscopy plus linewidth and controlled-disorder dependence | bundle known; minimality open |
| Hall-modified Casimir / surface and magnetic background | configuration-dependent force or torque | parallel/antiparallel reversal, Kelvin mapping and magnetic null calibration | bundle required |
| intrinsic / extrinsic anomalous Nernst | orientation-odd transverse voltage | full tensor inversion, disorder/thickness series and thermal-lag response | bundle known; minimality open |
| equilibrium breaking / kinetic freezing | hysteresis or persistent domains | waiting-time and sweep-rate dependence of dwell-time distributions | specified |
| non-Hermitian topology / active dynamical selection | endpoint state exchange around an exceptional point | complex left/right eigenvector tomography under both loop senses and rates | specified |
| physical two-current rank / proxy rank | small response determinant | continuity-derived (J_E), seam translation and local-energy-gauge scans | implementation open |
| torsion / generic spin force | finite-range spin-dependent force | action-fixed species ratios, range scaling and magnetic-null reversals | blocked by action |

These are not eight claims that new physics is nearby. They are eight places where a familiar measurement is too compressed to say what caused it.

## Why the added channels work

The useful channels transform mechanisms and nuisances differently.

- **Reversal** is powerful when the target is odd and drift or surface force is even—or vice versa.
- **Frequency and phase** expose poles, relaxation and causal lag hidden by a DC number.
- **Geometry and distance** change propagation kernels while leaving some local offsets fixed.
- **Waiting time and sweep rate** separate state functions from kinetic memory.
- **Linewidth and disorder** perturb collision mechanisms differently from band geometry.
- **Higher moments and dwell distributions** reveal mixtures that share a mean.
- **Species or material substitution** tests coupling ratios that one action must predict jointly.

No transformation is automatically clean. Its nuisance parity must be calibrated rather than assumed.

## An experiment-design protocol

For every promoted frontier packet:

1. name at least two mechanisms, including the strongest conventional alternative;
2. predict their latent records over the same frozen control grid;
3. fold both through the same response, selection and reconstruction model;
4. span calibration, drift, acceptance and background tangents explicitly;
5. compute pairwise efficient separation after nuisance projection;
6. if a pair has zero separation, rank added controls by worst-pair information per calibrated cost;
7. freeze the chosen channel before examining the disputed record;
8. test positive, negative and held-out control settings;
9. report an equivalence class, rather than a preferred ontology, when the quotient remains unresolved.

This protocol changes what counts as progress. Demonstrating that two mechanisms remain equivalent is a filled bound. Identifying the exact channel that would separate them is a frontier result. Only then does collecting more data become the right move.

## Consequence for the frontier queue

The detector lane moves to the top because it now services every other execute-now lane. It tells the selector experiment which reversal tomography is indispensable, the magnon experiment which auxiliary spectra are needed, the Casimir experiment which matched controls must travel with the force trace, and the transport computation which operator/gauge checks precede rank interpretation.

The deepest remaining question is global rather than local: for nonlinear, history-dependent models, what finite set of interventions makes the detector quotient injective over the physically allowed model family? The present Fisher/Schur construction answers only the local tangent problem. That global injectivity frontier should be attacked after the leading mechanisms have explicit generative simulators.

## Corpus and primary-source anchors

- [Efficient-score nuisance quotient](../../claims/0700-0799/738_the_efficient_cp_score_is_the_nuisance_orthogonal_jordan_tangent_and_its_schur_complement_is_the_identifiability_test.md).
- [Detector data-processing theorem](../../claims/0700-0799/739_detector_folding_is_a_positive_markov_compression_that_can_only_contract_cp_fisher_information.md).
- [Nuisance-projected effect window](../../claims/1200-1299/1225_the_a11_effect_window_requires_nuisance_projected_power_not_only_a_nonzero_transverse_response.md).
- [Dynamic response, detection and metastability map](admissibility_06_dynamic_response_geometry_detection_metastability.md).
- Chatzichrysafis and Mook, [many-body skew-scattering thermal Hall mechanism](https://journals.aps.org/prb/abstract/10.1103/PhysRevB.111.134405).
- Li et al., [magnon-polaron Berry-curvature thermal Hall mechanism](https://journals.aps.org/prb/abstract/10.1103/PhysRevB.108.L140402).
- Somers et al., [Casimir torque measurement](https://www.nature.com/articles/s41586-018-0777-8).
- [Active acoustic exceptional-point tomography](https://www.nature.com/articles/s41467-026-76508-1).
