# Six Inequivalent Gaps Require a Type Firewall Before the Yang–Mills Problem Can Join Spin(2,3)

**Date:** 20 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** exact gap taxonomy and finite witnesses; no four-dimensional Yang--Mills mass-gap proof

**Depends on:** [the joined Yang--Mills/QFT gate](1587_sakharov_t_yang_mills_and_vacuum_energy_form_a_joint_cosmological_qft_closure_gate.md), [the typed confinement lane](1588_eight_external_phenomena_define_typed_validation_lanes_not_one_spin23_explanation.md), [the Lense--Thirring rotating-source gate](1589_lense_thirring_is_the_vector_sector_gravity_gate_beyond_the_scalar_geopotential.md), [the finite label mass gap](1539_the_sixteen_state_repair_rotates_the_anomaly_free_two_torus_and_its_link_vevs_can_both_higgs_it_and_open_the_label_level_mass_gap.md), [the quantum-Hall bulk gap](1585_quantum_hall_bulk_boundary_dynamics_realizes_index_three_but_not_the_z3_flavor_frame.md), and [the Liouvillian distinction](../0600-0699/691_the_topology_pauli_lindbladian_converges_exactly_to_the_cp_selector_but_depolarizes_the_topology_qubit.md)

**Evidence:** [gap-type ledger](../../../evidence/data/spin23-mass-gap-type-firewall.json) and [deterministic verifier](../../../verification/verify/verify_spin23_mass_gap_type_firewall.mjs)

## Result

The word *gap* names at least six inequivalent statements already present in the programme:

\[
\boxed{
\Delta_{\rm finite},\quad
\Delta_{\rm Hessian},\quad
\Delta_{\rm band},\quad
\Delta_{\mathcal L},\quad
\Delta_{T,L,a},\quad
\Delta_{\rm QFT}.}
\]

Only the last, established in a nontrivial infinite-volume continuum compact Yang--Mills theory with a reconstructed physical Hilbert space, addresses the Clay problem. No finite matrix, stable vacuum, topological band, dissipative decay rate or finite lattice transfer spectrum can be promoted to it without proving the missing limits and positivity conditions.

## The six types

| Type | Object | Gap | Missing promotion datum |
|---|---|---|---|
| Finite operator | Dirac/adjacency/response matrix | least nonzero singular value | large-carrier and continuum control |
| Vacuum Hessian | physical quadratic fluctuations | least positive mass squared | gauge quotient, quantum stability, continuum QFT |
| Topological band | Bloch/bulk Hamiltonian | occupied--empty band separation | interacting and spacetime/internal lift |
| Liouvillian | open-system generator | least nonzero decay rate | closed unitary Hamiltonian spectrum |
| Finite transfer | lattice transfer matrix | \(-a_t^{-1}\log(\lambda_1/\lambda_0)\) | uniform thermodynamic and continuum limits |
| QFT spectral | reconstructed physical Hamiltonian | \(\inf(\operatorname{spec}H\setminus\{0\})\) | this is the target statement |

These distinctions do not diminish the earlier finite results. They specify exactly what each result proves.

## One verified comparison packet

The evidence ledger evaluates five deliberately elementary witnesses:

- the Hessian \(\begin{psmallmatrix}4&1\\1&3\end{psmallmatrix}\) has minimum eigenvalue \((7-\sqrt5)/2\simeq2.381966\);
- the two-band QWZ model at parameter \(m=-1\) has minimum \(|E|=1\);
- the decay spectrum \(\{0,-0.4,-0.6,-1\}\) has Liouvillian gap \(0.4\);
- transfer eigenvalues \((1,e^{-0.7})\) give a finite-volume transfer gap \(0.7\); and
- \(C(t)=e^{-0.7t}+0.3e^{-1.8t}\) has effective mass tending to \(0.7\).

All five calculations pass. None establishes a uniform nonzero limit as volume tends to infinity and lattice spacing tends to zero, constructs the interacting measure, proves reflection positivity, or reconstructs the full gauge-invariant Hamiltonian. The verifier therefore demonstrates both the usefulness and the logical insufficiency of finite gap witnesses.

## The actual four-dimensional Yang--Mills gate

The official target is to prove, for every compact simple gauge group \(G\), that a nontrivial quantum Yang--Mills theory exists on \(\mathbb R^4\) and has

\[
\operatorname{spec}(H)\subseteq\{0\}\cup[\Delta,\infty),
\qquad \Delta>0.
\]

In a Euclidean route, the joined promotion gate requires:

1. a compact simple gauge group and local gauge-invariant regulator;
2. a nontrivial interacting continuum limit;
3. Euclidean covariance, reflection positivity, regularity and clustering sufficient for reconstruction;
4. controlled infinite-volume and zero-lattice-spacing limits;
5. a gauge-invariant physical Hilbert space and Hamiltonian;
6. a declared vacuum sector; and
7. a uniform positive lower bound on every nonvacuum physical state.

Dimensional transmutation provides a candidate scale, and lattice glueball correlations provide strong evidence, but neither substitutes for this conjunction.

## Spin(2,3) boundary

The whole Spin(2,3) connection must not be assigned the Clay gap. Spin(2,3) is noncompact and is being used as a broken spacetime Cartan group. Moreover, ordinary long-range gravity requires a massless spin-2 sector. The admissible gravitational question is sector selective:

\[
\boxed{
\Delta_{\rm spin\,2}=0,
\qquad
\Delta_{\rm torsion/coset/extra}>0,
}
\]

provided the latter excitations have positive residues and are neither ghosts nor tachyons. Lense--Thirring then tests the surviving massless rotating-source response rather than the gapped auxiliary sector.

The internal question is separate. An E6 or Spin(10) breaking chain may deliver \(SU(3)_c\) representations and couplings, but the resulting compact color theory must generate its own infrared scale and gauge-invariant spectrum. Representation branching is not confinement, and a Higgs mass is not the pure Yang--Mills mass gap.

## Exhaustion map

The presently tractable work splits cleanly:

1. **Compact-QFT arm:** formulate a reflection-positive lattice/constructive route and identify which estimates must be uniform in volume and cutoff.
2. **Gravity arm:** derive the quadratic physical spectrum of a declared broken Spin(2,3) action and require one massless positive-residue spin-2 pole.
3. **Real-form arm:** use compact Spin(5) only as a controlled algebraic sandbox; audit every positivity step before continuation to Spin(2,3).
4. **Internal arm:** run the E6 threshold chain to a normalized \(SU(3)_c\) action, then hand the infrared problem to nonperturbative color dynamics.
5. **Observable arm:** compare gauge-invariant correlators and spectral poles, never gauge-fixed connection masses alone.

No shorter identification remains. A future claim must state which gap it addresses and supply the corresponding promotion data.

## Sources

- [Clay overview: Yang--Mills and the mass gap](https://www.claymath.org/millennium/yang-mills-the-maths-gap/)
- [Official Jaffe--Witten problem description](https://www.claymath.org/library/monographs/MPPc.pdf)
- [Fradkin--Shenker continuity review](https://arxiv.org/abs/1704.06201)

## Reproduction

~~~powershell
node verification/verify/verify_spin23_mass_gap_type_firewall.mjs
~~~
