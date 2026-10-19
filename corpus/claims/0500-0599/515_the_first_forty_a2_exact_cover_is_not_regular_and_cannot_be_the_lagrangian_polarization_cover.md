# The First Forty-\(A_2\) Exact Cover Is Not Regular and Cannot Be the Lagrangian-Polarization Cover

**Date:** 17 October 2026  
**Branches:** B07, B09, B10, B12, B13 and B14  
**Claim status:** exact pair-profile computation for the constructed cover; other exact covers remain unclassified

## 1. Result

The first explicit partition of the 240 \(E_8\) roots into 40 disjoint \(A_2\) hexagons is not compatible with the transitive 40-Lagrangian geometry.

For each pair of hexagons, count the 36 cross-pairs of roots by inner product:

\[
(n_{-1},n_0,n_{+1}).
\]

Exactly three profiles occur:

| profile | number of hexagon pairs |
|---|---:|
| \((0,36,0)\) | 90 |
| \((8,20,8)\) | 450 |
| \((12,12,12)\) | 240 |

The counts sum to

\[
90+450+240=780=\binom{40}{2}.
\]

No single profile defines a regular graph on the forty hexagons. No nontrivial union of profile classes defines a regular graph either.

Therefore this cover cannot reproduce the strongly regular Lagrangian intersection graph

\[
\operatorname{srg}(40,12,2,4)
\]

through any rule depending only on the pairwise \(E_8\) inner-product profile.

## 2. Why regularity is mandatory

The group \(PSp_4(3)\) acts transitively on the 40 Lagrangian polarizations. Consequently every invariant binary relation on those polarizations has constant degree.

If a forty-hexagon cover were equivariantly identified with the Lagrangians, any relation defined intrinsically from the \(E_8\) root metric would also have constant degree.

The constructed cover has five distinct colored-degree signatures across its forty hexagons. Its metric-colored quotient graph is therefore not vertex-transitive.

This immediately excludes it as the desired equivariant cover.

## 3. Interpretation of the profiles

### Orthogonal profile

\[
(0,36,0)
\]

means every root in one hexagon is orthogonal to every root in the other. The two \(A_2\) subsystems span an orthogonal \(A_2\oplus A_2\) subsystem.

### Intermediate profile

\[
(8,20,8)
\]

contains eight positive, eight negative and twenty zero cross inner products.

### Dense balanced profile

\[
(12,12,12)
\]

distributes the 36 cross-pairs equally among the three possible inner products.

The equality \(n_{+1}=n_{-1}\) follows from antipodal closure of each hexagon. What fails is uniform incidence of these profile types from one hexagon to another.

## 4. What has been falsified

The following proposed shortcut is false for this exact cover:

\[
\text{choose any forty-hexagon partition}
\Longrightarrow
\text{recover the forty Lagrangians from root-metric adjacency}.
\]

Existence of an exact cover is substantially weaker than existence of a transitive or canonical exact cover.

The result does not prove that no suitable cover exists. It proves that the deterministic first exact cover found by the search is not one.

## 5. Revised search target

A viable cover must satisfy at least:

1. vertex-transitivity under a subgroup isomorphic to \(PSp_4(3)\), or under the full \(S_3\times PSp_4(3)\) decoration action;
2. a regular 12-neighbor relation matching Lagrangian intersection;
3. six-root fibers that remain \(A_2\) root subsystems;
4. a cocycle assigning the six decorations consistently across adjacent polarizations;
5. compatibility with the binary anti-diagonal \(C_3\) quotient.

These constraints should be built into the exact-cover search rather than tested only after a cover is found.

## 6. Stop-everything criteria

Promote the \(E_8\) cover branch if a search finds a forty-hexagon cover whose metric-colored quotient:

- is vertex-transitive;
- contains an \(\operatorname{srg}(40,12,2,4)\) relation;
- has automorphism group containing \(PSp_4(3)\);
- lifts to the correct degree-56 root graph through a six-state cocycle.

## 7. Falsification criteria

- An irregular cover cannot represent the homogeneous polarization space.
- Matching only the number forty is insufficient.
- Combining profile colors is allowed, but the resulting relation must be regular.
- A cover-dependent arbitrary relabelling is not an equivariant bridge.
- Failure of this cover does not falsify every possible \(A_2\) exact cover.

## 8. Next calculations

1. Formulate a symmetry-constrained exact-cover search using a candidate \(PSp_4(3)\) subgroup of \(W(E_8)\).
2. Determine whether any transitive forty-\(A_2\) cover exists.
3. If none exists, demote the root-level \(E_8\) branch and retain only the \(E_6\oplus A_2\) subgroup relation.
4. Compare cover-independent \(A_2\) incidence tensors with the Furey weak-root graph.

## Certificate and companions

- [Exact-cover profile certificate](../../../verification/test/test_240_polarization_fibers_against_e8_a2_hexagons_and_naive_graph_lifts.mjs)
- [Natural \(E_6\oplus A_2\) quotient](514_the_natural_binary_c3_quotient_matches_a2_times_even_e6_inside_e8_but_the_standard_embedding_is_not_transitive.md)
- [Forty Lagrangian polarizations](512_the_forty_qutrit_null_lines_are_exactly_the_forty_genus_two_lagrangian_polarizations.md)

