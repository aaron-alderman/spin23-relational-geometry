# Frontier Wave 7.194: Joined-Cell Bond Convergence

**Date:** 25 October 2026

**Status:** resumed fixed-cutoff tensor ladder; convergence still rejected

**Evidence:** [bond-convergence record](../../../../evidence/data/leech-joined-cell-bond-convergence-v1.json)

**Executable:** [checkpointable parity-resolved runner](../../../../scripts/reconnoiter-leech-joined-cell-dmrg.py)

**Certificate:** [monotonicity and stop-rule verifier](../../../../verification/verify/verify_leech_joined_cell_bond_convergence.mjs)

## Separate tensor error from rotor cutoff

Wave 7.193 changed local cutoff and bond dimension together. The cutoff-four
states are now checkpointed and resumed at larger bond dimension, so each
new rung measures additional tensor capacity rather than a new random start.
The model remains the full 24-channel compact rotor at \(U/u=10^{-2}\).

| maximum bond \(\chi\) | even energy | odd energy | variational gap | even/odd residual proxies |
|---:|---:|---:|---:|---:|
| 32 | 2.352585 | 2.472635 | 0.120049 | 0.15265 / 0.16286 |
| 48 | 2.345487 | 2.463580 | 0.118093 | 0.12212 / 0.13222 |
| 64 | 2.341761 | 2.458502 | 0.116741 | 0.10219 / 0.11349 |

Both energies and both residual proxies improve monotonically. The gap shifts
by -0.0019565 and then -0.0013520. The latter is still 69.1% of the former,
so the apparent gap has not entered a stable geometric tail. At bond 64, the
residual proxies remain comparable to the entire 0.11674 gap and roughly five
times the 0.02072 weak-cosine target. This fails the convergence gate.

Global inversion is not the problem: at bond 64 the parity expectations are
0.999876 and -0.99999995. The live error is tensor approximation inside each
sector. Charge cutoff five would add a second uncontrolled axis before this
one is resolved, so it is explicitly deferred.

## Monitorable numerical lane

The runner now supports:

- saved-state input and output for each parity sector;
- independent even-only or odd-only execution;
- per-sector JSON emitted as soon as that sector completes;
- optional deferred \(H^2\) variance evaluation for cheaper optimization
  monitoring.

The next rung should test a better subspace expansion or bonds 80 and 96 from
the saved bond-64 states. Acceptance requires residual proxies well below the
change in the proposed gap and agreement across independent seeds and the
catalogue-order control. Only then should the charge-cutoff ladder resume.

## Boundary

All energies remain variational upper estimates. The residuals are numerical
diagnostics, not validated lower enclosures. This wave quantifies why the gap
is not yet certified; it does not promote Gate A.

## Corpus links

- [Full joined-cell DMRG reconnaissance](frontier_wave7_193_leech_joined_cell_dmrg_reconnaissance.md)
- [Joined-cell MPO certificate architecture](frontier_wave7_191_leech_joined_cell_mpo_certificate_architecture.md)
- [Metric-optimized MPS ordering](frontier_wave7_192_leech_joined_cell_mps_order.md)
- [Product-to-coupled dependency audit](frontier_wave7_190_leech_product_to_coupled_dependency_audit.md)
