# Typed Object Signatures Across Physics, Epistemics, and Programming

## A constructive framework for dimensions, symmetry, provenance, and trustworthy translation

**Author:** [Name for circulation]
**Affiliation:** [Affiliation, if any]
**Email:** [Email]
**Version:** Circulation draft
**Status:** Standalone working paper; comments and related references are invited

## Abstract

Physics, knowledge representation, and programming all use objects that can be
composed, transformed, compared, and rejected as ill-formed. This resemblance
invites a common formal language, but it also creates a recurrent error: a
shared dimension, diagram, or group name is treated as though it transported
meaning between domains. We develop a constructive typed alternative. A **Scientific Object
Signature** records ten contextual coordinates—domain, rank, variance, basis,
regime, order, scheme, symmetry, complete-positivity status, and support—plus a
seven-coordinate SI dimension vector. We generalize this construction to a
domain-independent **Epistemic Object Signature**, then recover scientific,
debate, legal, and computational signatures as profiles with distinct
authority and admissibility rules.

The proposal is tested against exact finite constructions. On the physics
side, the three-dimensional Jordan algebra
\(H_2(\mathbb R)\), with determinant signature \((1,2)\), has a
\(3+4+3\) Tits--Kantor--Koecher decomposition of dimension ten and conformal
Lie algebra
\(\mathfrak{sp}(4,\mathbb R)\cong\mathfrak{so}(2,3)\). Its defining
symplectic carrier is four-dimensional, while its primitive-bivector carrier
is five-dimensional with signature \((2,3)\) up to sign convention. On the
epistemic side, a finite Claimipedia relation-path model has dimension 66,
a 58-dimensional radical, and semisimple quotient
\(\mathbb Q\oplus M_2(\mathbb Q)\oplus\mathbb Q[C_3]\); the combined
authored semisimple Lie content is only
\(\mathfrak{sl}_2\oplus\mathfrak{sl}_3\), structurally distinct from
\(\mathfrak{sp}_4\). A smaller predecessor-closed relation algebra has a
three-dimensional transpose-fixed Jordan face \(H_2(\mathbb Q)\), but only
after a 30-dimensional path radical is removed and an involution is supplied.
On the programming side, derivations form a typed free category whose ordered
paths carry an assumption--loss--evidence valuation in a join-semilattice.
Its natural algebraic home is categorical rather than vectorial or Lie
theoretic.

The comparison yields a dimensional firewall: vector-space dimension, Lie
dimension, quadratic signature, graph-algebra dimension, schema arity, ledger
cardinality, and empirical degrees of freedom are different types of number.
We argue that the legitimate common structure is not one universal algebra
but a family of typed carriers and evidence-bearing morphisms. This framework
supports applications to scientific inference, debates, and law while keeping
truth, validity, authority, and executable admissibility distinct and mutually
illuminating.

**Keywords:** typed signatures; Jordan algebra; Lie algebra; knowledge graphs;
epistemology; provenance; type systems; dimensional analysis; Claimipedia;
Sourcery

## 1. Introduction

Three practices that are usually discussed separately share a recognizable
shape.

1. Physics declares states, observables, operators, dimensions, symmetries,
   regimes, and admissibility conditions.
2. Epistemic systems declare claims, evidence, objections, authorities,
   contexts, and relations among them.
3. Programs declare values, types, functions, effects, preconditions,
   postconditions, and failure states.

In each practice, an object is meaningful only relative to a carrier and a
rule for legitimate transformation. A matrix without its base field and
representation, a precedent without its jurisdiction and date, and a function
without its input and output types are all underspecified. The similarity is
real. It does not follow that the three domains instantiate the same algebra.

This paper asks a narrower and more tractable question:

> Can physics, epistemics, and programming share a theory of object
> signatures and admissible transformations while retaining their different
> notions of dimension, symmetry, composition, evidence, and authority?

Three sharply specified test cases guide the argument: an exact Jordan-to-Lie
construction on a rank-two response carrier, a finite operator-algebra model
of a Claimipedia knowledge graph, and an executable typed derivation system
with explicit assumption, loss, evidence, dimension, and authority gates.
They are close enough to compare and different enough to show why respectful
translation is more fruitful than forced identification.

The main conclusions are:

- a common signature architecture is viable;
- its common core is categorical and type-theoretic, not a common finite
  dimensional Lie algebra;
- several meaningful group actions occur, but they act on different carriers;
- recurring integers do not establish a bridge unless an explicit typed
  intertwiner preserves the relevant structure;
- epistemic and legal applications require authority and temporal coordinates
  that have no physical substitute;
- programming contributes fail-closed composition and provenance, not
  automatic scientific entailment.

The result is best understood as a design for disciplined translation. Its
method is **kenotic** in a precise structural sense: each domain relinquishes
the demand to absorb the others, exposes what it cannot supply, and contributes
its genuine strengths without claiming total authority. The goal is not to
make the world, a knowledge graph, and a program literally one mathematical
object, but to let them cooperate without erasing their differences.

Accordingly, each major comparison follows a three-part discipline:

1. **gift:** state the positive structure that has genuinely been obtained;
2. **boundary:** state what that structure does not carry by itself;
3. **invitation:** identify the smallest additional datum that would deepen
   the bridge.

This pattern treats a boundary as a hospitable interface for further work,
rather than as a merely negative result.

## 2. The dimensional firewall

The word *dimension* is overloaded. Before comparing domains, we distinguish
seven uses.

### 2.1 Carrier dimension

For a vector space \(V\), \(\dim V\) counts independent linear directions.
The principal examples are

\[
\dim H_2(\mathbb R)=3,
\qquad
\dim \mathbb R^4=4,
\qquad
\dim \Lambda^2_0(\mathbb R^4)^*=5.
\]

These are dimensions of three different representations. They are not three
measurements of one carrier.

