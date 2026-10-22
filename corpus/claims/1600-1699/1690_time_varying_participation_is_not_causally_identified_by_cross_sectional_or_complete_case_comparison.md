# Time-varying participation is not causally identified by cross-sectional or complete-case comparison

**Date:** 22 October 2026

**Gate:** C1

**Status:** causal-identification boundary and executable design requirements

**Depends on:** [the proposed longitudinal design](1683_a_preregistered_longitudinal_active_control_design_can_test_participatory_consequences_but_not_divine_agency.md) and [the current-evidence audit](1687_current_evidence_supports_small_heterogeneous_practice_effects_but_not_a_christian_specific_field_tilt.md)

## Result

Religious participation is a time-varying exposure with feedback. Let (A_t) be participation, (L_t) mental health, social support, expectancy and life circumstances, and (Y) a later outcome. The causal structure includes

\[
A_t\to L_{t+1}\to A_{t+1},
\qquad
L_t\to A_t,
\qquad
L_t\to Y.
\]

A cross-sectional difference (E[Y\mid A=1]-E[Y\mid A=0]) therefore mixes treatment, selection, reverse causation and survivor effects. Conditioning only on programme completion adds post-treatment selection.

Longitudinal religion-and-mental-health methods explicitly identify feedback: attendance may affect depression while depression affects later attendance. Appropriate analyses require prior exposure, prior outcome and time-varying confounders, sometimes through marginal structural models ([VanderWeele, Jackson and Li 2016](https://pubmed.ncbi.nlm.nih.gov/27631394/)).

## 1. Target trial

Every analysis must emulate a declared trial:

- eligibility time and baseline;
- supported intervention or encouragement;
- active comparator;
- assignment rule;
- follow-up and censoring rule;
- primary benefit and harm outcomes;
- intention-to-treat estimand;
- per-protocol estimand with assumptions;
- analysis plan fixed before outcome inspection.

The intervention must be supported by observed transitions. Recent target-trial work found that a universal attendance intervention violated positivity and instead estimated stochastic shifts within observed support ([Bulbulia et al. 2026](https://pmc.ncbi.nlm.nih.gov/articles/PMC13122395/)).

## 2. Minimum causal checks

1. Draw and publish the causal graph before adjustment.
2. Measure prior outcomes and prior participation.
3. Diagnose overlap and report where positivity fails.
4. Use active controls and a randomized encouragement where ethical.
5. Include negative-control outcomes unlikely to respond to the practice and exposures sharing confounding but not the proposed mechanism.
6. Model attrition without deleting apostates, nonresponders or harmed participants.
7. Report sensitivity to unmeasured confounding and differential misclassification.
8. Replicate the full pipeline at a held-out site.

Negative controls can reveal shared unmeasured causes and other bias, but their validity depends on explicit assumptions about what they cannot cause or be caused by ([Sanderson et al. 2026](https://doi.org/10.1093/ije/dyag163)).

## 3. What a residual means

The remainder

\[
R=Y-\widehat E[Y\mid A,L]
\]

depends on the estimator, variables, measurement quality and transport population. It is not invariant under model improvement. A robust treatment contrast is more informative than an unexplained individual residual, but neither identifies divine agency.

## Verdict

The feasible causal target is the effect of a specified, ethically deliverable practice package or encouragement within empirical support. "Effect of Christianity" and "effect of God" are not identified interventions.

