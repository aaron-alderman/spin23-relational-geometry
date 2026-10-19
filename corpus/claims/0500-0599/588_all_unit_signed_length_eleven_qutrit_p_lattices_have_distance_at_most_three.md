# All Unit-Signed Length-Eleven Qutrit P-Lattices Have Distance at Most Three

**Date:** 17 October 2026  
**Primary source for the P-code criterion:** Shiroman Prakash and K. L. Ramya, [“One generation of the Standard Model as a quantum error-correcting code,” arXiv:2610.21879v1](https://arxiv.org/abs/2610.21879v1)  
**Branches:** B03, B04, B07, B09, B10, B11, B12, B13 and B14  
**Claim status:** exhaustive finite classification and global no-go for unit coefficients at length eleven

## Executive result

The nontransverse cells left open by the preceding \(59049\)-graph calculation have now been exhausted. For the coefficient pattern

\[
\mu=(+1,+1,+1,+1,+1,+1,-1,-1,-1,-1,-1),
\qquad N=1,
\]

there are exactly

\[
2\prod_{i=1}^{4}(3^i+1)=183680
\]

maximal totally isotropic five-spaces in the qutrit complement of the all-one vector. Every one was enumerated exactly. Their \(P\)-distance distribution is

| qutrit \(P\)-distance | number of maximal isotropic spaces |
|---:|---:|
| 1 | 13440 |
| 2 | 22400 |
| 3 | 147840 |
| 4 | 0 |
| 5 | 0 |

Therefore

\[
\boxed{
\text{every unit-signed length-eleven qutrit }P\text{-lattice with }|N|=1
\text{ has distance at most }3.}
\]

This closes the direct unit-chirality lift of the ternary Golay \(P\)-code. It does not close the ternary Golay construction itself, nor the explicit signed integral distance-five family at primes \(p\ge13\).

## 1. Reduction to one finite quadratic space

At length eleven, unit coefficients and \(N=1\) force six positive and five negative signs. Coordinate permutations make every such sign vector equivalent to the displayed \(\mu\). Changing every sign handles \(N=-1\), so it adds no new case.

Over \(\mathbb F_3\), the all-one vector has nonzero norm \(N=1\). Its orthogonal complement is a nondegenerate split ten-dimensional quadratic space

\[
V=\mathbf1^\perp\cong H^5.
\]

The two \(P\)-conditions say that the row space \(S\) lies in \(V\) and is totally isotropic. Its rank is at most five. The largest cases are therefore the maximal totally isotropic five-spaces of \(H^5\).

## 2. Exhausting both orthogonal families

The certificate starts from one reference Lagrangian and acts with twenty skew-root moves, eight elementary \(GL(5,3)\) moves and the full exchange of the two hyperbolic factors. Every resulting row space is reduced to a canonical reduced-row-echelon key.

The breadth-first orbit contains exactly \(183680\) distinct spaces. This agrees with the independent polar-space count: each of the two orthogonal families has

\[
\prod_{i=1}^{4}(3^i+1)=91840
\]

members. Equality between the generated count and the complete theoretical count is the completeness certificate; the traversal did not merely sample a large orbit.

The intersection dimensions with the reference Lagrangian provide an additional Schubert-cell audit:

| intersection dimension | 0 | 1 | 2 | 3 | 4 | 5 |
|---:|---:|---:|---:|---:|---:|---:|
| number of spaces | 59049 | 88209 | 32670 | 3630 | 121 | 1 |

The first entry is exactly the \(3^{10}=59049\) transverse graph chart studied previously. The remaining \(124631\) spaces are the nontransverse cases that were still open.

## 3. Exact distance test

For each maximal isotropic row space \(M\), map its hyperbolic coordinates back to the eleven distinguished coordinate axes. For every support \(J\subset\{1,\ldots,11\}\) of size at most four, compare

\[
\operatorname{rank}(M_J)
\quad\text{and}\quad
\operatorname{rank}
\begin{pmatrix}
M_J\\
\mathbf1_J
\end{pmatrix}.
\]

The rank rises precisely when the restricted all-one functional is not in the row span, equivalently when a kernel vector on \(J\) is orthogonal to \(M\) but has nonzero coordinate sum. The smallest such support is the \(P\)-distance.

All \(183680\) maximal spaces acquire a witness by weight three. None reaches weight four or five.

## 4. Why maximal rank also settles every lower rank

Let \(S\subset V\) be any totally isotropic space of rank below five. Witt extension places it inside some maximal totally isotropic space \(M\):

\[
S\subset M.
\]

Ordinary coordinate orthogonals reverse inclusion:

\[
M^\perp\subset S^\perp.
\]

The enumeration supplies a vector \(v\in M^\perp\) of weight at most three whose coordinate sum is nonzero. The same vector lies in \(S^\perp\) and remains logical for \(S\). Hence

\[
d_P(S)\le d_P(M)\le3.
\]

The exhaustive maximal-rank calculation is therefore a theorem for all possible ranks, not just rank five.

## 5. What is ruled out

There is no length-eleven qutrit \(P\)-code of distance four or five obtained from coefficients \(\mu_\ell=\pm1\) with \(|N|=1\). In particular, the ternary Golay \(P\)-code cannot be the mod-three reduction of a length-eleven integral \(P\)-lattice whose coefficients are literally six \(+1\)'s and five \(-1\)'s.

The direct interpretation of the signs as eleven unit chiralities is therefore too rigid. The obstruction is not a failed search, a poor hyperbolic chart or an unlucky integral lift. It already occurs in the complete finite quadratic geometry.

## 6. What remains open

Three clean exits remain.

1. **Nonunit integral coefficients.** Integer \(\mu_\ell\) can sum to \(\pm1\) while reducing modulo three to a sign pattern other than six/five. This changes the finite quadratic space and may change its Witt index.
2. **Longer auxiliary lattice.** Length eleven was inherited from the Golay input, not forced by the Standard-Model seed or by the Jordan carrier.
3. **A different integral realization.** The finite ternary Golay \(P\)-code remains valid; only this particular unit-signed integral ancestry is excluded.

The nearest next branch is the nonunit case. If \(N=1\), the number \(n_+\) of coefficients congruent to \(+1\) modulo three obeys

\[
2n_+-11\equiv1\pmod3,
\]

so \(n_+\in\{0,3,6,9\}\). The \(n_+=6\) case is the no-go proved here. The all-negative residue pattern \(n_+=0\) has a split complement and contains the ordinary ternary Golay \(P\)-space; it is the most direct next target. The \(3/8\) and \(9/2\) patterns lead to nonsplit ten-dimensional complements of Witt index four and remain secondary finite targets.

## 7. Consequence for the grand synthesis

This result sharpens the role of the arithmetic branch. The Standard-Model code, Golay code and signed integral doubling architecture genuinely meet, but the most literal identification of signed coefficients with unit particle chiralities fails globally at \(p=3\). The successful large-prime lattice and the failed qutrit unit-sign lift now point in the same direction: the arithmetic carrier, if physical, must contain more information than a bare chirality sign.

That is compatible with the wider Jordan-triple programme. A relational carrier is expected to encode weights, pairings or boundary multiplicities rather than merely attach \(\pm1\) labels to isolated fields. It is not evidence that \(Spin(2,3)\) selects the missing data; it is a precise statement of what such a selection would now have to supply.

## 8. Stop-everything and falsification gates

### Stop-everything result achieved

The complete unit-signed qutrit search is closed: no hidden nontransverse ternary-Golay lift exists at length eleven.

### Next stop-everything tests

1. The all-negative Golay residue class admits an exact integral lift with six positive and five negative coefficients.
2. A \(3/8\) or \(9/2\) nonunit residue pattern admits a rank-four distance-five \(P\)-space if the direct Golay lift fails.
3. The resulting doubled code is equivalent to the Prakash–Ramya ternary construction.

### Falsification boundaries

- The no-go applies only to length eleven, nonzero unit residues and \(|N|=1\).
- It does not invalidate the ternary Golay code.
- It does not invalidate the explicit integral \([[37,1,5]]_p\) family for \(p\ge13\).
- It supplies no exceptional, Leech or \(Spin(2,3)\) interpretation by itself.

## 9. Certificate

The [global qutrit classification certificate](../../../verification/classify/classify_all_unit_signed_qutrit_p_lattices_length11.mjs) constructs the hyperbolic complement, traverses all \(183680\) maximal isotropic spaces, records every Schubert cell and computes the exact \(P\)-distance distribution.

## Companion documents

- [Explicit signed integral distance-five lattice and transverse chart](587_an_explicit_signed_integral_distance_five_p_lattice_exists_but_its_qutrit_shadow_leaves_the_transverse_u5_chart.md)
- [Initial Standard-Model code and Golay integrality gate](../0400-0499/410_standard_model_triorthogonal_code_bridge_and_golay_integrality_gate.md)
- [Integral cubic to compatible-prime architecture](../0400-0499/496_the_standard_model_code_supplies_an_integral_cubic_to_prime_shadow_architecture_but_not_yet_the_spin23_map.md)
- [Prakash–Ramya re-entry audit](579_prakash_ramya_reentry_the_code_rigidifies_the_puncture_but_not_the_response_arrow.md)
- [Grand synthesis](../0000-0099/40_grand_synthesis_spin23_pole.md)
