# Frontier Wave 7.226: nonlinear commissioning digital twin

## The 228-configuration packet now executes

Wave 7.188 preregisters six same-carrier nonlinear gates. Wave 7.226 joins
their harmonic, projected-quartic, order-complete soft-gap and compact-winding
targets in a deterministic synthetic experiment representing 22,800 repeated
acquisitions.

The executable uses the frozen twelve calibration modes and twelve held-out
modes. It fits one scale to the harmonic calibration modes and one shared
anharmonic scale to the calibration-mode shifts. It then scores held-out
resonances and shifts, the order-\(U^2\) soft gap, parity and transition
ordering, three 32-point offset-phase profiles, and twelve power controls.
No mode-specific Kerr term is fitted.

## Shared-cosine carrier

With relative harmonic and gap noise \(8\times10^{-5}\) and relative shift
noise \(10^{-4}\), the declared carrier passes N1--N6. The largest held-out
anharmonic residuals are 0.0358% at \(U/u=10^{-3}\) and 0.0229% at
\(U/u=10^{-2}\), inside the respective 0.1% and 0.25% gates.

## Mode-selective Kerr counterfeit

The control multiplies only held-out-mode anharmonic shifts by 1.005. It
preserves the harmonic fingerprint, soft gap, odd first transition, ordering,
exponential compactness trend and zero-power extrapolation. Yet its maximum
held-out shift residuals are 0.516% and 0.530%, so N2 rejects it at both
ratios.

This demonstrates that the calibration/holdout split tests a shared physical
cosine-coordinate dictionary. A generic collection of independently tunable
Kerr coefficients cannot inherit the Leech nonlinear claim merely by matching
the linear spectrum and softest mode.

## Boundary

This is synthetic Gaussian spectroscopy with one deliberately structured
counterfeit. It does not calibrate a laboratory likelihood, prove the
order-\(U^{5/2}\) remainder, determine the instanton prefactor or replace
measured nonlinear data. It validates the executable decision logic and one
important conventional alternative.

## Reproduce

```powershell
node scripts/run-leech-nonlinear-commissioning-digital-twin.mjs --write
node verification/verify/verify_leech_nonlinear_commissioning_digital_twin.mjs
```

## Evidence

- `evidence/data/leech-nonlinear-commissioning-digital-twin-v1.json`
- `scripts/run-leech-nonlinear-commissioning-digital-twin.mjs`
- `verification/verify/verify_leech_nonlinear_commissioning_digital_twin.mjs`

## Corpus links

- [Nonlinear commissioning packet](frontier_wave7_188_leech_nonlinear_commissioning_packet.md)
- [Linear commissioning digital twin](frontier_wave7_225_leech_24port_commissioning_digital_twin.md)
- [All-mode full-cosine order two](frontier_wave7_189_leech_24mode_full_cosine_order_two.md)
- [Monster laboratory promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
