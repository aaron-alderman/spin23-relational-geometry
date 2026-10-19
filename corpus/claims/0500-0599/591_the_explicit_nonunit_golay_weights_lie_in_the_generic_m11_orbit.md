# The Explicit Nonunit Golay Weights Lie in the Generic Witt-Design \(M_{11}\) Orbit

**Date:** 17 October 2026  
**Branches:** B03, B04, B07, B09, B10, B11, B12, B13 and B14  
**Claim status:** exact finite group-action classification

## Executive result

The coefficient multiset

\[
(2^6,-4^2,-1^3)
\]

defines a \(6+2+3\) labelled partition of the eleven Golay coordinates. Relative to the Witt support design of the standard ternary Golay dual, there are exactly two such partition orbits under the design automorphism group

\[
\operatorname{Aut}(S(4,5,11))\cong M_{11}.
\]

Their sizes are

\[
\boxed{660\quad\text{and}\quad3960.}
\]

The explicit coefficient placement used in the integral lift lies in the orbit of size \(3960\). Its stabilizer inside the Witt-design \(M_{11}\) has order two, but its stabilizer inside the pure signed-code permutation subgroup is trivial.

Therefore the found placement is not selected by unusually large Golay symmetry. It belongs to the generic orbit containing \(3960\) of all

\[
\binom{11}{6}\binom52=4620
\]

labelled \(6+2+3\) partitions.

## 1. Reconstructing the Witt design

The ternary Golay dual has parameters \([11,5,6]_3\). Its \(132\) weight-six words occur in opposite pairs and give \(66\) distinct supports.

Taking complements produces \(66\) five-subsets. Exact enumeration verifies that every four-subset of the eleven coordinates occurs in exactly one of them:

\[
\boxed{S(4,5,11).}
\]

This is the small Witt design.

The two standard degree-eleven permutation generators preserve all \(66\) blocks and generate \(7920\) permutations. This is the sharply four-transitive Mathieu group \(M_{11}\).

## 2. Complete orbit classification

A coefficient placement consists of:

- six coordinates labelled \(+2\);
- two coordinates labelled \(-4\);
- three coordinates labelled \(-1\).

All \(4620\) placements were enumerated and partitioned into \(M_{11}\)-orbits. There are exactly two.

| orbit | size | stabilizer order | invariant |
|---:|---:|---:|---|
| distinguished | 660 | 12 | the five negative coordinates form a Witt block |
| generic | 3960 | 2 | the five negative coordinates do not form a Witt block |

The count of the distinguished orbit is transparent:

\[
66\binom52=660.
\]

Choose one of the \(66\) Witt blocks as the five negative coordinates, then choose which two of its five points carry the heavier coefficient \(-4\). The remaining three carry \(-1\).

Every other placement belongs to the single generic orbit.

## 3. Classification of the explicit lift

For the explicit coefficient vector

\[
\mu=(2,2,2,2,2,2,-4,-4,-1,-1,-1),
\]

the five negative coordinates are

\[
\{7,8,9,10,11\}
\]

in one-based notation. This set is not a Witt block of the standard Golay design. Hence the pair consisting of the standard Golay dual and the displayed coefficient placement lies in the generic orbit.

Its orbit and stabilizer are

\[
\boxed{|M_{11}\cdot\mu|=3960,\qquad |\operatorname{Stab}_{M_{11}}(\mu)|=2.}
\]

## 4. Interpretation

The result is both negative and useful.

### Negative

Golay symmetry alone does not canonically select the explicit placement. A two-element residual stabilizer is too small to support a claim that the weight partition was forced by the Mathieu structure.

### Useful

There is a uniquely more symmetric orbit. It is characterized without coordinates: the negative support must be a block of the Witt \(S(4,5,11)\) design.

This gives the next exact comparison:

1. construct an integral Golay lift in the \(660\)-element Witt-block orbit;
2. compare its generator height, rational distance, automorphism stabilizer and doubled lattice with the generic-orbit lift;
3. test whether an exceptional, octonionic or Jordan input prefers the block orbit.

If the more symmetric orbit fails integrally while the generic orbit survives, arithmetic breaks the finite Golay preference. If it survives with lower height or a larger exact stabilizer, it becomes the better canonical candidate.

## 5. Relation to the Monster/Leech intuition

This calculation supplies a disciplined intermediate layer between Golay and larger sporadic structures. Before invoking the Leech lattice or Monster group, the eleven-coordinate object already has a precise sporadic symmetry, \(M_{11}\), and a precise design, \(S(4,5,11)\).

The explicit lift does not currently sit in the distinguished design orbit. Therefore the mere appearance of Golay data does not yet provide a canonical road to Mathieu, Leech or Monster selection. The correct question is now narrower:

> Does the integral lifting problem select the Witt-block orbit, or does it force the generic orbit and thereby break most of \(M_{11}\)?

That question is finite and falsifiable.

## 6. Stop-everything and falsification gates

### Stop-everything result achieved

All \(6+2+3\) weight placements have been classified into exactly two \(M_{11}\)-orbits.

### Next stop-everything test — existence achieved and symmetry hierarchy corrected

An explicit integral Golay lift exists in the \(660\)-element Witt-block orbit. The full order-twelve stabilizer is a design symmetry; its pure-permutation signed-\(P\)-space residual is only \(C_2\), which every characteristic-zero maximal-isotropic lift must break. The full monomial signed-code group is larger and contains shifted-representative symmetries requiring a separate audit. See [Witt-design symmetry is not the same as signed Golay \(P\)-code symmetry](594_witt_design_symmetry_is_not_the_same_as_signed_golay_p_code_symmetry.md) and [The signed Golay logical line has full monomial symmetry \(M_{11}\times C_2\)](596_the_signed_golay_logical_line_has_full_monomial_symmetry_m11_times_c2.md).

### Falsification boundaries

- The current explicit lift is not Mathieu-canonical.
- A Witt-block placement is more symmetric but has not yet been lifted explicitly.
- \(M_{11}\) symmetry does not imply Leech or Monster symmetry.
- Orbit size is a selection diagnostic, not a physical law.

## 7. Certificate

The [Mathieu orbit certificate](../../../verification/classify/classify_nonunit_weight_partition_under_m11.mjs) reconstructs the Witt design from the Golay dual, generates all \(7920\) elements of \(M_{11}\), enumerates all \(4620\) labelled partitions and computes the two exact orbits.

## Companion documents

- [Explicit nonunit integral Golay lift](590_an_explicit_nonunit_integral_ternary_golay_lift_and_length_37_qutrit_doubling.md)
- [Golay residue and signature gate](589_the_ternary_golay_p_space_survives_in_a_nonunit_residue_class_but_real_signature_raises_the_first_lift.md)
- [Octonions, Leech lattice and exceptional-Jordan branch](../0000-0099/33_octonions_leech_lattice_jordan_branch.md)
- [Grand synthesis](../0000-0099/40_grand_synthesis_spin23_pole.md)
