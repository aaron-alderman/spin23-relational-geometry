# Brain Relationship Algebra v1

**Date:** 28 October 2026  
**Status:** operational design and executable schema companion  
**Machine atlas:** [brain relationship atlas v1](brain_relationship_atlas_v1.json)

## Result

The brain-function atlas identifies typed operators and familiar composites.
The missing-middle register identifies unresolved joins.  Neither is yet the
model.  The model is the conditional organization of relations among:

- operations;
- experienced or reported features;
- anatomical systems;
- measurements;
- evidence;
- contexts and timescales;
- retained unknowns and negative constraints.

The relationship atlas therefore makes edges primary.  Nodes are typed ports
at which relations meet.

## 1. Relation record

A relation is

\[
R=(S,T,k,p,c,\tau,m,\lambda,e,a,f,\rho),
\]

where:

- (S): one or more typed source nodes;
- (T): one or more typed target nodes;
- (k): relation family;
- (p\in\{+,-,?\}): positive, negative or unresolved polarity;
- (c): conditions and exclusions;
- (\tau): timescale;
- (m): carrier or mediator;
- (\lambda): candidate translation law;
- (e): observable or evidential trace;
- (a): named alternative relation;
- (f): failure or falsification condition;
- (\rho): provenance and authority.

Several sources or targets make (R) a hyperedge.  This is required rather
than optional.  Agency attribution, for example, depends jointly on intention,
efference and observed consequence.  Replacing that join with three independent
pairwise edges asserts a decomposition that has not been earned.

## 2. Node types

| Type | Meaning | Authority |
|---|---|---|
| `operation` | one of the fifteen output-typed primitive transformations | brain-function atlas v2 |
| `feature` | familiar capacity compiled from operations and overlays | brain-function atlas v2 |
| `middle` | canonical or cross-cutting unresolved join | missing-middle register |
| `system` | candidate anatomical or physiological implementation system | imported annotation, never exclusive ownership |
| `measure` | observable that may constrain a relation | imported annotation, not the measured construct itself |
| `residue` | an explicitly unresolved phenomenal or ontological target | local declaration |
| `claim` | a constraint such as recognition-not-transformation | local declaration with corpus provenance |
| `source` | publication, corpus document, dataset or immutable evidence object | provenance only |

An anatomy node may participate in many operations.  A measurement may constrain
many relations.  Neither receives functional ownership merely by appearing in
an edge.

## 3. Relation families

The v1 families are mutually distinguishable by what the edge asserts:

| Family | Assertion |
|---|---|
| `transformational` | source output is translated into target input |
| `control` | source changes gain, gating, interruption or policy of target |
| `implementation` | system is a candidate physical realizer of an operation |
| `grounding` | measure can constrain an operation or relation |
| `compilation` | a familiar feature decomposes into primitive operations |
| `causal` | source is claimed necessary, sufficient, mediating or modulatory |
| `temporal` | source precedes, maintains, consolidates or reactivates target |
| `semantic` | source represents, attributes, reconstructs or refers to target |
| `evidential` | evidence supports, challenges or fails to distinguish a claim |
| `provenance` | target is derived, translated or reproduced from source |
| `equivalence` | source and target agree under an explicit quotient or context |
| `negative` | a named implication or identity is denied |
| `unknown` | the edge is required by the model but its law remains open |

`Negative` is not absence from the file.  `Unknown` is not an empty field.
Both are positive records about the state of knowledge.

## 4. Algebra

For compatible typed relations:

### Sequential composition

\[
R_{AB};R_{BC}:A\rightarrow C.
\]

Composition is admissible only when the target type of (R_{AB}) matches an
input type of (R_{BC}), their conditions overlap, and no negative constraint
blocks the inference.  The composed relation inherits the weaker evidence
grade and the union of unresolved assumptions.

### Parallel composition

\[
R\otimes Q:(A,C)\rightarrow(B,D).
\]

This records jointly available transformations without asserting interaction.

### Join

\[
R\Join Q:(A,C)\rightarrow B.
\]

