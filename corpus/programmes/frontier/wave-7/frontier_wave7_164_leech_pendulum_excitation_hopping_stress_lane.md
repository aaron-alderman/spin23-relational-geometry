# Frontier Wave 7.164: Pendulum Excitation-Hopping Stress Lane

**Date:** 25 October 2026

**Status:** exact projected perturbation family; general local stability radius open

**Evidence:** [hopping stress record](../../../../evidence/data/leech-pendulum-excitation-hopping-stress-lane-v1.json)

**Certificate:** [dispersion and gap verifier](../../../../verification/verify/verify_leech_pendulum_excitation_hopping_stress_lane.mjs)

## A perturbation radius with a number

Wave 7.163 proves that some volume-independent local stability neighborhood
exists at fixed cutoff, but does not calculate its radius. One physically
transparent perturbation lane is exactly solvable after projecting every
converged pendulum onto its ground and first-excited states:

\[
 H_{\rm eff}=\Delta\sum_j b_j^\dagger b_j+
 t\sum_j(b_j^\dagger b_{j+1}+b_{j+1}^\dagger b_j),
\qquad
\Delta=0.8784249806868974.
\]

In the one-excitation sector,

\[
 E(k)=\Delta+2t\cos k.
\]

For an even periodic chain the exact band-edge gap is

\[
 \Delta_{\rm eff}=\Delta-2|t|,
\]

so this declared perturbation family closes at

\[
 |t_c|={\Delta\over2}=0.4392124903434487.
\]

Unlike a global-norm bound, this is an extensive local perturbation whose
total norm grows with system size while its closure point remains fixed.

## Stress ladder

| \(|t|/\Delta\) | remaining gap |
|---:|---:|
| 0.10 | 0.7027399845 |
| 0.20 | 0.5270549884 |
| 0.30 | 0.3513699923 |
| 0.40 | 0.1756849961 |
| 0.45 | 0.0878424981 |
| 0.49 | 0.0175684996 |
| 0.50 | 0 |

For an open chain of \(M\) cells, the band edge is

\[
 \Delta-2|t|\cos{\pi\over M+1}.
\]

At \(|t|/\Delta=0.4\), it falls from 0.1812263108 for 24 cells to
0.1756912443 for 744 cells, approaching the periodic value from above.

## Time-domain protocol

Prepare one marked bulk pendulum in its first excited state and every other
cell in its ground state. Measure both real-space spreading and
momentum-resolved oscillation frequencies. Data below
\(|t|/\Delta=0.2\) calibrate \(\Delta\) and \(t\); the points 0.3, 0.4 and
0.45 are held out and must land on the predicted cosine band and gap edge.

Early gap closure is informative. If it coincides with population of higher
pendulum levels, the two-state dictionary has failed; if not, the declared
local hopping Hamiltonian is incomplete. Either outcome blocks promotion.

## Boundary

The number \(t_c=\Delta/2\) is not the general perturbative stability radius.
It belongs to a number-conserving two-level hopping family. Arbitrary local
terms can mix higher pendulum levels, break the effective number symmetry or
couple to the open edge. This lane supplies a quantitative stress calibration
inside the broader 72-setting scan; it does not replace that scan or the
fixed-cutoff theorem.

## Corpus links

- [Fixed-cutoff local gap stability](frontier_wave7_163_leech_fixed_cutoff_local_gap_stability.md)
- [Rotor-strip gap and edge count](frontier_wave7_161_leech_rotor_strip_gap_and_edge_count.md)
- [Rotor-native pendulum gap](frontier_wave7_160_leech_rotor_native_pendulum_gap.md)
- [Pendulum two-level leakage audit](frontier_wave7_165_leech_pendulum_two_level_leakage_audit.md)
