# The \(\mathbb Z_9\) Quark-Number Lift Factors Exactly into a Chiral Module Phase Times Pati–Salam \(B-L\), and Its Gauge Quotient Is Baryon Triality

**Date:** 18 October 2026  
**Branches:** Pati–Salam lift, discrete gauge quotient, finite-module phase, companion protection  
**Claim status:** exact representation-level factorization; admissibility in the complete real finite spectral triple remains open  
**Certificate:** [prove_z9_pati_salam_u4_factorization_and_baryon_triality_quotient.mjs](scripts/prove_z9_pati_salam_u4_factorization_and_baryon_triality_quotient.mjs)

## Executive result

Document 1088 left a sharp ultraviolet question: the low-energy protector acts on a Pati–Salam fundamental as

\[
U=\operatorname{diag}(\omega,\omega,\omega,1),
\qquad \omega=e^{2\pi i/9},
\]

which is not itself an \(SU(4)\) matrix. It nevertheless has the exact factorization

\[
\boxed{
U=\lambda g_{B-L},
\qquad
\lambda=e^{i\pi/6},
\qquad
g_{B-L}=\exp\!\left[
\frac{i\pi}{6}
\operatorname{diag}\!\left(\frac13,\frac13,\frac13,-1\right)
\right]\in SU(4).}
\]

Thus the missing ingredient is not a new noncommuting action on the colour–lepton fundamental. It is one common module phase, with the conjugate module carrying its inverse, dressed by an ordinary Pati–Salam \(B-L\) gauge transformation.

Moreover,

\[
U^3=\operatorname{diag}(e^{2\pi i/3},e^{2\pi i/3},e^{2\pi i/3},1)\in SU(4).
\]

The cube is pure gauge. Therefore the faithful action on gauge-invariant observables is

\[
\mathbb Z_9/\langle U^3\rangle\cong\mathbb Z_3,
\]

which is precisely baryon triality.

## 1. Exact factorization

Let

\[
B-L=\operatorname{diag}\!\left(\frac13,\frac13,\frac13,-1\right).
\]

It is traceless, so its exponential lies in \(SU(4)\). At angle \(\pi/6\), its colour and lepton eigenvalues are

\[
g_c=e^{i\pi/18},
\qquad
g_\ell=e^{-i\pi/6}.
\]

Multiplication by \(\lambda=e^{i\pi/6}\) gives

\[
\lambda g_c=e^{2\pi i/9}=\omega,
\qquad
\lambda g_\ell=1.
\]

This proves the factorization entry by entry. On the conjugate \(\bar{\mathbf4}\), complex conjugation gives charges \((-1,-1,-1,0)\pmod9\), exactly the charges required for \(u^c,d^c,e^c,\nu^c\).

The module-phase assignment is therefore

\[
\mathbf4_L:\lambda,
\qquad
\bar{\mathbf4}_{R}^{\,c}:\lambda^{-1},
\]

up to the accompanying gauge action. Ordinary Dirac bilinears pair the two opposite phases and remain neutral.

## 2. Why the physical quotient has order three

The determinant of \(U\) is

\[
\det U=\omega^3=e^{2\pi i/3}.
\]

Hence \(U^k\) is an \(SU(4)\) gauge transformation exactly when

\[
k=0\pmod3.
\]

Among the nine powers, \(k=3,6,9\) are gauge. The global action modulo gauge transformations consequently has three elements. This makes the two descriptions compatible:

- \(\mathbb Z_9\) is the useful lift acting on colored elementary fields and recording the anomaly phase;
- \(\mathbb Z_3\) is the faithful baryon-triality action on gauge-invariant observables.

The quotient is not the componentwise reduction of the elementary charge vector modulo three. That reduction is \(6Y\bmod3\), hence gauge. The quotient generator is the coset of \(U\), and on a gauge-invariant operator it acts by baryon number modulo three. Document 1092 gives the equivalent field representative \(B-2Y\) and the Dai–Freed anomaly check.

The reduction is a gauge quotient, not an arbitrary relabeling.

## 3. The scalar charges follow automatically

A scalar coupling to two fundamental fermions transforms in the inverse tensor square. On

