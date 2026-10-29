# The Periodic Product Exactly Reconstructs the Coprime Torus-Knot Type, but Not Its Module Category

**Date:** 29 October 2026

**Status:** exact corpus theorem with executable finite audit; categorical non-reconstruction proved

**Parent:** [the admitted torus-knot Rogers--Ramanujan theorem](1796_the_torus_knot_rogers_ramanujan_theorem_is_a_typed_three_face_arithmetic_programme_not_yet_a_physics_bridge.md)

**Evidence:** [exhaustion ledger](../../../evidence/data/torus-knot-rogers-ramanujan-exhaustion-v1.json)

**Certificate:** [reconstruction and boundary verifier](../../../verification/verify/verify_torus_knot_rogers_ramanujan_exhaustion.mjs)

## Result

For coprime integers (1<a<b), write (d=a+b) and

\[
 P_{a,b}(q)=\prod_{m\geq1}(1-q^m)^{-\rho_{a,b}(m)},
 \qquad
 \rho_{a,b}(m)=\min\{a,b,\operatorname{dist}(am,d\mathbb Z)\}-1
 +\mathbf1_{d\mid m}.
\]

The infinite product determines the ordered pair (a<b) exactly. Consequently
it also determines the numerical semigroup (langle a,b\rangle), its gap set,
Frobenius number, genus and gap poset. This closes the reconstruction gate posed
in Claim 1796 more strongly than the initial admission anticipated.

It does **not** reconstruct the category of finite
(mathbb F_q[[T^a,T^b]])-modules, its individual isomorphism classes, extension
data, Quot schemes, affine cells or the two-variable motivic series. The
groupoid-volume map and the specializations (t=1), (n\to\infty) remain
genuinely lossy.

## 1. Recovering the Euler exponents from the scalar series

Let

\[
 P(q)=1+\sum_{n\geq1}c_nq^n,
 \qquad
 q\frac{P'(q)}{P(q)}=\sum_{n\geq1}B_nq^n.
\]

Formal differentiation of the Euler product gives

\[
 B_n=\sum_{r\mid n}r\rho(r).
\]

The coefficients (B_n) are recursively determined by the (c_n), since

\[
 nc_n=\sum_{k=1}^{n}B_kc_{n-k}.
\]

Möbius inversion then gives

\[
 n\rho(n)=\sum_{r\mid n}\mu(r)B_{n/r}.
\]

Thus the scalar formal power series uniquely determines its exponent sequence;
there is no hidden choice of periodic Euler factorization.

## 2. The exact period is (d=a+b)

Because (gcd(a,d)=1), multiplication by (a) permutes the residues modulo
(d). In one (d)-block the zeros of (ho) occur exactly at

\[
 m\equiv0,\ \pm a^{-1}\pmod d.
\]

There are exactly three. If a smaller period (p) existed, its repetition
number (d/p) would divide three. The only nontrivial possibility is
(p=d/3). But when (3\mid d), coprimality gives (a\equiv\pm1\pmod3), and

\[
 \rho(d/3)=\min\{a,b,d/3\}-1\geq1,
\]

whereas (ho(d)=0). Therefore (d/3) is not a period and the least period is
exactly (d).

## 3. Recovering (a) and (b)

Since (a<b), the first exponent is

\[
 \rho(1)=\min\{a,b,\operatorname{dist}(a,d\mathbb Z)\}-1=a-1.
\]

It is also the maximum exponent. Hence

\[
 \boxed{d=\operatorname{per}(\rho),\qquad
 a=1+\max_m\rho(m)=1+\rho(1),\qquad b=d-a.}
\]

The product is symmetric under exchanging (a) and (b), as is the plane
curve after exchanging (X) and (Y); the convention (a<b) selects the
ordered representative. The reconstructed object is therefore naturally the
unordered coprime pair, or equivalently the positive torus-knot type.

## 4. What “orientation loss” actually means here

The admitted input family contains positive plane-curve singularities
(X^a=Y^b). It does not contain the mirror obtained by reversing one winding.
The scalar product therefore cannot be accused of failing to distinguish two
objects when only one is in its source domain. A mirror-sensitive extension
would require a knot-polynomial, homological or categorified input with a
declared chirality operation.

The richer Huang--Jiang--Oblomkov programme proposes precisely such extensions:
finite-rank (N_{a,b;n}(q,t)), bottom rows of colored HOMFLY homology and a
perverse third grading. Those identifications remain conjectural in the cited
source. The proved (t=1), infinite-rank identity may not inherit them by
association.

## 5. Why the category still cannot be reconstructed

Groupoid volume retains only

\[
 \operatorname{vol}(\mathcal G)=
 \sum_{[x]\in\pi_0\mathcal G}\frac1{|\operatorname{Aut}(x)|}.
\]

It is not injective. A groupoid with one object and automorphism group (C_2)
has volume (1/2). A non-equivalent groupoid with two objects, each with
automorphism group (C_4), also has volume (1/2). The same obstruction
survives before any special geometry is considered.

For the HJO carrier there are additional explicit losses:

1. groupoid volume sums over isomorphism classes and forgets morphism and
   extension structure beyond automorphism orders;
2. setting the Coh variable (t=1) sums over module dimensions;
3. taking infinite rank forgets the finite-rank filtration;
4. the product retains the pair ((a,b)) but not a canonical inverse functor
   to modules, Quot points or affine cells.

The correct reconstruction verdict is therefore mixed and sharp:

\[
 \boxed{
 P_{a,b}\Rightarrow\{a,b\}\Rightarrow
 (\Gamma,G,\text{gap poset}),
 \qquad
 P_{a,b}\not\Rightarrow\mathbf{FinMod}_{R}.
 }
\]

## Sources

- Y. Huang, K. Lau and K. Ono, [*Rogers--Ramanujan identities from the geometry of (X^a=Y^b)*](https://arxiv.org/abs/2609.20567).
- Y. Huang, R. Jiang and A. Oblomkov, [*Quot scheme of points on torus knot singularities*](https://arxiv.org/abs/2608.16086).