### 2.2 Algebra dimension

An associative or Lie algebra is itself a vector space, so it has a linear
dimension. The physical construction gives

\[
\dim\mathfrak{sp}(4,\mathbb R)=10.
\]

A finite Claimipedia relationship-path algebra instead has dimension 66.
Its number of algebra directions is not the number of graph vertices, the
number of claims, or the dimension of a physical state space.

### 2.3 Quadratic signature

A nondegenerate real quadratic form has inertia \((p,q)\), recording positive
and negative directions. This is not a dimension pair in the sense of two
separate carriers, although \(p+q\) is the carrier dimension. The determinant
on \(H_2(\mathbb R)\) has signature \((1,2)\); the primitive two-form carrier
has signature \((2,3)\), or \((3,2)\) after reversing the overall sign.

### 2.4 Rank

Rank can mean matrix rank, Jordan rank, tensor rank, or the dimension of an
image. These meanings must be declared. The phrase “rank two” in the response
programme refers to the Jordan or port structure and does not imply a
two-dimensional algebra.

### 2.5 Schema arity or coordinate count

The Scientific Object Signature has ten contextual fields and seven SI
exponents. Calling it a “17-dimensional signature” is convenient only if the
quotation marks are retained. Most of its coordinates are categorical, not
real-valued, and the product is not naturally a 17-dimensional vector space.

### 2.6 Ledger cardinality

An assumption--loss--evidence ledger contains finite sets. Their sizes count
tokens accumulated along a path. These counts depend on normalization and
scope; they are not invariant dimensions of a carrier.

### 2.7 Statistical or empirical dimension

An experiment may have an identifiable parameter dimension, model dimension,
or number of effective degrees of freedom. Those are properties of an
inference problem and need not equal any algebraic dimension above.

We therefore impose the following rule.

> **Dimensional firewall.** A numerical equality can support a bridge only
> after the two numbers have the same declared dimension type and an explicit
> map relates the corresponding carriers.

Thus \(3=3\) does not by itself establish a relationship between a Jordan carrier, three debate
positions, and a three-field record. A map must state what is transported,
what is preserved, what is forgotten, and under whose authority the
translation is accepted.

### 2.8 The kenotic correspondence principle

The dimensional firewall is constructive rather than merely prohibitive. By
declining to seize an identity on the strength of a shared number, each object
is allowed to disclose its native structure. A bridge can then be stronger:
it names what each side gives, what neither side is asked to become, and what
new relation is made possible between them. We call this the **kenotic
correspondence principle**:

> A trustworthy bridge preserves the integrity of its endpoints, carries only
> the authority actually supplied, and makes every sacrifice of distinction
> visible as loss rather than concealing it as equivalence.

This principle turns restraint into generative method. Clear limits create
room for genuine interoperation, testable prediction, and correction.

## 3. The exact physical spine

### 3.1 The rank-two Jordan carrier

Let

\[
J=H_2(\mathbb R)=\operatorname{Sym}_2(\mathbb R)
=\left\{
\begin{pmatrix}a&b\\b&c\end{pmatrix}:a,b,c\in\mathbb R
\right\}.
\]

This is a three-dimensional real vector space with Jordan product

\[
X\circ Y=\frac12(XY+YX)
\]

and associated triple product, up to an overall convention,

\[
\{X,Y,Z\}=XYZ+ZYX.
\]

The outer symmetrization returns the result to the symmetric carrier. It is
therefore not merely aesthetic: it is the closure condition that permits
recursive composition.

Writing

\[
X=\begin{pmatrix}
x_0+x_1 & x_2\\
x_2 & x_0-x_1
\end{pmatrix}
\]

gives

\[
\det X=x_0^2-x_1^2-x_2^2.
\]

The determinant cone consequently has signature \((1,2)\). Positivity,
Jordan composition, and causal-cone language meet on one declared carrier,
but this fact alone does not supply physical time evolution.

### 3.2 TKK completion and the ten-dimensional algebra

On the four-dimensional symplectic carrier

\[
W=\mathbb R^4,
\qquad
\Omega=\begin{pmatrix}0&I_2\\-I_2&0\end{pmatrix},
\]

the symplectic Lie algebra consists of matrices

\[
M=\begin{pmatrix}A&B\\C&-A^T\end{pmatrix},
\qquad B=B^T,\quad C=C^T.
\]

It has the three-grading

\[
\mathfrak{sp}(4,\mathbb R)
=\mathfrak g_{-1}\oplus\mathfrak g_0\oplus\mathfrak g_{+1},
\]

with dimensions

\[
3+4+3=10.
\]

The two three-dimensional wings are copies of the Jordan carrier; the middle
part is \(\mathfrak{gl}_2\). The resulting low-dimensional isomorphism is

\[
\mathfrak{sp}(4,\mathbb R)\cong\mathfrak{so}(2,3),
\]

and at the connected group level

\[
Sp(4,\mathbb R)\cong Spin_0(2,3).
\]

This is an equality of explicitly constructed Lie algebras and connected
groups, not a dimension match. The carrier distinction remains essential:

\[
\dim J=3,
\qquad
\dim W=4,
\qquad
\dim\mathfrak{sp}(4,\mathbb R)=10.
\]

### 3.3 The five-dimensional orthogonal carrier

The primitive two-forms on the symplectic carrier form

\[
P=\Lambda^2_0W^*,
\qquad \dim P=5.
\]

Given a compatible complex structure \(\mathcal I\), pullback splits this
space into eigenspaces

\[
P=P^-_2\oplus P^+_3.
\]

The wedge form is definite with opposite signs on the two summands, so in an
adapted basis

\[
Q\sim\operatorname{diag}(-I_2,+I_3).
\]

