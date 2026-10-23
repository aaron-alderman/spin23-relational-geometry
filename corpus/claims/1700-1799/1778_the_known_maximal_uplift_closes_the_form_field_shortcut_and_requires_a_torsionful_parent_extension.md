# The Known Maximal Uplift Closes the Form-Field Shortcut and Requires a Torsionful Parent Extension

**Date:** 23 October 2026

**Status:** terminal ordinary-uplift certificate

**Depends on:** [the S7 field-identity audit](1777_the_standard_s7_uplift_contains_form_pseudoscalars_but_not_the_independent_pgt_torsion_pole.md) and [the maximal-supersymmetry boundary](1776_maximal_supersymmetry_closes_the_generic_higher_n_escape_at_a_specific_uplift_and_torsion_dictionary.md)

**Evidence:** [path ledger](../../../evidence/data/spin23-new-model-path-selection-v15.json), [path note](../../programmes/closure/spin23-gravity-route/global-path-selection-v27.md), and [verifier](../../../verification/verify/verify_spin23_new_model_path_selection_v15.mjs)

## Result

The ordinary (S^7) uplift resolves the parentage of standard maximal
supergravity but does not resolve the parentage of PGT torsion.  Its
pseudoscalar modes are differential-form modes, and its supercovariant torsion
is fermion-composite.  Neither is an independent bosonic Lorentz connection
with a healthy propagating axial pole.

This distinction prevents a common false shortcut.  Two four-dimensional
fields may both transform as (0^-) while differing in gauge origin,
off-shell variables, kinetic operator and source coupling.  Equality of spin
and parity cannot replace an explicit invertible field map.

The standard uplift route is therefore exhausted.  A successful continuation
must be a new torsionful microscopic theory and must specify:

1. the independent connection or equivalent torsion multiplet;
2. its supersymmetric and gauge-consistent kinetic terms;
3. a compactification retaining the desired (0^-) mode;
4. all mixing with metric and form pseudoscalars;
5. a stable vacuum and complete spectrum; and
6. normalized matching to the observed axial current.

The generic nonzero-(omega) uplift does not weaken this conclusion: even if
constructed, it would still need the independent-connection field identity.
The remaining higher-spin and stabilized-compactification routes likewise
remain new-construction problems.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_new_model_path_selection_v15.mjs
~~~
