# The incidence/co-incidence doublet detects odd-cycle topology

**Date:** 26 October 2026
**Status:** exact doubled positive response and scalar topology theorem on the captured Claimipedia graph; semantic path dynamics remains open
**Parents:** [source-native rail closure](admissibility_131_the_authored_rail_grading_closes_the_local_clifford_cell_but_opens_a_coincidence_channel.md), [relation-face compiler](admissibility_124_relation_face_compiler_from_adjacency_to_jordan_holonomy.md)
**Evidence:** [incidence/co-incidence topology doublet](../../../evidence/data/claimipedia-incidence-coincidence-topology-doublet-v1.json)
**Verifier:** [rank and bipartiteness certificate](../../../verification/admissibility/verify_claimipedia_incidence_coincidence_topology_doublet.mjs)

## Two positive responses, not one

For every authored record (e=(u\to v,t)), retain both rail rays

\[
d_e=|v,T,t\rangle-|u,S,t\rangle,
\qquad
c_e=|v,T,t\rangle+|u,S,t\rangle.
\]

They generate two positive kernels:

\[
K_-=\sum_e d_ed_e^T,
\qquad
K_+=\sum_e c_ec_e^T.
\]

AZ-131 showed that the authored rail grading exchanges them. Their sum and
difference now separate the entire response:

\[
D=\frac{K_-+K_+}{2},
\qquad
A=\frac{K_+-K_-}{2}.
\]

(D) is the typed endpoint-degree operator. (A) is the symmetric
source-to-target adjacency block. Hence

\[
K_-=D-A,
\qquad
K_+=D+A.
\]

The “difference” and “co-presence” faces together retain exactly the diagonal
participation and relational coupling pieces. Neither requires negative
probabilities or an indefinite Gram form.

## Their scalar quotients are Laplacian partners

Identify source and target rails and sum the relation types using the AZ-126
collapse (C). Then

\[
CK_-C^T=L,
\qquad
CK_+C^T=Q,
\]

where (L) is the ordinary graph Laplacian and (Q) is the signless
Laplacian. For the captured Claimipedia graph,

\[
\operatorname{rank}L=33,
\qquad
\operatorname{rank}Q=35.
\]

The graph has 38 nodes and five connected components, so

\[
\dim\ker L=5.
\]

For a signless Laplacian, the nullity counts bipartite connected components.
Exactly three of the five components are bipartite, giving

\[
\dim\ker Q=3.
\]

Therefore

\[
\boxed{\operatorname{rank}Q-\operatorname{rank}L=2}
\]

is exactly the number of connected components containing an odd cycle.

## What the two directions detect

The incidence channel detects connectedness: a constant mode survives on
every component. The co-incidence channel asks whether a sign can alternate
consistently across every edge. Such a mode survives only on a bipartite
component. An odd cycle frustrates the alternating assignment and lifts that
null direction.

The two non-bipartite components are:

1. the 24-node main Claimipedia component; and
2. the three-node instrument-calibration, river-nitrate, river-flow triangle.

Thus the extra two co-incidence ranks have a precise topological source. They
are not additional spatial dimensions or fitted latent variables.

## Relation to the Clifford cell

Before quotienting, the grading (G) makes (K_-) and (K_+) congruent.
After rail identification, (G) itself no longer descends, and the two scalar
responses can differ. This is a clean example of a symmetry that exists on a
higher typed carrier while its two quotient faces retain different topology.

The result also clarifies “configuration channel.” (K_+) records joint
endpoint participation and detects whether a global alternating
configuration is admissible. That is configuration-like in a precise graph
sense. It is not physical configuration space, thermodynamic state space or
gravity.

## Boundary and subsequent exhaustion

The doubled response is now derived, but it remains support-native. Relation
types are orthogonal labels; no semantic adjoint or path multiplication has
been extracted from Supports, Challenges, DependsOn and Qualifies. The next
test must determine whether the two odd-cycle obstructions survive an
authored relation-type adjoint and path product. One cycle orientation must be
reserved before fitting so that the result can fail.

AZ-134 performs that test across all 24 type permutations and all 10
involutions. Only the reciprocal Spin--Temple pair survives; 41 records and
the whole river triangle have no authored reverse. The current source
therefore cannot promote the odd-cycle obstruction to a global semantic
path-star detector. Reopening requires independently supplied reverse
semantics and a held-out oriented path record.

## Literature boundary

The signless-Laplacian nullity theorem used here is established spectral
graph theory: the multiplicity of zero equals the number of bipartite
components. One primary application stating the result explicitly is Liu,
[doi:10.5402/2011/282940](https://doi.org/10.5402/2011/282940). The new work in
AZ-133 is the exact placement of the captured Claimipedia incidence and
co-incidence kernels into that theorem, not the theorem itself.

## Subsequent physical calibration

[AZ-142](admissibility_142_a_three_resonator_parity_switch_turns_the_dual_face_into_a_detector.md)
realizes the same Laplacian/signless-Laplacian choice on a physical weighted
triangle without identifying graph semantics with forces. Programmable
coupling parity selects the face; the three-edge loop product is the detector;
and the two sectors first separate in the cubic pole product by the exact
amount $4\kappa_{12}\kappa_{23}\kappa_{31}$. This supplies an engineered
calibration of the topology theorem, not a physicalization of Claimipedia.
