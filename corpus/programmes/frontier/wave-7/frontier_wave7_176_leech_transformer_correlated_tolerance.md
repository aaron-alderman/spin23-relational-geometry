# Frontier Wave 7.176: Correlated-Error Stress Test of the Leech Transformer

**Date:** 25 October 2026

**Status:** iid procurement target revised; arbitrary covariance and parasitics open

**Evidence:** [correlated-tolerance ledger](../../../../evidence/data/leech-transformer-correlated-tolerance-v1.json)

**Executable:** [multi-model tolerance simulator](../../../../scripts/simulate-leech-transformer-tolerance.mjs)

**Certificate:** [correlated-yield and target-revision verifier](../../../../verification/verify/verify_leech_transformer_correlated_tolerance.mjs)

## Independence was optimistic

Wave 7.175's 0.2% procurement target assumed 276 independent component
errors. Two new models put 90% of error variance into structured process
modes while retaining the same exact Gram-first factor, scale fit and
one-percent inverse-metric pass rule:

- **row-block:** six process shocks, each shared across four factor rows;
- **smooth-gradient:** one normalized linear row gradient.

Each point again uses 5000 deterministic draws:

| scatter (sigma) | iid yield | row-block yield | smooth-gradient yield |
|---:|---:|---:|---:|
| 0.10% | 100% | 100% | 100% |
| 0.15% | — | 99.56% | 99.74% |
| 0.20% | 99.98% | 97.02% | 98.08% |
| 0.30% | 96.12% | 78.02% | 86.44% |
| 0.50% | 47.62% | 38.16% | 62.90% |

At 0.15%, the 95% Wilson lower bounds are 99.335% and 99.556% for
row blocks and the smooth gradient. At 0.2%, both lower bounds fall below
99%. Correlation therefore invalidates the iid-only 0.2% headline.

## Revised design decision

Use (sigmaleq0.15%) as the model-robust component procurement or tuning
target until measured platform covariance replaces these surrogates. This is
the largest sampled value whose 95% lower yield exceeds 99% in both correlated
models.

The device pass rule does not change: measure the complete 24-port matrix,
fit one global scale, propagate its covariance through inversion and require
the inverse-metric residual below one percent at the claimed scope.

## Epistemic boundary

The revision is stronger than the iid result because it survives two explicit
correlation attacks. It is not distribution-free. The models omit arbitrary
covariance eigenvectors, additive parasitic capacitance, dissipative and
frequency-dependent admittance, temporal drift and readout-systematics
coupling. Those are the next stress tranche.

## Corpus links

- [Structured iid tolerance](frontier_wave7_175_leech_transformer_structured_tolerance.md)
- [Transformer-factor audit](frontier_wave7_174_leech_pareto_transformer_factor_audit.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
- [24-port admittance commissioning packet](frontier_wave7_177_leech_24port_admittance_commissioning_packet.md)
