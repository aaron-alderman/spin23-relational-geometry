# The Rank-One Majorana Vacuum Uniquely Selects the \(3B\) Mod-Nine Lift, and Its Four-Sector Operator Closes for Three-Family Unimodularity

**Date:** 18 October 2026  
**Branches:** finite real structure, mod-nine lift selection, Majorana vacuum, NCG unimodularity, three-generation closure  
**Claim status:** exact theorem for the declared four-sector support and minimal vacuum; applicability of the full NCG unimodularity prescription remains a source-level gate  
**Certificate:** [prove_four_sector_admissibility_and_unique_majorana_selection_of_the_z9_3B_lift.mjs](scripts/prove_four_sector_admissibility_and_unique_majorana_selection_of_the_z9_3B_lift.mjs)

## Executive result

The puncture-neutral ternary gauge-stabilizer word has three natural lifts modulo nine obtained by adding multiples of three times lepton number:

\[
X_k=3(B-L)+3kL,
\qquad k=0,1,2.
\]

They are indistinguishable modulo three. They are not physically equivalent modulo nine.

Impose simultaneously:

1. the \(\nu^c\nu^c\) rank-one Majorana vacuum is neutral;
2. the holomorphic leptoquark–diquark companion bilinear is charged;
3. three-family weak-instanton invariance;
4. the minimal four-sector reality/grading structure.

Then exactly one lift survives:

\[
\boxed{X_1=3B.}
\]

Moreover, its finite-module action

\[
R_9=U\oplus U\oplus U^*\oplus U^*,
\qquad
U=\operatorname{diag}(\omega_9,\omega_9,\omega_9,1),
\]

on

\[
L\oplus R\oplus L^c\oplus R^c

\]

commutes with the antiunitary real structure and every sector-diagonal grading, preserves the diagonal \(\Sigma\) vacuum and the right-neutrino rank-one line, and normalizes all four published edge types.

On the full particle-plus-conjugate Hilbert space its determinant cancels automatically. On the physical particle half its determinant per family is \(e^{2\pi i/3}\), so a particle-unimodularity condition is satisfied precisely when

\[
N_f=0\pmod3.
\]

The observed family count is therefore doing three jobs in the same branch:

- weak-instanton phase cancellation;
- particle determinant cancellation;
- retention of a nontrivial local companion-selection charge.

## 1. The three lifts

Using left-handed Weyl conventions, the integral \(SO(10)\) row is

\[
3(B-L)=(1,-1,-1,-3,3,3)

\]

on

\[
(Q,u^c,d^c,L,e^c,\nu^c).
\]

Adding \(3kL\) gives:

\[
\begin{array}{c|rrrrrr}
k&Q&u^c&d^c&L&e^c&\nu^c\\ \hline
0&1&-1&-1&-3&3&3\\
1&1&-1&-1&0&0&0\\
2&1&-1&-1&3&-3&-3.
\end{array}
\]

All rows reduce to

\[
(1,-1,-1,0,0,0)\pmod3.
\]

The code sees one ternary hypercharge-gauge stabilizer. The mod-nine vacuum theory sees three distinct refinements and their different quotient actions.

## 2. Majorana neutrality and companion protection

For each lift define

\[
x_k=3q_Q+q_L.
\]

The companion mixing has charge \(-x_k\), while the Majorana bilinear has charge \(2q_{\nu^c}\). Direct evaluation gives:

\[
\begin{array}{c|ccc}
k&x_k&q(TD)&q(\nu^c\nu^c)\\ \hline
0&0&0&6\\
1&3&6&0\\
2&6&3&3
\end{array}
\qquad(\bmod 9).
\]

Therefore:

- \(k=0\) neither preserves the Majorana vacuum nor protects companion mixing;
- \(k=2\) protects mixing but is broken by the Majorana vacuum;
- \(k=1\) does both.

The selection is unique within the complete \(3L\)-shift family:

\[
\boxed{
q(\nu^c\nu^c)=0,quad q(TD)\ne0
\quad\Longleftrightarrow\quad
k=1.}
\]

This turns the finite Majorana vacuum from a complication into the selector of the correct ninth-root refinement.

## 3. Four-sector operator

Let

\[
U=\operatorname{diag}(\omega_9 I_3,1),
\qquad \omega_9=e^{2\pi i/9}.
\]

Define

\[
R_9|_L=R_9|_R=U,
\qquad
R_9|_{L^c}=R_9|_{R^c}=U^*.
\]

The real structure exchanges

\[
L\leftrightarrow L^c,
\qquad
R\leftrightarrow R^c
\]

antiunitarily. Since antiunitarity conjugates \(U\),

\[
R_9J_F=J_FR_9.
\]

The grading is diagonal on these four sectors, so

\[
[R_9,\gamma_F]=0.
\]

These are exact operator statements and do not depend on Yukawa coefficients.

## 4. Vacuum compatibility

The minimal Standard-Model-preserving vacuum contains:

- a diagonal colour-preserving \(\Sigma=\operatorname{diag}(a,a,a,b)\) between \(L\) and \(R\);
- its conjugate between \(L^c\) and \(R^c\);
- a right same-chirality rank-one line supported on \(e_4e_4\);
- no left same-chirality VEV.

