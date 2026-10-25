# Frontier Wave 7.219: charge-shell counterfeit discrimination power

## From a protocol to a discriminator

Wave 7.218 fixes targets, tolerances and finite sampling budgets. This packet
asks whether those budgets actually reject named nearby impostors rather than
merely reproducing the intended carrier in expectation. It evaluates five
counterfeits with analytic concentration or zero-event bounds.

| counterfeit | declared effect | false-acceptance upper bound |
|---|---:|---:|
| wrong shell graph | isolated fraction shifted by 0.03 | (2.64\times10^{-29}) |
| wrong corona | norm-eight exterior fraction shifted by 0.03 | (2.64\times10^{-29}) |
| rootful contamination | norm-two event rate (5\times10^{-4}) | (3.12\times10^{-7}) |
| one bad inversion pair | odd leakage rate 0.005 | (2.81\times10^{-13}) |
| one biased even control | matrix-element bias 0.06 | (5.96\times10^{-12}) |

The weakest named discriminator is the rootfulness test, and even there the
rejection probability is at least 0.9999996884 under the declared independent
event model.

## Causal decision table

The parity experiment is interpreted only jointly:

| odd cancellation | even control | conclusion |
|---|---|---|
| pass | pass | inversion pair commissioned |
| fail | pass | relative inversion phase/coherence failure |
| pass | fail | even-arm calibration failure; withhold phase inference |
| fail | fail | shared calibration failure; withhold phase inference |

This prevents a broken state-preparation or readout channel from being
misreported as evidence against inversion parity.

## Boundary

The power statements apply to the five named effect sizes and independent
bounded-sample models. They do not cover smaller deviations, correlated
drift, adversarial state-selection bias, or errors that preserve every tested
statistic. Those require expanded randomization and drift controls. Passing
still commissions only the finite Leech/inversion dictionary, not the Monster
CFT.

## Reproduce

```powershell
node scripts/analyze-leech-charge-shell-discrimination.mjs --write
node verification/verify/verify_leech_charge_shell_discrimination.mjs
```

## Evidence

- `evidence/data/leech-charge-shell-discrimination-v1.json`
- `scripts/analyze-leech-charge-shell-discrimination.mjs`
- `verification/verify/verify_leech_charge_shell_discrimination.mjs`

## Corpus links

- [Charge-shell commissioning packet](frontier_wave7_218_leech_charge_shell_commissioning.md)
- [Charge-shell geometry](frontier_wave7_217_leech_cutoff_charge_shell_geometry.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
