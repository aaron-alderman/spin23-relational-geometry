# Furey Seam Pairing Does Not Orient the Odd-Spin Product Line, and Matched Parity Requires Trace-Even Framing

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B08, B09, B10, B11, B12 and B14  
**Claim status:** exact obstruction from the established Furey longitude-framing freedom; the missing orientation selector is pinned

## 1. Question

The equal-discriminant-five binary carrier preserves the product orientation line

\[
L_1\otimes L_2
\]

of the two odd handle spin structures. The Furey matter factorization independently selects the two boundary pairings

\[
(u,e),\qquad(d,\nu),
\]

and hence the two genus-two handles.

Does that particle-incidence sewing also orient \(L_1\otimes L_2\), thereby deriving the matched \(S_3\) parity?

The answer from the currently established data is **no**.

## 2. What Furey sewing fixes

The paired boundaries define a meridian Lagrangian plane

\[
A=\operatorname{span}_{\mathbb Z}\{a_1,a_2\}
\subset H_1(\Sigma_{2,1},\mathbb Z).
\]

Choosing closing arcs gives complementary longitudes \(b_1,b_2\). Every other compatible longitude frame is

\[
B'=B+KA,
\qquad
K\in\operatorname{Sym}_2(\mathbb Z).
\]

This full symmetric-shear ambiguity was proved before the binary theta analysis. In particular it contains the independent local twists

\[
b_1\mapsto b_1+k_1a_1,
\qquad
b_2\mapsto b_2+k_2a_2,
\qquad k_1,k_2\in\mathbb Z.
\]

## 3. Local twists act on the odd-spin orientation lines

Reduce one handle modulo two. Its three nonzero vectors are

\[
a_i,\qquad b_i,\qquad a_i+b_i.
\]

The unit twist

\[
T_i:quad b_i\mapsto b_i+a_i
\]

fixes \(a_i\) and swaps \(b_i\leftrightarrow a_i+b_i\). It is therefore a transposition of the three-point odd-spin set and acts by \(-1\) on its orientation line \(L_i\).

For diagonal framing

\[
K=\operatorname{diag}(k_1,k_2),
\]

the action on the product line is

\[
(-1)^{k_1+k_2}.
\]

Consequently

\[
\boxed{
L_1\otimes L_2\text{ is preserved}
\quad\Longleftrightarrow\quad
k_1+k_2=\operatorname{tr}K=0\pmod2.}
\]

## 4. The obstruction

The established Furey framing freedom allows all four diagonal parity classes:

| \((k_1,k_2)\bmod2\) | local signs | product line |
|---|---|---|
| \((0,0)\) | \((+,+)\) | preserved |
| \((0,1)\) | \((+,-)\) | reversed |
| \((1,0)\) | \((-,+)\) | reversed |
| \((1,1)\) | \((-,-)\) | preserved |

Therefore the matter pairing and meridian selection do not eliminate the two product-orientation-reversing frames. This is an exact counterexample to the claim that the current Furey sewing already derives matched handle parity.

The obstruction exists even before considering off-diagonal \(K_{12}\), so no convention concerning mutual shears can remove it.

## 5. Why directed Furey arrows are insufficient

The completed matter TRO supplies directed matrix units, including the cycle-closing arrows \(e^c:C\to E\) and \(\nu^c:D\to E\). These arrows can orient the corresponding graph cycles relative to a chosen spanning tree.

But an orientation of a graph cycle is not an orientation of the three nonzero elements of its mod-two homology plane. The orientation-preserving integral mapping-class group \(SL(2,\mathbb Z)\) reduces surjectively to

\[
SL(2,\mathbb F_2)\cong S_3,
\]

which contains both even and odd permutations of those three elements. Thus surface orientation and arrow orientation alone cannot choose a nonzero section of \(L_i\).

This is the group-theoretic reason the framing counterexample exists.

## 6. What the positive transfer lift does

The selected equal-discriminant-five mutual shear has

