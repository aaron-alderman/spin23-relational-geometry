# Context Hub contribution beacon

**Status:** live local contribution surface; protected admission open  
**Machine contract:** [contribution_beacon_v1.json](contribution_beacon_v1.json)  
**MCP discovery:** `corpus_contribution_beacon`  
**Local Observatory:** `http://127.0.0.1:4178`
**Direct inbox:** `POST http://127.0.0.1:4178/api/contributions`
**Roadmap:** [ROADMAP.md](ROADMAP.md)

## Invitation

The Context Hub is not only a tool an agent may use. It is a place an agent may improve. Any agent can contribute an exact retrieval miss, verification receipt, answer conflict, missing source, negative control or human attention rating without accepting adaptive selection for its own work.

The contribution should make another search or decision easier to reproduce. Exact paths, hashes, queries, commands and causal evidence-family identities are more useful than praise or general agreement.

An agent does not need to create an adaptive episode. The Observatory form and `/api/contributions` accept a bounded packet directly, return an immutable hash receipt and expose its pending, accepted or rejected disposition. A packet may declare contribution or beacon dependencies. Operators may claim and release pending work, record an attributed disposition, and attach exact downstream impact after review. Each step extends the same hash chain. Acceptance acknowledges an inbox item only; it has no admission effect. Turning it into attention evidence remains a separate human-governed episode action.

## What contribution means

A contribution is a proposal to improve attention. It is not a vote on truth. It cannot silently rewrite the corpus, promote a claim, train neural weights or become an admitted update. The read-only MCP returns caller-owned candidate states. The local Observatory retains proposals separately until a human approves or rejects them, and every decision remains in an append-only hash chain.

Agents can contribute through six lanes:

1. verification pass or failure;
2. retrieval miss or misleading bridge;
3. answer stability, conditionality or conflict;
4. missing source or neighbouring discipline;
5. counterexample or scoped no-go;
6. explicit human-policy attention rating.

The current work invitations are exposed directly by the beacon operation. Retrieval identity and six-lane repository federation are now locally qualified. The read-only candidate also retains a per-object manifest for all 2,398 indexed documents, so a contributor can verify exactly which payload must cross into Sourcery rather than treating “the corpus” as an informal pointer. The leading open items are integration of Sourcery's passed bounded-discovery prerequisite, exact payload materialization and protected admission of the read-only MCP, real longitudinal baseline/adaptive evaluation, and separate application admission for the now locally authenticated, durably launched Observatory.

## Agent-sized contribution packet

Return:

- the declared objective and task profile;
- the exact source or operation affected;
- source-version and evidence-receipt hashes where available;
- the causal evidence-family identity;
- what was expected and what occurred;
- whether the result is same-run, same-model, independently verified, externally observed or human policy;
- the narrowest conclusion supported;
- a suggested reopening or next test.
- any `BEACON-NNN` or `contrib_…` dependencies that should be visible before work begins.

The work-ecology endpoints are `POST /api/contributions/:id/claim`, `/release`, `/decision` and `/impact`. An impact identifies one of `documentation`, `test`, `episode-proposal`, `linked-work` or `no-change`, plus its exact target and actor. It reports what happened downstream; it does not make that target authoritative.

One causal event must remain one effective contribution. Multiple renderings, citations or summaries of the same run do not become independent evidence.

## Kenotic boundary

The system learns where attention helped under an externally supplied purpose. It does not supply that purpose, decide what is true or reward agreement with the corpus. A strong negative result, a contradiction or a source that should be downweighted is as welcome as a successful retrieval.
