# The minimal second-gauge detector needs a phase reference

**Date:** 25 October 2026

**Status:** amplitude-level detector map closed; signed experimental likelihood open

**Topics:** OT-047, OT-048

**Parent:** [AZ-115 full gauge-coordinate rank](admissibility_115_the_full_gauge_dictionary_turns_the_sixth_coordinate_into_a_declared_slice.md)

**Evidence:** [charged/neutral detector rank](../../../evidence/data/alp-charged-neutral-detector-rank-v1.json)

**Generator:** [detector map and sign audit](../../../scripts/run-alp-charged-neutral-detector-rank.mjs)

**Verifier:** [rank and branch certificate](../../../verification/admissibility/verify_alp_charged_neutral_detector_rank.mjs)

## Result

The conditional second detector in AZ-115 has a concrete post-electroweak form. After the source-complete fermion, running and threshold contributions are accounted for, use the amplitude-level records

\[
R_W=c_{WW}-\frac12A_2,
\qquad
R_{\gamma\gamma}=c_{WW}+c_{BB}.
\]

The second identity is the electroweak rotation (c_{\gamma\gamma}=c_{WW}+c_{BB}). On the declared slice (c_{BB}=0), the two rows have determinant (-1/2) and

\[
c_{WW}=R_{\gamma\gamma},
\qquad
A_2=2(R_{\gamma\gamma}-R_W).
\]

This is the minimal charged/neutral amplitude pair that reopens the conditional branch. With (c_{BB}) free, both rows still annihilate ((2,1,-1)), exactly as AZ-115 requires.

## Why two event counts are not enough

The available detector precedents are rate-like: (a\to\gamma\gamma), (Z\to\gamma a), and associated-production yields. Rates determine squared magnitudes, not signed amplitudes. Given (|R_W|) and (|R_{\gamma\gamma}|), four sign assignments remain before quotienting a common overall reversal, leaving two relative-sign branches. Those branches give different (A_2).

The minimal experiment therefore needs one of:

- interference of the ALP amplitude with a calibrated continuum or reference amplitude in a common final state;
- a coherent production/decay analysis retaining an experimentally controlled relative phase; or
- a third signed response whose template fixes the relative branch.

A branching ratio alone also mixes the desired partial width with the total ALP width. The likelihood must carry production, all relevant decay channels, lifetime, acceptance, mass resolution and correlated backgrounds. A one-coupling diphoton limit is a detector precedent, not the required joint record.

## Realistic experiment

Choose an ALP mass window in which both a charged weak production channel and a neutral photon channel are experimentally accessible. Freeze a complete dimension-five model with (c_{BB}=0), independent top and bottom controls, running and weak-scale matching. Generate the twenty-seven charged-channel settings from AZ-074 and a signed photon-reference scan on common parameter points. Fit production and decay jointly, holding out factorial corners and at least one mass window. The preregistered decision statistic is the smallest singular value of the nuisance-profiled signed amplitude map.

The branch passes if the signed two-row map remains rank two and predicts held-out yields with one parameter set. It closes if only unsigned rates are recoverable, if width nuisances erase the second row, or if releasing (c_{BB}) restores the exact null. None of those outcomes is new physics. A new-physics lead begins only with a replicated residual outside the complete seven-coordinate dimension-five likelihood.

Primary source: [Bauer *et al.*, *The Low-Energy Effective Theory of Axions and ALPs*](https://arxiv.org/abs/2012.12272), especially Eqs. (40), (46)--(48), which give the electroweak rotation and the photon and photon--Z detector amplitudes including loop functions.

## Reproduction

~~~powershell
node scripts/run-alp-charged-neutral-detector-rank.mjs --write
node verification/admissibility/verify_alp_charged_neutral_detector_rank.mjs
~~~
