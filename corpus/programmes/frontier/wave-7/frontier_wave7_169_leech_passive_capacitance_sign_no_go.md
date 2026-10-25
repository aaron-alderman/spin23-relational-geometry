# Frontier Wave 7.169: Passive-Capacitance Sign No-Go for the Dual Leech Metric

**Date:** 25 October 2026

**Status:** exact no-go for one literal circuit mapping; broader circuit synthesis open

**Evidence:** [capacitance sign audit](../../../../evidence/data/leech-passive-capacitance-sign-no-go-v1.json)

**Certificate:** [cycle-frustration verifier](../../../../verification/verify/verify_leech_passive_capacitance_sign_no_go.mjs)

## The most literal circuit mapping fails

Suppose the dual-coordinate rotor kinetic energy is implemented directly as

\[
 H_C={E\over2}n^T K^{-1}n.
\]

An ordinary node-flux circuit has charging energy proportional to
(n^T C^{-1}n), so this identification requires (C\propto K). A network
made only from positive mutual and ground capacitances has
(C_{ij}\leq0) for (i\ne j). Local reversal of a canonical coordinate is
allowed, so the actual question is whether a diagonal sign matrix (D) can
make every off-diagonal entry of (DKD) nonpositive.

It cannot. In one-based channel labels, the triangle (1,2,5) has edges

\[
 K_{12}=-2,\qquad K_{25}=-2,\qquad K_{51}=+2.
\]

Their product is (+8). The sign product around any cycle is invariant under
(K\mapsto DKD), because each vertex sign occurs twice. But three nonzero
nonpositive mutual-capacitance entries have a negative product. Therefore no
choice of node polarities makes this (K) an ordinary passive node
capacitance matrix. The verifier exhausts all eight sign assignments on the
witness triangle and finds a positive edge every time.

Across the full matrix there are 88 positive, 103 negative and 85 zero
off-diagonal pairs. The single triangle is already a complete obstruction;
the global counts describe the engineering scale, not the proof.

## What this changes

Wave 7.139 moved the many-field cosine burden into the quadratic form. This
audit shows that the move does not give a direct 24-node, capacitor-only
Josephson array for free. The next hardware fork is now concrete:

1. synthesize the signed 24-mode mixing with transformer, resonator,
   inductive, driven or active-mediated couplers and verify its measured
   admittance; or
2. keep a simple passive kinetic network and implement the original
   12-to-22-field cosine columns; or
3. retain the digital integral-mixer route and certify the effective
   low-energy isometry.

This is progress because it prevents an invalid schematic from masquerading
as a physical realization and names the extra hardware resource that must be
supplied.

## Boundary

The no-go is deliberately narrow. The Leech (K) matrix is a topological
response and commutation form, not inherently a capacitance matrix. The
result rejects only the exact identification (C\propto K) in an ordinary
positive-capacitor node network, even after local polarity choices. It does
not reject the continuum coupled-wire construction, mediated or driven
networks, digital simulation, the original-coordinate interaction scheme or
an approximate low-energy realization with a measured isometry.

## Sources and corpus links

- Krantz et al., [*A Quantum Engineer's Guide to Superconducting Qubits*](https://doi.org/10.1063/1.5089550).
- Rasmussen et al., [*Superconducting Circuit Companion*](https://doi.org/10.1103/PRXQuantum.2.040204).
- [Unimodular dual-basis compiler](frontier_wave7_139_leech_unimodular_dual_basis_compiler.md)
- [Rotor-native pendulum gap](frontier_wave7_160_leech_rotor_native_pendulum_gap.md)
- [Exact free-fermion stress-lane evolution](frontier_wave7_168_leech_free_fermion_matchgate_evolution.md)
- [Exact transformer recovery selected by this no-go](frontier_wave7_170_leech_transformer_capacitance_recovery.md)
