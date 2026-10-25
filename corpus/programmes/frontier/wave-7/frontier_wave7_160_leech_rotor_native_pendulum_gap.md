# Frontier Wave 7.160: Rotor-Native Leech Pendulum Gap

**Date:** 25 October 2026

**Status:** executable convergent relative-mode surrogate; full coupled-wire phase open

**Evidence:** [rotor-native spectrum](../../../../evidence/data/leech-rotor-native-pendulum-gap-v1.json)

**Certificate:** [tridiagonal Sturm verifier](../../../../verification/verify/verify_leech_rotor_native_pendulum_gap.mjs)

## The selected alternative

Wave 7.159 rules out a fixed-strength cyclic clock penalty as a stable cutoff
route. The minimal rotor-native replacement keeps the integer momentum
physical and truncates it without cyclic wrap:

\[
 H_N={U\over2}n^2+u(1-\cos\theta),\qquad n=-N,\ldots,N.
\]

In the momentum basis, this is a tridiagonal matrix with diagonal
\(Un^2/2+u\) and nearest-neighbor entries \(-u/2\). The boundaries are open:
the shift stops at \(\pm N\), rather than wrapping \(N\) into \(-N\).

For the dimensionless benchmark \(U=u=1\), deterministic tridiagonal
Sturm bisection gives:

| \(N\) | levels | ground energy | first gap |
|---:|---:|---:|---:|
| 1 | 3 | 0.5000000000 | 1.0000000000 |
| 2 | 5 | 0.4656460883 | 0.8829660928 |
| 4 | 9 | 0.4649351573 | 0.8784250866 |
| 8 | 17 | 0.4649351477 | 0.8784249807 |
| 16–64 | 33–129 | 0.4649351477 | 0.8784249807 |

The relative gap error is \(5.17\times10^{-3}\) at \(N=2\) and
\(1.21\times10^{-7}\) at \(N=4\). It is numerically saturated at the recorded
precision by \(N=8\), with fixed \(U\) and \(u\). This avoids the
\(p^2\)-strength burden of the cyclic-clock construction.

## Thermal commissioning

Using the complete truncated spectrum rather than a first-gap bound, 24
independent relative channels have at most one-percent probability of any
excitation when

\[
 \beta E_{\rm unit}\ge8.8667516976,
 \qquad
 \beta\Delta\ge7.7887761888.
\]

At 10 mK, the benchmark requires an energy-unit frequency of at least
1.84753 GHz, corresponding to a physical first gap of 1.62292 GHz.

## Implementation meaning

This selects signed bounded-integer registers with guarded noncyclic shifts,
or native quantum rotors, over a cyclic clock whose adjacent angular labels
set the gap. It is most natural if the dual Leech fields are exposed as the
hardware coordinates. If the \(K^{-1}\) mixer is executed dynamically, every
register must instead satisfy the Wave 7.158 overflow bound.

The result advances the microscopic route in a specific way:

- the local locking mode has a cutoff-stable gap at fixed control strength;
- \(N=4\) already provides a \(10^{-7}\)-level gap benchmark;
- an exact thermal histogram target is available before interwire tests.

It does not yet establish Gate A. The 24-fold product omits propagation along
the wires, the velocity matrix, gauge fluctuations and the thermodynamic
two-dimensional bulk. A complete carrier must retain this local gap while
showing 24 net chiral edge modes and the Leech \(K\)-matrix response.

## Corpus links

- [Clock-locking gap no-go](frontier_wave7_159_leech_clock_locking_gap_scaling.md)
- [Wrap-free cutoff ladder](frontier_wave7_158_leech_wrap_free_rotor_cutoff_ladder.md)
- [Integral dual-basis compiler](frontier_wave7_139_leech_unimodular_dual_basis_compiler.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
