# All six Standard-Model flags lift integrally, but orientation does not descend

## Executive result

Cycle 470 proved that one selected finite isometry lifts to the integral ambient intersection lattice

\[
J=U(2)\oplus\langle-2\rangle\oplus U(-2).
\]

The stronger global question is whether the whole finite orthogonal group lifts. An exhaustive construction now proves that the reduction map

\[
\rho:O(J)\longrightarrow O(q_J)
\]

is surjective:

\[
\boxed{\rho(O(J))=O(q_J),\qquad |O(q_J)|=72.}
\]

Every one of the 72 finite isometries has an explicit integral lift whose entries are already in \(\{0,\pm1\}\). Therefore the six-element finite orbit of Standard-Model \(3+2\) flags lifts to six integral orthogonal decompositions

\[
\boxed{
J=C_i\perp W_i,\qquad
C_i\cong\langle-2\rangle^3,\qquad
W_i\cong\langle2\rangle^2,\qquad i=1,\ldots,6.}
\]

However, the old quartic orientation cannot be identified with raw determinant or rational spinor norm on the finite group. Both characters vary inside the level-two congruence kernel. An oriented, spin, Clifford, theta or metaplectic lift is genuinely additional data.

## 1. Reduction from the integral lattice

Divide the Gram form of \(J\) by two and write

\[
H_J=U\oplus\langle-1\rangle\oplus U(-1).
\]

Because multiplication of the form by two does not change its integral automorphism group,

\[
O(J)=O(H_J;\mathbb Z).
\]

Reduction modulo two acts on

\[
A_J=J^*/J\cong(\mathbb Z_2)^5
\]

and preserves

\[
q_J(a,b,c,d,e)=2ab+3c+2de\pmod4.
\]

Thus there is a natural homomorphism

\[
\rho:O(J)\to O(q_J).
\]

Cycle 469 computed the target group exactly and found order 72. Surjectivity was not automatic: a finite discriminant isometry can fail to lift to a given integral lattice.

## 2. Exhaustive lifting theorem

For every \(A\in O(q_J)\), the certificate searches for integral columns \(v_1,\ldots,v_5\) satisfying

\[
v_i\equiv A e_i\pmod2
\]

and

\[
(v_i,v_j)_{H_J}=(e_i,e_j)_{H_J}.
\]

All 72 searches succeed with coordinate bound one. Each resulting matrix \(Q_A\) obeys

\[
Q_A^TH_JQ_A=H_J,\qquad
\det Q_A=\pm1,\qquad
Q_A\bmod2=A.
\]

Therefore

\[
\boxed{\rho:O(J)\twoheadrightarrow O(q_J).}
\]

This removes a possible arithmetic obstruction more strongly than Cycle 470: not only the selected \(\Phi\), but every symmetry of the ambient discriminant shell is realized integrally.

The constructed lifts are representatives, not a finite subgroup section. The assignment \(A\mapsto Q_A\) has not been asserted to preserve multiplication. Surjectivity does not imply that the short exact sequence splits.

## 3. Six integral \(3+2\) decompositions

Let

\[
P:L_{\rm SM}^{\rm phase}\overset{\sim}{\to}J
\]

be the integral Cycle 470 isometry, with

\[
L_{\rm SM}^{\rm phase}
=\langle-2\rangle^3\oplus\langle2\rangle^2.
\]

The first three columns of \(P\) span the negative color lattice \(C_0\), while the last two span its positive weak complement \(W_0\):

\[
J=C_0\perp W_0.
\]

Choose one integral lift \(Q_i\) for each of the six finite flag cosets. Then

\[
C_i=Q_iC_0,\qquad W_i=Q_iW_0.
\]

Because every \(Q_i\) is unimodular and orthogonal,

\[
C_i\cong\langle-2\rangle^3,\qquad
W_i\cong\langle2\rangle^2,\qquad
J=C_i\perp W_i.
\]

Their reductions are the six distinct finite color planes from Cycle 469, so the integral decompositions are distinct.

