# Four Anomaly-Free One-Generation TROs in the Furey Endomorphism Inventory

**Date:** 17 October 2026  
**Branches:** B03 and B11  
**Claim status:** exhaustive block-level existence and classification theorem; no canonical choice, dynamics or statistics derivation yet

## 1. Question forced by the coarse-sign obstruction

No complete eigenspace of the sixteen \(LXR\) orientations contains all five charged one-generation Standard-Model types. That rules out the coarse sign as the complete matter selector, but it leaves a better-posed possibility:

> Does the Furey endomorphism inventory contain a smaller, gauge-stable, anomaly-free set that is closed under \(XY^\dagger Z\)?

The required left-handed multiplets are

\[
Q,\qquad u^c,\qquad d^c,\qquad L,\qquad e^c,
\]

with total complex dimension

\[
6+3+3+2+1=15.
\]

## 2. Exact block origins

The unique origins of the quark doublet and up-conjugate type are

\[
\begin{array}{c|c|c}
\text{field}&\text{block map}&(SU(3),SU(2))_Y\\ \hline
Q&H\to O_2&(\mathbf3,\mathbf2)_{1/6}\\
u^c&O_2\to C&(\bar{\mathbf3},\mathbf1)_{-2/3}.
\end{array}
\]

The remaining choices are

\[
\begin{array}{c|c|c}
d^c&O_2\to O_1\text{ or }O_2\to R&(\bar{\mathbf3},\mathbf1)_{1/3}\\
L&O_1\to H,\ H\to C,\text{ or }R\to H&(\mathbf1,\mathbf2)_{-1/2}\\
e^c&C\to O_1\text{ or }C\to R&(\mathbf1,\mathbf1)_1.
\end{array}
\]

There are therefore

\[
1\cdot1\cdot2\cdot3\cdot2=12
\]

complete one-generation block choices.

## 3. Ternary-closure tournament

For each five-block choice \(M\), the certificate computes the smallest support containing it and closed under

\[
MM^\dagger M\subseteq M.
\]

The exhaustive result is

\[
\boxed{4/12\text{ choices are already exact TROs}.}
\]

All four have exactly five block supports and exactly fifteen complex dimensions. They contain no dagger-reverse mirror blocks.

Writing a block map as \(\text{target}\leftarrow\text{source}\), the fixed maps are

\[
Q:O_2\leftarrow H,
\qquad
u^c:C\leftarrow O_2.
\]

The four successful choices are

\[
\begin{array}{c|c|c}
d^c&L&e^c\\ \hline
O_1\leftarrow O_2&H\leftarrow O_1&R\leftarrow C\\
O_1\leftarrow O_2&H\leftarrow R&R\leftarrow C\\
R\leftarrow O_2&H\leftarrow O_1&O_1\leftarrow C\\
R\leftarrow O_2&H\leftarrow R&O_1\leftarrow C.
\end{array}
\]

Equivalently:

- the \(d^c\) and \(e^c\) targets must be the two **different** neutral singlet blocks \(O_1\) and \(R\);
- the lepton-doublet source can be either neutral singlet;
- the alternative lepton origin \(H\to C\) never gives an exact five-block TRO.

The four choices form two pairs under interchange

\[
O_1\longleftrightarrow R.
\]

Their two invariant relational topologies are:

1. the source of \(L\) equals the target of \(d^c\);
2. the source of \(L\) equals the target of \(e^c\).

Each topology occurs twice before quotienting by the neutral-singlet interchange.

## 4. Why closure succeeds

At block-matrix-unit level,

\[
E_{ab}E_{cb}^\dagger E_{cf}=E_{af}.
\]

The successful choices avoid the rectangular-completion patterns that would generate an additional block. In particular, assigning \(d^c\) and \(e^c\) to different neutral targets breaks the path that otherwise generates the neutral \(C\to C\) block.

For the eight unsuccessful choices, ternary completion produces one, two or four additional block sectors. Their closure sizes are:

