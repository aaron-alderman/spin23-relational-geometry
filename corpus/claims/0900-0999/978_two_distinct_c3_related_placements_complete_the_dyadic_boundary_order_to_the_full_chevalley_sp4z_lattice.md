# Two Distinct C3-Related Placements Complete the Dyadic Boundary Order to the Full Chevalley Sp(4,Z) Lattice

**Date:** 18 October 2026  
**Branches:** arithmetic holonomy, placement orbit, dyadic boundary order, integral $C_2$, and relational-carrier completion  
**Claim status:** exact integral Lie-order completion theorem  
**Certificate:** [test_three_placement_completion_of_the_dyadic_common_mode_order.mjs](../../../verification/test/test_three_placement_completion_of_the_dyadic_common_mode_order.mjs)

## Executive result

Let $\mathcal O_0$ be the index-$512$ integral Lie order generated on the selected common-mode placement by

\[
2T_n,\quad2T_t,\quad T_r,\quad L.
\]

Let $A$ be the integral order-three selector cycle on the saturated carrier and define

\[
\mathcal O_k=A^k\mathcal O_0A^{-k},
\qquad k=0,1,2.
\]

Then

\[
[\mathfrak{sp}(4,\mathbb Z):\mathcal O_0]=512,
\]

but

\[
\boxed{
\operatorname{Lie}_{\mathbb Z}\langle\mathcal O_0,\mathcal O_1\rangle
=\mathfrak{sp}(4,\mathbb Z).
}
\]

The third placement changes nothing further:

\[
\operatorname{Lie}_{\mathbb Z}
\langle\mathcal O_0,\mathcal O_1,\mathcal O_2\rangle
=\mathfrak{sp}(4,\mathbb Z).
\]

By $C_3$ conjugacy, any two distinct placements give the same result. Thus the dyadic defect is not a permanent failure of the carrier. It is the arithmetic signature of describing only one placement. The relationship between two placements restores the complete integral algebra.

## 1. Exact census

The certificate computes the bracket-closed Hermite order for successively enlarged generator sets:

| Placements admitted | Mod-two closure dimension | Mod-three closure dimension | Integral index |
|---:|---:|---:|---:|
| 1 | 5 | 10 | 512 |
| 2 | 10 | 10 | 1 |
| 3 | 10 | 10 | 1 |

For two placements, the Hermite diagonal is

\[
(1,1,1,1,1,1,1,1,1,1),
\]

so the generated lattice is exactly the full ten-coordinate Hamiltonian lattice. Pairwise bracket closure of the Hermite basis is checked explicitly.

## 2. Interpretation: relationship completes singular placement

One placement remembers a unique Lagrangian boundary and yields the five-dimensional mod-two extension described in document 977. A second, distinct placement carries a conjugate Lagrangian boundary. Their union has enough transverse information to recover every missing dyadic direction.

This is a precise integral realization of the programme’s relational-carrier principle:

\[
\text{one placement}
\;\Rightarrow\;
\text{proper boundary order},
\qquad
\text{relationship of two placements}
\;\Rightarrow\;
\text{full }\mathfrak{sp}(4,\mathbb Z).
\]

It parallels the earlier real Lie-closure theorem: two diagonal faces alone remain separated until an off-diagonal relationship is admitted. Here one arithmetic face remains parabolic until a conjugate placement is admitted.

## 3. Why the third placement still matters

The third placement is redundant for generating the integral Lie algebra, but not for the programme’s representation theory. The complete ordered triple carries the canonical permutation representation of $S_3$ and decomposes into

\[
\mathbf1\oplus A_2.
\]

Its trace-zero amplitudes are the environment/Galois doublet of document 956. Therefore the roles separate cleanly:

- **two distinct placements:** minimal arithmetic completion of the integral $Spin(2,3)$ carrier;
- **all three placements:** canonical $S_3$ orbit and trace-zero $A_2$ environment.

The number three belongs to the symmetry and environment structure, not to the minimum number of placements required for Lie generation.

## 4. Consequences for the factor two

Documents 975–977 left two possible readings of the doubled face normalization: a permanent congruence restriction or a local chart artifact. The present theorem supports the second.

Each placement separately uses the doubled-face order and retains a dyadic boundary. Moving to a second placement supplies exactly the primitive directions missing from the first. No additional ad hoc generator is required.

This does not yet derive why physical dynamics traverses more than one placement. That burden is transferred to the already established selector $C_3$ holonomy and to the microscopic origin of its action.

## 5. Stop-everything tests

**Arithmetic-holonomy trigger — passed:** two $C_3$-related placement orders generate the complete Chevalley lattice.

**Minimality trigger — passed:** one placement has index $512$, while two have index one; the minimum placement count is exactly two.

**Microscopic traversal trigger:** derive the placement cycle $A$ from the Jordan triple or Furey/Standard-Model action rather than inserting the selector action at the response level.

**Environment compatibility trigger:** show that stochastic or coherent traversal of all three placements produces the established loss-dependent $A_2$ Kraus amplitudes.

**Fixed-placement falsifier:** if dynamics is confined to one placement, the physical integral order remains the proper index-$512$ boundary order and full arithmetic $Sp(4)$ is not realized.

## Verdict

| Question | Verdict |
|---|---|
| Does one placement generate full $\mathfrak{sp}(4,\mathbb Z)$? | **No; index 512** |
| Do two distinct $C_3$-related placements suffice? | **Yes; index one** |
| Are all three needed for Lie generation? | **No** |
| Are all three still needed for the canonical $S_3/A_2$ orbit? | **Yes** |
| Is the dyadic defect permanent? | **No, provided placement traversal is physical** |
| Is microscopic traversal derived? | **Not yet** |

## Position in the corpus

- [three-sublattice arithmetic holonomy](955_the_selector_c3_cycles_three_index_four_sublattices_so_the_common_mode_saturation_quotient_is_not_itself_the_a2_environment.md)
- [trace-zero placement $A_2$ environment](956_the_trace_zero_amplitudes_of_the_three_sublattice_holonomy_are_exactly_the_a2_environment_and_galois_doublet.md)
- [dyadic index-$512$ order](976_the_common_mode_carrier_supports_a_full_rational_sp4_but_its_generated_integral_lie_order_has_dyadic_index_512.md)
- [unique-Lagrangian mod-two image](977_the_dyadic_lie_image_is_a_unique_lagrangian_boundary_extension_of_sl2f2_by_a_two_dimensional_abelian_radical.md)
