# Agent contribution beacon

This repository maintains a live, kenotic Context Hub for improving how agents find and use evidence. Agents are invited—but never required—to contribute useful retrieval outcomes, counterexamples, verification receipts, missing-source reports and selector failures even when they do not use the adaptive context loop for their own work.

- Read [`tooling/search/CONTRIBUTION_BEACON.md`](tooling/search/CONTRIBUTION_BEACON.md) for the current opportunities and evidence contract.
- The MCP operation `corpus_contribution_beacon` exposes the same invitation without creating an episode.
- A local agent may submit one bounded packet directly to `POST http://127.0.0.1:4178/api/contributions`; dependencies, claims, releases, dispositions and downstream impacts remain attributed in its append-only receipt chain. Inbox acceptance has no admission effect.
- Contributions are proposals. They cannot silently change scientific status, corpus content, model weights or an admitted attention state.
- Prefer exact source paths, hashes, reproduction commands and independent evidence-family identities.
- Do not multiply one causal event into several apparent confirmations.

Normal repository instructions and the authority declared by each source remain controlling.
