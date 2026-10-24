# Frontier Wave 7.30: Kernel Closure and the Expression-Tree Reachability Sieve

**Date:** 24 October 2026  
**Status:** exact necessary-condition census; well-typed reachability and upstream census remain open  
**Ledger:** [Monster–Lean structural sieve v1](monster_lean_structural_sieve_v1.json)  
**Certificate:** [structural-sieve verifier](../../../../verification/verify/verify_monster_lean_structural_sieve.mjs)

## Result

The first nontrivial part of the Monster box can be classified without possessing the reported declaration export. Lean's kernel-facing expression datatype has six nullary constructors, two unary constructors, three binary constructors and one ternary constructor. If the posted profile recursively counts constructor occurrences, every finite rooted expression tree obeys

\[
N_{\rm bvar}+N_{\rm fvar}+N_{\rm mvar}+N_{\rm sort}+N_{\rm const}+N_{\rm lit}
=1+N_{\rm app}+N_{\rm lam}+N_{\forall}+2N_{\rm let}.
\]

Kernel declarations added to a `Lean.Environment` may not contain free variables or metavariables. Combining closure, the tree identity, a basic bound-variable scoping test and incidence of the three logical flags leaves at most

\[
65{,}503{,}764
\]

of the 424,488,960 formal addresses. Thus 84.5688% of the Monster divisor box is already excluded by necessary syntactic conditions. The surviving 15.4312% is an upper bound, not a census of well-typed declaration types.

## 1. The ordered exclusion census

| Stage | Addresses |
|---|---:|
| excluded because `fvar` or `mvar` is present | 318,366,720 |
| excluded by the basic bound-variable scope test after closure | 2,066,496 |
| excluded by the rooted-tree Euler identity after the earlier tests | 33,598,208 |
| excluded by logical-flag/constant incidence after the earlier tests | 4,953,772 |
| survives all four necessary tests | 65,503,764 |
| **formal box** | **424,488,960** |

Closure alone fixes the two Boolean `fvar` and `mvar` coordinates to zero and cuts the box to 106,122,240 addresses. This is an exact constraint for declarations admitted to an environment, not a statistical tendency.

## 2. Why capping does not erase the tree test

At an unsaturated address coordinate, the underlying count equals the coordinate. At a saturated coordinate, the count may be any integer at least the Monster bound. Let

\[
\Delta=L-B-2N_{\rm let},
\]

where (L) is the number of nullary nodes and (B=N_{\rm app}+N_{\rm lam}+N_{\forall}). A profile exists only if the one-sided overflow variables can move (\Delta) to one. Saturated leaf axes move it upward by units; saturated binary axes move it downward by units; a saturated `letE` axis moves it downward by twos. The verifier solves this elementary semigroup decision exactly for every capped coordinate tuple.

This is the first place where the filled/unfilled geometry becomes more than occupancy. Some empty cells are provably impossible before type checking, while other cells merely survive a necessary filter.

## 3. Scoping and logical incidence

A bound-variable occurrence needs a binder above it. Moreover, the outermost binder still needs a closed domain: a `lam` or `forallE` witness needs at least one non-bound-variable leaf, while a construction using only `letE` binders needs at least two for its type and value branches. The implemented test captures these unavoidable minima but is not advertised as a complete de Bruijn scoping algorithm.

The three posted logical coordinates are presence flags. If (k) of `Eq`, `Iff` and `False/Not` are asserted, an unsaturated constant count must be at least (k), since those names are distinct. At the saturated constant coordinate, overflow can supply the required occurrences.

## 4. What remains between the sieve and the 908 cells

Even relative to the 65,503,764 survivors, the reported 908 addresses occupy only (1.38618\times10^{-5}). The remaining reduction can contain at least four effects:

1. **typing:** the root must be a type and every application, binder, literal and projection must type-check;
2. **environment reachability:** constants must precede the declaration and projections must name valid structures and fields;
3. **representation policy:** recursive occurrence counting and unique-DAG-node counting need not agree;
4. **semantic instability:** reduction, unfolding, metadata removal and literal expansion can change the profile while preserving meaning.

The next exact object should therefore be a typed witness generator, not a uniform random walk over the Monster box. It should synthesize small closed types, retain their raw and normalized profiles, and emit a witness for every reached address.

## 5. Upstream provenance correction

The public repository [`meta-introspector/monster`](https://github.com/meta-introspector/monster) contains related Monster and Lean experiments. Its audited public commit `b82b09439139155dd031b5b8e0f8fa777b917a52` predates the post and does not contain the displayed `exprProfile` fold or the reported declaration export. It is therefore related context, not the source needed to reproduce the 1,979-to-908 census. The exact upstream implementation remains unlocated.

## 6. Relation to the corpus

This wave sharpens the admissibility-zone stack:

\[
\text{observed}
\subseteq
\text{well-typed realizable}
\subseteq
\text{necessary structural sieve}
\subseteq
\text{formal Monster box}.
\]

The new layer is valuable because it turns part of the unknown frontier into a proved forbidden region. It also demonstrates why the Monster bounds alone are not the laws of the machine: Lean's constructor arities and kernel closure cut across the prime-exponent axes with a separate invariant.

## Boundary

No Monster action, Hecke relation or physical dynamics follows from this sieve. The calculation concerns the combinatorics of capped Lean-expression profiles. Promotion requires the missing source/data, a well-typed reachability atlas, and invariance or controlled covariance under the selected semantic equivalence.
