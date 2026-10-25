# Periodic physical energy-current bridge

**Date:** 24 October 2026  
**Status:** exact finite periodic convention, source-channel-complete open t-J oracle and dense/sparse agreement; production term emission and FTLM integration open  
**Target:** [FPT-004 assessment](../frontier-physics-targets/frontier_physics_target_assessments_v1.md#fpt-004)  
**Parent:** [Physical energy-current construction gate](admissibility_34_physical_energy_current_construction_gate.md)  
**Evidence:** [Periodic physical energy-current bridge](../../../evidence/data/admissibility-periodic-physical-energy-current-bridge-v1.json)  
**Verifier:** [Interacting periodic-ring certificate](../../../verification/admissibility/verify_periodic_physical_energy_current_bridge.mjs)

## Result

The nearest no-new-experiment frontier, FPT-004, has moved by one full layer. AZ-034 supplied the local continuity construction

\[
J_E=i[H,P_E]
=\frac{i}{2}\sum_{a,b}(r_b-r_a)[h_a,h_b]
\]

on an open cluster but left the periodic convention unresolved. This packet implements and certifies an oriented minimum-image current graph

\[
\boxed{
J_E^{(L)}=
\frac{i}{2}\sum_{a,b}
\delta_L(r_b-r_a)[h_a,h_b],
}
\]

where \(\delta_L\) is the signed representative in \((-L/2,L/2)\). An interacting pair whose term centres are exactly antipodal is rejected as ambiguous rather than silently assigned an orientation.

The convention is tested on a three-site, eight-state anisotropic spin ring with oriented XY phase, longitudinal exchange and a distributed field. Its three bond terms overlap and do not commute, so the resulting energy current is a genuine interacting commutator current rather than a one-body energy-weighted velocity.

## Closed identities

The executable certificate establishes:

1. the periodic current is nonzero and Hermitian;
2. every tagged term obeys exact local continuity;
3. moving the coordinate seam leaves the operator unchanged;
4. a one-site lattice translation conjugates the current covariantly;
5. on an unwrapped open embedding, the graph current equals \(i[H,P_E]\);
6. adding an arbitrary energy zero leaves the physical current unchanged;
7. repartitioning local energy at fixed total \(H\) changes the open current by the predicted total time derivative;
8. the particle/energy Hilbert--Schmidt response matrix is positive and strictly interior.

For the declared witness the current norm is approximately \(1.69983\), all structural residuals are zero or below \(4.1\times10^{-16}\), and

\[
\det C\approx0.131028,
\qquad
\frac{\det C}{(\operatorname{tr}C)^2}
\approx0.241770.
\]

This last number is close to, but below, the maximum \(1/4\) for a positive \(2\times2\) matrix. It proves that a continuity-derived physical current on an interacting periodic carrier is not algebraically forced onto the proxy's rank-one ray.

## Source-channel-complete t-J oracle

The external Planckian-tJ working copy used for this result contained a dependency-light tagged physical-current API (`physical_energy_current.py`), a SciPy sparse adapter (`physical_energy_current_sparse.py`), an exact no-double-occupancy t-J term builder (`tagged_tj_small_cluster.py`), 20 regression tests across the existing and new paths, and a JSON diagnostic runner (`run_tagged_tj_bridge.py`). Those four files are uncommitted working-copy additions inside a separately governed external repository, so they are deliberately **not** represented as reproducible internal links. The retained [evidence record](../../../evidence/data/admissibility-periodic-physical-energy-current-bridge-v1.json) and [independent corpus verifier](../../../verification/admissibility/verify_periodic_physical_energy_current_bridge.mjs) control the finite result; publication of the external source additions is an explicit reopening/dependency event rather than an invisible release prerequisite.

The exact open cluster carries the same five interaction families observed in the audited source:

- nearest-neighbour hopping \(t\);
- next-nearest hopping \(t'\);
- nearest-neighbour exchange \(J\);
- next-nearest exchange \(J'\); and
- pairwise density interaction \(V\).

On the four-site, two-particle constrained basis it has dimension 24 and 16 individually tagged terms. Family aggregation reproduces the tagged Hamiltonian with zero residual. The physical current has norm \(6.60224\), and the maximum local-continuity residual is \(2.84\times10^{-17}\).

Passing that current and a flux-derivative particle current through the existing two-current Lehmann evaluator gives 113 active frequency bins. Their normalized determinants satisfy

\[
3.20\times10^{-6}
\leq
\frac{\det C(\omega)}{\operatorname{tr}(C(\omega))^2}
\leq
0.233657,
\]

with median \(0.052409\). The response is Hermitian and positive semidefinite throughout the sampled grid. Thus cone-interior response survives the actual \(t,t',J,J',V\) channel grammar; it was not an artifact of the simpler spin-ring witness.

The architectural finding is equally important: the legacy `matP` tag distinguishes coefficient channels, but diagonal exchange and Ewald contributions are aggregated before individual support identity survives. A physical current cannot be recovered faithfully after that aggregation. Local term provenance must be retained while the sparse Hamiltonian is built.

The sparse adapter reproduces the dense oracle's Hamiltonian and physical current operator-for-operator and passes the same continuity check. Sparse linear algebra is therefore no longer a conceptual or implementation blocker; only production term emission and the long-range periodic definition remain.

## What has been bridged

Before this packet, the corpus had:

\[
\text{local continuity rule}
\quad\dashrightarrow\quad
\text{periodic physical current}
\quad\dashrightarrow\quad
\text{positive two-current response}.
\]

The first dashed arrow is now exact for the declared finite-range, non-antipodal tagged-term domain, and the second is realized by an interacting finite witness. The result directly joins the AZ-034 operator construction to the FPT-004 positive-cone observable without an experimental dependency.

## What remains open

This is not yet the production Planckian \(t\)-\(J\) result. The audited source combines two-dimensional nearest- and next-nearest hopping, exchange, long-range Ewald density interactions and twisted-boundary phases. Its present sparse representation tags matrix entries by channel but not by the individual local term, support centre and winding data required by the physical-current builder.

The remaining bridge is therefore source engineering plus controlled comparison:

1. port the tested `TaggedTerm` schema into the audited sparse Hamiltonian builder;
2. attach centres, support and winding to every hopping, exchange and density contribution;
3. compare minimum-image, oriented-seam and energy-twist currents on small source-native periodic clusters;
4. insert the selected current into the existing common-sample three-spectrum path;
5. scan seam, energy partition, flux, size, temperature, filling and broadening before interpreting rank.

Long-range Ewald interactions are the main limitation of the minimum-image convention. They can couple term centres across half the torus and may require an oriented-seam or energy-twist definition instead. The certificate rejects the ambiguous case; it does not hide it.

## Admission consequence

FPT-004 advances from “physical current formula known, periodic convention open” to:

> **A finite periodic physical-current convention is exact, and a source-channel-complete constrained t-J oracle produces positive cone-interior response; sparse two-dimensional FTLM integration and long-range periodic equivalence remain open.**

This is a candidate bridge, not Spin(2,3) evidence. The positive cone and its Lorentz determinant are exact kinematics of two-current response. Only a robust source-native rank result can determine whether the audited strange-metal calculation occupies a ray or the cone interior.
