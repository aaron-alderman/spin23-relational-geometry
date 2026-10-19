# The order-72 shell symmetry lifts elementwise, but the integral extension does not split

## Executive result

Cycle 471 proved that reduction is surjective:

\[
\rho:O(J)\twoheadrightarrow O(q_J),
\qquad
O(q_J)\cong O^+(4,2),
\qquad
|O(q_J)|=72.
\]

Every finite isometry has an integral lift. The stronger question is whether those lifts can be chosen multiplicatively—equivalently, whether there is a subgroup

\[
H\le O(J)
\]

such that

\[
\rho|_H:H\overset{\sim}{\longrightarrow}O(q_J).
\]

The answer is no:

\[
\boxed{
1\to K(2)\to O(J)\to O(q_J)\to1
\quad\text{does not split}.}
\]

The obstruction is representation-theoretic and comes from signature. The finite group

\[
O(q_J)\cong O^+(4,2)\cong S_3\wr C_2
\]

has no faithful real five-dimensional representation preserving a form of signature \((2,3)\).

Thus:

- all 72 shell symmetries lift separately;
- no 72-element integral subgroup realizes them all simultaneously;
- the order-12 \(S_3\times S_2\) stabilizer of one Standard-Model flag *does* split;
- transport between the six flags necessarily accumulates level-two kernel data.

This turns the congruence extension from optional bookkeeping into an unavoidable part of the integral structure.

## 1. The extension problem

Let

\[
J=U(2)\oplus\langle-2\rangle\oplus U(-2)
\]

and

\[
K(2)=\ker\bigl(O(J)\to O(q_J)\bigr).
\]

Cycle 471 gives the exact sequence

\[
1\longrightarrow K(2)
\longrightarrow O(J)
\overset{\rho}{\longrightarrow}O(q_J)
\longrightarrow1.
\]

Surjectivity says every \(A\in O(q_J)\) has at least one integral representative \(Q_A\). A splitting would require a choice satisfying

\[
Q_AQ_B=Q_{AB}
\]

for every pair \(A,B\). Arbitrary elementwise lifts instead obey

\[
Q_AQ_B=c(A,B)Q_{AB},
\qquad
c(A,B)\in K(2).
\]

The extension splits precisely when the kernel-valued factor set \(c(A,B)\) can be removed by changing the lifts.

## 2. Structure of the finite quotient

The ambient five-bit quadratic form has

\[
O(q_J)\cong O^+(4,2).
\]

The standard low-dimensional exceptional isomorphism gives

\[
O^+(4,2)\cong (S_3\times S_3)\rtimes C_2
\cong S_3\wr C_2,
\]

where the outer involution exchanges the two \(S_3\) factors.

The irreducible real representations of a wreath product \(S_3\wr C_2\) can be built from the three real irreducibles of \(S_3\), of dimensions

\[
1,\quad1,\quad2.
\]

For an equal pair \((\lambda,\lambda)\), there are two extensions of dimension

\[
(\dim\lambda)^2.
\]

For an unequal pair \((\lambda,\mu)\), induction gives an irreducible of dimension

\[
2\dim\lambda\dim\mu.
\]

Therefore the full irreducible degree list is

\[
\boxed{1,1,1,1,2,4,4,4,4.}
\]

The degree sum verifies completeness:

\[
4\cdot1^2+2^2+4\cdot4^2=4+4+64=72.
\]

## 3. Faithful five-dimensional representations

The one-dimensional representations factor through the abelianization. The unique two-dimensional irreducible is induced from the two distinct one-dimensional representations of the two \(S_3\) factors. Consequently it kills

\[
A_3\times A_3.
\]

Every direct sum made only from the one- and two-dimensional irreducibles therefore has a kernel containing \(A_3\times A_3\). Such a representation cannot be faithful.

A faithful five-dimensional representation must contain at least one four-dimensional irreducible. Since only one dimension remains, its constituent pattern is necessarily

\[
\boxed{4\oplus1.}
\]

This statement does not depend on which of the four four-dimensional irreducibles is chosen.

## 4. Signature obstruction

Let \(G\) be finite and \(V\) an irreducible real \(G\)-module. Averaging any positive-definite inner product gives a \(G\)-invariant positive-definite form. By real Schur theory, every invariant nondegenerate symmetric form on \(V\) is definite up to an overall sign.

For a \(4\oplus1\) representation, the inequivalent irreducible summands are orthogonal under every invariant symmetric form. The possible signatures are therefore only

\[
(5,0),\qquad(4,1),\qquad(1,4),\qquad(0,5).
\]

The required Lorentzian carrier signature is

\[
(2,3).
\]

It is absent.

Hence \(O^+(4,2)\) cannot embed faithfully in \(O(2,3;\mathbb R)\), and therefore cannot occur as a finite subgroup of \(O(J)\) acting through its defining five-dimensional lattice representation.

If a section

\[
s:O(q_J)\to O(J)
\]

existed, composing it with the defining action of \(O(J)\) on \(J\otimes\mathbb R\) would give exactly such a forbidden faithful representation. Therefore no section exists.

## 5. Computational consistency check

The executable certificate independently reconstructs all 72 finite isometries and finds:

- 864 generating pairs for the finite quotient;
- no closed order-72 integral subgroup among 2,816 tested pairs of bounded torsion lifts across the first 50 smallest-order generating pairs;
- irreducible degrees \(1,1,1,1,2,4,4,4,4\);
- the forced faithful dimension-five pattern \(4+1\);
- the incompatible signature list.

The bounded lift search is corroborating evidence, not the proof. The proof is the representation/signature obstruction.

## 6. Why the order-12 stabilizer is different

For one selected flag,

