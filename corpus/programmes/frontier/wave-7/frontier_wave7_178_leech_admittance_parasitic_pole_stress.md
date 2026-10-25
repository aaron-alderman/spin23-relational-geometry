# Frontier Wave 7.178: Parasitic-Pole Stress Test of the Leech Admittance Gate

**Date:** 25 October 2026

**Status:** one-pole tolerance quantified; multi-pole and adversarial alignment open

**Evidence:** [parasitic-pole stress ledger](../../../../evidence/data/leech-admittance-parasitic-pole-stress-v1.json)

**Executable:** [parasitic-admittance simulator](../../../../scripts/simulate-leech-admittance-parasitics.mjs)

**Certificate:** [yield and gate-discrimination verifier](../../../../verification/verify/verify_leech_admittance_parasitic_pole_stress.mjs)

## A nearly invisible parasitic can still break the inverse metric

The Wave 7.177 packet is tested against one passive series-RLC rank-one branch
with (Q=30), random Rademacher coupling direction and pole frequency at
(4\omega_0) or (10\omega_0). Strength is the low-frequency parasitic
capacitance norm divided by the target Gram-matrix norm. Each point uses 2000
orientations.

| parasitic strength | (4\omega_0) yield | (10\omega_0) yield |
|---:|---:|---:|
| 1 ppm | 100% | 100% |
| 3 ppm | 100% | 100% |
| 10 ppm | 100% | 100% |
| 30 ppm | 99.0% | 99.7% |
| 100 ppm | 60.65% | 71.4% |

At 10 ppm all 4000 draws pass, giving a 95% Wilson lower yield of 99.808%.
At 30 ppm, the nearer-pole lower bound falls to 98.46%. Ten ppm is therefore
the largest sampled cross-pole strength retaining the declared greater-than
99% lower-yield criterion.

## The important detector is static and inverse-sensitive

At 100 ppm, the p95 dispersion is only (1.65\times10^{-4}) for the nearer
pole and (1.11\times10^{-5}) for the remote pole, both far inside the 0.5%
dispersion gate. The p95 loss ratios are also far below (10^{-3}). Yet p95
inverse errors rise to 2.33% and 1.89%, and most orientations fail.

The physical reason is the soft eigen-direction of the Gram matrix: a small
rank-one capacitance can be almost frequency-flat in the measured band while
being amplified by matrix inversion. Consequently the full inverse-metric
gate must not be replaced by “low loss plus flat response.”

## Revised hardware priority

The correlated component-scatter target remains 0.15%, but unresolved
rank-one parasitic capacitance is now the tighter normalized specification:
10 ppm of \(\lVert G\rVert_2\) in this declared ensemble. If a larger mode is
present, its direction and pole must be included explicitly in the fitted
admittance model and tested on held-out frequencies.

Wave 7.179 subsequently converts the soft-mode sensitivity into an exact PSD
bound and lowers the adversarial joint-packet target to 8 ppm. The 10 ppm
number remains the random-orientation ensemble result.

## Epistemic boundary

Passivity of the added series-RLC branch is exact. The yield is conditional on
one pole, \(Q=30\), two pole locations and random Rademacher orientations.
Multiple coherent parasitics, a mode aligned deliberately with the soft
eigenvector, distributed loss or arbitrary frequency dependence can be worse.
Only direct measured-mode reconstruction decides a device.

## Corpus links

- [24-port commissioning packet](frontier_wave7_177_leech_24port_admittance_commissioning_packet.md)
- [Correlated transformer tolerance](frontier_wave7_176_leech_transformer_correlated_tolerance.md)
- [Conditioning and tolerance](frontier_wave7_171_leech_transformer_conditioning_tolerance.md)
- [Adversarial PSD parasitic bound](frontier_wave7_179_leech_adversarial_psd_parasitic_bound.md)
