# The Selected-Flavour Texture Zero Keeps Electron Normal Ordering Open, Excludes Electron Inverted Ordering, and Leaves Mu/Tau Branches Parameter-Dependent

**Date:** 18 October 2026  
**Branches:** B-RANK-ONE-Q-SEESAW-SELECTED-TEXTURE-ZERO and B-CHARGED-LEPTON-SPECTRAL-FAMILY-FLAG  
**Claim status:** exact phase-existence criterion and exact electron/inverted-ordering exclusion over the stated NuFIT 6.0 (3\sigma) box; other numerical envelopes are deterministic existence scans, not likelihood intervals  
**Certificate:** [scan_selected_flavour_texture_zeros_nufit6.mjs](../../../verification/scan/scan_selected_flavour_texture_zeros_nufit6.mjs)

## Executive result

The conditional theorem in [1111](1111_a_rank_one_complementary_Majorana_block_can_give_three_heavy_masses_but_block_preserving_seesaw_forces_a_selected_flavour_texture_zero.md) produces one of three equations,

\[
(m_\nu)_{ee}=0,
\qquad
(m_\nu)_{\mu\mu}=0,
\qquad
(m_\nu)_{\tau\tau}=0.
\]

The first phenomenology pass yields a genuine branch split:

1. (P=P_e), normal ordering: **open**, with a best-fit lightest-mass interval near (2.35)--(6.46) meV and a sampled (3\sigma) existence envelope near (1.57)--(8.33) meV.
2. (P=P_e), inverted ordering: **closed** throughout the stated NuFIT 6.0 (3\sigma) input box by an analytic inequality.
3. (P=P_\mu) or (P=P_\tau): **open but strongly parameter-dependent**. Solutions occur for parts of both orderings, often at larger absolute mass; these branches require a likelihood scan and independent absolute-mass constraints before any viability claim.

This is already useful. If the microscopic selector chooses the electron projector, it also chooses normal ordering and a narrow lightest-mass window. If it chooses muon or tau, the current algebraic theorem alone is less selective.

## 1. The exact complex-triangle criterion

In the charged-lepton mass basis,

\[
(m_\nu)_{\alpha\alpha}
=\sum_{i=1}^3m_iU_{\alpha i}^{*2}.
\]

The two independent Majorana phases can vary two relative phases among the three terms. Therefore a zero exists if and only if the three positive lengths

\[
L_i=m_i|U_{\alpha i}|^2
\]

can close a triangle:

\[
\boxed{
2\max_i L_i\le L_1+L_2+L_3.
}
\]

This criterion is exact. It avoids a wasteful two-phase grid and cleanly separates phase existence from oscillation-parameter likelihoods.

## 2. Input contract

The certificate uses the NuFIT 6.0 parameter ranges with the atmospheric data combination identified on the official results page and scans:

- the stated (3\sigma) ranges of \(\sin^2\theta_{12}\), \(\sin^2\theta_{13}\), \(\sin^2\theta_{23}\), \(\delta_{CP}\), \(\Delta m^2_{21}\) and the atmospheric splitting;
- both normal and inverted ordering;
- lightest mass from (10^{-6}) eV to (1) eV;
- all three selected flavors.

The official NuFIT 6.1 page is now available, but the present certificate deliberately records a reproducible 6.0 input box rather than pretending that a sampled box is a 6.1 likelihood analysis. Updating to the complete 6.1 tables is a bounded follow-up.

## 3. Electron-selected branch

For the electron row,

\[
|U_{e1}|^2=c_{12}^2c_{13}^2,
\qquad
|U_{e2}|^2=s_{12}^2c_{13}^2,
\qquad
|U_{e3}|^2=s_{13}^2.
\]

### 3.1 Normal ordering

At the listed best-fit point, triangle closure occurs for

\[
2.3486\text{ meV}\lesssim m_1\lesssim6.4617\text{ meV}.
\]

Across the deterministic sample of the stated (3\sigma) box, every sampled parameter point has a solution, with the union envelope

\[
1.5704\text{ meV}\lesssim m_1\lesssim8.3314\text{ meV}.
\]

The envelope is not a confidence interval. It says only that solutions were found within this union and that the sampled parameter points all admitted some electron-normal solution.

### 3.2 Inverted ordering

The electron-inverted branch is excluded without phase sampling. Divide the necessary triangle inequality

\[
m_1w_1\le m_2w_2+m_3w_3
\]

by (m_1), where (w_i=|U_{ei}|^2). Over the stated input box,

\[
w_1\ge0.63922105,
\]

while

\[
\frac{m_2}{m_1}
\le
\left(1-\frac{\Delta m^2_{21,\max}}{|\Delta m^2_{32}|_{\min}}\right)^{-1/2},
\qquad
\frac{m_3}{m_1}\le1.
\]

Even after maximizing the two cancelling sides independently, the conservative difference remains positive. Thus the largest electron term cannot be cancelled:

\[
\boxed{(m_\nu)_{ee}=0+\mathrm{IO}\quad\text{is excluded over the input box}.}
\]

## 4. Muon-selected branch

At the listed best-fit points, the certificate finds:

