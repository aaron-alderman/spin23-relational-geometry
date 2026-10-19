# Foundations Parallel 03: Gauge Dressing Turns the Three Extra Furey Links into \(S_1/S_3\) Leptoquark Channels

**Date:** 17 October 2026  
**Status:** exact one-generation representation calculation on the minimal doubled-arrow geometry; optional scalar interpretation, not a prediction  
**Certificate:** [gauge_dress_the_seven_doubled_furey_arrow_links.mjs](scripts/gauge_dress_the_seven_doubled_furey_arrow_links.mjs)

## Result

Gauge dressing cleanly separates the seven first-order-compatible links.

- The four desired links all possess a color-singlet Higgs-doublet branch.
- The three extra links possess no color-singlet scalar branch.
- Instead, they assemble into the standard scalar-leptoquark representations

\[
S_1=(\bar{\mathbf3},\mathbf1)_{1/3},
\qquad
S_3=(\bar{\mathbf3},\mathbf3)_{1/3}.
\]

Consequently the extra links are not forced new particles. Restoring color-linearity to the deliberately commutative endpoint toy model removes all three while retaining all four ordinary Yukawa links. If colored finite fluctuations are allowed instead, the incidence graph identifies a coherent, familiar leptoquark alternative.

## 1. Frozen charge conventions

All fields are left-handed Weyl fields:

\[
\begin{array}{c|c|c|c}
&SU(3)_c&SU(2)_L&Y\\ \hline
Q&\mathbf3&\mathbf2&1/6\\
u^c&\bar{\mathbf3}&\mathbf1&-2/3\\
d^c&\bar{\mathbf3}&\mathbf1&1/3\\
L&\mathbf1&\mathbf2&-1/2\\
e^c&\mathbf1&\mathbf1&1\\
\nu^c&\mathbf1&\mathbf1&0.
\end{array}
\]

Their integer-normalized anomaly-free charges are

\[
3(B-L)=(1,-1,-1,-3,3,3).
\]

For a left-Weyl bilinear \(\psi_p\psi_q\), a scalar must transform in the conjugate of an irreducible component of \(R_p\otimes R_q\) and carry hypercharge \(-Y_p-Y_q\).

## 2. Exact scalar representations

\[
\begin{array}{c|c|c|c}
\text{link}&\text{required scalar representation(s)}&B&L\\ \hline
Q-u^c&(\mathbf1\oplus\mathbf8,\mathbf2)_{+1/2}&0&0\\
Q-d^c&(\mathbf1\oplus\mathbf8,\mathbf2)_{-1/2}&0&0\\
L-e^c&(\mathbf1,\mathbf2)_{-1/2}&0&0\\
L-\nu^c&(\mathbf1,\mathbf2)_{+1/2}&0&0\\ \hline
Q-L&(\bar{\mathbf3},\mathbf1\oplus\mathbf3)_{+1/3}&-1/3&-1\\
u^c-e^c&(\mathbf3,\mathbf1)_{-1/3}&+1/3&+1\\
d^c-\nu^c&(\mathbf3,\mathbf1)_{-1/3}&+1/3&+1.
\end{array}
\]

The singlet-color branches in the first four rows are the ordinary Higgs doublet and its conjugate. The quark links also algebraically admit color-octet Higgs doublets; color-linearity of the finite Dirac operator selects the singlet contraction.

The last three rows have a economical common interpretation:

- the weak-singlet part of \(Q-L\) uses \(S_1\);
- \(u^c-e^c\) and \(d^c-\nu^c\) use \(S_1^\dagger\);
- the weak-triplet part of \(Q-L\) is an optional \(S_3\) channel.

Thus three extra coefficients need not mean three extra scalar multiplets. One complex \(S_1\) can support all three singlet channels; \(S_3\) is an additional independent possibility.

## 3. Baryon and lepton number

The displayed assignment

\[
B(S_{1,3})=-\frac13,
\qquad
L(S_{1,3})=-1
\]

makes each classified leptoquark coupling conserve baryon number and lepton number separately. Their conjugates carry the opposite charges.

Generic scalars with these gauge quantum numbers can also possess diquark couplings, which would make simultaneous baryon conservation impossible and can mediate proton decay. The doubled Furey endpoint rule supplies a useful partial protection:

\[
Q-Q\quad\text{and}\quad u^c-d^c
\]

both fail its first-order composability test, even though their gauge products contain the corresponding \(S_1^\dagger\) and \(S_1\) channels. Hence the classified finite Dirac sector admits the leptoquark links but not the two basic diquark links.

This is not yet a complete proton-stability theorem. A larger finite algebra, scalar potential, higher-dimensional operators and radiative corrections could restore baryon-violating operators and require separate checks.

## 4. Smallest refinement that removes the extras

The commutative endpoint calculation deliberately remembered only five endpoint characters. Restore the noncommutative color action and require the finite Dirac operator to be color-linear. Equivalently, retain only scalar intertwiners with a color-singlet contraction.

Then

\[
\boxed{
\{Q-u^c,Q-d^c,L-e^c,L-\nu^c\}
}
\]

survive, while

\[
\boxed{
\{Q-L,u^c-e^c,d^c-\nu^c\}
}
\]

are removed. This uses structure already present in the Standard Model gauge algebra; no new selector is needed.

There is an independent check. Requiring the scalar background to preserve continuous \(B-L\) gives exactly the same four-versus-three split: desired bilinears have total \(3(B-L)=0\), while the extras carry \(-2,+2,+2\). Matter parity alone is insufficient because those nonzero charges are even.

Continuous \(B-L\) is therefore a useful alternative selector above any Majorana-breaking scale, but color-linearity is the smaller and more conservative repair.

## 5. Verdict

### Conventional Standard Model branch — go

The doubled-arrow repair remains viable. Once its suppressed color matrix structure is restored, the unwanted links are eliminated and exactly four complex one-generation Dirac Yukawa coefficients remain. The construction organizes their allowed locations but does not relate their magnitudes.

### Mandatory-extra-particle claim — no-go

The seven-link count does not predict leptoquarks. The extras are artifacts of allowing colored fluctuations in the commutative endpoint truncation unless an additional principle selects that enlarged scalar sector.

### Colored-fluctuation branch — interesting alternative

If the finite geometry deliberately admits colored scalar fluctuations, the extras are highly structured: one \(S_1\) can realize all three, an optional \(S_3\) realizes the triplet part of \(Q-L\), and the minimal endpoint first-order rule excludes their basic diquark partners. This is a concrete model-building lane, subject to proton-decay, flavor and collider constraints.

## Literature boundary

The \(S_1/S_3\) representations and their phenomenology are established. The new-to-programme result is their exact emergence from the three residual doubled-Furey links and the simultaneous absence of the basic diquark links in the same endpoint classifier.

- [Doršner et al., leptoquark review](https://arxiv.org/abs/1603.04993)
- [Doršner, Fajfer and Košnik, scalar leptoquarks and proton decay](https://arxiv.org/abs/1204.0674)
- [Doršner et al., the \(S_3\) representation in phenomenology](https://arxiv.org/abs/1706.07779)

## Reproduction

```powershell
node scripts\gauge_dress_the_seven_doubled_furey_arrow_links.mjs
node scripts\classify_minimal_doubled_furey_arrow_spectral_geometry.mjs
```

