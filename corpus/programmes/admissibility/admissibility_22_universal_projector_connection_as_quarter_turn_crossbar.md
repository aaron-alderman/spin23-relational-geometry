# The universal projector connection is the quarter-turn crossbar

**Date:** 24 October 2026  
**Status:** exact kinematic identification; common physical projector remains open  
**Parent:** [Quarter-turn, Wick, Goldstone cloud and open closure](admissibility_21_quarter_turn_wick_goldstone_cloud_and_open_closure.md)  
**Evidence:** [Universal-projector quarter-turn ledger](../../../evidence/data/admissibility-universal-projector-quarter-turn-crossbar-v1.json)  
**Verifier:** [Projector-connection holonomy certificate](../../../verification/admissibility/verify_universal_projector_quarter_turn_crossbar.mjs)

## Result

The missing relation between the quarter-turn operator and the earlier Jordan--Shiab branch is exact at the kinematic level.

Let \(P(t)\) be a differentiable family of orthogonal projectors. Differentiating \(P^2=P\) gives

\[
P\dot P P=0,
\qquad
\dot P=P\dot P+\dot P P.
\]

Define the horizontal skew generator

\[
\boxed{
\Omega_P=[\dot P,P].
}
\]

Then

\[
\boxed{
\dot P=[\Omega_P,P].
}
\]

Equivalently, the universal projector connection used in the rank-split corpus is

\[
C_P=[P,dP]=-\Omega_P\,dt,
\]

and it preserves the moving split:

\[
dP+[C_P,P]=0.
\]

Thus \(dP\) is the cross-Peirce velocity, while \([dP,P]\) is the canonical horizontal rotation that transports the two rails.

## Exact two-dimensional quarter-turn

Take

\[
P_0=
\begin{pmatrix}1&0\\0&0\end{pmatrix},
\qquad
J=
\begin{pmatrix}0&-1\\1&0\end{pmatrix},
\qquad
R(t)=e^{tJ}.
\]

For

\[
P(t)=R(t)P_0R(t)^T,
\]

direct calculation gives

\[
\dot P=[J,P],
\qquad
[\dot P,P]=J,
\qquad
C_P=[P,\dot P]\,dt=-J\,dt.
\]

The parallel-transport equation

\[
\dot U+C_P(\partial_t)U=0,
\qquad U(0)=I,
\]

therefore has solution

\[
U(t)=e^{tJ}=R(t).
\]

Consequently,

\[
\boxed{
U(\pi/2)=J,
\qquad
U(\pi)=-I,
\qquad
U(2\pi)=I.
}
\]

The quarter-turn is not merely adjacent to projector transport. It **is its holonomy** on the active two-plane.

## Projector closure versus coherent closure

The projector is a line rather than an oriented vector, so

\[
P(t+\pi)=P(t).
\]

But an oriented frame vector \(n(t)=R(t)e_1\) obeys

\[
n(t+\pi)=-n(t).
\]

Thus a path closed in projective space returns with central sign on the coherent lift. This is the same root/projector distinction already established independently for the weighted Furey root:

\[
\text{projector period }\pi,
\qquad
\text{coherent-frame period }2\pi.
\]

It also supplies the local geometric grammar behind the later transport tower. Combining an order-three placement cycle with the order-four coherent quarter-turn gives an order-twelve step; forgetting the central sign gives order six; forgetting the sheet gives order three:

\[
C_{12}\twoheadrightarrow C_6\twoheadrightarrow C_3.
\]

## The two rails and the crossbar

The tower can now be written as two rails joined by the universal connection:

\[
\begin{array}{ccc}
\text{projector/adjoint rail}
&\xleftrightarrow{\quad C_P=[P,dP]\quad}&
\text{frame/fundamental rail}
\\[1mm]
P,\;dP,\;P\,dP\wedge dP
&&
n,\;U(t),\;\text{central phase}
\\
\text{projective closure}
&&
\text{coherent holonomy}.
\end{array}
\]

The crossbar transports the selected subspace while preserving the distinction between:

