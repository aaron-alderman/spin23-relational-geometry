# Frontier Parallel Topology 02: The Represented-Calculus Fork Leaves One Narrow Möbius Route

**Date:** 18 October 2026  
**Frontier threads:** orientation; Möbius holonomy; first order; junk; KO-6 reality  
**Status:** three exact no-go classes, two conditional survivors, one specified indeterminacy  
**Certificate:** [classify_frontier_represented_calculus_holonomy.mjs](../../../../verification/classify/classify_frontier_represented_calculus_holonomy.mjs)

## Executive result

The topology branch is no longer a balanced choice between a trivial cover and a Möbius cover. The current evidence is asymmetric:

\[
\boxed{
\text{the trivial double cover is realized by the present strict calculus;}
\quad
\text{the Möbius cover survives only as mediated or structural transport.}
}
\]

Three direct realizations are closed:

1. KO-6 reality composed with natural relation rotation generates \(D_3\), not \(C_6\);
2. every parallel six-sector deck flip contains one relation reversal forbidden by first order;
3. the existing eight-sector spectator completion does not connect the orientation sheets without erasing the anchor mask.

This document adds a sharper mediator classification. A single forbidden reversal

\[
(i,j)\leftrightarrow(j,i)
\]

can be replaced graphically by the three-edge first-order path

\[
(i,j)\longrightarrow(i,S)longrightarrow(j,S)longrightarrow(j,i).
\]

Thus one selected seam is still possible after adding the two required one-sided spectator sectors. But trying to mediate all three reversals cyclically with the same spectator forces the middle triangle

\[
PS-NS-IS-PS,
\]

which is not bipartite and therefore cannot consist entirely of grading-odd Dirac edges.

The surviving physical question is now exact: does one selected length-three composite survive the represented product and junk quotient while its effective reversed-anchor coupling vanishes from the physical scalar sector?

## 1. The established cover classification

A \(\mathbb Z_2\) lift of the relation triangle is specified by edge bits

\[
(t_{PI},t_{IN},t_{NP})\in\mathbb Z_2^3.
\]

Its holonomy is

\[
h=t_{PI}+t_{IN}+t_{NP}\pmod2.
\]

The two isomorphism classes are:

\[
h=0:\ C_3\sqcup C_3,
\qquad
h=1:\ C_6.
\]

The current oriented sectors are

\[
PN\to NI\to IP\to PN
\]

and

\[
NP\to PI\to IN\to NP.
\]

They realize \(h=0\). Reality exchanges the sheets but does not itself define a connection with \(h=1\).

## 2. Why the natural \(J\)-construction is closed

Let \(r\) denote natural oriented composition. Then

\[
r^3=1,
\qquad
J^2=1,
\qquad
JrJ=r^{-1}.
\]

Hence

\[
\langle r,J\rangle\cong D_3,
\]

and every \(Jr^k\) has order two. The group has six elements but no element of order six.

This is an exact stop:

\[
\boxed{J+\text{natural composition does not produce Möbius }C_6.}
\]

An abstract commuting deck involution \(\delta\) can instead satisfy

\[
\delta r=r\delta,
\qquad
(\delta r)^6=1.
\]

But \(\delta\ne J\), and each of the three possible \(\delta\)'s contains one forbidden reversal.

## 3. First order and the reversal obstruction

For bimodule labels \((i,j)\) and \((k,\ell)\), the strict complex-linear first-order rule permits a finite-Dirac edge only when

\[
i=k
\qquad\text{or}\qquad
j=\ell.
\]

A reversal

\[
(i,j)\leftrightarrow(j,i),
\qquad i\ne j,
\]

changes both entries and is therefore forbidden as a direct edge.

The three parallel deck choices merely move this unavoidable cost among

\[
PN\leftrightarrow NP,
\qquad
NI\leftrightarrow IN,
\qquad
IP\leftrightarrow PI.
\]

This closes the strict six-sector linear realization.

## 4. The minimal mediator length

Introduce one additional character \(S\), while excluding diagonal loop sectors such as \(PP\) and \(NN\). In the Krajewski rook graph, two vertices are adjacent precisely when they share a left or right label.

No two-edge off-diagonal path connects \((i,j)\) to \((j,i)\). A shortest spectator path has length three:

\[
(i,j)
\to(i,S)
\to(j,S)
\to(j,i).
\]

Explicitly:

\[
PN\to PS\to NS\to NP,
\]

\[
NI\to NS\to IS\to IN,
\]

\[
IP\to IS\to PS\to PI.
\]

Every elementary edge satisfies the first-order support rule. Any one chain admits an alternating grading, so a *single selected seam* is graphically viable.

