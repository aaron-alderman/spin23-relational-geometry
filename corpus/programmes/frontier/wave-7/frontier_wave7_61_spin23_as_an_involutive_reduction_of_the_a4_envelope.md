# Frontier Wave 7.61: (Spin(2,3)) as an Involutive Reduction of the (A_4) Envelope

**Date:** 25 October 2026  
**Status:** exact conditional construction and exact captured-Levi compatibility no-go  
**Ledger:** [(C_2) inside (A_4) compatibility](c2_inside_a4_compatibility_v1.json)  
**Certificate:** [involutive-reduction verifier](../../../../verification/verify/verify_c2_inside_a4_compatibility.mjs)

## Result

The five-dimensional (2+3) carrier admits a direct and exact
\(Spin(2,3)\) reduction. It does not preserve the full captured
\(A_1+A_2\) Levi.

Let

\[
Q=\operatorname{diag}(-I_2,+I_3).
\]

Inside \(\mathfrak{sl}_5(\mathbb R)\), impose

\[
X^TQ+QX=0.
\]

The solution algebra is

\[
\boxed{
\mathfrak{so}(2,3)\cong\mathfrak{sp}_4(\mathbb R),
\qquad \dim=10.
}
\]

Thus the (C_2) algebra is genuinely available inside the (A_4) envelope,
but only after a signature-((2,3)) form is selected.

## 1. Exact (2+3) decomposition

Relative to \(\mathbb R^2\oplus\mathbb R^3\), every element has the form

\[
X=
\begin{pmatrix}
A&B\\
B^T&D
\end{pmatrix},
\]

where

\[
A\in\mathfrak{so}_2,
\qquad
D\in\mathfrak{so}_3,
\qquad
B\in\operatorname{Mat}_{2\times3}(\mathbb R).
\]

The dimensions are

\[
1+3+6=10.
\]

The six cross directions alone generate the full algebra: their commutators
produce both \(\mathfrak{so}_2\) and \(\mathfrak{so}_3\). This is the first
exact closure in the present branch where the same six-dimensional channel
module generates all ten \(Spin(2,3)\) directions.

## 2. Kenotic direction versus orthogonal completion

The one-way channel by itself is

\[
N_E=
\begin{pmatrix}0&0\\E&0\end{pmatrix},
\qquad N_E^2=0.
\]

It does not preserve (Q). The (Q)-preserving generator is the paired
combination

\[
X_E=
\begin{pmatrix}0&E^T\\E&0\end{pmatrix}.
\]

Therefore the move from kenotic one-way transport to reversible
\(Spin(2,3)\) dynamics requires an adjoint completion. This completion is not
the free addition of an unrelated reverse matrix: (Q) fixes it as the
adjoint of the forward channel.

## 3. Exact price paid by the captured Levi

The parabolic (A_4) envelope has Levi

\[
\mathfrak{sl}_2\oplus\mathfrak{sl}_3\oplus\mathfrak{gl}_1.
\]

Its standard block intersection with \(\mathfrak{so}(2,3)\) is only

\[
\boxed{
\mathfrak{so}_2\oplus\mathfrak{so}_3,
\qquad \dim=4.
}
\]

Consequently:

- the full two-block \(\mathfrak{sl}_2\) reduces to one rotation generator;
- the full three-block \(\mathfrak{sl}_3\) reduces to
  \(\mathfrak{so}_3\cong\mathfrak{sl}_2\) after complexification;
- the relative \(\mathfrak{gl}_1\) grading is not (Q)-orthogonal.

This is symmetry reduction and role reassignment, not preservation of the
Claimipedia factors.

## 4. Why a hidden full (mathfrak{sl}_3) cannot survive elsewhere

The obstruction is abstract, not merely an artifact of the standard blocks.
If \(\mathfrak{sl}_3\) embedded in \(\mathfrak{so}_5\), the defining
five-dimensional orthogonal module would restrict to a faithful
five-dimensional orthogonal \(\mathfrak{sl}_3\)-module.

The smallest nontrivial irreducibles have dimensions (3,\bar3,6,8,\ldots).
A five-dimensional faithful module could only contain (3\oplus1\oplus1) or
\(\bar3\oplus1\oplus1). But (3) is not self-dual and admits no invariant
nondegenerate symmetric bilinear form without its \(\bar3\), which would
already require six dimensions. Therefore no such embedding exists.

The full programme \(A_2\) must break or remain external to the
\(Spin(2,3)\) algebra.

## 5. Revised structural pathway

The exact chain is now

\[
\mathfrak{sl}_2+\mathfrak{sl}_3+\mathfrak{gl}_1
\ltimes \operatorname{Hom}(\mathbb R^3,\mathbb R^2)
\subset \mathfrak{sl}_5,
\]

followed, if (Q) is physically selected, by

\[
\mathfrak{sl}_5
\xrightarrow{X^TQ+QX=0}
\mathfrak{so}(2,3).
\]

The six cross directions survive, but the diagonal symmetry is changed. This
looks like spontaneous or boundary-selected symmetry reduction rather than
the discovery that (A_1+A_2) was secretly (C_2).

## 6. Exact remaining datum

Two linked inputs are absent:

1. a derived nondegenerate bilinear form of signature ((2,3)) on the shared
   five-carrier;
2. a physical rule identifying the reverse channel with the (Q)-adjoint of
   the one-way partial-sewing channel.

If both appear, the algebra closes exactly to \(Spin(2,3)\). Without them,
\(Q\) is an inserted selector and the construction remains conditional.

[Wave 7.62](frontier_wave7_62_endpoint_identification_hom_spaces.md)
classifies the remaining endpoint ambiguity: it is finite-dimensional and
partly discrete, but representation type alone does not choose the labels,
bases or relative phases needed to define (Q).

## Boundary

This result establishes an exact representation-theoretic route, not a gauge
group, spacetime symmetry or microscopic action. It also forbids retaining
the full captured \(\mathfrak{sl}_3\) inside the resulting (C_2) algebra.
