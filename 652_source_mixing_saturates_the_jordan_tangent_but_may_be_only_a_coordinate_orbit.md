# Source Mixing Saturates the Jordan Tangent but May Be Only a Coordinate Orbit

**Date:** 17 October 2026  
**Branches:** B04, B05, B07, B08, B11 and the relational-carrier/Jordan-triple branch  
**Claim status:** exact congruence-orbit classification; operational source-frame selection remains open  
**Certificate:** [classify_source_mixing_tangent_as_coordinate_orbit.mjs](scripts/classify_source_mixing_tangent_as_coordinate_orbit.mjs)

## Executive result

For every positive relational Gram matrix \(G\), an infinitesimal mixing of its two sources acts as

\[
\delta_XG=XG+GX^T,
\qquad X\in\mathfrak{gl}(2,\mathbb R).
\]

At

\[
G=
\begin{pmatrix}231&9\\9&48\end{pmatrix},
\]

this map has rank three. Its kernel is one-dimensional \(\mathfrak o(G)\). Therefore the congruence orbit is

\[
GL(2,\mathbb R)/O(G),
\]

which is the full three-dimensional positive cone.

This satisfies the rank-three tangent test algebraically. But if \(GL(2)\) merely relabels or renormalizes the two external sources, the entire orbit represents one bilinear form in different coordinates. It is not dynamical evidence for physical \(Sp(4,\mathbb R)\).

The response gate must therefore be evaluated in a fixed operational source frame.

## 1. Exact tangent rank

Write

\[
X=\begin{pmatrix}a&b\\c&d\end{pmatrix}.
\]

In the symmetric coordinates \((\delta G_{11},\delta G_{12},\delta G_{22})\), the map \(X\mapsto XG+GX^T\) has coefficient matrix

\[
\begin{pmatrix}
462&18&0&0\\
9&48&231&9\\
0&0&18&96
\end{pmatrix}.
\]

Its exact rank is three.

The stabilizer equation

\[
XG+GX^T=0
\]

has dimension one. A representative is

\[
X=\Omega G^{-1},
\qquad
\Omega=\begin{pmatrix}0&1\\-1&0\end{pmatrix}.
\]

Thus \(4-1=3\) congruence directions move the displayed matrix.

## 2. Why this can be a false positive

The two operators

\[
(J_\lambda,J_{B-L})
\]

span a two-dimensional source space. Replacing them by

\[
\begin{pmatrix}J'_1\\J'_2\end{pmatrix}
=A
\begin{pmatrix}J_\lambda\\J_{B-L}\end{pmatrix}
\]

changes matrix components by

\[
G\mapsto AGA^T.
\]

If \(A\) is only a change of source coordinates, then all positive matrices lie on one reparameterization orbit. The numerical determinant, off-diagonal entry and correlation coefficient depend on that convention.

The abstract invariant is only the positive bilinear form on the labelled source space, not a preferred matrix point.

## 3. When source mixing becomes physical

Mixing is physical when the source frame is fixed independently, for example by:

- \(J_{B-L}\) having a Ward-normalized conserved charge;
- \(J_\lambda\) having an intrinsic frame-operator normalization;
- separate external probes coupling to the two operators with calibrated units;
- a microscopic action fixing their coefficients;
- a fixed renormalization prescription transported across frequency.

Once these conditions hold, a frequency- or coupling-dependent matrix \(G(\omega)\) cannot be simplified by an arbitrary \(\omega\)-dependent \(GL(2)\) transformation without changing the experiment.

## 4. Strengthened response-family gate

The earlier condition

\[
\dim\operatorname{span}\{G,\partial_\alpha G\}=3
\]

is necessary but not sufficient. The strengthened test is:

1. define and normalize the two source operators independently of the scanned parameter;
2. allow only one fixed change of basis, not a parameter-dependent one;
3. compute \(G(u)\) in that transported frame;
4. test whether its tangent span is three-dimensional;
5. test whether the induced TKK transformations act on physical response data rather than source notation.

## 5. Connection and holonomy formulation

A family of source frames has a \(GL(2)\) connection. Parameter-dependent whitening can locally set

\[
G(u)\mapsto I,
\]

but transfers the information into the connection and its holonomy. A nontrivial loop observable could therefore preserve physical content even when every individual Gram matrix is locally whitened.

This gives the earlier “looped carrier with one twist” intuition a disciplined possible location: not in one Gram point, but in the transport of its source frame.

No nontrivial holonomy has yet been derived for the incidence/\(B-L\) family.

## 6. Stop-everything criteria

Stop interpreting a rank-three congruence orbit as dynamical Jordan generation if:

1. the three directions arise only from changing source basis;
2. source normalization is unconstrained;
3. an arbitrary parameter-dependent whitening is allowed;
4. no connection, holonomy or fixed-frame variation remains after quotienting;
5. TKK generators act only on bookkeeping labels.

## 7. Next gates

1. Derive an intrinsic normalization for the incidence source.
2. Transport the \((J_\lambda,J_{B-L})\) frame across frequency and symmetry-breaking thresholds.
3. Compute whether the fixed-frame Gram family has rank-three tangent span.
4. Test for nontrivial frame holonomy around a multi-parameter loop.
5. Only then interpret the ambient TKK algebra as a physical response symmetry.

## Reproducibility

```powershell
node scripts\classify_source_mixing_tangent_as_coordinate_orbit.mjs
```
