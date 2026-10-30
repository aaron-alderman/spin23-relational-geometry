# Klein/throat surface-fluid branch exhaustion and physical disposition

**Date:** 30 October 2026

**Status:** analytic and dependency-free computational branch exhausted; physical realization and empirical ring-down remain external

**Parents:** [Klein Navier--Stokes gate](admissibility_165_klein_twisted_throat_navier_stokes_gate.md), [three surface viscosities](admissibility_173_three_surface_viscosities_separate_by_curvature_and_kernel.md), [six ring-downs](admissibility_176_six_surface_viscosity_ringdowns_and_minimum_observation_times.md)

## Result

The investigation has progressed from a visual Klein-bottle analogy to a
typed, executable surface-fluid programme and reached its honest stopping
boundary.

The completed chain is

\[
\boxed{
\begin{aligned}
\text{return topology}
&\to\text{deck-equivariant carrier}\\
&\to\text{linear and nonlinear mode selection}\\
&\to\text{finite-amplitude flat flow}\\
&\to\text{compatible curved throat}\\
&\to\text{scalar generalized operator}\\
&\to\text{three tangent-viscosity forms}\\
&\to\text{six vector spectra and ring-downs}.
\end{aligned}}
\]

No step requires identifying local helical appearance with nonorientable
topology, and no step makes a Navier--Stokes regularity claim.

## What is closed

### Topology and carrier

- The Klein quotient is implemented by
  \(I(x,y)=(x+\pi,-y)\) on the torus cover.
- Pressure is deck-even, the streamfunction is deck-odd and velocity is
  deck-equivariant.
- Signed transverse response reverses after one traversal and closes after
  two; power erases the sign.

### Flat dynamics

- Exact Stokes modes satisfy the quotient.
- The first nonlinear triad remains in the selected sector.
- A dependency-free Fourier--Galerkin evolution closes its energy and
  enstrophy budgets under refinement.
- An equal-dimension rotation control separates signed return and accessible
  daughter modes while showing that total dissipation is a weak detector.

### Throat geometry

- The area-normalized conformal throat descends through both quotients.
- Total area and Gauss--Bonnet curvature close.
- Geometry mixes only symmetry-compatible modes.
- The generalized scalar spectrum separates into shared calibration and
  topology-sensitive blocks.
- Its lowest Ritz values pass basis enlargement and its curved linear energy
  identity closes.

### Three viscosity conventions

For positive quadratic forms,

\[
Q_H=Q_B+\int K|u|^2dA,\qquad
Q_D=Q_B-\int K|u|^2dA.
\]

Their protected carriers differ:

| convention | protected record |
|---|---|
| Hodge | harmonic/cohomological circulation |
| Bochner | parallel vector field |
| deformation | Killing/isometric motion |

Mixed vector spectra independently recover:

| quotient | Hodge nullity | Bochner nullity | deformation nullity |
|---|---:|---:|---:|
| Klein | 1 | 0 | 0 |
| rotation | 2 | 0 | 1 |

Competing witness gaps open quadratically with throat strength. All six
linear energy ledgers close, and their minimum observation times are known.

## Physical disposition

The three conventions should not be promoted equally.

### Deformation/Boussinesq--Scriven: primary physical branch

The symmetric surface-stress law gives

\[
T_\Sigma=2\mu_s\mathrm{Def}_\Sigma u-\pi P_\Sigma
\]

and dissipates

\[
\frac{dE}{dt}=-2\mu_s\int|\mathrm{Def}_\Sigma u|^2dA.
\]

Continuum-mechanical derivations and the surface-fluid literature therefore
make this the preferred model for a Newtonian material interface. Miura's
thin-layer programme further shows that a three-dimensional curved layer can
converge to a weighted surface equation with curvature and damping determined
by the layer and boundary assumptions. A real apparatus must inherit its
operator from that construction rather than select one for convenience.

### Hodge: topology-sensitive adversarial branch

Hodge diffusion is natural for one-forms, commutes with Hodge decomposition
and protects cohomological circulation. It is the cleanest mathematical probe
of topology, but that virtue is not by itself a Newtonian-stress derivation.
It remains a legitimate effective model if the physical transport mechanism
diffuses differential-form flux rather than symmetric strain.

### Bochner: connection-diffusion control

Bochner diffusion isolates covariant-gradient smoothing and protects only
parallel fields. It is a useful middle control in the curvature identities,
but standalone Bochner viscosity is not the Boussinesq--Scriven stress
operator.

## Minimum decisive experiment

The first experiment should be a programmable double-cover emulator, not an
immersed Klein-bottle vessel.

1. Realize a periodic two-dimensional acoustic, hydraulic, mechanical or
   numerical lattice representing the torus cover.
2. Program either reflection sewing or rotation sewing at matched ports.
3. Implement the same static throat-weight profile in both configurations.
4. Calibrate the kinetic mass matrix and positive spectrum.
5. Excite signed \(x\)-circulation and \(y\)-motion channels.
6. Perform low-amplitude ring-down beyond \(18.51/\nu\).
7. Repeat across throat strength and test for zero versus
   \(O(\varepsilon^2)\) gaps.
8. Require the shared calibration modes and differential modes to close under
   one frozen model.

Go criteria:

- correct one-lap sign;
- predicted plateau dimension;
- first positive decay within the calibrated uncertainty;
- quadratic lifted-gap scaling;
- closed energy/work ledger.

Stop criteria:

- reflection and rotation controls are indistinguishable under signed
  readout;
- apparent plateaux disappear with increased observation time;
- decay is linear in throat strength without a declared defect mechanism;
- the energy ledger requires an unmeasured active port;
- results depend on scalar power after the signed channel is lost.

## Why the branch stops here

An exact Klein bottle cannot be embedded as a smooth closed surface in
ordinary three-space. A literal fluid vessel therefore requires
self-intersection, a higher-dimensional embedding or an emulated boundary
identification. Selecting and building that implementation is an engineering
and experimental act.

Further numerical elaboration is possible—larger bases, nonlinear tangent
flow, three-dimensional torsion and wall models—but it no longer resolves the
central ambiguity. The current programme already determines:

- which operator is selected by which physical assumption;
- which records distinguish the operators and topologies;
- the required observation scale;
- the negative controls;
- and the conditions under which a result would be uninformative.

The next evidence capable of moving the branch is therefore one of:

1. a declared physical platform and its constitutive derivation;
2. a synthetic quotient implementation with signed vector readout;
3. measured ring-down data;
4. a thin-layer derivation for the exact proposed geometry and boundary law.

## Corpus implication

This branch supplies a concrete realization of admissibility preceding
dynamics:

\[
\text{topology chooses carrier sector},\qquad
\text{constitutive law chooses dissipation kernel},\qquad
\text{geometry chooses mixing and gaps},\qquad
\text{detector chooses which distinction survives}.
\]

None of these can be inferred safely from the others. Their joined matrix is
the physical model.

## Verdict

The Klein/throat surface-fluid branch is analytically and computationally
exhausted at the no-equipment boundary. The preferred Newtonian surface-fluid
model is deformation viscosity; Hodge and Bochner remain essential
adversarial controls. The strongest observable is not total dissipation but a
joined record of signed return, kernel dimension, first positive gap and
quadratic throat scaling.
