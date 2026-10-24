# Frontier physics targets

This folder is the canonical navigation lane for physics targets in the corpus. It consolidates programme-level targets without replacing their source documents or promoting speculative material.

The lane is the practical face of the corpus's Jordan/Lie middle. Jordan and response structures say what can coexist and compose; Lie, symplectic and dynamical structures say how it can transform; the target register asks which of those structures survives scale, nuisance, detector and experimental gates. For the narrative connecting those layers, start with [The admissibility frontier: current synthesis](../../syntheses/the_admissibility_frontier_current_synthesis.md).

## Canonical artifacts

- [Frontier exhaustion checkpoint](frontier_exhaustion_checkpoint_v1.md) — current whole-corpus result, frontier shape and ranked next tranches.
- [Frontier physics target set](frontier_physics_target_set_v1.md) — human-readable map, priorities and use rules.
- [Per-target corpus assessments](frontier_physics_target_assessments_v1.md) — reach band, internal assets, missing join, promotion test and neighbouring targets for every FPT entry.
- [Target register](frontier_physics_target_register_v1.json) — machine-readable source of truth for the normalized target set and all declared crosswalks.
- [Coverage and provenance map](frontier_physics_target_coverage_map_v1.md) — maps the admissibility lanes, legacy branches, external validation set, speculative arcs, terminal new-physics gates and recent execution packets into the canonical targets.
- [Backward lineage and lightning path](frontier_physics_lineage_and_lightning_path_v1.md) — distinguishes complete navigation from incomplete physical derivation and identifies the shortest shared-carrier route to a falsifiable join.
- [Detector and frontier atlas](detector_frontier_atlas_v1.md) — maps actual computational, laboratory, statistical and missing translation-level detectors onto twenty frontier regions.
- [Detector/frontier register](detector_frontier_register_v1.json) — machine-readable authority for detector records, controls, maturity, target coverage and source provenance.
- [Frontier experiment atlas](frontier_experiment_atlas_v1.md) — one realistic controlled experiment for every frontier area, with platform, interventions, records, controls, decisive outcomes and stop rules.
- [Frontier experiment register](frontier_experiment_atlas_v1.json) — machine-readable 20-experiment portfolio covering all maintained topics and detector bundles.
- [Open topics](open_topics_v1.md) — maintained priority queue with explicit stop rules.
- [Open-topic register](open_topics_register_v1.json) — machine-readable questions, dependencies, next actions, closure conditions and kill tests.
- [AZ gate coverage audit](frontier_gate_coverage_audit_v1.md) — reconciles every AZ-001--AZ-057 gate as live, superseded or closed.
- [AZ gate coverage register](frontier_gate_coverage_audit_v1.json) — machine-readable gate ownership and resolution provenance.
- [Wave 6--7 gate audit](frontier_wave_gate_audit_v1.md) — reconciles every frontier-wave packet with the live queue.
- [Wave 6--7 gate register](frontier_wave_gate_audit_v1.json) — machine-readable wave disposition and topic ownership.
- [Residual programme gate audit](residual_programme_gate_audit_v1.md) — scans every other programme family for explicit unresolved-gate language.
- [Residual programme gate register](residual_programme_gate_audit_v1.json) — maps physics gates to topics and preserves separately governed programmes.
- [Full-corpus gate census](full_corpus_gate_census_v1.md) — scans every corpus Markdown/JSON artifact, separates historical gate language from live ownership and exposes any unrouted residue.
- [Full-corpus census register](full_corpus_gate_census_v1.json) — file-level hashes, matched phrases, state signals, semantic routes and owner references for every lexical gate match.
- [Verifier](../../../verification/frontier-physics-targets/verify_frontier_physics_target_register.mjs) — checks completeness, identifiers, mappings, epistemic firewalls and referenced source paths.
- [Detector/open-topic verifier](../../../verification/frontier-physics-targets/verify_detector_frontier_and_open_topics.mjs) — checks identifier integrity, source existence and complete detector/topic coverage of all targets and frontier regions.
- [Experiment-atlas verifier](../../../verification/frontier-physics-targets/verify_frontier_experiment_atlas.mjs) — proves one experiment per frontier area and complete coverage of all topics and detector bundles.
- [AZ gate verifier](../../../verification/frontier-physics-targets/verify_frontier_gate_coverage_audit.mjs) — checks complete packet coverage, topic ownership and resolution paths.
- [Wave gate verifier](../../../verification/frontier-physics-targets/verify_frontier_wave_gate_audit.mjs) — checks all 53 Wave 6--7 packets and their live owners.
- [Residual programme verifier](../../../verification/frontier-physics-targets/verify_residual_programme_gate_audit.mjs) — ensures every remaining matching programme file has a queue mapping or separate owner.
- [Full-corpus census verifier](../../../verification/frontier-physics-targets/verify_full_corpus_gate_census.mjs) — rescans the complete corpus scope, checks source hashes and proves exact record equality, valid topic references and zero unresolved owners.

## Scope

The unit of this register is a **research target**, not a document. Claims, evidence files and programme notes attach to targets as provenance. A document may serve several targets, and a target may contain many claims.

The register presently normalizes:

- 22 core frontier targets;
- 14 legacy multi-branch research lanes;
- eight external validation phenomena;
- eight explicitly speculative missing-middle arcs;
- two terminal torsion-flavour new-physics gates; and
- the current AZ-032--AZ-057 execution, bridge, literature and re-ranking sequence.

The detector extension additionally normalizes:

- 20 frontier regions;
- 35 detector bundles; and
- 49 maintained topics: 46 live across active, open, audit, gated and blocked states, plus three closed with retained evidence.

The full-corpus census presently hashes and inventories all 2,536 Markdown/JSON artifacts across `corpus/` and the evidence ledger: 2,098 corpus narratives plus 438 evidence artifacts. It reconciles all 1,530 files containing the expanded gate vocabulary or an open-like structured status, including 1,176 of the 1,575 numbered claims and 85 evidence records; the other 399 claims are explicitly recorded as having no declared gate. It reports zero unmatched ownership records. This is a lexical, structured-status and governance exhaustion result, not a claim that every tacit scientific question has been discovered or solved.

Speculative entries remain visible but carry zero evidential weight. Crosswalk membership indicates relevance, not proof of a physical identification.

