# Frontier Wave 7.193: Joined-Cell DMRG Reconnaissance

**Date:** 25 October 2026

**Status:** full-carrier variational calculation; convergence and spectral certificate open

**Evidence:** [frozen reconnaissance record](../../../../evidence/data/leech-joined-cell-dmrg-reconnaissance-v1.json)

**Executable:** [parity-resolved DMRG runner](../../../../scripts/reconnoiter-leech-joined-cell-dmrg.py)

**Dependencies:** [isolated numerical requirements](../../../../scripts/requirements-leech-dmrg.txt)

**Certificate:** [record-consistency and non-promotion verifier](../../../../verification/verify/verify_leech_joined_cell_dmrg_reconnaissance.mjs)

## The first full 24-channel compact calculation

The exact Wave 7.191 MPO was optimized directly for all 24 rotor coordinates
at \(U/u=10^{-2}\). The even candidate is the ground state of \(H\). The odd
candidate is selected with \(H+P\), where global inversion \(P\) shifts odd
states down by one unit without changing their eigenvectors. Original
Hamiltonian energies and parity expectations are measured afterward.

Every frozen run uses alternating left/right sweeps, bond dimensions
8, 16 and 32, six sweeps, and the Wave 7.192 metric-optimized order. The
largest represented Hilbert space is \(9^{24}=79766443076872509863361\);
it is never stored densely.

| charge cutoff \(N\) | local dimension | variational gap | gap / order-\(U^2\) reference | even/odd residual proxies |
|---:|---:|---:|---:|---:|
| 1 | 3 | 0.681145 | 32.87 | 0.00144 / 0.00837 |
| 2 | 5 | 0.332750 | 16.06 | 0.01831 / 0.03046 |
| 3 | 7 | 0.186974 | 9.02 | 0.07454 / 0.08868 |
| 4 | 9 | 0.119487 | 5.77 | 0.15174 / 0.16299 |

The monotone drop is not convergence. It is the opposite: a direct warning
that low rotor cutoffs grossly overestimate the soft gap. At cutoff four,
both residual proxies exceed the reported gap, so neither the individual
energies nor their difference has reached the accuracy needed to compare with
the all-mode weak-cosine value 0.02072125. No cutoff extrapolation is admitted.

## Ordering control

At cutoff two and the same resource budget, catalogue order gives gap
0.333376 while the metric-optimized order gives 0.332750, a 0.188% difference.
The optimized order also reduces the even residual from 0.02449 to 0.01831
and the odd residual from 0.04238 to 0.03046. This supports the ordering as a
resource improvement, while the nonzero order dependence independently
rejects a convergence claim.

The parity selector is behaving correctly: every odd candidate has parity
below -0.999997 and the first three even candidates are above 0.99980. The
cutoff-four even value falls to 0.99777, another visible symptom of inadequate
bond dimension rather than a physical symmetry violation.

## Promotion rule

The next run holds cutoff four fixed and increases bond dimension until both
residual proxies are far below the change in the proposed gap. Only then does
the cutoff ladder extend through five to eight, in both optimized and
catalogue control orders. Ritz energies remain upper estimates throughout;
Wave 7.191's validated lower-enclosure step is still mandatory before any
strip thermal or stability number is rebuilt.

This calculation proves feasibility and diagnoses failure. It does not yet
certify \(\Delta_{\rm cell}>0\), a Leech edge, or Monster physics in hardware.

## Corpus links

- [Joined-cell MPO certificate architecture](frontier_wave7_191_leech_joined_cell_mpo_certificate_architecture.md)
- [Metric-optimized MPS ordering](frontier_wave7_192_leech_joined_cell_mps_order.md)
- [Product-to-coupled dependency audit](frontier_wave7_190_leech_product_to_coupled_dependency_audit.md)
- [All-mode full-cosine order two](frontier_wave7_189_leech_24mode_full_cosine_order_two.md)
