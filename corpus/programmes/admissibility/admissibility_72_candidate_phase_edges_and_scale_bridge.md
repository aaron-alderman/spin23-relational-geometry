# The two phase edges have candidate processes, but not yet one experiment

**Date:** 25 October 2026

**Status:** candidate spanning-tree topology found; both edge calculations and the cross-scale phase bridge remain open

**Topics:** OT-047, OT-048

**Parent:** [AZ-071 detector gate](admissibility_71_observable_resolution_and_phase_connectivity_gate.md)

**Evidence:** [phase-edge literature ledger](../../../evidence/data/five-coordinate-phase-edge-literature-gate-v1.json)

**Verifier:** [phase-edge certificate](../../../verification/admissibility/verify_five_coordinate_phase_edge_literature_gate.mjs)

## Result

The literature contains the topology of the two phase links required by AZ-071, but not yet their joined signed likelihood.

- A heavy-meson calculation for (h^-\to\ell^-\bar\nu a) writes the rate with an explicit quark-line interference term (c_Qc_q\widetilde\Gamma_{Qq}). Applied to (B_c), emission from the bottom and charm constituent lines is the natural low-energy template for the (v_d-v_u) edge under the corpus's generation-universal coordinate convention.
- Associated (tW+a) production contains top-like and weak-gauge ALP emission diagrams in the same final state and is therefore the natural high-energy topology for the (v_u-a_2) edge.

These two edges connect all three nodes. They do **not** yet close the signed incidence test.

## Why the apparent spanning tree is still open

The heavy-meson source, [*Probing axion-like particles in leptonic decays of heavy mesons*](https://arxiv.org/abs/2407.05298), explicitly retains a quark–quark cross term in equation (13). But its published scenarios and bounds do not provide the corpus-specific (B_c) two-coefficient covariance in the ((v_u,v_d)) convention. The form factors, constituent assignment, acceptance and running must be recomputed with both coefficients active.

The collider source, [*Exploring Axion-Like Particle Couplings through Single Top (tW)-Channel and Top Pair Production at the LHC*](https://arxiv.org/abs/2408.11588), places top-like (c_{a\Phi}) and weak (c_{\widetilde W}) diagrams in the common (tW+a) final state. However, its event generation sets one coefficient nonzero at a time. It demonstrates simultaneous sensitivity of the final state, not a retained signed (c_{a\Phi}c_{\widetilde W}) interference observable.

There is also a scale mismatch. The first edge is a low-energy hadronic decay; the second is high-energy electroweak production. A connected graph of coefficient names is not yet a connected phase record. The relative convention has to survive operator-basis choice, RG evolution, the electroweak threshold, hadronic matching and correlated nuisance profiling.

## Open and closed

Closed:

- two concrete common-final-state process families can be named;
- their candidate edges form a spanning tree on (v_u,v_d,a_2);
- the bottom/up edge has an explicit interference-term template in the primary calculation;
- the top/weak publication does not supply the needed cross term because it uses one-coefficient-at-a-time samples;
- combining the two edges requires a phase-preserving scale bridge, not merely multiplying independent likelihoods.

Open:

- the (B_c) two-coefficient differential polynomial and form-factor covariance;
- the (tW+a) two-coefficient differential polynomial and signed interference templates;
- the map from (c_{a\Phi},c_{\widetilde W}) and heavy-meson coefficients to the exact five-coordinate source convention;
- joint RG, electroweak and hadronic threshold covariance;
- whether either edge can meet AZ-071's 438-ppm discovery or 0.279-percent reduction-certification budgets.

## Implication

The next calculation is now sharply reproducible: generate each process with both relevant coefficients active and fit the differential rate to

\[
d\sigma=c_i^2F_{ii}+2c_ic_jF_{ij}+c_j^2F_{jj},
\]

retaining the sign and covariance of (F_{ij}). Then transport both coefficient pairs into one declared source basis across the electroweak threshold. If either fitted (F_{ij}) vanishes after cuts or is nuisance-collinear, that edge dies and a different process is required. If both survive but their phase conventions cannot be transported, the graph remains two disconnected experiments. Only if both survive one matching and covariance ledger does the signed incidence relation become experimentally addressable.
