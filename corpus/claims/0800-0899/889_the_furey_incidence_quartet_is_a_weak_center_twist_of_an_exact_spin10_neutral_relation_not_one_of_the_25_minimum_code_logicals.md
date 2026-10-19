# The Furey Incidence Quartet Is a Weak-Center Twist of an Exact \(Spin(10)\)-Neutral Relation, Not One of the 25 Minimum Code Logicals

**Date:** 17 October 2026  
**Branches:** Standard-Model code logicals, Furey incidence closure, weak center, local coefficients, orientation/Pfaffian defect, and signed triangle  
**Claim status:** exact finite classification and exact coefficient-character match; dynamical interpretation of the twist remains open  
**Certificate:** [classify_the_25_minimum_standard_model_code_logicals_and_compare_the_furey_incidence_closure.mjs](../../../verification/classify/classify_the_25_minimum_standard_model_code_logicals_and_compare_the_furey_incidence_closure.mjs)

## Executive result

The tempting direct identification fails:

\[
\boxed{
\text{Furey signed incidence triangle}
\ne
\text{minimum logical triangle of the punctured Standard-Model code}.
}
\]

The executable census reproduces all 25 minimum weight-three logical supports of the \([[15,1,3]]\) code. None is the triple \(\{u_c,d_c,u_c^c\}\) that would turn the Furey closure into a logical relation with the removed \(\nu^c\).

But the failed identification reveals a more exact bridge. For every color \(c\), the four weights on the Furey incidence support obey

\[
\boxed{
q(d_c^c)+q(u_c)+q(d_c)+q(u_c^c)=0.
}
\]

The Furey response closure instead has coefficient vector

\[
q(d_c^c)-q(u_c)-q(d_c)+q(u_c^c).
\]

The sign pattern

\[
(+,-,-,+)
\]

is exactly the character of the central element \(-I\in SU(2)_L\): it is \(-1\) on the weak-doublet legs \(u,d\) and \(+1\) on the weak-singlet legs \(u^c,d^c\).

Therefore the signed Furey closure is naturally a **weak-center-twisted local-coefficient relation** built on the support of an exact \(Spin(10)\)-neutral quartet. It is not itself a charge-lattice identity.

## 1. Census of the 25 logical supports

For each unordered triple of the fifteen punctured weights, the certificate tests every coefficient choice in \(\{\pm1\}^3\) for

\[
\nu^c=\epsilon_1q_1+\epsilon_2q_2+\epsilon_3q_3.
\]

Exactly 25 supports pass, each with a unique coefficient assignment. This reproduces the count in Prakash and Ramya.

Under the \(S_5\) permutation group of the five oscillators, they split into two orbits:

\[
25=15+10.
\]

Representative supports are

\[
\{d_3,e,u_3^c\}
\]

for the orbit of size 15 and

\[
\{d_1^c,d_2^c,u_3^c\}
\]

for the orbit of size 10.

The weak Weyl transposition \(q_4\leftrightarrow q_5\) permutes all 25 supports, as required for a code automorphism.

## 2. The direct triangle hypothesis fails

The reduced Furey response uses

\[
d_c^c=u_c+d_c-u_c^c.
\]

If this were a minimum code logical relation, the triple \(\{u_c,d_c,u_c^c\}\) would express \(\nu^c\) in the charge lattice. It does not, for any color.

Nor does the response equation hold as an equality of \(Spin(10)\) weights. In the form

\[
q(d_c^c)-q(u_c)-q(d_c)+q(u_c^c),
\]

the residuals are

\[
4(1,-1,-1,0,0),
\]

\[
4(-1,1,-1,0,0),
\]

and

\[
4(-1,-1,1,0,0)
\]

for the three colors. The response closure is not a gauge-charge conservation equation.

That is a useful falsification, not a defect in the response construction: the Furey equation was derived from cycle/TRO incidence, where signs encode arrow orientation, not from addition of representation weights.

## 3. The same support is exactly neutral

For each color, direct addition gives

\[
q(d_c^c)+q(u_c)+q(d_c)+q(u_c^c)=0.
\]

There are exactly two \(\{\pm1\}\) coefficient patterns that make the quartet neutral:

\[
(+,+,+,+)
\quad\text{and its overall negative.}
\]

This quartet can be read as the simultaneous up/down Dirac support

\[
(u_cu_c^c)(d_cd_c^c),

\]

with the weak contributions of the up and down pair cancelling each other. It is a genuine neutral four-field support even though it is not one of the logical relations containing \(\nu^c\).

## 4. The exact weak-center character

The center of \(SU(2)_L\) acts as

\[
z_L=-I
\]

on weak doublets and as \(+I\) on weak singlets. Hence

\[
\chi_{z_L}(u_c)=\chi_{z_L}(d_c)=-1,
\]

while

\[
\chi_{z_L}(u_c^c)=\chi_{z_L}(d_c^c)=+1.
\]

On the ordered support

\[
(d_c^c,u_c,d_c,u_c^c)

\]

the center character is exactly

\[
\boxed{(+,-,-,+),}
\]

the coefficient pattern of the Furey closure.

This is the first canonical origin found for all signs in that closure. They distinguish weak representation parity, not particle/antiparticle status and not color orientation.

