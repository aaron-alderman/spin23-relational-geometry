# Foundations Parallel 01: A Conventional Support Proof Classifies the Four Furey Generation TROs

**Date:** 17 October 2026  
**Status:** conventional finite proof of an existing programme claim; it replaces reliance on exhaustive enumeration but is not a new general TRO theorem

## Result

The certificate-backed classification in documents 110 and 111 has a short human proof. Among the twelve block choices carrying

\[
Q, u^c, d^c, L, e^c,
\]

exactly four are closed under \(xy^*z\). Requiring the cyclic charged Yukawa support leaves exactly two, exchanged by \(O_1\leftrightarrow R\).

This is the smallest conventional-proof gap in the strongest manuscript cluster: the proof uses only the support rectangles and can be included directly in a paper.

## 1. Rectangle lemma

Write a block arrow as \(a\leftarrow b\). For matrix units supported on three arrows,

\[
E_{ab}E_{cb}^{*}E_{cf}=E_{af}.
\]

Therefore a set of complete rectangular blocks is a TRO exactly when it satisfies the following rule:

> whenever it contains \(a\leftarrow b\), \(c\leftarrow b\), and \(c\leftarrow f\), it also contains \(a\leftarrow f\).

Necessity follows by choosing compatible matrix units. Sufficiency follows because every nonzero product of three matrix units has precisely this form; linearity then proves closure for the complete block spaces.

## 2. The twelve candidates

The two fixed arrows are

\[
Q:O_2\leftarrow H,
\qquad
u^c:C\leftarrow O_2.
\]

Choose

\[
d^c:D\leftarrow O_2,
\quad D\in\{O_1,R\},
\]

\[
L\in\{H\leftarrow O_1, C\leftarrow H, H\leftarrow R\},
\]

and

\[
e^c:E\leftarrow C,
\quad E\in\{O_1,R\}.
\]

This gives \(2\cdot3\cdot2=12\) possibilities.

## 3. Excluding the middle lepton origin

If \(L=C\leftarrow H\), then \(Q=O_2\leftarrow H\) and \(L\) share their source, while \(u^c=C\leftarrow O_2\) shares the target of \(L\). The rectangle lemma forces

\[
O_2\leftarrow O_2,
\]

which is absent. Hence none of the four candidates with \(L=C\leftarrow H\) is an exact five-block TRO.

## 4. Distinct neutral targets are necessary

Now let \(L=H\leftarrow S\), where \(S\in\{O_1,R\}\). If \(D=E\), the arrows

\[
u^c=C\leftarrow O_2,
\qquad d^c=D\leftarrow O_2,
\qquad e^c=D\leftarrow C
\]

force the missing loop

\[
C\leftarrow C.
\]

Thus closure requires \(D\ne E\).

## 5. The condition is sufficient

Suppose \(L=H\leftarrow S\) and \(D\ne E\). The only source shared by two selected arrows is \(O_2\), shared by \(u^c\) and \(d^c\). Their targets are \(C\) and \(D\). Because \(D\ne E\), the only selected arrow with target \(C\) is \(u^c\), and the only selected arrow with target \(D\) is \(d^c\). Every application of the rectangle rule therefore returns one of the arrows already present. The support is a TRO.

There are two choices for the ordered pair \((D,E)\), and independently two choices for \(S\). Hence exactly

\[
2\times2=4
\]

five-block TROs survive.

## 6. Cyclic Yukawa support

The charged-lepton cycle is

\[
C\xrightarrow{e^c}E\xrightarrow{L}H\xrightarrow{h_C^\dagger}C.
\]

It closes exactly when the source \(S\) of \(L\) equals the target \(E\) of \(e^c\). Thus one of the two values of \(S\) survives for each ordered pair \((D,E)\). Exactly two TROs remain, and the exchange \(O_1\leftrightarrow R\) maps one to the other.

## Paper impact

This converts a central certificate-only claim into a compact proposition with a proof that a referee can check line by line. It also makes the boundary explicit:

- **established here:** the fourfold TRO count and the twofold cyclic-Yukawa count;
- **not established here:** that cyclic internal traces are the physical Yukawa rule, that either neutral label is preferred, or that the block arrows carry the required Lorentz/statistics data;
- **not claimed as novel mathematics:** the rectangle lemma is a basic matrix-unit characterization of finite TRO support.

## Reproduction

The existing exhaustive checks remain useful as independent verification:

```powershell
node scripts\verify-furey-one-generation-subtro.mjs
node scripts\verify-furey-matter-higgs-yukawa-cycles.mjs
```

