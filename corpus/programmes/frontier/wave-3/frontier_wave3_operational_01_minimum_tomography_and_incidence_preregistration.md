# Frontier Wave 3 Operational 01: four coherent settings close the face response; three ALP observables test the incidence fork

**Date:** 18 October 2026  
**Status:** exact identifiability theorem; reproduced ALP benchmark; present-sensitivity boundary  
**Certificate:** [verify_frontier_wave3_operational_tomography.mjs](../../../../verification/verify/verify_frontier_wave3_operational_tomography.mjs)  
**Numerical data:** [frontier_wave3_incidence_alpaca_pair_summary.json](frontier_wave3_incidence_alpaca_pair_summary.json)

## Result

Two different operational tasks require different minimum datasets.

1. To reconstruct the two calibrated face products
   \[
   A_L=g_Lz_L,\qquad A_R=g_Rz_R
   \]
   up to their physically irrelevant common phase, a complex response requires four coherent intensity settings. On a verified CP-real slice, three suffice.
2. To distinguish only the two positive incidence hypotheses
   \[
   (-10,-6,-2)\quad\text{and}\quad(-10,-6,-4),
   \]
   no sign measurement is needed. A top-sensitive production measurement plus a charged-lepton partial width is sufficient ideally. Experimentally this becomes the three-observable set: production branching ratio, proper lifetime, and leptonic decay fraction.

These three readings form a field-theory [operator-to-record
ledger](../../admissibility/admissibility_127_transition_operators_selection_rules_and_lifetime_frontier.md),
not three interchangeable rate proxies: production prepares the sector, the
leptonic operator and phase space give one partial width, all competing widths
give the proper lifetime, and acceptance maps the decay position and channel
into a record.

The existing NA62/ALP programme implements the second, weaker test. It does not perform complete two-face tomography.

## 1. Ideal rank-complete tomography

Let

\[
A=\binom{A_L}{A_R},
\qquad G=AA^\dagger
=\begin{pmatrix}
|A_L|^2&A_LA_R^*\\
A_RA_L^*&|A_R|^2
\end{pmatrix}.
\]

For a calibrated coherent source vector (v), measure

\[
I(v)=v^\dagger Gv.
\]

Choose

\[
v_L=(1,0),\quad
v_R=(0,1),\quad
v_+=(1,1),\quad
v_i=(1,i).
\]

Then

\[
\begin{aligned}
I_L&=G_{LL},\\
I_R&=G_{RR},\\
I_+&=G_{LL}+G_{RR}+2\operatorname{Re}G_{LR},\\
I_i&=G_{LL}+G_{RR}+2\operatorname{Im}G_{LR}.
\end{aligned}
\]

Therefore

\[
\operatorname{Re}G_{LR}=\frac{I_+-I_L-I_R}{2},
\qquad
\operatorname{Im}G_{LR}=\frac{I_i-I_L-I_R}{2}.
\]

The four measurement rows have rank four on (H_2(\mathbb C)). They reconstruct every Hermitian response, and for a rank-one response recover (A) up to one common phase.

This is minimal for globally injective complex two-component intensity tomography. Three intensities leave a conjugation/phase ambiguity even after imposing rank one.

### CP-real reduction

If an independent test establishes (G_{LR}\in\mathbb R), omit (v_i). The three settings (L,R,+) have rank three on (H_2(\mathbb R)) and are minimal. The interference setting is essential:

\[
(A_L,A_R)=(a,b)\quad\text{and}\quad(a,-b)
\]

have the same two pure-face rates but different (I_+).

Thus pure (L/R) rates determine magnitudes; a coherent superposition determines the relative sign; a quadrature-shifted superposition determines the complex phase.

## 2. Physical requirements for the four settings

The theorem assumes more than four event counts. Each source setting must have:

- a known relative magnitude and phase at the interaction point;
- the same kinematic normalization and acceptance correction;
- a common final-state inclusive sum so that amplitudes can interfere;
- control of source-dependent backgrounds and contacts;
- a phase convention transported between runs.

