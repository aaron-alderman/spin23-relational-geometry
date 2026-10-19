# A Coherent Ribbon Orientation Turns the Two-Cycle Furey Graph into a Punctured Torus with the BF Canonical Pair

**Date:** 17 October 2026  
**Branches:** B03, B04, B06, B08, B09, B10, B11, B12 and B14  
**Claim status:** exact ribbon-graph classification; algebraic selection of cyclic order remains open

## 1. Two cycles are not yet a canonical pair

The completed Furey matter graph has

\[
V=5,
\qquad E=6,
\qquad b_1=E-V+1=2.
\]

This produces two independent cycle holonomies. But an abstract graph is one-dimensional: it has no two-cells, no fundamental surface class and no intrinsic intersection pairing on \(H_1\).

Therefore

\[
b_1=2
\not\Longrightarrow
\text{one symplectic handle pair}.
\]

This distinction was missing from the first linking-cycle/BF comparison.

## 2. The graph has exactly two trivalent vertices

The vertices \(O_2\) and \(E\) each have degree three. The remaining vertices \(H,C,D\) have degree two. To thicken the graph into an oriented surface, one must specify a cyclic ordering of half-edges at each vertex—a ribbon structure.

Each trivalent vertex has two cyclic orientations up to rotation. Hence there are four ribbon structures in total.

## 3. Exhaustive ribbon classification

Following boundary cycles of the thickened ribbons gives:

- two choices with three boundary components and genus zero;
- two choices with one boundary component and genus one.

Since the graph has Euler characteristic

\[
\chi=V-E=-1,
\]

the possibilities solve

\[
2-2g-b=-1.
\]

They are exactly

\[
(g,b)=(0,3)
\quad\text{or}\quad
(g,b)=(1,1).
\]

Thus the same abstract graph is either:

1. a spine of a pair of pants; or
2. a spine of a once-punctured torus.

## 4. Coherent orientation selects the punctured torus

Label the two branch orders at \(O_2\) by \((Q,u,d)\) or its reverse, and those at \(E\) by \((L,e,\nu)\) or its reverse. The exhaustive calculation shows:

\[
\boxed{
\text{matching cyclic orientations at }O_2\text{ and }E
\Longleftrightarrow
(g,b)=(1,1).
}
\]

Opposite cyclic orientations give the pair of pants.

This promotes “orientation” from a metaphor to a discrete topological selector. A relative sign between the two trivalent junctions changes the genus of the thickened carrier.

## 5. Why genus one supplies the BF phase space

The once-punctured torus has two handle cycles \(A,B\) with

\[
A\cdot B=1.
\]

Its intersection form is

\[
J=\begin{pmatrix}0&1\\-1&0\end{pmatrix}.
\]

For a \(\mathbb Z_3\) gauge/BF sector, holonomies on the two intersecting cycles take values

\[
(a,b)\in\mathbb Z_3^2,
\]

giving nine states. The intersection pairing supplies their canonical Weyl commutation, while the BF quadratic refinement supplies \(\omega^{ab}\).

The pair of pants has no handle and no nondegenerate intersection pairing between its two independent boundary cycles. It cannot provide the same closed canonical pair without extra sewing.

## 6. Relation to the existing Furey cycle holonomies

The graph already carries two generation-amplified \(U(3)\) holonomies \(U_C,U_D\). Their determinant phases are continuous \(U(1)^2\) data, and their commutator cancels those phases. Graph topology alone does not quantize them to \(\mathbb Z_3\).

A punctured-torus ribbon structure supplies the missing *intersection geometry*, but two additional steps remain:

1. restrict or quantize the relevant central holonomies to triality values;
2. derive the level-three BF action or equivalent finite quadratic refinement.

The ribbon result solves the topology of the two-port canonical pairing, not its dynamical quantization.

## 7. Potential algebraic selectors of the ribbon order

Candidate sources of a cyclic order include:

- octonionic orientation/Fano-plane multiplication at the colour junction;
- the directed ternary product at the completed matter TRO vertices;
- a common CAR real structure and orientation line;
- Higgs-arrow ordering in the augmented linking graph;
- anomaly-inflow orientation of a domain wall.

Each must be tested by deriving the two vertex orders independently. Choosing matching orders merely to obtain genus one would be circular.

## 8. Claim ledger

- **Exact:** the abstract graph has cycle rank two but no intrinsic intersection form.
- **Exact:** it has four ribbon structures determined by two binary trivalent orientations.
- **Exact:** two thicken to a pair of pants and two to a once-punctured torus.
- **Exact:** matching vertex orientations select the punctured torus.
- **Exact:** the genus-one thickening supplies one integral canonical cycle pair and nine \(\mathbb Z_3\) holonomy labels.
- **Open:** derivation of the cyclic orders from Furey multiplication or dynamics.
- **Open:** quantization of the continuous graph holonomies to the colour/triality discriminant.
- **Not established:** that the physical linking graph is embedded as a punctured-torus defect.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** Furey ternary multiplication independently fixes matching cyclic orders at \(O_2\) and \(E\), while the colour discriminant quantizes the resulting handle holonomies to \(\mathbb Z_3\).

**Orientation trigger:** the same CAR/octonionic orientation that fixes the earlier phase ambiguity also selects the genus-one ribbon structure.

**Graph falsifier:** cycle rank two is treated as a symplectic pair without a surface/ribbon intersection form.

**Topology falsifier:** opposite trivalent orientations are used while claiming the thickening has genus one.

**Quantization falsifier:** continuous determinant holonomies are renamed qutrit labels without a level or discrete constraint.

## 10. Certificate

The [Furey ribbon-thickening certificate](../../../verification/verify/verify_furey_two_cycle_graph_has_pair_of_pants_or_punctured_torus_ribbon_thickenings.mjs) constructs all four rotation systems, counts their boundary cycles and genera, and verifies that matching trivalent orientations are exactly the once-punctured-torus cases.

## Companion documents

- [Completed Furey two-cycle graph](432_the_completed_furey_linking_graph_has_exactly_two_independent_flavor_cycles_and_a_gauge_covariant_plaquette.md)
- [Central cycle phases versus traceless plaquette](433_the_two_cycle_representation_variety_separates_central_line_holonomies_from_the_traceless_cp_plaquette.md)
- [Faithful-centre screening no-go](469_the_faithful_z6_center_charge_lattice_is_fully_screened_by_the_quark_doublet_and_does_not_itself_supply_bf_order.md)
- [Level-three BF carrier](465_level_three_bf_theory_realizes_the_hyperbolic_two_qutrit_carrier_and_its_missing_mutual_phase.md)
- [Furey colour \(A_2\) bridge](468_the_furey_color_root_lattice_is_exactly_the_a2_response_but_quarks_obstruct_a_standalone_z3_bf_sector.md)
