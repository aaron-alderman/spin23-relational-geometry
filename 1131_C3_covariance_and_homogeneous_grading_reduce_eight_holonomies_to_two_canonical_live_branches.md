# (C_3) Covariance and Homogeneous Grading Reduce Eight Holonomies to Two Canonical Live Branches

**Date:** 18 October 2026  
**Programme instruction:** keep all live options open and filter implementations rather than prematurely selecting a narrative  
**Branches:** trivial (C_3\sqcup C_3), Möbius (C_6), KO-6 grading, cyclic covariance  
**Claim status:** exact discrete classification; the physical degree of relationship transport remains open  
**Certificate:** [prove_C3_covariance_and_Z2_degree_filter_triangle_holonomy.mjs](scripts/prove_C3_covariance_and_Z2_degree_filter_triangle_holonomy.mjs)

## Executive result

The eight raw \(\mathbb Z_2\) edge assignments found in [1130](1130_KO6_reality_supplies_the_sheet_involution_but_does_not_determine_Mobius_holonomy.md) should not be carried forward as eight equally distinct physical models.

Three filters reduce them without choosing between trivial and Möbius holonomy:

1. vertex-sheet gauge transformations reduce the eight assignments to two cohomology classes;
2. strict cyclic covariance selects one symmetric representative of each class;
3. homogeneous \(\mathbb Z_2\) degree identifies those representatives as the all-even and all-odd transports.

The surviving canonical candidates are

\[
t_{\mathrm{even}}=(0,0,0),
\qquad
t_{\mathrm{odd}}=(1,1,1).
\]

Their holonomies are

\[
h_{\mathrm{even}}=0,
\qquad
h_{\mathrm{odd}}=1,
\]

because a three-cycle has

\[
h=3d=d\pmod 2
\]

for homogeneous edge degree (d).

Therefore the live fork is no longer “which of eight arbitrary seams should be chosen?” It is

\[
\boxed{
\text{even relationship transport}
\quad\text{versus}\quad
\text{odd relationship transport}.
}
\]

The even branch gives (C_3\sqcup C_3). The odd branch gives the connected (C_6) cover.

## 1. Gauge reduction

Write the three edge bits as

\[
\((t_{PI},t_{IN},t_{NP})\in\mathbb Z_2^3\).
\]

A change of sheet convention \(g_v\in\mathbb Z_2\) at each vertex sends

\[
t_{uv}\longmapsto t_{uv}+g_u+g_v.
\]

Choose

\[
g_P=0,
\qquad
g_I=t_{PI},
\qquad
g_N=t_{PI}+t_{IN}.
\]

Every connection is then gauge-equivalent to

\[
(0,0,h),
\qquad
h=t_{PI}+t_{IN}+t_{NP}.
\]

Thus there are only two gauge classes, in agreement with

\[
H^1(C_3,\mathbb Z_2)\cong\mathbb Z_2.
\]

The location of a single drawn seam is gauge-dependent. Its total parity is not.

## 2. Cyclic covariance

If (P,I,N) are treated as one cyclic relational orbit, a preferred edge must not be inserted without further symmetry-breaking data. Strict invariance under

\[
(PI,IN,NP)\longmapsto(IN,NP,PI)
\]

requires

\[
t_{PI}=t_{IN}=t_{NP}.
\]

Only two raw assignments obey this:

\[
000,
\qquad
111.
\]

This does not eliminate either holonomy class. It produces a canonical, edge-transitive representative of each.

The familiar one-seam picture (001) remains a valid gauge for the Möbius class, but (111) is the representation in which the three edges have the same local rule.

## 3. Homogeneous degree

Suppose all three relationship transports belong to one homogeneous operator class of degree

\[
d\in\mathbb Z_2.
\]

Then

\[
t_e=d
\]

on every edge. Around three edges,

\[
h=d+d+d=d\pmod2.
\]

Hence:

