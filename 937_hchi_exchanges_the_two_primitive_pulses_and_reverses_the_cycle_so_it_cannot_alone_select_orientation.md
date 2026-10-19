# hχ Exchanges the Two Primitive Pulses and Reverses the Cycle, So It Cannot Alone Select Orientation

**Date:** 17 October 2026  
**Branches:** $h\chi$ grading, pulse-order selection, orientation reversal, weak/Pfaffian spurion, and defect symmetry breaking  
**Claim status:** exact conjugation theorem and orientation-selection no-go; weak/Pfaffian dynamics remain conditional  
**Certificate:** [prove_hchi_exchanges_the_two_pulses_and_cannot_alone_select_cycle_orientation.mjs](scripts/prove_hchi_exchanges_the_two_pulses_and_cannot_alone_select_cycle_orientation.mjs)

## Executive result

The product grading $h\chi$ supplies the required lepton/color reflection axis, but it does not by itself select the direction of the two-face cycle.

On the three-label space, its active action is the remaining transposition

\[
D_{h\chi}=S_{02}.
\]

On the zero-sum mediator plane,

\[
Q^TS_{02}Q
=
\begin{pmatrix}
1&0\\0&-1
\end{pmatrix},
\]

the previously identified missing sector sign.

But conjugation exchanges the two primitive edge pulses:

\[
S_{02}K_{01}S_{02}=K_{12},
\qquad
S_{02}K_{12}S_{02}=K_{01}.
\]

Consequently

\[
S_{02}(S_{01}S_{12})S_{02}
=S_{12}S_{01}
=(S_{01}S_{12})^{-1}.
\]

Thus $h\chi$ reverses cycle orientation. An exact unbroken $h\chi$ symmetry makes the two orientations partners; it cannot choose one without an additional odd datum or spontaneous breaking.

## 1. Reflection-axis selection versus orientation selection

Two distinct questions must not be conflated.

1. Which reflection axis distinguishes the lepton and color aggregate directions?
2. In which order are the two primitive faces traversed?

The first is answered by $h\chi$. Its transported action is the exact integral reflection already selected in documents 902 and 910.

The second is not. Because the same reflection exchanges the two faces, it maps every clockwise schedule to the counterclockwise schedule.

This is why an axis selector is not automatically an orientation selector.

## 2. Orientation-odd observable

Define the antisymmetric cycle observable

\[
\Omega
=\frac12(T-T^{-1}).
\]

Then

\[
S_{02}\Omega S_{02}=-\Omega.
\]

On the active plane, this is the familiar statement

\[
D_{h\chi}JD_{h\chi}=-J
\]

for the oriented area generator $J$.

Any nonzero expectation selecting one direction is therefore $h\chi$-odd.

## 3. What can select an orientation

Introduce an orientation spurion $\eta$ with

\[
\eta\mapsto-\eta
\]

under $h\chi$. Then the combination

\[
\eta\Omega
\]

is invariant, while a chosen sign of $\eta$ selects one orientation.

The weak/Pfaffian sign used in the frame-alignment theorem has the correct qualitative role and remains the leading candidate. But its local coupling to the pulse order has not yet been derived.

Other possibilities are:

- an oriented boundary normal;
- a chiral flux through the label triangle;
- a time-ordering clock field;
- spontaneous breaking of the reflection symmetry.

## 4. Consequence for earlier protection claims

The result refines, rather than retracts, the previous conclusions:

- topology protects the orientation-reversing component;
- the $A_2$ lattice discretizes the admissible axes;
- $h\chi$ selects the named reflection axis;
- a separate orientation-odd datum selects the direction around that axis.

The crossed $h\chi$/exchange commutant can still protect the response metric. Metric rigidity and temporal orientation are different gates.

## 5. Stop-everything and falsification criteria

**Pfaffian-coupling trigger:** derive a term $\eta_{\rm Pf}\Omega$ from the Higgs/Furey defect action.

**Spontaneous-order trigger:** produce two degenerate $h\chi$-related vacua whose signs select $T$ and $T^{-1}$.

**Clock trigger:** derive a boundary clock transforming oddly under $h\chi$ and fixing pulse order.

**Conjugation falsifier:** $S_{02}$ fails to exchange $K_{01}$ and $K_{12}$ or fails to invert their product.

**Selection overclaim:** state that an exact unbroken $h\chi$ reflection alone distinguishes the two orientations.

## 6. Verdict

| Question | Verdict |
|---|---|
| Does $h\chi$ provide the required active reflection? | **yes** |
| Does it exchange the two primitive pulses? | **yes** |
| Does it reverse the cycle? | **yes** |
| Can unbroken $h\chi$ alone select one orientation? | **no** |
| Is the weak/Pfaffian sign a viable extra spurion? | **yes, conditionally** |
| Is its dynamical coupling derived? | **not yet** |

## 7. Position in the corpus

- [minimal positive two-pulse action](936_two_positive_rank_one_edge_pulses_are_the_minimal_local_action_for_the_two_face_selector_cycle.md)
- [label-swap/mediator-face intertwiner](935_the_two_local_label_swaps_are_exactly_the_two_mediator_householder_faces_on_the_zero_sum_plane_up_to_canceling_signs.md)
- [$h\chi$ as the missing lepton/color sign](902_the_product_of_furey_handle_and_higgs_channel_gradings_is_exactly_the_missing_lepton_color_sign_and_conditionally_reopens_the_a2_route.md)
- [weak/neutrino frame alignment](923_a_neutrino_lepton_anchor_and_one_weak_orientation_bit_uniquely_align_the_three_a2_frames.md)
- [Pfaffian sign and cycle-orientation pairing](938_the_weak_pfaffian_sign_has_exactly_the_right_odd_parity_to_pair_with_cycle_orientation_but_the_coupling_is_not_yet_derived.md)
