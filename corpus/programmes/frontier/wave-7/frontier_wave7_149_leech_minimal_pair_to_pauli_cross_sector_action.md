# Frontier Wave 7.149: Leech Minimal Pairs to Pauli Cross-Sector Action

**Date:** 25 October 2026

**Status:** exact noncentral cross-sector representation map; full OPE normalization open

**Evidence:** [minimal-pair/Pauli action record](../../../../evidence/data/leech-minimal-pair-to-pauli-action-v1.json)

**Certificate:** [marked-vector and commutator verifier](../../../../verification/verify/verify_leech_minimal_pair_to_pauli_action.mjs)

## Result

The residual cross-sector action has a concrete noncentral core. Every Leech
minimal vector \(\alpha\), with \(\alpha^2=4\), defines an inversion-even
untwisted weight-two state

\[
u_\alpha=e^\alpha+e^{-\alpha}.
\]

On the twisted ground module, its class \(\alpha\bmod2\Lambda\) acts through
the extraspecial central extension, hence as the twelve-qubit Pauli label
computed in Wave 7.144.

This assignment is injective on antipodal pairs. If norm-four vectors
\(\alpha,\beta\) have the same mod-2 class, then
\(\lambda=(\alpha-\beta)/2\in\Lambda\) and

\[
\lambda^2=2-{\alpha\cdot\beta\over2}.
\]

The Leech minimum norm and Cauchy bound force either \(\lambda=0\) or
\(\alpha\cdot\beta=-4\); hence \(\beta=\alpha\) or \(-\alpha\). Thus all
98280 antipodal minimal-vector operators retain distinct finite labels.

## Executable marked dictionary

The 24 basis vectors of the sourced Gram matrix all have norm four. The
certificate reduces each modulo two and applies the exact symplectic inverse
\(S^{-1}\), producing 24 explicit twelve-qubit Pauli labels. It proves:

- the labels are nonzero and independent;
- their commutator matrix is exactly \(K\bmod2\);
- every marked noncentral action has zero twisted-ground trace; and
- the same catalogue Conway generators act covariantly through the compiled
  Clifford normalizer of Wave 7.146.

This is the first operator-resolved seed for the \(U\times T\to T\) map in the
laboratory lane: marked untwisted Leech vertex states act as specified
noncommuting gates on the pre-projection twisted ground qubits.

## Boundary

The twisted-module construction sources the representation action, while the
certificate fixes its finite labels. Its lift through the half-oscillator
projection to the retained weight-two states and the absolute OPE
normalization are not yet derived; the remaining 98256 minimal-pair labels are not enumerated as a
hardware table; and the 300 symmetric oscillator states and
\(T\times T\to U\) residual products remain to be compiled. This is a genuine
cross-sector representation bridge, not yet the full Griess algebra.

## Sources and corpus links

- Yamauchi, [Leech lattice VOA twisted module, Section 6.2](https://www.math.twcu.ac.jp/~yamauchi/math/phd/myphd.pdf).
- [Cross-sector OPE calibration](frontier_wave7_148_2b_graded_cross_sector_ope_calibration.md)
- [Conway-to-Clifford lift](frontier_wave7_146_leech_co1_to_twelve_qubit_clifford_lift.md)
- [Weight-two sector join](frontier_wave7_147_moonshine_weight2_sector_join_and_2b_trace.md)
