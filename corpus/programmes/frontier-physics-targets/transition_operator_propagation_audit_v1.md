# Transition-operator propagation audit v1

**Date:** 26 October 2026
**Status:** governing rule and authoritative frontier spine propagated; semantic triage remains open
**Machine authority:** [JSON audit](transition_operator_propagation_audit_v1.json)
**Reference bridge:** [AZ-127](../admissibility/admissibility_127_transition_operators_selection_rules_and_lifetime_frontier.md)

## Result

The audit scans **2226** Markdown documents and routes **309** for possible transition, spectral or metastability relevance. **15** authoritative documents have an explicit reviewed disposition, **12** additional operator/rate candidates carry the AZ-127 boundary in context, and **97** are excluded because their full document contains no decay/capture/lifetime/width context. **48** rate-context candidates remain for semantic triage.

This is intentionally not a global search-and-replace. “Radiative stability,” a graph transition, a resonance pole, detector lag and an atomic decay do not name the same thing. The audit makes that difference visible and keeps the unresolved set enumerable.

## The rule now carried by the corpus

A lower-energy or otherwise available final state is only a possible destination. A physical rate additionally requires a typed interaction operator, a nonzero matrix element, phase space and competing-channel accounting. A measured record further requires separation of population decay from dephasing/environmental width, angular or polarization acceptance, detector response and an observation window.

Barrier escape and hysteresis use a different mechanism ledger. Effective pole or resonator calculations may remain effective, but must not be promoted to microscopic lifetimes without the missing operator-level data.

## Reviewed propagation spine

| Document | Disposition | Reason |
|---|---|---|
| `corpus/EXPLANATORY_STANDARD.md` | `governing_rule` | The eight-field ledger is a publication rule and separates operator bottlenecks from effective widths and barrier escape. |
| `corpus/programmes/admissibility/admissibility_127_transition_operators_selection_rules_and_lifetime_frontier.md` | `complete_reference_bridge` | Established atomic/nuclear bridge, rate architecture and three-gate ion experiment. |
| `corpus/programmes/admissibility/admissibility_02_casimir_as_first_generative_probe.md` | `classification_not_amplitude` | Casimir labels sectors but supplies neither the physical operator nor its strength. |
| `corpus/programmes/admissibility/admissibility_04_dispersion_force_landscape.md` | `effective_response_boundary` | A causal response may be used effectively; microscopic line claims require the operator ledger. |
| `corpus/programmes/admissibility/admissibility_05_invariant_atlas_time_force_measure_material_rotation.md` | `classification_not_amplitude` | Rotational organization and selection rules are followed by operator, matrix-element and detector data. |
| `corpus/programmes/admissibility/admissibility_30_casimir_seebeck_nernst_spectral_ladder.md` | `classification_not_amplitude` | The spectral ladder names the missing operator-to-record fields. |
| `corpus/programmes/admissibility/admissibility_51_spectral_boundary_dynamics_free_bloch_efimov_casimir.md` | `operator_required_not_supplied` | The pole grammar is retained while microscopic hydrogen capture remains open. |
| `corpus/programmes/admissibility/admissibility_52_spectral_flow_pole_trajectories.md` | `effective_spectral_only` | The toy width is explicitly not promoted to a microscopic lifetime. |
| `corpus/programmes/admissibility/admissibility_55_finite_band_levinson_and_adaptive_pole_collisions.md` | `effective_spectral_only` | Finite-band pole width is separated from radiative or material lifetime. |
| `corpus/programmes/admissibility/admissibility_120_a_unitary_acoustic_rail_replaces_the_hand_shaped_capture_bath.md` | `eight_field_ledger_surrogate` | Finite unitary surrogate; declared coefficient and recurrence prevent a material-rate claim. |
| `corpus/programmes/admissibility/admissibility_121_the_capture_matrix_element_is_a_scattering_density_not_a_two_level_number.md` | `eight_field_ledger_matrix_element` | Operator access is computed without promoting an amplitude density to a probability or width. |
| `corpus/programmes/admissibility/admissibility_122_a_normalized_packet_turns_the_overlap_density_into_a_capture_probability.md` | `eight_field_ledger_probability` | Finite normalized probability is closed while material and irreversible limits remain open. |
| `corpus/programmes/frontier-physics-targets/detector_frontier_atlas_v1.md` | `detector_bundle` | DET-037 joins lifetime, polarization, environmental and acceptance records. |
| `corpus/programmes/frontier-physics-targets/frontier_experiment_atlas_v1.md` | `experiment_programme` | EX-022 supplies an apparatus, controls and build/bridge/physics decisions. |
| `corpus/syntheses/the_admissibility_frontier_current_synthesis.md` | `synthesis_bridge` | The current synthesis routes transition claims to the established bridge. |

## Open work

The remaining list is a review queue, not a defect count. Many hits are expected exclusions or use “transition” in another domain. Each must receive one of four human dispositions: eight-field operator ledger; effective-spectral boundary; barrier/kinetic boundary; or nonphysical/metaphorical exclusion. The full path list and content digests are in the JSON audit so completion cannot be declared by prose alone.

## Exit criterion

This propagation tranche closes only when every operator-rate candidate has a reviewed disposition; every experiment making a microscopic transition claim carries all eight fields or an explicit missing-data boundary; and the audit regenerates with zero unreviewed operator candidates. A zero count reached by weakening the search vocabulary is a failure.
