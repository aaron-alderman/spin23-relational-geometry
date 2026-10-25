# Frontier Wave 7.192: Joined-Cell MPS Ordering

**Date:** 25 October 2026

**Status:** exact harmonic entanglement diagnostic; nonlinear solver gain open

**Evidence:** [ordering record](../../../../evidence/data/leech-joined-cell-mps-order-v1.json)

**Executable:** [deterministic ordering optimizer](../../../../scripts/optimize-leech-joined-cell-mps-order.mjs)

**Certificate:** [covariance and frozen-output verifier](../../../../verification/verify/verify_leech_joined_cell_mps_order.mjs)

## Order the tensor problem by the metric

Wave 7.191 makes the joined Hamiltonian a small-bond MPO. Its state cost is
controlled by entanglement across the chosen one-dimensional ordering of the
24 rotor coordinates. The harmonic ground state supplies an exact,
model-derived ordering diagnostic before an expensive nonlinear solve.

For the quadratic Hamiltonian, the coordinate and charge covariances are

\[
 X={1\over2}\sqrt{U/u}\,G^{-1/2},\qquad
 P={1\over2}\sqrt{u/U}\,G^{1/2}.
\]

For a prefix subsystem \(A\), the symplectic eigenvalues follow from
\(X_A P_A\), and their von Neumann entropy gives the MPS cut entropy. The
overall \(U/u\) factors cancel exactly. The site-order choice is therefore a
geometric property of the measured Gram form, not a fit at one coupling.

## Frozen ordering result

Catalogue order has maximum cut entropy 4.511835 nats and entropy sum
73.38743. A deterministic 80,000-step adjacent-transposition anneal produces

\[
(22,20,9,21,1,12,4,7,24,18,6,10,
11,8,5,3,2,13,19,23,16,14,17,15).
\]

Its maximum is 3.575516 nats and its sum is 58.52786: reductions of 20.75%
and 20.25%. The exponential maximum-entropy proxy falls from 91.09 to 35.71,
a factor 2.55. This is a meaningful resource reduction even though entropy
alone does not determine the bond dimension needed at a declared error.

The production calculation must run both catalogue and optimized orderings.
Their parity-resolved energies and residuals must agree within the declared
intervals; otherwise ordering dependence exposes insufficient bond dimension
or optimizer trapping. The optimized order is the primary lane, and catalogue
order is an adversarial control.

## Boundary

The entropy result is exact for the harmonic Gaussian state. The compact
cosine produces a non-Gaussian state, and the ordering was selected by a
heuristic rather than proved globally optimal. It improves the numerical
attack but neither computes nor certifies the joined-cell gap.

## Corpus links

- [Joined-cell MPO certificate architecture](frontier_wave7_191_leech_joined_cell_mpo_certificate_architecture.md)
- [Product-to-coupled dependency audit](frontier_wave7_190_leech_product_to_coupled_dependency_audit.md)
- [Coupled anharmonic spectroscopy](frontier_wave7_181_leech_coupled_anharmonic_spectroscopy.md)
- [Nonlinear commissioning packet](frontier_wave7_188_leech_nonlinear_commissioning_packet.md)
