# The Typed TRO Preserves the Null Mask but Cannot Generate the Third Odd Möbius Edge

**Date:** 18 October 2026  
**Branches:** typed Jordan triple, TRO linking algebra, null mask, Möbius \(C_6\), even observable closure  
**Claim status:** exact finite-matrix closure and obstruction theorem  
**Certificate:** [prove_typed_TRO_preserves_mask_but_cannot_generate_third_odd_edge.mjs](scripts/prove_typed_TRO_preserves_mask_but_cannot_generate_third_odd_edge.mjs)

## Executive result

The first typed Jordan-triple closure test gives one positive result and one obstruction.

Take the two coarse spokes from the common carrier \(P\):

\[
a=E_{PI},
\qquad
b=E_{PN}.
\]

Their row space

\[
R=\operatorname{span}\{a,b\}
\]

is closed under the Jordan triple product

\[
\{x,y,z\}=\frac12(xy^*z+zy^*x).
\]

No triple product leaves \(R\), so ternary composition does not create a forbidden new odd carrier. This is exactly the type-preservation wanted from the relational language.

However, it also means that two odd spokes do **not** generate a third odd \(I-N\) edge. Instead,

\[
a^*b=E_{IN}
\]

appears in the right linking algebra

\[
R^*R,
\]

which is an even coefficient/observable algebra.

Therefore:

\[
\boxed{
\text{typed triple closure preserves the mask but does not complete an odd Möbius triangle}.
}
\]

A physical \(C_6\) with three odd edges requires an independent typed odd \(I-N\) relation or a Real/groupoid operation that lifts the even linking coefficient into an odd relation.

## 1. The coarse two-spoke TRO

Use the three-dimensional object space with labels \(P,I,N\). Regard \(E_{PI},E_{PN}\) as a row of relations sharing source \(P\). For arbitrary \(x,y,z\in R\), the product \(xy^*\) lies in the one-dimensional left coefficient algebra

\[
RR^*=\mathbb C E_{PP}.
\]

Consequently \(xy^*z\in R\). The symmetrized triple product is therefore in \(R\) as well. This makes \(R\) a rectangular type-I Cartan factor/TRO at the finite-matrix level.

Crucially, \(E_{IN}\notin R\). The triple system preserves the distinction between a relation from the carrier and a coefficient acting among its faces.

## 2. Where the third relationship goes

The right coefficient algebra is

\[
R^*R
=\operatorname{span}\{E_{II},E_{IN},E_{NI},E_{NN}\}
\cong M_2.
\]

It contains

\[
E_{PI}^*E_{PN}=E_{IN},
\qquad
E_{PN}^*E_{PI}=E_{NI}.
\]

Thus the third relationship has not disappeared. It has changed categorical level:

\[
\boxed{
\text{two carrier-to-face relations}
\Longrightarrow
\text{one face-to-face coefficient relation}.
}
\]

This is a precise realization of “one carrier, two faces, three relationships.” The third relationship is present in the linking algebra but is not automatically another physical arrow of the original relation module.

## 3. Why binary Jordan closure produces \(H_3\)

Form the self-adjoint edge operators

\[
X_{PI}=E_{PI}+E_{IP},
\qquad
X_{PN}=E_{PN}+E_{NP}.
\]

Their binary Jordan product is

\[
X_{PI}\circ X_{PN}
=\frac12(E_{IN}+E_{NI}).
\]

Binary closure therefore promotes the linking coefficient into the same self-adjoint observable algebra. Together with populations, this is the previously derived \(H_3(\mathbb R)\) closure and its \(Sp(6,\mathbb R)\) conformal envelope.

| Structure | Location of \(I-N\) | Consequence |
|---|---|---|
| TRO/Jordan triple \(R\) | in \(R^*R\), not \(R\) | mask preserved |
| self-adjoint binary Jordan closure | promoted into the observable space | \(H_3/Sp(6)\) envelope |

## 4. Opposite-anchor typing strengthens the separation

At full resolution, the two spokes do not even share the same carrier state:

\[
D_P=(P,N),
\qquad
M_P=(P,I).
\]

Represent their arrows in disjoint blocks by \(d=E_{D_PD_I}\) and \(m=E_{M_PM_N}\). Then

\[
d^*m=m^*d=0,
\]

and every mixed triple product vanishes. The forbidden cross-sector arrow is not generated.

