# Worldwright identity-retention gate

**Date:** 2026-10-23

The original matched ablation found that removing identity changed relational and aggregate margins but changed zero winners across four coarse presets. Because those presets simultaneously changed material deficit, delay, capture risk, topology and identity salience, that result could not establish that identity was generally irrelevant.

The retention gate independently varied identity salience across `0`, `0.25`, `0.5`, `0.75` and `1` on the existing material × delay × urgency response grid. It used ten seeds not used by the learning–health component factorial. Five conditions covered 3,200 paired cells and 6,400 simulations per execution; the complete execution repeated exactly.

## Result

Identity is decision-relevant inside the authored model. Increasing salience from 0 to 1 changes 87 of 640 intervention classifications. The mediated winner count rises monotonically from 281 to 368, while the mean relational delta rises from `4.1565625` to `6.1365625`. Both relational and aggregate margins have zero monotonicity violations across all cells and salience steps.

This corrects the earlier interpretation: zero winner changes was a property of the four-preset sample, not a general property of the model. Identity should therefore remain available as a synthetic decision coordinate for now.

## Boundary

The gate proves only that the explicitly authored linear identity term can move the model's boundary. It does not validate the construct, coefficient or linear form against real populations. The seeds were already present in the earlier response-surface partition, so this is not an external held-out validation. The next gate must compare alternative functional forms and observational proxies on an independently identified cohort.

Machine-readable evidence is in [worldwright-identity-retention-response-surface-local-v1.json](../../../evidence/data/worldwright-identity-retention-response-surface-local-v1.json), with checks in [verify_worldwright_identity_retention_response_surface_local.mjs](../../../verification/verify/verify_worldwright_identity_retention_response_surface_local.mjs). The hash-pinned execution harness is [run_worldwright_identity_retention_response_surface.mjs](../../../verification/experiments/run_worldwright_identity_retention_response_surface.mjs).
