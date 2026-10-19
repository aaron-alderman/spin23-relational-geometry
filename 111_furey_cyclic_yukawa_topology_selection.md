# Cyclic Yukawa Closure Selects One Furey Matter Topology

**Date:** 17 October 2026  
**Branches:** B03 and B11  
**Claim status:** exact conditional theorem under the cyclic block-trace interaction rule; the rule’s physical derivation remains open

## 1. Why representation invariance is not enough

All three positive-hypercharge Higgs-like block maps transform as

\[
(\mathbf1,\mathbf2)_{+1/2},
\]

so gauge representation theory alone allows each to be called a Higgs candidate. The four anomaly-free matter TROs provide enough endpoint data to impose a stronger interaction rule:

> A cubic internal interaction is present only when its three directed block maps compose to a closed cycle with nonzero matrix trace.

For directed block matrices this means that some cyclic ordering of \(X,Y,Z\) has

\[
\operatorname{Tr}(XYZ)\ne0.
\]

This rule is natural for an endomorphism/linking-algebra action, but it is an additional dynamical hypothesis. Ordinary gauge-invariant QFT does not require its fields to form literal internal matrix cycles.

## 2. Matter and Higgs arrows

The fixed matter arrows are

\[
Q:H\to O_2,
\qquad
u^c:O_2\to C.
\]

The positive-hypercharge Higgs candidates are

\[
h_{O_1}:H\to O_1,
\qquad
h_C:C\to H,
\qquad
h_R:H\to R.
\]

The three charged Yukawa structures use

\[
Qu^c h,\qquad
Qd^c h^\dagger,\qquad
Le^c h^\dagger.
\]

The certificate tests the required orientation or dagger orientation rather than ignoring hypercharge.

## 3. Up-type cycle

The matter arrows form

\[
H\xrightarrow{Q}O_2\xrightarrow{u^c}C.
\]

Only

\[
C\xrightarrow{h_C}H
\]

closes the cycle. Therefore every cyclic up-type Yukawa uses \(h_C\).

## 4. Down-type cycle

Let \(D\in\{O_1,R\}\) be the target chosen for \(d^c\):

\[
H\xrightarrow{Q}O_2\xrightarrow{d^c}D.
\]

The cycle closes with

\[
D\xrightarrow{h_D^\dagger}H,
\]

where \(h_D=h_{O_1}\) for \(D=O_1\) and \(h_D=h_R\) for \(D=R\). Thus the down sector selects the Higgs block attached to the \(d^c\) neutral target.

## 5. Charged-lepton cycle selects the topology

Write \(S\) for the source of \(L:S\to H\) and \(E\) for the target of \(e^c:C\to E\). A cyclic charged-lepton interaction requires

\[
C\xrightarrow{e^c}E
\xrightarrow{L}H
\xrightarrow{h_C^\dagger}C.
\]

It exists if and only if

\[
S=E.
\]

Therefore:

\[
\begin{array}{c|c}
\text{topology}&\text{all three charged Yukawa cycles}\\ \hline
L\text{-source}=d^c\text{-target}&\text{no}\\
L\text{-source}=e^c\text{-target}&\text{yes}.
\end{array}
\]

Of the four anomaly-free TROs, exactly two survive. They are exchanged by \(O_1\leftrightarrow R\), so there is one surviving relational topology before the neutral blocks are physically distinguished.

## 6. Higgs consequence

Each surviving solution requires two distinct positive-hypercharge block components:

\[
h_C
\quad\text{and}\quad
h_D.
\]

No single one of the three elementary block maps closes all three Yukawa cycles.

This does **not** yet prove a two-Higgs-doublet model. A single physical doublet could be embedded diagonally,

\[
h_{\rm phys}=\alpha h_C+\beta h_D,
\qquad
\alpha\beta\ne0,
\]

so that the up and charged-lepton cycles use the \(h_C\) component while the down cycle uses \(h_D\). Such an identification needs a source relation locking the two copies together. Without it, the natural interpretation is two independent Higgs-doublet fields.

The distinction is experimentally important:

- one locked diagonal doublet has one electroweak vacuum direction but block-dependent coupling coefficients;
- two independent doublets have an enlarged scalar spectrum and potential flavor-changing neutral currents unless an additional alignment rule holds.

## 7. Stronger synthesis

Under the cyclic rule, the internal chains are

\[
H\xrightarrow{Q}O_2\xrightarrow{u^c}C\xrightarrow{h_C}H,
\]

\[
H\xrightarrow{Q}O_2\xrightarrow{d^c}D\xrightarrow{h_D^\dagger}H,
\]

and

\[
C\xrightarrow{e^c}E\xrightarrow{L}H\xrightarrow{h_C^\dagger}C,
\qquad E\ne D.
\]

This is a concrete realization of “one carrier, two faces, three relationships”: the same endpoint incidence simultaneously selects the matter topology and organizes the three charged Yukawa sectors.

It remains conditional because no derivation yet forces the action to use only cyclic internal traces.

## 8. Next gates

A viable completion must determine:

1. whether \(O_1\) and \(R\) possess a source-native distinction;
2. whether \(h_C\) and \(h_D\) are independent or one locked diagonal field;
3. the allowed Yukawa coefficient matrices and whether flavor CP violation survives;
4. Lorentz spinor contractions and Grassmann statistics;
5. radiative stability of the selected zero entries;
6. compatibility with the external \(H_2(\mathbb R)\) response carrier;
7. whether neutrino masses require \(R\), the triplet \(LL\Delta\) portal, or both.

## 9. Stop-everything and falsification criteria

**Positive:** the nested Furey algebra or external two-face orientation derives the cyclic trace rule and fixes a nonzero diagonal embedding \((\alpha,\beta)\), leaving exactly the observed light Higgs sector.

**Negative:** Lorentz-covariant Yukawa construction necessarily uses noncyclic intertwiners with arbitrary coefficients, so the block-incidence selection has no dynamical force.

**Current status:** conditional topology selection is exact; its physical premise is open.

**Unsafe shortcut:** describe the two required block components as two observed Higgs doublets before deciding whether they are independent fields or one constrained embedding.

## 10. Certificate

The [cyclic-Yukawa certificate](scripts/verify-furey-matter-higgs-yukawa-cycles.mjs) checks directed composability for every up, down and charged-lepton Yukawa across all four anomaly-free matter TROs and all three Higgs-like block maps.

## Companion documents

- [Four anomaly-free one-generation TROs](110_furey_anomaly_free_one_generation_tros.md)
- [Furey Higgs-doublet nonuniqueness](105_furey_higgs_doublet_nonuniqueness.md)
- [Two-sided Furey polarization](107_furey_two_sided_higgs_lepton_polarization.md)
- [Minimal Higgs-doublet/full-lock portals](102_minimal_doublet_full_lock_portals.md)
- [Linking algebras of the surviving matter TROs](112_furey_surviving_tro_linking_algebras.md)
- [Two-Higgs block counterterm obstruction](113_furey_two_higgs_block_counterterm_obstruction.md)
