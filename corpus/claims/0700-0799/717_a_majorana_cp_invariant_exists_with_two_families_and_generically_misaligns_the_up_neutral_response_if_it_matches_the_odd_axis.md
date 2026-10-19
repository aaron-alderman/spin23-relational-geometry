# A Majorana CP Invariant Exists with Two Families and Generically Misaligns the Up/Neutral Response If It Matches the Odd Axis

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B05, B06, B08, B09, B11, B13, B14 and the Majorana response-alignment branch  
**Claim status:** exact rephasing invariant and conditional alignment obstruction; stress/Clifford matching coefficient remains unproved  
**Certificate:** [verify_majorana_cp_invariant_generically_misaligns_up_and_down_octonion_responses.mjs](../../../verification/verify/verify_majorana_cp_invariant_generically_misaligns_up_and_down_octonion_responses.mjs)

> **Weak-basis status revision:** the pair invariant used here is invariant under diagonal rephasings in the charged-lepton mass basis, not under arbitrary weak-basis rotations. A fully weak-basis-invariant response coefficient requires the charged-lepton completion developed in [document 718](718_the_majorana_alignment_obstruction_requires_a_charged_lepton_weak_basis_invariant_and_is_high_spurion_order.md).

## Executive result

The even-axis alignment theorem of document 716 applies to channel-local Hermitian Dirac-type kernels. Majorana neutrino data introduce an earlier possible CP-odd obstruction.

For a complex symmetric light-neutrino Majorana matrix \(m_\nu\), the quantity

\[
\boxed{
\mathcal I_{ij}^{M}
=
\operatorname{Im}
\left[
(m_\nu)_{ii}(m_\nu)_{jj}
\bigl((m_\nu)_{ij}^{*}\bigr)^2
\right]
}
\]

is invariant under independent lepton-doublet rephasings

\[
(m_\nu)_{ij}
\longmapsto
e^{i(\alpha_i+\alpha_j)}(m_\nu)_{ij}.
\]

It can be nonzero with only two families. This contrasts with the Dirac Jarlskog-type commutator invariant, which requires three.

The Majorana matrix belongs to the up/neutral Higgs-selected module:

\[
\mathcal O_{\rm up}
=\{\nu,\nu^c,u,u^c\}.
\]

If \(\mathcal I^M\) matches into its odd Clifford response while the down/charged module remains even, then

\[
r_{\rm up}
=(E_{\rm up},F_M\mathcal I^M),
\qquad
r_{\rm down}
=(E_{\rm down},0),
\]

and

\[
\boxed{
\Delta_{\rm align}
=-E_{\rm down}F_M\mathcal I^M.
}
\]

This is generically nonzero. A Majorana CP-odd response confined to the neutral module would therefore obstruct one universal \(Spin(2,3)\) response line.

The conclusion is conditional: the existence of the flavor invariant does not prove \(F_M\ne0\).

## 1. Why the invariant is rephasing invariant

Under

\[
\nu_i\mapsto e^{i\alpha_i}\nu_i,
\]

the symmetric mass matrix transforms as

\[
(m_\nu)_{ij}
\mapsto
e^{i(\alpha_i+\alpha_j)}(m_\nu)_{ij}.
\]

Therefore

\[
(m_\nu)_{ii}(m_\nu)_{jj}
\mapsto
e^{2i(\alpha_i+\alpha_j)}
(m_\nu)_{ii}(m_\nu)_{jj},
\]

while

\[
\bigl((m_\nu)_{ij}^*\bigr)^2
\mapsto
e^{-2i(\alpha_i+\alpha_j)}
\bigl((m_\nu)_{ij}^*\bigr)^2.
\]

The phases cancel in their product.

The certificate applies a generic independent rephasing and verifies the imaginary part is unchanged.

## 2. Family-count boundary

With one family there is no pair \(i<j\), so no invariant of this form exists. The single Majorana mass phase can be absorbed into the one available field convention for this purpose.

With two families there is one pair and \(\mathcal I_{12}^M\) can already be nonzero.

With three families there are three pair invariants, subject to relations with the full mixing data.

Thus:

\[
\boxed{
\text{Majorana response CP can appear before Dirac CKM-type CP in family count.}
}
\]

## 3. Relation to the type-I seesaw branch

Earlier documents established that:

