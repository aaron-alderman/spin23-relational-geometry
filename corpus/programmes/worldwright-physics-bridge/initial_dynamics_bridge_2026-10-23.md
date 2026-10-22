# Worldwright–Spin(2,3) dynamics bridge: initial executable result

**Date:** 2026-10-23

**Status:** bounded mathematical and experimental-method bridge; no cross-domain semantic identification

## Result

Worldwright's useful contribution to the physics programme is an experiment discipline, not a claim that social quantities are physical fields. The first executable bridge applies that discipline to the existing critical Poincaré-gauge 0-minus torsion observable:

- immutable equations and parameter axes;
- matched polarized and unpolarized controls;
- a complete response surface;
- mechanism ablations;
- exact deterministic replay;
- named falsifiers and an explicit authority boundary.

The normalized separated-source kernel is:

```text
K(x) = exp(-x) * [
  -(s1 dot s2) * (x + 1)
  + (s1 dot rhat) * (s2 dot rhat) * (x^2 + 3*x + 3)
]
x = m_phi * r / (hbar * c)
```

The executed surface contains 560 cells over seven dimensionless ranges, five orientations and sixteen polarization pairs. All 245 zero-polarization controls vanish exactly. The 252 geometrically nonzero polarized cells reproduce the required orientation sign changes.

For parallel unit spins, the radial kernel decreases from 2 at `x=0` to `3.26352e-5` at `x=16`, while the transverse kernel is negative. The absolute radial-to-transverse ratio grows from 2 to 17.0588. Thus range suppresses the absolute force but sharpens its tensor anisotropy. Removing the Yukawa exponential exaggerates the `x=16` radial response by more than eight million.

## What this establishes

The present Spin(2,3) programme has at least one concrete physical candidate that can be handled by the same reproducibility, sensitivity and ablation machinery being built for Worldwright. The candidate has strong negative controls:

1. unpolarized frame dragging remains exactly GR at linear tree level;
2. either unpolarized body gives zero separated torsion signal;
3. reversing one polarization reverses the signal;
4. radial and transverse configurations have different signs and a fixed range-dependent ratio;
5. the force is exponentially suppressed beyond its Compton range.

These are genuine physical statements of the selected effective action. They are not evidence that the force has been detected.

## What remains missing

The tensor-Yukawa force is shared by generic pseudoscalar and propagating-torsion effective theories. It becomes a Spin(2,3) fingerprint only if the broken parent fixes `A`, `B` and the flavor-dependent axial couplings `c_f`, hence the mediator range and correlated strengths. Empirical confrontation additionally requires apparatus-specific spin densities, finite-size integration, nuisance covariance and a likelihood against published measurements.

No Worldwright wellbeing, identity, political-capital or kenotic variable is mapped to a physical charge or field. Conversely, this physical calculation gives Worldwright no empirical, moral or policy authority.

## Synthetic calibration gate

A second executable artifact demonstrates the inference path without pretending to supply data. A twelve-cell radial/transverse separation scan injects dimensionless mass 1 and amplitude 0.2, profiles the amplitude over five candidate masses, and uniquely recovers the injected grid point. Its null chi-squared is 1580.09, while the injected point has numerical zero residual.

Those numbers are properties of a noiseless synthetic dataset and have no detection significance. The artifact separately lists the measurements, covariance, finite spin-density geometry, apparatus response, nuisance models and blind-analysis rules required before empirical calibration is admissible.

## Empirical calibration source audit

The closest primary empirical anchor identified so far is Xu et al., *Physical Review Letters* 134, 181801 (2025), DOI 10.1103/PhysRevLett.134.181801. It measures the same generic pseudoscalar dipole-dipole tensor interaction with a shielded polarized source and comagnetometer.

At a reported 7 mm force range, the article gives an electron-neutron coupling estimate of (0.38 +/- 1.08 statistical +/- 0.48 systematic)e-9 and an absolute 95% upper limit of 2.4e-9. A range conversion gives 0.02819 meV, consistent with the paper's approximate 0.03 meV. A deliberately simple one-sided Gaussian calculation from the rounded uncertainties gives 2.324e-9, within four percent of the published limit.

This is enough for a provenance anchor and sanity check, but not a full independent reconstruction. The inspected article does not expose a raw time series, full covariance, executable spin-density geometry or machine-readable mass-dependent likelihood. The calibration gate therefore remains closed pending those inputs.

