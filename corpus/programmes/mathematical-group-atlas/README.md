# Mathematical Group Relationship Atlas

This programme is a machine-readable catalogue of **mathematical groups and
their relationships to one another**.  It is separate from every use of the
word “group” for a collection, cluster, social body or analytical module.

The v1 seed has seven linked layers:

1. parameterized families and the four Classification of Finite Simple Groups
   branches;
2. concrete finite, Lie, Weyl and sporadic groups relevant to the corpus;
3. typed relationships: isomorphisms, subgroups, short exact sequences,
   products, covers, homomorphisms, Weyl quotients, centralizers and
   automorphism groups;
4. a corpus dependency scan retaining exact mention evidence, document→group
   dependencies, relationship candidates, unresolved tokens and clustered
   review units;
5. stable named maps and explicitly typed compositions derived only from
   reviewed map-bearing relationships; and
6. durable candidate adjudications that preserve promotion, global-form
   correction, qualification, deferral and rejection decisions across scans;
   and
7. a typed boundary register for related non-group objects such as Lie
   algebras, root systems, representations, homogeneous spaces, vector
   bundles, cohomology groups and associative algebras.

Every relation names the roles its groups play.  A short exact sequence, for
example, records `kernel`, `middle` and `quotient`; it is not flattened into a
generic arrow.  Established, open and negative records remain distinct.

## Files

- [Relationship schema](mathematical_group_relationship_schema_v1.md)
- [Machine catalogue](mathematical_group_catalogue_v1.json)
- [Stable map register](mathematical_group_map_register_v1.json)
- [Declared compositions](mathematical_group_compositions_v1.json)
- [Corpus dependency scan](mathematical_group_corpus_scan_v1.json)
- [Candidate adjudications](mathematical_group_candidate_adjudications_v1.json)
- [Token ambiguity register](mathematical_group_token_ambiguity_register_v1.json)
- [External-object register](mathematical_group_external_object_register_v1.json)
- [External-object corpus scan](mathematical_group_external_object_corpus_scan_v1.json)
- [External-object candidate adjudications](mathematical_group_external_candidate_adjudications_v1.json)
- [Monster--Baby--Tits occurrence register](monster_baby_tits_occurrence_register_v1.json)
- [Monster--Baby--Tits branching register](monster_baby_tits_branching_register_v1.json)
- [Monster--Baby--Tits literature review](monster_baby_tits_literature_review_v1.md)
- [Monster--Baby--Tits corpus bridge](../moonshine-program-lattice/monster-baby-tits-corpus-bridge.md)
- [Query tool](../../../scripts/query-mathematical-group-catalogue.mjs)
- [Catalogue verifier](../../../verification/verify/verify_mathematical_group_catalogue.mjs)
- [Corpus-scan verifier](../../../verification/verify/verify_mathematical_group_corpus_scan.mjs)
- [Map-register verifier](../../../verification/verify/verify_mathematical_group_map_register.mjs)
- [Candidate-adjudication verifier](../../../verification/verify/verify_mathematical_group_candidate_adjudications.mjs)
- [External-object verifier](../../../verification/verify/verify_mathematical_group_external_object_register.mjs)
- [External-object scan verifier](../../../verification/verify/verify_mathematical_group_external_object_corpus_scan.mjs)
- [External-object adjudication verifier](../../../verification/verify/verify_mathematical_group_external_candidate_adjudications.mjs)
- [Monster--Baby--Tits pullback verifier](../../../verification/verify/verify_monster_baby_tits_pullback_occurrences.mjs)
- [Monster--Baby--Tits branching verifier](../../../verification/verify/verify_monster_baby_tits_branching_register.mjs)
- [Monster--Baby--Tits corpus-crosswalk verifier](../../../verification/verify/verify_monster_baby_tits_corpus_crosswalk.mjs)
- [Corpus-scan generator](../../../scripts/generate-mathematical-group-corpus-scan.mjs)
- [Map-register generator](../../../scripts/generate-mathematical-group-map-register.mjs)
- [External-object scan generator](../../../scripts/generate-mathematical-group-external-object-scan.mjs)

## Query without an LLM

