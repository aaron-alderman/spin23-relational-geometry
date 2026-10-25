# Frontier Wave 7.227: charge-shell digital twin and Hadamard repair

## The synthetic commissioning path exposed a real counting error

Wave 7.218 treated a matrix-element tolerance of 0.02 as though it were a
Bernoulli-probability tolerance of 0.02. A \(\pm1\) Hadamard outcome instead
uses \(\hat m=2\hat p-1\), so the corresponding probability tolerance is
0.01. Applying the declared two-sided Hoeffding family split across sixteen
pairs therefore requires 32,308 shots per pair, not 8,077: 516,928
even-control shots in total.

This is a fourfold correction. The counterfeit bound for a 0.06 matrix bias
remains approximately \(5.96\times10^{-12}\), because the corrected
probability gap is half as large while the sample count is four times larger.
What changes is the validity of the promised 95% ideal-family coverage.

## Full charge-shell digital twin

The corrected executable samples the exact enumerated degree and exterior-hop
histograms, the Wave 7.222 drift-robust signal/blank arms and all sixteen even
controls. It represents:

- 82,257 norm-four state samples and 82,257 exterior-hop samples;
- 2,478,300 rootfulness trials;
- 8,337,280 odd-family trials;
- 516,928 even-control shots.

The ideal Leech shell passes every gate. All five Wave 7.219 counterfeits fail
their named observables. In particular, the phase leak fails odd cancellation
while the even control passes, whereas the biased even arm withholds phase
inference.

## Meaning and boundary

The charge-shell programme now has one frozen acquisition and truth-table path
from exact Leech combinatorics to a discriminating synthetic record. The twin
also demonstrated its value as an audit instrument by finding and repairing
an upstream factor-of-four error.

The record assumes independent trials, known efficiencies and the declared
background model. It does not implement the physical carrier, estimate drift
from real time series, or realize the route-swapped detector intervention.
The corrected counts are theorem-level concentration bookkeeping; the
synthetic trace is conditional engineering evidence.

## Reproduce

```powershell
node scripts/design-leech-charge-shell-commissioning.mjs --write
node scripts/analyze-leech-charge-shell-discrimination.mjs --write
node scripts/run-leech-charge-shell-commissioning-digital-twin.mjs --write
node verification/verify/verify_leech_charge_shell_commissioning.mjs
node verification/verify/verify_leech_charge_shell_commissioning_digital_twin.mjs
```

## Evidence

- `evidence/data/leech-charge-shell-commissioning-v1.json`
- `evidence/data/leech-charge-shell-commissioning-digital-twin-v1.json`
- `scripts/run-leech-charge-shell-commissioning-digital-twin.mjs`
- `verification/verify/verify_leech_charge_shell_commissioning_digital_twin.mjs`

## Corpus links

- [Charge-shell commissioning packet](frontier_wave7_218_leech_charge_shell_commissioning.md)
- [Counterfeit power](frontier_wave7_219_leech_charge_shell_counterfeit_power.md)
- [Drift-robust likelihood](frontier_wave7_222_leech_drift_robust_likelihood.md)
- [Signal--artifact identifiability](frontier_wave7_223_leech_signal_artifact_identifiability.md)
- [Monster laboratory promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
