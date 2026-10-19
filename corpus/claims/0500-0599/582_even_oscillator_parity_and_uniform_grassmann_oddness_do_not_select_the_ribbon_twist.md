# Even Oscillator Parity and Uniform Grassmann Oddness Do Not Select the Ribbon Twist

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B08, B09, B10, B11, B13 and B14  
**Claim status:** exact five-oscillator parity and flag-sign-character no-go; determinant-one gauge lifts and Pfaffian orientation remain open

## Executive result

The first proposed repair of the bare-TRO ribbon no-go was to transport CAR/Koszul parity through the five-bit \(SO(10)\) intertwiner. The calculation separates two notions that must not be conflated:

1. **oscillator occupation parity** labels the spinor representation;
2. **Grassmann parity** governs the statistics of the physical Weyl fields.

For the positive-chirality \(SO(10)\) spinor, all sixteen occupation states have even degree:

\[
\Lambda^{\rm even}\mathbb C^5
=\Lambda^0\oplus\Lambda^2\oplus\Lambda^4,
\qquad
1+10+5=16.
\]

Hence oscillator parity is \(+1\) on every state. Conversely, every physical Weyl field is Grassmann odd, irrespective of its occupation label. Swapping two fermion insertions always gives \(-1\), but a transformation law under reversal is not a choice of preferred order.

Therefore:

\[
\boxed{
\text{neither even occupation parity nor uniform Grassmann oddness selects}
\text{ aligned versus opposite ribbon order}.}
\]

## 1. Exact occupation-degree audit

The even subsets of five oscillator labels have sizes

\[
\binom50=1,
\qquad
\binom52=10,
\qquad
\binom54=5.
\]

They are the \(\mathbf1\oplus\mathbf{10}\oplus\bar{\mathbf5}\) decomposition under \(SU(5)\). Every basis state satisfies

\[
(-1)^{N_{\rm osc}}=+1.
\]

Oscillator parity distinguishes the positive and negative chiral spinor modules. It supplies no binary subdivision inside the sixteen positive-chirality states and cannot orient the \(C,D\) branches.

## 2. Physical Grassmann parity is a different grading

Each component of the generation is a left-handed Weyl field and is Grassmann odd:

\[
|Q|=|u^c|=|d^c|=|L|=|e^c|=|\nu^c|=1\pmod2.
\]

Exchanging two fermionic factors produces the Koszul sign

\[
(-1)^{1\cdot1}=-1.
\]

This holds at both trivalent branch locations. Reversing both local orders gives

\[
(-1)(-1)=+1.
\]

The rule tells us how an already ordered expression changes. It does not declare one of the two orders to be positive. A preferred sign requires an orientation line, ordered measure, Pfaffian convention or boundary orientation.

## 3. The Standard-Model flag has nontrivial sign characters

Fixing \(\nu^c\) and \(e^c\) leaves the pointwise five-bit permutation stabilizer

\[
S_3\times S_2.
\]

There are three obvious orientation characters:

\[
\operatorname{sgn}_c,
\qquad
\operatorname{sgn}_w,
\qquad
\operatorname{sgn}_5=\operatorname{sgn}_c\operatorname{sgn}_w.
\]

Exhausting all twelve elements finds for each character:

\[
6\text{ elements with }+1,
\qquad
6\text{ elements with }-1.
\]

None of these nontrivial one-dimensional sign representations contains a nonzero invariant vector under the bare permutation group. Thus an oscillator volume sign or separate colour/weak permutation orientation is not a flag-invariant scalar.

## 4. Why actual gauge groups may still repair the problem

The permutation group is only the Weyl shadow of the continuous gauge group. An odd permutation matrix has determinant \(-1\), so representing it inside \(SU(3)\) or \(SU(2)\) requires a compensating phase. The invariant epsilon tensors

\[
\epsilon_{abc},
\qquad
\epsilon_{ij}

\]

are preserved by the determinant-one lifts even though their coordinate components change sign under bare odd permutations.

This creates a precise next gate:

1. construct the actual determinant-one lift of the \(S_3\times S_2\) flag action on the completed Furey TRO;
2. track the compensating phases through the two Yukawa branch vertices;
3. compare the induced colour and weak epsilon lines;
4. test whether Furey conjugation aligns or opposes them.

The repair is plausible because it introduces phase data absent from the bit permutation action. It is not yet established, and arbitrary phase choices would merely hide the original ambiguity.

## 5. Relation to anomalies and Pfaffians

For a fermion path integral, orientation ultimately belongs to the determinant or Pfaffian line of the kinetic/Yukawa operator, not to a list of representation weights. Anomaly cancellation ensures consistency of the gauge action on the quantum measure, but it does not automatically trivialize every finite-dimensional ribbon-orientation line.

A physically meaningful selector should therefore be sought in one of two equivalent-looking forms:

- an equivariant trivialization of the relevant fermion determinant/Pfaffian line;
- a gauge-invariant epsilon contraction whose phase agrees at the two branch vertices.

This also explains why the code's cubic anomaly data can rigidify the state shell while failing to choose the response-arrow orientation.

## 6. Updated dependency chain

\[
\begin{aligned}
\text{bare TRO}&\not\Rightarrow\text{ribbon order},\\
\text{occupation parity}&\not\Rightarrow\text{ribbon order},\\
\text{uniform Grassmann parity}&\not\Rightarrow\text{preferred sign},\\
\text{bare }S_3\times S_2\text{ flag}&\not\Rightarrow\text{invariant orientation line},\\
SU(3)\times SU(2)\text{ determinant-one lift}
&\longrightarrow\text{next live selector gate}.
\end{aligned}
\]

## 7. Stop-everything and falsification criteria

### Stop-everything

1. The determinant-one lifts force compensating phases whose product selects the aligned genus-one ribbon class.
2. The same phase equals the glue Heisenberg commutator and the quartic Gaussian orientation.
3. The fermionic Pfaffian line supplies an anomaly-compatible, basis-independent trivialization with that sign.

### Falsification boundaries

- Oscillator occupation parity is not physical Grassmann parity.
- Uniform odd statistics gives a swap rule, not a preferred ordering.
- A sign character is not an invariant scalar when the group acts nontrivially on its line.
- Choosing phases for odd permutation lifts by hand is not a derivation.
- Anomaly cancellation alone does not prove a canonical Pfaffian orientation.

## 8. Certificate

The [five-oscillator parity selector audit](../../../verification/verify/verify_five_oscillator_parity_does_not_select_ribbon_orientation.mjs) enumerates the sixteen even occupation states, checks their \(1+10+5\) degree distribution and uniform even parity, exhausts the twelve-element \(S_3\times S_2\) flag group, and verifies that its colour, weak and total orientation characters are all nontrivial with equal positive and negative fibers.

## Companion documents

- [Bare-TRO ribbon-orientation no-go](581_the_bare_furey_tro_cannot_choose_the_genus_one_ribbon_orientation.md)
- [Two-cycle ribbon-symplectic fork](580_the_two_furey_cycles_have_a_relative_holonomy_but_only_a_ribbon_twist_makes_them_symplectic.md)
- [Five-bit Cartan–ternary intertwiner](../0400-0499/412_the_completed_furey_tro_carries_the_so10_five_bit_code_as_a_cartan_ternary_intertwiner.md)
- [Pointwise Standard-Model flag stabilizer](../0400-0499/451_the_nu_c_e_c_two_puncture_stabilizer_selects_the_sm_3_plus_2_flag_but_acts_trivially_on_logical_phase_space.md)
