# The Three-Transvection Word Has a Positive Integral Jordan Lift Whose Level-Three Self Terms Hide Modulo Three

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B05, B06, B07, B09, B10, B12 and B14  
**Claim status:** exact positive integral lift into \(H_2(\mathbb R)\) and \(Sp(4,\mathbb Z)\); mediator derivation and real dynamics remain open

## 1. The apparent positivity obstruction

The finite mutual shear is represented by

\[
K_{\mathrm{mut}}=
\begin{pmatrix}0&2\\2&0\end{pmatrix}
\pmod3.
\]

Read naively over the reals, this matrix has eigenvalues \(2,-2\). It is indefinite. Moreover, a positive-semidefinite response with zero diagonal must have zero off-diagonal entry by Cauchy–Schwarz:

\[
|K_{12}|^2\le K_{11}K_{22}=0.
\]

Thus no healthy Gaussian response can realize a **pure** real mutual term with vanishing self terms.

The qutrit reduction, however, does not see self terms divisible by three.

## 2. The code word supplies the missing positive lift

The exact logical word is

\[
T_{Z_C+Z_D}^{,2}T_{Z_C}T_{Z_D}.
\]

Lift its three nonnegative powers as rank-one quadratic responses. With

\[
e_1=\binom10,
\qquad
e_2=\binom01,
\qquad
s=e_1+e_2,
\]

the integral kernel is

\[
\begin{aligned}
K_+
&=e_1e_1^T+e_2e_2^T+2ss^T\\
&=
\boxed{
\begin{pmatrix}3&2\\2&3\end{pmatrix}}.
\end{aligned}
\]

Its eigenvalues are

\[
1,quad5,
\]

and

\[
\det K_+=5>0.
\]

Therefore

\[
K_+\in H_2(\mathbb R)_{>0},
\]

the positive rank-two Jordan cone used by the continuous response branch.

## 3. Reduction hides the healthy self response

Modulo three,

\[
K_+equiv
\begin{pmatrix}0&2\\2&0\end{pmatrix}
=K_{\mathrm{mut}}.
\]

The two diagonal entries are not physically absent in the integral/real theory. They are level-three local responses invisible to the qutrit logical action.

This resolves the apparent conflict:

\[
\begin{array}{ccl}
\text{positive real response}&&K_+=\begin{pmatrix}3&2\\2&3\end{pmatrix},\\[6pt]
\downarrow\bmod3&&\downarrow\\[4pt]
\text{finite logical shear}&&K_{\mathrm{mut}}=\begin{pmatrix}0&2\\2&0\end{pmatrix}.
\end{array}
\]

The finite code sees a pure relation precisely because it quotients out three units of local self phase.

## 4. Exact integral symplectic lift

Every symmetric integral \(K\) defines the shear

\[
S(K)=
\begin{pmatrix}
I_2&0\\
K&I_2
\end{pmatrix}
\in Sp(4,\mathbb Z).
\]

Hence \(S(K_+)\) is simultaneously:

- an integral mapping-class-compatible symplectic operation;
- a positive Jordan response kernel;
- a lift of the two-qutrit mutual Clifford gate.

This is the first operation in the programme for which the finite code, integral \(Sp(4)\) and positive \(H_2(\mathbb R)\) descriptions are connected by one explicit matrix.

## 5. Gaussian mediator interpretation

Let three healthy mediator channels couple to currents along

\[
e_1,quad e_2,quad e_1+e_2
\]

with positive inverse-mass weights

\[
1,quad1,quad2.
\]

Integrating them out produces a Gram response proportional to

\[
e_1e_1^T+e_2e_2^T+2(e_1+e_2)(e_1+e_2)^T=K_+.
\]

The three directions are exactly the two individual logical axes and their weak-doublet sum axis. Thus positivity is compatible with the required Clifford coefficient pattern; it does not force a ghost or a negative mediator norm.

## 6. Positivity does not uniquely choose the lift

