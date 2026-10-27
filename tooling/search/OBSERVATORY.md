# Context Hub Observatory

**Status:** live local host with agent contribution beacon; not part of the read-only MCP admission candidate
**Runtime:** [observatory server](observatory_server.mjs)
**Orchestration:** [episode runtime](observatory_runtime.mjs)
**Persistence:** [append-only episode store](episode_store.mjs)
**Interface:** [browser client](observatory/public/index.html)
**Regression:** [Observatory tests](../../tests/repository/context_hub_observatory.test.mjs)
**Warm-up evaluation:** [retained 12-case receipt](../../evidence/data/context-hub-observatory-warmup-20261027.json)
**Protected-application candidate:** [exact candidate manifest](observatory_application_candidate_v1.json)

## What makes the loop operational

The read-only MCP tools remain pure and stateless. The Observatory is an explicit local host that carries their returned belief state between turns. It gives that memory a visible place, a hash-chained history and a separate approval boundary:

\[
\text{objective}
\rightarrow \text{baseline/adaptive context}
\rightarrow \text{answer receipt}
\rightarrow \text{proposed evidence}
\rightarrow \boxed{\text{approve or reject}}
\rightarrow \text{successor state}.
\]

A proposal never changes the admitted attention state. Approval is a second event, and rollback is another append-only event that restores a previously admitted state without erasing intervening history. Freezing an episode prevents proposals, approvals, rollbacks and policy changes while retaining search and inspection. Counterfactual replay reconstructs attention state and selection from recorded approved evidence under alternative controls without changing the live episode.

## Run locally

```text
node tooling/search/observatory_server.mjs
```

On Windows, the idempotent hidden launcher retains logs, a PID and a generated 256-bit operator token beneath the ignored `.context-hub/` directory:

```powershell
powershell -ExecutionPolicy Bypass -File tooling/search/start_observatory.ps1
```

Then open `http://127.0.0.1:4178`. Choose another port with `--port`. Runtime episodes are written beneath `.context-hub/episodes/`, which is excluded from Git. The browser asks for the token on the first protected write and keeps it only in that tab's session storage. Read it locally from `.context-hub/operator.token`; never commit or transmit it.

From a stable non-managed checkout or exact deployment snapshot, logon recovery can be installed for the current Windows user:

```powershell
powershell -ExecutionPolicy Bypass -File tooling/search/manage_observatory_startup.ps1 -Action Install -WhatIf
powershell -ExecutionPolicy Bypass -File tooling/search/manage_observatory_startup.ps1 -Action Install
```

`Status` reports the installed launcher and `Uninstall` removes it. The installer refuses linked and managed worktrees because their paths are disposable. The generated logon launcher contains only the stable repository path and port. The operator credential remains in ignored runtime state and is created on first launch.

The retained [durable-startup receipt](durable_startup_receipt_v1.json) records the current installation. The pushed commit was materialized as a static deployment beneath the primary checkout's ignored `.context-hub/` directory, all 46 runtime-state files matched during handoff, and invocation of the exact installed launcher replaced the process while preserving the persistence path and credential hash. This proves launcher recovery; it does not pretend that a physical reboot has already been observed.

The health endpoint is `/api/health`; `/api/beacon` exposes the same optional contribution invitation as the read-only MCP operation `corpus_contribution_beacon`. An agent may inspect and contribute without creating or adopting an adaptive episode. `POST /api/contributions` records a validated proposal in a separate append-only inbox and returns its hash-chain receipt. `GET /api/contributions` exposes dependency, claim, attribution, disposition and downstream-impact views. `POST /api/contributions/:id/claim`, `/release`, `/decision` and `/impact` append the corresponding coordination receipt. Inbox acceptance is acknowledgement only and cannot mutate an episode, admit attention evidence or promote corpus content.

The server binds to localhost only, accepts JSON requests up to 2 MiB, exposes no cross-origin permission, serves a restrictive content-security policy and has no endpoint for deleting or rewriting events. The launcher names the write principal `context-hub.operator.local`. Its bearer token protects episode creation and every episode mutation, plus contribution claim, release, disposition and impact actions. Direct contribution submission deliberately remains open because it creates only a proposal receipt and has no admission effect. `/api/health` reports the principal and credential hash, never the credential.

## Visible controls

- graph influence from 0 to 0.6;
- adaptive influence from 0 to 0.2;
- exploration from 0 to 0.05;
- source and context budgets;
- freeze or unfreeze learning;
- approve or reject each proposed update;
- roll back to any previously admitted state without rewriting history;
- replay with alternate process variance and selector controls.

