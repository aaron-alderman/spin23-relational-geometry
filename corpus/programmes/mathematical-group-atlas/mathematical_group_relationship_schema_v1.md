# Mathematical Group Relationship Schema v1

## Object boundary

A catalogue object is either:

- a **concrete group**, with a specific carrier up to declared isomorphism;
- a **parameterized family**, with parameters and exception conditions; or
- a **classification branch**, which collects families but is not itself a
  group.

Lie algebras, root systems, representations, spaces and group actions are not
groups merely because a group is associated with them.  They appear as typed
relationship witnesses or external objects.

## Relationship record

Each relationship records:

```text
(id, kind, participants, properties, status, statement, witnesses,
 provenance, caveats, falsifier)
```

`participants` is role-labelled.  Roles are part of the semantics:

| Kind | Required roles | Meaning |
|---|---|---|
| `isomorphism` | `left`, `right` | a specified abstract or structured group isomorphism exists |
| `subgroup` | `subgroup`, `supergroup` | an embedding exists; `normal` and `index` are separate properties |
| `short_exact_sequence` | `kernel`, `middle`, `quotient` | `1 → K → G → Q → 1`, with split and central flags retained |
| `direct_product` | two or more `factor`, one `result` | result is isomorphic to the direct product of the factors |
| `semidirect_product` | `normal_factor`, `acting_factor`, `result` | the action and split extension must be named |
| `cover` | `cover`, `base`, `kernel` | surjective covering homomorphism with declared degree |
| `weyl_group` | `weyl_group`, `lie_group`, `maximal_torus` | `W(G,T)=N_G(T)/T`; not a homomorphism from all of `G` |
| `centralizer` | `centralizer`, `ambient` | centralizer of a declared element or subgroup |
| `automorphism_group` | `group`, `automorphism_group` | a group identified with the full or specified automorphism group |
| `composition_factor` | `factor`, `group` | a simple factor occurs with declared multiplicity in a composition series |
| `action` | `actor`, `acted_on` | action with kernel, image and faithfulness retained |
| `homomorphism` | `source`, `target` | a named map; injectivity, surjectivity, image and kernel remain explicit properties |
| `non_embedding` | `source`, `target` | a scoped embedding or identification is ruled out |

## Exactness and arithmetic

For finite groups, executable checks enforce:

- isomorphic groups have equal order;
- subgroup order divides supergroup order;
- a supplied index equals the order ratio;
- `|G|=|K||Q|` for a short exact sequence;
- direct-product order is the product of factor orders;
- finite covering order is degree times base order.

These checks are necessary, never sufficient.  Equal order does not imply
isomorphism, divisibility does not construct an embedding, and an abstract
isomorphism does not preserve a representation, grading, lattice or physical
interpretation.

An arithmetic subgroup and its ambient real Lie group are also different
objects. For example, `Sp(4,Z) -> Sp(4,R) ~= Spin_0(2,3)` is typed as a
discrete lattice inclusion followed by a real Lie-group isomorphism. The
integral group is not thereby isomorphic to either real group, and transport
through the second arrow retains discreteness, arithmeticity, covolume and
the chosen global form.

## Stable maps and composition

Map-bearing relationships generate stable arrow records:

```text
(map-id, map-type, domain, codomain, relation-id, injective, surjective,
 invertible, formula, construction, witnesses, caveats, falsifier)
```

The register emits arrows only where the relationship semantics supplies one:
isomorphisms, subgroup inclusions, exact-sequence kernel and quotient maps,
product-factor inclusions, covers, centralizer inclusions and declared
homomorphisms. Composition factors, Weyl-group associations and automorphism-
group identifications remain incidence relationships; they do not silently
become homomorphisms.

A declared composition lists stable map IDs and directions. Verification
requires each codomain to equal the next domain. Inverting a step is permitted
only for a map marked invertible. This is a typing check, not a proof that an
unstated formula has the intended physical or representational meaning.

## Status and negative knowledge

- `established`: standard mathematical result with external provenance;
- `corpus_established`: executable or exact corpus witness exists;
- `open`: a typed candidate or condition remains unresolved;
- `negative`: the scoped relationship is ruled out.

## Token ambiguity boundary

An unresolved group-like token is not automatically a missing group. The
separate ambiguity register classifies reviewed spellings as underspecified
groups, identity-component ambiguities, non-group objects, overloaded labels,
families, catalogue candidates, alias candidates or encoding variants. These
classifications are routing policy, not mathematical identifications. The raw
unresolved list remains intact, while classified and unclassified partitions
make the remaining work measurable and prevent labels such as `A11` or
lattices such as `U(-3)` from being promoted as groups by lexical coincidence.

