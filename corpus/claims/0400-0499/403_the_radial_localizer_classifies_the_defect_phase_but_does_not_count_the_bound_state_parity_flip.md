# The Radial Localizer Classifies the Defect Phase but Does Not Count the Bound-State Parity Flip

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** explicit separation of two invariants; local spectral-flow parity still requires a separate construction

## 1. The identification that had to be tested

The exact half-line reduction makes the radial determinant a credible class-D
localizer marker. It does not automatically follow that this marker changes
whenever a localized Hamiltonian eigenpair crosses zero as the selector
coefficient \(\delta\) varies.

There are two potentially different objects:

\[
\mathcal Z_{\rm rad}(\delta)
=\operatorname{sign}\det B_{r,\kappa}(\delta),
\]

and the mod-two spectral flow of the physical Majorana Hamiltonian

\[
\operatorname{Sf}_2\{A(\delta)\}.
\]

They must be compared, not identified by name.

## 2. Small-system comparison

For \((L,M)=(2,2)\), radial center \(r=1/2\) and \(\kappa=0.2\), the defect
radial marker is negative approximately on

\[
\boxed{1.108929<\delta<1.348322}.
\]

The localized defect Hamiltonian root is

\[
\delta_{\rm H}\approx1.263992.
\]

At that root:

- the Hamiltonian singular value is below \(10^{-7}\);
- the radial-localizer gap is approximately \(0.03716\);
- the radial sign is \(-1\) on both sides.

The localizer is therefore far from closing when the bound state crosses zero.

## 3. Larger-circumference comparison

For \((L,M)=(4,2)\), the localized Hamiltonian root is approximately

\[
\delta_{\rm H}\approx1.257363.
\]

At \(\delta=1.24,1.257363,1.27\), the radial sign remains \(-1\). At the root:

\[
\text{Hamiltonian gap}<10^{-6},
\qquad
\text{radial-localizer gap}\approx0.03855.
\]

The separation is not a small-lattice accident.

## 4. Correct interpretation

The radial marker classifies a local half-line phase surrounding the defect. A
localized bound-state pair can move through zero *inside* that phase without
changing the phase marker.

This is analogous to distinguishing:

- a topological medium capable of supporting protected boundary or defect
  spectral events;
- the instantaneous occupation parity before and after one particular event.

The radial marker addresses the first. Mod-two spectral flow addresses the
second.

## 5. The two-layer invariant ledger

The programme should now retain both entries:

### Layer A: local phase

\[
\mathcal Z_{\rm rad}^{\rm rel}
=\mathcal Z_{\rm rad}^{\rm ref}\mathcal Z_{\rm rad}^{\rm def}.
\]

This is boundary-stable, width-stable under local normalization and represented
on the exact quotient half-line.

### Layer B: localized event parity

\[
\nu_{\rm event}
=\#\{\text{defect-localized zero crossings on the parameter path}\}\bmod2.
\]

This requires the localization projector to distinguish defect crossings from
reference-edge and extended crossings. The earlier paired-nullspace analysis
provides precisely that classification data.

Neither layer substitutes for the other.

## 6. Consequence for the causal coefficient

The causal value \(\delta=1.25\) lies inside the radial defect phase and close to
the localized Hamiltonian crossing near \(1.26\). These are now two separate
compatibility statements:

1. \(1.25\) belongs to the tested local radial phase;
2. \(1.25\) lies just below a localized parity-changing spectral event.

The first is robust against the tested remote-boundary perturbations. The second
depends on the normalized Hamiltonian parameters and remains nonpredictive.

## 7. Correction to the programme language

The radial localizer should not be described as directly measuring the
bound-state parity flip. It detects the local topological environment in which
the flip occurs.

Likewise, the localized Hamiltonian crossing should not by itself be called a
phase boundary of the radial localizer.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** prove an index theorem relating the radial phase,
the endpoint fiber and the parity of localized spectral flow under a specified
parameter interpolation, including the correction term that allows crossings
inside a fixed localizer phase.

**Equality falsifier:** identify \(\mathcal Z_{\rm rad}\) with instantaneous
bound-state parity after observing no sign change at the zero crossing.

**Spectral-flow falsifier:** count every finite-system Pfaffian root without the
defect-localization projector.

**Phase falsifier:** call the Hamiltonian zero at \(1.263992\) a radial-phase
boundary while the radial localizer gap remains approximately \(0.037\).

**Prediction falsifier:** infer the physical parity from \(\delta=1.25\) without
fixing the path endpoint and occupation convention.

## 9. Pinned dependency and continuation

The radial phase branch remains active and credible. Pin its identification
with spectral-flow parity.

The next executable construction is a localized crossing ledger: follow the
paired near-zero projector over \(\delta\), assign each Hamiltonian root to
defect, edge or extended support, and count only the defect-localized crossings
modulo two along a declared parameter interval.

## 10. Certificate

The [phase-versus-flow certificate](../../../verification/verify/verify_radial_phase_does_not_equal_bound_state_spectral_flow.mjs)
checks the radial phase boundaries, Hamiltonian closures and nonzero localizer
gaps on both small and enlarged circumference systems.

## Companion documents

- [Exact radial half-line quotient](402_each_pin_glide_sector_is_exactly_a_block_jacobi_half_line_with_a_doubled_positive_radius_fiber.md)
- [Defect-localized Hamiltonian crossing](../0300-0399/393_the_upper_pin_boundary_is_defect_localized_and_nearly_converged_in_transverse_width.md)
- [Remote reference-boundary contamination](../0300-0399/394_circumference_scaling_preserves_the_defect_root_but_exposes_reference_boundary_contamination.md)
