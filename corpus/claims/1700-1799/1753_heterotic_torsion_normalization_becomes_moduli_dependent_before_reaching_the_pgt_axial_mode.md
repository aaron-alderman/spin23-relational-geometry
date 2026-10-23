# Heterotic Torsion Normalization Becomes Moduli Dependent Before Reaching the PGT Axial Mode

**Date:** 23 October 2026

**Status:** explicit ten-to-four-dimensional normalization and field-identity audit

**Depends on:** [the supersymmetry path checkpoint](1752_local_supersymmetry_fails_as_a_selector_and_string_normalization_is_the_next_model_branch.md)

**Evidence:** [heterotic normalization ledger](../../../evidence/data/spin23-heterotic-torsion-normalization-audit-v1.json) and [verifier](../../../verification/verify/verify_spin23_heterotic_torsion_normalization_audit.mjs)

## Result

The heterotic string provides genuinely quantized parent data, but those data
do not fix the canonically normalized four-dimensional PGT axial coefficient
to \(1/8\).

In ten dimensions the gauge-invariant three-form has the schematic fixed form

\[
 H=dB-\frac{\alpha'}4(\omega_{\rm YM}-\omega_{\rm L}),
\]

and supersymmetry uses torsionful connections \(\Omega_\pm=\omega\pm H/2\)
in convention-dependent locations.  Chern--Simons levels, integral fluxes and
trace normalizations are discrete.  This fixes relative terms in the parent
action; it does not bypass four-dimensional canonical normalization.

## Canonical reduction

For an unwarped zero mode the four-dimensional three-form kinetic term has
the structure

\[
 -{Z_H\over12}H_{\mu\nu\rho}H^{\mu\nu\rho},
 \qquad
 Z_H\propto{V_6e^{-2\phi}\over\kappa_{10}^2}.
\]

Warping, wave-function overlap and thresholds refine this expression without
removing its modulus dependence.  If the parent fermion vertex has coefficient
\(\lambda_{10}\), then

\[
 H_c=\sqrt{Z_H}H,
 \qquad
 \lambda_c={\lambda_{10}\over\sqrt{Z_H}}.
\]

Thus the same parent value \(\lambda_{10}=1/8\) gives \(1/8\), \(1/16\), or
\(1/4\) for \(Z_H=1,4,1/4\), respectively.  Flux integrality does not fix the
dilaton, volume, warping or normalized zero-mode overlap.

## The fields are not yet the same

The string field is a two-form gauge potential with field strength \(H\).  The
critical PGT field is an independent Lorentz connection whose axial torsion is
\(S_\mu\).  Calling both objects “torsion” does not identify their canonical
variables.  A valid bridge must calculate a reduction and mixing matrix and
show that one normalized \(H\) mode is the same physical longitudinal pole as
the PGT \(0^-\) connection mode.

The universal four-dimensional axion obtained by dualizing an unlifted
\(H_{\mu\nu\rho}\) is shift-symmetric and massless.  The target PGT mode is
massive.  Fluxes, instantons, gaugino condensation or another potential must
lift the axion; those mechanisms introduce precisely the compactification and
threshold data that determine its mass and mixing.

## Verdict

String theory improves the logical status of the parent normalization but does
not finish the prediction:

\[
 \boxed{
 \text{quantized parent data}
 \not\Rightarrow
 \text{modulus-independent canonical }\eta_{4D}=1/8.
 }
\]

A successful string branch must specify one compactification, stabilize its
moduli, derive the full axion/connection kinetic matrix, identify the massive
eigenmode, and perform threshold matching to the four-dimensional fermions.

## Sources

- K. Becker and K. Dasgupta, [*Heterotic Strings with Torsion*](https://arxiv.org/abs/hep-th/0209077), for supersymmetric heterotic compactifications with torsion.
- K. Dasgupta, H. Firouzjahi and R. Gwyn, [*On the Warped Heterotic Axion*](https://arxiv.org/abs/0803.3828), for explicit warp dependence of the axion decay constant.
- E. Buchbinder, A. Constantin and A. Lukas, [*A Heterotic QCD Axion*](https://arxiv.org/abs/1412.8696), for Kähler-moduli dependence of heterotic axion normalization.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_heterotic_torsion_normalization_audit.mjs
~~~
