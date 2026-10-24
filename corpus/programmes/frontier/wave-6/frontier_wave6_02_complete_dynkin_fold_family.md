# Frontier Wave 6.2: Complete Simply-Laced Fold Family

**Date:** 24 October 2026  
**Status:** exact finite root/graph calculation  
**Certificate:** [verify_simply_laced_dynkin_fold_family.mjs](../../../../verification/verify/verify_simply_laced_dynkin_fold_family.mjs)

## Result

The quotient-scar interpretation generalizes cleanly across every reduced non-simply-laced Dynkin family obtained by diagram folding:

\[
A_{2n-1}/\mathbb Z_2\to C_n,\qquad
D_{n+1}/\mathbb Z_2\to B_n,
\]

\[
E_6/\mathbb Z_2\to F_4,\qquad
D_4/\mathbb Z_3\to G_2.
\]

Representative folds \(A_5/\mathbb Z_2\), \(D_5/\mathbb Z_2\), \(E_6/\mathbb Z_2\) and \(D_4/\mathbb Z_3\) were constructed directly from their simply-laced Cartan matrices. For every automorphism orbit, the calculation formed:

1. the integral orbit-sum quotient;
2. the orthonormal orbit-average quotient;
3. every adjacent off-diagonal product \(A_{ij}A_{ji}\); and
4. the orbit-size symmetrizer.

The results are:

| Parent fold | Orbit sizes | Nontrivial bond product | Descended type |
|---|---:|---:|---|
| \(A_5/\mathbb Z_2\) | \(2,2,1\) | \(2\) | \(B_3/C_3\), depending root/coroot convention |
| \(D_5/\mathbb Z_2\) | \(1,1,1,2\) | \(2\) | \(B_4/C_4\), transpose convention |
| \(E_6/\mathbb Z_2\) | \(2,2,1,1\) | \(2\) | \(F_4\) |
| \(D_4/\mathbb Z_3\) | \(3,1\) | \(3\) | \(G_2\) |

The bond multiplicity is the product

\[
m_{ij}=A_{ij}A_{ji}.
\]

It equals the relevant orbit-size asymmetry: order-two folds produce \(m=2\), and the order-three triality fold produces \(m=3\). Normalizing each orbit sum by the square root of its size converts the asymmetric integral Cartan quotient into a symmetric Gram operator.

## Implication

The triple bond is neither arbitrary nor merely pictorial. It is the unique order-three member of a uniform quotient rule. The double bonds in \(B_n,C_n,F_4\) are mandatory comparison cases for every proposed physical interpretation.

This yields a new admissibility test:

> A physical interpretation of a Dynkin multiple bond must be expressible in terms of orbit size, quotient measure and canonical normalization, and must specialize coherently from \(3\) to \(2\) on the order-two folds.

Claims that the \(G_2\) edge uniquely represents three families, three spatial dimensions or a particular measured ratio fail this test unless they also explain why the corresponding double bonds do or do not produce analogous twofold effects.

## What is convention and what is invariant

Transposing a Cartan matrix exchanges roots with coroots and reverses the arrow on a multiple edge. Therefore neither the placement of \(-2\) or \(-3\) in a particular row nor the arrow direction alone is the invariant result.

The invariant data are:

- the product \(A_{ij}A_{ji}\);
- the long/short squared-length ratio;
- the orbit-size measure;
- the symmetric normalized Gram form; and
- the discarded anti-invariant sector.

This resolves a possible ambiguity in [the initial triple-bond spike](frontier_wave6_00_magic_square_triple_bond_branch_spike.md): the physics-facing object should be the normalized form plus the measure or channel multiplicity, not an unqualified Cartan-matrix entry.

## Corpus crosswalk

The fold family aligns with four existing patterns:

1. **Fixed-algebra selection.** Averaging selects invariant sectors but does not synchronize inequivalent blocks; see [claim 704](../../../claims/0700-0799/704_the_finite_g2_selector_fixed_algebra_is_eight_m2_blocks_and_symmetry_alone_cannot_synchronize_them.md).
2. **Detector contraction.** Orbit aggregation loses anti-invariant scores; see [claim 739](../../../claims/0700-0799/739_detector_folding_is_a_positive_markov_compression_that_can_only_contract_cp_fisher_information.md).
3. **Gauge-orbit collapse.** Several representatives may become one physical state; see [claim 1582](../../../claims/1500-1599/1582_the_electroweak_gauge_quotient_makes_z3_breaking_depend_on_two_doublet_support.md).
4. **Index versus visible dimension.** A compressed image can be small while an index retains multiplicity; see [claim 1583](../../../claims/1500-1599/1583_a_third_power_fredholm_shift_gives_an_exact_index_three_z3_family_carrier.md).

## Closure and next gate

The pure Dynkin-combinatorial branch is exhausted at the finite fold level. It establishes the quotient rule but supplies no physical action.

The next gate is dynamical:

\[
\text{orbit multiplicity}
\longrightarrow
\text{normalized kinetic/response operator}
\longrightarrow
\text{detector observable}.
\]

That gate is addressed by [the resolved-versus-lumped detector model](frontier_wave6_03_resolved_versus_lumped_d4_dynamics.md).

