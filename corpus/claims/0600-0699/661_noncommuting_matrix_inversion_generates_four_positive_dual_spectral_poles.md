# Noncommuting Matrix Inversion Generates Four Positive Dual Spectral Poles

**Date:** 17 October 2026  
**Branches:** B01, B04, B05, B07, B08, B11 and the relational-response duality branch  
**Claim status:** exact rational two-source example with numerical real-root isolation; microscopic realization remains open  
**Certificate:** [verify_noncommuting_matrix_h_erglotz_inversion.mjs](../../../verification/verify/verify_noncommuting_matrix_h_erglotz_inversion.mjs)

## Executive result

Consider the genuinely matrix-valued Herglotz response

\[
F(z)=zI+\frac{R_-}{-1-z}+\frac{R_+}{1-z},
\]

with positive rank-one residues

\[
R_-=\begin{pmatrix}1&0\\0&0\end{pmatrix},
\qquad
R_+=\begin{pmatrix}1&1\\1&1\end{pmatrix}.
\]

They do not commute:

\[
[R_-,R_+]\ne0.
\]

Under symplectic Fourier inversion,

\[
H(z)=-F(z)^{-1},
\]

the dual response has **four real poles**, each with a positive rank-one matrix residue. The two original poles become zeros of \(\det H\), and the dual ultraviolet behavior is \(-I/z\).

Thus the spectrum-generating interpretation survives the fully noncommuting two-source case:

\[
\boxed{
2\text{ original poles}+\text{UV slope}
\longrightarrow
4\text{ positive mixed-channel dual poles}.
}
\]

## 1. Closed rational form

With common denominator \(1-z^2\), write

\[
F(z)=\frac{N(z)}{1-z^2},
\]

where

\[
N(z)=
\begin{pmatrix}
3z-z^3&z+1\\
z+1&1+2z-z^3
\end{pmatrix}.
\]

Its determinant factorizes as

\[
\det N(z)
=(z^2-1)Q(z),
\]

with

\[
Q(z)=z^4-4z^2-z+1.
\]

The dual simplifies to

\[
\boxed{H(z)=\frac{\operatorname{adj}N(z)}{Q(z)}.}
\]

## 2. Four real dual poles

The quartic has one root in each interval

\[
(-2,-1),
\quad(-1,0),
\quad(0,1/2),
\quad(2,3).
\]

At every simple root \(r_k\), the Herglotz residue is

\[
S_k=-\frac{\operatorname{adj}N(r_k)}{Q'(r_k)}.
\]

The certificate isolates all four roots and verifies

\[
S_k\succeq0,
\qquad
\det S_k=0,
\qquad
\operatorname{tr}S_k>0.
\]

The four residues sum to

\[
\sum_kS_k=I_2,
\]

which matches the ultraviolet expansion

\[
H(z)\sim-\frac{I_2}{z}.
\]

## 3. Original poles become channel zeros

The dual determinant is

\[
\det H(z)=\frac{z^2-1}{Q(z)}.
\]

Hence

\[
\det H(\pm1)=0.
\]

Because the original residues are rank one, the entire dual matrix does not vanish at these points. Instead one dual eigenchannel develops a zero. This is the correct matrix refinement of scalar pole/zero exchange.

## 4. New eigenchannels

The four positive residue rays are not simply copies of \(R_-\) and \(R_+\). Matrix inversion combines the original noncommuting source directions, and each zero of \(\det F\) selects a new null vector whose orthogonal ray becomes the dual residue.

The transformation therefore generates both:

- new pole locations;
- new source mixtures.

This is stronger than applying the scalar duality independently in two fixed eigenchannels.

## 5. Physical reading

The dual poles may be read conditionally as:

- collective modes generated from elementary response channels;
- bound-state or resonance candidates at response zeros;
- source/response Legendre-dual excitations;
- impedance/admittance channel exchange;
- a finite-dimensional model of elementary/composite duality.

No particle interpretation follows without a microscopic action and pole-sheet analysis. The exact statement is spectral reorganization with preserved Herglotz positivity.

## 6. Stop-everything criteria

Stop interpreting the four roots as physical particles if:

1. the response variable is not an observable causal kernel;
2. the poles lie on an unphysical sheet after continuum completion;
3. residue positivity fails in the physical Lorentz tensor sector;
4. gauge or Ward null directions are mistaken for modes;
5. no duality dictionary maps source-normalized observables.

## 7. Next gates

1. Apply the inversion to the incidence/\(B-L\) broken-phase rational response.
2. Track which dual poles originate from up, down, electron and neutrino thresholds.
3. Add continuum widths and determine pole-sheet motion.
4. Compare dual pole phases with Eisenbud–Wigner time delay and bound/free-state transitions.

## Reproducibility

```powershell
node scripts\verify_noncommuting_matrix_h_erglotz_inversion.mjs
```
