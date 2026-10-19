# The Full Witt-Block Design Stabilizer Cannot Survive Any Characteristic-Zero Maximal-Isotropic Lift

**Date:** 17 October 2026  
**Branches:** B03, B04, B07, B09, B10, B11, B12, B13 and B14  
**Claim status:** exact representation-theoretic no-go

## Executive result

Let \(H\) be the stabilizer in the Witt-design \(M_{11}\) of a distinguished Witt-block coefficient placement

\[
\mu_W=(2,2,2,2,2,-4,2,-4,-1,-1,-1).
\]

Then

\[
\boxed{H\cong S_3\times C_2,\qquad |H|=12.}
\]

It acts orthogonally on the ten-dimensional all-one complement

\[
V=\mathbf1^\perp\subset\mathbb Q^{11},
\qquad
\operatorname{sig}(V)=(5,5).
\]

The maximum dimension of an \(H\)-invariant totally isotropic real subspace of \(V\) is

\[
\boxed{2.}
\]

Therefore:

\[
\boxed{
\text{no }H\text{-invariant maximal isotropic five-space exists over }
\mathbb R,\ \mathbb Q,\text{ or }\mathbb Z.}
\]

Every characteristic-zero rank-five lift must break this full order-twelve design stabilizer. The signed Golay \(P\)-space itself retains only a pure-permutation \(C_2\); a separate eigenspace calculation also rules out preserving that genuine residual symmetry.

## 1. The stabilizer group

The eleven coordinates split into the three coefficient fibres

\[
6+2+3.
\]

Exact enumeration inside the degree-eleven Mathieu group gives a stabilizer of order twelve. Its element-order distribution is

| order | 1 | 2 | 3 | 6 |
|---:|---:|---:|---:|---:|
| elements | 1 | 7 | 2 | 2 |

The action on the three \(-1\) coordinates is the natural \(S_3\) action. The independent action on the two \(-4\) coordinates supplies \(C_2\). The combined map is faithful, proving

\[
H\cong S_3\times C_2.
\]

Its coordinate orbits have sizes \(6,2,3\), exactly the coefficient multiplicities.

## 2. Rational permutation representation

Write the irreducible representations as an \(S_3\) type—trivial, sign or standard—tensored with a \(C_2\) sign \(+\) or \(-\).

The eleven-dimensional coordinate permutation representation decomposes over \(\mathbb Q\) as

\[
\mathbb Q^{11}
\cong
3\,\mathbf1_+
\oplus \mathbf1_-
\oplus \operatorname{sgn}_-
\oplus 2\,\operatorname{std}_+
\oplus \operatorname{std}_-.
\]

The \(\operatorname{sgn}_+\) representation is absent. The dimensions are

\[
3+1+1+4+2=11.
\]

The certificate obtains this decomposition from exact character inner products and constructs every central isotypic projector directly from the twelve permutation matrices.

## 3. Removing the all-one direction

The invariant subspace \(3\,\mathbf1_+\) consists of vectors constant on each of the three coefficient orbits. The weighted form on those orbit constants is

\[
\operatorname{diag}(12,-8,-3).
\]

The all-one vector has norm

\[
12-8-3=1.
\]

Removing it leaves a two-dimensional negative-definite trivial isotypic component. It contains no nonzero isotropic vector.

Every nontrivial isotypic component is automatically orthogonal to the all-one vector. Thus the complete decomposition of \(V\) can be audited component by component.

## 4. Isotypic signature table

The weighted form has the following signatures:

| \(H\)-type | dimension in \(V\) | signature | maximum invariant isotropic contribution |
|---|---:|---:|---:|
| \(\mathbf1_+\) | 2 | \((0,2)\) | 0 |
| \(\mathbf1_-\) | 1 | \((0,1)\) | 0 |
| \(\operatorname{sgn}_+\) | 0 | \((0,0)\) | 0 |
| \(\operatorname{sgn}_-\) | 1 | \((1,0)\) | 0 |
| \(\operatorname{std}_+\) | 4 | \((2,2)\) | 2 |
| \(\operatorname{std}_-\) | 2 | \((2,0)\) | 0 |

Only \(2\,\operatorname{std}_+\) is indefinite. It has the form

\[
\operatorname{std}\otimes M,
\]

where the two-dimensional multiplicity form \(M\) has signature \((1,1)\). An invariant isotropic multiplicity line therefore contributes one copy of the two-dimensional standard representation.

No other isotypic component contributes anything. Hence

\[
\boxed{\dim W\le2}
\]

for every \(H\)-invariant totally isotropic \(W\subset V\).

## 5. Why this settles every exact lift

An integral \(P\)-lattice of rank five spans a rational maximal isotropic subspace. Its real scalar extension remains five-dimensional and totally isotropic.

If the integral or rational lattice preserved \(H\), its real span would be an \(H\)-invariant five-dimensional isotropic subspace. The representation-theoretic bound rules this out.

The obstruction is therefore Archimedean and representation-theoretic. It is stronger than:

