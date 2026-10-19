# Legible and illegible knowledge: how LLMs can contribute without pretending to possess the whole

**Date:** 18 October 2026  
**Status:** conceptual framework and research-method proposal

## Starting assumptions

Assume there is true knowledge, but no finite observer can possess ground truth completely. What an observer has is an approximation conditioned by position, instruments, language, body, history and purpose.

Now divide accessible knowledge into two interacting aspects:

- **legible knowledge:** what can be encoded, transmitted and checked through public symbols—propositions, equations, procedures, datasets, diagrams, proofs and explicit arguments;
- **illegible knowledge:** what is carried partly by a knower's embodied state, acquired discrimination, timing, attention, felt salience, practical history and situation-specific responsiveness.

“Illegible” does not mean false, supernatural or permanently ineffable. It means that the knowledge is not fully preserved by its current explicit representation.

Examples include knowing how hard to grip an unfamiliar object, sensing that a conversation has turned hostile, hearing that an instrument is slightly out of tune, recognizing that a proof strategy is becoming sterile, or feeling that two research ideas are connected before being able to state the invariant that connects them.

## A complex-plane model

Write a knower's state schematically as

\[
K=L+iI,
\]

where (L) is its legible component and (I) its illegible component.

This should not be interpreted as two substances. It is a model of two aspects of one epistemic state. What is visible depends on the measurement frame. A public explanation may project primarily onto (L); skilled performance under pressure may project primarily onto (I).

For an interrogation angle (\theta), imagine a projection

\[
P_\theta(K)=L\cos\theta+I\sin\theta.
\]

No single projection recovers (K). Different questions, tasks, environments and observers reveal different mixtures. Ground truth is approached by a form of tomography: gather many lawful projections, preserve their provenance, and infer the latent structure without identifying any one projection with the whole.

The most important information may also lie in the phase relation between (L) and (I): whether explicit reasons and embodied judgment reinforce, lag, oppose or continually correct each other. A person can state the correct rule yet act badly; another can perform expertly yet give a false account of how. Both cases show that neither component alone is the knowledge.

## What belongs to the illegible space

### Tacit skill

Skilled action contains high-dimensional feedback that has never been discretized into a rulebook. A surgeon, carpenter, athlete or experimentalist responds to continuous cues faster than they can enumerate them.

### Perceptual discrimination

Experts learn to see differences that novices literally do not organize as salient differences. The knowledge is partly a trained measurement apparatus: the nervous system has changed.

### Situated judgment

The same explicit rule can require different application in different contexts. Judgment includes knowing which facts matter now, which exception is relevant, and when further optimization will make the situation worse.

### Indexical and embodied knowledge

Some knowledge contains an irreducible “here, now, for this body” component: pain, balance, effort, risk, vulnerability, trust and personal consequence. A description of pain is not the pain, and knowing its clinical vocabulary is not knowing what this pain means in this person's life.

### Affect and salience

Emotion is not merely noise added to cognition. It helps assign urgency, attraction, aversion and significance. It is part of how a finite agent allocates attention in an impossibly large possibility space.

### Practical and social knowledge

Communities know through norms, roles, shared history, mutual expectations and patterns of repair. Much of this is enacted rather than written. It may be distributed across people so that no individual can state the whole.

### Generative intuition

In research, intuition often appears first as a directional signal: “these belong together,” “this symmetry is too cheap,” or “the calculation is hiding a missing object.” It is not yet evidence, but it can efficiently select which expensive explicit calculation should be attempted.

## Illegibility is relational

Knowledge is not simply legible or illegible in itself. It is legible **to someone, through a representation, for a task**.

A musical score is highly legible to a trained musician and nearly inert to someone who cannot read it. A Feynman diagram is compact practical knowledge for a field theorist but opaque to most readers. A bodily skill may become partly legible after motion capture, while still losing force, fatigue and risk perception.

So illegibility can arise from several different sources:

