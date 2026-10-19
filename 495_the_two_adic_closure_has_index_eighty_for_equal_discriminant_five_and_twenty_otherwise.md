# The Two-Adic Closure Has Index Eighty for Equal Discriminant Five and Twenty Otherwise

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B08, B09, B10, B12 and B14  
**Claim status:** exact two-adic image indices and binary subgroup structure; physical parity interpretation remains open

## 1. Completing the exceptional-prime analysis

At odd primes \(3,5,7\), every handle assignment has full local symplectic closure. Prime two is different because

\[
K_+=\begin{pmatrix}3&2\\2&3\end{pmatrix}
\equiv I_2\pmod2.
\]

The mutual off-diagonal coupling vanishes, so the binary image cannot mix the two handle planes.

Exact Schreier calculations modulo \(2,4,8\) now determine the full two-adic indices.

## 2. Exact image orders

| modulus | traces \(3,3\) | traces \(3,6\) | traces \(6,3\) | traces \(6,6\) |
|---:|---:|---:|---:|---:|
| \(2\) | 18 | 36 | 36 | 36 |
| \(4\) | 9,216 | 36,864 | 36,864 | 36,864 |
| \(8\) | 9,437,184 | 37,748,736 | 37,748,736 | 37,748,736 |

Against the full symplectic orders, the indices are:

| modulus | traces \(3,3\) | other assignments |
|---:|---:|---:|
| \(2\) | 40 | 20 |
| \(4\) | 80 | 20 |
| \(8\) | 80 | 20 |

Thus the equal discriminant-five branch acquires one additional factor of two in its defect at the first congruence lift.

## 3. Binary subgroup structure

Over \(\mathbb F_2\),

\[
SL(2,\mathbb F_2)\cong S_3.
\]

The two handles supply a block product

\[
S_3\times S_3
\subset Sp(4,\mathbb F_2),
\]

of order \(36\).

If at least one handle has trace six, the generators produce this full block product.

For equal trace-three handles:

- each local transfer reduces to a three-cycle;
- the reduced mutual generator supplies the same transposition on both handles.

Hence the two permutation parities must agree. The image is the fiber product

\[
\boxed{
S_3\times_{\mathbb Z_2}S_3
=
\{(g,h):\operatorname{sgn}g=\operatorname{sgn}h\},
}
\]

of order \(18\).

This identifies the extra binary constraint explicitly: equal discriminant-five handles carry a matched handle parity.

## 4. The first two-adic kernel

The full kernel from modulo two to modulo four has size

\[
2^{10}.
\]

For the three assignments with binary image order \(36\),

\[
\frac{|\Gamma\bmod4|}{|\Gamma\bmod2|}
=\frac{36864}{36}
=2^{10}.
\]

They contain the complete first congruence kernel.

For equal trace three,

\[
\frac{9216}{18}=2^9.
\]

Exactly one of the ten first-layer Lie directions is absent. This doubles the ambient index from \(40\) to \(80\).

## 5. Stabilization from modulo eight

For every assignment,

\[
\frac{|\Gamma\bmod8|}{|\Gamma\bmod4|}=2^{10}.
\]

Thus the full kernel from level four to level eight is present.

For \(r\ge2\), squaring a level-\(2^r\) element obeys

\[
(I+2^rX)^2
=I+2^{r+1}X
\pmod{2^{r+2}},
\]

because

\[
2^{2r}X^2\equiv0\pmod{2^{r+2}}.
\]

The same layer-lifting induction used at odd primes now works from \(r=2\) onward.

Therefore the two-adic closure indices are exactly

\[
\boxed{
[Sp(4,\mathbb Z_2):\overline\Gamma^{\,2\text{-adic}}]
=
\begin{cases}
80,&(\Delta_1,\Delta_2)=(5,5),\\
20,&(5,32),(32,5),(32,32).
\end{cases}
}
\]

## 6. Arithmetic selection information

Odd-prime reductions and Zariski closure do not distinguish the four handle assignments. The two-adic closure does:

- equal discriminant five has matched binary handle parity and index eighty;
- every other assignment has the full block binary image and index twenty.

The two-adic sector can therefore falsify the hypothesis that all equal/mixed assignments are arithmetically interchangeable.

It does not distinguish the three index-twenty assignments from one another.

## 7. Possible physical reading

The source code also changes character at prime two: raw \(\pm1\) charges collapse and the binary construction uses Reed–Muller sign bits. The matched-parity fiber product may be the arithmetic shadow of a correlated fermion-parity or determinant-line condition on the two matter handles.

That interpretation is not yet derived. A valid bridge must map:

\[
\operatorname{sgn}:S_3\to\mathbb Z_2
\]

on each handle to a concrete fermion-parity, Pfaffian or ribbon-orientation observable.

## 8. Claim ledger

- **Exact:** all mod-\(2,4,8\) image orders in the table.
- **Exact:** the order-thirty-six binary image is \(S_3\times S_3\).
- **Exact:** the order-eighteen image is the matched-parity fiber product.
- **Exact:** equal discriminant five misses one first-kernel direction.
- **Exact:** every assignment has full higher kernel layers from modulo four onward.
- **Exact:** the two-adic closure indices are eighty and twenty.
- **Candidate bridge:** matched binary handle parity is a determinant-line or fermion-parity sewing rule.
- **Open:** physical identification of the parity character.
- **Open:** global finite index despite now-known local closures.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** identify the matched \(S_3\) parity with the same microscopic determinant-line sign needed to orient the two Furey seams.

**Selection trigger:** a source symmetry forces equal discriminant-five handles and predicts the index-eighty two-adic closure.

**Kernel falsifier:** the equal trace-three branch is said to contain the full mod-two-to-mod-four kernel despite its certified ratio \(2^9\).

**Lifting falsifier:** the binary square argument is started at \(r=1\), where the \(X^2\) term need not vanish.

**Physics falsifier:** the abstract \(S_3\) sign is called fermion parity without an explicit intertwiner.

## 10. Certificate

The [two-adic image certificate](scripts/verify_two_adic_handle_group_orders_and_stable_indices.mjs) computes exact group orders by Schreier recursion, verifies all twelve images and records the stabilized indices.

## Companion documents

- [Full odd-adic closures](494_full_modulo_p_squared_implies_full_odd_adic_closure_for_the_handle_groups.md)
- [Prime congruence images](492_the_zariski_dense_handle_group_is_surjective_at_three_five_and_seven_with_a_controlled_binary_exception.md)
- [Determinant-line orientation obstruction](476_the_wilson_takagi_regulator_fixes_relative_pfaffians_but_leaves_the_absolute_majorana_orientation_free.md)
- [Binary code caveat](451_the_nu_c_e_c_two_puncture_stabilizer_selects_the_sm_3_plus_2_flag_but_acts_trivially_on_logical_phase_space.md)
