# Witt-Design Symmetry Is Not the Same as Signed Golay \(P\)-Code Symmetry

**Date:** 17 October 2026  
**Branches:** B03, B04, B07, B09, B10, B11, B12, B13 and B14  
**Claim status:** corrective exact audit; supersedes any unqualified identification of the degree-eleven \(M_{11}\) action with pure coordinate automorphisms of the signed \(P\)-space

## Executive result

Three symmetry objects must be separated:

1. the Witt \(S(4,5,11)\) support design;
2. the signed ternary Golay dual row space;
3. the Golay \(P\)-space together with its all-one logical vector and nonunit coefficient partition.

The full degree-eleven Mathieu group \(M_{11}\), of order \(7920\), acts by permutations on the \(66\) blocks of the Witt design.

In the fixed cyclic signed realization of the ternary Golay dual used by the certificates, only an order-\(660\) subgroup preserves the row space by bare coordinate permutations. Elements outside it require monomial coordinate signs.

Those signs are not invisible to the \(P\)-code: they move the distinguished all-one logical vector. Therefore the full support-design \(M_{11}\) must not be called the pure permutation automorphism group of the signed Golay \(P\)-space.

For the two nonunit coefficient placements:

| lift | stabilizer in Witt-design \(M_{11}\) | stabilizer by pure signed-code permutations | exact characteristic-zero lattice stabilizer |
|---|---:|---:|---:|
| generic orbit | 2 | 1 | 1 |
| Witt-block orbit | 12 | 2 | 1 |

The genuine nontrivial symmetry of the finite Witt-block \(P\)-space is only \(C_2\). Even that \(C_2\) cannot preserve a characteristic-zero maximal isotropic five-space.

## 1. Where the distinction comes from

The dual ternary Golay code has \(132\) weight-six words but only \(66\) weight-six supports, because \(w\) and \(-w\) have the same support.

The Witt design remembers the supports and forgets the signs. A coordinate permutation can therefore preserve every Witt block while sending a signed codeword to a vector with the same support but a different internal sign pattern.

The standard second Mathieu generator does exactly this:

- it preserves all \(66\) support blocks;
- it does not preserve the displayed five-dimensional signed row space by permutation alone;
- a suitable diagonal sign correction restores a monomial code automorphism.

Support automorphism and signed-code permutation automorphism are consequently different notions.

## 2. Exact group sizes

The certificate reconstructs all \(7920\) degree-eleven Witt-design automorphisms. It then tests each permutation directly against the signed Golay dual by comparing row spaces over \(\mathbb F_3\).

Exactly

\[
\boxed{660}
\]

permutations preserve the signed row space without diagonal signs.

The earlier orbit sizes \(660\) and \(3960\) remain correct as orbits of labelled coefficient partitions under the Witt-design \(M_{11}\). What changes is their interpretation: they are design-level orbits, not automatically orbits under pure \(P\)-code symmetries.

## 3. The two coefficient placements

### Generic placement

The generic coefficient partition has design stabilizer order two, but its intersection with the pure signed-code permutation subgroup is trivial:

\[
|\operatorname{Stab}_{\mathrm{pure}\ P}(\mu_G)|=1.
\]

### Witt-block placement

The Witt-block coefficient partition has design stabilizer

\[
H_{\mathrm{design}}\cong S_3\times C_2
\]

of order twelve. Its pure signed-code permutation stabilizer is only

\[
\boxed{K\cong C_2.}
\]

The nontrivial element has zero-based cycle structure

\[
(0\ 2)(1\ 4)(3\ 6)(9\ 10).
\]

It preserves the signed Golay row space, the all-one vector and every coefficient fibre.

## 4. The actual \(C_2\) still cannot lift

On the ten-dimensional real all-one complement, the \(+1\) and \(-1\) eigenspaces of the genuine signed-code involution have weighted signatures

\[
\operatorname{sig}V_+=(2,4),
\qquad
\operatorname{sig}V_-=(3,1).
\]

Any invariant isotropic subspace splits between these orthogonal eigenspaces. Its maximum dimension is

\[
\min(2,4)+\min(3,1)=3.
\]

