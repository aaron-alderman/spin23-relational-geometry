# The detector exists, but the public likelihood is not yet the detector map we need

**Date:** 25 October 2026  
**Status:** public-source availability audited; exact external recast awaits a likelihood release  
**Topics:** OT-048  
**Parent:** [AZ-079 flavor-changing second record](admissibility_79_flavor_changing_second_record_for_the_sixth_coordinate.md)  
**Evidence:** [Belle likelihood availability ledger](../../../evidence/data/belle-alp-public-likelihood-availability-gate-v1.json)  
**Generator:** [availability audit](../../../scripts/run-belle-alp-public-likelihood-availability-gate.mjs)  
**Verifier:** [release-packet certificate](../../../verification/admissibility/verify_belle_alp_public_likelihood_availability_gate.mjs)

## Result

The Belle flavor-changing detector arm is real, but the public result is not yet a reusable detector map for the corpus's two-coordinate question.

The inspected paper and official Belle II publication page provide a detailed analysis of four modes,

\[
K_S^0,\quad K^+,\quad K^{*0},\quad K^{*+},
\]

over \(0.16\)--\(4.50\) GeV for the K modes and \(0.16\)--\(4.20\) GeV for the \(K^*\) modes. The analysis uses \(711\,\mathrm{fb}^{-1}\), an unbinned diphoton-mass likelihood, mass-dependent resolution and lifetime acceptance, and a conservative 22.3% systematic uncertainty. It publishes signal-yield and local-significance curves for the four modes and a combined 90% confidence limit under a one-coupling \(g_{aW}\) model.

Those objects establish the apparatus, observable, controls and achieved sensitivity. They do not retain all distinctions required to replace the one-coupling production-and-decay model by a joint \((A_2,c_{WW})\) fit.

## The missing release packet

An exact public recast needs six machine-readable objects:

1. the mass-hypothesis grid for every K and (K^*) mode;
2. the per-mode profile likelihood or signal-yield likelihood at every mass point;
3. signal efficiency jointly as a function of ALP mass and lifetime;
4. the correlated nuisance model across modes and neighboring mass points;
5. the background-shape and mass-resolution nuisance response;
6. the map from production coefficient and decay model to accepted yield.

No auxiliary likelihood or HEPData record for this analysis was located on the inspected official publication, paper and title/collaboration-search surfaces on 25 October 2026. That is an availability statement, not a claim that the collaboration lacks the information or that a later release cannot provide it.

Digitizing Figures 3--5 can orient the mass window and rough sensitivity. It cannot recover an unbinned likelihood, correlations, efficiencies or the response to a changed lifetime and branching model. Such a digitization is therefore inadmissible as evidence that the second profiled singular value survives.

## What remains executable now

The unavailable likelihood does not stop all work. Two streams separate cleanly:

- **theory stream:** compute the complete W-associated and flavor-changing kernels in one basis, including running, weak matching and all current/direct-boson interference terms;
- **data stream:** request or locate the six-item release packet, or perform the fit within the collaboration where the event-level and nuisance model already exist.

Freezing the theory stream first has an important benefit: a later likelihood can be consumed without changing the source model after looking at the data.

## Open and closed

Closed:

- the existence and basic specification of the four-mode Belle detector record;
- the published mass range, fit type, luminosity and aggregate systematic treatment;
- the distinction between a published one-coupling limit and a reusable joint likelihood;
- the minimum sufficient release packet for the corpus experiment;
- the prohibition on promoting plot digitization to a covariance or rank result.

Open:

- release or collaboration-level access to the per-mode likelihood and response objects;
- the full theory-side forward kernels;
- the actual nuisance-profiled rank test;
- visible/missing-energy lifetime complementarity and held-out category prediction.

## Implication and look-here instruction

The frontier is now specific enough to contact an experiment or build a recast without asking vaguely for “more data.” Ask for six named objects. In parallel, finish the forward model. If the release arrives and the rank survives, the sixth coordinate becomes experimentally addressable. If it collapses, that null result is still valuable: it identifies a practical detector quotient rather than confusing an ideal operator distinction with an observable one.

Primary experimental sources: [Belle/Belle II publication record](https://docs.belle2.org/pub_data/publications/3783/) and [Belle II preprint 2025-017](https://docs.belle2.org/files/3783/BELLE2-PUB-DRAFT-2024-020/15/BELLE2-PUB-DRAFT-2024-020.pdf).

## Reproduction

~~~powershell
node scripts/run-belle-alp-public-likelihood-availability-gate.mjs --write
node verification/admissibility/verify_belle_alp_public_likelihood_availability_gate.mjs
~~~
