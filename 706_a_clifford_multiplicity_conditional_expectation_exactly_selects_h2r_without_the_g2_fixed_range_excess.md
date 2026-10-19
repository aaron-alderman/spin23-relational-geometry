# A Clifford-Multiplicity Conditional Expectation Exactly Selects \(H_2(\mathbb R)\) Without the \(G_2\) Fixed-Range Excess

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B07, B08, B09, B10, B11, B14 and the Jordan/Clifford selector branch  
**Claim status:** exact kinematic selector and completely positive conditional expectation; physical origin of the multiplicity twirl remains open  
**Certificate:** [verify_clifford_multiplicity_twirl_exactly_selects_h2r.mjs](scripts/verify_clifford_multiplicity_twirl_exactly_selects_h2r.mjs)

## Executive result

The ambient fixed-range obstruction found in documents 704 and 705 can be removed by changing the algebra that defines the conditional expectation.

The rank-two exceptional Jordan algebra is a spin factor:

\[
H_2(\mathbb O)\cong V_9=\mathbb R\oplus\mathbb R^9.
\]

Its left-regular \(16\times16\) real realization contains nine symmetric matrices

\[
\Gamma_A,\qquad A=1,\ldots,9,
\]

satisfying

\[
\boxed{
\Gamma_A\Gamma_B+\Gamma_B\Gamma_A
=2\delta_{AB}I_{16}.
}
\]

Choose the two generators corresponding to:

1. the difference of the two diagonal faces; and
2. the real part of the octonionic link.

They are

\[
\Gamma_{\rm face}=Z\otimes I_8,
\qquad
\Gamma_{\rm real}=X\otimes I_8.
\]

The associative algebra they generate is

\[
M_2(\mathbb R)\otimes I_8.
\]

Now apply the completely depolarizing channel only to the eight-dimensional Clifford multiplicity:

\[
\boxed{
\mathcal E_{\rm Cl}
=\operatorname{id}_{M_2}\otimes
\left(A\mapsto\frac{\operatorname{Tr}A}{8}I_8\right).
}
\]

Its full associative fixed range is exactly

\[
M_2(\mathbb R)\otimes I_8,
\]

and its symmetric fixed range is exactly

\[
\operatorname{Sym}_2(\mathbb R)\otimes I_8
\cong H_2(\mathbb R).
\]

This removes the \(21\)-direction finite-\(G_2\) excess and the three-direction Haar-\(G_2\) excess. The price is conceptual clarity: this is not an octonion-automorphism twirl. It is the canonical conditional expectation associated with the selected Clifford subalgebra.

## 1. \(H_2(\mathbb O)\) as the nine-vector spin factor

Write

\[
A=
\begin{pmatrix}
a&z\\
\bar z&b
\end{pmatrix},
\qquad z\in\mathbb O.
\]

Set

\[
t=\frac{a+b}{2},
\qquad
x_0=\frac{a-b}{2}.
\]

Then

\[
A=tI+x_0\Gamma_{\rm face}
+\sum_{\mu=0}^{7}z_\mu\Gamma_\mu,
\]

where \(z=z_0+\sum_{i=1}^7z_ie_i\). The nine-vector is

\[
x=(x_0,z_0,\ldots,z_7)\in\mathbb R^9.
\]

The determinant becomes

\[
\det A=t^2-\|x\|^2.
\]

Thus \(H_2(\mathbb O)\) is the Euclidean spin factor \(V_9\). Its conformal geometry begins with the \((1,9)\) quadratic already derived in document 702.

## 2. Explicit Clifford representation

Let \(L_z\) denote left multiplication by \(z\) on \(\mathbb O\). Define

\[
\Gamma_{\rm face}
=
\begin{pmatrix}
I_8&0\\0&-I_8
\end{pmatrix}
\]

and, for an orthonormal octonion basis \(e_\mu\),

\[
\Gamma_\mu
=
\begin{pmatrix}
0&L_{e_\mu}\\
L_{e_\mu}^{T}&0
\end{pmatrix}.
\]

The composition-algebra norm identities imply

\[
\Gamma_A^T=\Gamma_A,
\qquad
\{\Gamma_A,\Gamma_B\}=2\delta_{AB}I_{16}.
\]

The executable certificate checks all \(81\) anticommutators directly from the Fano multiplication table.

This gives a crucial reinterpretation of the earlier \(16\times16\) dilation. It is not an arbitrary matrix embedding. It is an irreducible real Clifford representation of the rank-two exceptional spin factor.

## 3. The selected two-generator subalgebra

The real link generator is particularly simple because

\[
L_1=I_8.
\]