An absent edge means only “not catalogued.”  It never means no relationship
exists.

Compact and split real forms are distinct identities even when their
complexified root systems agree. In particular, the atlas separately types
compact `Spin(5) ~= Sp(2)`, split `Spin_0(2,3) ~= Sp(4,R)`, their Lie
algebras, and the `B2 ~= C2` root-system seam. Root data alone cannot promote
a cross-real-form isomorphism, and Lie-algebra identity alone cannot erase a
central cover such as `Spin(5) -> SO(5)`.

Subspace-induced orthogonal and spin inclusions must state the selected
nondegenerate subspace or complement. Thus the rank-one chain through
`Spin_0(1,2)` records its signature-(1,2) section explicitly; it is not
promoted as a canonical embedding independent of that choice. Two composed
routes with the same endpoints are retained as distinct maps until an
intertwining or commuting-square witness is supplied.

Carrier nesting requires one further boundary. A selected block inclusion may
be a valid injective homomorphism while the larger carrier remains physically
inactive. Records must therefore preserve both the subspace-selection witness
and any activation caveat. Algebraic admissibility of a composition does not
promote a modelling or physical interpretation.

Distinct maps may share both domain and codomain. In particular, transporting
a covering map through endpoint isomorphisms does not turn it into a chosen
isomorphism between the same abstract circle groups. Kernel, degree, formula
and witnesses remain part of map identity.

Factor notation must also distinguish a product from a central product or
quotient. If `G x H` maps onto a named global group with a diagonal finite
kernel, the product, kernel inclusion, quotient map and any later subgroup
embedding receive separate identities. A split exact sequence with the same
three abstract families does not erase that distinction when its section is
noncentral.

`S(G x H)` is never inferred to be the full product. It denotes the kernel of
the declared determinant or character constraint and receives its own group
identity, kernel inclusion and—when available—an explicit isomorphism to a
simpler model. The presentation and embedding remain meaningful even when the
abstract kernel is isomorphic to an already catalogued group.

Repeated use of one abstract subgroup type does not identify its embeddings.
Factor, axial, block and diagonal copies must receive distinct relationship or
composition identities. If the chosen copy is nonnormal, `G/H` belongs in the
external homogeneous-space layer and must not generate a quotient-group map.

A centralizer description must also separate construction from placement. If
`C_G(x)` has a named product structure `A x B`, the product relation constructs
the centralizer group, while a centralizer relation includes that group in the
ambient `G`. Factor-to-ambient paths are declared compositions of those maps.
Character tables, traces and insertion families associated with the same
centralizer remain representation-level objects and do not silently generate
additional group homomorphisms.

A cyclic lift and its faithful quotient must retain both the kernel and the
ambient gauge context. In particular, the non-split central sequence
`1 -> C3 -> C9 -> C3 -> 1` does not contradict a split order-three complement
obtained only after dressing the generator by a connected gauge
transformation. Equal abstract endpoint groups also do not make the composite
of kernel inclusion and quotient an identity: exactness makes that composite
the trivial homomorphism. Bordism groups, discriminant groups and state-space
carriers that happen to be abstractly cyclic remain external objects unless
the source supplies the required group-to-group map.

Finite abelian structure must be retained at the invariant-factor level.
An expression such as `C4 x C2^3` identifies a product group of order 32; it
does not assert `C4 ~= C2`, and repeated `C2` factors must not be deduplicated.
For coprime cyclic factors, `C6 ~= C2 x C3` supports two distinct split central
exact sequences, with kernels `C2` and `C3` respectively. Abstract quotient
exactness is unconditional, while interpreting either factor as a colour,
spin, gauge or dynamical sector requires separate contextual evidence.

Small-field coincidences must preserve their construction stages. Over F2,
`GL(2,2) = SL(2,2)` follows from the trivial unit group, while
`SL(2,2) = PSL(2,2)` follows from the trivial scalar centre; only then does the
faithful action on the three points of `P1(F2)` identify the result with `S3`.
These equalities are separately typed maps, not a license to collapse GL, SL
and PSL over other fields. Congruence reduction from an integral group also
retains its principal-congruence kernel even when the finite target admits a
familiar permutation-group presentation.

Odd characteristic has a different admissibility boundary. For `p = 3,5`,
minus identity remains a nontrivial central element after reduction, so the
passage `SL(2,Fp) -> PSL(2,Fp)` is a non-split central `C2` quotient rather
than an isomorphism. Only the resulting projective groups are identified with
`A4` and `A5`. A composed braid shadow must therefore retain four typed
stages—integral representation, congruence reduction, projectivization and
the finite permutation/rotation-group isomorphism—and must expose the
principal-congruence and scalar-centre kernels separately.

