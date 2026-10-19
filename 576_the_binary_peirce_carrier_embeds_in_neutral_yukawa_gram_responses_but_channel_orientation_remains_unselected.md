# The Binary Peirce Carrier Embeds in Neutral Yukawa Gram Responses, but Channel Orientation Remains Unselected

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B06, B07, B08, B11 and B14  
**Claim status:** exact external neutral-response realization and embedding count; no source-derived channel, sign, scale or stress kernel is yet selected

## Executive result

The face-fixed matter-arrow intertwiner was obstructed because a neutral real source arrow cannot map nontrivially to a continuously charged Furey arrow. The external neutral-response branch avoids this obstruction exactly.

For every Higgs-dressed Yukawa channel, the two endpoint faces transform in the same Standard-Model representation. Their sesquilinear Gram matrix is therefore gauge-neutral entry by entry:

\[
G_f=
\begin{pmatrix}
\langle\chi_{L,f},\chi_{L,f}\rangle&
\langle\chi_{L,f},\chi_{R,f}\rangle\\
\langle\chi_{R,f},\chi_{L,f}\rangle&
\langle\chi_{R,f},\chi_{R,f}\rangle
\end{pmatrix}
\in H_2(\mathbb C)_+.
\]

Its entrywise-real projection lies in \(H_2(\mathbb R)_+\). The finite split carrier maps as

\[
p\mapsto E_{11},
\qquad
q\mapsto E_{22},
\qquad
a\mapsto\pm E_{12}.
\]

Thus the two finite Peirce faces can be retained as dressed-left and dressed-right response populations while the arrow becomes a **neutral composite cross response**, not a charged matter field.

The exact embedding counts are:

\[
\boxed{
\begin{array}{c|c|c}
\text{branch}&\text{available channels}&\text{strict real face-fixed TRO embeddings}\\
\hline
15\text{-state}&u,d,e&6\\
16\text{-state Dirac}&u,d,e,\nu&8
\end{array}}
\]

There are two arrow orientations per channel. Gauge symmetry fixes neither the channel nor the sign. Therefore the external neutral repair is mathematically real but not yet source-selected.

## 1. Representation-matched faces

Using six-times-hypercharge, the four possible dressed pairs are

\[
\begin{array}{c|c|c|c}
f&\chi_{L,f}&\chi_{R,f}&\text{common representation}\\
\hline
u&\widetilde H^\dagger Q&u^{c\dagger}&(\mathbf3,\mathbf1)_4\\
d&H^\dagger Q&d^{c\dagger}&(\mathbf3,\mathbf1)_{-2}\\
e&H^\dagger L&e^{c\dagger}&(\mathbf1,\mathbf1)_{-6}\\
\nu&\widetilde H^\dagger L&\nu^{c\dagger}&(\mathbf1,\mathbf1)_0.
\end{array}
\]

Within each row the two faces carry the same gauge action. If

\[
\chi_L\mapsto\rho(g)\chi_L,
\qquad
\chi_R\mapsto\rho(g)\chi_R,
\]

then unitarity gives

\[
\langle\rho(g)\chi_i,\rho(g)\chi_j\rangle
=\langle\chi_i,\chi_j\rangle.
\]

Every matrix entry is a singlet. This is the exact reason the charged-arrow obstruction disappears: the response arrow is a contracted bilinear in matched representations.

## 2. Binary face and arrow dictionary

The finite split triangular carrier has

\[
p=E_{11},\qquad a=E_{12},\qquad q=E_{22}.
\]

For a fixed channel \(f\), assign

\[
p\longmapsto\text{dressed-left population},
\]

\[
q\longmapsto\text{conjugated-right population},
\]

\[
a\longmapsto\text{real cross response}.
\]

At the full matrix level this is the ordinary inclusion of \(T_2(\mathbb R)\) into \(M_2(\mathbb R)\). Under the transpose TRO product, the arrow generator obeys

\[
[a,a,a]=a.
\]

A face-fixed real TRO map sends

\[
a\mapsto sE_{12}
\]

with

\[
s^3=s.
\]

For a nonzero embedding,

\[
s=\pm1.
\]

Hence there are exactly two strict real TRO orientations per channel.

## 3. Why the sign is not yet physical

An independent rephasing

\[
\chi_R\mapsto-\chi_R
\]

leaves both diagonal populations unchanged and flips

\[
\operatorname{Re}\langle\chi_L,\chi_R\rangle
\mapsto
-\operatorname{Re}\langle\chi_L,\chi_R\rangle.
\]

Thus the two signs are related by an allowed source convention for one isolated channel. They become meaningful only after relative phase data are fixed by:

- a cyclic Furey path;
- several coupled Yukawa channels;
- flavor CP structure;
- a Ward-normalized common source;
- or a boundary sewing orientation.

Gauge neutrality alone does not choose the sign.

## 4. Why the channel is not selected

Across different channels, the endpoint representations are inequivalent:

\[
(\mathbf3,\mathbf1)_4,
(\mathbf3,\mathbf1)_{-2},
(\mathbf1,\mathbf1)_{-6},
(\mathbf1,\mathbf1)_0.
\]

Schur’s lemma gives no nonzero bare linear gauge intertwiner between any distinct pair. Each quadratic Gram descends to an abstract neutral copy of \(H_2\), but gauge symmetry does not align their:

- face bases;
- source normalizations;
- arrow signs;
- spectral measures;
- response scales.

Consequently the binary carrier has several legal neutral destinations and no established map selecting one.

## 5. Fifteen-state versus sixteen-state count

### Fifteen-state branch

Without \(\nu^c\), the available Dirac-type dressed channels are

\[
u,d,e.
\]

Each has two real TRO orientations, giving six face-fixed maps.

