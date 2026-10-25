# Frontier Wave 7.225: 24-port commissioning digital twin

## The protocol now executes end to end

Wave 7.177 specifies a seven-frequency, 252-configuration commissioning
packet. Wave 7.224 supplies every ideal-network coefficient. Wave 7.225 joins
them in a deterministic recovery executable representing 25,200 complex
acquisitions, including 84 held-out multiport configurations.

The synthetic carrier has loss tangent \(10^{-4}\), relative per-acquisition
Gaussian noise \(2\times10^{-5}\), and 100 repeats per configuration. The
analysis reconstructs each admittance column, tests reciprocity before
symmetrization, extracts the frequency-scaled capacitance, fits one global
scale, inverts the recovered matrix, and predicts all held-out drives without
refitting.

## Ideal recovery

The Gram-first carrier passes every implemented gate:

- reciprocity residual: \(1.97\times10^{-6}\);
- loss ratio: \(1.001\times10^{-4}\);
- dispersion: \(8.88\times10^{-7}\);
- inverse-metric error: \(3.38\times10^{-5}\);
- worst held-out relative response error: \(7.43\times10^{-7}\).

This validates the analysis path under its declared synthetic noise model. It
is not evidence from a device.

## A predictive counterfeit still fails provenance

The adversarial control adds a positive rank-one perturbation of relative
spectral strength \(2\times10^{-5}\), aligned with the softest Gram-first
eigenvector. It remains positive, passive, reciprocal and frequency-flat. It
also predicts all 84 held-out drives, because the recovery correctly learns
the realized counterfeit matrix.

Nevertheless its inverse-metric error is 1.87%, so the Leech provenance gate
rejects it. This is the key distinction: predictive linear reconstruction is
necessary but does not establish that the reconstructed quadratic form is the
Leech form.

## Boundary

The twin uses deterministic synthetic Gaussian noise and one aligned
counterfeit. It does not replace fixture calibration, measured covariance,
bootstrap uncertainty, non-Gaussian failures or hardware data. It shows that
the full protocol is executable and that its inverse-sensitive test rejects a
physically mild false carrier invisible to the ordinary linear checks.

## Reproduce

```powershell
node scripts/run-leech-24port-commissioning-digital-twin.mjs --write
node verification/verify/verify_leech_24port_commissioning_digital_twin.mjs
```

## Evidence

- `evidence/data/leech-24port-commissioning-digital-twin-v1.json`
- `scripts/run-leech-24port-commissioning-digital-twin.mjs`
- `verification/verify/verify_leech_24port_commissioning_digital_twin.mjs`

## Corpus links

- [Ideal network manifest](frontier_wave7_224_leech_gram_first_network_manifest.md)
- [24-port commissioning packet](frontier_wave7_177_leech_24port_admittance_commissioning_packet.md)
- [Adversarial parasitic bound](frontier_wave7_179_leech_adversarial_psd_parasitic_bound.md)
- [Monster laboratory promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
