# E8 adaptive-shell nonlinear solver

**Date:** 26 October 2026

**Status:** exact basis and operator compilation; nonlinear eigenvalues open

**Parent:** [constitutive-metric gate](E8_CONSTITUTIVE_METRIC_GATE.md)

**Evidence:** [shell and solver ledger](../../../evidence/data/translation-free-e8-adaptive-shell-solver-plan-v1.json)

**Certificate:** [theta-series and integral-equivalence verifier](../../../verification/verify/verify_translation_free_e8_adaptive_shell_solver_plan.mjs)

## One kinetic carrier, two nonlinear graphs

The two conditional quadratic forms are integrally isospectral. If
(m=K^{-1}n), unimodularity gives a bijection of (mathbb Z^8) and

\[
 n^TK^{-1}n=m^TKm.
\]

Both branches can therefore be diagonalized on one basis ordered by complete
E8 kinetic shells. They are still different Hamiltonians. In the common
(m)-basis, the (M=K) cosine moves by (pm e_i), while the (M=K^{-1})
cosine moves by the dense integral columns (pm K^{-1}e_i). The charging
energies agree as multisets; the potential hopping graphs do not.

This is the nonlinear version of the constitutive firewall. It also gives a
clean typed implementation: carrier = E8 shell; operator = declared step set;
detector = converged low spectrum and transition weights.

## Exact resource forecast

The E8 theta series gives every shell multiplicity without enumerating a
rectangular eight-dimensional box:

\[
 \Theta_{E_8}(q)=1+240\sum_{m\ge1}\sigma_3(m)q^m.
\]

With kinetic energy (m=Q/2), complete-shell cutoffs have the following
dimensions.

| maximum kinetic energy | basis states | four vectors |
|---:|---:|---:|
| 4 | 26,641 | 0.813 MiB |
| 6 | 117,361 | 3.582 MiB |
| 8 | 340,321 | 10.386 MiB |
| 10 | 794,161 | 24.236 MiB |
| 12 | 1,604,401 | 48.962 MiB |
| 15 | 3,721,681 | 113.577 MiB |

Each row has at most sixteen potential neighbors, so the Hamiltonian should be
applied matrix-free. The difficult inverse-kernel branch is not dense as an
operator: its individual steps are long in coordinates, but there are still
only sixteen of them.

## Convergence contract

At cutoffs 4, 6, 8, 10 and 12, record the ground energy, first three gaps,
parity, eight local-drive transition weights and the eigensolver residual.
Promote a level only when successive complete-shell cutoffs agree inside the
declared tolerance and boundary weight or residual decreases. A Rayleigh--Ritz
level in one finite shell is an upper bound, not the continuum gap.

This construction avoids the misleading coordinate-box cost created by the
smallest Cartan eigenvalue and preserves every state at a given kinetic
energy. It is now concrete enough to implement as a hash-indexed shell
enumerator plus a matrix-free block Lanczos or Davidson solve.

The [operator-completeness audit](E8_OPERATOR_COMPLETENESS_GATE.md) adds a
necessary qualification: the dense inverse-branch step with the largest
vacuum kinetic cost first enters at shell 15. Lower inverse-branch rungs are
useful reconnaissance but not complete eight-cosine approximations.