If the (L) and (R) probes populate distinguishable final states, there is no interference and neither (I_+) nor (I_i) exists operationally. A simple pseudoscalar ALP supplies one fixed chirality-flip combination, not four independently phase-controlled sources. NA62 therefore cannot reconstruct (G) by itself.

A rank-complete implementation would require a second independently calibrated scalar/pseudoscalar or polarization-sensitive source and coherent control of their relative phase.

## 3. The smaller incidence-fork theorem

The two incidence candidates have Yukawa-divergence coordinates

\[
(10,6,2,1),\qquad(10,6,4,1).
\]

Their up/top coordinate is identical and their charged-lepton coordinate differs by two. Therefore the reduced ratio

\[
D_{\ell/t}
=\frac{\mathcal A_\ell/w_\ell}{\mathcal A_t/w_t}
=\left|\frac{c_\ell}{c_t}\right|^2
\]

is

\[
D_{\ell/t}^{(d)}=\frac1{25},
\qquad
D_{\ell/t}^{(m)}=\frac4{25}.
\]

This one ratio identifies the fork under the two-hypothesis model. It cannot determine a relative sign, but both candidate rays have the same declared sign. If arbitrary rays are admitted, a sign-sensitive interference measurement must be added.

## 4. Minimum low-mass ALP observable set

Below the top threshold, rare-kaon production supplies a top-seeded calibrator. Define

\[
\Gamma_{\ell\ell}=\frac{\operatorname{BR}(a\to\ell\ell)}{\tau_a},
\qquad
\Gamma_{K\pi a}=\frac{\operatorname{BR}(K\to\pi a)}{\tau_K}.
\]

After dividing the calculated phase-space and matching factors,

\[
\widehat D_{\ell/K}
\propto\frac{\Gamma_{\ell\ell}}{\Gamma_{K\pi a}}
\]

cancels the common (f_a^{-2}). The minimum robust measured set is therefore

\[
\boxed{
\left{
\operatorname{BR}(K^+\to\pi^+a),
\ c\tau_a,
\operatorname{BR}(a\to\ell^+\ell^-)
\right}.}
\]

When the leptonic branching fraction is demonstrably unity and no extra width is allowed, this reduces to

\[
\Xi_K=\operatorname{BR}(K\to\pi a)c\tau_a.
\]

That two-reading shortcut is not rank-complete once photon, hadron or invisible widths are nuisance parameters.

