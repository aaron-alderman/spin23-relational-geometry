# Spin(2,3) Global Path Selection v9: Commuting-Grading Closure

**Frozen:** 23 October 2026

Schur's lemma closes the last conventional UV-grading class.  A linear
internal symmetry commuting with (Spin(2,3)) acts on the real
multiplicity-one compensator only by a sign and on families by a unitary
matrix.  The compensator sign occurs twice in each factor of

\[
(J_{5,A}E^A)\wedge(E_B\wedge T^B),
\]

while family conjugation preserves the identity.  The operator is therefore
invariant for the entire class.

| ID | Path | State | Result or blocker |
|---|---|---|---|
| CL | Commuting linear grading | rejected | parent operator remains invariant |
| NC | Noncommuting enlargement | externally blocked | new algebra and action absent |
| SP | Charged extra spurion | externally blocked | field and vacuum absent |
| NT | Nonlinear/topological rule | externally blocked | rule and invariant absent |
| FP | Interacting fixed point | externally blocked | beta functional and trajectory absent |

Every surviving route now requires a new object-level model.  There is no
remaining transformation to test on the currently declared field content.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_commuting_uv_grading_no_go.mjs
node verification/verify/verify_spin23_uv_torsion_flavor_path_selection_v9.mjs
~~~
