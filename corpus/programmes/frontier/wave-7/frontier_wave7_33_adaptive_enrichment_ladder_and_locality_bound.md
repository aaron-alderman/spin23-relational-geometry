# Frontier Wave 7.33: The Adaptive Enrichment Ladder and a Locality Bound

**Date:** 24 October 2026  
**Status:** constructive adversarial benchmark; three independent information losses isolated  
**Ledger:** [enrichment ladder v1](monster_lean_enrichment_ladder_v1.json)  
**Verifier:** [enrichment-ladder verifier](../../../../verification/verify/verify_monster_lean_enrichment_ladder.mjs)

## Result

Sixteen canonical expression trees were chosen so that each proposed detector is defeated by a specific pair rather than rewarded only on easy examples. The resulting refinement ladder is:

| Detector | Retained information | Distinct signatures | Collision pairs | Largest fibre |
|---|---|---:|---:|---:|
| `D0` | capped fifteen-count Monster address | 5 | 20 | 4 |
| `D1` | `D0` plus constant/literal leaf multiset | 12 | 4 | 2 |
| `D2` | `D1` plus role-labelled local edge multiset | 14 | 2 | 2 |
| `D3` | `D2` plus rooted role-path leaf multiset | 16 | 0 | 1 |

Thus the benchmark separates three detector resources that a global constructor count conflates: **name**, **ordered role**, and **nonlocal correlation**. Rooted path information is sufficient on this finite challenge, but no claim of global injectivity follows.

## 1. Every enrichment has a witness of necessity

The ladder is not an arbitrary accumulation of fields.

1. `Nat` and `Bool` have the same constructor count. Their separation requires a stable leaf label.
2. `Nat → Bool` and `Bool → Nat` have the same leaf-label multiset. Their separation requires domain/body roles.
3. `Eq Nat 2 0` and `Eq Nat 0 2` survive the chosen local edge bag because the two literal leaves occupy repeated application neighbourhoods whose global positions have been erased.
4. `(Nat → Bool) → (Unit → String)` and `(Nat → String) → (Unit → Bool)` have the same leaves and the same multiset of role-labelled local edges. Their difference is the correlation between labels across separated subtrees.

The fourth pair is the decisive locality witness. A bag of radius-one observations can know every local transition represented here and still fail to know how those observations are joined into a rooted whole.

## 2. The correct object is a fibre refinement

The Monster address should remain the coarse carrier rather than being asked to become an identifier. Enrichment then acts only on an impure fibre:

\[
X\xrightarrow{D_0}A_0,
\qquad
A_0\xleftarrow{}A_1\xleftarrow{}A_2\xleftarrow{}A_3,
\]

where each finer detector retains a scar killed by the preceding quotient. Operationally:

- compute the canonical Monster address;
- attach a stable leaf-label digest when the address fibre is semantically mixed;
- attach a role-labelled transition digest if that refined fibre remains mixed;
- increase rooted observation depth only for the residual ambiguous fibre;
- retain a full canonical-expression hash as a control ceiling, not as the scientific explanation.

This is the quotient-scar calculus applied recursively. The detector cost follows observed impurity instead of being paid uniformly over the full 424,488,960-cell carrier.

## 3. What the zero-collision row does and does not establish

`D3` is injective on the sixteen benchmark objects because the complete rooted role paths reach every distinguishing rearrangement in these shallow trees. This gives a finite upper bound for this benchmark and a lower bound on the depth needed by the displayed adversarial pairs.

It does **not** establish that any fixed-radius multiset identifies arbitrary Lean expressions. For every bounded observation radius, larger trees can rearrange equally decorated neighbourhoods beyond that radius. Nor does injectivity on syntax imply semantic equivalence: definitional equality still depends on a declared normalization policy, and theorem meaning is not exhausted by a syntax-tree digest.

The honest detector boundary is therefore:

\[
\text{coarse shape}
\;<\;
\text{label incidence}
\;<\;
\text{local ordered structure}
\;<\;
\text{rooted correlation}
\;\leq\;
\text{canonical serialization}.
\]

The first four are interpretable measurements. The last is the control at which the detector has ceased to compress the expression in any substantive sense.

## 4. Implication for the admissibility frontier

The filled/unfilled map now has another axis. A cell can be structurally reachable and canonically stable while remaining **detector-impure**. Its apparent occupancy is then a quotient fibre, not a single semantic point. Increasing structural resolution splits such a cell into daughter cells; it does not discover new formal Monster addresses.

This distinguishes two frontier motions:

- **reachability expansion** fills a previously empty coarse address;
- **observability refinement** resolves hidden multiplicity inside an occupied address.

Only the first changes the filled subset of the original finite box. The second changes the atlas lying over that box. Treating both as “more occupied cells” would erase precisely the vertical fibre structure that the corpus's admissibility programme is meant to preserve.

## 5. Next executable gate

The next no-new-physics experiment is to run this adaptive hierarchy over a source-native declaration corpus:

1. normalize each declaration under one pinned Lean environment and transparency policy;
2. measure address-fibre purity by declaration identity, type family and dependency component;
3. refine only mixed fibres through `D1`, `D2` and increasing rooted depth;
4. report collision reduction, digest cost, saturation and normalization mobility separately;
5. hold out renamed and definitionally equivalent variants as controls.

If the reported 1,979-declaration / 908-address dataset becomes available, it is the natural target. Until then, a generated, kernel-checked type corpus can measure scaling but cannot reproduce that census.

## Boundary

This wave proves an information hierarchy and a finite locality witness. It does not prove a universal minimal detector, recover the public declaration census, identify a Monster representation, supply Hecke relations, or promote the fold to physical dynamics. The transferable result is methodological: collision fibres should be refined by the cheapest scar that distinguishes them, and every claimed detector sufficiency must be tested against rearrangements beyond its observation radius.
