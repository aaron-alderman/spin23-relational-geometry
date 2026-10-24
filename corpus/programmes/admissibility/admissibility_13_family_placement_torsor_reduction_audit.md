# Family–placement torsor audit: the missing bridge factorizes

**Date:** 24 October 2026  
**Status:** exact finite reduction ladder; physical cross-map remains open  
**Parent:** [Typed A2 tile atlas](admissibility_12_typed_a2_tile_atlas_and_gluing_audit.md)  
**Evidence:** [Machine-readable torsor audit](../../../evidence/data/admissibility-family-placement-torsor-reduction-v1.json)  
**Verifier:** [Finite reduction certificate](../../../verification/admissibility/verify_family_placement_torsor_reduction.mjs)

## Finding

The nearest candidate physical edge in the tile atlas is the exact family-to-placement (A_2) equivalence

\[
\delta_\alpha=-3p_i.
\]

It is not blocked by a continuous unknown. It is blocked by six discrete bijections between

\[
\{e,\mu,\tau\}
\quad\text{and}\quad
\{L_0,L_1,L_2\}.
\]

The corpus already contains substantial local structure, but the audit shows that none of it is yet a cross-carrier identification:

- the simple charged-lepton spectrum canonically labels (P_e,P_\mu,P_\tau), but does not pair any one of them with a placement vertex;
- a nonzero Jarlskog invariant distinguishes a flavour frame from its conjugate, but does not correlate that orientation with the independently defined placement orientation;
- current texture-zero evidence excludes the electron-selected inverted-ordering branch, yet leaves all three family choices open somewhere in the recorded normal/inverted parameter scan;
- one rank-one projector cannot orient itself under a (U(3))-covariant action;
- a second Hermitian tensor supplies a relative variance selector, but one tensor still has three eigenprojector minima and the needed common-space typing and weights are not derived.

Therefore the physically admitted map count is still zero: there are six algebraic candidates and no rule selecting one.

## Exact reduction ladder

The obstruction nevertheless factorizes exactly:

| Admitted cross-carrier datum | Remaining bijections | Residual torsor |
|---|---:|---|
| none | 6 | (S_3) |
| orientation parity correlation | 3 | (C_3) |
| one paired basepoint | 2 | (C_2) |
| orientation correlation plus paired basepoint | 1 | unique |

The first reduction is a parity gate: a physical law must say whether the two cyclic orientations agree or oppose. The second is an incidence gate: a physical coupling must pair one named family ray with one named placement site. Either datum alone leaves a residual ambiguity; together they determine the full intertwiner.

This is the important distinction:

\[
\boxed{
\text{local labels} + \text{local orientation}
\ne
\text{cross-carrier frame identification}.
}
\]

A Jarlskog sign could participate in an orientation-correlation term only if the action contains a placement-odd partner and a typed portal coupling the two. Without that partner, demanding “orientation preserving” is a convention imposed by us. Similarly, choosing (e\leftrightarrow L_0) without a rank-one cross-incidence is merely naming.

## What the first physical edge must contain

The search target has now become small enough to recognize. A successful source-native bridge must supply both:

1. an orientation-sensitive cross scalar or intertwiner, transforming oddly under reflection on both endpoint triangles; and
2. a rank-one cross incidence or coupling that identifies one family projector with one placement vertex.

Equivalently, the desired object is not another copy of the (A_2) metric (C). The metric is already shared and is blind to the six choices. The missing object must carry the odd generator (K) **and** a mark. In the finite hierarchy already found,

\[
C\;\text{leaves }S_3,
\qquad
K\;\text{leaves }C_3,
\qquad
\text{mark}\;\text{leaves }C_2,
\qquad
K+\text{mark}\;\text{leaves the identity}.
\]

So the next corpus search should not ask for another Laplacian-shaped matrix. It should search for a typed, provenance-bearing **oriented marked triangle**: a (K)-odd portal plus one rank-one incidence. That is the minimal data capable of converting the exact algebraic edge into the atlas's first physical edge.

## Frontier status

This is a bounded unknown, not a failed programme. The module identity, local flavour labels, possible CP-odd orientation data and exact torsor counts are filled. The orientation correlation, basepoint correlation and action term binding them are unfilled. The admission boundary is therefore now precise enough to falsify proposed bridges: any proposal lacking either the odd cross-character or the marked incidence cannot choose the map.
