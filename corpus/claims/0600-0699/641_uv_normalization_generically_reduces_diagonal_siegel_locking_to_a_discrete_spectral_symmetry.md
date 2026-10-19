# UV Normalization Generically Reduces Diagonal Siegel Locking to a Discrete Spectral Symmetry

**Date:** 17 October 2026  
**Branches:** B01, B02, B04, B05, B07 and B08  
**Claim status:** exact Lie-stabilizer classification for positive two-by-two ultraviolet coefficients; microscopic coefficients remain open  
**Certificate:** [classify_uv_normalized_diagonal_siegel_locking_symmetry.mjs](../../../verification/classify/classify_uv_normalized_diagonal_siegel_locking_symmetry.mjs)

## Executive result

The Siegel geodesic lock is invariant under the full diagonal fractional \(Sp(4,\mathbb R)\) action as response-domain geometry. A normalized physical response generally realizes a much smaller group.

For

\[
Z_a(iy)=iyM_a+Q_a+o(1),
\qquad M_a>0,
\qquad a\in\{\mathrm{top},\mathrm{chi}\},
\]

the symmetry hierarchy is

\[
\boxed{
Sp(4,\mathbb R)_{10}
\supset P_7
\supset
\bigl[O(M_{\rm top})\cap O(M_{\rm chi})\bigr]
\ltimes Sym_2(\mathbb R).
}
\]

For two generic fixed positive matrices \(M_{\rm top},M_{\rm chi}\), the congruence intersection is discrete. The only continuous directions are three simultaneous real contact translations, and those disappear if the subtraction scheme fixes the contact terms.

Thus a generic normalized locked response has no continuous spectral \(Spin(2,3)\) symmetry even though it lives in a domain whose automorphism group is \(Spin_0(2,3)\).

## 1. From ten to seven dimensions

Preserving only the asymptotic linear-growth class leaves

\[
Z\longmapsto AZA^T+Q,
\qquad A\in GL(2,\mathbb R),
\qquad Q=Q^T\in Sym_2(\mathbb R).
\]

This is the Siegel parabolic

\[
P\cong GL(2,\mathbb R)\ltimes Sym_2(\mathbb R),
\qquad \dim P=4+3=7.
\]

## 2. Fixing one shared ultraviolet coefficient

If locking or normalization gives

\[
M_{\rm top}=M_{\rm chi}=M,
\]

then the congruence matrix satisfies

\[
AMA^T=M.
\]

This is \(O(M)\), conjugate to \(O(2)\), with one continuous generator. Retaining common contact translations gives continuous dimension four; fixing contact terms leaves dimension one.

## 3. Two generic ultraviolet coefficients

For independently fixed matrices, an infinitesimal generator \(X\) obeys

\[
XM_{\rm top}+M_{\rm top}X^T=0,
\qquad
XM_{\rm chi}+M_{\rm chi}X^T=0.
\]

The certificate uses

\[
M_{\rm top}=\begin{pmatrix}2&0\\0&1\end{pmatrix},
\qquad
M_{\rm chi}=\begin{pmatrix}3&1\\1&2\end{pmatrix},
\]

and finds rank four in the four-dimensional space of \(X\). The common Lie algebra is zero-dimensional. Globally, a generic pair retains four sign reflections in the generalized-eigenvector basis.

With common contact shifts, the continuous dimension is three. With fixed contact terms, it is zero.

## 4. Exact dimension ladder

\[
\begin{array}{c|c}
\text{structure}&\text{continuous dimension}\\ \hline
\text{full Siegel-domain automorphisms}&10\\
\text{UV-class-preserving parabolic}&7\\
\text{one shared fixed }M\text{ plus contacts}&4\\
\text{two generic fixed }M_a\text{ plus contacts}&3\\
\text{one shared fixed }M\text{ and fixed contacts}&1\\
\text{two generic fixed }M_a\text{ and fixed contacts}&0.
\end{array}
\]

This is a stabilizer hierarchy of increasingly specific response data, not automatically spontaneous symmetry breaking.

## 5. Enhancement criterion

If locking dynamics also forces

\[
M_{\rm top}=M_{\rm chi},
\]

the generic discrete intersection expands to \(O(M)\). Ultraviolet-coefficient matching is therefore a concrete, testable part of the carrier-locking programme.

Even then, the full ten-dimensional group does not preserve fixed \(M\). Restoring it requires allowing ultraviolet data to transform as moduli or duality labels.

## 6. Contact translations

The common shift \(Z_a\mapsto Z_a+Q\) is an isometry of the diagonal lock and leaves spectral imaginary parts unchanged. It represents simultaneous contact-term freedom.

Whether these directions are physical symmetries, renormalization-scheme changes or redundancies depends on the measurement protocol. They must not be counted as observable spectral symmetry without that decision.

## 7. Consequence for the \(Spin(2,3)\) claim

The evidence supports three nested claims:

1. **Exact:** \(Spin_0(2,3)\) is the automorphism group of the full causal response domain.
2. **Conditional:** it can act diagonally on locked topology/chiral response points if their ultraviolet data transform.
3. **Generally false:** the full group is a continuous symmetry of one response with two fixed generic ultraviolet tensors and fixed contact scheme.

## 8. Stop-everything criteria

Stop claiming a full physical \(Spin(2,3)\) symmetry if:

1. \(M_{\rm top}\) and \(M_{\rm chi}\) are fixed, unequal and non-dynamical;
2. contact translations are merely scheme choices;
3. no ultraviolet modulus transforms under the missing fractional generators;
4. observed source normalization selects a unique frame;
5. only the domain, rather than the action and data, is covariant.

## 9. Next gates

1. Derive \(M_{\rm top}\) and \(M_{\rm chi}\) from the Furey and seesaw spectral measures and test equality.
2. Decide whether common contact translations are measurable or scheme redundancy.
3. Search for a dynamical ultraviolet modulus that could restore part of the missing fractional group.
4. Compute invariant observables under the actual generic discrete or enhanced \(O(M)\) stabilizer.

## Reproducibility

```powershell
node scripts\classify_uv_normalized_diagonal_siegel_locking_symmetry.mjs
```
