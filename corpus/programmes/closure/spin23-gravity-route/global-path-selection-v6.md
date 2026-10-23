# Spin(2,3) Global Path Selection v6: UV Torsion Flavor

**Frozen:** 23 October 2026

## Reopening

Version 5 ended the public experimental-hadronic route at joint-likelihood,
third-projection and UV-matching gates.  Version 6 follows the UV branch as far
as the current Spin(2,3), E6 and family-symmetry data allow.

| ID | Path | State | Result or blocker |
|---|---|---|---|
| MC | Minimal spin connection | completed | common \(|c_{\min}|=1/8\) |
| BR | Mass-basis rotation | completed | \(U^\dagger I U=I\); no induced flavor change |
| E6 | Exact parent covariance | completed | scalar on one 27, family matrix on three 27s |
| Z3 | Residual family protection | rejected | circulant commutant contains non-scalar matrices |
| MP | Radiative minimality | rejected | allowed dimension-four nonminimal counterterm |
| MA | Complete matter action | externally blocked | kinetic representation and protection law absent |
| TM | Threshold matching | externally blocked | heavy spectrum, scales and scheme absent |

## Decision

Minimal Dirac geometry gives a clean conditional prediction,

\[
c_f=\pm{1\over8}
\]

for every canonically normalized species at the tree-level minimal point.  A
coefficient proportional to the identity stays proportional to the identity
under flavor rotations.  This strengthens the benchmark used in the force
programme: its universality is not invalidated merely by diagonalizing masses.

It does not close the UV route.  The axial torsion-current operator is already
an allowed dimension-four Wilson operator.  Exact E6 covariance makes it
scalar inside one irreducible 27, but the three-family multiplicity retains a
matrix.  The established cyclic family symmetry restricts that matrix to the
circulant algebra and demonstrably leaves non-scalar directions.  Published
torsion EFT renormalization likewise treats the axial coefficient as a
nonminimal coupling rather than a protected geometric constant.

## Stopping status

The presently reachable UV flavor graph is exhausted.  Its two live exits are
not further algebraic branches:

1. supply a complete broken-parent fermion action and an exact symmetry or
   other principle that eliminates the nonminimal matrix directions; then
2. supply the heavy spectrum and perform scale- and scheme-declared threshold
   and anomaly matching to the electron and light-quark coefficients.

Without those inputs, choosing \(c_f=1/8\) is a standard minimal benchmark,
not a distinctive Spin(2,3) prediction.  Experimental bounds constrain the
resulting EFT but cannot select the missing UV Wilson matrix.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_minimal_fermion_universality_boundary.mjs
node verification/verify/verify_spin23_uv_torsion_flavor_path_selection_v6.mjs
~~~
