# Spin(2,3) Global Path Selection v27: The Standard S7 Uplift Is Not a Torsion Uplift

**Frozen:** 23 October 2026

The strongest existing higher-dimensional parent has now been inspected at the
field-identity level.  Standard eleven-dimensional supergravity consistently
uplifts the ordinary (SO(8))-gauged (N=8) model, but its four-dimensional
pseudoscalars descend through metric and three-form/flux data.  It contains no
independent propagating bosonic Lorentz connection whose axial mode could be
identified with the PGT pole.

| ID | Path | State | Result or blocker |
|---|---|---|---|
| S7 | Standard (omega=0) (S^7) uplift | completed | consistent metric and three-form parent |
| AF | (A_3) pseudoscalar equals PGT torsion | rejected as selector | different gauge-field origin and no connection identity |
| SC | Supercovariant torsion supplies the pole | rejected as selector | gravitino bilinear is not an independent bosonic connection mode |
| TE | Torsionful first-order parent extension | externally blocked | multiplet, kinetic operator, reduction and matching absent |
| HD | Higher-spin/PGT dictionary | externally blocked | normalized holographic map absent |
| SV | Stabilized torsional compactification | externally blocked | microscopic vacuum data absent |

This closes the shortcut “use the known (S^7) uplift and rename a
pseudoscalar torsion.”  Reopening requires changing the microscopic parent to
include an independent connection or an explicitly equivalent torsion
multiplet and then performing its compactification and threshold matching.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_s7_uplift_pgt_field_identity_audit.mjs
node verification/verify/verify_spin23_new_model_path_selection_v15.mjs
~~~