```text
node scripts/query-mathematical-group-catalogue.mjs stats
node scripts/query-mathematical-group-catalogue.mjs group A5
node scripts/query-mathematical-group-catalogue.mjs group grp:C4xC2cubed
node scripts/query-mathematical-group-catalogue.mjs group grp:C6xC6
node scripts/query-mathematical-group-catalogue.mjs group grp:HadamardDisc
node scripts/query-mathematical-group-catalogue.mjs map-path grp:C8xC8 grp:HadamardDisc 1
node scripts/query-mathematical-group-catalogue.mjs map-path grp:HadamardDisc2 grp:HadamardDisc 1
node scripts/query-mathematical-group-catalogue.mjs map-path grp:Sp4Z grp:GL4R 3
node scripts/query-mathematical-group-catalogue.mjs map-path grp:Co0 grp:GL24Z 1
node scripts/query-mathematical-group-catalogue.mjs map-path grp:C3 grp:Sp4R 2
node scripts/query-mathematical-group-catalogue.mjs map-path grp:Spin4 grp:SO4 1
node scripts/query-mathematical-group-catalogue.mjs neighbors grp:A5
node scripts/query-mathematical-group-catalogue.mjs family cfsg:sporadic
node scripts/query-mathematical-group-catalogue.mjs path grp:Q8 grp:A4 4 morphism
node scripts/query-mathematical-group-catalogue.mjs path grp:C3 grp:WE8 4 incidence
node scripts/query-mathematical-group-catalogue.mjs map-path grp:SL2Z grp:PSp4F3 5
node scripts/query-mathematical-group-catalogue.mjs path grp:Dic11 grp:Spin5F23 5
node scripts/query-mathematical-group-catalogue.mjs path grp:Sp2Compact grp:SO5 3
node scripts/query-mathematical-group-catalogue.mjs map-path grp:B3Braid grp:PSL2Z 3
node scripts/query-mathematical-group-catalogue.mjs map-path grp:SU1_1 grp:Spin0_2_3 4
node scripts/query-mathematical-group-catalogue.mjs map-path grp:Spin0_2_3 grp:SU3_3 4
node scripts/query-mathematical-group-catalogue.mjs map-path grp:SU3xU1 grp:SU4 3
node scripts/query-mathematical-group-catalogue.mjs map-path grp:Sp4Z grp:Spin0_2_3 2
node scripts/query-mathematical-group-catalogue.mjs map-path grp:C23 grp:M 2
node scripts/query-mathematical-group-catalogue.mjs map-path grp:S4 grp:M 2
node scripts/query-mathematical-group-catalogue.mjs map-path grp:C3 grp:C9 1
node scripts/query-mathematical-group-catalogue.mjs map-path grp:C2 grp:C6 1
node scripts/query-mathematical-group-catalogue.mjs map-path grp:C3 grp:C6 1
node scripts/query-mathematical-group-catalogue.mjs map-path grp:B3Braid grp:S3 4
node scripts/query-mathematical-group-catalogue.mjs map-path grp:B3Braid grp:A4 4
node scripts/query-mathematical-group-catalogue.mjs map-path grp:B3Braid grp:A5 4
node scripts/query-mathematical-group-catalogue.mjs map map:Sp4Z-reduction-F3:homomorphism
node scripts/query-mathematical-group-catalogue.mjs composition composition:SL2Z-to-PSp4F3
node scripts/query-mathematical-group-catalogue.mjs composition composition:B3-to-PSL2Z-via-SL2Z
node scripts/query-mathematical-group-catalogue.mjs composition composition:SU11-to-Spin023-via-rank-one-triangle
node scripts/query-mathematical-group-catalogue.mjs composition composition:SL2R-to-Spin023-via-Spin022-left-factor
node scripts/query-mathematical-group-catalogue.mjs composition composition:Spin023-to-SU33-via-Spin024
node scripts/query-mathematical-group-catalogue.mjs composition composition:Spin2-to-U1-via-SO2-cover
node scripts/query-mathematical-group-catalogue.mjs composition composition:U1-to-SU4-via-U3-global-form
node scripts/query-mathematical-group-catalogue.mjs composition composition:SU3SU2-to-GSM-via-cover
node scripts/query-mathematical-group-catalogue.mjs composition composition:SO2-to-SO3SO2-via-axial-first-factor
node scripts/query-mathematical-group-catalogue.mjs composition composition:Sp4Z-to-Spin023-via-real-carrier
node scripts/query-mathematical-group-catalogue.mjs composition composition:Sp4Z-to-Sp4R-via-Sp4Q
node scripts/query-mathematical-group-catalogue.mjs composition composition:Sp4Z-to-GL4R-via-ambient-scalar-extension
node scripts/query-mathematical-group-catalogue.mjs composition composition:C3-to-Sp4R-via-U11
node scripts/query-mathematical-group-catalogue.mjs composition composition:SU4-through-U4-determinant
node scripts/query-mathematical-group-catalogue.mjs composition composition:C23-to-M-via-order23-centralizer
node scripts/query-mathematical-group-catalogue.mjs composition composition:S4-to-M-via-order23-centralizer
node scripts/query-mathematical-group-catalogue.mjs composition composition:C3-through-C9-extension
node scripts/query-mathematical-group-catalogue.mjs composition composition:C3-through-C6-to-C2
node scripts/query-mathematical-group-catalogue.mjs composition composition:C2-through-C6-to-C3
node scripts/query-mathematical-group-catalogue.mjs composition composition:B3-to-S3-via-mod2-congruence
node scripts/query-mathematical-group-catalogue.mjs composition composition:SL2F3-to-A4-via-PSL2F3
node scripts/query-mathematical-group-catalogue.mjs composition composition:SL2F5-to-A5-via-PSL2F5
node scripts/query-mathematical-group-catalogue.mjs composition composition:B3-to-A4-via-mod3-congruence
node scripts/query-mathematical-group-catalogue.mjs composition composition:B3-to-A5-via-mod5-congruence
node scripts/query-mathematical-group-catalogue.mjs object "Sp(4,R)/U(2)"
node scripts/query-mathematical-group-catalogue.mjs object "Gr_C(2,3)"
node scripts/query-mathematical-group-catalogue.mjs object obj:lie:sp2Compact
node scripts/query-mathematical-group-catalogue.mjs object obj:algebra:HeckeS5WE6S5
node scripts/query-mathematical-group-catalogue.mjs external-neighbors grp:Spin10
node scripts/query-mathematical-group-catalogue.mjs external-scan-stats
node scripts/query-mathematical-group-catalogue.mjs external-corpus obj:space:SiegelH2 25 0
node scripts/query-mathematical-group-catalogue.mjs external-cluster external-cluster:<id> 25 0
node scripts/query-mathematical-group-catalogue.mjs external-adjudications deferred_secondary_external_type
node scripts/query-mathematical-group-catalogue.mjs occurrence-group grp:Tits
node scripts/query-mathematical-group-catalogue.mjs occurrence occ:C2:Tits-outer
node scripts/query-mathematical-group-catalogue.mjs occurrence-certificate
node scripts/query-mathematical-group-catalogue.mjs occurrence-gates
node scripts/query-mathematical-group-catalogue.mjs branching-known
node scripts/query-mathematical-group-catalogue.mjs branching-open
node scripts/query-mathematical-group-catalogue.mjs open
node scripts/query-mathematical-group-catalogue.mjs scan-stats
node scripts/query-mathematical-group-catalogue.mjs corpus grp:Sp4R 25 0
node scripts/query-mathematical-group-catalogue.mjs candidates grp:Sp4R high 25 0
node scripts/query-mathematical-group-catalogue.mjs unresolved 25
node scripts/query-mathematical-group-catalogue.mjs ambiguities catalogue_candidate 25
node scripts/query-mathematical-group-catalogue.mjs unclassified 25
node scripts/query-mathematical-group-catalogue.mjs document corpus/claims/0000-0099/47_global_group_isomorphism_sp4r_spin023.md
node scripts/query-mathematical-group-catalogue.mjs cluster cluster:<id> 25 0
node scripts/query-mathematical-group-catalogue.mjs adjudications corrected_global_form
```

