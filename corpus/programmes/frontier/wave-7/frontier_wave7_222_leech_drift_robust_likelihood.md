# Frontier Wave 7.222: drift-robust charge-shell likelihood

## What this repairs

Wave 7.221 removes the zero-background assumption but treats signal and blank
backgrounds as common and trials as independent. This packet makes both
departures explicit. It bounds signal-versus-blank label asymmetry and uses a
design effect to inflate the raw trial count for autocorrelation, afterpulsing
or clustered acquisitions.

The statistical guard is strict: the label-dependent background difference
must remain below the preregistered decision threshold. The remaining gap is
then used in the same two-sample Bernstein calculation, and the larger of the
false-positive and false-negative budgets is multiplied by the measured
design effect.

## Conservative reference design

At common background at most \(10^{-5}\), reserving 25% of each decision
threshold for label asymmetry and using design effect 2 gives:

- rootful contamination: label-difference bound \(5.625\times10^{-5}\),
  1,239,150 trials per arm and 2,478,300 total;
- odd leakage: label-difference bound \(3.125\times10^{-4}\), 260,540 trials
  per arm and 521,080 total per inversion pair;
- all sixteen odd pairs: 8,337,280 trials.

The evidence record includes a sixteen-point surface for each arm: four
label-bias fractions crossed with four design effects. No favorable
interpolation is allowed.

## Execution contract

The acquisition order and labels are cryptographically committed before
unblinding; each acquisition block balances signal and blank counts. Sentinel
labels estimate background asymmetry, and the time-ordered record estimates
the integrated-autocorrelation design effect. The selected cost-surface cell
must be no more favorable than both measured bounds, otherwise the budget is
regenerated before hypothesis testing.

## Physical meaning and remaining boundary

This closes the named stationary-background and bounded-correlation loopholes
in the commissioning protocol. It does not make Monster symmetry a laboratory
fact. Nonergodic state changes, an unbounded adversarial drift, or detector
response that changes specifically in the presence of the physical signal
remain outside the guarantee. Those failures require blockwise change-point
controls and signal-injection calibration, not a larger nominal shot count.

## Reproduce

```powershell
node scripts/design-leech-charge-shell-drift-robust-likelihood.mjs --write
node verification/verify/verify_leech_charge_shell_drift_robust_likelihood.mjs
```

## Evidence

- `evidence/data/leech-charge-shell-drift-robust-likelihood-v1.json`
- `scripts/design-leech-charge-shell-drift-robust-likelihood.mjs`
- `verification/verify/verify_leech_charge_shell_drift_robust_likelihood.mjs`

## Corpus links

- [Background-likelihood repair](frontier_wave7_221_leech_background_likelihood_repair.md)
- [Detector burden audit](frontier_wave7_220_leech_charge_shell_detector_burden.md)
- [Charge-shell commissioning](frontier_wave7_218_leech_charge_shell_commissioning.md)
