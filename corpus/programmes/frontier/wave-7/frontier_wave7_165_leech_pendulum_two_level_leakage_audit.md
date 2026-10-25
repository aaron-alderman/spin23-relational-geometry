# Frontier Wave 7.165: Pendulum Two-Level Leakage Audit

**Date:** 25 October 2026

**Status:** numerical operator dictionary and leakage bound; full driven multilevel dynamics open

**Evidence:** [two-level leakage record](../../../../evidence/data/leech-pendulum-two-level-leakage-audit-v1.json)

**Certificate:** [eigenvector and matrix-element verifier](../../../../verification/verify/verify_leech_pendulum_two_level_leakage_audit.mjs)

> **Scope notice (Wave 7.190).** This is a single-pendulum coupler calibration
> and a general warning about leakage.  Its transition matrix elements and
> threshold are not values for the coupled Gram-first cell.

## The projection is not free

Wave 7.164's exact hopping threshold belongs to a two-state effective model.
The \(N=8\) pendulum spectrum shows why a natural analog coupler cannot be
assumed to realize it at arbitrary strength:

\[
 E_1-E_0=0.8784249807,\qquad
 E_2-E_1=0.5102742259.
\]

The anharmonicity is negative,

\[
 (E_2-E_1)-(E_1-E_0)=-0.3681507548,
\]

and the natural odd operator has substantial transitions

\[
 |\langle1|\sin\theta|0\rangle|=0.5661648604,\qquad
 |\langle2|\sin\theta|1\rangle|=0.4576109127.
\]

The desired \(0\to1\) transition nevertheless carries 94.4972% of
\(\langle0|\sin^2\theta|0\rangle\); the remaining 5.5028% goes directly to
higher odd states, dominated by \(0\to3\).

## Static coupler limit

For the natural interaction

\[
 V=J\sin\theta_j\sin\theta_{j+1},
\]

the projected hopping is

\[
 t_{\rm eff}=J|\langle1|\sin\theta|0\rangle|^2.
\]

Requiring both the ground-to-pair channel and the leading \(1\to2\) leakage
channel to have first-order admixture amplitude at most 0.1 gives

\[
 J\le0.5360050777,\qquad
 {t_{\rm eff}\over\Delta}\le0.1955915318.
\]

At this endpoint, the squared admixture proxies are 0.9564% and 1.0000%.
These are perturbative screening numbers, not rigorous long-time leakage
probabilities.

## Consequence for the stress experiment

The natural static coupler can test the low-strength calibration lane through
roughly \(t/\Delta=0.19\). It cannot be used to claim the exact two-level
closure at \(t/\Delta=0.5\). The held-out values 0.3, 0.4 and 0.45 require
one of:

- a transition-selective exchange operator;
- a Floquet/rotating-wave construction suppressing pair creation and higher
  transitions;
- or full multilevel simulation with revised predictions.

This is a productive failure: the low-strength portion of Wave 7.164 remains
a natural analog experiment, while the strong-stress portion is now properly
typed as an engineered effective-Hamiltonian experiment.

## Corpus links

- [Pendulum excitation-hopping stress lane](frontier_wave7_164_leech_pendulum_excitation_hopping_stress_lane.md)
- [Rotor-native pendulum gap](frontier_wave7_160_leech_rotor_native_pendulum_gap.md)
- [Fixed-cutoff local gap stability](frontier_wave7_163_leech_fixed_cutoff_local_gap_stability.md)
- [Transition-selective exchange compiler](frontier_wave7_166_leech_transition_selective_exchange_compiler.md)
- [Product-to-coupled dependency audit](frontier_wave7_190_leech_product_to_coupled_dependency_audit.md)
