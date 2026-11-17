# Agent contribution beacon

This repository maintains a live, kenotic Context Hub for improving how agents find and use evidence. Agents are invited—but never required—to contribute useful retrieval outcomes, counterexamples, verification receipts, missing-source reports and selector failures even when they do not use the adaptive context loop for their own work.

- Read [`tooling/search/CONTRIBUTION_BEACON.md`](tooling/search/CONTRIBUTION_BEACON.md) for the current opportunities and evidence contract.
- The MCP operation `corpus_contribution_beacon` exposes the same invitation without creating an episode.
- A local agent may submit one bounded packet directly to `POST http://127.0.0.1:4178/api/contributions`; dependencies, claims, releases, dispositions and downstream impacts remain attributed in its append-only receipt chain. Inbox acceptance has no admission effect.
- Contributions are proposals. They cannot silently change scientific status, corpus content, model weights or an admitted attention state.
- Prefer exact source paths, hashes, reproduction commands and independent evidence-family identities.
- Do not multiply one causal event into several apparent confirmations.

Normal repository instructions and the authority declared by each source remain controlling.

# Optical boundary-response research continuity

For substantive continuations of the selector, E8 charge-dipole, hybrid-device, Casimir or local-flux investigation recorded in [`corpus/programmes/optical-boundary-response/README.md`](corpus/programmes/optical-boundary-response/README.md), leave a readable programme-note update alongside new calculation artifacts. Follow the corpus reading contract and explanatory standard. Record assumptions, source paths, derivations, failed criteria, physical status and the next discriminator; distinguish proposed precision from achieved measurements.

Update the packet's evidence index and regenerate its scoped manifest with `node scripts/index-optical-boundary-response-research-packet.mjs`, then run `node verification/verify/verify_optical_boundary_response_research_packet.mjs` and the result-specific checks affected by the change. Preserve frozen predictions and negative results. Documents, scripts and repeated calculations from one evidence family are not independent confirmations. This documentation workflow does not authorize changes to scientific admissions.
