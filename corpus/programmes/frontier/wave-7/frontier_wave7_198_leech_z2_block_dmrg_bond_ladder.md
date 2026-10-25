# Frontier Wave 7.198: Exact-Sector Joined-Cell Bond Ladder

**Date:** 25 October 2026

**Status:** quantified bond stability; spectral certificate open

**Evidence:** [bond-ladder record](../../../../evidence/data/leech-z2-block-dmrg-bond-convergence-v1.json)

**Executable:** [Z2 block-sparse runner](../../../../scripts/smoke-leech-z2-block-dmrg.py)

**Certificate:** [bond-ladder verifier](../../../../verification/verify/verify_leech_z2_block_dmrg_bond_convergence.mjs)

## Result

The Wave 7.197 full-carrier calculation was repeated at bond 24 with all
other declared inputs fixed: 24 channels, charge cutoff one, $U/u=10^{-2}$,
six sweeps, the Wave 7.192 order and exact even/odd Z2 boundary charges.

| Bond | $E_+$ | $E_-$ | $\Delta$ |
|---:|---:|---:|---:|
| 16 | 7.360888212985 | 8.041861779812 | 0.680973566827 |
| 24 | 7.360879249852 | 8.041812043947 | 0.680932794095 |

Both sector energies decrease, as required for independently variational
upper estimates. The gap changes by $-4.07727\times10^{-5}$, only 0.00599%
of the bond-16 gap. The bond-24 gap remains within 0.03112% of Wave 7.193's
independent parity-penalty value.

This is the first stability movement measured entirely inside exact symmetry
sectors. It strengthens the conclusion that the low-energy observable is not
an artefact of the penalty term or a single bond dimension.

## What it does not prove

Both optimizations still fail their requested convergence tolerance. A gap is
a difference of two variational upper bounds and need not move monotonically;
two close values are not a lower enclosure. No cutoff extrapolation follows
from this ladder.

The bond-24 runtime also exposes the next obstruction. The MPO bond remains
26 and the Z2 tensors remain sparse, but the local charged block is formed and
diagonalized densely. Bond 32 should not be treated as the next scientific
step until that local solve is matrix free or checkpointable. The promotion
gate is therefore: reproduce the frozen exact controls with a charged-sector
Lanczos/Davidson update, resume the same states across bonds, and require two
successive gap shifts plus residual enclosures below the preregistered
tolerance.

## Corpus links

- [Symmetry-native DMRG execution](frontier_wave7_197_leech_z2_block_dmrg_execution.md)
- [Exact Z2 sector compiler](frontier_wave7_196_leech_joined_cell_z2_sector_compiler.md)
- [Dense-sector bond convergence](frontier_wave7_194_leech_joined_cell_bond_convergence.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