\[
\Lambda^2\mathbf4
=
(\text{colour–colour})\oplus(\text{colour–lepton}),
\]

the inverse exterior-square charges are

\[
q_D=-2=7\pmod9,
\qquad
q_T=-1=8\pmod9.
\]

Their holomorphic companion product has

\[
q(TD)=7+8=15=6\pmod9,
\]

and is forbidden. By contrast, the lepton–lepton direction of the inverse symmetric square has charge zero. The rank-one neutrino ten-plet vacuum is therefore invariant.

This reproduces all of the low-energy charges of document 1088 directly from the Pati–Salam tensor representations.

## 4. What has and has not been lifted

The representation obstruction is removed:

- the quark/lepton distinction is carried by a legitimate \(SU(4)\) \(B-L\) transformation;
- the remaining action is a scalar phase on each irreducible fermion module;
- conjugate modules carry inverse phases;
- the rank-one neutrino vacuum and ordinary Dirac pairings are neutral;
- the six splits into exactly the required companion charges.

But a finite spectral triple does not automatically admit every module phase as a physical global symmetry. The unresolved test is whether the proposed phase:

1. commutes with the represented finite algebra;
2. is compatible with the grading;
3. has the required relation to the real structure \(J_F\);
4. leaves every nonzero block of \(D_F\) invariant once scalar spurions transform;
5. survives unimodularity and quotienting by gauge redundancies;
6. remains non-anomalous in the full ultraviolet fermion and heavy-field content.

The correct next calculation is therefore a finite-module commutant problem, not another low-energy charge search.

## 5. Stop-everything and reopening criteria

**Representation stop:** do not say that quark number is incompatible with Pati–Salam merely because \(\operatorname{diag}(\omega I_3,1)\notin SU(4)\); it is exactly a module phase times an \(SU(4)\) element.

**Gauge-quotient stop:** do not count \(\mathbb Z_9\) and baryon triality \(\mathbb Z_3\) as competing symmetries. They are the field-level lift and its faithful gauge-invariant quotient.

**Finite-geometry stop:** do not yet claim that the NCG construction supplies the module phase. That requires the explicit finite representation, real structure and Dirac operator.

**Positive trigger:** exhibit a unitary \(R\) on the full finite Hilbert space with the stated phases such that the transformed finite Dirac operator and all physical vacuum data are invariant modulo gauge.

**Negative trigger:** prove that the real structure, unimodularity or a required finite-Dirac block identifies or breaks the phase before the \(\mathbb Z_9\) subgroup is reached.

## 6. Verdict

The ultraviolet problem is narrower than it first appeared:

\[
\boxed{
\mathbb Z_9\text{ quark number}
=
\text{opposite finite-module phase}
\times
SU(4)_{B-L}\text{ gauge},
}
\]

and its cube is gauge. The baryon-triality quotient is therefore forced by the Pati–Salam embedding itself.

What remains is no longer a group-embedding mystery. It is a concrete admissibility test in the full finite spectral triple.

## Position in the corpus

- [Prakash–Ramya logical ninth root versus the baryon-triality lift](1090_the_Prakash_Ramya_qutrit_gate_and_Z9_baryon_triality_share_a_ternary_shadow_but_are_inequivalent_ninth_root_lifts.md)
- [minimal \(\mathbb Z_9\) protector and anomaly classification](1088_Z9_is_the_minimal_family_universal_cyclic_lift_that_protects_triplet_companion_mixing_and_its_three_family_quotient_is_baryon_triality.md)
- [connected Yukawa family-parity no-go](1087_connected_CKM_and_PMNS_Yukawa_graphs_force_any_exact_diagonal_family_Z2_back_to_the_universal_anomalous_class.md)
- [rank-one spectral bridge theorem](1084_the_minimal_spectral_graph_has_an_all_orders_rank_one_bridge_normal_form_that_forbids_holomorphic_cross_six_mixing.md)
- [gauge quotient and Dai–Freed anomaly](1092_the_Z9_extension_not_its_naive_mod3_reduction_realizes_baryon_triality_and_matches_the_Dai_Freed_mod9_anomaly.md)
