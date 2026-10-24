# Frontier Wave 6.10: Selector Inclusion-Index Comparison

**Date:** 24 October 2026  
**Status:** exact finite-dimensional inclusion audit after complexification  
**Certificate:** [verify_selector_fixed_algebra_inclusion_indices.mjs](../../../../verification/verify/verify_selector_fixed_algebra_inclusion_indices.mjs)

## Result

The three selector constructions already present in the corpus have different fixed algebras and different finite-dimensional inclusion indices.

Complexify the 16-dimensional carrier and write each fixed algebra \(B\subset M_{16}(\mathbb C)\) through its simple blocks and inclusion multiplicities:

| Selector | Fixed algebra \(B\) | Inclusion vector | \(\dim_{\mathbb C}B\) | Markov/Jones index |
|---|---|---:|---:|---:|
| finite \((\mathbb Z_2)^3\) sign twirl | \(\bigoplus_{r=1}^8M_2\) | \((1,1,1,1,1,1,1,1)^T\) | 32 | 8 |
| Haar \(G_2\) commutant | \(M_2\oplus M_2\) | \((1,7)^T\) | 8 | 50 |
| Clifford multiplicity expectation | \(M_2\otimes I_8\cong M_2\) | \((8)^T\) | 4 | 64 |

For a one-column inclusion matrix with multiplicities \(d_i\), the finite-dimensional Markov index is

\[
[M_{16}:B]=\sum_i d_i^2.
\]

Therefore:

\[
\boxed{8,\quad50,\quad64}
\]

are the respective indices.

## Meaning

The fixed-algebra dimension answers:

> How many operator directions remain visible?

The inclusion index answers:

> How much representation multiplicity was compressed into those surviving blocks?

They move oppositely here:

\[
32>8>4,
\qquad
8<50<64.
\]

The Clifford expectation achieves the smallest desired algebra by compressing the entire eight-dimensional multiplicity factor. Haar \(G_2\) retains separate scalar and seven-dimensional imaginary-octonion response blocks, producing the \((1,7)\) index vector and the synchronization obstruction of [claim 704](../../../claims/0700-0799/704_the_finite_g2_selector_fixed_algebra_is_eight_m2_blocks_and_symmetry_alone_cannot_synchronize_them.md).

## What the index does not do

Index is not:

- a probability;
- a particle multiplicity by itself;
- a dissipative rate;
- a thermodynamic work cost;
- evidence that one expectation is physically preferred.

The [six-jump Clifford Lindbladian](../../../claims/0700-0799/707_a_six_jump_clifford_lindbladian_converges_to_h2r_with_exact_gap_but_must_not_depolarize_the_same_face.md) has gap

\[
2\gamma.
\]

That gap depends on the selected generator normalization \(\gamma\), whereas the inclusion index remains 64. The same expectation can be approached by semigroups with different time scales. Index and gap are independent data.

Likewise, a one-step idempotent twirl has no intrinsic physical mixing time unless an implementation protocol is specified.

## Selector comparison

| Question | Finite sign twirl | Haar \(G_2\) | Clifford expectation |
|---|---|---|---|
| CP/unital expectation exists | yes | yes | yes |
| desired \(M_2\) range exactly | no | no | yes |
| excess blocks | eight total | scalar and imaginary blocks | none |
| inclusion index | 8 | 50 | 64 |
| canonical physical generator | absent | normalization-dependent heat/twirl choice | six-jump model exists |
| matter-factor compatibility | conditional | can erase selected complex direction | requires separate typed factor |

Thus the index enriches the comparison but does not reverse the existing verdict: the Clifford expectation solves the range problem, while the physical origin of its action remains missing.

## Thermodynamic and information branch

A physical cost comparison now has a finite target. For the same initial state \(\rho\), compute:

1. relative entropy \(D(\rho\Vert E(\rho))\);
2. entropy production along a declared semigroup;
3. mixing time to fixed trace distance;
4. record size needed to implement or monitor the channel; and
5. recoverability of discarded multiplicity information.

The inclusion index may bound some of these quantities, but it cannot replace them.

## Branch verdict

The finite-dimensional index audit of the three existing selectors is complete. It distinguishes the expectations by \((\dim B,[A:B])\):

\[
(32,8),\qquad(8,50),\qquad(4,64).
\]

No index equality connects the \(G_2\) triple bond directly to the Clifford selector. The occurrence of three in the abstract cyclic example is specific to the three-state inclusion; the actual Clifford selector has index 64.

This is an important no-go boundary: **the triple bond is not the index of the corpus's working \(H_2(\mathbb R)\) selector.**

