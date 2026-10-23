# The Torsionful-Supersymmetry Route Now Ends at a New Four-Gate Parent, Not a Known Completion

**Date:** 23 October 2026

**Status:** terminal named-supersymmetric-PGT certificate

**Depends on:** [the compatibility audit](1779_known_supersymmetric_poincare_gauge_models_do_not_combine_all_four_required_torsion_gates.md) and [the ordinary-uplift boundary](1778_the_known_maximal_uplift_closes_the_form_field_shortcut_and_requires_a_torsionful_parent_extension.md)

**Evidence:** [path ledger](../../../evidence/data/spin23-new-model-path-selection-v16.json), [path note](../../programmes/closure/spin23-gravity-route/global-path-selection-v28.md), and [verifier](../../../verification/verify/verify_spin23_new_model_path_selection_v16.mjs)

## Result

The proposal “replace ordinary supergravity by supersymmetric Poincaré gauge
gravity” has now been instantiated rather than left as a label.  Known models
show that local supersymmetry and an independent connection can coexist, but
they do not establish the complete healthy massive pseudoscalar-torsion parent
required here.

The obstruction is a compatibility intersection:

- the corpus's critical PGT slice has the desired quadratic (0^-) pole but
  lacks local supersymmetry and radiative protection;
- imposing local supersymmetry and unitarity in the analyzed broad PGT classes
  collapses to ordinary supergravity;
- the supersymmetric Kuhfuss--Nitsch regime loses the propagating connection;
- the Nishino programme retains it but stops before a complete protected
  (0^-) theory; and
- symmetry-first unitary infrared models protect vector, not pseudoscalar,
  torsion modes.

The known route is exhausted.  A valid continuation must construct one action
that passes every gate in the same model.  It must provide the full
supersymmetry multiplet and transformations, a positive (0^-) pole, nonlinear
constraint and characteristic analyses, radiative closure, a controlled
vacuum, and normalized fermion-current matching.  Without those items, a
locally supersymmetric label cannot select (eta=1/8).

This conclusion is scoped to the named constructions and classifications; it
does not assert a universal no-go theorem.  It identifies the exact burden of
proof for a new counterexample.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_new_model_path_selection_v16.mjs
~~~
