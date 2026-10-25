# Frontier Wave 7.199: Iterative and Checkpointed Exact-Sector DMRG

**Date:** 25 October 2026

**Status:** validated restartable engine; fully matrix-free contraction open

**Supersession:** Wave 7.201 supplies and validates the non-materialized contraction.

**Evidence:** [iterative/checkpoint record](../../../../evidence/data/leech-z2-iterative-checkpoint-dmrg-v1.json)

**Executable:** [joined-cell exact-sector runner](../../../../scripts/smoke-leech-z2-block-dmrg.py)

**Certificate:** [engine verifier](../../../../verification/verify/verify_leech_z2_iterative_checkpoint_dmrg.mjs)

## The solver obstruction is narrowed

The local occupied Z2 block is now solved for its lowest eigenpair iteratively,
rather than by a complete dense eigendecomposition. Sector-separated MPS
checkpoints can be written, loaded in a fresh process and expanded at a higher
bond. Each new checkpoint carries a Hamiltonian signature covering size,
cutoff, coupling ratio, order and metric version; a mismatched signature is
rejected. The three Wave 7.197 exact controls still agree below
$7.53\times10^{-12}$; maximum recorded local Ritz residual is
$1.18\times10^{-10}$. A fresh-process checkpoint round trip preserves block
sparsity and exact-control energies.

On the full cutoff-one, bond-16 carrier, iterative and dense-local energies
agree within $2.76\times10^{-12}$ and their gaps within
$2.74\times10^{-12}$. The iterative sector solves take 12.74 seconds in the
recorded run. Checkpoint expansion then reaches bond 32:

| Bond | $E_+$ | $E_-$ | gap |
|---:|---:|---:|---:|
| 24 | 7.360879259078 | 8.041812923612 | 0.680933664533 |
| 32 | 7.360877694370 | 8.041801087002 | 0.680923392632 |

Both energies fall. The gap correction is $-1.02719\times10^{-5}$, or
0.00151%; three resumed bond-32 sweeps subsequently move it by only
$-5.41\times10^{-8}$.

## Boundary

At this wave, “iterative” was not yet “fully matrix free.” Quimb still formed the occupied
charged effective block densely; ARPACK only avoids diagonalizing its entire
spectrum. The largest cutoff-one block is 4668, and the cutoff-two lane reaches
7218. The next architecture target is a charge-sector linear operator whose
matvec contracts the environments and MPO without materializing that block.
Wave 7.201 closes that implementation target.
Wave 7.201 closes that implementation target.

The global convergence flag also remains false. Close gap shifts are stability
evidence, not a lower enclosure. This wave licenses larger controlled runs; it
does not certify the bulk gap.

## Corpus links

- [Exact-sector bond ladder](frontier_wave7_198_leech_z2_block_dmrg_bond_ladder.md)
- [Symmetry-native execution](frontier_wave7_197_leech_z2_block_dmrg_execution.md)
- [Exact Z2 compiler](frontier_wave7_196_leech_joined_cell_z2_sector_compiler.md)
- [Cutoff-two ladder](frontier_wave7_200_leech_z2_cutoff_two_ladder.md)
