# The Four-Seam Central Sector Remains Eleven Real-Dihedral Orbits, So Placement Symmetry Does Not Select a Sign-Changing Architecture

**Date:** 18 October 2026  
**Branches:** four-seam schedules, placement orbit quotient, Real dihedral symmetry, central holonomy selection  
**Claim status:** exact exhaustive finite classification; dynamical selector absent  
**Certificate:** [classify_four_seam_central_schedules_under_placement_and_real_dihedral_symmetry.mjs](../../../verification/classify/classify_four_seam_central_schedules_under_placement_and_real_dihedral_symmetry.mjs)

## Executive result

Among the $3^6$ sparse quarter-turn schedules, document 1043 found 72 central four-seam configurations:

\[
36\text{ with }+I,
\qquad
36\text{ with }-I.
\]

The hope that placement and Real symmetry might collapse these to one preferred architecture fails.

The exact orbit counts are:

| Symmetry quotient | Total orbits | $+I$ orbits | $-I$ orbits |
|---|---:|---:|---:|
| cyclic $C_6$ | 14 | 7 | 7 |
| bare dihedral $D_6$ | 11 | 6 | 5 |
| sign-reversing Real dihedral | 11 | 5 | 6 |

Under the physically typed Real-dihedral action, the $+I$ sector splits into five inequivalent orbits and the $-I$ sector into six.

There is no unique four-seam orbit, no fully placement-invariant schedule, and no symmetry-only selection of the holonomy-flipping $+I$ sector.

## 1. What was classified

Each edge carries

\[
\sigma_n\in\{-1,0,+1\},
\]

and exactly four of the six entries are nonzero. The real sewing-plus-turn edge is

\[
M_n=ES_-^{(\sigma_n)}.
\]

All

\[
\binom64 2^4=240
\]

four-active schedules were evaluated. Exactly 72 have central six-edge product.

The symmetry actions were:

- cyclic rotation of edge labels;
- bare reflection of edge labels;
- Real reflection combining label reversal with $\sigma\mapsto-\sigma$.

Central holonomy sign is preserved within every orbit.

## 2. Cyclic quotient

The 72 schedules form 14 cyclic orbits:

- ten orbits of size six;
- four orbits of size three.

The shorter orbits are period-three repetition patterns. Cyclic symmetry alone leaves seven independent $+I$ sectors and seven independent $-I$ sectors.

Thus translation symmetry removes absolute placement but leaves substantial internal sign/zero-pattern structure.

## 3. Bare versus Real reflection

Bare reflection joins some cyclic partners and leaves 11 orbits:

\[
6\text{ plus-sign orbits},
\qquad
5\text{ minus-sign orbits}.
\]

The physical Real reflection also flips every quarter-turn orientation. It produces a different partition, again with 11 orbits:

\[
5\text{ plus-sign orbits},
\qquad
6\text{ minus-sign orbits}.
\]

The equality of total orbit counts hides a real difference: bare and sign-reversing reflections pair different cyclic sectors.

## 4. Real-orbit sizes

For the physical Real action:

- the $+I$ schedules decompose into orbit sizes
  \[
  12+6+6+6+6=36;
  \]
- the $-I$ schedules decompose into
  \[
  12+6+6+6+3+3=36.
  \]

The two size-three Real orbits are highly symmetric period-three patterns, but both retain the original $-I$ holonomy. The holonomy-flipping $+I$ sector has no orbit smaller than six.

There is therefore no exceptionally symmetric sign-flipping configuration selected by the placement group.

## 5. Comparison with the minimal pair

The two-seam central branch has:

- 12 schedules;
- two cyclic/Real-preserved chiral sectors;
- one fixed separation magnitude;
- a clear twist–antitwist interpretation.

The four-seam branch has:

- 72 schedules;
- 11 Real-dihedral sectors;
- both central signs;
- multiple zero-placement and orientation patterns;
- no current local minimality principle.

Symmetry economy strongly favors the two-seam branch. This is not an energy theorem, but it is a rigorous reduction in unexplained discrete data.

## 6. What could still select a four-seam sector

Placement symmetry alone is insufficient. A selection mechanism would need extra structure such as:

- an energy or action cost depending on adjacent seam pairs;
- a causal ordering of positive and negative turns;
- a Furey charge attached to the two zero edges;
- a Kramers constraint on the four endpoint modes;
- a prescribed change from $-I$ to $+I$ central sector;
- a cubic or Pfaffian interaction distinguishing period-three patterns.

No such functional has yet been derived.

## 7. Stop-everything and falsification tests

**Action trigger:** a local seam energy has a unique minimum on one of the 11 Real orbits.

**Central-flip trigger:** an independent physical argument requires $+I$ rather than the base $-I$ holonomy. The candidates reduce to five Real orbits, not one.

**Period-three trigger:** a cubic/Furey term selects one of the two size-three $-I$ orbits. Then placement trinity directly controls the four-seam pattern.

**Symmetry-selection falsifier:** placement or Real symmetry alone is claimed to select a unique four-seam schedule or orbit.

**Minimality warning:** the existence of $+I$ four-seam schedules is used to prefer them over the two-seam pair without an action cost.

## Verdict

| Question | Verdict |
|---|---|
| How many central four-seam schedules exist? | **72** |
| How many Real-dihedral orbits remain? | **11** |
| How many flip the base holonomy to $+I$? | **36 schedules in five Real orbits** |
| Is any $+I$ orbit exceptionally fixed by placement symmetry? | **No** |
| Does symmetry select a four-seam architecture? | **No** |
| Which branch remains structurally minimal? | **The two-seam twist–antitwist pair** |

## Position in the corpus

- [minimal sparse twist–antitwist classification](1043_semilinearity_does_not_repair_an_all_edge_quarter_turn_but_a_minimal_same_face_twist_antitwist_pair_preserves_the_six_cycle.md)
- [paired-seam Real chirality](1044_the_minimal_twist_antitwist_pair_has_two_chiral_placement_orbits_preserved_by_the_physical_real_reflection.md)
- [all-edge holonomy obstruction](1042_a_quarter_turn_on_every_sewn_edge_obstructs_the_six_cycle_central_holonomy_and_generically_doubles_the_coherent_cover.md)
