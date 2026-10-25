# Frontier Wave 7.211: Triple-Block Enclosure Reconnaissance

**Date:** 25 October 2026

**Status:** negative principal-block reconnaissance; no general triple-block no-go

**Evidence:** [reconnaissance record](../../../../evidence/data/leech-triple-block-enclosure-reconnaissance-v1.json)

**Executable:** [triple-block search](../../../../scripts/explore-leech-triple-block-enclosure.py)

**Certificate:** [scope verifier](../../../../verification/verify/verify_leech_triple_block_enclosure_reconnaissance.mjs)

## Construction tested

Wave 7.210 proves that three is the first disjoint block size not eliminated
by a universal norm ceiling. This packet tests the most direct construction.
For each partition of the 24 charges into eight triples, form the block
diagonal matrix

\[
B(t)=t\bigoplus_{a=1}^8K_{S_aS_a}
\]

and choose the largest floating-point \(t\) for which \(K-B(t)\succeq0\).
Each resulting \(5^3\)-state cluster Hamiltonian is diagonalized separately
in its simultaneous-inversion even and odd sectors.

The deterministic search covers the natural partition plus 200 seeded random
partitions. The best uniform-scale candidate gives

\[
L_- - U_+=-0.2844679556.
\]

The best partition is then reoptimized with eight independent nonnegative
weights and an explicit worst-cluster parity variable under the full PSD
constraint. That solve terminates successfully but reaches only

\[
L_- - U_+=-0.2841525847.
\]

Both values are far from closure.

## Exact epistemic boundary

This is a negative result for a named ansatz, not a theorem about every
three-site lower operator:

- 201 partitions are sampled, not exhaustively enumerated;
- each block is constrained to be proportional to its principal \(K\) block;
- the PSD and spectral calculations are floating point;
- overlapping blocks and general positive \(3\times3\) block variables are
  not tested.

Accordingly no spectral interval is promoted. The result says that merely
raising the block size while retaining block-Jacobi principal pieces does not
capture the required Leech correlations.

## Next route

The highest-value alternatives are now:

1. overlapping rank-one or small-block sums of squares derived from the exact
   \(LDL^T\) factorization of \(K\);
2. a genuine semidefinite optimization over general triple blocks followed
   by rational PSD certification; or
3. a multi-vector MPS Lehmann/shifted-inertia enclosure.

## Corpus links

- [Pair-block no-go and triple frontier](frontier_wave7_210_leech_pair_block_enclosure_no_go.md)
- [Diagonal-enclosure no-go](frontier_wave7_209_leech_diagonal_enclosure_no_go.md)
- [Spectral-enclosure admission](frontier_wave7_207_leech_spectral_enclosure_admission.md)
