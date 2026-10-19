# The Neutrino Puncture Pair Supplies a Primitive Fixed Complement, but Neither Known Furey Exchange Supplies the Handle

**Date:** 17 October 2026  
**Branches:** puncture/restoration, neutrino response, Furey exchange, integral carrier completion, and gauge dressing  
**Claim status:** exact support-lattice theorem and exchange no-go; broken-phase response realization remains open  
**Certificate:** [test_neutrino_puncture_pair_as_fixed_complement_and_known_exchanges_as_handle.mjs](../../../verification/test/test_neutrino_puncture_pair_as_fixed_complement_and_known_exchanges_as_handle.mjs)

## Executive result

The pair

\[
(\nu^c,\nu)
\]

supplies exactly the primitive color-fixed rank-two lattice complement required by the conditional completion theorem.

Adjoining its two coordinate axes to the incidence-selected active lattice gives a primitive rank-four sublattice of the completed sixteen-state generation. Color acts as

\[
I_2\oplus
\begin{pmatrix}
1&3\\-1&-2
\end{pmatrix}.
\]

However:

- the raw pair is not gauge neutral before electroweak breaking because \(\nu\) belongs to the weak lepton doublet;
- the Dirac Weyl exchange does not preserve the completed rank-four lattice;
- the neutral Furey topology exchange acts as the identity on its field labels.

Thus the complement has been found at support-lattice level, but the required handle involution has not.

## 1. Primitive rank-four completion

Let

\[
F_\nu=\mathbb Ze_{\nu^c}\oplus\mathbb Ze_\nu
\]

and let \(L_{\rm inc}\subset\mathbb Z^{15}\) be the saturated incidence-selected active lattice. Embed \(L_{\rm inc}\) into the full sixteen-coordinate lattice by assigning zero to the restored \(\nu^c\) coordinate.

Then

\[
L_\nu=F_\nu\oplus L_{\rm inc}
\subset\mathbb Z^{16}
\]

has rank four. The gcd of all \(4\times4\) minors of an explicit basis matrix is one, so

\[
\boxed{L_\nu\text{ is primitive in }\mathbb Z^{16}.}
\]

Both neutrino axes are color fixed, and the active summand carries the certified integral \(C_3\) block.

This closes the purely integral complement-existence gate.

## 2. Unbroken gauge obstruction

In the paper's left-handed conventions,

\[
\nu^c:\quad Y=0,\quad 2T_{3L}=0,
\]

while

\[
\nu:\quad Y=-\frac12,\quad 2T_{3L}=1.
\]

Therefore the raw coordinate plane \(F_\nu\) is not a gauge-singlet response plane in the unbroken Standard Model.

A Higgs-dressed neutral combination can repair this after symmetry breaking. Schematically,

\[
\widetilde H^\dagger L
\]

selects the neutrino component covariantly, and the right-handed singlet remains \(\nu^c\). But this introduces the Higgs background, its normalization and its zeros.

The present result is therefore:

- unconditional as an integral color-fixed support lattice;
- conditional as a physical gauge-neutral response complement.

## 3. Dirac Weyl exchange fails

The exact Dirac exchange is

\[
S_D(q_1,q_2,q_3,q_4,q_5)
=(-q_1,-q_2,-q_3,q_4,-q_5).
\]

It swaps

\[
S_D\nu^c=\nu,
\qquad
S_D\nu=\nu^c.
\]

This looks promising on the fixed complement. But on the selected colored plane it gives:

\[
S_D(L_{\rm inc})\cap L_{\rm inc}=\{0\}
\]

over \(\mathbb Q\). The two active planes are transverse, and the full four-lattice \(L_\nu\) is not invariant under \(S_D\).

So the Dirac exchange is a Pauli \(X\) on the eight Dirac pairs of the full generation, but it is not the handle involution exchanging the fixed and incidence-selected modes.

## 4. Neutral topology exchange also fails

The completed-module neutral \(D\leftrightarrow E\) exchange intertwines the Standard-Model representation while preserving every named five-bit state. Consequently its induced action on

\[
F_\nu\oplus L_{\rm inc}
\]

is simply

\[
I_4.
\]

It constructs an exchange between two topology realizations of each field, not an exchange between the neutrino complement and the active incidence mode.

This precisely agrees with the earlier result that the neutral exchange makes the two faces but cannot supply the noncommuting relationship generator.

## 5. Why no contradiction arises

Three distinct operations must remain separate:

1. **Dirac exchange:** swaps each weak singlet-conjugate state with its weak-doublet partner;
2. **neutral topology exchange:** swaps \(D,E\) endpoint realizations while fixing particle labels;
3. **selector handle \(H\):** exchanges the two response modes of the rank-four symplectic carrier.

Their dimensions and involutive character are similar, but their intertwining relations differ. Only the third satisfies the required noncommuting relation with the active color block.

## 6. Consequence of gauge covariance

If the active \(C_3\) is interpreted directly as microscopic color cycling, a gauge-invariant linear operator cannot map a color-fixed neutrino plane to a nontrivial color-Weyl doublet. This is another form of the commuting-generator obstruction.

Therefore the physical \(H\) must be one of:

- a background-changing response operation;
- a bilocal contraction followed by transfer-space action;
- a Higgs/Yukawa-dressed nonmonomial map;
- a boundary or holonomy operation;
- an exchange between already gauge-singlet composite response modes.

It cannot be an ordinary unbroken internal gauge symmetry on the matter coordinates.

## 7. Stop-everything and falsification criteria

**Positive Higgs trigger:** the Higgs-dressed neutrino response and the incidence-selected colored response form a primitive integral two-mode lattice, and the polar-dressed exchange induces the transported \(H\).

**Bilocal trigger:** two covariant source legs produce the same four-lattice, with their leg swap acting as the required handle involution after color contraction.

**Boundary trigger:** an oriented sewing of the \((u,e)\) and \((d,\nu)\) Furey matter cycles realizes the off-diagonal integral \(H\).

**Negative trigger:** every gauge-covariant dressing remains block diagonal between the neutrino and incidence-selected response sectors.

**Falsifier:** identifying either known exchange with \(H\) solely because it squares to one. Their certified actions differ.

## 8. Verdict

The complement question has a split answer:

\[
\boxed{
(\nu^c,\nu)
\text{ supplies the primitive fixed lattice,}
\qquad
\text{but not yet the physical fixed response or }H.
}
\]

The remaining construction must be broken-phase, bilocal, boundary-based or otherwise response-level.

## 9. Dependencies

- [conditional integral completion](865_a_fixed_rank_two_complement_and_handle_exchange_complete_the_incidence_mode_to_a_unique_unimodular_symplectic_selector.md)
- [topology Pauli pair](../0600-0699/693_weak_isospin_squared_supplies_the_exact_topology_parity_and_nuc_puncturing_breaks_the_pauli_pair.md)
- [Higgs/Yukawa-polar dressed exchange](../0600-0699/695_a_higgs_and_yukawa_polar_dressed_dirac_exchange_closes_the_pauli_algebra_without_erasing_ckm_cp.md)
- [neutral Furey exchange](../0600-0699/618_the_neutral_furey_exchange_intertwines_the_completed_standard_model_module.md)
- [commuting-generator obstruction](838_commuting_microscopic_color_and_handle_exchange_cannot_descend_to_R_and_H_and_the_central_repair_loses_the_singlet_lines.md)

