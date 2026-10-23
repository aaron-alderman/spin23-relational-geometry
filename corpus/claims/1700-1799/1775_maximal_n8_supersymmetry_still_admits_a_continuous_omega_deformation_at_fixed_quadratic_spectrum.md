# Maximal N=8 Supersymmetry Still Admits a Continuous Omega Deformation at Fixed Quadratic Spectrum

**Date:** 23 October 2026

**Status:** maximal-supersymmetry selector audit

**Depends on:** [the representative N=2 result](1774_extended_supersymmetry_reaches_the_same_boundary_a_specific_gauging_vacuum_and_torsion_map.md) and [the cross-sector symmetry classification](1770_cross_sector_symmetry_is_exhausted_at_supersymmetry_or_nonstandard_asymptotic_structure.md)

**Evidence:** [N=8 omega ledger](../../../evidence/data/spin23-n8_omega_deformation_axial_selector_audit-v1.json) and [verifier](../../../verification/verify/verify_spin23_n8_omega_deformation_axial_selector_audit.mjs)

## Strongest higher-N test

Four-dimensional gauged (N=8) supergravity is not merely a larger generic
matter model.  It is the maximal theory, with a single massless multiplet:

\[
 (1\times2),\quad(8\times\tfrac32),\quad(28\times1),
 \quad(56\times\tfrac12),\quad(70\times0).
\]

Its on-shell count is (2+2(28)+70=128) bosonic and
(2(8)+2(56)=128) fermionic degrees of freedom.  If increasing the amount of
supersymmetry were itself a coefficient selector, this is the strongest place
for that mechanism to appear.

Instead, the (SO(8))-gauged theory admits a continuous (omega)-deformed
family, modulo discrete identifications.  The maximally symmetric vacuum has
the same quadratic spectrum through the family, while supersymmetry
transformations and interactions depend on (omega).  Thus even maximal
supersymmetry plus that complete pole spectrum does not identify a unique
interacting theory.

The (N=2) STU truncation makes the distinction especially sharp: the scalar
potential can lose explicit (omega) dependence while gauge-kinetic and
fermionic couplings retain it.  Equality of a potential or quadratic spectrum
is therefore not equality of the full theory.

## Why this does not select the PGT axial portal

The 70 real scalars include scalar and pseudoscalar sectors, but field parity
is not a field identity.  No equation in the maximal multiplet identifies one
normalized pseudoscalar eigenmode with the longitudinal (0^-) excitation of
an independent Lorentz connection.  Nor does the existence of (omega)
provide a map

\[
 \eta=F(\omega,g,\langle\phi\rangle,\text{mixing and thresholds})
\]

to the observed fermion axial current.  The values
(omega/\pi=0,1/16,1/8) are finite witnesses to deformation freedom, not
candidate identifications of (eta).

A higher-dimensional origin cannot be silently used to remove the ambiguity.
The cited eleven-dimensional analysis treats the uplift of the generic
deformation as an additional nontrivial problem.  A successful uplift, vacuum,
breaking trajectory and torsion dictionary would constitute new model data.

## Sources

- G. Dall'Agata, G. Inverso and M. Trigiante, [*Evidence for a family of SO(8) gauged supergravity theories*](https://arxiv.org/abs/1209.0760), for the continuous inequivalent (N=8) family and its common maximally symmetric quadratic spectrum.
- B. de Wit and H. Nicolai, [*Deformations of gauged SO(8) supergravity and supergravity in eleven dimensions*](https://arxiv.org/abs/1302.6219), for the electric--magnetic deformation and its nontrivial higher-dimensional interpretation.
- H. Lü, Y. Pang and C. N. Pope, [*An omega Deformation of Gauged STU Supergravity*](https://arxiv.org/abs/1402.1994), for the (N=2) truncation in which interaction data retain (omega) even where the scalar potential does not.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_n8_omega_deformation_axial_selector_audit.mjs
~~~