\[
K_+=\begin{pmatrix}3&2\\2&3\end{pmatrix}
\equiv I_2\pmod2.
\]

Its two local diagonal twists are both odd, so

\[
\operatorname{tr}K_+=3+3=0\pmod2
\]

and the product orientation is preserved. The positive transfer construction therefore lands inside the desired trace-even sector.

What remains unexplained is why the Furey sewing should select that sector before the positive response matrix is supplied. The arithmetic response and the particle-incidence sewing agree, but the latter does not yet derive the former's parity restriction.

## 7. The pinned missing selector

The residual problem can now be stated exactly:

> Derive \(\operatorname{tr}K=0\pmod2\) for the two local longitude framings from a source structure independent of the already-chosen transfer matrix.

Possible sources remain:

1. a Pfaffian-line orientation correlating the two Furey cycles;
2. a Higgs/Yukawa polar decomposition whose two winding parities agree;
3. a two-logical Standard-Model code surgery with matched transversal phase lifts;
4. a metaplectic theta multiplier whose admissible subgroup has trace-even local framing;
5. a microscopic weak-root/ternary circuit coupling the two chord closures.

Until one is constructed, the dependency is pinned rather than inferred.

## 8. Consequence for the code bridge

The Prakash–Ramya code can only explain the full binary carrier if its two-logical sewing supplies two pieces of data:

\[
q_*=q_-^{(1)}\oplus q_-^{(2)}
\]

and

\[
\operatorname{tr}K=0\pmod2.
\]

Producing the even characteristic without correlating local framing parities would reproduce the order-72 theta stabilizer but not the observed order-18 handle image.

## 9. Stop-everything and falsification gates

### Stop-everything outcomes

1. A source-derived Pfaffian or theta line forces \(k_1+k_2=0\) modulo two.
2. The Furey weak-root circuit produces only simultaneous local twists and forbids a single-handle twist.
3. Code sewing gives equal local phase-lift parities as an anomaly identity.
4. The trace-even condition follows from a basis-independent integral Jordan norm or positivity constraint.

### Falsifiers

- **Current-data falsifier:** the existing \(\operatorname{Sym}_2(\mathbb Z)\) framing ambiguity includes \(\operatorname{diag}(1,0)\), so current Furey incidence alone cannot be claimed to fix the product orientation.
- **Arrow falsifier:** directed graph cycles do not orient the three-point mod-two odd-spin set.
- **Circularity falsifier:** choosing \(K_+\) and then using its trace-even property does not derive \(K_+\) from Furey data.
- **Theta-only falsifier:** preserving \(q_*\) is weaker than preserving \(L_1\otimes L_2\).

## 10. Current judgement

The Furey branch supplies the correct two handles and the positive arithmetic branch supplies the correct correlated orientation. Their remaining mismatch is now one binary equation:

\[
\boxed{\operatorname{tr}K=0\pmod2.}
\]

This is a much narrower and more useful dependency than the previous phrase “absolute seam orientation is missing.” It should remain pinned while the metaplectic, Pfaffian and two-logical-code branches are pursued independently.

## Certificate and companion documents

- [Executable framing-orientation obstruction](scripts/verify_furey_framing_does_not_fix_odd_spin_product_orientation.mjs)
- [Finite odd-spin product orientation line](498_the_binary_matched_handle_parity_is_the_orientation_line_of_two_odd_handle_spin_structures.md)
- [Furey matter-pair genus-two sewing](479_the_two_furey_matter_cycles_canonically_sew_the_planar_yukawa_ribbon_into_the_genus_two_sp4_carrier.md)
- [Furey-selected meridian plane and framing freedom](480_the_sewn_furey_matter_pairs_select_a_lagrangian_plane_and_the_remaining_framing_is_exactly_the_clifford_phase_sector.md)
- [Puncture-to-seam incidence and polarization ambiguity](481_the_puncture_labels_select_the_two_furey_seams_but_not_the_meridian_longitude_polarization.md)
