# The order-23 centralizer closes the scalar genus-one search

**Date:** 25 October 2026

**Status:** centralizer and scalar insertion census closed; vector-valued and
higher-genus orientation channels remain open

**Evidence:** [centralizer ledger](../../../evidence/data/moonshine-order23-centralizer-exhaustion-v1.json)  
**Certificate:** [finite-group verifier](../../../verification/verify/verify_moonshine_order23_centralizer_exhaustion.mjs)

## Result

The phrase “add a commuting insertion” is now finite and exact for an
order-23 Monster element \(g\). ATLAS gives

\[
|C_{\mathbb M}(g)|=552=23\cdot24.
\]

Because \(\langle g\rangle\) is central in its centralizer and its order is
coprime to 24, Schur--Zassenhaus supplies a complement. The class census below
identifies that complement as \(S_4\):

\[
C_{\mathbb M}(g)\cong C_{23}\times S_4.
\]

This does not create an unbounded family of new scalar traces. Modulo the
already exhausted powers of (g), there are exactly five conjugacy classes of
commuting insertion:

| \(S_4\) insertion type | class size | centralizer in \(S_4\) | product order | Monster product pair |
|---|---:|---:|---:|---|
| identity | 1 | 24 | 23 | (23A/23B) |
| double transposition | 3 | 8 | 46 | (46A/46B) |
| transposition | 6 | 4 | 46 | (46C/46D) |
| 3-cycle | 8 | 3 | 69 | (69A/69B) |
| 4-cycle | 6 | 4 | 92 | (92A/92B) |

The Monster centralizer orders of these product classes are exactly
\(23\times24,23\times8,23\times4,23\times3,23\times4\), respectively. The
sizes \(1+3+6+8+6=24\) exhaust the complement.

## Why every scalar insertion is still cyclic

For an insertion \(k\in S_4\), its order is \(1,2,3\), or \(4\), hence is
coprime to 23. Therefore

\[
\langle g,k\rangle=C_{23}\times\langle k\rangle
\cong C_{23|k|}
\]

is cyclic. Every scalar generalized-moonshine trace (Z(g,k;\tau)) is thus a
modular branch of the ordinary McKay--Thompson series of the single product
\(gk\); it is not new noncyclic input. The known pair equalities are

\[
T_{23A}=T_{23B},\quad
T_{46A}=T_{46B},\quad
T_{46C}=T_{46D},\quad
T_{69A}=T_{69B},\quad
T_{92A}=T_{92B}.
\]

Consequently every normalized scalar genus-one trace obtained by inserting an
element of the full centralizer remains blind to the fifth-power A/B
orientation. The order-46 augmentation quotients are real, but their
individual trace representatives land in the same five cyclic product
families; they do not reopen a scalar channel.

## The corrected meaning of fifth power

Fifth power exchanges the A/B pairs. It is not Monster conjugation. If an
element \(n\in\mathbb M\) satisfied \(ngn^{-1}=g^5\), then \(g\) and \(g^5\)
would be in the same Monster class, contrary to ATLAS. The Sylow normalizer
realizes the order-eleven quadratic-residue subgroup of
\(\operatorname{Aut}(C_{23})\); the nonresidue fifth-power map is the
cyclotomic Galois exchange between the two Monster classes.

This distinction is operational. Simultaneous-conjugacy invariance cannot be
used as the orientation test. The test must compare compatible rational or
cyclotomic forms of the two projective centralizer representations.

## What remains open

Scalar genus-one centralizer insertion is exhausted. The subsequent
[projective-centralizer no-go](order-23-projective-centralizer-no-go.md)
also proves that the anomaly transgression is trivial, so the action is
linearisable and its five class traces determine the full graded \(S_4\)
module. Scalar word traces add nothing because each word reduces to one
product class.

A surviving orientation record must therefore use order-23-twined genus-two
sewing, cross-grade VOA composition such as fusion/intertwining operators, or
an externally declared oriented VOA/lattice lift followed by a detector that
does not quotient it away.

This is a useful negative result. It prevents more scalar coefficient work
from being mistaken for progress and moves the look-here guide to a specific
representation-valued or higher-genus datum.

## Sources and corpus links

- [ATLAS Monster classes and centralizer orders](https://brauer.maths.qmul.ac.uk/Atlas/v3/spor/M/)
- Breuer, Magaard and Wilson, [*Verification of the conjugacy classes and ordinary character table of the Monster*](https://arxiv.org/abs/2412.12182)
- Carnahan, [*Generalized Moonshine IV: Monstrous Lie algebras*](https://arxiv.org/abs/1208.6254)
- Ford, McKay and Norton, [*More on replicable functions*](https://doi.org/10.1080/00927879408825127)
- [Order-46 observable ladder](order-46-observable-ladder.md)
- [Order-46 centralizer augmentation](order-46-centralizer-augmentation.md)
- [Order-23 projective-centralizer no-go](order-23-projective-centralizer-no-go.md)

