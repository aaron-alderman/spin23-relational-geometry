# Extended Supersymmetry Reaches the Same Boundary: a Specific Gauging, Vacuum and Torsion Map

**Date:** 23 October 2026

**Status:** terminal representative extended-supersymmetry certificate

**Depends on:** [the N=2 selector audit](1773_n2_supergravity_organizes_the_axion_sector_but_leaves_gauging_geometry_and_vacuum_data_continuous.md), [the N=1 audit](1752_local_supersymmetry_fails_as_a_selector_and_string_normalization_is_the_next_model_branch.md), and [the higher-spin branch](1772_the_higher_spin_loophole_is_real_but_relocates_the_selector_to_boundary_phase_and_dictionary_data.md)

**Evidence:** [path ledger](../../../evidence/data/spin23-new-model-path-selection-v13.json), [path note](../../programmes/closure/spin23-gravity-route/global-path-selection-v25.md), and [verifier](../../../verification/verify/verify_spin23_new_model_path_selection_v13.mjs)

## Result

Increasing supersymmetry from \(N=1\) to representative \(N=2\) changes the
geometric organization but not the selector logic.  The extended algebra
requires larger multiplets and constrains scalar manifolds, Killing vectors,
moment maps and potentials.  It does not choose their concrete values or the
vacuum.

A pseudoscalar candidate is accompanied by the rest of a hypermultiplet or
scalar--tensor multiplet.  Canonical normalization exposes combinations such
as \(gk/\sqrt{h_{aa}}\), which vary across allowed gaugings and target-space
metrics.  The value \(1/8\) is an admitted point, not a symmetry theorem.

To reopen the N=2 route one must provide a complete model containing:

1. a declared quaternionic-Kähler target and symplectic vector sector;
2. explicit electric/magnetic gauging, Killing vectors and moment maps;
3. a stable supersymmetric or controlled broken vacuum;
4. the complete scalar, tensor, vector and fermion mass/mixing matrices;
5. a derivation identifying one eigenmode with independent Lorentz-connection
   torsion; and
6. normalized threshold matching to the observed fermion axial current.

Higher \(N\) can impose more restrictions but changes the spectrum again and
requires its own action and breaking vacuum.  No general inference from
“extended supersymmetry” selects the desired coefficient.

The live construction boundaries are now a specified gauged-supergravity
vacuum, the higher-spin/PGT dictionary, or the stabilized torsional string
vacuum.  All require external model data.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_new_model_path_selection_v13.mjs
~~~