One set of color bases is:

\[
\begin{array}{c|ccc}
i&c_{i1}&c_{i2}&c_{i3}\\ \hline
1&(1,0,1,0,0)&(0,1,1,0,0)&(1,1,1,1,1)\\
2&(1,0,1,0,0)&(0,1,1,1,0)&(2,1,1,2,1)\\
3&(0,1,1,0,0)&(1,0,1,1,0)&(1,2,1,2,1)\\
4&(0,0,1,1,0)&(0,0,1,0,-1)&(1,-1,1,1,-1)\\
5&(0,0,1,1,0)&(1,0,1,0,-1)&(2,-1,1,2,-1)\\
6&(1,0,1,1,0)&(0,1,1,1,0)&(2,2,1,4,1)
\end{array}
\]

Each row consists of three mutually orthogonal norm-\(-1\) vectors for \(H_J\), equivalently norm-\(-2\) vectors for \(J\). Its orthogonal complement is a primitive positive-definite rank-two lattice with Gram \(2I_2\).

## 4. Integral meaning of the sixfold orbit

The finite orbit was not an artifact of reducing too early. It is the reduction of a real integral orbit of signed Lorentzian decompositions.

The stabilizer of one finite flag is \(S_3\times S_2\). At the integral level, preserving the definite summands forces a signed permutation on each orthonormal block. Therefore the exact integral stabilizer is

\[
\operatorname{Stab}_{O(J)}(C_0\perp W_0)
\cong C_2^5\rtimes(S_3\times S_2),
\]

of order

\[
32\cdot6\cdot2=384.
\]

Its reduction kills all five independent sign changes and retains the order-12 source permutation group:

\[
1\to C_2^5\to
\operatorname{Stab}_{O(J)}(C_0\perp W_0)
\to S_3\times S_2.
\]

The six flags therefore remain a genuine selection problem. Integrality does not collapse them to one.

## 5. Why determinant does not descend

Let

\[
K(2)=\ker\bigl(O(J)\to O(q_J)\bigr).
\]

In the diagonal model

\[
I_{2,3}=\langle-1\rangle^3\oplus\langle1\rangle^2,
\]

changing the sign of any one basis vector is an integral reflection. Modulo two, \(-1\equiv1\), so every such reflection lies in \(K(2)\). But a single reflection has determinant \(-1\).

Hence determinant is nontrivial on the kernel:

\[
\det|_{K(2)}\ne1.
\]

No character on \(O(q_J)\) can therefore be defined by choosing an arbitrary integral lift and taking its determinant. Two integral lifts of the same finite isometry can have opposite determinants.

## 6. Why rational spinor norm does not descend

For a reflection \(r_v\), the rational spinor norm is

\[
\operatorname{sn}(r_v)=(v,v)\in\mathbb Q^*/(\mathbb Q^*)^2.
\]

The level-two kernel contains both a reflection in a negative unit vector, with spinor norm \(-1\), and a reflection in a positive unit vector, with spinor norm \(+1\). Therefore spinor norm is nontrivial on the kernel and cannot be inferred from the finite discriminant action:

\[
\operatorname{sn}|_{K(2)}\ne1.
\]

The product \(\det\cdot\operatorname{sn}\) does not descend either: the positive reflection has determinant \(-1\) and spinor norm \(+1\).

These statements are transported explicitly into the ambient \(J\) basis by conjugating the two sign reflections with \(P\). The resulting integral matrices preserve \(H_J\) and reduce to the identity.

## 7. Consequence for the quartic theta line

The quartic orientation character cannot be recovered from the bare finite orthogonal transformation by any of the three obvious lift-independent prescriptions:

\[
\det,\qquad \operatorname{sn},\qquad \det\operatorname{sn}.
\]

This is not a failure of the theta branch. It says the theta information is genuinely a choice of lift or central extension.

Live candidates include:

