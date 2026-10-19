# The Signed Golay Logical Line Has Full Monomial Symmetry \(M_{11}\times C_2\)

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B09, B10, B12, B13 and B14  
**Claim status:** exhaustive finite computation with explicit generators and closure certificate  
**Primary certificate:** [compute_golay_monomial_logical_line_group.mjs](../../../verification/compute/compute_golay_monomial_logical_line_group.mjs)

## Executive result

The symmetry ambiguity left by the distinction between Witt supports and signed Golay words is now resolved.

Let \(S\subset\mathbb F_3^{11}\) be the five-dimensional ternary Golay dual used as the \(P\)-stabilizer space, and let \(\mathbf1\) be its logical representative. Every one of the \(7920\) Witt-design permutations in \(M_{11}\) has exactly two signed monomial lifts preserving \(S\). The full monomial group has order

\[
15840=7920\cdot2
\]

and is a split central extension:

\[
\boxed{\operatorname{Mon}(S)\cong M_{11}\times C_2.}
\]

The central \(C_2\) is global coordinate negation.

Every element preserves the one-dimensional logical quotient

\[
S^\perp/S.
\]

However, most do not preserve the chosen all-one representative:

\[
\boxed{
\begin{array}{c|r}
\text{action on }\mathbf1 & \text{number of elements}\\
\hline
\mathbf1 & 660\\
-\mathbf1 & 660\\
\pm\mathbf1+s,\ s\in S\setminus\{0\} & 14520
\end{array}}
\]

Thus the correct finite-code symmetry is much larger than the order-\(660\) pure-permutation group, but the extra elements act by stabilizer shifts of the logical representative. That difference becomes decisive when attempting a characteristic-zero lift with a fixed real all-one vector.

## 1. The monomial action

A monomial element is represented by a permutation \(p\in S_{11}\) and signs

\[
d=(d_0,\ldots,d_{10})\in(\mathbb F_3^\times)^{11}.
\]

It acts by

\[
(Mv)_{p(j)}=d_jv_j.
\]

The certificate reconstructs the full support-design \(M_{11}\) from the standard degree-eleven generators. For each generator it exhausts all \(2^{11}\) sign vectors and finds exactly two lifts, differing by global negation.

Closure from the lifted generators and central negation produces \(15840\) distinct monomial matrices. Projection to the permutation component has:

\[
\ker\pi=\{\pm I\},
\qquad
\operatorname{im}\pi=M_{11},
\]

with exactly two lifts above every permutation.

## 2. The extension splits, but arbitrary lift choices may conceal this

There are four ways to choose one of the two lifts for each of the two \(M_{11}\) generators. Their generated subgroup orders are

\[
7920,\quad15840,\quad15840,\quad15840.
\]

Exactly one choice gives a subgroup mapping bijectively to \(M_{11}\); the other three already generate the central negation.

Therefore a naive generator section can exhibit an apparent central lifting cocycle, but it is not an intrinsic nonsplit double cover. A genuine complement exists, proving

\[
\operatorname{Mon}(S)=M_{11}\times C_2.
\]

This is important for the programme's repeated quartic-extension question. The signed Golay monomial group contributes a central sign, not a forced \(C_4\) or nonsplit \(\mu_4\).

## 3. Why the logical line is automatically preserved

The Golay dual is self-orthogonal:

\[
S\subset S^\perp,
\qquad
\dim S=5,
\qquad
\dim S^\perp=6.
\]

Moreover,

\[
S^\perp=S+\langle\mathbf1\rangle.
\]

Every monomial transformation is orthogonal for the standard ternary bilinear form and preserves \(S\), so it also preserves \(S^\perp\). Consequently it induces a nonzero scalar on

\[
S^\perp/S\cong\mathbb F_3.
\]

The exhaustive action divides evenly:

\[
7920
\]

elements act by \(+1\) on the logical quotient and \(7920\) act by \(-1\).

Only \(1320\) elements preserve the literal representative line \(\langle\mathbf1\rangle\): the \(660\) pure coordinate permutations and their global negatives. The remaining \(14520\) send \(\mathbf1\) to the same logical coset only after adding a stabilizer word.

## 4. Coefficient-partition stabilizers

For the generic coefficient placement

\[
\mu=(2,2,2,2,2,2,-4,-4,-1,-1,-1),
\]

the stabilizer orders are:

\[
\begin{array}{c|c}
\text{symmetry layer} & \text{order}\\
\hline
\text{full finite monomial group} & 4\\
\text{one chosen }M_{11}\text{ complement} & 2\\
\text{pure coordinate permutations} & 1\\
\text{preserve }\langle\mathbf1\rangle\text{ exactly} & 2
\end{array}
\]

For the Witt-block placement they are:

\[
\begin{array}{c|c}
\text{symmetry layer} & \text{order}\\
\hline
\text{full finite monomial group} & 24\\
\text{one chosen }M_{11}\text{ complement} & 12\\
\text{pure coordinate permutations} & 2\\
\text{preserve }\langle\mathbf1\rangle\text{ exactly} & 4
\end{array}
\]

