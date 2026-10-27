# Independent longitudinal evaluation contract

**Status:** executable preregistration and signed-result verifier complete; independent evaluator registration and real run open  
**Template:** [`longitudinal_evaluation_template_v1.json`](longitudinal_evaluation_template_v1.json)  
**Verifier:** [`longitudinal_evaluation.mjs`](longitudinal_evaluation.mjs)

The warm-up proves that the machinery records, learns, replays, rolls back and freezes correctly. It does not prove that adaptive context helps answer a downstream question. This contract separates those claims.

## Trial shape

One umbrella objective binds twelve unique subquestions before any context is generated. Six calibration tasks may supply approved objective-scoped attention evidence. Six later evaluation tasks are answered twice by one fixed model and prompt contract: once with baseline context and once with adaptive context. The arms are presented under opaque labels. The independent evaluator scores both answers in one causal evaluation family, so one judgment cannot become two apparent confirmations.

The Observatory now supports this design directly. `POST /api/episodes` may include a `taskSchedule` of 2–100 unique subquestions. The schedule is inside the belief-state and governance hashes. A turn outside it is refused. Episodes without a schedule retain the stricter legacy rule that every task equals the objective exactly.

## Independence and identity

Before context generation, an evaluator identity and Ed25519 public key are bound into a finalized plan. A valid run must:

- match the exact plan and corpus identities;
- be signed by the preregistered evaluator key;
- name a selection host different from the evaluator;
- carry context, answer, evidence and evidence-family hashes for both arms;
- use one evidence family for the paired arms of a task and a different family for every other task;
- retain exact source paths and unsupported-citation counts;
- include successful rollback, freeze and source-drift controls.

Supplying a key proves continuity of the registered evaluator identity, not wisdom or scientific authority. Independence also requires an operational separation that the trial record must document; the verifier refuses the obvious self-evaluation case but cannot infer undisclosed coordination.

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

The retained template intentionally has no evaluator key and therefore cannot produce a passing report by itself. An independent evaluator must register before contexts or answers are generated, execute the paired blinded assessment, sign the exact run and return it for verification. Until that happens the roadmap's real longitudinal gate remains open.
