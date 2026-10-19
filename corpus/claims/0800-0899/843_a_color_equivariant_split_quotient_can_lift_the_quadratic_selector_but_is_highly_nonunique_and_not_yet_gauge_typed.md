# A Color-Equivariant Split Quotient Can Lift the Quadratic Selector but Is Highly Nonunique and Not Yet Gauge-Typed

**Date:** 17 October 2026  
**Branches:** Furey endpoints, response quotient, color covariance, and quadratic symplectic selector  
**Claim status:** exact existence and descent theorem for the discrete color cycle; microscopic selection and full gauge covariance remain open  
**Certificate:** [construct_the_minimal_color_equivariant_endpoint_quotient_lifting_the_quadratic_selector.mjs](../../../verification/construct/construct_the_minimal_color_equivariant_endpoint_quotient_lifting_the_quadratic_selector.mjs)

## Executive result

Quotient-level cancellation is algebraically possible without erasing every color-singlet direction.

There is an explicit split, color-equivariant rank-four quotient

\[
\mathbb R^8
\mathop{\underset{J}{\rightleftarrows}}^{\Pi}
\mathbb R^4,
\qquad
\Pi J=I_4,
\qquad
\Pi C=R\Pi,
\qquad
CJ=JR,
\]

from the completed endpoint color representation to the established selector carrier. If

\[
H_i=R^iHR^{-i},
\]

define partial endpoint relationships

\[
S_i=JH_i\Pi.
\]

Then exactly

\[
CS_iC^{-1}=S_{i+1},
\qquad
\sum_iS_i=0,
\qquad
S_i^2=E:=J\Pi.
\]

The entire quadratic channel descends:

\[
S_i^T\Pi^TA\Pi S_i
=
\Pi^TH_i^TAH_i\Pi
\]

for every \(4\times4\) matrix \(A\) and all three legs.

This proves feasibility. It is not yet a derivation: \(H_i\) were used in constructing the lifts, and color covariance alone leaves large continuous families of possible quotients and sections.

## 1. Source and target color representations

On the eight endpoint directions, the color cycle permutes

\[
O_2^1\to O_2^2\to O_2^3\to O_2^1
\]

and fixes the other five endpoints. Over the reals this representation decomposes as

\[
V_8\cong \mathbf1^{\oplus6}\oplus W,
\]

where \(W\) is the irreducible two-dimensional real representation of \(C_3\). The six fixed directions are the color sum plus the five pointwise-fixed endpoints.

The established response carrier has

\[
V_4\cong \mathbf1^{\oplus2}\oplus W.
\]

This immediately permits surjective \(C_3\)-intertwiners that retain the unique nontrivial real color plane and two invariant directions.

## 2. Explicit quotient

In the natural quartet basis—one chosen fixed endpoint plus three colors—let \(q:V_8\to\mathbb R^4\) select

\[
(H_4,O_2^1,O_2^2,O_2^3).
\]

Let \(j=q^T\) be the corresponding inclusion. The exact matrix \(X\) from document 837 satisfies

\[
RX=XP,
\]

where \(P\) is one fixed line plus the three-color permutation. Set

\[
\Pi=Xq,
\qquad
J=jX^{-1}.
\]

Then \(\Pi J=I_4\), and the source projector

\[
E=J\Pi
\]

is rank four, idempotent and color-equivariant.

The choice of \(H_4\) is illustrative, not canonical. Any physical interpretation must derive which fixed source combination plays this role.

## 3. Exact relationship lift

The lifted maps \(S_i=JH_i\Pi\) have rank four. They are not global endpoint involutions—the ansatz already excluded in documents 841 and 842. Instead,

\[
S_i^2=E.
\]

Thus each \(S_i\) is an involution on the selected response image \(\operatorname{im}J\) and vanishes on \(\ker\Pi\). This is precisely how quotient-level cancellation escapes the monomial no-go: it is a partial response operation, not a symmetry of all eight endpoints.

Since \(\sum_iH_i=0\),

\[
\sum_iS_i=J\left(\sum_iH_i\right)\Pi=0.
\]

