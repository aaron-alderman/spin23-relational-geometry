# Frontier Wave 7.220: detector, background and drift burden

## Why ideal power is not laboratory power

Wave 7.219 proves strong discrimination under independent bounded samples,
perfect event detection and zero background. This packet computes the hidden
instrument requirements needed to transport those powers to data.

## Zero-event background burden

The rootlessness and odd-cancellation arms currently pass only when no event
is observed. To retain a 95% probability of passing an ideal carrier:

- the background norm-two event probability must be below
  (1.7123\times10^{-6}) per trial across 29,956 trials;
- the zero-charge background must be below (5.5599\times10^{-7}) per trial
  across the full sixteen-pair odd family.

These are platform requirements, not consequences of the Leech model.

## Detection efficiency burden

To keep false acceptance below (10^{-6}) for the named alternatives:

- detecting a norm-two contamination rate (5\times10^{-4}) requires event
  efficiency at least 0.9221742;
- detecting one odd-pair leakage rate 0.005 requires efficiency at least
  0.4786324.

An experiment below either efficiency cannot inherit Wave 7.219's power.

## Drift and selection masking

A biased scheduler or calibration drift can conceal the named alternatives
if it shifts:

- the isolated-state sample by 0.02;
- the norm-eight corona sample by 0.02;
- the even-control matrix element by 0.04.

The experiment must therefore commit a blinded randomized state/command
schedule and bound imbalance below these margins.

## Required repair

The preferred promotion is an interleaved signal-versus-background
likelihood ratio with blank controls and blinded randomized scheduling. The
raw zero-event protocol remains valid only if the selected platform directly
demonstrates the much stronger background and efficiency burdens above.

This audit does not retract the ideal-model discriminator. It prevents that
result from being misreported as laboratory power before the detector
dictionary exists.

## Reproduce

```powershell
node scripts/audit-leech-charge-shell-detector-burden.mjs --write
node verification/verify/verify_leech_charge_shell_detector_burden.mjs
```

## Evidence

- `evidence/data/leech-charge-shell-detector-burden-v1.json`
- `scripts/audit-leech-charge-shell-detector-burden.mjs`
- `verification/verify/verify_leech_charge_shell_detector_burden.mjs`

## Corpus links

- [Counterfeit discrimination power](frontier_wave7_219_leech_charge_shell_counterfeit_power.md)
- [Charge-shell commissioning](frontier_wave7_218_leech_charge_shell_commissioning.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