\[
J=C\perp W,
\qquad
C\cong\langle-2\rangle^3,
\qquad
W\cong\langle2\rangle^2.
\]

The finite stabilizer is

\[
S_3\times S_2.
\]

It has an obvious faithful representation of signature \((2,3)\): permute the three negative axes and the two positive axes. This gives an integral section of the stabilizer.

Indeed, Cycle 471 found the full integral stabilizer

\[
C_2^5\rtimes(S_3\times S_2),
\]

where the sign subgroup \(C_2^5\) is the reduction kernel and the unsigned permutation subgroup supplies a splitting.

Thus the restriction

\[
1\to C_2^5\to
\operatorname{Stab}_{O(J)}(C\perp W)
\to S_3\times S_2\to1
\]

splits, even though the full order-72 extension does not.

## 7. Meaning for the six flags

The six integral flags are all related by elements of the infinite arithmetic group \(O(J)\). But no finite order-72 subgroup acts on them with exactly the finite quotient law.

Given chosen lifts \(Q_A\), multiplication necessarily produces corrections

\[
c(A,B)\in K(2).
\]

Therefore a closed path in the finite six-flag geometry may return to the same finite flag while acquiring a nontrivial integral kernel transformation.

This is structurally close to the programme's recurring themes:

- projective rather than literal group action;
- Heisenberg and Clifford central extensions;
- theta multipliers;
- metaplectic lifts;
- path-dependent orientation or Maslov data;
- a finite visible shadow with an arithmetic memory underneath.

The present kernel is not automatically central, and the factor set has not yet been identified with any one of those constructions. The resemblance is a precise research direction, not an established equality.

## 8. Consequence for physical selection

The Standard-Model \(3+2\) stabilizer is the largest part of the shell symmetry that presently admits a canonical finite integral realization in the displayed signed basis.

Transformations that leave one flag and permute color or weak axes are coherent signed permutations. Transformations that move between flags cannot all be made into a finite integral symmetry at once.

This provides a new possible interpretation of flag selection:

\[
\text{choosing a \(3+2\) flag}
\quad\Longleftrightarrow\quad
\text{choosing a split finite subgroup inside a nonsplit ambient extension}.
\]

That is mathematically stronger than merely choosing one orbit point. It separates:

- a coherently acting source subgroup \(S_3\times S_2\);
- an ambient order-72 quotient visible only after forgetting congruence-kernel data.

Whether nature uses this distinction remains open.

## 9. Claim status

### Established

- \(O(q_J)\cong S_3\wr C_2\) has real irreducible degrees \(1,1,1,1,2,4,4,4,4\);
- every faithful real five-dimensional representation has constituent pattern \(4\oplus1\);
- every invariant nondegenerate form on such a representation has signature \(5+0\), \(4+1\), \(1+4\), or \(0+5\);
- no faithful signature-\((2,3)\) representation exists;
- the full congruence extension does not split;
- the restricted order-12 flag-stabilizer extension does split.

### Candidate bridge

- kernel corrections may encode the same lift data as the quartic theta or Clifford branches;
- the nonsplitting may explain why a \(3+2\) flag is more fundamental than the full shell symmetry;
- paths among the six flags may carry an arithmetic holonomy.

### Not established

- the explicit cohomology class of the nonabelian extension;
- a central quotient of \(K(2)\) matching the quartic character;
- equality with the metaplectic or theta multiplier;
- a physical dynamical principle selecting the split stabilizer.

## 10. Stop-everything and falsification gates

### Stop-everything results reached

1. The full finite orthogonal quotient has no multiplicative integral section.
2. The obstruction is forced by real representation signature, not by an incomplete lift search.
3. The Standard-Model order-12 stabilizer splits even though the ambient order-72 extension does not.

### Next stop-everything gates

1. The kernel factor set projects onto the already established quartic orientation cocycle.
2. A closed path among the six flags produces the binary Heisenberg commutator or theta multiplier.
3. Furey's source operators land exactly in the split order-12 subgroup.
4. The nonsplit extension forces an observable phase or selection rule.

### Falsification boundaries

1. The nonsplitting theorem does not imply a physical anomaly without a specified quantum state space.
2. A different higher-dimensional carrier could admit the full finite group and remove this signature obstruction.
3. A central or spin extension must be computed; it cannot be inferred from analogy.

## 11. Next calculations

1. Choose a controlled lift system and compute the kernel-valued factor set \(c(A,B)\).
2. Abelianize the generated kernel corrections and compare their two-primary quotient with the quartic line.
3. Evaluate short relations and closed paths on the six-flag orbit.
4. Compare the split stabilizer with explicit Furey color and weak root operators.

## Certificate and companions

> **Cycle 473 refinement.** The nonsplitting is invisible in the first congruence layer: the full \(K(2)/K(4)\)-valued lift cocycle is a twisted coboundary, so a section exists modulo four. The remaining obstruction may be deeper two-adically or archimedean. See [The shell lift cocycle is trivial modulo four, and the nonsplitting may be archimedean](557_the_shell_lift_cocycle_is_trivial_modulo_four_and_the_nonsplitting_may_be_archimedean.md).

- [Nonsplitting and representation-signature certificate](../../../verification/test/test_integral_section_of_five_bit_orthogonal_quotient.mjs)
- [Integral surjectivity and orientation no-go](555_all_six_standard_model_flags_lift_integrally_but_orientation_does_not_descend.md)
- [Exact selected integral lift](554_the_finite_standard_model_phase_isometry_lifts_exactly_to_the_integral_spin23_intersection_lattice.md)
- [Finite index-six stabilizer](553_the_standard_model_flag_is_an_index_six_stabilizer_inside_the_ambient_five_bit_orthogonal_group.md)

