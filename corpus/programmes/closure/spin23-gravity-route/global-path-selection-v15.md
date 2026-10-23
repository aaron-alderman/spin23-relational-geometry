# Spin(2,3) Global Path Selection v15: Minimal New-Model Exhaustion

**Frozen:** 23 October 2026

Three concrete enlargement families have now been executed.  Axial gauging
leaves continuous gauge/locking parameters; local supersymmetry leaves a
continuous Kähler parameter; heterotic normalization becomes dependent on
four-dimensional moduli and a nontrivial field-mixing map.

| ID | Path | State | Result or blocker |
|---|---|---|---|
| AU | Compact axial gauge locking | rejected as selector | \(g\rho\) remains continuous |
| SG | \(N=1\) local supersymmetry | rejected as selector | arbitrary Kähler coupling and extra spectrum |
| ST | Heterotic torsion normalization | rejected as selector | canonical coupling is moduli/mixing dependent |
| CC | Fully specified stabilized compactification | externally blocked | geometry, bundle, flux, modes and thresholds absent |
| FP | Nonperturbative fixed point | externally blocked | complete quantum packet absent |

This is global exhaustion of the minimal generic new-model families.  Further
work cannot proceed by naming another framework; it must provide a complete
compactification dataset or execute the full Spin(2,3) quantum calculation.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_heterotic_torsion_normalization_audit.mjs
node verification/verify/verify_spin23_new_model_path_selection_v3.mjs
~~~