- failure of one skew-graph chart;
- failure of one integer basis;
- excessive generator height;
- an unlucky congruence lift.

No alternative characteristic-zero construction can preserve the full \(H\).

## 6. Signed-code correction

The full \(H\) preserves the Witt support design, but not every element preserves the signed Golay row space by bare permutation. The pure signed-code subgroup has order \(660\), and its stabilizer of the Witt-block coefficient partition is only \(C_2\).

For the nontrivial signed-code involution the \(+1\) and \(-1\) eigenspaces have signatures

\[
(2,4)\qquad\text{and}\qquad(3,1).
\]

Its maximum invariant isotropic dimension is therefore

\[
\min(2,4)+\min(3,1)=3<5.
\]

So the genuine residual \(C_2\) must also break. The order-twelve calculation is a stronger design-level no-go, not an unqualified signed-code automorphism statement.

## 7. Consequence for Golay and Mathieu symmetry

The finite qutrit Golay support design preserves the order-twelve coefficient stabilizer. The chosen signed \(P\)-space preserves only its pure-permutation \(C_2\), and every characteristic-zero maximal-isotropic lift breaks even that subgroup. This is a precise layered example of symmetry loss under arithmetic lifting:

\[
\text{finite Golay symmetry}
\longrightarrow
\text{weighted characteristic-zero polarization}
\longrightarrow
\text{unavoidable stabilizer breaking}.
\]

This does not alter \(M_{11}\) as the automorphism group of the Witt support design or its monomial relation to the ternary Golay code. It says that support-design symmetry, signed \(P\)-logical symmetry and symmetry of a characteristic-zero lift are different layers; the extra integral magnitude and polarization data cannot retain the selected partition's nontrivial pure signed-code stabilizer.

The two explicit lattices were not insufficiently clever. Their trivial exact stabilizers are consistent with a theorem that the full order-twelve group is impossible.

## 8. Relation to the wider programme

The result supplies a concrete version of “splitting of symmetry,” one of the programme's recurring intuitions. Here the splitting is not metaphorical:

- the finite support design admits Mathieu symmetry, while the signed \(P\)-logical structure retains a smaller subgroup;
- selecting real signed magnitudes defines a \((5,5)\) polarization;
- maximal isotropy forces the selected state outside the fixed locus of the coefficient stabilizer.

This is structurally compatible with an order-parameter or Goldstone narrative, but it is not yet a dynamical spontaneous-symmetry-breaking theory. No potential, vacuum measure or Goldstone spectrum has been derived.

For the Jordan/Spin programme, the next useful question is whether the broken orbit of maximal isotropic lifts has a natural homogeneous-space description and whether its tangent representation matches any existing carrier mode. That is a better-defined bridge than identifying \(M_{11}\), the Leech lattice and \(Spin(2,3)\) by association alone.

## 9. Stop-everything and falsification gates

### Stop-everything result achieved

Full order-twelve Witt-design stabilizer symmetry and the genuine residual pure-permutation signed-code \(C_2\) are both impossible for every characteristic-zero rank-five lift.

This statement does not cover signed monomial elements that shift the all-one logical representative by a stabilizer word. That larger branch is analyzed separately in [The signed Golay logical line has full monomial symmetry \(M_{11}\times C_2\)](596_the_signed_golay_logical_line_has_full_monomial_symmetry_m11_times_c2.md).

### Next stop-everything tests

1. Classify the largest proper subgroups of \(H\) that can preserve a maximal isotropic lift.
2. Identify the homogeneous orbit and tangent representation of the symmetry-broken lifts.
3. Test whether the surviving subgroup or tangent modes match a Jordan-carrier or Furey conjugation datum.

### Falsification boundaries

- The no-go concerns the full coefficient stabilizer \(H\), not every subgroup.
- It does not reduce the automorphism group of the finite ternary Golay code itself.
- It is a kinematic representation theorem, not a dynamical Goldstone derivation.
- It does not connect \(M_{11}\) directly to the Monster group.

## 10. Certificate

The [Witt-block stabilizer fixed-isotropic no-go certificate](scripts/prove_witt_block_stabilizer_cannot_fix_a_maximal_rational_isotropic_lift.mjs) reconstructs \(M_{11}\), extracts \(H\), identifies \(S_3\times C_2\), computes rational character multiplicities, constructs the isotypic projectors, restricts the weighted form and derives the invariant isotropic bound.

## Companion documents

- [Witt-block integral lift](592_the_witt_block_nonunit_golay_orbit_also_lifts_but_the_integral_frame_breaks_its_symmetry.md)
- [Mathieu orbit classification](591_the_explicit_nonunit_golay_weights_lie_in_the_generic_m11_orbit.md)
- [Explicit generic integral Golay lift](590_an_explicit_nonunit_integral_ternary_golay_lift_and_length_37_qutrit_doubling.md)
- [Grand synthesis](40_grand_synthesis_spin23_pole.md)
