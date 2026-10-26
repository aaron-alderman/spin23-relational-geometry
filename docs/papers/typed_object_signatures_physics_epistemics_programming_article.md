# What Physics, Knowledge, and Programs Share—and What They Do Not

_A short article about typed signatures, dimensional firewalls, and trustworthy translation._

Physics, scientific reasoning, and programming all work with things that can
be composed, transformed, compared, or rejected as ill-formed. A physical
model has states and operators. A scientific argument has claims and evidence.
A program has values and functions. All three depend on knowing what kind of
object is present and which transformations are allowed.

That resemblance is useful. It is also dangerous.

A matrix is not fully specified without its field, basis, representation, and
regime. A scientific claim is not fully specified without its scope, evidence,
status, and date. A function is not fully specified without its input, output,
effects, and possible failures. When those contextual facts are omitted, two
objects can look identical while meaning very different things.

The constructive response is a **typed object signature**: a compact record of
the information required to decide whether a transformation is meaningful.
The aim is not to turn physics, knowledge, and software into one universal
algebra. It is to let them cooperate without erasing their differences.

## The dimensional firewall

The word “dimension” illustrates the problem.

In physics and mathematics it may mean the dimension of a carrier space, the
dimension of a Lie algebra, the rank of a matrix, or the positive and negative
directions of a quadratic form. In a schema it may mean the number of fields.
In a ledger it may mean the number of recorded assumptions. In an experiment
it may mean the number of identifiable parameters.

These are not interchangeable numbers.

For example, the programme’s rank-two Jordan carrier
\(H_2(\mathbb R)\) is a three-dimensional vector space. Its conformal Lie
algebra \(\mathfrak{sp}(4,\mathbb R)\cong\mathfrak{so}(2,3)\) is
ten-dimensional. Its defining symplectic carrier is four-dimensional, while a
related primitive-bivector carrier is five-dimensional with quadratic
signature \((2,3)\), up to an overall sign convention.

The recurring integers are exact. They describe different objects.

This gives a simple rule:

> A numerical match supports a bridge only when both numbers have the same
> declared type and an explicit map relates their carriers.

The same firewall blocks more familiar mistakes. Three physical directions,
three positions in a debate, and three fields in a data record do not become
the same structure because they share a count. A bridge must say what it
preserves, what it changes, and what it loses.

## A signature is context made executable

A scientific object signature might record:

- domain and physical regime;
- rank, variance, basis, and approximation order;
- governing scheme and symmetry action;
- positivity or complete-positivity conditions;
- support or carrier;
- SI dimension exponents.

An epistemic signature needs different coordinates:

- whether the object is an observation, claim, objection, inference, or
  recommendation;
- its domain, scope, and role in the argument;
- evidential support and active defeaters;
- governing review process;
- authority ceiling;
- version and effective time.

A programming signature adds input and output types, effects, preconditions,
postconditions, failure types, and implementation version.

There is a common kernel here, but not a common meaning. Every profile needs a
kind, domain, context, form, status, admissibility rule, support, authority,
and time. Domain-specific profiles then add the coordinates that their own
practice requires.

This is closer to a family of related type systems than to one enormous type.

## Programs contribute more than an analogy

Programming supplies a particularly useful discipline: composition can fail
closed.

Suppose a research step transforms an object \(A\) into \(B\), and another
transforms \(B\) into \(C\). Their composition should be admitted only if the
intermediate signatures agree. The resulting path should accumulate its
assumptions, losses, evidence, and authority limits rather than silently
discarding them.

In compact form, a transformation receipt can say:

```text
source profile  -> target profile
preserves       -> domain, regime, source references
changes         -> mathematical object into qualified proposition
loses           -> basis-level data, executable operator action
authority       -> review candidate, not empirical confirmation
falsifiers      -> signature mismatch, missing source, authority promotion
```

This resembles an effect system. A function does not merely return a value;
it carries information about what happened while producing that value. A
scientific transformation likewise should not return a conclusion stripped
of the assumptions and losses that made it possible.

Programming therefore contributes executable custody, not automatic truth.
A type checker can reject an invalid composition. It cannot decide whether a
measurement was honest, whether a physical model describes nature, or whether
an institution has the authority it claims.

## Physics, epistemics, and programming correct one another

Each domain supplies something the others lack.

Physics contributes strong invariants: fields, forms, positive cones,
representations, and the groups preserving them. Epistemics contributes
directional support, challenge, provenance, defeasibility, and qualified
authority. Programming contributes exact interfaces, effects, receipts, and
repeatable execution.

Each also exposes a characteristic failure:

- physics without epistemic typing can overstate what a mathematical
  isomorphism establishes;
- epistemics without mathematical typing can collapse unlike relations into
  generic edges;
- programming without authority typing can execute a valid transformation
  that has no warrant to determine truth or policy.

The shared structure is therefore a discipline of **typed composition**. Rich
algebras and symmetries may exist inside a domain. Crossing between domains
requires an explicit, partial, evidence-bearing translation.

## What a trustworthy bridge must show

A group name by itself is not a bridge. A group is an action on a carrier that
preserves specified structure. A knowledge graph may have automorphisms, a
program may have observational equivalences, and a physical model may have a
symplectic symmetry. Those facts become related only when a map intertwines
the relevant actions.

Likewise, simplifying an object can reveal structure while destroying
meaningful distinctions. A quotient may remove noise—or provenance,
direction, timing, and dissent. Any simplified view should therefore ship
with a loss certificate explaining what no longer survives.

Three questions are enough to improve most proposed bridges:

1. What are the source and target types?
2. What does the transformation preserve and discard?
3. What authority may the result legitimately carry?

If those questions cannot be answered, the bridge is still an analogy.

## Why this matters

Typed signatures can make scientific software safer, knowledge graphs more
honest, and AI-assisted research easier to audit. They can prevent unit
errors, stale-authority errors, unsupported promotion from model to evidence,
and accidental equivalence between objects that merely share a shape.

They can also make collaboration more humane. A boundary is no longer a dead
end or a refusal to communicate. It becomes an interface: one domain states
what it can offer, what it cannot supply, and what additional datum would make
the next translation possible.

That is the central proposal. Physics, knowledge, and programs need not be one
thing to work together. They need faithful signatures, explicit
transformations, visible loss, and authority that never grows merely because
information crossed a boundary.

---

This is a condensed reader edition of the full circulation draft,
[Typed Object Signatures Across Physics, Epistemics, and Programming](typed_object_signatures_physics_epistemics_programming_draft.md).
The complete paper contains the exact finite constructions, formal
architecture, implementation proposal, failure catalogue, research programme,
references, and example schemas. The article is a publication view; where it
and the complete paper differ, the complete paper controls.