\[
\begin{array}{c|c}
\text{closure}&\text{number of choices}\\ \hline
6\text{ blocks}/16\text{ complex dimensions}&4\\
7\text{ blocks}/26\text{ complex dimensions}&2\\
9\text{ blocks}/30\text{ complex dimensions}&2.
\end{array}
\]

The remaining four are the exact \(5\)-block/\(15\)-dimensional solutions.

## 5. Anomaly theorem

Every successful TRO has exactly one copy of the usual one-generation representations. With \(Y_6=6Y\), the anomaly numerators are

\[
\begin{aligned}
[SU(3)]^3 &: 2-1-1=0,\\
[SU(3)]^2U(1) &:2(1)-4+2=0,\\
[SU(2)]^2U(1) &:3(1)-3=0,\\
\mathrm{grav}^2U(1) &:6-12+6-6+6=0,\\
U(1)^3 &:6-192+24-54+216=0.
\end{aligned}
\]

There are \(3+1=4\) color-weighted weak doublets, so the global \(SU(2)\) anomaly also cancels.

Thus

\[
\boxed{
\text{Furey block inventory}
\supset
\text{four mirror-free, anomaly-free, one-generation TROs}.
}
\]

This is stronger than merely observing that all representation types occur somewhere in the \(64\)-dimensional algebra.

## 6. Relation to the sixteen coarse orientations

No successful one-generation TRO lies wholly inside either sign of any Higgs/lepton-orienting \(LXR\) involution. The physical fields necessarily cross the coarse sign boundary.

Therefore the two structures have different jobs:

- \(LXR\) supplies a two-face orientation and a large TRO/linking algebra;
- the one-generation TRO supplies a minimal anomaly-free chiral matter candidate;
- a still-missing finer grading must explain their compatibility and assign bosonic versus fermionic statistics.

The result favors a nested structure

\[
M_{\rm SM}\subset\mathcal L(M_{\rm oriented}),
\]

not the identification \(M_{\rm SM}=M_+\) or \(M_-\).

## 7. What remains unproved

The fourfold choice is not yet physical selection. The calculation does not establish:

- which neutral-singlet block is \(d^c\) versus \(e^c\);
- which of the two relational topologies is preferred;
- why the selected block maps are fermions;
- a Lorentz spinor factor or kinetic operator;
- Yukawa closure with one of the three Higgs-like maps;
- three generations;
- masses, CKM/PMNS mixing or CP violation;
- coupling to the external \(H_2(\mathbb R)\) carrier;
- protection against radiative mixing with the unused block sectors.

In particular, ternary closure is an interaction-category result, not by itself a local quantum field theory.

## 8. Stop-everything and falsification gates

**High-value positive trigger:** one source-native involution, boundary orientation or ideal construction selects one of the two neutral-singlet topologies and simultaneously supplies Lorentz spin, statistics and a compatible Higgs/Yukawa map.

**Stronger trigger:** the same construction yields three copies or a family index without reintroducing mirrors and couples functorially to \(H_2(\mathbb R)\).

**Negative:** every gauge-invariant kinetic or Yukawa completion forces the unused mirrors or the extra ternary-closure blocks back into the propagating spectrum.

**Current status:** existence is established; uniqueness and physical realization are open.

**Unsafe shortcut:** call the presence of four mathematical TROs a derivation of one observed fermion generation.

## 9. Certificate

The [one-generation sub-TRO certificate](../../../verification/verify/verify-furey-one-generation-subtro.mjs) enumerates all twelve block assignments, verifies the Standard-Model anomaly ledger, computes exact ternary closures and dimensions, excludes ordinary and dagger closure, and classifies the four successful choices into two neutral-singlet interchange orbits.

## Companion documents

- [Furey endomorphism-sector inventory](../0000-0099/73_furey_endomorphism_sector_inventory.md)
- [Furey orientation as an exact ternary bimodule](108_furey_oriented_bimodule_ternary_closure.md)
- [Oriented-sector anomaly audit](109_furey_oriented_sector_anomaly_audit.md)
- [Standard-Model anomaly gate](../0000-0099/62_standard_model_anomaly_gate.md)
- [Cyclic Yukawa topology selection](111_furey_cyclic_yukawa_topology_selection.md)