1. **encoding absence:** nobody has yet found a good representation;
2. **bandwidth loss:** the representation discards too much detail;
3. **frame mismatch:** the recipient lacks the concepts or training needed to decode it;
4. **indexicality:** the knowledge depends on being this agent in this situation;
5. **dynamics:** the relevant state changes during the act of describing it;
6. **incentives:** the knower cannot safely or honestly externalize it;
7. **distributed carriage:** the knowledge exists in coordinated practice rather than in one mind;
8. **constitutive participation:** understanding requires taking part, not merely observing.

Different causes require different remedies. More text helps encoding absence; it does little for missing embodiment or unsafe incentives.

## What LLMs are genuinely good at

LLMs operate primarily over traces that have already become legible: language, code, tables, diagrams and other recorded symbols. Within that domain they are unusually effective at recombination, translation, comparison and compression.

Their contribution to illegible knowledge is therefore mostly **indirect**. They can help construct better interfaces between lived or tacit knowing and public representations.

### 1. Elicitation without premature closure

An LLM can conduct repeated, differently framed interviews:

- What did you notice first?
- What would a novice overlook?
- At which moment would you stop?
- Show two cases that look identical by the written rule but demand different actions.
- What bodily or emotional signal changes your decision?

The goal is not to force intuition into one proposition. It is to collect multiple projections while preserving disagreement and context.

### 2. Contrastive articulation

Tacit knowledge often becomes visible through contrasts rather than definitions. An LLM can ask for near misses, boundary cases, counterexamples and paired demonstrations. “Why this and not that?” often extracts more structure than “state your rule.”

### 3. External memory for weak signals

People discard intuitions that cannot yet be justified. An LLM-supported research ledger can retain them as low-confidence signals, attach dates and contexts, and later compare them with independent results. This prevents both premature promotion and premature deletion.

### 4. Hypothesis generation from intuition

The LLM can translate a gut feeling into candidate invariants, diagrams, experiments or falsifiers:

\[
\text{felt connection}
\longrightarrow
\{	ext{several typed hypotheses}}
\longrightarrow
\{	ext{cheap discriminating tests}}.
\]

This is one of its highest-value roles. It does not certify the intuition; it makes the intuition scientifically interrogable.

### 5. Multi-perspective tomography

An LLM can compare accounts from practitioners, formal models, measurements and historical cases. If each is a projection (P_{\theta_j}(K)), the model can search for structure stable across projections and identify where they cannot be jointly reconciled.

This requires preserving provenance. Averaging all accounts into smooth prose destroys precisely the phase differences that make tomography useful.

### 6. Building training representations

Instead of producing only explanations, an LLM can build graduated examples, simulations, adversarial cases and feedback exercises. This can help a learner acquire new discriminations, turning formerly illegible expertise into partially embodied competence.

The relevant output is then not a statement but a curriculum that changes the learner's perceptual apparatus.

### 7. Boundary mapping

An LLM can identify which portion of a judgment has become explicit and which residue remains dependent on tacit calibration. A good output might say:

- these three cues are explicitly represented;
- this decision threshold is learned from examples but not derived;
- this sign depends on a convention;
- this final choice still depends on an expert's situational judgment.

This is more valuable than falsely claiming full explanation.

### 8. Collective illegible knowledge

Organizations frequently contain knowledge that no single member possesses. An LLM can compare incident reports, informal language, workarounds and conflicting role-specific accounts to expose recurrent patterns. It can make distributed knowledge more inspectable while leaving source identity, disagreement and uncertainty intact.

## What LLMs cannot honestly claim

An LLM can produce a persuasive description of grief without thereby grieving, or explain physical balance without risking a fall. Whether machine systems possess any form of experience is a separate philosophical question; current language behavior alone does not warrant treating generated descriptions as evidence of human-like lived experience.

Several limitations follow.

### Fluency can counterfeit contact

