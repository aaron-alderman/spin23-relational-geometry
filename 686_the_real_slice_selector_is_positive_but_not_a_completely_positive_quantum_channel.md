# The Real-Slice Selector Is Positive but Not a Completely Positive Quantum Channel

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B07, B08, B11 and the real-structure selector branch  
**Claim status:** exact Choi obstruction; alternative antiunitary/superselection implementations remain open  
**Certificate:** [verify_real_slice_projection_is_positive_but_not_completely_positive.mjs](scripts/verify_real_slice_projection_is_positive_but_not_completely_positive.mjs)

## Executive result

The map selecting the real corner is

\[
\boxed{
\mathcal R(X)
=\frac12(X+X^T)
=\operatorname{Re}X
}
\]

on Hermitian two-by-two matrices.

It is positive:

\[
X\succeq0
\Longrightarrow
\mathcal R(X)\succeq0.
\]

It is also idempotent and has image \(H_2(\mathbb R)\).

However:

\[
\boxed{
\mathcal R
\text{ is not completely positive on }M_2(\mathbb C).
}
\]

It therefore cannot be implemented as an ordinary deterministic quantum channel acting locally on a complex quantum system while remaining positive on arbitrary entangled extensions.

This sharply restricts the physical meaning of the \(H_2(\mathbb C)\to H_2(\mathbb R)\) descent.

## 1. Positivity on the Jordan cone

For

\[
X=
\begin{pmatrix}
a&x+iy\\
x-iy&b
\end{pmatrix}
\succeq0,
\]

one has

\[
ab-x^2-y^2\ge0.
\]

The real projection is

\[
\mathcal R(X)=
\begin{pmatrix}
a&x\\
x&b
\end{pmatrix},
\]

whose determinant is

\[
ab-x^2
\ge
ab-x^2-y^2
\ge0.
\]

Thus the selector is fully legitimate as a positive map between Euclidean Jordan algebras.

## 2. Choi obstruction

Let

\[
\Phi_p=(1-p)\operatorname{id}+pT,
\qquad
0<p\le1,
\]

where \(T\) is transposition. The real selector is \(\Phi_{1/2}\) on Hermitian matrices.

The Choi matrices are

\[
C_{\rm id}=|\Omega\rangle\langle\Omega|,
\qquad
C_T=F,
\]

where \(F\) swaps the two tensor factors.

On the antisymmetric Bell vector

\[
|\psi_-\rangle
=\frac1{\sqrt2}(|01\rangle-|10\rangle),
\]

one has

\[
\langle\psi_-|C_{\rm id}|\psi_-\rangle=0,
\qquad
\langle\psi_-|F|\psi_-\rangle=-1.
\]

Therefore

\[
\boxed{
\langle\psi_-|C_{\Phi_p}|\psi_-\rangle=-p<0
}
\]

for every nonzero transpose weight. Even arbitrarily weak averaging toward the real slice fails complete positivity.

## 3. What this rules out

The real-slice descent cannot be explained simply as:

- ordinary Markovian decoherence;
- a local noisy channel on a complex qubit;
- averaging over a unitary symmetry;
- tracing out an environment through a complex-linear completely positive map.

Those mechanisms necessarily produce completely positive maps.

The obstruction survives tensoring with an untouched ancillary system, precisely where ordinary positivity is insufficient.

## 4. What remains possible

The selector can still arise through:

1. an antiunitary symmetry imposed as a kinematic constraint;
2. a real quantum theory or superselection rule whose observable algebra is \(H_2(\mathbb R)\) from the start;
3. a boundary condition identifying conjugate configurations;
4. postselection or nonlinear conditioning;
5. a positive Jordan conditional expectation not required to extend complex-linearly;
6. a doubled theory in which conjugation becomes a linear unitary exchange before taking fixed points.

The sixth route is especially compatible with the Furey exchanged-topology construction: double the conjugate sectors, implement exchange linearly, and select exchange-fixed Hermitian observables.

## 5. Consequence for the two-stage descent

The heavy third-face mechanism gives

\[
H_3(\mathbb C)
\longrightarrow
H_2(\mathbb C)
\]

through ordinary Feshbach decoupling.

The second arrow

\[
H_2(\mathbb C)
\longrightarrow
H_2(\mathbb R)
\]

cannot be the same kind of open-system channel. It requires a change of real structure, observable algebra or admissible state space.

This separates the two selector mechanisms decisively:

- **rank selection:** potentially energetic and completely positive;
- **real-form selection:** antiunitary, fixed-point or Jordan-algebraic.

## 6. Stop-everything criteria

Stop describing conjugation averaging as ordinary decoherence if:

1. the underlying theory is complex quantum mechanics;
2. arbitrary entangled ancillas are allowed;
3. the selector acts locally;
4. complete positivity is required;
5. no doubled linear implementation or superselection rule is supplied.

## 7. Next gates

1. Construct a doubled conjugate-sector Hilbert space where exchange is unitary.
2. Derive the exchange-fixed \(H_2(\mathbb R)\) observables as a genuine subalgebra.
3. Compare that construction with Furey's exchanged TRO response.
4. Test whether CP-violating flavor data remain in the complementary factor.
5. Determine whether the boundary/causal-screen model naturally enforces the real fixed points.

## Reproducibility

    node scripts\verify_real_slice_projection_is_positive_but_not_completely_positive.mjs
