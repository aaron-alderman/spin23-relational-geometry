# The Baby-Monster gate is sewing data, not another character

**Date:** 25 October 2026

**Status:** primary-source boundary and minimal construction target identified; the required order-23-twined genus-two spin family is not present in the reviewed corpus

**Evidence:** [machine-readable source-gate ledger](../../../evidence/data/moonshine-baby-monster-genus-two-source-gate-v1.json)

**Certificate:** [source-gate verifier](../../../verification/verify/verify_moonshine_baby_monster_genus_two_source_gate.mjs)

## Result

The missing Baby-Monster factor is now narrow enough to state without the
word “mystery.” Three established results meet at the gate:

1. cutting an Ising vector out of the Moonshine module produces the
   Baby-Monster super VOA (VB^\natural) of central charge (47/2);
2. its even algebra has exactly three irreducible modules
   (VB^0,VB^1,VB_T), with Ising fusion rules;
3. Monster (2A) fermionization is the pointwise product, on a shared spin
   structure, of one free Majorana factor and the fermionic Baby-Monster
   factor.

These facts explain why the free calculation belongs to the correct carrier,
but they do not determine the remaining multiplier. The fusion ring records
which channels may meet. It does not provide the genus-two analytic conformal
blocks, their sewing coefficients, or an order-23 insertion on those blocks.

The reviewed primary literature supplies an explicit genus-two sewing formula
for the free fermion, but not an evaluated ten-even-spin vector for
(VB^\natural), and not its order-23-twined version. This is a source boundary,
not an invitation to infer the missing phases from matching dimensions.

## 1. What is fixed

Yamauchi proves that (VB^\natural) is a simple SVOA, that (VB_T) is its
irreducible twisted module, and that the even subalgebra has exactly the three
irreducible modules

\[
VB^0,\qquad VB^1,\qquad VB_T.
\]

Their fusion ring is the Ising ring:

\[
VB^1\boxtimes VB^1=VB^0,
\qquad
VB^1\boxtimes VB_T=VB_T,
\qquad
VB_T\boxtimes VB_T=VB^0\oplus VB^1.
\]

Lin and Shao establish the fermionization identity at the theory level,

\[
\operatorname{Ferm}_{2A}(V^\natural)
\cong F_{1/2}\otimes VB^\natural,
\]

where (F_{1/2}) is one free chiral Majorana fermion. The central charges add:

\[
\frac12+\frac{47}{2}=24.
\]

This constrains the product anomaly and is consistent with return to the
bosonic Moonshine parent after bosonization. It does **not** fix relative
phases among ten genus-two spin sectors.

## 2. Why characters and fusion stop short

For a VOSA (V), epsilon-sewing has the schematic form

\[
Z_V^{(2)}(\tau_1,\tau_2,\epsilon)
=
\sum_{n\geq0}\epsilon^n
\sum_{u\in V_{[n]}}
Z_V^{(1)}(u,\tau_1)
Z_V^{(1)}(\bar u,\tau_2),
\]

with sector and automorphism labels added in the twisted case. A genus-one
character supplies only the vacuum insertion (u=\mathbf1). Fusion rules
specify allowed intermediate modules, but not the complete torus one-point
functions, dual-basis contractions, intertwining normalizations, or their
order-23 insertions.

Consequently none of the following determines the required (K)-operator:

- the three-module Ising fusion ring by itself;
- the central charge (47/2) by itself;
- the genus-one Baby-Monster character by itself;
- the untwined aggregate genus-two Moonshine partition function by itself.

Each is a quotient of the data needed by the seam.

## 3. Minimal construction packet

Let (b\in\mathbb B) be the order-23 element obtained from a (46C/46D)
Monster root after quotienting the central (2A) involution. The minimum
source packet is:

1. the (b)-action on (VB^0,VB^1,VB_T), including compatible lifts to the
   required intertwining spaces;
2. the (b)-twined torus one-point functions for homogeneous states used in
   sewing, not merely the three vacuum characters;
3. the invariant bilinear forms and dual-basis contractions in every allowed
   channel;
4. a convergent genus-two spin-sector vector
   (Z^{(2)}_{VB,b}[\delta](\Omega)) for the ten even characteristics;
5. its monomial action under the explicit word
   (K=S^2R^{-11}), in the same lift convention as the free factor;
6. a separating-degeneration check against the order-23 genus-one traces.

Only item 5 is needed to decide the immediate multiplier comparison, but
items 1--4 and 6 are what make that matrix source-derived rather than fitted.

## 4. Exact comparison once the packet exists

The free factor is already certified. On the three length-three cycles its
eta-normalized holonomy is (1); on the fixed odd--odd sector it is (-1).
Write the Baby-Monster cycle holonomies as

\[
(\beta_1,\beta_2,\beta_3;\beta_*) .
\]

Because both factors use the same spin label, the full (2A) holonomies are

\[
(\beta_1,\beta_2,\beta_3;-\beta_*).
\]

This gives an immediate discriminator:

- if the source-derived Baby action makes these agree with the sewn
  order-23 Monster defect, the (2A) seam survives;
- if any closed-cycle holonomy or the fixed-sector phase disagrees after one
  globally consistent anomaly trivialization, the proposed seam is ruled out;
- changing sector basis cannot repair a closed-cycle mismatch.

## Boundary

The absence claim is limited to the primary sources reviewed here and the
local corpus as of the stated date. A general sewing formalism is not an
evaluated Baby-Monster answer. The Ising fusion ring is not promoted to a
genus-two amplitude, and central-charge cancellation is not promoted to
sectorwise phase cancellation.

## Sources and corpus links

- Yamauchi, [*2A-orbifold construction and the baby-monster vertex operator superalgebra*](https://arxiv.org/abs/math/0312164)
- Höhn, [*Self-dual Vertex Operator Super Algebras and the Baby Monster*](https://arxiv.org/abs/0706.0236)
- Lin and Shao, [*Duality Defect of the Monster CFT*](https://arxiv.org/abs/1911.00042)
- Tuite and Zuevsky, [*Genus Two Partition and Correlation Functions for Fermionic Vertex Operator Superalgebras I*](https://arxiv.org/abs/1007.5203)
- Tuite and Zuevsky, [Part II](https://arxiv.org/abs/1308.2441)
- [Free-Majorana relation-defect multiplier](relation-defect-free-majorana-multiplier.md)
- [Joined order-46 bridge](joined-bridge-map.md)
- [Monster fermionization bridge](../lattice-subroutine-gravity/monster-fermionization-bridge.md)
