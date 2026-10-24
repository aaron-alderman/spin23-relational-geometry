# Three-Carrier Admissibility Taxonomy v1

**Date:** 24 October 2026
**Status:** exact names for registered finite objects and operational contracts; cross-carrier identities remain proposals

## Purpose

The science programme, Claimipedia and Sourcery are related, but they do not
contain the same things.

| Carrier | Contains | Primary question |
|---|---|---|
| Science programme | mathematical structures, physical models, reductions, observables and experiments | What survives reduction, transforms lawfully or remains physically testable? |
| Claimipedia | claims, versions, evidence, challenges, provenance and authored relationships | What has been said, with what qualification, dependency, support or objection? |
| Sourcery | typed objects, declared transformations, assumptions, losses, evidence references and receipts | Which declared routes are structurally admissible, and why are others refused? |

The governing rule is:

> A number, relation or algebraic shape crosses carriers only through an
> explicit typed map. Shared dimensions and shared words do not transfer
> identity or authority.

The machine-readable companion is the
[three-carrier register](../registers/three_carrier_admissibility_taxonomy_v1.json).

## I. Science programme

### Quotient-Scar Admissibility Quiver

The **Quotient-Scar Admissibility Quiver** \(Q_{\rm QS}^{(1)}\) is a
six-coloured directed quiver with 16 vertices and 27 arrows, defined by the
[quotient-scar register](../programmes/quotient-scars/quotient_scar_register_v1.json).
Its arrow multiplicities are \((7,5,5,5,3,2)\).

### Constructive Twelve

The **Constructive Twelve** \(K_{12}\) are twelve actual arrows.

| Label | Edge | Type | Name |
|---|---|---|---|
| K01 | QR-006 | extends | projector-to-holonomy extension |
| K02 | QR-008 | extends | projection-to-reflexive-closure extension |
| K03 | QR-011 | extends | memory-to-wall extension |
| K04 | QR-014 | extends | wall-to-response extension |
| K05 | QR-019 | extends | invariant-to-detector extension |
| K06 | QR-022 | extends | orientation-to-selector extension |
| K07 | QR-025 | extends | selector-to-provenance extension |
| K08 | QR-001 | instantiates | Markov detector realization |
| K09 | QR-015 | instantiates | anchored-closure realization |
| K10 | QR-017 | instantiates | projective-overlap realization |
| K11 | QR-020 | instantiates | label-folding realization |
| K12 | QR-023 | instantiates | wall-detector realization |

### Guardrail Fifteen

The **Guardrail Fifteen** \(G_{15}\) are the remaining fifteen arrows.

| Label | Edge | Type | Name |
|---|---|---|---|
| G01 | QR-005 | requires enrichment | triality-to-Freudenthal carrier gate |
| G02 | QR-009 | requires enrichment | memory-to-oriented-holonomy gate |
| G03 | QR-012 | requires enrichment | wall-to-coherent-holonomy gate |
| G04 | QR-018 | requires enrichment | overlap-to-oriented-lift gate |
| G05 | QR-021 | requires enrichment | population-to-coherence gate |
| G06 | QR-007 | separates | holonomy from hidden-state memory |
| G07 | QR-010 | separates | retained memory from pure-BF forgetting |
| G08 | QR-016 | separates | determinant selection from coherent holonomy |
| G09 | QR-024 | separates | equilibrium lift selection from accumulated holonomy |
| G10 | QR-027 | separates | measured coefficient from universality and provenance |
| G11 | QR-002 | shared action, not carrier | triality-root versus Markov-state seam |
| G12 | QR-004 | shared action, not carrier | BF remnant versus triality-lattice seam |
| G13 | QR-013 | shared action, not carrier | wall topology versus singularity topology seam |
| G14 | QR-003 | rules out identification | selector index is not the G2 triple bond |
| G15 | QR-026 | rules out identification | current Peirce line is not the required orientation carrier |

Together they define the **constructive–guardrail polarization**

\[
C_1(Q_{\rm QS}^{(1)})=K_{12}\oplus G_{15}.
\]

### Fundamental Return Twelve and Boundary Fifteen

The underlying graph independently has cycle rank 12 and incidence rank 15.
These are dimensions, not finite sets. To name basis directions, v1 declares
the **QR-ordered fundamental basis**: process `QR-001` through `QR-027` in
identifier order and retain an edge exactly when it joins two previously
disconnected components.

The twelve non-tree chords label the **Fundamental Return Twelve**
\(F_{12}^{\rm QR}\):

