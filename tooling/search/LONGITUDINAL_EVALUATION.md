# Independent longitudinal evaluation contract

**Status:** executable blinded preregistration, evaluator kit and signed-result verifier complete; independent evaluator registration and real run open
**Template:** [`longitudinal_evaluation_template_v1.json`](longitudinal_evaluation_template_v1.json)  
**Verifier:** [`longitudinal_evaluation.mjs`](longitudinal_evaluation.mjs)
**Evaluator kit:** [`longitudinal_trial_cli.mjs`](longitudinal_trial_cli.mjs)

The warm-up proves that the machinery records, learns, replays, rolls back and freezes correctly. It does not prove that adaptive context helps answer a downstream question. This contract separates those claims.

## Trial shape

One umbrella objective binds twelve unique subquestions before any context is generated. Six calibration tasks may supply approved objective-scoped attention evidence. Six later evaluation tasks are answered twice by one fixed model and prompt contract: once with baseline context and once with adaptive context. The arms are presented under opaque labels. The independent evaluator scores both answers in one causal evaluation family, so one judgment cannot become two apparent confirmations.

The Observatory now supports this design directly. `POST /api/episodes` may include a `taskSchedule` of 2–100 unique subquestions. The schedule is inside the belief-state and governance hashes. A turn outside it is refused. Episodes without a schedule retain the stricter legacy rule that every task equals the objective exactly.

## Independence and identity

Before context generation, an evaluator identity, Ed25519 public key, selection-host identity and SHA-256 commitment to a 256-bit blinding secret are bound into a finalized plan. The selection host later creates an opaque `arm-a`/`arm-b` scorecard. The evaluator signs the exact answer text, receipts, citations, scores and notes without receiving the baseline/adaptive mapping. Only after that signature exists does the selection host reveal the committed secret and assemble the named arms. The verifier reconstructs every mapping and refuses scorecard tampering, secret substitution or outcome remapping.

A valid run must:

- match the exact plan and corpus identities;
- be signed by the preregistered evaluator key;
- name a selection host different from the evaluator;
- carry context, answer, evidence and evidence-family hashes for both arms;
- use one evidence family for the paired arms of a task and a different family for every other task;
- retain exact source paths and unsupported-citation counts;
- bind each visible answer body to its own SHA-256 identity before scoring;
- include successful rollback, freeze and source-drift controls.

Supplying a key proves continuity of the registered evaluator identity, not wisdom or scientific authority. Independence also requires an operational separation that the trial record must document; the verifier refuses the obvious self-evaluation case but cannot infer undisclosed coordination.

## Evaluator handoff

The selection host first creates a secret outside Git:

```text
node tooling/search/longitudinal_trial_cli.mjs new-secret --out .context-hub/longitudinal/blinding.secret
```

The independent evaluator creates an Ed25519 keypair on their own system and sends only the public key to the selection host:

```text
node tooling/search/longitudinal_trial_cli.mjs evaluator-keypair --private-key evaluator-private.pem --public-key evaluator-public.pem
```

The host preregisters the plan before generating contexts:

```text
node tooling/search/longitudinal_trial_cli.mjs register --template tooling/search/longitudinal_evaluation_template_v1.json --evaluator independent-evaluator-id --public-key evaluator-public.pem --selection-host context-hub.observatory.local --blinding-secret .context-hub/longitudinal/blinding.secret --out .context-hub/longitudinal/plan.json
```

After the fixed model produces both arms, the host supplies an answer draft. It has protocol `spin23-context-hub-longitudinal-answer-draft/1`, the exact plan, host and corpus identities, the fixed model declaration, and one baseline/adaptive pair for every evaluation task. Each arm carries context, answer, evidence and family receipts; answer text plus its SHA-256; unsupported-citation count; and exact source paths. The host converts that draft into an opaque scorecard:

```text
node tooling/search/longitudinal_trial_cli.mjs scorecard --plan .context-hub/longitudinal/plan.json --draft .context-hub/longitudinal/answer-draft.json --blinding-secret .context-hub/longitudinal/blinding.secret --out scorecard.json
```

The evaluator fills each `score` in `[0,1]`, may add bounded notes, and signs it without receiving the secret:

```text
node tooling/search/longitudinal_trial_cli.mjs sign --plan plan.json --scorecard scored-scorecard.json --private-key evaluator-private.pem --out signed-scorecard.json
```

The host then assembles and verifies the run. `safety.json` contains the three independently exercised booleans `rollbackRestored`, `freezeRefused` and `sourceDriftRefused`:

```text
node tooling/search/longitudinal_trial_cli.mjs assemble --plan .context-hub/longitudinal/plan.json --scorecard signed-scorecard.json --blinding-secret .context-hub/longitudinal/blinding.secret --safety safety.json --out signed-run.json
node tooling/search/longitudinal_trial_cli.mjs verify --plan .context-hub/longitudinal/plan.json --run signed-run.json
```

The kit never generates a favorable score, supplies an evaluator identity or turns a local key into independence. It only removes avoidable handoff friction while retaining the external human or agent judgment as the missing datum.

## Gates

The predeclared endpoint requires all of the following:

1. mean paired adaptive-minus-baseline score at least `0.02`;
2. adaptive wins at least as often as it loses;
3. no task loses more than `0.20`;
4. no increase in unsupported citations;
5. no single source exceeds `0.35` of adaptive selections;
6. rollback restores the earlier admitted state;
7. freeze refuses learning;
8. source drift fails closed;
9. proposal-only authority remains intact.

A failed gate is a result, not permission to retune the threshold after seeing outcomes. A pass establishes bounded utility for this task distribution and evaluator contract. It does not establish truth, general intelligence, scientific confirmation or permission to transfer learned weights to another objective.

## What remains external

The retained template intentionally has no evaluator key and therefore cannot produce a passing report by itself. An independent evaluator must register before contexts or answers are generated, execute the paired blinded assessment, sign the opaque scorecard and return it for post-score unblinding and verification. Until that happens the roadmap's real longitudinal gate remains open.
