---
title: "Claims, Routes, and What Survives: How Claimipedia and Sourcery Fit Together"
slug: "claimipedia-sourcery-relation-algebra"
status: "proposal-only"
date: "2026-10-24"
---

# Claims, Routes, and What Survives

## How Claimipedia and Sourcery fit together

Claimipedia and Sourcery do different jobs on the same material. Claimipedia
keeps the things under discussion: claims, evidence, sources, qualifications,
dependencies, objections and the provenance of each record. Sourcery asks what
may lawfully be done with those things: which routes compose, which assumptions
are imported, what is lost in translation, whether a proposed result survives a
projection, and why a shortcut is refused. Claimipedia is therefore not merely
a collection of pages, and Sourcery is not merely a search engine. Together
they form a typed space of inquiry in which a conclusion is answerable to the
route by which it was reached.

That relationship can be expressed algebraically, but three layers must remain
distinct:

1. **The recorded layer.** Claimipedia contains named things and typed links
   such as *supports*, *qualifies*, *depends on* and *challenges*.
2. **The operational layer.** Sourcery composes compatible steps, retains
   assumptions and losses, and emits a receipt for accepted and rejected
   routes. It checks a declared route; it does not decide that the route's
   claims are true.
3. **The mathematical model.** A researcher may represent each claim by a
   basis vector and each relation type by an operator. Products of those
   operators then represent ordered paths through the claim graph. This
   linearization is an explicit research construction, not an undocumented
   ontology of either application.

The short version is:

\[
\text{Claimipedia supplies the map,}\qquad
\text{Sourcery checks possible journeys,}\qquad
\text{the operator algebra studies the journey structure.}
\]

## A picture before the mathematics

Imagine a library in which every room contains a claim. The doors are not all
the same. One door says that the first room supports the second; another says
that it qualifies the second; another records a dependency or a challenge.
Walking through two doors in sequence is not generally equivalent to walking
through them in the opposite order. “This evidence supports a claim which
qualifies a theory” says something different from “this theory qualifies a
claim which supports the evidence.”

Claimipedia records the rooms, doors and documentary ownership of the labels.
Sourcery is the route checker. It asks whether a proposed journey has matching
entrances and exits, whether it changes subject without permission, and what
baggage has been acquired on the way. A Sourcery receipt is closer to a checked
itinerary than to a declaration that the destination is correct.

The algebra begins when the rooms and doors are made calculable. Each room is
assigned a coordinate. Every door of one type is collected into a single
motion operator. Multiplying two operators means taking one kind of door and
then another. Commuting operators describe order-insensitive motions;
noncommuting operators expose places where order changes what can be reached.

This is why the algebra is relevant. It makes the usually hidden structure of
reasoning measurable without pretending that measurement settles the content
of the claims.

## The exact result in the present capture

The pinned Claimipedia capture used in the calculation contains 43 immutable
relationship records connecting 38 claim or crystal nodes. The relation types
are:

| Relation | Records | Ordinary meaning |
|---|---:|---|
| qualifies | 27 | narrows, conditions or changes how another claim may be read |
| depends on | 7 | cannot presently stand without the referenced claim or datum |
| supports | 7 | contributes a reason in favour without becoming entailment |
| challenges | 2 | supplies an objection, counterexample or competing pressure |

Let each claim be a coordinate direction over the rational numbers. Combining
all links of one type gives four operators, conventionally labelled
\(Q,D,S,C\). Under the declared convention, applying an operator to a claim
returns the claims reached by outgoing links of that type. Closing these
operators under addition and ordered multiplication produces a
66-dimensional associative algebra. Its centre has dimension 14, while its
commutator space has dimension 53. Every pair of the four relation operators
fails to commute.

In plain language, the present graph is strongly order-sensitive. Its links do
not behave like four independent filing labels. They generate a finite grammar
of paths, cycles and one-way histories.

Some motions terminate: challenge squared is zero, support cubed is zero and
qualification to the seventh power is zero in this capture. Dependency does
not terminate because one portion of the graph contains a three-step cycle.
These are properties of this fixed authored graph, not universal laws of
reasoning.

## A two-claim reversible channel

One local part of the graph is unusually clear. The claim called *Spin(2,3)*
supports the *Temple–Sourcery* claim, while the Temple–Sourcery claim qualifies
the Spin(2,3) claim. The two differently typed links run in opposite
directions.

If attention is compressed to those two claims, the links act like the two
off-diagonal matrix units in a two-by-two matrix. Taking their commutator
produces the difference between the two diagonal projectors. In standard
notation the three resulting operations satisfy

\[
[h,q]=2q,\qquad [h,s]=-2s,\qquad [q,s]=h.
\]

The associative algebra of the compressed pair is exactly
\(M_2(\mathbb Q)\); its commutator algebra is
\(\mathfrak{sl}_2(\mathbb Q)\). This is a real calculation, not a resemblance
based on names or dimensions.

