# The five-coordinate experiment has separate resolution and phase-connectivity gates

**Date:** 25 October 2026

**Status:** detector-information boundary computed; physical process map and electroweak matching remain open

**Topics:** OT-047, OT-048

**Parent:** [AZ-070 running window](admissibility_70_running_high_energy_rank_window.md)

**Earlier observable map:** [Result 37](../lane-expansion/programme_lane_expansion_37_the_five_coordinate_observable_map_needs_bottom_weak_and_neutrino_compasses.md)

**Evidence:** [observable-resolution ledger](../../../evidence/data/five-coordinate-observable-resolution-gate-v1.json)

**Generator:** [resolution calculation](../../../scripts/run-five-coordinate-observable-resolution-gate.mjs)

**Verifier:** [resolution certificate](../../../verification/admissibility/verify_five_coordinate_observable_resolution_gate.mjs)

## Result

The proposed high-energy two-current window presents two different experiments, not one.

1. To certify that every discarded broken direction lies below a one-percent operational threshold, the combined theory-and-detector one-sigma error may be as large as about **0.279%** for a three-sigma statement across the sampled window.
2. To resolve the predicted second mode itself at three sigma everywhere in the same window, the combined error must be below **438 ppm**. If theory and detector receive equal quadrature budgets, each gets only **310 ppm**.

Thus a percent-level apparatus can support a reduced one-port engineering model, but it cannot decide whether the per-mille second direction is present. A nominally “per-mille” apparatus is still only a 1.3--1.6 sigma detector of the AZ-070 benchmark. Five-sigma discovery across the whole window requires a combined floor below 263 ppm.

## Why detector alignment matters

Let the leading and second response eigenvalues obey $r=\lambda_2/\lambda_1$. A nominal second-mode analyser misaligned by an angle $\theta$ receives leading-mode leakage. In the two-mode plane,

\[
\frac{\text{leading leakage}}{\text{true second response}}
=\frac{\tan^2\theta}{r}.
\]

For the AZ-070 range, leakage equal to the whole second signal occurs at only $2.08^\circ$--$2.32^\circ$. Keeping that leakage below ten percent requires alignment within $0.66^\circ$--$0.73^\circ$. The detector must therefore reconstruct the response orientation, not merely quote scalar sensitivity.

## The signed relation needs two phase links

The visible incidence relation is

\[
a_2=v_u+v_d.
\]

Separate rates determine $|v_u|$, $|v_d|$ and $|a_2|$ but leave two independent relative-sign bits after one global sign convention. One interference observable fixes only one bit. The minimal independent signed record is a connected spanning tree on the three amplitudes: any two of

\[
(v_u,v_d),\qquad(v_u,a_2),\qquad(v_d,a_2).
\]

At the deduplicated incidence point $(10,6,16)$, the ideal normalized coherent contrasts are respectively $0.8824$, $0.8989$ and $0.6575$, so the obstacle is not an intrinsically tiny contrast. It is finding two source-matched contributions to common final states with controlled phase and covariance. This sharpens the earlier Result 37 wording: one mixed term can reject a specified sign flip, but it cannot independently reconstruct the full signed three-amplitude relation.

## Ideal compass comparison

With independent one-percent **amplitude** errors, ideal direct rows $(T,B,L,W)$ propagate to $\sigma(a_2-v_u-v_d)=0.198$ at the incidence point. Replacing the direct weak row by the source-matched hypercharge row

\[
P=48v_u+12v_d+36v_e-18a_2
\]

gives $\sigma(a_2-v_u-v_d)=0.254$. These are information-design diagnostics, not experimental forecasts. Real rates, shared normalizations, electroweak threshold terms and detector covariance can worsen them, while coherent phase records may improve them.

## Open and closed

Closed:

- the precision needed to certify the one-percent reduction;
- the stricter precision needed to detect the predicted second mode at one, three and five sigma;
- the analyser-alignment requirement implied by leading-mode leakage;
- the number of independent phase links required for a signed incidence test;
- the distinction between a large ideal interference contrast and a missing physical common process.

Open:

- a broken-phase electroweak matching calculation that supplies the actual neutral-gauge rows;
- two coherent, source-matched interference channels spanning $(v_u,v_d,a_2)$;
- a detector covariance matrix and nuisance model for those channels;
- higher-order and boundary-input theory covariance below the allocated budget;
- the practically null neutrino coordinate and subsequent KMS continuation.

## Implication

The nearest experiment is now bifurcated. The engineering branch asks whether a one-percent reduced response is safe; its precision requirement is demanding but not absurd. The new-physics branch asks whether the per-mille second mode exists with the predicted energy dependence; it requires sub-440-ppm total control plus sub-degree orientation calibration and two connected phase records. A null result at that standard would close the operational two-port claim over the tested window. A resolved, stable second mode would validate the five-coordinate response geometry while showing exactly where the rank-two reduction stops.

The next source-native task is not another rank count. It is to identify candidate Standard-Model or source-matched processes for both interference edges and write their shared nuisance covariance before assigning forecast significance.

## Reproduction

~~~powershell
node scripts/run-five-coordinate-observable-resolution-gate.mjs --write
node verification/admissibility/verify_five_coordinate_observable_resolution_gate.mjs
~~~
