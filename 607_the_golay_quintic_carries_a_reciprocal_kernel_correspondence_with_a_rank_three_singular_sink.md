# The Golay Quintic Carries a Reciprocal Kernel Correspondence with a Rank-Three Singular Sink

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B08, B09, B10, B12, B13 and B14  
**Claim status:** exact structural theorem plus complete \(PG(4,9)\) enumeration; physical null-boundary interpretation remains conjectural  
**Certificate:** [analyze_golay_determinant_quintic_over_f9.mjs](scripts/analyze_golay_determinant_quintic_over_f9.mjs)

## Executive result

The Coxeter-cap involution does not extend to all projective points after scalar extension, but a genuine reciprocal kernel correspondence survives on the determinantal quintic

\[
\mathcal D=\{[s]:\det B_s=0\}.
\]

For a rank-four point \(s\), let \(k\) span \(\ker B_s\). Symmetry of the trilinear tensor gives

\[
B_s(k,z)=\tau_\mu(s,k,z)=\tau_\mu(k,s,z)=B_k(s,z)=0.
\]

Hence \(s\in\ker B_k\), so \(B_k\) is also singular. If \(B_k\) has rank four, its kernel is exactly \([s]\), and therefore

\[
\boxed{\kappa^2([s])=[s].}
\]

This reciprocity is field-independent on the locus where both middle-action forms have corank one.

The complete \(\mathbb F_9\) enumeration shows how it fails at singular targets:

\[
\begin{array}{c|c}
\operatorname{rank}B_s&\#\text{ points in }PG(4,9)\\ \hline
5&5940\\
4&1331\\
3&110
\end{array}
\]

Thus \(\mathcal D(\mathbb F_9)\) has \(1441\) points. Of its 1331 rank-four points:

- 341 form a closed reciprocal locus: eleven fixed points and 165 two-cycles;
- 990 map to the 110 rank-three points;
- every rank-three point receives exactly nine rank-four preimages.

The correct extension is therefore a partially involutive determinantal correspondence with a singular sink, not a global inverse.

## 1. Structural reciprocity

Define

\[
B_s(x,z)=\tau_\mu(s,x,z).
\]

Suppose \(\operatorname{rank}B_s=4\) and \(B_s(k,-)=0\). Full symmetry of \(\tau_\mu\) implies

\[
B_k(s,-)=B_s(k,-)=0.
\]

Therefore:

1. \(B_k\) is singular;
2. the kernel map sends the rank-four locus into \(\mathcal D\);
3. if \(B_k\) also has rank four, its kernel line is \([s]\);
4. the kernel map is an involution on the open reciprocal locus.

No finite enumeration is needed for this implication. It is an exact consequence of the relational symmetry among the three tensor slots.

This is the strongest rigorous Jordan-triple-like statement currently available in the code branch:

\[
\boxed{
\text{outer/middle exchange makes the null relation reciprocal}.
}
\]

## 2. Complete \(PG(4,9)\) census

The projective space contains

\[
|PG(4,9)|=\frac{9^5-1}{9-1}=7381
\]

points. Exact row reduction over

\[
\mathbb F_9=\mathbb F_3[u]/(u^2+1)
\]

gives:

\[
5940+1331+110=7381.
\]

There are no rank-zero, rank-one or rank-two projective points. The determinant quintic contains

\[
1331+110=1441
\]

\(\mathbb F_9\)-rational points.

The 110 rank-three points are precisely the finite-field rank stratum at which the kernel ceases to be a unique projective point.

## 3. Closed reciprocal locus

Among the rank-four points, 341 have rank-four images. Structural reciprocity then forces an involution.

Its cycle structure is

\[
1^{11}2^{165}.
\]

The eleven fixed points are the same \(\mathbb F_3\)-rational Coxeter-cap points found previously. The additional 330 points form 165 extension-field pairs.

The original \(PG(4,3)\) involution

\[
1^{11}2^{55}
\]

is therefore a rational subconfiguration of a larger reciprocal locus, not an isolated numerical accident.

## 4. Collapse to the rank-three locus

The other 990 rank-four points map to rank-three points. Exact preimage counting gives

\[
990=110\cdot9.
\]