Hence

\[
\Gamma_{\rm real}
=
\begin{pmatrix}
0&I_8\\I_8&0
\end{pmatrix}
=X\otimes I_8.
\]

Together with

\[
\Gamma_{\rm face}=Z\otimes I_8,
\]

it generates the real two-by-two matrix algebra on the face factor:

\[
\operatorname{Alg}(\Gamma_{\rm face},\Gamma_{\rm real})
=M_2(\mathbb R)\otimes I_8.
\]

Its self-adjoint Jordan part is precisely

\[
\operatorname{span}_{\mathbb R}
\{I_{16},\Gamma_{\rm face},\Gamma_{\rm real}\}
\cong H_2(\mathbb R).
\]

The fourth associative basis element,

\[
\Gamma_{\rm face}\Gamma_{\rm real}
\propto
\begin{pmatrix}0&I\\-I&0\end{pmatrix},
\]

is skew-symmetric and therefore absent from the real observable Jordan algebra.

## 4. Finite exact conditional expectation

Identify the multiplicity space as three rebits:

\[
\mathbb R^8\cong(\mathbb R^2)^{\otimes3}.
\]

For \(a,b\in\mathbb F_2^3\), let

\[
P_{a,b}=X^aZ^b
\]

denote the \(64\) real Pauli signed-permutation matrices. They form an orthogonal error basis and obey

\[
\frac1{64}\sum_{a,b}
P_{a,b}AP_{a,b}^T
=\frac{\operatorname{Tr}A}{8}I_8.
\]

Therefore

\[
\mathcal E_{\rm Cl}(M)
=\frac1{64}\sum_{a,b}
(I_2\otimes P_{a,b})M(I_2\otimes P_{a,b})^T
\]

is completely positive, trace preserving, unital and idempotent.

With Kraus operators

\[
K_{a,b}=\frac18(I_2\otimes P_{a,b}),
\]

one has

\[
\sum_{a,b}K_{a,b}^TK_{a,b}=I_{16}.
\]

The certificate verifies the depolarizing identity on every one of the \(64\) matrix units of \(M_8(\mathbb R)\), not just on sample matrices.

## 5. Exact range theorem

Write any \(16\times16\) matrix as a two-by-two array of eight-by-eight blocks:

\[
M=(M_{pq})_{p,q=1}^2.
\]

Then

\[
\mathcal E_{\rm Cl}(M)_{pq}
=\frac{\operatorname{Tr}M_{pq}}8I_8.
\]

It follows immediately that

\[
\operatorname{Ran}\mathcal E_{\rm Cl}
=M_2(\mathbb R)\otimes I_8.
\]

Unlike the finite \(G_2\) sign twirl, there are no character-dependent blocks. Unlike Haar \(G_2\), there is no independent scalar-versus-imaginary response. The multiplicity factor is fully depolarized.

On symmetric matrices,

\[
\operatorname{Ran}\mathcal E_{\rm Cl}
\cap\operatorname{Sym}_{16}(\mathbb R)
=\operatorname{Sym}_2(\mathbb R)\otimes I_8.
\]

This is exactly the desired three-dimensional carrier.

## 6. Action on \(H_2(\mathbb O)\)

The left-regular encoding is

\[
\iota(A)=
\begin{pmatrix}
aI_8&L_z\\
L_z^T&bI_8
\end{pmatrix}.
\]

Since

\[
\frac18\operatorname{Tr}L_z=\operatorname{Re}z,
\]

the Clifford conditional expectation gives

\[
\boxed{
\mathcal E_{\rm Cl}(\iota(A))
=
\begin{pmatrix}
aI_8&(\operatorname{Re}z)I_8\\
(\operatorname{Re}z)I_8&bI_8
\end{pmatrix}.
}
\]

Thus its Jordan action agrees with the \(G_2\) real-slice selector:

\[
H_2(\mathbb O)\to H_2(\mathbb R).
\]

The difference is entirely in what happens away from the Jordan image. The Clifford channel has the exact small ambient range that the automorphism channels could not achieve.

## 7. What this resolves

The following sequence is now exact:

\[
H_3(\mathbb O)
\xrightarrow{\text{Peirce polarization}}
H_2(\mathbb O)
\cong V_9
\xrightarrow{\mathcal E_{\rm Cl}}
H_2(\mathbb R)
\xrightarrow{\operatorname{Co}}
Sp(4,\mathbb R)
\cong Spin_0(2,3).
\]

The second arrow is:

- Jordan-positive on the carrier;
- completely positive on its Clifford dilation;
- exact on the full associative fixed range;
- finite, using \(64\) real Pauli conjugations;
- and independent of an arbitrary synchronization coefficient \(\kappa\).

