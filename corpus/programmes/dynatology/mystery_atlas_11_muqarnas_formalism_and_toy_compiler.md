# Mystery Atlas 11: Formalism Selection and the Minimal Muqarnas Compiler

**Date:** 24 October 2026  
**Status:** formalism selected; synthetic boundary/seam control executed; source-derived cell rules remain open  
**Machine specification:** [typed compiler specification](muqarnas_typed_compiler_spec_v1.json)  
**Certificate:** [toy compiler seam certificate](../../../verification/test/test_muqarnas_toy_compiler_seam_residual.mjs)

## Result

No single established formalism is sufficient by itself. The smallest adequate mathematical stack is:

\[
\boxed{
\begin{array}{c}
\text{typed attributed open planar cell complex}\\
\downarrow\\
\text{double-pushout-style local rewriting}\\
\downarrow\\
\text{coloured operad of boundary-typed patches}\\
\downarrow\\
\text{realization semantics into layered 3D cell complexes}.
\end{array}}
\]

Shape grammar remains useful for visual reconstruction and historical comparison, but the canonical machine object should be the typed open cell complex. Graph rewriting supplies explicit interfaces and independence conditions; the operad supplies hierarchical macro-cell substitution; realization supplies geometry without confusing syntax with spatial action.

The accompanying finite certificate proves the key control:

> associative fine-scale assembly can induce a nonassociative macro-label calculus when different reductions hide different internal seams.

Therefore a nonzero architectural “associator” may be a quotient scar of coarse-graining rather than fundamental nonassociativity.

## 1. Why shape grammar alone is insufficient

Shape grammar naturally represents visual rules such as adding, subtracting, embedding and transforming shapes. It is appropriate for reconstructing the historical design logic. But drawing 108 requires several distinctions that an untyped shape calculation can obscure:

- construction lines versus cell boundaries;
- a cell edge versus an exposed sewing interface;
- source-drawn relation versus inferred crossing;
- planar shape versus possible spatial lift;
- equivalent exterior shape versus different hidden seam histories.

These distinctions can be added to shape grammar, but doing so effectively recreates an attributed typed rewriting system. Shape grammar should therefore remain the visual front end rather than the sole semantic foundation.

## 2. Why typed graph rewriting is the base

Represent a plan patch by

\[
P=(S,K,h,B,u),
\]

where:

- \(S\) is the construction scaffold;
- \(K\) is the embedded cell complex;
- \(h\) is the level/tier field;
- \(B\) is the ordered typed boundary;
- \(u\) is evidence provenance and uncertainty.

A local production is a span

\[
L\longleftarrow I\longrightarrow R,
\]

where \(I\) is the preserved interface. This is the correct shape for adding a cell, replacing a documented cluster by a macro-cell or reflecting a repeat unit while retaining its exposed boundary.

Double-pushout concurrency gives a direct test of whether two rule applications are genuinely independent. If they are, their order should not matter. An apparent order effect then points to overlapping matches, hidden attributes or an invalid rule—not automatically to nonassociative physics.

## 3. Why an operad is the composition layer

Each patch has an ordered list of boundary ports. Port colour records:

\[
(\text{edge species},\text{tier},\text{orientation},\text{normal},\text{support state}).
\]

A multi-input operation inserts compatible patches into a macro-patch. This is precisely coloured-operad composition. It supports:

- hierarchical cell clusters;
- reuse of a motif at different locations;
- reflection and rotation of boundary types;
- comparison of direct assembly with macro substitution;
- a declared syntax independent of its spatial realization.

Operadic associativity is a control: different ways of writing the same hierarchical substitution must agree when they denote the same wiring. If they do not, either the proposed operations are not well defined or relevant hidden state has been omitted.

## 4. Realization is a separate semantic map

Let \(\mathcal M\) be the coloured operad of typed plan patches and let \(\mathcal G_3\) contain layered spatial cell complexes. A realization assignment is

\[
R:\mathcal M\longrightarrow\mathcal G_3.
\]

For a macro operation \(\mu\) and patches \(P_i\), the compiler square asks whether

\[
R\bigl(\mu(P_1,\ldots,P_n)\bigr)
=
R(\mu)\bigl(R(P_1),\ldots,R(P_n)\bigr).
\]

If equality holds, the semantics is compositional. If it fails, classify the residual before naming it:

- changed exterior geometry;
- changed tier or height;
- changed internal seam;
- changed orientation;
- changed structural support;
- invalid/undefined intermediate object;
- transcription or solver artifact.

## 5. The minimal seam experiment

Take three unit patches \(A,B,C\), each with unit length and compatible oriented boundaries. Fine sewing is concatenation. Therefore

