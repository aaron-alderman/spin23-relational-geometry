# Mystery Atlas 06: Muqarnas as an Algebra-to-Geometry Bridge

**Date:** 24 October 2026  
**Status:** new generative branch; historical muqarnas construction and octonion mathematics are established separately, while their proposed bridge is an explicit analogy awaiting computation  
**Machine record:** [muqarnas--octonion bridge register](muqarnas_octonion_bridge_register_v1.json)

## Result

Muqarnas supply a much stronger sacred-geometry contact than visual resemblance. Their characteristic operation is a rule-governed passage

\[
\text{two-dimensional construction plan}
\longrightarrow
\text{typed cells and adjacencies}
\longrightarrow
\text{tier and lift choices}
\longrightarrow
\text{three-dimensional assembled geometry}.
\]

The octonionic lane has a formally comparable passage

\[
\text{oriented Fano incidence}
\longrightarrow
\text{signed multiplication triples}
\longrightarrow
\text{bracketed composition}
\longrightarrow
\text{Jordan/projective and exceptional geometry}.
\]

This is not evidence that muqarnas encode octonions historically. It is a new, falsifiable analogy between two **generative bridges**: finite local relational data are composed under compatibility rules, and the global geometry retains information that is not visible in an untyped planar picture alone.

The best immediate research object is a **muqarnas lift compiler**, not an iconographic identification.

## 1. The historical and computational base

Muqarnas are layered architectural compositions assembled from a vocabulary of cells. Historical plans in the *Topkapı Scroll* use radial grids, concentric circles, polygons, stars, stippling and boundary units to convey construction information. The plans are not merely pictures of finished ceilings; they are working representations from which spatial organization can be reconstructed.

Modern computational work makes the generative character explicit:

- Senhaji and Benslimane reconstruct Moroccan--Andalusian muqarnas by matching planar shapes to possible three-dimensional elements and composing those elements using neighbourhood relations.
- Computational form-finding studies generate multiple three-dimensional interpretations from a planar projection by varying unit attributes and lift parameters.
- Razzaghmanesh and Gürer use node- and surface-based graph methods both to reproduce an existing muqarnas and to generate new structures.
- Recent geometric decomposition studies recover grid, cell and projection rules from documented monuments.

This establishes the left-hand bridge: plan, rule and adjacency can generate spatial form. It does not establish a unique lift in every tradition or period. Indeed, the possibility of more than one valid height or cell interpretation is part of the mathematical opportunity.

## 2. The octonionic bridge already present in the corpus

An oriented Fano plane encodes the multiplication of the seven imaginary octonion units. For an oriented line \((i,j,k)\),

\[
e_i e_j=e_k,\qquad e_j e_i=-e_k.
\]

The orientation is operational: erasing it preserves an incidence diagram but loses the sign of multiplication. Octonions are alternative rather than associative. Every two generated elements lie in an associative subalgebra, but some triples obey

\[
[a,b,c]=(ab)c-a(bc)\ne0.
\]

The corpus then packages octonionic data into the exceptional Jordan algebra \(H_3(\mathbb O)\), its determinant, projective geometry, magic-square constructions, triality quotients and exceptional groups. The relevant existing result is therefore not simply that octonions are geometric. It is that **oriented finite incidence becomes an algebra, and algebraic compatibility becomes geometry**.

The corpus also supplies the necessary control. Its recursive Schur--Jordan sewing is associative for a fixed eliminated interior: different groupings have different intermediate carriers but the same final boundary response. A muqarnas grammar must be compared against this associative control before any nonassociative reading is admitted.

## 3. The lift rather than the silhouette

Let \(P\) be a typed planar cell complex and let \(\lambda\) denote the extra information required to realize it spatially:

\[
\lambda=(\text{cell species},\text{tier},\text{height},\text{bend},\text{orientation},\text{boundary seam}).
\]

Define a partial lift operation

\[
L:(P,\lambda)\mapsto M,
\]

where \(M\) is a three-dimensional cell complex satisfying the declared adjacency, closure and fabrication constraints. Projection forgets some of this data:

\[
\pi:M\longrightarrow P.
\]

If several inequivalent \(M\)'s project to the same \(P\), the plan is a quotient presentation and \(\lambda\) carries its quotient scars. The right invariant is therefore not the visual similarity of a vault to a Fano diagram. It is the structure of the fibre

\[
\mathcal L(P)=\{M:\pi(M)=P\}/\!\sim,
\]

after quotienting rigid motion, harmless relabelling and declared construction equivalences.

This is the first strong join to the corpus. It turns a historical construction system into a finite admissibility problem:

> Which global spatial realizations are admitted by a local planar grammar, and which lost choices remain recoverable from seams, orientation, tiers or boundary defects?

## 4. The three strengths of the analogy

### Level A -- generative correspondence

Both systems use a small vocabulary and local compatibility to generate a larger object. This level is already credible and useful. It places muqarnas beside graph-to-geometry, substitution tilings, Jordan sewing and architectural shape grammars.

### Level B -- oriented-triple correspondence

Assign cell or junction types to labels \(1,\ldots,7\) and compare allowed oriented junctions with a signed incidence tensor