Regenerate the scan deterministically with:

```text
node scripts/generate-mathematical-group-corpus-scan.mjs
node scripts/generate-mathematical-group-map-register.mjs
node scripts/generate-mathematical-group-external-object-scan.mjs
```

With unchanged inputs, repeated generation is byte-identical; the scan records
the catalogue date and algorithm version rather than embedding a wall-clock
timestamp.

Algorithm version 2 introduced token-anchor and relationship prefilters before
exact alias matching. Algorithm version 3 joined unresolved spellings to a
separate, reviewed ambiguity register. Versions 4--5 added explicit hook-arrow
recognition and context-sensitive rejection of short root/type symbols such as
the `C2` in `C2/B2 type`, which must not resolve to the cyclic group. The
register distinguishes underspecified groups, component ambiguity, non-group
objects, overloaded labels, families, encoding variants, alias candidates and
concrete catalogue candidates without silently resolving any of them. This
preserves exact evidence locations while avoiding a pathological all-alias
regular expression; algorithm-version changes remain visible when extraction
semantics or candidate counts change.

Algorithm version 6 adds contextual short-symbol recovery for `B_3`: the
token resolves to the three-strand braid group only when braid or centre
syntax such as `Z(B_3)` is present, while root-system, Dynkin, Weyl and Lie
type contexts remain rejected. This admits the exact braid-centre quotient
without turning every type-`B3` occurrence into a braid group.

