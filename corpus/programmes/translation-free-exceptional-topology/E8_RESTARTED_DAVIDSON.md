# E8 restarted nonlinear eigensolver

**Date:** 26 October 2026

**Status:** 340,321-state shell solved for both branches; gap promotion still rejected

**Parent:** [joined-rotor reconnaissance](E8_JOINED_ROTOR_RECON.md)

**Evidence:** [restarted-solver ledger](../../../evidence/data/translation-free-e8-restarted-davidson-v1.json)

**Certificate:** [Davidson/Lanczos cross-check](../../../verification/verify/verify_translation_free_e8_restarted_davidson.mjs)

## The storage barrier is removed

Full reorthogonalization made the first nonlinear spectrum auditable but stored
every Lanczos vector. The solver now also implements a diagonally
preconditioned block Davidson iteration with thick Ritz restarts. At cutoff
two it reproduces the full-Lanczos first two levels of both branches within
the frozen numerical tolerance.

At complete E8 shell eight the basis has 340,321 states. The restarted solve
uses at most 24 subspace vectors for the (K)-kernel branch and 28 for the
(K^{-1})-kernel branch. Counting basis vectors and their images, this caps
the Float64 Krylov storage near 125 and 145 MiB, versus about 467 MiB for a
180-vector Lanczos basis. Shell maps and runtime overhead are additional.

## Cutoff-eight spectrum

| branch | ground | first gap | second gap | first-two max residual |
|---|---:|---:|---:|---:|
| (K)-kernel | 4.6778745403 | 0.1023201434 | 0.1710472467 | (6.4\times10^{-12}) |
| (K^{-1})-kernel | 6.5282225044 | 0.3395197666 | 0.3501899961 | (1.5\times10^{-11}) |

The inverse branch retains a close first/second excited pair, but block
iteration resolves both with explicit residuals. The conditional nonlinear
models remain strongly distinguishable.

## Promotion still fails

From cutoff six to eight, the first gap changes by 3.11% in the (K)-kernel
branch and 7.80% in the inverse branch. Those shifts are smaller than the
previous increment but remain above one percent. The solver bottleneck is
closed at this rung; the continuum inference bottleneck is not.

Cutoff ten, boundary-shell probability and eight drive-transition weights are
next. The gap should be promoted only after two successive complete-shell
increments satisfy the tolerance, so an accidental plateau cannot pass.
