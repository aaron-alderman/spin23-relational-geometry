# Frontier Wave 7.180: Coupled-Metric Pendulum Gap Audit

**Date:** 25 October 2026

**Status:** exact harmonic join and product-gap correction; nonlinear 24-channel gap open

**Evidence:** [coupled metric and pendulum audit](../../../../evidence/data/leech-coupled-metric-pendulum-gap-audit-v1.json)

**Certificate:** [matrix reconstruction and harmonic-spectrum verifier](../../../../verification/verify/verify_leech_coupled_metric_pendulum_gap_audit.mjs)

## The two successful surrogates do not simply concatenate

Wave 7.160 certified a converged gap of $0.8784249807$ for one pendulum
and used a 24-fold product of identical copies. Waves 7.169--179 independently
compiled and commissioned a nontrivial Leech charging metric. The physical
join of those ingredients is instead

\[
 H={U\over2}n^T G^{-1}n+u\sum_{i=1}^{24}(1-\cos\theta_i),
 \qquad [\theta_i,n_j]=i\delta_{ij}.
\]

For the selected Gram-first coordinate, $G$ has 179 nonzero off-diagonal
pairs. The kinetic term therefore couples the compact channels. The Wave
7.160 product spectrum transports only if the charging form is diagonal in
the same integral compact coordinates as the cosine arguments. A real
orthogonal whitening is not a repair: it makes the quadratic form simple but
generically turns the local compact cosines into coupled, nonintegral vertex
operators.

This corrects the experimental narrative. The exact single-pendulum result
remains a valuable cutoff and local-element benchmark, but it is not the gap
of the proposed Leech-metric carrier.

## What can already be predicted exactly

Near a cosine minimum, the joined Hamiltonian has the quadratic limit

\[
 H_{\rm harm}={U\over2}n^TG^{-1}n+{u\over2}\theta^T\theta,
 \qquad \omega_a=\sqrt{Uu/\lambda_a(G)}.
\]

The executable certificate reconstructs the exact Gram-first matrix and
diagonalizes it independently. At $U=u=1$,

| quantity | value |
|---|---:|
| $\lambda_{\min}(G)$ | 0.02332484954 |
| $\lambda_{\max}(G)$ | 22.22932261 |
| $\kappa_2(G)$ | 953.0317687 |
| lowest harmonic frequency | 0.2120981525 |
| highest harmonic frequency | 6.547727164 |
| frequency ratio | 30.87121262 |

The lowest small-oscillation frequency is only 0.24145 times the independent
pendulum gap, a factor of 4.1416 lower. This is not a bound on the exact
nonlinear gap; it is the correct linearized onset and a direct spectroscopy
target. The evidence record freezes all 24 eigenvalues, frequencies and
scale-free frequency ratios; the experiment therefore has 23 held-out shape
coordinates after fitting one overall energy scale.

## Finite experiment

First pass the Wave 7.177 linear 24-port packet. Then install the local cosine
elements and perform weak spectroscopy across all 24 normal modes. With one
overall energy scale fitted, the resonance ratios must agree with the
eigenvalues of the already measured matrix $G$. This tests the metric-to-
dynamics dictionary without invoking the Monster.

Next use weak-drive and two-tone spectroscopy while sweeping a calibrated
tunable $U/u$ ratio. Record the anharmonic transitions and compare held-out
modes and ratio settings against a finite-cutoff diagonalization using the
same measured $G$ and one fitted device model. Reject the carrier if the
resonance ratios fail, if the shared model cannot predict held-out data, or
if the inferred nonlinear gap is cutoff-unstable.

Passing would establish a physical, coupled compact Leech-metric dynamics.
It would still not establish the thermodynamic bulk gap, 24 chiral edge modes,
orbifold sector or Monster products; those remain later promotion gates.

## Corpus links

- [Rotor-native product pendulum](frontier_wave7_160_leech_rotor_native_pendulum_gap.md)
- [Exact transformer recovery](frontier_wave7_170_leech_transformer_capacitance_recovery.md)
- [24-port commissioning packet](frontier_wave7_177_leech_24port_admittance_commissioning_packet.md)
- [Adversarial PSD parasitic bound](frontier_wave7_179_leech_adversarial_psd_parasitic_bound.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
- [Coupled anharmonic spectroscopy](frontier_wave7_181_leech_coupled_anharmonic_spectroscopy.md)
