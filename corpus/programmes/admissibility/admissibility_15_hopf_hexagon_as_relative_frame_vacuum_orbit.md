# The marked Hopf hexagon is an exact chart of the relative-frame vacua

**Date:** 24 October 2026  
**Status:** exact discrete equivariance; carrier identity open  
**Parent:** [Relative-frame link](admissibility_14_relative_frame_link_and_spontaneous_selection.md)  
**Evidence:** [Hopf–link equivariance certificate](../../../evidence/data/admissibility-hopf-link-vacuum-equivariance-v1.json)  
**Verifier:** [Six-orbit verifier](../../../verification/admissibility/verify_hopf_link_vacuum_equivariance.mjs)

## Finding

The six marked Hopf phases and the six family-to-placement link vacua have more than the same cardinality. They carry the same explicit six-step orbit.

Let (A) be a family transposition and (B) a placement three-cycle:

\[
A^2=I,
\qquad
B^3=I,
\qquad
ABA=B^{-1}.
\]

Starting from the identity relative frame (X_0=I), define

\[
\boxed{
X_n=A^nX_0(B^T)^n.
}
\]

Because the two operations act on opposite ends of the link, their periods combine rather than compete. The step

\[
X\longmapsto AXB^T
\]

has period six on (X_0), even though neither (S_3) factor contains an element of order six. The resulting (X_0,\ldots,X_5) are exactly the six permutation matrices.

The orbit coordinates are

\[
\boxed{
i=n\bmod3,
\qquad
s=n\bmod2,
\qquad
\det X_n=(-1)^n.
}
\]

These are precisely the placement and sheet coordinates of the existing marked Hopf construction

\[
\phi_n=\frac{n\pi}{3}
\longmapsto
(i,s)=(n\bmod3,n\bmod2).
\]

Thus

\[
\boxed{
\text{marked Hopf phase hexagon}
\cong
\text{relative-frame permutation-vacuum orbit}
}
\]

as a six-state equivariant system.

## The deck half-turn and reflection also match

Three steps leave (n\bmod3) unchanged and flip (n\bmod2). On the link orbit,

\[
X_{n+3}=AX_n.
\]

So the Hopf half-turn/deck flip becomes a family reflection with the placement coordinate held fixed. It exchanges the even and odd permutation classes.

The simultaneous reflection

\[
X\longmapsto AXA^T
\]

sends

\[
X_n\longmapsto X_{-n},
\]

matching phase conjugation (phi_n\mapsto-\phi_n). The cyclic step and this reflection generate the same dihedral action on both hexagons.

## Why the order-six structure was hidden

There is no order-six element inside one (S_3). The six-cycle appears only after the operation is typed as a two-ended transformation:

- order two acts on the family end;
- order three acts on the placement end;
- their commuting left/right actions combine to order six.

This is exactly the kind of information lost when the corpus records only isolated matrices and not their endpoint types. The larger periodicity is relational: it belongs to the link between carriers.

It also gives a concrete instance of the user's matrix-building intuition. The larger structure is not obtained by enlarging one local matrix. It appears when two local transformation orders are composed faithfully on different indices of a link.

## Dynamics

The existing phase potential

\[
V(\phi)=-\kappa\cos6\phi
\]

already has the same six isolated minima. Therefore the scalar phase (\phi) is a one-coordinate parametrization of the permutation-vacuum orbit at its locked points. A transition (phi_n\to\phi_{n+1}) corresponds algebraically to the mixed update (X\to AXB^T).

This does **not** yet prove that continuous motion in (phi) is continuous motion through physical family-placement matrices. Between locked points, the circle and the matrix field have different ambient spaces. What is established is the exact discrete vacuum correspondence and all of its cycle, half-turn and reflection actions.

## Physical admission boundary

The bridge remains algebraic because its generator spends data on both ends:

- choosing (A) chooses which family transposition implements the sheet flip;
- choosing (B) chooses a placement orientation;
- declaring (X\mapsto AXB^T) a physical operation requires a common action or portal;
- identifying the Hopf phase with the link coordinate requires a sourced coupling, not only equivariance.

The next gate is now extremely specific: find a term whose phase winding acts simultaneously as a family transposition and placement cycle, or prove that locality, gauge charge or continuity forbids such a mixed operation. That term would promote the present exact orbit equivalence into a dynamical cross-carrier edge.