## 5. Correct mathematical interpretation

The neutral relation belongs to the untwisted charge lattice. The Furey closure belongs to an incidence complex with a one-dimensional local coefficient system carrying the weak-center character.

Schematically,

\[
\partial_{\rm ordinary}(d^c,u,d,u^c)=(+,+,+,+),
\]

while

\[
\partial_{z_L}(d^c,u,d,u^c)=(+,-,-,+).
\]

This notation should not be read as applying a gauge transformation to the weight vectors: a field phase does not change its charge weight. It says that the **incidence coefficients** transform in the sign local system defined by the weak center.

That distinction prevents two errors:

- claiming the response closure is a gauge-neutral operator identity;
- dismissing its signs as arbitrary orientation conventions.

The support is gauge neutral; the response boundary is center twisted.

## 6. Connection to the unresolved index-two defect

Document 874 found that the color-Laplacian selector lattice has an index-two defect. Document 875 showed that the missing datum must be first-order—an orientation, seam or determinant line—because the second-order Laplacian erases it.

The weak center supplies exactly a canonical \(\mathbb Z_2\) representation-parity character:

\[
\chi_{z_L}\in\operatorname{Hom}(Z(SU(2)_L),\{\pm1\})

\]

on each irreducible representation. This is not a nontrivial homomorphism from the connected group \(SU(2)_L\) itself to \(\{\pm1\}\).

This makes it a credible source for the two-primary orientation datum. The exact sign match is established. What remains to prove is that inserting this local system into the color/multiplicity cochain complex actually saturates the index-two selector lattice and produces the primitive seam \(u-d\).

Thus the branch has moved from “find some Pfaffian-like sign” to the testable proposal

\[
\boxed{
\text{the missing first-order sign line is weak-center parity.}
}
\]

## 7. Relation to the weak Weyl lift

The weak Weyl representative of document 886 satisfies

\[
w^2=-I=z_L.
\]

The same central element that appeared there as the square of the amplitude-level reflection now appears here as the sign system of the Furey incidence boundary.

This unifies two previously separate qualifications:

1. the Weyl reflection is order two on weights but order four on doublet amplitudes;
2. the incidence closure differs from the neutral quartet by a sign on precisely the doublet legs.

The central square is therefore not disposable bookkeeping. It may be the first-order orientation datum lost when one passes immediately to quadratic Grams and Laplacians.

## 8. Consequences for the synthesis

The chain now reads

\[
\begin{aligned}
\text{neutral }Spin(10)\text{ quartet}
&\xrightarrow{\text{weak-center local system}}
\text{signed Furey incidence closure},\\
\text{weak Weyl lift }w
&\xrightarrow{w^2}
z_L=-I,\\
\text{quadratic response}
&\xrightarrow{z_L^2=1}
\text{signed }K_3\text{ synchronization Gram}.
\end{aligned}
\]

This does not yet derive the Furey closure dynamically, but it identifies its orientation signs with established Standard Model representation data.

## 9. Stop-everything and falsification criteria

**Local-system trigger:** rebuilding the incidence chain complex with coefficients in \(\chi_{z_L}\) produces the primitive rows \(u-d\) and \(u+u^c\) integrally.

**Index trigger:** the weak-center-twisted boundary removes exactly the Smith index two found in document 874.

**Weyl trigger:** the amplitude-level weak Weyl operator generates the twisted boundary through its central square without an inserted sign convention.

**Higgs trigger:** Higgs dressing turns the twisted neutral quartet into the physical Yukawa/response seam while preserving gauge covariance.

**Negative trigger:** the center character matches the signs but acts trivially on the relevant cochain determinant line; then the match is representational rather than causal.

**Falsifier:** identifying the Furey incidence equation itself with one of the 25 code logical relations.

## 10. Verdict

The minimum-logical route closes negatively, but a more structured bridge opens:

\[
\boxed{
\begin{array}{c}
q(d^c)+q(u)+q(d)+q(u^c)=0,\\[2mm]
(+,-,-,+)=\chi_{-I\in SU(2)_L}.
\end{array}
}
\]

The Furey signed closure uses the support of an exact neutral \(Spin(10)\) quartet with coefficients twisted by weak-center parity. This is the most concrete current candidate for the programme’s missing first-order \(\mathbb Z_2\) orientation datum.

## 11. Dependencies

- [exact Furey/code module intertwiner](888_the_completed_furey_five_mode_module_is_exactly_the_spin10_triorthogonal_weight_system_and_the_punctured_anomaly_is_rank_one.md)
- [weak Weyl reflection and central square](886_the_weak_weyl_reflection_supplies_the_missing_multiplicity_cycle_reversal_before_higgs_vacuum_selection.md)
- [index-two color-Laplacian defect](874_the_c3_color_laplacian_canonically_generates_the_factor_three_selector_but_leaves_an_index_two_orientation_defect.md)
- [first-order orientation boundary](875_the_color_laplacian_factor_three_is_canonical_hodge_data_but_the_selector_equation_and_index_two_saturation_are_additional_physics.md)
- [signed \(K_3\) synchronization](876_the_incidence_selector_is_a_signed_k3_synchronization_laplacian_and_its_factor_three_is_the_sum_of_three_locked_matter_nodes.md)

