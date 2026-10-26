# RDG--Maxwell Bridge 08: local diagonal-Hodge remesh-family no-go

**Date:** 26 October 2026

**Status:** exhaustive finite no-go within the boundary-fixed simplicial-collapse family

**Programme:** [RDG--Maxwell bridge](README.md)

**Evidence:** [local-remesh-family record](../../../evidence/data/rdg-maxwell-local-remesh-family-v1.json)

**Verifier:** [local-remesh-family verifier](../../../verification/verify/verify_rdg_maxwell_local_remesh_family.mjs)

## Question

Was the non-diagonal compatible metric in Bridge 05 merely caused by choosing
the centre vertex to collapse onto vertex 0?

No. The certificate exhausts every boundary-fixed simplicial vertex collapse
of the minimal stellar subdivision, and the same obstruction occurs in all
three cases.

## Exhaustive family

Keep coarse vertices \(0,1,2\) fixed. A simplicial map from the subdivided
triangle to the coarse triangle must send the new centre vertex \(3\) to one
of

\[
 0,\quad1,\quad2.
\]

These are the only three maps under the declared boundary rule. For each one,
the script constructs the induced edge and face chain maps, dualizes them to
cochain transport, and composes with the fixed subdivision restriction.

Every case passes:

\[
 F\partial_f=\partial_cF,
 \qquad
 d_fT=Td_c,
 \qquad
 RT=I.
\]

The resulting reconstruction projectors have ranks \((3,3,1)\), as required.

## Diagonal metric obstruction

Let \(P=TR\) and suppose a strictly positive diagonal metric

\[
 W=\operatorname{diag}(w_1,\ldots,w_n),
 \qquad w_i>0
\]

makes \(P\) self-adjoint. Then

\[
 P^{\mathsf T}W=WP
\]

requires, entry by entry,

\[
 w_jP_{ji}=w_iP_{ij}.
\]

If \(P_{ij}\ne0\) while \(P_{ji}=0\), positivity makes this impossible. The
certificate finds such a one-way pair in vertices, edges and faces for all
three centre targets.

Therefore:

\[
 \boxed{
 \text{no boundary-fixed simplicial collapse in this family admits a
 positive diagonal metric making }TR\text{ self-adjoint}
 }
\]

This is a finite theorem about the declared family, not a numerical search
failure.

## Meaning

The obstruction arises because collapse is directional. Fine cells are sent
into coarse cells, while reconstruction copies or combines coarse information
back into fine cells asymmetrically. A diagonal metric can rescale cells but
cannot create the reciprocal couplings required for self-adjointness.

Bridge 05 showed that a positive **dense** metric can make the same projector
self-adjoint. Together the results say:

- gauge-safe simplicial collapse is available;
- energy-compatible inner products are available;
- a cellwise diagonal/local energy metric is not available for this family;
- off-diagonal couplings are doing indispensable reconstruction work.

## What the no-go does not cover

The result does not exclude:

- weighted cochain transports that are not induced by a vertex map;
- another subdivision or a larger macroelement;
- sparse block-local mass matrices;
- finite-element commuting projections;
- approximate commuting/energy bounds with controlled residuals.

Those are now the correct escape routes. Repeating the same centre-to-vertex
collapse with another target is closed.

## Implication for RDG

If RDG geometry updates are implemented as literal combinatorial collapses,
then a local scalar weight per cell may be too weak to carry a compatible
energy. The smallest admissible energy carrier may be a block of neighboring
relations rather than an individual relation.

That is a concrete version of the corpus's mirror-face intuition: the energy
face must know enough of the relation pattern to invert or adjoint the geometry
move. Purely pointwise weights cannot see the directional reconstruction.

## Logical boundary

- **Exact:** all three maps in the bounded family, their chain/retract
  identities and explicit asymmetric-support witnesses in every degree.
- **No-go scope:** boundary-fixed centre-to-original-vertex simplicial maps for
  one stellar triangle subdivision.
- **Open:** weighted and block-local transports, other complexes, approximate
  stability and continuum refinement.
- **Not claimed:** impossibility of local energy-compatible remeshing in
  general.

## Corpus links

- [Cochain-remeshing retract and reconstruction gate](05_cochain_remeshing_retract_and_reconstruction_gate.md)
- [Hodge, constitutive and dynamics gate](03_hodge_constitutive_and_dynamics_gate.md)
- [Relation-face compiler from adjacency to Jordan holonomy](../admissibility/admissibility_124_relation_face_compiler_from_adjacency_to_jordan_holonomy.md)