The matched EFT and running must be evaluated consistently; [Bauer et al., *The Low-Energy Effective Theory of Axions and ALPs*](https://arxiv.org/abs/2012.12272) supplies the relevant operator-basis and weak-matching framework.

## 5. Recomputed incidence-pair benchmark

The existing ALPaca 1.2.0 driver was rerun with:

\[
\mu_{\rm UV}=10\ \mathrm{TeV},\qquad
f_a=10^6\ \mathrm{GeV},\qquad
c_G=c_W=c_B=0,
\]

and generation-universal charge patterns. It gives:

| (m_a) | quantity | deduplicated ((-10,-6,-2)) | multiplicity ((-10,-6,-4)) | dedup/mult |
|---:|---|---:|---:|---:|
| 100 MeV | (\operatorname{BR}(K^+\to\pi^+a)) | (3.2939703\times10^{-8}) | (3.2939424\times10^{-8}) | 1.0000085 |
| 100 MeV | (c\tau) | 20.652 km | 7.447 km | 2.773 |
| 300 MeV | (\operatorname{BR}(K^+\to\pi^+a)) | (1.6306944\times10^{-8}) | (1.6306805\times10^{-8}) | 1.0000085 |
| 300 MeV | (c\tau) | 0.22780 m | 0.082587 m | 2.758 |

Running changes the bare factor-four limiting ratio to about (2.76) in the full benchmark, chiefly because the low-energy charged-lepton coefficients are approximately

\[
-3.1812\quad\text{and}\quad-5.1809
\]

rather than (-2) and (-4), and because small photon widths remain.

Production alone is blind at the (10^{-5}) relative level in this fixed benchmark. Lifetime or partial width carries essentially all of the fork information.

## 6. Present NA62 sensitivity

The current NA62 hidden-sector analysis reports no discovery and supplies mass- and lifetime-dependent upper limits on (K^+\to\pi^+X), including visible dimuon and invisible regimes: [NA62 Collaboration, *Searches for hidden sectors using (K^+\to\pi^+X) decays*](https://arxiv.org/abs/2507.17286).

Using the published 300 MeV prompt limit and lifetime-acceptance approximation already digitized in the corpus, the two fixed benchmark rays cross the observed curve at

\[
f_a^{(d)}=1.804\times10^6\ \mathrm{GeV},
\qquad
f_a^{(m)}=2.319\times10^6\ \mathrm{GeV}.
\]

The separation is real at curve level, but it is not an experimental identification of either ray:

- the overall scale (f_a) is free;
- the published result is an upper-limit curve, not a detected lifetime and branching-fraction triplet;
- independent gauge coefficients, flavor nonuniversality and invisible widths can mimic lifetime changes;
- the public curve is not the collaboration likelihood.

Present data can exclude regions of each conditional benchmark. They cannot select deduplicated versus multiplicity-preserving incidence without a signal and additional observables.

## 7. Preregisterable measurement and decision set

For a future signal, preregister the following primary analysis.

### Declared primary model

1. generation-universal fermion pattern at 10 TeV;
2. (c_G=c_W=c_B=0) at that scale;
3. no extra invisible or hidden decay width;
4. the two discrete hypotheses only: ((-10,-6,-2)) and ((-10,-6,-4));
5. full RG running, electroweak matching and detector lifetime acceptance fixed before unblinding.

### Primary measured vector

\[
\mathcal O_{\rm primary}
=\left(
m_a,
\operatorname{BR}(K^+\to\pi^+a),
c\tau_a,
\operatorname{BR}(a\to\ell\ell)
\right).
\]

The mass is a kinematic coordinate rather than a charge coordinate, but it is required to calculate all phase-space and acceptance factors.

### Primary derived statistic

\[
T=\log\widehat D_{\ell/K}
\]

with the complete covariance of production, lifetime, branching fraction, matching and acceptance. At the two bare rays the separation is (log4); in the reproduced 100–300 MeV benchmark the production-times-lifetime separation is approximately

\[
\Delta T\simeq\log(2.76)=1.02.
\]

### Mandatory secondary analysis

Profile (c_G,c_W,c_B), flavor embedding, matching scale, photon/hadron widths and an extra invisible width. Report whether the discrete likelihood ratio remains identifiable. If it collapses, the ALP realization is indeterminate rather than evidence against the algebraic incidence calculation.

### Sign extension

Do not claim the relative sign of the lepton and top coordinates from rates. A sign claim requires a preregistered interference observable with a known reference amplitude. None is supplied by the present NA62 counting channels.

## 8. Rank and boundary ledger

| Goal | Minimum ideal measurements | Rank | Presently realized? |
|---|---:|---:|---:|
| General complex (2\times2) face response | (I_L,I_R,I_+,I_i) | 4 | no |
| CP-real (2\times2) face response | (I_L,I_R,I_+) | 3 | no |
| Two fixed positive incidence rays | one calibrated lepton/top magnitude ratio | 1 hypothesis coordinate | conditionally |
| Low-mass ALP with unknown total-width composition | production, lifetime, leptonic branching | 3 readings | no signal yet |
| Relative sign of incidence coordinates | add coherent interference | one extra phase-sensitive reading | no |

## 9. Verdict

The ideal tomography problem is closed: four coherent intensities are rank complete over (H_2(\mathbb C)), and three are rank complete on a verified real slice.

The incidence fork is operationally cheaper. In the fixed ALP benchmark it produces an almost identical kaon rate and a lifetime ratio near (2.76), leading to separated NA62 curve crossings. But present upper limits do not identify the ray, and a simple ALP does not provide full left/right face tomography.

The programme now has a preregisterable target rather than an unspecified “lepton-sensitive observable.” Its decisive experimental object is a production–lifetime–leptonic-fraction triplet, with nuisance profiling and an explicit prohibition on inferring signs from rates.

