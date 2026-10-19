# Full Modulo \(p^2\) Implies Full Odd-Adic Closure for the Handle Groups

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B08, B09, B10, B12 and B14  
**Claim status:** exact congruence-lifting theorem applied at \(p=3,5,7\); two-adic closure and global index remain open

## 1. From the first lift to every lift

The previous calculation proved

\[
\Gamma_{\epsilon_1,\epsilon_2}
\twoheadrightarrow
Sp(4,\mathbb Z/p^2\mathbb Z)
\]

for

\[
p=3,5,7.
\]

For odd primes, this is enough to lift through every congruence level.

Let

\[
h=I+p^rX\pmod{p^{r+1}},
\qquad
r\ge1.
\]

Write \(h=I+Z\), where

\[
Z=p^rX+O(p^{r+1}).
\]

The binomial expansion gives

\[
h^p
=I+pZ+\sum_{k=2}^p\binom pk Z^k.
\]

For odd \(p\), every term with \(k\ge2\) has \(p\)-adic valuation at least \(r+2\). Therefore

\[
\boxed{
h^p=I+p^{r+1}X\pmod{p^{r+2}}.
}
\]

The \(p\)-th-power map transports each Lie direction from one congruence layer to the next.

## 2. Induction on the congruence depth

The kernel layer is

\[
\ker\!\left(
Sp(4,\mathbb Z/p^{r+1}\mathbb Z)
\to
Sp(4,\mathbb Z/p^r\mathbb Z)
\right)
\cong
\mathfrak{sp}_4(\mathbb F_p)
\]

additively.

Full image modulo \(p^2\) supplies an element

\[
h_X=I+pX\pmod{p^2}
\]

for every

\[
X\in\mathfrak{sp}_4(\mathbb F_p).
\]

Repeated \(p\)-th powers give

\[
h_X^{p^{r-1}}
=I+p^rX\pmod{p^{r+1}}.
\]

Hence every kernel layer is present. If the image is full modulo \(p^r\), adjoining the full kernel proves it is full modulo \(p^{r+1}\).

By induction,

\[
\boxed{
\Gamma_{\epsilon_1,\epsilon_2}
\twoheadrightarrow
Sp(4,\mathbb Z/p^n\mathbb Z)
\quad
\text{for every }n\ge1
}
\]

at each of the primes \(3,5,7\).

## 3. Full local closures

Taking inverse limits gives

\[
\boxed{
\overline{\Gamma_{\epsilon_1,\epsilon_2}}^{\,p\text{-adic}}
=Sp(4,\mathbb Z_p),
\qquad
p=3,5,7.
}
\]

This holds for all four equal and mixed quadratic-order assignments.

The arithmetic subgroup is therefore locally indistinguishable from the full symplectic lattice at these three odd primes, at every finite precision.

## 4. Why the argument is different at two

For \(p=2\) and \(r=1\),

\[
(I+2X)^2
=I+4(X+X^2)\pmod8.
\]

The quadratic term \(X^2\) survives at the same congruence order. The simple Lie-direction lifting map is not linear, and the prime-level image is already proper because the mutual off-diagonal coefficient vanishes.

The two-adic closure must therefore be computed separately. It may retain a persistent block or quadratic refinement invisible at odd primes.

## 5. What this proves about arithmetic size

The subgroup now has:

- full Zariski closure over \(\mathbb Q\);
- full \(3\)-adic closure;
- full \(5\)-adic closure;
- full \(7\)-adic closure;
- a proper binary reduction.

These are strong arithmetic-size statements. They still do not prove global finite index. A thin subgroup can be dense in several—or all—local factors outside a finite set.

To settle finite index, one must additionally control the global integral quotient or exhibit a principal congruence subgroup inside \(\Gamma\).

## 6. Relation to the finite code

The qutrit code was the first finite shadow. The result is now stronger:

\[
\text{one mod-three logical action}
\longrightarrow
\text{full }Sp(4,\mathbb Z/3^n\mathbb Z)
\text{ image for every }n.
\]

The finite qutrit carrier is not an isolated coincidence inside the selected integral lift. It is the first layer of a full \(3\)-adic symplectic tower.

This tower remains an arithmetic statement. It does not mean that a physical qutrit experiment accesses arbitrary \(3\)-adic precision.

## 7. Claim ledger

- **Exact theorem:** odd-prime congruence directions lift one level under \(p\)-th powers.
- **Exact:** full mod-\(p^2\) image inducts to full mod-\(p^n\) image for all \(n\).
- **Exact application:** all handle groups have full \(3\)-, \(5\)- and \(7\)-adic closures.
- **Exact:** the binary lifting argument fails at its first nonlinear term.
- **Open:** the two-adic closure.
- **Open:** full local closure at all other odd primes.
- **Open:** global finite index versus thinness.
- **Not established:** a physical \(p\)-adic dynamics.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** determine the two-adic closure and combine it with an effective exceptional-prime theorem to obtain the complete profinite closure.

**Finite-index trigger:** exhibit a principal congruence subgroup contained in \(\Gamma\), not merely dense local projections.

**Lifting falsifier:** the odd-prime binomial argument is applied unchanged at \(p=2\).

**Global falsifier:** full \(p\)-adic closure at three primes is called a proof of global finite index.

**Physics falsifier:** an arithmetic inverse limit is interpreted as an observable continuum without a measurement construction.

## 9. Certificate

The [odd-prime lifting certificate](scripts/verify_odd_prime_congruence_layer_power_lifting.mjs) checks the valuation inequalities, the binary failure and the exact nilpotent-power identity for the mutual generator.

## Companion documents

- [Prime-square surjectivity](493_the_handle_group_lifts_surjectively_to_modulo_nine_twenty_five_and_forty_nine.md)
- [Prime congruence images](492_the_zariski_dense_handle_group_is_surjective_at_three_five_and_seven_with_a_controlled_binary_exception.md)
- [Zariski-dense handle group](491_two_quadratic_handle_transfers_and_one_mutual_shear_are_zariski_dense_in_sp4_and_mod_three_surjective.md)
