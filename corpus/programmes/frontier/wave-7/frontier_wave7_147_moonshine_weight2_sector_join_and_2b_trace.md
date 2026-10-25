# Frontier Wave 7.147: Moonshine Weight-Two Sector Join and \(2B\) Trace

**Date:** 25 October 2026

**Status:** exact sector/central-grading join; cross-sector products open

**Evidence:** [weight-two sector join](../../../../evidence/data/moonshine-weight2-sector-join-2b-trace-v1.json)

**Certificate:** [dimension and trace verifier](../../../../verification/verify/verify_moonshine_weight2_sector_join_2b_trace.mjs)

## Result

The 98580-dimensional invariant untwisted partner left open in Wave 7.146 has
an explicit resource decomposition. At Leech weight two, inversion keeps:

1. two weight-one oscillators, giving
   \(\dim\operatorname{Sym}^2(\mathbb C^{24})=24\cdot25/2=300\); and
2. the invariant combinations \(e^\alpha+e^{-\alpha}\) for the 196560 minimal
   Leech vectors, giving 98280 antipodal pairs.

Therefore

\[
\dim(V_\Lambda^+)_2=300+98280=98580.
\]

The compiled twisted invariant sector has
\(4096\times24=98304\) states. Their direct sum gives

\[
98580+98304=196884.
\]

## Central \(2B\) detector

The orbifold quantum symmetry \(z\) acts as \(+1\) on the untwisted invariant
sector and \(-1\) on the twisted invariant sector. Its weight-two trace is
therefore not a fitted Monster number:

\[
\operatorname{Tr}_{V_2^\natural}(z)
=98580-98304=276.
\]

This is the central \(2B\) grading that joins the two independently compiled
blocks. Experimentally, total degeneracy 196884 is only the first checksum;
the sign-resolved trace 276 tests whether the proposed twist module is attached
with the correct orbifold grading.

## Boundary

The weight-two vector space, sector split, normal extraspecial action, Conway
normalizer action on the twisted side and central \(2B\) sign are now all
finite and explicit. What remains is decisive: the 98580 untwisted block must
carry its compatible Conway action on symmetric oscillators and minimal-vector
pairs, and measured OPE coefficients must reconstruct the cross-sector Griess
product. A direct sum with the right dimensions and trace is not yet the
Monster algebra.

[Wave 7.148](frontier_wave7_148_2b_graded_cross_sector_ope_calibration.md)
closes the universal part of that product: for normalized twisted probes,
\(t_a\circ t_b\) has identity projection \(\delta_{ab}e/3\), and every
three-point coefficient with odd twisted parity vanishes. The residual tensor
is the Monster-specific target.

## Corpus links

- [Current ladder and sector split](frontier_wave7_130_c24_current_ladder_and_monster_detector.md)
- [Twisted Pauli compiler](frontier_wave7_145_moonshine_weight2_twisted_pauli_compiler.md)
- [Conway-to-Clifford lift](frontier_wave7_146_leech_co1_to_twelve_qubit_clifford_lift.md)
- [Operator tomography dictionary](frontier_wave7_135_monster_edge_operator_tomography_dictionary.md)
