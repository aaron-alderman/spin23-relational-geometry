# Jordan-Algebra Parallel Research Programme

**Purpose:** identify the highest-value starting points for running the wider research programme in Jordan-algebra language  
**Date:** 16 October 2026  
**Status:** prioritised research plan, not a claim of a completed Jordan formulation of particle physics  
**Parallel relationship:** this programme should run beside—not replace—the Spin(2,3), Furey, and stress–energy programmes

**Research grammar:** paths are kept open as explicit branches, including uncomfortable ones. Each branch carries a next discriminant and a stop-everything trigger. See the [open-branch research method](32_open_branch_research_method.md).

---

## Executive decision

The best Jordan-algebra starting point is now substantially clearer than it was in the older corpus.

The 2026 theorem of Baez and Schwahn gives an exact anchor:

\[
X\cong\mathfrak h_2(\mathbb C)
\subset
B\cong\mathfrak h_3(\mathbb C)
\subset
J:=\mathfrak h_3(\mathbb O),
\]

and

\[
\operatorname{Stab}_{F_4}(X)
\cap
\operatorname{Stab}_{F_4}(B)_0
\cong
S(U(2)\times U(3))
\cong
\frac{SU(3)\times SU(2)\times U(1)}{\mathbb Z_6}.
\]

Moreover, their transitivity and uniqueness results show that this is not merely an artefact of one specially chosen matrix embedding. The nested observable structure determines the correct global form of the Standard Model gauge group up to the relevant (F_4) action. This is a much firmer foundation than dimension matching or a conjectural exceptional-group chain. [Baez and Schwahn, *The Standard Model Gauge Group from the Exceptional Jordan Algebra*](https://arxiv.org/abs/2606.15235)

The highest-value programme should therefore begin with the **real Euclidean exceptional Jordan algebra** (J=\mathfrak h_3(\mathbb O)), use the nested pair (X\subset B\subset J) as the primary selector datum, and ask four questions in order:

1. What representations of the surviving gauge group occur in and around this nested pair?
2. Can the physical Standard Model fermion module be attached without duplication or anomalies?
3. Can the nested pair be promoted from a fixed choice to a dynamical selector with a healthy action?
4. Can that internal selector be coupled to the conservative Spin(2,3) Cartan-geometric selector through one action and one stress tensor?

The programme should **not** begin by assuming that (J_3(\mathbb C\otimes\mathbb O)) is fundamental. Complexification remains a live branch, but it must earn an advantage over the real algebra in chirality, state content, dynamics, or observables.

The recommended top-level ordering is:

| Rank | Workstream | Value | First decisive output |
|---:|---|---|---|
| 1 | Exact nested-pair implementation and branching | Very high | machine-checked stabilizer and representation decomposition |
| 2 | Fermion-module and anomaly tournament | Very high | complete Standard Model state/anomaly table across competing constructions |
| 3 | Composition/locality obstruction audit | Very high | ontology decision: observable algebra, internal organiser, or nonstandard quantum theory |
| 4 | Dynamical nested-pair selector | High | minimal flag-field action, spectrum, and stress tensor |
| 5 | Jordan–Spin(2,3) common action | High | factorised coupled model and portal classification |
| 6 | Triality, Higgs, and Yukawa invariant count | High but dependent | allowed scalar and Yukawa tensors, including texture restrictions |
| 7 | Real-versus-complexified branch tournament | Medium-high | explicit evidence for retaining or rejecting complexification |
| 8 | Integral Jordan–Leech compatibility | High-upside branch | test whether arithmetic structure selects or constrains the nested flag |

The first three can run in parallel immediately. Workstreams 4–7 should consume their outputs.

---

## 1. Why Jordan language is a genuinely different programme

The usual gauge-theory starting point is:

\[
G_{SM}
=\frac{SU(3)_c\times SU(2)_L\times U(1)_Y}{\mathbb Z_6},
\]

followed by a list of matter representations and an action invariant under this group.

The Jordan starting point reverses the explanatory order:

> begin with an algebra of candidate observables, select nested ordinary observable systems within it, and derive the surviving symmetry as the transformations preserving that structure.

For self-adjoint matrices the Jordan product is

\[
A\circ B=\frac12(AB+BA).
\]

The exceptional Euclidean Jordan algebra

\[
J=\mathfrak h_3(\mathbb O)
\]

has dimension (27), rank (3), automorphism group (F_4), a trace form, a cubic norm/determinant, primitive idempotents, spectral decompositions, and the octonionic projective plane as its rank-one pure-state geometry.

The new anchor is not merely that (F_4) contains interesting subgroups. It is that preserving a nested complex qubit and qutrit inside (J) produces the faithful Standard Model gauge group. The research question becomes:

> Can the observed particle theory be reconstructed from the geometry, representations, and dynamics of the nested observable flag—not merely from the abstract existence of its stabilizer?

This phrasing connects naturally to the wider project's language of selection, admissibility, and observable sectors, while avoiding the unsupported claim that an algebra of observables is already a spacetime quantum field theory.

---

## 2. Research-value criteria

Each proposed task is ranked against six criteria.

| Criterion | Question |
|---|---|
| Information gain | Does the result distinguish live branches or remove a major ambiguity? |
| Tractability | Can a clear theorem, computation, or no-go result be produced in months rather than years? |
| Reuse | Does the output become infrastructure for several later workstreams? |
| Physical proximity | Does it move from symmetry toward states, dynamics, stress–energy, or observation? |
| Falsifiability | Can the task return a clean negative answer? |
| Distinctiveness | Could success yield something less generic than another group embedding? |

A high-value task need not confirm the programme. A rigorous obstruction that forces the correct ontology may have more value than a positive but non-identifying construction.

The rankings below allocate effort; they are not verdicts on which ontology is true. At least one uncomfortable branch should remain active specifically because its success would force the programme to be re-rooted.

---

## 3. Workstream 1 — exact nested-pair implementation and branching

### Priority

**Start immediately. This is the foundation and the fastest route to a reusable exact result.**

### Core question

What does the Baez–Schwahn nested pair look like in a fully explicit computational basis, and how do the natural (F_4) and Jordan spaces decompose under

\[
H:=S(U(2)\times U(3))?
\]

### Why this is high value

The theorem gives the group but not a complete particle model. The next useful object is a branching dictionary that records how every relevant vector space transforms under (H):

- (J=\mathfrak h_3(\mathbb O));
- the traceless (26)-dimensional (F_4) representation;
- (\mathfrak f_4), including stabilizer and complement;
- tangent spaces to the relevant subalgebra or flag orbits;
- rank-one idempotent tangent spaces;
- Todorov's special subalgebra and primitive idempotents;
- Boyle's ( (\mathbb C\otimes\mathbb O)^2 ) tangent module;
- candidate Furey modules.

This will show immediately which spaces contain Standard-Model-like representations and which do not. It will also expose incorrect assignments of color, weak chirality, and hypercharge.

### Concrete tasks

1. Implement an explicit octonion basis, conjugation, norm, and multiplication table.
2. Implement (J), its Jordan product, trace form, cubic norm, adjoint, rank tests, and primitive-idempotent checks.
3. Construct standard representatives of
   \[
   X\subset B\subset J,
   \]
   with (X\cong\mathfrak h_2(\mathbb C)) and (B\cong\mathfrak h_3(\mathbb C)).
4. Implement derivations of (J) and verify the (52)-dimensional (\mathfrak f_4) algebra.
5. Solve linearly for the derivations preserving (X) and (B).
6. Verify that their intersection has Lie algebra
   \[
   \mathfrak{su}(3)\oplus\mathfrak{su}(2)\oplus\mathfrak u(1).
   \]
7. Track the discrete kernel needed for the global (mathbb Z_6) quotient.
8. Compute weights and branching rules for all candidate carrier spaces.

### Required output

- a convention file;
- exact or symbolic source code;
- unit tests for the Jordan identity and derivation property;
- a stabilizer-dimension certificate;
- a representation table in ((SU(3),SU(2))_Y) notation;
- a memo distinguishing the Lie algebra from the global group;
- an independent reproduction of the theorem's standard example.

### Decision rule

The workstream succeeds even if the natural Jordan representations **do not** contain the Standard Model fermion module. That negative result would prove that the gauge-group theorem needs an additional matter construction and prevent the project from conflating “correct stabilizer” with “complete Standard Model.”

### Estimated profile

| Information gain | Tractability | Risk | Dependency |
|---|---:|---:|---|
| very high | high | low–medium | none |

---

## 4. Workstream 2 — fermion-module and anomaly tournament

### Priority

**Start in parallel with Workstream 1; complete after its conventions and branching engine stabilise.**

### Core question

Which, if any, of the competing exceptional/division-algebraic matter constructions gives exactly the observed chiral Standard Model module under the same (H=S(U(2)\times U(3))) selected by the Jordan flag?

### Candidate constructions

At minimum compare:

1. Todorov's primitive-idempotent/special-Jordan construction;
2. Boyle's tangent-space construction on the complex octonionic projective geometry;
3. Furey's minimal-ideal and division-algebraic chain constructions;
4. direct branching of natural (J), (F_4), (E_6), or flag-tangent representations;
5. the null hypothesis that the Jordan flag selects only the gauge group and does not determine matter.

Todorov proposes a first-generation interpretation using primitive idempotents and identifies the Standard Model group through intersecting exceptional stabilizers. Boyle proposes a generation carrier related to the tangent space ((\mathbb C\otimes\mathbb O)^2) and links three generations to triality. These are mathematically suggestive but should be compared state by state rather than merged rhetorically. [Todorov, *Exceptional quantum algebra for the standard model of particle physics*](https://arxiv.org/abs/1911.13124), [Boyle, *The Standard Model, the Exceptional Jordan Algebra, and Triality*](https://arxiv.org/abs/2006.16265)

### Required state table

For every proposed state, generate

\[
(SU(3)_c,SU(2)_L,Y),\quad Q,\quad
\text{chirality},\quad\text{family},\quad
\text{carrier},\quad\text{projector},\quad
\text{conjugation rule}.
\]

Choose one hypercharge convention and freeze it. For example, if

\[
Q=T_3+Y,
\]

then (Q_L) has (Y=1/6) and (H) has (Y=1/2). If instead (Q=T_3+Y/2), every listed hypercharge must be doubled. Mixing conventions is a common source of false agreement.

### Required anomaly checks

Compute on the actual chiral module:

\[
[SU(3)]^3,quad [SU(3)]^2U(1),quad
[SU(2)]^2U(1),quad U(1)^3,quad
\mathrm{gravity}^2U(1),
\]

and the global (SU(2)) anomaly.

Also check:

- exact family multiplicity;
- unwanted mirror fermions;
- sterile states;
- compatibility with spin statistics;
- whether right-handed states are represented as left-handed conjugates or independent modules;
- whether the (mathbb Z_6) quotient acts faithfully.

### High-value comparison

The important question is not whether each construction can be made to display familiar labels. It is whether explicit intertwiners relate them while preserving:

- gauge action;
- chirality;
- conjugation;
- invariant bilinear forms;
- allowed Higgs/Yukawa trilinears.

If no intertwiner exists, the constructions are competing theories rather than mutually reinforcing descriptions.

### Decision rule

Admit a matter construction only if it produces the complete nonduplicated state table and passes anomaly checks. Otherwise retain the gauge-group theorem while rejecting the stronger matter claim.

### Estimated profile

| Information gain | Tractability | Risk | Dependency |
|---|---:|---:|---|
| very high | medium | medium | branching conventions from Workstream 1 |

---

## 5. Workstream 3 — composition, locality, and ontology obstruction audit

### Priority

**Start immediately. A result here determines what the exceptional Jordan algebra is allowed to mean physically.**

### Core question

Can (\mathfrak h_3(\mathbb O)) be the observable algebra of a local quantum subsystem that composes with other nonclassical systems, or must it instead serve as an internal organiser, single-system geometry, boundary structure, or effective selector?

### Why this is decisive

Jordan language encourages the phrase “octonionic qutrit.” That is mathematically useful, but a physical quantum theory must support composites, locality, entanglement, and interactions. Under standard assumptions used for non-signalling composites of Euclidean Jordan algebras, the exceptional Jordan algebra cannot occur as a direct summand of a composite with another nonclassical system; an exceptional factor composes only with essentially classical direct sums of one-dimensional systems. [Barnum, Graydon, and Wilce, *Composites and Categories of Euclidean Jordan Algebras*](https://arxiv.org/abs/1606.09331)

This does not automatically refute every exceptional-Jordan particle model. It does force an ontology choice.

### Four live ontologies

#### A. Fundamental observable algebra

(J) is literally the algebra of observables of a fundamental quantum system.

**Burden:** state a nonstandard composition rule and show non-signalling, positivity, acceptable local tomography or its replacement, and recovery of ordinary composite quantum systems.

#### B. Internal symmetry organiser

(J) is not the full observable algebra. It organises an internal order parameter, representation space, or symmetry-breaking pattern inside ordinary complex quantum field theory.

**Advantage:** avoids claiming exceptional quantum mechanics while retaining the stabilizer theorem.

#### C. Single-site or pre-geometric object

(J) applies before spacetime factorisation or only at one pre-geometric site; ordinary tensor-product quantum theory emerges after selection.

**Burden:** provide the emergence map and show how many-body locality appears.

#### D. Boundary or superselection structure

(J) labels sectors, boundary data, or constrained observables rather than freely composable local degrees of freedom.

**Burden:** construct an explicit host theory and demonstrate the Jordan structure within it.

### Recommended initial hypothesis

Use ontology B as the conservative reference model:

> (J) is an internal selector geometry embedded in an otherwise conventional complex quantum field theory.

Keep A, C, and D as explicit competitors. Do not use “octonionic qutrit” as evidence that ordinary quantum information operations are available.

### Required output

- an assumption-by-assumption statement of the composition no-go result;
- a table showing which proposed ontology violates or avoids each assumption;
- an explicit host algebra for the conservative internal-organiser option;
- a rule for physical states and observables after the Jordan selector is fixed;
- a decision on whether (J) is ontic, kinematic, auxiliary, or emergent.

### Decision rule

If no viable composition or host-theory construction is supplied, the project must stop describing (J) as the complete algebra of physical observables. It may still use it as internal geometry.

### Estimated profile

| Information gain | Tractability | Risk | Dependency |
|---|---:|---:|---|
| very high | high | low | none |

---

## 6. Workstream 4 — promote the nested pair to a dynamical selector

### Priority

**Begin after the stabilizer implementation is trusted. This is the most promising route from a theorem to a physical model.**

### Central idea

The pair

\[
\Phi=(X\subset B\subset J)
\]

can be treated as an internal order parameter. If the admissible nested pairs form a homogeneous orbit with stabilizer (H), the selector field takes values schematically in

\[
\mathcal M_{flag}\simeq F_4/H,
\qquad
H=S(U(2)\times U(3)).
\]

Since

\[
\dim F_4-dim H=52-12=40,
\]

this immediately raises a physical question: what becomes of the forty broken directions?

This question is far more informative than merely observing that the Standard Model group is a stabilizer.

### Three dynamical versions

#### Version 1: global (F_4) sigma model

The selector is a nonlinear sigma-model field on (F_4/H). It has forty Goldstone-like directions before explicit breaking, constraints, or gauging.

**Test:** are these modes phenomenologically excluded, massive, confined, or auxiliary?

#### Version 2: gauged (F_4) breaking

Gauge (F_4) and break it to (H). Forty gauge bosons become massive by eating the coset modes.

**Test:** derive their (H)-representation content, interactions, anomaly implications, and lower bounds. A large unified gauge sector is not automatically economical.

#### Version 3: constrained auxiliary selector

Treat (Phi) as a nondynamical or algebraically constrained field selecting the allowed internal connection.

**Test:** explain the origin of its orientation and whether quantum corrections destabilise the constraint.

### Minimal action question

A conservative model could begin schematically with

\[
S_\Phi=\int d^4x\sqrt{-g}\left[
\frac{f^2}{2}\,G_{AB}(\Phi)
D_\mu\Phi^A D^\mu\Phi^B
-V(\Phi)
\right].
\]

The actual variables should be algebraic projectors or subalgebra-defining tensors rather than arbitrary coordinates. The potential must have the nested (X\subset B) orbit as its vacuum manifold without reverse-engineering dozens of unconstrained coefficients.

### Required calculations

1. Determine the orbit and isotropy group precisely, including disconnected components.
2. Decompose the coset tangent representation under (H).
3. Enumerate invariant quadratic, cubic, and quartic terms.
4. Find the vacuum and Hessian.
5. Count physical modes and kinetic signs.
6. Calculate the selector stress tensor.
7. Determine whether the selector preserves the physical fermion projector dynamically.
8. Match heavy modes onto Standard Model effective operators.

### Important discrete issue

Baez and Schwahn require the identity component of the qutrit stabilizer. The full stabilizer contains an additional antiunitary-like component. That component may be relevant to a careful discrete-symmetry or CPT analysis, but it should not be casually inserted into the gauge group. This is a contained, technically interesting side project.

### Decision rule

Reject a dynamical version if it leaves massless unwanted modes, ghosts, uncontrolled flavour violation, or an arbitrary potential that merely encodes the desired answer.

### Estimated profile

| Information gain | Tractability | Risk | Dependency |
|---|---:|---:|---|
| high | medium | medium–high | Workstream 1 |

---

## 7. Workstream 5 — Jordan–Spin(2,3) common action

### Priority

**Begin as a design study after the conservative Jordan ontology is chosen; do not wait for every internal question to be solved.**

### Core architecture

Keep external geometry and internal observable selection distinct:

\[
\underbrace{Spin(2,3)\to Spin(1,3)}_{\text{geometric selector}}
\qquad\times\qquad
\underbrace{F_4\to S(U(2)\times U(3))}_{\text{internal Jordan selector}}.
\]

The physical fermion bundle should have the form

\[
\mathcal S_{Lorentz}\otimes\mathcal F_{Jordan},
\]

not an unsupported identification of spacetime spinors with Jordan observables.

### Minimal field content

- (Spin(2,3)) connection (\mathcal A_\mu{}^{AB});
- geometric compensator (V^A);
- Jordan nested-pair selector (\Phi);
- surviving Standard Model connection (A_\mu\in\mathfrak h);
- physical fermion field (\Psi);
- Higgs candidate (H);
- portals allowed by the common residual symmetries.

The action should be organised as

\[
S=S_{Cartan}[\mathcal A,V]
+S_{Jordan}[\Phi]
+S_{matter}[\Psi,H,A;V,\Phi]
+S_{portal}[V,\Phi,H,g].
\]

### Highest-value portal question

Do the symmetries permit a small set of couplings that use the **same coefficient** in internal-selection dynamics and gravitational stress response? Candidate structures include:

- selector-dependent fermion projectors;
- curvature coupling to a Jordan invariant;
- Higgs coupling to a nested-pair invariant;
- torsion coupling to internal currents;
- kinetic mixing between selector fluctuations only when representation theory permits it.

Every proposed portal must arise from the action. There must not be one freely selected visibility rule and an unrelated gravitational rule.

### Stress–energy target

\[
T^{total}_{\mu\nu}
=T^{SM}_{\mu\nu}
+T^{V}_{\mu\nu}
+T^{\Phi}_{\mu\nu}
+T^{portal}_{\mu\nu}.
\]

On shell,

\[
\nabla^\mu T^{total}_{\mu\nu}=0.
\]

The Jordan selector's metric response is the first clean place where the Jordan and stress–energy programmes meet.

### What this workstream should not attempt

- deriving (Spin(2,3)) from (F_4) by dimension or subgroup rhetoric;
- identifying octonionic nonassociativity with time;
- treating internal complex structures as extra timelike coordinates;
- importing reduced Spin(2,3) phenomenology without deriving the coupling.

### Decision rule

The factorised architecture wins unless a more unified algebra produces a demonstrably smaller action, stronger prediction, or necessary intertwiner.

### Estimated profile

| Information gain | Tractability | Risk | Dependency |
|---|---:|---:|---|
| high | medium | medium | Workstreams 2–4 in provisional form |

---

## 8. Workstream 6 — triality, Higgs, and Yukawa invariants

### Priority

**High scientific upside, but only after the physical fermion carrier is fixed.**

### Core question

Does the Jordan/triality structure restrict the scalar representation and Yukawa maps more strongly than the Standard Model already does?

### Why this could become the first distinctive prediction

The gauge-group theorem alone gives no new observable. A sparse invariant theory might.

For chosen left, right, and scalar modules, enumerate all invariant maps

\[
\mathcal Y:
\mathcal F_L\otimes E_H\otimes\mathcal F_R
\longrightarrow\mathbb C.
\]

Then determine:

- whether an (SU(2)) Higgs doublet with the correct hypercharge occurs;
- whether additional scalar multiplets are forced;
- which Yukawa entries vanish;
- whether family mixing is allowed or constrained;
- whether baryon- or lepton-number violating invariants occur;
- whether triality relates otherwise independent couplings;
- whether the invariant relations survive symmetry breaking and renormalisation.

### Relation to current literature

Todorov connects Spin(8) triality to a Higgs–fermion Yukawa interpretation, while Boyle proposes a relation between triality and three generations. Furey's programme develops independent ideal- and triality-based generation structures. These should be treated as competing explicit invariant calculations until intertwiners are shown.

### Required output

- a complete invariant-tensor basis;
- operator dimension and symmetry labels;
- a count of independent real parameters and phases;
- comparison with the Standard Model's Yukawa freedom;
- any texture relation expressed in basis-invariant form;
- renormalisation stability assessment.

### Decision rule

If the construction merely permits the generic Standard Model Yukawa matrices, it organises flavour but does not explain it. If it forces a relation already experimentally excluded, reject that carrier. If it produces a viable basis-invariant restriction, promote it as the first phenomenology target.

### Estimated profile

| Information gain | Tractability | Risk | Dependency |
|---|---:|---:|---|
| high | medium–low | high | Workstream 2 |

---

## 9. Workstream 7 — real versus complexified Jordan branch tournament

### Priority

**Run as a controlled comparison, not as the default backbone.**

### The branch question

The existing corpus takes

\[
J_3(\mathbb C\otimes\mathbb O)
\]

as its ambient Jordan object and proposes Hermitian, rank/orbit, stabilizer, and observable-viability filters. The Baez–Schwahn theorem now supplies an exact result already inside real

\[
J_3(\mathbb O).
\]

Complexification therefore carries a new burden:

> What physically necessary structure does it provide that the real exceptional Jordan algebra plus an ordinary complex Hilbert-space host does not?

### Comparison tests

| Test | Real (J_3(\mathbb O)) baseline | Complexified branch must show |
|---|---|---|
| Gauge group | exact nested-pair stabilizer theorem | equal result plus added explanatory value |
| Positivity | Euclidean cone and spectral order available | a physically controlled replacement |
| Rank/orbits | well-defined real Jordan geometry | sharper state or chirality selection |
| Matter | not supplied by theorem alone | a correct, anomaly-free module |
| Dynamics | still open | an action unavailable in the real-host formulation |
| Observables | meaningful EJA interpretation, composition caveat | a clearer operational map |
| Spin(2,3) bridge | factorised coupling available | a non-ad-hoc stronger bridge |

### Recommended branch strategy

1. Treat the real algebra as the null/reference branch.
2. Implement the rank-one and rank-two orbit tests in both real and complexified settings.
3. Compare stabilizers and physical state candidates.
4. Penalise additional free choices.
5. Admit complexification only if it solves chirality, matter, dynamics, or observable access more economically.

### Furey comparison

Furey's 2026 nested-embedding work derives pre- and post-Higgs internal symmetry algebras from compatible endomorphisms of (\mathbb O\oplus\mathbb H\oplus\mathbb C\oplus\mathbb R). That offers a second non-Jordan route to compare against the exceptional nested-pair theorem. The valuable question is whether both constructions select the same physical module and invariant tensors, not whether they both contain familiar group names. [Furey, *Standard Model Symmetries and the Nested Embeddings of (\mathbb R\subset\mathbb C\subset\mathbb H\subset\mathbb O)*](https://arxiv.org/abs/2607.18450)

### Decision rule

If complexification adds freedom without changing admitted states, invariants, or observables, retire it as a fundamental claim and retain it only as a computational convenience.

### Estimated profile

| Information gain | Tractability | Risk | Dependency |
|---|---:|---:|---|
| medium–high | medium | medium | Workstreams 1–3 |

---

## 10. The three best immediate projects

If resources permit only three starts, choose these.

### Project A — Jordan flag laboratory

**Duration target:** 4–6 weeks for the first audited version  
**Question:** can the nested-pair theorem and its representation content be reproduced computationally?  
**Output:** exact algebra library, stabilizer solver, branching tables, tests  
**Interesting success:** identifies natural candidate matter/scalar representations  
**Interesting failure:** proves the gauge stabilizer has no sufficient natural fermion carrier

### Project B — exceptional composition decision

**Duration target:** 2–4 weeks for the first formal memo  
**Question:** what physical ontology survives the known composition obstruction?  
**Output:** assumption ledger, ontology tournament, conservative host construction  
**Interesting success:** gives a coherent internal-selector interpretation  
**Interesting failure:** rules out the “fundamental octonionic quantum system” reading under declared assumptions

### Project C — matter-module tournament

**Duration target:** 6–10 weeks after basic branching infrastructure  
**Question:** do Todorov, Boyle, Furey, and direct-Jordan carriers produce the same anomaly-free Standard Model module?  
**Output:** state tables, anomaly calculations, intertwiner/no-intertwiner results  
**Interesting success:** unifies two or more constructions at representation level  
**Interesting failure:** cleanly identifies which attractive construction does not describe physical fermions

These projects have the best combination of certainty, information gain, and reusable output. They also prevent months of dynamics work from being built on an incorrect state space.

The [integral Jordan–Leech compatibility branch](33_octonions_leech_lattice_jordan_branch.md) should run as the next high-upside probe once the octonion and Jordan conventions from Project A are available. It could change the selector problem from a dynamical-potential question into an arithmetic-orbit question.

---

## 11. A 90-day execution plan

### Days 1–15: freeze conventions and reproduce the anchor

- choose octonion multiplication and sign conventions;
- implement (J), its product, trace, norm, adjoint, and rank;
- encode (X\subset B\subset J);
- reproduce stabilizer dimensions and Lie brackets;
- freeze the hypercharge normalisation;
- write the composition-obstruction assumption ledger.

### Days 16–35: branch and classify

- decompose (J), (\mathfrak f_4), and flag tangent spaces under (H);
- identify coset modes and their quantum numbers;
- implement the global (mathbb Z_6) kernel check;
- formalise the conservative internal-organiser ontology;
- create standard data formats for states and representations.

### Days 36–60: run the matter tournament

- encode Todorov, Boyle, and Furey candidate carriers;
- generate complete state tables;
- compute local and global anomaly tests;
- search for explicit intertwiners;
- register null and mismatch outcomes.

### Days 61–90: first dynamics decision

- derive the flag-orbit tangent representation;
- enumerate low-degree invariants;
- write the smallest global, gauged, and auxiliary selector actions;
- calculate linearised degrees of freedom and stress–energy;
- select one version for deeper development;
- issue a go/no-go decision on the complexified branch.

### Ninety-day deliverable

At the end of ninety days, the project should be able to answer:

1. exactly what the Jordan theorem gives;
2. exactly what it does not give;
3. whether a natural anomaly-free matter carrier exists;
4. what physical ontology is compatible with composites;
5. what fields appear if the nested pair becomes dynamical;
6. whether complexification has earned a role;
7. which action should be constructed next.

---

## 12. Recommended computational structure

Create a clean parallel area rather than adding more prose to the historical branch:

```text
jordan-program/
  00-status.md
  conventions/
    octonions.md
    jordan.md
    hypercharge.md
  algebra/
    octonions.py
    exceptional_jordan.py
    derivations.py
    embeddings.py
  stabilizer/
    nested_pair.py
    global_kernel.py
    branching.py
  matter/
    todorov.py
    boyle.py
    furey.py
    direct_jordan.py
    states.json
    anomalies.py
  composition/
    assumptions.md
    ontology_matrix.md
  dynamics/
    flag_orbit.md
    invariant_basis.md
    selector_action.md
    spectrum.md
    stress_energy.md
  spin23_bridge/
    common_action.md
    portal_basis.md
  programme/
    branch_matrix.json
    claim_ledger.json
    decision_log.md
  tests/
```

Every generated table should come from the code and structured data. Avoid maintaining an independent prose state count, anomaly table, and branching table.

---

## 13. Claims that must remain separated

| Claim | Current status |
|---|---|
| (\operatorname{Aut}(\mathfrak h_3(\mathbb O))=F_4) | established mathematics |
| Nested (\mathfrak h_2(\mathbb C)\subset\mathfrak h_3(\mathbb C)) stabilizer gives (G_{SM}) | theorem |
| The theorem explains why nature chooses the nested pair | open |
| The theorem supplies Standard Model fermions | not established |
| The theorem supplies chirality and anomalies | not established |
| (\mathfrak h_3(\mathbb O)) is a composable local quantum system | obstructed under standard EJA-composite assumptions |
| Todorov primitive idempotents are physical fermion states | proposed construction |
| Boyle tangent vectors give one generation | proposed construction |
| Triality explains three generations | conjectural physical interpretation |
| Furey and exceptional-Jordan modules are equivalent | open intertwiner problem |
| A dynamic flag selector breaks (F_4\to G_{SM}) healthily | open model-building problem |
| Jordan selection derives Spin(2,3) geometry | not established |
| Factorised Jordan internal geometry and Spin(2,3) Cartan geometry can share an action | concrete research proposal |

This table should appear near the front of every future Jordan programme document.

---

## 14. Areas to defer

The following are low-value starting points because they depend on unresolved upstream structure or permit too much freedom:

### Defer cosmology and missing mass

There is no admitted Jordan-specific low-energy operator yet. Galaxy fits would not identify the algebraic mechanism.

### Defer literal two-time unification

The Jordan programme already has a hard internal-state and composition problem. Adding a literal second physical time multiplies rather than resolves the consistency burden.

### Defer E8 enlargement

The exact (F_4) nested-pair theorem is a better anchor. Move to (E_6) or (E_8) only when a required representation, dynamics, or invariant is unavailable in the smaller structure.

### Defer Navier–Stokes/Jordan claims

Coordinate embeddings into a Jordan algebra do not supply PDE estimates. This branch should remain a lemma mine until its analytic gaps are independently closed.

### Defer analogue experiments as evidence

Phonon and audio systems can test selection and inference methods. They cannot validate the exceptional algebra without a derived parameter map.

### Defer broad “measurement creates the Standard Model” language

The theorem derives a stabilizer of selected subalgebras. It does not yet explain the physical origin of the selection, measurement dynamics, Born probabilities, or local quantum fields.

---

## 15. Milestones and stop-everything triggers

### Milestone J1 — exact anchor

The computational implementation reproduces the nested-pair stabilizer and global quotient.

**Stop-everything trigger:** convention-dependent or numerically approximate agreement without an exact certificate. Pause every downstream branching and state-count claim until repaired.

### Milestone J2 — matter

At least one carrier gives the exact three-generation chiral state table and anomaly cancellation.

**Stop-everything trigger:** unavoidable mirrors, duplicate generations, wrong hypercharges, or anomalous (U(1)). Stop the affected matter-carrier subtree, while leaving the gauge-group theorem intact.

### Milestone J3 — ontology

A precise host or composition rule explains how the Jordan structure coexists with local quantum field theory.

**Stop-everything trigger:** continued use of a fundamental observable-algebra interpretation without a response to composition. Pause all claims that depend on exceptional Jordan quantum mechanics being fundamental.

### Milestone J4 — dynamics

A selector action has a stable vacuum with residual (G_{SM}), a healthy spectrum, and controlled heavy modes.

**Stop-everything trigger:** massless unwanted coset modes, ghosts, or a potential that simply hard-codes the nested pair. Stop that dynamical-selector model and redirect effort to the fixed, auxiliary, or alternative-action branches.

### Milestone J5 — integration

The internal selector and Spin(2,3) Cartan selector coexist in one covariant action with a conserved total stress tensor.

**Stop-everything trigger:** unrelated visibility and gravity kernels or failure to preserve the physical matter subspace. Pause phenomenology based on the common action.

### Milestone J6 — prediction

The invariant structure restricts a basis-independent observable beyond generic Standard Model effective field theory.

**Stop-everything trigger:** all coefficients remain arbitrary or the purported prediction is a convention. Stop presenting the construction as predictively stronger than generic effective field theory.

---

## 16. Most promising routes to an interesting result

The phrase “interesting result” should include negative and structural outcomes. The most plausible valuable results are:

1. **A complete explicit branching atlas** for the nested qubit–qutrit flag inside (\mathfrak h_3(\mathbb O)).
2. **A no-natural-matter result** showing that the gauge-group theorem does not itself furnish the chiral fermions.
3. **An explicit equivalence or inequivalence theorem** among Todorov, Boyle, and Furey carriers.
4. **A composition-based ontology theorem** locating exactly where exceptional Jordan structure can live inside conventional QFT.
5. **A coset-spectrum result** for a dynamic (F_4/G_{SM}) selector.
6. **A minimal invariant-potential classification** for the nested-pair order parameter.
7. **A sparse Yukawa-invariant result** yielding a basis-independent flavour restriction.
8. **A portal no-go or portal uniqueness result** in the factorised Jordan–Spin(2,3) action.
9. **A real-versus-complexified decision** that retires an unnecessary ambient branch.
10. **A discrete antiunitary-extension analysis** clarifying the full stabilizer and its possible relation to CPT without confusing it with the gauge group.

Each would advance the programme even if no complete unified theory follows.

---

## 17. Final recommendation

The Jordan programme should be organised around the nested observable flag, not around the vague slogan that exceptional mathematics “contains” the Standard Model.

The strongest current statement is:

> Preserving an ordinary complex qubit inside an ordinary complex qutrit inside the exceptional octonionic qutrit selects the faithful Standard Model gauge group as a stabilizer intersection.

The next scientific question is not whether this is beautiful. It is whether the same nested pair determines:

- the correct chiral matter module;
- a viable composition/locality interpretation;
- a healthy selector dynamics;
- the Higgs and Yukawa invariant structure;
- a controlled coupling to spacetime geometry;
- a non-generic observable.

Run the first three workstreams immediately and in parallel:

1. exact nested-pair implementation and branching;
2. matter-module/anomaly tournament;
3. composition and ontology audit.

Then let their results decide whether to build a dynamical (F_4/G_{SM}) selector, whether complexification is necessary, and which Jordan–Spin(2,3) common action is worth quantising.

This is the shortest path from a striking theorem to either a viable physical architecture or a rigorous, informative no-go result.

---

## Primary research sources

- [Robert A. Wilson, *Octonions and the Leech lattice*](https://doi.org/10.1016/j.jalgebra.2009.03.021)
- [Noam D. Elkies and Benedict H. Gross, *The exceptional cone and the Leech lattice*](https://doi.org/10.1155/S1073792896000426)
- [John C. Baez and Paul Schwahn, *The Standard Model Gauge Group from the Exceptional Jordan Algebra*](https://arxiv.org/abs/2606.15235)
- [Ivan Todorov, *Exceptional quantum algebra for the standard model of particle physics*](https://arxiv.org/abs/1911.13124)
- [Latham Boyle, *The Standard Model, the Exceptional Jordan Algebra, and Triality*](https://arxiv.org/abs/2006.16265)
- [Howard Barnum, Matthew A. Graydon, and Alexander Wilce, *Composites and Categories of Euclidean Jordan Algebras*](https://arxiv.org/abs/1606.09331)
- [N. Furey, *Standard Model Symmetries and the Nested Embeddings of (\mathbb R\subset\mathbb C\subset\mathbb H\subset\mathbb O)*](https://arxiv.org/abs/2607.18450)

## Workspace companions

- [Octonions, Leech lattice, and exceptional-Jordan branch](33_octonions_leech_lattice_jordan_branch.md)
- [Open-branch research method](32_open_branch_research_method.md)
- [Research frontier](30_research_frontier.md)
- [Furey comprehensive review](02_furey_comprehensive_research_review.md)
- [Furey technical guide](03_furey_technical_algebraic_guide.md)
- [Furey–Spin(2,3) synthesis](05_furey_spin23_standard_model_synthesis.md)
- [Candidate parent and bridge analysis](23_candidate_parent_and_bridge_branches_analysis.md)
- [Corpus canonicalisation and next actions](26_corpus_canonicalization_and_next_actions.md)
