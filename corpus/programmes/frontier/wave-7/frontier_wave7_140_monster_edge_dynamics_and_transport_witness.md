# Frontier Wave 7.140: Monster-Edge Dynamics and Transport Witness

**Date:** 25 October 2026

**Status:** universal physical predictions; carrier realization remains gated

**Evidence:** [dynamics and transport record](../../../../evidence/data/monster-edge-dynamics-transport-witness-v1.json)

**Certificate:** [SI-units and spectrum verifier](../../../../verification/verify/verify_monster_edge_dynamics_transport_witness.mjs)

## Result

The Moonshine module is not a static table of dimensions. Once used as a
chiral edge Hilbert space it has the ordinary conformal Hamiltonian

\[
H={2\pi\hbar v\over L}\left(L_0-{c\over24}\right),
\qquad c=24,
\]

and hence unitary time evolution, finite-size excitation energies, momentum,
thermal occupation and transport. Its ground-state Casimir energy is
\(-2\pi\hbar v/L\). Because \((V^\natural)_1=0\), the first excited level is
at weight two:

\[
\Delta E_\natural={4\pi\hbar v\over L},\qquad
\dim(V^\natural)_2=196884.
\]

The pre-orbifold Leech edge instead has 24 weight-one currents and begins at
\(2\pi\hbar v/L\). The missing first onset is therefore a dynamical
orbifold/condensation witness, not a numerological use of 196884.

## Transport

The universal chiral thermal Hall slope is

\[
{\kappa_{xy}\over T}
=c_-{\pi^2k_B^2\over3h}
={8\pi^2k_B^2\over h}
=2.271434763932794\times10^{-11}\ \text{W K}^{-2}.
\]

This establishes the 24 units of chiral energy transport but is deliberately
not called Monster-specific: every \(c_-=24\) control has the same slope.

For a declared benchmark \(L=1\) mm and \(v=10^5\) m/s, the Leech current
onset is 100 MHz and the Monster onset is 200 MHz. The latter gap is
\(1.32521403\times10^{-25}\) J, or 9.598 mK; at 100 mK the predicted thermal
Hall conductance is \(2.2714348\times10^{-12}\) W/K. These numbers rescale
directly with \(v/L\) and are commissioning values, not a material proposal.

## Discriminating sequence

1. Thermal transport fixes \(c_-=24\).
2. Spectroscopy tests removal of the 24 weight-one Leech currents.
3. Sector-resolved weight-two spectroscopy tests
   \(196884=98580+98304\).
4. Marked defects and Griess/OPE tomography establish Monster provenance.

This makes the answer to “where are the dynamics?” explicit: they are the
Hamiltonian evolution of the VOA states and the propagation of its chiral
stress tensor. The open issue is realizing that scaling limit on a microscopic
carrier, not inventing a dynamics after the fact.

## Corpus links

- [Formal Leech-orbifold realization](frontier_wave7_129_leech_edge_orbifold_proves_formal_monster_physics.md)
- [Current ladder](frontier_wave7_130_c24_current_ladder_and_monster_detector.md)
- [Laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
- [Dual-basis coupled-wire compiler](frontier_wave7_139_leech_unimodular_dual_basis_compiler.md)
