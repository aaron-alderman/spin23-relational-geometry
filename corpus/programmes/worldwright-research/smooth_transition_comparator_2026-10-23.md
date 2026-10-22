# Worldwright smooth capacity-transition comparator

**Date:** 2026-10-23

The threshold/gain factorial showed that threshold position changes which trajectories are exposed, while gain controls effect magnitude. That left a direct falsifier: the delay-sensitive relational effect might be an artifact of one discontinuous material threshold.

The comparator replaces each hard surplus-learning threshold with six weighted monotone steps. Widths `1`, `2` and `4` preserve the same maximum learning and health gain as the hard model. Four conditions cover 2,560 paired cells and 5,120 simulations per execution. The complete execution repeated exactly against hash-checked source bytes.

## Result

All 304 hard-active delay contrasts remain active and retain their negative direction at every smooth width. There are zero sign reversals and zero disappeared hard effects. The L1 distance from the hard model grows from `0.641` at width 1 to `1.364` at width 2 and `3.723` at width 4, satisfying the preregistered narrow-width convergence test.

Smoothing broadens rather than erases the affected basin: active contrasts rise from 304 to 328, 360 and 424. Width 4 introduces 120 new contrasts and reaches the initial-material-10 stratum. At the same time, total absolute effect declines from `19.6` to `18.167`, so broader exposure does not mean larger aggregate magnitude.

This rules out the narrow claim that the observed path effect exists only because of one hard boundary. It does not prove robustness to every continuous response function, nor identify an empirical capacity curve.

Machine-readable evidence is in [worldwright-smooth-capacity-transition-comparator-local-v1.json](../../../evidence/data/worldwright-smooth-capacity-transition-comparator-local-v1.json), with checks in [verify_worldwright_smooth_capacity_transition_comparator_local.mjs](../../../verification/verify/verify_worldwright_smooth_capacity_transition_comparator_local.mjs). The hash-pinned execution harness is [run_worldwright_smooth_capacity_transition_comparator.mjs](../../../verification/experiments/run_worldwright_smooth_capacity_transition_comparator.mjs).
