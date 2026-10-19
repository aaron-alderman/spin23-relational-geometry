# Lorentzian Pole Residues: Positive Even and Odd Boundary Channels

**Date:** 17 October 2026  
**Branches:** B05, B06 and B08  
**Claim status:** exact free-field spectral result; no unique Standard-Model pole relation yet

## 1. From positive-realness to spectral data

The Laplace-domain impedance eigenvalues for half-length \(a=L/2\) are

\[
Z_+(s)=\frac{\kappa(s)}s\tanh(a\kappa(s)),
\qquad
Z_-(s)=\frac{\kappa(s)}s\coth(a\kappa(s)),
\]

where

\[
\kappa(s)^2=m^2+s^2.
\]

The \(+\) and \(-\) channels are the even and odd combinations of the two boundary values.

Positive-realness constrains the residues of lossless poles. The next gate is to calculate them rather than merely assert passivity.

## 2. Pole locations

The even-channel poles occur when

\[
\cosh(a\kappa)=0,
\qquad
a\kappa=i\pi\left(n+\frac12\right),
\quad n\ge0.
\]

Writing

\[
q_{+,n}=\frac{\pi(n+1/2)}a,
\]

their frequencies satisfy

\[
\Omega_{+,n}^2=m^2+q_{+,n}^2.
\]

The odd poles occur at

\[
\sinh(a\kappa)=0,
\qquad
a\kappa=i\pi n,
\quad n\ge1,
\]

with

\[
\Omega_{-,n}^2=m^2+\left(\frac{\pi n}a\right)^2.
\]

The apparent \(n=0\) singularity of \(\coth\) is cancelled by the prefactor \(\kappa\), so it is not a pole.

## 3. Exact residue sign

Both \(\tanh z\) and \(\coth z\) have residue \(1\) at their simple poles. Since

\[
\frac{d\kappa}{ds}=\frac{s}{\kappa},
\]

the residue of either impedance eigenvalue at \(s=i\Omega_n\) is

\[
\boxed{
\operatorname*{Res}_{s=i\Omega_n}Z_\pm(s)
=\frac{q_n^2}{a\Omega_n^2}>0.
}
\]

In the two-face basis, the residue matrices are

\[
R_{+,n}P_+,
\qquad
R_{-,n}P_-,
\]

with

\[
P_\pm=\frac12
\begin{pmatrix}
1&\pm1\\
\pm1&1
\end{pmatrix}.
\]

Each residue is positive semidefinite and rank one. The pole excites exactly one reciprocal boundary eigenchannel.

## 4. Exact checkpoint

Choose \(m=1\) and \(a=\pi\). Then the first four poles interlace as

\[
\Omega_{+,0}^2=\frac54
<
\Omega_{-,1}^2=2
<
\Omega_{+,1}^2=\frac{13}4
<
\Omega_{-,2}^2=5.
\]

The normalized residues \(aR\) are

\[
\frac15,\quad
\frac12,\quad
\frac9{13},\quad
\frac45,
\]

all positive.

## 5. Physical meaning

This establishes more than stability of a Euclidean Hessian:

- the causal response has the expected lossless normal-mode spectrum;
- every pole carries positive spectral weight;
- even and odd modes alternate;
- the residue matrix identifies the boundary combination coupled to each mode;
- no negative-norm boundary excitation appears in the free model.

It does not yet distinguish \(Spin(2,3)\) from a generic passive two-port field theory. The discriminating result must be a symmetry-protected relation among pole positions or residues that survives interactions and counterterms.

## 6. Candidate protected relations

The free homogeneous interval has:

\[
\Omega_{\pm,n}^2-m^2=q_{\pm,n}^2
\]

and

\[
aR_{\pm,n}=1-\frac{m^2}{\Omega_{\pm,n}^2}.
\]

These relations follow from the free second-order bulk equation, not uniquely from Jordan or \(Spin(2,3)\) structure. A stronger theory would need to protect an inter-channel sum rule, residue ratio, degeneracy or high-frequency asymptotic coefficient.

## 7. Stop-everything and falsification tests

**Positive:** a realistic boundary/Standard-Model sector obeys a nontrivial even–odd pole or residue relation forced by the shared Jordan selector.

**Negative:** the selector produces a negative residue, an upper-half-plane pole or a violation of the positive-real sum rules.

**Current result:** the free carrier passes the spectral unitarity gate but supplies no unique phenomenological prediction.

## 8. Certificate

The [pole-residue certificate](../../../verification/verify/verify-lorentzian-pole-residues.mjs) verifies exact squared frequencies, interlacing, normalized residues and positive rank-one channel projectors for the first four modes.

## Companion documents

- [Lorentzian passivity](70_lorentzian_passivity_and_causal_response.md)
- [Contractive scattering coordinates](68_jordan_response_to_contracting_scattering.md)
- [Boundary displacement kernel](67_scalar_boundary_displacement_kernel.md)