\[
(A\#B)\#C=A\#(B\#C),

\]

with total length three and internal seams at positions \(\{1,2\}\).

Now introduce two legitimate-looking macro reductions:

\[
AB\mapsto X,
\qquad
BC\mapsto Y,

\]

where collapsing a pair hides the seam inside that pair. Then

\[
(AB)C\mapsto XC=U
\]

has one visible seam at \(x=2\), while

\[
A(BC)\mapsto AY=V
\]

has one visible seam at \(x=1\).

The exteriors are identical:

\[
\operatorname{length}(U)=\operatorname{length}(V)=3,

\]

but the internal records differ. Reflection about the midpoint exchanges the two outputs:

\[
x\mapsto3-x:quad\{1\}\leftrightarrow\{2\}.

\]

The signed seam displacement

\[
\sigma=\bar x_{\rm seam}-\frac32

\]

is therefore \(-\tfrac12\) for \(V\) and \(+\tfrac12\) for \(U\).

This is an exact toy analogue of the desired phenomenon:

\[
\boxed{
\text{fine assembly associative}
\quad+quad
\text{coarse reduction history}
\quad\to\quad
\text{orientation-odd quotient scar}.
}
\]

It is not octonionic. It proves that an associator-shaped observation can arise from coarse-graining alone.

## 6. Detector dependence

Three detectors see three different realities:

| Detector | Distinguishes \(U,V\)? | Record |
|---|---:|---|
| exterior silhouette | no | interval of length three |
| un-oriented seam count | no | one internal seam |
| oriented seam position | yes | \(+1/2\) versus \(-1/2\) |

This is a direct application of the corpus's detector discipline. A quotient scar exists relative to one observation map and vanishes under another. The muqarnas experiment must therefore declare whether photographs, plans, physical joints, tier heights or structural scans are the detector.

## 7. What would make the source case stronger

The synthetic grammar was chosen to demonstrate the danger. It has no historical authority. The source case advances only if drawing 108 or another documented plan supplies:

1. a native cluster that craftspeople or reconstruction rules treat as a macro-cell;
2. two admissible reduction/assembly routes;
3. a common exterior or boundary interface;
4. a surviving seam, level or orientation distinction;
5. a detector able to measure that distinction;
6. stability under coordinate change and transcription uncertainty.

Only after those conditions hold should the residual be tested for alternation, Moufang identities or Fano incidence.

## 8. Formalism decision

| Task | Selected formalism | Reason |
|---|---|---|
| visual historical reconstruction | shape grammar | retains construction and embedding logic |
| source data | attributed open planar cell complex | separates scaffold, cell, level, boundary and provenance |
| local rules | typed DPO graph rewriting | explicit preserved interfaces and concurrency tests |
| macro-cells | coloured operad | hierarchical substitution with typed ports |
| 3D generation | constraint-based realization algebra | enumerates lifts and maintains geometric predicates |
| history residuals | quotient map plus detector family | distinguishes exterior equality from hidden seams |
| exceptional audit | partial algebra identities after freezing grammar | prevents label-driven retrofitting |

## 9. New mathematical targets after the toy result

The toy model redirects the theorem search.

### Target T1 -- congruence criterion

Characterize when macro-collapse equivalence is a congruence for fine sewing. If it is, no compiler defect can occur.

### Target T2 -- residual cocycle

Determine whether seam/tier defects compose additively or satisfy a cocycle identity across a sequence of macro reductions.

### Target T3 -- confluence and normal forms

Test whether all reduction paths reach one typed normal form. Nonconfluence may classify alternative construction histories without invoking octonions.

### Target T4 -- detector-complete invariant

Find the minimal collection of exterior, seam, level and orientation measurements that distinguishes all lift/reduction classes.

These are closer and better motivated than immediately seeking a Moufang law.

## Decision

The programme should implement a typed graph-rewriting/operadic compiler first. Octonionic comparison becomes a late invariant test on its native partial algebra.

The synthetic certificate supplies a hard warning and a useful mechanism:

> Nonassociative macro labels can be produced by an associative geometry whenever coarse-graining hides different seams. A physically meaningful residual requires a declared detector and source-authorized reductions.

## Subsequent external instance of the boundary formalism

[Mystery Atlas 17](mystery_atlas_17_boundary_lift_no_go_and_collared_choice_system.md) applies the same typed-boundary discipline to the independently sourced girih--Penrose map. The published 10/2/2 symmetry-breaking choices change edge-mismatch outcomes inside a fixed tile-count fibre, proving that no boundary detector can factor through counts alone. The resulting collared finite constraint system is a concrete external instance of partial composition and boundary sewing, while remaining separate from the muqarnas height-realization carrier and from the octonion hypothesis.

## Corpus companions

- [Mathematics literature and novelty review](mystery_atlas_10_muqarnas_mathematics_literature_review.md)
- [First recovered radial generator](mystery_atlas_09_topkapi_108_radial_generator.md)
- [Compiler boundary](mystery_atlas_07_muqarnas_compiler_boundary_and_source_packet.md)
- [Quotient-scars programme](../quotient-scars/README.md)
- [Girih boundary-lift no-go](mystery_atlas_17_boundary_lift_no_go_and_collared_choice_system.md)

