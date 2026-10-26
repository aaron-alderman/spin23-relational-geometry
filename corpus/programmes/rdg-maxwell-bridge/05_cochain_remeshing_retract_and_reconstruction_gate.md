# RDG--Maxwell Bridge 05: cochain-remeshing retract and reconstruction gate

**Date:** 26 October 2026

**Status:** exact topology-preserving remesh; gauge gate passes and metric gate remains open

**Programme:** [RDG--Maxwell bridge](README.md)

**Evidence:** [remeshing-retract record](../../../evidence/data/rdg-maxwell-remeshing-retract-v1.json)

**Verifier:** [remeshing-retract verifier](../../../verification/verify/verify_rdg_maxwell_remeshing_retract.mjs)

## Question

Can RDG's geometry update, reconstruction and residual vocabulary be realized
as typed maps rather than as an analogy?

Yes, on a nontrivial topology-preserving remesh. The result also shows exactly
what remains missing: chain compatibility does not automatically preserve the
energy metric.

## Geometry move

Start with one oriented triangular disk with vertices \(0,1,2\), boundary
edges \(01,12,20\), and face \(012\). Add a centre vertex \(3\) and replace the
face with

\[
 013+123+203.
\]

The coarse and fine cochain dimensions are

\[
 (3,3,1)\quad\text{and}\quad(4,6,3).
\]

Both complexes have cohomology \((1,0,0)\): this is refinement, not topology
change.

## Chain maps and their duals

Let \(S\) be the subdivision chain map: it keeps boundary vertices and edges
and sends the coarse face to the sum of the three fine faces. Let \(F\) be the
simplicial collapse taking the centre vertex to vertex 0. Both satisfy the
boundary commuting law exactly.

Dualizing gives cochain maps

\[
 T=F^*:C^\bullet_{\rm coarse}\to C^\bullet_{\rm fine},
 \qquad
 R=S^*:C^\bullet_{\rm fine}\to C^\bullet_{\rm coarse}.
\]

They obey

\[
 d_fT=Td_c,
 \qquad
 d_cR=Rd_f,
 \qquad
 RT=I
\]

in every available degree. Thus transport followed by restriction returns the
coarse state exactly while preserving gauge and curvature throughout.

## An exact reconstruction operator

On fine cochains define

\[
 P=TR,
 \qquad
 Q=I-TR.
\]

Then

\[
 P^2=P,
 \qquad
 dP=Pd,
 \qquad
 dQ=Qd.
\]

The admitted/coarse-representable subcomplex has dimensions \((3,3,1)\) and
cohomology \((1,0,0)\). The unresolved fine subcomplex has dimensions
\((1,3,2)\), differential ranks \((1,2)\), and zero cohomology.

This gives the RDG symbols a literal interpretation:

| RDG term | Typed remesh meaning |
|---|---|
| \(\Gamma\) | restriction \(R\), extracting coarse relational data |
| \(\sigma\) | transport/reconstruction \(T\), or \(TR\) on fine data |
| \(\delta\) | \(Q=I-TR\), the unresolved fine-scale residual |
| admissibility | the commuting-chain and declared metric/error gates |

Unlike radial scaling to a simplex, this reconstruction cannot manufacture
curvature from a pure gauge. Its residual is not called a boundary; it is a
typed complementary subcomplex.

## The residual has a clear meaning

The \((1,3,2)\) unresolved degrees are the new internal vertex, radial edges
and independent fine-face patterns that restriction cannot retain. Their
subcomplex is acyclic: it contains resolution detail, not new topology.

This distinction is operationally valuable:

- nonzero \(Q\) can mean unresolved local resolution;
- nonzero cohomology would mean lost global information;
- failure of \(dQ=Qd\) would mean an invalid remesh;
- none of these is automatically new physics.

## Metric boundary

With naive Euclidean inner products, \(T^{\mathsf T}T\ne I\) on vertices and
edges. The reported isometry residuals are \((1,1,0)\). Therefore the remesh is
gauge-safe but not automatically energy-safe.

There is a converse obstruction. The Euclidean least-squares restriction

\[
 R_E=(T^{\mathsf T}T)^{-1}T^{\mathsf T}
\]

satisfies \(R_ET=I\), and \(P_E=TR_E\) is exactly idempotent and orthogonal.
Nevertheless its face-level cochain residual is \(1/2\):

\[
 d_cR_E\ne R_Ed_f,
 \qquad
 d_fP_E\ne P_Ed_f.
\]

Thus the naive energy-optimal projection fails the gauge/curvature gate, while
the chain-safe projection is not Euclidean-orthogonal. This is a genuine design
problem, not a choice of notation.

The next gate must supply coarse and fine Hodge/mass matrices satisfying a
controlled pullback relation such as

\[
 L_c=T^{\mathsf T}L_fT,
\]

or use a variational projection and report its energy defect. Declaring a
commuting cochain map does not license an energy-conservation claim.

## Implication

The source programme's most useful update pattern is now recoverable:

\[
 \text{fine state}
 \xrightarrow{R}
 \text{coarse admitted record}
 \xrightarrow{T}
 \text{reconstructed fine state},
\]

with \(I-TR\) retaining what was lost. This is a mathematically controlled
version of “squeeze dynamics into a channel”: the channel is the image of a
chain projector, and the squeezed-out information remains an explicit
complement rather than disappearing.

## Logical boundary

- **Exact:** chain maps, cochain maps, retract identity, projector identities,
  subcomplex dimensions and cohomology.
- **Constructive model:** the chosen stellar subdivision and asymmetric
  simplicial collapse.
- **Open:** compatible Hodge stars, energy-optimal reconstruction, repeated
  adaptive remeshing, stability and continuum convergence.
- **Not topology change:** both carriers are contractible and the residual
  subcomplex is acyclic.

## Corpus links

- [Fixed-complex selector and topology certificate](02_fixed_complex_selector_and_topology_certificate.md)
- [Hodge, constitutive and dynamics gate](03_hodge_constitutive_and_dynamics_gate.md)
- [Source recovery and Maxwell bridge gate](01_rdg_mfe_q_source_recovery_and_maxwell_bridge_gate.md)
- [Relation-face compiler from adjacency to Jordan holonomy](../admissibility/admissibility_124_relation_face_compiler_from_adjacency_to_jordan_holonomy.md)

