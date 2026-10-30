# Finite-amplitude Klein flow closes the flat-domain dynamics gate

**Date:** 30 October 2026

**Status:** dependency-free Fourier--Galerkin evolution passes refinement and conservation gates; rotation control and curved throat remain open

**Parent:** [first nonlinear Klein triad](admissibility_167_klein_selector_closes_the_first_nonlinear_triad.md)

**Evidence and executable:** [simulation contract](../../../evidence/data/admissibility-klein-pseudospectral-flow-v1.json); [independent finite-amplitude verifier](../../../verification/admissibility/verify_klein_pseudospectral_flow.mjs)

## Result

The flat-domain branch now runs through finite-amplitude time evolution. The
verifier solves

\[
\partial_t\omega+J(\psi,\omega)=\nu\Delta\omega,\qquad
-\Delta\psi=\omega
\]

on the \(2\pi\)-periodic torus double cover, with

\[
\omega(x+\pi,-y)=-\omega(x,y).
\]

It uses an exact retained-mode convolution rather than an FFT, so no grid
alias is present inside the declared Fourier--Galerkin truncation. Classical
fourth-order Runge--Kutta advances the modes; the reality and Klein conditions
are projected after each stage.

The initial streamfunction is the normalized joined state

\[
\psi_0=\cos x\cos y+\sin 2x\sin y.
\]

The viscosity is \(\nu=0.01\), and the system evolves to \(t=0.4\).

## Refinement result

The initial \(K=4\) truncation failed the intended refinement gate against
\(K=6\), differing in the common low modes by approximately \(4.63\times
10^{-3}\). That run is rejected rather than normalized into agreement.

The admitted pair is:

| run | maximum wavenumber | step | final time |
|---|---:|---:|---:|
| coarse | 6 | 0.001 | 0.4 |
| fine | 8 | 0.0005 | 0.4 |

Their common low-mode relative difference is

\[
9.9614\times10^{-4},
\]

below the preregistered \(1.1\times10^{-3}\) bound. The energy fraction on
the fine spectral boundary is

\[
4.35\times10^{-8},
\]

so the retained spectrum is not visibly piling energy against the cutoff.
This is a bounded numerical refinement result, not a proof of continuum
convergence.

## Energy and enstrophy ledger

With unit initial energy, the fine run gives

\[
\begin{aligned}
E(0)&=1,&E(0.4)&=0.9674627743,\\
Z(0)&=4.1428571429,&Z(0.4)&=3.9910768388.
\end{aligned}
\]

For the chosen normalization,

\[
\frac{dE}{dt}=-2\nu Z.
\]

The trapezoidal viscous-budget residual is

\[
-2.31\times10^{-12}
\]

in the fine run and \(-9.27\times10^{-12}\) in the coarse run. Energy and
enstrophy both decrease; no hidden work port is present.

## The topology survives without corrective projection

Projection after each Runge--Kutta stage prevents roundoff accumulation, but
could conceal an equation that actually leaves the selected sector.
Therefore the verifier also inspects the raw, unprojected right-hand side.

The maximum forbidden-sector ratio is

\[
8.87\times10^{-16}
\]

for the fine run. The nonlinear and viscous vector field itself therefore
closes on the Klein-selected subspace to floating-point precision. The exact
projection is housekeeping, not the mechanism producing closure.

## Predicted daughters appear

At \(t=0.4\), the fine amplitudes of the four modes predicted by the exact
triad calculation are:

| mode | amplitude |
|---|---:|
| \((1,0)\) | 0.16677493 |
| \((3,0)\) | 0.47241177 |
| \((1,2)\) | 0.24195226 |
| \((3,2)\) | 0.06868594 |

The numerical evolution therefore recovers every analytic daughter rather
than merely preserving aggregate energy.

## What this changes in the corpus

The chain is now executable:

\[
\boxed{
\text{nonorientable return law}
\to\text{admissible Fourier sector}
\to\text{closed quadratic interaction graph}
\to\text{finite-amplitude viscous evolution}
\to\text{signed detector record}.
}
\]

This is a clean example of admissibility preceding dynamics. The quotient
does not dictate the trajectory, but it determines the state space and
interaction channels on which the trajectory is permitted to run.

The result also clarifies the carrier grammar:

- **carrier:** real divergence-free vorticity modes;
- **dual face:** points related by the orientation-reversing deck map;
- **selector:** anti-invariant quotient law and spectral cutoff;
- **relation:** Poisson-bracket convolution;
- **detector:** daughter spectrum, signed one-lap velocity and dissipative
  budgets.

## Bounds and next experiment

Still absent are:

- an equal-dimension orientation-preserving rotation control;
- physical no-slip walls;
- taper, curvature, torsion and a throat;
- three-dimensional vortex stretching;
- experimental ports and a realizable recirculating device.

The next calculation should not add all of these at once. First construct a
matched rotation-sector simulation with equal resolved dimension, initial
energy, enstrophy and forcing power. Compare mode accessibility and transfer
while keeping viscosity, integrator and detector fixed. Only then add the
curved metric.

That control is now closed in the
[equal-dimension rotation comparison](admissibility_169_equal_dimension_rotation_control_isolates_the_signed_return.md).
It shows that total dissipation is weakly discriminating, while daughter-mode
accessibility and the signed one-lap return separate the sectors.

## Verdict

The flat Klein-domain dynamics gate closes at finite amplitude. The admitted
claim is computationally modest but structurally important: a
nonorientation-preserving identification defines a numerically stable,
nonlinearly closed fluid sector with a distinctive signed return record. It
does not solve Navier--Stokes, create energy or establish that a pictured
three-dimensional throat realizes the quotient.