Algorithm version 7 makes explicit product aliases whitespace-tolerant while
retaining representation-subscript boundaries. It also exposes why a
line-level candidate remains weaker than a typed relation: a chain such as
`Sp(4,Z) subset Sp(4,R) ~= Spin_0(2,3)` contains subgroup and isomorphism
predicates with different scopes. Adjudication records the two arrows rather
than spreading either predicate over all three groups.

Algorithm version 11 extends the same product treatment from multiplicative
notation (`x`, `×`, `\\times`) to additive notation (`⊕`, `\\oplus`). This is
essential for finite abelian groups: a compact Smith-normal-form expression
such as `Z4\\oplus(Z2)^3` now resolves the complete reviewed product node and
the direct-product predicate, while retaining each constituent factor as
evidence. It must not be flattened into a false isomorphism between the
factors.

Algorithm version 12 corrects the left boundary for aliases that begin with
mathematical punctuation or a TeX command. In compact expressions such as
`\\mu_4\\times\\mu_3\\cong\\mu_{12}` or
`\\oplus(\\mathbb Z_{18})^2`, the final letter of the preceding TeX command is
not part of the following group token. Alphanumeric aliases retain the strict
word boundary; backslash- and parenthesis-led aliases use their own leading
syntax as the boundary. This recovers later factors without weakening plain
word matching.

Algorithm version 13 recognizes conjugacy as its own review predicate. A
statement that two matrices are conjugate in `GL(4,Q)` is not a group
isomorphism and need not remain true in `GL(4,Z)` or inside a symplectic
subgroup. Candidate extraction now preserves that distinction so element,
operator and representation conjugacy can be adjudicated or deferred to the
external-object layer without borrowing an incidental nearby predicate.

Finite discriminant data is deliberately stratified beyond the product
syntax. The Hadamard example has invariant-factor presentation
`C8^2 x C2 x C18^2` and primary presentation
`(C8^2 x C2^3) x C9^2`; both describe the same abelian group of order
`41472`. Neither presentation determines the discriminant quadratic form.
Likewise the abstract cyclic group `C12` occurs as the root-of-unity value
group `mu12` and, elsewhere, as a fundamental group. It is explicitly not
the `(C12)^2` state group in the cross-prime module, whose state group is
`(C6)^2`. The atlas therefore shares a group identity while preserving role,
construction and extra-structure boundaries in relations and adjudications.

The scan excludes its own generated atlas directory to avoid self-amplifying
counts. Oversized skipped files are recorded as explicit coverage gaps. The
scan authority is `candidate_extraction_not_promoted`: a cluster is a bounded
review object, not a mathematical assertion.

Mention records store exact path, line and matched alias rather than copying
source prose. The query tool hydrates the current source excerpt on demand.
Relationship candidates retain their extracted excerpts because predicate and
polarity review depends on the sentence that produced them.

Reviewed clusters move into a separate adjudication register keyed by a stable
signature of sorted group IDs, predicates and polarity. The register records
whether a cluster was promoted, corrected for a hidden global form, retained
as a qualification, deferred to a future external-object layer or rejected as
a false positive. Scan regeneration therefore does not erase review, while a
verifier detects stale cluster identities and evidence links.

The external-object register gives Lie algebras, root systems,
representations, homogeneous spaces, finite coset carriers, vector bundles,
cohomology groups and associative algebras their own typed identities. Its
relations can reference both catalogue groups and external objects, preventing
an expression such as `Sp(4,R)/U(2)` from being flattened into an isomorphism
between `Sp(4,R)` and `U(2)`. The same boundary distinguishes a bundle
isomorphism such as `T CP^2 ~= Hom(L,Q)` from a group isomorphism, a space
isomorphism such as `Gr_C(2,3) ~= CP^2` from either presentation, and a Hecke
algebra from the groups that define its double cosets. These relations are not
added to the group-map register: an action on a space, possession of a Lie
algebra, realization of a representation, or isomorphism of associative
algebras is not a group homomorphism.

The compact rank-two seam is deliberately stratified. `Spin(5) ~= Sp(2)` is
an isomorphism of compact simply connected Lie groups; `Spin(5) -> SO(5)` is
a central double cover; compact `sp(2) ~= so(5)` is a real-Lie-algebra
isomorphism; and `B2 ~= C2` is a root-system isomorphism exchanging long and
short conventions. The parallel split seam `Spin_0(2,3) ~= Sp(4,R)` is kept
separate. A common complexification does not erase real form, Killing
signature, global form, positivity, or representation data.

