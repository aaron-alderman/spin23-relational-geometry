# Context Hub Observatory

**Status:** locally implemented and tested; local-only host, not part of the read-only MCP admission candidate
**Runtime:** [observatory server](observatory_server.mjs)
**Orchestration:** [episode runtime](observatory_runtime.mjs)
**Persistence:** [append-only episode store](episode_store.mjs)
**Interface:** [browser client](observatory/public/index.html)
**Regression:** [Observatory tests](../../tests/repository/context_hub_observatory.test.mjs)

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

Then open `http://127.0.0.1:4178`. Choose another port with `--port`. Runtime episodes are written beneath `.context-hub/episodes/`, which is excluded from Git.

The server binds to localhost only, accepts JSON requests up to 2 MiB, exposes no cross-origin permission, serves a restrictive content-security policy and has no endpoint for deleting or rewriting events.

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

The adaptive outcome balance is an operational diagnostic, not a scientific score. It reports whether subsequently observed positive or negative attention utility favored the adaptive-only or baseline-only set. Human ratings are marked `human-policy`; they express a preference over attention rather than independent empirical evidence.

Replay uses the candidate universe recorded with each original turn, including source identities and retrieval scores. It therefore tests alternate selector and estimator controls against what was eligible then, not against a silently changed live search result. Turns created before candidate-universe receipts fail closed rather than claiming faithful replay.

## Episode format and concurrency

Each episode is one JSONL file. Every event binds its episode, monotonic revision, type, timestamp, predecessor hash and payload into an event SHA-256 identity. Loading verifies the complete chain. Appends require the expected current revision and acquire a per-episode lock, so stale or competing writers fail closed. V1 is deliberately a local single-writer system; abandoned lock recovery and distributed persistence are not automated.

## Authority boundary

The Observatory writes only its local episode ledger. It cannot modify corpus sources, change epistemic status, promote claims, admit applications or train model weights. Every influence must identify an explicit recorded turn and is bound to that turn's source-version hash, evidence receipt, causal evidence family, producer, independence class and derived selection arm. The host re-hashes source bytes and refuses both caller-supplied version mismatches and drift from the recorded turn. Observations from one causal family collapse to one effective update per source; adverse evidence wins conflicts within that family. Local machine proposals are host-labelled `same-run` and human ratings `human-policy`; this interface cannot self-declare independent verification. The underlying attention state rejects replay of the same receipt or family for the same source.

The write-capable host is intentionally excluded from the read-only Sourcery MCP candidate. A future protected admission would require a distinct application identity and lifecycle.
