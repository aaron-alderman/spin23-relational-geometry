# N=2 Supergravity Organizes the Axion Sector but Leaves Gauging, Geometry and Vacuum Data Continuous

**Date:** 23 October 2026

**Status:** representative extended-supersymmetry selector audit

**Depends on:** [the cross-sector symmetry classification](1770_cross_sector_symmetry_is_exhausted_at_supersymmetry_or_nonstandard_asymptotic_structure.md), [the minimal N=1 audit](1752_local_supersymmetry_fails_as_a_selector_and_string_normalization_is_the_next_model_branch.md), and [the higher-spin alternative](1772_the_higher_spin_loophole_is_real_but_relocates_the_selector_to_boundary_phase_and_dictionary_data.md)

**Evidence:** [N=2 selector ledger](../../../evidence/data/spin23-n2_sugra_axial_selector_audit-v1.json) and [verifier](../../../verification/verify/verify_spin23_n2_sugra_axial_selector_audit.mjs)

## General N=2 structure

Four-dimensional \(N=2\) supergravity coupled to matter permits arbitrary
numbers of vector multiplets and hypermultiplets.  Supersymmetry organizes
their scalar geometry into special-Kähler and quaternionic-Kähler factors and
expresses gaugings through Killing vectors and moment maps.  It does not pick
one target manifold or one gauging.

The defining model data include

\[
 g,\qquad k_\Lambda^u(q),\qquad P_\Lambda^x(q),
\]

together with the symplectic embedding and vacuum expectation values.  The
supersymmetry transformations constrain how these objects enter the action,
but a complete theory must still choose them.

## Canonical normalization witness

For an axionic coordinate \(a\) with local metric component \(h_{aa}\) and a
gauged shift,

\[
 {1\over2}h_{aa}(\partial a)^2,
 \qquad D a=\partial a+gkA,
\]

the canonical coordinate \(a_c=\sqrt{h_{aa}}a\) carries the normalized
combination

\[
 {gk\over\sqrt{h_{aa}}}.
\]

The choices \((g,k,h_{aa})=(1/16,1,1),(1/8,1,1),(1/4,1,1)\) give
\(1/16,1/8,1/4\).  The distinct choice \((1/4,1,4)\) again gives \(1/8\).
These are local normalization witnesses, not asserted complete vacua; they
show exactly which independent data a full vacuum must calculate before a
number can be claimed.

## Spectrum and field identity

A hypermultiplet contains four real scalars and two Weyl fermions.  An axion
or tensor-multiplet dual therefore cannot be added as the isolated PGT
pseudoscalar.  The theory must also establish that a normalized scalar/tensor
eigenmode is the independent massive longitudinal Lorentz-connection
\(0^-\) pole and derive its coupling to the observed fermion axial current.

Neither extended supersymmetry nor the word “hypermultiplet” supplies that
identity.  Moment-map stabilization and symmetry breaking introduce further
continuous vacuum and threshold data.

## Sources

- L. Andrianopoli et al., [*N=2 Supergravity and N=2 Super Yang--Mills Theory on General Scalar Manifolds*](https://arxiv.org/abs/hep-th/9605032), for the general symplectic-covariant matter-coupled action, arbitrary quaternionic geometry, gaugings and moment maps.
- R. D'Auria et al., [*D=4, N=2 Gauged Supergravity in the Presence of Tensor Multiplets*](https://arxiv.org/abs/hep-th/0312210), for scalar--tensor multiplets, electric/magnetic deformations and their relation to flux compactifications.
- I. Antoniadis et al., [*Isometries, gaugings and N=2 supergravity decoupling*](https://arxiv.org/abs/1611.00964), for translational/rotational gaugings and the universal-hypermultiplet example.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_n2_sugra_axial_selector_audit.mjs
~~~
