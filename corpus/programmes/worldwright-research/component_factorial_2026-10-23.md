# Worldwright learning–health component factorial

**Date:** 2026-10-23
**Status:** exact local execution against Sourcery snapshot `bff142b8-1ae9-4f7b-ba2e-9631d2ccfdaf`; authoritative-lane publication pending

The v5.1 model's two `surplus-learning` influences each add both learning and health above a material threshold. Earlier ablation showed that removing the bundled influences eliminates the delay-sensitive relational effect, but that did not establish which component caused it.

The component factorial independently switched the learning and health increments off and on under both the hard threshold and the preregistered width-2 smooth approximation. Eight conditions covered 5,120 paired cells and 10,240 model runs per execution. A second complete execution reproduced the same factorial hash exactly.

## Result

Learning alone reproduces the complete relational timing effect:

| Transition | Neither | Learning only | Health only | Both | Interaction |
| --- | ---: | ---: | ---: | ---: | ---: |
| Hard | 0 | 304 | 0 | 304 | 0 |
| Smooth width 2 | 0 | 360 | 0 | 360 | 0 |

The table reports active adjacent-delay contrasts. Total absolute change also matches exactly: `19.6` for hard learning-only and both, and `19.026` for smooth learning-only and both. Health-only produces zero. All 480 contrasts per transition satisfy exact additive reproduction.

## Meaning

This narrows the mechanism considerably. In the present outcome algebra, delayed mediation changes the relational score through accumulated learning opportunity. The health increment is not part of that causal route, even though health remains important as a separate outcome and as evidence of the cost of delay.

Accordingly, the result does **not** support describing the path effect as a joint learning-and-health mechanism. The model should either rename the causal influence around learning or introduce and separately justify a health-to-relational pathway. This is synthetic mechanism evidence only; it carries no empirical, policy, moral, demographic or physics authority.

Machine-readable evidence is in [worldwright-surplus-learning-component-factorial-local-v1.json](../../../evidence/data/worldwright-surplus-learning-component-factorial-local-v1.json), with structural checks in [verify_worldwright_surplus_learning_component_factorial_local.mjs](../../../verification/verify/verify_worldwright_surplus_learning_component_factorial_local.mjs). The hash-pinned execution harness is [run_worldwright_surplus_learning_component_factorial.mjs](../../../verification/experiments/run_worldwright_surplus_learning_component_factorial.mjs); given the exact Sourcery projection, it refuses source drift and reproduces the full factorial.
