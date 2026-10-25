# Frontier Wave 7.181: Coupled Leech Anharmonic Spectroscopy

**Date:** 25 October 2026

**Status:** executable first-order nonlinear fingerprint; exact compact spectrum open

**Evidence:** [anharmonic spectroscopy record](../../../../evidence/data/leech-coupled-anharmonic-spectroscopy-v1.json)

**Certificate:** [eigenvector and perturbative-shift verifier](../../../../verification/verify/verify_leech_coupled_anharmonic_spectroscopy.mjs)

## The first nonlinear prediction

Wave 7.180 froze the complete harmonic fingerprint of

\[
 H={U\over2}n^TG^{-1}n+u\sum_i(1-\cos\theta_i).
\]

The next term in the cosine is not 24 independent self-Kerr corrections.
The normal modes are mixed by the Gram-first eigenvector matrix $O$. If

\[
 s_a={1\over2}\sqrt{U\over u\lambda_a},\qquad
 C_{ab}=\sum_i O_{ia}^2O_{ib}^2,
\]

then first-order perturbation theory in the quartic potential gives

\[
 \delta\omega_a=-{u\over2}\left[s_a^2C_{aa}
 +s_a\sum_{b\ne a}s_bC_{ab}\right].
\]

Equivalently,

\[
 {\delta\omega_a\over\omega_a}
 =-\alpha_a\sqrt{U/u}+\text{higher orders}.
\]

The evidence freezes all 24 coefficients in ascending-frequency order. They
range from 0.17638 to 0.31420, and every leading shift is downward. These are
not adjustable Kerr parameters: the already measured $G$ fixes them.

## Quantitative operating window

| $U/u$ | largest physical-coordinate vacuum variance | softest-mode shift | largest mode shift |
|---:|---:|---:|---:|
| $10^{-4}$ | 0.01866 | -0.2246% | 0.3142% |
| $10^{-3}$ | 0.05902 | -0.7104% | 0.9936% |
| $10^{-2}$ | 0.18662 | -2.2464% | 3.1420% |

The table is a perturbative scan, not a proof of its own remainder. It shows
where percent-level nonlinear spectroscopy becomes visible and where higher
orders must begin to be checked explicitly.

## Falsifiable use

Fit $U/u$ using a weak-drive subset of modes. Reserve at least half the modes
and two independently calibrated settings of a tunable $U/u$ ratio. The
held-out modes must reproduce both the harmonic targets from Wave 7.180 and
the frozen leading downward shifts of the $0\to1$ transitions without
mode-specific fits. Two-tone $1\to2$ spectroscopy supplies an additional
anharmonic check. Upward leading shifts or the wrong coefficient pattern
reject the local-diagonal-cosine join even if the linear network passed.

The first systematic departure from the quartic law supplies the appropriate
energy window and rotor cutoff for the next exact sparse diagonalization. It
does not itself establish the exact nonlinear gap, interwell tunnelling, the
two-dimensional bulk phase, the chiral edge or the Monster.

[Wave 7.182](frontier_wave7_182_leech_one_quantum_quartic_mixing.md) checks
the complete off-diagonal quartic block. The leading diagonal fingerprint is
stable: projected mixing changes no transition by more than 0.0404% relative
at the strongest declared ratio, although higher quantum sectors remain open.

## Corpus links

- [Coupled-metric pendulum-gap audit](frontier_wave7_180_leech_coupled_metric_pendulum_gap_audit.md)
- [Rotor-native product pendulum](frontier_wave7_160_leech_rotor_native_pendulum_gap.md)
- [24-port commissioning packet](frontier_wave7_177_leech_24port_admittance_commissioning_packet.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
- [One-quantum quartic mixing audit](frontier_wave7_182_leech_one_quantum_quartic_mixing.md)