| Local transport degree | Symmetric representative | Cover | Status |
|---|---:|---|---|
| even | (000) | (C_3\sqcup C_3) | live |
| odd | (111) | connected (C_6) | live |

The six nonuniform assignments are not new topological sectors. They are either gauge presentations of these two classes or models with explicit edge-dependent structure.

## 4. Filter ledger

| Filter | (C_3\sqcup C_3) | Möbius (C_6) | Consequence |
|---|---|---|---|
| \(J\)-equivariance | passes | passes | does not distinguish |
| gauge equivalence | one class | one class | eight reduce to two |
| strict (C_3) covariance | (000) | (111) | both retain symmetric representatives |
| homogeneous even degree | selected | rejected | conditional selection |
| homogeneous odd degree | rejected | selected | conditional selection |
| bare anchor protection | naturally safe | unsafe if implemented by a new linear mixing edge | implementation filter only |
| antiunitary/categorical sheet switch | unnecessary | potentially safe | remains live |
| represented one-forms modulo junk | uncomputed | uncomputed | decisive physical filter |

This is the correct meaning of “keep all options open”: preserve both gauge classes while rejecting redundant or structurally inconsistent implementations.

## 5. What could filter one branch out

### 5.1 If physical transport is an even composite

If the relationship transition is built from an even number of grading-odd one-forms—for example a binary Jordan product, a quadratic response, or a two-step correspondence—then it preserves the KO sheet. The trivial cover is selected.

### 5.2 If physical transport is an odd relation

If each edge lift is itself a grading-odd represented one-form, or a homogeneous odd ternary relation, every edge switches the KO sheet. The Möbius cover is selected.

### 5.3 If one edge is physically exceptional

A nonuniform assignment can survive only if the completed model contains a datum distinguishing one edge: a Majorana/Dirac type, a spectator connector, a vacuum direction, or a nonuniform junk relation. It must be derived from that datum rather than chosen as a decorative seam.

## 6. Current branch tree

\[
\begin{array}{c}
\text{KO-6 two-sheet relation system}\\[2mm]
\downarrow\\
\text{physical degree of edge transport?}\\[2mm]
\swarrow\qquad\searrow\\
\text{even}\qquad\text{odd}\\
C_3\sqcup C_3\qquad C_6\\
\text{binary/quadratic}\qquad\text{one-form/triple/Real}
\end{array}
\]

Neither leaf is presently eliminated. What has been eliminated is the idea that the eight bit patterns are eight independent mysteries.

## 7. Stop-everything criteria

**Gauge stop:** do not treat seam location as physical until a vertex-frame convention has been fixed.

**Symmetry stop:** do not privilege one edge in a cyclic model without an explicit symmetry-breaking datum.

**Degree stop:** do not infer Möbius holonomy from \(J\) alone; prove that the edge transport is odd.

**Anchor stop:** reject a Möbius implementation if its sheet switch is a forbidden complex-linear map between (P_D) and (P_M).

**Positive trigger:** derive a homogeneous degree for the physical relationship transport from the represented finite calculus.

## 8. Verdict

The indeterminacy has been compressed into one exact binary question:

\[
\boxed{
|T_e|=0\quad\text{or}\quad |T_e|=1?
}
\]

This is a substantial reduction. The next document shows that ordinary Jordan binary composition and Jordan-triple recursion answer this question differently.

## Corpus position

- [KO-6 reality underdetermines the raw connection](1130_KO6_reality_supplies_the_sheet_involution_but_does_not_determine_Mobius_holonomy.md)
- [binary Jordan versus Jordan-triple parity filter](1132_binary_Jordan_composition_selects_the_trivial_cover_while_odd_Jordan_triple_recursion_selects_the_Mobius_cover.md)
- [typed twin (Spin(2,3)) wheels](1127_opposite_anchor_typing_splits_the_Sp6_envelope_into_two_local_Spin23_relational_wheels.md)

