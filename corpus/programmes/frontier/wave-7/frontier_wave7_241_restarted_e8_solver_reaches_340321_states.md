# Frontier Wave 7.241: Restarted E8 solver reaches 340,321 states

**Date:** 26 October 2026

**Status:** computational barrier closed at shell eight; continuum gap open

**Result:** [restarted nonlinear eigensolver](../../translation-free-exceptional-topology/E8_RESTARTED_DAVIDSON.md)

**Evidence:** [solver ledger](../../../../evidence/data/translation-free-e8-restarted-davidson-v1.json)

**Certificate:** [Davidson/Lanczos verifier](../../../../verification/verify/verify_translation_free_e8_restarted_davidson.mjs)

A bounded-subspace Davidson implementation reproduces the full-Lanczos
reference and solves both conditional nonlinear graphs on the 340,321-state
complete E8 shell. The first gaps are (0.1023201434) and (0.3395197666),
with first-two residuals below (1.5\times10^{-11}).

The physics gate remains stricter than the solver gate. Gap drift from shell
six to eight is 3.11% and 7.80%, so neither value is promoted. The next run is
shell ten with boundary leakage and transition weights, followed by shell
twelve if the first sub-one-percent increment appears.
