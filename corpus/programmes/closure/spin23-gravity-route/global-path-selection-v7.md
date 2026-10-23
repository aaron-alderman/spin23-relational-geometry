# Spin(2,3) Global Path Selection v7: Parent-Covariance Closure

**Frozen:** 23 October 2026

Version 6 left open the logical possibility that a complete unbroken-parent
action would forbid the nonminimal axial operator.  The compensator closes
that escape explicitly.  With projected coframe (E^A), torsion (T^A) and
axial current (J_5^A), the four-form

\[
\kappa(J_{5,A}E^A)\wedge(E_B\wedge T^B)
\]

is fully (Spin(2,3)) covariant and reduces to the axial torsion-current
operator in physical gauge.  Parity also permits it.

| ID | Path | State | Result or blocker |
|---|---|---|---|
| PL | Parent operator lift | completed | explicit invariant four-form |
| PG | Parent gauge protection | rejected | invariant reduces to (S\cdot J_5) |
| PP | Parity protection | rejected | pseudovector times pseudovector is even |
| NS | New selection law | externally blocked | no such law is declared |
| TM | Threshold prediction | externally blocked | full action and spectrum absent |

The reachable protection graph is exhausted.  The minimal value remains a
standard conditional benchmark.  Reopening requires a genuinely new symmetry
or dynamical selection law that forbids the displayed parent invariant while
retaining the minimal matter action, followed by complete heavy-threshold and
anomaly matching.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_parent_axial_operator_lift.mjs
node verification/verify/verify_spin23_uv_torsion_flavor_path_selection_v7.mjs
~~~
