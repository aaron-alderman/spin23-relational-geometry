# Prakash–Ramya Re-entry: the Code Rigidifies the Puncture but Not the Response Arrow

**Date:** 17 October 2026  
**Primary source:** Shiroman Prakash and K. L. Ramya, [“One generation of the Standard Model as a quantum error-correcting code,” arXiv:2610.21879v1](https://arxiv.org/abs/2610.21879v1)  
**Branches:** B01, B03, B04, B07, B09, B10, B11, B12, B13 and B14  
**Claim status:** source theorem plus previously certified finite checks; the comparison with the current response-arrow frontier is a programme-level consequence, not a claim of the paper

## Executive result

Prakash and Ramya prove an exact identity between two cubic consistency conditions:

\[
\text{cubic gauge-anomaly cancellation}
\quad\Longleftrightarrow\quad
\text{triorthogonality of the integral charge lattice}.
\]

For the positive-chirality spinor \(\mathbf{16}\) of \(SO(10)\), the weights are the even-parity sign vectors in \(\{\pm1\}^5\). Removing the weight of the conjugate right-handed neutrino \(\nu^c\) produces a \([[15,1,3]]_p\) triorthogonal code for every prime \(p\). The removed coordinate is the logical qudit; the fifteen retained Weyl fields are the physical qudits; and the logical transversal phase is the cubic anomaly that the missing field would cancel.

At the present research frontier this has a sharp two-part verdict:

\[
\boxed{
\begin{aligned}
\text{strongly supported:}&\quad
16\text{-state integral shell}\to15\text{-state punctured matter sector},\\
\text{not supplied:}&\quad
\text{sign, phase, residue or normalization of the }H_2\text{ response arrow}.
\end{aligned}}
\]

The paper therefore rigidifies the **state incidence and cubic consistency** side of the programme. It does not remove the response-kernel freedom exposed in Cycles 493–494.

## 1. What is exact in the paper

For chiral fermions with charge words \(x,y,z\), define

\[
\tau_c(x,y,z)=\sum_\ell c_\ell x_\ell y_\ell z_\ell .
\]

The same trilinear form is read in two ways:

1. over \(\mathbb Z\), \(\tau_c=0\) is cancellation of all cubic and mixed Abelian anomalies on the Cartan charge lattice;
2. modulo a prime \(p\), \(\tau_c=0\) is the defining triorthogonality condition enabling a transversal third-level Clifford-hierarchy gate.

For one \(SO(10)\) generation, the sixteen charge vectors are

\[
q\in\{\pm1\}^5,
\qquad
\prod_{i=1}^5q_i=1.
\]

They obey

\[
\sum_q q_iq_jq_k=0,
\qquad
\sum_q q_iq_j=16\delta_{ij}.
\]

Puncturing \(\nu^c=(1,1,1,1,1)\) gives distance three. No one or two retained columns span the punctured charge vector, while three do. A minimum logical error therefore corresponds to a neutral four-field charge relation containing \(\nu^c\).

For \(p=2\), the five occupation bits and the all-one word generate the triply-even code \(RM(1,4)\); puncturing gives the Bravyi–Kitaev fifteen-qubit code. For \(p=3\), the authors' exhaustive search proves that the resulting \([[15,1,3]]_3\) code is shortest and unique up to equivalence, with monomial automorphism group \(S_5\times\mathbb Z_2\).

## 2. Why the result lands directly on the Furey branch

The programme independently obtained:

- a mirror-free, anomaly-free fifteen-dimensional Furey matter TRO;
- a unique neutral ternary completion interpreted as \(\nu^c\);
- an exact labelling of the completed sixteen matrix units by the five-bit \(SO(10)\) weights;
- an intertwiner between Cartan charges and two-sided linking actions;
- exact compatibility of the five-bit grading with all nonzero TRO products.

The paper supplies an external arithmetic meaning for precisely the same 16-to-15 operation:

\[
\boxed{
\text{completed Furey generation}
\longleftrightarrow
\text{integral anomaly-free shell},
\qquad
\text{minimal 15-state TRO}
\longleftrightarrow
\text{punctured code}.}
\]

This is a strong compatibility statement, not an identity of categories. A ternary operator space, a chiral representation, and a CSS code carry different operations. The already-constructed intertwiner is what makes the comparison substantive; shared dimensions alone would not.

## 3. The paper's doubling theorem and the relational-carrier language

The code has an exact doubled presentation:

- seven conjugate right-handed fields form one \([[7,1,3]]^P_p\) copy;
- seven Dirac partners form the second copy;
- the neutrino is the seed;
- weak isospin \(2T_{3L}\) is the linking row;
- colour and electric charge are vectorlike across the paired copies.

This is the cleanest external realization yet of the programme's phrase “two faces plus one chiral relation.” It explains how one generation can be paired under the unbroken vectorlike charges while its weak chirality resides in a linking datum.

It does **not** identify code doubling with Jordan-triple recursion. To make that step one would need a functorial map carrying the doubled-code operations into the Peirce faces and ternary product of the response carrier.

## 4. Why it does not select the response-arrow sign

Cycle 493 proved that the unique charged-lepton factor and cyclic Yukawa incidence select an electron response channel but leave a phase holonomy and arbitrary normalization. Cycle 494 then showed for the free fixed-helicity Dirac projector

\[
P_+(k,m)=\frac12\left(I+\frac{k\sigma_z+m\sigma_x}{\sqrt{k^2+m^2}}\right)
\]

that

\[
\sigma_zP_+(k,m)\sigma_z=P_+(k,-m).
\]

Thus the two population faces are fixed while the off-diagonal arrow changes sign. In one channel the two signs are related by a face-preserving unitary basis change.

The Prakash–Ramya code does not break this equivalence:

1. its primary data are charge columns and a cubic form, not a normalized two-point function;
2. code equivalence permits column permutations and nonzero column rescalings (monomial equivalence);
3. the binary code forgets signs entirely;
4. the odd-prime construction controls a logical cubic phase, not the pole residue of a propagator;
5. the doubled presentation pairs Dirac charges but does not choose a sign convention for a Dirac mass or a phase convention for a Yukawa coefficient.

Therefore the new paper agrees with, rather than repairs, the recent boundary:

\[
\boxed{
\text{incidence and anomaly are rigid; one-channel arrow orientation is conventional.}}
\]

Only a **relative** phase among several cycles, or a Ward-normalized interacting kernel tied to a common source, can become basis-independent.

## 5. Do not identify three different cubic structures

The paper's form is the coordinatewise charge cubic

\[
\tau_c(x,y,z)=\sum_\ell c_\ell x_\ell y_\ell z_\ell.
\]

The programme also contains:

- the polarized determinant on an exceptional Jordan algebra;
- cubic cycle amplitudes in a TRO/linking graph;
- cubic phase polynomials for transversal code gates.

The paper proves a direct identity only between the first and anomaly cancellation. A bridge to an exceptional Jordan norm requires an explicit map \(\Phi\) and a verified polarization equation. A bridge to a Yukawa cycle requires an operator map, not merely a shared degree.

## 6. The genuine symplectic datum is the logical Pauli commutator

The code contains two conceptually different structures:

1. the cubic phase responsible for the transversal non-Clifford gate;
2. the alternating commutator pairing between logical \(X\)- and \(Z\)-operators.

Earlier calculations proved that the puncture phase factorizes and has zero mixed finite difference. It therefore cannot provide the missing mutual shear on the stationary plane. The logical Pauli algebra, however, has a nondegenerate symplectic form by construction.

The highest-value next map is consequently

\[
\Phi_{\rm stat}:Q/R\longrightarrow V_{\rm logical}
\]

with

\[
\omega_{\rm logical}
\bigl(\Phi_{\rm stat}(e_0),\Phi_{\rm stat}(e_4)\bigr)=1.
\]

This would connect the two stationary lift directions to a source-native Heisenberg pair. It must be derived from puncture, glue, or field-label data. An abstract isomorphism between two two-dimensional binary spaces is not enough.

## 7. Updated open paths

### Path A — relative Yukawa-cycle holonomy

Use the completed Furey linking graph's two independent flavour cycles. Quotient all vertex rephasings and determine whether their relative holonomy is nontrivial and whether it survives code automorphisms.

**Stop-everything result:** the relative holonomy maps to the invisible Gaussian candidate difference or to the logical Pauli commutator.

### Path B — code/glue symplectic transport

Construct the field-labelled map from puncture logicals to the discriminant-glue Heisenberg quotient and test it on \(e_0,e_4\).

**Stop-everything result:** the transport is equivariant and produces the missing unit pairing without a chosen basis.

### Path C — Ward-normalized multi-channel kernel

Build interacting electron and quark two-point functions with a shared conserved source, contact terms, and spectral normalization. Test only relative residues and phases.

**Stop-everything result:** a common Ward identity fixes a basis-independent relative arrow invariant.

### Path D — signed integral Golay lift

Continue the paper's stated obstruction: the ordinary ternary Golay coefficients are all positive and do not lift to an anomaly-free integral spectrum. Search for a mixed-sign integral distance-five \(P\)-lattice with \(|N|=1\).

**Stop-everything result:** an exceptional or Leech-derived signed polarization supplies the required integral lift.

## 8. Falsification and discipline

- The paper does not derive \(Spin_0(2,3)\) or \(Sp(4,\mathbb R)\).
- It does not show that particles are literal hardware qudits undergoing active error correction.
- It does not identify the anomaly cubic with the exceptional Jordan determinant.
- It does not fix masses, Yukawa couplings, propagator residues or the sign of a one-channel Dirac mass.
- Its qutrit automorphism group is \(S_5\times\mathbb Z_2\), not the Monster.
- Its mention of Golay doubling is accompanied by an integral-sign obstruction, not a Leech/Monster derivation.

## 9. Current judgement

This paper is one of the strongest external supports for the programme's **finite arithmetic skeleton**. It verifies that five-bit occupation data, cubic consistency, the sterile-neutrino completion and the fifteen-state puncture belong to one exact construction.

It also clarifies where that skeleton ends. The transition from a charge code to the positive two-face response is not controlled by the cubic anomaly phase. The next bridge must use the code's alternating logical commutator, a relative multi-cycle phase, or a normalized physical kernel.

## Certificates and prior source audits

- [Initial paper audit and Golay gate](410_standard_model_triorthogonal_code_bridge_and_golay_integrality_gate.md)
- [Exact Furey five-bit Cartan/ternary intertwiner](412_the_completed_furey_tro_carries_the_so10_five_bit_code_as_a_cartan_ternary_intertwiner.md)
- [Integral cubic to prime-shadow architecture](496_the_standard_model_code_supplies_an_integral_cubic_to_prime_shadow_architecture_but_not_yet_the_spin23_map.md)
- [Two-puncture phase has no mutual shear](503_the_two_puncture_binary_standard_model_code_reproduces_the_diagonal_theta_lift_but_not_the_mutual_shear.md)
- [Cubic polarization and lift-Hessian no-go](564_the_standard_model_code_confirms_the_five_bit_cubic_bridge_but_its_polarization_does_not_pair_the_stationary_plane.md)
- [Local triorthogonality certificate](scripts/verify_standard_model_generation_triorthogonal_code.mjs)
- [Electron-cycle channel-selection boundary](577_the_unique_electron_cycle_selects_the_neutral_response_channel_but_not_its_sign_phase_or_normalization.md)
- [Free Dirac face-fixed sign equivalence](578_the_free_dirac_kernel_realizes_the_finite_faces_but_makes_the_arrow_sign_a_chiral_basis_choice.md)
