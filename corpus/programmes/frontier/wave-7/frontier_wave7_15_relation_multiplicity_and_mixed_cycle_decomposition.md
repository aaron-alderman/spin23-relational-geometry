# Frontier Wave 7.15: Relation Multiplicity and the Mixed-Cycle Decomposition

**Date:** 24 October 2026  
**Status:** exact finite-graph result; exceptional interpretation remains conditional

## The observed signature

The 27 relations in the quotient-scar register do not occur as an unstructured count. Their typed multiplicities are

\[
(7,5,5,5,3,2),
\]

or, suppressing the repeated value,

\[
\boxed{7/5/3/2.}
\]

The complete typed decomposition is

\[
27
=7_{\rm extends}
+5_{\rm instantiates}
+5_{\rm enrichment}
+5_{\rm separates}
+3_{\rm shared\ action}
+2_{\rm no\ identification}.
\]

This is more informative than the bare number 27 because each summand is selected by a declared semantic relation type.

## The first exact regrouping

There is a natural semantic split. The constructive relations either extend one system into another or instantiate an abstract mechanism:

\[
C=E_{\tt extends\_to}\oplus E_{\tt instantiates},
\qquad \dim C=7+5=12.
\]

The boundary or guardrail relations state missing enrichment, separation, shared action without shared carrier, or a ruled-out identification:

\[
G=E_{\tt requires\_enrichment}
\oplus E_{\tt separates\_from}
\oplus E_{\tt shares\_action\_not\_carrier}
\oplus E_{\tt rules\_out\_identification},
\]

with

\[
\dim G=5+5+3+2=15.
\]

Therefore the semantic edge space has the exact coordinate decomposition

\[
\boxed{C_1=C\oplus G,\qquad 27=12+15.}
\]

Independently, the connected 16-node graph has incidence rank 15 and cycle rank 12:

\[
\boxed{27=12_{\ker\partial}+15_{\operatorname{im}\partial}.}
\]

Thus the corpus has produced the same numerical split twice: once from semantic typing and once from graph topology.

## Equality of dimensions is not equality of spaces

Let

\[
\partial_C:C\to C_0,
\qquad
\partial_G:G\to C_0
\]

be the restricted incidence maps. Direct calculation gives

\[
\operatorname{rank}\partial_C=10,
\qquad
\dim\ker\partial_C=2,
\]

and

\[
\operatorname{rank}\partial_G=13,
\qquad
\dim\ker\partial_G=2.
\]

Consequently neither the 12-dimensional constructive coordinate space nor the 15-dimensional guardrail coordinate space equals the full 12-dimensional cycle space or the full 15-dimensional incidence image. The dimensional coincidence therefore does **not** define a canonical exchange

\[
C\stackrel?=\ker\partial,
\qquad
G\stackrel?\cong\operatorname{im}\partial.
\]

## The stronger mixed-cycle theorem

The two restricted incidence images overlap in dimension

\[
\begin{aligned}
\dim(\operatorname{im}\partial_C\cap\operatorname{im}\partial_G)
&=\operatorname{rank}\partial_C+\operatorname{rank}\partial_G
-\operatorname{rank}\partial\\
&=10+13-15\\
&=8.
\end{aligned}
\]

A full cycle is a pair \((c,g)\in C\oplus G\) satisfying

\[
\partial_Cc=-\partial_Gg.
\]

Pure constructive and pure guardrail cycles form the four-dimensional kernel

\[
\ker\partial_C\oplus\ker\partial_G.
\]

After quotienting by those pure cycles, a mixed cycle is determined by the common incidence vector in

\[
\operatorname{im}\partial_C\cap\operatorname{im}\partial_G.
\]

Hence there is a natural short exact sequence

\[
0\longrightarrow
\ker\partial_C\oplus\ker\partial_G
\longrightarrow
\ker\partial
\longrightarrow
\operatorname{im}\partial_C\cap\operatorname{im}\partial_G
\longrightarrow0,
\]

with dimensions

\[
\boxed{12=2+2+8.}
\]

The splitting into particular representatives is not canonical, but the subspace dimensions and the eight-dimensional interface quotient are canonical after the constructive/guardrail typing is fixed.

The interpretation is sharp: eight independent closed admissibility paths exist only because constructive moves and critical constraints compensate one another. They are not cycles wholly internal to either vocabulary.

## What the three fives do and do not establish

The three five-edge types are:

1. `instantiates`: concrete realization;
2. `requires_enrichment`: a bridge that cannot close without new structure;
3. `separates_from`: a distinction between superficially adjacent mechanisms.

They form a useful operational triad: realization, open boundary and separation. Each five-edge subgraph is a forest, so the common multiplicity is not inflated by within-type cycles.

But the three subgraphs are not presently an \(S_3\) orbit. Their graph shapes differ:

- `instantiates` occupies seven nodes in two components;
- `requires_enrichment` occupies seven nodes in two components but has a different degree profile;
- `separates_from` occupies eight nodes in three components.

Therefore \(5+5+5\) is an exact repeated multiplicity, not yet a triplet representation.

## Exceptional comparison

The new result produces several numerically suggestive objects:

\[
27=12+15,
\qquad
12=2+8+2,
\qquad
27=7+5+5+5+3+2.
\]

The eight-dimensional mixed interface is particularly notable beside the three eight-dimensional off-diagonal slots of \(J_3(\mathbb O)\). However, the present graph supplies only one canonical eight-dimensional quotient after a binary semantic split. It does not supply three octonionic slots, octonion multiplication, three Jordan idempotents or the cubic determinant.

Likewise, the descending values \(7,5,3,2\) should not be identified with exceptional representation dimensions merely because they are small distinguished integers. No \(E_6\) branching of the fundamental \(\mathbf{27}\) has been derived from these four values. The established exceptional branchings remain \(1+16+10\), \(3+8+8+8\), and their subgroup refinements.

## Promotion tests

The multiplicity signature becomes more than a typed graph invariant only if at least one of the following succeeds:

1. a corpus-independent rule regenerates the six relation types and their multiplicities;
2. refinement of the register preserves the typed dimensions after passage to a declared quotient;
3. an automorphism permutes the three five-dimensional relation spaces;
4. three canonical eight-dimensional interface spaces are produced with a nonassociative composition law;
5. a cubic form on the 27-dimensional carrier is derived and its stabilizer calculated;
6. the semantic \(12+15\) splitting intertwines nontrivially with the cycle/incidence sequence rather than merely matching its dimensions.

## Verdict

The observation survives its first serious audit:

> The present 27 is structured by a genuine typed multiplicity signature, and its natural semantic \(12+15\) partition unexpectedly matches the graph's topological \(12+15\) dimensions.

The stronger derived object is the eight-dimensional mixed interface. The current data do not yet turn \(7/5/3/2\) into an exceptional-algebra decomposition, and the unequal shapes of the three five-edge forests block an immediate triplet claim. This is therefore a real internal structure and a productive exceptional target, not yet an \(E_6\) or \(E_8\) identification.

