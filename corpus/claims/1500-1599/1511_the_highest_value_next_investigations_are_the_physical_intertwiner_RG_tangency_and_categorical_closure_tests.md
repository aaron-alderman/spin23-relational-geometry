# The Highest-Value Next Investigations Are the Physical Intertwiner, RG-Tangency, and Categorical-Closure Tests

**Date:** 20 October 2026

**Gates:** A2, A4, A5, A6, A7 and A9

**Status:** governed research-priority decision; no physical-admission claim

**Depends on:** [the local-Hom/global-rank no-go](1510_one_dimensional_local_arrow_spaces_do_not_force_the_global_rank_one_Schur_alignment_ideal.md), [the global Schur-ray theorem](1509_sums_of_rank_one_Schur_packets_preserve_the_texture_only_when_all_mediator_paths_share_one_projective_coupling_ray.md), [the typed-path matching construction](1508_the_typed_path_matching_law_maps_the_required_composite_to_a_rank_one_Schur_packet_not_an_independent_leakage_arrow.md), and [the terminal current-input synthesis](../1400-1499/1462_complete_current_input_exhaustion_promotes_a4_and_a6_conditionally_but_leaves_physical_admission_false.md)

**Evidence:** [machine-readable priority roadmap](../../../evidence/data/spin23-next-investigation-priority-roadmap.json) and [roadmap verifier](../../../verification/verify/verify_spin23_next_investigation_priority_roadmap.mjs)

## Executive answer

The programme can now be shifted by answering two joined questions:

\[
\boxed{\text{Does the physical Pati--Salam carrier force one global Schur ray?}}
\]

and, if it does,

\[
\boxed{\text{Is the resulting determinantal ideal preserved by quantum corrections?}}
\]

The first question is the nearest decisive construction/no-go test. The second
separates a tree-level coincidence from a technically meaningful mechanism.
Formal categorical closure is the bridge between them: it must explain why a
reducible path is matched as one correlated packet rather than as independent
effective coefficients.

This produces five investigations worth doing with current inputs and three
conditional continuations. A useful task must now do at least one of four
things: derive the common ray, prove radiative stability, construct the typed
physical embedding, or kill one of those possibilities cleanly.

## Priority 1 — census the actual aggregate Pati--Salam intertwiner

Construct the complete physical fermion/scalar carrier and enumerate every
admitted mediator path from claims 1496--1499. Assemble its aggregate portal
matrix

\[
V=\begin{pmatrix}d_1&\cdots&d_m\\y_1&\cdots&y_m\end{pmatrix}
\]

and compute both its allowed support and the dimension of the aggregate
intertwiner space.

**First executable artifact:** a sourced representation-and-vertex inventory,
followed by a verifier that constructs (V), enumerates its minors, and reports
the number of independent physical packet directions.

**Programme-shifting positive result:** only one physical packet exists, or
every admitted column is forced to factor as (v_i=\lambda_i u) through one
common morphism.

**Programme-shifting negative result:** two required physical carriers have
independent columns. Then exact texture protection is not natural in the
minimal embedding, even though every individual path has a valid Schur packet.

This is ranked first because it is finite, uses already-sourced local data, and
decides whether the central missing middle is real or only a toy-category
possibility.

## Priority 2 — classify the complex and indefinite Schur locus

Claim 1509 proves common-ray necessity on the real/common-phase, same-sign
branch. Complex phases and opposite-sign inverse weights can instead make

\[
\sum_{i<j}w_iw_j\det(v_i,v_j)^2=0
\]

by cancellation without making every minor vanish.

**First executable artifact:** symbolic primary decomposition, or an equivalent
stratification, of the two- and three-packet determinant-zero locus over
complex couplings and indefinite weights, with perturbation tests transverse
to every component.

**Positive result:** all symmetry-stable components reduce to common-ray
factorization, leaving nonaligned zeros as tuned cancellation loci.

**Negative result:** a nonaligned component is enforced by an available reality,
CP, or representation constraint. That would reopen a qualitatively different
protection mechanism.

This is the cheapest major loophole closure and should be done alongside the
physical census.

## Priority 3 — test one-loop tangency of the determinantal ideal

Let (I=cs-p^2), augmented by the cross-mediator minors when several packets
are present. Compute the one-loop counterterm or beta-function action on the
minimal mediator theory and ask whether

\[
\boxed{\beta(I)\in (I,\text{ all aggregate minors}).}
\]

**First executable artifact:** one frozen toy Lagrangian with the required
Dirac and Majorana portals, a complete one-loop operator/counterterm census,
and a symbolic tangency check.

**Positive result:** the matching variety is RG invariant, supplying a genuine
technical-naturalness mechanism.

**Negative result:** a loop generates a transverse primitive coefficient. Then
tree-level Schur correlation is insufficient unless additional typed structure
forbids that counterterm.

This is the highest-impact dynamics test, but it should use the carrier and
phase information from priorities 1 and 2 rather than an arbitrary toy model.

## Priority 4 — define the matching category or superconnection precisely

Turn the current path bookkeeping into a formal object: declare objects,
primitive arrows, real structure, grading, allowed composition, matching
functor, and the ideal of complete Schur packets. Prove or disprove:

