# The \(Spin(10)\) \(16\,16\,10\) Clebsch Tensor Supplies the \(F_Cp\) Relative Minus, but Also Restores the Third Edge and Diquark Channels

**Date:** 18 October 2026  
**Branches:** five-mode Clifford algebra, \(Spin(10)\) vector bilinear, Pati–Salam \(SU(2)_R\), \(S_1\) Wilson matching, proton stability  
**Claim status:** exact finite-dimensional representation theorem in a declared Clifford convention; viable broken-phase action remains open  
**Certificate:** [derive_the_spin10_16_16_10_Clebsch_sign_for_the_two_S1_channels.mjs](../../../verification/derive/derive_the_spin10_16_16_10_Clebsch_sign_for_the_two_S1_channels.mjs)

## Executive result

The phase gate left open by document 1072 closes positively at representation level.

Construct the positive-chirality spinor \(\mathbf{16}_+\) as the even Fock space of five fermionic modes and the vector \(\mathbf{10}\) through ten Clifford generators. In the convention

\[
\Gamma_{2j-1}=a_j+a_j^\dagger,
\qquad
\Gamma_{2j}=i(a_j^\dagger-a_j),
\]

\[
C=\Gamma_2\Gamma_4\Gamma_6\Gamma_8\Gamma_{10},
\]

the ten bilinear matrices

\[
C\Gamma_A
\]

are symmetric. Their even-even restriction is the unique vector channel

\[
\operatorname{Sym}^2(\mathbf{16}_+)\longrightarrow\mathbf{10}.
\]

For every colour \(i=1,2,3\), its isotropic vector components obey

\[
\boxed{
\frac{\mathcal B_{10}(d_i^c,\nu^c)}
{\mathcal B_{10}(u_i^c,e^c)}=-1,
\qquad
\frac{\mathcal B_{10}(d_i,\nu)}
{\mathcal B_{10}(u_i,e)}=-1.}
\]

Thus the invariant contains the two epsilon contractions

\[
ue-d\nu,
\qquad
u^ce^c-d^c\nu^c,
\]

up to common component phases and field-order conventions. Multiplying the two vertices gives the exact opposite orientation between

\[
\mathcal Q_{ue}=(QL)(u^ce^c)
\]

and

\[
\mathcal Q_{\nu d}=(QL)(d^c\nu^c)
\]

required by the established \(F_Cp\) response convention.

The result is not a complete microscopic derivation. The same unified invariant also restores precisely the structures that the proton-safer isolated \(S_1\) model removed:

- one mediator copy still generates the right–right third Wilson edge;
- the full \(Spin(10)\) vector contains diquark as well as leptoquark couplings;
- puncture and GUT breaking must transmit the Clebsch relation without leaving excluded baryon violation.

The relative sign has been found. The price of protecting it is now explicit.

## 1. Exact Clifford construction

Let \(a_j,a_j^\dagger\), \(j=1,\ldots,5\), obey the CAR. The ten Euclidean Clifford generators above satisfy

\[
\Gamma_A^2=I,
\qquad
\Gamma_A\Gamma_B=-\Gamma_B\Gamma_A
\quad(A\ne B).
\]

The certificate verifies all ten squares and all 45 distinct anticommutators exactly using Gaussian-integer phases.

The Fock space has dimension 32 and splits by parity:

\[
\mathcal F=\mathcal F_{\rm even}\oplus\mathcal F_{\rm odd},
\qquad
\dim\mathcal F_{\rm even}=\dim\mathcal F_{\rm odd}=16.
\]

Identify

\[
\mathbf{16}_+=\mathcal F_{\rm even}.
\]

The charge-conjugation operator \(C\) flips Fock parity, as does each \(\Gamma_A\), so \(C\Gamma_A\) preserves parity. Direct calculation gives

\[
(C\Gamma_A)^T=C\Gamma_A
\]

for all ten directions. Hence

\[
\mathcal B_A(\psi,\chi)=\psi^T C\Gamma_A\chi
\]

is symmetric on \(\mathbf{16}_+\), matching

\[
\mathbf{16}\otimes\mathbf{16}
=\mathbf{10}_s\oplus\mathbf{120}_a\oplus\mathbf{126}_s.
\]

The computation therefore uses the correct \(\mathbf{10}_s\) channel rather than inserting an epsilon sign by hand.

## 2. Five-sign field identification

For an even Fock state with occupations \(n_j\), use

\[
q_j=1-2n_j.
\]

This reproduces the Prakash–Ramya five-sign weights. In particular,

\[
q(\nu^c)=(+,+,+,+,+),
\qquad
q(e^c)=(+,+,+,-,-),
\]

and for each colour coordinate \(i\),

\[
q(u_i^c)+q(e^c)=+2e_i,
\qquad
q(d_i^c)+q(\nu^c)=+2e_i,
\]

