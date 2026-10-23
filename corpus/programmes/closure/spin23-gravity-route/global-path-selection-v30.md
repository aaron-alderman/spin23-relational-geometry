# Spin(2,3) Global Path Selection v30: Ordinary Lorentz Super-Yang--Mills Is Indefinite

**Frozen:** 23 October 2026

The minimal attempt to construct a new supersymmetric independent-connection
parent has been executed.  The complete real invariant bilinear family on
(so(1,3)) has signature ((3,3)), so an ordinary (N=1) Lorentz
vector-supermultiplet kinetic term necessarily contains negative-sign
directions.

| ID | Path | State | Result or blocker |
|---|---|---|---|
| LV | Ordinary Lorentz vector supermultiplet | completed | invariant kinetic family derived exactly |
| KF | Positive invariant kinetic form | rejected as selector | every nonzero form has signature ((3,3)) |
| SS | SUSY projects bad directions | rejected as selector | common kinetic metric pairs, not removes, them |
| NR | Nonlinear realization preserves minimality | rejected as selector | requires new fields, compact subgroup and vacuum |
| NP | Non-Yang--Mills four-gate parent | externally blocked | full action, vacuum, constraints, protection and matching absent |
| HD | Higher-spin/PGT dictionary | externally blocked | normalized holographic map absent |
| SV | Stabilized torsional compactification | externally blocked | microscopic vacuum data absent |

The minimal new construction is therefore closed.  Any viable connection
supermultiplet must use genuinely gravitational/tetrad-dependent invariants,
nonlinear realization, complex variables with reality conditions, or a
higher-dimensional reduction, each of which reintroduces the previously
identified construction gates.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_lorentz_vector_supermultiplet_kinetic_audit.mjs
node verification/verify/verify_spin23_new_model_path_selection_v18.mjs
~~~
