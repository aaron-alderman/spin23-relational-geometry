# The Binary Matched-Handle Parity Is the Orientation Line of Two Odd Handle Spin Structures

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B08, B09, B10, B12 and B14  
**Claim status:** exact finite quadratic-refinement and orientation-character result; identification with a physical Pfaffian/determinant line remains open

## 1. Result

The two previously separate binary restrictions of the equal-discriminant-five carrier now fit into one marked-handle construction.

The even genus-two quadratic refinement

\[
q_*(x_1,x_2,y_1,y_2)
=x_1y_1+x_2y_2+x_1+x_2+y_1+y_2
\]

factorizes as

\[
\boxed{
q_*=q_-^{(1)}\oplus q_-^{(2)},
\qquad
q_-(x,y)=xy+x+y.}
\]

Here \(q_-\) is the unique odd quadratic refinement on a genus-one binary symplectic plane. Its three nonzero vectors all have value one, so its full symplectic group

\[
Sp(2,\mathbb F_2)\cong S_3
\]

acts by permuting those three vectors.

Each handle therefore carries a canonical sign character

\[
\epsilon_i:S_3\to\{\pm1\}.
\]

The equal-discriminant-five binary image is exactly

\[
\boxed{
S_3\times_{\mathbb Z_2}S_3
=\ker(\epsilon_1\epsilon_2).}
\]

Thus matched handle parity is the preservation of the product orientation line of the two three-point odd-spin sets.

## 2. The local odd refinement

On one handle let

\[
V_i=\mathbb F_2^2,
\qquad
q_-(x,y)=xy+x+y.
\]

Its values are

| vector | \(q_-\) |
|---|---:|
| \((0,0)\) | 0 |
| \((1,0)\) | 1 |
| \((0,1)\) | 1 |
| \((1,1)\) | 1 |

Hence its zero count is one and its Arf invariant is one. Because \(q_-\) distinguishes only zero from nonzero, every element of \(Sp(2,2)\) preserves it. The group acts faithfully on

\[
\Omega_i=V_i\setminus\{0\},
\qquad |\Omega_i|=3,
\]

giving the usual identification \(Sp(2,2)\cong S(\Omega_i)\cong S_3\).

## 3. The exact orientation line

Form the one-dimensional real orientation line

\[
L_i=\bigwedge^3\mathbb R[\Omega_i].
\]

Permuting \(\Omega_i\) acts on \(L_i\) through \(\epsilon_i=\operatorname{sgn}\). For the two marked handles, define

\[
L=L_1\otimes L_2.
\]

Then \((g_1,g_2)\in S_3\times S_3\) acts on \(L\) by

\[
\epsilon_1(g_1)\epsilon_2(g_2).
\]

Consequently its orientation-preserving subgroup is precisely

\[
\ker(\epsilon_1\epsilon_2)
=\{(g_1,g_2):\operatorname{sgn}g_1=\operatorname{sgn}g_2\},
\]

of order eighteen.

This construction is basis-independent once the decomposition into the two symplectic handle planes is fixed. Reordering the three points changes a generator of each \(L_i\), but not the sign representation or the kernel on \(L_1\otimes L_2\).

## 4. Why equal discriminant five preserves it

The discriminant-five local companion has trace three and reduces modulo two to an order-three element of \(S_3\), hence an even three-cycle. The mutual shear reduces to the same transposition on both handles, hence has signs \((-1,-1)\). Therefore all three generators obey

\[
\epsilon_1\epsilon_2=+1.
\]

They generate all eighteen elements of the kernel.

By contrast, the discriminant-thirty-two trace-six companion reduces to a transposition on its own handle. Inserting such a generator supplies sign pair \((-1,+1)\) or \((+1,-1)\), breaks the product-orientation constraint, and enlarges the image to the full order-thirty-six block product.

The binary distinction between the scalar transfer branches is therefore exact:

| local transfer | mod-two permutation | local orientation sign |
|---|---|---:|
| discriminant five, trace three | three-cycle | \(+1\) |
| discriminant thirty-two, trace six | transposition | \(-1\) |
| mutual shear | one transposition on each handle | product \(+1\) |

## 5. How this combines with the even genus-two characteristic

The orthogonal sum law for Arf invariants gives

\[
\operatorname{Arf}(q_*)
=\operatorname{Arf}(q_-^{(1)})+operatorname{Arf}(q_-^{(2)})
=1+1=0.
\]

So two locally odd spin structures sew to an even genus-two characteristic. The full block product \(S_3\times S_3\) preserves that characteristic, while only the matched subgroup preserves the chosen product orientation line.

This cleanly separates the data:

\[
\boxed{
\begin{aligned}
q_* &: \text{even global quadratic refinement},\\
L_1\otimes L_2 &: \text{oriented sewing of the two local odd refinements}.
\end{aligned}}
\]

The first explains the order-72 ambient stabilizer of the mod-four functional. The second explains the order-18 binary image.

## 6. Exact group-extension summary

The equal-discriminant-five group modulo four fits into