It is also a small result. A two-way channel of this kind occurs in many
unrelated systems. It does not establish a symmetry of nature, a Monster
action or \(Spin(2,3)\). In root-system language it supplies one local
\(A_1\) seed. The \(C_2\) structure needed for
\(\mathfrak{sp}_4\cong\mathfrak{so}(2,3)\) would require a second compatible
root channel and the correct relations between them. The present relationship
graph has no such second channel.

## Why the pair cannot be read alone

The two-claim picture leaks. A third claim, *Christianity–kenosis*, qualifies
Temple–Sourcery from outside the selected pair. Removing that predecessor
would make the local channel look more autonomous than the source graph says it
is.

Closing the system under all incoming relationships expands it from two claims
to fifteen. On that predecessor-closed carrier, the exact relation algebra has
dimension 35. It separates as

\[
0\longrightarrow J\longrightarrow \mathcal A_{15}
\longrightarrow \mathbb Q\oplus M_2(\mathbb Q)\longrightarrow0,
\qquad \dim J=30.
\]

The formula has a simple picture. After one-way path history is set aside, what
remains is one common scalar channel and one full reversible two-state channel.
The 30-dimensional part \(J\) records the directed qualifications,
dependencies, supports and challenges feeding between layers. Long enough
strictly one-way paths end, so this history sector is nilpotent. Mathematically
it is the Jacobson radical of the 35-dimensional algebra.

Calling the radical “mere noise” would be a mistake. It is where the graph
remembers how a claim arrived, what precedes it and which asymmetrical
obligations have not been made reversible. The quotient shows the stable
transformation skeleton; the radical preserves the route-dependent history
that the quotient forgets.

## The relation to admissibility

This construction clarifies the corpus's Jordan–Lie reading without turning
Claimipedia into physics.

The Jordan question is, roughly, **what may coexist?** In the physical
programme it concerns positive states, responses and compositions. In
Claimipedia the analogous practical work is admission: which claims, evidence,
qualifications and rival accounts may be held together without concealing
their types or provenance.

The Lie question is, roughly, **how may what is admitted move or be
transformed?** The relation operators and their commutators expose
order-sensitive transformations of the claim carrier.

Sourcery occupies the typed middle. It does not replace either side. It asks
whether a proposed passage is available on the declared objects, whether it
preserves the distinctions required by the destination, and which assumptions
or losses accompany it. In this limited but concrete sense, Sourcery is an
admissibility machine for transformations.

The analogy has a hard boundary. Claimipedia's admission policy is not a
formally established Euclidean Jordan algebra or positive cone. Its relation
commutators are not physical generators. The commonality is a division of
labour—admit, transform, verify the passage—not an identity of carriers or
scientific authority.

## Why this is like physics, but a little different

The mathematics of a projection does not care whether its coordinates label
laboratory responses or authored claims. In both cases one may ask what
information survives compression, whether an operation descends to the
compressed space, and which hidden input causes a failure of closure. That is
the shared reason the same shapes appear.

The difference lies in what the coordinates mean and how they earn authority.
A physical response carrier is constrained by calibration, positivity,
causality, noise and experiment. The Claimipedia carrier is constrained by
authorship, definitions, relation types, sources, editorial policy and
provenance. An exact matrix relation on the latter is a fact about a knowledge
representation. It becomes evidence about nature only if a separate, explicit
map connects the claim carrier to a physical carrier and survives empirical
tests.

This distinction is productive rather than disappointing. The claim graph can
serve as a small, inspectable model of how selection, leakage, reversible
channels and retained history work. It can also warn the physical programme
when the same word—such as *support*, *symmetry* or *closure*—has silently
changed jobs.

## What the result enables

The immediate value is theoretical engineering: making a body of reasoning
easier to test, repair and extend.

- A summary can be checked for erased qualifiers or dependencies.
- A proposed subtopic can be tested for closure before it is presented as an
  autonomous argument.
- Reversible disagreements can be distinguished from one-way chains of
  provenance or support.
- Failed descent identifies the exact hidden claim that a simplification has
  discarded.
- Algebraic blocks can locate tightly coupled channels that deserve a joint
  article or experiment, while nilpotent paths reveal historical scaffolding
  that should not be confused with a stable core.
- A claimed larger symmetry can be given a finite promotion test: identify the
  missing generators on one carrier and verify their relations, rather than
  relying on matching names, dimensions or diagrams.

This is the hopeful result in practical form: **look where a compression leaks,
where two relation orders disagree, or where a second reversible channel is
missing.** Those are places where better theoretical machinery is possible and
where a genuinely new connection, if one exists, must leave a checkable trace.

## Two routes from structure to decision