| Label | Chord | Name |
|---|---|---|
| F01 | QR-009 | selection–memory–holonomy return |
| F02 | QR-010 | memory–BF–triality return |
| F03 | QR-012 | wall–holonomy enrichment return |
| F04 | QR-013 | wall–triality carrier-separation return |
| F05 | QR-015 | wall–response feedback return |
| F06 | QR-016 | selection–holonomy separation return |
| F07 | QR-018 | overlap–orientation-lift return |
| F08 | QR-020 | detector-folding closure return |
| F09 | QR-021 | population–coherence boundary return |
| F10 | QR-023 | wall–orientation detector return |
| F11 | QR-024 | equilibrium-lift–holonomy return |
| F12 | QR-027 | measurement–provenance return |

The fifteen retained tree edges label the dual fundamental-cut basis, the
**Boundary Fifteen** \(B_{15}^{\rm QR}\):

| Label | Edge | Name |
|---|---|---|
| B01 | QR-001 | detector-folding bridge |
| B02 | QR-002 | triality–Markov carrier seam |
| B03 | QR-003 | selector-index prohibition |
| B04 | QR-004 | BF–triality carrier seam |
| B05 | QR-005 | triality–Freudenthal enrichment cut |
| B06 | QR-006 | projector–holonomy trunk |
| B07 | QR-007 | holonomy–memory separation cut |
| B08 | QR-008 | projector–reflexive-closure trunk |
| B09 | QR-011 | memory–wall cut |
| B10 | QR-014 | wall–response cut |
| B11 | QR-017 | response–overlap cut |
| B12 | QR-019 | overlap–detector cut |
| B13 | QR-022 | overlap–wall-orientation cut |
| B14 | QR-025 | selector–provenance cut |
| B15 | QR-026 | Peirce-carrier prohibition |

Thus \(\dim K_{12}=\dim F_{12}^{\rm QR}=12\) and
\(\dim G_{15}=\dim B_{15}^{\rm QR}=15\), but the paired spaces are not equal.

### Mixed interface, cocircuit and backbone

The **Mixed Admissibility Interface** is

\[
I_8=\operatorname{im}\partial_K\cap\operatorname{im}\partial_G,
\qquad\dim I_8=8.
\]

It records closed paths that exist only because constructive moves and critical
boundaries compensate one another. The exact sequence has dimensions
\(0\to(2+2)\to12\to8\to0\).

The interface is now resolved integrally. Seven vertices are forced to zero by
being isolated in one of the two typed subgraphs. The remaining **Mixed Core
Nine** is
`QS-002`, `QS-009`, `QS-010`, `QS-011`, `QS-012`, `QS-013`, `QS-014`,
`QS-015`, `QS-016`; the only constraint is zero coordinate sum. Therefore

\[
I_{\rm mix}(Q_{\rm QS}^{(1)};\mathbb Z)\cong A_8.
\]

In source-node order its eight simple transfers are detector–holonomy,
holonomy–memory, memory–wall, wall–response, response–overlap,
overlap–detector, detector–selector and selector–provenance. The equal-weight
vertex pairing has Cartan determinant nine and discriminant group
\(\mathbb Z/9\mathbb Z\). Its coordinate cubic is real but its projected
product is not Jordan. See the
[resolution](../programmes/frontier/wave-7/frontier_wave7_39_mixed_interface_resolution.md).

The three `shares_action_not_carrier` arrows form the **Carrier-Separation
Cocircuit** \(S_3\). Deleting all three disconnects the graph; any one reconnects
it. Their deletion leaves the **Relation Backbone** \(R_{24}\), which carries:

- the **Quotient-Scar Incidence Lattice**
  \(L_{\rm QS}=(\mathbb Z^{24},2I+B^TB)\), even, positive definite,
  rootless and minimum-norm four, but not unimodular; and
- the **Seam-Projected Cycle Code** \(C_{\rm QS}\), a binary
  \([24,12,2]\) code, not the extended Golay code.

Leech, Golay, exceptional Jordan and E8 remain comparison or frontier labels,
not names for these exact objects.

## II. Claimipedia

Claimipedia contains authored claims and relationships, not the sixteen science
structures themselves.

### Claim Carrier and Relation Quartet

The pinned capture defines the **Claim Carrier** \(V_{38}\), the rational span
of 38 claim or crystal nodes appearing in 43 immutable relationship records.
Two repeated triples leave 41 distinct typed edges.

The four relation types form the **Claimipedia Relation Quartet**

