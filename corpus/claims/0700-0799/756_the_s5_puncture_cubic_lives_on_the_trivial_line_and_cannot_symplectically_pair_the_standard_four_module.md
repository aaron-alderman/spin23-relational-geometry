# The \(S_5\) Puncture Cubic Lives on the Trivial Line and Cannot Symplectically Pair the Standard Four-Module

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B11, B12, B13, B14 and the Prakash–Ramya/symplectic-intertwiner branch  
**Claim status:** exact finite representation-theoretic no-go with executable certificate  
**Certificate:** [verify_s5_puncture_cubic_cannot_supply_symplectic_standard_carrier.mjs](../../../verification/verify/verify_s5_puncture_cubic_cannot_supply_symplectic_standard_carrier.mjs)

## Executive result

The most tempting direct bridge from the Prakash–Ramya code to \(Sp(4,\mathbb R)\) fails for two independent reasons.

Puncturing \(\nu^c\) leaves the stabilizer \(S_5\), acting by permutation on the five oscillator/charge coordinates. Its real permutation module decomposes as

\[
\mathbb R^5
=
\mathbb R\mathbf1
\oplus
V_4,
\qquad
V_4=\{x\in\mathbb R^5:\sum_i x_i=0\}.
\]

The four-dimensional summand has exactly the dimension of a candidate symplectic carrier. But:

\[
\boxed{(\Lambda^2V_4^*)^{S_5}=0.}
\]

It has a unique invariant symmetric form and no invariant alternating form. Moreover the punctured anomaly trilinear form is

\[
\boxed{
\tau_{15}(x,y,z)
=-(\textstyle\sum_i x_i)
  (\textstyle\sum_i y_i)
  (\textstyle\sum_i z_i),
}
\]

so it lives entirely on the trivial line and vanishes whenever any argument lies in \(V_4\).

Therefore neither the puncture cubic nor the ordinary \(S_5\) action can equip the natural four-dimensional quotient with the nondegenerate alternating form required for

\[
Sp(4,\mathbb R)\cong Spin_0(2,3).
\]

The numerical match “five charge coordinates minus one invariant direction equals four” is real but insufficient.

## 1. Why \(S_5\) is the correct stabilizer

The sixteen \(SO(10)\) spinor weights are the sign vectors

\[
q\in\{\pm1\}^5,
\qquad
\prod_iq_i=+1.
\]

The punctured state is

\[
q_0=\mathbf1=(1,1,1,1,1),
\]

representing \(\nu^c\). Permuting the five oscillator coordinates fixes \(q_0\), giving the \(S_5\) puncture stabilizer found in the source paper.

The charge-parameter space is the permutation representation \(\mathbb R^5\). Its invariant line and sum-zero complement are canonical as \(S_5\)-modules.

## 2. Exact puncture residue

For parameters \(x,y,z\in\mathbb R^5\), the full anomaly form is

\[
\tau_{16}(x,y,z)
=\sum_{q}(q\cdot x)(q\cdot y)(q\cdot z)=0.
\]

After deleting \(q_0=\mathbf1\),

\[
\begin{aligned}
\tau_{15}(x,y,z)
&=\tau_{16}(x,y,z)
 -(q_0\cdot x)(q_0\cdot y)(q_0\cdot z)\\
&=-(\sum_i x_i)(\sum_i y_i)(\sum_i z_i).
\end{aligned}
\]

Thus the logical cubic anomaly is the cube of the invariant trivial coordinate. It contains no polarized pairing on the standard module:

\[
x\in V_4
\quad\Longrightarrow\quad
\tau_{15}(x,y,z)=0.
\]

This gives a sharper type boundary than saying only that a cubic is not a two-form. In the natural \(S_5\) decomposition, the cubic and the prospective four-carrier occupy different irreducible summands.

## 3. Invariant bilinear forms on \(V_4\)

Use the integral basis

\[
b_i=e_i-e_5,
\qquad i=1,\ldots,4.
\]

The inherited Euclidean Gram matrix is

\[
G_{ij}=b_i\cdot b_j=\delta_{ij}+1.
\]

It is positive definite and invariant under the standard \(S_5\) representation. Solving

\[
R(g)^TBR(g)=B
\]

for a transposition and a five-cycle gives:

