# RDG--Maxwell Bridge 06: topology cut, holonomy and boundary-record gate

**Date:** 26 October 2026

**Status:** exact one-dimensional topology-change certificate

**Programme:** [RDG--Maxwell bridge](README.md)

**Evidence:** [topology-cut record](../../../evidence/data/rdg-maxwell-topology-cut-v1.json)

**Verifier:** [topology-cut verifier](../../../verification/verify/verify_rdg_maxwell_topology_cut.mjs)

## Question

When a dynamic carrier changes topology and a cohomology class disappears,
must its physical record disappear too?

No. In the minimal exact example, the global record changes type: bulk
holonomy becomes boundary mismatch.

## Circle and cut interval

The circle has three vertices and the oriented edges \(01,12,20\). Its
cohomology is

\[
 (b_0,b_1)=(1,1).
\]

Cut vertex 0 into two endpoints, producing the interval with vertices
\(0,1,2,3\) and edges \(01,12,23\). Its cohomology is

\[
 (b_0,b_1)=(1,0).
\]

The quotient map that reglues endpoint 3 to endpoint 0 is a chain map. Its
cochain pullback from the circle to the interval commutes with \(d\) exactly.

## The Wilson record changes address

On the circle take the constant one-form

\[
 a=(1,1,1).
\]

It is closed and non-exact. Adding it to the columns of \(d_0\) raises the rank
from 2 to 3. Its period is

\[
 \oint a=3.
\]

After cutting, the pulled-back edge values remain \((1,1,1)\), but now

\[
 (1,1,1)=d(0,1,2,3).
\]

The one-form has become exact because the interval permits distinct endpoint
potentials. The former period is exactly

\[
 3=\phi(3)-\phi(0).
\]

The topological record has not vanished. It has moved from an \(H^1\) class to
a boundary/gluing coordinate.

## Cut and glue grammar

The event has a reversible typed description:

\[
 \text{closed carrier + holonomy}
 \xrightarrow{\text{cut}}
 \text{open carrier + endpoint mismatch}.
\]

Regluing requires more than identifying endpoint names. It must retain the
transition value:

\[
 \phi(3)-\phi(0)=\oint a.
\]

Discarding that value produces a many-to-one quotient and destroys the Wilson
record. Keeping it allows the closed description to be reconstructed.

The certificate also executes the compact \(U(1)\) version. For link variables
\(U_e=e^{ia_e}\), the circle observable is

\[
 W=\prod_{e\in S^1}U_e.
\]

It is unchanged by vertex gauge transformations to numerical residual below
\(10^{-12}\). On the cut interval, a recursively chosen vertex gauge makes
every link equal to one. The remaining endpoint transition is exactly
\(W^{-1}\), again to residual below \(10^{-12}\). Thus compact holonomy obeys
the same rule: it can be moved from the bulk links to the gluing face, but not
eliminated from a reconstructible description.

## Relation to boundaries and walls

This provides a literal form of the corpus intuition that long-term structure
becomes boundaries and topology, and topology then changes the available
symmetry sectors. Creating a boundary can externalize a previously global
degree of freedom. Closing the boundary can internalize it again as holonomy.

The correct detector set therefore depends on carrier topology:

- closed carrier: Wilson period or holonomy detector;
- cut carrier: endpoint mismatch or transition detector;
- topology event: a receipt mapping one record into the other.

A detector suite that measures only local curvature misses both descriptions.

## Implication for dynamic RDG

A topology-changing RDG update must contain at least:

1. chain maps on the surviving local cells;
2. the induced map on cohomology where defined;
3. new boundary or gluing coordinates;
4. a receipt showing where every disappearing global class was sent.

The change in Betti number is then not interpreted as spontaneous destruction
of a physical quantity. It signals a change in the type and location of its
record.

## Logical boundary

- **Exact:** both incidence matrices, Betti numbers, chain/cochain commuting
  equations, non-exactness on the circle, exactness on the interval and equality
  of period with endpoint mismatch.
- **Constructive interpretation:** the endpoint mismatch is the retained
  gluing coordinate for the additive gauge potential.
- **Open:** magnetic flux on two-cycles, energetic cost of cutting, physical
  topology-changing mechanisms and continuum fields.
- **Not claimed:** that electromagnetic spacetime topology changes in the
  laboratory or that the cut operation is itself a dynamical law.

## Corpus links

- [Cochain-remeshing retract and reconstruction gate](05_cochain_remeshing_retract_and_reconstruction_gate.md)
- [Fixed-complex selector and topology certificate](02_fixed_complex_selector_and_topology_certificate.md)
- [Maxwell curl quotient, helicity and dynamics gate](../frontier/wave-7/frontier_wave7_229_maxwell_curl_quotient_helicity_and_dynamics_gate.md)
- [Dynamic response, geometry, detection and metastability](../admissibility/admissibility_06_dynamic_response_geometry_detection_metastability.md)