Ambient linear groups are also map-explicit. The defining representation
places `Sp(4,R) < GL(4,R)`, `Sp(4,Q) < GL(4,Q)`,
`Sp(4,Z) < GL(4,Z)` and `Sp(4,3) < GL(4,3)`. Scalar extension supplies the
separate `Z -> Q -> R` ladders. These arrows explain why rational or real
conjugacy can hold while integral conjugacy fails, and why conjugacy in a
general-linear ambient group need not preserve the selected symplectic form.
The parallel `Co0 < GL(24,Z)` arrow records the faithful Leech-lattice
representation; it does not identify the entire ambient integral group with
the Leech isometry group.

The mixed-level finite seam is now a commuting CRT diagram rather than a
typographical product.  Entrywise reduction maps `Sp(4,Z)` onto
`Sp(4,Z/46Z)`, and the Chinese remainder coordinates identify the latter with
`Sp(4,F2) x Sp(4,F23)`.  Projection after mod-46 reduction is checked against
direct reduction mod 2 and mod 23, and each factor inclusion/projection has an
identity roundtrip.  On the mod-23 side the full composable ladder is
`Dic_11 < SL(2,F23) ~= Sp(2,F23) < Sp(4,F23) ~= Spin(5,F23)`.  The two
isomorphisms and the two selected inclusions remain different map kinds;
particularly, the final B2=C2 seam is simply connected and does not silently
replace `Spin(5,F23)` by `SO(5,F23)` or `PSp(4,F23)`.

The abelian cross-prime seam keeps three levels separate.  As a group,
`V4 x (C3 x C3) ~= C6 x C6` by componentwise CRT, and the atlas records both
primary and invariant-factor coordinate routes.  The corpus object `(A,q)` is
instead a finite quadratic module: forgetting `q` yields that underlying
group, but the group alone does not recover the refinement.  Finally `(A,q)`
is the discriminant form of the even lattice `<-2>^2 + U(-3)`, with determinant
`-36`, signature `(1,3)` and normalized Gauss sum `-i`.  Its quadratic values
lie in `mu12`; this makes `C12` a value group, not a `C12 x C12` state group.
The Lorentzian lattice is a mathematical realization, not an automatic
spacetime identification.

The order-72 shell seam is now executable rather than a name match.  For the
plus-type quadratic form `q=x1*x2+x3*x4` on `F2^4`, exhaustive enumeration
finds 72 orthogonal matrices.  The six nonsingular vectors form two disjoint
triangles under the polar pairing, and the orthogonal action is the full graph
automorphism group.  Thus `O+(4,2) ~= Aut(2 K3) ~= S3 wr C2`, with normal base
`S3 x S3` and a noncentral `C2` that swaps the factors.  Both coordinate `S3`
embeddings, their identity and cross-projection laws, the normal-base kernel,
and the swap-section roundtrip are explicit maps.  This finite characteristic-
two orthogonal group is not a real orthogonal Lie group, and the two factor
labels depend on ordering the two triangles.

Two smaller subgroups of that shell are now separated rather than conflated.
The block-preserving base is the order-36 direct product `S3 x S3`.  Its
matched-parity fiber product `S3 x_C2 S3` is the normal index-two kernel of
the parity-mismatch character; it has order 18, internal form
`(C3 x C3) semidirect C2` with simultaneous inversion, and a diagonal `S3`
of index three which is not normal.  Each coordinate projection gives a split
exact sequence with kernel `C3`.  By contrast, a selected three-plus-two flag
has stabilizer `S3 x C2` of order 12 and index six in `O+(4,2)`.  That flag
stabilizer is nonnormal and depends on the selected flag.  In particular, the
order-18 arithmetic binary image is not the order-12 flag stabilizer, despite
their nearby appearances and shared `S3`/`C2` notation.

The real rank-one seam is likewise map-explicit. `SU(1,1) ~= SL(2,R)` uses a
Cayley intertwiner, while `Spin_0(1,2) ~= SL(2,R)` uses the determinant-
preserving action on real symmetric two-by-two matrices. `Spin_0(1,2)` then
double-covers `SO_0(1,2)` and embeds in `Spin_0(2,3)` only after the corpus's
signature-(1,2) section is selected. The atlas records both routes from the
rank-one spin group into `SO_0(2,3)` but does not assert their equality merely
because their endpoints agree.

The adjacent pseudo-unitary seam is component- and object-aware. The corpus's
one-parameter boost belongs to `SO_0(1,1)`, the identity component of the
two-component group `SO(1,1)`, and the corresponding Lorentz carrier is
likewise separated into `SO_0(1,2)` and full `SO(1,2)`. Realification embeds
`U(1,1)` in `Sp(4,R)` after choosing the compatible complex structure and
Hermitian form. Its maximal compact subgroup is `U(1) x U(1)`, but
`U(1,1)/(U(1) x U(1))` is a homogeneous disk, not a quotient group. A
selected `C3 < U(1,1)` therefore supplies a composable finite-to-continuous
path without claiming that one finite turn uniquely forces the full envelope.

