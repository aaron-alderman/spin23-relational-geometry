# Frontier Wave 7.166: Transition-Selective Exchange Compiler

**Date:** 25 October 2026

**Status:** exact finite-cutoff logical compiler; platform-native gate synthesis open

**Evidence:** [selective-exchange compilation](../../../../evidence/data/leech-transition-selective-exchange-compiler-v1.json)

**Certificate:** [eigenbasis and selective-rotation verifier](../../../../verification/verify/verify_leech_transition_selective_exchange_compiler.mjs)

## Exact finite-cutoff construction

The leakage problem in Wave 7.165 is avoided digitally by using the actual
pendulum eigenbasis. At \(N=8\), diagonalize the 17-level local Hamiltonian
and define

\[
 X_{ij}=|1,0\rangle\langle0,1|+|0,1\rangle\langle1,0|.
\]

Then

\[
 U_{ij}(\theta)=e^{-i\theta X_{ij}}
\]

is identity on 287 of the 289 two-register eigenlabels and performs a
two-dimensional rotation only on \(|1,0\rangle,|0,1\rangle\). In particular,

\[
 U(\pi/4)|1,0\rangle
 ={ |1,0\rangle-i|0,1\rangle\over\sqrt2},\qquad
 U(\pi/2)|1,0\rangle=-i|0,1\rangle.
\]

The ideal finite-cutoff leakage outside the selected subspace is exactly
zero. The strong hopping lane can therefore be implemented without relying
on the natural \(\sin\theta\sin\theta\) projection.

## Basis-change resources

An arbitrary real 17-dimensional eigenbasis needs at most 136 Givens
rotations. Reflection symmetry improves the bound:

- eight pair rotations form even/odd momentum combinations;
- the parity blocks have dimensions 9 and 8;
- their generic diagonalizations need at most \(36+28=64\) Givens rotations.

Thus one local basis transform needs at most 72 single-register Givens
rotations. It is performed once at input and once at output; the dynamics can
remain in the eigenbasis.

| open-chain cells | input/output local Givens | selective exchanges per full bond step | per-exchange error for 1% step budget |
|---:|---:|---:|---:|
| 24 | 3456 | 23 | \(4.35\times10^{-4}\) |
| 72 | 10368 | 71 | \(1.41\times10^{-4}\) |
| 168 | 24192 | 167 | \(5.99\times10^{-5}\) |
| 744 | 107136 | 743 | \(1.35\times10^{-5}\) |

The error column uses the conservative telescoping allocation
\(\epsilon_{\rm gate}\le0.01/G\); it is a budget, not measured fidelity.

## Commissioning

Before using the compiler in the stress lane:

1. round-trip each local basis transform;
2. bound occupation of the fifteen unused states in a five-qubit encoding;
3. verify the \(\pi/4\) amplitudes and relative phase;
4. verify the phase-correct \(\pi/2\) excitation swap;
5. prepare all other eigenlabels and show they remain fixed;
6. measure accumulated error across one even--odd exchange layer.

Only then can the held-out 0.3, 0.4 and 0.45 hopping points be attributed to
the exact projected Hamiltonian.

## Boundary

This is a logical qudit compiler. It assumes arbitrary single-register
Givens rotations and a two-register selective Givens primitive. Decomposing
those into superconducting, ion, photonic or neutral-atom gates is a
platform-specific step. Overlapping bond layers also retain a Trotter error
unless a native analog exchange implements the full hopping Hamiltonian.

## Corpus links

- [Two-level leakage audit](frontier_wave7_165_leech_pendulum_two_level_leakage_audit.md)
- [Excitation-hopping stress lane](frontier_wave7_164_leech_pendulum_excitation_hopping_stress_lane.md)
- [Rotor-native pendulum gap](frontier_wave7_160_leech_rotor_native_pendulum_gap.md)
- [Selective-exchange Trotter budget](frontier_wave7_167_leech_selective_exchange_trotter_budget.md)
