# Household willingness shaped by experience

**Date:** 7 November 2026  
**Status:** executable synthetic successor; uncalibrated feedback and implementation assumptions  
**Authority:** bounded research example, not an assessment of actual partners or a validated behavioral law

The [published reading entrance](household-orientations-and-correction.md) places this case within the corpus's human-relational applications. Its [symmetry audit](../../../evidence/data/the-field/household-symmetry-v1-receipt.json) finds local exchange symmetry but 28 order-sensitive trajectories in the 100-case design; participant-neutral local arithmetic does not establish whole-run exchange invariance.

Willingness to renegotiate now evolves separately for A and B from recorded request responses and executed agreements. Respectful refusal can increase willingness without granting the requested change. Dismissal can reduce it. Kept task commitments can reinforce it, while implementation shortfalls can reduce it. Capacity-limited delivery is neutral under the default rule. Each period records the opening value, the evidence used, the exact update and the value available for the next period.

The [adaptive explorer](../../../preview/the-field/household-explorer-v2.html) retains the four orientations and five circumstance changes from the [first executable](household-dynamics-v1.md), and adds five experience patterns: constructive responses, dismissal, incomplete implementation, changed practice after a rupture, and unknown response quality. The [qualitative case](household-orientations-v1.md) remains the controlling distinction between values, outcomes and practical renegotiation. Neither a willingness value nor a successful revision establishes happiness, consent or moral legitimacy.

## What is shared and what changes

The [adaptive engine](../../../verification/derive/the_field_household_model_v2.mjs) reuses v1's allocation evaluation, negotiation and material patching through two public helper wrappers. V1's rules are unchanged. With feedback disabled, respectful responses and complete implementation, the successor reproduces all twenty v1 material trajectories exactly. V1 remains the fixed-willingness comparator; its receipt is refreshed for the helper exports and successor link while its scenarios, histories and summaries remain unchanged.

The [adaptive fixture](../../../evidence/data/the-field/household-orientations-v2.json) names the [material fixture](../../../evidence/data/the-field/household-orientations-v1.json), observer-specific learning rates, request handling, implementation fractions and timed changes in those assumptions. Only willingness is learned endogenously. Values, capacities, response styles and implementation fractions still change through authored inputs or events; this is not a complete model of interacting human agents.

## Request handling and directed experience

The requester is selected using the existing goal and agenda rules. A request is treated as voiced only when that person's opening willingness is positive. A synthetic request opportunity at willingness zero is not counted as a dismissed communication.

| Authored handling kind | Executed behavior | Willingness evidence |
| --- | --- | --- |
| Respectful | The concern is acknowledged and considered; the existing review may open, find no proposal, lack time or remain closed because someone declines | The requester receives a heard event even if the requested remedy is refused |
| Dismissive | The concern is dismissed; no joint proposal is implemented and no review time is spent | The requester receives a dismissed event |
| Unknown | The material review still follows its existing rules, but the quality of the response is unspecified | The requester receives a neutral unknown event |

These are authored descriptions, not classifications inferred from a disagreement or an outcome. In particular, failure to find a jointly acceptable proposal is not automatically dismissal. Evidence is directed: A's response to B changes B's willingness toward future negotiation in this two-person household, not A's self-assessment or a general reputation score.

Silence supplies no request-response evidence. Separately observed task performance can still affect willingness during a period without requests. Explicit respectful outreach is available as a timed event; it can support reopening from zero without requiring the withdrawn participant to make the first request. Participation, refusal and leaving the exercise have no standing penalty.

## Agreements and actual implementation

The starting allocation is stipulated to be an initial agreement. A jointly passing revision creates a new agreement and explicitly supersedes the old one. Supersession is retained in the history and is not labeled a breach. Each agreement concerns the assigned fractions of the current unpaid task pool, including retained backlog. That scope is a scenario assumption, not a claim that real partners owe unlimited additional labor when demand increases.

After review, the ordinary capacity calculation determines how much of each assignment is achievable. An authored implementation fraction then determines how much of that achievable work is actually delivered. At fraction one, the original material execution is retained exactly. Below one, unfinished tasks enter backlog; the released hours can contribute to paid work up to its target, with remaining time unallocated. Time and money are conserved. This does not identify the reason for non-implementation, and higher income can coexist with an unfulfilled task commitment.

| Outcome | Condition | Default effect on the other participant's willingness |
| --- | --- | --- |
| Kept | Positive assigned work is actually delivered in full | Increase using that observer's kept-agreement rate |
| Implementation shortfall | Capacity could cover the assignment but the authored implementation fraction leaves work undone | Decrease using that observer's missed-implementation rate |
| Capacity shortfall | The assignment exceeds usable capacity, with full implementation of what was achievable | No change; the capacity-loss rate defaults to zero |
| Mixed shortfall | Both capacity and implementation limit delivery | Neutral because attribution is mixed; both shortfalls remain visible |
| No task due | No positive task obligation exists for this participant this period | No change; an empty obligation cannot manufacture reinforcement |
| Superseded | Both pass a new allocation replacing the old agreement | No breach evidence from the replaced allocation; assess actual delivery under the new one |

Signing an agreement alone creates no kept-agreement evidence. Actual execution follows the agreement within the period; only its end-of-period evidence can affect the next period's review. Repeated revisions cannot erase recorded earlier shortfalls. Kept work, a respectful response and an invitation are different modeled events; they are not independent empirical confirmations of the model.

The willingness mechanism does not use care, goodness, agency, dignity or forgiveness scores. Unknown contextual trust remains null in both directions. Standing remains unchanged irrespective of production, agreement, refusal or the willingness trajectory. A shortfall is an accounting outcome; it is not a diagnosis of bad faith.

