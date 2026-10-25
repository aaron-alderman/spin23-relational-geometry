# Frontier Wave 7.200: Full-Carrier Exact-Sector Cutoff-Two Ladder

**Date:** 25 October 2026

**Status:** first full-carrier cutoff-two exact-sector spectrum; nonconverged

**Supersession:** Wave 7.201 removes block materialization and extends cutoff two to bond 32.

**Evidence:** [cutoff-two record](../../../../evidence/data/leech-z2-cutoff-two-ladder-v1.json)

**Executable:** [checkpointable exact-sector runner](../../../../scripts/smoke-leech-z2-block-dmrg.py)

**Certificate:** [cutoff-two verifier](../../../../verification/verify/verify_leech_z2_cutoff_two_ladder.mjs)

## Result

The full 24-channel joined rotor has now been optimized at charge cutoff two
without a parity penalty. Both sectors use exact Z2 boundary charge, the
Wave 7.192 order and checkpointed iterative local solves.

| Bond | Total sweeps | $E_+$ | $E_-$ | gap |
|---:|---:|---:|---:|---:|
| 16 | 10 | 3.874015314706 | 4.207773675283 | 0.333758360576 |
| 24 | 6 | 3.873432489362 | 4.206422805998 | 0.332990316636 |

Increasing the bond lowers both variational energies and changes the gap by
$-7.68044\times10^{-4}$, or 0.2301%. The bond-24 value is 0.0723% above the
independent Wave 7.193 penalty-sector value 0.332749663954. This direction of
movement supports, but does not prove, convergence toward the earlier result.

The final two fixed-bond sweeps change the gap by
$-1.96057\times10^{-5}$ (relative $5.89\times10^{-5}$), so sweep depth is not
yet negligible. The maximum occupied charged block reaches 7218 and local
Ritz residuals remain below $4.17\times10^{-10}$.

## Implication and refusal

Exact symmetry typing now survives the first nontrivial cutoff increase on the
entire Leech carrier. The falling gap from cutoff one to cutoff two is therefore
not created by the parity penalty; it is a property of the compact joined
Hamiltonian at current variational resolution.

The bond correction is much larger than at cutoff one, both global solves are
unconverged and no lower enclosure exists. It would be false to extrapolate a
continuum gap from these two cutoffs. The next admissible result is bond 32 at
cutoff two using a non-materialized effective operator, followed by a resumed
cutoff-three ladder and residual-based upper/lower spectral bounds.

## Corpus links

- [Iterative checkpointed engine](frontier_wave7_199_leech_z2_iterative_checkpoint_dmrg.md)
- [Earlier dense-penalty reconnaissance](frontier_wave7_193_leech_joined_cell_dmrg_reconnaissance.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
- [“Monster is physics” proof certificate](frontier_wave7_150_monster_is_physics_proof_certificate.md)
