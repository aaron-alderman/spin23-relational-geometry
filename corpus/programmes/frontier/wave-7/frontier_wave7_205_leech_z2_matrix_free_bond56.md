# Frontier Wave 7.205: Matrix-Free Cutoff-Two Bond 56

**Date:** 25 October 2026

**Status:** five-point convergence lane; enclosure open

**Evidence:** [bond-56 record](../../../../evidence/data/leech-z2-matrix-free-bond56-v1.json)

**Executable:** [matrix-free exact-sector runner](../../../../scripts/smoke-leech-z2-block-dmrg.py)

**Certificate:** [bond-56 verifier](../../../../verification/verify/verify_leech_z2_matrix_free_bond56.mjs)

The stabilized cutoff-two gap moves from 0.332394898141 at bond 48 to
0.332349915547 at bond 56. Both sector energies decrease. The correction is
$-4.49826\times10^{-5}$, relative 135 ppm, and is 0.583 of the preceding
correction. Two successive fixed-bond drifts contract from
$-2.98374\times10^{-6}$ to $-7.96477\times10^{-7}$; the final drift is
2.40 ppm relative.

The largest occupied sector has dimension 39240 and remains non-materialized.
Bond capacity is still the dominant error: its correction is about 56 times
the final sweep drift. The nonuniform correction ratios prohibit promotion of
a fitted infinite-bond value, and no lower enclosure exists.

## Corpus links

- [Bond-48 convergence](frontier_wave7_203_leech_z2_matrix_free_bond48.md)
- [Matrix-free carrier](frontier_wave7_201_leech_z2_matrix_free_carrier.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
