# The Minimal Spectator Completion Cannot Realize Möbius Holonomy without Erasing the Anchor Mask

**Date:** 18 October 2026  
**Branches:** four-character spectator, strict first order, parallel deck, opposite-anchor protection  
**Claim status:** exact graph and first-order no-go for the minimal spectator completion  
**Certificate:** [prove_minimal_spectator_connector_does_not_resolve_parallel_deck_obstruction.mjs](../../../verification/prove/prove_minimal_spectator_connector_does_not_resolve_parallel_deck_obstruction.mjs)

## Executive result

The fourth-character spectator \(S\) repairs Poincaré duality and finite-metric connectedness, but its minimal retained connector does not repair the Möbius deck obstruction.

The strict first-order, grading-odd physical edges are

\[
PN\leftrightarrow IN,
\qquad
NP\leftrightarrow NI,
\]

\[
PI\leftrightarrow NI,
\qquad
IP\leftrightarrow IN,
\]

plus the spectator pair

\[
SP\leftrightarrow IP,
\qquad
PS\leftrightarrow PI.
\]

Their graph has exactly two connected components:

\[
\{PN,IN,IP,SP\}
\]

and

\[
\{NP,NI,PI,PS\}.
\]

Every forbidden deck reversal remains split between the components:

\[
PN\leftrightarrow NP,
\qquad
NI\leftrightarrow IN,
\qquad
IP\leftrightarrow PI.
\]

Exhausting all other first-order-compatible grading-odd edges finds only two bridges:

\[
PN\leftrightarrow PI,
\qquad
IP\leftrightarrow NP.
\]

These are precisely the maps that identify the Dirac and Majorana \(P\)-lifts and their conjugates.

Therefore:

\[
\boxed{
\text{minimal spectator completion}
\not\Longrightarrow
\text{anchor-safe Möbius holonomy}.
}
\]

## 1. Why this does not contradict finite-metric connectedness

The spectator connector in [1121](1121_the_orientable_null_mask_is_an_A2_triangle_and_one_spectator_real_edge_pair_repairs_both_duality_and_connectedness.md) makes the **left algebra commutant** scalar. That is the appropriate connectedness test for the finite spectral metric.

Möbius connectivity asks a different question: does relational transport join the two orientation-cover components?

One property does not imply the other. The spectator can constrain

\[
a_P=a_I=a_N=a_S
\]

while the oriented relationship graph still splits into two \(J\)-paired components.

This is another important separation of levels:

\[
\boxed{
\text{spectral-metric connectedness}
\ne
\text{orientation-cover connectedness}.
}
\]

## 2. The retained graph

The first component is the chain

\[
PN-IN-IP-SP,
\]

up to edge ordering. The second is its \(J\)-partner:

\[
NP-NI-PI-PS.
\]

Reality exchanges the components but does not add an edge between them.

The spectator pair therefore decorates both sheets symmetrically. It does not provide a seam.

## 3. Exhaustive bridge classification

Consider every pair among the eight sectors

\[
PN,NI,IP,NP,PI,IN,PS,SP.
\]

Require:

1. opposite chirality, so the edge is grading odd;
2. equal left label or equal opposite label, so it satisfies first order;
3. endpoints in different retained components.

Only two pairs pass:

\[
PN\leftrightarrow PI
\]

and

\[
IP\leftrightarrow NP.
\]

They are exchanged by reality.

No edge involving \(PS\) or \(SP\) passes all three conditions. Hence the minimal spectator cannot mediate the missing seam even indirectly at the direct-edge level.

## 4. Why the two surviving bridges are dangerous

The first bridge joins

\[
PN=P_D
\]

to

\[
PI=P_M.
\]

It therefore identifies the two relational lifts of the visible carrier \(P\). The conjugate bridge does the same on the \(J\)-paired sectors.

Once either is physical, the orthogonal anchor blocks are connected. Mixed products can regenerate the coarse third relationship and the \(H_3/Sp(6)\) envelope.

Thus the only strict first-order way to connect the cover is exactly the mechanism the anchor mask was designed to exclude.

## 5. Branch verdicts

| Branch | Verdict |
|---|---|
| minimal \(S\)-pair repairs duality | passes |
| minimal \(S\)-connector repairs left-metric connectedness | passes |
| same connector creates a Möbius seam | **no-go** |
| another direct first-order odd bridge preserves anchors | **no-go** |
| direct bridge \(PN\leftrightarrow PI\) | connects cover but erases anchor protection |
| larger mediator graph | live |
| generalized non-first-order \(A_{(2)}\) route | live |
| structural/categorical deck action | live |
| even linking-algebra observable branch | live |

## 6. What a larger mediator must do

A successful mediator extension must introduce more than the existing \(PS,SP\) pair. It must provide an odd-length path between orientation components while satisfying:

\[
\text{first order at every elementary edge},
\]

\[
\text{grading oddness for every Dirac edge},
\]

\[
\text{no direct }P_D\leftrightarrow P_M\text{ block},
\]

and

\[
\text{no effective forbidden Dirac-null scalar after junk reduction}.
\]

This becomes a finite path-enumeration problem once the allowed additional bimodule labels are specified.

## 7. Stop-everything criteria

**Connectedness stop:** do not infer Möbius-cover connectivity from a scalar left Dirac commutant.

**Spectator stop:** the established \(PS/SP\) connector pair attaches leaves; it does not join orientation sheets.

**Bridge stop:** the only strict first-order odd bridges on the current eight states erase the opposite-anchor split.

**Mediator stop:** an effective multi-step seam must survive the represented calculus and junk quotient; graph reachability alone is insufficient.

**Positive trigger:** exhibit an enlarged mediator sector whose elementary graph connects the sheets while every path projection onto \(P_D\leftrightarrow P_M\) vanishes physically.

## 8. Verdict

The minimal strict-first-order spectator route is closed:

\[
\boxed{
S\text{ repairs duality and metric connectedness, but not the Möbius cover}.
}
\]

The overall programme remains split cleanly:

- the even typed TRO/linking-algebra branch remains exact and economical;
- the strict linear Möbius branch is now excluded on both six- and eight-state minimal carriers;
- the structural/groupoid, enlarged-mediator and generalized \(A_{(2)}\) branches remain live.

## Corpus position

- [parallel deck first-order obstruction](1136_every_parallel_deck_involution_gives_C6_but_contains_one_first_order_forbidden_relation_reversal.md)
- [dihedral reality obstruction](1135_the_natural_oriented_relation_rotation_is_dihedral_and_blocks_the_naive_Jrho_Mobius_C6.md)
- [four-character spectator completion](1121_the_orientable_null_mask_is_an_A2_triangle_and_one_spectator_real_edge_pair_repairs_both_duality_and_connectedness.md)
- [opposite-anchor typed wheels](1127_opposite_anchor_typing_splits_the_Sp6_envelope_into_two_local_Spin23_relational_wheels.md)