Among positive-definite symmetric integral matrices congruent to \(K_{\mathrm{mut}}\) modulo three, the minimum possible trace is six. There are exactly two such minimum-trace lifts:

\[
K_-=\begin{pmatrix}3&-1\\-1&3\end{pmatrix},
\qquad
K_+=\begin{pmatrix}3&2\\2&3\end{pmatrix}.
\]

They differ by a level-three off-diagonal shear invisible modulo three. Positivity and minimal trace alone do not choose between them.

The nonnegative rank-one decomposition inherited from the explicit transvection word selects \(K_+\) as a natural lift, but a physical derivation must still determine whether exponent \(2\) means \(+2\) rather than the congruent inverse exponent \(-1\) in the integral theory.

## 7. Relation to \(Spin_0(2,3)\)

The statement established here is not that a finite code derives Lorentzian spacetime. It is sharper and narrower:

\[
\text{one source-labelled code operation}
\longrightarrow
K_+\in H_2(\mathbb R)_{>0}
\longrightarrow
S(K_+)\in Sp(4,\mathbb Z)
\subset Sp(4,\mathbb R)
\cong Spin_0(2,3).
\]

The positive cone supplies the healthy real form; the integral shear supplies arithmetic compatibility; the modulo-three reduction recovers the code gate. Continuous dynamics, causal interpretation and coupling normalization remain separate questions.

## 8. Claim ledger

- **Exact:** the nonnegative lift of the three-transvection word is \(K_+=\bigl(\begin{smallmatrix}3&2\\2&3\end{smallmatrix}\bigr)\).
- **Exact:** \(K_+\) is positive definite with eigenvalues \(1,5\) and determinant \(5\).
- **Exact:** \(S(K_+)\in Sp(4,\mathbb Z)\).
- **Exact:** reduction modulo three gives the mutual qutrit shear.
- **Exact:** a pure real off-diagonal response with zero self terms is not positive semidefinite.
- **Exact:** there are two trace-minimal positive integral lifts, so positivity alone is nonunique.
- **Candidate dynamics:** three positive weak-mediator Gram channels produce \(K_+\).
- **Open:** source derivation of weights \((1,1,2)\), lift-sign selection, normalization and causal response.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** the Higgs/Furey weak mediator calculation produces the positive Gram weights \((1,1,2)\), selecting \(K_+\) and its integral shear without adjustable relative coefficients.

**Real-carrier trigger:** the same kernel appears as the boundary Hessian or Dirichlet-to-Neumann response of the established positive Jordan carrier.

**Positivity falsifier:** the bare indefinite residue matrix is used as the real response while its level-three diagonal completion is discarded.

**Uniqueness falsifier:** positivity alone is claimed to distinguish \(K_+\) from \(K_-\).

**Continuum falsifier:** membership in \(Sp(4,\mathbb Z)\) is said to derive Lorentzian dynamics without a real action or causal kernel.

## 10. Certificate

The [positive integral Jordan-lift certificate](../../../verification/verify/verify_positive_integral_jordan_lift_of_the_mutual_qutrit_shear.mjs) checks the rank-one decomposition, Jordan positivity, integral symplectic identity, mod-three reduction and exhaustive minimum-trace lift classification.

## Companion documents

- [Weak-only mediator closure](485_all_three_mutual_shear_axes_factor_through_the_weak_higgs_doublet_and_require_no_colored_mediator.md)
- [Low-weight mutual-shear synthesis](483_three_low_weight_code_transvections_realize_exactly_the_genus_two_mutual_seam_shear.md)
- [Sewn-meridian Clifford framing](480_the_sewn_furey_matter_pairs_select_a_lagrangian_plane_and_the_remaining_framing_is_exactly_the_clifford_phase_sector.md)
- [Exact Jordan-triple to \(Sp(4,\mathbb R)\)](../0000-0099/42_jordan_triple_to_sp4r_determination.md)
- [Positive scalar response realization](../0000-0099/64_scalar_interval_dirichlet_to_neumann_branch.md)
