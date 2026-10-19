# Peirce–Schur Triple Recursion to \(Spin(2,3)\)

**Date:** 17 October 2026  
**Branches:** B01, B02, B04 and B08  
**Claim status:** exact conditional theorem; physical selection of the real positive carrier and filtration remains open

## 1. The sharpened implication

Jordan-triple recursion without a specified carrier does not select \(Sp(4,\mathbb R)\). A precise response-theoretic implication is now available:

\[
\boxed{
\begin{gathered}
R_n\in H_n(\mathbb R)_+,\\
\text{recursive elimination by Peirce--Schur complements},\\
\text{termination at two retained ports}
\end{gathered}
\Longrightarrow
H_2(\mathbb R)_+
\Longrightarrow
Sp(4,\mathbb R)
\simeq_{\rm loc}Spin_0(2,3).
}
\]

The first arrow is dynamical/response structure. The second is the exact conformal-group theorem for the rank-two real Euclidean Jordan algebra.

## 2. Peirce decomposition

Let \(e\) be the idempotent projecting onto the retained ports and \(q=1-e\) the eliminated corner. Decompose

\[
R=A+X+C,
\]

where

\[
A=eRe,
\qquad
X=eRq+qRe,
\qquad
C=qRq.
\]

These occupy the Peirce spaces

\[
A\in V_1(e),
\qquad
X\in V_{1/2}(e),
\qquad
C\in V_0(e).
\]

Assume \(C\) is positive and invertible inside its corner algebra \(V_0(e)\).

## 3. The triple formula

For the special Jordan algebra of real symmetric matrices, use

\[
U\circ V=\frac12(UV+VU)
\]

and the associated triple product

\[
\{U,V,W\}
=(U\circ V)\circ W
+(W\circ V)\circ U
-(U\circ W)\circ V
=\frac12(UVW+WVU).
\]

In particular,

\[
\{X,Y,X\}=XYX.
\]

Because \(C^{-1}\) is supported only in the eliminated corner,

\[
\{X,C^{-1},X\}
=XC^{-1}X
\]

is supported only in the retained corner and equals the standard Schur correction.

Therefore

\[
\boxed{
\operatorname{Schur}_q(R)
=A-\{X,C^{-1},X\}.
}
\]

This is the exact \(AXB\)-type operation sought in the original relational-carrier intuition, with the same relationship field \(X\) occupying both outer slots and the inverse interior response in the middle slot.

## 4. Why the inverse belongs in the middle

The middle argument is not an arbitrary third stress tensor. It is the Green function or compliance of the eliminated interior sector:

\[
C^{-1}.
\]

The triple

\[
\{X,C^{-1},X\}
\]

describes propagation into the interior through \(X\), response inside it through \(C^{-1}\), and propagation back through \(X\).

This is the precise mathematical form of a “nested doll” or mediated relation:

\[
\text{boundary}
\xrightarrow{X}
\text{interior}
\xrightarrow{C^{-1}}
\text{interior response}
\xrightarrow{X}
\text{boundary}.
\]

## 5. Positivity and domain

If \(R>0\), then \(C>0\) and

\[
A-\{X,C^{-1},X\}>0.
\]

If \(C\) becomes singular, the ordinary inverse and hence the recursion fail. One may then use a restricted inverse or Moore--Penrose limit only after specifying which null modes are gauge, constrained or physically retained.

The positive interior assumption is therefore part of the theorem, not a technical footnote.

## 6. Recursion

Apply the formula repeatedly:

\[
R_{k-1}
=A_k-{X_k,C_k^{-1},X_k\},
\qquad
k=n,n-1,\ldots,3.
\]

Associativity of Schur elimination guarantees that eliminating the same interior subspace in different groupings gives the same final two-port response.

The result is

\[
R_2\in H_2(\mathbb R)_+.
\]

No assumption of \(Sp(4,\mathbb R)\) was inserted into the elimination steps. It appears because the terminal carrier is the positive cone of \(H_2(\mathbb R)\).

## 7. The terminal conformal group

The Tits--Kantor--Koecher algebra of \(H_2(\mathbb R)\) is

\[
\mathfrak{co}(H_2(\mathbb R))
\cong
\mathfrak{sp}(4,\mathbb R)
\cong
\mathfrak{so}(2,3).
\]

At the connected-group level,

\[
Sp(4,\mathbb R)/\{\pm1\}
\cong
SO_0(2,3),
\]

and

\[
Sp(4,\mathbb R)
\cong
Spin_0(2,3).
\]

Thus the recursion lands on the requested symmetry once the physical carrier has genuinely reduced to two real reciprocal ports.

## 8. What this proves—and does not prove

It proves:

- Schur response recursion is literally a Jordan triple with an inverse middle argument;
- positivity keeps every recursive carrier inside the Euclidean Jordan cone;
- the two-port terminus has exact \(Sp(4,\mathbb R)\cong Spin_0(2,3)\) conformal symmetry;
- the construction is compatible with associative sewing and determinant descent.

It does not prove:

- that the universe begins with a real symmetric multi-port carrier;
- that a physical coarse-graining must terminate at two ports;
- that the full Standard Model or gravity acts by the entire conformal group;
- that the external carrier is identical to Furey's internal neutral corner;
- that complex absorptive phases never force an \(H_n(\mathbb C)\) lift.

## 9. Relation to the original \(A X B\) question

The exact system has the form

\[
A_{\rm eff}
=A_{\rm bare}
-\{X,C^{-1},X\}.
\]

The relationship operator \(X\) is repeated on the two faces of the triple, while the interior resolvent occupies the middle. This is not an unrestricted outer tensor product and not simple addition. It is a **Peirce--Schur Jordan triple**.

The recursion name is therefore:

> recursive Schur complementation in a Euclidean Jordan algebra, expressed through its quadratic representation or Jordan triple product.

## 10. Stop-everything and falsification gates

**Physical derivation:** stress, walk or causal dynamics produce exactly the positive block response \(R=A+X+C\) and its interior equation gives \(C^{-1}\).

**Canonical termination:** incidence or causal structure selects two retained faces without an arbitrary observer-dependent cut.

**Symmetry action:** the terminal \(Sp(4,\mathbb R)\) transformations act on actual observables or transport, not merely on a formal cone.

**Complex obstruction:** a nonremovable loop phase prevents every stage from sharing one real structure. Then the recursion leaves the real Jordan family before reaching the claimed terminal symmetry.

**Filtration failure:** different equally physical cuts produce inequivalent terminal carriers with no selection rule. Then the implication is mathematically valid but physically nonunique.

## 11. Certificate

The [Peirce--Schur triple certificate](../../../verification/verify/verify_peirce_schur_triple_recursion.mjs) verifies the Peirce decomposition, the special-Jordan triple identity, equality of the triple correction with block Schur complementation, positivity and two-step descent from four to two ports.

## Companion documents

- [Recursive Schur--Jordan descent](201_recursive_schur_jordan_descent_and_functorial_sewing.md)
- [Jordan triple to Sp(4,R) determination](../0000-0099/42_jordan_triple_to_sp4r_determination.md)
- [Executable Jordan--Sp(4) certificate](../0000-0099/45_jordan_sp4_executable_certificate.md)
- [Global Sp(4,R)--Spin(2,3) isomorphism](../0000-0099/47_global_group_isomorphism_sp4r_spin023.md)
