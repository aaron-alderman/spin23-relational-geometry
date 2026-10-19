# The \(\mathbb Z_9\) Extension—not Its Naïve Mod-Three Reduction—Realizes Baryon Triality and Matches the Dai–Freed Mod-Nine Anomaly

**Date:** 18 October 2026  
**Primary source:** I. García-Etxebarria and M. Montero, [*Dai–Freed anomalies in particle physics*, arXiv:1808.00009v3](https://arxiv.org/abs/1808.00009)  
**Branches:** baryon triality, gauge quotient, discrete global anomaly, spin bordism, correction of the ternary-shadow interpretation  
**Claim status:** exact charge/gauge-quotient calculation plus direct match to the published Dai–Freed constraint; unbroken Pati–Salam bordism extension remains open  
**Certificate:** [prove_z9_gauge_quotient_is_baryon_triality_and_matches_dai_freed_mod9_anomaly.mjs](../../../verification/prove/prove_z9_gauge_quotient_is_baryon_triality_and_matches_dai_freed_mod9_anomaly.mjs)

## Executive result

The \(\mathbb Z_9\) protector does induce baryon triality on gauge-invariant observables, and its three-generation anomaly cancellation agrees exactly with the Dai–Freed result. But the mechanism requires a careful distinction:

\[
\boxed{
\text{the quotient action is not obtained by simply reducing }3B\text{ modulo }3.
}
\]

Indeed,

\[
3B\equiv6Y\equiv3(B-L)\pmod3
\]

on every Standard-Model fermion multiplet. The componentwise mod-three reduction is a **hypercharge gauge transformation**. It is gauge-trivial on observables.

The nontrivial quotient arises because the generator has order nine on elementary fields while its cube is gauge. On a gauge-invariant operator with integer baryon number \(B_{\mathcal O}\), it acts as

\[
\exp\!\left(\frac{2\pi i}{3}B_{\mathcal O}\right).
\]

A fieldwise representative of this quotient is

\[
X_{B_3}=B-2Y,
\]

the inverse of the conventional baryon-triality convention \(-B+2Y\). The difference is a gauged hypercharge rotation, so both act identically up to inversion on gauge-invariant operators.

For one generation the Dai–Freed charge is

\[
3\pmod9.
\]

For three generations it is

\[
3\times3=9=0\pmod9.
\]

Thus the earlier three-family condition survives the full published spin-bordism refinement.

## 1. The naïve reduction is gauge

In left-handed Weyl conventions,

\[
3B=(1,-1,-1,0,0,0)
\]

on

\[
(Q,u^c,d^c,L,e^c,\nu^c).
\]

Integral hypercharge is

\[
6Y=(1,-4,2,-3,6,0).
\]

Reducing modulo three gives

\[
3B\equiv6Y\equiv(1,2,2,0,0,0)\pmod3.
\]

The same is true of the Prakash–Ramya Cartan row:

\[
3(B-L)=(1,-1,-1,-3,3,3)
\equiv6Y\pmod3.
\]

Therefore the common ternary row identified in document 1090 is correctly a puncture-neutral code stabilizer, but its physical meaning is a **gauge shadow**, not the faithful baryon-triality action.

This corrects the phrase “baryon triality is the code stabilizer.” The accurate statement is:

\[
\boxed{
3B\bmod3\text{ is the hypercharge stabilizer shadow of the }\mathbb Z_9\text{ extension.}
}
\]

## 2. Why the quotient is nevertheless nontrivial

Let \(g\) generate the \(\mathbb Z_9\) action. On a quark, (g\) contributes \(e^{2\pi i/9}\); on an antiquark it contributes the inverse; on a lepton it is trivial.

The cube \(g^3\) is a gauge transformation. Hence the physical global group is the quotient

\[
\langle g\rangle/\langle g^3\rangle\cong\mathbb Z_3.
\]

For any color-singlet gauge-invariant operator, the total (3B) charge is divisible by three. Write it as

\[
Q_{3B}(\mathcal O)=3B_{\mathcal O}.
\]

Then

\[
g:\mathcal O\longmapsto
e^{2\pi iQ_{3B}(\mathcal O)/9}\mathcal O
=e^{2\pi iB_{\mathcal O}/3}\mathcal O.
\]

This action is nontrivial on a baryon and trivial on mesons and leptons. It is baryon triality.

The crucial point is that quotienting by a gauge subgroup and reducing every elementary charge modulo three are not the same operation.

## 3. Standard fieldwise representative

The conventional baryon-triality charge is

\[
-B+2Y.
\]

Using canonical residues in \(\{-1,0,1\}\), the inverse convention suited to the \(3B\) generator gives

\[
B-2Y\equiv(0,1,-1,1,1,0)\pmod3
\]

on

\[
(Q,u^c,d^c,L,e^c,\nu^c).
\]

For any gauge-invariant operator,

\[
Y_{\mathcal O}=0,
\]

so

\[
(B-2Y)_{\mathcal O}=B_{\mathcal O}.
\]

This is a legitimate fieldwise representative of the quotient. It differs from the original \(3B\) lift because a quotient representative is defined only after using the gauge identification.

## 4. Dai–Freed anomaly

García-Etxebarria and Montero compute

\[
\Omega_5^{\mathrm{Spin}}(B\mathbb Z_3)\cong\mathbb Z_9
\]

and show that baryon triality carries charge three modulo nine per Standard-Model generation. In the inverse convention above, count all left-handed Weyl components:

\[
\begin{aligned}
\mathcal A_{DF}
&=6(0)+3(1)+3(-1)+2(1)+1(1)+1(0)\\
&=3\pmod9.
\end{aligned}
\]

Because all nonzero charges are \(\pm1\), the cubic sum is the same:

\[
\sum_f q_f^3=3\pmod9.
\]

For \(N_f\) identical families,

\[
\mathcal A_{DF}=3N_f\pmod9.
\]

Therefore

\[
\boxed{
\mathcal A_{DF}=0
\quad\Longleftrightarrow\quad
N_f=0\pmod3.
}
\]

This is the full discrete spin-bordism constraint quoted in the source, not merely the electroweak instanton test.

## 5. Relation to the previous certificates

Three independent calculations now agree:

| calculation | per-family residue | cancellation condition |
|---|---:|---:|
| weak-instanton phase of the \(3B\) lift | \(3\pmod9\) | \(N_f=0\pmod3\) |
| particle-half determinant of the four-sector operator | \(e^{2\pi i/3}\) | \(N_f=0\pmod3\) |
| Dai–Freed baryon-triality class | \(3\pmod9\) | \(N_f=0\pmod3\) |

They are not assumed to be identical mechanisms. Their agreement is now source-backed evidence that the four-sector \(\mathbb Z_9\) lift, its gauge quotient and the low-energy global anomaly are mutually compatible.

## 6. Correction to document 1090

Document 1090 correctly established:

- (3(B-L)\) and \(3B\) coincide modulo three;
- they are inequivalent modulo nine;
- the Prakash–Ramya logical ninth-root gate is not the fieldwise \(\mathbb Z_9\) symmetry.

Its interpretation of the common mod-three word as baryon triality was too quick. The common word is (6Y\bmod3\), hence gauge. Baryon triality is the **quotient action of the order-nine extension**, represented after a gauge shift by (B-2Y\).

This correction leaves the mod-nine lift fork and unique Majorana selection intact. It improves their physical typing.

## 7. Remaining ultraviolet boundary

The low-energy spin-bordism gate now passes for three families. Still open are:

- the bordism group for the full combined Pati–Salam gauge/global extension rather than standalone \(B\mathbb Z_3\);
- whether the \(\mathbb Z_9\) normalizer is gauged, global, or part of a nontrivial group extension in the complete finite geometry;
- possible anomalies involving the exact global form of the Pati–Salam gauge group and its centers;
- heavy fermion and threshold contributions;
- whether a topological sector or inflow is required in a UV completion.

## 8. Stop-everything and reopening criteria

**Reduction stop:** never infer the quotient action by reducing elementary \(3B\) charges modulo three; that produces a hypercharge gauge transformation.

**Quotient theorem:** the order-nine extension modulo its gauge cube acts as baryon number modulo three on gauge-invariant operators.

**Global-anomaly promotion:** for the standalone low-energy baryon-triality symmetry, the published Dai–Freed obstruction cancels for three generations.

**UV stop:** do not infer the bordism class of the full Pati–Salam extension from the standalone \(B\mathbb Z_3\) calculation.

**Negative trigger:** a computation for the true combined gauge/global group finds an additional nonzero class not visible in \(\Omega_5^{\mathrm{Spin}}(B\mathbb Z_3)\).

## 9. Verdict

The corrected chain is

\[
\boxed{
\mathbb Z_9^{,3B}
\big/
(\text{gauge cube})
\;=\;
\mathbb Z_3^{,B\text{-triality}},
\qquad
\mathcal A_{DF}=3N_f\pmod9.
}
\]

For three generations, the quotient is nontrivial and Dai–Freed anomaly free. The ninth-root extension is not decorative: it is precisely what retains the global action after its naïve mod-three field charge has collapsed into hypercharge gauge.

## Position in the corpus

- [Pati–Salam parent component and mixed-anomaly redistribution](1093_the_order_nine_operator_is_a_gauge_dressed_component_of_SU4_times_Z3_and_the_three_family_obstruction_moves_into_mixed_weak_anomalies.md)
- [unique Majorana selection and four-sector admissibility](1091_the_rank_one_Majorana_vacuum_uniquely_selects_the_3B_mod9_lift_and_its_four_sector_operator_closes_only_for_three_family_unimodularity.md)
- [Prakash–Ramya versus baryonic ninth-root lifts](1090_the_Prakash_Ramya_qutrit_gate_and_Z9_baryon_triality_share_a_ternary_shadow_but_are_inequivalent_ninth_root_lifts.md)
- [Pati–Salam module-phase factorization](1089_the_Z9_quark_number_lift_factors_exactly_into_a_chiral_module_phase_times_Pati_Salam_BminusL_and_its_gauge_quotient_is_baryon_triality.md)
- [minimal \(\mathbb Z_9\) protector](1088_Z9_is_the_minimal_family_universal_cyclic_lift_that_protects_triplet_companion_mixing_and_its_three_family_quotient_is_baryon_triality.md)