Because \(R_9\) acts identically on \(L\) and \(R\), every diagonal \(\Sigma\) entry is neutral. Because \(Ue_4=e_4\), the neutrino rank-one line is also neutral. Thus

\[
[R_9,D_F^{\rm vacuum}]=0

\]

for the declared minimal block support.

For fluctuations, the edge spaces are normalized rather than fixed:

- \(\Sigma\)-type components carry differences \(q_i-q_j\);
- \(H\)-type components carry sums \(q_i+q_j\);
- exterior and symmetric tensor subspaces remain invariant.

The transformation therefore acts consistently on the complete representation spaces of the published four edges.

## 5. Determinant and the family count

On the doubled Hilbert space the particle and conjugate determinants cancel:

\[
\det R_9|_{L,R,L^c,R^c}=1.
\]

On the particle half, both \(L\) and \(R\) contain a weak doublet of the \(SU(4)\) fundamental. Hence per family

\[
\det R_9|_{L\oplus R}
=(\det U)^4
=(\omega_9^3)^4
=e^{2\pi i/3}.
\]

For \(N_f\) identical families,

\[
\det R_9|_{\rm particles}=e^{2\pi iN_f/3}.
\]

Therefore a particle-sector unimodularity condition holds exactly for

\[
N_f=0\pmod3.
\]

This is a conditional NCG statement: conventions differ over whether unimodularity is imposed on this global normalizer, on algebra unitaries only, or on a specified physical subspace. The determinant calculation is exact; its role in the gauge-group definition must be checked against the chosen finite spectral triple.

## 6. Relation to the weak anomaly

For the selected lift the weak-instanton charge is three per family. Thus

\[
N_f=0\pmod3

\]

is simultaneously the condition for:

\[
N_f(3q_Q+q_L)=0\pmod9

\]

and for the particle determinant to be one.

These are distinct calculations with the same family-number condition. One concerns the fermion measure in a weak instanton; the other concerns the determinant of the finite-module transformation. Their agreement is evidence of a coherent lift, not yet proof that the two mechanisms are the same anomaly class.

## 7. Boundaries

The theorem assumes the minimal four-sector block support and the vacuum contract already used in documents 1082–1085. It does not yet establish:

- that the exact published Model C finite Dirac operator has no additional nonzero block or fixed coefficient breaking \(R_9\);
- that the module normalizer is included in the physical symmetry group after the precise NCG unimodularity quotient;
- cancellation of every global/spin-bordism discrete anomaly;
- survival after all heavy thresholds and non-spectral quantum counterterms;
- an identification of \(R_9\) with the Jordan/TKK carrier action.

## 8. Stop-everything and reopening criteria

**Lift-search stop:** within \(X_k=3(B-L)+3kL\), do not search beyond \(k=1\) under simultaneous Majorana-neutrality and companion-protection requirements; it is unique.

**Four-sector promotion:** the operator is admissible at the level of reality, grading, edge representation spaces and the declared vacuum.

**Unimodularity boundary:** do not claim that NCG predicts three generations until the relevant determinant prescription is shown to apply to this global normalizer.

**Positive trigger:** reconstruct the complete finite triple and show \(R_9\) belongs to its physical normalizer after the exact unimodularity quotient.

**Negative trigger:** find one required fixed finite-Dirac coefficient, extra VEV or heavy threshold that carries nonzero \(R_9\) charge and cannot transform as a spurion.

## 9. Verdict

Within the current finite-sector contract,

\[
\boxed{
\text{ternary stabilizer}
+\text{Majorana vacuum}
+\text{companion protection}
\Longrightarrow
3B\pmod9,
}
\]

and the same transformation is compatible with the four-sector real structure and becomes particle-unimodular for three families.

This is the strongest finite-geometry evidence yet for the \(\mathbb Z_9\) protector. The remaining work has narrowed to a source-faithful reconstruction of the complete finite triple and its global anomaly class.

## Position in the corpus

- [inequivalent Prakash–Ramya/baryon-triality ninth-root lifts](1090_the_Prakash_Ramya_qutrit_gate_and_Z9_baryon_triality_share_a_ternary_shadow_but_are_inequivalent_ninth_root_lifts.md)
- [Pati–Salam module-phase factorization](1089_the_Z9_quark_number_lift_factors_exactly_into_a_chiral_module_phase_times_Pati_Salam_BminusL_and_its_gauge_quotient_is_baryon_triality.md)
- [minimal \(\mathbb Z_9\) protector](1088_Z9_is_the_minimal_family_universal_cyclic_lift_that_protects_triplet_companion_mixing_and_its_three_family_quotient_is_baryon_triality.md)
- [all-orders rank-one spectral bridge theorem](1084_the_minimal_spectral_graph_has_an_all_orders_rank_one_bridge_normal_form_that_forbids_holomorphic_cross_six_mixing.md)
- [gauge quotient and Dai–Freed correction](1092_the_Z9_extension_not_its_naive_mod3_reduction_realizes_baryon_triality_and_matches_the_Dai_Freed_mod9_anomaly.md)
