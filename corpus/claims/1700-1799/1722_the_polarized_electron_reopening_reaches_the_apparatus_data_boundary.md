# The Polarized-Electron Reopening Reaches the Apparatus-Data Boundary

**Date:** 23 October 2026

**Status:** post-quadratic phenomenology path-selection closure

**Depends on:** [observable matching](1719_a_dual_orientation_polarized_electron_experiment_separates_the_0minus_mass_from_its_unknown_matching.md), [exact spherical finite size](1720_uniform_polarized_spheres_preserve_the_coupling_free_0minus_mass_estimator_exactly.md), and [the arbitrary-geometry solver](1721_a_voxel_spin_map_closes_the_arbitrary_geometry_forward_model_for_the_0minus_torque.md)

**Evidence:** [path ledger](../../../evidence/data/spin23-phenomenology-reopening-selection-v2.json), [verifier](../../../verification/verify/verify_spin23_phenomenology_reopening_selection_v2.mjs), and [selector v2](../../programmes/closure/spin23-gravity-route/global-path-selection-v2.md)

## Result

The low-energy branch that was externally blocked in claim 1718 has been
advanced as far as the available theory and repository data permit.

- The observable is fixed: two orientation channels separate mass from
  coupling.
- Finite size is exact for uniform non-overlapping spheres.
- Arbitrary separated rigid-polarization maps have an executable voxel
  response tensor.
- The point witness reproduces the analytic ratio and SI reach normalization.

The remaining phenomenology step is an experimental likelihood.  It requires
a measured polarized-spin map, modulation geometry, calibrated noise and
background templates.  Those inputs are not determined by the critical PGT
action.  The separate request for a unique Spin(2,3) prediction remains
blocked by finite matching of \(c_e,A,B\).

Thus the reopening changes the terminal statement from

\[
\text{observable unspecified}
\]

to

\[
\boxed{\text{observable and forward model complete; apparatus data absent}.}
\]

No higher-field beta calculation, local resummation, or additional formal
spin-potential manipulation changes that boundary.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_phenomenology_reopening_selection_v2.mjs
~~~
