# The Two-Chart Jordan Atlas Has Trivial Coordinate Holonomy While the Central Minus Identity Requires an Oriented Two-Face Connection

**Date:** 17 October 2026  
**Branches:** Jordan atlas, Hopf phase, two-face sewing, sideband orientation, Pfaffian sign, and holonomy  
**Claim status:** exact transition/holonomy separation theorem; physical connection remains open  
**Certificate:** [separate_jordan_atlas_transition_from_oriented_hopf_holonomy.mjs](scripts/separate_jordan_atlas_transition_from_oriented_hopf_holonomy.mjs)

## Executive result

Document 966 identifies the chart transition as the quarter-turn (J), with (J^2=-I). It would be tempting to conclude that passing through two charts automatically produces the central phase. That conclusion is false for an ordinary atlas.

Transition functions must satisfy

\[
g_{tn}=g_{nt}^{-1}.
\]

With (g_{nt}=J), one has (g_{tn}=J^{-1}=-J), and hence the coordinate round trip is

\[
\boxed{J^{-1}J=I.}
\]

The central phase appears only for a physical oriented connection that applies the same quarter-turn at both faces:

\[
\boxed{JJ=J^2=-I.}
\]

Thus the two-chart cover supplies the required structure group, but not the nontrivial holonomy. The “one twist” is additional orientation-sensitive connection data.

## Three distinct compositions

| Composition | Result | Meaning |
|---|---:|---|
| (J^{-1}J) | (I) | ordinary atlas round trip |
| (JJ) | (-I) | same-oriented two-face transport |
| (J^{-1}J) | (I) | orientation-reversed physical faces |

The algebra is elementary, but the typing is decisive: coordinate changes and physical parallel transport must not be conflated.

## Relation to the Pfaffian sign

The earlier orientation audit showed that the face reflection alone cannot select traversal direction, while the Pfaffian sign has the correct odd parity. The present theorem gives that sign a precise possible job:

- choose whether the second face uses (J) or (J^{-1});
- thereby distinguish central holonomy (-I) from trivial holonomy (I).

This is compatibility, not yet a derivation of the connection coefficient.

## Stop-everything and falsification criteria

**Connection trigger:** a local boundary action yields the same-oriented rule (J,J) for the two physical faces.

**Pfaffian trigger:** reversing the Pfaffian sign changes one sewing map from (J) to (J^{-1}) and toggles the central holonomy.

**Sideband trigger:** the real-interface rule fixes whether antiunitary sewing preserves or reverses the oriented quarter-turn.

**Atlas overclaim falsifier:** (-I) is attributed solely to the existence of two coordinate charts without a connection or oriented sewing rule.

## Verdict

| Question | Verdict |
|---|---|
| Does a two-chart coordinate round trip produce (-I)? | **no; it produces (I)** |
| Can two same-oriented physical face maps produce (-I)? | **yes, exactly** |
| Is an additional connection/twist required? | **yes** |
| Does the Pfaffian sign have the correct role to select it? | **yes, conditionally** |
| Has that connection been dynamically derived? | **not yet** |

## Position in the corpus

- [two-chart Jordan–Hopf atlas](966_two_jordan_cone_charts_cover_every_positive_a2_loss_density_and_their_transition_is_the_hopf_complex_structure.md)
- [Pfaffian orientation pairing](938_the_weak_pfaffian_sign_has_exactly_the_right_odd_parity_to_pair_with_cycle_orientation_but_the_coupling_is_not_yet_derived.md)
- [Pfaffian-to-silver coherent lift](959_hchi_and_the_sideband_phase_convert_the_pfaffian_higgs_lift_into_the_reciprocal_silver_scattering_lift.md)
