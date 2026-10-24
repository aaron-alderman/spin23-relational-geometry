# Mystery Atlas 17: Boundary-Lift No-Go and the Collared Choice System

**Date:** 24 October 2026  
**Status:** exact factorization no-go from source-declared choice dependence; collared lift specified but not yet transcribed  
**Machine record:** [girih boundary-choice system](girih_boundary_choice_system_v1.json)  
**Certificate:** [boundary-choice verifier](../../../verification/verify/verify_dynatology_girih_boundary_choice_system.mjs)

## Result

The boundary-word lift proposed in Mystery Atlases 15 and 16 cannot be constructed from the three tile counts alone. This is not merely missing data. It follows from the source's own description of the girih-to-Penrose map.

Lu and Steinhardt state that the map breaks the bilateral symmetries of the girih tiles and therefore has

\[
|C_D|=10,
\qquad |C_H|=2,
\qquad |C_B|=2
\]

choices for a decagon, elongated hexagon and bowtie respectively. Those choices are used across a finite tiling to eliminate Penrose edge mismatches as far as possible. Hence boundary compatibility varies while the girih tile-count vector remains fixed.

Let

\[
q:\mathcal C\longrightarrow\mathbb N^3
\]

forget positions, orientations and local mapping choices, retaining only decagon, hexagon and bowtie counts. Let \(D\) be any detector that records Penrose ribbon mismatches. If \(D\) factored through counts,

\[
D=f\circ q,
\]

then every assignment of the 10/2/2 choices to a fixed girih patch would have the same mismatch record. The source says the choices are used precisely to change that record. Therefore

\[
\boxed{D\text{ does not factor through }q.}
\]

An orientation-sensitive boundary lift cannot be recovered from the count matrix \(G\), the reduced matrix \(B\), the intertwiner \(P\), or the parity triangle alone.

## 1. What the count intertwiner still proves

The previous exact relation remains valid:

\[
S^3P=PB,
\qquad \det P=2.
\]

It governs abelianized population dynamics. In formal-language terms, the count vector is the Parikh image of a richer ordered or geometric patch. Abelianization forgets:

- cyclic edge order;
- tile orientation;
- which neighboring tile shares each edge;
- the symmetry-breaking Penrose choice;
- the position and sign of a ribbon mismatch.

Many inequivalent boundary words have the same Parikh vector. Thus the exact count relation is necessary information for a lift, but cannot determine one.

## 2. The parity triangle is also boundary-blind

The three parity channels depend only on the count lattice modulo two. Consequently every two boundary configurations with the same count vector receive the same \(L_0,L_1,L_2\) label, even if one is Penrose-compatible and the other contains mismatches.

The parity triangle therefore explains the three-step return of the **abelianized carrier**. It does not predict the locations of the reported historical defects. Any such prediction requires a new map

\[
\pi_{\partial}:\mathcal C_{\rm collared}
\longrightarrow
\{L_0,L_1,L_2\}
\]

whose dependence on oriented boundary data is established rather than inferred from counts.

## 3. The correct carrier: a finite constraint system

Let \(\Gamma=(V,E)\) be the adjacency graph of a girih patch. Each vertex carries its tile type \(\tau(v)\) and a choice variable

\[
c_v\in C_{\tau(v)},
\]

with

\[
C_D\cong\mathbb Z_{10},
\qquad
C_H\cong C_B\cong\mathbb Z_2
\]

as sets with their evident rotational actions. Each shared edge \(e=(u,v)\) has a local compatibility detector

\[
m_e(c_u,c_v)\in\{0,1\},
\]

obtained by comparing the oriented red/blue Penrose ribbon signatures induced on that edge.

The global mismatch functional is

\[
E(c)=\sum_{e\in E}m_e(c_u,c_v).
\]

The admissible set at tolerance \(k\) is

\[
\mathcal A_k=\{c:E(c)\le k\}.
\]

This converts the source procedure into a literal admissibility optimization problem:

\[
\text{local mapping freedom}
\xrightarrow{\text{edge sewing}}
\text{global compatibility energy}
\xrightarrow{\min}
\text{admitted Penrose image}.
\]

No physical energy is implied. \(E\) is a discrete mismatch objective.

## 4. Why collaring is necessary

A tile type by itself does not select its Penrose image. A **collared tile** records enough neighboring information to choose and verify the edge signatures around it. The smallest source-faithful lift must therefore include:

1. tile type;
2. tile orientation in the ten-direction frame;
3. the 10/2/2 Penrose mapping choice;
4. cyclically ordered edge-ribbon signatures;
5. neighboring tile type and relative orientation on every sewn edge; and
6. whether a local rearrangement changes the underlying girih adjacency.