This realizes the orthogonal side of the \(Sp(4)\)--\(Spin(2,3)\) relation.
It also demonstrates why “the signature” must name its carrier. The
\((1,2)\) determinant form lives on the three-dimensional Jordan algebra;
the \((2,3)\) form lives on a five-dimensional primitive-bivector module.

### 3.4 Physical boundary

The mathematics fixes neither a microscopic action nor a vacuum, detector,
calibration, or empirical realization. The exact result is conditional:
given the declared carrier and products, the closure follows. A physical
theory must still explain why nature selects that carrier and why the same
operators govern measured dynamics.

## 4. Claimipedia as an epistemic algebra

### 4.1 The authored relationship-path algebra

Consider the finite epistemic model \(\Gamma_{38}\), with 38 typed
relationship nodes and all finite authored relationship paths. Those paths
generate a 66-dimensional associative algebra \(\mathcal A_{38}\). Its
Jacobson radical has dimension 58, and

\[
\mathcal A_{38}/J
\cong
\mathbb Q\oplus M_2(\mathbb Q)\oplus\mathbb Q[C_3].
\]

The quotient dimensions are

\[
1+4+3=8.
\]

The radical records one-way, transient path structure. The reversible
two-state component contributes \(M_2(\mathbb Q)\). The three-cycle contributes
the commutative group algebra \(\mathbb Q[C_3]\). Under commutators, the scalar
and commutative cyclic factors vanish; the only nonabelian semisimple Lie
factor from this relationship algebra is

\[
[M_2,M_2]=\mathfrak{sl}_2,
\qquad \dim=3.
\]

### 4.2 Programme, evidence, and provenance branches

The reciprocal programme core generates \(M_3(\mathbb Q)\), whose commutator
algebra is

\[
\mathfrak{sl}_3,
\qquad \dim=8.
\]

The evidence-incidence maps are one-way and square-zero in the audited
orientation. The administrative provenance stages form

\[
\mathbb QI\oplus\mathfrak n_4,
\]

where \(\mathfrak n_4\) is six-dimensional and strictly triangular. Its
semisimple quotient is scalar. Combining the authored branches yields

\[
\boxed{
\mathfrak g_{\mathrm{Claimipedia}}^{\mathrm{ss}}
=\mathfrak{sl}_2\oplus\mathfrak{sl}_3,
\qquad \dim=3+8=11.
}
\]

This algebra cannot contain simple \(\mathfrak{sp}_4\): a nonzero homomorphism
from a simple algebra into either direct-summand projection would need to be
injective, but

\[
10=\dim\mathfrak{sp}_4>8>3.
\]

This epistemic model therefore does not reproduce the physical symmetry
algebra. That is a positive clarification: its \(A_1\) and \(A_2\) factors can
retain their own meanings while a separately typed mediator relates them.

### 4.3 A genuine Jordan face—and its cost

A smaller predecessor-closed relationship algebra gives a more local positive
result. It has dimension 35, a 30-dimensional path radical, and quotient

\[
\mathcal A/J(\mathcal A)
\cong\mathbb Q\oplus M_2(\mathbb Q).
\]

In the reversible matrix block, transpose exchanges the two reverse matrix
units \(E_{12}\) and \(E_{21}\). The transpose-fixed subspace is

\[
\operatorname{span}\{E_{11},E_{22},E_{12}+E_{21}\}
=H_2(\mathbb Q).
\]

It closes under

\[
A\circ B=\frac12(AB+BA).
\]

This is a real graph-to-Jordan construction, but three interventions must
remain visible:

1. quotienting removed 30 dimensions of path history;
2. transpose identified two typed reverse relations;
3. positive order came from the real matrix representation.

The construction establishes an exact Jordan face. It does not show that the
graph intrinsically selects that face, that discarded provenance is
recoverable, or that the face predicts a physical observable.

## 5. The two-plus-three bridge and its competing closures

The Claimipedia audit produces a two-state reversible sector and a three-state
programme sector. Their simplest one-way coupling is a six-dimensional
bifundamental module

\[
\operatorname{Hom}(\mathbb C^3,\mathbb C^2),
\qquad \dim=2\cdot3=6.
\]

### 5.1 Parabolic completion

The smallest standard block Lie algebra retaining the one-way character is

\[
\mathfrak p_{2,3}
=
(\mathfrak{sl}_2\oplus\mathfrak{sl}_3\oplus\mathfrak{gl}_1)
\ltimes\operatorname{Hom}(\mathbb C^3,\mathbb C^2).
\]

Its Levi factor has dimension

\[
3+8+1=12,
\]

its abelian nilradical has dimension six, and

\[
\dim\mathfrak p_{2,3}=18.
\]

Adding an independent reverse \(3\times2\) block does not produce
\(\mathfrak{sp}_4\). It closes to

\[
\mathfrak{sl}_5,
\qquad \dim=25-1=24.
\]

Thus reversible completion changes the algebraic species.

### 5.2 Orthogonal involutive reduction

On the real five-carrier \(\mathbb R^2\oplus\mathbb R^3\), select

\[
Q=\operatorname{diag}(-I_2,+I_3)
\]

and impose

\[
X^TQ+QX=0.
\]

The result is

\[
\mathfrak{so}(2,3)\cong\mathfrak{sp}_4(\mathbb R),
\qquad \dim=10.
\]

Relative to the \(2+3\) split, the dimensions are

\[
\dim\mathfrak{so}_2+dim\mathfrak{so}_3+dim\operatorname{Mat}_{2\times3}
=1+3+6=10.
\]

The six cross directions generate all ten directions under commutators, but
only when each forward map is paired with its \(Q\)-adjoint reverse. The price
is exact: the original
\(\mathfrak{sl}_2\oplus\mathfrak{sl}_3\oplus\mathfrak{gl}_1\) Levi does not
survive. Its standard intersection with the orthogonal algebra is only

