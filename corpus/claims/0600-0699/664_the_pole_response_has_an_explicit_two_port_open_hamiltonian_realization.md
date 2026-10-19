# The Pole Response Has an Explicit Two-Port Open-Hamiltonian Realization

**Date:** 17 October 2026  
**Branches:** B01, B04, B05, B07, B08, B11 and the bound/free response branch  
**Claim status:** exact finite-dimensional two-port realization of the pole sector; the linear ultraviolet background remains open  
**Certificate:** [verify_two_port_open_hamiltonian_realization.mjs](../../../verification/verify/verify_two_port_open_hamiltonian_realization.mjs)

## Executive result

The noncommuting residues used in the response programme are not merely formal matrices. The pole part

\[
K(E)=\frac{R_-}{-1-E}+\frac{R_+}{1-E},
\qquad
R_-=\begin{pmatrix}1&0\\0&0\end{pmatrix},
\quad
R_+=\begin{pmatrix}1&1\\1&1\end{pmatrix},
\]

is the reaction matrix of the explicit two-level, two-port system

\[
H_0=\begin{pmatrix}-1&0\\0&1\end{pmatrix},
\qquad
W=\begin{pmatrix}1&0\\1&1\end{pmatrix},
\]

because

\[
\boxed{K(E)=W^T(H_0-EI)^{-1}W.}
\]

Opening the two internal levels to the two channels gives

\[
S_{\rm open}(E)
=I-2iW^T\bigl(E-H_0+iWW^T\bigr)^{-1}W.
\]

For real energy this matrix is unitary, and it agrees with the Cayley scattering matrix of document 663 up to one energy-independent phase:

\[
\boxed{
(K-iI)(K+iI)^{-1}=-S_{\rm open}.
}
\]

The phase \(-1\) changes neither probabilities nor Wigner--Smith delay. The abstract Cayley channels therefore have an exact open-Hamiltonian interpretation for the pole sector.

## 1. Residues are channel-coupling outer products

Let the rows of (W) be

\[
w_-=(1,0),
\qquad
w_+=(1,1).
\]

Then

\[
R_-=w_-^Tw_-,
\qquad
R_+=w_+^Tw_+.
\]

The two nonorthogonal coupling vectors are the physical origin of the noncommuting source residues. The internal Hamiltonian supplies the two bare energies, while (W) says how each internal mode talks to each asymptotic port.

## 2. Why the open scattering matrix is unitary

Define the effective internal Hamiltonian

\[
H_{\rm eff}=H_0-iWW^T.
\]

Its anti-Hermitian part is negative semidefinite, so probability lost from the internal sector is exactly carried into the open channels. Direct matrix algebra gives

\[
S_{\rm open}
=(I-iK_E)(I+iK_E)^{-1},
\qquad
K_E=W^T(E-H_0)^{-1}W=-K.
\]

Since (K_E) is Hermitian on the real axis away from the bare levels,

\[
S_{\rm open}^\dagger S_{\rm open}=I.
\]

This is now a conventional two-port scattering construction with internal states, couplings, and flux-conserving asymptotic channels.

## 3. What has become physical

The construction supplies a literal meaning for:

- the two source faces: the two asymptotic ports;
- the pole locations: bare internal energies of (H_0);
- residue directions: coupling vectors from internal modes into ports;
- residue noncommutativity: incompatible port mixtures of different internal modes;
- the Cayley unitary: the physical open-channel scattering matrix, modulo a constant phase.

This is a genuine bridge from the relational-carrier matrix response to a standard finite open quantum system. It does not yet identify the ports with Standard-Model particles.

## 4. The precise remaining obstruction

The full response studied in documents 661--663 was

\[
F(E)=EI+K(E).
\]

The finite internal Hamiltonian above generates (K(E)), but not the growing background (EI). A finite sum of internal resolvents behaves as (O(E^{-1})), whereas (EI) grows linearly. Consequently:

\[
\boxed{
\text{no finite collection of energy-independent internal levels can generate the }EI\text{ term.}
}
\]

The ultraviolet slope must instead come from one of the following open paths:

1. an energy-dependent self-adjoint boundary condition;
2. a local kinetic term living directly on the channel boundary;
3. a continuum or infinite-mode bath whose renormalized high-energy response is linear;
4. treating (EI) as a prescribed subtraction/background and realizing only the spectral measure dynamically.

This is the newly isolated physical gate.

## 5. Consequence for the four dual poles

The earlier four-pole dual spectrum depended on both the two noncommuting pole residues and the (EI) ultraviolet slope. The present construction therefore realizes the noncommuting ingredient but not yet the complete spectrum-generating system.

It proves that the residue geometry can come from honest channel couplings. It does **not** yet prove that all four dual poles occur in an ordinary finite open Hamiltonian. That stronger claim requires a physical realization of the linear background.

## 6. Stop-everything criteria

Stop calling the full (F(E)) a finite open-Hamiltonian reaction matrix if:

1. the (EI) term is left unexplained;
2. a proposed finite-mode realization has the wrong (E\to\infty) asymptotics;
3. the chosen port normalization does not conserve flux;
4. Standard-Model source labels are assigned without an operator-to-asymptotic-state map;
5. continuum completion moves the relevant zeros to an unphysical sheet.

## 7. Next gates

1. Construct a self-adjoint boundary or lead model that produces the (EI) background exactly.
2. Decide whether the linear term is physical dynamics or a subtraction convention.
3. Add continuum thresholds and test whether the four response zeros survive as resonances.
4. Map the two ports to a conserved Standard-Model source pair with explicit flux normalization.

## Reproducibility

```powershell
node scripts\verify_two_port_open_hamiltonian_realization.mjs
```
