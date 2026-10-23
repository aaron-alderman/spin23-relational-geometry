# Spin(2,3) Global Path Selection v22: Standard Bimetric Ward Identities Do Not Select the Axial Portal

**Frozen:** 23 October 2026

The standard-positive bimetric survivor has been explicitly joined to the
healthy pseudoscalar torsion sector.  The resulting quadratic parent remains
healthy and invariant for a continuous axial coefficient.

| ID | Path | State | Result or blocker |
|---|---|---|---|
| BM | Positive bimetric sector | completed | positive massless and massive spin-two spectral weights |
| TP | Healthy \(0^-\) torsion sector | completed | positive massive pseudoscalar pole |
| JP | Minimal joined parent | completed | common healthy free spectrum for continuous \(\eta\) |
| SW | Standard Ward identities select \(1/8\) | rejected as selector | the axial portal is separately invariant |
| CW | New cross-sector parent principle | externally blocked | no linking symmetry or theorem supplied |
| SV | Stabilized torsional compactification | externally blocked | microscopic vacuum data absent |

The most promising standard-positive spin-two completion therefore reaches
the same coefficient boundary as every earlier route.  A selector must act
across spin two, torsion and matter; ordinary gravitational gauge symmetry
does not.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_bimetric_torsion_product_ward_audit.mjs
node verification/verify/verify_spin23_new_model_path_selection_v10.mjs
~~~
