# Frontier Wave 7.238: E8 topology does not select the constitutive metric

**Date:** 26 October 2026

**Status:** ambiguity converted into an eight-port calibration gate

**Programme:** [translation-free exceptional topology](../../translation-free-exceptional-topology/README.md)

**Result:** [E8 constitutive-metric gate](../../translation-free-exceptional-topology/E8_CONSTITUTIVE_METRIC_GATE.md)

**Evidence:** [conditional metric ledger](../../../../evidence/data/translation-free-e8-constitutive-metric-gate-v1.json)

**Certificate:** [exact spectrum verifier](../../../../verification/verify/verify_translation_free_e8_constitutive_metric_gate.mjs)

## Correction

Wave 7.237 closed the fixed-coupling limit for one compact locking mode and
left the "joined (K_{E_8}^{-1}) metric" open. That phrase hid two different
physical statements. The E8 (K)-matrix fixes compact commutators and
topological response. A positive energy matrix is additional constitutive
data. Treating (K^{-1}) as the charging kernel gives (M=K^{-1}); treating
it as the capacitance or Gram matrix gives (M=K). Arbitrary positive
velocity matrices are compatible with the same E8 edge.

The certificate proves the two special branches have different harmonic
fingerprints. Their eigenvalues are controlled exactly by the E8 Coxeter
exponents, so a one-scale fit leaves seven held-out ratios. The experiment is
now unambiguous: reconstruct the full quadratic matrix by weak eight-port
tomography, decide which constitutive branch was actually built, and only
then promote the local pendulum calculation to a nonlinear eight-rotor gap.

This strengthens rather than weakens the programme. It separates a protected
topological invariant from tunable material and circuit dynamics, and it
turns an implicit modeling choice into a falsifiable apparatus record.
