# The Physical \(S_1\) Orientation Pattern Is a Zero-Flux Coboundary, So the Placement Six-Cycle Requires the Full Conjugation-Doubled Source Triplet

**Date:** 18 October 2026  
**Branches:** gauge-conjugate Wilson sources, placement six-cycle, \(\mathbb Z_2\) voltage graph, Furey/sideband antiunitary, minimal source doubling  
**Claim status:** exact cover obstruction and minimal combinatorial repair; microscopic doubled-source action remains open  
**Certificate:** [test_the_gauge_orientation_coboundary_against_the_placement_six_cycle_and_construct_the_minimal_doubled_lift.mjs](../../../verification/test/test_the_gauge_orientation_coboundary_against_the_placement_six_cycle_and_construct_the_minimal_doubled_lift.mjs)

## Executive result

Document 1069 showed that the Wilson source cycle crosses the \(S_1/S_1^\dagger\) orientation grading. That fact does **not** by itself generate the odd \(\mathbb Z_2\) flux of the placement six-cycle.

Order the three physical source rays as

\[
(u,d,l)
\]

and encode

\[
S_1^\dagger=0,
\qquad
S_1=1.
\]

Their physical orientation section is

\[
o=(0,0,1).
\]

The conjugation required along the edge \(i\to i+1\) is the difference

\[
a_i=o_i+o_{i+1}\pmod2.
\]

Therefore

\[
\boxed{
a=(0,1,1),
\qquad
\Phi=a_0+a_1+a_2=0\pmod2.
}
\]

The first edge preserves orientation; the next two conjugate it. The total number of conjugations around the triangle is even.

More generally, every edge voltage obtained from vertex orientation differences is a coboundary and has zero flux:

\[
\sum_i(o_i+o_{i+1})=0\pmod2.
\]

It produces two disconnected lifted triangles, not the connected placement six-cycle.

The established sideband construction instead inserts one antiunitary on every edge:

\[
a_{\rm sideband}=(1,1,1),
\qquad
\Phi_{\rm sideband}=1.
\]

This gives the unique connected six-cycle. But it does not preserve the three-state physical source section. It necessarily visits both conjugation orientations of every source label:

\[
\boxed{
\{u,\bar u,d,\bar d,l,\bar l\}.
}
\]

Hence the minimal Wilson source space on which the placement antiunitary can act edge by edge is the full conjugation-doubled triplet. These six states are orientation lifts, not six generations or six independent particle species.

## 1. Vertex gradings cannot generate odd cycle flux

Let a base cycle have vertices \(i\in\mathbb Z_n\) and a vertex grading \(o_i\in\mathbb Z_2\). The induced edge voltage is

\[
a_i=o_i+o_{i+1}.
\]

Summing around the cycle,

\[
\sum_i a_i
=
\sum_i o_i+\sum_i o_{i+1}
=2\sum_i o_i
=0\pmod2.
\]

This is independent of \(n\) and of the chosen grading. A nontrivial cover requires edge data not globally expressible as differences of vertex labels.

The \(S_1/S_1^\dagger\) pattern is therefore incapable of supplying the placement obstruction on its own.

## 2. The physical three-link lift is disconnected

For \(o=(0,0,1)\), the induced transition rule preserves the graph of the section:

\[
(i,o_i)\longmapsto(i+1,o_{i+1}).
\]

After three steps it returns exactly to its starting state. The conjugate section forms another separate triangle.

Thus the six possible oriented labels exist formally, but the physical gauge-orientation transitions split them into

\[
C_3\sqcup C_3,
\]

not one \(C_6\).

This corrects a tempting inference: “the source cycle crosses conjugation” does not imply “the source cycle is spinorial.” Two crossings cancel.

## 3. Uniform antiunitary sewing gives the connected cover

Apply one conjugation-sheet flip on every placement edge:

\[
R(i,s)=(i+1,s+1).
\]

Then

\[
R^3(i,s)=(i,s+1),
\qquad
R^6(i,s)=(i,s).
\]

Starting from one physical source orientation, the orbit contains all six pairs \((i,s)\). Some intermediate vertices use the conjugate of the orientation appearing in the original three-link Lagrangian.