\[
q(u_i)+q(e)=-2e_i,
\qquad
q(d_i)+q(\nu)=-2e_i.
\]

Both pairs on each side therefore couple to the same isotropic vector-weight component. Their relative coefficient is meaningful inside the chosen invariant tensor.

## 3. Isotropic vector components

For mode \(i\), combine the two real vector directions as

\[
\mathcal B_i^\pm
=\mathcal B_{2i-1}\pm i\mathcal B_{2i}.
\]

Exactly one isotropic branch is nonzero for a pair with sum \(+2e_i\), and the opposite branch is nonzero for sum \(-2e_i\). This is the vector analogue of creation versus annihilation weight.

The raw common phase depends on colour through the chosen ordered Fock basis, but the ratio within each right-isospin pair does not:

\[
\mathcal B_i^-(d_i^c,\nu^c)
=-\mathcal B_i^-(u_i^c,e^c).
\]

Likewise,

\[
\mathcal B_i^+(d_i,\nu)
=-\mathcal B_i^+(u_i,e).
\]

These equations hold for all three colours. Rephasing the vector component multiplies both entries by the same phase and leaves each ratio unchanged.

## 4. Pati–Salam meaning

Under

\[
Spin(10)\supset SU(4)\times SU(2)_L\times SU(2)_R,
\]

\[
\mathbf{16}=(\mathbf4,\mathbf2,\mathbf1)
\oplus(\bar{\mathbf4},\mathbf1,\mathbf2),
\]

\[
\mathbf{10}=(\mathbf6,\mathbf1,\mathbf1)
\oplus(\mathbf1,\mathbf2,\mathbf2).
\]

The colored \(S_1\)-type mediator lies in the \((\mathbf6,\mathbf1,\mathbf1)\). Its coupling to two left fields contracts their \(SU(2)_L\) indices with \(\epsilon_L\); its coupling to two right-conjugate fields contracts their \(SU(2)_R\) indices with \(\epsilon_R\). The two certified signs are exactly those alternating tensors:

\[
\epsilon_L QL=ue-d\nu,
\]

\[
\epsilon_R Q^cL^c=u^ce^c-d^c\nu^c.
\]

Document 1072 found the Weyl reflection exchanging the two right components. The present calculation lifts that support permutation to the actual invariant tensor and recovers the alternating sign.

## 5. Matching the \(F_Cp\) arms

Write the relevant unified current schematically as

\[
J_{-i}\propto u_ie-d_i\nu,
\qquad
J_{+i}\propto u_i^ce^c-d_i^c\nu^c.
\]

Exchange of the vector component produces

\[
J_{-i}J_{+i}
\propto
(QL)(u_i^ce^c)
-(QL)(d_i^c\nu^c).
\]

Therefore

\[
C_{\nu d}=-C_{ue}
\]

at the unified Clebsch level, with equal magnitude in the symmetry limit.

This is the precise orientation required in document 1061 after fixing the shared field and response conventions. A simultaneous rephasing of the vector mediator changes neither the ratio nor the effective product.

The sign is an invariant-tensor orientation, not by itself a CP-odd observable. Independent rephasings of matter fields transform the displayed component coefficients and the named response basis together. Its physical content emerges only when the Furey/code labelling, ordinary Yukawa sector and puncture fix a common frame.

## 6. Why the pure pulse is still not derived

The positive Clebsch result solves only the relative two-arm coefficient problem.

### 6.1 The third Wilson edge

A single scalar coupled to

\[
B_L,
\qquad B_u,
\qquad B_d
\]

has a rank-one Gram matching matrix. Integrating it out generates not only

\[
B_LB_u,
\qquad B_LB_d,
\]

but also the right–right relation joining \(B_u\) and \(B_d\). The \(Spin(10)\) invariant fixes the desired relative sign but does not evade the rank-one theorem of document 1062.

Thus

\[
\text{correct orientation}
\not\Rightarrow
\text{pure sparse }F_Cp\text{ pulse}.
\]

### 6.2 Diquark partners

The \(SU(4)\) antisymmetric \(\mathbf6\) does not distinguish “safe leptoquark” from all of its unified partners. The same \(16_F16_F10_H\) tensor contains the color and baryon-number-related components required by the full multiplet.

The separate assignments of \(B(S_1)\) and \(L(S_1)\) used to forbid diquark couplings in the isolated low-energy model are not symmetries of the complete \(Spin(10)\) invariant.

Therefore a viable implementation needs a splitting or projection mechanism and a quantitative proton-decay audit.

### 6.3 Puncture breaking

The \(SU(2)_R\) relation pairs \(e^c\) with \(\nu^c\), while the physical code construction singles out \(\nu^c\) as the removed logical coordinate. The low-energy theory must explain how the Clebsch relation survives sufficiently in the Wilson coefficients even though the puncture breaks the exchanger symmetry.

