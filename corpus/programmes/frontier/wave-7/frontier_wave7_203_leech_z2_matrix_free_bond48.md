# Frontier Wave 7.203: Matrix-Free Cutoff-Two Bond 48

**Date:** 25 October 2026

**Status:** four-point contracting convergence lane; lower enclosure open

**Supersession:** Wave 7.205 extends cutoff two through bond 56.

**Evidence:** [bond-48 record](../../../../evidence/data/leech-z2-matrix-free-bond48-v1.json)

**Executable:** [matrix-free exact-sector runner](../../../../scripts/smoke-leech-z2-block-dmrg.py)

**Certificate:** [bond-48 verifier](../../../../verification/verify/verify_leech_z2_matrix_free_bond48.mjs)

## Result

The full-carrier cutoff-two ladder now contains four stabilized points:

| Bond | $E_+$ | $E_-$ | gap |
|---:|---:|---:|---:|
| 24 | 3.873419885142 | 4.206371398606 | 0.332951513464 |
| 32 | 3.873238253668 | 4.205870978094 | 0.332632724426 |
| 40 | 3.873173601159 | 4.205645714531 | 0.332472113371 |
| 48 | 3.873140362532 | 4.205535260673 | 0.332394898141 |

Both sector energies decrease at every step. The three gap corrections are
$-3.18789\times10^{-4}$, $-1.60611\times10^{-4}$ and
$-7.72152\times10^{-5}$; successive magnitude ratios are 0.504 and 0.481.
Thus the contraction pattern survives a fourth point rather than being fitted
from only three.

Two resumed bond-48 sweeps change the gap by only
$-1.33877\times10^{-6}$, or 4.03 ppm. The latest bond-capacity correction is
still 232 ppm. The maximum occupied sector dimension is 28840 and no effective
matrix is materialized.

## Boundary

The hierarchy is now clear: local Ritz error is below $4.1\times10^{-10}$;
fixed-bond sweep drift is about 4 ppm; remaining bond correction is about
232 ppm. Bond capacity is still the dominant measured uncertainty.

An Aitken transform of bonds 32, 40 and 48 gives 0.3323234054. It remains
quarantined: stable correction ratios do not supply a rigorous asymptotic law
or lower spectral enclosure. Bond 56 and an independently justified enclosure
method remain the promotion gate.

## Corpus links

- [Bond-40 convergence](frontier_wave7_202_leech_z2_matrix_free_bond40.md)
- [Matrix-free carrier](frontier_wave7_201_leech_z2_matrix_free_carrier.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