\[
\mathfrak{so}_2\oplus\mathfrak{so}_3,
\qquad \dim=4.
\]

This comparison is a useful model for epistemic translation. A one-way
evidential relation, a freely adjoined reverse relation, and an adjoint paired
by a selected form are three different constructions. “Make it reversible”
is not a unique algebraic instruction.

## 6. Scientific Object Signatures

A Scientific Object Signature is defined by ten contextual fields:

\[
\sigma_{\mathrm{sci}}(x)=
(D,R,V,B,G,O,S,Y,C,P),
\]

where the coordinates denote

\[
\begin{array}{lll}
D:&\text{domain},&R:\text{rank},\\
V:&\text{variance},&B:\text{basis},\\
G:&\text{regime},&O:\text{order},\\
S:&\text{scheme},&Y:\text{symmetry},\\
C:&\text{complete-positivity status},&P:\text{support}.
\end{array}
\]

It is augmented by an SI exponent vector

\[
d(x)=(d_M,d_L,d_T,d_I,d_\Theta,d_N,d_J)\in\mathbb Z^7.
\]

The full signature carrier is consequently a heterogeneous product

\[
\Sigma_{\mathrm{sci}}
=D\times R\times V\times B\times G\times O\times S\times Y\times C\times P
\times\mathbb Z^7.
\]

This notation must not be mistaken for an ordinary 17-dimensional vector
space. Some factors may be posets, vocabularies, groupoids, sets of bases, or
structured records. Only the SI factor has a canonical additive structure in
this minimal description.

An evidence-bearing transformation \(f:x\to y\) includes:

- exact endpoint signatures \(\sigma(x)\) and \(\sigma(y)\);
- a named operation;
- the coordinates changed by the operation;
- assumptions, irreversible losses, and evidence references;
- a dimensional delta;
- an analogy flag;
- an authority ceiling.

A transformation is admitted only when all gates pass. Ill-typed or
dimensionally inconsistent candidates remain in a rejection receipt rather
than entering the compositional system as ordinary edges.

## 7. Programming: paths, effects, and receipts

### 7.1 The exact compositional object

Let \(\mathcal C\) be the typed free category generated by admitted
transformations. Objects are exact signatures and morphisms are ordered path
words. For a path \(p\), define the assumption--loss--evidence valuation

\[
\nu(p)=(A(p),L(p),E(p)).
\]

For composable paths \(p,q\),

\[
\nu(pq)=
(A(p)\cup A(q),L(p)\cup L(q),E(p)\cup E(q)).
\]

The path word is noncommutative: in general \(pq\ne qp\). The valuation is a
commutative idempotent monoid and, for finite token universes, a finite
join-semilattice. The empty path and empty ledgers give the identity.

This structure resembles an effect system in programming. A transformation
has a value-level type together with accumulated effects. The losses are
monotone:

\[
L(p)\subseteq L(pq).
\]

A subsequent reconstruction can add a new object using new evidence; it cannot
erase the recorded fact that a preceding projection forgot a distinction.

### 7.2 A general programming signature

The operational pattern can be rendered as

```text
transform :
  SourceSignature
  × Context
  × Assumptions
  × Evidence
  × Authority
  -> Either<
       RejectionReceipt,
       TargetSignature × LossLedger × EvidenceReceipt
     >
```

This is more informative than a conventional function type
`Source -> Target`, because it records the conditions under which composition
is licensed and the distinctions that composition destroys.

### 7.3 What “common algebra” means here

The programming system is not a vector, Jordan, or Lie algebra. Its exact
description is:

> a typed free category of admitted transformations equipped with a
> homomorphism into an assumption--loss--evidence join-semilattice.

Calling this a *common algebra* is defensible in the broad universal-algebraic
or compositional sense, but risks importing linear expectations. **Gated
Provenance Path System** is the safer name.

## 8. From Scientific to Epistemic Object Signatures

### 8.1 A shared kernel

We propose a domain-independent signature

\[
\sigma_{\mathrm{epi}}(x)=
(K,D,R,C,F,S,G,E,U,P,A,T),
\]

with the following coordinates:

| Symbol | Coordinate | Question |
|---|---|---|
| \(K\) | kind | What sort of object is this? |
| \(D\) | domain | What subject or carrier does it concern? |
| \(R\) | role | What job does it perform in the declared construction? |
| \(C\) | context | Under what regime, issue, or procedural posture? |
| \(F\) | form | In what representation, language, basis, or encoding? |
| \(S\) | status | Proposed, proved, measured, contested, binding, deprecated? |
| \(G\) | governing scheme | Which theory, logic, doctrine, protocol, or version? |
| \(E\) | equivalence | Which changes preserve identity or meaning? |
| \(U\) | admissibility | Which conditions permit use or composition? |
| \(P\) | support | What evidence, derivation, authority, or record supports it? |
| \(A\) | authority | Who or what can license which consequence? |
| \(T\) | time | At what date, version, or interval is it applicable? |

This kernel is intentionally not minimal in the programming-language sense.
It is an audit signature: enough information should travel with an object to
prevent an apparently valid transformation from silently changing its
meaning.

### 8.2 Profiles rather than forced uniformity

A domain profile refines the kernel.

For science:

\[
\sigma_{\mathrm{sci}}
=\sigma_{\mathrm{epi}}
+(\text{rank, variance, basis, physical symmetry, CP, support, SI dimension}).
\]

For debate:

\[
\sigma_{\mathrm{deb}}
=\sigma_{\mathrm{epi}}
+(\text{issue, stance, burden, inference rule, dependencies, defeaters}).
\]

For law:

\[
\sigma_{\mathrm{law}}
=\sigma_{\mathrm{epi}}
+(\text{jurisdiction, court level, posture, authority treatment,
effective interval, remedy}).
\]

For programming:

