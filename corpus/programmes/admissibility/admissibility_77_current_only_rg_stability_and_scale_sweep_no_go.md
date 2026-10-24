# The current-only slice survives running, and an energy sweep does not reveal the hidden direction

**Date:** 25 October 2026  
**Status:** analytic top-Yukawa running boundary closed; full matrix evolution, matching covariance and amplitude open  
**Topics:** OT-047, OT-048  
**Parent:** [AZ-076 signed ALP quotient](admissibility_76_alp_current_anomaly_quotient_and_sixth_coordinate_boundary.md)  
**Evidence:** [RG-stability ledger](../../../evidence/data/alp-current-only-rg-stability-gate-v1.json)  
**Generator:** [analytic running witness](../../../scripts/run-alp-current-only-rg-stability-gate.mjs)  
**Verifier:** [RG-stability certificate](../../../verification/admissibility/verify_alp_current_only_rg_stability_gate.mjs)

**Continuation:** [AZ-078](admissibility_78_three_generation_singlet_flavor_split_and_bl_correction.md) lifts the dictionary to flavor matrices, corrects the null-current name to completed (B-L), and separates the five family singlets from forty traceless flavor directions.

## Result

The sixth-coordinate fork is not an artifact that ordinary running automatically repairs.

In the derivative basis used by Bauer *et al.*, the coefficients (c_{GG},c_{WW},c_{BB}) are scale independent through the order they calculate. The alternative coefficients (\widetilde c_{VV}) run because they include the scale-dependent fermion currents. In the top-Yukawa approximation their analytic solution contains

\[
r(\mu,\Lambda)=e^{-18U(\mu,\Lambda)},
\]

\[
c_{tt}(\mu)=r\,c_{tt}(\Lambda),
\]

\[
\widetilde c_{WW}(\mu)
=\widetilde c_{WW}(\Lambda)
-\frac{1-r}{6}c_{tt}(\Lambda),
\]

where the displayed (c_{tt}) equation is the Yukawa-only part of their solution. Since

\[
\widetilde c_{WW}=c_{WW}-\frac12a_2,
\]

the current anomaly evolves as

\[
a_2(\mu)=a_2(\Lambda)+\frac{1-r}{3}c_{tt}(\Lambda).
\]

The two descriptions remain exactly consistent at every scale.

## What this closes

If (c_{WW}=0) in the ultraviolet, it remains zero through the published order in the derivative basis. The current-only slice is therefore RG-stable within this approximation. Its measured weak coefficient still changes, but only because the current coordinates change:

\[
\widetilde c_{WW}(\mu)=-\frac12a_2(\mu).
\]

Conversely, if a direct (c_{WW}) is present, the reconstructed quantity

\[
\widetilde c_{WW}(\mu)+\frac12a_2(\mu)=c_{WW}
\]

remains constant. The executable witness checks both cases over a grid of integrated top-Yukawa factors.

## The scale-sweep no-go

AZ-076 found the invisible shift

\[
(a_2,c_{WW})\mapsto(a_2+2\lambda,c_{WW}+\lambda).
\]

The running above preserves it. Two models related by this shift have the same (\widetilde c_{WW}) at every tested scale, not merely at one energy. Measuring the same effective weak coefficient more precisely or at several collider energies therefore does not, by itself, decide whether it came from the current anomaly or an independent bosonic operator.

This is a detector statement in the corpus's sense. Energy changes the response, but the chosen record still folds two physically distinct source coordinates onto one number. More of the same record cannot invert that fold.

## The electroweak threshold is a change of object

For a light ALP well below the weak scale, the published dimension-five matching gives no threshold correction to the unprimed (c_{GG}) and (c_{\gamma\gamma}). In the tilde basis, top-threshold terms remove the top contribution from (\widetilde c_{GG}) and (\widetilde c_{\gamma\gamma}). Below that threshold the (W) is no longer a propagating EFT coordinate.

This sharpens the role of the proposed (B_c) measurement. It is not the same weak node viewed at a lower energy. It is a separately matched record involving the surviving low-energy fermion, photon and gluon coordinates. It remains valuable as validation, but only after the full electroweak matching map is carried with its signs and covariance.

## Open and closed

Closed:

- scale independence of the unprimed bosonic coefficient through the cited order;
- RG stability of the current-only condition in that basis and approximation;
- the exact running identity between (a_2), (c_{WW}) and (\widetilde c_{WW});
- persistence of the sixth-coordinate blind direction under an energy sweep;
- the fact that crossing the weak threshold changes the operator set.

Open:

- full three-generation flavor-matrix evolution and CKM transport;
- gauge-source contributions to the coupled evolution;
- the finite weak-scale matching of the fermion coefficients relevant to the proposed processes;
- covariance propagation and correlated theory error;
- the gauge-complete (c_t,c_b,\widetilde c_{WW}) response and detector fold;
- an independent record sensitive to (c_{WW}) and (a_2) in different combinations.

## Implication and look-here instruction

The current-only hypothesis is now a legitimate running hypothesis rather than a tree-level convenience. Test it directly. If it survives the complete collider kernel and an independently sensitive bosonic record, the payoff is a smaller, source-derived model. If the direct coefficient is required, the experiment locates a real boundary between inherited anomaly response and a separate interaction. Merely sweeping energy cannot make that decision; the apparatus must retain a new distinction.

Primary source: [Bauer *et al.*, *The Low-Energy Effective Theory of Axions and ALPs*](https://arxiv.org/abs/2012.12272), especially Eqs. (17), (26)--(28), (55)--(58) and Appendix A.

## Reproduction

~~~powershell
node scripts/run-alp-current-only-rg-stability-gate.mjs --write
node verification/admissibility/verify_alp_current_only_rg_stability_gate.mjs
~~~
