# The order-23 projective-centralizer no-go

**Date:** 25 October 2026

**Status:** genus-one centralizer representation route exhausted; higher-genus and cross-grade structure open

**Evidence:** [projective-centralizer ledger](../../../evidence/data/moonshine-order23-projective-centralizer-no-go-v1.json)  
**Certificate:** [cohomology and character-degree verifier](../../../verification/verify/verify_moonshine_order23_projective_centralizer_no_go.mjs)

## Result

The complete scalar census leaves an apparent escape: perhaps the
\(g\)-twisted module carries a genuinely projective \(S_4\) representation
whose central extension retains the \(23A/23B\) orientation even though every
individual trace agrees. The anomaly arithmetic rules out that escape.

For \(g\) of order 23,

\[
C_{\mathbb M}(g)\cong C_{23}\times S_4.
\]

Abstractly,

\[
H^2(C_{23}\times S_4,U(1))
\cong H^2(S_4,U(1))
\cong C_2,
\]

because a cyclic group has trivial Schur multiplier and the cross term
\(C_{23}\otimes C_2\) vanishes. The nontrivial class would lift \(S_4\) to a
Schur double cover \(2.S_4\), with spin irreducible dimensions \(2,2,4\).

But generalized moonshine does not choose an arbitrary element of this
\(C_2\). The projective class in the \(g\)-twisted sector is the
transgression, or slant product, of the Monster anomaly
\([\omega]\in H^3(\mathbb M,U(1))\), whose order is 24.

On \(C_{23}\times S_4\), positive-degree cohomology from the first factor is
23-primary and that from the second is supported only at primes 2 and 3.
All mixed tensor and Tor terms therefore vanish. The restricted anomaly
splits into factor classes. Its \(C_{23}\) component is zero because its order
must divide both 24 and 23. Its remaining \(S_4\) component is inflated from
the second factor, and slanting it with \(g\) in the first factor is trivial.
Consequently

\[
[c_g]=0\in H^2(C_{\mathbb M}(g),U(1)).
\]

The \(g\)-twisted centralizer action is linearisable.

## 1. Ordinary character determinacy finishes the argument

The ordinary irreducible dimensions of \(S_4\) are

\[
1,\ 1,\ 2,\ 3,\ 3,
\qquad
1^2+1^2+2^2+3^2+3^2=24.
\]

There are five irreducibles and five conjugacy classes. At every conformal
grade, the five scalar traces on the identity, double-transposition,
transposition, 3-cycle and 4-cycle classes therefore determine the complete
complex \(S_4\)-module multiplicity vector by character-table inversion.

The centralizer census has already shown that the corresponding A/B trace
series agree in all five product families:

\[
23AB,\quad46AB,\quad46CD,\quad69AB,\quad92AB.
\]

After one compatible linearization, the 23A and 23B twisted graded
\(S_4\)-characters are identical. Their graded centralizer representations
are isomorphic as complex \(S_4\)-modules. A change of basis cannot be an
orientation observable.

## 2. Why multi-insertion traces do not reopen genus one

For an ordinary representation \(\rho\), a trace of a word

\[
\operatorname{Tr}\rho(k_1k_2\cdots k_n)
\]

is the character evaluated on the single product element. Since every word
in \(S_4\) is already in one of the five conjugacy classes, arbitrary scalar
word traces add no information beyond the character table.

Matrix elements in a chosen basis can distinguish presentations, but the
basis is gauge unless it is fixed by an external VOA operator, defect
junction or sewing map. Thus “retain noncommuting relations” is not by itself
a new invariant. The source must supply extra compositional structure across
states or grades.

## 3. What remains genuinely open

The following routes survive:

1. **genus-two sewing:** two handles can retain a bilinear/junction datum not
   reducible to one group word or one character value;
2. **cross-grade VOA structure:** intertwining operators, fusion and vertex
   products can distinguish graded algebras whose graded group modules agree;
3. **externally marked orientation:** an independently sourced lattice or
   defect marking may choose one Galois rail before scalar quotienting.

The ordinary \(S_4\) multiplicity calculation need not be performed as an
orientation test: its answer is already fixed by the five scalar series.
The binary-octahedral degrees \(2,2,4\) remain mathematically real, but that
projective sector is not activated by the order-23 Monster anomaly
transgression.

## 4. Consequence for the mixed-level seam

The level-\(2\)/\(23\) CRT carrier remains the correct genus-two ambient
space, but its level-23 boundary input cannot be “a missing projective
\(S_4\) character.” It must be a sewn defect or cross-grade operation. The
quarter-turn metaplectic \(C_4\) gate is likewise a property to test on the
genus-two sewing multiplier, not a dormant genus-one centralizer cocycle.

The next decisive object is therefore a kernel
\(\mathcal K_{\delta,\lambda}(\Omega)\) whose separating degeneration
includes composition data, not merely the already exhausted graded
characters.

## Sources and corpus links

- Johnson-Freyd, [*The Moonshine Anomaly*](https://arxiv.org/abs/1707.08388)
- Gaberdiel, Persson and Volpato, [*Generalised Moonshine and Holomorphic Orbifolds*](https://arxiv.org/abs/1302.5425)
- Carnahan, [*Generalized Moonshine IV: Monstrous Lie algebras*](https://arxiv.org/abs/1208.6254)
- [Order-23 centralizer exhaustion](order-23-centralizer-exhaustion.md)
- [Mixed-level 46 genus-two seam](mixed-level-46-genus-two-seam.md)
- [Quarter-turn metaplectic coupling gate](quarter-turn-metaplectic-gate.md)
