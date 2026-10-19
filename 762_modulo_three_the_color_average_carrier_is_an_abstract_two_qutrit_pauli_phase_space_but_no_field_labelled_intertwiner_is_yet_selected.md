# Modulo Three, the Color-Average Carrier Is an Abstract Two-Qutrit Pauli Phase Space, but No Field-Labelled Intertwiner Is Yet Selected

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B11, B12, B13, B14 and the qutrit/arithmetic-carrier branch  
**Claim status:** exact finite-field reduction and signed-action comparison with executable certificate; identification with specific code logicals remains open  
**Certificate:** [compare_color_average_carrier_mod3_with_two_qutrit_pauli_phase_space.mjs](scripts/compare_color_average_carrier_mod3_with_two_qutrit_pauli_phase_space.mjs)

## Executive result

Reducing the canonical integral carrier of document 761 modulo three gives

\[
\boxed{
(L_{\rm col}/3L_{\rm col},J_0)
\cong
(\mathbb F_3^4,J_0).
}
\]

This is exactly the abstract symplectic phase space of two logical qutrits. Its full symplectic group has order

\[
|Sp(4,3)|
=3^4(3^2-1)(3^4-1)
=51840.
\]

The oriented color cycle reduces to an order-three unipotent symplectic transformation with a three-dimensional fixed space. The paired color/weak reflection reduces to an anti-symplectic involution with multiplier

\[
-1\equiv2\pmod3.
\]

Their relation remains

\[
SRS=R^{-1}.
\]

The primitive lattice also reduces nondegenerately: its five-dimensional Gram determinant is one modulo three.

Therefore the arithmetic carrier and the two-logical-qutrit Pauli space have exactly the same finite symplectic type. This is a real bridge. It is not yet a canonical identification with the two punctures or logical operators of the Standard-Model code.

## 1. The four-dimensional reduction

The canonical integral form is

\[
J_0=
\begin{pmatrix}
0&0&1&0\\
0&0&0&1\\
-1&0&0&0\\
0&-1&0&0
\end{pmatrix}.
\]

Modulo three it remains nondegenerate, with determinant one. Thus no radical survives after passing to the color-average completion.

This should be contrasted with the pre-completion equal-area form on \(A_4\), whose reduction had a two-dimensional radical. The index-three completion is exactly what converts the degenerate ternary shadow into a full four-dimensional symplectic space.

## 2. Comparison with two logical qutrits

For two qutrits, Pauli exponents form

\[
(x_1,x_2,z_1,z_2)\in\mathbb F_3^4,
\]

with commutator pairing

\[
\langle(x,z),(x',z')\rangle
=x\cdot z'-z\cdot x'.
\]

Its matrix is precisely \(J_0\). Hence an abstract symplectic isomorphism exists.

The two-puncture Prakash–Ramya branch also supplies two logical qutrits and therefore such a phase space. But the code does not canonically label its logical \(X_1,X_2,Z_1,Z_2\) by the color-average carrier basis. Logical representatives may be changed by \(Sp(4,3)\), and there are 51840 such symplectic frame changes.

So abstract isomorphism is cheap; a field-labelled intertwiner remains the hard part.

## 3. The color cycle in characteristic three

Over \(\mathbb R\), the color cycle is a genuine rotation on the color plane. Modulo three, its polynomial

\[
x^2+x+1
\]

becomes

\[
(x-1)^2.
\]

Accordingly the reduction is unipotent rather than semisimple. It has order three and a three-dimensional fixed space.

This is a useful warning: “color rotation” and “qutrit shear” can be two shadows of the same integral transformation, but their geometric interpretations differ by characteristic.

## 4. The paired reflection

The four-dimensional reflection satisfies

\[
S^TJ_0S=-J_0.
\]

Modulo three this becomes

\[
S^TJ_0S=2J_0.
\]

It is therefore not an element of \(Sp(4,3)\), but an anti-symplectic element in the signed normalizer. In quantum-information language such operations generally require an antiunitary or conjugating extension rather than an ordinary Clifford unitary.

This matches the earlier Hermitian/topology analysis: parity belongs to the extended real structure, not the connected/symplectic dynamics.

## 5. Primitive five-dimensional reduction

The integral primitive lattice has Gram

\[
U\oplus U\oplus\langle-2\rangle.
\]

Modulo three, \(-2\equiv1\), and the determinant becomes one. Thus the five-dimensional quadratic space is nondegenerate over \(\mathbb F_3\).

Both the color cycle and paired reflection preserve this quadratic form. The finite exceptional isomorphism between symplectic and orthogonal groups in dimension four/five is therefore visible arithmetically as well as over \(\mathbb R\).

## 6. What a genuine code intertwiner must do

A useful map

\[
\Phi:
\text{two-logical code phase space}
\longrightarrow
L_{\rm col}/3L_{\rm col}
\]

must satisfy more than \(\Phi^TJ_0\Phi=J_0\). It should also:

1. attach logical representatives to Standard-Model field supports;
2. send a code symmetry or puncture operation to the color cycle;
3. send code conjugation to the paired anti-symplectic reflection;
4. identify the color-average discriminant line before completion;
5. be compatible with the anomaly cubic or explain why only the commutator descends.

Without these conditions, any of 51840 symplectic frame changes is equally valid.

## 7. Stop-everything and falsification criteria

Stop claiming that equal dimension and symplectic type identify the carrier with the code logicals.

Stop treating the anti-symplectic reflection as an ordinary qutrit Clifford operation without an antiunitary extension.

Stop interpreting the characteristic-three unipotent as the same geometric rotation seen over \(\mathbb R\).

Reopen the identification only after an explicit field-labelled symplectic map passes the five conditions above.

## 8. Highest-value continuations

1. Extract explicit logical \(X/Z\) representatives for a two-puncture qutrit Standard-Model code and enumerate intertwiners respecting field-support orbits.
2. Test whether the 25 minimum logical supports determine the color-average line.
3. Match the color cycle to a code automorphism or prove no such automorphism exists.
4. Implement the paired reflection as logical conjugation and test its action on the transversal cubic phase.
5. Compare the primitive five-space with the finite orthogonal shadow already found in the two-puncture branch.

## Reproducibility

    node scripts/compare_color_average_carrier_mod3_with_two_qutrit_pauli_phase_space.mjs

## Companion documents

- [Canonical integral carrier and primitive lattice](761_the_color_average_completion_has_canonical_sp4z_form_and_primitive_lattice_u_plus_u_plus_minus2_with_signed_o23_action.md)
- [Unique color-average index-three completion](760_signed_color_weak_covariance_uniquely_selects_the_color_average_index_three_unimodular_overlattice_conditional_on_equal_areas.md)
- [Two punctures and finite symplectic shadow](450_two_punctures_produce_an_exact_finite_sp4_shadow_but_do_not_select_the_spin23_real_carrier.md)
- [Two-puncture theta lift and missing shear](503_the_two_puncture_binary_standard_model_code_reproduces_the_diagonal_theta_lift_but_not_the_mutual_shear.md)
