# Executable household orientations over time

**Date:** 6 November 2026  
**Status:** deterministic synthetic research example; authored values and behavioral rules; uncalibrated  
**Authority:** companion to the [qualitative household case](household-orientations-v1.md), not a predictor or assessment of actual relationships

The [adaptive successor](household-dynamics-v2.md) now derives changes in willingness from directed request-response and agreement-execution histories. This v1 example remains the fixed-willingness comparator.

This example varies two fictional participants' preferred activities, usable capacity and willingness to review a household arrangement. It retains their separate goal deviations alongside paid work, unfinished unpaid tasks and money over twelve periods. A change in values can produce a revised allocation, a gradual transition or an unresolved request. Reduced capacity can create a material shortfall even when both participants are willing to discuss it.

Open the [offline household explorer](../../../preview/the-field/household-explorer.html) to change assumptions and inspect each period. It runs without a server or network access. The same [model](../../../verification/derive/the_field_household_model_v1.mjs) runs in the explorer and the command-line receipt. Four orientations and five change scenarios supply twenty starting comparisons; their labels select authored configurations, not different psychological laws.

## Inputs and their meanings

The durable [fixture](../../../evidence/data/the-field/household-orientations-v1.json) contains a base scenario, orientation patches and timed change events. A and B have no assigned sex. All amounts are synthetic assumptions. A period can be interpreted as a week for discussion, but no coefficient has been estimated from weekly household data.

| Input | Meaning in this model | Boundary |
| --- | --- | --- |
| Capacity | Usable hours for the modeled paid work, unpaid work, review and unallocated time | Not physiological energy, human worth or a diagnosis |
| Paid work goal | Desired paid hours per period, with an accepted shortfall | A limited representation of career priorities, not the entirety of a person's values |
| Free time goal | Minimum unallocated hours sought within this usable-hours budget | Not total sleep, leisure quality or a clinical rest requirement |
| Preferred unpaid share | Preferred fraction of the recurring task pool and its backlog, with an accepted deviation in percentage points | A role preference; not a measure of care or moral obligation |
| Willingness | An authored review setting between zero and one | Zero closes this joint review route; positive values limit how many assigned task hours can shift. It is not measured agreeableness, consent, character or trust |
| Wage and expenses | Money units per paid hour and recurring money due | No wage growth, loans, outsiders or purchased services are invented |
| Review cost and movement limit | Hours spent by each participant in an open review and the maximum task transfer before willingness scales it | Replaceable behavioral assumptions, not universal negotiation rules |

The explorer edits A or B, either initially or from period 5. Editing the initial assumptions persists unless a later authored event replaces a field. Selecting a new orientation clears person edits; selecting a new change scenario clears period-5 person edits. Resource overrides remain. Alternating priorities retains its separately labeled period-8 planned turn; the combined change retains its later capacity event at period 9.

The presets also vary paid-work goals and preferred shares. Comparing their outcomes does not isolate a causal effect of an orientation label. For a controlled contrast, clone the exact scenario and change one parameter at a time.

## State and period order

The state contains the current participant inputs, agreed assignment share, recurring task hours, unpaid backlog, reserve and event history. Values, wages, capacity and willingness change only through explicit inputs or events. No automatic fatigue, skill development, preference adaptation, trust decay, happiness, coercion, separation or childbirth mechanism is inferred.

Each period executes these steps:

1. Apply the period's explicit changes. Reject conflicting edits of the same field in the same period; do not silently let array order choose the result.
2. Add the previous unfinished tasks to the new recurring unpaid demand. All unfinished tasks are assumed to remain necessary; expiry or changing standards would need another mechanism.
3. Evaluate the current assignment against each person's current goals. If both are within their stated bounds, no review is initiated. A money shortfall or task backlog is not automatically interpreted as a wish to renegotiate.
4. If goals are outside bounds, select a requester. When both qualify, the starting participant alternates by period. This agenda rule is an assumption.
5. Open the joint review only if both willingness settings are positive and both have enough usable time for its stipulated cost. A closed review leaves standing unchanged and trust unknown; the model does not infer why someone declines.
6. Consider a finite grid of task shares, the preferred shares and movement-limit endpoints. A change cannot shift more than `maxReallocationHours * min(A.willingness, B.willingness)` of the current task demand. The requester's paid-work shortfall is considered first, then free-time shortfall, then role deviation; ties prefer smaller changes. This is not household welfare maximization.
7. Apply the first proposal that improves at least one requester goal and passes each participant's synthetic assent rule. Otherwise retain the current share. Open but unsuccessful review still consumes time.
8. Execute the stipulated time rule, record unfinished tasks, earn money, pay what resources permit and carry the remaining reserve forward. Preserve unmet expenses in a cumulative record; they are not silently converted into debt or automatically collected later.

### The time rule and synthetic assent

After review time is deducted, each person attempts their assigned unpaid tasks first, up to capacity. From remaining capacity, paid work is performed up to its desired target while reserving the free-time goal where possible. Remaining time is unallocated. This priority order can favor domestic completion over income; it is explicit so a competing model can replace it.

Each participant retains three separate deviations: paid-work shortfall in hours, free-time shortfall in hours and unpaid-share deviation as a fraction. A proposal passes that participant's synthetic assent rule if either all deviations fall within their declared bounds, or every deviation is within its bound or no worse than before, with at least one improvement. This permits an acceptable tradeoff inside one tolerance while another unmet goal improves gradually. It does not permit worsening an out-of-bounds deviation in exchange for improvement elsewhere. No weighted sum, combined happiness or person score is calculated. Passing this rule is not actual human consent or testimony.

