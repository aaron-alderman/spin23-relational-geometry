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
The [programme checkpoint](../programmes/frontier/wave-7/frontier_wave7_45_three_carrier_programme_checkpoint.md)
states which parts of this finite architecture are exhausted, which physical
gates remain open and why F05 is the shortest useful execution route.

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

### Typed two-rail carrier and mirror

Before adjacency, path quotient or Jordanization, the same capture has a
canonical **Typed Two-Rail Relation Carrier**

\[
\mathcal H_{\rm rel}
=V_{38}\otimes\mathbb R^{\{S,T\}}\otimes\mathbb R^{\{C,D,Q,S\}},
\qquad \dim\mathcal H_{\rm rel}=304.
\]

Each record \(e=(u\to v,t)\) contributes the **Typed Relation Ray**

\[
d_e d_e^{\mathsf T},
\qquad d_e=|v,T,t\rangle-|u,S,t\rangle.
\]

Their sum is the **Relation Gram Kernel** \(K_{\rm rel}\succeq0\).  Its
source--target blocks reconstruct all 41 distinct directed typed records, and
its rank is 41.  The **Rail-Swap Mirror** \(J\) exchanges source and target
rails and satisfies

\[
J K_{\rm rel}(G)J^{\mathsf T}=K_{\rm rel}(G^{\rm rev}),
\qquad J^2=I.
\]

This is an exact pre-quotient positive order and arrow-reversal covariance. It
is not an authored reverse relation, a path-algebra dagger, a contragredient
map, or the symplectic quarter-turn whose square is \(-I\).

Identifying rails and relation types produces the **Scalar Support Quotient**,
the ordinary rank-33 Laplacian.  The rank loss \(41\to33\) is the
**Eight-Direction Relation Quotient Scar**.  It records exactly how much
independent edge information the scalar support face forgets, without claiming
that rank alone identifies the lost semantics.  See the
[relation--face compiler](../programmes/admissibility/admissibility_124_relation_face_compiler_from_adjacency_to_jordan_holonomy.md),
[live support-order audit](../programmes/admissibility/admissibility_125_claimipedia_support_native_order_and_semantic_boundary.md)
and [typed two-rail lift](../programmes/admissibility/admissibility_126_typed_two_rail_positive_lift_preserves_the_mirror_face.md).

### Source-native Clifford rail cell

The rail carrier also has an exact **Source-Native Clifford Cell**. Authored
role grading (G=\operatorname{diag}(-1,+1)) anticommutes with rail swap (J),
so (I=GJ) squares to minus one and the null mixtures ((J\pm I)/2) are the
two directed within-fibre rail transfers. This cell does not survive the
scalar support quotient. More importantly, (I) exchanges the signed
Relation Gram Kernel with an unsigned **Co-incidence Kernel** rather than
preserving either one separately. It is exact pre-quotient role geometry;
path dynamics and a semantic relation-type adjoint remain open. See
[AZ-131](../programmes/admissibility/admissibility_131_the_authored_rail_grading_closes_the_local_clifford_cell_but_opens_a_coincidence_channel.md)
and the [cross-corpus atlas](../programmes/admissibility/admissibility_132_cross_corpus_clifford_cell_atlas_and_exhaustion.md).

### Scalar topology shadow and adjoint boundary

The doubled rail response has an exact scalar topology shadow. Signed
incidence descends to the rank-33 Laplacian; unsigned co-incidence descends to
the rank-35 signless Laplacian. Their two-rank difference counts the two
non-bipartite connected components. However, exhausting every involution of
the four authored relation types leaves only the reciprocal Spin--Temple
Supports/Qualifies pair and fails on 41 records. The whole-source semantic
adjoint is therefore absent; the free mirror must not be relabelled as an
authored path star. See [AZ-133](../programmes/admissibility/admissibility_133_the_incidence_coincidence_doublet_detects_odd_cycle_topology.md)
and [AZ-134](../programmes/admissibility/admissibility_134_no_global_semantic_adjoint_exists_on_the_current_claimipedia_relation_source.md).

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

### Full operator exhaustion and programme core

The full 38-node relationship-path algebra sharpens that local result. Its
58-dimensional nilpotent radical leaves the semisimple quotient

\[
\mathbb Q\oplus M_2(\mathbb Q)\oplus\mathbb Q[C_3],
\]