\[
c_{ijk}\in\{-1,0,+1\}
\]

for the Fano plane. A positive result requires more than finding seven cell types. It requires a stable orientation-sensitive ternary relation whose sign predicts a real construction distinction such as handedness, bend direction, tier transition or seam type.

### Level C -- nonassociative correspondence

Let \(G_a\) be a partial gluing or lift operation. For three compatible construction packets, compare

\[
\Omega(a,b,c)=G_{G_a(b)}(c)-G_a(G_b(c)),
\]

where subtraction means a declared difference of resulting typed complexes, not an informal visual mismatch. Equivalently, compare the two outputs up to the admissible equivalence relation.

The octonionic analogy becomes strong only if:

1. \(\Omega\) is nonzero for some triples;
2. repeated arguments give zero or the grammar satisfies a meaningful analogue of alternativity;
3. the defect is alternating and orientation sensitive;
4. Moufang-type regroupings close where ordinary associativity fails;
5. the defect survives coordinate changes and is not an artifact of the implementation order.

No evidence currently shows that a historical muqarnas grammar satisfies these conditions. They are tests, not conclusions.

The corpus's existing [octonion associator certificate](../../claims/0800-0899/834_the_octonion_associator_is_orientation_odd_but_furey_chain_completion_erases_it_as_a_canonical_scalar.md) imposes a further exact boundary: completed geometric/action operators compose associatively even when their labels do not. The admissible architectural target is therefore the defect between **collapsing symbols before realization** and **composing realized actions**, developed in the [compiler-boundary investigation](mystery_atlas_07_muqarnas_compiler_boundary_and_source_packet.md).

## 5. Why construction history may matter

A finished geometry can sometimes be obtained through different decompositions. Three outcomes must be distinguished:

| Outcome | Meaning |
|---|---|
| regroupings give the same typed complex | the grammar is associative at the tested scale; retain only the generative analogy |
| regroupings give the same exterior but different internal seams or tiers | the associator is a quotient scar or construction-history variable |
| regroupings give inequivalent admissible geometries with a stable alternating defect | a genuinely nonassociative geometric grammar is present and deserves octonionic comparison |

This distinction prevents a common mistake. Path dependence, underdetermination and nonassociativity are not synonyms. A lift can be multivalued while each chosen composition law is associative; a construction can be order sensitive because constraints are solved greedily; or a true ternary associator can remain after all nuisance choices are removed.

## 6. The Jordan step is the real geometry bridge

The octonion-to-geometry route does not stop at the Fano mnemonic. In the corpus, the exceptional Jordan algebra

\[
H_3(\mathbb O)=\mathbb R^3\oplus\mathbb O^3
\]

packages nonassociative entries into a commutative power-associative algebra with rank, idempotents, determinant and a projective interpretation. That suggests a sharper architectural analogue:

\[
\boxed{
\text{local oriented cell algebra}
\to
\text{compatibility-preserving package}
\to
\text{global admissible geometry}
}
\]

The proposed muqarnas study should therefore ask whether an intermediate Jordan-like object exists: a symmetric response, incidence or compatibility matrix whose determinant or rank detects closure, tier completion or singular seams. Such an object would be more important than a superficial sevenfold motif because it would explain how a locally noncommutative or nonassociative rule becomes a stable global form.

## 7. First executable experiment

### Input packet

Freeze one provenance-bearing plan, initially a published *Topkapı Scroll* muqarnas plate or a modern reconstruction with an explicit cell alphabet. Record the image source, transcription decisions, symmetry sector and all uncertain lines.

### Compiler

1. Encode the plan as a typed planar hypergraph: cells, edges, vertices, oriented incidences and boundary labels.
2. Define the allowed three-dimensional cell realizations and matching rules.
3. Enumerate admissible tier, height and bend assignments within a bounded rational parameter set.
4. Assemble every consistent lift and reject self-intersection, unmatched faces and unsupported boundary loads.
5. Canonicalize outputs under rigid motion, graph isomorphism and declared cell relabellings.
6. Record which hidden choices remain visible in seams, orientation, curvature and boundary data.

### Algebra audit

1. Extract all binary and ternary partial composition tables.
2. Compute commutators, associators and closure failures.
3. Test alternativity and the Moufang identities wherever the partial products are defined.
4. Search for a seven-label oriented incidence subsystem only after the native cell algebra is known.
5. Fit the Fano tensor \(c_{ijk}\) up to label permutation and sign convention; report the full residual, not the best-looking subdiagram.
6. Test whether a symmetric/Jordan package predicts global closure or merely redescribes it.

### Controls

- randomize orientation while preserving the untyped incidence graph;
- shuffle cell labels while preserving their frequencies;
- compare planar tilings with the same degree sequence but no muqarnas lift;
- compare associative complex, quaternionic and matrix grammars;
- vary construction order and constraint-solver order independently;
- hold the exterior silhouette fixed while scrambling internal seams.

These controls answer whether the apparent octonionic structure comes from the data, from generic graph combinatorics or from the analyst's labelling freedom.

## 8. Decision table

