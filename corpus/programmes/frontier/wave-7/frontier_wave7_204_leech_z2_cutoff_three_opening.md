# Frontier Wave 7.204: Exact-Sector Cutoff-Three Opening

**Date:** 25 October 2026

**Status:** full-carrier feasibility; convergence failure

**Supersession:** Wave 7.206 extends cutoff three to bond 32 and measures contracting sweep drift; convergence remains open.

**Evidence:** [cutoff-three opening record](../../../../evidence/data/leech-z2-cutoff-three-opening-v1.json)

**Executable:** [matrix-free exact-sector runner](../../../../scripts/smoke-leech-z2-block-dmrg.py)

**Certificate:** [cutoff-three verifier](../../../../verification/verify/verify_leech_z2_cutoff_three_opening.mjs)

## Result

The complete 24-channel carrier now runs at charge cutoff three, seven local
states per site, in exact Z2 sectors and without an effective matrix. At bond
16 the final gap is 0.189511756765. Expanding the signed state to bond 24
lowers both sector energies and gives the following sweep trajectory:

| Cumulative bond-24 sweeps | $E_+$ | $E_-$ | gap |
|---:|---:|---:|---:|
| 4 | 2.773396036739 | 2.960939389553 | 0.187543352814 |
| 6 | 2.773110623557 | 2.960729047509 | 0.187618423952 |
| 8 | 2.773048736132 | 2.960622074531 | 0.187573338400 |

Every energy decreases, but successive gap shifts have opposite signs:
$+7.51\times10^{-5}$ and $-4.51\times10^{-5}$. The final bond-16 to bond-24
gap correction is $-1.94\times10^{-3}$, or 1.02%. The final value remains
0.320% above the Wave 7.193 penalty comparator.

## Refusal and next gate

This proves feasibility of the exact-sector cutoff-three carrier. It does not
produce an admissible cutoff-three gap. A difference of two decreasing
variational energies can oscillate, exactly as observed. Reporting the last
number as a physical prediction would discard the diagnostic information.

The next cutoff-three step is a checkpointed bond-32 expansion followed by
fixed-bond sweeps until drift is subleading to the bond correction. Cutoff
extrapolation remains forbidden until at least two cutoff levels have their
own converged bond ladders and sector enclosures.

## Corpus links

- [Cutoff-two bond 48](frontier_wave7_203_leech_z2_matrix_free_bond48.md)
- [Matrix-free carrier](frontier_wave7_201_leech_z2_matrix_free_carrier.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
