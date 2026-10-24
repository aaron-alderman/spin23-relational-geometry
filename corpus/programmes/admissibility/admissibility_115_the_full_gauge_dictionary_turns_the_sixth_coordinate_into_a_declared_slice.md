# The full gauge dictionary turns the sixth coordinate into a declared slice

**Date:** 25 October 2026

**Status:** full dimension-five gauge-coordinate rank closed; detector branch split

**Topics:** OT-047, OT-048

**Parents:** [AZ-076 weak-coordinate boundary](admissibility_76_alp_current_anomaly_quotient_and_sixth_coordinate_boundary.md), [AZ-114 same-process no-go](admissibility_114_more_detail_of_the_same_w_associated_process_cannot_open_the_sixth_coordinate.md)

**Evidence:** [full gauge-anomaly rank audit](../../../evidence/data/alp-full-gauge-anomaly-rank-audit-v1.json)

**Generator:** [exact coordinate audit](../../../scripts/run-alp-full-gauge-anomaly-rank-audit.mjs)

**Verifier:** [rank and null certificate](../../../verification/admissibility/verify_alp_full_gauge_anomaly_rank_audit.mjs)

## Result

The phrase “the sixth coordinate” needs a boundary condition. Once the complete dimension-five gauge dictionary is retained, the one-generation physical coordinates can be written as

\[
(c_t,c_b,c_e,c_\nu,
\widetilde c_{GG},\widetilde c_{WW},\widetilde c_{BB}).
\]

In the normalization of Bauer *et al.*,

\[
\widetilde c_{GG}=c_{GG}+\frac12(c_t+c_b),
\]

\[
\widetilde c_{WW}=c_{WW}-\frac12A_2,
\]

\[
\widetilde c_{BB}=c_{BB}+\frac12A_2+rac43c_t+\frac13c_b+c_e.
\]

The neutrino difference is hypercharge neutral and does not alter these three identities. The map from the eight labels

\[
(c_t,c_b,c_e,c_\nu,A_2,c_{GG},c_{WW},c_{BB})
\]

to the seven physical coefficients has rank seven and the exact null direction

\[
(0,0,0,0,2,0,1,-1).
\]

Thus the simultaneous redistribution

\[
(A_2,c_{WW},c_{BB})\mapsto(A_2+2\lambda,c_{WW}+\lambda,c_{BB}-\lambda)
\]

changes the operator bookkeeping but no dimension-five physical coefficient. No detector built from the complete dimension-five SM-plus-ALP theory can recover a label along this direction.

## When a second gauge record does work

The weak record alone has row \((-1/2,1)\) on \((A_2,c_{WW})\) and therefore cannot separate them. If the model declares \(c_{BB}=0\), a hypercharge-sector record supplies the second row \((1/2,0)\) after the measured fermion differences are subtracted. The two-by-two determinant is \(-1/2\), so the pair is identifiable on that declared slice.

This is the smallest valid reopening of AZ-114. It is not “look at the W-associated process more finely.” It is “measure a second gauge channel while stating which direct operator has been excluded.” Depending on mass and threshold, the detector-facing implementation may use photon, photon--Z or neutral-current records, but the running, electroweak rotation and decay model must be carried before those names are treated as the ultraviolet hypercharge coefficient.

If \(c_{BB}\) is free, the weak and hypercharge rows have rank two on the three labels and retain the null vector \((2,1,-1)\). A gluon record measures \(c_{GG}+(c_t+c_b)/2\) and does not lift this electroweak redistribution. The general direct-boson extension therefore adds two physical coordinates to the five-coordinate current quotient, not three separately observable origin labels.

## What this corrects

AZ-076 was right that freeing a direct weak operator invalidates silently calling \(\widetilde c_{WW}\) the current anomaly. Its “sixth coordinate” language was conditional, however: it describes the slice on which the other direct gauge coefficients are fixed. AZ-114 was right that every W-associated dimension-five shape inherits the weak null. Its provisional instruction to seek a “current-sensitive” channel was too broad. The exact alternatives are now:

- declare and test a reduced ultraviolet slice such as \(c_{BB}=0\), then combine weak and hypercharge-sensitive records;
- fit only the seven basis-invariant physical coefficients of the general dimension-five theory; or
- move beyond dimension five or add new states, where a genuinely new tensor or threshold can enlarge the physical map.

An ultraviolet completion may assign meaning to the separate origin coefficients, but low-energy data identify them only through the completion's declared matching conditions. Origin labels are not extra observables merely because a chosen basis writes them separately.

## Implication and look-here instruction

The realistic next experiment is a joint charged/neutral electroweak programme, not an isolated current detector. First complete the top--bottom--weak factorial amplitude for its three physical coordinates. In parallel, choose an ALP mass window with a source-complete neutral gauge record, freeze the electroweak rotation and direct-operator slice, and calculate whether the weak-plus-neutral Fisher matrix retains rank after branching fractions, acceptance and nuisance profiling. If the unrestricted dimension-five model fits, the result is improved theoretical engineering. New physics begins only if a reproducible residual requires a physical direction outside the seven-coordinate map, not if it merely chooses another representative of the null line.

Primary source: [Bauer *et al.*, *The Low-Energy Effective Theory of Axions and ALPs*](https://arxiv.org/abs/2012.12272), especially Eqs. (9)--(11), which state the equivalent Lagrangian and all three anomaly-shifted gauge coefficients.

## Reproduction

~~~powershell
node scripts/run-alp-full-gauge-anomaly-rank-audit.mjs --write
node verification/admissibility/verify_alp_full_gauge_anomaly_rank_audit.mjs
~~~
