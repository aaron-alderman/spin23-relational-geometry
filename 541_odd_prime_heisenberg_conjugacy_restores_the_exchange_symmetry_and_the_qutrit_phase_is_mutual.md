# Odd-prime Heisenberg conjugacy restores the exchange symmetry, and the qutrit phase is mutual

## Status

**Exact finite-Heisenberg and Clifford/Weil result for odd primes; physical identification of the qutrit carrier remains conditional.**

The two involutions separated by the binary theory become conjugate on the complete finite Heisenberg group at every odd prime. The determinant-two matrix

\[
H=\begin{pmatrix}1&1\\1&-1\end{pmatrix}
\]

is invertible over \(\mathbb F_p\) for odd \(p\), and its Clifford basis-change operator conjugates source puncture exchange to \(D_2\) root exchange. At \(p=3\), the same Heisenberg carrier supports the mutual phase

\[
\omega^{2ab},
\]

whose symplectic shadow is the off-diagonal \(K_+\) shear.

## 1. Odd-prime Heisenberg group

Let

\[
L_p=\mathbb F_p^2,
\qquad
V_p=L_p\oplus L_p^*.
\]

On \(\mathbb C[L_p]\), define

\[
X^x|v\rangle=|v+x\rangle,
\qquad
Z^z|v\rangle=\omega^{z\cdot v}|v\rangle,
\qquad
\omega=e^{2\pi i/p}.
\]

Writing

\[
P(k,x,z)=\omega^kX^xZ^z,
\]

gives

\[
P(k,x,z)P(\ell,y,w)
=P(k+\ell+z\cdot y,x+y,z+w).
\]

Hence

\[
\boxed{|H_p|=p^5},
\qquad
Z(H_p)\cong\mu_p.
\]

This is the odd-prime counterpart of the order-64 binary Heisenberg group, with the characteristic-two fourth-root refinement replaced by the ordinary \(p\)-th-root central extension.

## 2. Full Heisenberg conjugacy

Let

\[
A=\begin{pmatrix}1&0\\0&-1\end{pmatrix},
\qquad
R=\begin{pmatrix}0&1\\1&0\end{pmatrix}.
\]

For any \(B\in GL(2,p)\), the basis-change Clifford operator

\[
U_B|v\rangle=|Bv\rangle
\]

acts on Pauli labels by

\[
(x,z)\longmapsto(Bx,B^{-T}z).
\]

Because

\[
H^{-1}AH=R
\]

whenever \(2\) is invertible,

\[
\boxed{
U_H^{-1}U_AU_H=U_R
}
\]

as automorphisms of the complete finite Heisenberg group. This is stronger than conjugacy of the two \(X\)-label matrices: their actions on the dual characters and central extension agree as well.

The executable certificate verifies this exhaustively for \(p=3,5,7\); the symbolic identity proves it for every odd prime.

## 3. Why the binary obstruction is exact

At \(p=2\),

\[
\det H=-2=0,
\]

so \(H\) is not a basis change. Correspondingly,

\[
A\equiv I\pmod2,
\qquad
R\not\equiv I\pmod2.
\]

There is no binary Clifford operator \(U_H\) on the same two-dimensional logical label space. The odd-prime conjugacy therefore does not repair or soften the earlier binary no-go; it identifies its exact cause.

\[
\boxed{
\text{odd-prime equivalence}
\quad+\quad
\text{binary inequivalence}
\quad=\quad
\text{a genuinely two-primary lift defect}.}
\]

## 4. The qutrit mutual phase

Reduce the integral matrix

\[
K_+=\begin{pmatrix}3&2\\2&3\end{pmatrix}
\]

modulo three:

\[
\overline K_+
=\begin{pmatrix}0&2\\2&0\end{pmatrix}.
\]

For \(x=(a,b)\), the diagonal Weil operator is

\[
D_{K_+}|x\rangle
=\omega^{\frac12x^T\overline K_+x}|x\rangle.
\]

Since \(1/2=2\) in \(\mathbb F_3\),

\[
\frac12x^T\overline K_+x=2ab.
\]