Color conjugation cycles the three lifts because both \(\Pi\) and \(J\) intertwine the color actions.

## 4. Exact quadratic descent

For a response bilinear form \(A\), its source pullback is

\[
A_{\rm src}=\Pi^TA\Pi.
\]

Using \(\Pi S_i=H_i\Pi\), one obtains

\[
S_i^TA_{\rm src}S_i
=
\Pi^TH_i^TAH_i\Pi.
\]

Consequently the equal-weight source twirl is exactly the pullback of the established response twirl. Positivity on symmetric forms and the unique alternating fixed line therefore survive on the quotient image.

This is stronger than merely matching the three linear matrices: the full congruence channel commutes with pullback.

## 5. Singlet retention

The source color-fixed subspace has dimension six. Its image under \(\Pi\) has rank two. Hence the quotient:

- retains two independent invariant directions;
- kills four invariant directions;
- retains the complete two-dimensional nontrivial color plane.

Therefore quotient cancellation does not have the fatal property of the central-\(Z\) repair in document 838, which erased every color-fixed source direction. But it still chooses which two singlets survive.

## 6. Nonuniqueness theorem

The real intertwiner space is

\[
\dim_{\mathbb R}\operatorname{Hom}_{C_3}(V_8,V_4)=14.
\]

For the displayed quotient, the affine freedom in equivariant right inverses has dimension eight.

These dimensions follow both from representation multiplicities and from the certificate's explicit linear-equation ranks. Color covariance therefore does not select:

- the two retained invariant directions;
- their normalization and mixing;
- the right inverse embedding;
- the physical source interpretation of the lifted \(S_i\).

The existence theorem is real, but it is cheap. Without additional structure almost any desired response operation can be lifted through a chosen split quotient.

## 7. Admission gates

The quotient becomes explanatory only if independently defined Furey/Standard-Model constraints select it. Required tests are:

1. **Full gauge typing:** extend beyond the color three-cycle to the complete \(SU(3)_c\times SU(2)_L\times U(1)_Y\) action.
2. **TRO compatibility:** show that \(\Pi\) and \(J\) arise from typed rectangular source maps or a legitimate completely positive response construction.
3. **No insertion:** derive the lifted relationships without using the already desired \(H_i\) or \(J_0\) as inputs.
4. **Singlet identification:** prove that the two retained invariant directions are the physical response sources required by the stress-energy programme.
5. **Reality and sidebands:** preserve the conjugate-reflected negative-frequency completion.

## 8. Stop-everything criteria

**Positive trigger:** full gauge and TRO constraints reduce the 14-dimensional quotient family to a canonical finite set and its induced quadratic channel has unique alternating fixed line \(\mathbb RJ_0\).

**Negative trigger:** full gauge covariance forces every rank-four quotient carrying the nontrivial color plane either to vanish, double to eight real dimensions, or lose the required positive response. That would redirect the programme from linear quotients to bilocal gauge-singlet contractions.

**Falsifier of the present theorem:** failure of any displayed intertwining, splitting, orbit, square, or quadratic-descent identity. The executable certificate checks all matrix units.

## 9. Verdict

| Question | Verdict |
|---|---|
| Can quotient-level cancellation realize the exact three legs? | **yes** |
| Can it retain color-singlet directions? | **yes; two of six** |
| Is the full quadratic channel preserved? | **yes, exactly on pullbacks** |
| Is the quotient selected by color covariance? | **no; 14-dimensional family** |
| Is the section unique? | **no; eight-dimensional freedom** |
| Is this already a Standard-Model derivation? | **no** |

## 10. Position in the corpus

- [all monomial endpoint maps excluded](842_no_unit_phase_monomial_map_on_the_completed_furey_endpoints_can_realize_the_zero_sum_color_triplet.md)
- [quadratic selector theorem](839_color_twirling_kills_the_linear_handle_but_its_quadratic_relationship_channel_selects_the_unique_symplectic_carrier.md)
- [central repair loses singlets](838_commuting_microscopic_color_and_handle_exchange_cannot_descend_to_R_and_H_and_the_central_repair_loses_the_singlet_lines.md)

