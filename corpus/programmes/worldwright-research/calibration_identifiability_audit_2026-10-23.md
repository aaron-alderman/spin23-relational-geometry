# Worldwright calibration identifiability audit

**Date:** 2026-10-23

The current public-source programme has a useful discovery frame: 248 eligible IFRC events across 91 countries and six hazard classes, day-precision onset for every event, and public report references for 94.8%. Its attempted GLIDE bridge nevertheless reaches only 32.3% existing-or-strong coverage, recovers 61.1% of masked positive controls exactly, and selects a wrong unique serial in 11.1%.

The important correction is that cross-source identity is not the sole calibration blocker. The retained projection contains no locality, intervention channel, dispatch or first-delivery time, baseline deficit or trend, delivered dose, health outcome, relational outcome, selection reason, or concurrent-intervention record. Consequently none of the six principal causal mechanisms—urgency loss, delivery failure/capture, learning threshold/gain, relational persistence, identity salience, or channel contrast—is structurally identifiable from the current ledger.

Even a perfect event crosswalk would therefore not open causal estimation. It would permit safer multi-source enrichment, but action-level timing, baseline, outcome and confounding evidence would still be missing.

## Corrected pathway

The next work should proceed in two lanes:

1. An IFRC-only action-time feasibility pilot can use exact IFRC event and report identifiers to ask whether locality, delivery channel, dispatch, and first-delivery intervals can be extracted under a governed projection. Outcomes and retained narrative remain barred.
2. A source-provided crosswalk or governed partner identifiers remain necessary for multi-source enrichment. The failed fuzzy matcher must not be loosened.

Only after action-time feasibility should the programme bind baseline deficits, repeated harm outcomes, selection, and concurrent interventions. Aggregate outcome weights are not parameters to estimate from this observational cohort; they require stakeholder-separated elicitation and partial-order analysis.

Machine-readable evidence is in [worldwright-calibration-identifiability-audit-local-v1.json](../../../evidence/data/worldwright-calibration-identifiability-audit-local-v1.json), with checks in [verify_worldwright_calibration_identifiability_audit_local.mjs](../../../verification/verify/verify_worldwright_calibration_identifiability_audit_local.mjs).
