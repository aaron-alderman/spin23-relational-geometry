# The Minimal Two-Face Z4 Connection Separates Global Orientation from Relative Central Holonomy

**Date:** 18 October 2026  
**Branches:** Pfaffian sign, two-face connection, Hopf quarter-turn, central phase, sideband sewing, and orientation  
**Claim status:** exact finite connection classification; physical sign-transport law remains open  
**Certificate:** [classify_the_two_face_z4_connection_by_global_and_relative_pfaffian_signs.mjs](scripts/classify_the_two_face_z4_connection_by_global_and_relative_pfaffian_signs.mjs)

## Executive result

Let each physical face carry an oriented quarter-turn

\[
U_j=J^{\eta_j},
\qquad
\eta_j\in\{+1,-1\},
\qquad
J^{-1}=-J.
\]

The two-face holonomy is completely classified by the relative sign:

\[
\boxed{
U_2U_1=
\begin{cases}
-I,&\eta_1\eta_2=+1,\\
I,&\eta_1\eta_2=-1.
\end{cases}
}
\]

Simultaneously reversing both signs changes (J,J) into (J^{-1},J^{-1}) but leaves the holonomy (-I). Thus:

- the **global sign** selects clockwise versus anticlockwise quarter-turn orientation;
- the **relative sign** selects nontrivial versus trivial central holonomy.

These are different physical bits.

## Connection sectors

| ((\eta_1,\eta_2)) | Two-face word | Holonomy |
|---|---|---|
| ((+,+)) | (JJ) | (-I) |
| ((-,-)) | (J^{-1}J^{-1}) | (-I) |
| ((+,-)) | (J^{-1}J) | (I) |
| ((-,+)) | (JJ^{-1}) | (I) |

The four possibilities form the minimal discrete (Z_4)-connection classification over two faces.

## Pfaffian interpretation

A single coherent Pfaffian order parameter inherited with the same sign by both faces gives

\[
\eta_1=\eta_2=\eta_{\rm Pf}.
\]

It then selects the two opposite orientations while keeping the central sector fixed at (-I). This is exactly the division of labour desired by the earlier orientation analysis.

However, if sideband sewing reverses the Pfaffian sign on only one face, the holonomy becomes trivial. The next decisive calculation is therefore not another group coincidence: it is the transformation law of the Pfaffian orientation under the antiunitary sideband interface.

## Stop-everything and falsification criteria

**Alignment trigger:** the microscopic real-interface law proves \(\eta_2=\eta_1\), producing protected (-I).

**Orientation trigger:** the two global signs generate the two inverse selector orientations while preserving the same central phase.

**Trivialization trigger:** the interface forces \(\eta_2=-\eta_1\), excluding this route to central holonomy.

**Conflation warning:** global orientation sign and relative face alignment must not be treated as the same variable.

## Verdict

| Question | Verdict |
|---|---|
| Does equal face orientation give (-I)? | **yes** |
| Does opposite face orientation give (I)? | **yes** |
| Does global sign reversal change the central sector? | **no** |
| Can one coherent Pfaffian sign supply orientation while retaining (-I)? | **yes, conditionally** |
| Is face-sign alignment derived from sideband reality? | **not yet** |

## Position in the corpus

- [atlas versus oriented holonomy](967_the_two_chart_jordan_atlas_has_trivial_coordinate_holonomy_while_the_central_minus_identity_requires_an_oriented_two_face_connection.md)
- [two-chart Jordan–Hopf atlas](966_two_jordan_cone_charts_cover_every_positive_a2_loss_density_and_their_transition_is_the_hopf_complex_structure.md)
- [Pfaffian orientation pairing](938_the_weak_pfaffian_sign_has_exactly_the_right_odd_parity_to_pair_with_cycle_orientation_but_the_coupling_is_not_yet_derived.md)