\[
\mathrm{NO}:\quad
m_1\gtrsim79.7\text{ meV},
\]

within the scanned (1) eV ceiling, and

\[
\mathrm{IO}:\quad
15.6\text{ meV}\lesssim m_3\lesssim83.5\text{ meV}.
\]

The (3\sigma) existence sample is broader. Roughly half of the sampled normal-ordering points admit a solution, whereas every sampled inverted-ordering point does. This dependence is driven by \(\theta_{23}\) and \(\delta_{CP}\), which redistribute the muon-row weights.

These are existence statements only. High-mass solutions must be checked against beta-decay, cosmological and neutrinoless-double-beta constraints under clearly stated model assumptions.

## 5. Tau-selected branch

At the listed normal-ordering best fit, no tau-diagonal zero occurs below the (1) eV scan ceiling. Nevertheless, a substantial part of the (3\sigma) box admits solutions, with a sampled union beginning near (45.2) meV. This means the best-fit absence is not a robust exclusion.

For inverted ordering, the listed best fit admits

\[
m_3\gtrsim28.6\text{ meV},
\]

and every sampled (3\sigma) parameter point admits some solution, with the sampled union reaching down to sub-meV lightest mass for favorable mixing parameters.

Again, the wide union is not a confidence interval. It reveals sensitivity to the oscillation parameters rather than a broad probability distribution.

## 6. What this says about the selector

The family selector was previously unable to choose among

\[
P_e,quad P_\mu,quad P_\tau.
\]

The seesaw descent does not solve that selection problem, but it makes the choices empirically inequivalent:

| Selected projector | Normal ordering | Inverted ordering | Present status |
|---|---:|---:|---|
| (P_e) | narrow low-mass window | excluded over input box | sharpest branch |
| (P_\mu) | parameter-dependent, often high mass | open | requires full likelihood and absolute-mass tests |
| (P_\tau) | parameter-dependent; absent at listed best fit | open | requires full likelihood and absolute-mass tests |

The electron branch is therefore the highest-value next target. It is both restrictive and directly tied to (m_{\beta\beta}).

## 7. Important boundaries

**Likelihood boundary:** uniform sampling of published (3\sigma) boxes ignores correlations and is not a statistical fit.

**Version boundary:** NuFIT 6.1 is current; this certificate uses explicitly recorded 6.0 ranges so its numerical contract is auditable.

**Absolute-mass boundary:** the scan intentionally runs to (1) eV to classify the algebraic triangle. It does not declare the high-mass portion physically viable.

**Mechanism boundary:** ((m_\nu)_{ee}=0) removes the standard light-neutrino exchange contribution to (0\nu\beta\beta), not every possible short-distance contribution.

**Alignment boundary:** all texture zeros are exact only under the (P/Q)-preserving Dirac hypothesis from 1111.

## 8. Stop-everything criteria

**Positive trigger:** the finite spectral triple independently selects (P_e) and aligns (m_D). Then the programme predicts normal ordering plus a narrow lightest-mass band and a vanishing tree-level light-neutrino (m_{\beta\beta}).

**Electron stop:** a robust experimental determination of inverted ordering closes the exact electron-selected branch.

**Zero stop:** a nonzero lower bound on the standard light-neutrino (m_{\beta\beta}), interpreted within the three-Majorana-neutrino mechanism, closes the exact electron-selected branch.

**Alignment escape:** failure of an exact zero need not close the heavy rank-one theorem if the finite Dirac sector produces controlled (P/Q) leakage. The size and phase of that leakage must then be predicted rather than fitted freely.

## 9. Verdict

The scan does not show that the Jordan selector chooses the electron family. It shows that choosing it would have teeth:

\[
\boxed{
P=P_e, [m_D,P_e]=0
\Longrightarrow
\text{normal ordering and }m_1\text{ in a narrow meV window}.
}
\]

The inverted electron branch is the first phenomenological branch closed by the Pati–Salam/Jordan/Spin(2,3) chain. Muon and tau selections remain open but are less economical because their surviving regions are more parameter-dependent and often extend into high absolute-mass territory.

## Sources and corpus position

- [NuFIT 6.0 official results page](https://www.nu-fit.org/?q=node%2F294)
- [NuFIT 6.0 publication](https://arxiv.org/abs/2410.05380)
- [NuFIT 6.1 official update](https://www.nu-fit.org/?q=node%2F309)
- [rank-one heavy block and seesaw texture-zero theorem](1111_a_rank_one_complementary_Majorana_block_can_give_three_heavy_masses_but_block_preserving_seesaw_forces_a_selected_flavour_texture_zero.md)
- [quartic rank-one gate](1110_the_minimal_spectral_kinetic_metric_can_be_normalized_to_the_Jordan_face_but_quartic_exchange_forces_the_Q_Majorana_block_to_rank_one.md)
- [electron/normal Majorana-phase branches](1113_the_surviving_electron_normal_texture_zero_has_two_mirror_Majorana_phase_branches_and_a_narrow_absolute_mass_band.md)
- [null-line Dirac-misalignment lifting](1114_Dirac_misalignment_lifts_the_selected_texture_zero_linearly_only_toward_the_complementary_Majorana_null_line.md)
