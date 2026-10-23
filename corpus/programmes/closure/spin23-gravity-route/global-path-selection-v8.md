# Spin(2,3) Global Path Selection v8: Coefficient-Selection No-Go

**Frozen:** 23 October 2026

The final conventional selection mechanisms have been tested.  Because the
minimal and added terms multiply the identical operator (S_\mu J_5^\mu), no
unbroken low-energy symmetry can permit the former while forbidding the
latter.  Named continuous, discrete, family and compensator transformations
all leave the scalar operator or its identity flavor direction allowed.

The perturbative RG alternative also fails to select the geometric value:

\[
(4\pi)^2{d\eta\over dt}=C\eta h^2
\]

has only (eta=0) as a finite fixed point for nonzero (h), while all values
are marginal for (h=0).

| ID | Path | State | Result or blocker |
|---|---|---|---|
| SO | Same-operator symmetry selection | rejected | coefficient provenance is not a symmetry charge |
| DS | Named ordinary transformations | rejected | operator or identity direction remains invariant |
| RG | Perturbative fixed value (1/8) | rejected | only zero fixed, or all values marginal |
| UG | New UV grading/nonrenormalization | externally blocked | structure not supplied |
| FP | Interacting predictive fixed point | externally blocked | full beta functional and trajectory absent |

This exhausts the conventional selection graph.  Reopening requires genuinely
new object-level physics, not additional manipulation of the existing
representation or symmetry data.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_axial_coefficient_selection_no_go.mjs
node verification/verify/verify_spin23_uv_torsion_flavor_path_selection_v8.mjs
~~~