The selected-section seam now distinguishes the factors, stabilizer and orbit.
For a nondegenerate signature-(1,2) block with signature-(1,1) orthogonal
complement, the connected block-diagonal stabilizer in `SO_0(2,3)` is exactly
`SO_0(1,2) x SO_0(1,1)`, of dimension four.  Its factor maps and inclusion in
the ambient group are explicit, while the pointwise stabilizer is the
`SO_0(1,1)` factor.  Because the product stabilizer is nonnormal, the
six-dimensional space `SO_0(2,3)/(SO_0(1,2) x SO_0(1,1))` is typed as a
homogeneous orbit rather than a quotient group.  This SO identity-component
statement neither chooses a preferred section nor determines the central
kernel of its inverse image in `Spin_0(2,3)`.

The compact four- and eight-dimensional seams retain their global forms.
`Spin(4) ~= SU(2) x SU(2)` is an isomorphism of simply connected compact Lie
groups, whereas `Spin(4) -> SO(4)` has diagonal central kernel `C2`.
Similarly `Spin(8) -> SO(8)` is a chosen central quotient. The full `S3`
triality acts by outer automorphisms on `Spin(8)`/type `D4`, permuting the
vector and two half-spin representations; choosing one of the three central
`C2` kernels to form a fixed `SO(8)` quotient breaks that full permutation
symmetry unless the kernel choice is carried along.

Rank-four unitary notation follows the same rule as ranks two and three.
`1 -> SU(4) -> U(4) -> U(1) -> 1` is split, but its standard section is
noncentral. It is not the direct-product assertion `U(4) = SU(4) x U(1)`.
A subgroup generated by `SU(4)` and finitely many determinant phases may be a
proper finite extension and must not be silently completed to all of `U(4)`.
The corpus instance is now explicit:
`H_4^(3) = {h in U(4) : det(h) in mu3} ~= SU(4) x C3`.  Its restricted
determinant sequence is split *centrally*, it has three connected components,
and it embeds as a proper normal subgroup of `U(4)`.  This is deliberately
distinct from the split but noncentral `U(4) -> U(1)` determinant sequence.
The selected gauge-dressed generator adds a second, non-equivalent seam:
`C9 < H_4^(3)`.  Its cube generates the `C3` intersection with the `SU(4)`
identity component, while restricted determinant maps the whole `C9` onto the
component `C3`.  Thus the ambient three-component sequence splits through the
central scalar `C3`, but the selected cyclic sequence `C3 -> C9 -> C3` does
not split.  Retaining both maps prevents the convenient abstract product
description from erasing the order-nine lift data.

“Conjugate `C3` sectors” now has an explicit predicate boundary.  Since `C3`
is abelian, its inner conjugacy classes are singletons.  The exchange
`h -> -h` is instead the nontrivial element of `Aut(C3) ~= C2`, with element
orbits `{0}` and `{1,2}`.  Adjoining that inversion gives the split extension
`C3 semidirect C2 ~= S3`; the kernel and section composites are recorded
separately.  In the relevant response claims, `A5` denotes a programme gate,
not the alternating group, so no `A5`--`C3` relationship is inferred from
their textual proximity.

The rank-two carrier ladder is also choice-aware. `Spin_0(2,3)` enters
`Spin_0(2,4)` as a selected stabilizer, `Spin_0(2,4) ~= SU(2,2)` is an
exceptional global-form isomorphism, and `SU(2,2)` enters `SU(3,3)` through a
selected signature-(2,2) block fixing one positive and one negative direction.
The resulting composition is a valid group map. It is not a declaration that
the choices are canonical or that the full `SU(3,3)` carrier is physically
activated.

Low-rank circle models illustrate why endpoint identity is insufficient.
`Spin(2) ~= U(1)` and `SO(2) ~= U(1)` are both valid isomorphisms, while
`Spin(2) -> SO(2)` is a double cover. Transporting that cover through the
`SO(2) ~= U(1)` model gives `z -> z^2`, not the separately named
`Spin(2) ~= U(1)` isomorphism.

Product typography is not a global-form proof. For ranks two and three the
atlas separately records the covering product `SU(n) x U(1)`, its diagonal
central kernel `C_n`, the quotient `U(n)`, and the split but noncentral
determinant sequence `1 -> SU(n) -> U(n) -> U(1) -> 1`. Thus the residual
subgroup often written `SU(3) x U(1)` inside `SU(4)` is represented globally
as `U(3)` with an explicit determinant-compensated embedding. A physical
charge lattice may impose a further faithful-global-form question.  The whole
covering-product map, its killed diagonal `C3`, and the two factor routes into
`SU(4)` are separately checked compositions.  This global-form correction does
not make residual `U(3)` symmetry protect response equalities that the corpus
shows are lost after ordinary breaking; map structure and dynamical protection
remain different claims.