\[
C=A_{\rm Challenges},\quad D=A_{\rm DependsOn},\quad
Q=A_{\rm Qualifies},\quad S=A_{\rm Supports},
\]

with record counts \((2,7,27,7)\). Their exact closure is the **Captured Claim
Relation Algebra** \(\mathcal A_{38}\):

\[
\dim\mathcal A_{38}=66,
\quad\dim Z(\mathcal A_{38})=14,
\quad\dim[\mathcal A_{38},\mathcal A_{38}]=53.
\]

### Spin–Temple cell and context

The opposite `Supports` and `Qualifies` arrows between Spin and Temple define
the **Spin–Temple Reversible Cell** \(W_{\rm ST}\), whose associative closure is
\(M_2(\mathbb Q)\) and commutator closure is \(\mathfrak{sl}_2(\mathbb Q)\).

The incoming Christianity–kenosis qualification is the **Kenosis Descent Scar**:
it proves that the two-node cell is not an autonomous quotient.

Predecessor closure gives the **Spin–Temple Context Closure**
\(P_{15}^{\rm ST}\), with 15 nodes and 17 edges. Its algebra fits into

\[
0\longrightarrow J_{30}\longrightarrow\mathcal A_{15}^{\rm ST}
\longrightarrow\mathbb Q\oplus M_2(\mathbb Q)\longrightarrow0.
\]

The Jacobson radical \(J_{30}\) is the **Directed History Radical**. The
quotient is the **Stable Reading Skeleton**: one scalar channel plus the
reversible cell. No second root cell is present, so this direct route does not
close to \(C_2\) or \(Spin(2,3)\).

## III. Sourcery

Sourcery accepts caller-supplied graphs, so it has no single fixed node count.
Its definite object is a parameterized gated path system.

### Signature carrier and transformations

A **Scientific Object Signature** has ten context axes

\[
(\text{domain, rank, variance, basis, regime, order, scheme,
symmetry, CP, support})
\]

plus a seven-coordinate SI-base dimension vector. Their collection is the
**Scientific Signature Carrier**.

An **Evidence-Bearing Transformation** is a directed edge with exact endpoint
signatures, a named operation, declared changes, assumptions, irreversible
losses, evidence, dimensional delta, analogy flag and bounded authority.

Passing edges form the **Admissible Transformation Graph** \(G_{\rm adm}\).
Failing edges form the **Rejection Boundary** and remain visible in the receipt.

### Bounded paths and ALE valuation

For source \(s\), target \(t\) and depth \(d\), Sourcery searches the
**Bounded Derivation Path Set**

\[
P_{\le d}(s,t;G_{\rm adm}).
\]

Each accepted path remains a **Derived Claim Proposal**. It carries the
**Assumption–Loss–Evidence valuation**

\[
\nu(p)=(A(p),L(p),E(p)),
\]

with componentwise distinct set union, so for composable paths
\(\nu(pq)=\nu(p)\cup\nu(q)\). This is the exact sense in which a route remembers
its cost and warrant.

### Verification envelope

The **Derivation Verification Envelope** contains four surfaces:

1. Query;
2. Candidate Paths;
3. ALE Ledger;
4. Rejection and Authority Receipt.

The bounded unexplored remainder is the **Search Frontier**, not evidence of
absence.

Sourcery's `scientific-derivation-composition/common-algebra-2` is a declarative
process of assertions, filters, maps, folds, union and hashing. It is not the
vector algebra \(\mathcal A_{38}\), the science cycle space or a Lie algebra.
The safe mathematical name is the **Gated Provenance Path System**.

## IV. Cross-carrier passage

The governed cycle is

\[
\text{science structure}
\to\text{Claimipedia claim graph}
\to\text{Sourcery route receipt}
\to\text{human review, proof or experiment}
\to\text{revised science structure or boundary}.
\]

Each arrow requires a distinct act:

- science to Claimipedia requires authorship, evidence and provenance;
- Claimipedia to Sourcery requires exact signatures, declared changes,
  assumptions, losses, evidence and authority;
- Sourcery to science requires the proof, computation, review or experiment
  appropriate to the claim.

## V. Rule for new names

Every new taxonomic name must declare:

1. its carrier;
2. its object kind—arrow set, space, basis, quotient, algebra, path set,
   receipt or frontier;
3. its status—intrinsic, convention-fixed, exact no-go, operational or
   speculative; and
4. its source version, capture hash or admitted generation.

This allows the taxonomy to grow without allowing a memorable number or shared
diagram to erase the difference between physics, authored knowledge and checked
reasoning.
