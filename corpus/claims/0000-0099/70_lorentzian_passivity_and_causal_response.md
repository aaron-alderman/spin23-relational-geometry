# Lorentzian Continuation: Jordan Positivity Becomes a Positive-Real Impedance

**Date:** 16 October 2026  
**Branches:** B05, B06, B07 and B08  
**Claim status:** exact for the free Klein–Gordon interval; interacting and relativistic boundary-QFT extension open

## 1. Why Euclidean positivity is insufficient

The Euclidean interval produced

\[
X_{m,L}>0.
\]

After Lorentzian continuation, a frequency-domain force response is generally complex and need not be positive as a matrix at every real frequency. Causality and passivity are instead encoded by analyticity and a positive-real condition in the Laplace half-plane.

The correct variable must also be identified. Boundary force is conjugate to boundary velocity, not merely to field amplitude. This inserts an essential factor of \(1/s\).

## 2. Laplace-domain Klein–Gordon interval

For

\[
(\partial_t^2-\partial_x^2+m^2)\phi=0
\]

on \(0\le x\le L\), Laplace transformation with zero initial data gives

\[
(-\partial_x^2+m^2+s^2)\phi_s=0,
\qquad \operatorname{Re}s>0.
\]

Define

\[
\kappa(s)=\sqrt{m^2+s^2}
\]

with the branch analytic for \(\operatorname{Re}s>0\). The boundary force response is

\[
p=X(s)q,
\]

where

\[
X(s)=\frac{\kappa(s)}{\sinh(\kappa(s)L)}
\begin{pmatrix}
\cosh(\kappa(s)L)&-1\\
-1&\cosh(\kappa(s)L)
\end{pmatrix}.
\]

Since boundary velocity is \(v=sq\), the mechanical impedance is

\[
\boxed{Z(s)=\frac{X(s)}s.}
\]

## 3. Energy proof of the positive-real property

Multiply the transformed field equation by \(\bar\phi_s\), integrate by parts, and use outward boundary fluxes. One obtains

\[
q^\dagger X(s)q
=\int_0^L
\left(
|\partial_x\phi_s|^2+(m^2+s^2)|\phi_s|^2
\right)dx.
\]

Dividing by \(s\) and taking the real part gives

\[
\operatorname{Re}\bigl(q^\dagger Z(s)q\bigr)
=\operatorname{Re}(s)
\int_0^L
\left[
\frac{|\partial_x\phi_s|^2+m^2|\phi_s|^2}{|s|^2}
+|\phi_s|^2
\right]dx
\ge0.
\]

Therefore \(Z(s)\) is a matrix-valued positive-real function for \(\operatorname{Re}s>0\). This is the causal/passive replacement for \(X>0\).

The proof is stronger than checking real frequencies. It simultaneously supplies:

- analyticity in the causal half-plane;
- nonnegative supplied power;
- a spectral constraint on every boundary channel;
- the correct frequency-dependent continuation of the static Jordan response.

## 4. Exact rational checkpoint

Take

\[
m=1,
\qquad s=\frac34,
\qquad \kappa=\frac54,
\qquad L=\frac45\log3.
\]

Then

\[
X(s)=
\begin{pmatrix}
25/16&-15/16\\
-15/16&25/16
\end{pmatrix},
\]

with even/odd force eigenresponses \(5/8\) and \(5/2\). The velocity impedance is

\[
Z(s)=
\begin{pmatrix}
25/12&-5/4\\
-5/4&25/12
\end{pmatrix},
\]

with positive eigenvalues \(5/6\) and \(10/3\).

## 5. Real-frequency boundary values

Retarded response is approached with \(s=\epsilon-i\omega\), \(\epsilon\downarrow0\). Below the bulk threshold, \(\kappa\) remains real in the lossless model. Above threshold it becomes imaginary and the response is meromorphic, with normal-mode poles on the real axis in the ideal closed interval.

Accordingly:

- pointwise positivity of \(X(-i\omega+0^+)\) is not expected;
- dissipation appears through the boundary value of the positive-real analytic function;
- an ideal finite lossless interval has delta-function spectral weight at its modes rather than a smooth absorptive part;
- damping or open radiation channels move poles and produce ordinary absorptive response.

This is why a naive substitution \(m\mapsto ik\) followed by a sign test gives the wrong physical gate.

## 6. Relation to the Jordan and symplectic pictures

At each real positive Laplace frequency, \(X(s)\) still lies in \(H_2(\mathbb R)^+\). Globally, however, the physical object is the analytic function

\[
s\longmapsto Z(s)
\]

with values in the matrix positive-real class. Its graph at each \(s\) is a Lagrangian relation, and transfer through layers remains symplectic. The Lorentzian theory therefore upgrades the static Jordan point to a causal analytic curve in the Lagrangian Grassmannian.

That is a substantive refinement of the central narrative:

\[
\text{Jordan cone}
\quad\leadsto\quad
\text{positive-real Jordan-valued response function}.
\]

## 7. Observable and falsification gates

Observable candidates now include poles, residues, phase shifts, group delay and even/odd spectral densities. A physically selected \(Spin(2,3)\) carrier must constrain some of these quantities beyond generic passive-network theory.

**Stop-everything positive:** the internal selector or boundary conformal Ward identity fixes a pole/residue relation shared by the two response eigenchannels.

**Falsification in scope:** the proposed reduction violates positive-real analyticity, introduces upper-half-plane poles, or requires negative supplied power in a physical channel.

**Current limit:** free linear propagation satisfies the causal gate but supplies no unique Standard-Model prediction.

## 8. Certificate

[`verification/verify/verify-laplace-passive-response.mjs`](../../../verification/verify/verify-laplace-passive-response.mjs) checks the exact rational dispersion relation, force response, velocity impedance and positive eigenchannels at a nonzero Laplace frequency. The half-plane positivity statement is established analytically by the energy identity above.

## Companion documents

- [Scalar interval response](64_scalar_interval_dirichlet_to_neumann_branch.md)
- [Scalar network sewing](66_scalar_network_subdivision_invariants.md)
- [Contractive scattering coordinates](68_jordan_response_to_contracting_scattering.md)
- [Jordan–Riccati flow](55_quadratic_hamiltonian_to_jordan_riccati_branch.md)
- [Pole residues and channel positivity](76_lorentzian_pole_residues_and_channel_positivity.md)
