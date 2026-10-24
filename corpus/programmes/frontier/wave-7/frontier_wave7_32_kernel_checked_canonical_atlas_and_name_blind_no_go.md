# Frontier Wave 7.32: A Kernel-Checked Canonical Atlas and the Name-Blind No-Go

**Date:** 24 October 2026  
**Status:** constructive Lean 4.35.0 atlas; canonicalization succeeds locally but semantic identification fails structurally  
**Atlas:** [typed canonical atlas v1](monster_lean_typed_canonical_atlas_v1.json)  
**Lean source:** [MonsterLeanTypedAtlas.lean](../../../../verification/lean/MonsterLeanTypedAtlas.lean)  
**Verifier:** [typed-atlas verifier](../../../../verification/verify/verify_monster_lean_typed_canonical_atlas.mjs)

## Result

A pinned Lean 4.35.0 run elaborated and type-checked 32 closed expressions in thirteen declared semantic classes. Each expression was profiled both before and after a recursive weak-head normalization policy. The finite atlas contains:

- 32 kernel-checked expressions;
- 14 distinct raw addresses;
- 7 distinct canonical addresses;
- 16 expressions moved by canonicalization;
- all eight multi-presentation semantic classes collapsed to one canonical address;
- three canonical collision groups containing ten pairs of distinct semantic classes.

Canonicalization therefore repairs the tested representation mobility, but it cannot make the fifteen-count fold identifying.

## 1. What normalization repairs

The policy recursively applies Lean kernel weak-head normalization, erases metadata, descends through applications and binders, and reduces reconstructible projections while respecting loose de Bruijn variables under binders. It sends:

\[
(\lambda X:\mathrm{Type}.X)\,\mathrm{Nat},
\quad
\operatorname{let}X:=\mathrm{Nat};X,
\quad
\operatorname{match}\ \mathrm{true}\ \operatorname{with}\cdots
\]

to the same profile and address as `Nat`. Compact and constructor-expanded numerals inside equality types also meet at address 57,528. Alpha-renamed dependent products remain together. In this sample, every explicitly paired definitional presentation is stabilized.

The raw-to-canonical contraction is measurable:

\[
14\ \text{raw cells}\longrightarrow 7\ \text{canonical cells}.
\]

This confirms the proposal from wave 7.31: normalization should be treated as a map between two atlases, not silently assumed.

## 2. The name-blind no-go

The profile increments the `const` coordinate but does not retain the constant's name or universe arguments. Consequently, replacing a constant by another constant leaves the profile unchanged unless the replacement crosses one of the three specially flagged names.

This gives immediate canonical collisions:

| Canonical address | Distinct semantic classes |
|---:|---|
| 3 | `Nat`, `Bool`, `Unit`, `String` |
| 45 | `Nat → Nat`, `Bool → Bool`, `Nat → Bool` |
| 57,528 | `Eq Nat 2 2`, `Eq Nat 0 0` |

The problem is structural rather than a small-sample accident. Any two normalized expressions with the same constructor skeleton and the same three logical-presence bits collide after arbitrary substitutions among unflagged constant names. No increase in sample size can repair information that the detector never records.

## 3. Correct interpretation of the machine

After normalization, the fold is a bounded **constructor-shape signature**. It can classify complexity strata, saturation patterns and coarse logical incidence. It cannot classify Lean meanings or declaration identities.

That distinction reorganizes the filled/unfilled frontier:

\[
\text{semantic objects}
\longrightarrow
\text{canonical expressions}
\longrightarrow
\text{constructor-shape addresses}.
\]

The first arrow may identify definitionally equal presentations. The second deliberately quotients away names, adjacency, binder placement beyond counts and all overflow magnitude. Its fibres are therefore expected to be large and semantically heterogeneous.

## 4. The minimal enrichment

The next detector should not merely add more global counts. The cheapest useful scar is a constant-incidence channel. Candidates, in increasing order of retained structure, are:

1. the number of distinct constant names;
2. a stable multiset digest of constant names and universe arities;
3. a dependency-coloured constructor-transition matrix;
4. a bounded neighbourhood hash around each flagged logical constant;
5. the full canonical expression hash as a control ceiling.

The admissible design objective is now explicit: split known cross-semantic collision fibres while preserving the normalization stability established here. A detector is useful if it raises semantic purity without simply becoming an injective serialization of the original expression.

## 5. Reproduction boundary

The committed `.out` file is the captured output of the pinned Lean run, and the atlas records the SHA-256 of its Lean source. The Node verifier independently recomputes every capped prime address, closure condition and tree-Euler identity. Re-running the kernel stage requires Lean 4.35.0:

```text
lean verification/lean/MonsterLeanTypedAtlas.lean
node verification/generate/generate_monster_lean_typed_atlas.mjs --input verification/lean/MonsterLeanTypedAtlas.out --write
node verification/verify/verify_monster_lean_typed_canonical_atlas.mjs
```

## Boundary

This atlas is constructive but finite. It proves that the selected normalization policy collapses the tested definitional families and that name blindness creates genuine semantic collisions. It does not estimate collision rates in the reported 1,979 declarations, reproduce the 908-address census, establish a canonical form for all Lean expressions, or supply Monster, Hecke or physical dynamics.