This is the strongest kinematic exceptional-to-\(Spin(2,3)\) bridge presently in the programme.

## 8. What it does not resolve

The construction does not yet explain why the particular two-generator Clifford subalgebra is physically selected.

The following remain open:

- why the real octonion link rather than another unit vector in \(\mathbb R^8\) is chosen;
- why the multiplicity Pauli action is a gauge redundancy, noise algebra or fast dynamics;
- whether its generator follows from the parent \(H_3(\mathbb O)\) action;
- how the selected response factor is sewn to Furey's matter module;
- and whether the channel has a Lorentzian local-field realization.

The exact conditional expectation turns those questions into selection and dynamics problems rather than algebraic-existence problems.

## 9. Relation to Furey matter

The three-rebit Pauli twirl must act on the Clifford multiplicity of the **response representation**:

\[
\mathcal H_{\rm response}
\cong\mathbb R^2\otimes\mathbb R^8.
\]

It must not act indiscriminately on the octonionic factor used to construct Furey's internal ideals. Doing so would depolarize precisely the complex/color information that the matter construction needs.

The typed architecture is therefore:

\[
\boxed{
\mathcal H_{\rm total}
=
\mathcal H_{\rm response}^{\rm Cl}
\otimes
\mathcal H_{\rm matter}^{\rm Furey},
}
\]

with the conditional expectation acting as

\[
\mathcal E_{\rm Cl}\otimes\operatorname{id}_{\rm matter}.
\]

Whether the two factors arise from one parent algebra or must be postulated separately is now a primary synthesis question.

## 10. Interpretation: observables versus dilation

This result gives a clean version of the fundamental-Jordan option.

The physical observables can be the spin factor \(H_2(\mathbb O)\), while the associative Clifford algebra is its dilation used to define complete positivity, composition and dynamics. The whole matrix algebra need not be interpreted as additional physical observables.

Alternatively, if the dilation is physical, the multiplicity Pauli twirl is an exact conditional expectation onto the chosen observable subalgebra.

In either interpretation, the unwanted ambient directions are controlled by an algebraic expectation rather than an arbitrary potential extension.

## 11. Stop-everything criteria

Stop or sharply demote this route if:

- the selected two-generator Clifford algebra cannot be derived from the response/matter sewing;
- the multiplicity Pauli action necessarily acts on and erases the Furey matter structure;
- the channel fails locality, covariance or reflection/positivity requirements in a field-theoretic realization;
- radiative dynamics do not preserve the conditional-expectation subalgebra;
- or the proposed noise/gauge action introduces observable multiplicity degrees contrary to experiment.

A particularly decisive failure would be proof that no local covariant Lindblad or constrained Hamiltonian can realize

\[
\operatorname{id}_{M_2}\otimes\operatorname{Depol}_8
\]

without also depolarizing the matter factor.

## 12. Highest-value next calculations

1. Construct an exact Lindblad semigroup whose infinite-time limit is \(\mathcal E_{\rm Cl}\), and derive its finite-time spectrum.
2. Compare its decay rates with the topology-Pauli selector of document 691.
3. Determine the normalizer of the chosen \(Cl_2\) inside the \(Cl_9\) representation and identify the residual selection degeneracy.
4. Test whether Furey's chosen complex octonion unit canonically picks the same real-link Clifford generator through conjugation or response duality.
5. Insert the new exponential convergence scale into the joint inverse-gap/finite-time bound.

## Companion documents

- [Exceptional cubic polarization and the \(G_2\)-fixed real slice](702_the_exceptional_jordan_cubic_polarizes_to_h2o_and_reaches_spin23_only_on_the_g2_fixed_real_slice.md)
- [Finite \(G_2\)-subgroup CP selector](703_an_eight_element_octonion_automorphism_twirl_is_a_cp_dilation_of_the_h2o_to_h2r_selector.md)
- [Finite-selector fixed algebra and synchronization no-go](704_the_finite_g2_selector_fixed_algebra_is_eight_m2_blocks_and_symmetry_alone_cannot_synchronize_them.md)
- [Exceptional-cubic transverse synchronization underdetermination](705_the_exceptional_cubic_does_not_by_itself_fix_the_transverse_synchronization_gap.md)
- [Topology Pauli Lindbladian](691_the_topology_pauli_lindbladian_converges_exactly_to_the_cp_selector_but_depolarizes_the_topology_qubit.md)
- [Joint selector error bound](692_the_full_two_stage_selector_has_a_joint_inverse_gap_and_exponential_time_error_bound.md)
