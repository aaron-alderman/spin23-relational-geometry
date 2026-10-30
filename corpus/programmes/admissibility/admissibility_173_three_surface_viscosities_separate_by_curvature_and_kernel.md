# Three surface viscosities separate by curvature and kernel

**Date:** 30 October 2026

**Status:** exact energy-form comparison and quotient-kernel witnesses closed; finite vector spectra remain open

**Parent:** [refined scalar throat operator](admissibility_172_refined_throat_spectrum_and_curved_linear_energy_closure.md)

**Evidence and executable:** [three-convention contract](../../../evidence/data/admissibility-surface-viscosity-three-convention-v1.json); [energy and kernel verifier](../../../verification/admissibility/verify_surface_viscosity_three_conventions.mjs)

**Primary literature:** [Chan, Czubak and Disconzi, *The formulation of the Navier--Stokes equations on Riemannian manifolds*](https://doi.org/10.1016/j.geomphys.2017.07.015); [Prüss, Simonett and Wilke, *On the Navier--Stokes equations on surfaces*](https://doi.org/10.1007/s00028-020-00648-0); [Simonett and Wilke, surface Stokes operator](https://doi.org/10.1007/s00021-022-00742-y); [Miura, curved thin-domain limit](https://arxiv.org/abs/2002.06350)

## Result

All three proposed viscosity conventions are mathematically coherent, commute
with the deck isometries and dissipate nonnegative quadratic energies. They
are nevertheless inequivalent on the curved throat.

Use positive-operator conventions:

\[
\Delta_H=d\delta+\delta d,\qquad
\Delta_B=\nabla^*\nabla,\qquad
\Delta_D=2\,\mathrm{Def}^*\mathrm{Def}.
\]

For a divergence-free tangent field on a two-dimensional surface,

\[
\boxed{
Q_H=Q_B+\int K|u|^2\,dA,\qquad
Q_D=Q_B-\int K|u|^2\,dA.
}
\]

Thus curvature places the Bochner form between the Hodge and deformation
forms pointwise in operator identity, although the ordering of integrated
energies depends on where the field lives relative to positive and negative
curvature.

## Ordinary modes already separate

For the two previously used streamfunction carriers:

| field | Hodge | Bochner | deformation | curvature record |
|---|---:|---:|---:|---:|
| \(A=\cos x\cos y\) | 33.82237 | 39.23617 | 44.64997 | -5.41380 |
| \(B=\sin2x\sin y\) | 270.68999 | 288.32649 | 305.96298 | -17.63649 |

The verifier computes the covariant derivative, symmetric strain, exterior
derivative and curvature integral independently. Both Weitzenböck-type energy
identities close within \(5.1\times10^{-11}\).

These fields concentrate their gradient energy so that the curvature record
is negative. Consequently

\[
Q_H<Q_B<Q_D.
\]

Another field distribution could reverse that ordering. The invariant fact
is the signed curvature separation, not this particular inequality.

## The kernels are the decisive distinction

The three null spaces have different meanings:

| convention | zero-dissipation fields |
|---|---|
| Hodge | harmonic one-forms |
| Bochner | parallel vector fields |
| deformation | Killing vector fields |

On a flat torus these distinctions can collapse. The throat separates them.

### Klein harmonic circulation

The one-form

\[
\alpha=dx
\]

is harmonic and descends through the Klein reflection. Its dual velocity is
\(u=e^{-2\sigma}\partial_x\). The measured forms are

\[
Q_H=0,\qquad Q_B=10.82760,\qquad Q_D=21.65520.
\]

Hodge viscosity preserves this topological circulation exactly; Bochner and
deformation viscosity dissipate it.

### Rotation Killing flow

The vector field

\[
u=\partial_y
\]

is a Killing field for the \(x\)-dependent throat and descends through the
rotation quotient. It does not descend through the Klein reflection because
the deck differential reverses its \(y\)-component. Its energies are

\[
Q_H=19.14700,\qquad Q_B=9.57350,\qquad Q_D=0.
\]

Deformation/Boussinesq--Scriven viscosity preserves this rigid surface
motion; Hodge and Bochner viscosity dissipate it.

The throat has no nonzero globally parallel field in these witnesses, so the
Bochner convention preserves neither carrier.

## Physical disposition

The branches now have different authorities:

- **Hodge:** mathematically natural for differential forms, commutes cleanly
  with Hodge decomposition and preserves cohomological circulation.
- **Bochner:** connection diffusion; geometrically natural but its standalone
  use is not the stress-divergence law of a Newtonian surface fluid.
- **Deformation:** follows from the Boussinesq--Scriven symmetric surface
  stress, has the energy law
  \[
  \frac{dE}{dt}=-2\mu_s\int|\mathrm{Def}\,u|^2\,dA,
  \]
  and is the convention advocated by continuum-mechanical derivations.
- **Thin-layer limit:** Miura's result supplies a route from a three-dimensional
  curved layer to a surface equation with geometry, weighting and possible
  damping determined by the layer assumptions; it does not license choosing
  a surface operator independently of those assumptions.

Therefore “try all three” does not end in three equally physical models. It
produces one form-theoretic model, one connection-diffusion control and one
stress-derived surface-fluid model.

## Corpus implication

The operator choice is itself a selector:

\[
\text{same carrier and metric}
+\text{different constitutive admissibility}
\to\text{different protected records}.
\]

The topology-sensitive detector can be a zero mode:

- persistent \(dx\) circulation favours the Hodge channel;
- persistent rigid \(y\)-flow favours the deformation channel on the rotation
  quotient;
- decay of both is compatible with Bochner diffusion.

This is much stronger than fitting three nearby decay rates.

## Bounds

The calculation compares energy forms and exact kernel witnesses. It does not
yet compute complete vector spectra or nonlinear trajectories. Experimental
imperfections will weakly lift ideal zero modes, so a laboratory must compare
their scaling under controlled throat strength rather than demand literal
infinite lifetime.

## Next gate

Build finite one-form/vector bases containing both exact circulation classes
and coexact streamfunction modes. Assemble the three quadratic-form matrices,
solve their low generalized spectra and determine:

1. which kernel dimensions survive each quotient;
2. how the first positive gaps scale with throat strength;
3. whether the shared calibration block remains shared;
4. which decay ratios distinguish curvature convention from topology.

The exact nullities and first witness-gap law are now closed in the
[kernel-dimension and quadratic-scaling gate](admissibility_174_viscosity_kernel_dimensions_and_quadratic_throat_gap_law.md).
The protected channels remain zero while every competing witness gap opens as
\(O(\varepsilon^2)\).

## Verdict

All three options lead somewhere, but not to the same place. Hodge protects
cohomology, deformation protects isometries, and Bochner protects parallel
transport. The conformal throat and Klein reflection make those semantic
differences into distinct measurable zero-mode ledgers.