Therefore

\[
\boxed{
D_{K_+}|a,b\rangle=\omega^{2ab}|a,b\rangle.}
\]

Unlike the binary phase \((-i)^{a+b}\), this is genuinely relational: it cannot be factorized into one-qutrit diagonal phases.

## 5. Clifford shadow of the qutrit phase

Conjugation gives

\[
D_{K_+}P(k,x,z)D_{K_+}^{-1}
=P\left(
k+\frac12x^T\overline K_+x,\,
x,\,
z+\overline K_+x
\right).
\]

Thus its symplectic shadow is

\[
\boxed{
(x,z)\longmapsto(x,z+\overline K_+x).}
\]

Because

\[
R^T\overline K_+R=\overline K_+,
\]

the mutual qutrit phase commutes with root exchange:

\[
[D_{K_+},U_R]=0.
\]

The qutrit carrier therefore contains both the exchange symmetry and the relational phase on the same exact Heisenberg representation.

## 6. Cross-prime interpretation

One integral quadratic form now has two genuinely different finite shadows:

\[
Q(a,b)=3a^2+4ab+3b^2.
\]

- At \(p=2\), its off-diagonal term vanishes modulo four and it yields the factorized phase
  \[
  (-i)^{a+b}.
  \]
- At \(p=3\), its diagonal terms vanish and it yields the mutual phase
  \[
  \omega^{2ab}.
  \]

The same arithmetic word therefore alternates which information is visible:

\[
\boxed{
\begin{array}{c|c|c}
 & \text{exchange lift} & \text{quadratic phase}\\
\hline
p=2 & A\not\sim R & \text{local/factorized}\\
p=3 & A\sim R & \text{mutual/relational}
\end{array}}
\]

This is not inconsistency. It is a prime-sensitive division of information encoded by the integral carrier.

## 7. What is established and what remains open

### Established

- the full odd-prime Heisenberg group has order \(p^5\);
- \(A\) and \(R\) are Clifford-conjugate on it for every odd prime;
- the obstruction at two is exactly the singularity of \(H\);
- the \(p=3\) \(K_+\) lift is the mutual phase \(\omega^{2ab}\);
- that phase commutes with root SWAP.

### Open

- whether the Prakash–Ramya qutrit code realizes this full two-logical-qutrit Heisenberg representation canonically;
- whether its monomial group supplies \(U_H\) or \(U_R\);
- how the qutrit Weil carrier maps into the integral primitive-wedge \(Spin(2,3)\) lattice;
- whether the prime-sensitive split has a physical anomaly or family interpretation;
- whether Furey's field algebra selects the integral \(K_+\), rather than only one of its reductions.

## 8. Stop-everything and falsification gates

### Stop-everything

1. The qutrit Standard-Model code realizes \(U_H\), \(U_R\), and \(D_{K_+}\) on the same canonical logical basis.
2. The integral \(D_2\oplus D_2^*\) Weil representation glues the binary local phase and qutrit mutual phase into one arithmetic line.
3. A Furey/Jordan operation produces the integral polynomial \(Q\) before reduction.

### Boundaries

- odd-prime conjugacy does not imply binary conjugacy;
- the basis-change Clifford \(U_H\) is not defined at \(p=2\);
- a finite qutrit phase match is not yet a physical Pfaffian or anomaly-line identification;
- commutation with root exchange does not prove that root exchange belongs to the source code automorphism group.

## Certificate and companions

- [Odd-prime Heisenberg and qutrit Weil certificate](scripts/construct_odd_prime_heisenberg_hadamard_conjugacy_and_qutrit_weil_phase.mjs)
- [Two-primary conjugacy obstruction](532_coordinate_exchange_and_d2_root_exchange_are_conjugate_away_from_two_but_not_integrally.md)
- [Binary distinction of the two lifts](540_puncture_exchange_and_root_exchange_are_distinct_clifford_wedge_lifts.md)
- [Integral cross-prime phase word](505_the_integral_kplus_word_matches_the_full_binary_and_qutrit_projective_phases_but_not_a_canonical_global_phase.md)
