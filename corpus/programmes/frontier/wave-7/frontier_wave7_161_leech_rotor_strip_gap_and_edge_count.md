# Frontier Wave 7.161: Rotor-Strip Gap and Edge Count

**Date:** 25 October 2026

**Status:** exact ideal-strip pairing plus numerical local gap; thermodynamic phase certification open

**Evidence:** [strip pairing and thermal record](../../../../evidence/data/leech-rotor-strip-gap-and-edge-count-v1.json)

**Certificate:** [pairing, spectrum and perturbation verifier](../../../../verification/verify/verify_leech_rotor_strip_gap_and_edge_count.mjs)

## From one bond to a strip

In the dual Leech basis, every open-strip interaction pairs

\[
 R_{y,I}\longleftrightarrow L_{y+1,I},
 \qquad I=1,\ldots,24.
\]

These pairs are disjoint: no chiral mode occurs in two ideal locking terms.
For \(Y\) wires, the microscopic surrogate therefore factorizes into
\(24(Y-1)\) copies of the convergent Wave 7.160 pendulum, leaving only

\[
 \{L_{1,I}\}_{I=1}^{24},\qquad
 \{R_{Y,I}\}_{I=1}^{24}
\]

unpaired. These are exactly 24 oppositely located chiral boundary modes on
each edge. Closing the strip periodically adds the missing \(Y\to1\) bond
and leaves zero unpaired modes.

The verifier constructs every endpoint explicitly and rejects any reuse. The
ideal mode count is consequently a finite matching theorem, not an inferred
picture.

## Gap and finite-size targets

Every ideal bulk pair has the fixed-strength rotor gap

\[
 \Delta_{\rm loc}=0.8784249806868974
\]

at cutoff \(N=8\). Because the strip Hamiltonian is a tensor sum of the
disjoint pendula, its first bulk excitation has the same gap for every
recorded width rather than a width-dependent \(p^{-2}\) collapse.

| wires \(Y\) | bulk pendula | gapped chiral modes | edge modes |
|---:|---:|---:|---:|
| 2 | 24 | 48 | 48 |
| 3 | 48 | 96 | 48 |
| 4 | 72 | 144 | 48 |
| 8 | 168 | 336 | 48 |
| 16 | 360 | 720 | 48 |
| 32 | 744 | 1488 | 48 |

The probability that *any* ideal bulk pendulum is thermally excited grows
with strip width even though the spectral gap does not close. At 10 mK, the
one-percent whole-strip target requires the energy-unit frequency to rise
from 1.84753 GHz for two wires to 2.65993 GHz for 32 wires. This logarithmic
thermal burden must not be confused with spectral gap collapse.

## Finite-device perturbation certificate

For a finite device \(H=H_0+V\), eigenvalue stability gives

\[
 \Delta(H)\ge\Delta(H_0)-2\lVert V\rVert.
\]

Thus a calibrated global perturbation norm of \(0.1\Delta_{\rm loc}\)
certifies a remaining gap at least 0.7027399845; at
\(0.25\Delta_{\rm loc}\), at least 0.4392124903 remains. This is useful for
small prototypes but deliberately not presented as a thermodynamic theorem:
the global norm of an extensive local perturbation generally grows with
system size.

## What moved and what remains

The rotor route now passes three tests that the naïve clock route did not:

1. local gap convergence at fixed control strengths;
2. no ideal strip-width gap collapse;
3. exact survival of 48 open-boundary modes and their disappearance under
   periodic closure.

This is still not a laboratory Leech phase. The unpaired fields must acquire
the correct chiral dispersion and Leech commutator matrix, and the interacting
bulk gap must remain stable under local—not merely globally bounded—
perturbations. Thermal Hall response, finite-size Casimir scaling and the
24-current edge spectrum are the next decisive measurements.

## Corpus links

- [Rotor-native pendulum gap](frontier_wave7_160_leech_rotor_native_pendulum_gap.md)
- [Leech coupled-wire blueprint](frontier_wave7_131_leech_coupled_wire_null_vector_blueprint.md)
- [Integral dual-basis compiler](frontier_wave7_139_leech_unimodular_dual_basis_compiler.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
- [Leech-edge chiral-dispersion preregistration](frontier_wave7_162_leech_edge_chiral_dispersion_preregistration.md)
- [Fixed-cutoff local bulk-gap stability](frontier_wave7_163_leech_fixed_cutoff_local_gap_stability.md)