Hence no \(K\)-invariant maximal isotropic five-space exists. Every rank-five characteristic-zero lift must break the genuine residual \(C_2\).

Here \(K\) is specifically the residual **pure coordinate-permutation** group. This calculation does not cover signed monomial transformations that shift \(\mathbf1\) by a Golay stabilizer word.

## 5. What survives from the order-twelve calculation

The order-twelve representation calculation remains valid for the full Witt-design coefficient stabilizer:

\[
\dim W_{\mathrm{iso}}^{H_{\mathrm{design}}}\le2.
\]

It is a stronger design-level obstruction. It must not be described as the symmetry group of the signed \(P\)-space.

The pure-permutation hierarchy is

\[
\begin{array}{c}
M_{11}\text{ support-design symmetry}\\
\downarrow\\
660\text{-element pure signed-code permutation subgroup}\\
\downarrow\\
C_2\text{ preserving the Witt-block coefficient partition}\\
\downarrow\\
1\text{ on every characteristic-zero maximal-isotropic lift, within the pure-permutation layer.}
\end{array}
\]

The complete signed-code hierarchy has an additional layer:

\[
M_{11}\times C_2
\quad\text{acts monomially on the finite logical object.}
\]

Some coefficient-preserving monomial elements move \(\mathbf1\) to \(\pm\mathbf1+s\). Their characteristic-zero obstruction is controlled by the weighted norm of that representative displacement, not by the pure-permutation eigenspace calculation above. One such symmetry is now realized explicitly in the generic coefficient orbit.

## 6. Consequence for Leech, Monster and Jordan claims

The support design provides a genuine sporadic combinatorial layer, but the signed \(P\)-code carries extra orientation data, and the integral lift carries still more magnitude and real-polarization data.

Any route from Golay to Leech or Monster must specify whether it preserves block supports, signed codewords, the all-one logical vector, nonunit weights or the characteristic-zero isotropic lattice. They do not share one automatic automorphism group.

For the Jordan programme this is helpful. A relational carrier must account for the successive symmetry reductions rather than claim a single enormous group acts faithfully on every layer.

## 7. Stop-everything and falsification gates

### Stop-everything results achieved

1. Full \(M_{11}\) is verified at the Witt-support-design level.
2. The pure signed-code permutation subgroup has order \(660\).
3. The Witt-block weighted \(P\)-space retains only a pure-permutation \(C_2\).
4. Every characteristic-zero maximal-isotropic lift must break that pure-permutation \(C_2\).
5. These results do not exclude shifted-representative signed monomial symmetries.

### Next stop-everything tests

1. Determine the monomial automorphism group preserving the \(P\)-logical line rather than fixing \(\mathbf1\) pointwise.
2. Describe the orbit of characteristic-zero lifts under the order-\(660\) signed-code subgroup.
3. Test whether the broken directions match a Jordan-carrier tangent representation.

### Falsification boundaries

- \(M_{11}\) remains the Witt-design automorphism group.
- The correction does not alter either explicit integral \(P\)-lattice or doubled \([[37,1,5]]_3\) code.
- Design symmetry, monomial code symmetry and \(P\)-logical symmetry are not interchangeable.
- Symmetry loss alone is not a Goldstone dynamics.

## 8. Certificates

- [Mathieu design and signed-code subgroup audit](scripts/classify_nonunit_weight_partition_under_m11.mjs)
- [Design-stabilizer and genuine \(C_2\) isotropic bounds](scripts/prove_witt_block_stabilizer_cannot_fix_a_maximal_rational_isotropic_lift.mjs)

## Companion documents

- [Full Witt-design stabilizer no-go](593_the_witt_block_stabilizer_cannot_survive_any_characteristic_zero_maximal_isotropic_lift.md)
- [Witt-block integral lift](592_the_witt_block_nonunit_golay_orbit_also_lifts_but_the_integral_frame_breaks_its_symmetry.md)
- [Mathieu design orbit classification](591_the_explicit_nonunit_golay_weights_lie_in_the_generic_m11_orbit.md)
- [Grand synthesis](40_grand_synthesis_spin23_pole.md)
