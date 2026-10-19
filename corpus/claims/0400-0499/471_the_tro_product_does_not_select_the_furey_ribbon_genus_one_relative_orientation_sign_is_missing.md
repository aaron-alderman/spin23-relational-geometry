# The TRO Product Does Not Select the Furey Ribbon Genus; One Relative Orientation Sign Is Missing

**Date:** 17 October 2026  
**Branches:** B03, B04, B08, B09, B11 and B14  
**Claim status:** exact information-content no-go and minimal-selector theorem

## 1. The question left by the ribbon classification

The completed matter graph becomes a punctured torus precisely when the cyclic orders at its two trivalent vertices agree. Does the Furey ternary-ring product

\[
[x,y,z]=xy^\dagger z
\]

already choose those cyclic orders?

It does not.

## 2. What the TRO product remembers

For matrix units,

\[
E_{ab}E_{cd}^\dagger E_{ef}
=
\delta_{bd}\delta_{ce}E_{af}.
\]

The product remembers:

- source and target blocks;
- which variable is conjugated in the middle;
- the order of the two outer variables;
- composability of oriented paths.

It does not reference a cyclic ordering of all half-edges incident at a vertex. Adding any of the four ribbon rotation systems leaves every matrix-unit ternary product unchanged.

Therefore the pair-of-pants and punctured-torus thickenings are indistinguishable to the abstract TRO incidence and multiplication table.

## 3. Jordan symmetrization contains still less orientation

The Jordan triple

\[
\{x,y,z\}=\frac12([x,y,z]+[z,y,x])
\]

is invariant under outer-variable reversal. It cannot recover a ribbon order that the oriented TRO did not specify, and it also forgets the TRO's remaining outer-order distinction.

This is another precise sense in which lowering to Jordan language exposes the relational carrier but discards an orientation datum needed for topology.

## 4. The minimal missing selector

At each trivalent vertex, the two \(C/D\) branch directions span an oriented two-dimensional branch plane. Let

\[
\varepsilon_O,\varepsilon_E\in\{+1,-1\}
\]

denote their cyclic orientations relative to the distinguished shared edge.

Only the relative sign

\[
\sigma=\varepsilon_O\varepsilon_E
\]

is intrinsic under simultaneous global reversal. The topology is

\[
\sigma=+1
\Longleftrightarrow
\text{once-punctured torus},
\]

\[
\sigma=-1
\Longleftrightarrow
\text{pair of pants}.
\]

Thus exactly one binary datum is missing from the TRO support.

## 5. Where that sign could come from

The selector must add information not contained in abstract complex matrix-unit composition. Credible sources are:

1. an octonionic/Fano-plane alternating tensor on the colour branches;
2. a CAR real structure with a phase-matched orientation line;
3. nested-division-algebra provenance distinguishing the two neutral blocks;
4. a boundary normal or domain-wall orientation;
5. a Higgs/Majorana coupling whose sign transports the branch orientation between the two junctions.

The same relative-orientation problem has already appeared as the inability of Jordan positivity to phase-match antiunitaries. The ribbon calculation converts that phase ambiguity into a genus ambiguity.

## 6. Consequence for the BF synthesis

The chain is now

\[
\text{completed Furey TRO}
+\text{relative orientation sign }\sigma=+1
\Longrightarrow
\text{punctured-torus spine}
\Longrightarrow
\text{canonical cycle pair}.
\]

Then colour \(A_2\) triality and a level-three topological action can quantize the pair into the BF carrier.

Without \(\sigma\), the same TRO is compatible with a genus-zero thickening and the canonical-pair inference fails.

## 7. Claim ledger

- **Exact:** all four ribbon structures have the same TRO incidence and multiplication table.
- **Exact:** the oriented TRO distinguishes outer order but not vertex cyclic order.
- **Exact:** Jordan symmetrization forgets outer-order reversal as well.
- **Exact:** one relative sign distinguishes genus one from genus zero.
- **Open:** construction of that sign from Furey/octonionic/CAR data.
- **Not established:** that the physical completed TRO chooses the punctured-torus branch.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** an existing Furey alternating tensor evaluates at both trivalent junctions and forces \(\varepsilon_O\varepsilon_E=+1\) independently of basis choices.

**Phase-unification trigger:** the same tensor fixes the weak determinant-line/CAR phase ambiguity and the ribbon relative orientation.

**TRO falsifier:** cyclic half-edge order is claimed to follow from \(xy^\dagger z\) although two different ribbon genera have the identical product table.

**Jordan falsifier:** the symmetrized triple is used to recover an outer-order sign it explicitly removes.

## 9. Certificate

The [TRO/ribbon information certificate](../../../verification/verify/verify_tro_incidence_does_not_select_furey_ribbon_genus_and_needs_relative_orientation.mjs) enumerates the matrix-unit ternary incidence independently of all four ribbon choices, verifies simultaneous-reversal invariance of the relative sign and checks outer-order erasure under Jordan symmetrization.

## Companion documents

- [Furey ribbon topology selector](470_a_coherent_ribbon_orientation_turns_the_two_cycle_furey_graph_into_a_punctured_torus_with_the_bf_canonical_pair.md)
- [Dirac face exchange and ternary order reversal](414_dirac_doubling_is_an_internal_weyl_face_exchange_while_charge_conjugation_requires_the_opposite_spinor.md)
- [Oriented Furey TRO closure](../0100-0199/108_furey_oriented_bimodule_ternary_closure.md)
- [Surviving linking algebras and absolute-orientation gap](../0100-0199/112_furey_surviving_tro_linking_algebras.md)
- [CAR real-structure phase ambiguity](422_a_specified_car_real_structure_reduces_the_weak_phase_to_a_sign_but_does_not_canonically_choose_that_real_structure.md)