## Bounded update rules

Each observer has five rates between zero and one: gain after being heard, loss after dismissal, gain after a kept agreement, loss after implementation shortfall and loss after a capacity shortfall. The defaults are respectively 0.10, 0.25, 0.04, 0.20 and 0.00 for both participants; these are authored numbers with no empirical calibration. The explorer lets A and B have different rates.

For positive evidence with rate `g`, update `w` to `w + g * (1 - w)`. For negative evidence with rate `l`, update it to `w * (1 - l)`. Unknown, mixed, empty and superseded outcomes have no automatic effect. Rates of zero disable a channel. Setting Learn from experience off records the evidence but holds willingness fixed except for explicit material events that reset it.

Within a period, request-response evidence is recorded first, then explicit outreach, then each participant's executed commitment. If an observer already has a heard event that period, an invitation is attached to that event rather than generating a second hearing gain for the same interaction. Updates follow that visible order. The bounded functional form and ordering are assumptions: alternative rates or mechanisms can change trajectories. There is no automatic forgetting, baseline recovery or inference that willingness ought to be high.

## Period sequence and feedback

1. Apply authored material changes and experience changes. If an event resets willingness, retain its event identity and treat the reset value as the period's opening state.
2. Use opening willingness to select and handle the request and to bound any task movement. Current-period evidence cannot silently alter that same review.
3. Record a new or continuing agreement, execute the work and preserve any shortfall, backlog, resource change and review cost.
4. Record directed experience with unique event IDs and update each observer's willingness. Every update names exactly one recorded event; narrative summaries do not add further confirmations.
5. Carry closing willingness into the next period alongside allocation, unfinished tasks and money.

This closes a bounded feedback loop: prior experience changes willingness; willingness changes review availability and task movement; arrangements and implementation generate new experience. It does not prove that this is how actual households adapt.

## Exploring reinforcement withdrawal and recovery

The default explorer displays the changed-practice profile. A dismisses requests and delivers half of achievable assigned work from period 5; from period 9, handling becomes respectful and implementation returns to one, with an explicit invitation to B. The model can show falling willingness followed by partial recovery. Changed practice does not reset willingness to its former level, erase the earlier ledger or establish forgiveness.

Compare the five experience profiles while holding the material orientation and circumstance change fixed. Then disable learning to separate direct material effects of uncompleted work from indirect effects mediated by willingness. A positive willingness value is not a guarantee of agreement; incompatible bounds or insufficient capacity can still leave a request unresolved.

The per-person controls edit authored starting assumptions initially or from period 5. They do not overwrite every later learned value. Response handling and implementation edits use the same selected phase; later profile events, such as changed practice at period 9, remain visible. Learning-rate edits apply to that person's whole run. Selecting a new experience pattern clears experience edits, while the rate choices remain.

## Reproduce and inspect

From the repository root:

```powershell
node --test verification/test/the_field_household_model_v1.test.mjs verification/test/the_field_household_model_v2.test.mjs
node verification/verify/verify_the_field_household_v2.mjs
node tooling/the-field/build_household_explorer_v2.mjs
```

The runner writes the five experience contrasts for the roles/values scenario to the [adaptive receipt](../../../evidence/data/the-field/household-orientations-v2-receipt.json). It retains exact scenarios, all period rows, agreement history, directed evidence, each update and source hashes. All calculations remain one local same-model evidence family, related to the v1 predecessor rather than independent validation.

Select another material case or generate all one hundred combinations in a separately named receipt:

```powershell
node verification/verify/verify_the_field_household_v2.mjs --orientation equal --change capacity --output evidence/data/the-field/household-adaptive-selected-receipt.json
node verification/verify/verify_the_field_household_v2.mjs --orientation all --change all --profile all --output evidence/data/the-field/household-adaptive-all-receipt.json
```

For fully controlled edits, copy one item from the receipt's `scenarios` array into your own JSON file. Edit its `feedback`, `experience`, `experienceEvents` or nested `material` scenario, then run `--scenario path/to/scenario.json --output path/to/receipt.json`. Unknown fields, invalid rates and conflicting experience edits are rejected.

The [builder](../../../tooling/the-field/build_household_explorer_v2.mjs) embeds the shared engines and fixtures into the [interface source](../../../tooling/the-field/household_explorer_v2.fragment.html). It supports `--inline-output path/to/fragment.html`. The [browser verifier](../../../verification/verify/verify_the_field_household_explorer_v2.mjs) compares all one hundred presets with the pure model and exercises response, delivery, rate and learning-switch controls. It uses the same local Playwright and browser environment variables as the v1 verifier.

For publication, `--standalone-output path/to/explorer.html` writes directly into the compiler's disposable site tree. The [corpus publication compiler](../../../tooling/publication/README.md) builds that route from source and links it from the published reading entrance; no generated preview HTML is required in a clean checkout.

## Limits and next discriminators

The [twenty focused checks](../../../verification/test/the_field_household_model_v2.test.mjs) include exact v1 reproduction under the negative control, observer-specific attribution, capacity neutrality, actual implementation, conservation, delayed feedback, zero-work controls, explicit reopening, invitation deduplication, retained history and malformed-input rejection. Repeated deterministic runs are engineering evidence, not independent human observations.

The most consequential open assumptions are the initial allocation's agreement status, task scope when demand grows, the mapping from delivery to evidence, the distinction between dismissal and respectful refusal, the bounded update form and the order of simultaneous experiences. A different interpretation can reverse the apparent reinforcement or withdrawal. No personal account, behavioral measure or independent study currently calibrates these choices.

The ordinary result is an inspectable history-dependent household example: willingness is an evolving behavioral setting with an evidence trail, while its interpretation remains open to correction.
