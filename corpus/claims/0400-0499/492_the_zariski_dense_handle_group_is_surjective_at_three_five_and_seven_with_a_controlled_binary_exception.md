# The Zariski-Dense Handle Group Is Surjective at Three, Five and Seven, with a Controlled Binary Exception

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B08, B09, B10, B12 and B14  
**Claim status:** exact congruence-image orders at four primes; complete exceptional-prime set and finite index remain open

## 1. Why further congruence images matter

The two handle transfers and one mutual shear generate a Zariski-dense subgroup

\[
\Gamma_{\epsilon_1,\epsilon_2}
\subset Sp(4,\mathbb Z)
\]

for every equal or mixed assignment of discriminants five and thirty-two. They also surject onto \(Sp(4,\mathbb F_3)\).

One finite quotient is not enough to distinguish:

- a finite-index arithmetic subgroup;
- a thin Zariski-dense subgroup;
- a group with accidental surjectivity only at level three.

The certificate therefore computes exact finite-image orders at primes \(2,3,5,7\) using Schreier orbit–stabilizer recursion.

## 2. Exact congruence orders

Let the handle traces be \(3\) for discriminant five and \(6\) for discriminant thirty-two. The results are:

| prime | handle traces | image order | full \(Sp(4,\mathbb F_p)\) order | index |
|---:|---:|---:|---:|---:|
| 2 | \(3,3\) | 18 | 720 | 40 |
| 2 | \(3,6\) | 36 | 720 | 20 |
| 2 | \(6,3\) | 36 | 720 | 20 |
| 2 | \(6,6\) | 36 | 720 | 20 |
| 3 | all four | 51,840 | 51,840 | 1 |
| 5 | all four | 9,360,000 | 9,360,000 | 1 |
| 7 | all four | 276,595,200 | 276,595,200 | 1 |

Thus

\[
\boxed{
\Gamma_{\epsilon_1,\epsilon_2}\twoheadrightarrow
Sp(4,\mathbb F_p)
\quad\text{for }p=3,5,7
}
\]

for every handle assignment tested.

## 3. Why prime two is exceptional

The positive mutual kernel is

\[
K_+=\begin{pmatrix}3&2\\2&3\end{pmatrix}.
\]

Modulo two,

\[
K_+\equiv I_2.
\]

The off-diagonal coupling disappears. The unipotent that mixes the two handles over odd fields becomes a product of local self shears. Consequently the binary image preserves more of the handle decomposition and cannot be full \(Sp(4,\mathbb F_2)\).

The two transfer traces also separate:

\[
3\equiv1\pmod2,
\qquad
6\equiv0\pmod2.
\]

The equal discriminant-five assignment has image order \(18\); every assignment containing at least one discriminant-thirty-two handle has order \(36\).

This supplies a finite arithmetic discriminator unavailable at odd primes.

## 4. Prime five is not obstructed by the Jordan determinant

Since

\[
\det K_+=5,
\]

the mutual kernel has rank one modulo five. One might expect this ramification to force a proper finite image.

It does not. Conjugation by the two handle transfers moves the rank-one transvection through enough directions to generate the full group:

\[
\Gamma_{\epsilon_1,\epsilon_2}\bmod5
=Sp(4,\mathbb F_5).
\]

The determinant-five degeneration of one generator is therefore repaired by the rest of the generator system.

## 5. Strong-approximation interpretation

For a finitely generated Zariski-dense subgroup of the simply connected group \(Sp(4)\) over \(\mathbb Q\), strong approximation implies that reduction is surjective for all but finitely many primes, subject to the standard integral-model formulation.

The present results provide the concrete evidence:

- Zariski density is independently certified;
- reductions are full at three consecutive odd primes \(3,5,7\);
- prime two has an explicitly explained degeneration.

What may be concluded is:

> the computed pattern is consistent with strong approximation, and the exceptional-prime set is finite.

What may not yet be concluded is:

> prime two is the only exceptional prime.

That requires either an effective strong-approximation bound, a congruence-closure computation or checks covering the remaining candidate bad primes.

## 6. Thinness remains unresolved

Surjectivity modulo almost every prime does not distinguish a finite-index arithmetic subgroup from a thin group. Thin Zariski-dense subgroups can have full reductions at almost all primes.

The remaining tests include:

1. find principal-congruence transvections inside \(\Gamma\);
2. compute the closure modulo prime powers \(p^2\);
3. apply a finite-index criterion for symplectic transvection groups;
4. construct a fundamental domain or prove infinite index;
5. compare growth and orbit statistics with the ambient lattice.

The current claim stops at exact finite images and strong-approximation compatibility.

## 7. Physical interpretation of the binary exception

The qutrit code sees the mutual coefficient \(2\) as nonzero. The binary reduction kills it. This aligns with the source distinction:

- odd-prime sign weights retain the two independent puncture evaluations;
- modulo two, raw \(\pm1\) weights collapse and the construction must be reformulated through Reed–Muller sign bits.

The binary exceptional image is therefore not an arbitrary arithmetic blemish. It occurs at the same prime where the physical coding presentation changes character.

## 8. Claim ledger

- **Exact:** all four handle assignments surject at \(p=3,5,7\).
- **Exact:** the binary image orders are \(18,36,36,36\).
- **Exact:** the off-diagonal mutual kernel vanishes modulo two.
- **Exact:** rank-one degeneration at \(p=5\) does not prevent full closure.
- **Theorem-level inference:** Zariski density gives strong approximation outside a finite exceptional set.
- **Open:** the complete exceptional set.
- **Open:** finite index versus thinness.
- **Open:** prime-power images and congruence level.
- **Not established:** that arithmetic surjectivity is a physical symmetry realized at low energy.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** prove that one source-selected generator group contains a principal congruence subgroup of \(Sp(4,\mathbb Z)\).

**Thinness trigger:** prove infinite index while retaining the certified full odd-prime reductions.

**Exceptional-prime trigger:** an effective theorem shows that two is the only bad prime for the selected assignment.

**Strong-approximation falsifier:** three computed surjections are called a proof of surjectivity at every odd prime.

**Index falsifier:** full reductions at many primes are called a finite-index proof.

## 10. Certificate

The [congruence-order certificate](../../../verification/verify/verify_two_handle_arithmetic_group_congruence_orders.mjs) uses exact Schreier stabilizer recursion on the natural four-dimensional vector action; it does not enumerate and store the full \(p=7\) group.

## Companion documents

- [Zariski-dense genus-two handle group](491_two_quadratic_handle_transfers_and_one_mutual_shear_are_zariski_dense_in_sp4_and_mod_three_surjective.md)
- [Quadratic-order transfer lattices](490_the_two_scalar_transfer_branches_preserve_quadratic_order_lattices_and_share_an_order_four_mod_three_shadow.md)
- [Two-puncture binary exception](451_the_nu_c_e_c_two_puncture_stabilizer_selects_the_sm_3_plus_2_flag_but_acts_trivially_on_logical_phase_space.md)
- [Braid congruence finite shadows](../0100-0199/140_braid_congruence_reductions_and_finite_shadows.md)
