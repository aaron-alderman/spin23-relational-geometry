# Linear flow and antiunitary edge sewing are different dynamics

**Date:** 24 October 2026  
**Status:** exact typing no-go and real-doubled lift  
**Parent:** [Wilson-source link carrier](admissibility_19_conjugation_doubled_wilson_source_as_link_carrier.md)  
**Evidence:** [Linear/antiunitary dynamics ledger](../../../evidence/data/admissibility-furey-linear-versus-antiunitary-dynamics-v1.json)  
**Verifier:** [Semilinearity and realification certificate](../../../verification/admissibility/verify_furey_linear_antiunitary_dynamics_boundary.mjs)

## Result

Two operations that had remained close together in the corpus must be separated physically.

On the four-channel source space

\[
z=(u,\nu,d,e)^T\in\mathbb C^4,
\]

the real matrix

\[
G=F_Cp
\]

satisfies

\[
G^T=-G,
\qquad
G^2=-I.
\]

It defines the complex-linear continuous flow

\[
\boxed{
e^{tG}=\cos t\,I+\sin t\,G,
}
\]

which is the third seed of the full (\mathfrak{sp}_4\) closure.

The uniform sheet-flipping operation required by the connected Wilson-source cover is instead

\[
\boxed{
\Gamma=G K,
}

where (K) is complex conjugation. It is conjugate-linear:

\[
\Gamma(iz)=-i\Gamma(z),
\]

and it obeys

\[
\Gamma^2=-I.
\]

The two operations share (G), but they are not the same dynamics.

## Exact Hamiltonian no-go

Any ordinary Hamiltonian evolution on a fixed complex Hilbert space is complex-linear. Its propagator (U) satisfies

\[
U(iz)=iU(z).
\]

The required edge sewing satisfies the opposite relation. Therefore

\[
\boxed{
U\ne\Gamma
}

for every complex-linear propagator (U) on a nonzero source space.

No choice of pulse coefficient (g(t)), duration or phase can turn the existing (e^{tG}) flow into (GK). This is a typing obstruction, not a failure to tune parameters.

Thus the remaining connected-cover gate cannot be closed by simply deriving the Hamiltonian term already sought for the continuous Furey rotation. There are two distinct physical gates:

1. derive the complex-linear (G) pulse for connected (Spin(2,3)) dynamics;
2. realize the conjugate-linear (GK) edge for sheet-changing transport.

## Real/Nambu lift

Write (z=x+iy) and forget the original complex structure temporarily. On

\[
\mathbb C^4\cong\mathbb R^8,
\]

the antiunitary becomes the real matrix

\[
\Gamma_{\mathbb R}
=
\begin{pmatrix}
G&0\\
0&-G
\end{pmatrix}.
\]

It satisfies

\[
\Gamma_{\mathbb R}^T=-\Gamma_{\mathbb R},
\qquad
\Gamma_{\mathbb R}^2=-I_8,
\qquad
\det\Gamma_{\mathbb R}=+1.
\]

Hence

\[
\boxed{
\Gamma_{\mathbb R}
=\exp\left(\frac\pi2\Gamma_{\mathbb R}\right).
}
\]

The antiunitary edge can be represented as a continuous real orthogonal quarter-turn after doubling/realification. But (\Gamma_{\mathbb R}) anticommutes with the original complex structure. The flow therefore cannot preserve ordinary complex charge typing.

This identifies the physically admissible escape routes:

- a Nambu or Majorana doubled carrier where particle and hole sectors are explicit;
- a Bogoliubov/CAR canonical transformation with a demonstrated charge accounting;
- a boundary or defect sewing rather than bulk time evolution;
- a symmetry relating conjugate histories;
- or an open-system channel whose larger unitary dilation includes the conjugate sector.

## Consequence for the six-cycle

The nested structure is now dynamically typed:

\[
\begin{array}{c|c|c}
\text{operation}&\text{type}&\text{role}\\
\hline
e^{tG}&\text{complex-linear continuous}&Spin(2,3)\text{ Lie flow}\\
GK&\text{conjugate-linear discrete}&\text{sheet flip / odd edge flux}\\
\Gamma_{\mathbb R}&\text{real-linear continuous}&\text{Nambu/doubled lift}
\end{array}
\]

At projective level, repeated edge sewing generates the connected (C_6). At coherent level, (\Gamma^2=-I) retains the central sign and yields the (C_{12}\to C_6\to C_3) tower already present in the corpus.

## Physical frontier

The algebra no longer leaves the implementation ambiguous. A proposed microscopic completion must declare which route it takes and pass the corresponding tests:

- **Nambu route:** specify doubled fields, CAR form, gauge charges and the implementable quadratic generator;
- **boundary route:** specify the interface, orientation reversal and matching conditions;
- **open-system route:** specify the environment and unitary dilation;
- **symmetry route:** do not misreport a relation between histories as real-time evolution.

The next bounded search should therefore look for existing Nambu, particle–hole, sideband or boundary carriers in the corpus that already realize (\Gamma_{\mathbb R}), rather than another Standard-Model scalar mediator for the complex-linear pulse.
