# Frontier Wave 7.240: E8 joined rotor reaches 117,361 states but the gap has not converged

**Date:** 26 October 2026

**Status:** nonlinear branches separated; continuum-gap promotion rejected

**Result:** [joined-rotor reconnaissance](../../translation-free-exceptional-topology/E8_JOINED_ROTOR_RECON.md)

**Evidence:** [cutoff ledger](../../../../evidence/data/translation-free-e8-joined-rotor-cutoff-recon-v1.json)

**Certificate:** [recomputation audit](../../../../verification/verify/verify_translation_free_e8_joined_rotor_cutoff_recon.mjs)

The E8 theta-shell solver now reaches complete kinetic cutoff six, or 117,361
states, for both constitutive step graphs. Projected residuals are at or below
(4\times10^{-14}), and the nonlinear spectra clearly distinguish the two
graphs. But the first gaps move by 6.35% and 21.46% between cutoffs four and
six, exceeding the frozen one-percent tolerance.

This is a useful negative boundary. The finite projected Hamiltonians are
solved; the continuum truncation is not. The next promotion is no longer
"do a many-body calculation" but a specific restarted sparse solve at
complete E8 shells 8, 10 and 12 with residual, boundary leakage and transition
weights carried together.
