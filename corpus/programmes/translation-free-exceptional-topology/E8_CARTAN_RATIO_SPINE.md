# E8 Cartan-kernel coupling-ratio spine

**Date:** 26 October 2026

**Status:** five ratio points promoted; one nonscalar direction promoted; perturbation tube open

**Evidence:** [ratio ledger](../../../evidence/data/translation-free-e8-cartan-ratio-spine-v1.json)  
**Certificate:** [spine verifier](../../../verification/verify/verify_translation_free_e8_cartan_ratio_spine.mjs)

For (r=u/U), complete-shell convergence promotes:

| (r) | promoted gap | final shell | final boundary weight |
|---:|---:|---:|---:|
| 0.25 | 0.5092198755 | 8 | (1.57\times10^{-6}) |
| 0.375 | 0.3367370326 | 10 | (9.13\times10^{-7}) |
| 0.50 | 0.2182768215 | 10 | (4.98\times10^{-6}) |
| 0.75 | 0.1177882433 | 12 | (5.52\times10^{-6}) |
| 1.00 | 0.1019267219 | 12 | (2.93\times10^{-5}) |

Each point has two successive sub-one-percent increments and preserves the
same parity detector: the first state is odd and sine-bright; the second is
even and cosine-bright. The rising cutoff required with (r) is physical
numerics, not solver failure: stronger locking spreads charge support.

Shell-six runs at (r=2,4) have 2.8% and 5.0% boundary weight and remain
reconnaissance. The five promoted points are a sampled stability spine, not
a proof of every intermediate ratio. One
[unequal-channel direction](E8_CHANNEL_AMPLITUDE_PERTURBATION.md) now
survives, but independent amplitude directions and metric perturbations are
required before calling this an open stability tube.
