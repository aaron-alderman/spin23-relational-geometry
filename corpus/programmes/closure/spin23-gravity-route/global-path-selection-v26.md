# Spin(2,3) Global Path Selection v26: Maximal Supersymmetry Does Not Restore Uniqueness

**Frozen:** 23 October 2026

The higher-(N) escape has been tested at its strongest endpoint.  Maximal
four-dimensional (N=8), (SO(8))-gauged supergravity admits a continuous
(omega)-deformed family whose maximally symmetric quadratic spectrum is
unchanged while interaction data vary.  More supersymmetry alone therefore
cannot turn the spectrum into a unique theory or identify the PGT portal.

| ID | Path | State | Result or blocker |
|---|---|---|---|
| N8 | Maximal (N=8) (SO(8)) supergravity | completed | continuous (omega) family at fixed symmetric-vacuum quadratic spectrum |
| OD | Maximal SUSY selects (omega) | rejected as selector | inequivalent interaction data persist modulo discrete identifications |
| PI | N=8 pseudoscalar equals PGT torsion | rejected as selector | 128+128 multiplet and missing Lorentz-connection map |
| UP | Specific uplift and torsion matching | externally blocked | frame, uplift, vacuum/breaking, field map and thresholds absent |
| HD | Higher-spin/PGT dictionary | externally blocked | normalized holographic map absent |
| SV | Stabilized torsional compactification | externally blocked | microscopic vacuum data absent |

This closes the generic inference “increase (N) until the coefficient is
forced.”  It does not claim that every intermediate (N=3,ldots,7) model has
been enumerated; the maximal counterexample is enough to disprove that
supersymmetry strength by itself guarantees uniqueness.  Reopening the route
requires one specified model with an uplift, vacuum and explicit torsion map.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_n8_omega_deformation_axial_selector_audit.mjs
node verification/verify/verify_spin23_new_model_path_selection_v14.mjs
~~~
