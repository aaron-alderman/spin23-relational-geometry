# The Unique Connected Double Cover of the Placement Triangle Is the Six-Cycle with Sideband as Deck Parity

**Date:** 18 October 2026  
**Branches:** placement double cover, sideband orientation, (Z_2) voltage graph, coherent lift, CAR comparison, and state counting  
**Claim status:** exact cover classification and typing comparison; physical identification remains conditional  
**Certificate:** [classify_the_canonical_double_cover_of_the_placement_triangle.mjs](scripts/classify_the_canonical_double_cover_of_the_placement_triangle.mjs)

## Executive result

Document 994 showed that the coherent placement triangle has nonzero (Z_2) flux and that a six-cycle double cover removes the edge obstruction. The cover is not one arbitrary repair among many: it is the unique connected two-sheet cover up to gauge.

Label the base placement by (i\in\mathbb Z_3) and the coherent sheet by (s\in\mathbb Z_2). Define the lifted cycle

\[
\boxed{T(i,s)=(i+1,s+1).}
\]

Then

\[
T^3(i,s)=(i,s+1),
\qquad
T^6(i,s)=(i,s).
\]

Thus three placement steps close on the base but enact the deck transformation upstairs. Six steps close coherently. The orbit is one six-cycle,

\[
(0,0)\to(1,1)\to(2,0)\to(0,1)\to(1,0)\to(2,1)\to(0,0).
\]

The natural sheet label is precisely sideband/orientation parity: every lifted edge flips it, and that flip cancels the dicyclic central sign locally.

## 1. Classification by (Z_2) voltages

Assign a voltage (a_i\in\mathbb Z_2) to each edge (i\to i+1). Traversing that edge sends

\[
(i,s)\mapsto(i+1,s+a_i).
\]

The total flux is

\[
\Phi=a_0+a_1+a_2\pmod2.
\]

There are eight voltage assignments:

- four with (Phi=0), producing two disconnected triangles;
- four with (Phi=1), producing one connected six-cycle.

A vertex gauge transformation (b_i\in\mathbb Z_2) acts by

\[
a_i\mapsto a_i+b_i+b_{i+1}.
\]

All four odd-flux assignments are gauge equivalent to

\[
(a_0,a_1,a_2)=(1,1,1).
\]

Therefore the connected repair is unique up to relabeling of sheets.

## 2. Exact cancellation upstairs

Use the sheet bit itself as the local coherent lift label. Since every edge flips (s),

\[
1+s+s_{\rm next}
=1+s+(s+1)
=0\pmod2.
\]

Every lifted edge is central-sign free. Downstairs, the nonzero flux reappears because one base circuit changes sheet.

This is the precise relationship between the order-three population cycle and order-six coherent cycle:

\[
\text{base: }A^3=I,
\qquad
\text{lift: }T^3=\delta,quad T^6=I,
\]

where (delta) is the nontrivial deck transformation.

## 3. Spectral interpretation

The six-cycle has eigenvalues

\[
e^{ik\pi/3},
\qquad k=0,\ldots,5.
\]

The deck transformation is (T^3), with eigenvalue

\[
(-1)^k.
\]

Even Fourier modes descend to deck-even sectors; odd modes retain the central sign. Quotienting by the deck action recovers the three placement configurations without introducing new population states.

## 4. Which existing doubling matches?

### Sideband/orientation doubling

This is the strongest match. The established real-time interface exchanges (+\omega) and (-\omega), and one placement step in the coherent cover must flip precisely such an orientation label. The sheet is invisible after projectivization but controls the central phase.

### CAR particle–antiparticle doubling

CAR conjugation also supplies a (C_2) sheet, but identifying it with this cover would mean that each placement step exchanges a charged representation with its conjugate. Earlier gauge-equivariance audits show that this is not automatic on charged sectors. It remains possible on neutral or self-conjugate carriers, not as a universal identification.

### Furey survivor or generation doubling

The cover does not create six independent matter populations. Its two sheets are coherent lifts of the same three placement objects. Interpreting them as extra generations or survivor copies would double state counts without algebraic necessity.

Thus the disciplined current typing is

\[
\boxed{\text{three placements}\times\text{two coherent sideband sheets},}
\]

not six particles or six generations.

## 5. Relation to spin and the “one twist”

The base loop closes after three steps while its coherent lift closes only after six. This is the familiar structural pattern of a spinorial double cover: a closed base motion acquires the nontrivial deck sign, and a second circuit is required upstairs.

This does not prove the spin-statistics theorem or identify the cover with the spacetime spin bundle. It proves a finite relational analogue:

\[
\text{placement }C_3
\quad\text{lifts to}\quad
C_6\text{ with }T^3=\delta.
\]

The “one twist” is the deck transformation accumulated around the placement triangle.

## 6. Stop-everything and falsification tests

**Sideband trigger:** derive the lifted transition (T(i,s)=(i+1,s+1)) from the local antiunitary boundary interface.

**Neutral-CAR trigger:** on a neutral Furey sector, identify the deck transformation with intrinsic CAR conjugation and verify all gauge and reality signs.

**Idler trigger:** realize the two sheets as the minimal neutral idler/frequency-bin dilation without adding observable populations.

**Disconnected-cover falsifier:** a proposed zero-flux double cover is claimed to resolve the triangle obstruction; it produces two separate triangles and retains no deck holonomy.

**State-counting falsifier:** the six cover vertices are counted as six new physical species without an independent Hilbert-space argument.

**Spin overclaim:** the finite (C_6\to C_3) cover is presented as a derivation of spacetime spin or spin statistics.

## Verdict

| Question | Verdict |
|---|---|
| Is the connected two-sheet cover unique? | **Yes, up to (Z_2) gauge** |
| What is it? | **One six-cycle** |
| What does three-step transport do upstairs? | **The deck transformation** |
| Which current physical label fits best? | **Sideband/orientation parity** |
| Does it create six matter species? | **No** |
| Is the physical identification derived? | **Not yet** |

## Position in the corpus

- [placement-triangle frustration](994_the_three_placement_triangle_has_a_z2_sideband_frustration_and_requires_path_dependence_or_a_double_cover.md)
- [dicyclic coherent placement lift](992_the_coherent_two_face_response_is_a_dicyclic_central_lift_of_the_placement_weyl_groupoid.md)
- [sideband implementation classification](906_the_sideband_exchange_in_the_a2_cycle_is_an_antiunitary_boundary_sewing_not_a_single_mode_passive_bosonic_evolution.md)
- [Furey conjugation versus physical CP](356_furey_conjugation_supplies_car_particle_hole_reality_not_an_exact_flavor_cp.md)
