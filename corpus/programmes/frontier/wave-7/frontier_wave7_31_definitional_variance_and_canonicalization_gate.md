# Frontier Wave 7.31: Definitional Variance and the Canonicalization Gate

**Date:** 24 October 2026  
**Status:** explicit no-go for raw semantic invariance; canonicalized fold open  
**Ledger:** [definitional-variance witnesses](monster_lean_definitional_variance_v1.json)  
**Certificate:** [witness verifier](../../../../verification/verify/verify_monster_lean_definitional_variance.mjs)

## Result

The raw fifteen-coordinate fold is not invariant under Lean definitional equality. Four small closed witness pairs change address while preserving meaning:

| Transformation | Reduced address | Expanded address |
|---|---:|---:|
| metadata erasure | 3 | 87 |
| beta reduction | 3 | 6,006 |
| zeta reduction | 3 | 5,187 |
| literal expansion inside an equality type | 57,528 | 39,470,976 |

Alpha-renaming is a positive control: renaming the binder in `forall x : Nat, Eq Nat x x` preserves both its profile and address 2,487,240.

This closes one question and opens a better one. The displayed fold is a representation-sensitive detector unless it profiles a declared canonical form. Kernel certification can prove that the implementation computed the address of a supplied expression; it cannot make that address canonical across definitionally equal expressions.

## 1. Minimal witnesses

### Metadata

Lean specifies `Expr.mdata data e` to be definitionally equal to `e`. The pair

\[
\mathrm{Nat},\qquad \operatorname{mdata}(\mathrm{Nat})
\]

differs only in the metadata coordinate. Since that coordinate has Monster bound one, their addresses are (3) and (3\cdot29=87).

### Beta and zeta

Both

\[
(\lambda X:\mathrm{Type}.X)\,\mathrm{Nat}
\quad\text{and}\quad
\operatorname{let} X:\mathrm{Type}:=\mathrm{Nat};X
\]

reduce to `Nat`. Their extra application, binder, bound-variable, sort or let nodes move them to distinct divisor-lattice cells.

### Literal expansion

Lean documents a natural literal as definitionally equal to the corresponding `Nat.succ`/`Nat.zero` expansion. Embedding two copies in `Eq Nat 2 2` keeps the whole expression a type. The compact form saturates the Boolean literal coordinate; the expanded form replaces it with four applications and six additional constants. The two addresses differ by almost three orders of magnitude.

## 2. The canonicalization problem

A repaired semantic classifier must declare at least:

1. whether metadata is erased;
2. whether beta, iota, zeta and projection reductions are performed;
3. which constants are unfolded and at what transparency;
4. whether literals and projections remain compact or are expanded;
5. whether shared expression nodes are counted once as a DAG or once per recursive occurrence;
6. how universe levels and version-dependent implementation details are treated.

Normal forms can also expand dramatically, and unrestricted delta reduction is environment-dependent. Canonicalization is therefore not a cosmetic pre-pass: it is a new quotient choice with its own admissibility, cost and stability boundaries.

## 3. Consequence for the filled/unfilled map

The previously defined encoding-unstable zone is nonempty by construction. More strongly, a single semantic equivalence class can cross several Monster addresses. Thus the observed 908 cells cannot yet be interpreted as semantic types, and changing the normalization policy can move both the filled set and its frontier.

The useful object is now a two-layer atlas:

\[
\text{raw address}
\longrightarrow
\text{canonical address under policy }C,
\]

with a transition ledger recording which coordinate changes each normalization induces. Stable cells, mobile cells and collapsed fibres then become measurable rather than rhetorical.

## 4. Relation to admissibility

This is a clean example of admissibility preceding ontology. Before asking what an address *is*, the corpus must specify which representations are admitted as equivalent and which normalization path selects their representative. The canonicalization policy is part of the physical-style detector specification: different admissible preparations produce different readouts unless a stability theorem intervenes.

## Boundary

The witnesses establish non-invariance of the raw count fold. They do not show that every proposed upstream certificate profiles unnormalized input, because the exact source remains unavailable. A source implementation that canonically normalizes before `exprProfile` could evade the no-go, but that behavior must be exhibited and tested.
