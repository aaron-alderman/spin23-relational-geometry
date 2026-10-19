# Two Quadratic Handle Transfers and One Mutual Shear Are Zariski Dense in \(Sp(4)\) and Mod-Three Surjective

**Date:** 17 October 2026  
**Branches:** B01, B04, B05, B07, B08, B09, B10, B12 and B14  
**Claim status:** exact finite closure and exact Zariski-density certificate; finite index and physical implementation remain open

## 1. Embedding the interval transfers on genus two

Let

\[
C_+=\begin{pmatrix}0&-1\\1&3\end{pmatrix},
\qquad
C_-=\begin{pmatrix}0&-1\\1&6\end{pmatrix}
\]

be the integral companion transfers of discriminants five and thirty-two. Embed one \(SL(2,\mathbb Z)\) action on each symplectic handle:

\[
(a_i,b_i)\longmapsto C_{\epsilon_i}(a_i,b_i),
\qquad
\epsilon_i\in\{+,-\}.
\]

In the ordering

\[
(a_1,a_2,b_1,b_2),
\]

these are block-handle elements of \(Sp(4,\mathbb Z)\).

Add the integral unipotent mutual shear

\[
U_+=
\begin{pmatrix}
I_2&0\\
K_+&I_2
\end{pmatrix},
\qquad
K_+=\begin{pmatrix}3&2\\2&3\end{pmatrix}.
\]

This gives four possible generator triples according to the equal or mixed choice of handle discriminants.

## 2. Full finite closure with only three generators

Modulo three, both handle transfers reduce to the same Fourier quarter-turn

\[
F=\begin{pmatrix}0&-1\\1&0\end{pmatrix}.
\]

The unipotent reduces to the unique mutual shear

\[
\overline U=
\begin{pmatrix}
I_2&0\\
K_{\mathrm{mut}}&I_2
\end{pmatrix},
\qquad
K_{\mathrm{mut}}=
\begin{pmatrix}0&2\\2&0\end{pmatrix}.
\]

Exhaustive finite closure gives

\[
\boxed{
\langle F_1,F_2,\overline U\rangle
=Sp(4,\mathbb F_3),
\qquad
|\langle F_1,F_2,\overline U\rangle|=51840.
}
\]

The local quadratic phase generators used in the earlier Weil calculation are not independently required: conjugating one mutual shear by the two local Fourier transformations generates them inside the closure.

This is a minimal-looking three-operation architecture:

1. transfer/Fourier on handle \(C\);
2. transfer/Fourier on handle \(D\);
3. one relational mutual shear.

## 3. Integral Zariski-density test

Finite surjectivity does not prove that the integral subgroup is large over the reals. To test the algebraic closure, write

\[
U_+=I+N,
\qquad
N^2=0.
\]

The powers

\[
U_+^n=I+nN
\]

imply that the Zariski closure contains the one-parameter unipotent subgroup \(\exp(tN)\). Conjugating by the two handle transfers supplies Lie-algebra directions

\[
\operatorname{Ad}(C_{\epsilon_1}^rC_{\epsilon_2}^s)N.
\]

The certificate generates these conjugates and closes them under matrix commutators. For every assignment

\[
(\epsilon_1,\epsilon_2)
\in
\{(+,+),(+,-),(-,+),(-,-)\},
\]

the resulting rational Lie algebra has dimension

\[
\boxed{10=\dim\mathfrak{sp}_4.}
\]

All matrices satisfy

\[
X^TJ+JX=0.
\]

Independence is certified by a nonzero ten-dimensional minor modulo the large prime \(1000003\); this proves the corresponding integer minor is nonzero over \(\mathbb Q\).

Therefore each integral generator group is Zariski dense:

\[
\boxed{
\overline{\langle C_{\epsilon_1}^{(1)},
C_{\epsilon_2}^{(2)},U_+\rangle}^{\,\mathrm{Zar}}
=Sp(4).
}
\]

## 4. Equal versus mixed quadratic orders

The density result holds for all four assignments:

| handle 1 | handle 2 | Lie closure | mod-three image |
|---|---|---:|---:|
| discriminant 5 | discriminant 5 | \(\mathfrak{sp}_4\) | full |
| discriminant 5 | discriminant 32 | \(\mathfrak{sp}_4\) | full |
| discriminant 32 | discriminant 5 | \(\mathfrak{sp}_4\) | full |
| discriminant 32 | discriminant 32 | \(\mathfrak{sp}_4\) | full |