| Result | Consequence |
|---|---|
| no stable cell grammar can be recovered | historical representation is too underdetermined for this test; improve the source packet |
| finite grammar exists but is associative | valuable plan-to-geometry compiler; no octonionic promotion |
| multivalued lifts exist but associators vanish | quotient-scar and admissibility result, not nonassociative algebra |
| nonzero associators are solver-order artifacts | implementation failure; branch does not advance |
| native alternating associator survives controls | open a nonassociative architectural-grammar branch |
| alternativity/Moufang structure and Fano incidence both survive | strong mathematical bridge; compare with \(G_2\), triality and Jordan packaging |
| Jordan-like determinant predicts admissible closure | programme-changing algebra-to-geometry mechanism even if the algebra is not octonionic |

The experiment is productive across almost all outcomes. A clean associative result tells us how generative sacred geometry works without exceptional algebra. A stable nonassociative result would create a new mathematical object. A closure determinant would directly join the corpus's admissibility programme.

## 9. Implications for the larger corpus

### Sacred geometry

Muqarnas move the sacred-geometry lane from named shapes to **generative architecture**. The sacred object is not just the final pattern; it includes the disciplined conversion of diagram into inhabitable boundary and light-bearing space.

### Dynatology

The plan defines a possibility space, the cell rules define admissibility, the construction history supplies dynamics, and the completed vault is one realized member. This is nearly a physical model of the Dynatology ontology without claiming that it is fundamental physics.

### Quotient scars

Projection from three dimensions to a plan erases height and assembly data. Stippling, cell boundaries, asymmetrical edge units and tier marks may be deliberate carriers of the information needed to reverse that quotient.

### Triality and the triple bond

The corpus already shows that quotienting an oriented threefold orbit can leave a metric scar. A muqarnas grammar would supply a different laboratory: determine whether local orientation data disappear, survive on seams or alter the global lift. No \(D_4\to G_2\) identity should be inferred unless an explicit module and invariant form are found.

### Dynamics

Construction order is a discrete history through admissible partial states. It can be studied using the corpus's distinction between path-dependent intermediates and path-independent endpoints. Material loading, fabrication tolerance and failure can later turn the formal grammar into an actual dynamical selection problem.

## 10. What would be genuinely new

The weak claim—muqarnas and octonions are both geometric—is uninteresting. The useful new claim is:

> Muqarnas provide a historically real, computationally recoverable test bed for how finite oriented incidence and partial composition can be lifted into global geometry, while preserving or erasing construction-order information.

The frontier question is then exact:

> Does any native muqarnas grammar possess a coordinate-independent associator or Jordan-style closure invariant, and if so, is its structure generic, alternative, Moufang, or genuinely octonionic?

Until that calculation is performed, the branch is a strong analogy and a high-value experiment—not an historical or physical identification.

## Sources

- Gülru Necipoğlu, [*The Topkapı Scroll: Geometry and Ornament in Islamic Architecture*](https://www.getty.edu/publications/resources/virtuallibrary/9780892363353.pdf), Getty Center, 1995.
- Mohammed Senhaji and Rachid Benslimane, [“Automatic 3D muqarnas architectural patterns reconstruction using plane representation”](https://www.sciencedirect.com/science/article/pii/S1296207416304022), *Journal of Cultural Heritage* 35 (2019), 25--40.
- Mine Özkar and collaborators, [“Computational Interpretations of 2D Muqarnas Projections in 3D Form Finding”](https://openaccess.iku.edu.tr/entities/publication/19f9ec96-e3e1-47e4-ae5a-0db69b6dd731), 2016.
- Delara Razzaghmanesh and Ethem Gürer, [“Exploring Muqarnas Generation Through Graph Theory: Node and Surface-Based Approaches”](https://research.itu.edu.tr/en/publications/exploring-muqarnas-generation-through-graph-theory-node-and-surfa/), *Nexus Network Journal* 28 (2026), 935--956.
- [“Geometric decomposition and analysis of Konya Sahip Ata mosque portal muqarnas”](https://www.nature.com/articles/s40494-024-01530-9), *npj Heritage Science* (2025).
- John C. Baez, [“The Octonions”](https://webhomes.maths.ed.ac.uk/~v1ranick/papers/baezocto.pdf), *Bulletin of the American Mathematical Society* 39 (2002), 145--205.

## Corpus companions

- [Octonions, the Leech lattice and exceptional-Jordan branch](../../claims/0000-0099/33_octonions_leech_lattice_jordan_branch.md)
- [Recursive Schur--Jordan descent and associative sewing](../../claims/0200-0299/201_recursive_schur_jordan_descent_and_functorial_sewing.md)
- [Magic-square and triple-bond branch spike](../frontier/wave-6/frontier_wave6_00_magic_square_triple_bond_branch_spike.md)
- [Magic-square triality module descent](../frontier/wave-6/frontier_wave6_08_magic_square_triality_module_descent.md)
- [Sacred geometry bridge](mystery_atlas_05_sacred_geometry_bridge.md)
- [Muqarnas compiler boundary and first source packet](mystery_atlas_07_muqarnas_compiler_boundary_and_source_packet.md)