\[
\dim(\operatorname{Sym}^2V_4^*)^{S_5}=1,
\qquad
\dim(\Lambda^2V_4^*)^{S_5}=0.
\]

Hence no \(S_5\)-invariant nondegenerate symplectic form exists on this module.

## 4. Consequence for the proposed carrier

The required continuous carrier begins with a real four-space \((W,\omega)\) and a nondegenerate alternating form. Its primitive two-forms then give the five-dimensional \((2,3)\) module.

Taking

\[
W=V_4
\]

does not work while preserving the full puncture stabilizer, because \(\omega\) must vanish. The anomaly cubic cannot select \(\omega\), because its restriction to \(V_4\) is already zero.

There are only a few honest exits:

1. break \(S_5\) to a subgroup that preserves an alternating form;
2. double a real \(S_5\)-module and use the canonical evaluation pairing between two copies or a module and its dual;
3. lift from \(S_5\) to a nontrivial central extension carrying genuinely symplectic representation data;
4. obtain \(\omega\) from logical Pauli commutators, topology exchange or Higgs/Furey data rather than the puncture cubic;
5. treat \(S_5\) as a discrete shadow after, rather than before, the symplectic carrier has been selected.

Each exit introduces data not contained in the rank-one puncture residue.

## 5. Relation to the two-puncture branch

Two punctures produce two logical finite-field degrees of freedom and therefore a canonical finite Pauli commutator. That is a genuinely alternating object. Existing calculations nevertheless show that the binary theta lift fixes only diagonal phases and leaves the mutual shear unselected.

The present no-go explains why the one-puncture \(S_5\) standard module cannot repair that omission: it contributes neither an invariant two-form nor a mixed cubic component. Any successful two-puncture construction must use the logical commutator or gluing data themselves.

## 6. Relation to Jordan triples

The result does not obstruct the already proven algebraic identity

\[
\operatorname{co}(H_2(\mathbb R))
\cong
\mathfrak{sp}(4,\mathbb R)
\cong
\mathfrak{so}(2,3).
\]

It obstructs one proposed antecedent:

\[
\text{punctured anomaly cubic plus }S_5
\not\Longrightarrow
(V_4,\omega).
\]

The Jordan-triple route must receive its alternating carrier from another operation.

## 7. Stop-everything and falsification criteria

Stop identifying the four-dimensional sum-zero charge module with the required symplectic carrier merely because the dimensions agree.

Stop claiming that polarizing the puncture cubic generates a form on that module; every such component vanishes.

Stop retaining exact \(S_5\) while installing an unexplained alternating form on \(V_4\).

Reopen the direct route only if an explicit additional structure is supplied and its covariance group is stated.

## 8. Highest-value continuations

1. Classify subgroups of the puncture \(S_5\) for which \(V_4\) acquires an invariant nondegenerate alternating form.
2. Test whether the Higgs-selected crossed-octonion partition reduces \(S_5\) to one of those subgroups.
3. Construct the doubled module \(V_4\oplus V_4^*\) and determine whether a physical four-dimensional quotient is selected without circularity.
4. Compare the Schur double cover \(2.S_5\) spin representations with the two-logical Pauli representation, keeping real/complex dimensions explicit.
5. Evaluate whether the 25 logical-support commutators span a nondegenerate alternating form after an experimentally meaningful quotient.

## Reproducibility

    node verification/verify/verify_s5_puncture_cubic_cannot_supply_symplectic_standard_carrier.mjs

## Companion documents

- [Prakash–Ramya source re-entry audit](755_arxiv_2610_21879v1_reentry_audit_and_current_frontier_map.md)
- [Two punctures and finite symplectic shadow](../0400-0499/450_two_punctures_produce_an_exact_finite_sp4_shadow_but_do_not_select_the_spin23_real_carrier.md)
- [Two-puncture theta lift and missing mutual shear](../0500-0599/503_the_two_puncture_binary_standard_model_code_reproduces_the_diagonal_theta_lift_but_not_the_mutual_shear.md)
- [Primitive meridian plane and complement freedom](../0500-0599/518_the_prakash_ramya_cubic_lattice_fixes_a_primitive_meridian_plane_but_not_its_symplectic_duals.md)
- [Primitive two-form realization of Spin(2,3)](745_the_primitive_two_forms_of_a_symplectic_four_space_give_the_genuine_five_dimensional_spin23_module.md)
