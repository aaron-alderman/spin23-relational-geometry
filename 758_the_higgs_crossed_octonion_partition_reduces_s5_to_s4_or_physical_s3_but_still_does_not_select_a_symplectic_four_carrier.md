# The Higgs Crossed-Octonion Partition Reduces \(S_5\) to \(S_4\), or Physical \(S_3\), but Still Does Not Select a Symplectic Four-Carrier

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B06, B07, B09, B10, B11, B12, B13, B14 and the Higgs/puncture-symmetry branch  
**Claim status:** exact sixteen-weight stabilizer and alternating-form calculation with executable certificate  
**Certificate:** [verify_higgs_crossed_partition_stabilizer_is_s4_then_physical_s3_and_not_symplectic.mjs](scripts/verify_higgs_crossed_partition_stabilizer_is_s4_then_physical_s3_and_not_symplectic.mjs)

## Executive result

The Higgs-selected crossed-octonion partition of document 715 has a simple exact expression on the five-bit \(SO(10)\) weights:

\[
\boxed{
\mathcal O_{\rm up}:q_4=+1,
\qquad
\mathcal O_{\rm down}:q_4=-1.
}
\]

Here \(q_4\) is the first weak oscillator coordinate in the convention

\[
2T_{3L}=\frac{q_4-q_5}{2},
\qquad
2T_{3R}=\frac{q_4+q_5}{2}.
\]

The subgroup of the puncture stabilizer \(S_5\) that preserves this partition fixes the distinguished coordinate \(q_4\) and permutes the other four:

\[
\boxed{H_{\rm Higgs}\cong S_4.}
\]

If one additionally preserves the physical \(3+2\) division into color and weak oscillator coordinates, the intersection fixes both weak coordinates and permutes only the three color coordinates:

\[
\boxed{H_{\rm physical}\cong S_3.}
\]

Neither group makes the standard four-module symplectic:

\[
(\Lambda^2V_4^*)^{S_4}=0,
\]

while

\[
\dim(\Lambda^2V_4^*)^{S_3}=1
\]

but its sole invariant form has rank two and is degenerate.

Thus the actual Higgs-selected partition does not land in any of the nontrivial symplectic subgroup types found in document 757.

## 1. The channel rule on five-bit weights

The complete generation consists of

\[
q=(q_1,\ldots,q_5)\in\{\pm1\}^5,
\qquad \prod_iq_i=+1.
\]

For conjugate-right states, \(q_4=q_5\) and the sign distinguishes the up/neutral and down/charged Yukawa channels. For left doublet states, \(q_4=-q_5\), and the same \(q_4\) sign distinguishes the upper from lower weak component. Consequently one rule covers all sixteen fields:

\[
\begin{array}{c|c}
q_4=+1&\nu,\nu^c,u,u^c\\
q_4=-1&e,e^c,d,d^c.
\end{array}
\]

The certificate verifies the stabilizer directly on all sixteen even-parity weights rather than relying only on particle labels.

## 2. Full partition stabilizer

A coordinate permutation preserves the sign of \(q_4\) on every even-parity weight exactly when it fixes the fourth coordinate. The remaining four coordinates are freely permuted. Hence

\[
H_{\rm Higgs}=\operatorname{Stab}_{S_5}(4)\cong S_4,
\qquad |H_{\rm Higgs}|=24.
\]

On the sum-zero standard module \(V_4\), the restriction decomposes as the three-dimensional standard module of \(S_4\) plus a trivial line. There is no invariant alternating form.

## 3. Gauge-compatible intersection

The five coordinates already have the physical block division

\[
\{1,2,3\}_{\rm color}
\sqcup
\{4,5\}_{\rm weak}.
\]

Its coordinate stabilizer is \(S_3\times S_2\). Intersecting with the Higgs stabilizer fixes coordinate 4, so the weak transposition is removed and coordinate 5 is fixed as well:

\[
H_{\rm Higgs}\cap(S_3\times S_2)
=S_3.
\]