\[
\sigma_{\mathrm{prog}}
=\sigma_{\mathrm{epi}}
+(\text{input type, output type, effects, preconditions,
postconditions, failure type, version}).
\]

The plus signs denote record extension, not vector-space direct sum.

## 9. Debate and legal reasoning

### 9.1 Debate objects

A debate graph should distinguish at least claims, definitions, premises,
evidence, objections, rebuttals, concessions, and questions. A representative
signature is

```text
DebateClaim {
  kind: normative-claim
  issue: proportionality-of-restriction
  stance: supports
  role: intermediate-conclusion
  burden: preponderance
  inference: abductive
  context: policy-debate
  dependencies: [premise-17, evidence-9]
  defeaters: [objection-4]
  status: contested
  authority: participant-assertion
  provenance: transcript-turn-82
}
```

The graph can then refuse malformed moves. A rebuttal with no target is
ill-typed; an empirical premise cited as though it were a normative rule
changes object kind; a concession changes the live dispute but does not make
the conceded proposition universally true.

The relevant symmetries are often groupoids rather than one global group.
Paraphrase may preserve a proposition only within a language and context.
Renaming participants may preserve the inferential graph while changing
authority or burden. Reordering independent premises may preserve a
conclusion, whereas reordering noncommuting updates—such as concession before
objection—may change the debate state.

### 9.2 Legal objects

Legal reasoning adds unusually strict authority and temporal typing. A rule
signature might be

```text
LegalRule {
  kind: judicial-holding
  jurisdiction: Western-Australia
  courtLevel: appellate
  issue: statutory-interpretation
  proceduralPosture: appeal
  authorityStatus: binding-within-scope
  treatment: not-overruled
  temporalScope: effective-on-relevant-date
  factPattern: [...]
  rule: [...]
  remedy: [...]
  provenance: reported-decision
}
```

Relations such as *cites*, *applies*, *distinguishes*, *limits*, and
*overrules* have different signatures. They should not collapse into one
generic edge. In particular:

- citation does not imply adoption;
- persuasive authority does not become binding by accumulation;
- later treatment changes applicability without rewriting the historical
  text;
- factual similarity is not identity of procedural posture;
- acceptance into Claimipedia is not a judicial or legislative act.

The programming notion of an authority ceiling is therefore central. No path
through a knowledge graph can manufacture legal authority beyond that of its
sources and authorized adjudicators.

### 9.3 Truth, validity, and authority

The generalized system must keep three predicates separate:

\[
\text{well typed},
\qquad
\text{well supported},
\qquad
\text{true or authoritative}.
\]

A claim can be well typed and false. An argument can be valid but rest on a
false premise. A decision can be legally authoritative within a jurisdiction
without being a scientific fact or a universally sound moral conclusion.
These distinctions are not defects to be normalized away; they are the main
reason to retain domain profiles.

## 10. Symmetry and automorphism across the three domains

### 10.1 Physics

Physical symmetry is represented by a group acting on a carrier while
preserving declared structure:

\[
G\curvearrowright V,
\qquad
g^*Q=Q
\quad\text{or}\quad
g^*\Omega=\Omega.
\]

Examples here are \(Sp(4,\mathbb R)\), \(SO_0(2,3)\), and their connected
double-cover relation.

### 10.2 Epistemic graphs

For a typed epistemic graph \(\Gamma\), the relevant group is

\[
\operatorname{Aut}_{\mathrm{typed}}(\Gamma),
\]

the automorphisms preserving node kinds, edge kinds, provenance, status, and
authority labels. If provenance is forgotten, the automorphism group can
grow. That growth measures information loss, not additional source symmetry.

Partial translations, context-dependent equivalences, and version migrations
are more naturally organized as a groupoid. Objects are contexts or schemas;
invertible arrows are admitted equivalences between them. Noninvertible
evidential or legal updates remain ordinary morphisms outside the groupoid
core.

### 10.3 Programs

Programs admit several symmetry notions:

- alpha-renaming of bound identifiers;
- schema automorphisms;
- permutations of independent operations;
- representation changes connected by verified isomorphisms;
- observational equivalence under a specified interface.

These symmetries act on syntax, types, states, or observations—not
automatically on physical carriers. A compiler correctness theorem supplies a
typed intertwiner between program semantics. A shared group name does not.

### 10.4 The intertwiner criterion

Suppose \(G\) acts on \(V\) and \(H\) acts on \(W\). A serious bridge requires
a map \(\phi:V\to W\) and a group homomorphism \(\rho:G\to H\) satisfying

\[
\phi(gv)=\rho(g)\phi(v).
\]

For signatures, \(\phi\) must additionally declare:

- its domain and codomain profiles;
- which invariants it preserves;
- whether it is injective, surjective, partial, or lossy;
- its assumptions and evidence;
- its authority ceiling;
- a falsifier or rejection condition.

Without these data, a cross-domain group comparison is an analogy, not an
intertwining result.

## 11. A formal architecture

Let \(\mathsf D\) be a category of domain profiles. For each profile
\(d\in\mathsf D\), let \(\mathcal C_d\) be a category whose objects are
well-formed signatures in that domain and whose morphisms are admitted typed
transformations. A cross-domain bridge is a partial functor

\[
F_{d,e}:\mathcal C_d\dashrightarrow\mathcal C_e
\]

equipped with a loss and authority annotation. The partiality is essential:
not every scientific object has a legal image, and not every debate relation
has a physical interpretation.

Let \(\mathcal L\) be the ALE join-semilattice. Each domain category has a
valuation

\[
\nu_d:\operatorname{Mor}(\mathcal C_d)\to\mathcal L.
\]

For a bridge \(F_{d,e}\), define a translation receipt

\[
\tau(F_{d,e})=
(\text{preserved fields},\text{changed fields},\text{losses},
\text{authority},\text{falsifiers}).
\]

