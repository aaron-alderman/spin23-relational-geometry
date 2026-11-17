# Gauge flux and the Casimir bridge

**Date:** 8 November 2026  
**Status:** conditional finite boundary construction and leading electromagnetic dipole calculation  
**Parent:** [programme record](README.md)  
**Evidence:** [boundary action audit](../../../evidence/data/selector-flux-boundary-action-audit-v1.json), [optical-to-force calculation](../../../evidence/data/selector-flux-optical-casimir-polder-bridge-v1.json)

## A physical loop fixes a relative phase

The corpus's [cut-and-glue construction](../rdg-maxwell-bridge/06_topology_cut_holonomy_and_boundary_record_gate.md) retains a Wilson-loop phase as a boundary transition after cutting a loop. The observable is the closed-loop phase, not the phase of an individual open-path matrix element. This is a useful boundary dictionary, but does not identify a material oscillator or its physical dipole.

The conditional construction uses two boundary sites, \(L,R\), joined through internal sites \(a,b\). Charged hopping terms carry the gauge connection,

\[
H_{ij}=t_{ij}\exp\!\left[\frac{iq}{\hbar}\int_j^i\mathbf A\cdot d\mathbf l\right].
\]

It is a newly supplied four-state model, not an E8 reduction or an identified device action. Internal-site elimination produces

\[
H_{\rm eff}(z)=H_{PP}+H_{PQ}(z-H_{QQ})^{-1}H_{QP},
\]

and, in the stated endpoint gauge,

\[
g_{LR}(z,\Phi)=\frac{t_{La}t_{aR}}{z-\epsilon_a}
+\frac{t_{Lb}t_{bR}}{z-\epsilon_b}e^{iq\Phi/\hbar}.
\]

The common shorthand \(g(\Phi)=g_1+g_2e^{iq\Phi/\hbar}\) requires a further narrow-band or off-resonant reduction. Generic boundary mixing is energy dependent.

## Elimination also changes the source

For the fixture's diagonal site dipole, define \(R(z)=(z-H_{QQ})^{-1}\). Between eigenstates of energies \(z_m,z_n\), the induced boundary dipole vertex is

\[
D_{\rm eff}(z_m,z_n)=D_{PP}+H_{PQ}R(z_m)D_{QQ}R(z_n)H_{QP}.
\]

The projected boundary vector is normalized using

\[
N(z)=I+H_{PQ}R(z)^2H_{QP}.
\]

Retaining the induced vertex and normalization reproduces the full fixture's transition matrix elements to numerical precision. Using \(D_{PP}\) alone loses the eliminated sites' response. A general dipole with nonzero source cross blocks requires additional terms.

The same action supplies source derivatives and contacts. The fixture has no explicit quadratic electric-field term in its full linear length-gauge source; vector-link phase derivatives and elimination generate their own specified contacts. This is not a license to set contacts to zero in an independently chosen material model.

Gauge transformations, flux periodicity, a one-path-off control, projected resolvents and the finite dipole double-commutator sum rule are checked by the [boundary calculation](../../../scripts/audit-selector-flux-boundary-action.py).

## One spectrum supplies the imaginary-frequency response

The leading electric-dipole calculation places the fixture, treated as a pointlike neutral polarizable object, beside an infinite ideal conducting plane. The only polarizability is parallel to the surface. At zero temperature,

\[
\alpha_x(i\xi)=\sum_j\frac{2\Delta E_j|D_{j0}|^2}{\Delta E_j^2+\hbar^2\xi^2}.
\]

The electromagnetic Casimir–Polder interaction is

\[
U=-\frac{\hbar}{64\pi^2\epsilon_0 L^3}\int_0^\infty d\xi\,
\alpha_x(i\xi)e^{-2u}(1+2u+4u^2),\qquad u=\xi L/c,
\]

with force \(F=-\partial_L U\). This is a leading electromagnetic point-dipole calculation, rather than the corpus's earlier scalar determinant proxy. Its theoretical parent is [electromagnetic scattering theory](https://arxiv.org/abs/0908.2649).

With the fixture parameters held fixed across flux, the half-flux force magnitude changes by about 20.76–20.84% across the three dimensionless separations tested. Independent integration, energy differentiation and retarded/nonretarded limits pass. This percentage belongs to the assumed four-state model and ideal plane. It is not assigned to the hybrid device or to a measured material.

## Boundaries of the force result

The charge, length and energy normalization remain inputs. The calculation excludes permanent-dipole electrostatics, direct forces from a flux apparatus, finite-size corrections, magnetic response, finite temperature and material dispersion of the opposing surface. Its finite spectrum is complete only for the declared fixture.

The [Casimir spectral-coverage gate](../admissibility/admissibility_58_casimir_spectral_coverage_and_distance_gate.md) remains controlling for a physical material: relevant tensor components and frequency tails must be known on the same specimen and propagated through its actual geometry. Analytic continuation to imaginary frequency is not a physical Wick rotation of a photon into matter, and an algebraic representation Casimir is not a force prediction.

The discriminator is a single independently calibrated response that predicts both unseen optical records and a boundary force without fitting a second material response to the force data.
