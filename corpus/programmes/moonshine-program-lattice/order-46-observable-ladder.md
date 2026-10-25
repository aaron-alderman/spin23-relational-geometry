# The order-46 observable ladder

**Date:** 25 October 2026

**Status:** genus-one rail separation, modular transport and cyclic anomaly status closed; compatible normalization and genus-two sewing open

**Evidence:** [observable-ladder ledger](../../../evidence/data/moonshine-order46-observable-ladder-v1.json)  
**Certificate:** [arithmetic and cross-ledger verifier](../../../verification/verify/verify_moonshine_order46_observable_ladder.mjs)

## Result

The order-46 junction does more than prove that the 2A, 2B and 23 branches
meet.  It supplies a two-stage observable ladder.

At order 23, the scalar McKay--Thompson series collapses both the generator
orientation and the involution rail:

\[
T_{23A}=T_{23B}.
\]

At order 46, ordinary Moonshine recovers the involution rail while still
forgetting orientation within each rail.  The published genus-zero groups are

\[
46AB:\quad 46+23,
\qquad
46CD:\quad 46+.
\]

Here \(46+23\) denotes \(\Gamma_0(46)\) extended by the \(W_{23}\)
Atkin--Lehner involution, while \(46+\) is the full Atkin--Lehner extension.
Consequently

\[
T_{46A}=T_{46B},
\qquad
T_{46C}=T_{46D},
\qquad
T_{46AB}\ne T_{46CD}.
\]

The ordinary order-46 trace therefore distinguishes the 2B/Leech rail from
the 2A/Baby-Monster rail, but it does not orient either rail.

## 1. The root is encoded by the commuting pair

Let

\[
g=h^2,\qquad z=h^{23}
\]

for an order-46 element \(h\).  The Chinese-remainder reconstruction is
explicit:

\[
\boxed{h=g^{12}z}
\]

because \(g^{12}z=h^{24}h^{23}=h^{47}=h\).  Thus the order-46 element is not
an auxiliary label added to the \(23\times2\) data.  It is the unique combined
insertion selected by that commuting cyclic pair.

This explains why \(T_h\) can recover the involution rail even though \(T_g\)
cannot.  The order-23 square \(g\) forgets the parity component \(z\); the
combined insertion \(g^{12}z\) restores it.

## 2. The desired twisted trace is a modular transport

Generalized moonshine assigns a function \(Z(g_0,h_0;\tau)\) to commuting
pairs, with an \(SL_2(\mathbb Z)\) action of the form

\[
Z(g_0,h_0;\gamma\tau)
\doteq
Z(g_0^a h_0^c,g_0^b h_0^d;\tau),
\qquad
\gamma=\begin{pmatrix}a&b\\c&d\end{pmatrix},
\]

where \(\doteq\) allows the projective multiplier fixed by the anomaly and
normalization convention.  Take

\[
\gamma_{2,23}
=\begin{pmatrix}1&11\\2&23\end{pmatrix},
\qquad
\det\gamma_{2,23}=23-22=1.
\]

Starting from the ordinary twining pair \((1,h)\), it gives

\[
(1,h)\gamma_{2,23}=(h^2,h^{23})=(g,z).
\]

Therefore

\[
\boxed{
Z(g,z;\tau)
\doteq
T_h\!\left(\frac{\tau+11}{2\tau+23}\right)
}
\]

up to the precise direction of the convention and its projective multiplier.
The missing order-46 twisted--twining function is not 529 independent input
series and not an arbitrary new function.  Once a convention is fixed, it is
a modular branch of a known order-46 Hauptmodul.

## 3. The anomaly bound closes, leaving normalization

The order-23 restriction of the Monster anomaly is forced to vanish because
its order divides both 24 and 23.  The same argument does not trivialize the
order-46 restriction:

\[
\gcd(24,46)=2.
\]

At this coarse stage only a possible two-torsion obstruction remains.  The
published Moonshine notation closes it.  An anomalous cyclic class is written
\(n|h+\cdots\) with \(h>1\), whereas the two order-46 functions are written
\(46+23\) and \(46+\).  Both therefore have \(h=1\): they are normal,
non-anomalous cyclic orbifolds.  The restriction of the Monster anomaly to
each order-46 cyclic subgroup is cohomologically trivial.

This does not manufacture an absolute phase.  A trivialization and the
normalization of each generalized-moonshine function must still be chosen
consistently, and inverse conjugacy classes may still be identified.  But any
remaining scalar is a convention/coboundary datum rather than a nontrivial
\(\mathbb Z_2\) obstruction.  In particular, the arithmetic possibility
\(\gcd(24,46)=2\) is not realized by these two cyclic class pairs and cannot
be identified with the genus-two Pfaffian sign.

