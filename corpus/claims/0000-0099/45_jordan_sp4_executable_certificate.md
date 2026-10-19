# Executable Certificate for the Jordan–(Sp(4,\mathbb R)) Bridge

**Date:** 16 October 2026  
**Certificate script:** [`verification/verify/verify-jordan-sp4-bridge.mjs`](../../../verification/verify/verify-jordan-sp4-bridge.mjs)

---

## Purpose

The central algebraic bridge is small enough to verify exhaustively over an exact integer basis. This certificate checks that the symmetric \(2\times2\) carrier, its outer-symmetric triple, and the standard three-grading really close into \(\mathfrak{sp}(4,\mathbb R)\).

It is a reproducibility check, not a proof of the physical hypotheses.

## Command

From the research folder, run:

```powershell
node verification/verify/verify-jordan-sp4-bridge.mjs
```

No package installation or floating-point library is required.

## Basis and embeddings

The script uses the integer basis of \(J=\operatorname{Sym}_2(\mathbb R)\):

\[
e_0=\begin{pmatrix}1&0\\0&0\end{pmatrix},\qquad
e_1=\begin{pmatrix}0&1\\1&0\end{pmatrix},\qquad
e_2=\begin{pmatrix}0&0\\0&1\end{pmatrix}.
\]

It embeds \(B,C\in J\) as

\[
E(B)=\begin{pmatrix}0&B\\0&0\end{pmatrix},
\qquad
F(C)=\begin{pmatrix}0&0\\C&0\end{pmatrix},
\]

and embeds \(A\in\mathfrak{gl}(2,\mathbb R)\) as

\[
H(A)=\begin{pmatrix}A&0\\0&-A^T\end{pmatrix}.
\]

## Exhaustive checks

The script verifies:

1. \(\dim J=3\).
2. The grading dimensions are \(3+4+3=10\).
3. The ten displayed generators are linearly independent.
4. Every generator satisfies
   \[
   M^T\Omega+\Omega M=0.
   \]
5. For all \(3^3=27\) basis triples,
   \[
   [[E(B),F(C)],E(D)]=E(BCD+DCB).
   \]
6. The triple is symmetric in its outer variables for all 27 basis triples.
7. The Jordan triple identity holds for all \(3^5=243\) basis quintuples.
8. The determinant quadratic form has signature \((1,2)\).

Because all identities are multilinear, verification on a basis proves them for arbitrary real linear combinations.

## Recorded result

On 16 October 2026 the certificate returned:

```text
carrier dimension: 3
grading dimensions: 3+4+3
Lie basis rank: 10
symplectic condition: 10/10 passed
double-commutator triple: 27/27 passed
outer symmetry: 27/27 passed
Jordan triple identity: 243/243 passed
determinant signature: [1,2]
overall: passed
```

## What this establishes

The computation independently witnesses the exact algebraic statement

\[
\operatorname{TKK}\left(
\operatorname{Sym}_2(\mathbb R),
\{X,Y,Z\}=XYZ+ZYX
\right)
\cong\mathfrak{sp}(4,\mathbb R).
\]

Together with the determinant signature and the standard low-dimensional Lie-algebra isomorphism, this gives

\[
\mathfrak{sp}(4,\mathbb R)\cong\mathfrak{so}(2,3).
\]

## What this does not establish

The certificate does **not** show that:

- an arbitrary Jordan triple produces \(\mathfrak{sp}(4,\mathbb R)\);
- stress–energy naturally takes values in \(\operatorname{Sym}_2(\mathbb R)\);
- the physical universe selects a homogeneous self-dual rank-two cone;
- the group-level global topology follows merely from the Lie algebra calculation;
- the proposed real-slice descent is dynamically realized;
- the Standard Model or Furey module couples consistently to the carrier.

Those are separate selection, topology and physics questions. The certificate isolates the portion that is no longer conjectural.

## Audit rule

Any future generalization should preserve this file and add a separate certificate. In particular, a proposed \(H_2(\mathbb C)\to H_2(\mathbb R)\) physical descent should test both the involution-fixed subspace and the induced Lie-algebra fixed points rather than infer them from dimensions alone.
