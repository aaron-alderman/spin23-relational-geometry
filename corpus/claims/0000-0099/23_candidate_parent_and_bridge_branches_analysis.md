# Candidate parent and bridge branches analysis

**Scope:** all `candidate papers` branches outside `spin2_3`.  
**Rule:** these branches compete to explain or extend the reduced model. Their existence does not provide cumulative support.

## E8 branch

### File structure

- `0 - master.md`: programme map and proposed reduction chain.
- `statics.md`, `dynamics.md`, `epistemics.md`, `phenomenology.md`: layer-specific development.
- `why-e8.md`: motivation and exceptional-group argument.
- `higgs.md` and `higgs-todorov.md`: Higgs-sector proposals and comparison.
- `references.md`: source list.
- `chain/*`: one note per proposed arrow: E8→E6, E6→J3, J3→G2, G2→SO(2,4), SO(2,4)→Spin(2,3).

### Summary

The branch tries to organise a constraint-first descent

\[
E_8\to E_6\to J_3(\mathbb O)\to G_2\to SO(2,4)\to Spin(2,3).
\]

This is not one uniform chain of subgroups or quotients:

- \(E_6\) has a well-known 27-dimensional exceptional Jordan representation.
- \(G_2\) is the octonion automorphism group and can arise as a stabiliser/automorphism structure.
- \(SO(2,4)\) is the four-dimensional conformal group locally, while \(Spin(2,3)\) is the AdS4 spin/isometry group.

But `J3(O)` is an algebra/representation space, not a Lie group; the arrow to \(G_2\) has a different type from a subgroup reduction. A natural \(G_2\to SO(2,4)\) physical descent is not established. The branch is therefore a sequence of typed correspondences and choices, not a derived reduction tower.

### Value

- identifies exceptional structures with real roles in particle mathematics;
- forces every bridge to state its object type;
- supplies candidate Higgs and symmetry-breaking ideas.

### Main correction

Do not treat exceptional largeness as explanatory by itself. The branch must beat a smaller/null model by deriving a selector, spectrum or observable with fewer choices.

## Exceptional Jordan `j3_oc` branch

### File structure

- `0a - branch charter.md`: scope and authority.
- `0b - ambient-to-observable reduction.md`: missing-middle statement.
- `0c - falsification and decision criteria.md`: exit conditions.
- `1 - master framework.md`: branch overview.
- `2a` through `2g`: statics, dynamics, epistemics, consistency, interpretation, phenomenology and open problems.
- `admissibility_paths/*`: four candidate reduction/selection routes plus an overview.

### Summary

This branch places an exceptional Jordan algebra—sometimes real \(J_3(\mathbb O)\), sometimes a complexified construction—upstream of the reduced Spin(2,3) model. Its strongest improvement over the early E8 narrative is the explicit branch charter: the ambient algebra is a choice whose reduction must be earned.

The four admissibility paths separate:

1. Hermitian-first reduction;
2. Hermitian plus reality constraints;
3. stabiliser-sensitive selection;
4. observable-viability selection.

The exact Jordan algebra supplies rank, cubic norm, idempotents and exceptional symmetry. It does not by itself supply spacetime signature, quantum dynamics, observed chirality or a detector map.

### Key category distinction

\(J_3(\mathbb O)\), \(J_3(\mathbb C\otimes\mathbb O)\), \(H_{16}(\mathbb C)\), the 225-dimensional endomorphism space and the octonionic chain algebra are different objects. Similar dimensions or exceptional ancestry do not identify them.

### Verdict

A well-disciplined ambient branch with an honest missing middle. Retain for the parent tournament, but do not allow it to explain the selector until the reduction is canonical and the action is specified.

## SO(2,4) branch

### Files

- `0d - Spin(2,3) vs SO(2,4).md`: comparison.
- `0e - bridging Spin(2,3) and SO(2,4).md`: possible connection.
- `0f - formal reduction SO(2,4) to Spin(2,3).md`: stabiliser/restriction route.
- `0g - option space around SO(2,4) and Spin(2,3).md`: branch choices.
- `README.md`: navigation.

### Summary

