# Receipt-driven attention-utility loop

**Status:** locally implemented V2; caller-owned, read-only and not protected-runtime admitted
**Scope:** source utility for context selection, not scientific truth, claim status or neural-model weights  
**Implementation:** [belief state](belief_state.mjs), [typed observation adapters](belief_observations.mjs), [adaptive context](adaptive_context.mjs)  
**Regression:** [belief-state tests](../../tests/repository/corpus_belief_state.test.mjs), [synthetic evaluation](run_belief_evaluation.mjs)

## Purpose

The attention-utility loop lets an LLM host learn from reproducible search, context, answer and verification receipts without giving the model hidden mutable memory or corpus-writing authority. The retained protocol name still says `belief` for compatibility, but the estimated quantity is always attention utility, never truth probability. It implements the corpus's Jev-like boundary: judgment is fast, probabilistic, typed and bounded, while the episode's objective is supplied from outside the estimator.

The loop is:

\[
\text{external objective}
\rightarrow \text{context}
\rightarrow \text{answer receipt}
\rightarrow \text{typed observation}
\rightarrow \text{belief update}
\rightarrow \text{next context}.
\]

Every state is supplied by the caller and returned as a new hash-bound value. The MCP server stores no state between calls.

## Estimated quantity

V2 estimates the bounded utility of a source for context construction in one episode. Utility is not the probability that a source or claim is true. It cannot change a source's declared status, establish empirical support, promote corpus content or train model weights.

For each observed source, the state retains a utility mean, uncertainty variance, observation count and last observation type. It also retains the external objective, task profile, exact corpus-content identity, update sequence, bounded innovation ledger and hash-chained history.

## Update

Each scalar source estimate uses a Kalman-like correction:

\[
\nu_t=y_t-\mu_t^-,\qquad
K_t=\frac{P_t^-}{P_t^-+R_t},
\]

\[
\mu_t=\mu_t^-+K_t\nu_t,\qquad
P_t=(1-K_t)P_t^-+Q_t.
\]

The observation policy fixes the default value and noise of every machine-derived observation. Every observation, including a `user-rating`, requires an exact receipt hash, an evidence-family hash, the observed source-version hash, a bounded producer identity, an independence class and a selection arm. A user rating must identify itself as `human-policy`; it cannot masquerade as machine evidence.

Observations derived from the same causal event share an evidence-family hash. For one family and source, correlated views collapse to one effective update; adverse evidence (`verification-fail`, `answer-conflict`, then `source-changed`) takes precedence, otherwise the declared lowest-noise view is retained. The same evidence family cannot influence the same source again later in the episode. The state exposes raw views and effective family/source updates, so receipt multiplication cannot counterfeit independent confirmation. Conflict and verification-failure observations add shock variance so disagreement reopens uncertainty rather than producing false certainty. A changed corpus identity fails closed and requires a new episode.

## Typed observations

| Type | Interpretation | Relative strength |
|---|---|---|
| `retrieved` | Source appeared in a selector-sensitive result | weak |
| `sweep-invariant` | Source survived every bounded context variant | moderate |
| `answer-cited` | A context-conditional answer used the source | weak |
| `answer-stable` | A cited atomic claim retained its verdict | moderate |
| `answer-conflict` | The same claim received incompatible verdicts | strong uncertainty shock |
| `verification-pass` | A declared verification supported the source's use | strong positive |
| `verification-fail` | A declared verification rejected the source's use | strong negative and uncertainty shock |
| `user-rating` | Explicit structured caller feedback | caller-declared within bounds |
| `source-changed` | A previously observed source changed identity | reset |

The adapters translate context sweeps, verified answer-stability comparisons and declared verification results into these observations. They never apply an update themselves.

Every V2 observation carries:

| Field | Meaning |
|---|---|
| `evidenceSha256` | Exact receipt or decision identity |
| `evidenceFamilySha256` | Root causal event shared by correlated views |
| `sourceVersionSha256` | Exact observed source bytes |
| `producer` | Bounded producer identity |
| `independenceClass` | `same-run`, `same-model`, `independent-verifier`, `external-observation` or `human-policy` |
| `selectionArm` | `baseline`, `adaptive`, `exploration` or `external` |

The state retains `evidenceFamilies`; each source estimate reports `evidenceFamilyCount`. The update report distinguishes `observations`, `effectiveObservations` and `collapsedObservations`.

## Adaptive selection

Adaptive context preserves the existing lexical/PageRank score and adds only bounded influence:

\[
S_{adaptive}=(1-\alpha)S_{current}+\alpha\mu+\beta\sqrt{P},
\]

where \(\alpha\le 0.2\) and \(\beta\le 0.05\). When exploration is active, one context slot is reserved for an eligible source that was not already selected, preferring unobserved sources and then retained uncertainty. The remaining selections are labelled `exploit`. This prevents prior absence from becoming permanent exclusion. Relevance-and-kind diversity still participate in selection. An empty state sets both effective adaptive terms to zero and reproduces the baseline source set exactly.

Adaptive selection requires the request task and profile to match the episode objective and profile exactly. Cross-objective or cross-profile reuse is refused; it requires a separately governed transfer design rather than silently treating utility as an intrinsic property of a source.

Every adaptive response includes the baseline source set, adaptive source set, movements, posterior estimates, control caps, state and corpus identities, and an authority receipt. Learned utility never overwrites the underlying retrieval score.

## MCP operations

- `corpus_belief_initialize` binds an external objective and profile to the current corpus identity.
- `corpus_belief_update` validates a supplied state and returns a **candidate** successor plus raw-view, effective-family and innovation receipts. It does not admit that successor.
- `corpus_adaptive_context` returns baseline and bounded-adaptive selection with the tailored context.

All operations are pure, deterministic, read-only and idempotent for identical inputs. Persistence and admission belong to the host. A host should keep candidate and admitted state separate, retain approve/reject/freeze/rollback receipts, and use only an admitted state for live selection. Reusable priors, cross-objective transfer, shared learning and model fine-tuning remain later governed admissions.

## Evaluation

Run:

```text
node tooling/search/run_belief_evaluation.mjs
```

The synthetic gate checks useful-source learning, distractor downweighting, uncertainty reopening under conflict, recovery after verification, bounded Brier score and exact deterministic replay. This is an engineering qualification, not evidence of scientific validity.

