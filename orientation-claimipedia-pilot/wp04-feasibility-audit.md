# WP04 Study 04.3 feasibility audit

Status: design correction; full factorial split before registration

## Finding

The original 2 × 2 × 2 × 2 between-network design is scientifically clean but operationally overextended. Because the intervention is assigned to a network, the independent sample size is the number of networks, not the number of people or decisions inside them.

A conservative normal-approximation screen used 90% power and a two-sided per-contrast alpha of .0125 for four primary contrasts. For an independent two-arm standardized comparison,

`n per arm ≈ 2(z_alpha + z_power)^2 / d^2`.

This is not the promised blinded multilevel simulation. It is a feasibility bound used to decide whether that simulation is worth constructing.

| Smallest effect | Approximate independent networks per arm |
|---|---:|
| d = 0.20 | 715 |
| d = 0.30 | 318 |
| d = 0.40 | 179 |
| d = 0.50 | 115 |
| 0.50 to 0.60 binary outcome (h = 0.201) | 705 |

If 715 networks were required in each of the sixteen original cells, the design would require 11,440 networks and 228,800 participant places across the eight-person and thirty-two-person cells. Repeated decisions improve outcome precision but do not manufacture independent intervention units.

## Disposition: split

### Study 04.3a — authority × reliability mechanism

- Factors: symmetric/designated authority × reliability 0.55/0.80.
- Network size fixed at eight; no formal appeal channel.
- Primary outcomes: convergence speed, final accuracy, correct-minority retention.
- Purpose: establish whether concentrated authority separates coordination from epistemic performance.
- Registration requires a multilevel simulation and either a feasible network count or an explicit multi-site collaboration.

### Study 04.3b — appeal and correction

- Begins only if 04.3a demonstrates that the authority manipulation changes behaviour.
- Factors: symmetric/designated authority × appeal absent/present, using the error-prone reliability condition.
- Primary outcomes: authority-error correction, minority retention, appeal burden.
- Purpose: estimate whether a correction channel recovers information and at what coordination cost.

### Study 04.3c — scale transfer

- Held until 04.3a and 04.3b freeze their models.
- Compares network sizes eight and thirty-two using only the most diagnostic conditions.
- Purpose: test whether the mechanism transfers with scale; it is not pooled into the discovery analysis.

## Power rule

- Preserve the smallest effect of interest. Do not enlarge it merely to obtain an affordable sample.
- If 04.3a cannot achieve 90% simulated power at the declared effect, classify it as an estimation pilot.
- Synthetic-agent or mathematical network simulations may test code and identify pathological designs. They cannot count as behavioural evidence or determine a favourable effect size.
- Freeze simulation code, parameter ranges, random seed and the resulting network count before any human outcome data are inspected.

## What this changes

- **Retain:** the distinction among convergence, accuracy, endorsement and burden.
- **Split:** mechanism, correction-channel and scale-transfer claims.
- **Narrow:** the immediate deliverable from a full confirmatory experiment to a powered mechanism study.
- **Hold:** H4–H6 and all scale claims until their dedicated studies.
- **Retire if necessary:** the confirmatory label if the network-level sample is infeasible.

The correction strengthens the programme: it prevents pseudo-replication and makes failure at one layer informative rather than fatal to every claim at once.