The central compositional law is conditional:

\[
F_{e,f}\circ F_{d,e}
\quad\text{exists only when endpoint signatures and authority scopes match.}
\]

This architecture resembles a fibration of domain-specific signature
categories over a profile category, although a full fibration theorem requires
explicit reindexing functors and coherence laws. We therefore use “family of
typed categories” for the construction developed here and retain “fibration”
as a research direction.

## 12. Dimensional and group ledger

The following table collects the principal finite structures without treating
them as interchangeable.

| Object | Domain | Dimension/type | Group or algebra | Status |
|---|---|---:|---|---|
| Two-state seed | physics/representation | \(2\) | \(GL_2\) context dependent | ingredient |
| Jordan carrier \(H_2(\mathbb R)\) | physics | \(3\) | determinant signature \((1,2)\) | exact |
| Symplectic carrier \(\mathbb R^4\) | physics | \(4\) | \(Sp(4,\mathbb R)\) acts | exact |
| Primitive bivectors \(\Lambda^2_0\) | physics | \(5\) | \(SO_0(2,3)\) acts | exact |
| Rectangular mediator | cross-carrier | \(6\) | \((\mathbf2,\mathbf3^*)\) module | exact abstract module |
| TKK Lie algebra | physics | \(10=3+4+3\) | \(\mathfrak{sp}_4\cong\mathfrak{so}(2,3)\) | exact |
| Claimipedia semisimple Lie content | epistemic graph | \(11=3+8\) | \(\mathfrak{sl}_2\oplus\mathfrak{sl}_3\) | exact finite model |
| Parabolic Levi | bridge model | \(12=3+8+1\) | \(\mathfrak{sl}_2\oplus\mathfrak{sl}_3\oplus\mathfrak{gl}_1\) | exact |
| \((2,3)\) parabolic | bridge model | \(18=12+6\) | \(\mathfrak p_{2,3}\) | exact |
| Full reversible block closure | bridge model | \(24\) | \(\mathfrak{sl}_5\) | exact |
| Local relation algebra | epistemic graph | \(35=30+5\) | radical plus \(\mathbb Q\oplus M_2\) quotient | exact |
| Relationship-path algebra | epistemic graph | \(66=58+8\) | radical plus \(\mathbb Q\oplus M_2\oplus\mathbb Q[C_3]\) | exact finite model |
| Scientific signature | programming/schema | 10 fields plus \(\mathbb Z^7\) | heterogeneous product, not vector dimension | exact protocol |
| ALE valuation | programming/provenance | finite-set cardinalities | commutative idempotent monoid | exact protocol |
| Admitted paths | programming/provenance | unbounded path length | typed free category | exact protocol |

Several lessons follow.

First, the physically important number ten occurs as a Lie-algebra dimension,
whereas the signature’s ten contextual fields form a record schema. The
equality is accidental unless a separate construction proves otherwise.

Second, the \(2+3\) split participates in two exact but incompatible closures:
the 18-dimensional parabolic preserves the one-way mediator and full Levi;
the 10-dimensional orthogonal reduction uses an adjoint pairing and retains
only \(\mathfrak{so}_2\oplus\mathfrak{so}_3\) from that Levi.

Third, quotienting can expose a small reversible algebra while erasing a much
larger history-bearing radical. A clean semisimple answer may therefore be a
lossy epistemic projection.

## 13. Propositions and conjectures

### Proposition 1: typed-composition safety

If every admitted transformation declares exact endpoint signatures and
composition is permitted only on endpoint equality, then no composed path can
silently change a declared signature coordinate.

**Reason.** Any change occurs inside a named edge and appears in that edge’s
change and loss record. Endpoint mismatch blocks composition.

This is a software and provenance proposition, not a truth theorem. A path of
well-typed false premises can remain well typed.

### Proposition 2: authority non-amplification

If each transformation has an authority ceiling and composite authority is
bounded above by the meet of its component ceilings, path composition cannot
manufacture empirical, legal, or adjudicative authority.

Thus a proposal-only derivation remains proposal-only regardless of how many
evidence tokens it accumulates.

### Proposition 3: quotient symmetry inflation

Let \(q:X\to X/{\sim}\) forget distinctions. Then automorphisms of the quotient
need not lift to automorphisms of \(X\). Consequently
\(\operatorname{Aut}(X/{\sim})\) may overstate the symmetries of the source.

The Claimipedia Jordan face illustrates the danger: removing the radical and
folding reverse arrows exposes a symmetric matrix block, but the full graph
does not thereby acquire its positive order or physical interpretation.

### Conjecture 1: profile-stable epistemic kernel

The twelve-field epistemic kernel in Section 8 can represent scientific,
debate, legal, and programming objects without changing field meanings,
provided each domain adds a profile rather than coercing native coordinates
into inappropriate shared fields.

### Conjecture 2: useful bridge complexity

A cross-domain bridge is explanatory only when the complexity of its mapping,
loss, and authority annotations is lower than the complexity of maintaining
separate domain accounts, while also producing at least one held-out success.

This is the signature analogue of explanatory compression. A record that
simply bundles every missing component is packaging, not unification.

## 14. Failure modes

### 14.1 Dimension matching

Equal dimensions do not establish isomorphism, representation equivalence, or
physical identity. Even isomorphic abstract algebras can have different real
forms, carriers, actions, and authority.

### 14.2 Group-name transport

Finding \(C_3\), \(A_2\), \(C_2\), or \(Spin(2,3)\) in two descriptions does
not supply an intertwiner. The group may act on paths in one case, physical
states in another, and schema labels in a third.

### 14.3 Quotient laundering

A quotient can make a structure cleaner by deleting precisely the histories,
exceptions, or directions that matter. Every quotient should therefore emit
a loss ledger.

### 14.4 Reverse-edge manufacture

