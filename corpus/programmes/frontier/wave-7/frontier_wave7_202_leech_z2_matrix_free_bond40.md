# Frontier Wave 7.202: Matrix-Free Cutoff-Two Bond 40

**Date:** 25 October 2026

**Status:** contracting bond corrections; spectral certificate open

**Supersession:** Wave 7.203 extends the contracting ladder through bond 48.

**Evidence:** [bond-40 record](../../../../evidence/data/leech-z2-matrix-free-bond40-v1.json)

**Executable:** [matrix-free exact-sector runner](../../../../scripts/smoke-leech-z2-block-dmrg.py)

**Certificate:** [bond-40 verifier](../../../../verification/verify/verify_leech_z2_matrix_free_bond40.mjs)

## Three-point convergence ladder

The Hamiltonian, cutoff, order and exact Z2 sectors are held fixed while the
signed checkpoint grows from bond 24 through 32 to 40:

| Bond | $E_+$ | $E_-$ | gap |
|---:|---:|---:|---:|
| 24 | 3.873419885142 | 4.206371398606 | 0.332951513464 |
| 32 | 3.873238253668 | 4.205870978094 | 0.332632724426 |
| 40 | 3.873173601159 | 4.205645714531 | 0.332472113371 |

Every sector energy decreases. Successive gap corrections are
$-3.18789\times10^{-4}$ and $-1.60611\times10^{-4}$, so their magnitude
contracts by a factor 0.5038. The latter correction is still 0.0483% of the
bond-32 gap. Two resumed bond-40 sweeps change the gap by
$-6.01074\times10^{-6}$, relative $1.81\times10^{-5}$.

The largest occupied charge sector has dimension 20060 and is applied without
forming its matrix. Local Ritz residuals remain below $4.21\times10^{-10}$.

## The seductive extrapolation is not admitted

A three-point Aitken delta-squared transform gives 0.3323090318. That number
is recorded only to make the temptation auditable. Three bonds do not prove a
geometric asymptotic regime; sector-gap differences need not converge
monotonically, the global solves still report unconverged and no lower
spectral enclosure exists. The Aitken value is therefore neither a bound nor
a promoted physical prediction.

The next admissible move is bond 48, followed by an independent energy-variance
or residual enclosure for each sector. A contracting correction sequence plus
overlapping upper/lower sector intervals, not curve fitting alone, is the gate
to a joined-cell gap certificate.

## Corpus links

- [Matrix-free exact-sector carrier](frontier_wave7_201_leech_z2_matrix_free_carrier.md)
- [Cutoff-two ladder](frontier_wave7_200_leech_z2_cutoff_two_ladder.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
