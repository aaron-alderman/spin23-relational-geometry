# The Majorana Alignment Obstruction Requires a Charged-Lepton Weak-Basis Invariant and Is High Spurion Order

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B05, B06, B08, B09, B11, B13, B14 and the Majorana weak-basis completion branch  
**Claim status:** exact weak-basis-invariant completion and spurion count; local response matching remains open  
**Certificate:** [verify_majorana_weak_basis_invariant_completion_and_spurion_order.mjs](scripts/verify_majorana_weak_basis_invariant_completion_and_spurion_order.mjs)  
**Primary references:** [Branco, Lavoura and Rebelo, *Majorana neutrinos and CP violation in the leptonic sector*](https://doi.org/10.1016/0370-2693(86)90307-2); [Yu and Zhou, *Weak-basis invariants and CP conservation in the leptonic sector with Majorana neutrinos*](https://arxiv.org/abs/2010.08758)

## Executive result

Document 717 used

\[
\operatorname{Im}
\left[
(m_\nu)_{ii}(m_\nu)_{jj}
\bigl((m_\nu)_{ij}^*\bigr)^2
\right]
\]

as a two-family Majorana CP diagnostic. It is invariant under diagonal lepton rephasings in the charged-lepton mass basis. It is not by itself a full weak-basis invariant under arbitrary unitary flavor rotations.

The response programme must therefore use a weak-basis completion containing the charged-lepton spurion.

Define

\[
H_\ell=M_\ell M_\ell^\dagger,
\qquad
H_\nu=m_\nu m_\nu^\dagger,
\]

and

\[
G_{\ell\nu}
=m_\nu H_\ell^*m_\nu^\dagger.
\]

Then

\[
\boxed{
\mathcal I_2
=
\operatorname{ImTr}
\left(H_\ell H_\nu G_{\ell\nu}\right)
}
\]

is a CP-odd weak-basis invariant.

The executable certificate verifies:

- a nonzero value for a complex symmetric two-family Majorana matrix;
- invariance under a generic complex unitary weak-basis rotation;
- preservation of the symmetry of \(m_\nu\);
- and vanishing for a real CP-conserving example.

This strengthens the Majorana obstruction while also suppressing it: a basis-independent odd coefficient is necessarily cross-sector and high order in flavor spurions.

## 1. Weak-basis transformations

Under a unitary change of the left-handed lepton basis,

\[
m_\nu
\longmapsto
W^\dagger m_\nu W^*,
\]

\[
H_\ell
\longmapsto
W^\dagger H_\ell W.
\]

It follows that

\[
H_\nu
\longmapsto
W^\dagger H_\nu W,
\]

and

\[
G_{\ell\nu}
\longmapsto
W^\dagger G_{\ell\nu}W.
\]

Therefore

\[
\operatorname{Tr}
(H_\ell H_\nu G_{\ell\nu})
\]

is invariant by cyclicity.

Its imaginary part changes sign under CP and vanishes for CP-conserving real data.

## 2. Why the charged-lepton spurion is essential

Majorana mixing is physical only relative to the charged-current and charged-lepton flavor frame. The neutrino matrix alone does not define that frame under a general weak-basis transformation.

The fixed-basis pair invariant of document 717 is useful after diagonalizing \(M_\ell\). The weak-basis invariant \(\mathcal I_2\) packages the same kind of physical phase information without choosing that basis.

This revises the response target:

\[
\text{odd Majorana response}
\not\propto
\text{a function of }m_\nu\text{ alone}.
\]

It must also depend on charged-lepton flavor data.

## 3. Spurion and mass-dimension count

After electroweak breaking:

\[
[H_\ell]=2,
\qquad
[H_\nu]=2,
\qquad
[G_{\ell\nu}]=4.
\]

Hence

\[
[\mathcal I_2]=8.
\]

In terms of mass/Yukawa insertions, the invariant is:

- quartic in \(m_\nu\);
- quadratic in \(H_\ell\), hence quartic in charged-lepton masses or Yukawa insertions.

In a Weinberg-operator description,

\[
m_\nu\sim v^2 C_5.
\]

The invariant is therefore high order in the dimension-five coefficient and charged-lepton spurions.

This does not prove numerical smallness in every ultraviolet completion, but it rules out treating the Majorana odd response as a leading linear mass effect.

## 4. Revised alignment formula

A basis-independent conditional response should take the form

\[
r_{\rm up}
=
\left(
E_{\rm up},
F_M\,\mathcal I_2
\right),
\]

\[
r_{\rm down}
=
\left(
E_{\rm down},
F_d\,\mathcal I_2
\right),
\]

where \(F_M,F_d\) contain the remaining source and dimensionful matching data.

Then

\[
\Delta_{\rm align}
=
\mathcal I_2
\left(
E_{\rm up}F_d
-F_M E_{\rm down}
\right).
\]

The one-sided form used in document 717 corresponds to \(F_d=0\).

The weak-basis completion does not remove the obstruction. It makes its required input more restrictive.

## 5. Relation to known Majorana invariant sets

The literature uses several CP-odd weak-basis invariants. A commonly discussed set includes

\[
\mathcal I_1
=\operatorname{Tr}[H_\nu,H_\ell]^3,
\]

\[
\mathcal I_2
=\operatorname{ImTr}(H_\ell H_\nu G_{\ell\nu}),
\]

\[
\mathcal I_3
=\operatorname{Tr}[G_{\ell\nu},H_\ell]^3.
\]

\(\mathcal I_1\) is Dirac/Jarlskog-like. The invariants involving \(G_{\ell\nu}\) are sensitive to Majorana structure.

The vanishing of one invariant is not generally sufficient for full CP conservation. The response programme needs only a certified CP-odd coefficient candidate, but it must not equate one invariant with a complete classification of leptonic CP.

## 6. Consequence for the octonion response modules

Although the Majorana mass belongs to the up/neutral module, its basis-independent CP information depends on the charged-lepton frame in the down/charged module.

This is an important correction:

\[
\boxed{
\text{Majorana CP is neutral-sector mass data but cross-module relational information.}
}
\]

The crossed octonion decomposition is therefore not two independent response sources. Physical CP already sews them through the charged-current flavor frame.

## 7. Stress-response boundary

Even a nonzero \(\mathcal I_2\) is only a coefficient candidate. A local response term still requires:

- a gauge- and Lorentz-invariant source operator;
- the correct Furey conjugation parity;
- appropriate inverse powers of the seesaw or response scale;
- and compatibility with the stress–pseudoscalar no-go.

If \(\Gamma_u\) is a spacetime pseudoscalar in a vacuum two-point stress kernel, the matching form factors vanish despite \(\mathcal I_2\ne0\).

## 8. Stop-everything criteria

Stop treating the fixed-basis pair invariant as a fully weak-basis-invariant EFT coefficient.

Stop claiming a Majorana odd response linear in \(m_\nu\); the certified invariant completion is much higher spurion order.

Stop equating \(\mathcal I_2=0\) with full leptonic CP conservation; a set of invariants is required in general.

Stop the Majorana misalignment branch if no permitted local source operator matches any CP-odd weak-basis invariant into \(\Gamma_u\).

## 9. Highest-value next calculations

1. Enumerate local gauge- and Lorentz-invariant source operators that could multiply \(\mathcal I_2\Gamma_u\).
2. Determine the inverse mass scale required by dimensional analysis.
3. Test whether the Furey TRO response naturally produces \(G_{\ell\nu}=m_\nu H_\ell^*m_\nu^\dagger\).
4. Compute whether response-line alignment is preserved across the complete Majorana invariant set.
5. Relegate the obstruction to higher-point or non-vacuum response if the stress two-point matching vanishes.

## Companion documents

- [Conditional Majorana alignment obstruction](717_a_majorana_cp_invariant_exists_with_two_families_and_generically_misaligns_the_up_neutral_response_if_it_matches_the_odd_axis.md)
- [Channel-local even-axis alignment](716_channel_local_hermitian_yukawa_kernels_align_on_the_even_clifford_axis_while_cp_odd_misalignment_requires_cross_channel_flavor_data.md)
- [Stress–pseudoscalar two-point no-go](711_symmetric_stress_cannot_linearly_source_a_spacetime_pseudoscalar_in_a_lorentz_invariant_vacuum_but_furey_odd_is_not_yet_spacetime_odd.md)
- [Conditional reopening by a CP-odd flavor spurion](719_a_cp_odd_flavor_spurion_conditionally_reopens_the_vacuum_stress_odd_response_but_does_not_supply_the_furey_parity_intertwiner.md)
