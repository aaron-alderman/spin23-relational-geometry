# An odd resonance moment can supply the missing sign

**Date:** 25 October 2026

**Status:** analytic signed statistic closed; process-specific detector likelihood open

**Topics:** OT-047, OT-048

**Parent:** [AZ-116 charged/neutral phase-reference boundary](admissibility_116_the_minimal_second_gauge_detector_needs_a_phase_reference.md)

**Evidence:** [resonance-interference odd-moment audit](../../../evidence/data/alp-resonance-interference-odd-moment-v1.json)

**Generator:** [Breit--Wigner interference calculation](../../../scripts/run-alp-resonance-interference-odd-moment.mjs)

**Verifier:** [parity and reversal certificate](../../../verification/admissibility/verify_alp_resonance_interference_odd_moment.mjs)

## Result

The phase reference required by AZ-116 need not be an external oscillator. A calibrated Standard-Model continuum with the same initial and final state can serve as the reference if the analysis retains the interference line shape rather than integrating it away.

Near a narrow diphoton resonance, write the local amplitude as

\[
\mathcal A(x)=B+\frac{S}{x+i\gamma},
\qquad x=m_{\gamma\gamma}^2-m_a^2,
\]

with real, locally constant continuum amplitude (B), signed signal residue (S), and width scale (gamma=m_a\Gamma_a). The paired mass-bin difference is

\[
|\mathcal A(+x)|^2-|\mathcal A(-x)|^2
=\frac{4BSx}{x^2+\gamma^2}.
\]

The pure continuum and pure Breit--Wigner terms are even and cancel. An ordinary symmetric resonance count also cancels the real interference term. Weighting by the sign of (x) instead gives

\[
M_{\rm odd}
=2BS\log\!\frac{L^2+\gamma^2}{\gamma^2}
\]

over a symmetric window ([-L,L]). Reversing the signed source residue reverses this moment. It is therefore the smallest analytic statistic that can retain the relative sign lost by rate-only records.

## How it enters the charged/neutral experiment

For a charged-production plus diphoton-decay final state, the resonant residue contains the product of the production amplitude and (R_{\gamma\gamma}). The AZ-074 signed source settings separate the top, bottom and weak pieces of production. Applying the odd mass moment to the same settings can therefore attach the photon amplitude to that signed triangle instead of measuring an unrelated unsigned branching fraction.

This is a detector design, not yet a forecast. A realistic likelihood must include complex continuum helicity amplitudes, absorptive phases, the ALP width and all open decays, detector resolution, nonuniform acceptance, background slope and source-setting covariance. Symmetric mass resolution preserves odd parity but suppresses magnitude. Acceptance asymmetry and a sloping background leak even terms into the moment and must be constrained by sidebands and source reversals.

## Prior-art boundary

Resonance--continuum interference and diphoton peak distortion are established collider techniques; Higgs calculations demonstrate the same odd dispersive line shape. ALP searches also use amplitude interference in direct detection, for example between inverse Primakoff and inverse Compton contributions. The limited primary-source search performed for this packet did not locate a public ALP charged-production/diphoton likelihood exposing this odd signed moment. The algebraic statistic is therefore source-native here, while any novelty claim for the full experimental application remains open to a systematic review.

## Experiment and stopping rule

Choose one mass window where the charged final state and continuum diphoton background are both reconstructible. Publish paired mass bins, helicity or angular categories where available, the full response matrix, sideband covariance and all twenty-seven source settings. Fit even and odd components jointly. Hold out at least one mass sideband and the eight three-source corners.

The route advances if the odd moment reverses with the preregistered source intervention, survives resolution and nuisance profiling, and predicts held-out records with the same coefficients. It closes if the relevant continuum does not share the quantum numbers, the interference vanishes after physical sums, or detector leakage dominates the signed component. A surviving unexplained odd residual is not automatically new physics; it must first survive the complete seven-coordinate EFT, detector reversals and independent-channel replication.

Primary precedents: [Martin, *Shift in the LHC Higgs diphoton mass peak from interference with background*](https://arxiv.org/abs/1208.1533) for the resonance--continuum line-shape mechanism; [Chao, Feng and Jin, *Direct detections of the Axion-like particle Revisited*](https://arxiv.org/abs/2311.09547) for an ALP observable whose sensitivity is driven by interference between two amplitudes.

## Reproduction

~~~powershell
node scripts/run-alp-resonance-interference-odd-moment.mjs --write
node verification/admissibility/verify_alp_resonance_interference_odd_moment.mjs
~~~
