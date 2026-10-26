# RDG--Maxwell Bridge 09: sparse macroelement metric escape

**Date:** 26 October 2026

**Status:** exact one-macroelement constructive escape from the diagonal-Hodge no-go

**Programme:** [RDG--Maxwell bridge](README.md)

**Evidence:** [remeshing-retract record](../../../evidence/data/rdg-maxwell-remeshing-retract-v1.json)

**Verifier:** [remeshing-retract verifier](../../../verification/verify/verify_rdg_maxwell_remeshing_retract.mjs)

## Result

Bridge 08 proves that no strictly positive diagonal metric can make any of the
three minimal simplicial-collapse reconstruction projectors self-adjoint.
Bridge 05's compatible-metric construction supplies the smallest currently
known escape: couple cells inside the refined macroelement.

For the centre-to-vertex-0 collapse, complete transport to a basis

\[
 B=[\operatorname{im}T,\operatorname{im}(I-TR)]
\]

and define

\[
 L_f=(B^{-1})^{\mathsf T}B^{-1},
 \qquad
 L_c=T^{\mathsf T}L_fT.
\]

The certificate verifies exactly, in degrees 0, 1 and 2,

\[
 L_c=I,
 \qquad
 R=L_c^{-1}T^{\mathsf T}L_f,
 \qquad
 P^{\mathsf T}L_f=L_fP.
\]

Thus transport is an isometry, restriction is its weighted adjoint, and the
chain-compatible reconstruction is energy-orthogonal.

## Exact local blocks

On vertices,

\[
 L_f^{(0)}=
 \begin{pmatrix}
 2&0&0&-1\\
 0&1&0&0\\
 0&0&1&0\\
 -1&0&0&1
 \end{pmatrix}.
\]

Only the collapsed coarse vertex and the new centre vertex couple.

On edges, in the ordering \((01,12,20,03,13,23)\),

\[
 L_f^{(1)}=
 \begin{pmatrix}
 2&0&0&0&1&0\\
 0&1&0&0&0&0\\
 0&0&2&0&0&-1\\
 0&0&0&1&0&0\\
 1&0&0&0&1&0\\
 0&0&-1&0&0&1
 \end{pmatrix}.
\]

There are two off-diagonal edge pairs.

On the three fine faces,

\[
 L_f^{(2)}=
 \begin{pmatrix}
 2&1&1\\
 1&1&1\\
 1&1&2
 \end{pmatrix}.
\]

The faces form one coupled block. Positivity follows from
\(L_f=(B^{-1})^{\mathsf T}B^{-1}\), so no eigenvalue inference is required.

## What “local” now means

The metric is not diagonal, but neither is it globally dense. Every nonzero
coupling lies within the single triangle and its stellar refinement. This
suggests a hierarchy:

1. **cell-local:** one positive weight per cell—ruled out here;
2. **macroelement-local:** a positive block on cells participating in one
   geometry move—achieved here;
3. **globally nonlocal:** couplings between unrelated regions—not required by
   this certificate.

The minimal carrier of energy compatibility is therefore relational: it is a
small incidence neighborhood, not an isolated cell.

## Remaining assembly gate

One macroelement does not establish a scalable method. Adjacent refined
triangles share vertices and edges. Their local blocks must be assembled so
that the global matrices remain positive and the global restriction remains
the weighted adjoint of transport.

The next certificate must test:

\[
 L_c=T^{\mathsf T}L_fT,
 \qquad
 R=L_c^{-1}T^{\mathsf T}L_f,
 \qquad
 dR=Rd,
\]

on at least two adjacent refined faces. Failure would show that independently
valid local repairs interfere at overlaps. Success would provide a reusable
dynamic-geometry finite-element primitive.

## Implication for the corpus

The result gives “relation as carrier” a literal energetic meaning. A scalar
attached to each object is too weak; the admissible energy lives on a small
block of relations. The mirror face is not another object value but the
off-diagonal pairing needed to make forward geometry transport and backward
restriction adjoint.

## Logical boundary

- **Exact:** the displayed matrices and all weighted-adjoint,
  self-adjointness and isometry identities.
- **Locality achieved:** support is confined to one refined macroelement.
- **Open:** global assembly, uniqueness, conditioning, approximation order and
  continuum convergence.
- **Not claimed:** that these blocks are standard Whitney-form mass matrices or
  that this asymmetric collapse is numerically optimal.

## Corpus links

- [Cochain-remeshing retract and reconstruction gate](05_cochain_remeshing_retract_and_reconstruction_gate.md)
- [Local diagonal-Hodge remesh-family no-go](08_local_diagonal_hodge_remesh_family_no_go.md)
- [Relation-face compiler from adjacency to Jordan holonomy](../admissibility/admissibility_124_relation_face_compiler_from_adjacency_to_jordan_holonomy.md)