The branch correctly observes that \(SO(2,4)\) is the natural conformal symmetry of 3+1 dimensions, whereas \(SO(2,3)\) is the AdS4 symmetry. A non-null vector or related datum in a six-dimensional ambient space can have a stabiliser related to \(SO(2,3)\), giving an exact group-theoretic lift.

What remains chosen is precisely the physical datum that selects the stabiliser. The larger conformal group does not explain why the universe sits in the selected orbit, why the residual orientation has a sign or why the Standard Model internal group appears.

### Verdict

One of the two strongest exact parent candidates, alongside Spin(3,3). It is mathematically cleaner than the exceptional chains but still fails the physical-origin and observable gates.

### Warped-face comparator

[Karch--Randall locally localized gravity](../1700-1799/1795_karch_randall_realizes_a_spin23_face_inside_spin24_but_not_the_jordan_carrier_map.md)
provides an independent physical realization of the exact group placement:
an \(AdS_4\) brane with \(Spin_0(2,3)\) symmetry sits inside an \(AdS_5\)
bulk with \(Spin_0(2,4)\) symmetry. The reduction becomes observable only
after the embedding, junction conditions and localized spin-2 spectral measure
are supplied. This strengthens the branch as a model of an ambient-to-face
selection but does not derive the corpus's \(H_2(\mathbb C)\to H_2(\mathbb R)\)
carrier map.

## Spin(3,3) branch

### Files

- `2a1 - Spin(3,3) extension.md`: static lift.
- `2b1 - Spin(3,3) dynamics extension.md`: candidate dynamics.
- `2c1 - Heisenberg derivation branch.md`: symplectic/commutator proposal.
- `2e1 - Generative torus idea.md`: toric internal differentiation proposal.
- `README.md`: role.

### Summary

Spin(3,3) is a natural neighbouring group with useful accidental isomorphisms and a larger compact structure. The branch proposes a three-component timelike/hidden structure reduced to the Spin(2,3) carrier, and it explores whether the extra geometry supplies symplectic/Heisenberg structure or a toric origin for internal differentiation.

The static representation restriction is the strongest part. The dynamics, Heisenberg interpretation and generative torus remain candidate readings. Oriented area can realise a complex/symplectic structure, but that does not derive canonical quantisation without a state space, Poisson structure and quantisation rule.

### Verdict

The second strong exact-lift candidate. Prefer it only if it produces a downstream invariant or operator unavailable in the reduced/null model.

## Furey intake

### Files

- `README.md`: scope and relevance.
- `source-ledger-v1.json`: primary-source inventory.
- `candidate-facts.rel` and `srp9-furey-facts-v1.rel`: extracted claims.
- `srp9-source-claim-ledger-v1.json`: claim/source linkage.
- `srp9-structural-crosswalk-v1.md` and JSON counterpart: main comparison.
- `integration-work-pack-v1.json`: proposed continuation.
- `check-srp9-crosswalk.mjs`: executable structural checks.

### Summary

This is a comparatively strong external-research intake. It carefully distinguishes:

- the 15-dimensional \(\mathbb O\oplus\mathbb H\oplus\mathbb C\oplus\mathbb R\) carrier;
- its 225-dimensional real endomorphism algebra;
- multiplication-algebra inclusions;
- \(Cl(0,8)\);
- \(H_{16}(\mathbb C)\);
- \(J_3(\mathbb O)\);
- the local four-component Spin(2,3) carrier.

The exact result is a structural algebra-level comparison. Furey's programme provides Standard Model-like internal representation machinery, not a Spin(2,3) spacetime origin. The local and Furey spaces can have equal dimensions or conjugate endomorphism descriptions without their physical interpretations being equal.

### Verdict

High-value sidecar and likely the best internal-representation partner for future work. Do not merge it with the spacetime group. Use a tensor-product/fibre construction and one action, as proposed in the newer synthesis documents in this workspace.

## Weinstein Geometric Unity intake

### Files

- `README.md`: scientific boundary and required comparison.
- `source-ledger-v1.json`: source scope.
- `candidate-facts.rel` and `research-facts-v1.rel`: typed claims.
- `typed-reconstruction-and-challenge-audit.md`: main analysis.
- `weinstein-gu-typed-audit-v1.json`: structured audit.
- `integration-work-pack-v1.json`: possible next work.
- `check_weinstein_gu_typed_audit.py`: check.

