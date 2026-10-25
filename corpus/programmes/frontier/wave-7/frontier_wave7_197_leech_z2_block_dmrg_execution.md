# Frontier Wave 7.197: Symmetry-Native Leech-Cell DMRG Execution

**Date:** 25 October 2026

**Status:** executed and cross-validated numerical bridge; spectral convergence open

**Evidence:** [frozen execution record](../../../../evidence/data/leech-z2-block-dmrg-execution-v1.json)

**Executable:** [Z2 block-sparse MPO/MPS runner](../../../../scripts/smoke-leech-z2-block-dmrg.py)

**Certificate:** [execution-record verifier](../../../../verification/verify/verify_leech_z2_block_dmrg_execution.mjs)

## Result

Wave 7.196's charge dictionary now runs rather than merely type-checks. The
joined compact-rotor Hamiltonian is represented by a genuinely block-sparse
Z2 MPO and optimized in a fixed even or odd MPS boundary sector. A minimal
open-boundary two-site adapter preserves the Symmray charge blocks through the
local eigensolve and tensor split; no global parity-penalty Hamiltonian is
present.

Three held-out comparisons against exact diagonalization test more than one
size and cutoff. Four sites at cutoff one agree within
$1.86\times10^{-12}$ (even) and $3.11\times10^{-15}$ (odd); six sites at
cutoff one agree within $7.53\times10^{-12}$ and $1.02\times10^{-12}$; four
sites at cutoff two agree within $1.32\times10^{-12}$ and
$3.64\times10^{-12}$. Every returned MPS and the MPO remain block sparse.

The first full 24-channel run uses $U/u=10^{-2}$, cutoff one, bond 16, six
sweeps and the Wave 7.192 ordering. It returns

\[
 E_+=7.3608882129848405,\qquad E_-=8.041861779812306,
 \qquad \Delta=0.6809735668274657.
\]

Wave 7.193's independent dense-MPO calculation selected parity with an
energetic penalty and gave $\Delta=0.68114473695$. The symmetry-native result
differs by $-1.7117\times10^{-4}$, or 0.02513%. Thus two materially different
sector implementations preserve the same low-energy observable at the
current variational resolution.

## Implication for “Monster is physics”

This closes one implementation arrow, not the whole claim. The exact Leech
metric, compact dynamics, global inversion and tensor charge now coexist in
one executable many-body model. Algebraic admissibility is doing physical
work: it determines which virtual channels may exist, prevents sector
contamination and yields a numerical spectrum consistent with the earlier
untyped calculation. That is stronger than recognizing a decorative
exceptional pattern.

It does not establish the Moonshine orbifold, Monster action or laboratory
carrier in this finite rotor alone. Those require the downstream edge,
orbifold, defect and provenance witnesses already separated in the promotion
DAG. The formal existence claim remains supplied independently by the
unitary Moonshine CFT and string realization; this wave advances the proposed
laboratory route toward it.

## Boundary and next discriminant

The full run reports unconverged at its requested tolerance. It is cutoff one
and bond 16, so its gap is not a spectral certificate. The custom adapter is
limited to open-boundary ordinary eigenproblems, and its dense local
diagonalization will become the next scaling bottleneck.

The next tranche is therefore sharply ordered:

1. replace the dense local block eigensolve by a matrix-free charged-sector
   Lanczos/Davidson solve and reproduce all three exact controls;
2. run fixed-cutoff bond ladders in exact sectors, first through cutoff two;
3. require two successive bond corrections and residual bounds to fall below
   a preregistered gap tolerance;
4. only then propagate the joined-cell gap into the strip and edge gates.

Failure of the matrix-free solver on the frozen exact controls rejects the
implementation. Drift between exact-sector and penalty-sector energies that
does not decrease with bond rejects the old penalty surrogate. Convergence
to a vanishing joined gap blocks the proposed gapped Leech bulk. These are
useful failure modes rather than reinterpretations.

## Corpus links

- [Exact Z2 sector compiler](frontier_wave7_196_leech_joined_cell_z2_sector_compiler.md)
- [Dense-MPO reconnaissance](frontier_wave7_193_leech_joined_cell_dmrg_reconnaissance.md)
- [Metric-derived MPS order](frontier_wave7_192_leech_joined_cell_mps_order.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
- [“Monster is physics” proof certificate](frontier_wave7_150_monster_is_physics_proof_certificate.md)
