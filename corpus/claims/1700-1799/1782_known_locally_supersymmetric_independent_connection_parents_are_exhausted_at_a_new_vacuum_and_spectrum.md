# Known Locally Supersymmetric Independent-Connection Parents Are Exhausted at a New Vacuum and Spectrum

**Date:** 23 October 2026

**Status:** terminal named-independent-connection certificate

**Depends on:** [the M-algebra audit](1781_m_algebra_gauge_supergravity_has_an_independent_connection_but_its_dynamical_vacuum_does_not_supply_the_target_pole.md) and [the four-dimensional supersymmetric PGT audit](1780_the_torsionful_supersymmetry_route_now_ends_at_a_new_four_gate_parent_not_a_known_completion.md)

**Evidence:** [path ledger](../../../evidence/data/spin23-new-model-path-selection-v17.json), [path note](../../programmes/closure/spin23-gravity-route/global-path-selection-v29.md), and [verifier](../../../verification/verify/verify_spin23_new_model_path_selection_v17.mjs)

## Result

The named independent-connection route has now been tested in both four and
eleven dimensions.  Four-dimensional supersymmetric PGT constructions fail to
combine the complete four-gate package.  Eleven-dimensional M-algebra gauge
supergravity improves the structural match by unifying the vielbein, Lorentz
connection and gravitino in one locally supersymmetric gauge connection.

It still fails dynamically.  Generic vacua have no propagating modes, and the
known special vacuum with a four-dimensional graviton yields positive-(Lambda)
de Sitter general relativity.  No healthy axial connection pole, Spin((2,3))
vacuum, realistic fermion matter sector or normalized axial-current map is
derived.

The known locally supersymmetric independent-connection shortcuts are
therefore exhausted.  Reopening requires a new construction supplying all of:

1. a nondegenerate anti-de Sitter or Spin((2,3))-matched vacuum;
2. a complete fluctuation spectrum with a positive massive (0^-) connection
   pole;
3. nonlinear constraints and causal characteristics;
4. a realistic fermion sector and anomaly control;
5. radiative or symmetry protection; and
6. normalized threshold matching that computes (eta).

This remains a construction boundary, not a universal impossibility theorem.
No further value can be inferred by combining partial successes from different
parents.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_new_model_path_selection_v17.mjs
~~~