An independent reconstruction also reports that replacement patches can protrude across parent boundaries while symmetric overlaps agree between adjacent parents. This supports the need for overlap or collar data, but is retained as secondary implementation evidence rather than promoted to a claim about the historical construction.

## 5. Relation to defects

The primary study reports a small number of local imperfections in the Darb-i Imam pattern and shows a point defect removable by exchanging a bowtie and hexagon. Tennant reports eleven defect variations among approximately 3,700 tiles and notes that paired shifts can remove them.

These observations distinguish two operations that the count map conflates:

- **orientation optimization:** change \(c_v\) without changing the girih adjacency or count vector;
- **adjacency repair:** rearrange tiles, potentially changing which vertices and edges occur locally while preserving broad populations.

The eleven reported defects must not yet be called parity defects. The available source does not label them by \(L_0,L_1,L_2\), and the factorization no-go shows that counts alone could not do so.

## 6. Sheaf and cohomology signpost

The choice sets on tiles and compatibility restrictions on shared edges naturally define a presheaf of local Penrose mappings on the girih adjacency complex. A defect-free mapping is a global section. Failure to find one is an obstruction to global sewing.

Calling that obstruction a particular cohomology class would be premature. The edge signatures and transition functions must first be transcribed. Once they are, three tests become available:

1. **section test:** does a zero-mismatch global assignment exist?
2. **holonomy test:** do compatible local choices return changed around a closed girih cycle?
3. **parity-coupling test:** is any resulting obstruction equivariantly mapped to the \(C_3\) orbit of index-two lattices?

Only the third test can connect the boundary carrier back to the parity triangle.

## 7. Minimal transcription packet

Exact replication of the full 3,700-tile panel is not warranted yet. The smallest corpus-moving packet is:

- one canonical boundary signature for each of the 10 decagon choices;
- one for each of the two hexagon choices;
- one for each of the two bowtie choices;
- the edge-pair compatibility table;
- the bowtie--hexagon point-defect patch before and after repair; and
- one closed local cycle containing that patch.

This packet is enough to determine whether the choice system is merely locally satisfiable, globally frustrated, or coupled to a three-state monodromy. If it cannot distinguish the documented repair, the proposed boundary carrier is inadequate and the branch stops.

A high-resolution source audit in [Mystery Atlas 18](mystery_atlas_18_figure4_orbit_compression_and_nested_optimization.md) compresses the fourteen independent-looking mappings to three canonical boundary words plus verified symmetry actions. It also shows that the documented bowtie--hexagon repair changes placement rather than only the mapping choice, forcing a nested optimization over choice and count-preserving plan fibres.

A high-resolution source audit in [Mystery Atlas 18](mystery_atlas_18_figure4_orbit_compression_and_nested_optimization.md) compresses the fourteen independent-looking mappings to three canonical boundary words plus verified symmetry actions. It also shows that the documented bowtie--hexagon repair changes placement rather than only the mapping choice, forcing a nested optimization over choice and count-preserving plan fibres.

## Decision

The attempted boundary lift has failed in its naive form and succeeded in identifying the missing mathematical object. Counts and count parity are abelian shadows; they cannot carry the source's symmetry-breaking mapping choices or mismatch locations. The next admissible object is a collared finite constraint system, with defects represented as failed sewing rather than inferred from a global number. This is the first point in the girih branch where “admissibility as optimization” is not interpretive language but the source-faithful mathematical form of the problem.

## Sources and corpus companions

- Peter J. Lu and Paul J. Steinhardt, [*Decagonal and Quasi-Crystalline Tilings in Medieval Islamic Architecture*](https://doi.org/10.1126/science.1135491).
- Raymond Tennant, [*Medieval Islamic Architecture, Quasicrystals, and Penrose and Girih Tiles*](https://archive.bridgesmathart.org/2008/bridges2008-297.pdf).
- Greg Egan, [Girih recursive reconstruction](https://www.gregegan.net/APPLETS/32/32.html), used only as secondary implementation evidence for symmetric cross-boundary overlap.
- [Girih inflation intertwiner](mystery_atlas_15_girih_inflation_intertwiner_and_index_two_scar.md)
- [Parity triangle](mystery_atlas_16_parity_triangle_and_three_step_return.md)
- [Muqarnas compiler boundary](mystery_atlas_07_muqarnas_compiler_boundary_and_source_packet.md)
- [Typed DPO and boundary-operad compiler](mystery_atlas_11_muqarnas_formalism_and_toy_compiler.md)
- [Figure 4 orbit compression and nested optimization](mystery_atlas_18_figure4_orbit_compression_and_nested_optimization.md)
- [Figure 4 orbit compression and nested optimization](mystery_atlas_18_figure4_orbit_compression_and_nested_optimization.md)

