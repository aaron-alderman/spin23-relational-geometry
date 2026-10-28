# Monster--Baby Monster--Tits literature review

Date: 2026-10-28

Status: literature and computational-library recovery, not a claim of new
representation theory.

## Question

Which parts of the Monster--Baby Monster--Tits seam are already established in
the literature or in maintained character-table libraries, and which parts
remain genuinely unresolved for this corpus?

The principal conclusion is that the subgroup, full-preimage and principal
class-fusion data already exist.  The previously declared large branching
problem was misclassified.  It is a bounded character restriction and
provenance-recovery task.

## Established structural chain

Let `T` denote the Tits simple group `2F4(2)'`.

1. `T` is the derived subgroup of index two in `T:2 = 2F4(2)'.2`.
2. `S4 x (T:2)` is the sixteenth maximal subgroup of the Baby Monster `B`.
3. Its full inverse image in `2.B` has the CTblLib identifier
   `(GL(2,3)x2F4(2)').2` and order `1725235200`.
4. That lifted table has stored class fusions to both `2.B` and
   `S4x2F4(2)'.2`.
5. `2.B` has a stored class fusion into the Monster `M`.

The order check is exact:

```text
|S4 x (T:2)| = 24 * 35942400 = 862617600
|(GL(2,3) x T).2| = 48 * 17971200 * 2 = 1725235200
                     = 2 * |S4 x (T:2)|
```

