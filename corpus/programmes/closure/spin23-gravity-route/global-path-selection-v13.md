# Spin(2,3) Global Path Selection v13: New-Model Reopening

**Frozen:** 23 October 2026

The programme has crossed from current-theory exhaustion into explicit model
construction.  The least invasive gauged-axial completion has been built and
integrated out.  It relocates the desired coefficient to \(gq\rho\), introduces
a massive vector and four-fermion threshold, and requires anomaly-cancelling
matter.

| ID | Path | State | Result or blocker |
|---|---|---|---|
| AU | Compact axial gauge locking | rejected as selector | continuous \(g\rho\), anomalies and extra spectrum |
| SG | Local supersymmetry Ward identity | next selected | explicit symmetry, but invariants and spectrum must be audited |
| FP | Nonperturbative fixed point | externally blocked | complete quantization/beta packet absent |

The next active calculation is the local-supersymmetry branch.  It must decide
whether supersymmetry genuinely forbids the independent axial invariant or
only embeds it in a larger supermultiplet.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_axial_u1_locking_completion.mjs
node verification/verify/verify_spin23_new_model_path_selection_v1.mjs
~~~
