# Mystery Atlas 07: The Muqarnas Compiler Boundary and First Source Packet

**Date:** 24 October 2026  
**Status:** exact algebraic boundary theorem plus provenance-bearing source selection; monument transcription remains open  
**Source ledger:** [muqarnas source packet](muqarnas_source_packet_v1.json)  
**Certificate:** [label/action compiler boundary](../../../verification/test/test_muqarnas_label_action_compiler_boundary.mjs)

## Result

The corpus already contains the theorem that decides where an octonionic muqarnas analogy can and cannot live.

Let \(A\) be a nonassociative label algebra and let \(L_a\) be the geometric action assigned to a label \(a\). There are two different procedures:

\[
\textbf{collapse then act}:\quad
(a,b,c)\mapsto L_{(ab)c}\ \text{or}\ L_{a(bc)},
\]

and

\[
\textbf{act then compose}:\quad
(a,b,c)\mapsto (L_aL_b)L_c=L_a(L_bL_c).
\]

Function or matrix composition is associative. Therefore an octonionic associator of design labels does **not** become a nonassociative physical assembly merely by representing each label as an action. What can survive is the compiler defect

\[
\Delta(a,b,c)=L_{ab}L_c-L_aL_{bc}.
\]

For the corpus witness \((a,b,c)=(e_1,e_2,e_4)\),

\[
[e_1,e_2,e_4]=2e_7,
\qquad
\Delta(e_1,e_2,e_4)(1)=2e_7,
\]

while

\[
(L_{e_1}L_{e_2})L_{e_4}=L_{e_1}(L_{e_2}L_{e_4}).
\]

This changes the first experiment. The target is not “does construction order look nonassociative?” It is:

> Does a muqarnas design possess a native symbolic reduction whose collapse-to-cell map fails to commute with spatial assembly, and is the residual visible as a tier, seam, orientation or boundary defect?

That is a precise algebra-to-geometry question.

## 1. The compiler square

Write \(W\) for words in typed construction symbols, \(C\) for a symbolic collapse rule, and \(R\) for realization as geometric actions or assembled cells. The relevant square is

\[
\begin{array}{ccc}
W & \xrightarrow{C} & A\\
\downarrow R && \downarrow L\\
\operatorname{End}(X) & \xleftarrow{\text{compose}} & \operatorname{End}(X)^*
\end{array}
\]

The octonionic phenomenon is not failure of associativity along the bottom edge. It is failure of the square to commute:

\[
R(a\,b)\ne L_{ab}
\]

in general. A muqarnas analogue would require two independently justified layers:

1. a native design-symbol product or reduction rule;
2. a native realization of those symbols as spatial transformations or cell attachments.

Inventing the first layer from the second would guarantee a desired answer and is therefore inadmissible.

## 2. Three distinct construction effects

### Ordinary sequential assembly

If each step is a total function on a fixed configuration space, composition is associative. Alternative parentheses change notation, not the final map. This is the appropriate null model.

### Typed partial assembly

Muqarnas operations may be partial: a cell can attach only when boundary types, tier, orientation and support conditions match. Parenthesization may change whether intermediate objects are well typed. This is a **domain-of-definition effect**. It can be physically and mathematically important without being an octonion associator.

### Symbolic collapse before realization

A design grammar may replace a cluster by a macro-cell, then realize that macro-cell geometrically. If collapsing \((ab)\) before adding \(c\) differs from collapsing \((bc)\) before adding \(a\), the mismatch is a compiler defect. This is the closest architectural analogue of the corpus's octonion-chain theorem.

These effects must be reported separately.

## 3. Orientation remains selected data

The octonion associator is an imaginary seven-vector, not a canonical signed scalar. Its real part vanishes and its norm forgets orientation. Extracting a sign requires a chosen direction \(n\):

\[
\sigma_n(a,b,c)=\langle n,[a,b,c]\rangle.
\]

Muqarnas may supply such a direction non-circularly. Candidate selectors include:

- the vault axis or centre-to-boundary radial direction;
- gravity and the tier-height direction;
- the orientation of a quarter-vault or half-vault repeat unit;
- a signed boundary normal;
- a documented bend or stippling convention.

This is an important improvement over the unframed octonion problem: architecture already has physically and constructionally selected directions. But the selector must be present in the source plan or building process. Choosing an axis only because it makes a Fano fit work is circular.

## 4. First source packet

The [source ledger](muqarnas_source_packet_v1.json) separates four usable source classes.

### Primary candidate: *Topkapı Scroll*, catalogue drawing 108

Necipoğlu describes a fan-shaped radial quarter-vault plan with concentric quarter circles, eleven radii, a half-vault interpretation with twenty-fourfold radial symmetry, rows of hexagons and arrow-shaped double bipeds, five-pointed stars in pentagons, a six-pointed corner star, asymmetric boundary units and stippling that distinguishes spatial levels.

