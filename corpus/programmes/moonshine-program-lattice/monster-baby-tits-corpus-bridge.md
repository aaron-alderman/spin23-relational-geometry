# The Monster--Baby Monster--Tits seam is a local spectral microscope

**Date:** 28 October 2026  
**Status:** exact subgroup and character-table transport chain; final character restrictions not yet executed  
**Machine-readable crosswalk:** [Monster--Baby--Tits corpus crosswalk](monster-baby-tits-corpus-crosswalk-v1.json)  
**Upstream evidence:** [occurrence register](../mathematical-group-atlas/monster_baby_tits_occurrence_register_v1.json), [branching register](../mathematical-group-atlas/monster_baby_tits_branching_register_v1.json), and [literature review](../mathematical-group-atlas/monster_baby_tits_literature_review_v1.md)

## Result

The Tits-group locality does not add a new exceptional-group analogy to the
corpus. It gives an exact way to take structures already present in the
Moonshine VOA and inspect them at successively finer scales:

```text
selected Ising axis e in V^natural
  -> Monster 2A Miyamoto involution tau_e
  -> C_M(tau_e) = 2.B
  -> 2.B / <tau_e> = B acting effectively on the Baby Monster commutant
  -> S4 x (T:2) < B
  -> T = 2F4(2)' < T:2
```

The inverse image of the Baby-Monster-local subgroup is not an unspecified
double cover. CTblLib identifies it as

```text
(GL(2,3) x T).2 < 2.B,
```

with stored class fusions to both `2.B` and `S4 x (T:2)`. Here `GL(2,3)` is
the plus-type cover `2^+.S4`, not the binary-octahedral `2^-.S4`. Restricting
only the normal simple Tits factor gives the split preimage `C2 x T`, with a
unique complement relative to the selected preimage. Thus the same selected
T occurrence can be followed compatibly through `B`, `2.B`, and `M` without
pretending that `B` itself embeds in `M`.

## What this contributes to the corpus

### 1. An occurrence-sensitive test of the corpus algebra

The corpus repeatedly warns that an abstract group name is not an occurrence.
This seam makes that rule executable. It contains:

- two distinct `S4` occurrences already in the corpus;
- an `S4` whose lift is `GL(2,3)` rather than `C2 x S4`;
- a Tits group in `B`, its unique compatible complement in `2.B`, and a
  separately classified but not yet identified Tits occurrence in `M`.

Any transport that drops these occurrence labels can produce a
dimension-correct but semantically false result. The seam is therefore a
calibration case for the catalogue's central principle: maps and selected
occurrences carry meaning that group isomorphism alone does not.

### 2. A deterministic spectral microscope for the Ising/Baby-Monster split

The Monster Griess space restricts to `2.B` as

```text
196884 = 1 + 1 + 4371 + 96255 + 96256,
```

where the first four terms have central `2A` eigenvalue `+1` and the last
`96256`-dimensional term has eigenvalue `-1`. The Baby Monster VOA weight-two
space is instead

```text
96256 = 1 + 96255
```

as an ordinary `B`-module. These are different 96256-dimensional objects.
Restricting both routes to the selected Tits occurrence gives a finite,
no-LLM comparison:

1. decompose the Baby-Monster commutant sector `1 + 96255` over `T`;
2. decompose every `2.B` constituent of the Monster Griess space over the
   compatible Tits complement;
3. compare matching Tits irreducibles while retaining their parent sector and
   central-`2A` eigenvalue;
4. report fixed spaces and residual constituents.

This is not expected to prove new physics by itself. It supplies an exact
spectral fingerprint of how one Ising choice resolves the Monster weight-two
operator space into a Baby-Monster-visible part and a central-sign-odd part.

### 3. A missing middle between operator algebra and finite representation data

The corpus currently has three exact descriptions near this seam:

- the Griess product and Ising vectors as weight-two VOA operators;
- the affine-`E8`-shaped atlas of two-Ising Norton--Sakuma algebras;
- the `2A` fermionization into a Majorana--Weyl factor and the fermionic Baby
  Monster theory.

The Tits restriction does not identify these three constructions. It adds a
common finite representation probe. The same selected Ising axis chooses the
`2.B -> B` passage; the Tits-local subgroup then tests which weight-two
constituents and fixed spaces survive inside that chosen locality. This can
separate proposed operator identifications that agree on total dimension or a
single character coefficient but disagree after restriction.

### 4. A control lane for exceptional overinterpretation

The Tits chain and the affine-`E8` Ising-pair atlas are adjacent to the same
Monster operator algebra, but neither implies the other. In particular:

- `T:2`'s outer quotient `C2` is not Monster `2A`;
- the central kernel of `2.B -> B` is Monster `2A`, but the centre of the
  `GL(2,3)` lift is another occurrence that must be tracked through the full
  extension;
- no current evidence identifies either with fermion parity or the Rule-60
  deck exchange;
- the Tits group has no factor 23 and cannot contain the order-23 rail;
- the local subgroup chain supplies no affine `E8` current algebra, gauge
  symmetry, spacetime selector, or dynamical realization.

This makes the seam useful even if its branching multiplicities are
unremarkable: it is a negative control against collapsing every nearby
involution or exceptional object into one role.

## Exact next computation

The next step is a reproducible CTblLib restriction receipt, not a new theory:

```text
B character (1 + 96255)
  -> S4 x (T:2)
  -> T:2
  -> T

M character (1 + 196883)
  -> 2.B
  -> (GL(2,3) x T).2
  -> selected normal T
```

For each route the receipt must include package and table versions, source and
target table identifiers, the exact fusion vectors, irreducible
multiplicities, fixed-space dimensions, degree checks, parent-sector labels,
and the central `2A` sign. The computation is admissible only if every
multiplicity is a nonnegative integer and dimensions close exactly.

The final provenance gate is then to identify which classified Monster
conjugacy class of Tits subgroups contains this compatible lift, using its
class fusion, centralizer, normalizer, or an explicit conjugacy witness.

## What would change the corpus

- **Matching restrictions** would establish a precise transport of selected
  weight-two sectors through the Ising/Baby-Monster/Tits locality. They would
  not by themselves establish a physical carrier.
- **Residual Tits constituents in the central-sign-odd sector** would give a
  clean algebraic marker for information present in the Monster Griess space
  but absent from the ordinary Baby-Monster commutant module.
- **A failed degree or integrality check** would falsify the selected fusion
  path or its implementation, not the underlying published group tables.
- **Failure to identify the lifted occurrence with the separately classified
  Monster occurrence** would leave two valid occurrence records rather than
  license their merger.

The contribution is therefore deliberately modest and useful: a glass-box,
deterministic local microscope connecting the corpus's Monster operator,
Ising, fermionization, and occurrence-algebra layers while preserving every
known boundary between them.