The existing minimal spectator construction contains only \(PS\) and \(SP\). It lacks the pair needed for every one of these paths, explaining its earlier no-go in a stronger form.

## 5. Why one spectator cannot mediate all three seams symmetrically

The three paths together require middle edges

\[
PS-NS,
\qquad
NS-IS,
\qquad
IS-PS.
\]

These form a triangle. A grading-odd Dirac graph must be bipartite because every edge flips \(\gamma\). The triangle is not bipartite.

Therefore:

\[
\boxed{
\text{one spectator character cannot mediate all three reversals with a cyclically symmetric, wholly grading-odd Dirac graph.}
}
\]

This does not obstruct one chosen seam. In fact, a nontrivial \(\mathbb Z_2\) cover needs odd parity, not three seams. But selecting one edge breaks the base \(C_3\) symmetry or moves the choice into gauge/connection data.

## 6. The junk quotient is now the decisive calculation

The mediator chain is not itself a degree-one one-form. It is a product of three represented degree-one transitions. Its physical status depends on

\[
\pi_D(\Omega^\bullet_{\rm univ}(\mathcal A_F))/\mathcal J.
\]

Three outcomes remain possible:

1. **The composite is junk.** Then no physical Möbius seam survives.
2. **The composite survives and induces an effective reversed-anchor coupling.** Then the cover connects, but the null-mask protection is erased and the coarse \(H_3/Sp(6)\) channel can return.
3. **The composite survives as categorical/parallel transport while its scalar projection is junk or symmetry-forbidden.** This is the desired narrow window.

The third outcome cannot be asserted from graph reachability. It requires explicit matrices for

\[
(\mathcal A_F,\mathcal H_F,\pi,D_F,\gamma,J)
\]

and a computation through at least degree three.

## 7. Branch register

| Branch | Verdict | Reason |
|---|---|---|
| natural KO-6 \(Jr\) | exact no-go | dihedral, no order-six element |
| strict six-sector parallel deck | exact no-go | one direct reversal always violates first order |
| current minimal spectator | exact no-go | spectator leaves do not join sheets |
| one selected three-edge seam | live, conditional | first-order graph exists; quotient and effective mixing unknown |
| one-spectator cyclic completion | exact no-go | middle spectator triangle violates grading bipartiteness |
| structural/Real-groupoid deck | live, conditional | gives \(C_6\) without a degree-one scalar; physical transport law missing |
| generalized \(A_{(2)}\) fluctuation | indeterminate | complete representation and quotient absent |
| larger multi-path mediator | live, conditional | cancellations may exist, but must be protected rather than tuned |

## 8. Minimal reopening package

The next calculation must specify:

1. the finite involutive algebra;
2. the complete particle/conjugate bimodule;
3. every finite Dirac block and multiplicity;
4. grading and KO-6 real structure;
5. the degree-one represented calculus;
6. products through degree three;
7. the junk ideal in those degrees;
8. the scalar kinetic form;
9. the symmetry-breaking vacuum;
10. the induced transport parity around the \(P-I-N\) triangle.

Only this package can change “one mediated seam is live” into either a construction or a no-go.

## 9. Stop-everything statements

- Do not call the present two \(C_3\) sheets a Möbius cover.
- Do not identify KO reality with the commuting deck involution.
- Do not represent a relation reversal as a strict first-order direct edge.
- Do not infer survival through junk from a path in the support graph.
- Do not call a nonzero effective reversed-anchor scalar “anchor preserving.”
- Do not impose all three one-spectator seams while retaining an odd grading; the mediator triangle forbids it.

## Reproducibility

```powershell
node scripts\classify_frontier_represented_calculus_holonomy.mjs
```

## Dependencies

- [current trivial cover](../../../claims/1100-1199/1129_the_current_KO6_triangle_is_two_oriented_C3_sheets_not_yet_a_Mobius_C6_cover.md)
- [KO-6 underdetermination](../../../claims/1100-1199/1130_KO6_reality_supplies_the_sheet_involution_but_does_not_determine_Mobius_holonomy.md)
- [dihedral no-go](../../../claims/1100-1199/1135_the_natural_oriented_relation_rotation_is_dihedral_and_blocks_the_naive_Jrho_Mobius_C6.md)
- [parallel-deck first-order obstruction](../../../claims/1100-1199/1136_every_parallel_deck_involution_gives_C6_but_contains_one_first_order_forbidden_relation_reversal.md)
- [minimal spectator no-go](../../../claims/1100-1199/1137_the_minimal_spectator_completion_cannot_realize_Mobius_holonomy_without_erasing_the_anchor_mask.md)
- [coarse incidence underdetermines the calculus](../../../claims/1000-1099/1077_coarse_Furey_arrow_incidence_cannot_determine_the_represented_one_form_or_S1_copy_number.md)