The full conjugation completion is therefore not optional if the same antiunitary is assigned to every elementary placement edge.

At coherent level, the established Furey/sideband antiunitary squares to \(-I\), lifting this projective \(C_6\) further to the known \(C_{12}\) transport. The present theorem concerns the projective orientation cover; it does not rederive the coherent phase.

## 4. Physical meaning of the six states

The six lifted vertices should not be counted as:

- six fermion generations;
- six new scalar representations;
- six independent Wilson operators.

They are three source labels times two conjugation orientations. Hermitian completion already pairs every interaction with its conjugate, so the enlarged bookkeeping may exist without doubling observable particle content.

However, making the antiunitary a local dynamical operation is stronger than writing the Hermitian conjugate in the action. It must specify how charge flow, time reversal or particle--hole structure carries one oriented source into the other.

## 5. Neutral quotient option

One can first form gauge-neutral four-fermion response operators and let the placement cycle act on their real Hermitian combinations. This avoids linearly mixing gauge-conjugate bilinears.

But quotienting conjugation too early makes the two sheets identical. To retain the central sign, a coherent amplitude root, sideband label or Nambu doubling must survive above the neutral observable.

The admissible architecture is therefore:

\[
\text{conjugation-complete coherent root}
\longrightarrow
\text{neutral Hermitian response}
\longrightarrow
\text{three-placement population quotient}.
\]

This matches the existing \(C_{12}\to C_6\to C_3\) hierarchy in type, while leaving the microscopic intertwiner open.

## 6. Stop-everything criteria

**Coboundary falsifier:** derive odd placement flux solely from changes of a globally assigned \(S_1/S_1^\dagger\) vertex grading.

**Minimal-section falsifier:** apply one antiunitary on every edge while retaining only the three original oriented source vertices.

**Doubled-source trigger:** construct the six conjugation-complete source components and a local graded action whose projective orbit is the connected six-cycle.

**Coherent trigger:** show that the same lifted action squares to central \(-I\) and reproduces the established \(C_{12}\) transport.

**Neutral-quotient trigger:** build a gauge-neutral response root that retains the sheet coherently while its quadratic observable forgets it.

**State-counting warning:** interpret the six orientation lifts as six physical families.

## Verdict

| Candidate origin of edge voltage | Flux | Cover |
|---|---:|---|
| differences of physical \(S_1/S_1^\dagger\) vertex orientations | \(0\) | \(C_3\sqcup C_3\) |
| one antiunitary insertion on every placement edge | \(1\) | connected \(C_6\) |

The established antiunitary has the correct topology only on the conjugation-complete six-state source lift, not on the minimal three-link section.

## Forward result

The Prakash–Ramya anomaly code adds an independent grading obstruction. The two \(S_1\)-exchange arms needed for the \(F_Cp\) pulse lie in different punctured-code sectors: \((QL)(u^ce^c)\) is logical-neutral, whereas all six components of \((QL)(d^c\nu^c)\) are minimum logical-\(Z\) relations. A coherent six-state source construction must therefore retain the conjugation sheet and the logical Pauli fibre as distinct data. See [document 1071](1071_the_standard_model_code_separates_the_two_S1_FCp_channels_into_stabilizer_and_logical_sectors.md).

## Position in the corpus

- [\(C_3+\)Real metric protection and gauge obstruction](1069_C3_plus_a_Real_structure_protects_the_Wilson_A2_metric_but_the_gauge_conjugate_source_triplet_requires_a_graded_lift.md)
- [canonical placement six-cycle](../0900-0999/995_the_unique_connected_double_cover_of_the_placement_triangle_is_the_six_cycle_with_sideband_as_deck_parity.md)
- [nested coherent \(C_{12}\to C_6\to C_3\) lift](../0900-0999/996_the_graded_sideband_antiunitary_lifts_the_six_cycle_to_a_nested_c12_to_c6_to_c3_transport.md)
- [Furey conjugation boundary](../0300-0399/356_furey_conjugation_supplies_car_particle_hole_reality_not_an_exact_flavor_cp.md)