## Reproduction

```powershell
node verification/verify/verify_spin23_critical_pgt_lense_thirring_spin_yukawa.mjs
node verification/verify/verify_spin23_worldwright_torsion_response_surface.mjs
node verification/verify/verify_spin23_torsion_synthetic_likelihood.mjs
node verification/verify/verify_spin23_torsion_empirical_calibration_source_audit.mjs
node verification/verify/verify_spin23_torsion_fingerprint_parameter_closure.mjs
node verification/verify/verify_spin23_torsion_finite_geometry_response.mjs
node verification/verify/verify_spin23_worldwright_bridge_assurance_manifest.mjs
```

The final command is the aggregate assurance entry point for the first five-stage chain. It verifies SHA-256 pins for all evidence/verifier pairs in that manifest, executes every listed verifier, and checks that the chain still withholds detection, Spin(2,3) specificity, Worldwright empirical validation, policy authority and moral authority. The finite-geometry result is independently executable and is to be added to the aggregate manifest after this tranche is hash-pinned.

The machine-readable response surface is [spin23-worldwright-torsion-response-surface-v1.json](../../../evidence/data/spin23-worldwright-torsion-response-surface-v1.json).

The synthetic calibration contract is [spin23-torsion-synthetic-likelihood-v1.json](../../../evidence/data/spin23-torsion-synthetic-likelihood-v1.json).

The primary-source audit is [spin23-torsion-empirical-calibration-source-audit-v1.json](../../../evidence/data/spin23-torsion-empirical-calibration-source-audit-v1.json).

The finite-volume response is [spin23-torsion-finite-geometry-response-v1.json](../../../evidence/data/spin23-torsion-finite-geometry-response-v1.json).

## Fingerprint closure

The existing corpus does not already fix an accessible Spin(2,3)-specific signal. Its natural minimal benchmark has a Planck-mass torsion pole. Moving that pole to a 7 mm range requires a mass reduction of about `8.64e31`; at fixed `A`, the corresponding relative increase in `B/A` is about `7.46e63`.

The minimal bare Dirac coefficient `|c_f|=1/8` is a useful benchmark, but it is not yet a derived low-energy flavor prediction after nonminimal terms, thresholds and descendant matching. Consequently:

- the natural benchmark is experimentally inaccessible as a separated force;
- a fitted light pole is generic EFT phenomenology rather than a prediction;
- a hierarchically light pole is not fundamental without radiative protection;
- a distinctive fingerprint still requires one anomaly-free, radiatively closed descendant to calculate `A`, `B` and all relevant `c_f`.

This is a useful negative result: present experiments can constrain the surviving EFT, but neither a null result nor a detected generic tensor-Yukawa force can currently identify Spin(2,3).

The executable closure gate is [spin23-torsion-fingerprint-parameter-closure-v1.json](../../../evidence/data/spin23-torsion-fingerprint-parameter-closure-v1.json).

The hash-pinned executable chain is [spin23-worldwright-bridge-assurance-manifest-v1.json](../../../evidence/data/spin23-worldwright-bridge-assurance-manifest-v1.json).

## Finite geometry gate

The point-source observable has now been integrated over two identical, uniformly polarized, axis-aligned cubes using deterministic product quadrature. The cubes remain non-overlapping, so the excluded contact term never enters. The fifteen-cell response covers three mediator masses and five source-size ratios, with independent order-14 and order-20 calculations agreeing to a maximum absolute difference of `2.06e-11`.

The result identifies the regime in which apparatus geometry is scientifically consequential. At `m*d=4` and `a/d=0.75`, the volume-integrated radial response is `1.6703` times the center-point estimate and the transverse magnitude is `1.4539` times it. The closest polarized volume elements dominate a short-range interaction, and the finite geometry also shifts the radial/transverse anisotropy from `5.2` to `5.9739`. Therefore a real experimental recast needs the apparatus spin-density geometry or a bounded approximation error; center separation alone is insufficient.

## Next gates

1. Replace the ideal uniform cubes with a published apparatus's actual polarized source and detector geometry.
2. Recast published spin-dependent-force limits as a likelihood over mediator mass and coupling product.
3. Derive or rule out a parent relation fixing `A`, `B` and `c_f`.
4. Keep the physical likelihood, Worldwright calibration data and cross-domain analogy ledger as three separate evidence objects.