## Corpus dependency layer

The deterministic corpus scan is deliberately weaker than the promoted
catalogue. It records four linked views:

- exact group mentions as `(group, file, line, matched alias)` evidence;
- document dependencies listing every resolved group and relationship-candidate
  identifier used by that document;
- line-level relationship candidates retaining predicate, polarity, confidence,
  source links and excerpt; and
- candidate clusters keyed by the exact group set, predicate set and polarity.

Every scan record is traceable back to a source line. Candidate extraction is
not promotion: co-occurrence does not determine participant roles, and words
such as “not”, “quotient” or “representation” can scope only part of a
sentence. A relation enters the main catalogue only after its map, roles,
witnesses, caveats and falsifier have been reviewed.

Review decisions live outside the generated scan. They are keyed by the
cluster's stable semantic signature—sorted group identifiers, sorted
predicates and polarity—and may link to one or more promoted catalogue
relations. This preserves corrections such as an omitted central quotient
without changing the observed source text or granting authority to the
extractor.

Signatures are stable only within an extraction semantics. When a later
algorithm resolves a previously omitted product, kernel or global-form node,
the old adjudication is retained with `superseded_by_resolution`, an explicit
reason and one or more successor adjudication identifiers. Its evidence IDs
remain traceable, but only the successors are required to match current scan
clusters. This records scanner learning without rewriting review history.

## External-object boundary

Lie algebras, root systems, representations, homogeneous spaces, vector
bundles, cohomology groups and associative algebras receive stable `obj:`
identifiers in a separate register. Relations in that register use typed
references:

```text
(role, refType = group | object, ref)
```

This permits statements such as `Sp(4,R)/U(2) = H_2` to retain all three
types: an ambient group, a stabilizer group and a homogeneous space. It also
permits representation branching to name the parent representation, subgroup
and every summand without pretending any of them is a group homomorphism. It
also permits bundle constructions to retain their base, cohomology objects to
retain degree and coefficients while naming an underlying abelian group, and
Hecke/commutant algebras to retain their group and representation carriers.

External-object relations never enter the stable group-map register merely
because they contain groups. A quotient *space* is not a quotient group; an
action is not a map between groups; equal Lie algebras do not settle global
forms; and equal root systems do not transport representation conventions
without a declared weight/coroot identification.

A second deterministic scan uses curated, type-specific aliases from the
external-object register and joins them to exact group mentions at the same
source line. Its candidates and clusters remain non-authoritative. A separate
adjudication register can promote an exact typed relation, partially promote a
mixed cluster, retain a qualification, defer a missing secondary type such as
a characteristic-class or tensor-category object, or reject a false
positive. This prevents later scans from repeatedly rediscovering the same type
error. The scanner normalizes one level of escaped backslashes for matching,
but evidence always points back to the untouched source line.

## Occurrence layer

An abstract group identifier does not identify a particular subgroup,
quotient occurrence, factor coordinate, selected conjugacy class or
representation.  When those distinctions affect composition, the atlas uses
stable `occ:` identifiers in a scoped occurrence register.  Each occurrence
names its abstract `grp:` type, its ambient occurrence where applicable, its
construction and its provenance.

For example, the `S4` factor in `S4 x T:2 < B` and the `S4` factor in an
order-23 Monster centralizer have the same abstract group identifier but
different occurrence identifiers.  Similarly, the central `C2` kernel of
`2.B -> B` is the selected Monster `2A` occurrence, while the quotient `C2`
of `T:2 -> C2` is an outer-automorphism occurrence and is explicitly distinct.

Occurrence equality requires a witness.  Abstract isomorphism, equal order or
reuse of a character-table label is insufficient.  A pullback may create a
new occurrence even when its abstract group is already catalogued; the
pullback certificate must retain the selected quotient map, kernel, splitting
or obstruction data, complement choice and any unresolved conjugacy-class
gate.  Representations attach to occurrences only after the corresponding
class fusion or intertwiner has been supplied.

## CFSG layer

The finite-simple classification is represented as four branches: cyclic of
prime order, alternating, sixteen families of Lie type, and twenty-six
sporadic groups.  Classification membership does not provide subgroup or
extension data.  Conversely, composition factors do not determine the group:
extension data, actions and cohomological choices remain part of the atlas.

## Reopening conditions

Reopen a record when an identifier resolves to a different group, a parameter
exception is missing, a relationship loses its witness, a claimed exact
sequence fails arithmetic or exactness, an abstract isomorphism is being used
as a structure-preserving one, or an open/negative result changes status.
