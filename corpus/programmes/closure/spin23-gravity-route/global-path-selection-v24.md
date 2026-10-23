# Spin(2,3) Global Path Selection v24: Higher-Spin Escape Retains Continuous Parity Data

**Frozen:** 23 October 2026

The higher-spin/nonstandard-asymptotic loophole has been instantiated with the
AdS4 Vasiliev/vector-model class.  It genuinely evades the finite-species
flat-S-matrix assumptions, but it is a continuous parity-violating family and
does not identify its scalar with the PGT torsion pole.

| ID | Path | State | Result or blocker |
|---|---|---|---|
| HS | AdS4 infinite higher-spin parent | completed | infinite tower plus scalar outside flat finite-species assumptions |
| PP | Higher-spin consistency fixes one phase | rejected as selector | continuous parity phase / planar 't Hooft coupling remains |
| TI | Higher-spin scalar equals PGT torsion | rejected as selector | field, pole and current-matching map absent |
| HD | Complete higher-spin-to-PGT dictionary | externally blocked | normalized holographic and low-spin map absent |
| ES | Extended/broken supersymmetry | externally blocked | complete enlarged model absent |
| SV | Stabilized torsional compactification | externally blocked | microscopic vacuum data absent |

Evading the symmetry theorem therefore succeeds only by changing the model
radically, and the resulting model still carries continuous data.  Further
progress requires a new dictionary that both identifies the torsion pole and
fixes its normalized axial coupling.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_ads4_higher_spin_parity_selector_audit.mjs
node verification/verify/verify_spin23_new_model_path_selection_v12.mjs
~~~