A join asserts that the sources jointly constrain one target.  It cannot be
replaced by (A\rightarrow B) and (C\rightarrow B) without a decomposition
certificate.

### Alternative

\[
R\oplus Q:A\rightarrow B.
\]

This preserves competing bridges until evidence discriminates them.

### Feedback or trace

\[
\operatorname{Tr}_{X}(R):(A,X)\rightarrow(B,X).
\]

This closes an output back into a later input while retaining the state and
delay carried by (X).  A feedback edge may not be collapsed into an
instantaneous identity.

### Restriction

\[
R\vert_{c,\tau}
\]

restricts a relation to a context and timescale.  Generalization outside that
domain requires a new edge or evidence.

### Negative and unresolved edges

\[
A\not\Rightarrow B,
\qquad
A\xrightarrow{?}B.
\]

The first blocks an invalid implication.  The second identifies a required but
unclosed middle.  Neither licenses the converse.

## 5. Composition is a test, not a convenience

For every declared path

\[
A\xrightarrow{R_1}B\xrightarrow{R_2}C,
\]

compare the composed prediction with any direct (A\rightarrow C) record.
Disagreement is classified as one of:

1. missing state;
2. incompatible context or timescale;
3. invalid abstraction;
4. unrecorded mediator;
5. source contradiction;
6. genuinely distinct mechanisms producing similar endpoints.

The software verifier checks type compatibility and declared coverage.  It
cannot establish that a candidate biological law is true.

## 6. The group-extension lesson

The classification of finite simple groups supplies a precise analogy.  Simple
composition factors can be invariant while the whole group still depends on
extension data.  Likewise, a complete list of primitive brain operations does
not determine an agent:

\[
\boxed{
\text{operator inventory}
+
\text{extension relations}
=
\text{candidate organization}
}
\]

The analogy is structural, not an assertion that brains literally form finite
group extensions.  Its discipline is useful: classify components, preserve the
gluing data, and never infer the whole from the factor list alone.

## 7. Evidence and authority

Every material relation preserves drill-down to its source record.  Evidence
grades constrain promotion:

- a candidate implementation is not exclusive localization;
- correlation is not mediation;
- mediation is not necessity or sufficiency;
- formal consistency is not semantic faithfulness;
- access, report and self-model do not establish phenomenality;
- a missing edge is not evidence that no relation exists.

The atlas proposes no new human experimentation.  Grounding uses published
evidence, admissibly reused open records, existing clinical literature,
comparative observations, computational reconstruction and synthetic agents.

## 8. Reopening conditions

Reopen the algebra or schema when:

- an edge cannot be expressed without conflating relation families;
- a hyperedge decomposes into pairwise relations under a verified law;
- a pairwise edge requires a previously hidden joint input;
- two contexts yield incompatible laws;
- a direct edge disagrees with every admissible composition;
- an unknown becomes measurable;
- a negative constraint is defeated;
- an imported node changes identity or authority;
- provenance no longer resolves to an immutable source.

The intended result is a glass-box research object: not a polished diagram of
certainty, but an inspectable map of what connects, what might connect, what
does not follow, and exactly where knowledge ends.

## 9. Executable use

The atlas is expanded and queried without an LLM:

```text
node scripts/query-brain-relationship-atlas.mjs stats
node scripts/query-brain-relationship-atlas.mjs neighbors system:aMCC_dACC
node scripts/query-brain-relationship-atlas.mjs gaps
node scripts/query-brain-relationship-atlas.mjs negatives
node scripts/query-brain-relationship-atlas.mjs paths op:O04 op:O06 3
node scripts/query-brain-relationship-atlas.mjs compose middle/MM-04 middle/MM-05
```

`paths` is an exploratory projection and says so in its output.  It does not
pretend that reaching one input of a hyperedge satisfies the other inputs.
`compose` checks typed port continuity and any explicit composition-blocking
constraint; it preserves the trace and accumulated conditions.  The verifier
also rejects unresolved endpoints, broken declared paths, silent source loss,
candidate-list-to-conjunction drift and undeclared positive/negative
contradictions.
