# The Spin(2,3) Compensator Lifts the Nonminimal Axial-Torsion Operator and Closes the Parent-Symmetry Escape

**Date:** 23 October 2026

**Status:** explicit parent-covariant operator construction and negative protection result

**Depends on:** [the minimal-universality boundary](1733_minimal_spin_connection_coupling_is_tree_level_flavor_universal_but_the_allowed_wilson_space_is_not.md) and [the explicit broken Spin(2,3) action](../1500-1599/1596_the_explicit_minimal_spin23_action_has_only_the_massless_graviton_and_torsion_square_does_not_create_a_gap.md)

**Evidence:** [parent-lift ledger](../../../evidence/data/spin23-parent-axial-operator-lift-v1.json) and [verifier](../../../verification/verify/verify_spin23_parent_axial_operator_lift.mjs)

## Result

The possibility that unbroken \(Spin(2,3)\) covariance forbids the nonminimal
axial torsion-current coupling is closed.  Once the compensator needed to
break \(Spin(2,3)\) to the Lorentz group is admitted, the low-energy operator
has an explicit parent-covariant four-form lift with an independent
dimensionless coefficient.

Let \(V^A\) be the fixed-norm compensator and define

\[
P^A{}_B=\delta^A{}_B-{V^AV_B\over V^2},
\qquad
E^A=P^A{}_B DV^B,
\qquad
T^A=P^A{}_BDE^B.
\]

The normalized Clifford element

\[
\Gamma_V={V_A\Gamma^A\over\sqrt{|V^2|}}
\]

becomes the four-dimensional chirality matrix, up to the usual signature
factor, in physical gauge.  The transverse parent axial current is

\[
J_5^A=P^A{}_B\bar\Psi\Gamma^B\Gamma_V\Psi.
\]

Every internal index in

\[
\boxed{
\Omega_{\rm nm}=\kappa\,(J_{5,A}E^A)\wedge(E_B\wedge T^B)
}
\]

is contracted.  The expression is a \(Spin(2,3)\)-invariant spacetime
four-form and therefore can be added to the parent action without breaking
the gauge symmetry.

## Physical-gauge reduction

Choose \(V^A=\ell\delta^A{}_4\).  Then

\[
E^a=e^a,
\qquad E^4=0,
\qquad \Gamma_V\sim\gamma_5,
\]

and the invariant becomes

\[
\Omega_{\rm nm}=\kappa J_5\wedge(e_a\wedge T^a).
\]

Writing \(T^a=\tfrac12T^a{}_{cd}e^c\wedge e^d\) and using the repository's
axial convention \(S^b=\epsilon^{acdb}T_{acd}\) gives

\[
J_5\wedge(e_a\wedge T^a)
=-{1\over2}S_aJ_5^a\,{\rm vol}
\]

up to the declared orientation and metric-sign conventions.  The numerical
factor can be absorbed into \(\kappa\); what matters is that the parent
invariant reduces to exactly the same axial operator whose coefficient was
left free in claim 1733.

## Consequence

Full parent gauge covariance does not set \(\kappa=0\), does not relate it to
the minimal spin-connection contribution, and does not reduce a family-space
coefficient to the identity beyond whatever separate internal symmetry is
imposed.  Parity does not help: both the torsion pseudotrace and the fermion
axial current are pseudovectors, so their contraction is parity even.

The word “minimal” must therefore remain an action choice.  It cannot be
promoted to a \(Spin(2,3)\) Ward identity.  A predictive universal coefficient
requires a new principle that forbids this explicit four-form, plus proof that
the principle survives the compensator vacuum, E6 breaking and quantum
matching.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_parent_axial_operator_lift.mjs
~~~