- a Majorana mass reduces the polar exchange freedom;
- a one-sided type-I seesaw breaks exact topology exchange;
- seesaw decoupling selects one face rather than implementing the topology twirl.

The present result adds a response consequence. Majorana data are localized in the neutral/up Higgs channel, so any odd response they generate is naturally one-sided with respect to the crossed octonion decomposition.

This makes alignment more difficult, not easier.

## 4. Conditional matching into the Clifford odd axis

The flavor invariant is a scalar under weak-basis redefinitions. To rotate the response line, it must multiply an operator with the correct Furey conjugation and spacetime transformation law:

\[
\mathcal L_{\rm match}
\supset
F_M\mathcal I^M\,\Gamma_u\,\mathcal O_{\rm source}.
\]

The coefficient \(F_M\) depends on:

- the source operator;
- loop order;
- seesaw masses or the Weinberg-operator scale;
- Higgs insertions;
- and whether \(\Gamma_u\) is a spacetime scalar or pseudoscalar.

No such nonzero matching has yet been derived.

## 5. Stress-channel boundary

If \(\Gamma_u\) is a genuine spacetime-pseudoscalar response, the vacuum stress two-point no-go of document 711 forces

\[
F_M=0
\]

in that channel.

If \(\Gamma_u\) is merely internal-conjugation odd but spacetime scalar, the no-go does not apply.

The missing Furey-to-spacetime parity intertwiner again controls whether the potential obstruction is active.

## 6. Ways to restore alignment

If \(F_M\mathcal I^M\ne0\), alignment can survive only if one of the following holds:

1. the down/charged response receives an odd term with exactly the same projective ratio;
2. a common response rotation acts on both modules and makes the relative determinant vanish;
3. a symmetry forbids the Majorana odd matching despite \(\mathcal I^M\ne0\);
4. the neutral and charged modules couple to distinct carriers rather than one universal \(H_2(\mathbb R)\);
5. or the Majorana phases are CP conserving.

Options 1 and 2 require an actual cross-channel sewing mechanism.

## 7. Universal-carrier falsification gate

The alignment determinant is now a sharp falsification observable for any proposed response kernel:

\[
\Delta_{\rm align}
=
r_{u,e}r_{d,o}
-r_{u,o}r_{d,e}.
\]

For a universal \(Spin(2,3)\) carrier:

\[
\boxed{
\Delta_{\rm align}=0
}
\]

must hold including Dirac and Majorana flavor corrections.

A calculated, source-normalized nonzero value would falsify the single-line response branch unless a larger carrier is introduced.

## 8. Stop-everything criteria

Stop claiming Majorana phases force response misalignment unless a nonzero \(F_M\) is derived.

Stop claiming leading even alignment is universally stable if the theory permits an unmatched neutral-sector odd counterterm.

Stop the single-carrier branch if a physical, radiatively stable \(\Delta_{\rm align}\ne0\) is obtained.

Stop using the one-generation code alone to constrain Majorana CP; its one-family invariant set is empty.

## 9. Highest-value next calculations

1. Classify the lowest-dimension source operator that can multiply \(\mathcal I^M\Gamma_u\).
2. Include the charged-lepton matrix and construct a complete weak-basis invariant set.
3. Test whether the Furey TRO product maps Majorana pair invariants into the odd response line.
4. Compute the renormalization of \(\Delta_{\rm align}\) in a seesaw effective theory.
5. Keep the leading one-generation even-aligned branch separate from the multi-family Majorana branch.

## Companion documents

- [Channel-local even-axis alignment](716_channel_local_hermitian_yukawa_kernels_align_on_the_even_clifford_axis_while_cp_odd_misalignment_requires_cross_channel_flavor_data.md)
- [Type-I seesaw selects one face](../0600-0699/699_type_i_seesaw_decoupling_selects_one_face_and_cannot_be_the_topology_twirl.md)
- [Majorana mass and topology exchange](../0600-0699/698_a_majorana_mass_reduces_takagi_phase_freedom_but_a_type_i_seesaw_breaks_exact_topology_exchange.md)
- [Stress–pseudoscalar no-go](711_symmetric_stress_cannot_linearly_source_a_spacetime_pseudoscalar_in_a_lorentz_invariant_vacuum_but_furey_odd_is_not_yet_spacetime_odd.md)
