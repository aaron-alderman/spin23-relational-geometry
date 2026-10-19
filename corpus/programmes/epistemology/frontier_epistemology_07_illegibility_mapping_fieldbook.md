# Illegibility mapping fieldbook

**Date:** 19 October 2026  
**Status:** operational protocol for collecting real cases

## Purpose

This fieldbook is for discovering structures people use successfully before they can explain them. It is not a questionnaire about beliefs and not an invitation to invent archetypal labels.

The basic record is one consequential discrimination:

> A person encountered two or more possibilities, recognized a difference that was not yet fully articulable, and altered action because of it.

## Domains to map first

Start where tacit discrimination is common and consequences are observable.

| Domain | Typical pre-explanatory judgment | Observable consequence |
|---|---|---|
| conversational contact | “You are not hearing me” | clarification, withdrawal, conflict or repair |
| interpersonal trust | “Something is off” | distance, disclosure or verification |
| practical competence | “That movement/sound/fit is wrong” | correction before failure |
| creative judgment | “It is technically fine but dead” | revision, rejection or recombination |
| care and timing | “Now is not the moment” | waiting, intervening or changing tone |
| group dynamics | “The room has turned” | topic shift, silence, coalition or exit |
| story recognition | “This is that kind of situation” | adoption of a role or expected ending |
| self-recognition | “I am becoming someone I do not want to be” | interruption of a repeated pattern |

Keep these domains separate initially. A common structure is a result to be discovered, not a premise.

## Case card

Create one card per episode.

```yaml
case_id:
date:
domain:
observer:
setting:

raw_signal:
confidence_before_explanation: 0-100
immediate_action:
outcome:

last_acceptable_moment:
first_wrong_or_right_moment:
cue_reported_at_the_time:
later_explanation:

contrast_a:
contrast_b:
forced_choice:

candidate_features: []
rival_explanations: []
prediction_for_new_case:
result:

what_became_legible:
what_remains_illegible:
```

Separating `cue_reported_at_the_time` from `later_explanation` is essential. Retrospective sense-making is useful but must not overwrite the original trace.

## Interview script

Use concrete questions in this order:

1. What happened?
2. What was the first thing you noticed, in your original words?
3. What did you do differently because of it?
4. Where exactly did the situation cross from acceptable to wrong, or uncertain to clear?
5. Show me a case that looks similar but does **not** produce the same judgment.
6. What single change would reverse your judgment?
7. If you could show a novice only three examples, which would you choose?
8. What explanation sounds plausible but is not what you were responding to?

Do not ask for personality type, archetype or moral until the episode has been reconstructed. Those categories may prematurely organize the evidence.

## Mapping personality without turning it into a label

Personality becomes empirically useful as a pattern of thresholds and sensitivities across repeated situations.

For a person \(p\), a profile might be represented as

\[
P_p=(\theta_{trust},\theta_{threat},\theta_{novelty},
\theta_{status},\theta_{care},\theta_{exit},\ldots),
\]

where each \(\theta\) estimates a point at which perception changes action. The evidence is repeated behavior:

- how much inconsistency triggers verification;
- how quickly ambiguity is classified as danger;
- what evidence restores trust;
- when novelty attracts rather than repels;
- which social cost prevents an exit;
- when care overrides efficiency.

Thresholds are conditional on setting, relationship, fatigue, power and stakes. A useful personality map predicts **where and how judgment changes**, not what noun a person is.

## Mapping archetypes as invoked role packages

Record an archetype only when a situation causes several expectations to arrive together.

Recognizing “the rescuer,” for example, may imply that:

- someone is cast as helpless;
- urgency licenses boundary crossing;
- the rescuer gains meaning or status through intervention;
- gratitude is expected;
- refusal may be interpreted as betrayal.

The map is the package of role assignments, permissions and predicted transitions—not the label.

```yaml
invoked_role:
who_cast_whom:
permissions_created:
obligations_created:
events_now_expected:
evidence_ignored_after_invocation:
exit_from_role:
alternate_role_package:
```

Remove surface features while retaining relations. If recognition and predictions persist, the relational package may be doing work. If they disappear, the apparent archetype may have been costume or convention.

## Mapping stories as prediction machinery

A story matters when recognizing its shape changes what someone expects or does.

```yaml
situation_before_story:
story_or_plot_recognized:
self_role_assigned:
other_roles_assigned:
ending_expected:
action_made_available:
action_made_unthinkable:
disconfirming_event:
revision_or_persistence:
```

This makes “stories transmit knowledge” testable. If invoking a story reliably changes attention and prediction, the story is operating as a cognitive-social tool. Whether it improves judgment is a separate question.

## Discovering attractors rather than assuming them

After enough cards exist, cluster them using observed relational features and action changes. Hide inherited labels during the first pass.

An attractor candidate earns attention when:

- independent people organize different surface situations similarly;
- the organization predicts the next expected event;
- small perturbations leave the judgment unchanged;
- a particular perturbation reliably reverses it;
- teaching the structure improves another person's discrimination;
- the pattern is not explained more simply by shared wording or demand effects.

Only then compare the discovered cluster with named traits, archetypes or story families.

## Minimum viable study

### Corpus

- 5 participants;
- 3 domains per participant;
- 10 episodes per domain;
- 150 case cards total;
- at least 2 constructed contrasts per episode;
- 20 percent held out from feature induction.

### Procedure

1. Capture judgments and actions before extended explanation.
2. Reconstruct the boundary for each episode.
3. Generate minimally different contrast cases.
4. Ask participants to classify contrasts and state confidence.
5. Induce candidate features from the training cases.
6. Predict held-out judgments.
7. Compare against simple baselines: keyword overlap, general sentiment and explicit self-theory.
8. Test whether a short training set helps a novice reproduce the expert's distinctions.

### Success criteria

A structure has made some knowledge legible if it:

- predicts unseen judgments better than the baselines;
- identifies boundary-changing perturbations;
- improves teaching or coordination;
- retains known exceptions;
- tells us when it should not be applied.

## LLM output for each batch

1. A literal summary of every case.
2. Candidate features grounded in quoted evidence.
3. Two rival feature models.
4. The smallest contrast separating those models.
5. Predictions for held-out cases.
6. Errors grouped by type.
7. A revised teaching set.
8. An explicit list of residue still unrepresented.

Conflicting cases must not be averaged into a universal moral. Disagreement may reveal different sensitivities, histories or purposes; that is part of the structure.

## First research questions

- Are judgments of conversational contact governed by one dominant cue or a conjunctive threshold?
- Are interpersonal “something is off” judgments better predicted by inconsistency, timing, affect, status behavior or observer history?
- Which expert discriminations can be taught with contrast pairs but not verbal rules alone?
- When does an archetypal role package improve prediction, and when does it trap someone in a false story?
- Which narrative forms recur because they track repeated social problems, and which recur primarily because they are memorable?
- Do people share relational structures while disagreeing on moral interpretation?

## Discipline

The object is not to eliminate illegibility. It is to discover exactly what can be externalized, predicted and taught, while keeping a visible account of what was lost.

\[
\boxed{\text{Do not begin with the map. Begin with the discrimination.}}
\]
