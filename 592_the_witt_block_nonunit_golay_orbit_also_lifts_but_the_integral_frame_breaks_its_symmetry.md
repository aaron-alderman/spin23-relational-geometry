# The Witt-Block Nonunit Golay Orbit Also Lifts, but the Integral Frame Breaks Its Symmetry

**Date:** 17 October 2026  
**Branches:** B03, B04, B07, B09, B10, B11, B12, B13 and B14  
**Claim status:** explicit constructive theorem and exact stabilizer audit

## Executive result

The more symmetric \(660\)-element Mathieu orbit also admits an exact integral distance-five Golay lift.

Take

\[
\mu_W=(2,2,2,2,2,-4,2,-4,-1,-1,-1).
\]

Its five negative positions form a Witt block of \(S(4,5,11)\). An explicit generator is

\[
\boxed{
G_W=
\begin{pmatrix}
1&3&4&2&0&2&2&1&4&4&4\\
-9&-9&0&-2&1&-9&-3&-1&-4&-2&2\\
10&10&9&7&9&8&1&10&8&10&2\\
11&-5&9&-7&0&1&4&3&20&-12&0\\
14&-2&7&9&-1&8&7&6&8&-10&14
\end{pmatrix}.}
\]

It satisfies

\[
\boxed{
G_W\mu_W=0,\qquad
G_W\operatorname{diag}(\mu_W)G_W^T=0,\qquad
d_{\mathbb Q}=d_3=5.}
\]

Its mod-three row space is the standard ternary Golay dual. Doubling with the fifteen-coordinate Standard-Model seed again gives a verified weighted integral

\[
\boxed{[[37,1,5]]_3.}
\]

However, the greater support-design symmetry of the coefficient placement does not survive in this exact integral frame. The coefficient partition has stabilizer order twelve in the Witt-design \(M_{11}\), but only an order-two subgroup also preserves the signed Golay \(P\)-space by bare coordinate permutations. The rational row space of \(G_W\) has trivial stabilizer.

## 1. Moving to the distinguished orbit

The generic lift used

\[
\mu_G=(2,2,2,2,2,2,-4,-4,-1,-1,-1).
\]

Swapping its sixth and seventh coordinates gives \(\mu_W\). Relative to the fixed standard Golay dual, this changes the orbit of the coefficient partition:

- \(\mu_G\) lies in the \(3960\)-element generic orbit;
- \(\mu_W\) lies in the \(660\)-element Witt-block orbit.

The five negative positions of \(\mu_W\) are

\[
\{6,8,9,10,11\}
\]

in one-based notation. The orbit certificate verifies that this is a block of the small Witt design.

## 2. The orthogonal-family switch

Permuting the earlier rational hyperbolic frame produces a split frame for \(\mu_W\), but the standard Golay dual belongs to the opposite family of maximal isotropic spaces relative to that starting polarization.

This is not an obstruction. Exchange one hyperbolic pair

\[
E_1\longleftrightarrow F_1.
\]

The family switch changes the parity of intersection with the reference Lagrangian. After it, a finite skew complement makes the Golay dual transverse, and the same exact skew-graph construction applies.

This step makes the two-family structure found in the global qutrit classification operational: the family label determines which hyperbolic chart can represent the target as a skew graph.

## 3. Exact lift and distance

The constructor verifies:

\[
\sum_\ell(\mu_W)_\ell(G_W)_{i\ell}=0
\]

for every row and

\[
\sum_\ell(\mu_W)_\ell(G_W)_{i\ell}(G_W)_{j\ell}=0
\]

for every row pair.

The row rank is five. Direct support enumeration over \(\mathbb Q\) finds no logical relation of weight at most four and does find one of weight five. Reduction modulo three is row-equivalent to the Golay dual, so the qutrit distance is also five.

## 4. Full doubling audit

With

\[
N=1,\qquad \kappa=1,\qquad\lambda_T=-1,
\]

the compatibility equation again vanishes. The length-37 certificate substitutes \((G_W,\mu_W)\) into the complete doubled matrix, checks all \(1331\) ordered cubic row triples and exhausts logical supports through weight five.

The result is again

\[
[[37,1,5]]_3.
\]

Thus both Mathieu coefficient orbits support the arithmetic construction.

## 5. Symmetry comparison

| quantity | generic-orbit lift | Witt-block-orbit lift |
|---|---:|---:|
| coefficient orbit size | 3960 | 660 |
| coefficient stabilizer in Witt-design \(M_{11}\) | 2 | 12 |
| coefficient stabilizer in pure signed-code permutations | 1 | 2 |
| displayed generator height | 18 | 20 |
| exact row-space stabilizer inside coefficient stabilizer | 1 | 1 |
| rational \(P\)-distance | 5 | 5 |
| qutrit \(P\)-distance | 5 | 5 |
| doubled qutrit parameters | \([[37,1,5]]_3\) | \([[37,1,5]]_3\) |

The coefficient orbit is genuinely more symmetric at the support-design level, but the signed \(P\)-space retains only \(C_2\), and the displayed integral lift does not preserve it. The generic lift is slightly smaller by the crude generator-height measure.

Generator height is basis-dependent, so the \(18\) versus \(20\) comparison is diagnostic rather than canonical. The stabilizer statement is basis-independent because it compares rational row spaces.

## 6. Revised selection question

Arithmetic existence does not select between the two Witt-design \(M_{11}\)-orbits: both lift and both double successfully.

The next question is stronger:

> Can the genuine residual \(C_2\) of the signed Witt-block \(P\)-space survive a characteristic-zero maximal-isotropic lift?

The answer is no: its eigenspace signatures bound invariant isotropy by dimension three. See [Witt-design symmetry is not the same as signed Golay \(P\)-code symmetry](594_witt_design_symmetry_is_not_the_same_as_signed_golay_p_code_symmetry.md).

## 7. Stop-everything and falsification gates

### Stop-everything result achieved

The distinguished Witt-block coefficient orbit admits an explicit exact integral distance-five lift and full \([[37,1,5]]_3\) doubling.

### Next stop-everything test — genuine residual symmetry now ruled out

The order-twelve design stabilizer cannot preserve any characteristic-zero maximal-isotropic five-space, and neither can the genuine order-two signed-code stabilizer. See [Witt-design symmetry is not the same as signed Golay \(P\)-code symmetry](594_witt_design_symmetry_is_not_the_same_as_signed_golay_p_code_symmetry.md).

### Falsification boundaries

- Greater coefficient symmetry does not imply greater lattice symmetry.
- The displayed Witt-block lift has trivial exact Mathieu stabilizer.
- Both current constructions still use nonunit coefficients.
- Neither orbit is yet physically selected.

## 8. Certificates

- [Exact lift constructor in Witt-block mode](scripts/construct_exact_nonunit_golay_lift.py)
- [Full doubled audit in Witt-block mode](scripts/verify_explicit_length37_nonunit_golay_doubling.mjs)
- [Mathieu orbit and exact row-space stabilizer audit](scripts/classify_nonunit_weight_partition_under_m11.mjs)

Run the first two with the argument **--witt-block**.

## Companion documents

- [Mathieu orbit classification](591_the_explicit_nonunit_golay_weights_lie_in_the_generic_m11_orbit.md)
- [Generic-orbit integral Golay lift](590_an_explicit_nonunit_integral_ternary_golay_lift_and_length_37_qutrit_doubling.md)
- [Golay residue and signature gate](589_the_ternary_golay_p_space_survives_in_a_nonunit_residue_class_but_real_signature_raises_the_first_lift.md)
- [Grand synthesis](40_grand_synthesis_spin23_pole.md)
