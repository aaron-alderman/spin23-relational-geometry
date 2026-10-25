# Frontier Wave 7.206: Cutoff-Three Bond-32 Recovery Audit

**Date:** 25 October 2026

**Status:** convergence recovery in progress; prediction refused

**Evidence:** [bond-32 record](../../../../evidence/data/leech-z2-cutoff-three-bond32-v1.json)

**Executable:** [matrix-free exact-sector runner](../../../../scripts/smoke-leech-z2-block-dmrg.py)

**Certificate:** [bond-32 verifier](../../../../verification/verify/verify_leech_z2_cutoff_three_bond32.mjs)

Expanding cutoff three from bond 24 to 32 lowers both sector energies. After
nine bond-32 sweeps the gap is 0.186480917838, but it is not promoted. The
bond correction is $-1.09242\times10^{-3}$, or 0.582%.

The useful result is dynamical: successive resumed gap drifts are
$-1.85279\times10^{-4}$, $-6.13076\times10^{-5}$ and
$-1.95804\times10^{-5}$, contracting by factors 0.331 and 0.319. Thus the
opposite-sign bond-24 motion becomes a consistent relaxation sequence at bond
32. The last drift is still 105 ppm relative and every global convergence flag
remains false.

The value crosses below the old penalty result. That comparator is again
correctly typed as an implementation comparison rather than a bound. Bond 40
and further fixed-bond stabilization are required before cutoff three becomes
an extrapolation datum.

## Corpus links

- [Cutoff-three opening](frontier_wave7_204_leech_z2_cutoff_three_opening.md)
- [Cutoff-two bond 56](frontier_wave7_205_leech_z2_matrix_free_bond56.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