The nonabelian product `SU(3) x SU(2)` is independently named because it acts
throughout the corpus on module blocks and intertwiner spaces. It embeds at
unit hypercharge in the three-factor Standard Model cover. Its image remains
injective after the diagonal `C6` quotient because that kernel has trivial
intersection with the unit-hypercharge slice; this does not reconstruct the
missing `U(1)` factor or its charge assignments.

For the locking sector, `SO(3) x SO(2)` is a connected product with three
relevant but unequal circle maps: an axial circle in the `SO(3)` factor, the
second factor itself, and the selected-axis diagonal circle. The latter is a
nonnormal stabilizer, so `(SO(3) x SO(2))/SO(2)_diag` is typed as a
three-dimensional homogeneous space rather than a quotient group.

The line-plus-plane seam similarly distinguishes `U(1) x U(2)` from
`S(U(1) x U(2))`. The latter is the product-determinant kernel, isomorphic to
`U(2)`, and is the selected-line stabilizer in `SU(3)`; the former is the full
block stabilizer in `U(3)`. Both homogeneous presentations lead to `CP^2`, but
their ambient groups and stabilizer embeddings remain explicit:
`U(3)/(U(1) x U(2))` and `SU(3)/S(U(1) x U(2))`.  Transitivity explains why a
group-invariant functional of one projective line cannot select an absolute
line; the orbit relation is geometry, not an orientation mechanism.

The external-object scan retains every exact curated-alias mention, but adds a
line to the relationship-review queue only when a catalogue group or a typed
predicate co-occurs. Algorithm version 2 introduced this distinction so bare
mentions remain discoverable without inflating the relationship backlog.
Algorithm version 3 also scans a one-level-unescaped view of source lines and
recognizes `~=` as an isomorphism marker. This makes mathematical aliases
stable across Markdown and JSON/source string escaping while retaining the
original source line as evidence.

Algorithm version 7 makes whitespace around explicit multiplication aliases
optional and permits representation subscripts immediately after a matched
product. Thus `SU(3)\\times SU(2)`, spaced variants, and labelled forms such
as `SU(3)_c\\times SU(2)_L` resolve both their factors and their named product
without weakening ordinary word aliases.

Algorithm version 8 tokenizes cyclic-group notation before alias resolution.
Plain `Z6`, subscripted `Z_6`, blackboard-bold `\\mathbb Z_6` and Unicode
`ℤ_6` therefore resolve through the same normalized cyclic identity without
using the common word `mathbb` as an alias-search anchor. This broadens
notation coverage while preserving scanner performance and exact source
evidence.

Algorithm version 9 permits representation labels after every factor in an
explicit product alias. Consequently `SU(3)_c\\times SU(2)_L\\times U(1)_Y`
resolves the named three-factor cover as well as its factors; the labels are
retained in the matched evidence but do not create distinct group identities.

Algorithm version 10 tokenizes TeX-style short finite-group spellings such as
the reviewed `S_3` alias in explicit isomorphism contexts before alias
resolution when that TeX spelling has been explicitly reviewed as an alias.
This closes the short-token anchor gap without automatically
interpreting every indexed programme gate or coordinate as a group:
root-system, programme-gate and coordinate uses remain controlled by the
context filters and ambiguity register.

Corpus evidence and candidates default to 25 records and return `total`,
`offset`, `limit`, `returned` and `nextOffset`. The underlying scan retains all
records; paging changes presentation, not evidence.

Candidate evidence IDs in scan version 1 are location-sensitive: they hash the
source path, line and content.  Consequently an insertion earlier in a scanned
source can change later evidence IDs even when those later lines are
mathematically unchanged.  Adjudication verification detects the stale
references, and regeneration plus explicit reconciliation is required.  A
future schema may separate stable content identity from mutable source
location; version 1 does not conceal that limitation.

`path` defaults to `morphism`: only homomorphisms, inclusions, quotient maps,
covers and canonical product maps are traversed. `incidence` also follows
non-composable associations such as “is a composition factor of” or “is the
Weyl group of”. Keeping those modes separate prevents an attractive graph path
from pretending to be a composable mathematical map.

