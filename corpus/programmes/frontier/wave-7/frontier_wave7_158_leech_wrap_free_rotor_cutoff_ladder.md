# Frontier Wave 7.158: Wrap-Free Leech Rotor-Cutoff Ladder

**Date:** 25 October 2026

**Status:** exact bounded-subspace guarantee and alias falsifier; continuum convergence open

**Evidence:** [cutoff ladder](../../../../evidence/data/leech-wrap-free-rotor-cutoff-ladder-v1.json)

**Certificate:** [integer inverse and no-wrap verifier](../../../../verification/verify/verify_leech_wrap_free_rotor_cutoff_ladder.mjs)

## The correction

Wave 7.157 chose \(p=853\) so every entry of \(K^{-1}\), whose largest
absolute value is 422, has an unambiguous centered residue. That makes the
modular circuit coefficient-faithful. It does **not** make its action
wrap-free on a simultaneous 24-channel rotor cutoff.

Exact inversion gives

\[
 \lVert K^{-1}\rVert_\infty
 =\max_i\sum_j |(K^{-1})_{ij}|=2579,
 \qquad
 \lVert K\rVert_\infty=39.
\]

Therefore, for \(\lVert n\rVert_\infty\le N\) and
\(\lVert m\rVert_\infty\le M\), a sufficient exact no-alias condition is

\[
 p>2\max(2579N,39M).
\]

Within this box, centered modular decoding of \(K^{-1}n\) and \(K^Tm\)
equals the integer result exactly. This controls the basis-change error
before dynamics or measurement are added.

## A direct falsifier

The fourth row of \(K^{-1}\) is

\[
(-305,25,-3,422,287,156,108,276,-114,-181,-149,37,
-76,-50,-58,-53,40,40,52,29,27,-30,30,-31).
\]

Choosing the unit-cube input with matching signs produces integer output
2579 on channel four. The \(p=853\) circuit instead decodes that component as
20. Thus the smaller register is an exact modular simulator but demonstrably
not even a wrap-free \(N=1\) rotor simulator.

The first safe prime is \(p=5167\). The calibration experiment is simple:
prepare the marked sign vector, run the mixer without interacting evolution,
and demand decoded output 2579. This test should precede every claimed
continuum extrapolation.

## Resource ladder

| rotor cutoff \(N\) | first sufficient prime \(p\) | bits/qudit | binary qubits/24-channel block |
|---:|---:|---:|---:|
| 1 | 5167 | 13 | 312 |
| 2 | 10321 | 14 | 336 |
| 4 | 20639 | 15 | 360 |
| 8 | 41269 | 16 | 384 |
| 16 | 82529 | 17 | 408 |
| 32 | 165059 | 18 | 432 |
| 64 | 330131 | 19 | 456 |

Each rung uses 556 modular linear gates per chiral block under the same
Gaussian-elimination compiler. The register cost grows only logarithmically
with \(N\), while the controlled-add arithmetic cost hidden inside each
logical qudit gate still grows with bit width.

## What this proves and does not prove

The finite mixer now has two clearly typed modes:

- \(p=853\): exact coefficient-faithful modular emulation;
- \(p\ge p_N\): exact integer action throughout a declared bounded rotor box.

Neither is by itself continuum convergence. A Gate-A claim must additionally
show decreasing energy-cutoff and Trotter errors, a stable bulk gap, and
finite-size scaling to 24 chiral Leech edge modes. The present result removes
one aliasing ambiguity and supplies a preflight failure signal; it does not
manufacture the missing phase.

## Corpus links

- [Finite-qudit Leech channel mixer](frontier_wave7_157_leech_finite_qudit_channel_mixer.md)
- [Integral dual-basis compiler](frontier_wave7_139_leech_unimodular_dual_basis_compiler.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
- [Clock-locking gap scaling](frontier_wave7_159_leech_clock_locking_gap_scaling.md)
