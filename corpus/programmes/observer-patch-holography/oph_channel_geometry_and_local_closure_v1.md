# OPH channel geometry and local-closure result v1

**Status:** exact finite result at the pinned public source revision; Gates 1--4 executed  
**Date:** 26 October 2026  
**Evidence:** [`evidence/data/oph-channel-geometry-and-overlap-v1.json`](../../../evidence/data/oph-channel-geometry-and-overlap-v1.json)  
**Verifier:** [`verification/admissibility/verify_oph_channel_geometry.mjs`](../../../verification/admissibility/verify_oph_channel_geometry.mjs)

## Result in ordinary language

The record-law family has a clean shape, but it is not the shape needed to jump directly to Spin(2,3). It is a convex region of quantum channels: each point says which coherences a repair keeps while every point gives the same classical repair probabilities. Repeating a law can contract information toward a stable record surface. That contraction is real and measurable. It is not a reversible Lie motion in disguise.

Two local repairs commute when their seams are disjoint. They do not commute when the seams share a port. Thus closure is local and schedule-relative: after two overlapping repairs the final record can remember which repair came first. This is already visible on an ordinary probability distribution, before quantum phase is invoked. Global, schedule-independent closure cannot be inferred from the one-seam theorem.

## 1. The complete one-seam channel region

Write the five source multipliers as

\[
(k,g,h,m,n)\in\mathbb C^4\times\mathbb R.
\]

The Choi matrix splits by current into blocks of sizes `2 + 4 + 2`. In the waiting-orientation symmetric/antisymmetric basis, the middle block splits again into the scalar

\[
\frac12-m
\]

and the Hermitian block

\[
B=\begin{pmatrix}
1 & \sqrt2 g & k\\
\sqrt2\bar g & \frac12+m & \sqrt2\bar h\\
\bar k & \sqrt2 h & 1
\end{pmatrix}.
\]

Consequently the entire admissible family is exactly

\[
-\frac12\le m\le\frac12,\qquad |n|^2\le\frac12,\qquad B\succeq0.
\]

This is a nine-real-dimensional spectrahedron. It is the positive region of a constrained Choi description of record channels. It is not itself the three-dimensional cone `H_2(R)_+` of positive real two-channel responses.

## 2. What repeated repair closes onto

The idempotent laws `E` and `T` are projections in channel space. Counting the total-two carrier by seam occupation gives multiplicities

| endpoint key | `00` | `10` | `01` | `11` | `20` | `02` |
|---|---:|---:|---:|---:|---:|---:|
| states | 55 | 10 | 10 | 1 | 1 | 1 |

Because an idempotent map has rank equal to the trace of its superoperator, its fixed-space dimension can be read exactly from the retained matrix units:

\[
\dim\operatorname{Fix}(E)=3236,
\qquad
\dim\operatorname{Fix}(T)=3126.
\]

The difference is

\[
3236-3126=110=2\cdot55\cdot1.
\]

Those 110 directed matrix units are precisely the two orientations of coherence between the 55-dimensional empty-seam sector and the unique full-seam state. `E` retains them; `T` records enough endpoint information to destroy them. The non-idempotent named laws `C0`, `C` and `C_signed` converge to `E`, so their only peripheral endpoint is the `E` fixed surface. The source's phase detector is therefore measuring distance from a record surface, not discovering a new classical repair law.

## 3. Why this is not a hidden continuous Lie flow

Every member of the classified family kills every matrix unit joining seam keys `00` and `02`: the first key has only current `0`, the second only current `-1`, so there is no common current block in which that coherence could survive. Every channel in the family is therefore non-injective.

For a bounded time-independent generator `L`, the finite-time propagator `exp(tL)` is invertible as a linear map, with inverse `exp(-tL)`. No member of this record-law family can equal such a finite-time propagator. The idempotents make the same point especially plainly: a non-identity projection cannot occur at finite time in a bounded Markov semigroup.

This does not forbid a singular infinite-time limit, a time-dependent measurement intervention, a collision model with discarded ancillas or a dilation on a larger carrier. It does close the proposed direct identification of one discrete repair with a finite interval of autonomous Lindblad/Lie evolution.

## 4. The Jordan-corner census

`E` acts as the identity on the direct sum of the 55-dimensional empty-seam sector and the unique full-seam state. Its fixed system therefore contains the full matrix block `M_56(C)`, not merely 55 isolated corners. Every complex two-plane in that block supplies an `H_2(C)` self-adjoint corner; the space of choices is the Grassmannian `Gr_C(2,56)`. The 55 empty/full pairs are only the source-basis-aligned corners read by the multiplier `k`.

Each `H_2(C)` self-adjoint corner has real dimension four. A copy of `H_2(R)` can be obtained only by choosing a real phase slice, reducing four coordinates to three.

The source supplies neither choice canonically:

- the 55 source-basis empty states split under port permutations into a ten-element double-occupation orbit and a 45-element distinct-pair orbit;
- no source invariant selects one corner inside either orbit;
- number-phase covariance rotates the complex coherence, so a real slice requires an additional phase reference.

The channel family therefore contains continuously many *possible* rank-two complex Jordan corners, including 55 basis-aligned empty/full candidates, but selects no canonical `H_2(R)_+`. Without that selection the TKK route to `sp(4,R)` has no source-native starting carrier here.

## 5. Overlap and schedule

The complete 6,084-matrix-unit census compared two orders of the same law on two seams. By permutation symmetry, one adjacent pair and one disjoint pair represent every distinct two-seam incidence type.

| law | adjacent units that differ | disjoint units that differ |
|---|---:|---:|
| `C0` | 307 | 0 |
| `C` | 303 | 0 |
| `C_signed` | 303 | 0 |
| `E` | 249 | 0 |
| `T` | 249 | 0 |

The smallest witness is classical. Begin with one load at port 5 and one at port 11. Repair seam `(0,1)` and then `(0,5)`:

\[
\tfrac12\{5,11\}+\tfrac12\{0,11\}.
\]

Reverse the order:

\[
\tfrac12\{5,11\}+\tfrac14\{0,11\}+\tfrac14\{1,11\}.
\]

The shared port makes the first repair alter the input seen by the second. Disjoint repairs commute exactly. This is the correct local-closure statement: causal separation closes; overlapping updates require an authored schedule, a confluence theorem or a quotient that explicitly forgets the difference.

## Gate disposition

| gate | result | implication |
|---|---|---|
| complete channel geometry | exact pass | the admissible one-seam channel region is known |
| two-seam local closure | no-go | adjacent order is observable; global closure is not inherited |
| canonical Jordan corner | no-go | a full `M_56(C)` fixed block contains continuously many `H_2(C)` corners, but no source-selected `H_2(R)` slice |
| continuous generator | no-go | discrete repair is non-injective and cannot be finite-time `exp(tL)` |

The next live work begins after these closures, not by repeating them. One route asks whether an explicit scheduler plus a declared quotient produces a useful higher-range closure. The other builds the phase-sensitive record-law emulator and tests the exact coherence and order witnesses. Neither route presently derives Spin(2,3), spacetime or a physical law of nature.
