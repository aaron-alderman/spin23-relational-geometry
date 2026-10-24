# A2 operator sweep: the recurring tile is the real cyclic group algebra

**Date:** 24 October 2026  
**Status:** bounded machine census; exact algebraic hits with separately typed interpretations  
**Parent:** [Distributed A2 shape discovery](admissibility_09_distributed_a2_shape_discovery.md)  
**Evidence:** [Sweep ledger](../../../evidence/data/admissibility-distributed-a2-sweep-v1.json)  
**Discovery program:** [A2 operator-family scanner](../../../verification/admissibility/discover_distributed_a2_operator_family.mjs)

## Result

A machine sweep inspected every parseable JSON ledger below `evidence/data`, recursively extracted every numeric \(3\times3\) matrix, and tested it up to signed permutation conjugation against

\[
M=aI+bC+cK,
\]

where

\[
C=3I-J,
\qquad
K=T-T^T
\]

for the cyclic three-state shift \(T\).

The bounded census found:

- 380 JSON evidence files scanned;
- zero parse failures;
- 25 nested numeric \(3\times3\) matrices;
- 10 exact normal-form hits;
- 6 metric/even hits and 4 oriented/odd hits;
- 3 evidence files containing hits.

The count is deliberately narrow. It covers machine-readable numeric \(3\times3\) arrays, not matrices embedded only in Markdown, JavaScript source, symbolic strings or larger block systems.

## The algebra behind the recurrence

Since \(T^3=I\) and \(T^T=T^2\),

\[
C=2I-T-T^2,
\qquad
K=T-T^2.
\]

Therefore

\[
\operatorname{span}_{\mathbb R}\{I,C,K\}
=
\operatorname{span}_{\mathbb R}\{I,T,T^2\}
\cong
\mathbb R[C_3]
\cong
\mathbb R\oplus\mathbb C.
\]

The recurring tile is the real regular representation of the cyclic three-state relation. Its \(\mathbb R\) summand is the common singlet; its \(\mathbb C\) summand is the oriented real \(A_2\) plane. The coefficient of \(C\) controls even relational separation, while the coefficient of \(K\) records orientation-sensitive circulation.

This explains why the same shape can arise in otherwise different mini-systems: any real three-state circulant process lands in this algebra. What remains nontrivial is whether the three states, their cyclic order and their physical maps are derived rather than assigned.

## New hit 1: semiclassical SU(3)

The small-circle center-stabilized \(SU(3)\) mass-gap ledger contains

\[
A_{\rm affine}=\frac12C-\frac12K,
\qquad
H_{\rm monopole}=C,
\]

\[
Q_{\rm bion}=\frac12C-\frac32K,
\qquad
H_{\rm bion}=3C.
\]

Its combined numerical Hessian is \(0.029C\). This is not a surprising new unification: the \(SU(3)\) root system is \(A_2\), so the appearance supplies a known mathematical origin for the tile. It does, however, anchor the contextual Casimir shape to a controlled physical calculation. The same spectrum \(\{0,3,3\}\) is the affine-root monopole Hessian spectrum on the redundant common direction plus the two physical dual-photon directions.

The boundary remains explicit. The small-circle compact gauge-theory Hessian does not transport a mass gap to four-dimensional Yang--Mills or to a noncompact \(Spin(2,3)\) connection.

## New hit 2: the three-sector conductance fixture

The A11 passive three-setting two-port benchmark uses the sector table

\[
G_{\rm sector}=
\begin{pmatrix}
4&2&1\\
1&4&2\\
2&1&4
\end{pmatrix}
=7I-\frac32C+\frac12K.
\]

Its symmetric part is an even \(A_2\) metric term and its antisymmetric part is an oriented circulation term. This is an independent engineered realization of the full real cyclic algebra.

But the rows and columns of this table type sector settings against branch conductances; it is not itself the measured two-port response operator. Its value is operational: it supplies a buildable control fixture in which the even and odd parts of the three-state grammar can be varied and tested with randomized order, sham switching and loop-open controls. It is synthetic-control validation, not evidence for a fundamental cyclic sector.

## Classification of the ten hits

| Source | Exact role | Interpretation |
|---|---|---|
| contextual ledger | \(J\), \(C\), \(K\), \(K^2=-C\) | defining finite admission benchmark |
| semiclassical \(SU(3)\) ledger | affine roots, monopole Hessian, bion charges/Hessian, combined Hessian | known \(A_2\) root dynamics in a controlled regime |
| A11 platform ledger | \(7I-\tfrac32C+\tfrac12K\) | engineered cyclic control table |

The sweep therefore finds one mathematical universality class with three epistemically different uses: definition, controlled physical realization and synthetic experimental fixture.

## Consequence for the distributed atlas

The local chart should now be recorded as

\[
\boxed{
\mathbb R[C_3]
\cong
\mathbf1\oplus A_2^{\rm oriented}
}
\]

rather than merely “a recurring \(3\times3\) matrix.” Each mini-system can carry its own coefficients \((a,b,c)\), scale, units and physical typing. A faithful transition must specify:

1. what the three states mean;
2. which common mode is quotiented or retained;
3. how the \(A_2\) metric scale is transported;
4. whether orientation \(K\) is preserved, reversed or forgotten;
5. what assumptions and information losses enter;
6. and which detector record distinguishes \(c\) from \(-c\).

## Relation to E8

This result does not select \(E_8\). It says that the corpus contains a well-defined local \(A_2\) tile. Exceptional root systems contain many \(A_2\) subsystems, but so do ordinary \(SU(3)\) and generic three-cycle constructions. An exceptional claim becomes meaningful only if multiple typed tiles glue with the required integral inner products and bracket closure, and if that gluing removes rather than imports their label and orientation torsors.

The productive question is therefore no longer “does \(A_2\) appear?” It is:

> Which pairs of independently sourced \(\mathbb R[C_3]\) tiles possess a provenance-bearing intertwiner, and what is the smallest closure generated by all such admitted intertwiners?

## Next frontier

Extend the scanner from numeric JSON arrays to the corpus's symbolic certificates and construct a graph whose nodes are typed \(\mathbb R[C_3]\) realizations and whose edges are actual intertwiners. The first target should compare the semiclassical \(SU(3)\) root tile, the family/placement tile, the Furey signed selector and the A11 cyclic control fixture while preserving units, regimes, labels and declared information loss.