Process variance is fixed inside a live episode because changing it would reinterpret previous updates. It may be varied only in replay or a new episode.

## Monitoring

The episode view exposes:

- active objective, profile, corpus identity and state identity;
- objective, profile, policy, candidate-state and admitted-state hashes;
- baseline and adaptive source sets with additions, omissions and exploration roles;
- the complete eligible candidate universe and its hash for each recorded turn;
- mean utility and uncertainty by observed source;
- causal evidence-family counts, producer, independence class, source version and selection arm;
- innovation residuals before approval;
- turn, answer, conflict, approval and rejection counts;
- mean baseline/adaptive Jaccard overlap;
- a provisional adaptive outcome balance when observations are attached to turns;
- append-only event revisions and hashes;
- recorded versus counterfactual state and source-set comparisons.

The cross-episode [`collective instrument audit`](COLLECTIVE_INSTRUMENT_AUDIT.md) adds population-level checks that a single episode cannot supply: objective, source and contributor concentration; independence-class counts; positive and negative governance; downstream impact; corpus-generation stratification; replayability and family/source reuse. Its current `mature: false` result is retained rather than hidden by the successful engineering warm-up.

The adaptive outcome balance is an operational diagnostic, not a scientific score. It reports whether subsequently observed positive or negative attention utility favored the adaptive-only or baseline-only set. Human ratings are marked `human-policy`; they express a preference over attention rather than independent empirical evidence.

For a longitudinal trial, episode creation may include a `taskSchedule` containing 2–100 unique subquestions under one umbrella objective. The schedule is bound into both the initial belief-state identity and the public governance receipt. Scheduled episodes refuse every undeclared task; unscheduled episodes retain exact objective equality. This permits within-objective learning across preregistered tasks without allowing undeclared cross-objective transfer. The local UI exposes the same optional schedule.

The retained 12-case corpus warm-up passes candidate recall, empty-state parity, answer receipts, deterministic replay, objective isolation, adverse-evidence direction, rollback, freeze and authority gates against one exact corpus identity. It is same-run objective-scoped engineering evidence. Because the expected source and marker are preregistered from the corpus itself, it does not close the stronger longitudinal gate requiring independent downstream task outcomes.

[`LONGITUDINAL_EVALUATION.md`](LONGITUDINAL_EVALUATION.md) defines that stronger gate. Its executable evaluator kit requires a public key, selection-host identity and blinding commitment registered before context generation. The evaluator receives six paired held-out tasks under opaque arm labels and signs the exact answer bodies, context/answer/evidence identities, citations, scores and notes before the host reveals the committed mapping. Verification then enforces causal-family discipline, utility and concentration limits, and rollback/freeze/drift controls. The template deliberately has no evaluator key and cannot self-pass; no real longitudinal result is claimed yet.

Replay uses the candidate universe recorded with each original turn, including source identities and retrieval scores. It therefore tests alternate selector and estimator controls against what was eligible then, not against a silently changed live search result. Turns created before candidate-universe receipts fail closed rather than claiming faithful replay.

## Episode format and concurrency

Each episode is one JSONL file. Every event binds its episode, monotonic revision, type, timestamp, predecessor hash and payload into an event SHA-256 identity. Loading verifies the complete chain. Appends require the expected current revision and acquire a per-episode lock, so stale or competing writers fail closed. Each outside contribution is a separate JSONL chain containing one immutable proposal followed by bounded claim, release, disposition and impact events; load also validates their state transitions. V1 is deliberately a local single-writer system; abandoned lock recovery and distributed persistence are not automated.

## Authority boundary

The Observatory writes only its local episode ledger. It cannot modify corpus sources, change epistemic status, promote claims, admit applications or train model weights. Every influence must identify an explicit recorded turn and is bound to that turn's source-version hash, evidence receipt, causal evidence family, producer, independence class and derived selection arm. The host re-hashes source bytes and refuses both caller-supplied version mismatches and drift from the recorded turn. Observations from one causal family collapse to one effective update per source; adverse evidence wins conflicts within that family. Local machine proposals are host-labelled `same-run` and human ratings `human-policy`; this interface cannot self-declare independent verification. The underlying attention state rejects replay of the same receipt or family for the same source.

The write-capable host is intentionally excluded from the read-only Sourcery MCP candidate. Its separate `context-hub.observatory.local` application candidate hashes the runtime, UI, launch/recovery controls, corpus projection dependency and qualification tests while expressly excluding the operator token, episode and contribution ledgers, PID and logs. This closes package identity, not protected application admission. The retained launcher rehearsal closes process recovery; a natural reboot/logon observation and a separately admitted application lifecycle remain explicit operational gates.
