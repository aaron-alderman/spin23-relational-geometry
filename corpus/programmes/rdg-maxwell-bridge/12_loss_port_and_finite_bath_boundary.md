# RDG--Maxwell Bridge 12: loss-port and finite-bath boundary

**Date:** 26 October 2026

**Status:** exact port closure and exact finite-bath recurrence counterexample

**Programme:** [RDG--Maxwell bridge](README.md)

**Evidence:** [port and bath record](../../../evidence/data/rdg-maxwell-port-and-bath-v1.json)

**Verifier:** [port and bath verifier](../../../verification/verify/verify_rdg_maxwell_port_and_bath.mjs)

## Question

When a damped material oscillator loses energy, what carrier receives it?

There are two honest levels of answer:

1. an output port closes the reduced energy bookkeeping;
2. a larger conservative bath carries the energy microscopically.

They are not the same model, and a finite bath does not produce permanent
irreversibility.

## Exact dissipative port

For

\[
 \dot P=V,
 \qquad
 \dot V=-\omega_0^2P-\gamma V,
\]

use the material energy

\[
 H=\frac{1}{2\omega_p^2}
   \left(V^2+\omega_0^2P^2\right).
\]

Let

\[
 y=\frac{\sqrt\gamma}{\omega_p}V.
\]

The finite certificate verifies

\[
 K^{\mathsf T}L+LK=-2C^{\mathsf T}C,
 \qquad
 \dot H=-y^{\mathsf T}y.
\]

For \(\omega_0=2\), \(\omega_p=1.5\), \(\gamma=0.3\), the matrix residual is
\(5.6\times10^{-17}\). A sampled state gives identical energy-loss and port
power values to \(2.8\times10^{-17}\).

This is a complete reduced balance law. Energy has not silently disappeared;
it has crossed a declared port. The state of whatever receives the port power
is still outside the model.

## Finite conservative carrier

The certificate next couples two identical unit-frequency oscillators with
\(\kappa=3/2\). The normal frequencies are 1 and 2. Its positive energy metric
satisfies

\[
 K_{\rm bath}^{\mathsf T}L_{\rm bath}
 +L_{\rm bath}K_{\rm bath}=0
\]

exactly.

Starting with all excitation in the observed oscillator:

- at \(t=\pi\), the observed position and momentum are zero and the bath
  oscillator carries the excitation;
- at \(t=2\pi\), the complete initial state returns;
- total energy is \(1.25\) at all three sampled times.

The recurrence residual is \(6.1\times10^{-16}\).

Thus a finite bath converts apparent attenuation into reversible transfer. It
can resemble damping over a restricted observation window, but the return
channel remains part of the exact dynamics.

## Irreversibility boundary

A finite autonomous system with positive conserved quadratic energy has
oscillatory or quasiperiodic normal modes. Exact permanent exponential decay of
an observed subsystem therefore requires an additional limiting or
coarse-graining step, such as:

- an infinite or continuous bath spectrum;
- a thermodynamic limit;
- stochastic resetting;
- an outgoing-wave limit with no monitored return;
- an explicitly assumed contraction semigroup.

The coefficient \(\gamma\) hides this choice if it is introduced without a
port or bath statement.

## Detector implication

An attenuation experiment should distinguish:

\[
 \text{stored field energy},\quad
 \text{material energy},\quad
 \text{outgoing port power},\quad
 \text{return/echo power},\quad
 \text{unaccounted residual}.
\]

A short observation window can misclassify reversible bath transfer as loss.
Conversely, measuring port power without the receiving carrier closes energy
accounting but not microscopic reversibility.

## RDG interpretation

The bath assumption is another admissibility coordinate:

- **closed finite carrier:** expect recurrence;
- **open port:** energy accounting closes at the boundary;
- **continuum bath/limit:** irreversible reduced evolution can emerge;
- **missing port and missing bath:** attenuation is untyped disappearance.

This locates thermodynamic irreversibility in the map between carrier levels,
not in the bare Maxwell differential.

## Logical boundary

- **Exact:** port-Hamiltonian identity, sampled power balance, positive finite
  bath conservation, complete transfer and recurrence.
- **General mathematical boundary:** finite positive conservative systems do
  not generate a strictly dissipative semigroup on the whole closed state.
- **Open:** continuum spectral density, fluctuation--dissipation noise,
  temperature, quantum bath statistics and experimental port calibration.
- **Not claimed:** that real material losses recur on accessible timescales.

## Corpus links

- [Sources, resonance and material-memory gate](04_sources_resonance_and_material_memory_gate.md)
- [Hodge, constitutive and dynamics gate](03_hodge_constitutive_and_dynamics_gate.md)
- [Dynamic response, geometry, detection and metastability](../admissibility/admissibility_06_dynamic_response_geometry_detection_metastability.md)

