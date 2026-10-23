# Every Commuting Linear UV Grading Leaves the Parent Axial-Torsion Operator Invariant

**Date:** 23 October 2026

**Status:** Schur-class no-go for the remaining conventional UV-grading route

**Depends on:** [the parent operator lift](1736_the_spin23_compensator_lifts_the_nonminimal_axial_torsion_operator_and_closes_the_parent_symmetry_escape.md) and [the same-operator symmetry no-go](1739_no_unbroken_symmetry_can_fix_the_minimal_axial_coefficient_and_perturbative_rg_does_not_select_one_eighth.md)

**Evidence:** [grading ledger](../../../evidence/data/spin23-commuting-uv-grading-no-go-v1.json) and [verifier](../../../verification/verify/verify_spin23_commuting_uv_grading_no_go.mjs)

## Result

The remaining UV-grading proposal fails for the entire class of linear
internal symmetries commuting with \(Spin(2,3)\), not merely for the named
examples tested previously.

Let such a symmetry act on the declared multiplicity-one compensator and the
fermion family space.  Schur's lemma and the compensator's reality imply

\[
V^A\mapsto sV^A,
\qquad s\in\{+1,-1\},
\qquad
\Psi\mapsto U\Psi,
\]

where \(U\) is unitary on family multiplicity.  The Cartan connection cannot
carry an independent phase while retaining the inhomogeneous transformation
law of a connection for the same gauged algebra.

The compensator sign induces

\[
E^A\mapsto sE^A,
\qquad
T^A\mapsto sT^A,
\qquad
\Gamma_V\mapsto s\Gamma_V,
\qquad
J_5^A\mapsto sJ_5^A
\]

on the identity-valued family current.  Consequently

\[
J_{5,A}E^A\mapsto J_{5,A}E^A,
\qquad
E_B\wedge T^B\mapsto E_B\wedge T^B,
\]

and therefore

\[
(J_{5,A}E^A)\wedge(E_B\wedge T^B)
\mapsto
(J_{5,A}E^A)\wedge(E_B\wedge T^B).
\]

Arbitrary family rotations do not alter this result because

\[
U^\dagger\mathbf1 U=\mathbf1.
\]

They may restrict nonidentity flavor directions, but never remove the
universal scalar coefficient.

## Boundary

This theorem exhausts commuting linear internal gradings on the present field
content.  Avoiding it requires changing the problem by adding at least one of:

- a noncommuting enlargement of the gauge or Clifford structure;
- a new charged spurion or compensator;
- a nonlinear or topological selection rule; or
- dynamical fixed-point selection.

Those are new model ingredients, not undiscovered consequences of the current
\(Spin(2,3)\times E_6\times Z_3\) data.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_commuting_uv_grading_no_go.mjs
~~~
