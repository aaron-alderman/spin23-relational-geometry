# The BF Modular Pair Embeds Exactly in the Two-Qutrit Clifford Group, but the Anomaly Code Does Not Select Level Three

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B09, B10, B12 and B14  
**Claim status:** exact finite-group comparison and prime-selection no-go

## 1. Correcting the role of modular \(S\)

For level-three BF theory,

\[
S_{(a,b),(c,d)}=\frac13\omega^{-(ad+bc)}.
\]

Although its indices are crossed, this operator factors as

\[
S_{\mathrm{BF}}=\operatorname{SWAP}\,(F^{-1}\otimes F^{-1}).
\]

It maps product states to product states and is already contained in the local-Clifford-plus-swap subgroup. It is not the missing entangling operation. The nonlocal resource is uniquely

\[
T_{\mathrm{BF}}|a,b\rangle=\omega^{ab}|a,b\rangle.
\]

## 2. Exact finite symplectic embedding

On the Weyl exponent space \((q_1,q_2,p_1,p_2)\), the BF generators act as

\[
S_{\mathrm{BF}}=\begin{pmatrix}0&H\\-H&0\end{pmatrix},
\qquad
T_{\mathrm{BF}}=\begin{pmatrix}I&0\\H&I\end{pmatrix},
\qquad
H=\begin{pmatrix}0&1\\1&0\end{pmatrix}.
\]

Their generated subgroup has order 24, the expected finite modular image isomorphic to \(SL(2,3)\). BF modular transformations alone do **not** generate the order-51840 full two-qutrit symplectic group.

## 3. Exact completion with the two face sectors

Independent one-qutrit Clifford operations on the two faces, together with port swap, generate the order-1152 subgroup

\[
(SL(2,3)\times SL(2,3))\rtimes S_2.
\]

The BF \(S\) matrix is already inside it. The BF \(T\) matrix is not. Adding precisely \(T_{\mathrm{BF}}\) enlarges the subgroup to

\[
\boxed{|Sp(4,\mathbb F_3)|=51840.}
\]

The division of labour is exact:

- the two face sectors provide independent local Clifford operations;
- BF modular \(S\) adds no new generator beyond local Fourier transforms and swap;
- BF modular \(T\) supplies the unique missing mutual shear;
- together they generate the full finite \(C_2=B_2\) symplectic carrier.

## 4. Candidate algebraic intertwiner with the punctured code

Choose

\[
|a,b\rangle_{\mathrm{BF}}\longmapsto|a,b\rangle_{\mathrm{logical}}.
\]

It sends the BF shift/clock pairs to the two logical Weyl pairs and sends modular \(T\) to the logical controlled phase. This is an exact Hilbert-space and Clifford intertwiner.

It is not canonical physics. A change by local Clifford transformations or port swap gives another equally valid algebraic map. A physical identification requires charges, puncture fluxes, Wilson loops or boundary response observables that fix the basis and orientation.

## 5. The Standard-Model anomaly code does not select the prime three

The punctured Standard-Model triorthogonal construction exists for every prime \(p\), and the two-puncture version yields

\[
V_p\cong\mathbb F_p^4
\]

for every prime. Hence anomaly cancellation and puncturing alone do not select qutrits.

The prime three enters the present synthesis from a different branch:

\[
\det A_2=3
\Longrightarrow A_2^*/A_2\cong\mathbb Z_3
\Longrightarrow K_{\mathrm{BF}}=3H.
\]

This is a legitimate cross-branch selector, but it is not yet a Standard-Model anomaly prediction. To close the loop, the response lattice itself must be derived from Standard-Model/Furey dynamics rather than chosen independently.

## 6. What has converged

Four initially separate branches meet at the same finite operation:

1. the positive scalar response reduces, after local terms, to the cross shear;
2. the doubled \(A_2\) discriminant carrier needs the unique cross phase;
3. level-three BF modular \(T\) supplies exactly that phase;
4. the two-puncture code needs exactly that phase beyond its local operations.

This is genuine convergence of generator-level mathematics. The unresolved dependency is physical identification and level selection, not finite group theory.

## 7. Claim ledger

- **Exact:** BF modular \(S\) equals local inverse Fourier transforms followed by swap.
- **Exact:** BF modular \(T\) is the unique cross shear.
- **Exact:** the BF modular pair generates an order-24 subgroup of \(Sp(4,\mathbb F_3)\), not the full group.
- **Exact:** independent local face Clifford operations plus BF \(T\) generate all 51840 elements.
- **Exact but noncanonical:** a basis identification gives a Clifford intertwiner with the two-puncture code.
- **Exact no-go:** the anomaly code exists across primes and does not select \(p=3\).
- **Open:** derivation of the \(A_2\) response and BF level from Furey/Standard-Model observables.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** physical Wilson loops or response observables fix the algebraic BF-to-code basis map and its orientation.

**Level trigger:** the Standard-Model/Furey boundary action derives the \(A_2\) lattice or BF coefficient three independently of code dimension.

**Group-size falsifier:** the BF modular pair alone is claimed to equal \(Sp(4,\mathbb F_3)\); its actual image has order 24.

**Entanglement falsifier:** BF modular \(S\) is called the new entangler despite its local-Fourier-plus-swap decomposition.

**Prime-selection falsifier:** anomaly cancellation alone is said to predict qutrits despite the prime-parametric code family.

## 9. Certificate

The [BF/code Clifford comparison certificate](scripts/verify_bf_modular_pair_embeds_in_two_qutrit_clifford_but_does_not_select_prime_three.mjs) verifies the decomposition of BF \(S\), the order-24 modular image, membership and nonmembership in the order-1152 local-plus-swap subgroup, and completion to the order-51840 full symplectic group.

## Companion documents

- [Level-three BF source model](465_level_three_bf_theory_realizes_the_hyperbolic_two_qutrit_carrier_and_its_missing_mutual_phase.md)
- [Unique two-\(A_2\) quadratic interface](464_there_is_a_unique_nontrivial_quadratic_interface_between_two_a2_qutrits_and_the_response_selects_its_class.md)
- [Two-puncture finite \(Sp(4)\) shadow](450_two_punctures_produce_an_exact_finite_sp4_shadow_but_do_not_select_the_spin23_real_carrier.md)
- [Standard-Model triorthogonal code](410_standard_model_triorthogonal_code_bridge_and_golay_integrality_gate.md)
- [Finite cross-port completion](456_one_cross_port_shear_completes_the_finite_sp4_and_realizes_the_three_relationships_pattern.md)
