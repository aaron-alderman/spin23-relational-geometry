# Positive Spectral Quadrature Connects Finite Relational Hamiltonians to Continuum Responses

**Date:** 17 October 2026  
**Branches:** B02, B04, B05, B07, B08, B11 and the continuum-realization branch  
**Claim status:** verified matrix-Stieltjes approximation theorem in an explicit continuum model; Standard-Model spectral density remains to be supplied  
**Certificate:** [verify_positive_matrix_stieltjes_continuum_quadrature.mjs](scripts/verify_positive_matrix_stieltjes_continuum_quadrature.mjs)

## Executive result

Finite relational Hamiltonians are not restricted to literal particle poles. They can be controlled positive approximants to continuum spectral measures.

Let

\[
K(z)=\int_a^b\frac{\rho(s)}{s-z}\,ds,
\qquad
\rho(s)\succeq0.
\]

Choose positive quadrature nodes and weights:

\[
K_N(z)=\sum_{j=1}^N
\frac{w_j\rho(s_j)}{s_j-z},
\qquad
w_j>0.
\]

Every residue

\[
R_j=w_j\rho(s_j)
\]

is positive. Therefore every \(K_N\) is a rational matrix Herglotz function with a finite Hermitian dilation, and

\[
K_N(z)\longrightarrow K(z)
\]

uniformly on compact sets separated from the spectral cut under ordinary convergent quadrature assumptions.

This is the mathematically correct route from the finite ten-state construction toward hadronic or interacting continua.

## 1. Explicit noncommuting continuum model

The certificate uses

\[
\rho(s)=R_0+sR_1,
\qquad
s\in[1,2],
\]

with

\[
R_0=
\begin{pmatrix}
1&0\\0&0
\end{pmatrix},
\qquad
R_1=
\begin{pmatrix}
1&1\\1&1
\end{pmatrix}.
\]

The two matrices do not commute, while

\[
\rho(s)=
\begin{pmatrix}
1+s&s\\
s&s
\end{pmatrix}
\]

has determinant \(s>0\). Thus the spectral density is positive definite throughout the interval and genuinely matrix-valued.

For Euclidean \(z=-t\), \(t>0\), the integral is exact:

\[
K(-t)=I_0(t)R_0+I_1(t)R_1,
\]

where

\[
I_0(t)=\log\frac{2+t}{1+t},
\qquad
I_1(t)=1-tI_0(t).
\]

Positive midpoint quadratures with \(N=2,4,8,16,32,64\) converge monotonically in the tested matrix norm at three separated Euclidean points.

## 2. Positivity survives every truncation

For \(\operatorname{Im}z>0\),

\[
\operatorname{Im}\frac1{s-z}
=\frac{\operatorname{Im}z}{|s-z|^2}>0.
\]

Hence

\[
\operatorname{Im}K_N(z)
=\sum_j
\frac{w_j\operatorname{Im}z}{|s_j-z|^2}
\rho(s_j)
\succeq0.
\]

If the sampled densities span both face directions, the imaginary part is strictly positive. No negative spectral weights are introduced by refinement.

This is preferable to unconstrained rational fitting, which can approximate values while violating causality or positivity.

## 3. Dilation dimension and the continuum limit

If every sampled \(2\times2\) residue is full rank, \(N\) nodes require

\[
2N
\]

internal dilation directions. Including the two-face carrier gives

\[
\boxed{
\dim\mathcal H_N=2+2N.
}
\]

As \(N\to\infty\), the finite dilations approach an infinite-dimensional self-adjoint multiplication operator on a spectral Hilbert space. The growing state count is approximation rank, not a prediction of infinitely many fundamental particles.

## 4. Application to the broken-phase Standard-Model branch

The finite kernel

\[
\frac{U}{\lambda_u-z}
+\frac{D}{\lambda_d-z}
+\frac{E}{\lambda_e-z}
+\frac{N}{\lambda_\nu-z}
\]

should be replaced schematically by

\[
\int
\frac{
\rho_u(s)U
+\rho_d(s)D
+\rho_e(s)E
+\rho_\nu(s)N
+\rho_{\rm mix}(s)
}{s-z}\,ds.
\]

The quark terms can then describe hadronic continua or OPE-compatible spectral weight instead of free colored poles. A positive quadrature produces a sequence of executable finite relational Hamiltonians while preserving:

- causality/Herglotz positivity;
- source-face matrix structure;
- noncommuting residues;
- carrier-projected spectral interpretation;
- a controlled path toward branch cuts.

The actual functions \(\rho_f\) and \(\rho_{\rm mix}\) remain physical inputs.

## 5. What finite dual poles mean during refinement

At finite \(N\), inversion generates discrete dressed zeros and poles. As the quadrature is refined:

- stable isolated poles may indicate genuine bound states;
- sequences accumulating on the support approximate a branch cut;
- unstable poles may be quadrature artifacts;
- carrier residues show how spectral weight is distributed through the approximation;
- analytic continuation is required before identifying resonances.

A claimed particle must remain stable under positive refinement and survive continuation to the physical sheet structure.

## 6. Stop-everything criteria

Stop treating a rational approximation as a continuum model if:

1. some quadrature weights or residue matrices are negative;
2. convergence is tested only on the cut or at interpolation nodes;
3. pole counts are interpreted as particle counts;
4. refinement changes supposedly physical poles without convergence;
5. the chosen spectral density is not derived from or fitted to a gauge-invariant operator.

## 7. Next gates

1. Obtain a perturbative/OPE spectral density for the incidence/\(B-L\) operator pair.
2. Use positive matrix quadrature rather than unconstrained Padé fitting.
3. Track dual pole stability as the quadrature order increases.
4. Add charged-current graph residues and test face--flavor factorization.
5. Continue to complex energy and classify bound-state, resonance and cut contributions.

## Reproducibility

    node scripts\verify_positive_matrix_stieltjes_continuum_quadrature.mjs
