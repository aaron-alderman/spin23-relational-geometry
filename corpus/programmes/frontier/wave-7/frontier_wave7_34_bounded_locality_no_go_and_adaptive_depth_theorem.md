# Frontier Wave 7.34: A Bounded-Locality No-Go and the Adaptive-Depth Theorem

**Date:** 24 October 2026  
**Status:** exact infinite counterexample family; executable witnesses through radius eight  
**Ledger:** [bounded-locality no-go v1](monster_lean_bounded_locality_no_go_v1.json)  
**Verifier:** [bounded-locality verifier](../../../../verification/verify/verify_monster_lean_bounded_locality_no_go.mjs)

## Result

No fixed finite-radius bag of labelled local windows identifies all closed right-associated Lean type chains, even when it retains root and terminal anchors. For every positive integer \(r\), there are two distinct canonical type expressions which have:

- the same capped Monster address;
- the same prefix and suffix of depth \(r\);
- the same multiset of every contiguous labelled window of lengths \(1,\ldots,r+1\); and
- their first root-visible difference only at depth \(r+1\).

This turns wave 7.33's finite locality warning into an exact family. Detector depth cannot be fixed once and for all; it must grow with the unresolved fibre or terminate at a full canonical representation.

## 1. The witness family

Encode a bit word \(b_1\cdots b_n\) as the closed Lean type

\[
T(b_1)\to T(b_2)\to\cdots\to T(b_n)\to\mathrm{Unit},
\qquad
T(0)=\mathrm{Nat},\quad T(1)=\mathrm{Bool}.
\]

For radius \(r\ge1\), take

\[
x_r=0^r1\,0^{r+1}0^r,
\qquad
y_r=0^{2r+1}1\,0^r.
\]

Both words have length \(3r+2\), one `Bool` domain and \(3r+1\) `Nat` domains. Their expression profiles therefore have identical `const` and `forallE` counts, and hence the same Monster address even before saturation.

They are nevertheless distinct. In \(x_r\), the unique `Bool` occurs at depth \(r+1\); in \(y_r\), it occurs at depth \(2r+2\). A rooted detector must cross depth \(r\) to see the first difference.

## 2. Why every radius-r window bag agrees

Remove the final appended \(0^r\) from each word. The two remaining cyclic cores are

\[
0^r1\,0^{r+1}
\quad\text{and}\quad
0^{2r+1}1,
\]

which are rotations of the same cyclic word. Rotation preserves the multiset of cyclic windows. Appending the common \(r\)-symbol prefix linearizes every cyclic window of length at most \(r+1\), so the two linear words have identical window decks through that length. They also begin and end with \(0^r\), so explicit root and terminal anchors do not separate them.

The verifier instantiates \(r=1,\ldots,8\). The first three pairs are:

| Radius | \(x_r\) | \(y_r\) | First differing depth |
|---:|---|---|---:|
| 1 | `01000` | `00010` | 2 |
| 2 | `00100000` | `00000100` | 3 |
| 3 | `00010000000` | `00000001000` | 4 |

The symbolic construction, rather than the finite test range, supplies the all-\(r\) result.

## 3. Exact detector consequence

There are now three sharply different regimes:

1. **Global counts** forget labels and all incidence.
2. **Bounded local bags** retain labels and neighbourhoods but forget their global assembly.
3. **Complete rooted paths or canonical hashes** retain enough assembly to reconstruct these finite trees, at the cost of depth proportional to the object.

Thus no finite list of fixed-radius local opcode counts can close the semantic collision problem. Adding more radius-\(r\) channels may improve empirical purity, but it cannot establish identification outside a bounded-size domain.

The appropriate algorithm is an adaptive filtration:

\[
D_0\preceq D_1\preceq D_2\preceq D_{3,1}\preceq D_{3,2}\preceq\cdots,
\]

where rooted depth is increased only inside a fibre still shown to be impure. On a corpus with maximum expression depth \(h\), depth \(h\) is a finite control ceiling. Across unbounded expressions, there is no corpus-independent finite ceiling short of retaining a recursively complete representation.

## 4. Relation to admissibility

This family distinguishes an **epistemic boundary** from a structural one. Both expressions are valid, closed, ordinary Lean types and occupy the same coarse address. The missing distinction is neither forbidden by syntax nor absent from the state space; it lies beyond the detector's observation depth.

Consequently an unfilled fine cell can mean at least two different things:

- no admissible object realizes it; or
- a realizing object is present but folded into a coarser observed fibre.

The second case is invisible to occupancy statistics alone. A frontier atlas therefore needs both horizontal reachability coordinates and vertical resolution/depth coordinates.

## Boundary

The theorem concerns the declared anchored window-bag detector and a valid Lean-type subfamily. It does not defeat unbounded rooted paths, recursive canonical hashes or Lean's own expression equality. It also does not make a statement about Monster representations, Hecke operators or physics. Its transferable content is exact: any detector that forgets assembly beyond a fixed radius has adversarially indistinguishable admissible objects.
