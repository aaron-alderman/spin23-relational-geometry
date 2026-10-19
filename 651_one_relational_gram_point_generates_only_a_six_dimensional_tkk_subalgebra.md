# One Relational Gram Point Generates Only a Six-Dimensional TKK Subalgebra

**Date:** 17 October 2026  
**Branches:** B04, B05, B07, B08, B11 and the relational-carrier/Jordan-triple branch  
**Claim status:** exact single-generator closure theorem; physical rank-three response family remains open  
**Certificate:** [test_single_relational_gram_triple_closure.mjs](scripts/test_single_relational_gram_triple_closure.mjs)

## Executive result

The incidence/\(B-L\) Gram matrix

\[
G=
\begin{pmatrix}
231&9\\
9&48
\end{pmatrix}
\]

is a strictly positive point of \(H_2(\mathbb R)\). It is not by itself the full Jordan algebra.

Repeated Jordan triples generated from one nonscalar symmetric matrix remain inside

\[
\boxed{\operatorname{span}_{\mathbb R}\{I,G\},}
\]

a two-dimensional commutative Jordan algebra. Its Tits–Kantor–Koecher algebra has dimension six and is isomorphic to

\[
\mathfrak{sl}(2,\mathbb R)\oplus\mathfrak{sl}(2,\mathbb R),
\]

not \(\mathfrak{sp}(4,\mathbb R)\).

To recover the full ten-dimensional algebra, the physical response family must supply a third symmetric direction that does not commute with \(G\).

## 1. Cayley–Hamilton closes the one-point recursion

For the exact Gram matrix,

\[
\operatorname{tr}G=279,
\qquad
\det G=11007.
\]

Cayley–Hamilton gives

\[
G^2-279G+11007I=0.
\]

Every polynomial in \(G\) therefore lies in \(\operatorname{span}\{I,G\}\). Since this span is a commutative associative algebra, the Jordan triple

\[
\{A,B,C\}=ABC+CBA
\]

also closes there for every \(A,B,C\in\operatorname{span}\{I,G\}\).

The “Russian-doll” iteration of a single Gram point never escapes its eigenbasis.

## 2. The resulting algebra is reducible

Diagonalizing \(G\) identifies its generated Jordan algebra with

\[
\mathbb R\oplus\mathbb R.
\]

Its two primitive idempotents evolve independently. The TKK three-grading has dimensions

\[
2+2+2=6,
\]

and gives two commuting rank-one conformal algebras:

\[
\operatorname{TKK}(\mathbb R\oplus\mathbb R)
\cong
\mathfrak{sl}(2,\mathbb R)\oplus\mathfrak{sl}(2,\mathbb R).
\]

This is a genuine symmetry, but it is not the desired simple \(Spin_0(2,3)\) pole.

## 3. The exact missing direction

Choose a symmetric perturbation

\[
H=
\begin{pmatrix}1&0\\0&0\end{pmatrix}.
\]

For the displayed \(G\),

\[
[G,H]\ne0.
\]

The three matrices

\[
I,\qquad G,\qquad H
\]

are linearly independent and span all of \(Sym_2(\mathbb R)\). Its canonical TKK closure has dimensions

\[
3+4+3=10
\]

and is

\[
\mathfrak{sp}(4,\mathbb R)\cong\mathfrak{so}(2,3).
\]

The essential physical gate is therefore not another formal triple identity. It is access to a noncommuting susceptibility direction.

## 4. Response-family formulation

Let the relational covariance depend on controls \(u^\alpha\):

\[
G=G(u^1,\ldots,u^n).
\]

At a reference point, form the tangent span

\[
\mathcal T_G
=\operatorname{span}_{\mathbb R}
\left\{
G,
\frac{\partial G}{\partial u^1},
\ldots,
\frac{\partial G}{\partial u^n}
\right\}.
\]

A necessary local gate for the full Jordan carrier is

\[
\boxed{\dim\mathcal T_G=3.}
\]

Equivalently, the family must not be confined to rescalings and matrices commuting with \(G\).

## 5. Physical candidates for the third direction

Possible controls include:

1. a mixed incidence/\(B-L\) source angle;
2. frequency-dependent operator mixing;
3. Higgs-background variation;
4. Majorana breaking across the \(B-L\) threshold;
5. polarization or helicity resolution;
6. a second source normalization fixed by a Ward identity.

Each must be evaluated as an actual response derivative. Merely renaming the three numerical entries of one fixed matrix as independent coordinates is insufficient.

## 6. Consequence for the target implication

The ambient theorem remains exact:

\[
\operatorname{TKK}(H_2(\mathbb R))
=\mathfrak{sp}(4,\mathbb R).
\]

But the newly derived physical chain is conditional:

\[
\text{incidence/}B-L\text{ Gram point}
\longrightarrow
\mathbb R\oplus\mathbb R
\longrightarrow
\mathfrak{sl}_2\oplus\mathfrak{sl}_2,
\]

unless the response family supplies a noncommuting third direction. Only then does

\[
\text{rank-three response family}
\longrightarrow
H_2(\mathbb R)
\longrightarrow
\mathfrak{sp}(4,\mathbb R)
\]

become physically licensed.

## 7. Stop-everything criteria

Stop claiming that one observed covariance matrix recursively generates \(Spin_0(2,3)\) if:

1. every accessible response matrix commutes with \(G\);
2. the tangent span has dimension at most two;
3. the third matrix direction is introduced only as a coordinate convention;
4. TKK is applied to the ambient algebra without showing that physical perturbations access it;
5. the response family decomposes into two independent primitive idempotent channels.

## 8. Next gates

1. Compute the response Jacobian under source mixing and normalization controls.
2. Test whether frequency evolution produces a matrix not commuting with the UV Gram.
3. Determine whether Majorana breaking or helicity resolution supplies the third direction.
4. Build the full TKK generators only after rank-three accessibility is demonstrated.

## Reproducibility

```powershell
node scripts\test_single_relational_gram_triple_closure.mjs
```
