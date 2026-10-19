# Full Substep Gauge Covariance Forces Temporal Links

**Date:** 17 October 2026  
**Branches:** B05, B07, B11 and B13  
**Claim status:** exact Abelian one-particle spacetime-lattice covariance; no gauge dynamics, Gauss law or anomaly derivation

## 1. From static to substep-dependent gauge transformations

The previous split-step certificate used one spatially varying gauge transformation common to every operator factor inside a clock tick. To interpret the factors as events at distinct sub-times, allow an independent transformation

\[
g_{s,n}=e^{iα_{s,n}}
\]

on each substep slice (s=0,ldots,4).

Use the sequence

\[
C_1@0
\longrightarrow S_-@1
\longrightarrow C_2@2
\longrightarrow S_+@3
\longrightarrow \text{output}@4.
\]

Spatial links alone cannot compare gauge frames on different time slices. Temporal parallel transport is required.

## 2. Spacetime connection laws

Let (A_{s,n}) be a spatial link phase from ((s,n)) to ((s,n+1)), and (B_{s,n}) a temporal link phase from ((s,n)) to ((s+1,n)). Their transformations are

\[
A_{s,n}\mapsto
A_{s,n}+α_{s,n+1}-α_{s,n},
\]

and

\[
\boxed{
B_{s,n}\mapsto
B_{s,n}+α_{s+1,n}-α_{s,n}.
}
\]

For charge (q_a), temporal transport multiplies face component (a) by

\[
e^{iq_aB_{s,n}}.
\]

This converts the output transformation on slice (s) into the correct local frame on slice (s+1).

## 3. Complete covariant update

The substep-resolved update is

\[
U=
T_3S_+[A_3]
T_2C_2[\Phi_2]
T_1S_-[A_1]
T_0C_1[\Phi_1],
\]

where each temporal transporter (T_s) carries the state to the next slice.

The coin phases transform on their own slices:

\[
φ_{1,n}\mapsto φ_{1,n}+(q_0-q_1)α_{0,n},
\]

\[
φ_{2,n}\mapsto φ_{2,n}+(q_0-q_1)α_{2,n}.
\]

With these laws,

\[
U'G_0=G_4U
\]

exactly for arbitrary site- and slice-dependent Abelian transformations. Every factor is unitary, so norm is also exactly preserved.

Leaving the temporal phases fixed while changing the substep gauge frames produces a nonzero covariance defect.

## 4. Geometric consequence

A temporal transporter joins

\[
(s,n)\to(s+1,n).
\]

If distinct substeps occupy positive physical time, this edge has

\[
Δx=0,
\qquad Δt>0,
\qquad ds^2<0.
\]

It is timelike, not null.

This makes the previous tradeoff unavoidable for the substep-resolved gauge interpretation:

- independent zero/π gap control uses partial shifts;
- full local gauge covariance across those substeps uses temporal links;
- the resulting microscopic causal graph contains timelike stationary edges.

One can still say that information remains inside the light cone and that moving propagation can occur on null edges. One can no longer say every elementary relation has (ds^2=0).

## 5. Alternative instantaneous interpretation

If (C_1,S_-,C_2,S_+) are regarded as an internal factorization of one indivisible update at integer time, only (G_t) and (G_{t+1}) need be physical. Intermediate gauge transformations are then redundant descriptions rather than independent symmetries.

This avoids assigning physical durations to the factors, but it changes the ontology:

- the product (U), not each factor, is the elementary event;
- the partial shifts are computational decomposition rather than microscopic spacetime motion;
- exact-null claims apply only to the outer dependency cone, not to every factor.

Either reading is coherent. They should not be mixed.

## 6. What has not been constructed

The certificate treats link phases as background variables. A gauge theory additionally requires:

- link Hilbert spaces or path integration;
- electric fields and Gauss constraints;
- plaquette curvature dynamics;
- non-Abelian ordered transport;
- fermion determinant or canonical Fock dynamics;
- anomaly flow and continuum renormalization.

Temporal covariance is necessary, not sufficient, for the Standard Model.

## 7. Programme consequence

The literal “all relations are null” branch should now be pinned for charged, nonduplicated split-step fermions unless a new construction supplies both:

1. independent zero/π gap control using only null edges;
2. full substep gauge covariance without stationary temporal transport.

The broader causal thesis remains live:

> microscopic relations are local and non-spacelike, with propagating edges on the light cone and local interactions inside it.

That statement is compatible with the verified walk.

## 8. Stop-everything and falsification gates

**Null rescue:** construct an all-null spacetime graph whose unitary gauge walk has one desired charged cone and a gapped duplicate.

**Jordan bridge:** derive the required temporal and spatial transporters as faces of one positive boundary response, so timelike links are not separately inserted.

**Gauge completion:** add dynamical links and Gauss law while retaining the split-step spectral gap and selected Furey coins.

**Failure:** temporal transport necessarily reintroduces a light π sector, negative-norm state or gauge anomaly.

## 9. Certificate

The [spacetime-gauge split-step certificate](scripts/verify_spacetime_gauge_covariant_split_step.mjs) uses five independent gauge slices, verifies all spatial, temporal and Higgs transformation laws, checks exact covariance and norm, and demonstrates failure when temporal transport is omitted.

## Companion documents

- [Gauge-covariant split step](154_gauge_covariant_split_step_two_higgs_coins.md)
- [Split-step zero/π gap tradeoff](153_split_step_walk_zero_pi_gap_tradeoff.md)
- [Null links and cellular causality](144_null_links_and_cellular_causality.md)
- [Furey TRO to walk-coin support](150_furey_tro_to_walk_coin_translation.md)
