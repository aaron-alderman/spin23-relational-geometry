# The Minimal New Supersymmetric Connection Parent Is Exhausted Before Dynamics

**Date:** 23 October 2026

**Status:** terminal minimal-construction certificate

**Depends on:** [the Lorentz-supermultiplet kinetic audit](1783_the_minimal_lorentz_vector_supermultiplet_has_an_unavoidable_three_plus_three_kinetic_signature.md) and [the known-parent exhaustion](1782_known_locally_supersymmetric_independent_connection_parents_are_exhausted_at_a_new_vacuum_and_spectrum.md)

**Evidence:** [path ledger](../../../evidence/data/spin23-new-model-path-selection-v18.json), [path note](../../programmes/closure/spin23-gravity-route/global-path-selection-v30.md), and [verifier](../../../verification/verify/verify_spin23_new_model_path_selection_v18.mjs)

## Result

The simplest prospective counterexample has been constructed far enough to
fail decisively.  Treating the real Lorentz connection as an ordinary
(N=1) vector multiplet forces its kinetic metric to be a real invariant form
on (so(1,3)).  The entire nonzero family has three positive and three negative
eigenvalues.

This obstruction occurs before vacuum selection, mass generation or portal
matching.  Supersymmetry does not cancel it because bosons and gauginos inherit
the same gauge-index metric.  Setting the kinetic form to zero removes the
connection dynamics and therefore removes the desired torsion pole.

The available escapes all leave the minimal path:

- nonlinear realization introduces breaking fields and a compact subgroup;
- tetrad-dependent PGT invariants restore the previously audited nonlinear and
  radiative closure problem;
- complex self-dual variables require new reality and unitarity conditions;
- Chern--Simons constructions require another dimension and reduction.

Accordingly, the new-parent frontier is now narrower than “supersymmetrize the
connection.”  It requires an explicitly non-Yang--Mills gravitational
supermultiplet construction that passes the four gates and produces the
normalized fermion portal.  No coefficient, including (1/8), follows before
that construction exists.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_new_model_path_selection_v18.mjs
~~~
