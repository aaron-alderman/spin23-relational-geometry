# Gauge-Covariant Split Stepping Requires Two Dressed Coin Events

**Date:** 17 October 2026  
**Branches:** B03, B05, B11 and B13  
**Claim status:** exact static-(U(1)) one-particle covariance; temporal gauge transport, non-Abelian groups and anomalies remain open

## 1. Question

The split-step walk can gap the π sector independently. The next gate is whether that deformation remains locally gauge covariant when its two faces carry unequal chiral charges.

Write

\[
U_{\rm ss}=S_+[A],C_2[\Phi_2],S_-[A],C_1[\Phi_1].
\]

The answer is yes for spatial gauge transformations, but only if both partial shifts carry link transport and both unequal-charge coins are dressed intertwiners.

## 2. Partial gauge shifts

Let (L_n=e^{iA_n}) transport from site (n) to (n+1). For face charges (q_0,q_1), define

\[
(S_-\psi)_{0,n}=L_{n-1}^{q_0}\psi_{0,n-1},
\qquad
(S_-\psi)_{1,n}=\psi_{1,n},
\]

and

\[
(S_+\psi)_{0,n}=\psi_{0,n},
\qquad
(S_+\psi)_{1,n}=L_n^{-q_1}\psi_{1,n+1}.
\]

Under

\[
\psi_{a,n}\mapsto e^{iq_aα_n}\psi_{a,n},
\qquad
A_n\mapsto A_n+α_{n+1}-α_n,
\]

each moving component transforms at its arrival site, while each stationary component already carries the local transformation. Both partial shifts are exactly covariant and norm preserving.

## 3. Both coins must be Higgs dressed

Use a local coin

\[
C_j(n)=
\begin{pmatrix}
\cos θ_j&-i\sin θ_j,e^{iφ_{j,n}}\\
-i\sin θ_j,e^{-iφ_{j,n}}&\cos θ_j
\end{pmatrix}.
\]

For unequal charges, covariance requires

\[
φ_{j,n}\mapsto
φ_{j,n}+(q_0-q_1)α_n
\]

for each (j=1,2).

Dressing only (C_1) is insufficient. After the first partial shift, (C_2) again mixes inequivalent local representations and must carry the same charge-difference law. The executable model produces a finite covariance residual if the second phase is left fixed.

## 4. Relation to the Furey two-component Higgs problem

The split step now contains two logically distinct coin events. The Furey cyclic topology also requires two oriented Higgs block components, (h_C) and (h_D), to close all charged Yukawa cycles. These facts are suggestive but not yet identified:

- (C_1,C_2) are ordered in physical update time;
- (h_C,h_D) are distinguished by internal block incidence;
- both coins must transform in the appropriate (operatorname{Hom}(V_R,V_L)) representation;
- nothing yet proves (C_1=h_C) and (C_2=h_D), or the reverse;
- one universal split step cannot use the same two-dimensional coin indiscriminately across up, down and lepton modules without the full block structure.

A real bridge would derive the temporal ordering and relative angles from the internal cycles rather than noticing that both constructions contain “two” objects.

## 5. Static versus spacetime gauge covariance

The exact certificate uses a site-dependent gauge transformation (g_n) common to all operator factors within one clock tick. This is enough to verify the spatial link and local intertwiner laws.

If the two partial shifts occur at distinct physical sub-times and gauge transformations may vary independently at those times, temporal parallel transport is also required. One must either:

1. insert temporal link variables between (C_1,S_-,C_2,S_+); or
2. declare the factorization to be an instantaneous internal decomposition of one discrete update and formulate covariance only at integer times.

The second option is mathematically consistent but weakens the literal spacetime interpretation of each substep.

## 6. What remains free

Gauge covariance does not determine:

- (θ_1+θ_2), the infrared mass combination;
- (θ_1-θ_2), the π-gap combination;
- the relative phases of (Phi_1,Phi_2);
- whether the two Furey Higgs blocks are locked;
- flavor Yukawa matrices;
- the non-Abelian transporter ordering;
- anomaly flow through the gapped π sector.

Thus gauge covariance validates the deformation but does not explain it.

## 7. Stop-everything and falsification gates

**Furey selection:** directed internal composition uniquely assigns (h_C,h_D) to the two ordered coin events and fixes their relative angle.

**Boundary selection:** a finite-region sewing law forces the same ordered factorization and removes one free coin combination.

**Temporal failure:** full spacetime gauge covariance requires extra temporal links or degrees of freedom that destroy the proposed minimal causal graph.

**Anomaly failure:** the gapped π sector cancels rather than reproduces the intended chiral anomaly.

**Demotion:** if two arbitrary Higgs coins are simply inserted by hand, the construction is a flexible lattice regulator and not a derivation from Furey or (Spin(2,3)).

## 8. Certificate

The [gauge-covariant split-step certificate](../../../verification/verify/verify_gauge_covariant_split_step_walk.mjs) verifies norm preservation, both partial link transformations, exact covariance with two dressed coins, explicit failure when the second coin is undressed, and records the temporal-gauge limitation.

## Companion documents

- [Split-step zero/π gap tradeoff](153_split_step_walk_zero_pi_gap_tradeoff.md)
- [Compact-group coin intertwiner theorem](149_compact_group_coin_intertwiner_theorem.md)
- [Furey TRO to walk-coin support](150_furey_tro_to_walk_coin_translation.md)
- [Gauge covariance of the single-step walk](148_gauge_covariant_null_walk_higgs_coin.md)