- associativity and independence of integration order;
- compatibility with (J), chirality and generalized fluctuations;
- closure of the packet ideal under allowed composition;
- exclusion of independent primitive leakage without pretending it is an
  ordinary field \(\mathbb Z_2\).

**First executable artifact:** a finite presented category with a matrix-valued
matching functor reproducing claims 1507--1510, plus commuting-square tests for
the three tree topologies.

**Positive result:** composition itself preserves provenance and the matching
ideal, making relation-sheet parity a defined categorical symmetry.

**Negative result:** the functor depends on elimination order or cannot coexist
with the real-even physical module. Then the proposed relational protection is
not a consistent middle.

## Priority 5 — run a bounded finite real-even embedding search

Encode small KO-6 Krajewski/quiver completions as SAT, SMT, ILP, or an
exhaustive constraint search. Require reality, chirality, first-order support,
orientability where applicable, physical Pati--Salam representations,
relation-sheet parity, and the aggregate common-ray condition.

**First executable artifact:** a versioned constraint schema, declared size
bounds, symmetry reduction, one independently checkable witness format, and an
UNSAT certificate when available.

**Positive result:** one complete finite carrier satisfying every declared
constraint.

**Negative result:** a bounded no-go identifying the smallest incompatible
constraint subset. Either result materially changes the programme.

## Conditional continuations

### Priority 6 — Jordan/Spin(2,3) multiplicity-one theorem or counterexample

Compute the aggregate Hom space under the actual Peirce/Jordan and
(Spin(2,3)) actions. A multiplicity-one theorem could derive the common ray;
two independent intertwiners would show that the desired alignment is not a
consequence of the current representation data. This is conceptually central
but should follow the physical census, which fixes the domain and codomain.

### Priority 7 — loop and multi-mediator matching beyond local operators

Extend the matching functor to loop momentum dependence and nonlocal form
factors. Ask whether a finite packet ideal survives or becomes a functional
rank condition. This matters only after a tree-level category and its one-loop
counterterm support are explicit.

### Priority 8 — direct correlated NuFIT profile

Obtain or run the full joint likelihood for the electron-zero texture rather
than composing public marginal profiles. This could sharpen phenomenological
viability, but claim 1491 shows that current public projections do not identify
the required likelihood. Reopen on receipt of a joint evaluator or a direct
collaboration-produced constrained profile.

## Recommended execution order

1. Run the physical aggregate-intertwiner census and complex/indefinite locus
   classification as the immediate bounded tranche.
2. Freeze the smallest surviving carrier and test one-loop tangency.
3. Formalize exactly the categorical structure required by the survivor, then
   test it against all three tree topologies and real-even constraints.
4. Encode the combined requirements in the bounded embedding search.
5. Attempt a Jordan/Spin(2,3) multiplicity theorem only on the now-fixed
   physical Hom problem.
6. Proceed to general loop matching and correlated phenomenology only when
   their declared dependencies exist.

## Stop/go rules

- **Go:** the physical inventory has one packet or a derived common ray, and
  the determinant/minor ideal is tangent to the one-loop flow.
- **Repair:** the inventory has several directions but a symmetry-stable
  complex/indefinite component exists; formalize that component before more
  fitting.
- **Stop exact-protection branch:** two independent physical directions exist
  and one-loop corrections generate a transverse primitive operator with no
  derived categorical prohibition.
- **Do not promote:** a numerical fit, attractive analogy, or isolated finite
  witness that does not pass the physical-carrier and RG gates.

## Work not worth prioritising now

- More ordinary \(U(1)\) or field-\(\mathbb Z_2\) charge guessing: claims 1489 and
  1507 already close the relevant composition problem.
- More unconstrained flavour fitting: it measures capacity before deriving the
  source/intertwiner and repeats the lesson of claims 1487--1488.
- A conventional discrete-anomaly audit: there is not yet an ordinary field
  symmetry to audit; first construct a genuine physical or categorical lift.
- Full spectral-action expansion: the smaller carrier, functor, and RG tests
  can reject the branch much more cheaply.
- Further metaphor-only Spin(2,3), Golay, Leech, theological, visionary, or
  altered-state correspondences: retain them as signposts, but require an
  explicit intertwiner, transport law, or kill test before spending a tranche.
- Broad literature ingestion without a declared map to one of the decisive
  gates above.

## Verdict

The best next investigation is the actual minimal Pati--Salam aggregate
intertwiner census. The best paired calculation is the complex/indefinite
Schur-locus classification. If a protected component survives both, the
one-loop tangency test becomes decisive. The formal matching category and
bounded real-even embedding search then determine whether the mechanism is a
coherent Spin(2,3) middle rather than a successful local analogy.

## Execution update

Priorities 1--7 have now been executed to their current-input boundaries in
claims 1512--1519. Their integrated result, precise missing rows, and external
stop are recorded in [claim 1520](1520_the_next_investigation_roadmap_is_internally_executed_and_converges_on_two_carrier_rows_plus_loop_Ward_data.md).

## Reproduction

~~~powershell
node verification/verify/verify_spin23_next_investigation_priority_roadmap.mjs
~~~