- data visible to the projector and adjoint geometry;
- sign or central-phase data visible only to the lifted frame or fundamental module.

This is precisely the constrained operation sought by the earlier Jordan--Shiab analysis. It is closer to a universal Grassmann/Gauss--Codazzi connection than to an arbitrary bespoke contraction.

## Rank-three continuation and the independent phase rail

For the family projector \(P\in H_3(\mathbb C)\), the same formula

\[
C_P=[P,dP]
\]

transports the split \(L\oplus Q\). The corpus then adds the unique determinant-neutral compact line connection:

\[
\boxed{
\nabla=d+[P,dP]+ia(I-3P).
}
\]

The two terms have distinct jobs:

1. \([P,dP]\) transports the moving projector and supplies the quarter-turn-type horizontal crossbar;
2. \(ia(I-3P)\) supplies independent compact holonomies and retains the faithful central \(\mathbb Z_3\) action on the fundamental module.

The quadratic return

\[
-i\operatorname{Tr}\!\left((I-3P)\,DP\wedge DP\right)
=3i\operatorname{Tr}\!\left(P\,DP\wedge DP\right)
\]

then gives the exact local factor three. The independent \(a\)-connection supplies the flat sectors that a purely composite Berry connection cannot.

## The real-locus bridge and its precise obstruction

There is a natural mathematical nesting once an ambient real structure on the family triplet has been chosen:

\[
\boxed{
\mathbb{RP}^2\hookrightarrow\mathbb{CP}^2.
}
\]

A real line in \(\mathbb R^3\) becomes the same line inside \(\mathbb C^3\), and a real rank-one projector is also a complex Hermitian rank-one projector. The universal connection \([P,dP]\) on the complex projector orbit restricts to the real skew connection on this fixed locus. Therefore the selector and family constructions use one functorial projector-transport formula.

But two qualifications are decisive.

First, the selector Bloch-normal triplet and the family triplet are distinct physical vector spaces. Identifying them requires a determinant-, cone-, selector-, dynamics-, gauge- and normalization-compatible intertwiner. The corpus's three-triplet audit proves that abstract isomorphisms exist but retain an \(SO(2)\)/\(SL(2,\mathbb R)\) torsor. The inclusion above becomes a cross-carrier statement only after that torsor is physically fixed.

Second, at a real projector,

\[
T\mathbb{CP}^2\big|_{\mathbb{RP}^2}
=T\mathbb{RP}^2\oplus iT\mathbb{RP}^2.
\]

The Kähler complex structure of \(\mathbb{CP}^2\) maps the real tangent plane to its normal plane. It is therefore not automatically the selector quarter-turn acting *within* \(T\mathbb{RP}^2\). Equating them requires additional metric, orientation and carrier data. This prevents a false closure by notation while leaving a finite intertwiner problem.

## What has and has not closed

Closed exactly:

- the universal formula reconstructing horizontal motion from \(P\) and \(dP\);
- the identification of its active two-plane holonomy with \(J\);
- the projective/coherent double-period relation;
- the compatible rank-three connection carrying both projector transport and an independent determinant-neutral phase;
- the factor-three projector curvature identity;
- the real-locus nesting \(\mathbb{RP}^2\subset\mathbb{CP}^2\) after a real structure is selected.

Still open:

- whether the \(\mathbb{RP}^2\) real-form selector and the \(\mathbb{CP}^2\) family projector are images of one physical field or connection;
- whether their active two-planes are related by a gauge-, Lorentz- and charge-compatible intertwiner;
- whether the in-plane selector quarter-turn is transported to the family geometry without being confused with the ambient Kähler complex structure, which points normal to the real locus;
- whether one action produces the selector potential, the Gaussian response cloud, the independent compact connection and the real-interface sewing;
- whether the resulting quantum theory retains the required defect gap and physical observable algebra.

The correct present statement is therefore

\[
\boxed{
\text{quarter-turn}
=
\text{universal-projector holonomy on the active plane}.
}
\]

This is a kinematic theorem. The assertion that every appearance uses one microscopic projector remains a physical frontier.