Two science-programme returns now show how the three layers work together.
The wall-response route is a positive control: a metastable wall localizes a
two-channel response, a positive Gaussian determinant gives a selector Hessian,
and a declared gradient step contracts. Claimipedia keeps each claim bounded to
that effective model; Sourcery retains the assumptions and the loss of the
resolved fluctuation; the proposed experiment fits the Hessian and return
slope. This route closes without claiming a microscopic origin for its
coupling.

The selection-memory-holonomy route is the boundary control. Retained history
may select a projective line, and the line defines an axis-preserving half-turn.
It does not determine the sign of a coherent quarter-turn. Claimipedia records
that dependency on an orientation datum; Sourcery refuses the promotion; the
experiment asks for a loop-reversal-odd frame rotation. The refusal is useful
because it names what must be measured rather than concealing it in the word
“holonomy.”

These examples are detailed in the
[two vertical slices](../../../corpus/programmes/frontier/wave-7/frontier_wave7_41_two_cross_carrier_vertical_slices.md).

## What is settled and what remains open

| Question | Present state |
|---|---|
| Does the pinned relation graph generate an order-sensitive algebra? | **Closed for this capture.** The exact unital closure has dimension 66 and all six generator pairs have nonzero commutators. |
| Is the Spin–Temple compressed channel a full two-by-two matrix algebra? | **Closed for this capture.** It is \(M_2(\mathbb Q)\), with commutator algebra \(\mathfrak{sl}_2(\mathbb Q)\). |
| Is that two-claim subsystem autonomous? | **Closed negatively.** The kenosis predecessor prevents descent to an isolated two-node system. |
| What survives after predecessor closure and removal of one-way history? | **Closed for the declared aggregation.** The semisimple quotient is \(\mathbb Q\oplus M_2(\mathbb Q)\), with a 30-dimensional radical. |
| Does the current relationship graph close to \(C_2\) or \(Spin(2,3)\)? | **Closed negatively for the direct current-graph route.** There is no second root channel. |
| Is this the unique algebra of Claimipedia? | **Open, and probably the wrong question without a declared representation.** Different weights, edge identities, evidence operators or provenance operators can produce different algebras. |
| Can Sourcery use these invariants as live diagnostics? | **Open engineering target.** The calculations presently audit captured records; they are not yet a native product gate. |
| Does the relation algebra describe physical reality? | **Open and unsupported at present.** A common physical carrier, explicit intertwiner and empirical consequence are missing. |

## Other legitimate readings

No single vocabulary is compulsory. The same construction may be pictured as:

- a **typed graph**, emphasizing claims and labelled links;
- a **route language**, emphasizing which sequences are grammatical;
- a **finite-state machine**, emphasizing reachable states and cycles;
- a **path algebra**, emphasizing addition and ordered composition of routes;
- an **editorial control system**, emphasizing provenance, refusal and loss;
- a **memory system**, emphasizing the radical as retained one-way history; or
- an **admissibility atlas**, emphasizing the boundary between passages that
  survive a reduction and those that do not.

Each reading foregrounds a real feature and hides another. The algebra is most
useful when it lets these readings correct one another. The names used for the
science-programme graph, the Claimipedia operator system and Sourcery's path
machinery are consolidated in the
[Three-Carrier Admissibility Taxonomy](../../../corpus/taxonomies/three_carrier_admissibility_taxonomy_v1.md).

## Boundary and sources

The numerical results are exact for the pinned 43-relationship capture and the
declared aggregation of links into four operators. They describe an authored
knowledge graph. Sourcery's accepted paths attest compatibility with declared
types, assumptions and losses; they grant no entailment, empirical authority,
corpus admission or application activation.

The calculation and reproducible ledgers are documented in:

- [Frontier Wave 7.36: Hecke, Claimipedia and Spin(2,3) meet at the corner](../../../corpus/programmes/frontier/wave-7/frontier_wave7_36_hecke_commutant_and_spin23_corner_bridge.md);
- [Frontier Wave 7.37: Claimipedia's relation algebra contains an exact sl2 corner](../../../corpus/programmes/frontier/wave-7/frontier_wave7_37_claimipedia_relation_algebra_and_sl2_corner.md);
- [Frontier Wave 7.38: the closed-carrier radical quotient](../../../corpus/programmes/frontier/wave-7/frontier_wave7_38_radical_quotient_and_c2_exhaustion.md);
- the [pinned relationship source](../../../corpus/programmes/frontier/wave-7/claimipedia_relationship_operator_source_v1.json), [full operator ledger](../../../corpus/programmes/frontier/wave-7/claimipedia_relationship_operator_algebra_v1.json) and [closed-carrier ledger](../../../corpus/programmes/frontier/wave-7/claimipedia_spin_temple_closed_carrier_v1.json); and
- the [Claimipedia publication-authority boundary](../PUBLICATION-AUTHORITY.md).
