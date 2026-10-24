# Frequency-moment bounds and compute boundary

**Date:** 24 October 2026  
**Status:** ultraviolet-escape test disfavoured; controlled low-frequency window requires external-scale implementation  
**Target:** [FPT-004](../frontier-physics-targets/frontier_physics_target_assessments_v1.md#fpt-004)  
**Parent:** [AZ-049](admissibility_49_fixed_density_block_cross_rank_boundary.md)  
**Evidence:** [Machine-readable register](../../../evidence/data/admissibility-planckian-frequency-moment-boundary-v1.json)

## Reachable frequency bound

For a two-current block define M0_ab=Tr(J_a^dagger J_b)/D and M2_ab=Tr([H,J_a]^dagger[H,J_b])/D. The square roots of the generalized eigenvalues of (M2,M0) are RMS frequency scales for the two positive response directions. They do not resolve the spectrum, but they test the simplest loophole in AZ-049: that the second integrated direction survives only by moving to an ever-higher ultraviolet scale.

| L | sampling | centre RMS modes | endpoint RMS modes |
|---:|---|---|---|
| 3 | exact, 630 columns | (3.651, 4.535) | (3.627, 4.426) |
| 5 | 8 columns | (3.144, 3.873) | (3.132, 3.948) |
| 7 | 4 columns | (2.879, 4.139) | (2.878, 4.210) |
| 9 | 1 column, preliminary | (2.450, 4.214) | (2.449, 4.251) |

An independent L=9 centre column gives (2.252,4.280). The soft generalized direction decreases with size while the hard direction remains near a finite microscopic scale. The second direction is therefore not fleeing to a frequency that grows with L on this sequence. Sparse L=7 and L=9 sampling is not sufficient to claim converged frequency moments, much less dc transport.

## Literature crosswalk

The required next method is conventional rather than speculative. The [kernel polynomial method](https://doi.org/10.1103/RevModPhys.78.275) supplies Chebyshev expansions and stochastic trace evaluation for spectral quantities; [microcanonical finite-temperature Lanczos](https://doi.org/10.1103/PhysRevB.68.235106) replaces a canonical trace by typical states for dynamical correlations; and [dynamical quantum typicality](https://doi.org/10.1103/PhysRevB.92.205103) has reached current autocorrelations beyond exact diagonalization. A recent transport application demonstrates frequency-dependent mobility with quantum typicality and explicit numerical convergence controls ([Mitric 2025](https://doi.org/10.1103/PhysRevB.111.195140)). The energy-density side is constrained by the quantum gauge-invariance proof of [Huebner, Rigamonti and Draxl](https://doi.org/10.1103/PhysRevB.108.245201) and the bounded-integrated-flux formulation reviewed by [Baroni](https://doi.org/10.1063/5.0304329).

## Exhaustion boundary

The balanced 5x5 sector has 67,603,900 states. One complex128 Krylov vector alone is 1.008 GiB; a minimal three-vector Chebyshev recurrence is 3.02 GiB before thermal vectors, two current channels, basis indexing, buffers and checkpoints. The present Python dictionary action expands combinatorially and is unsuitable for the recurrence. The 7x7 sector has 1.58e15 states and cannot be represented directly at all.

A decisive low-frequency calculation therefore requires a compiled symmetry-resolved matvec, distributed-memory typicality/KPM or an independently validated tensor/network or linked-cluster method. Its admission test is fixed: reproduce the exact 3x3 complex block, show stochastic convergence, then collide L, beta, frequency-window and kernel width while centre and endpoint gauges agree.

Within the current workspace and execution environment, the FPT-004 lane is exhausted at this boundary. The supported result is an interior integrated two-current cone with nondiverging RMS frequency scales. Low-frequency thermodynamic rank, dc coefficients and Planckian universality remain open; Spin(2,3) remains unrelated.
