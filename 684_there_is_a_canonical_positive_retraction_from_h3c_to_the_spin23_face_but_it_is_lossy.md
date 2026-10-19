# There Is a Canonical Positive Retraction from \(H_3(\mathbb C)\) to the \(Spin(2,3)\) Face, but It Is Lossy

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B07, B08, B11 and the carrier-selection branch  
**Claim status:** exact positive Jordan-module retraction; physical implementation remains open  
**Certificate:** [verify_positive_peirce_conjugation_retraction_h3c_to_h2r.mjs](scripts/verify_positive_peirce_conjugation_retraction_h3c_to_h2r.mjs)

## Executive result

Let

\[
e=\operatorname{diag}(1,1,0)
\]

select the rank-two Peirce corner of \(H_3(\mathbb C)\). Define

\[
\boxed{
\mathcal E(X)
=
\operatorname{Re}(eXe),
}
\]

embedded back into the upper-left corner.

Then

\[
\mathcal E:
H_3(\mathbb C)\longrightarrow H_2(\mathbb R)
\]

is:

- positive;
- idempotent;
- surjective on the positive \(H_2(\mathbb R)\) cone;
- compatible with multiplication by selected real-corner observables;
- compatible with the selected Jordan triple.

For \(A,C\in H_2(\mathbb R)\),

\[
\boxed{
\mathcal E(A\circ X)=A\circ\mathcal E(X),
}
\]

and

\[
\boxed{
\mathcal E(\{A,X,C\})
=\{A,\mathcal E(X),C\}.
}
\]

Thus a canonical mathematical selector onto the \(Spin(2,3)\) face exists.

It is necessarily lossy: it annihilates the third positive face and removes the imaginary corner direction.

## 1. Two-stage construction

The map factors into:

1. Peirce compression,
   \[
   X\mapsto eXe\in H_2(\mathbb C);
   \]
2. conjugation averaging,
   \[
   Y\mapsto\frac12(Y+\bar Y)\in H_2(\mathbb R).
   \]

The first stage is a completely positive matrix compression. The second is the positive projection onto the fixed points of complex conjugation.

For a positive Hermitian corner

\[
Y=
\begin{pmatrix}
a&z\\
\bar z&b
\end{pmatrix}
\succeq0,
\]

the real projection is

\[
\operatorname{Re}Y=
\begin{pmatrix}
a&\operatorname{Re}z\\
\operatorname{Re}z&b
\end{pmatrix}.
\]

Its determinant satisfies

\[
ab-(\operatorname{Re}z)^2
\ge
ab-|z|^2
\ge0,
\]

so positivity is preserved.

## 2. Exact discarded decomposition

Relative to the projection \(e\), the real vector space \(H_3(\mathbb C)\) decomposes as

\[
\boxed{
9=3+1+4+1.
}
\]

The components are:

| Component | Real dimension | Fate under \(\mathcal E\) |
|---|---:|---|
| \(H_2(\mathbb R)\) selected corner | 3 | retained |
| imaginary off-diagonal corner direction | 1 | conjugation-decohered |
| Peirce \(1/2\) links to the third face | 4 | removed by compression |
| third diagonal face | 1 | removed by compression |

The kernel therefore has real dimension six.

## 3. Why the map is not lossless

The positive state

\[
X_3=\operatorname{diag}(0,0,1)
\]

satisfies

\[
\mathcal E(X_3)=0.
\]

Therefore \(\mathcal E\) is not faithful. It also obeys

\[
\mathcal E(I_3)=e\ne I_3,
\]

so it is not globally unital, and it loses the population of the third face:

\[
\operatorname{tr}\mathcal E(X)
=\operatorname{tr}(eX)
\le\operatorname{tr}X.
\]

A normalized state map would require

\[
X\mapsto
\frac{\mathcal E(X)}{\operatorname{tr}(eX)},
\]

which is nonlinear and corresponds to conditioning or postselection on support in the selected face.

## 4. Physical interpretations

The selector could represent:

1. a boundary compression that makes the third face inaccessible;
2. a superselection sector with no transitions through the Peirce \(1/2\) links;
3. energetic decoupling followed by a low-energy projection;
4. measurement/postselection on the rank-two face;
5. decoherence under the conjugation involution.

Only the first three could plausibly yield an approximately deterministic low-energy theory. Postselection alone does not explain why observed physics universally occupies the selected face.

## 5. Selector potential

The exact decomposition suggests the positive penalty

\[
V_{\rm sel}(X)
=\kappa_{1/2}\|X_{1/2}\|^2
+\kappa_0\|X_0\|^2
+\kappa_{\rm im}\|\operatorname{Im}X_{12}\|^2.
\]

For positive coefficients, its zero locus is precisely the real rank-two corner.

This is a valid candidate potential, not a derived action. A physical model must explain the coefficients, covariance, radiative stability and why the selector acts on response data rather than arbitrarily chosen coordinates.

## 6. Relation to stress--energy and boundary language

The Peirce compression has the correct mathematical form for a boundary-accessible observable algebra: retain the ports accessible to the screen and integrate out or forbid the third face.

Conjugation averaging has the correct form for reciprocal real response.

This makes the compound selector a credible target for:

- a boundary conditional expectation;
- an observer-accessible stress-response compression;
- a Furey exchange/conjugation fixed sector.

No such physical derivation has yet been supplied.

## 7. Stop-everything criteria

Stop calling \(\mathcal E\) a fundamental deterministic reduction if:

1. physical states can occupy the third face with finite probability;
2. Peirce \(1/2\) links are dynamically generated;
3. normalization requires uncontrolled postselection;
4. conjugation averaging erases observed CP data in the internal sector;
5. no action or operational restriction selects the projection \(e\).

## 8. Next gates

1. Construct a gapped Hamiltonian or action whose low-energy conditional expectation approaches \(\mathcal E\).
2. Test whether Furey exchange fixes \(e\) intrinsically.
3. Compute radiative generation of the six transverse directions.
4. Determine whether stress--energy reduction defines the same positive retraction.
5. Quantify approximation error when the third face is heavy rather than absent.

## Reproducibility

    node scripts\verify_positive_peirce_conjugation_retraction_h3c_to_h2r.mjs
