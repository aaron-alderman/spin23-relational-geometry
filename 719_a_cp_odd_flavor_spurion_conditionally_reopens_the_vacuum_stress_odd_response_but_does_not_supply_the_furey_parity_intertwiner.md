# A CP-Odd Flavor Spurion Conditionally Reopens the Vacuum Stress Odd Response, but Does Not Supply the Furey Parity Intertwiner

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09, B11, B13, B14 and the stress/flavor parity-sewing branch  
**Claim status:** exact conditional tensor construction; physical Furey-to-spacetime sewing remains open  
**Certificate:** [verify_cp_odd_spurion_conditionally_reopens_stress_pseudoscalar_two_point.mjs](scripts/verify_cp_odd_spurion_conditionally_reopens_stress_pseudoscalar_two_point.mjs)

## Executive result

Document 711 proved a correct conditional no-go: with one momentum and **no parity-odd background**, a symmetric stress tensor cannot have a nonzero two-point kernel with a genuine spacetime pseudoscalar.

Document 718 supplies a possible missing background. The weak-basis invariant

\[
I_2=\operatorname{ImTr}(H_\ell H_\nu m_\nu H_\ell^*m_\nu^\dagger)
\]

is odd under CP. If the response coordinate \(\Gamma_u\) is sewn to a CP-odd Lorentz-scalar operator with compatible charge-conjugation character, then the product \(I_2\Gamma_u\) is CP even. A vacuum response is no longer excluded by the no-odd-background premise.

The conserved symmetric tensor is

\[
\boxed{
\Pi^{(u)}_{\mu\nu}(q)
=
I_2 F_u(q^2)
\left(q_\mu q_\nu-q^2\eta_{\mu\nu}\right)
}
\]

and obeys \(q^\mu\Pi^{(u)}_{\mu\nu}=0\).

This reopens a path. It does **not** prove that Furey conjugation oddness is spacetime CP odd, that \(F_u\ne0\), or that the effect is measurable.

## 1. What changes in the earlier no-go

The epsilon construction remains zero:

\[
\epsilon_{\mu\alpha\nu\beta}q^\alpha q^\beta=0.
\]

No new pseudotensor has appeared. Instead, the CP-odd flavor invariant supplies the transformation character that was previously absent. Multiplying it by the ordinary transverse tensor gives the appropriate overall character for a correlator with a CP-odd scalar operator.

Thus the two statements are compatible:

\[
I_2=0\quad\Longrightarrow\quad
\Pi^{(u)}_{\mu\nu}=0
\quad\text{under the assumptions of document 711},
\]

while

\[
I_2\ne0\quad\Longrightarrow\quad
\Pi^{(u)}_{\mu\nu}\text{ is symmetry-allowed but not forced}.
\]

## 2. The required parity ledger

The proposed term needs all three entries below:

| datum | required status |
|---|---|
| \(I_2\) | weak-basis scalar and CP odd |
| physical operator represented by \(\Gamma_u\) | Lorentz scalar with the matching CP-odd character |
| \(F_u(q^2)\) | gauge invariant, CP even apart from the displayed spurion, and nonzero |

Only the first row is presently certified.

Furey conjugation acts internally on \(\operatorname{span}_{\mathbb R}\{1,u\}\). It is not automatically Lorentz parity, charge conjugation or CP. The missing map is still

\[
\Xi:\Gamma_u\longmapsto\mathcal O_{\rm odd}(x).
\]

This document identifies what \(\Xi\) must accomplish; it does not manufacture it.

## 3. EFT order and likely suppression

After electroweak breaking, \([I_2]=8\). If the physical response operator has engineering dimension \(d_u\), then a local Lagrangian term

\[
\Delta\mathcal L
=c_u I_2\mathcal O_u
\]

requires

\[
[c_u]=4-(8+d_u)=-(d_u+4).
\]

Writing \(c_u=\widehat c_u/\Lambda^{d_u+4}\) exposes the suppression scale. The programme cannot quote a unique power of \(\Lambda\) until \(\mathcal O_u\) is identified.

For a dimensionless collective response coordinate, the minimum displayed suppression is \(\Lambda^{-4}\). For an elementary pseudoscalar field of dimension one it is \(\Lambda^{-5}\). These are bookkeeping cases, not claims that either operator exists in the present model.

## 4. Consequence for response-line alignment

The earlier response vector becomes

\[
r_{\rm up}(q^2)
=
\left(E_{\rm up}(q^2),F_u(q^2)I_2\right).
\]

The down/charged module may also inherit the same relational invariant because \(I_2\) already contains \(H_\ell\). Therefore “Majorana data live only in the neutral octonion” is too strong. What is neutral-local is \(m_\nu\); what is physical is the cross-module invariant.

A one-sided response remains possible, but must be demonstrated by the operator matching rather than inferred from where the mass matrix is stored.

## 5. Branch tree

### Path A — the parity intertwiner exists and \(F_u\ne0\)

Then the CP spurion activates the odd response at high flavor order. Universal up/down response requires a dynamical alignment relation, not just a shared Jordan cone.

### Path B — the parity intertwiner exists but \(F_u=0\) in vacuum

The branch moves to higher-point amplitudes, boundaries, matter backgrounds or spacetime-dependent spurions. The exact \(H_2(\mathbb R)\) carrier survives on its even axis in vacuum.

### Path C — Furey oddness maps to an internal scalar, not spacetime CP oddness

The stress no-go is irrelevant, but a different internal selection rule is required. Flavor CP cannot be used merely by analogy.

### Path D — no gauge-compatible \(\Xi\) exists

Pin the Majorana odd-response branch. The weak-basis invariant remains valid Standard-Model data but is not a source for the proposed Clifford coordinate.

## 6. Stop-everything criteria

Stop using document 711 as an unconditional exclusion once a certified CP-odd spurion is admitted.

Stop treating symmetry allowance as a nonzero matching calculation: \(I_2\ne0\) does not imply \(F_u\ne0\).

Stop assigning a suppression power without specifying the engineering dimension of the response operator.

Stop identifying Furey conjugation with CP unless an explicit gauge-, Lorentz- and CAR-compatible intertwiner is written down.

## 7. Highest-value next calculations

1. Construct candidate gauge-invariant local operators \(\mathcal O_u\) and give their Lorentz, C, P and CP characters.
2. Compute whether the exchanged-TRO response produces the ordered word \(m_\nu H_\ell^*m_\nu^\dagger\).
3. Match the first nonzero form factor \(F_u(q^2)\), including loop and chirality-flip order.
4. Test the same construction for the quark Jarlskog invariant and compare suppression orders.
5. Carry the branch to higher-point and medium response if the vacuum coefficient vanishes.

## Companion documents

- [Weak-basis completion of the Majorana obstruction](718_the_majorana_alignment_obstruction_requires_a_charged_lepton_weak_basis_invariant_and_is_high_spurion_order.md)
- [Conditional stress–pseudoscalar two-point no-go](711_symmetric_stress_cannot_linearly_source_a_spacetime_pseudoscalar_in_a_lorentz_invariant_vacuum_but_furey_odd_is_not_yet_spacetime_odd.md)
- [Projective CP invariant of the mixed response line](712_a_mixed_clifford_response_line_has_a_projective_cp_odd_invariant_and_requires_an_odd_cross_kernel.md)
