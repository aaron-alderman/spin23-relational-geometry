# Canonical Real Structure on the Furey Conjugate Pair

**Date:** 16 October 2026  
**Branch:** B03 Furey interface  
**Claim status:** canonical swap-conjugation model solved; exact Furey involution still requires encoding

## 1. Model involution

For a representation and its conjugate, use

\[
\kappa(v,w)=(\bar w,\bar v).
\]

This is an anti-linear involution:

\[
\kappa^2=1.
\]

A complex-linear operator \(T\) respects the real structure when

\[
T\kappa=\kappa T.
\]

## 2. Neutral doublet

On the two neutral singlets, the general compatible matrix is

\[
T_0=
\begin{pmatrix}
a&b\\
\bar b&\bar a
\end{pmatrix},
\qquad a,b\in\mathbb C.
\]

This space has real dimension four. If \(T_0\) must also be Hermitian, \(a\) is real while \(b\) remains complex, leaving three real parameters.

## 3. Charged conjugate pair

For one charged sector and its conjugate, gauge symmetry makes the operator diagonal. Reality compatibility gives

\[
T_q=\begin{pmatrix}\lambda&0\\0&\bar\lambda\end{pmatrix}.
\]

This has real dimension two. Hermiticity reduces it to one real parameter.

There are three charged conjugate pairs in the encoded color/charge module. Hence the canonical reality-compatible commutant has

\[
4+3(2)=10
\]

real dimensions, and its Hermitian coupling space has

\[
3+3(1)=6
\]

real parameters.

## 4. What the reality condition accomplishes

The complex-linear gauge commutant had complex dimension ten, or real dimension twenty. The canonical anti-linear structure halves this to ten real dimensions. Hermiticity reduces the physical linear coupling parameters further to six.

This is a real restriction, but not a predictive collapse to one coupling. Additional electroweak, chirality, triality or generation actions are still needed.

## 5. Scope warning

Furey’s constructions distinguish complex conjugation, octonionic conjugation and Hermitian conjugation. The canonical swap model captures the abstract representation-plus-conjugate structure but is not yet proven to equal the involution in the selected full construction.

The exact branch remains pinned until those matrices are encoded.

## 6. Cross-branch opportunity

The external Jordan descent also uses a real structure. A shared involution would be significant only if its action on the external carrier and internal ideal is one well-defined graded operation—not two unrelated conjugations given the same symbol.

The next test is to construct

\[
\kappa_{\rm total}
=\kappa_{\rm ext}\widehat\otimes\kappa_F
\]

and verify that it preserves Lorentz chirality, gauge charge conjugation and the physical inner product.

## 7. Stop-everything and falsification tests

**Positive:** the actual Furey involutions reproduce this or a smaller compatible commutant and lock nontrivially to the external real slice.

**Negative:** the total involution exchanges physical left-handed states with forbidden mirrors, erases chirality, or remains a trivial tensor product with no coupling constraint.

## 8. Certificate

[`scripts/verify-conjugate-pair-real-commutant.mjs`](scripts/verify-conjugate-pair-real-commutant.mjs) constructs real bases, checks \(T\kappa=\kappa T\), and counts both the full and Hermitian parameter spaces.

## Companion documents

- [Conjugate ideal extension](63_furey_conjugate_ideal_extension.md)
- [Jordan real-slice descent](44_jordan_selection_axioms_and_spin24_to_spin23_descent.md)
- [Furey interface](54_furey_external_internal_interface_branch.md)