It is the best conceptual source because it contains exactly the data types at issue: planar incidence, radial orientation, boundary asymmetry and level notation. It is not yet machine transcribed in this repository, so no cell algebra is claimed.

### Generative validation candidate: Hakim Mosque mihrab

Razzaghmanesh and Gürer's graph-theoretic study starts from its two-dimensional plan and generates three-dimensional structures with node- and surface-based approaches. It is the best validation target for checking that our typed representation agrees with an independently published generative method.

### Reconstruction control: Moroccan--Andalusian vocabulary

Senhaji and Benslimane map planar shapes to a database of possible three-dimensional cell elements and assemble them through neighbourhood properties. This is the clearest control for a grammar that may be multivalued at the cell-selection stage but associative at the completed spatial-composition stage.

### Monument decomposition control: Sahip Ata portal

The published decomposition provides a documented grid, cell and projection analysis of an extant monument. It can test whether the compiler variables correspond to historically realized construction rather than only to scroll notation.

## 5. Minimal data model

The transcription format should contain:

```text
plan
  source_id, plate, repeat_sector, scale_status
vertices
  id, planar_coordinate, radial_order, tier_mark
edges
  endpoints, boundary_type, orientation, construction_status
cells
  id, polygon_word, species, stipple_class, candidate_3d_types
attachments
  cell_pair, shared_boundary, sign, admissibility_conditions
lifts
  cell_id, height, bend, normal, tier, provenance
uncertainty
  object_id, alternatives, source_reason, confidence
```

Coordinates inferred from a scan must never be given the same status as relations explicitly drawn or described in the catalogue.

## 6. Revised experiment sequence

### Pass 0 -- provenance lock

Acquire the highest-resolution lawful image, record page/plate metadata and checksum it. Freeze crop, orientation and scale before tracing.

### Pass 1 -- blind planar transcription

Two independent traces should recover vertices, edges, cell boundaries, stippling and construction lines. Reconcile disagreements without reference to octonions.

### Pass 2 -- native grammar extraction

Infer the smallest cell vocabulary and local attachment rules that reproduce the plan. Penalize exceptions and one-off rules. Keep direction and boundary types if removing them increases description length or destroys reconstruction.

### Pass 3 -- lift enumeration

Generate all bounded lifts compatible with the source marks and a documented historical cell vocabulary. Report the fibre \(\mathcal L(P)\) rather than selecting the most attractive ceiling.

### Pass 4 -- compiler audit

Compare macro-cell collapse with direct cell-by-cell realization. Compute \(\Delta\) for every defined triple. Classify each defect as geometry, seam, tier, orientation, support or mere relabelling.

### Pass 5 -- exceptional-algebra audit

Only now search for alternativity, Moufang identities or a Fano tensor. Correct for the number of label permutations and sign conventions searched. Compare against degree-matched and orientation-randomized controls.

## 7. Promotion ladder

| Finding | Admitted interpretation |
|---|---|
| multiple 3D cells match one planar cell | multivalued lift |
| multiple global lifts share one plan | quotient fibre |
| different build orders expose different temporary supports | process/path dependence |
| total geometric actions compose associatively | expected null |
| macro-collapse and direct assembly disagree | compiler defect |
| defect is visible only in hidden seams | quotient scar |
| defect is alternating after canonicalization | nonassociative symbolic geometry candidate |
| a source-selected axis scalarizes the defect | orientation observable candidate |
| alternativity and Moufang identities survive controls | exceptional-algebra candidate |
| Fano tensor predicts unseen admissible junctions | strong octonionic bridge |

The last result is deliberately predictive. Retrofitting seven labels to known cells is weak; correctly predicting withheld junctions or invalid assemblies is the meaningful test.

## 8. Immediate implication

The muqarnas analogy has become narrower and better:

\[
\boxed{
\text{not: octonionic construction}\qquad
\text{but: a compiler whose symbolic and geometric compositions may fail to commute.}
}
\]

Architecture may also solve the frame problem that blocked the corpus's associator lane, because gravity, radial axes and boundary normals are not arbitrary internal directions. Whether they actually intertwine with a native ternary defect is now an executable question.

## Corpus companions

- [Muqarnas as an algebra-to-geometry bridge](mystery_atlas_06_muqarnas_octonion_generative_bridge.md)
- [The octonion associator and associative-chain boundary](../../claims/0800-0899/834_the_octonion_associator_is_orientation_odd_but_furey_chain_completion_erases_it_as_a_canonical_scalar.md)
- [Recursive Schur--Jordan associative sewing](../../claims/0200-0299/201_recursive_schur_jordan_descent_and_functorial_sewing.md)
- [Quotient-scars programme](../quotient-scars/README.md)

