# Phase-reversal preregistration and hardware handoff

## Frozen now versus measured later

The preregistration packet freezes the scientific logic now while refusing to
invent device numbers. Its machine authority is
[lithium_niobate_phase_reversal_preregistration_v1.json](lithium_niobate_phase_reversal_preregistration_v1.json).

Frozen now:

- primary null, alternative and authority ceiling;
- separation of lock, innovation, science and safety channels;
- balanced blocked randomization and opaque phase labels;
- negative controls, exclusion policy and interpretation ladder;
- prohibition on post-unblinding covariance inflation;
- independent-device replication requirement.

Measured in a blinded pilot and frozen before the trial:

- physical units and state-space parameters;
- detector and process covariance;
- actuator delay, magnitude, slew and hysteresis;
- phase-odd statistic weights and shared covariance;
- qualification, safety and sample-size numbers.

This is a stronger preregistration than inserting arbitrary numerical cutoffs:
it freezes the rule by which the numbers are obtained and prevents the science
contrast from choosing them.

## Identification packet

For each device deliver one immutable bundle containing:

1. device identifier, wafer/cut, geometry, domain map and fabrication revision;
2. raw synchronized drive, heterodyne, temperature and applied-command streams;
3. continuous `A,B,C,D` estimates with covariance and fitting code;
4. exact-hold `F,G`, sampling jitter and held-out pulse-response residuals;
5. mode linewidths, detunings and complex pairwise coupling estimates;
6. full matrix response and controllability/observability singular values;
7. detector linearity, phase-reference, bandwidth and clipping calibration;
8. actuator magnitude, slew, delay, hysteresis and anti-windup calibration;
9. thermal, pyroelectric and photorefractive excitation/recovery curves;
10. process and detector covariance estimates plus innovation diagnostics.

Hashes of raw data, calibration code, configuration and derived matrices are
recorded before unblinding.

## Pilot-to-trial firewall

The pilot may reveal opaque configurations `A` and `B`, but the analyst does
not learn which is `+Phi`. Calibration fits one shared model with the phase
label represented only by an unknown sign. From pilot data the team freezes:

- a lock-RMS limit as a fraction of the narrowest calibrated linewidth;
- saturation and slew occupancy limits;
- an innovation mean/autocorrelation decision rule;
- the conditioning floor for reachable and visible state directions;
- phase-odd statistic weights;
- expected conventional effect scale and required block count;
- safety and irreversible-drift limits.

The confirmatory run uses new randomized blocks. No pilot block contributes to
the primary p-value or interval.

## Primary record

The primary statistic is a calibration-fixed weighted complex-transfer
contrast that changes sign when the closed-loop phase reverses. It is computed
only after:

1. acquisition-integrity and safety exclusions are frozen;
2. the common-mode lock has passed qualification;
3. innovations have passed the declared calibration gate;
4. the nuisance model and covariance are immutable;
5. phase labels are unblinded.

The primary test is two-sided at familywise alpha `0.01`. Any preregistered
secondary quadrature or frequency-bin tests use Holm correction. Effect sizes,
intervals and all failed qualification blocks are reported even when no
hypothesis test is admitted.

## Negative controls

| Control | What it tests | Required consequence |
|---|---|---|
| cut one coupling | dependence on loop closure | intrinsic loop-odd statistic collapses within the conventional model |
| reverse port labels | detector and wiring convention | statistic transforms by the preregistered sign/permutation rule |
| reduce optical power | Kerr, heating and photorefraction | residual follows or departs from calibrated scaling law |
| inject detector phase | analysis recovery and sign convention | known phase is recovered within calibration uncertainty |
| drive off/single link | offsets and pairwise leakage | no closed-loop orientation claim is admitted |

## Abort is not exclusion

Loss of phase reference, unlogged saturation, unsafe temperature, a mode
crossing or irreversible drift triggers an abort. The block and its opaque
label remain in the audit record. An abort prevents a science inference; it
does not authorize silently removing an inconvenient phase setting.

## Interpretation ladder

1. **qualification failure:** controller or detector did not support the test;
2. **innovation failure:** the frozen plant/noise model is inadequate;
3. **negative-control failure:** conventional wiring, phase or material
   explanations remain open;
4. **conventional closure:** the result is a validated phase-stable relational
   photonic controller;
5. **single-device residual:** reopen systematics under a new registered study;
6. **independent replicated residual:** begin a targeted new-physics
   investigation, without claiming discovery or identifying a fundamental
   carrier.

## Genuine stopping boundary

No further numerical optimization is authoritative until measured data replace
the twin's dimensionless parameters. The immediate physical request is not
“build the final experiment”; it is the smaller pilot bundle above, especially
multiport complex response, slow-memory excitation/recovery and applied-command
logs. Those data decide the state dimension, filter family, controller
bandwidth and achievable sample size.
