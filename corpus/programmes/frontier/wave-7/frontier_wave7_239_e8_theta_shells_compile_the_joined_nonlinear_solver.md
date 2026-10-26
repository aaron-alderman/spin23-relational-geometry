# Frontier Wave 7.239: E8 theta shells compile the joined nonlinear solver

**Date:** 26 October 2026

**Status:** exact shared basis and cost forecast; eigensolve next

**Result:** [adaptive-shell nonlinear solver](../../translation-free-exceptional-topology/E8_ADAPTIVE_SHELL_SOLVER.md)

**Evidence:** [solver ledger](../../../../evidence/data/translation-free-e8-adaptive-shell-solver-plan-v1.json)

**Certificate:** [theta-series verifier](../../../../verification/verify/verify_translation_free_e8_adaptive_shell_solver_plan.mjs)

The two constitutive branches isolated by Wave 7.238 share an exact kinetic
carrier. Unimodularity maps (n^TK^{-1}n) bijectively to (m^TKm), so both
charge spectra are counted by the E8 theta series. Their nonlinear dynamics
remain distinct because local cosine steps become different integral vectors
on that carrier.

This removes the apparent need for an enormous anisotropic coordinate box.
Complete kinetic-energy shells contain 26,641 to 1,604,401 states across the
preregistered cutoff ladder, while every matrix row has at most sixteen
neighbors. The next calculation is consequently a bounded-memory,
matrix-free sparse eigensolve with explicit cutoff and residual gates—not an
unspecified future many-body calculation.
