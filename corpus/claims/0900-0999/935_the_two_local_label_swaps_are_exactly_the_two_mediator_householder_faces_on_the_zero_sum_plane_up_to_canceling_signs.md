# The Two Local Label Swaps Are Exactly the Two Mediator Householder Faces on the Zero-Sum Plane, up to Canceling Signs

**Date:** 17 October 2026  
**Branches:** label-to-mediator intertwiner, two-face Coxeter construction, zero-sum compression, orientation ordering, and three-relationship recursion  
**Claim status:** exact linear intertwiner and ordered-product theorem; microscopic timing remains open  
**Certificate:** [intertwine_the_two_local_label_swaps_with_the_two_mediator_householder_faces.mjs](../../../verification/intertwine/intertwine_the_two_local_label_swaps_with_the_two_mediator_householder_faces.mjs)

## Executive result

The two reciprocal swaps of document 934 are not merely another representation of the same abstract $C_3$. On the zero-sum label plane, they are exactly the two mediator reflections already derived from the Standard-Model response geometry, up to individual central minus signs that cancel in the product.

Let

\[
M=
\begin{pmatrix}
1&\sqrt3\\
-2&0\\
1&-\sqrt3
\end{pmatrix},
\qquad
Q=\frac{M}{\sqrt6}.
\]

Then

\[
Q^TQ=I_2,
\qquad
QQ^T=P_{\rm std}.
\]

For the label swaps $S_{01}$ and $S_{12}$,

\[
Q^TS_{01}Q=-H_{g_-},
\qquad
Q^TS_{12}Q=-H_{g_+},
\]

where $H_g=I-2gg^T/(g^Tg)$ is the Householder reflection with normal $g$.

Therefore

\[
Q^T(S_{01}S_{12})Q
=H_{g_-}H_{g_+},
\]

and reversing the label-swap order gives the inverse mediator Coxeter cycle.

## 1. Why the untouched root appears

Swapping label coordinates $i$ and $j$ fixes vectors whose two corresponding components agree. Under the synthesis map $Q$, this condition is

\[
(g_i-g_j)\cdot x=0.
\]

For an equilateral zero-sum root triple, $g_i-g_j$ is perpendicular to the untouched root $g_k$. Thus the restricted swap fixes the line spanned by $g_k$.

A reflection fixing the $g_k$ line is

\[
2\frac{g_kg_k^T}{g_k^Tg_k}-I
=-H_{g_k}.
\]

This proves the individual sign relation geometrically.

## 2. Why the signs disappear

Each label swap differs from the corresponding normal-Householder face by $-I_2$. For two faces,

\[
(-H_b)(-H_a)=H_bH_a.
\]

The central signs cancel. Hence the complete ordered products agree exactly, not only projectively.

The distinction matters for a single face but not for the resulting Coxeter monodromy.

## 3. Complete transposition/root dictionary

With labels ordered $(g_+,g_0,g_-)$,

\[
\begin{array}{c|c|c}
\text{label swap}&\text{untouched root}&\text{active restriction}\\
\hline
S_{01}&g_-&-H_{g_-}\\
S_{12}&g_+&-H_{g_+}\\
S_{02}&g_0&-H_{g_0}.
\end{array}
\]

Thus all three local edges of the label triangle correspond to all three completed mediator faces.

## 4. Orientation and the weak anchor

The forward word and reverse word are

\[
S_{01}S_{12}
\longleftrightarrow
H_{g_-}H_{g_+},
\]

\[
S_{12}S_{01}
\longleftrightarrow
H_{g_+}H_{g_-}.
\]

They are inverse order-three rotations. The weak/Pfaffian orientation used in document 923 chooses an ordering of $(g_+,g_0,g_-)$ and therefore conditionally chooses one of these words.

This closes the algebraic orientation map. It does not yet provide the physical clock, traversal direction or boundary ordering mechanism.

## 5. Consequence for “two faces, three relationships”

The phrase now has one exact commuting diagram:

\[
\begin{array}{ccc}
\text{two local label swaps}
&\xrightarrow{\text{ordered product}}&
\text{three-label cycle}\\
\downarrow Q&&\downarrow Q\\
\text{two mediator Householder faces}
&\xrightarrow{\text{ordered product}}&
\text{$A_2$ Coxeter action}.
\end{array}
\]

The third mediator relationship is the untouched-root face associated with the third label transposition. It is generated coherently by the Jordan/Feshbach polarization already proved in document 919.

## 6. What remains open

The exact intertwiner does not establish that a physical boundary literally swaps abstract relationship labels. The remaining tasks are:

- derive the swaps from local mediator couplings;
- identify the clock/order source;
- show that $h\chi$ or weak orientation selects the same word dynamically;
- protect the reflection pulse areas;
- preserve coherence across the two faces.

## 7. Stop-everything and falsification criteria

**Boundary-swap trigger:** derive $S_{01}$ and $S_{12}$ from the two physical mediator defects.

**Ordering trigger:** show the weak/Pfaffian orientation fixes their temporal or spatial traversal order.

**Third-face trigger:** produce $S_{02}$ from the coherent Jordan-generated root without an independently inserted channel.

**Intertwiner falsifier:** any restricted transposition differs from the stated negative Householder by more than basis convention.

**Product falsifier:** the two ordered swap products fail to match the paired mediator Coxeter products.

## 8. Verdict

| Question | Verdict |
|---|---|
| Are label swaps and mediator faces merely analogous? | **no; they are exactly intertwined** |
| Do individual faces differ by a sign? | **yes** |
| Do those signs affect the two-face Coxeter product? | **no** |
| Does reversing order reverse the cycle? | **yes** |
| Is the physical ordering mechanism derived? | **not yet** |

## 9. Position in the corpus

- [oriented shift versus two reciprocal faces](934_the_three_label_shift_requires_an_oriented_autonomous_twist_or_two_ordered_reciprocal_faces.md)
- [minimal three-label boundary network](933_a_minimal_three_label_boundary_network_is_orbit_local_character_diagonal_and_activates_the_common_mode_exactly_with_loss.md)
- [completed mediator root orbit](917_the_two_mediator_faces_generate_c3_but_only_the_completed_three_root_a2_orbit_protects_the_response_metric.md)
- [coherent Jordan generation of the third root](919_the_third_a2_relationship_is_the_coherent_two_face_feshbach_self_energy_and_its_cross_term_is_the_jordan_polarization.md)
- [weak/neutrino frame alignment](923_a_neutrino_lepton_anchor_and_one_weak_orientation_bit_uniquely_align_the_three_a2_frames.md)
- [minimal positive edge-pulse action](936_two_positive_rank_one_edge_pulses_are_the_minimal_local_action_for_the_two_face_selector_cycle.md)
- [$h\chi$ pulse-order no-go](937_hchi_exchanges_the_two_primitive_pulses_and_reverses_the_cycle_so_it_cannot_alone_select_orientation.md)