Adding a reverse relation to an authored one-way edge changes the model.
Sometimes it produces a matrix block; sometimes it closes to a larger simple
algebra. Unless the reverse map is authored, measured, or derived as an
adjoint, it is an unsupported model extension rather than source-grounded
evidence.

### 14.5 Schema-count numerology

Ten signature fields and a ten-dimensional Lie algebra do not form a bridge.
One is a heterogeneous record arity and the other a vector-space dimension.

### 14.6 Authority laundering

Many citations, accepted graph records, or successful program executions do
not create scientific truth or legal authority. Authority must be explicitly
granted by the relevant practice.

### 14.7 Temporal erasure

Scientific models, software schemas, debates, and law evolve. Omitting version
or effective time can leave a syntactically unchanged transformation outside
its applicable interval.

## 15. Implementation proposal for Claimipedia

### 15.1 Core records

Claimipedia could introduce:

```text
ObjectSignature
DomainProfile
TypedRelation
TransformationRule
AssumptionToken
LossToken
EvidenceReference
AuthorityScope
TemporalScope
RejectionReceipt
```

Every object would have one core signature and exactly one primary domain
profile, with optional declared cross-domain views.

### 15.2 Typed relations

Relations should have their own signatures rather than being untyped labels.
For example:

```text
supports     : Evidence -> Claim
challenges   : Objection -> Inference
qualifies    : Condition -> ClaimScope
distinguishes: Case -> PrecedentApplication
overrules    : LaterHolding -> EarlierHolding
implements   : ProgramArtifact -> Specification
measures     : InstrumentRecord -> Observable
```

Domain and codomain mismatches should fail closed. A user may propose a new
adapter, but its assumptions and losses must be explicit.

### 15.3 Views and quotients

Claimipedia should distinguish:

- the full provenance-bearing graph;
- reversible or semisimple quotients;
- symmetric/Jordan views;
- debate-state views;
- jurisdiction-and-date legal views;
- executable derivation views.

No view should silently replace the source. Each should link to a receipt that
states which dimensions, distinctions, and authorities were removed.

### 15.4 Group and dimensional metadata

Group metadata should contain:

```text
groupName
baseField
realForm
carrier
representation
preservedStructure
kernel
image
connectedComponent
sourceOfAction
```

Dimension metadata should contain a `dimensionKind`, for example:

```text
vector-space
lie-algebra
quadratic-inertia
matrix-rank
schema-arity
ledger-cardinality
statistical-identifiability
physical-SI-exponent
```

Cross-kind equality would then be displayable as a coincidence but rejected
as a structural bridge.

## 16. Empirical and computational research programme

### 16.1 Signature benchmark

Construct a benchmark containing matched and mismatched transformations from
physics, debates, law, and programs. Each case should include:

- source and target signatures;
- a gold admissibility decision;
- assumptions and losses;
- authority scope;
- temporal/version scope;
- an adversarial near-neighbour differing in one decisive field.

### 16.2 Automorphism audit

For each domain graph, compute automorphism groups under progressively richer
typing:

\[
\operatorname{Aut}(\Gamma_{\mathrm{untyped}}),
\quad
\operatorname{Aut}(\Gamma_{\mathrm{typed}}),
\quad
\operatorname{Aut}(\Gamma_{\mathrm{typed+provenance}}).
\]

The reduction in symmetry quantifies how much apparent interchangeability was
caused by forgotten semantics.

### 16.3 Quotient-loss experiments

Measure whether conclusions derived on semisimple or symmetric quotients lift
to the full graph. A withheld edge or composition should be predicted before
inspection. Failure to lift should be recorded as a boundary, not repaired by
post hoc reverse edges.

### 16.4 Debate evaluation

Compare an untyped claim graph with a typed debate graph on:

- detection of burden shifts;
- separation of rebuttal from topic change;
- preservation of concessions;
- identification of circular support;
- recovery of the live disagreement after paraphrase.

### 16.5 Legal evaluation

Using a bounded, expert-reviewed jurisdictional collection, test whether typed
signatures reduce errors involving:

- wrong jurisdiction;
- overruled or superseded authority;
- dicta treated as holding;
- procedural-posture mismatch;
- application outside the effective period.

The system should be evaluated as research and retrieval infrastructure, not
as a substitute for professional legal judgment.

### 16.6 Scientific evaluation

A scientific evaluation should require malformed dimension rules to fail
closed, valid paths to retain assumptions and losses, and a typed path to
predict a withheld quantity or detector record. Passing a schema migration is
valuable engineering, while empirical confirmation remains a distinct and
welcomed achievement.

## 17. Discussion

The attraction of a universal algebra is understandable. Physics offers
powerful symmetry groups; epistemic graphs offer richly connected relations;
programming offers executable composition. Their combination appears to
promise a machine in which correct structure produces correct knowledge.

A more generous and useful conclusion is available. The three domains share a
**discipline of typed composition**. Each can contribute to a common account
without being reduced to one automatically meaningful multiplication table.

Physics contributes the strongest invariant structures: fields, forms,
positive cones, representations, and groups preserving them. Epistemics adds
directional support, challenge, provenance, and defeasibility. Programming
adds exact interfaces, effects, receipts, and fail-closed execution. Each
corrects a characteristic weakness of the others:

- physics without epistemic typing can overstate what a mathematical
  isomorphism establishes;
- epistemics without mathematical typing can collapse unlike relations into
  generic edges;
- programming without authority typing can execute a valid transformation
  that has no warrant to determine truth or policy.

The dimensional analysis makes this complementarity concrete. The physical
sequence \(3\to10\), the representation sequence \(4\to5\), the epistemic
decomposition \(66=58+8\), and the bridge alternatives \(18\), \(24\), and
\(10\) are exact results about different objects. Their value lies not in
forcing them into one number pattern but in showing what extra structure each
closure requires.