This \(S_3\) preserves one alternating form on \(V_4\), but the Pfaffian vanishes. Representation-theoretically, the reflection elements of \(S_3\) reverse the area on its nontrivial two-plane; the surviving two-form lies on the two-dimensional trivial multiplicity sector and therefore has a two-dimensional kernel.

So the physical intersection gives a presymplectic plane, not a symplectic four-space.

## 4. Comparison with the exhaustive subgroup list

Document 757 found that only

\[
C_2^{(22)},\qquad C_3,\qquad C_5
\]

among nontrivial subgroup types admit a nondegenerate invariant form on \(V_4\).

The Higgs chain is instead

\[
S_5
\xrightarrow{q_4\text{ channel}}
S_4
\xrightarrow{3+2\text{ physical typing}}
S_3.
\]

Neither endpoint is on the successful list. More breaking is required.

The cyclic rotation subgroup \(C_3\subset S_3\) would work, but selecting it means discarding the color reflections/transpositions. That is an orientation choice, not a consequence of color permutation symmetry alone.

## 5. A newly isolated possibility: oriented color

The alternating subgroup of color permutations is

\[
A_3\cong C_3.
\]

Restricting from \(S_3\) to \(A_3\) removes the reflections that reverse the color-plane area. Document 757 proves that this \(C_3\) admits nondegenerate invariant symplectic forms on the full standard four-module.

This makes an oriented color three-cycle the minimal physically adjacent escape:

\[
S_3\xrightarrow{\text{choose color orientation}}A_3\cong C_3.
\]

But the invariant-form space is still two-dimensional. A color orientation permits a carrier; it does not choose the relative area between the color rotation plane and the complementary fixed plane.

Potential selectors for that ratio include the octonion Fano orientation, the \(SU(3)\) complex structure, or a logical Pauli normalization. These must be calculated rather than named.

## 6. Consequences for the Furey bridge

Furey's octonionic construction contains an oriented multiplication structure and an \(SU(3)\) stabilizer of a selected imaginary unit. The present result identifies the finite datum that might matter: not the full color permutation group \(S_3\), but its orientation-preserving cycle subgroup \(A_3\).

This is a plausible cross-branch interface because octonion multiplication already distinguishes cyclic Fano orientation. It is not yet an intertwiner. The required calculation must show that the Furey/Fano orientation acts on the five oscillator coordinates as the specific color three-cycle and fixes a nondegenerate form with the correct relative normalization.

## 7. Stop-everything and falsification criteria

Stop claiming that the Higgs up/down partition alone supplies \(Sp(4,\mathbb R)\); its stabilizer is \(S_4\) and preserves no two-form.

Stop claiming that ordinary color permutation symmetry repairs the problem; physical \(S_3\) leaves only a degenerate form.

Stop replacing \(S_3\) by \(A_3\) without identifying the physical orientation datum that removes reflections.

Stop after selecting \(C_3\) unless an additional condition fixes a nondegenerate point in its two-dimensional invariant-form family.

## 8. Highest-value continuations

1. Map the octonion Fano cyclic orientation onto the three color oscillator coordinates and test whether it selects \(A_3\).
2. Compute the two invariant \(C_3\) area forms explicitly in field-labelled coordinates.
3. Ask whether the Furey complex structure fixes their relative coefficient.
4. Compare that coefficient with the two-logical Pauli commutator and integral unimodularity.
5. Determine whether discarded color reflections act anti-symplectically, which could preserve a larger signed covariance.

## Reproducibility

    node scripts/verify_higgs_crossed_partition_stabilizer_is_s4_then_physical_s3_and_not_symplectic.mjs

## Companion documents

- [Higgs-selected crossed-octonion modules](715_electroweak_breaking_and_the_higgs_frame_select_two_crossed_octonion_shaped_generation_modules.md)
- [Full-S5 puncture-cubic no-go](756_the_s5_puncture_cubic_lives_on_the_trivial_line_and_cannot_symplectically_pair_the_standard_four_module.md)
- [Exhaustive S5 subgroup symplectic classification](757_only_four_subgroup_types_of_s5_make_the_standard_four_module_symplectic_and_the_color_weak_stabilizer_is_not_one.md)
- [Furey technical algebraic guide](03_furey_technical_algebraic_guide.md)