Every row preserves these accounting identities:

- Unpaid hours performed + paid hours + review hours + unallocated hours = that person's usable capacity.
- Previous unfinished work + new unpaid demand = completed tasks + new unfinished work.
- Opening reserve + earned income = paid expenses + closing reserve.
- Expenses due = paid expenses + current unmet expenses.

Changing an assignment does not create labor or money. There is no automatic partner cover for an unfulfilled assignment beyond an explicitly revised share. It is possible for someone to have spare capacity while another person's assigned tasks remain unfinished; that is a consequence of the stipulated allocation rule, not a claim that real partners behave that way.

## Interpreting the trajectories through The Field

| Consequence order | Executed record | What remains outside this model |
| --- | --- | --- |
| Immediate | Paid and unpaid hours, review time, free time, task backlog, income, reserve and unmet expenses | Quality of work, health effects and experienced satisfaction |
| Relationships and norms | Requests selected by the synthetic rule, open or closed review, jointly passing proposals and the assignment retained for the next period | Motives, legitimate authority, coercion, affection and actual consent |
| Future possibilities | Persistent changes to assignment and inputs, accumulated backlog and resource reserve | Skills, career capital, social alternatives and the costs of leaving |

This is a bounded household analogue of [The Field's relational dynamics](relational-dynamics-v2.md), not an extension of its political grant or trust engine. Unknown trust remains null in both directions. Standing is a fixed unchanged label independent of work, agreement or refusal. Care, dignity, goodness, forgiveness and agency are not scalar outputs. The [inherited encounter constitution](../../../applications/aaronalderman-site/source/hierarchy-evidence/the-field-0.json) remains controlling; ask, wait, share responsibility, set a boundary, refuse and leave remain valid reader options. The reader can stop or reject this exercise. Real relationship exit and refusal of individual tasks are not simulated.

Three contrasts are especially useful:

- Set A's willingness to zero while leaving B's period-5 career change intact. Compare retained assignments and paid-work shortfalls with the same input at positive willingness. This tests the authored review gate, not whether A is a good partner.
- Give both people high willingness but zero tolerance for incompatible preferred shares. The search can find no jointly passing proposal. That means no proposal under this finite search and assent rule, not proof that no human agreement exists.
- Reduce capacity or increase demand while retaining willingness. Discussion can reassign work but cannot remove a total resource constraint. Conversely, open reviews can consume time without improving an allocation; more willingness is not guaranteed to improve every recorded outcome.

Goal bounds are separate from outcomes and revisability. Being within bounds does not establish happiness, justice or adequate resources. A revised allocation does not establish relationship improvement. A retained assignment can be welcome continuity, a blocked request or an unresolved constraint; use the recorded branch and inputs rather than the assignment alone to interpret it.

## Run and reproduce

From the repository root:

```powershell
node --test verification/test/the_field_household_model_v1.test.mjs
node verification/verify/verify_the_field_household_v1.mjs
node tooling/the-field/build_household_explorer.mjs
```

The verification runner writes the twenty explicit scenarios, their full histories, summaries and input/source hashes to the [household receipt](../../../evidence/data/the-field/household-orientations-v1-receipt.json). All runs belong to one local same-model evidence family. Hashing and replay establish which assumptions executed; they do not validate the assumptions or predict actual families.

Select a preset without rewriting the full default comparison receipt:

```powershell
node verification/verify/verify_the_field_household_v1.mjs --orientation equal --change capacity --output evidence/data/the-field/household-selected-receipt.json
```

For fully controlled edits, copy one scenario from the receipt's `scenarios` array into your own JSON file, edit its initial participant fields or timed `events`, and run it with `--scenario path/to/scenario.json --output path/to/receipt.json`. A custom fixture can instead be selected with `--input path/to/fixture.json`. Unknown fields, nonfinite or out-of-range values, malformed participant identities and conflicting timed changes are rejected.

The [explorer builder](../../../tooling/the-field/build_household_explorer.mjs) embeds the exact pure model and fixture into the offline page. Its [editable interface source](../../../tooling/the-field/household_explorer.fragment.html) provides the controls. `--inline-output path/to/fragment.html` additionally emits an equivalent conversation fragment. Generated pages should be rebuilt after changes to the model, fixture or interface source.

The [browser verifier](../../../verification/verify/verify_the_field_household_explorer_v1.mjs) checks actual controls, browser/model agreement, preset switching, period inspection and narrow-screen overflow. It requires Playwright and a Chromium browser. Set `FIELD_PLAYWRIGHT_PACKAGE` to an installed Playwright package directory if it is not locally resolvable, and `FIELD_BROWSER_EXECUTABLE` if using an installed browser instead of Playwright's default. These are local test dependencies, not explorer runtime dependencies.

## Change and rejection conditions

Replace or extend the model if conclusions depend on task-first execution, the agenda order, the finite grid, assumed permanence of backlog or the assent rule. Before interpreting any actual household, obtain appropriate participant accounts and compare alternatives such as expiring tasks, variable standards, different production priorities, skill acquisition, separate finances, outside support and asymmetric practical power. No source currently calibrates the numeric mapping from willingness to task movement.

The ordinary result is an inspectable example of how declared goals, constraints and review rules can generate different trajectories. It deliberately leaves open whether these are useful representations of real relationships.