\[
1\to\ker\ell\to G_{(5,5)}(4)\to\ker(\epsilon_1\epsilon_2)\to1,
\]

where

\[
\ell(X)=\operatorname{tr}A+\operatorname{tr}B+\operatorname{tr}C,
\qquad
|\ker\ell|=2^9.
\]

Therefore

\[
|G_{(5,5)}(4)|=2^9\cdot18=9,216.
\]

The two factors now have distinct meanings:

- \(\ker(\epsilon_1\epsilon_2)\) preserves the local odd-spin product orientation;
- \(\ker\ell\) is the allowed infinitesimal lift compatible with the selected even characteristic.

An integral theta-multiplier calculation is still needed to prove that these combine into a canonical metaplectic or determinant-line lift.

## 7. Relation to the Furey sewing

The programme previously derived two completed Furey matter cycles and sewed them into the two handles of the genus-two carrier. That construction selects the handle decomposition required above.

The new finite result asks a sharply defined incidence question:

> Do the orientations of the two Furey cycle-closing chords select an orientation of \(L_1\otimes L_2\), so that only matched local permutations preserve the sewn matter system?

If yes, the matched binary parity would be derived from particle-incidence sewing rather than appended to the arithmetic carrier. This has not yet been calculated.

## 8. Relation to determinant and Pfaffian lines

The line \(L_1\otimes L_2\) is an honest one-dimensional sign representation, so “determinant line” is no longer merely metaphorical at the finite level. It is the determinant of the permutation representation on the two local three-point odd-spin sets.

It is not yet a fermionic Pfaffian line. Establishing that stronger interpretation requires:

1. a family of skew-adjoint fermion operators over the carrier or sewn surface;
2. a Pfaffian line bundle for that family;
3. an explicit comparison of its mod-two holonomy with \(\epsilon_1\epsilon_2\);
4. compatibility of its integral theta multiplier with \(\ell\).

Without these steps, the exact finite orientation line is a candidate shadow of fermion parity, not its physical derivation.

## 9. Relation to the Prakash–Ramya code

The Standard-Model code has its own binary lift: triply-even overlap divisibilities make the transversal qubit phase exact. The present line offers a possible target for a two-logical sewing of that code.

A successful map must reproduce both:

\[
q_-=1\text{ on each handle's three nonzero logical Pauli directions}
\]

and

\[
\epsilon_1\epsilon_2=+1
\]

for the allowed sewn operations. Merely obtaining an even genus-two form is insufficient, because the full block product also preserves it.

## 10. Stop-everything and falsification gates

### Stop-everything outcomes

1. Furey chord orientation canonically orients \(L_1\otimes L_2\) and derives the matched subgroup.
2. A fermionic Pfaffian line has exactly the finite holonomy \(\epsilon_1\epsilon_2\) and infinitesimal mod-four character \(\ell\).
3. The two-logical Standard-Model code sewing produces the same local odd refinements and product orientation.
4. The integral theta multiplier of the transfer group simultaneously recovers both binary layers.

### Falsifiers

- If the Furey sewing permits independent reversal of one local orientation, it does not explain the matched group.
- If a Pfaffian construction gives a different sign character, the physical fermion-parity interpretation fails.
- If the code sewing selects only \(q_*\) but not \(L_1\otimes L_2\), it explains the theta layer but not the discriminant-five binary index.
- If the orientation depends on an arbitrary enumeration of \(\Omega_i\), it is not canonical; only the orientation line and its sign action are invariant.

## 11. Current judgement

The exceptional binary arithmetic now has a coherent two-level structure:

\[
\boxed{
\text{two odd handle refinements}
\xrightarrow{\oplus}
\text{one even genus-two characteristic},
\qquad
\text{matched local signs}
\Longleftrightarrow
\text{product-orientation preservation}.}
\]

This is a genuine determinant-line result at the finite combinatorial level. The remaining frontier is to derive the same line from the Furey matter sewing, the Standard-Model code, or an actual fermionic Pfaffian construction.

## Certificate and companion documents

- [Strengthened binary theta/orientation certificate](scripts/identify_equal_discriminant_five_missing_mod_four_direction.mjs)
- [Even theta characteristic behind the mod-four defect](497_the_equal_discriminant_five_mod_four_defect_selects_an_even_genus_two_theta_characteristic.md)
- [Exact two-adic closure indices](495_the_two_adic_closure_has_index_eighty_for_equal_discriminant_five_and_twenty_otherwise.md)
- [Furey matter-cycle genus-two sewing](479_the_two_furey_matter_cycles_canonically_sew_the_planar_yukawa_ribbon_into_the_genus_two_sp4_carrier.md)
- [Prakash–Ramya integral-cubic comparison](496_the_standard_model_code_supplies_an_integral_cubic_to_prime_shadow_architecture_but_not_yet_the_spin23_map.md)
- [Furey framing obstruction to selecting the product orientation](499_furey_seam_pairing_does_not_orient_the_odd_spin_product_line_and_matched_parity_requires_trace_even_framing.md)
