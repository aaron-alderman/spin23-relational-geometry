# \(\mathbb Z_9\) Is the Minimal Family-Universal Cyclic Lift That Protects Triplet–Companion Mixing, and Its Three-Family Quotient Is Baryon Triality

**Date:** 18 October 2026  
**Branches:** higher cyclic symmetry, baryon triality, discrete anomalies, proton-safe companion splitting  
**Claim status:** exact finite congruence classification under stated low-energy assumptions; ultraviolet spectral Pati–Salam lift remains open  
**Certificate:** [find_minimal_cyclic_triplet_mixing_protector_with_three_families.mjs](scripts/find_minimal_cyclic_triplet_mixing_protector_with_three_families.mjs)  
**Primary anomaly context:** [García-Etxebarria–Montero 2018](https://arxiv.org/abs/1808.00009), [Dreiner–Luhn–Thormeier 2005](https://arxiv.org/abs/hep-ph/0512163)

## Executive result

The failure of a universal \(\mathbb Z_2\) is not the end of exact discrete protection. Three families allow a larger cyclic lift.

Under the assumptions:

- three identical \(SM+\nu^c\) families;
- family-universal \(\mathbb Z_N\) charges;
- all ordinary Dirac Yukawas allowed;
- the electroweak Higgs VEV neutral;
- the right-neutrino Majorana mass/breaking VEV neutral;
- standard mixed gauge, gravitational, cubic and hypercharge anomaly congruences;

there is no solution for

\[
2\le N\le8.
\]

The first solution occurs at

\[
\boxed{N=9.}
\]

A minimal representative is

\[
q_Q=1,\qquad q_L=0\pmod9,
\]

with

\[
q_{u^c}=q_{d^c}=-1,\qquad
q_{e^c}=q_{\nu^c}=0,\qquad q_H=0.
\]

The leptoquark and diquark components of the same broken six have

\[
q_T=-1,\qquad q_D=-2,
\]

so their holomorphic companion mixing has charge

\[
q(TD)=-3=6\not\equiv0\pmod9.
\]

Meanwhile the three-family weak-instanton charge is

\[
3(3q_Q+q_L)=3\cdot3=9\equiv0\pmod9.
\]

This is discrete quark number. On color-singlet operators its physical action is baryon triality.

## 1. The general cyclic identity

Let \(q=q_Q\), \(l=q_L\) and take the Higgs neutral. Dirac Yukawa invariance gives

\[
q_{u^c}=q_{d^c}=-q,
\qquad
q_{e^c}=q_{\nu^c}=-l.
\]

Neutrality of the Majorana mass requires

\[
2l=0\pmod N.
\]

The same-chirality six components coupling to \(QL\) and \(QQ\) carry

\[
q_T=-(q+l),
\qquad
q_D=-2q.
\]

Therefore the holomorphic epsilon/Pfaffian mixing has charge

\[
q(TD)=-(3q+l).
\]

Define

\[
x=3q+l.
\]

The one-family weak-instanton charge is also \(x\), while three families give \(3x\). Exact protection and instanton invariance require

\[
x\ne0\pmod N,
\qquad
3x=0\pmod N.
\]

This equation has a nonzero solution only when \(N\) contains a factor of three. The neutral-Majorana condition removes the apparent \(N=3\) and \(N=6\) possibilities. The first surviving modulus is nine.

## 2. Exhaustive minimality result

The certificate enumerates

\[
N=2,3,\ldots,36
\]

and every pair

\[
(q,l)\in\mathbb Z_N^2.
\]

For each assignment it derives all fermion and triplet charges and checks:

- neutral Higgs VEV;
- neutral Majorana mass;
- forbidden \(TD\);
- \(SU(3)^2\mathbb Z_N\);
- \(SU(2)^2\mathbb Z_N\);
- gravitational–\(\mathbb Z_N\);
- cubic \(\mathbb Z_N\);
- \(Y^2\mathbb Z_N\);
- \(Y\mathbb Z_N^2\).

No assignment survives below \(N=9\). The \(q=1,l=0\) witness has every listed anomaly congruence equal to zero.

## 3. Why three families help rather than obstruct

For a sign symmetry, three copies of an odd anomaly remain odd. For a ninth-root symmetry, three copies of charge three sum to nine and vanish:

\[
3+3+3=9=0\pmod9.
\]

But the local scalar bilinear carries only one copy of the charge:

\[
q(TD)=-3\ne0\pmod9.
\]

The family count has become the anomaly-cancellation mechanism while leaving the local selection nontrivial.

This matches the modern Dai–Freed observation that baryon triality carries a \(\mathbb Z_9\)-valued anomaly which cancels precisely when the number of generations is a multiple of three. See [García-Etxebarria and Montero](https://arxiv.org/abs/1808.00009).

## 4. Baryon-triality interpretation

The witness charges are normalized quark number:

\[
Q:+1,\qquad u^c,d^c:-1,\qquad\text{leptons}:0.
\]

For a color singlet, triality forces the net quark-number charge to be a multiple of three. Thus the faithful action on gauge-invariant states reduces from \(\mathbb Z_9\) to a \(\mathbb Z_3\) baryon triality.

The distinction matters:

- the \(\mathbb Z_9\) lift is natural on colored elementary fields and carries the anomaly accounting;
- the \(\mathbb Z_3\) quotient is what acts faithfully on color-singlet observables.

This quotient must not be computed by reducing each elementary \(3B\) charge modulo three: that reduction equals \(6Y\bmod3\) and is gauge. The nontrivial quotient is inherited from the order-nine extension after identifying its gauge cube; on gauge-invariant operators it acts by \(B\bmod3\), equivalently by the field representative \(B-2Y\).

Baryon triality is a known proton-protecting discrete gauge symmetry. The literature also emphasizes that its gauge origin and ultraviolet completion are model dependent. See [Dreiner–Luhn–Thormeier](https://arxiv.org/abs/hep-ph/0512163).

## 5. Source and mixing audit

The separated Model C sources remain allowed:

\[
T(QL),\qquad
T^\dagger(u^ce^c),\qquad
T^\dagger(d^c\nu^c),
\]

and

\[
D(QQ),\qquad
D^\dagger(u^cd^c),
\]

with orientation conventions chosen consistently with

\[
q_T=-1,\qquad q_D=-2.
\]

The dangerous holomorphic companion mass

\[
TD+\mathrm{h.c.}
\]

is forbidden. Hermitian left/right mixing within the safe triplet sector remains allowed because conjugate charges cancel.

The symmetry therefore protects precisely the scalar-sector zero required by documents 1079–1085 without removing the desired leptoquark currents.

## 6. Relation to the earlier continuous no-go

Document 1078 proved that no minimal family-universal anomaly-free continuous \(U(1)\) in the \(Y\)–\(B-L\) plane can allow the desired vertices while deleting both diquark vertices of one scalar.

There is no contradiction:

- the NCG source geometry already separates leptoquark and diquark vertices onto distinct components;
- \(\mathbb Z_9\) protects their **mixing**, rather than using one scalar charge to delete gauge-allowed sources;
- discrete quark number can be anomaly free even though continuous baryon number is anomalous, because the three-family instanton violation is a multiple of nine.

The continuous and discrete branches solve different layers of the problem.

## 7. Ultraviolet boundary

The arithmetic establishes a consistent low-energy discrete candidate. It does not yet prove that the complete spectral Pati–Salam theory realizes it.

Above Pati–Salam breaking, quarks and leptons occupy one \(SU(4)\) fundamental. The quark-number action does not commute with the full \(SU(4)\) representation; it must be realized as a diagonal combination of:

- an allowed common phase of the finite Hilbert module;
- a colour–lepton \(SU(4)\) transformation;
- possibly a quotient by the color centre.

The exact lift must be checked on:

- the finite real structure and grading;
- all \(H_L,H_R,\Sigma\) components;
- heavy Pati–Salam gauge bosons;
- the rank-one ten-plet vacuum;
- Dai–Freed/global anomaly data;
- threshold operators generated at symmetry breaking.

Until that construction exists, \(\mathbb Z_9\) is a highly credible low-energy protector, not a derived NCG theorem.

## 8. Stop-everything and reopening criteria

**\(\mathbb Z_4\) stop:** a fourth-root lift cannot solve the universal three-family congruence because three is invertible modulo four.

**Minimality:** under the neutral-Higgs/neutral-Majorana contract, do not search \(2\le N\le8\); exhaustive enumeration finds no solution.

**Low-energy promotion:** \(\mathbb Z_9\) may be used as the first anomaly-consistent family-universal discrete protector of the separated companion mass.

**Ultraviolet stop:** do not yet claim that spectral Pati–Salam or the Furey geometry derives this \(\mathbb Z_9\).

**Positive reopening trigger:** construct the combined finite-Hilbert/gauge action and prove every finite-Dirac block and vacuum is invariant.

**Negative trigger:** find a heavy-threshold or global-anomaly term carrying total \(\mathbb Z_9\) charge zero that regenerates \(TD\).

## 9. Verdict

The higher-cyclic branch succeeds at low energy:

\[
\boxed{
\mathbb Z_9\text{ quark number}
\longrightarrow
\mathbb Z_3\text{ baryon triality on observables}
}
\]

is the minimal universal cyclic symmetry satisfying the stated VEV, Yukawa and anomaly requirements while forbidding triplet–companion mixing.

This turns three generations from the obstruction encountered by \(\mathbb Z_2\) into the cancellation mechanism of \(\mathbb Z_9\). The next question is whether the finite geometry naturally carries that ninth-root lift.

## Position in the corpus

- [Pati–Salam factorization and gauge quotient](1089_the_Z9_quark_number_lift_factors_exactly_into_a_chiral_module_phase_times_Pati_Salam_BminusL_and_its_gauge_quotient_is_baryon_triality.md)
- [connected Yukawa family-parity no-go](1087_connected_CKM_and_PMNS_Yukawa_graphs_force_any_exact_diagonal_family_Z2_back_to_the_universal_anomalous_class.md)
- [odd-family universal \(\mathbb Z_2\) anomaly no-go](1086_for_an_odd_number_of_families_any_universal_Z2_that_splits_leptoquark_from_diquark_triplets_has_the_same_mod_two_weak_anomaly.md)
- [colour–lepton reflection Ward sector](1085_the_rank_one_spectral_zero_is_the_unbroken_colour_lepton_reflection_Ward_sector_but_three_generation_weak_instantons_make_it_nonperturbatively_anomalous.md)
- [gauge quotient and Dai–Freed anomaly](1092_the_Z9_extension_not_its_naive_mod3_reduction_realizes_baryon_triality_and_matches_the_Dai_Freed_mod9_anomaly.md)
