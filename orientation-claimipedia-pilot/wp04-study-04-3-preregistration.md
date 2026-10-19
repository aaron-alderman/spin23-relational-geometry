# WP04 Study 04.3: category convergence under asymmetric authority

Status: superseded as a single full-factorial study by the split in `wp04-feasibility-audit.md`; 04.3a awaits blinded simulation

## Question

When people jointly construct categories, does concentrated classificatory authority produce coordination by improving information aggregation, by suppressing minority information, or both? The study separates convergence, accuracy, endorsement and cost distribution. None is used as a proxy for the others.

## Design

Independent networks classify unfamiliar stimuli generated from a known latent structure. Participants first classify privately, then revise through repeated rounds under a factorial manipulation:

- authority: symmetric peer weighting versus a visibly designated high-weight classifier;
- authority reliability: 0.55 versus 0.80 probability of receiving the correct latent cue;
- appeal: no formal challenge channel versus a recorded appeal-and-revision channel;
- network size: 8 versus 32 participants.

Authority reliability is experimentally controlled and disclosed only to the analysis system, not described to participants as competence. This permits convergence and ground-truth accuracy to move independently.

The network, not the participant, is the independent unit. Randomization, stopping and analysis operate at network level.

## Predeclared hypotheses

- H1: designated authority increases convergence speed relative to symmetric weighting.
- H2: low-reliability designated authority reduces final accuracy relative to symmetric weighting, despite increasing convergence.
- H3: designated authority reduces retention of initially correct minority classifications when the authority is wrong.
- H4: an appeal channel improves correction of authority errors and minority-information retention.
- H5: the appeal channel does not necessarily reduce convergence; the coordination/correction trade-off is empirical.
- H6: participant endorsement and perceived legitimacy are only partially predicted by convergence and accuracy.

H1 is not evidence that authority is legitimate. H4 is not evidence that maximal contestability is optimal in every institution.

## Outcomes

Primary:

1. convergence time: rounds to a preregistered partition-similarity threshold;
2. final accuracy against the latent data-generating structure;
3. minority-information retention: survival of initially rare but correct classifications;
4. authority-error correction: proportion of wrong authority classifications reversed.

Secondary:

- final category diversity;
- confidence calibration;
- appeal frequency and success;
- participant endorsement, perceived voice and perceived legitimacy;
- decision time and experienced burden;
- outcome disparities between participants whose initial classifications agreed or disagreed with authority.

## Smallest effects of interest and power gate

No fixed sample size is claimed without a network-level simulation. Before registration, a blinded design simulation will choose the number of independent networks needed for at least 90% power under the planned multilevel model for both:

- a 10 percentage-point change in minority-information retention; and
- a 0.20 standard-deviation change in final accuracy or convergence speed.

The larger resulting sample governs. Simulation code, parameter ranges and random seed will be frozen before outcome data are inspected. If the feasible design cannot reach the gate, the study is narrowed to estimation and method development; it is not relabelled confirmatory.

## Analysis

- Fit preregistered multilevel models with network as the clustering and randomization unit.
- Estimate authority × reliability, authority × appeal and authority × reliability × appeal contrasts.
- Treat network size as a design factor and test scale interaction rather than pooling it away.
- Report effect sizes and uncertainty intervals; multiplicity-adjust confirmatory contrasts at false-discovery-rate q <= .05.
- Report convergence and accuracy jointly. A condition that converges faster but becomes less accurate is classified as coordination with epistemic loss.
- Analyse endorsement and affected-party burden separately from performance.

## Exclusions and missingness

- Exclude a network only for preregistered technical failure or failed randomization integrity, never for an inconvenient result.
- Preserve participant withdrawal; do not impute post-withdrawal interaction choices.
- Report attrition by condition and whether attrition itself tracks authority disagreement.
- Bot, duplicate and inattention rules are fixed before recruitment and applied blind to condition outcomes.

## Manipulation and confound checks

- Confirm that the designated classifier receives greater effective weight.
- Confirm that the appeal channel is discoverable and usable.
- Measure perceived expertise, coercion and social desirability.
- If authority condition changes information access other than the controlled reliability manipulation, causal attribution to authority structure is a no-go.
- If participants infer the designated classifier is an experimenter-endorsed moral authority, the legitimacy outcome is exploratory.

## Affected-party and third-order audit

The study records who pays for fast convergence. Minority loss, time cost, appeal burden and differential error exposure are first-class outcomes.

The programme must also survive its own result:

- If symmetric networks outperform authority, the “culture is load-bearing” thesis narrows; it does not redescribe the result as healthy chaos.
- If authority improves both speed and accuracy, that supports a bounded coordination mechanism, not inherited-hierarchy legitimacy.
- If appeals impair all measured outcomes, the correction-channel proposal narrows rather than treating dissent as morally self-validating.
- If no manipulation changes outcomes, the causal model is held or retired before expanding the metaphor.

## Completion gate

The full factorial does not proceed as one study. Successor study 04.3a becomes registration-ready only when stimuli, generator, assignment code, simulation, sample size, exclusions, contrasts, analysis code skeleton, consent/debrief and affected-party review are versioned and frozen. Studies 04.3b and 04.3c remain held behind the gates in `wp04-feasibility-audit.md`.

