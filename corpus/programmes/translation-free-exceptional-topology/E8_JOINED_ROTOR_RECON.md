# E8 joined-rotor nonlinear reconnaissance

**Date:** 26 October 2026

**Status:** 117,361-state projected spectra resolved; continuum gaps not converged

**Parent:** [adaptive-shell solver](E8_ADAPTIVE_SHELL_SOLVER.md)

**Evidence:** [cutoff reconnaissance ledger](../../../evidence/data/translation-free-e8-joined-rotor-cutoff-recon-v1.json)

**Solver:** [matrix-free shell Lanczos](../../../scripts/solve-translation-free-e8-joined-rotor.mjs)

**Certificate:** [recomputation and cutoff audit](../../../verification/verify/verify_translation_free_e8_joined_rotor_cutoff_recon.mjs)

## The nonlinear models are already distinguishable

The common E8-shell compiler was executed for both conditional step graphs.
At every cutoff the Hamiltonian is applied without constructing a dense
matrix, and a fully reorthogonalized Lanczos projection resolves four low
levels. Complete shells through kinetic energy six contain 117,361 states.

| cutoff | states | (K)-kernel ground | (K)-kernel gap | (K^{-1})-kernel ground | (K^{-1})-kernel gap |
|---:|---:|---:|---:|---:|---:|
| 1 | 241 | 6.276774 | 0.429336 | 7.532843 | 0.501231 |
| 2 | 2,401 | 5.468592 | 0.241911 | 7.273991 | 0.590525 |
| 3 | 9,121 | 5.082400 | 0.135459 | 7.057355 | 0.474016 |
| 4 | 26,641 | 4.865702 | 0.112768 | 6.898491 | 0.468880 |
| 6 | 117,361 | 4.710110 | 0.105608 | 6.685580 | 0.368244 |

The two branches are not related by merely relabelling the low nonlinear
spectrum. The shared kinetic multiplicities coexist with different potential
graphs, and those graphs produce separated ground energies and gaps.

## Why this is not yet the claimed gap

The maximum projected Ritz residual at cutoff six is below (4\times10^{-14}).
That certifies the numerical eigensolve inside the projected basis. It does
not certify that omitted shells have stopped shifting the result.

From cutoff four to six, the (K)-kernel first gap changes by 6.35% and the
(K^{-1})-kernel gap changes by 21.46%. Both fail the preregistered one-percent
promotion threshold. The result is therefore a successful nonlinear
reconnaissance and a failed continuum-gap promotion. Reporting either last
number as "the E8 gap" would conflate solver residual with cutoff error.

## Engineering consequence

Full reorthogonalization is excellent for an auditable reconnaissance but
stores every Lanczos vector. The next complete shells contain 340,321,
794,161 and 1,604,401 states. Reaching them safely requires a restarted block
Lanczos or Davidson implementation that retains a small Ritz subspace, plus a
boundary-leakage estimator and drive-transition weights. The sparse
Hamiltonian itself remains cheap: no row has more than sixteen neighbors.
