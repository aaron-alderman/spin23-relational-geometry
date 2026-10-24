# Physical energy-current construction gate

**Date:** 24 October 2026  
**Status:** exact construction rule and executable finite-matrix certificate; periodic finite-range witness closed in [AZ-039](admissibility_39_periodic_physical_energy_current_bridge.md); production implementation open  
**Parent:** [Wide frontier atlas](admissibility_32_wide_frontier_atlas_and_iterative_research_queue.md)  
**Evidence:** [Physical energy-current gate](../../../evidence/data/admissibility-physical-energy-current-gate-v1.json)  
**Verifier:** [Exact current-construction certificate](../../../verification/admissibility/verify_physical_energy_current_gate.mjs)

## Result

The two-current Planckian transport lane now has an exact operator-construction rule, but not yet a production current in the authors' FTLM code. The correct unit of construction is not a remembered closed-form (t)-(J) current. It is the **same tagged local-term decomposition that constructs the numerical Hamiltonian**.

Write

\[
H=\sum_a h_a,
\qquad
P_E^\mu=\sum_a r_a^\mu h_a,
\]

where every Hermitian term (h_a) carries a support centre (r_a). Define directed energy transfer

\[
j_{a\to b}=i[h_a,h_b]=-j_{b\to a}.
\]

Then

\[
\dot h_a=i[H,h_a]=-\sum_bj_{a\to b}
\]

and, on an open cluster,

\[
\boxed{
J_E^\mu=i[H,P_E^\mu]
=\frac{i}{2}\sum_{a,b}(r_b^\mu-r_a^\mu)[h_a,h_b].
}
\]

This formula is both the derivation and a software architecture: build the same sparse terms used by (H), retain their geometry, and generate the current from their nonzero commutators.

## What the source audit changes

At audited revision `95fb9ceeb76de1210a86691c6fecd0e36ee0d264`, the public script is not a bare nearest-neighbour model. Its tagged matrix channels include nearest- and next-nearest-neighbour hopping, nearest- and next-nearest-neighbour exchange, an Ewald-treated long-range density interaction and twisted-boundary Peierls phases. The charge current is assembled from flux derivatives of hopping channels. There is no analogous full physical energy-current builder.

Therefore a standard nearest-neighbour expression would be incomplete. The required (J_E) contains every nonzero cross-commutator among kinetic, exchange and density-interaction terms, with the (t'), (J'), (V) and boundary-winding conventions inherited from the Hamiltonian itself.

## The proxy firewall

The diagnostic operator

\[
J_E^{\rm proxy}=\frac12\{H,J_N\}
\]

is still useful for exercising a matrix estimator. In the energy basis, however,

\[
\langle m|J_E^{\rm proxy}|n\rangle
=\frac{E_m+E_n}{2}\langle m|J_N|n\rangle.
\]

It therefore imports a prescribed energy-centroid weighting of the charge-current matrix elements rather than an independently conserved energy-flow channel. Under an arbitrary energy-zero shift (H\mapsto H+cI), it changes as (J_E^{\rm proxy}\mapsto J_E^{\rm proxy}+cJ_N), whereas (i[H,P_E]) is unchanged. This is acceptable for plumbing tests and forbidden for physical thermoelectric rank or new-physics claims.

## Periodic-boundary obstruction

The open-cluster identity is exact. A torus has no globally single-valued Cartesian position, so naively wrapping (r_a) inside (P_E) creates a seam artifact. The production code needs one declared periodic construction—an oriented seam current, a long-wavelength continuity limit or an energy-twist derivative—and must show agreement with the open-cluster oracle before extrapolation.

Two invariance tests are compulsory:

1. translate the chosen seam around the torus;
2. repartition local energy among overlapping terms while preserving (H).

Finite-frequency currents can change by a total time derivative under energy-density repartition. This is not an ignorable nuisance: it is a finite-size/gauge dependence to be bounded. Transverse thermal transport would additionally require energy-magnetization subtraction; the present gate concerns the longitudinal two-current matrix.

## Production implementation

The shortest faithful route is:

1. attach coefficient, support, centre, displacement, winding and family tags to every sparse Hamiltonian contribution;
2. construct small-cluster (h_a) matrices and only the nonzero (i[h_a,h_b]);
3. pass Hermiticity, antisymmetry, local continuity and polarization-equality checks on open clusters;
4. implement and compare periodic seam/twist conventions;
5. apply (J_N) and (J_E) to the same FTLM random vectors;
6. retain the complex cross spectrum and form (C_{NN},C_{NE},C_{EE}) with identical samples and bins;
7. bootstrap over random vectors and fluxes, then scan temperature, filling, cluster, broadening and local-energy gauge.

The included verifier executes the algebra on an exact three-level witness. It checks Hamiltonian reconstruction, local and global conservation, equality of the graph and polarization currents, Hermiticity, invariance under an additive energy zero, the proxy shift identity and positivity of an aggregated two-current spectral matrix.

## Decision tree

- **Physical matrix remains rank one:** one dissipative transport combination dominates the tested window. That is useful strange-metal structure, not evidence for microscopic (Spin(2,3)).
- **Physical matrix is robustly rank two:** the response occupies the interior of the positive cone. Next test heat-current congruence, scaling collapse and out-of-sample thermoelectric predictions.
- **A negative eigenvalue appears:** the estimator, complex cross-spectrum convention or sampling has failed. Stop interpretation.
- **The result moves with seam or energy partition:** the finite-size current is unresolved. Enlarge the cluster or change the periodic construction.
- **The Planckian window disappears:** the scalar result does not extend to the thermoelectric sector. Record the negative bound; it still removes a false bridge.

## Frontier consequence

This lane is no longer blocked by the abstract question “what is the energy current?” It is blocked by a finite engineering task: refactor the Hamiltonian into geometrically tagged terms and validate one periodic convention. That keeps it near the top of the execute-now queue because either rank outcome is informative and the failure modes are localizable.

## Subsequent bridge

[AZ-039](admissibility_39_periodic_physical_energy_current_bridge.md) implements an oriented minimum-image current graph on an interacting periodic witness and certifies seam-origin invariance, translation covariance, the open-cluster limit, the local-energy repartition identity and a strictly interior positive two-current response. This closes the periodic convention for a declared finite-range, non-antipodal domain. Refactoring the audited two-dimensional \(t\)-\(J\) source and resolving its long-range Ewald terms remain open.

## Primary sources

- Fratini and Ciuchi, [Planckian-(tJ) public source](https://github.com/djfrat/Planckian-tJ).
- Fratini and Ciuchi, [*Strange metal behaviour from underlying bad metallicity*](https://www.nature.com/articles/s41567-026-03441-x).
- Guo et al., [lattice energy-current formalism in *Resonant thermal Hall effect of phonons coupled to dynamical defects*](https://pmc.ncbi.nlm.nih.gov/articles/PMC9674268/).
- Zotos et al., [*Transport and conservation laws*](https://arxiv.org/abs/cond-mat/9611007).
- Paul and Kotliar, [*Thermal Transport for Many Body Tight-Binding Models*](https://arxiv.org/abs/cond-mat/0211538).