The unique internal \(M_2(\mathbb C)\) linking factor comes from the charged-lepton edge. This makes the electron response the strongest distinguished candidate if one additionally requires compatibility with that factor. It does not yet prove that the binary source faces map to the electron response faces.

### Sixteen-state branch

The unique ternary-compatible \(\nu^c\) addition opens the neutrino channel, giving eight maps. But the completed linking algebra becomes

\[
M_5(\mathbb C)^2\oplus M_3(\mathbb C)^2,
\]

and the unique internal \(M_2\) factor disappears.

The external neutral Gram carrier survives this change because it is selected by matched composite endpoints rather than by simple-factor size.

Thus the neutrino fork affects the internal selector but not the existence of the external response construction.

## 6. Positivity and its limits

For every pair of amplitudes,

\[
G_f\ge0
\]

by Gram positivity. Therefore

\[
\operatorname{Re}G_f
=\begin{pmatrix}
\|\chi_L\|^2&\operatorname{Re}\langle\chi_L,\chi_R\rangle\\
\operatorname{Re}\langle\chi_L,\chi_R\rangle&\|\chi_R\|^2
\end{pmatrix}
\ge0.
\]

This supplies the Euclidean-Jordan positive cone required by the \(Spin(2,3)\) response bridge.

But positivity does not determine:

- which channel is physical;
- the absolute response normalization;
- a common stress spectral kernel;
- relative weights in a channel sum;
- whether the finite arrow is a one-particle, composite or boundary observable.

## 7. Relation to the Gaussian branch

The two repairs solve different problems.

### Gaussian internal repair

\[
\text{binary arrow}
\longrightarrow
\text{charged complex Furey arrow}.
\]

It requires a nonsplit ramified lift and reinterprets or enlarges the relationship coordinate.

### Neutral external repair

\[
\text{binary arrow}
\longrightarrow
\text{gauge-neutral dressed cross response}.
\]

It preserves the two population faces and the real \(H_2(\mathbb R)\) carrier, but gives multiple channels and source-normalization ambiguities.

Neither branch subsumes the other. The eventual theory might use the internal charged arrow to generate the external neutral response, but that functor is not yet derived.

## 8. Dependency graph

\[
\begin{array}{c}
T_2(\mathbb F_2)\\
\downarrow\ \text{face-normalized real lift}\\
T_2(\mathbb R)\\
\downarrow\ \text{choose dressed Yukawa channel}\\
\text{matched endpoint pair }(\chi_L,\chi_R)\\
\downarrow\ \text{Gram contraction}\\
H_2(\mathbb R)_+\text{ neutral response}\\
\downarrow\ \text{TKK/conformal completion}\\
Spin_0(2,3).
\end{array}
\]

The unproved arrows are channel selection and physical stress/spectral realization, not gauge neutrality or positivity.

## 9. Claim ledger

### Established

- every allowed dressed Yukawa pair has matching gauge representations;
- every entry of its Gram matrix is gauge neutral;
- its real projection is positive in \(H_2(\mathbb R)\);
- the binary \(p,q,a\) pattern has two strict real face-fixed TRO embeddings per channel;
- the 15-state branch has six such channel/sign maps;
- the Dirac 16-state branch has eight;
- independent face rephasing shows the sign is not selected by gauge symmetry;
- distinct channels have no bare cross-channel gauge intertwiner.

### Candidate bridge

- the unique 15-state \(M_2(\mathbb C)\) factor selects the electron Gram response;
- Furey cyclic orientation fixes the otherwise removable arrow sign;
- a universal stress or boundary source fixes common channel embeddings and weights;
- the finite classes are populations and cross response of one selected channel.

### Not established

- a map from the finite cocycle labels to a named Yukawa channel;
- the physical sign of the real relationship;
- Ward-normalized response scales;
- a common causal spectral kernel;
- channel aggregation coefficients;
- a dimensionless observable.

## 10. Stop-everything and falsification gates

### Stop-everything positive

1. The unique 15-state linking factor and cyclic path derive the electron dressed Gram functor with a fixed sign and normalization.
2. A common conserved stress or boundary-flux source produces the same two-face kernel in all allowed channels with fixed positive weights.
3. The finite tensor labels map to dressed endpoint observables by a source-derived intertwiner preserving the faithful Standard-Model quotient.

### Falsifiers

- a proposed dressed pair fails representation matching;
- its physical spectral matrix violates positivity after Ward-null directions are removed;
- channel choice or arrow sign is claimed from gauge invariance alone;
- the neutrino response is used in the 15-state branch without a \(\nu^c\) or Majorana/Nambu replacement;
- arbitrary response weights are presented as predictions.

## 11. Next executable branch

The highest-value neutral-response test is to combine the unique 15-state charged-lepton linking factor with the full electron Yukawa cycle and ask whether its cyclic trace fixes the sign and normalization of the electron Gram arrow. If it does not, the common Ward/stress source remains necessary.

## Certificates and companions

- [Binary-to-Yukawa Gram embedding certificate](scripts/verify_binary_t2_embeddings_into_yukawa_gram_responses.mjs)
- [Four-channel neutral Gram certificate](scripts/verify_four_channel_dressed_h2_response.mjs)
- [Cross-channel Schur obstruction](scripts/verify_yukawa_cross_channel_intertwiner_obstruction.mjs)
- [All four neutral Yukawa responses](264_all_four_yukawa_cycles_induce_gauge_neutral_two_face_gram_responses.md)
- [Channel-orientation obstruction](273_gauge_symmetry_does_not_orient_the_four_yukawa_remnant_rays.md)
- [Fifteen/sixteen-state tradeoff](167_unique_right_handed_neutrino_tro_completion_and_spin23_tradeoff.md)
