# The Handle Group Lifts Surjectively to Modulo Nine, Twenty-Five and Forty-Nine

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B08, B09, B10, B12 and B14  
**Claim status:** exact prime-square lifting at \(3,5,7\); all higher powers and complete congruence closure remain open

## 1. The prime-square question

Full reduction modulo a prime does not guarantee full reduction modulo its square. The kernel

\[
\ker\!\left(
Sp(4,\mathbb Z/p^2\mathbb Z)
\to
Sp(4,\mathbb F_p)
\right)
\]

is the additive ten-dimensional Lie algebra

\[
p\,\mathfrak{sp}_4(\mathbb F_p),
\]

of order \(p^{10}\).

To prove prime-square surjectivity, the handle group must supply every one of those infinitesimal kernel directions.

## 2. The mutual shear supplies a level-\(p\) seed

Write the positive mutual generator as

\[
U=I+N,
\qquad
N=
\begin{pmatrix}
0&0\\
K_+&0
\end{pmatrix}.
\]

Since \(N^2=0\),

\[
U^p=I+pN\pmod{p^2}.
\]

Thus the integral group contains one nonzero level-\(p\) Lie direction. Conjugating by any group element gives

\[
gU^pg^{-1}
=I+p\,\operatorname{Ad}(g)N
\pmod{p^2}.
\]

Products of these elements add their Lie directions because all cross terms are divisible by \(p^2\).

## 3. Adjoint-orbit calculation

For each prime \(p=3,5,7\), and for all four equal or mixed handle assignments, the certificate closes the adjoint orbit of \(N\) under:

1. the first handle transfer;
2. the second handle transfer;
3. the mutual shear itself.

In every case its linear span has dimension

\[
\boxed{10=\dim\mathfrak{sp}_4(\mathbb F_p).}
\]

Therefore the group contains the entire level-\(p\) kernel.

Combining this with the already certified prime-level surjections yields

\[
\boxed{
\Gamma_{\epsilon_1,\epsilon_2}
\twoheadrightarrow
Sp(4,\mathbb Z/p^2\mathbb Z),
\qquad
p=3,5,7.
}
\]

Equivalently, the group is full modulo

\[
9,\qquad25,\qquad49.
\]

## 4. Exact group orders

For a smooth symplectic group,

\[
\left|Sp(4,\mathbb Z/p^2\mathbb Z)\right|
=p^{10}\left|Sp(4,\mathbb F_p)\right|.
\]

The resulting orders are:

| modulus | group order |
|---:|---:|
| \(9\) | \(3{,}061{,}100{,}160\) |
| \(25\) | \(91{,}406{,}250{,}000{,}000\) |
| \(49\) | \(78{,}131{,}297{,}992{,}204{,}800\) |

These groups are never explicitly enumerated. The proof uses the prime quotient and its ten-dimensional additive kernel.

## 5. The ramified prime five again lifts fully

Modulo five, \(K_+\) has rank one because \(\det K_+=5\). Nevertheless its adjoint orbit spans all of \(\mathfrak{sp}_4(\mathbb F_5)\), and the level-five kernel is complete.

Therefore the determinant-five ramification does not stop at a deceptive prime-level success: the lift remains full modulo twenty-five.

## 6. Consequences for congruence closure

The integral subgroup now has:

- full images modulo \(3,5,7\);
- full images modulo \(3^2,5^2,7^2\);
- a controlled proper image modulo two.

This is strong evidence that the odd-adic closures at \(3,5,7\) are the full groups

\[
Sp(4,\mathbb Z_p),
\]

because a full mod-\(p^2\) image commonly initiates the standard lifting induction for odd primes. A complete proof for all powers should verify the relevant congruence-kernel Frattini/lifting lemma in this generator setting rather than assume it.

No conclusion about finite index in \(Sp(4,\mathbb Z)\) follows automatically.

## 7. Claim ledger

- **Exact:** \(U^p=I+pN\pmod{p^2}\).
- **Exact:** the adjoint orbit of \(N\) spans ten dimensions for \(p=3,5,7\).
- **Exact:** every handle assignment is surjective modulo \(9,25,49\).
- **Exact:** rank-one ramification at five does not obstruct the level-five kernel.
- **Strong evidence:** the corresponding odd-adic closures are full.
- **Open:** a formal all-\(p^n\) lifting induction.
- **Open:** the complete congruence closure and exceptional-prime set.
- **Open:** finite index versus thinness.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** prove the all-power lifting lemma and combine it with an effective strong-approximation bound to determine the complete congruence closure.

**Arithmetic trigger:** exhibit a principal congruence subgroup contained in the integral handle group.

**Kernel falsifier:** prime-level surjectivity is used to assert prime-square surjectivity without spanning all ten kernel directions.

**Order falsifier:** the prime-square group is enumerated conceptually as \(p^{16}\) arbitrary matrices rather than the smooth ten-dimensional kernel over the prime quotient.

**Index falsifier:** full odd-adic closure is equated with finite global index.

## 9. Certificate

The [prime-square lifting certificate](scripts/verify_full_prime_square_lifts_at_three_five_and_seven.mjs) checks nilpotence, computes every adjoint-orbit span over the three finite fields and reports the exact prime-square group orders.

## Companion documents

- [Prime congruence images](492_the_zariski_dense_handle_group_is_surjective_at_three_five_and_seven_with_a_controlled_binary_exception.md)
- [Zariski-dense handle group](491_two_quadratic_handle_transfers_and_one_mutual_shear_are_zariski_dense_in_sp4_and_mod_three_surjective.md)
- [Positive integral mutual shear](486_the_three_transvection_word_has_a_positive_integral_jordan_lift_whose_level_three_self_terms_hide_modulo_three.md)