Because an LLM is excellent at the language surrounding an experience, it can sound as if it has the experience itself. The better the prose, the easier it is to confuse semantic competence with first-person acquaintance.

### Compression can erase the exception

Models learn regularities. Practical expertise often matters most in the rare case where the regularity should be suspended. A smooth summary can remove the anomaly that an expert's discomfort was correctly tracking.

### Articulation can alter its object

Asking a person to explain an intuition may rationalize it after the fact or shift attention away from the cues that actually controlled performance. Elicitation is an intervention, not a passive readout.

### Training data privilege what was recordable

LLMs inherit a visibility bias toward institutions, people and experiences that produced surviving text. Silence in the corpus is not absence in the world.

### No automatic access to stakes

An LLM can model that a choice is dangerous; it does not bear the person's bodily, social or moral consequences. Human authority should increase, not decrease, when decisions depend heavily on those stakes.

## A productive division of labour

The strongest arrangement is not “human intuition versus machine reason.” It is a loop:

\[
\text{human encounter}
\to
\text{felt/tacit signal}
\to
\text{LLM-generated candidate articulations}
\to
\text{formal or practical tests}
\to
\text{new human discrimination}.
\]

The human contributes situated salience, stakes, embodiment and the ability to notice that the formalization has missed the point. The LLM contributes breadth, memory, alternate formulations, consistency checking and rapid generation of discriminating probes. Instruments and experiments contribute resistance from the world.

None is sufficient alone.

## A protocol for using LLMs around illegible knowledge

1. **Record the raw signal.** Preserve the original metaphor, bodily cue or intuition before translating it.
2. **Name the standpoint.** Who sensed it, under what conditions, with what expertise and incentives?
3. **Generate multiple interpretations.** Do not let the first articulate story monopolize the intuition.
4. **Seek contrast cases.** Ask what nearby case would reverse the judgment.
5. **Extract candidate observables.** What would differ if each interpretation were right?
6. **Run cheap falsifiers first.** Eliminate attractive stories that fail basic type, symmetry or dimensional checks.
7. **Preserve the remainder.** If the tests do not decide, label the intuition as live but unpromoted.
8. **Return to experience.** Ask whether the formalization predicts the expert's actual distinctions in fresh cases.
9. **Track transformations and losses.** Every translation from experience to text to model to test should declare what it discarded.
10. **Keep authority local.** The LLM proposes; evidence, affected people and responsible practitioners decide.

## Relation to the research programme

This framework explains why “gut feeling” has been useful in the (Spin(2,3))/Jordan/Furey programme without counting as proof.

The recurring intuitions—wheels within wheels, one carrier/two faces/three relationships, a pole at (Spin(2,3)), and a missing relational operator—have functioned as search heuristics. The legible programme then tested them through representation theory, commutants, anomaly calculations, finite triples and observable protocols.

Sometimes the intuition survived in a corrected form. Sometimes the calculation found that the apparent connection lacked a typed map. Both are successful uses of illegible knowledge: the intuition chose a high-value search direction, while the formal work prevented metaphor from being mistaken for derivation.

The present frontier illustrates the division exactly. The intuition says the carriers should meet. Legible analysis says what their meeting would have to be:

\[
\rho_W:G\to U(W_{\rm mediator}),
\qquad
Y:S_{\rm source}\to W_{\rm mediator},
\]

with a protected non-scalar Gram and an observable consequence. The intuition has not been disproved; it has been converted into a typed missing object and a falsifiable reopening condition.

## Final principle

Illegible knowledge should not be romanticized as infallible, nor discarded because it is not yet formal. It is often where attention, value and discovery begin. Legible knowledge is where claims become portable, criticizable and cumulatively testable.

LLMs are most valuable at the moving boundary between them:

\[
\boxed{
\text{not replacing lived knowing, but multiplying its projections,}\
\text{testing its translations, and preserving what the translation loses.}
}
\]
