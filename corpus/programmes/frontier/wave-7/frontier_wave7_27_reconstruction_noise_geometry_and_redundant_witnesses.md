# Frontier Wave 7.27: Reconstruction, Noise Geometry and Redundant Witnesses

**Date:** 24 October 2026  
**Status:** exact reconstruction and equal-noise design complete; hardware-weighted redesign awaits calibration  
**Ledger:** [detector noise and redundancy v1](relation_detector_noise_and_redundancy_v1.json)  
**Verifiers:** [minimal schedule and inverse](../../../../verification/verify/verify_relation_minimal_detector_schedule.mjs) and [redundancy design](../../../../verification/verify/verify_relation_detector_redundancy_design.mjs)

## Result

The unimodular detector of wave 7.26 is not merely invertible. Its exact inverse has only 44 nonzero entries out of 576, and every coefficient belongs to

\[
\{-1,0,1\}.
\]

Thus every one of the 24 relation amplitudes is reconstructed by adding and subtracting measured channels; no division or irrational calibration factor enters the formal inverse. The wall is maximally local:

\[
x_{003}=Y_{\mathrm{direct}:003}.
\]

This arithmetic cleanliness does not make all estimates equally precise. If normalized channels have independent variance \(\sigma^2\), then

\[
\operatorname{Cov}(\hat x)=\sigma^2(R^TR)^{-1}.
\]

For the minimal schedule, the trace variance factor is 44 and the largest diagonal factor is 8. The six hardest relation coordinates are:

| relation | variance factor |
|---|---:|
| `QR-001` | 8 |
| `QR-019` | 5 |
| `QR-010` | 3 |
| `QR-015` | 3 |
| `QR-020` | 3 |
| `QR-027` | 3 |

`QR-001` is reconstructed from eight signed records and is the statistical bottleneck. By contrast, `QR-003` and many visible relations each use one record and have variance factor one.

## Redundancy tranche

The 57 formal composition rows contain one identically zero row, `path_probe:QR-003`, leaving 56 nonzero channels. The minimal basis consumes 23, so 33 nonzero composition channels remain as withheld witnesses or repeats.

Under the equal-noise model, greedy minimax selection adds:

| addition | channel | worst variance | total variance |
|---:|---|---:|---:|
| 1 | `triangle_pair:QR-006*QR-008` | 7.5 | 42.5 |
| 2 | `triangle_pair:QR-023*QR-024` | 7 | 41 |
| 3 | `triangle_pair:QR-012*QR-014` | 6.5 | 40 |
| 4 | `triangle_pair:QR-014*QR-016` | 6 | 39 |
| 5 | `triangle_pair:QR-016*QR-017` | 5.5 | 38 |
| 6 | `triangle_pair:QR-018*QR-022` | 5 | 37 |
| 7 | `path_probe:QR-022` | 4.9444 | 35.5556 |
| 8 | `triangle_pair:QR-011*QR-012` | 4.7778 | 35.0556 |

The first six additions each remove exactly one half-unit from the worst variance. After eight, the maximum has fallen by about 40%, from 8 to \(43/9\), using 32 total channels.

## What the full pool says

Using every nonzero composition channel plus the direct wall detector gives 57 records. The total variance factor falls to about 16.09, but the worst factor only reaches 4.274 and still belongs to `QR-001`.

That persistence separates two issues:

- the minimal basis creates some avoidable noise amplification, which targeted redundancy reduces;
- `QR-001` remains weakly represented by the entire path/triangle observable family, so eliminating its residual vulnerability requires a new direct or higher-order observable, not merely a different subset.

This nominates `QR-001` as the next detector-design frontier. It is not a new physical anomaly; it is a precisely located observability deficit.

## Use in an experiment

Run the 24-channel minimal schedule first. Reserve at least two classes of extra measurements:

1. the eight minimax additions for parameter precision;
2. several other withheld rows, chosen before fitting, for out-of-sample graph validation.

Do not use the same redundant channel both to tune the graph and to claim validation. Frequency sweeps should estimate each channel's complex noise covariance. Once those data exist, replace \(R^TR\) by the weighted Fisher matrix \(R^\dagger\Sigma^{-1}R\) and rerun the design.

## Boundary

The present ordering is optimal only for the declared greedy rule under equal, independent, normalized noise. Hardware channels will have different gain, phase lag, drift and correlations. Those effects do not change the exact rank or integral inverse, but they can change which redundant measurements are most valuable.