The immediate source-level calculation is therefore:

1. fix compatible anomaly trivializations and generalized-moonshine
   normalizations for 46A--46D;
2. transport \(T_{46AB}\) and \(T_{46CD}\) by
   \(\gamma_{2,23}\) (or its inverse under the chosen convention);
3. normalize the transported functions by a common principal-part convention
   and verify the power-five pairing described below;
4. compare the surviving sign/character with the 2A fermionic determinant line
   and the 2B order-eight lift kernel;
5. only then sew at genus two.

## 4. Symmetry and compression count

The index of \(\Gamma_0(46)\) in \(PSL_2(\mathbb Z)\) is

\[
46\left(1+\frac12\right)\left(1+\frac1{23}\right)=72.
\]

The full Atkin--Lehner group at squarefree level 46 has four elements, while
the \(+23\) extension has two.  Thus the corresponding indices are 18 and 36.
The 46CD function is invariant under the larger group and is consequently the
more compressed scalar record.  This is a group-theoretic measure of retained
information; it is not a count of physical states.

The observable hierarchy is now

```text
order-23 scalar T_23
  1 output: loses involution rail and generator orientation
        |
        | retain the order-2 component through h=g^12 z
        v
order-46 scalar T_h
  2 outputs: 46AB (2B rail) versus 46CD (2A rail)
        |
        | modularly transport within the same cyclic subgroup
        v
generalized pair Z(h^2,h^23)
  2 normalized scalar outputs: the inverse/power-five pairs remain collapsed
        |
        | scalar centralizer insertions are exhausted;
        | the linear/projective S4 action is also exhausted;
        | change compositional level to VOA products or genus-two sewing
        v
candidate seam-sensitive vector
```

The pairing follows directly.  Fifth power exchanges \(46A\leftrightarrow
46B\) and \(46C\leftrightarrow46D\).  Under \(h\mapsto h^5\),

\[
g=h^2\mapsto g^5,\qquad
z=h^{23}\mapsto z^5=z.
\]

The ordinary functions satisfy \(T_h=T_{h^5}\) within each pair.  Applying
the same matrix \(\gamma_{2,23}\) to the same normalized Hauptmodul therefore
gives the same normalized cyclic commuting-pair function for \((g,z)\) and
\((g^5,z)\).  A convention-dependent scalar cannot serve as an orientation
observable.  Thus cyclic generalized moonshine recovers the 2A/2B rail but
does not recover the 23A/23B generator orientation. The subsequent complete
\(C_{23}\times S_4\) census shows that every individual centralizer insertion
also generates a cyclic subgroup and is equally scalar-degenerate. The next
refinement must therefore change compositional level. The anomaly
transgression to the centralizer is trivial, so even the full ordinary
\(S_4\) character is determined by those five traces. Only cross-grade VOA
operations or higher-genus sewing remain.

## 5. Consequence for the frontier programme

The first frontier tranche can now be made smaller.  There is no need to
search for a free-standing order-46 generalized trace table before doing any
work.  Start from the two known Hauptmoduln, transport them by the explicit
matrix and audit the compatible normalization.  This is an FPT-002 inverse-detector problem:
the order-46 insertion is the minimal extra channel already known to separate
the two involution rails.  It is also an FPT-019 complexity reduction: the
unknown input is cross-grade VOA composition or a higher-genus refinement,
not a 529-function oracle or another centralizer representation table.

The physical boundary is unchanged.  Modular transport is worldsheet/VOA
transport, not real-time evolution, and its normalization phase is not
automatically a laboratory parity signal.

## Sources and corpus links

- Duncan, Griffin and Ono, [*Moonshine*](https://arxiv.org/abs/1411.6571), table of Monster classes and genus-zero groups
- Carnahan, [*Generalized Moonshine IV: Monstrous Lie algebras*](https://arxiv.org/abs/1208.6254)
- Tuite, [*Generalised Moonshine and Abelian Orbifold Constructions*](https://arxiv.org/abs/hep-th/9412036), for the \(n|h\) anomaly convention
- [ATLAS Monster conjugacy classes](https://brauer.maths.qmul.ac.uk/Atlas/v3/spor/M)
- [Joined order-46 bridge](joined-bridge-map.md)
- [Frontier target crosswalk](frontier-target-crosswalk.md)
