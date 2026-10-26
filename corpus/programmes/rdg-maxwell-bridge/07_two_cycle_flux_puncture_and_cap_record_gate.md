# RDG--Maxwell Bridge 07: two-cycle flux, puncture and cap-record gate

**Date:** 26 October 2026

**Status:** exact two-cycle topology-change certificate with electromagnetic boundary stated

**Programme:** [RDG--Maxwell bridge](README.md)

**Evidence:** [two-cycle-cut record](../../../evidence/data/rdg-maxwell-two-cycle-cut-v1.json)

**Verifier:** [two-cycle-cut verifier](../../../verification/verify/verify_rdg_maxwell_two_cycle_cut.mjs)

## Question

Does the one-cycle rule—global holonomy becomes boundary data when a carrier is
cut—have a two-cycle analogue?

Yes. Puncturing a closed surface converts a non-exact face flux into exact
curvature on the remaining disk. Its integral becomes the circulation around
the new boundary, while the removed cap retains the remaining gluing datum.

## Closed tetrahedral sphere

Orient the four faces of the boundary of the tetrahedron \([0,1,2,3]\)
outward. The cochain dimensions and ranks are

\[
 (\dim C^0,\dim C^1,\dim C^2)=(4,6,4),
 \qquad
 (\operatorname{rank}d_0,\operatorname{rank}d_1)=(3,3).
\]

Thus

\[
 (b_0,b_1,b_2)=(1,0,1).
\]

The constant outward face cochain

\[
 B=(1,1,1,1)
\]

has total flux 4. Adding it to the image of \(d_1\) raises the rank from 3 to
4, proving that it represents the nonzero \(H^2\) class.

## Remove one cap

Delete the outward face \(123\). The remaining three faces form a disk with

\[
 (b_0,b_1,b_2)=(1,0,0).
\]

The restricted flux \((1,1,1)\) is now exact. The certificate constructs the
edge potential

\[
 A=(1,-1,0,-3,0,0)
\]

in the declared edge ordering and verifies

\[
 d_1A=(1,1,1).
\]

Discrete Stokes then gives

\[
 \oint_{\partial D}A
 =\int_D B
 =3.
\]

The boundary of the retained disk is exactly the negative of the removed
face's boundary. Retaining the cap flux \(1\) reconstructs the original closed
record:

\[
 \Phi_{S^2}
 =\oint_{\partial D}A+\Phi_{\rm cap}
 =3+1=4.
\]

The compact phase factors in the same way:

\[
 e^{i\Phi_{S^2}}
 =e^{i\oint_{\partial D}A}e^{i\Phi_{\rm cap}},
\]

with zero numerical residual in the certificate.

## What changed

Before puncturing, the record was a bulk \(H^2\) class. Afterwards it is split
between:

- exact local face curvature on the disk;
- circulation on the newly exposed boundary;
- the flux assigned to the removed cap/gluing face.

As in the one-cycle experiment, topology change changes the address and type of
the record. It does not license silent deletion.

## Essential electromagnetic boundary

The example is exact cochain topology, but its physical interpretation must be
qualified. If the sphere bounds an ordinary three-dimensional volume,
source-free Maxwell theory requires

\[
 \int_{S^2}B=0
\]

through \(d_2B=0\). A nonzero closed-sphere magnetic flux therefore requires
magnetic charge, a deleted/singular interior, or a different carrier where the
two-cycle is non-bounding. The three-torus \(H^2\) sectors in Bridge 02 are of
the latter type and can carry source-free global flux.

This limitation strengthens rather than weakens the gate: topology identifies
an available mathematical record, while the Maxwell complex decides whether a
particular physical state may occupy it.

## Dynamic-geometry receipt

A faithful two-cycle topology event should record:

1. the original cohomology class and its period;
2. the puncture/cap chain map;
3. the exact potential on the opened carrier where it exists;
4. the new boundary circulation;
5. the removed cap or transition flux;
6. the source constraint determining whether the original class was physical.

This prevents three distinct events—source creation, topology change and
failure to retain boundary data—from being conflated.

## Logical boundary

- **Exact:** incidence ranks, Betti numbers, non-exactness before puncturing,
  exactness afterwards, Stokes circulation, cap reconstruction and compact
  phase factorization.
- **Conditional physics:** nonzero sphere flux needs magnetic charge, a
  singular/deleted interior or a non-bounding reinterpretation.
- **Open:** a source-free torus cut, energetic topology-change dynamics and
  continuum differential characters.
- **Not claimed:** observation of a monopole or physical topology change.

## Corpus links

- [Topology cut, holonomy and boundary-record gate](06_topology_cut_holonomy_and_boundary_record_gate.md)
- [Fixed-complex selector and topology certificate](02_fixed_complex_selector_and_topology_certificate.md)
- [Maxwell curl quotient, helicity and dynamics gate](../frontier/wave-7/frontier_wave7_229_maxwell_curl_quotient_helicity_and_dynamics_gate.md)
- [Dynamic response, geometry, detection and metastability](../admissibility/admissibility_06_dynamic_response_geometry_detection_metastability.md)

