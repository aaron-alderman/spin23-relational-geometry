# Frontier Wave 7.191: Joined-Cell MPO Certificate Architecture

**Date:** 25 October 2026

**Status:** exact operator compression and verified reconstruction; spectral intervals open

**Evidence:** [MPO architecture record](../../../../evidence/data/leech-joined-cell-mpo-certificate-architecture-v1.json)

**Executable:** [MPO constructor and dense checker](../../../../scripts/analyze-leech-joined-cell-mpo.mjs)

**Certificate:** [operator-identity verifier](../../../../verification/verify/verify_leech_joined_cell_mpo_certificate_architecture.mjs)

## The exponential matrix is not the right representation

At local rotor cutoff \(N\), the joined cell has Hilbert dimension
\((2N+1)^{24}\). That makes dense diagonalization impossible at the cutoffs
already used by the single-rotor calibration. It does not make the operator
exponentially complex. The exact Hamiltonian is

\[
 H={U\over2}\sum_{ij}n_i(G^{-1})_{ij}n_j
   +u\sum_i\left(1-{S_i^++S_i^-\over2}\right).
\]

Every nonlocal term is bilinear in two one-site charge operators. A finite-
state matrix-product operator can open a charge channel at site \(i\), carry
identity through intermediate sites and close it at site \(j\) with
\(U(G^{-1})_{ij}n_j\). Local kinetic and cosine terms use a direct path.
For 24 channels this construction has exact MPO bond dimension at most 26,
independent of the local cutoff.

The inverse Gram form is integral and has 220 nonzero off-diagonal pairs.
Across the 23 chain cuts, its exact rational cross-block ranks are

\[
1,2,\ldots,11,12,11,\ldots,2,1.
\]

Thus a rank-compressed quadratic representation has a target maximum bond
dimension 14. The conservative dimension-26 automaton is already small
enough to begin the calculation without relying on that compression.

## Executable identity check

The executable reconstructs the operator two ways: directly from the
quadratic form and by contracting the MPO finite-state paths. It exhausts
every matrix element for one through four channels at cutoff one, reaching
81-dimensional dense matrices. The maximum disagreement is
\(8.9\times10^{-16}\), and the global inversion commutator vanishes entry by
entry. These tests do not infer a spectrum; they certify the representation
that the spectral solver must use.

Global inversion sends every \(n_i\mapsto-n_i\) and splits the desired
levels into even and odd sectors. The cell certificate can therefore target
the lowest even energy \(E_+\) and lowest odd energy \(E_-\) separately,
with \(\Delta_{\rm cell}=E_--E_+\).

## From a variational number to a certificate

A DMRG or tensor-Lanczos Ritz value is not by itself a proof: it is an upper
bound and can miss a lower state. The promotion sequence is frozen as:

1. optimize the lowest even and odd MPS independently while increasing local
   cutoff, bond dimension and several site orderings;
2. freeze normalized tensors and evaluate full-MPO Rayleigh values and
   residual norms;
3. add a validated block-Lanczos, Lehmann--Goerisch or inertia calculation
   that supplies lower enclosures rather than merely residual proximity;
4. require disjoint ground and first-odd intervals and stable limits in all
   three truncation axes;
5. only then rebuild the Wave 7.161 thermal table, Wave 7.163 stability scan
   and Wave 7.164 hopping threshold from the joined interval.

This converts the Wave 7.190 blocker from an exponentially stored matrix into
a modest-bond operator plus a well-defined numerical-certification problem.
It does not yet certify the gap.

## Corpus links

- [Product-to-coupled dependency audit](frontier_wave7_190_leech_product_to_coupled_dependency_audit.md)
- [Coupled-metric gap audit](frontier_wave7_180_leech_coupled_metric_pendulum_gap_audit.md)
- [All-mode full-cosine order two](frontier_wave7_189_leech_24mode_full_cosine_order_two.md)
- [Nonlinear commissioning packet](frontier_wave7_188_leech_nonlinear_commissioning_packet.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