Every rank-three point has exactly nine rank-four preimages.

At a rank-three point the kernel is two-dimensional, so projectivization gives a line rather than a point. The single-valued kernel map must stop there unless an additional line selector is supplied.

This produces a precise branching structure:

\[
\text{rank five}
\quad\text{outside the correspondence},
\]

\[
\text{rank four}
\quad\text{unique null relationship},
\]

\[
\text{rank three}
\quad\text{two-dimensional ambiguity/singular junction}.
\]

## 5. Determinantal singularity

For a determinant hypersurface, the first derivatives are cofactors. When a \(5\times5\) matrix has rank at most three, all \(4\times4\) cofactors vanish.

Thus the rank-three stratum is naturally contained in the singular locus of \(\mathcal D\). The enumeration's 110-point sink is not an arbitrary failure of the algorithm; it is where the determinantal hypersurface itself loses a unique normal/kernel direction.

A full scheme-theoretic singular-locus proof remains a separate algebraic-geometry task, because the matrix is a special five-dimensional linear system rather than the universal symmetric matrix. But the rank criterion establishes the inclusion exactly.

## 6. Relation to Jordan composition

The correspondence now has a clean three-stage form:

\[
s
\longmapsto
B_s=\tau_\mu(s,-,-)
\longmapsto
\ker B_s.
\]

On the reciprocal rank-four locus,

\[
s\leftrightarrow k
\qquad\text{because}\qquad
\tau_\mu(s,k,-)=0.
\]

This is a genuine relation defined symmetrically between two carriers. It resembles a Jordan-pair or TRO incidence more closely than an ordinary multiplication.

But it still differs from a Jordan inverse:

- it is defined only on a determinant-zero locus;
- generic rank-five points have no kernel;
- rank-three points have a kernel line family rather than a unique partner;
- no quadratic norm or \(Spin(2,3)\) metric has appeared;
- the quintic degree and characteristic-three origin remain essential.

The appropriate comparison target is therefore a **null-incidence correspondence** in a Jordan pair, not the inverse map on an entire Jordan algebra.

## 7. Causal/null-boundary interpretation

There is a disciplined version of the proposed \(ds^2=0\) intuition:

- invertible middle actions are bulk points with no null carrier;
- the determinant quintic is the null-response boundary;
- rank-four points carry one unique null relational channel;
- rank-three points are singular junctions with a projective line of null channels.

This is mathematically exact for the finite determinantal system.

It is not yet a spacetime light cone. The hypersurface is quintic, no Lorentzian metric has been derived, and \(PG(4,9)\) is not physical spacetime. A physical causal interpretation requires a functor to the characteristic-zero \(H_2(\mathbb R)\) response cone.

## 8. Stop-everything boundary and positive result

The global-Jordan-inverse claim remains false.

The stronger negative claim that the finite involution has no algebraic extension is also too pessimistic. What survives is:

\[
\boxed{
\text{a field-independent reciprocal kernel correspondence on the corank-one determinantal locus}.
}
\]

Its obstruction is localized exactly at the rank-three singular stratum.

## 9. Next exact branches

1. Compute the scheme-theoretic singular locus of \(D=0\) and test whether it is exactly the rank-at-most-three locus.
2. Determine the \(M_{11}\)-orbit decomposition of the 110 rank-three and 1331 rank-four \(\mathbb F_9\)-points.
3. Interpret the nine-to-one fibers using projective lines in the two-dimensional kernels.
4. Lift the incidence equation \(\tau_\mu(s,k,-)=0\) integrally and over \(\mathbb R\).
5. Compare this incidence variety with null pairs in the \(H_2(\mathbb R)\) Jordan pair and with the two-face doubling linker.

## 10. Reproduction

Run:

    node scripts\analyze_golay_determinant_quintic_over_f9.mjs

Required outputs:

    projectivePoints: 7381
    rankCounts: {3:110,4:1331,5:5940}
    quinticRationalPoints: 1441
    mapsToLowerRank: 990
    squaresToIdentity: 341
    fixedPoints: 11
    twoCycles: 165
    lowerRankImagePoints: 110
    lowerRankPreimageDistribution: {9:110}