Neither finite symplectic closure nor real algebraic density selects equal versus mixed handle orders. That choice remains in the integral spectral data—traces, Jordan norms and transfer rapidities.

## 5. What Zariski density means here

The generated subgroup preserves no proper algebraic reduction of the four-dimensional symplectic carrier. In particular, after the mutual shear is included, the two handles are not algebraically decoupled.

This is a serious version of the proposed \(Spin(2,3)\) “pole”:

\[
\text{two source-labelled transfer channels}
+\text{ one source-labelled relation}
\longrightarrow
\text{Zariski-dense arithmetic motion in }Sp(4).
\]

Using

\[
Sp(4,\mathbb R)\cong Spin_0(2,3),
\]

the generator set reaches the full continuous algebraic carrier rather than a proper block subgroup.

It does **not** prove:

- equality with \(Sp(4,\mathbb Z)\);
- finite index in \(Sp(4,\mathbb Z)\);
- that the subgroup is a congruence subgroup;
- topological density in \(Sp(4,\mathbb R)\);
- physical implementation of arbitrary real transformations.

The integral group may be thin.

## 6. A sharper dependency graph

The construction now factors as

\[
\begin{array}{ccccc}
\text{Furey chords}
&\to&
\text{two scalar transfers}
&\to&
C_{\epsilon_1}^{(1)},C_{\epsilon_2}^{(2)}
\\
&&&&\downarrow\\
\text{weak-only code word}
&\to&
K_+
&\to&
U_+
\\
&&&&\downarrow\\
&&&&
\Gamma_{\epsilon_1,\epsilon_2}
\subset Sp(4,\mathbb Z).
\end{array}
\]

The exact properties are:

\[
\Gamma_{\epsilon_1,\epsilon_2}\bmod3
=Sp(4,\mathbb F_3),
\]

and

\[
\overline{\Gamma_{\epsilon_1,\epsilon_2}}^{\,\mathrm{Zar}}
=Sp(4).
\]

The remaining arithmetic question is whether \(\Gamma\) is finite index or thin. The remaining physical question is whether the Furey/Higgs action actually supplies all three generators.

## 7. Claim ledger

- **Exact:** both handle companions embed in \(Sp(4,\mathbb Z)\).
- **Exact:** the positive mutual shear embeds as an integral unipotent.
- **Exact:** the three mod-three generators produce all \(51840\) symplectic matrices.
- **Exact:** all equal and mixed handle assignments have ten-dimensional Lie closure.
- **Exact:** every resulting integral subgroup is Zariski dense in \(Sp(4)\).
- **Open:** finite index, congruence level and thinness.
- **Open:** source selection of equal versus mixed quadratic orders.
- **Open:** microscopic implementation and positive causal evolution.
- **Not established:** derivation of spacetime or gravity from group density.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** prove one source-selected \(\Gamma_{\epsilon_1,\epsilon_2}\) has finite index in \(Sp(4,\mathbb Z)\), while its generators arise from the weak/Higgs transfer action.

**Thin-group trigger:** compute the index or congruence closure and prove the physically generated subgroup is thin but Zariski dense, producing a restricted arithmetic spectrum.

**Density falsifier:** mod-three surjectivity alone is called Zariski density without the independent Lie-closure calculation.

**Lattice falsifier:** Zariski density is called equality with \(Sp(4,\mathbb Z)\).

**Physical falsifier:** algebraic generation is described as a dynamical implementation without an action or circuit.

## 9. Certificate

The [two-handle density certificate](../../../verification/verify/verify_two_handle_quadratic_transfers_plus_mutual_shear_are_mod3_full_and_zariski_dense.mjs) verifies integral symplectic membership, exhausts the mod-three group and computes the exact ten-dimensional Lie closure for all four handle assignments.

## Companion documents

- [Quadratic-order transfer lattices](490_the_two_scalar_transfer_branches_preserve_quadratic_order_lattices_and_share_an_order_four_mod_three_shadow.md)
- [Positive integral mutual shear](486_the_three_transvection_word_has_a_positive_integral_jordan_lift_whose_level_three_self_terms_hide_modulo_three.md)
- [Genus-two Weil/code equivalence](478_the_genus_two_a2_weil_representation_is_exactly_the_two_qutrit_clifford_carrier_and_derives_the_cross_gate_from_a_sum_cycle_twist.md)
- [Global \(Sp(4,\mathbb R)\cong Spin_0(2,3)\)](../0000-0099/47_global_group_isomorphism_sp4r_spin023.md)
