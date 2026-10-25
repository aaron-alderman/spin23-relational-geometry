# The congruence defect becomes a three-cycle seam operator

**Date:** 25 October 2026

**Status:** exact level-\(2\) action and free-Majorana multiplier constructed; fermionic Baby-Monster sewing remains open

**Evidence:** [machine-readable seam-action ledger](../../../evidence/data/moonshine-relation-defect-seam-permutation-v1.json)

**Certificate:** [characteristic-action verifier](../../../verification/verify/verify_moonshine_relation_defect_seam_permutation.mjs)

## Result

The explicit relation defect

\[
K=S^2R^{-11}
\]

was constructed because it is invisible modulo 23:

\[
K\equiv I\pmod{23}.
\]

It is not invisible to the level-\(2\) genus-two seam. For the symmetric lift
\(R=(\begin{smallmatrix}5&23\\23&106\end{smallmatrix})\),

\[
K\equiv R\equiv
\begin{pmatrix}1&1\\1&0\end{pmatrix}
\pmod2,
\]

an element of order three in \(SL(2,2)\). Embed this matrix on the first
symplectic pair and fix the second pair. Its action on the ten even genus-two
theta characteristics has cycle type

\[
\boxed{3^3\,1}.
\]

Nine characteristics form three 3-cycles and the odd--odd characteristic is
fixed. The permutation is even, so its determinant is \(+1\).

This locates the relation defect precisely:

~~~text
level 23 labels: K is invisible
level 2 even characteristics: K moves 9 of 10 sectors
determinant/sign line: K is invisible again
eta multiplier line: K has phase i
~~~

The seam operator therefore cannot generally be replaced by the scalar eta
phase \(i\). Before characteristic-dependent phases are included, its
minimum form is already monomial:

\[
\rho(K)=D_KP_K,
\]

where \(P_K\) has cycle type \(3^3\,1\). The free-Majorana part of \(D_K\)
is now computed from the certified \(T_1/S_1\) action. After eta
normalization, all three cycle products are \(1\), the fixed odd--odd sector
has eigenvalue \(-1\), and the determinant is \(-1\). The uncomputed factor
is the fermionic Baby-Monster action; the eta scalar does not erase the
permutation.

## 1. Exact characteristic action

Write a genus-two characteristic as

\[
m=(a_1,a_2\mid b_1,b_2)\in\mathbb F_2^4
\]

with even parity \(a_1b_1+a_2b_2=0\). In the standard
\((q_1,q_2,p_1,p_2)\) basis, the one-block lift of
\(\bar K=(\begin{smallmatrix}1&1\\1&0\end{smallmatrix})\) is

\[
M_K=
\begin{pmatrix}
1&0&1&0\\
0&1&0&0\\
1&0&0&0\\
0&0&0&1
\end{pmatrix}.
\]

Using the affine symplectic action on characteristics, the cycles are

\[
\begin{aligned}
&(00\mid00,\ 00\mid10,\ 10\mid00),\\
&(00\mid01,\ 00\mid11,\ 10\mid01),\\
&(01\mid00,\ 01\mid10,\ 11\mid00),\\
&(11\mid11).
\end{aligned}
\]

The fixed characteristic is odd on each handle but even in genus two. It is
also the characteristic whose theta constant vanishes on the separating
divisor because each genus-one odd theta constant vanishes at zero. The
fixed point therefore has a clear sewing interpretation rather than being an
unlabelled combinatorial residue.

## 2. What the determinant forgets

Three 3-cycles have permutation sign

\[
(-1)^{3(3-1)}=+1.
\]

Hence neither the ordinary permutation determinant nor the existing \(C_2\)
seam sign detects \(K\). This is the same admissibility pattern seen
elsewhere in the corpus:

- the full sector vector records a transformation;
- its determinant quotient records only orientation parity;
- an even permutation can therefore be dynamically nontrivial while leaving
  the scalar sign unchanged.

The eta line adds a phase \(i\), but that scalar and the characteristic
permutation are independent pieces of the lifted action.

## 3. Revised next calculation

The free matrix factor is complete. The remaining source-gated target is:

1. retain the computed eta-normalized free-Majorana monomial action;
2. compute the fermionic Baby-Monster order-23 sewn action on the same three 3-cycles and
   fixed odd--odd sector;
3. combine the two factors and test whether the full monomial operators agree, including separating
   degeneration.

A scalar phase match is necessary but no longer sufficient. Failure of the
permutation or diagonal phase comparison rules out the seam even if both
sides separately contain an \(i\).

## Boundary

The cycle calculation uses the declared one-block embedding and the standard
affine action on theta characteristics. It does not compute the full
genus-two theta multiplier, construct the Monster sewn defect, or identify
the modular operation with laboratory dynamics.

## Sources and corpus links

- [Dedekind eta relation phase](dedekind-eta-relation-phase.md)
- [Free-Majorana relation-defect multiplier](relation-defect-free-majorana-multiplier.md)
- [Integral relation rail](integral-relation-defect-metaplectic-no-go.md)
- [Mixed-level genus-two seam](mixed-level-46-genus-two-seam.md)
- [Oriented seam modular line](../lattice-subroutine-gravity/oriented-seam-modular-line.md)
- [Genus-two seam closure](../lattice-subroutine-gravity/genus-two-seam-closure.md)
