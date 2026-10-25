# Frontier Wave 7.221: background-likelihood repair

## Replacing the zero-background assumption

Wave 7.220 shows that the raw zero-event arms demand backgrounds below
(10^{-6}) per trial. This packet supplies the executable alternative: pair
each signal trial with a hopping-disabled blank, randomize their order under
a committed schedule, and test the difference of event proportions.

The threshold is half the efficiency-adjusted counterfeit signal. Two-sample
Bernstein bounds set both false-positive and false-negative budgets. The
family failure probability is (10^{-6}); the sixteen odd pairs split that
budget equally.

## Reference design

For measured stationary background at most (10^{-5}):

- norm-two contamination (5\times10^{-4}), at 90% detection efficiency,
  requires 338,280 signal and 338,280 blank trials, 676,560 total;
- odd leakage 0.005, at 50% efficiency, requires 71,067 signal and 71,067
  blank trials per pair, 142,134 total;
- all sixteen odd pairs require 2,274,144 trials.

This is substantially more expensive than zero-event testing but no longer
requires a vanishing raw background.

## Cost surface and promotion rule

The evidence record tabulates backgrounds (10^{-6},10^{-5},10^{-4},10^{-3})
against three efficiencies for each arm. Before data collection, use a table
entry whose background is at least the measured upper bound and whose
efficiency is no greater than the measured lower bound. If the platform lies
outside the grid, regenerate the table; interpolation is not preregistered.

## Remaining boundary

The repair tolerates stationary common background. It still assumes
independent paired trials. Drift, afterpulsing, crosstalk and label-dependent
background can invalidate the bound and require separate controls. The result
commissions a measurement design, not the Monster CFT.

## Reproduce

```powershell
node scripts/design-leech-charge-shell-background-likelihood.mjs --write
node verification/verify/verify_leech_charge_shell_background_likelihood.mjs
```

## Evidence

- `evidence/data/leech-charge-shell-background-likelihood-v1.json`
- `scripts/design-leech-charge-shell-background-likelihood.mjs`
- `verification/verify/verify_leech_charge_shell_background_likelihood.mjs`

## Corpus links

- [Detector burden audit](frontier_wave7_220_leech_charge_shell_detector_burden.md)
- [Counterfeit power](frontier_wave7_219_leech_charge_shell_counterfeit_power.md)
- [Charge-shell commissioning](frontier_wave7_218_leech_charge_shell_commissioning.md)
