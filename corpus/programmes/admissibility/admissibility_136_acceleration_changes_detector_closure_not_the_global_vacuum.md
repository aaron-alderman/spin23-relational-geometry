# Acceleration changes detector closure, not the global vacuum

**Date:** 26 October 2026  
**Status:** standard detector-theory result; corpus interpretation bounded  
**Parents:** [meaning/inertia audit](admissibility_03_meaning_inertia_collision_audit.md), [seam/channel separation](admissibility_135_a_seam_changes_continuations_but_does_not_by_itself_trigger_decay.md)  
**Evidence:** [observer/horizon/channel audit](../../../evidence/data/observer-horizon-channel-audit-v1.json)

## The thing before the name

A small quantum system travels through a field, couples for a finite time and leaves a click, transition or phase record. Its response is not a property of the field alone. It depends jointly on the field state, the path, the switching window, the energy gap and the coupling:

\[
P(\Omega)\propto\int d\tau\,d\tau'\,\chi(\tau)\chi(\tau')
e^{-i\Omega(\tau-\tau')}W[x(\tau),x(\tau')].
\]

For eternal uniform acceleration in Minkowski vacuum, the pulled-back correlation function is stationary and the long-time excitation and de-excitation rates obey

\[
\frac{\dot F(+\Omega)}{\dot F(-\Omega)}=e^{-2\pi\Omega/a},
\qquad T_U=\frac{a}{2\pi}
\]

in natural units. The executable audit verifies this detailed-balance relation at nine acceleration-gap settings.

## What closes

The clean statement is local: the detector, its worldline and the field correlations available along that worldline close into a thermal response law. An inertial description still assigns the same global Minkowski vacuum. Acceleration changes which correlations the detector can jointly sample; it does not manufacture a second global field state.

This gives the corpus a precise example of scale- and observer-indexed closure. A detector can close over its own transition records without globally closing the field. The same state can support different operational closures because different trajectories retain different orderings and correlations.

## Boundary

- A thermal ratio is not by itself a literal surrounding gas.
- A detector spectrum does not uniquely reconstruct a global state.
- Finite-time switching, nonuniform acceleration, field mass, dimension, derivative coupling and detector smearing can spoil a simple Planck curve without contradicting the asymptotic result.
- Rindler wedges are causal/localization domains, not material walls and not automatically corpus seams.
- An analogue device reproducing the correlation pullback is evidence for the response mechanism, not direct evidence that its laboratory detector accelerated through empty spacetime at the required acceleration.

## Experiment

Use one programmable quantum platform to implement three independently calibrated correlation kernels: inertial vacuum, uniformly accelerated pullback and a thermal bath with the same nominal temperature. Sweep detector gap, interaction duration and switching shape; measure excitation, de-excitation and phase-sensitive two-time response.

### Go/no-go

- **Build gate:** recover the KMS ratio across several gaps, not one fitted population.
- **Separation gate:** distinguish the accelerated-vacuum and literal-bath arms with a preregistered finite-time or higher-correlation record, or report them as detector-equivalent in the tested window.
- **Directness gate:** call the result an emulator unless the worldline, field state and acceleration are physically realized rather than encoded.
- **New-physics gate:** only a reproducible residual outside state, trajectory, switching, coupling and readout covariance reopens fundamental physics.

## Implication

Unruh response supplies the simplest calibration case for the corpus's detector thesis: what is observable is a typed relation among state, path, coupling and record. It also prevents a category mistake. Observer-relative access can change the admitted local description without making global reality observer-created.

