# The Prakash–Ramya Qutrit Gate and \(\mathbb Z_9\) Baryon Triality Share a Ternary Shadow but Are Inequivalent Ninth-Root Lifts

**Date:** 18 October 2026  
**Primary source:** Shiroman Prakash and K. L. Ramya, [*One generation of the Standard Model as a quantum error-correcting code*, arXiv:2610.21879v1](https://arxiv.org/abs/2610.21879v1)  
**Branches:** triorthogonal code, baryon triality, ninth-root refinement, Majorana breaking, three-generation anomaly cancellation  
**Claim status:** exact charge-lattice and code-role comparison; no identification of the logical qutrit with a particle triality sector  
**Certificate:** [separate_prakash_ramya_logical_ninth_root_from_z9_baryon_triality_lift.mjs](scripts/separate_prakash_ramya_logical_ninth_root_from_z9_baryon_triality_lift.mjs)

## Executive result

The new \(\mathbb Z_9\) protector and the Prakash–Ramya qutrit gate display the same three phases,

\[
\operatorname{diag}(1,\zeta_9,\zeta_9^{-1}),
\qquad
\zeta_9=e^{2\pi i/9}.
\]

That equality is real, but it does **not** identify the two operators.

The paper's gate acts on the logical basis of the qutrit obtained by puncturing \(\nu^c\). The proton-protecting \(\mathbb Z_9\) acts fieldwise on lepton, quark and antiquark sectors. Their common mod-three reduction is a **hypercharge gauge stabilizer**, not the logical coordinate and not by itself the faithful baryon-triality quotient.

The exact synthesis is instead:

\[
\boxed{
3(B-L)\equiv3B\pmod3,
\qquad
3B=3(B-L)+3L,
}
\]

so the two constructions share one gauge-trivial ternary shadow but choose inequivalent lifts modulo nine.

Those lifts implement a precise physical trade:

| lift | one-family weak coefficient | \(\nu^c\nu^c\) charge mod 9 |
|---|---:|---:|
| \(3(B-L)\) | \(0\) | \(6\) |
| \(3B\) | \(3\) | \(0\) |

The integral \(SO(10)\) lift is anomaly free per family but is broken by the Majorana order parameter. The quark-number lift preserves that order parameter but becomes weak-instanton invariant only after summing three generations:

\[
3\times3=9=0\pmod9.
\]

This is the clean relation among the paper, baryon triality and the new companion-protection branch.

## 1. The exact ternary stabilizer

Write the sixteen \(Spin(10)\) spinor weights as even-parity sign vectors

\[
q=(q_1,\ldots,q_5)\in\{\pm1\}^5.
\]

Prakash and Ramya use these five Cartan rows as the integral parent of the code. On every named Standard-Model state,

\[
q_1+q_2+q_3=3(B-L).
\]

Its sector values are

\[
\begin{array}{c|rrrrrr}
&Q&u^c&d^c&L&e^c&\nu^c\\ \hline
3(B-L)&1&-1&-1&-3&3&3.
\end{array}
\]

Modulo three this becomes

\[
(1,-1,-1,0,0,0),
\]

which is also \(6Y\bmod3\). Since the removed \(\nu^c\) coordinate has value zero modulo three, this row belongs to the puncture stabilizer subspace.

Therefore:

\[
\boxed{\text{the common mod-three row is a gauge stabilizer, not the qutrit logical }X.}
\]

It is one of the exact ternary stabilizer charges under which the puncture is neutral. Observable baryon triality instead arises from the order-nine extension modulo its gauge cube; a fieldwise quotient representative is \(B-2Y\), as derived in document 1092.

## 2. Why the identical phase spectrum is not an operator identity

For \(p=3\), the paper's logical non-Clifford gate is

\[
U_{\rm logical}
=\operatorname{diag}(1,\zeta_9,\zeta_9^{-1}).
\]

Its basis labels are logical values \(a=0,1,-1\in\mathbb F_3\), and the phase is the ninth-root cubic refinement \(\zeta_9^{a^3}\).

The field symmetry is

\[
U_{3B}\psi_f=\zeta_9^{,3B_f}\psi_f.
\]

Its three labels are the field charges

\[
3B_f=0,1,-1
\]

for leptons, quarks and antiquarks. Since \(a^3=a\) for these integer representatives, both operators have the same three eigenvalues.

But they act on different spaces:

- \(U_{\rm logical}\) acts on the encoded qutrit after puncturing;
- \(U_{3B}\) acts diagonally on fermion species and their scalar tensor products;
- the first is a protected logical gate;
- the second is a candidate global/discrete gauge symmetry.

A shared phase polynomial does not supply an intertwiner between the two Hilbert spaces.

## 3. The mod-nine lift fork

The code's integral \(SO(10)\) lattice singles out

\[
X_{SO(10)}=3(B-L).
\]

The Majorana-compatible protector instead uses

\[
X_B=3B.
\]

Their difference is

\[
X_B-X_{SO(10)}=3L.
\]

This vanishes modulo three but not modulo nine. Thus the mod-three code sees only their common hypercharge-gauge shadow, whereas the ninth-root theory distinguishes their global quotient actions.

The full sector table is

\[
\begin{array}{c|rrrrrr}
&Q&u^c&d^c&L&e^c&\nu^c\\ \hline
3(B-L)&1&-1&-1&-3&3&3\\
3B&1&-1&-1&0&0&0\\
3L&0&0&0&3&-3&-3.
\end{array}
\]

This is not an arbitrary rephasing. It changes precisely the weak-instanton and Majorana sectors.

## 4. Anomaly versus Majorana neutrality

For one family the weak-instanton coefficient is

\[
\mathcal A_2=3q_Q+q_L.
\]

For \(3(B-L)\),

\[
\mathcal A_2=3(1)-3=0.
\]

For \(3B\),

\[
\mathcal A_2=3(1)+0=3\pmod9.
\]

Thus the \(SO(10)\) lift is anomaly free for each generation, while the baryonic lift requires exactly three identical generations.

Conversely, the Majorana bilinear carries twice the \(\nu^c\) charge:

\[
q_{\nu^c\nu^c}[3(B-L)]=6\pmod9,
\qquad
q_{\nu^c\nu^c}[3B]=0.
\]

The two lifts exchange which condition is automatic:

\[
\begin{array}{c}
SO(10)\text{ integral lift}:\quad
\text{one-family anomaly cancellation},\\[2mm]
\text{Majorana-compatible lift}:\quad
\text{vacuum invariance plus three-family cancellation}.
\end{array}
\]

This explains why the family count entered document 1088 in an essential way.

## 5. Relation to the Pati–Salam factorization

Document 1089 showed

\[
U_{3B}
=e^{i\pi/6}\exp\!\left[\frac{i\pi}{6}(B-L)\right]
\]

on the \(SU(4)\) fundamental, with conventions in which the displayed \(B-L\) matrix is \(\operatorname{diag}(1/3,1/3,1/3,-1)\).

The extra module phase is exactly the data that changes the integral \(3(B-L)\) lift into the Majorana-compatible \(3B\) lift. Their cubes give the same gauge shadow. Their quotient actions do not: the integral lift acts as \(B-L\) modulo three on gauge-invariant operators, while the selected lift acts as \(B\) modulo three. Only the latter is baryon triality.

The finite-module phase is therefore not cosmetic. It selects which ninth-root refinement of the common ternary stabilizer is physically realized.

## 6. What the paper contributes to this branch

The paper establishes three relevant facts:

1. the one-generation charge lattice is an exact integral cubic object;
2. its reduction modulo three contains the hypercharge-gauge shadow shared by the two lifts as a puncture-neutral stabilizer;
3. ternary data admits a natural ninth-root cubic phase refinement in the logical-gate construction.

It does not prove that the baryon-triality stabilizer itself lifts to the fieldwise \(\mathbb Z_9\) symmetry of document 1088. That lift is selected by the Majorana-neutrality and three-family anomaly conditions, not by triorthogonality alone.

## 7. Stop-everything and reopening criteria

**Identity stop:** do not identify the paper's logical qutrit gate with the fieldwise baryon-triality symmetry merely because both have spectrum \((1,\zeta_9,\zeta_9^{-1})\).

**Code-role theorem:** the reduction of \(q_1+q_2+q_3\) is exactly \(6Y\bmod3\), so it is a puncture-neutral gauge stabilizer. Baryon triality is the quotient action of the order-nine \(3B\) extension.

**Lift theorem:** \(3(B-L)\) and \(3B\) are the same mod-three word but inequivalent mod-nine lifts separated by \(3L\).

**Positive trigger:** construct a source-native operation that maps the baryon-triality stabilizer character to the logical ninth-root phase while retaining the Majorana-neutral lift and all gauge checks.

**Negative trigger:** prove that every finite-geometry lift of the ternary stabilizer is gauge-equivalent to the integral \(3(B-L)\) representative; that would exclude the required \(3B\) refinement.

## 8. Verdict

The ninth-root coincidence is neither accidental nor an identity:

\[
\boxed{
\begin{aligned}
&3(B-L)\equiv3B\pmod3,\\
&3(B-L)\not\equiv3B\pmod9,\\
&U_{\rm logical}\neq U_{3B}.
\end{aligned}}
\]

The paper supplies the integral ternary/code parent and a canonical example of ninth-root refinement. The proton-protection branch selects a different refinement—one adapted to the Majorana vacuum—and three generations cancel the anomaly cost of that choice.

## Position in the corpus

- [unique Majorana selection and four-sector admissibility of the \(3B\) lift](1091_the_rank_one_Majorana_vacuum_uniquely_selects_the_3B_mod9_lift_and_its_four_sector_operator_closes_only_for_three_family_unimodularity.md)
- [the paper's qutrit anomaly gate and selector comparison](940_the_prakash_ramya_qutrit_anomaly_gate_contains_a_protected_c3_phase_but_its_order18_extension_is_not_the_selector_group.md)
- [the primitive ninth-root trace-mode theorem](947_the_primitive_ninth_root_traverses_the_galois_trace_mode_so_the_trace_zero_carrier_retains_only_its_cubic_shadow.md)
- [minimal \(\mathbb Z_9\) companion protector](1088_Z9_is_the_minimal_family_universal_cyclic_lift_that_protects_triplet_companion_mixing_and_its_three_family_quotient_is_baryon_triality.md)
- [Pati–Salam module-phase factorization](1089_the_Z9_quark_number_lift_factors_exactly_into_a_chiral_module_phase_times_Pati_Salam_BminusL_and_its_gauge_quotient_is_baryon_triality.md)
- [gauge quotient and Dai–Freed correction](1092_the_Z9_extension_not_its_naive_mod3_reduction_realizes_baryon_triality_and_matches_the_Dai_Freed_mod9_anomaly.md)
