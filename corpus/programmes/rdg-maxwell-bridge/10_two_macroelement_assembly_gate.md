# RDG--Maxwell Bridge 10: two-macroelement assembly gate

**Date:** 26 October 2026

**Status:** exact first overlap pass for sparse energy-compatible remeshing

**Programme:** [RDG--Maxwell bridge](README.md)

**Evidence:** [two-macroelement assembly record](../../../evidence/data/rdg-maxwell-two-macroelement-assembly-v1.json)

**Verifier:** [two-macroelement assembly verifier](../../../verification/verify/verify_rdg_maxwell_two_macroelement_assembly.mjs)

## Question

Do the sparse compatible metrics from one refined triangle survive assembly
when two geometry moves share cells?

Yes, in the first nontrivial overlap certificate.

## Mesh

The coarse disk consists of two oriented faces

\[
 [0,1,2],\qquad[0,2,3]
\]

sharing edge \([0,2]\). Each face is stellarly refined with its own centre,
vertices 4 and 5. The coarse and fine cell counts are

\[
 (4,5,2),qquad(6,11,6).
\]

Both complexes are contractible. Their differential ranks are \((3,2)\) and
\((5,6)\), giving cohomology \((1,0,0)\) in each case.

Each centre collapses to the first vertex of its parent oriented face. The
induced global transport \(T\), subdivision restriction \(R\), and
differentials satisfy exactly

\[
 d_fT=Td_c,
 \qquad
 d_cR=Rd_f,
 \qquad
 RT=I.
\]

## Additive metric assembly

Embed the local blocks from Bridge 09 into the global cell coordinates and
sum contributions on shared cells. This is the ordinary macroelement assembly
rule. Shared vertices 0 and 2 receive weight 2; the shared edge \(02\) receives
weight 2. Other coarse cells retain weight 1.

The assembled fine metrics are symmetric and have full ranks

\[
 (6,11,6),
\]

equal to their dimensions. Positivity follows because each is a sum of
positive local Gram forms and every global degree of freedom is covered by at
least one macroelement.

Direct calculation gives zero residual for every identity:

\[
 L_c=T^{\mathsf T}L_fT,
\]

\[
 R=L_c^{-1}T^{\mathsf T}L_f,
\]

\[
 (TR)^{\mathsf T}L_f=L_f(TR),
\]

and

\[
 d_cR=Rd_f.
\]

Thus the assembled transport is gauge-safe, the assembled restriction is its
energy adjoint, and reconstruction is an energy-orthogonal chain projector.

## Locality survives overlap

The fine metrics contain 4, 8 and 12 off-diagonal entries in degrees 0, 1 and
2—exactly twice the one-macroelement counts. No entry directly couples centre
4 to centre 5, their exclusive radial-edge stars, or faces belonging
exclusively to opposite macroelements. Interactions cross the join only through
the already shared vertices and edge.

This is the desired form of locality: global compatibility emerges by adding
small relational blocks, without constructing a dense inverse over the mesh.

## RDG interpretation

The result upgrades the reconstruction vocabulary from a single example to a
composable rule:

1. each accepted geometry move supplies a local chain retract;
2. each retract supplies a positive macroelement metric block;
3. shared cells add their contributions;
4. the global \(Q=I-TR\) remains a chain-compatible, energy-orthogonal residual
   detector.

The local “matrix” is therefore genuinely a relation carrier. Its overlap
pattern builds the global energy geometry.

## Remaining theorem

The two-face result strongly suggests an induction over a triangular complex,
but does not prove one. A general theorem must specify:

- coherent orientations and collapse choices;
- coverage ensuring global positivity;
- behavior at boundaries and non-manifold joins;
- conditioning as vertex degree and refinement depth grow;
- approximation accuracy and continuum convergence.

The algebraic identities should assemble locally; uniform stability is the
hard part.

## Logical boundary

- **Exact:** topology, chain/retract identities, global metric pullback,
  weighted adjointness, self-adjoint reconstruction, ranks and locality
  residuals for the two-face mesh.
- **Constructive pass:** standard additive macroelement assembly works on the
  first shared-edge case.
- **Open:** arbitrary meshes, repeated refinement, conditioning, approximation
  order and time-dependent remeshing.
- **Not claimed:** equivalence to a published finite-element family or a
  continuum Maxwell convergence theorem.

## Corpus links

- [Sparse macroelement metric escape](09_sparse_macroelement_metric_escape.md)
- [Local diagonal-Hodge remesh-family no-go](08_local_diagonal_hodge_remesh_family_no_go.md)
- [Cochain-remeshing retract and reconstruction gate](05_cochain_remeshing_retract_and_reconstruction_gate.md)