so its only nonabelian semisimple commutator factor is
\(\mathfrak{sl}_2(\mathbb Q)\). Separately, the reciprocal nine-node
Program–Version–Example core is a genuine double-centralizer
\(M_3(\mathbb Q)\otimes I_3\) with commutant
\(I_3\otimes M_3(\mathbb Q)\). Its root system is exactly \(A_2\), hence its
commutator algebra is \(\mathfrak{sl}_3(\mathbb Q)\).

Evidence incidence is square-zero and the authored provenance-stage algebra is
scalar plus strictly triangular. Neither contributes a semisimple Lie factor;
the provenance operators preserve no nondegenerate alternating form. The full
captured semisimple Lie content is therefore

\[
\mathfrak{sl}_2(\mathbb Q)\oplus\mathfrak{sl}_3(\mathbb Q),
\]

not \(\mathfrak{sp}_4\). Reopening requires a new evidence-bound operator on a
shared carrier that supplies a second root pair, a nondegenerate preserved
alternating form, the asymmetric \((-1,-2)\) Cartan coupling and the \(C_2\)
Serre relations. See the [programme-core calculation](../programmes/frontier/wave-7/frontier_wave7_39_programme_a2_double_centralizer_and_c2_no_go.md)
and [operator exhaustion](../programmes/frontier/wave-7/frontier_wave7_40_claimipedia_operator_exhaustion_and_sp4_gate.md).

### Kenotic junction topology

The pinned relationship one-complex has 38 vertices, 40 simple undirected
edges, five components and first cycle rank seven. The Christianity–kenosis
node is the **Kenotic Cycle-Bearing Articulation**: its deletion adds two
components and removes three cycle classes, while its authored orientation has
five incoming arrows, one outgoing arrow and no directed return. The distinct
Wick-Rotation kenosis node is the **Kenotic Acyclic Bridge**: its deletion adds
one component but removes no cycle class.

These names classify exact graph roles, not theological or physical objects.
Neither node is an absent pole or puncture. The next admissible object would be
a three-sector cover with declared local sections and overlap maps, followed by
a globalization test. See the [topology audit](../programmes/frontier/wave-7/frontier_wave7_45_kenotic_pole_topology_audit.md).

The natural cover is now resolved. Its branches have sizes 15, 1 and 7 before
the junction is restored, and covers of sizes 16, 2 and 8 afterward. All
pairwise and triple overlaps are the same singleton. The **Kenotic Filled-Nerve
Cover** is therefore a full two-simplex with constant-coefficient
\(H^1=0\); scalar sections that agree at the junction glue uniquely. This
closes the adjacency-only absent-pole route. A richer test requires distinct or
higher-dimensional overlaps with authored restriction maps. See the
[cover-gluing no-go](../programmes/frontier/wave-7/frontier_wave7_46_kenotic_cover_gluing_no_go.md).

The smallest exact enrichment is the **Kenotic Sign-Holonomy Loop**: three
distinct pairwise overlaps, no triple overlap and transition signs
\(g_{12},g_{23},g_{31}\). Its gauge-invariant classifier is
\(h=g_{31}g_{23}g_{12}\). The \(h=+1\) control admits a nonzero global marker;
the \(h=-1\) control returns the marker reversed and admits none. Over rational
vector-space coefficients the twisted local system has \(H^0=H^1=0\); the
surviving datum is the nontrivial \(\mathbb Z_2\) line-bundle class, not a
nonzero rational \(H^1\). This is a proposed reopening template, not a fourth
structure extracted from the current graph. See the
[enriched-loop template](../programmes/frontier/wave-7/frontier_wave7_47_kenotic_enriched_loop_reopening_template.md).

Across carriers, the **Central-Return Character** is the exact map
\(\chi:\{\pm I_2\}\to\{\pm1\}\). It sends the science carrier's coherent
\(-I_2\) frame return to the sign-holonomy toy's \(-1\) class while the
projector returns unchanged. Determinant is not this map:
\(\det(-I_2)=+1\). The detector must therefore retain a coherent endpoint
reference and compare one traversal with two. See the
[physical-detector bridge](../programmes/frontier/wave-7/frontier_wave7_48_sign_holonomy_physical_detector_bridge.md).

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

More precisely, an admitted derivation is an **Ordered Path with ALE Join
Valuation**. The path word composes by noncommutative concatenation while the
ALE ledger is a commutative idempotent monoid (a finite join-semilattice for a
finite token universe). Loss is monotone, exact duplicates require canonical
scope-and-version keys, and rejected rules remain outside the path algebra in a
separate receipt. See the [ALE algebra](../programmes/frontier/wave-7/frontier_wave7_43_sourcery_ale_algebra.md).

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
