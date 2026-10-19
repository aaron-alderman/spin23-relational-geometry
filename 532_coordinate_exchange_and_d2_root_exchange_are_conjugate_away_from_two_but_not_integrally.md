# Coordinate Exchange and \(D_2\) Root Exchange Are Conjugate Away from Two, but Not Integrally

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B13 and B14  
**Claim status:** exact local-global conjugacy obstruction; physical choice of the binary integral lift remains open

## 1. Result

Let

\[
A=\begin{pmatrix}1&0\\0&-1\end{pmatrix}
\]

be puncture-coordinate exchange in the \(D_2\) root basis, and let

\[
R=\begin{pmatrix}0&1\\1&0\end{pmatrix}
\]

be root exchange. With

\[
H=\begin{pmatrix}1&1\\1&-1\end{pmatrix},
\qquad \det H=-2,
\]

one has

\[
H^{-1}AH=R
\]

after inverting two. Therefore \(A\) and \(R\) are conjugate:

- over \(\mathbb Z[1/2]\);
- over \(\mathbb Q\);
- over every \(\mathbb F_p\) for odd \(p\), including \(p=3\).

They are not conjugate over \(\mathbb Z\) or \(\mathbb F_2\).

## 2. The binary split

Modulo two,

\[
A\equiv I,
\qquad
R\equiv
\begin{pmatrix}0&1\\1&0\end{pmatrix}\ne I.
\]

The Hadamard matrix loses rank:

\[
\operatorname{rank}_{\mathbb F_2}H=1.
\]

Thus the distinction between coordinate exchange and root exchange is entirely two-primary. Every odd-prime shadow identifies them, while the binary shadow separates them.

This explains why the qutrit and general odd-prime branches do not detect the equivariance obstruction found in Document 531.

## 3. Integral symplectic lifts are not conjugate

On \(D_2\oplus D_2^*\), the symplectic lifts are

\[
S_A=\operatorname{diag}(A,A),
\qquad
S_R=\operatorname{diag}(R,R).
\]

If they were conjugate in \(GL(4,\mathbb Z)\), the cokernels of \(S_A-I\) and \(S_R-I\) would be isomorphic. They are not.

For \(S_A-I\), the nonzero Smith factors are

\[
(2,2),
\]

so

\[
\operatorname{coker}(S_A-I)
\cong\mathbb Z^2\oplus(\mathbb Z_2)^2.
\]

For \(S_R-I\), the nonzero Smith factors are

\[
(1,1),
\]

so

\[
\operatorname{coker}(S_R-I)
\cong\mathbb Z^2.
\]

Hence

\[
\boxed{S_A\not\sim S_R\text{ in }GL(4,\mathbb Z),}
\]

and therefore not in \(Sp(4,\mathbb Z)\).

## 4. Why a metaplectic phase cannot fix this

A metaplectic extension is central:

\[
1\to\mu_n\to Mp\to Sp\to1.
\]

It can distinguish lifts of the same symplectic transformation by phases, but it cannot turn two nonconjugate underlying symplectic transformations into conjugate ones. Therefore a Fourier or theta multiplier alone cannot repair the integral equivariance mismatch.

At odd primes, the Hadamard conjugator is invertible and a finite Fourier transform can relate the two presentations. At \(p=2\), the conjugator collapses rank and no such operation exists on the same binary module.

## 5. Programme consequence

The obstruction has become sharply localized:

\[
\boxed{\text{all odd-prime fibers agree; the mismatch is a two-primary integral lift problem}.}
\]

The remaining credible options are:

1. the physical binary action is root exchange, not raw puncture-coordinate exchange;
2. the support weak swap acts on an additional binary extension not visible in \(A_{D_2}\);
3. the color/Tor line participates in a non-split integral action before passing to the discriminant quotient;
4. the Furey action and code puncture action are genuinely different symmetries and should not be identified.

Option four must remain live: forcing the two actions together would now contradict the Smith invariants.

## 6. Stop-everything and falsification gates

### Stop-everything

1. The code's actual monomial automorphism includes the sign reversal converting \(A\) to \(R\).
2. A non-split action on the Tor/discriminant extension reduces to the support swap while retaining \(S_A\) on the integral carrier.
3. A physical chirality or charge-flow rule independently selects the root-exchange lift.

### Falsifiers

- No integral or binary Fourier conjugacy exists.
- A central metaplectic phase cannot change the underlying action.
- Odd-prime agreement is insufficient to determine the binary integral lift.
- Any proposed unified action must reproduce the different Smith cokernels.

## 7. Next branches

1. Compute all automorphisms of the non-split Tor/discriminant extension.
2. Test whether the support swap can lift nontrivially while acting trivially on \(A_{D_2}\).
3. Inspect the Prakash–Ramya monomial automorphism on the two deleted coordinates and retained columns.
4. Continue the odd-prime branch separately, where the Hadamard conjugacy is valid.

## Certificate and companions

- [Localization-at-two certificate](scripts/prove_coordinate_and_root_exchange_conjugate_only_after_inverting_two.mjs)
- [Labelled phase map and equivariance obstruction](531_the_support_to_d2_phase_map_is_unique_when_labelled_but_not_puncture_exchange_equivariant.md)
- [Two-puncture \(D_2\) phase carrier](530_the_two_puncture_d2_lattice_supplies_the_missing_binary_phase_and_fixes_the_index_six_fiber.md)

