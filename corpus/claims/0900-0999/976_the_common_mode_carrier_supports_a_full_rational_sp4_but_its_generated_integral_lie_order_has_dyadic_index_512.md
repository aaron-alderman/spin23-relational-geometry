# The Common-Mode Carrier Supports Full Rational Sp(4), but Its Generated Integral Lie Order Has Dyadic Index 512

**Date:** 18 October 2026  
**Branches:** integral Lie order, common-mode saturation, split $C_2$, dyadic congruence, and face normalization  
**Claim status:** exact arithmetic theorem  
**Certificate:** [compute_the_integral_order_of_the_doubled_face_common_mode_carrier.mjs](../../../verification/compute/compute_the_integral_order_of_the_doubled_face_common_mode_carrier.mjs)

## Executive result

Document 975 found the unique index-four carrier preserved by the minimally normalized generators

\[
2T_n,\quad 2T_t,\quad T_r,\quad L.
\]

That result does **not** mean these generators produce the full split $C_2$ Chevalley lattice integrally. In a unimodular basis of the selected carrier, followed by a unimodular reduction of its alternating form to the standard symplectic form, their iterated integral brackets generate a Lie order

\[
\mathcal O\subset\mathfrak{sp}(4,\mathbb Z)
\]

with exact index

\[
\boxed{[\mathfrak{sp}(4,\mathbb Z):\mathcal O]=512=2^9.}
\]

Over the rationals and reals there is no loss:

\[
\mathcal O\otimes\mathbb Q=\mathfrak{sp}(4,\mathbb Q),
\qquad
\mathcal O\otimes\mathbb R=\mathfrak{sp}(4,\mathbb R).
\]

The defect is purely dyadic. The generated closure has dimensions

\[
\dim_{\mathbb F_2}\overline{\mathcal O}=5,
\qquad
\dim_{\mathbb F_3}\overline{\mathcal O}=10,
\qquad
\dim_{\mathbb F_5}\overline{\mathcal O}=10.
\]

Thus the factor-two repair selects a unique carrier but produces a proper congruence-type integral order, not the full Chevalley order.

## 1. Primitive symplectic carrier

In the saturated common-mode basis, the alternating form is

\[
J_P=
\begin{pmatrix}
0&0&1&1\\
0&0&1&0\\
-1&-1&0&0\\
-1&0&0&0
\end{pmatrix}.
\]

It is integral and unimodular. A further unimodular basis change sends it to

\[
J_0=
\begin{pmatrix}
0&I_2\\
-I_2&0
\end{pmatrix}.
\]

Consequently the ambient integral Lie algebra has the canonical ten-coordinate description

\[
X=
\begin{pmatrix}
a&b\\
c&-a^T
\end{pmatrix},
\qquad b=b^T,\quad c=c^T,
\]

with all ten coordinates integral. This removes any basis ambiguity from the index calculation.

## 2. Exact Lie-order computation

The certificate performs four independent checks:

1. every seed is Hamiltonian for $J_P$;
2. the carrier and standard-form changes are unimodular;
3. left-normed commutators span rank ten over $\mathbb Q$;
4. row Hermite reduction gives diagonal pivots

\[
(1,2,1,4,4,1,1,2,2,4),
\]

whose product is

\[
1\cdot2\cdot1\cdot4\cdot4\cdot1\cdot1\cdot2\cdot2\cdot4
=512.
\]

The ten Hermite generators are then checked pairwise under commutator. Their lattice is bracket closed and contains the original seeds, so it is the complete generated integral Lie order, not merely a finite-depth approximation.

## 3. Why this is not ordinary root normalization

The optimistic branch after document 975 was that doubling the face translations might simply convert weights to coroots in the standard split $C_2=B_2$ integral form. The index $2^9$ rules out that naive identification.

A conventional change of Chevalley basis is unimodular and has index one. Here five independent directions disappear already modulo two, and higher powers of two remain in four Hermite pivots. Therefore the arithmetic remembers more than long-versus-short root length.

The live possibilities are now narrower:

1. **Parahoric/congruence branch:** the physical boundary naturally selects a dyadic order inside split $C_2$.
2. **Missing-generator branch:** additional primitive Furey/Jordan operations enlarge $\mathcal O$ to the full Chevalley lattice without changing the real algebra.
3. **Two-carrier branch:** the common-mode lattice is only one chart of an arithmetic groupoid; adjoining its conjugate placements fills the missing dyadic directions.
4. **Normalization falsifier:** the doubled-face set is only an effective response order and must not be identified with fundamental integral charges.

## 4. Stop-everything tests

**Full-order trigger:** a physically typed integral generator outside $\mathcal O$ reduces the index, and a finite required set lowers it to one.

**Placement-completion trigger:** adjoining the three $C_3$-cycled saturation placements closes exactly to $\mathfrak{sp}(4,\mathbb Z)$. This would identify arithmetic holonomy as the missing completion mechanism.

**Parahoric trigger:** the mod-two five-dimensional image is identified as a canonical stabilizer of boundary, Lagrangian, or quadratic data. Then the index-$2^9$ order becomes structure rather than defect.

**Chevalley falsifier:** any statement that the four normalized seeds already generate full $\mathfrak{sp}(4,\mathbb Z)$ is false; they do so only after tensoring with $\mathbb Q$ or $\mathbb R$.

## Verdict

| Question | Verdict |
|---|---|
| Does the normalized set preserve a unique saturated carrier? | **Yes** |
| Is its rational Lie closure all of $\mathfrak{sp}(4,\mathbb Q)$? | **Yes** |
| Is its integral Lie order the full Chevalley lattice? | **No** |
| What is the exact index? | **$512=2^9$** |
| Is the defect visible at odd primes 3 and 5? | **No** |
| What remains at prime 2? | **A five-dimensional reduction inside the ten-dimensional ambient algebra** |

## Position in the corpus

- [index-four saturation census](953_an_index_four_saturation_turns_the_realified_twist_into_the_primitive_selector_handle_but_fifteen_symplectic_saturations_compete.md)
- [primitive obstruction and doubled-face uniqueness](975_primitive_face_integrality_obstructs_every_index_four_saturation_but_doubled_faces_uniquely_select_the_common_mode_carrier.md)
- [three-placement arithmetic holonomy](955_the_selector_c3_cycles_three_index_four_sublattices_so_the_common_mode_saturation_quotient_is_not_itself_the_a2_environment.md)
- [full real selector-basis closure](974_the_transported_selector_generators_close_to_sp4_but_their_single_half_integral_residue_does_not_explain_the_index_four_carrier_saturation.md)
