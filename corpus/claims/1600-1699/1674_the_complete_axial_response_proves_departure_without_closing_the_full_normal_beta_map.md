# The Complete Axial Response Proves Departure Without Closing the Full Normal-Beta Map

> **Update (claim 1675):** the six-curvature-square response map can be
> constructed and has rank five modulo Euler, but the packet poles violate
> its exact relation \(c_{R^2}=-3\delta\xi_R/2\).  The missing embedding is
> therefore not merely a change of curvature basis: an independent
> \(RTT\)-type counterterm is required, and non-axial torsion projections are
> needed to separate the enlarged shell.

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** exact critical-surface consequence and information-rank boundary

**Depends on:** [the original normal-beta audit](1639_the_known_normal_beta_data_have_rank_two_and_the_exact_critical_pgt_loop_is_the_irreducible_missing_calculation.md), [the full-rank axial matching protocol](1647_one_pseudoscalar_correlator_has_rank_two_but_five_responses_identify_the_quadratic_axial_eft.md), and [the complete packet response](1673_the_complete_second_class_measure_is_ultralocal_on_the_massive_branch.md)

**Evidence:** [response-to-normal ledger](../../../evidence/data/spin23-axial-response-critical-normal-map-v1.json) and [verifier](../../../verification/verify/verify_spin23_axial_response_critical_normal_map.mjs)

## Result

The complete packet calculation gives a decisive closure result in the
quadratic axial matching basis.  The classical critical action has

\[
Z=\xi_R=\xi_{\rm Ric}=0,
\]

whereas its one-loop raw effective action has

\[
\delta Z=0,
\qquad
\delta\xi_R=-{\kappa A\over\pi^2\epsilon}
\left({7\over96}+{1\over144(a_1+1)}\right),
\qquad
\delta\xi_{\rm Ric}={3\kappa A\over8\pi^2\epsilon}.
\]

On the admitted massive branch

\[
\kappa>0,\qquad A={a_0-a_1\over\ell^2}>0,qquad a_1>0,
\]

both curvature--axial coefficients are strictly nonzero.  Thus the sparse
critical action is not closed even in the complete packet measure: one loop
generates both

\[
R S^2,qquad R_{\mu\nu}S^\mu S^\nu.
\]

This conclusion needs no conjectured matter contribution and no missing
second-class determinant.

## What the five responses do determine

In the reduced axial coefficient space

\[
\theta=(A,B,Z,\xi_R,\xi_{\rm Ric}),
\]

the response protocol has rank five and the loop vector is completely
known.  Its interpretation relative to the original critical surface is:

- \(B=-b_3/\kappa\) is the retained pseudoscalar-curvature coupling and is
  tangent to the target surface;
- \(A=(a_0-a_1)/\ell^2\) is one axial mass combination, not either of the
  two torsion-normal combinations;
- \(Z=0\) is a calculated absence of a transverse axial kinetic response at
  this loop and derivative order; and
- \(\xi_R\) and \(\xi_{\rm Ric}\) are two nonzero absent coefficients in the
  quadratic axial expansion.

The vanishing of \(\delta Z\) is not a Ward identity and must not be promoted
to all orders.

## Why the old normal rank does not become five

Claim 1639 uses the covariant PGT coordinates

\[
g=(t_1,t_2,t_3,c_C,c_R,c_X,c_4,c_5,c_6,z_q)
\]

and eight normals

\[
Cg=(2t_1+t_2,t_1+2t_3,c_C,c_R,c_4,c_5,c_6,z_q).
\]

The five axial coefficients are not five of these coordinates.  Expanding a
Riemann--Cartan curvature-square invariant around a torsionless metric ties
its torsionless curvature terms, derivative-torsion terms and \(RTT\) terms
together.  Therefore \(R S^2\) and \(R_{\mu\nu}S^\mu S^\nu\) are projections
of the covariant curvature-invariant beta vector; they do not by themselves
identify which combination of \((c_C,c_R,c_X,c_4,c_5,c_6)\) produced them.

Likewise, \(\delta A\) fixes the running of \(a_0-a_1\) in the packet
normalization, but the torsion normals require

\[
2\beta_{t_1}+\beta_{t_2},
\qquad
\beta_{t_1}+2\beta_{t_3}.
\]

No inversion from one mass response to those two combinations exists.

Consequently two different ranks must be kept separate:

\[
\boxed{
\operatorname{rank}M_{\rm axial}=5,
\qquad
\operatorname{rank}K_{\rm displayed\ normal}=2
\ \text{(not yet upgraded)}.
}
\]

The first is an observable-identifiability rank.  The second is the rank of
the presently embedded and quotiented information in the eight-dimensional
normal basis.  A nonzero projected response proves departure without
supplying the missing embedding map.

## Strongest justified update

The old statement that an accidental graviton--torsion--ghost cancellation
might erase the isolated scalar \(C^2\) and \(R^2\) coefficients is no longer
the whole packet-level story.  The explicitly evaluated mixed
graviton--axial determinant instead produces nonzero curvature-polarized
axial responses.  Any proposed cancellation or invariant surface must now
reproduce all five axial entries as well as the torsionless curvature
entries.

What remains irreducible is the covariant coupling Jacobian and quotient:

1. expand all six parity-even Riemann--Cartan curvature squares through
   quadratic axial order in the packet conventions;
2. assemble the map from their beta functions to
   \((B,Z,\xi_R,\xi_{\rm Ric})\);
3. combine it with torsionless and other irreducible-torsion projections;
4. quotient topological, BRST-exact and field-redefinition directions; and
5. only then recompute the rank of the eight normal beta components.

Until that map is constructed, reporting rank five for the normal problem
would confuse a full-rank response design with a full-rank beta embedding.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_axial_response_critical_normal_map.mjs
~~~