## 7. Consequence for the grand synthesis

The latest chain is now

\[
\boxed{
\begin{aligned}
&\text{five-mode }\mathbf{16}_+
\xrightarrow{\ C\Gamma_A\ }
\text{oriented }\mathbf{10}\text{ current},\\
&\epsilon_R:
u^ce^c-d^c\nu^c,\\
&\text{vector exchange}
\longrightarrow
C_{\nu d}=-C_{ue},\\
&\text{response descent}
\longrightarrow
F_Cp,\\
&\{\text{compact turn, split dilation, }F_Cp\}
\longrightarrow
\mathfrak{sp}_4(\mathbb R)\cong\mathfrak{so}(2,3).
\end{aligned}}
\]

The first three lines now have an explicit representation-level realization. The fourth still requires a low-energy effective action that removes or controls the extra channels while preserving the normalized response generator.

This is a much narrower frontier than “derive \(Spin(2,3)\) from \(Spin(10)\).” The exact remaining question is whether symmetry breaking can retain one oriented relational residue without retaining the whole dangerous unified multiplet.

## 8. Stop-everything and falsification criteria

**Clebsch falsifier:** in the declared Clifford convention, obtain equal rather than opposite coefficients for \((u_i^c,e^c)\) and \((d_i^c,\nu^c)\). The exact certificate excludes this.

**Low-energy trigger:** construct a broken-phase mediator mass matrix whose Schur complement retains

\[
C_{\nu d}=-C_{ue}
\]

while eliminating the unwanted right–right Wilson block.

**Proton-stability trigger:** demonstrate a missing-partner, discrete-symmetry or high-scale mechanism suppressing every diquark-induced decay channel consistently with the same Clebsch tensor.

**Puncture trigger:** derive the \(\nu^c\)-selecting order parameter and show that its threshold corrections preserve the oriented coefficient ratio.

**Strong negative result:** prove that every \(Spin(10)\)-compatible splitting which suppresses the third edge or diquark sector also destroys the equal-and-opposite two-arm relation. Then the unified route to a pure \(F_Cp\) pulse closes.

**Phase warning:** do not call the Clebsch minus intrinsic CP violation. It is an oriented invariant-tensor sign in a fixed field basis.

## 9. Verdict

| Question | Result |
|---|---|
| Is the vector bilinear on \(\mathbf{16}_+\) symmetric? | yes, all ten \(C\Gamma_A\) |
| Does it give \(ue-d\nu\)? | yes |
| Does it give \(u^ce^c-d^c\nu^c\)? | yes |
| Does it supply equal-and-opposite \(F_Cp\) arms? | yes, at unified Clebsch level |
| Does one mediator give the pure sparse pulse? | no |
| Is proton safety automatic? | no |
| Remaining decisive object | the broken-phase mediator Schur complement |

The previously underived relative sign is now an exact \(Spin(10)\) Clebsch sign. The research frontier moves from “where could the sign come from?” to “can symmetry breaking preserve the sign while removing everything else the same invariant demands?”

## Forward result

The first broken-phase test gives a general no-go and a minimal repair. Any number of positive-metric mediator copies preserving \(\lambda_d=-\lambda_u\) obey \(C_{ud}=-\|\lambda_u\|_K^2\), so identical complete \(\mathbf{10}\) copies can never remove the third edge. A two-copy repair exists only after twisting the relation to \(\lambda_d=-D\lambda_u\) with a split involution; it realizes the pure star exactly but a shared-leg \(P_+\) correction regenerates \(C_{ud}=-\alpha/2\). See [document 1074](1074_positive_Spin10_Clebsch_preserving_copies_can_never_remove_the_third_edge_but_a_twisted_two_copy_involution_can.md).

## Position in the corpus

- [the exact \(D_5\) puncture-exchanger coset](1072_exactly_twelve_D5_Weyl_elements_exchange_the_two_S1_channels_and_all_swap_the_nu_c_and_e_c_punctures.md)
- [the punctured-code grade split](1071_the_standard_model_code_separates_the_two_S1_FCp_channels_into_stabilizer_and_logical_sectors.md)
- [minimal \(S_1\) completion and open phase](1061_the_minimal_sm_field_completion_of_the_furey_channel_pulse_is_a_pair_of_dimension_six_S1_exchange_operators_with_an_underived_relative_phase.md)
- [one-mediator third-edge theorem](1062_one_S1_mediator_cannot_generate_a_pure_FCp_pulse_but_two_orthogonal_copies_realize_the_exact_oriented_star.md)
- [full \(SO(10)\) vector factorization of code logicals](../0400-0499/446_all_25_code_logicals_factor_through_the_so10_vector_10_but_12_require_colored_mediators.md)