`map-path` is stricter still: it traverses only stable map records generated
from reviewed relationships. Isomorphisms may be traversed in reverse; other
maps retain their declared direction. Curated compositions are separately
verified so their adjacent codomains and domains match exactly. A named map
does not replace its formula or proof—it provides the durable identity needed
to discuss and test composition without conflating unrelated occurrences of
the same abstract group.

Map-register algorithm version 2 completes the elementary product algebra.
Each declared direct product now emits both a factor inclusion and coordinate
projection for every factor; every split short exact sequence emits its
declared splitting section; and every semidirect product emits the quotient
projection to its acting factor. Named roundtrips test `projection_i` after
`inclusion_i` as identity and a representative cross projection as trivial.
These maps remain presentation-aware: a coordinate map belongs to the
specific reviewed product decomposition and is not inferred from an abstract
isomorphism alone.

The residual phase seam is intentionally typed in three layers. The original
comparison freedom is the two-torus `U(1) x U(1)`. Octonion-product
compatibility restricts its colour coordinate to `C3`, while the weak Jordan
observable algebra remains blind to the second common phase, giving the
unconditional subgroup `C3 x U(1)`. Only an additional identified common
five-volume reduces the second coordinate to its sign subgroup and yields the
conditional finite subgroup `C3 x C2 ~= C6`. The catalogue therefore records
`C6 < C3 x U(1) < U(1) x U(1)` with the first inclusion conditional, rather
than letting a desirable sixfold remainder erase the missing sewing datum.
This residual intertwiner group is also kept distinct from the faithful
Standard Model gauge kernel unless the compensating hypercharge phase has
been supplied.

The Monster--Baby-Monster--Tits locality is represented as a deliberately
broken square. The Tits simple group `^2F4(2)'` is the normal index-two
derived subgroup of its full automorphism group `^2F4(2)=T:2`; that full
group is the second factor of the ATLAS maximal subgroup
`S4 x ^2F4(2) < B`. Independently, `2.B=C_M(2A)` is a Monster subgroup and
fits the nonsplit central sequence `1 -> C2 -> 2.B -> B -> 1`. The quotient
arrow must not be reversed: the Baby Monster is involved in the Monster but
does not embed in it, while the Tits group does occur in the Monster through
an independently classified embedding.

This finite-group structure also carries a corpus boundary. Restricting the
Baby-Monster SVOA action to the Tits subgroup is mathematically available,
but no current catalogue edge identifies the outer involution of `T:2` with
Monster `2A`, fermion parity or an Ising defect. Moreover the Tits group has
no factor 23 in its order, so it cannot host the order-23 rail used by the
moonshine joined bridge.

The occurrence register resolves the existence part of the compatibility
question without collapsing conjugacy classes. Pull the selected `T < B`
back along `2.B -> B`. The resulting central extension

```text
1 -> C2(2A) -> T_tilde -> T -> 1
```

splits because the nonabelian simple Tits group is perfect and its Schur
multiplier is trivial. Hence `T_tilde ~= C2 x T`. Since `Hom(T,C2)` is
trivial, the complement is unique relative to the selected preimage and
gives a compatible path `T < 2.B < M`. What remains open is the
conjugacy-class identification of that compatible lift among the classified
Monster Tits occurrences. The literature recovery has now identified the full
preimage of `S4 x T:2` as the CTblLib table `(GL(2,3) x T).2`. Its
`GL(2,3)` factor is the plus-type cover `2^+.S4`, not the binary-octahedral
minus-type cover. The final `.2` action remains attached to the library
identifier rather than being guessed from the name.

The group pullback is paired with a typed vertex-algebra boundary. A selected
Ising vector `e` in the Moonshine VOA generates `Vir(e) ~= L(1/2,0)`; its
Miyamoto involution is Monster class `2A`, with centralizer `2.B`. The
commutant

```text
V_B = Com_{V^natural}(Vir(e))
```

is the Baby Monster VOA of central charge `47/2`, and its effective
automorphism group is `B`. The external-object register keeps the commutant
operation, the symmetry centralizer and the quotient `2.B -> B` as three
distinct maps. It also records the established
`1 + 1 + 4371 + 96255 + 96256` restriction of the Monster Griess space to
`2.B`; the subsequent branchings to the selected Tits occurrences are now
bounded CTblLib restriction tasks with all principal tables and fusion edges
available. Their corpus role and non-identification boundaries are recorded in
the [corpus bridge](../moonshine-program-lattice/monster-baby-tits-corpus-bridge.md).

## Boundary

This is an extensible seed, not a replacement for GAP, LMFDB, the ATLAS of
Finite Group Representations or a proof assistant.  External identifiers and
formal witnesses should be added rather than copied into a shadow database.
The catalogue records relationship identity and provenance; source systems
remain authoritative for their computations and proofs.