This proves that opposite-anchor memory and TRO composition implement the same protection at two resolutions:

- typing makes the cross coefficient zero;
- ternary closure prevents coefficient relations from being mistaken for carrier relations.

## 5. The obstruction to the simplest Möbius claim

[1132](1132_binary_Jordan_composition_selects_the_trivial_cover_while_odd_Jordan_triple_recursion_selects_the_Mobius_cover.md) established that a homogeneous cycle of odd relations has Möbius holonomy. The present calculation adds a necessary qualification:

\[
\boxed{
\text{odd triple parity does not imply that two generators produce all three odd edges}.
}
\]

The minimal two-spoke TRO is closed before the \(I-N\) carrier appears. Its internally generated \(I-N\) element is even and belongs to \(R^*R\).

Hence the following proposal is filtered out:

> Start from only the \(P-I\) and \(P-N\) odd relations and expect Jordan-triple closure by itself to generate the third odd Möbius edge.

It does not.

## 6. Surviving Möbius implementations

### 6.1 Independent typed odd edge

Add an \(I-N\) relation as independent physical data, then test all three edges against first order, grading, reality and the null mask. This is viable only if that edge is not the forbidden Dirac-null leakage channel.

### 6.2 Real/groupoid lift

Use \(J\), a groupoid equivalence or a correspondence functor to map the even coefficient \(E_{IN}\in R^*R\) to an odd inter-sheet morphism. This can give a six-step Real cycle without inserting a new scalar into the complex-linear one-form module.

### 6.3 Spectator-mediated lift

The fourth character \(S\) and its real connector may provide an odd path whose effective reduction realizes \(I-N\). This must be checked in the four-character completion rather than assumed in the triangle alone.

## 7. Updated branch filter

| Branch | Result |
|---|---|
| typed TRO preserves null mask | **passes exactly** |
| two odd spokes generate third odd edge by triple closure | **no-go** |
| third relation exists as even linking coefficient | **passes exactly** |
| binary observable closure promotes third relation | **passes; yields coarse \(H_3/Sp(6)\)** |
| independent typed odd \(I-N\) edge | live, physical incidence unresolved |
| \(J\)/groupoid lift of the linking coefficient | live, categorical construction unresolved |
| spectator-mediated odd lift | live, four-character calculation unresolved |

## 8. Stop-everything criteria

**TRO-generation stop:** do not claim that two spoke generators produce a third carrier arrow under ternary closure.

**Level stop:** do not identify \(R^*R\) with \(R\); coefficient relations and carrier relations are different types.

**Mask stop:** any independent odd \(I-N\) edge must be assigned a physical sector and tested against the forbidden Dirac \(P-N\) leakage condition.

**Real-linearity stop:** a \(J\)-lift is anti-linear/Real data, not an ordinary complex-linear represented one-form.

**Positive trigger:** construct a typed functor or four-character path that converts the even linking relation into odd sheet transport without producing a forbidden anchor-mixing scalar.

## 9. Verdict

The typed Jordan-triple language passes its most important protection test but fails the simplest closure claim:

\[
\boxed{
\text{mask preservation: yes; automatic third odd Möbius edge: no}.
}
\]

The programme now has a clean two-level structure:

\[
\boxed{
R\ \text{contains odd carrier relations},
\qquad
R^*R\ \text{contains their even relational coefficients}.
}
\]

The next branch point is whether \(J\), the spectator \(S\), or an independent allowed sector can lift the even \(I-N\) coefficient back into a typed odd relation.

## Corpus position

- [binary/triple grading fork](1132_binary_Jordan_composition_selects_the_trivial_cover_while_odd_Jordan_triple_recursion_selects_the_Mobius_cover.md)
- [two canonical holonomy branches](1131_C3_covariance_and_homogeneous_grading_reduce_eight_holonomies_to_two_canonical_live_branches.md)
- [typed twin \(Spin(2,3)\) wheels](1127_opposite_anchor_typing_splits_the_Sp6_envelope_into_two_local_Spin23_relational_wheels.md)
- [coarse \(H_3/Sp(6)\) closure](1126_two_overlapping_H2R_null_mask_wheels_generate_H3R_and_raise_Spin23_to_Sp6.md)
- [minimal Real-groupoid \(C_6\) construction](1134_a_minimal_Real_groupoid_realizes_the_Mobius_C6_without_a_linear_anchor_mixing_seam.md)

