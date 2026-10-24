# Mystery Atlas 12: The Topkapı Lift Fibre and Boundary Adapter

**Date:** 24 October 2026  
**Status:** source-derived result; non-unique lift established, nonassociative defect not established  
**Machine record:** [catalogue 5 lift-fibre record](topkapi_drawing_5_lift_fibre_v0.json)  
**Certificate:** [lift-fibre verifier](../../../verification/verify/verify_dynatology_topkapi_drawing_5_lift_fibre.mjs)

## Result

The Topkapı Scroll contains the missing source-level bridge from a muqarnas plan to a family of three-dimensional realizations, but it occurs in Mohammad al-Asad's worked analysis of **catalogue drawing 5**, not catalogue drawing 108.

The construction is explicit:

\[
\text{plan}
\to
\text{eight rows/tiers}
\to
\text{height projection}
\to
\text{unit-profile carving}
\to
\text{vertical tier placement}
\to
\text{quarter vault}.
\]

Al-Asad uses one common tier height for the worked reconstruction, then states that a different height, or heights, would yield an equally correct interpretation. This establishes a non-singleton lift fibre. It does **not** establish a nonassociative realization rule.

## 1. Source correction: 5 is not 108

Catalogue drawings 5 and 108 belong to the same close design family. Both are fan-shaped radial quarter-vault plans with eleven internal radii, twelve quarter sectors, a twenty-four-sector half-vault completion, stippled level information and asymmetric boundary units that rule out full-vault quadrupling.

They are nevertheless distinct drawings. Their star contents and boundary details differ. The eight-row CAD reconstruction on printed pages 351--357 names catalogue no. 5 throughout. Therefore:

\[
\boxed{
\text{108 supplies the independently scanned radial scaffold;}
\quad
\text{5 supplies the documented lift algorithm and height freedom.}
}
\]

The close match is evidence for a shared workshop grammar. It is not permission to transfer every decoded tier assignment from 5 to 108.

## 2. The source-native compiler

Let

\[
P=(K,S,L,B)
\]

denote the plan, where (K) is the cell complex, (S) the radial/circular scaffold, (L) the dotted and coloured level marks, and (B) the boundary data. Al-Asad's reconstruction can be written as

\[
R_P:H_P\longrightarrow \mathcal M_{3D},
\]

where (H_P) is the set of source-admissible tier-height assignments. The plan-forgetting projection obeys

\[
\pi(R_P(h))=P
\qquad(h\in H_P),
\]

because every row keeps its planar location and is shifted only along the height coordinate.

The source supplies a worked common-height assignment (h_0), fixed from the depth of the uppermost row, and explicitly licenses another height or heights. Hence the conservative result is

\[
\boxed{|H_P|\ge 2.}
\]

No stronger dimension claim is currently justified. The text does not prove that all eight heights vary independently or characterize the topology of (H_P).

## 3. What the level marks do

The dotted units around stars belong to the lower of two adjacent tiers. Their curved faces point towards the star centres, while the corresponding empty units point away. Thus the marks are not ornamental decoration on a completed graph. They participate in the lift instruction.

The plan is therefore not merely a planar tiling:

\[
(K,S)\quad\hbox{is insufficient, while}\quad(K,S,L,B)
\]

contains part of the missing third-dimensional information. The source also says that the coding cannot be completely deciphered, so (L) is informative without being a complete executable program.

## 4. A documented symmetry transition

The eight rows divide into two regimes:

- rows 5--8 lie within the circular construction boundaries and are regular under radial symmetry;
- rows 1--4 lie near the outer edges and are irregular, retaining only the main diagonal symmetry, apart from a partial eight-pointed-star exception.

This is more than a visual irregularity. The text identifies the outer units as the transition between a square base and a circular half vault. They also make fitting to different arch profiles easier.

The natural interpretation is a **boundary adapter**:

\[
\text{regular radial core}
\xrightarrow{\text{rows }4\to1}
\text{diagonal boundary regime}
\xrightarrow{\text{irregular units}}
\text{external arch/square constraint}.
\]

The broken global symmetry is therefore functional. It is the geometric cost of satisfying two different boundary geometries.

## 5. Dynamics enters as constrained deformation

This source finally makes the earlier intuition about admissibility and optimization concrete. For a fixed plan (P) and an external arch profile (A), the builder selects heights (h) such that

\[
h\in H_P,
\qquad
\partial R_P(h)\approx A,
\qquad
\text{tier interfaces close}.
\]

A modern formulation could minimize a fitting functional

\[
E(h)=E_{\rm arch}(h)+\lambda E_{\rm interface}(h)
+\mu E_{\rm fabrication}(h),
\]

over the admitted height fibre. This equation is a proposed formalization, not a historical claim. What is historical is that tier height was selected using the builder's aesthetic judgment, the surrounding arch or vault profile and the containing space, and that tier heights could be adjusted to fit an arch.

Thus the dynamics is not motion of a finished vault. It is a controlled path through realization space:

\[
h(t)\in H_P
\]

until boundary fit and closure are achieved.

## 6. What this does—and does not—show

The source now supports:

1. a typed 2D instruction with incomplete lift data;
2. a non-singleton family of legitimate 3D realizations;
3. a discrete level code coupled to continuous or selectable height data;
4. a regular radial core joined to an irregular boundary-adaptation zone;
5. an optimization-like interpretation of construction under external geometry.

It does not yet support:

- two reduction orders producing different source-observed seams;
- a failure of associativity in fine cell assembly;
- an octonion, Moufang or Jordan identity;
- a topology change under allowed height variation;
- the transfer of catalogue 5's exact row decomposition to drawing 108.

The toy compiler's orientation-odd seam scar remains a synthetic detector design. Catalogue 5 supplies the real lift fibre on which that detector may eventually be tested, but it has not produced the scar.

## 7. Next decisive source test

The next test is no longer “does a lift fibre exist?” It does. The next test is:

> Do two historically admissible decompositions or macro-cell reductions of the same catalogue 5 subplan yield the same realized interfaces after projection and carving?

The minimum transcription is one star-centred cluster crossing two adjacent tiers, including:

- cell polygons and orientations;
- dotted versus empty level marks;
- row membership;
- biped support relation;
- exposed boundary word;
- at least two admissible height assignments.

If both construction routes agree, the source case remains an associative compiler with geometric freedom. If their exteriors agree but an oriented internal interface differs, the corpus has its first historical quotient scar. Only after that result should exceptional-algebra identities be tested.

## Decision

The source provides a real admissibility zone:

\[
\boxed{
\text{fixed typed plan}
\ +\ 
\text{non-singleton admitted height fibre}
\ +\ 
\text{boundary fitting}
\longrightarrow
\text{family of valid vault geometries}.
}
\]

That is already a strong result. The underdetermination is not ignorance outside the system; it is represented inside the historical construction procedure. The frontier has moved from proving multiplicity to classifying the fibre and testing whether any construction history leaves a detectable internal scar.

## Corpus companions

- [Drawing 108 multiplex pretranscription](mystery_atlas_08_topkapi_108_multiplex_pretranscription.md)
- [Drawing 108 radial generator](mystery_atlas_09_topkapi_108_radial_generator.md)
- [Muqarnas mathematics literature review](mystery_atlas_10_muqarnas_mathematics_literature_review.md)
- [Formalism and toy compiler](mystery_atlas_11_muqarnas_formalism_and_toy_compiler.md)
- [Typed compiler specification](muqarnas_typed_compiler_spec_v1.json)
