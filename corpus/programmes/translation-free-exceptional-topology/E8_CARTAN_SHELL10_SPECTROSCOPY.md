# E8 Cartan-kernel shell-10 spectroscopy gate

**Date:** 26 October 2026

**Status:** first sub-one-percent increment; shell-12 confirmation required

**Parent:** [operator-completeness gate](E8_OPERATOR_COMPLETENESS_GATE.md)

**Evidence:** [shell-10 spectroscopy ledger](../../../evidence/data/translation-free-e8-cartan-shell10-spectroscopy-v1.json)

**Certificate:** [cutoff and parity verifier](../../../verification/verify/verify_translation_free_e8_cartan_shell10_spectroscopy.mjs)

## First credible plateau signal

The operator-complete (K)-kernel branch has now been solved at kinetic shell
10, containing 794,161 states. Its four lowest projected levels are

\[
4.6715055248,quad4.7735239258,quad4.8424815404,quad4.9404801922.
\]

The first gap is (0.1020184010). Relative to shell eight it changes by only
0.295%, the first increment below the frozen one-percent threshold. All four
level boundary probabilities are below (1.88\times10^{-4}), and the first
three residuals are below (2.6\times10^{-11}).

This is the first credible plateau signal, but not yet a promoted gap. The
programme requires two successive sub-one-percent increments so that one
accidental flat step cannot close the gate. Shell 12 is the confirmation rung.

## The detector must respect parity

Global charge inversion is exact. The ground state is even, the first excited
state is odd, the second is even and the third is odd. An ordinary cosine
drive is even, so its ground-to-first weights are at numerical zero, while it
couples visibly to the second excitation. A laboratory using only amplitude/
cosine modulation would therefore miss the true first gap and report the
larger even-sector line.

The apparatus must pair even cosine modulation with an odd sine or phase-
quadrature drive. The solver now emits both transition tables. The small-shell
certificate independently reproduces the rule: cosine is dark and sine is
bright for the first odd state.

## Promotion rule

Run shell 12 with the same gap, residual, boundary probability, parity and
eight-channel drive record. Promote a provisional nonlinear (K)-kernel gap
only if the 10-to-12 drift is also below one percent and the visible
transition weights stabilize. This would still be a compact-cell result, not
the E8 chiral anomaly or thermodynamic coupled-wire gap.
