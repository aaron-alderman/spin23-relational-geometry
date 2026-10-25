# Frontier Wave 7.175: Structured Tolerance and Yield for the Leech Transformer

**Date:** 25 October 2026

**Status:** quantitative iid yield; 0.2% headline superseded by Wave 7.176 correlated stress

**Evidence:** [structured-tolerance ledger](../../../../evidence/data/leech-transformer-structured-tolerance-v1.json)

**Executable:** [deterministic tolerance simulator](../../../../scripts/simulate-leech-transformer-tolerance.mjs)

**Certificate:** [yield, confidence and epistemic-boundary verifier](../../../../verification/verify/verify_leech_transformer_structured_tolerance.mjs)

## From adversarial bound to fabrication prior

Wave 7.174 fixes the Gram-first exact factor with 252 nonzero transformer
ratios and 24 positive capacitors. This experiment perturbs all 276 parameters
independently by mean-one lognormal factors with common log standard deviation
\(\sigma\). Each draw removes one least-squares global capacitance scale, then
tests the relative spectral-norm error of the inverse capacitance matrix
against one percent.

Five thousand deterministic draws at each point give:

| component (sigma) | passes | yield | 95% Wilson interval | median inverse error | p95 inverse error |
|---:|---:|---:|---:|---:|---:|
| 0.001% | 5000/5000 | 100% | 99.923–100% | 0.00201% | 0.00314% |
| 0.01% | 5000/5000 | 100% | 99.923–100% | 0.0204% | 0.0317% |
| 0.03% | 5000/5000 | 100% | 99.923–100% | 0.0606% | 0.0942% |
| 0.1% | 5000/5000 | 100% | 99.923–100% | 0.200% | 0.319% |
| 0.2% | 4999/5000 | 99.98% | 99.887–99.996% | 0.401% | 0.634% |
| 0.3% | 4806/5000 | 96.12% | 95.548–96.621% | 0.601% | 0.967% |
| 0.5% | 2381/5000 | 47.62% | 46.238–49.006% | 1.016% | 1.598% |
| 1.0% | 14/5000 | 0.28% | 0.167–0.469% | 2.004% | 3.184% |

The structured model is dramatically less pessimistic than the uniform
adversarial norm bound. A component-procurement prior of
\(\sigma\leq0.2\%\) gives a Wilson lower bound above 99.88% for this model.
The warning band begins at 0.3%; the yield transition is near 0.5%.

## The pass rule remains measurement, not simulation

The 0.2% figure is a design prior. It is not permission to accept a device
from component specifications. Every realization must still have its full
24-port matrix measured, globally rescaled once and inverted with measured
covariance. The inverse-metric residual must be below one percent globally,
or on a preregistered occupied subspace if only a subspace claim is made.

Wave 7.176 subsequently rejects 0.2% as the cross-model headline and lowers
the procurement target to 0.15% after explicit correlated-error tests. The
results here remain the iid control.

## Epistemic separation

- **Theorem:** positive (D) and unit-lower-triangular (L) produce a
  positive-definite capacitance matrix for every draw.
- **Conditional inference:** the reported yields follow under the declared
  independent lognormal error and calibration model.
- **Open:** real errors may contain correlated gradients, parasitic modes,
  frequency dependence, loss, drift, nonreciprocity and readout covariance.

Consequently this is a quantitative engineering prediction, not evidence
that a fabricated Leech edge or Monster carrier already exists.

## Corpus links

- [Transformer-factor audit](frontier_wave7_174_leech_pareto_transformer_factor_audit.md)
- [Hardware-basis Pareto frontier](frontier_wave7_173_leech_hardware_basis_pareto_frontier.md)
- [Conditioning and tolerance audit](frontier_wave7_171_leech_transformer_conditioning_tolerance.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
- [Correlated-error stress test](frontier_wave7_176_leech_transformer_correlated_tolerance.md)
