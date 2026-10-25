# Frontier Wave 7.201: Matrix-Free Exact-Sector Leech Carrier

**Date:** 25 October 2026

**Status:** non-materialized full-carrier solver verified; spectrum open

**Evidence:** [matrix-free carrier record](../../../../evidence/data/leech-z2-matrix-free-carrier-v1.json)

**Executable:** [matrix-free exact-sector runner](../../../../scripts/smoke-leech-z2-block-dmrg.py)

**Certificate:** [matrix-free carrier verifier](../../../../verification/verify/verify_leech_z2_matrix_free_carrier.mjs)

## Remove the effective-matrix wall

The two-site Ritz vector is injected into its occupied Symmray Z2 block,
reshaped as a charged tensor and contracted directly through the effective MPO
and left/right environments. The output charge block is returned to ARPACK.
No local effective Hamiltonian matrix is formed. This is matrix free in the
relevant numerical sense: memory follows the tensor network, not the square
of the local sector dimension.

All three frozen exact controls pass again. Their energy errors remain below
$7.53\times10^{-12}$ and their largest local Ritz residual is
$1.19\times10^{-10}$. On the full cutoff-one bond-32 checkpoint, one
matrix-free sweep changes the stabilized gap by only
$-1.32\times10^{-8}$ and returns

\[
 \Delta_{N=1,\chi=32}=0.6809233794288279.
\]

The two sectors require 6.27 recorded solver-seconds in total while applying
charge sectors as large as 4668 without forming their matrices.

## Cutoff two beyond the former ceiling

The same signed checkpoints now reach cutoff two, bond 32:

| Bond | $E_+$ | $E_-$ | gap |
|---:|---:|---:|---:|
| 24 | 3.873419885142 | 4.206371398606 | 0.332951513464 |
| 32 | 3.873238253668 | 4.205870978094 | 0.332632724426 |

Both energies decrease. The gap correction is
$-3.18789\times10^{-4}$, or 0.0957%. The largest occupied charge sector has
dimension 12832, but its matrix is never materialized. Two resumed bond-32
sweeps still change the gap by $-2.37250\times10^{-5}$, relative
$7.13\times10^{-5}$, so bond convergence is not yet achieved.

The new value lies 0.0351% below Wave 7.193's penalty-sector result. This does
not signal inconsistency: a difference of independently variational sector
energies is not variational, and the artificial penalty run is neither an
upper nor a lower bound on that difference. It is now correctly retained only
as an independent implementation comparator.

## Physical implication and boundary

The exact Leech metric, compact cosine dynamics, global inversion charge and
24-channel quantum optimization now coexist without an exponential matrix or
a local dense-effective-matrix escape hatch. Algebraic admissibility is not
decorative here: its charge typing makes the contraction possible and forbids
wrong-sector leakage at every matvec.

This removes a computational architecture obstruction, not the epistemic
ones. The global solver flags remain false, the cutoff-two bond correction is
nearly $10^{-3}$ relatively, and there is no lower spectral enclosure. The
next admissible promotion is a bond-40/48 checkpoint ladder with variance or
residual-based enclosures, followed by cutoff three. Only then can the joined
gap flow into the strip and Monster-edge gates.

## Corpus links

- [Iterative checkpointed engine](frontier_wave7_199_leech_z2_iterative_checkpoint_dmrg.md)
- [Cutoff-two ladder](frontier_wave7_200_leech_z2_cutoff_two_ladder.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
- [“Monster is physics” proof certificate](frontier_wave7_150_monster_is_physics_proof_certificate.md)
