# The Graded Sideband Antiunitary Lifts the Six-Cycle to a Nested C12 → C6 → C3 Transport

**Date:** 18 October 2026  
**Branches:** placement cycle, sideband double cover, quaternionic antiunitary, central phase, and coherent transport  
**Claim status:** exact nested-lift construction conditional on one graded interface per placement step  
**Certificate:** [build_the_nested_c12_c6_c3_lift_from_placement_transport_and_the_graded_sideband_antiunitary.mjs](../../../verification/build/build_the_nested_c12_c6_c3_lift_from_placement_transport_and_the_graded_sideband_antiunitary.mjs)

## Executive result

Document 995 classified the unique connected placement double cover as a six-cycle. Document 969 independently constructed the graded sideband antiunitary

\[
\Gamma=\varepsilon K,
\qquad
\Gamma^2=-I.
\]

These structures fit, but not by identifying (Gamma) directly with an ordinary order-two deck operator. It is a quaternionic lift of that deck operation.

Let (C_{\rm pl}) be the three-placement cycle and assign one (Gamma) interface to each placement step. On the combined realified carrier define

\[
\boxed{\mathcal T=C_{\rm pl}\otimes\Gamma_{\mathbb R}.}
\]

Then

\[
\boxed{
\mathcal T^3=-\widehat\delta,
\qquad
\mathcal T^6=-I,
\qquad
\mathcal T^{12}=I,
}
\]

where

\[
\widehat\delta=I_3\otimes\Gamma_{\mathbb R},
\qquad
\widehat\delta^2=-I
\]

is the coherent antiunitary lift of the sheet deck transformation.

Thus the hierarchy is

\[
\boxed{
C_{12}\ \longrightarrow\ C_6\ \longrightarrow\ C_3,
}
\]

where the first quotient forgets the central amplitude sign and the second forgets the sideband sheet.

## 1. Realification of the graded interface

For (z=x+iy\in\mathbb C^2),

\[
\Gamma z=\varepsilon\bar z.
\]

On ((x,y)\in\mathbb R^4), its real matrix is

\[
\Gamma_{\mathbb R}
=\begin{pmatrix}
\varepsilon&0\\
0&-\varepsilon
\end{pmatrix}.
\]

It satisfies

\[
\Gamma_{\mathbb R}^2=-I_4,
\qquad
\Gamma_{\mathbb R}^4=I_4.
\]

Projectively, (Gamma) is an order-two sheet exchange. Coherently, it is order four because two exchanges accumulate the central sign.

## 2. Combined placement step

The placement cycle obeys

\[
C_{\rm pl}^3=I_3.
\]

Since the placement and sideband factors act on separate tensor factors,

\[
\mathcal T^n=C_{\rm pl}^n\otimes\Gamma_{\mathbb R}^n.
\]

Therefore

\[
\mathcal T^3
=I_3\otimes\Gamma_{\mathbb R}^3
=-I_3\otimes\Gamma_{\mathbb R}
=-\widehat\delta,
\]

and

\[
\mathcal T^6
=I_3\otimes\Gamma_{\mathbb R}^6
=-I_{12}.
\]

Only after twelve steps does the coherent amplitude return exactly.

## 3. The three levels

### Population placement level: (C_3)

Forget the coherent sheet and central phase. The remaining action is the original three-placement cycle.

### Projective sideband-cover level: (C_6)

Retain the sheet but identify amplitudes differing by the central sign. Then (-I) is invisible and the combined step has order six. This is exactly the canonical six-cycle of document 995.

### Coherent amplitude level: (C_{12})

Retain the sideband interface and central phase. The sixth power is (-I), so a second six-step circuit is required.

The nested structure is therefore not three independent cycles fitted together. Each is a quotient of the one above it.

## 4. Match to the dicyclic lift

The coherent reflection lifts of document 992 obey

\[
X^2=-I.
\]

The coherent deck lift here obeys the same relation,

\[
\widehat\delta^2=-I.
\]

Thus the dicyclic reflection extension and the quaternionic sideband cover share the same central generator. One appears in reflection composition; the other in repeated deck transport.

This closes a cross-branch identification:

\[
\boxed{
Z_{\rm dicyclic}
=-I
=\Gamma^2
=\widehat\delta^2
=\mathcal T^6.
}
\]

## 5. Physical interpretation and boundary

The construction strongly supports sideband/orientation typing of the double-cover sheet. The local sheet-changing operator already present in the response theory has precisely the required projective order two and coherent square (-I).

Document 997 supplies an explicit local, conservative effective-field realization: on real response fields, impose \(q_{n+1}=\varepsilon q_n\) and \(p_{n+1}=\varepsilon p_n\). Fourier reality turns this matching into one \(\Gamma=\varepsilon K\) sewing per edge. The remaining burden is microscopic rather than kinematic: derive those real response fields and the \(\varepsilon=DX\) boundary condition from Furey/Higgs/Standard-Model dynamics.

No claim is made that the twelve-dimensional realified construction introduces twelve matter states. It is a transport representation on placement labels times the four-real-dimensional response carrier.

## 6. Stop-everything and falsification tests

**Local-interface trigger:** derive one (Gamma=\varepsilon K) insertion on every elementary placement arrow from a Furey/Higgs boundary term.

**Transport trigger:** the microscopic composition law reproduces (mathcal T^6=-I) and (mathcal T^{12}=I).

**Common-center trigger:** identify the dicyclic central sign and quaternionic antiunitary square as the same operator on the full physical carrier.

**Assignment falsifier:** placement transport does not apply (Gamma), or applies inequivalent antiunitaries on different edges without the stated relations.

**Order falsifier:** the proposed coherent lift closes after six steps while retaining the central sign.

**Dimension warning:** tensor-product representation dimension is interpreted as a particle multiplicity.

## Verdict

| Question | Verdict |
|---|---|
| Does (Gamma) projectively implement a sheet flip? | **Yes** |
| What is its coherent square? | **(-I)** |
| What is the combined coherent cycle order? | **12** |
| What remains after quotienting (-I)? | **The canonical (C_6) cover** |
| What remains after forgetting the sheet? | **Placement (C_3)** |
| Is one \(\Gamma\) per placement edge realized effectively? | **Yes** |
| Is that interface microscopically derived? | **Not yet** |

## Position in the corpus

- [canonical six-cycle placement cover](995_the_unique_connected_double_cover_of_the_placement_triangle_is_the_six_cycle_with_sideband_as_deck_parity.md)
- [graded quaternionic sideband interface](969_the_graded_sideband_interface_preserves_pfaffian_alignment_and_is_a_quaternionic_antiunitary_with_square_minus_identity.md)
- [dicyclic coherent placement lift](992_the_coherent_two_face_response_is_a_dicyclic_central_lift_of_the_placement_weyl_groupoid.md)
- [non-split placement cocycle](993_the_dicyclic_placement_lift_has_a_nontrivial_parity_square_cocycle_that_only_local_sideband_reversal_can_cancel.md)
- [local conservative real-interface network](997_a_local_conservative_real_interface_network_realizes_the_nested_c12_transport_as_antiperiodic_six_cycle_holonomy.md)