The factors of two in the representative-compatible groups come from global negation. These counts classify symmetries that fix the literal all-one line, but they do not exhaust symmetries of a particular isotropic lift: a shifted representative can be absorbed by a null direction inside the lifted row space.

## 5. The characteristic-zero gate is the norm of the representative displacement

The integral \(P\)-lattice conditions use the distinguished real vector \(\mathbf1\):

\[
G\mu=0
\quad\Longleftrightarrow\quad
\langle G_i,\mathbf1\rangle_\mu=0.
\]

A finite monomial transformation \(h\) that sends

\[
\mathbf1\longmapsto\pm\mathbf1+s,\qquad s\in S,
\]

preserves the logical coset modulo three, but does not generally preserve the full rational hyperplane

\[
\mathbf1^{\perp_\mu}\subset\mathbb Q^{11}.
\]

It may nevertheless preserve a particular maximal isotropic subspace \(L\subset\mathbf1^{\perp_\mu}\). If \(L\) is \(h\)-invariant, then it lies in the orthogonal complement of both \(\mathbf1\) and \(h^{-1}\mathbf1\). Write

\[
u=h^{-1}\mathbf1-
\langle h^{-1}\mathbf1,\mathbf1\rangle_\mu\,\mathbf1.
\]

Because \(N=\langle\mathbf1,\mathbf1\rangle_\mu=1\),

\[
\langle u,u\rangle_\mu
=1-\langle h^{-1}\mathbf1,\mathbf1\rangle_\mu^2.
\]

If this is nonzero, the extra orthogonality condition lowers the available Witt index and rules out rank five. If it is zero, \(u\) is a null compensator and may lie inside \(L\), so rank five can survive.

The coefficient-stabilizer audit gives:

- generic orbit: both nonconstant lifts have pairing \(\pm1\), hence null displacement;
- Witt-block orbit: sixteen nonconstant lifts have pairings \(\pm11,\pm13\) and are immediately obstructed, while four have pairing \(\pm1\) and remain candidates.

Exact eigenspace signatures show the generic shifted involution admits invariant isotropic dimension five. A subsequent construction realizes it explicitly. One Witt-block shifted involution also passes the dimension-five gate, while another permits only dimension three.

Thus the earlier pure-permutation no-go remains correct, but it does not extend to all signed monomial symmetries. See [A shifted logical representative restores exact monomial symmetry to the integral Golay lift](597_a_shifted_logical_representative_restores_exact_monomial_symmetry_to_the_integral_golay_lift.md).

## 6. Relation to Jordan, \(Spin(2,3)\) and the quartic-centre branch

The result supplies three disciplined conclusions.

### Exact

- the finite Golay \(P\)-logical object has \(M_{11}\times C_2\) monomial symmetry;
- the logical quotient carries a scalar \(C_2\) action;
- code symmetry permits stabilizer shifts of a logical representative;
- non-null representative displacements obstruct maximal isotropy;
- null representative displacements can survive and require a separate fixed-lattice calculation.

### Suggestive

The distinction

\[
\text{logical coset}\quad\text{versus}\quad\text{chosen representative}
\]

resembles the programme's distinction between an abstract relation carrier and a selected positive/Jordan face. Characteristic-zero lifting forces a representative or polarization and thereby breaks symmetries invisible in the finite quotient.

### Not established

- The central \(C_2\) is not the missing symplectic pairing.
- The extension is split, so it does not supply a forced quartic phase.
- \(M_{11}\times C_2\) is not a derivation of \(Spin(2,3)\).
- Stabilizer shifts are not automatically gauge transformations of the physical anomaly lattice.

## 7. Stop-everything and falsification tests

### Stop-everything

1. A Jordan or Furey construction interprets the explicit null compensator as a Peirce arrow or exact physical gauge redundancy.
2. The logical quotient sign combines canonically with an independently derived alternating partner to produce the stationary-plane symplectic form.
3. A Witt-block shifted involution is realized by an integral distance-five lift, enlarging the surviving symmetry branch.

### Falsification

The proposed finite-to-Jordan bridge should be rejected if it identifies the full \(M_{11}\times C_2\) action with a real \(P\)-lattice symmetry without auditing the weighted norm of every representative displacement.

## 8. Next calculations

1. Construct the dimension-five-compatible shifted monomial lift in the Witt-block orbit.
2. Classify all null-displacement coefficient-stabilizing involutions up to the full monomial group.
3. Determine whether Furey's completed matter TRO supplies the null compensator through its neutral completion.
4. Compare the surviving involution with the existing Pauli, Gaussian and weak central signs at generator level.

## Certificate

    node verification/compute/compute_golay_monomial_logical_line_group.mjs

The certificate exhausts sign lifts of the two support-design generators, closes every lift-choice group, verifies preservation of \(S\), audits the logical quotient action and computes all coefficient-partition stabilizers reported above.