- restricting to an oriented and time-oriented subgroup;
- choosing a spin lift in \(Pin(2,3)\) or \(Spin(2,3)\);
- the binary Clifford/Heisenberg extension already constructed;
- a metaplectic lift of the \(Sp(4)\) action;
- a determinant or Pfaffian line equipped with a trivialization;
- the quartic section itself as the missing orientation datum.

The finite discriminant module alone cannot choose among them.

## 8. Claim status

### Established computationally and algebraically

- all 72 elements of \(O(q_J)\) have integral lifts in \(O(J)\);
- the reduction map \(O(J)\to O(q_J)\) is surjective;
- all six finite Standard-Model flags lift to primitive integral orthogonal decompositions;
- each decomposition has negative color lattice \(\langle-2\rangle^3\) and positive weak lattice \(\langle2\rangle^2\);
- the exact integral flag stabilizer is \(C_2^5\rtimes(S_3\times S_2)\) of order 384;
- determinant and rational spinor norm are nontrivial on the level-two kernel;
- neither character, nor their product, descends to the finite quotient.

### Candidate bridge

- the six decompositions may be the integral form of six boundary, polarization or arithmetic sectors;
- the quartic line may choose an oriented lift of one decomposition;
- the relevant physical group may be an oriented/spin/metaplectic subgroup above \(O(q_J)\).

### Not established

- a canonical multiplicative section \(O(q_J)\to O(J)\);
- a physical interpretation of the six decompositions;
- equality of the quartic theta character with a character on a specified oriented lift;
- derivation of the signed phase lattice from Furey's source algebra.

## 9. Stop-everything and falsification gates

### Stop-everything results reached

1. The entire ambient finite orthogonal group lifts integrally.
2. All six \(3+2\) flags are genuine integral decompositions.
3. Raw determinant and spinor norm are decisively insufficient as lift-independent orientation selectors.

### Next stop-everything gates

1. A canonical spin or metaplectic lift restricts the level-two kernel enough for the quartic character to descend.
2. The six flags match a previously derived six-element orbit in the handle, theta or code data.
3. Explicit Furey operators preserve one integral decomposition and permute or exclude the other five.
4. A source-derived Pfaffian line selects both a Brown orientation and one flag.

### Falsification boundaries

1. Any proposed finite determinant formula must fail unless it supplies extra lift data.
2. If the six decompositions are freely conjugate under every physically admissible source operation, they cannot label distinct observables.
3. If no source operator recognizes the signed phase lattice, the integral orbit remains an arithmetic completion rather than a physical prediction.

## 10. Next calculations

1. Determine whether the 72-element quotient admits a multiplicative integral section; do not infer splitting from elementwise lifting.
2. Compute the spin and metaplectic pullbacks of the order-12 flag stabilizer.
3. Compare the six integral flags with the six cosets or orientations already present in the quartic and Hadamard constructions.
4. Transport explicit Furey color/weak root operators into the integral \(J\) basis.

## Certificate and companions

> **Cycle 472 resolution.** The surjection \(O(J)\to O(q_J)\) does not admit a multiplicative section: \(O(q_J)\cong S_3\wr C_2\) has no faithful five-dimensional representation of signature \((2,3)\). The order-12 flag stabilizer does split. See [The order-72 shell symmetry lifts elementwise, but the integral extension does not split](556_the_order_72_shell_symmetry_lifts_elementwise_but_the_integral_extension_does_not_split.md).

- [Integral lift, flag and orientation certificate](../../../verification/lift/lift_six_five_bit_flags_and_test_orientation_characters.mjs)
- [Exact selected integral lift](554_the_finite_standard_model_phase_isometry_lifts_exactly_to_the_integral_spin23_intersection_lattice.md)
- [Finite index-six flag stabilizer](553_the_standard_model_flag_is_an_index_six_stabilizer_inside_the_ambient_five_bit_orthogonal_group.md)
- [Quartic orientation line](536_the_quartic_m_over_i_character_is_an_independent_global_orientation_line.md)