The same lesson applies to groups. A group is never merely a name; it is an
action on a carrier preserving specified structure. An epistemic graph may
have automorphisms, a program may have observational equivalences, and a
physical carrier may have symplectic or orthogonal symmetry. A bridge becomes
mathematical only when an intertwiner relates the actions. It becomes
scientific only when the carrier and action are tied to measurement. It
becomes legally authoritative only through the relevant institutional source.

## 18. Conclusion

A Scientific Object Signature can and should share a core with other object
signatures. The correct generalization is not to relabel every object as
scientific, but to define an Epistemic Object Signature with domain-specific
profiles.

The shared core records kind, domain, role, context, form, status, governing
scheme, equivalence, admissibility, support, authority, and time. Scientific
profiles add rank, variance, physical symmetry, complete positivity, support,
and SI dimensions. Debate profiles add stance, burden, inference, dependencies,
and defeaters. Legal profiles add jurisdiction, hierarchy, posture, treatment,
effective period, and remedy. Programming profiles add input/output types,
effects, contracts, failure types, and versions.

The associated universal structure is a family of typed categories with
evidence-bearing, loss-bearing, authority-bounded morphisms. Within individual
fibres, richer algebras and groups may appear. Across fibres, translation
requires explicit partial functors and receipts.

This architecture makes genuine mathematical contact possible without
collapsing domain boundaries. The three-dimensional Claimipedia Jordan face
contributes an exact epistemic composition law and invites a separately
grounded carrier-and-measurement identification. The ten-dimensional
\(Spin(2,3)\) closure contributes an exact physical symmetry template while
leaving the knowledge graph free to retain its own algebra. The programming
path system contributes executable custody of order, evidence, assumptions,
and loss while leaving truth assessment to the practices equipped to make it.
Typed signatures let these gifts compose without making them synonymous.

## 19. Questions for readers

1. Is the proposed twelve-field epistemic kernel minimal enough for practical
   use while still blocking the principal cross-domain type errors?
2. Should authority be a signature coordinate, an effect, or both?
3. Which equivalences are best represented by groups, which by groupoids, and
   which by general categories of noninvertible transformations?
4. Can quotient-loss be quantified in a way that predicts when semisimple or
   symmetric views remain epistemically faithful?
5. What is the correct notion of complexity for comparing a common bridge with
   separate domain-specific explanations?
6. Can a typed debate graph predict a withheld concession, dependency, or
   decisive objection without encoding the answer in its ontology?
7. Can a legal profile remain useful across jurisdictions without weakening
   its authority and temporal typing?
8. Which physically measured transformation can first instantiate the full
   signature-to-signature contract, including units, losses, and a held-out
   detector prediction?

## References

### External foundations

1. P. Jordan, J. von Neumann, and E. Wigner, “On an Algebraic
   Generalization of the Quantum Mechanical Formalism,” *Annals of
   Mathematics* 35 (1934), 29--64.
2. M. Günaydin, “Generalized Conformal and Superconformal Group Actions and
   Jordan Algebras,” arXiv:hep-th/9301050, 1993.
3. G. Meng, “Euclidean Jordan Algebras, Hidden Actions, and J-Kepler
   Problems,” arXiv:0911.2977, 2009.
4. S. Mac Lane, *Categories for the Working Mathematician*, second edition,
   Springer, 1998.
5. B. C. Pierce, *Types and Programming Languages*, MIT Press, 2002.
6. S. E. Toulmin, *The Uses of Argument*, Cambridge University Press, 1958.
7. P. M. Dung, “On the Acceptability of Arguments and Its Fundamental Role
   in Nonmonotonic Reasoning, Logic Programming and n-Person Games,”
   *Artificial Intelligence* 77 (1995), 321--357.
8. W3C, *PROV-O: The PROV Ontology*, W3C Recommendation, 2013.

## Appendix A. Signature schemas

### A.1 Scientific profile

```json
{
  "domain": "effective-herglotz-response",
  "rank": 2,
  "variance": "matrix",
  "basis": "external-ports",
  "regime": "constant-rank-patch",
  "order": "exact-finite",
  "scheme": "support-schur",
  "symmetry": "support-frame-covariant",
  "cp": "unrestricted",
  "support": "positive-operator-measure",
  "siDimension": {
    "mass": 0,
    "length": 0,
    "time": 0,
    "current": 0,
    "temperature": 0,
    "amount": 0,
    "luminousIntensity": 0
  }
}
```

The zero SI vector here belongs to the proposal-and-review record. It does not
assert that every physical quantity represented by the record is
dimensionless.

### A.2 Generic epistemic profile

```json
{
  "kind": "claim",
  "domain": "declared-subject",
  "role": "intermediate-conclusion",
  "context": "bounded-question",
  "form": "canonical-expression-v1",
  "status": "proposed",
  "governingScheme": "domain-profile-v1",
  "equivalence": "declared-paraphrase-class",
  "admissibility": ["well-formed", "source-bound"],
  "support": ["evidence-ref"],
  "authority": "proposal-only",
  "time": "versioned-effective-interval"
}
```

## Appendix B. Cross-domain bridge receipt

```json
{
  "sourceProfile": "scientific-object-signature/v2",
  "targetProfile": "epistemic-claim-signature/v1",
  "operation": "express-as-qualified-claim",
  "preserves": [
    "domain",
    "regime",
    "support-references",
    "version"
  ],
  "changes": [
    "mathematical-object-to-proposition"
  ],
  "losses": [
    "executable-operator-action",
    "basis-level-coordinate-data"
  ],
  "authority": {
    "input": "checked-computation",
    "output": "review-candidate",
    "empiricalAuthority": false
  },
  "falsifiers": [
    "endpoint-signature-mismatch",
    "missing-source-hash",
    "unsupported-authority-promotion"
  ]
}
```
