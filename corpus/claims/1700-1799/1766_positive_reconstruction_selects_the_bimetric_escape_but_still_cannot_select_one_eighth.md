# Positive Reconstruction Selects the Bimetric Escape but Still Cannot Select One Eighth

**Date:** 23 October 2026

**Status:** terminal standard-positivity path certificate

**Depends on:** [the positive spectral obstruction](1765_the_simple_exponential_spin_two_escape_fails_standard_positive_spectral_reconstruction.md) and [the bimetric inverse audit](1763_a_healthy_bimetric_parent_has_a_continuous_mass_mixing_inverse_problem_at_fixed_local_curvature_coefficient.md)

**Evidence:** [path ledger](../../../evidence/data/spin23-new-model-path-selection-v9.json), [path note](../../programmes/closure/spin23-gravity-route/global-path-selection-v21.md), and [verifier](../../../verification/verify/verify_spin23_new_model_path_selection_v9.mjs)

## Result

Adding standard physical-channel spectral positivity changes the ranking of
the enlarged quantum paths:

- the simple exponentially suppressed graviton propagator is rejected
  because it falls below the positive contribution required by its own
  massless pole;
- the bimetric propagator survives because both of its spectral weights are
  nonnegative.

This is a meaningful path selection, but it is not axial selection.  The
Källén--Lehmann inequality concerns the physical spin-two two-point function.
It contains neither the torsion pseudoscalar nor its fermion vertex.  The
surviving bimetric family continues to admit axial coefficients \(0\),
\(1/8\), and \(1/4\).

The standard-positive quantum path has therefore narrowed to construction of
a Spin(2,3)-derived nonlinear bimetric parent with:

1. a second metric or vierbein derived rather than appended;
2. the constraint-preserving nonlinear potential;
3. a viable matter-coupling prescription;
4. a cross-sector Ward relation involving the axial vertex;
5. full background stability and quantum flow; and
6. threshold matching to the infrared coefficient.

Alternatively, a nonlocal proposal may reject ordinary spectral
reconstruction, but must then define and prove a replacement positivity or
unitarity principle.  Neither construction is encoded by the present packet.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_new_model_path_selection_v9.mjs
~~~
