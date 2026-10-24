# A passive six-cell carrier closes the three-scale descent construction

**Date:** 25 October 2026

**Status:** OT-019 construction closed; experimental realization not claimed

**Topic:** OT-019

**Parent:** [AZ-056 certificate-preserving descent](admissibility_56_certificate_preserving_descent_and_commuting_square_atlas.md)

**Evidence:** [three-scale diffusion audit](../../../evidence/data/three-scale-passive-diffusion-pushforward-v1.json)

**Generator:** [passive-carrier calculation](../../../scripts/run-three-scale-passive-diffusion-pushforward.mjs)

**Verifier:** [three-scale certificate](../../../verification/admissibility/verify_three_scale_passive_diffusion_pushforward.mjs)

## Result in ordinary terms

Six equal-capacity thermal cells—or, equivalently, six equal-capacitance RC nodes—are joined by fifteen positive conductances. The fine record is the temperature at every cell. The next detector reports the average temperature in three named pairs. The coarsest detector averages the first two regions and retains the third. Those groupings are fixed before any conductance values are supplied; no basis or interscale map is fitted.

At each scale the update remains nonnegative and preserves a uniform temperature. Directly compressing the six-cell update to two reported temperatures gives the same one-step operator as compressing first to three and then to two, to numerical precision below (1.2\times10^{-16}), in the reference carrier and all three held-out component substitutions. The positive-temperature region and constant mode are therefore nontrivial admissibility data that survive the entire passage.

This closes the construction requested by OT-019: one physical three-scale carrier, fixed source-native maps, held-out substitutions, a surviving invariant and a verified semigroup error bound.

## Why direct agreement does not guarantee autonomous dynamics

Let (F=I-\Delta tL) be the fine diffusion update, with (L) the weighted graph Laplacian. Let (P_1,P_2) be the two fixed averaging maps, (J_1,J_2) their uniform lifts and

\[
f_1=P_1FJ_1,
\qquad
f_2=P_2f_1J_2.
\]

The one-step pushforward commutes by construction because the physical maps compose. Autonomy asks a harder question: do two fine states that the detector calls identical remain identical after evolution? Its defects are

\[
\Delta_1=P_1F-f_1P_1,
\qquad
\Delta_2=P_2f_1-f_2P_2,
\qquad
\Delta=P_2P_1F-f_2P_2P_1,
\]

and the exact scale-sewing identity is

\[
\Delta=P_2\Delta_1+\Delta_2P_1.
\]

All four component sets satisfy this identity below (5\times10^{-17}) and satisfy both its norm bound and the five-step telescoping semigroup bound.

## The scale-dependent surprise

The balanced carrier and a held-out substitution of all three internal pair conductances descend autonomously at both scales. Internal changes can therefore be real without becoming visible at either detector, provided they respect the detector partition.

A mild held-out asymmetry breaks the first quotient: a temperature difference hidden inside the first pair leaks into the three-region record with norm (3.394\times10^{-3}). Yet the final two-region detector erases that particular leakage again, so the coarsest dynamics remains autonomous. A strong asymmetric substitution breaks both quotients: the direct defect is (5.315\times10^{-3}), and the five-step Markovian coarse model differs from the true compressed evolution by (6.028\times10^{-4}), within the computed telescoping bound.

The implication is precise. Memory is not simply gained as resolution is lost. A distinction can be invisible, become dynamically visible at an intermediate scale, and be identified again by a coarser detector. “The system has memory” is incomplete unless the detector and scale are named.

## Open and closed

**Closed here**

- a source-native passive carrier replaces AZ-056's chosen abstract matrices;
- the interscale maps are fixed by named physical regions and contain no fitted parameters;
- positivity and the constant mode survive three scales and three held-out substitutions;
- direct and composed pushforwards agree;
- quotient defects compose exactly and bound finite-horizon semigroup error;
- detector equivalence is shown to be dynamically closed in some substitutions and memory-bearing in others.

**Still open**

- no fabricated thermal or RC network has been measured;
- unequal capacities, continuous-time readout, noise, calibration drift and uncertain component values need covariance-aware extensions;
- the result does not prove that every physically meaningful admissibility geometry survives coarse-graining;
- no Jordan, (Spin(2,3)), Standard-Model or new-physics dynamics follows from this diffusion carrier.

## What to look for

The immediate engineering test is inexpensive: fabricate or simulate the same six-node network, inject two fine temperature or voltage states with equal coarse averages, and compare their later coarse records. Balanced wiring should produce no resolved split. A declared asymmetric edge substitution should produce the predicted scale-dependent leakage. Agreement would validate a practical method for deciding when reduced models may remain Markovian and when a memory state, extra sensor or revised partition is required. Failure beyond component and readout covariance would identify missing dynamics in an unusually clean setting.

## Reproduction

~~~powershell
node scripts/run-three-scale-passive-diffusion-pushforward.mjs --write
node verification/admissibility/verify_three_scale_passive_diffusion_pushforward.mjs
~~~
