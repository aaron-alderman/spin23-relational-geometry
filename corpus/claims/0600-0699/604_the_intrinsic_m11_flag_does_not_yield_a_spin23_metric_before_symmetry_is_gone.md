# The Intrinsic \(M_{11}\) Flag Does Not Yield a \(Spin(2,3)\) Metric Before Symmetry Is Gone

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B13 and B14  
**Claim status:** exact invariant-form theorem for the canonical sharply four-transitive flag  
**Certificate:** [compute_golay_trilinear_stabilizer.mjs](../../../verification/compute/compute_golay_trilinear_stabilizer.mjs)

## Executive result

The intrinsic eleven-point orbit of the Golay sewing tensor supplies a canonical symmetry-breaking flag. Fixing its first \(k\) ordered points gives the sharply four-transitive stabilizer chain

\[
M_{11}\supset G_1\supset G_2\supset G_3\supset G_4
\]

with orders

\[
7920,\quad720,\quad72,\quad8,\quad1.
\]

The corresponding spaces of invariant symmetric bilinear forms on the five-dimensional Golay carrier have dimensions

\[
0,\quad0,\quad1,\quad3,\quad15,
\]

and maximum matrix ranks

\[
0,\quad0,\quad1,\quad3,\quad5.
\]

Thus the canonical point-selection ladder does **not** produce a nondegenerate five-dimensional metric while any symmetry remains:

\[
\boxed{
\text{full rank five first becomes available at }G_4=1.
}
\]

The intrinsic \(M_{11}\) flag therefore cannot by itself explain the emergence of a \(Spin(2,3)\) metric with a nontrivial residual finite symmetry.

## 1. Exact ladder

Let \(\Omega\) be the distinguished eleven-point projective orbit reconstructed from \(\tau_\mu\). For distinct ordered points \(p_1,\ldots,p_k\), define

\[
G_k=\operatorname{Stab}_{M_{11}}(p_1,\ldots,p_k).
\]

Sharp four-transitivity gives

\[
|G_k|=\frac{7920}{11\cdot10\cdots(11-k)}
\]

for \(k\le4\). The invariant-form calculation gives:

\[
\begin{array}{c|c|c|c}
k&|G_k|&
\dim\operatorname{Sym}^2(S^*)^{G_k}&
\max\operatorname{rank}B\\ \hline
0&7920&0&0\\
1&720&0&0\\
2&72&1&1\\
3&8&3&3\\
4&1&15&5
\end{array}
\]

Every entry is computed over \(\mathbb F_3\). For invariant spaces of dimension at most three, every linear combination is enumerated to establish the maximum rank.

## 2. The uncomfortable conclusion

Selecting one intrinsic point does not produce even a degenerate invariant metric. Selecting two produces only a rank-one form. Selecting three raises the maximum rank to three. A nondegenerate rank-five form appears only after four ordered points are fixed, but the sharply four-transitive action then has trivial pointwise stabilizer.

So the appealing narrative

\[
\text{choose a few canonical Mathieu points}
\Longrightarrow
\text{retain a finite remnant and obtain the \(Spin(2,3)\) metric}
\]

fails along the most canonical flag.

This is not a no-go for every subgroup of \(M_{11}\). It is a complete no-go for the ordered-point stabilizer chain singled out by the intrinsic eleven-point orbit.

## 3. Relation to “one carrier, two faces, three relationships”

The ranks \(0,1,3,5\) are suggestive, but they must not be promoted into physics by numerology. What is exact is only:

- two selected projective points allow one invariant quadratic direction;
- three selected points allow forms of rank at most three;
- four selected points allow arbitrary forms because no symmetry remains.

If the two-face/three-relation language is to use this ladder, it must identify the selected points and the bilinear form through an independent construction. The rank sequence alone is not a derivation.

## 4. Where a metric can still emerge

The characteristic-zero integral lift already carries a nondegenerate weighted ambient form of split type. It obtains that form by adding data absent from \((S,\tau_\mu)\):

- an integral coefficient vector \(\mu\), not merely its uniform residue modulo three;
- a maximal-isotropic rational lift;
- a null compensator;
- a choice of polarization;
- the global linking row.

These data break or leave the intrinsic \(M_{11}\) setting. The metric should therefore be sought in the lift-and-polarize operation, not in a point stabilizer of the pure ternary tensor.

## 5. Next exact test

The next subgroup question should not enumerate arbitrary subgroups without guidance. It should compute the common stabilizer of the actual arithmetic data:

\[
(\tau_\mu,\ \text{coefficient partition},\ \text{integral row space},\ \text{null compensator},\ K).
\]

Then one can ask whether its characteristic-zero action preserves a five-dimensional form of signature \((2,3)\), or whether the relevant split form remains the ten-dimensional \(H^5\) ambient metric.

This distinguishes a source-derived symmetry reduction from an arbitrary choice of four Mathieu points.

## 6. Stop-everything boundary

Within the canonical intrinsic \(M_{11}\) point flag, no nondegenerate five-dimensional invariant metric exists before the residual group becomes trivial.

Therefore a \(Spin(2,3)\) metric cannot be claimed to emerge merely by marking one, two or three points of the tensor's eleven-point projective orbit.

## 7. Reproduction

Run:

    node scripts\compute_golay_trilinear_stabilizer.mjs

Required flag output:

    (k, order, invariant dimension, maximum rank)
    (1, 720, 0, 0)
    (2, 72, 1, 1)
    (3, 8, 3, 3)
    (4, 1, 15, 5)
