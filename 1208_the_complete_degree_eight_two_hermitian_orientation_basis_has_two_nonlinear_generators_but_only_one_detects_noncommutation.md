# The apparent two-generator degree-eight basis collapses to one nonlinear generator in three dimensions

## Correction and classification

The cyclic-word classification in the first version of this note was correct, but its independence claim was not. It treated

\[
(\operatorname{Tr}AB)^2,
\qquad
\operatorname{Tr}(ABAB)
\]

as two independent nonlinear orientation generators. For \(3\times3\) matrices, an exact trace identity expresses the alternating word as the alignment square plus fixed-spectrum constants and Birkhoff-linear mixed traces. The corrected result is:

> Through total Yukawa degree eight, the fixed-spectrum two-Hermitian orientation potential has only one independent nonlinear generator. Consequently, at a generic interior stationary point its full relative-frame Hessian has rank at most one.

Document 1209 gives the identity and the full-dimensional no-go.

## 1. Setup and degree convention

Let

\[
A=Y_eY_e^\dagger,
\qquad
B=Y_\nu Y_\nu^\dagger.
\]

A word of length \(r\) in \(A,B\) has total Yukawa degree \(2r\). Fixing the spectra removes pure traces from the orientation problem. Trace cyclicity classifies binary words by cyclic necklaces.

## 2. Mixed single-trace classes through word length four

| Word length | Yukawa degree | Mixed cyclic trace classes |
|---:|---:|---|
| 2 | 4 | \(\operatorname{Tr}(AB)\) |
| 3 | 6 | \(\operatorname{Tr}(A^2B)\), \(\operatorname{Tr}(AB^2)\) |
| 4 | 8 | \(\operatorname{Tr}(A^3B)\), \(\operatorname{Tr}(AB^3)\), \(\operatorname{Tr}(A^2B^2)\), \(\operatorname{Tr}(ABAB)\) |

In an \(A\)-eigenbasis, with \(B=U\operatorname{diag}(b_j)U^\dagger\), the nonalternating mixed traces are linear in the unistochastic matrix:

\[
\operatorname{Tr}(A^pB^q)=\sum_{ij}a_i^p b_j^q|U_{ij}|^2.
\]

The alternating word contains quartet interference in this presentation, but in dimension three it is not algebraically independent of the alignment square and those linear coordinates.

## 3. Multi-trace classes

Products of one mixed trace with pure spectral traces remain Birkhoff-linear after fixing spectra. The first nonlinear mixed multi-trace is

\[
y_1^2=(\operatorname{Tr}AB)^2.
\]

It factors through one scalar \(y_1\), so by itself it can fix at most one local orientation combination.

## 4. Correct normal form

Define the four mixed linear coordinates

\[
y_1=\operatorname{Tr}(AB),\quad
y_2=\operatorname{Tr}(A^2B),\quad
y_3=\operatorname{Tr}(AB^2),\quad
y_4=\operatorname{Tr}(A^2B^2).
\]

Modulo fixed-spectrum constants, every invariant potential through degree eight has the corrected form

\[
\boxed{
V_{\le8}=c_1y_1+c_2y_2+c_3y_3+c_4y_4+\alpha y_1^2.
}
\]

The commutator norm and \(\operatorname{Tr}(ABAB)\) are useful alternative presentations, but not additional nonlinear generators.

## 5. What the commutator presentation still proves

The identity

\[
\|[A,B]\|_{\rm HS}^2
=2\bigl(\operatorname{Tr}(A^2B^2)-\operatorname{Tr}(ABAB)\bigr)
\]

remains exact. On a one-angle slice it yields the stable interior minimum constructed in document 1206. What changes is the extrapolation: the slice suppresses three physical relative-frame directions, and the apparent commutator curvature becomes only the curvature of \(y_1^2\) after the full three-dimensional trace identity is imposed.

## 6. Consequence for three-family predictivity

For nondegenerate spectra, \((y_1,y_2,y_3,y_4)\) are generically local coordinates on the four-dimensional relative-frame space. At an interior stationary point,

\[
\nabla_yV=(c_1+2\alpha y_1,c_2,c_3,c_4)=0,
\]

and hence

\[
\operatorname{Hess}_yV=2\alpha\,e_1e_1^T.
\]

Its rank is at most one. Coordinate pullback cannot raise that rank at a stationary point. Therefore at least three relative-frame directions remain flat:

\[
\boxed{
\text{degree eight permits slice nonalignment but forbids a strict isolated full PMNS minimum.}
}
\]

The next task is to find the first higher invariant degree whose independent nonlinear generators can supply full-rank curvature, then combine that with the degree-twelve CP-odd Jarlskog structure.