### Summary

The intake reconstructs Geometric Unity as an external classical geometric programme and deliberately asks for typed objects, bundles, operators and reductions. This is the right method because public narrative descriptions otherwise make comparison almost impossible.

The audit does not find a controlled map from the GU construction to the admitted four-real-component Spin(2,3) carrier, selector or observable contract. The programme may share themes—larger geometry, observerse, gauge/spacetime relation—but thematic similarity is not a bridge.

### Verdict

Retain as an external comparison, not as supporting evidence. The current corpus's conclusion “no controlled bridge and no new observable” is appropriate.

## Navier–Stokes/Jordan branch

### Files

- `ns_jordan_handoff.docx`: initial research handoff.
- `ns_jordan_handoff_v2.docx`: extended handoff with stronger claims.
- five PNG figures: Burgers/Biot–Savart filtering, blow-up attractor, positivity, G2 embedding and J3(O) lift.
- `ns_to_spin23_integration.md`: six proposed bridge points.
- `README.md`: navigation and constraint.

### Summary

This branch maps fluid velocity-gradient data, vorticity/strain invariants and possible nonlocal correlations into quaternionic and octonionic Jordan structures. It highlights genuine mathematical objects:

- restricted-Euler invariants and the Vieillefosse locus;
- the transitive action of \(G_2\) on the unit imaginary octonions;
- the 15-real-dimensional size of \(J_3(\mathbb H)\);
- the 27-real-dimensional size of \(J_3(\mathbb O)\);
- scaling questions near hypothetical blow-up.

The second Word handoff makes a very strong “Type I blow-up contradiction” claim but immediately conditions it on two analytic gaps. That means the contradiction is not established. Specific concerns are:

- a full-rank linear embedding into a same-dimensional space is easy to construct; physical/canonical meaning is the hard part;
- assigning the 12 remaining Jordan dimensions to selected nonlocal fluid correlations by dimension count is not a derived equivalence;
- numerical verification of \(G_2\) transitivity checks code but does not replace the known theorem;
- an exponent mismatch is decisive only after both estimates apply to the same rigorously defined quantity under the same hypotheses;
- “confirmed equivalence with an independent researcher” has no auditable source in the corpus;
- the Navier–Stokes regularity problem is not solved while the Jacobi/differential inequality and Biot–Savart concentration estimates remain gaps.

The integration note is more responsible. It labels its six Spin(2,3) correspondences as proposed bridges and explicitly states what the NS work does not provide.

### Verdict

Quarantine the Word handoffs as historical hypothesis documents. Extract individually checkable lemmas—such as the Burgers crossing equation or restricted-Euler identities—into sourced mathematical notes. Do not advertise a regularity proof or use the branch as evidence for Spin(2,3).

## Cross-branch comparison

| Branch | Strongest exact content | Main missing middle | Present disposition |
|---|---|---|---|
| E8 | exceptional subgroup/representation relationships | typed continuous reduction and physical selection | high-risk architecture |
| J3(O) | Jordan rank, norm, idempotents, exceptional action | canonical reduction and dynamics | live ambient branch |
| SO(2,4) | exact stabiliser/restriction route | physical selector and residual sign | exact-lift frontier |
| Spin(3,3) | neighbouring representation lift | dynamics and observable | exact-lift frontier |
| Furey | internal ideals, charges, stabilisers and generations-like modules | local QFT and coupling to geometry | high-value sidecar |
| Geometric Unity | broad bundle/geometric proposal | reproducible typed bridge | external comparison only |
| NS/Jordan | fluid invariants and constructible embeddings | analytic estimates and canonicity | analogy/lemma mine |

## Recommended treatment

1. Keep SO(2,4), Spin(3,3), J3(O), E8 and the reduced/null model in an explicit tournament.
2. Treat Furey as an internal-module programme rather than a parent spacetime.
3. Require every arrow in E8/Jordan diagrams to state whether it is an embedding, stabiliser, representation, quotient, functor, ansatz or analogy.
4. Extract NS lemmas from the handoff narrative and independently prove them before reuse.
5. Do not spend more effort on a parent branch until it produces a common downstream quantity that the null model cannot obtain.

