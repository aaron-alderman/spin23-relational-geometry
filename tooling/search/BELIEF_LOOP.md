# Receipt-driven belief loop

**Status:** locally implemented V1; caller-owned, read-only and not protected-runtime admitted  
**Scope:** source utility for context selection, not scientific truth, claim status or neural-model weights  
**Implementation:** [belief state](belief_state.mjs), [typed observation adapters](belief_observations.mjs), [adaptive context](adaptive_context.mjs)  
**Regression:** [belief-state tests](../../tests/repository/corpus_belief_state.test.mjs), [synthetic evaluation](run_belief_evaluation.mjs)

## Purpose

The belief loop lets an LLM host learn from reproducible search, context, answer and verification receipts without giving the model hidden mutable memory or corpus-writing authority. It implements the corpus's Jev-like boundary: judgment is fast, probabilistic, typed and bounded, while the episode's objective is supplied from outside the estimator.

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

V1 estimates the bounded utility of a source for context construction in one episode. Utility is not the probability that a source or claim is true. It cannot change a source's declared status, establish empirical support, promote corpus content or train model weights.

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

The observation policy fixes the default value and noise of every machine-derived observation. Every machine-derived observation requires an evidence SHA-256 identity. Duplicate type/source/evidence tuples are rejected within one update, and a bounded state ledger rejects replay of the same machine evidence across later updates. Only an explicit `user-rating` may supply a caller value and noise without a receipt hash. Conflict and verification-failure observations add shock variance so disagreement reopens uncertainty rather than producing false certainty. A `source-changed` observation resets the local estimate. A changed corpus identity fails closed and requires a new episode.

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

## Adaptive selection

Adaptive context preserves the existing lexical/PageRank score and adds only bounded influence:

\[
S_{adaptive}=(1-\alpha)S_{current}+\alpha\mu+\beta\sqrt{P},
\]

where \(\alpha\le 0.2\) and \(\beta\le 0.05\). The uncertainty term keeps exploration visible. The selected source with greatest retained variance is labelled `explore`; the remaining selections are labelled `exploit`. Relevance-and-kind diversity still participate in selection. An empty belief state sets both effective adaptive terms to zero and reproduces the baseline source set exactly.

Every adaptive response includes the baseline source set, adaptive source set, movements, posterior estimates, control caps, state and corpus identities, and an authority receipt. Learned utility never overwrites the underlying retrieval score.

## MCP operations

- `corpus_belief_initialize` binds an external objective and profile to the current corpus identity.
- `corpus_belief_update` validates a supplied state and returns a successor plus innovation receipt.
- `corpus_adaptive_context` returns baseline and bounded-adaptive selection with the tailored context.

All operations are pure, deterministic, read-only and idempotent for identical inputs. Persistence belongs to the host. Reusable priors, shared learning and model fine-tuning remain later governed admissions.

## Evaluation

Run:

```text
node tooling/search/run_belief_evaluation.mjs
```

The synthetic gate checks useful-source learning, distractor downweighting, uncertainty reopening under conflict, recovery after verification, bounded Brier score and exact deterministic replay. This is an engineering qualification, not evidence of scientific validity.

