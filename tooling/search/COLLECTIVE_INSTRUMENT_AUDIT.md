# Collective instrument maturity audit

**Status:** engineering population substantial; collective maturity not established
**Policy:** [`collective_instrument_policy_v1.json`](collective_instrument_policy_v1.json)
**Latest retained audit:** [`collective_instrument_audit_live_v1.json`](collective_instrument_audit_live_v1.json)
**Auditor:** [`collective_instrument_audit.mjs`](collective_instrument_audit.mjs)

The maturity audit asks a different question from the warm-up. The warm-up asks whether one protected host can record, approve, replay, roll back and freeze correctly. This audit asks whether enough different people, purposes, evidence families and governance outcomes have accumulated for the host to count as a collective instrument rather than a well-tested local mechanism.

The policy is fixed in a machine-readable file. It requires useful volume, objective and contributor diversity, bounded source and contributor concentration, both acceptance and rejection, downstream impact receipts, independent or external observations, rollback and freeze evidence, exact per-episode corpus identities, intact hash chains, preserved authority boundaries and no family/source replay. Multiple corpus generations are legitimate and remain separately counted; they are not collapsed into one fictitious timeless corpus.

## Current result

The retained audit reads and integrity-checks the complete live population: 66 episodes and two contributions. The engineering side is healthy:

- 13 distinct objectives, 136 turns, 60 answers and 60 replays;
- 65 approved updates, five rollbacks and five frozen episodes;
- 49 selected sources, with maximum selection share `1/6`;
- three explicit corpus identities, each retained rather than silently merged;
- every event chain replayable, every authority boundary intact and no family/source replay.

The collective claim is not yet available:

- all 70 observations are `same-run`; none is an independent-verifier or external-observation family;
- no episode update has been rejected;
- only two contributors have submitted two pending proposals;
- no proposal has been accepted or rejected and no downstream impact has been recorded.

Accordingly the report is `mature: false`. Repeating the warm-up cannot close these gates. The missing data must come from actual independent use, adverse judgment, human disposition and attributed downstream consequences.

The auditor exits nonzero while maturity is false. That is a monitoring result, not a broken test and not permission to lower thresholds after seeing the population.

The live Observatory exposes the same computation read-only at `GET /api/maturity`. No operator credential is required because the response contains only already inspectable episode/contribution identities and aggregate evidence; the endpoint has no mutation or admission path.

## Run

Against the stable local deployment:

```text
node tooling/search/collective_instrument_audit.mjs --root C:/Users/aaron/grand-theory/.context-hub/observatory-runtime --state-root C:/Users/aaron/grand-theory/.context-hub/observatory-runtime/.context-hub/episodes --contribution-root C:/Users/aaron/grand-theory/.context-hub/observatory-runtime/.context-hub/contributions --out tooling/search/collective_instrument_audit_live_v1.json
```

The population and policy SHA-256 identities make successive audits comparable. A later pass may establish maturity only for the measured population and declared policy; it cannot establish scientific truth or promote corpus content.