The lifted table name supplies more information than the earlier abstract
pullback argument.  Its `GL(2,3)` component is the plus-type Schur double
cover `2^+.S4`; it is not the non-isomorphic binary-octahedral cover
`2^-.S4` ([Boykett and Howell, 2018](https://doi.org/10.1515/jgth-2017-0004)).
The complete object must nevertheless be retained as
`(GL(2,3)xT).2` until the action of the final `.2` is read from its table or an
explicit construction.  It must not be silently flattened to
`2.S4 x (T:2)`.

## Character-table evidence

The following CTblLib 1.3.10 catalogue pages expose the stored data directly:

| Source table | Target table | Evidence |
|---|---|---|
| `2F4(2)'` | `2F4(2)'.2` | stored class fusion from the Tits table |
| `S4x2F4(2)'.2` | `B` | stored class fusion; identified as maximal subgroup 16 |
| `(GL(2,3)x2F4(2)').2` | `S4x2F4(2)'.2` | stored quotient fusion |
| `(GL(2,3)x2F4(2)').2` | `2.B` | stored subgroup fusion |
| `2.B` | `M` | stored subgroup fusion |

Sources:

- [CTblLib: Tits group](https://www.math.rwth-aachen.de/~Thomas.Breuer/ctbllib/ctbltoc/data/2F4(2)'.html)
- [CTblLib: full Tits automorphism group](https://www.math.rwth-aachen.de/~Thomas.Breuer/ctbllib/ctbltoc/data/2F4(2)'.2.html)
- [CTblLib: Baby Monster](https://www.math.rwth-aachen.de/~Thomas.Breuer/ctbllib/ctbltoc/data/B.html)
- [CTblLib: Baby Monster maximal subgroup 16](https://www.math.rwth-aachen.de/~Thomas.Breuer/ctbllib/ctbltoc/data/S4x2F4(2)'.2.html)
- [CTblLib: lifted maximal subgroup 16](https://www.math.rwth-aachen.de/~Thomas.Breuer/ctbllib/ctbltoc/data/(GL(2,3)x2F4(2)').2.html)
- [CTblLib: `2.B`](https://www.math.rwth-aachen.de/~Thomas.Breuer/ctbllib/ctbltoc/data/2.B.html)
- [CTblLib: Monster](https://www.math.rwth-aachen.de/~Thomas.Breuer/ctbllib/ctbltoc/data/M.html)

This is stronger than finding groups of matching orders.  The library records
the actual directed fusion edges needed for restriction of characters.

## Peer-reviewed and primary support

- Breuer, Magaard and Wilson prove the correctness of the ordinary Baby
  Monster character table in [*Verification of the ordinary character table
  of the Baby Monster*](https://arxiv.org/abs/1902.07758), Journal of Algebra
  561 (2020), 111--130, DOI `10.1016/j.jalgebra.2019.06.047`.
- Their executable companion records detailed GAP computations in
  [*Some steps in the verification of the ordinary character table of the
  Baby Monster group*](https://arxiv.org/abs/1902.06823).
- Breuer, Magaard and Wilson verify the Monster conjugacy classes and ordinary
  character table in
  [*Verification of the conjugacy classes and ordinary character table of the
  Monster*](https://arxiv.org/abs/2412.12182), DOI
  `10.1016/j.jalgebra.2025.09.034`.
- The ATLAS record gives `S4 x 2F4(2)` as a maximal subgroup of `B`; in this
  notation `2F4(2)` is the full automorphism group `T:2`.
- The ATLAS improvements list says that occurrences of `T` in `M` are
  completely classified.  That list does not supply its underlying reference,
  so the statement is retained as database authority rather than promoted to
  a recovered proof citation.

## What can now be computed routinely

With GAP and CTblLib installed, the following calls should recover the main
tables and stored fusion maps:

```gap
LoadPackage("ctbllib");

t     := CharacterTable("2F4(2)'");;
taut  := CharacterTable("2F4(2)'.2");;
h     := CharacterTable("S4x2F4(2)'.2");;
b     := CharacterTable("B");;
lift  := CharacterTable("(GL(2,3)x2F4(2)').2");;
twob  := CharacterTable("2.B");;
m     := CharacterTable("M");;

fusTAut := GetFusionMap(t, taut);;
fusHB   := GetFusionMap(h, b);;
fusLiftH  := GetFusionMap(lift, h);;
fusLift2B := GetFusionMap(lift, twob);;
fus2BM    := GetFusionMap(twob, m);;
```

Character restriction is then ordinary composition with these fusion maps,
followed by scalar products with irreducible characters.  Every result must
retain the table identifiers, package version, fusion vectors, and degree
checks.

Two concrete restrictions are therefore routine rather than speculative:

1. restrict `1 + 96255` from `B` through `S4 x (T:2)` and then to `T`;
2. restrict `1 + 196883` from `M` through `2.B` and the lifted local subgroup,
   then to its normal `T` factor.

The first route uses only stored fusion edges plus the explicit direct-product
coordinate.  The second additionally needs the inclusion of the normal `T`
factor into `(GL(2,3)xT).2` to be recovered or constructed faithfully.  That
is a small table/group-construction seam, not a request to discover a new
Monster representation.

## What was not found

This review did not find a paper that prints the final irreducible
multiplicities for the restrictions of the `96255` Baby Monster character or
the `196883` Monster character to this selected Tits occurrence.  That negative
search result is not evidence that the decompositions are unpublished: they
may be immediate library computations and therefore absent from prose.

Likewise, the review recovered the ATLAS assertion that Monster occurrences of
`T` are completely classified, but not the primary theorem that names the
specific class reached through this `2.B` local chain.  The exact match should
therefore be produced from fusion data or an explicit conjugacy/normalizer
witness before the two occurrence records are identified.

## Correct remaining boundary

The remaining work is now only:

1. run the stored fusion chain and record the two exact decompositions;
2. recover or construct the normal-`T` factor inclusion in the lifted table;
3. use the resulting Monster class fusion, centralizer and normalizer data to
   name the compatible Tits occurrence;
4. preserve the distinction between the Baby-Monster-local `S4`, its
   `GL(2,3)` lift, and unrelated `S4` occurrences elsewhere in `M`.

Failure to find a local GAP executable is an environment limitation.  It is
not a mathematical open problem and must not be recorded as one.
