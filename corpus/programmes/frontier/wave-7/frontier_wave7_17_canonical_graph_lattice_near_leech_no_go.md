# Frontier Wave 7.17: The Canonical Graph Lattice Is Near-Leech but Cannot Be Glued to Leech

**Date:** 24 October 2026  
**Status:** exact integral-lattice construction and fixed-form no-go

## Question

Wave 7.16 isolated the 24 non-`shares_action_not_carrier` relations as a distinguished edge carrier. Dimension alone does not make that carrier the Leech lattice. The next test is whether the graph itself supplies a canonical integral Gram form with the defining Leech properties.

## The incidence construction

Let \(B\) be the directed incidence matrix of the 24-edge backbone. It has 16 rows and 24 columns. Reversing an edge multiplies the corresponding column by \(-1\), so constructions from \(B^TB\) are invariant up to an integral diagonal change of basis.

The raw edge metric \(I\) gives the odd cubic lattice \(\mathbb Z^{24}\). The incidence form \(B^TB\) is even but singular because the backbone has cycle rank ten.

The smallest positive integral regularization that is automatically even is

\[
\boxed{
G_{\rm graph}=2I_{24}+B^TB.
}
\]

This definition uses only the declared 3+24 relation split and graph incidence. It introduces no Leech basis or fitted lattice vectors.

## Exact properties

For \(x\in\mathbb Z^{24}\),

\[
q(x)=x^TG_{\rm graph}x
=2\lVert x\rVert^2+\lVert Bx\rVert^2.
\]

Therefore \(G_{\rm graph}\) is positive definite. Its diagonal entries are four and it is integral symmetric, so \(q(x)\) is even.

For every nonzero integral \(x\), either:

- \(\lVert x\rVert^2=1\), in which case \(x=\pm e_j\) and \(\lVert Bx\rVert^2=2\), giving \(q(x)=4\); or
- \(\lVert x\rVert^2\ge2\), giving \(q(x)\ge4\).

Hence

\[
\boxed{
\min_{x\ne0}q(x)=4.
}
\]

The graph has therefore generated a rank-24, integral, positive-definite, even, rootless lattice of minimum norm four. Those are strikingly Leech-like properties.

## The determinant obstruction

Exact fraction-free elimination gives

\[
\det G_{\rm graph}
=4{,}950{,}507{,}216{,}896
=2^{13}\cdot604{,}309{,}963.
\]

In particular, the determinant is not one and is not even a perfect square.

The Leech lattice is unimodular, so its determinant is one. More strongly, suppose an integral unimodular overlattice \(L'\) contained the graph lattice \(L_{\rm graph}\) at finite index \(k\). Then

\[
\det L'
=\frac{\det L_{\rm graph}}{k^2}.
\]

Setting \(\det L'=1\) would require

\[
k^2=\det L_{\rm graph}.
\]

But the 2-adic valuation of the determinant is 13, which is odd. No such integer \(k\) exists.

Therefore

\[
\boxed{
\text{no integral finite-index gluing of the fixed graph form can produce a unimodular lattice.}
}
\]

In particular, ordinary Golay gluing cannot turn \((\mathbb Z^{24},G_{\rm graph})\) into the Leech lattice while preserving this bilinear form.

## Why the near-hit is informative

The construction passes four important gates without importing exceptional arithmetic:

1. rank 24;
2. positive definiteness;
3. evenness and absence of roots;
4. minimum norm four.

It fails the arithmetic self-duality gate. This localizes the missing information: graph incidence naturally supplies repulsion from norm-two roots, but not the discriminant cancellation needed for unimodularity.

The failure is stronger than “we have not yet found the right glue.” At fixed \(G_{\rm graph}\), no integral glue can work.

## Canonical-coordinate audit

The typed directed 16-node graph is rigid already at the level of local signatures: every node has a distinct vector of incoming and outgoing counts across the six relation types. Hence every automorphism preserving direction and relation type fixes every node, and consequently every relation.

This removes one possible ambiguity—the graph does distinguish its edge coordinates. It does not create a Leech form. Rigidity and unimodularity are different requirements.

## What remains open

There are now only three honest routes:

1. **Change the metric:** derive a nonlocal integral Gram form from path composition, detector overlap, or the existing Golay sewing tensor rather than from incidence alone.
2. **Change the carrier:** pass to a quotient, extension, discriminant module or code-labelled cover whose rank-24 integral form is unimodular.
3. **Keep the separation:** regard the quotient-scar graph and the Leech/Jordan lattice as different carriers connected only by a typed map into common observables.

The first route is the intended next test. It must derive its off-diagonal pairings from corpus operations. Selecting an arbitrary isometry from a 24-dimensional real edge space to \(\mathbb O^3\) would not count.

## Relation to the exceptional 27

This result sharpens the full picture:

\[
J_3(\mathbb O)=\mathbb R^3\oplus\mathbb O^3
\quad\text{contains}\quad
\mathbb R^3\oplus\Lambda_{24},
\]

while the graph supplies

\[
C_1=S_3\oplus B_{24}
\]

and a canonical near-Leech form on \(B_{24}\). The numerical and carrier-level parallels are now substantial, but the discriminant proves that the incidence metric is not the missing exceptional intertwiner.

## Verdict

The relation graph comes closer to Leech structure than dimension counting suggested:

> Its canonical even incidence regularization is a rootless rank-24 lattice of minimum norm four.

But the same exact calculation gives a terminal result for that metric:

> Its nonsquare determinant prevents every integral finite-index unimodular completion, so it cannot be glued into the Leech lattice without replacing the graph-derived form.

The next frontier is therefore a source-derived nonlocal pairing, not more manipulation of the incidence Gram matrix.

