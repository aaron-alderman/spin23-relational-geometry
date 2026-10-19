# Pure \(D_5\) Weyl Puncture Motion Has Only Identity or Swap Transport and Cannot Realize the Order-Three Carrier Color Cycle

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B11, B12, B13, B14 and the puncture-motion escape branch  
**Claim status:** exact conjugacy obstruction using the previously exhaustive Weyl groupoid calculation and a new comparison certificate  
**Certificate:** [verify_weyl_puncture_transport_cannot_match_order_three_carrier_unipotent.mjs](../../../verification/verify/verify_weyl_puncture_transport_cannot_match_order_three_carrier_unipotent.mjs)

## Executive result

Document 763 ruled out a color-equivariant identification for the fixed \((\nu^c,e^c)\) code. Allowing punctures to move under the full \(D_5\) Weyl group does not repair the mismatch.

The exhaustive puncture-motion calculation of document 454 proved:

- ordered puncture evaluations have flat identity transport;
- forgetting puncture order adds at most the swap of the two logical coordinates.

On the full logical Pauli phase space over \(\mathbb F_3\), these possibilities are

\[
I_4
\]

and

\[
P_{12}=
\begin{pmatrix}
0&1&0&0\\
1&0&0&0\\
0&0&0&1\\
0&0&1&0
\end{pmatrix}.
\]

Their orders are one and two. The arithmetic carrier color cycle is the nontrivial order-three unipotent

\[
R_{m car}=
\begin{pmatrix}
1&0&0&0\\
0&0&0&2\\
0&0&1&0\\
0&1&0&2
\end{pmatrix}.
\]

Conjugate matrices have the same order. Therefore neither Weyl transport is conjugate to \(R_{\rm car}\) in \(GL(4,3)\), and hence not in \(Sp(4,3)\).

Pure microscopic Weyl puncture motion is now exhausted as a source of the carrier color cycle.

## 1. The earlier exhaustive groupoid result

The \(D_5\) Weyl group has order 1920. Its action on ordered pairs of distinct spinor weights has two orbits, classified by Hamming distance two or four.

For every group element transporting an ordered pair \((a,b)\) to \((ga,gb)\), simultaneous transport of the charge parameter preserves the evaluation pair exactly:

\[
\bigl((ga)\cdot(gt),(gb)\cdot(gt)\bigr)
=
\bigl(a\cdot t,b\cdot t\bigr).
\]

Thus ordered logical \(X\) transport is identity. Its dual logical \(Z\) transport is also identity.

If the boundary is unordered, a closed path may exchange the two punctures. This gives the simultaneous \(X_1\leftrightarrow X_2\), \(Z_1\leftrightarrow Z_2\) swap and nothing more.

## 2. Conjugacy invariants

The three candidate actions have:

| action | order | \(\operatorname{rank}(M-I)\) |
|---|---:|---:|
| ordered Weyl transport | 1 | 0 |
| unordered swap | 2 | 2 |
| carrier color cycle | 3 | 1 |

Both order and the rank of \(M-I\) are conjugacy invariants. The mismatch is therefore basis independent.

No selection among the 51840 symplectic frames can turn identity or swap into the carrier unipotent.

## 3. What microscopic Weyl motion can still do

Weyl puncture motion remains useful for:

- classifying puncture-pair orbits;
- transporting evaluation labels without ambiguity;
- generating an optional face swap;
- identifying the \(3+2\) Standard-Model flag;
- organizing boundary groupoids.

It cannot generate:

- Fourier exchange of logical \(X\) and \(Z\);
- symplectic shears;
- the characteristic-three color unipotent;
- the mutual two-qutrit gate;
- or a large logical \(Sp(4,3)\) subgroup.

## 4. Consequence for alternative puncture pairs

Changing to another ordered pair inside either Weyl orbit does not help. Ordered transport remains identity by the same invariant evaluation calculation. Passing between distance-two and distance-four orbits is impossible by a Weyl operation because they are distinct orbits.

Thus “choose another pair” can change the stabilizer and physical interpretation, but cannot make pure simultaneous Weyl transport into the desired logical unipotent.

## 5. Required non-Weyl ingredient

At least one of the following is necessary:

1. an encoded Clifford transvection;
2. a Fourier or electric/magnetic duality operation;
3. code deformation not induced by simultaneous Weyl action;
4. measurement-based puncture surgery;
5. a genus-two mapping class operation;
6. an emergent response symmetry whose color label is inherited indirectly.

The existing genus-two \(A_2\) branch supplies operations of these types abstractly. What remains is their source-level physical identification.

## 6. Stop-everything and falsification criteria

Stop searching within pure \(D_5\) Weyl puncture transport for the carrier color unipotent; the exhaustive groupoid result and conjugacy invariants rule it out.

Stop calling the unordered puncture swap an order-three color cycle.

Stop changing logical basis to evade the obstruction; matrix order is invariant.

Reopen puncture motion only when the deformation includes a non-Weyl duality, surgery or encoded operation.

## 7. Highest-value continuations

1. Find the minimum-support encoded Clifford realizing \(R_{\rm car}\) on the explicit qutrit code.
2. Test whether a genus-two Dehn twist word reducing to \(R_{\rm car}\) is selected by the sewn Furey ribbon.
3. Compare logical-support strata before and after that operation.
4. Search for a response interpretation in which microscopic color orientation sources, but does not equal, the carrier cycle.
5. Continue the independent plane-exchange/equal-area calculation.

## Reproducibility

    node verification/verify/verify_weyl_puncture_transport_cannot_match_order_three_carrier_unipotent.mjs

## Companion documents

- [Weyl puncture motion has only identity or swap holonomy](../0400-0499/454_weyl_puncture_motion_has_flat_ordered_logical_transport_and_at_most_a_swap_holonomy.md)
- [Fixed-puncture color-equivariance no-go](763_the_physical_color_cycle_acts_trivially_on_two_puncture_code_logicals_but_unipotently_on_the_arithmetic_carrier_so_no_equivariant_identification_exists.md)
- [Full nonlocal logical Clifford lift](../0400-0499/452_the_two_puncture_qutrit_code_has_a_full_nonlocal_clifford_sp4_lift_but_no_source_derived_mixing_yet.md)
- [Genus-two A2 Weil carrier](../0400-0499/478_the_genus_two_a2_weil_representation_is_exactly_the_two_qutrit_clifford_carrier_and_derives_the_cross_gate_from_a_sum_cycle_twist.md)
