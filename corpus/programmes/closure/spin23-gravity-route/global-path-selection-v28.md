# Spin(2,3) Global Path Selection v28: Known Supersymmetric PGT Models Miss at Least One Torsion Gate

**Frozen:** 23 October 2026

The nearest known torsionful supersymmetric parents have been tested against
four simultaneous requirements: local supersymmetry, an independent Lorentz
connection, a healthy propagating (0^-) pole, and nonlinear or
symmetry-protected consistency.  No audited construction satisfies all four.

| ID | Path | State | Result or blocker |
|---|---|---|---|
| SP | Named supersymmetric PGT audit | completed | five constructions compared gate by gate |
| DM | General analyzed unitary local-SUSY PGT | rejected as selector | feasible extension collapses to ordinary supergravity |
| KN | Supersymmetric Kuhfuss--Nitsch route | rejected as selector | algebraic connection in stated regime; nonlinear promising case fails |
| NS | Nishino propagating connection | rejected as selector | partial-order construction lacks healthy protected massive (0^-) completion |
| IR | Symmetry-first torsionlike EFT | rejected as selector | unitary protected catalogue has vectors, not scalar/pseudoscalar torsion |
| NP | New torsionful supersymmetric parent | externally blocked | complete action, constraints, protection and matching absent |
| HD | Higher-spin/PGT dictionary | externally blocked | normalized holographic map absent |
| SV | Stabilized torsional compactification | externally blocked | microscopic vacuum data absent |

The target is not forbidden in principle, but the next step is invention and
validation of a new theory.  Recombining claims from different models does not
produce a parent satisfying the four gates simultaneously.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_supersymmetric_pgt_compatibility_audit.mjs
node verification/verify/verify_spin23_new_model_path_selection_v16.mjs
~~~
