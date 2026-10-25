# Frontier Wave 7.172: Integral Hardware-Basis Search for the Leech Metric

**Date:** 25 October 2026

**Status:** verified finite heuristic improvement; Pareto and global optima open

**Evidence:** [integral-basis search record](../../../../evidence/data/leech-integral-hardware-basis-search-v1.json)

**Executable:** [deterministic basis-search programme](../../../../scripts/search-leech-hardware-basis.mjs)

**Certificate:** [winner reconstruction and unimodularity verifier](../../../../verification/verify/verify_leech_integral_hardware_basis_search.mjs)

## The severe conditioning was largely a coordinate choice

Wave 7.171 found (kappa_2(K)=31816.43) in the catalogue basis. A frozen
search now samples 1000 deterministic permutations and three LLL Lovász
parameters, for 3000 integral-basis candidates. The best observed candidate
occurs at zero-based trial 668 with (delta_{m LLL}=0.75):

| quantity | catalogue basis | selected basis |
|---|---:|---:|
| minimum eigenvalue | 0.0007506310 | 0.0350865986 |
| maximum eigenvalue | 23.8824008 | 25.9719779 |
| condition number | 31,816.43 | 740.225 |
| nonzero off-diagonal pairs | 191 | 195 |
| basis-vector norms | all 24 equal to 4 | all 24 equal to 4 |

The condition number improves by a factor of 42.98. Under a common inductive
scale the extreme frequency ratio drops from 178.37 to 27.21. The sufficient
one-percent worst-case inverse tolerance relaxes from
(3.11	imes10^{-7}) to (1.34	imes10^{-5}).

The certificate reconstructs the winning transform, proves
(U^TKU=G) entry by entry, and obtains (det U=pm1) by exact Bareiss
elimination. All 24 selected basis vectors have norm four, so they are Leech
minimal vectors rather than short real-valued approximations.

## The tradeoff is explicit

Conditioning did not come with sparsity. The reduced Gram matrix has 195
nonzero off-diagonal pairs, four more than the catalogue basis. The integral
transform contains 160 nonzero entries with maximum magnitude seven. This is
a substantially better calibration coordinate system, but not yet a simpler
layout.

The selected basis replaces the catalogue basis for the next transformer
factorization and tolerance pass. Subsequent search must treat conditioning,
transformer density and physical routing as a Pareto problem rather than
minimizing condition number alone.

## Boundary

This is the best observed result in the declared finite deterministic scan,
not a global or local optimum theorem. Condition number is a hardware-coordinate
criterion, not a Leech-lattice invariant. The improvement does not establish
a planar circuit, robustness to structured parasitics or flow to the Leech
edge, and it does not advance the carrier beyond Gate A.

## Corpus links

- [Conditioning and tolerance audit](frontier_wave7_171_leech_transformer_conditioning_tolerance.md)
- [Exact transformer recovery](frontier_wave7_170_leech_transformer_capacitance_recovery.md)
- [Unimodular dual-basis compiler](frontier_wave7_139_leech_unimodular_dual_basis_compiler.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
- [Hardware-basis Pareto frontier](frontier_wave7_173_leech_hardware_basis_pareto_frontier.md)
