# Visible Context Hub contract

**Status:** local Observatory implemented; protected-runtime or hosted admission not attempted

## Primary interaction

The user supplies a task, chooses or accepts a task profile and receives a proposed context packet before the LLM answer is treated as settled. The surface makes selection visible without requiring the user to understand PageRank.

## Required panels

1. **Task and budget** — task text, profile, source count, context characters and estimated tokens.
2. **Invariant core** — sources retained across the controlled context sweep.
3. **Selector-sensitive perimeter** — sources that enter or leave under profile or graph changes.
4. **Source cards** — title, path, lane, declared status, inclusion reason, excerpt, evidence-spine coverage and full-source expansion.
5. **Omissions** — high-ranking candidates excluded by budget, diversity or authority controls.
6. **Controls** — profile, graph influence, source budget, lane quota and evidence requirements.
7. **Answer comparison** — stable claims, wording drift, context-conditional claims, conflicts and unsupported citations.
8. **Receipt** — context, source-set, prompt, answer and comparison hashes with exportable structured data.

## Interaction rules

- Changing a control creates a new variant; it never silently replaces the receipt behind an existing answer.
- Status colors must not reuse relevance intensity. Relevance and authority are independent visual channels.
- Navigation hubs are suppressed from scarce context unless the task requests orientation.
- The interface may recommend a source but cannot promote it.
- “Stable” means stable across the executed variants, not universally true.
- Full source text remains one explicit action away from every excerpt.

## Implemented local slice

The [Context Hub Observatory](OBSERVATORY.md) is the explicit state-owning host around the pure search and attention-state modules. It records baseline and adaptive contexts, exact candidate universes, answer receipts, causally grouped observations, separate approval or rejection decisions, rollback, control changes, freeze state and counterfactual replay in a local append-only hash chain. It shows attention-utility mean and variance, independent-family counts, innovations, baseline/adaptive movements, the explicit `explore` selection, candidate/admitted state identities, monitoring metrics and the complete event timeline.

The state remains outside the canonical corpus under ignored `.context-hub/`. The Observatory is a local single-writer tool: editing, corpus promotion, external federation, model-weight training and protected admission remain out of scope.
