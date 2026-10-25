# Frontier Wave 7.155: Sparse Cross-Sector Tomography with Blind Held-Out Seeds

**Date:** 25 October 2026

**Status:** executable statistical protocol; no laboratory data claimed

**Evidence:** [tomography protocol](../../../../evidence/data/moonshine-cross-sector-sparse-tomography-protocol-v1.json)

**Certificate:** [shot-budget verifier](../../../../verification/verify/verify_moonshine_cross_sector_sparse_tomography_protocol.mjs)

## Primary discriminating experiment

For each of the 24 marked norm-four seeds, prepare

\[
 |\psi_i\rangle={|\alpha_i\rangle\over2}\otimes|s\rangle,
 \qquad
 |\phi_i\rangle={|\alpha_i\rangle\over2}\otimes P_{[\alpha_i]}|s\rangle.
\]

The normalized transition amplitude of the actual minimal-vector zero mode is

\[
 \langle\phi_i|O_{\alpha_i}|\psi_i\rangle=-{7\over8}.
\]

A bare-Pauli emulator predicts \(+1\), because it omits the rank-one
Heisenberg channel factor. The separation is \(15/8\), including a sign flip;
this is much stronger than matching the dimension 98304 or a zero trace.

## Blind split

Randomly commit eight of the 24 seeds as a blind holdout before fitting the
channel basis, Pauli frame or Clifford phases. Use the other sixteen for
calibration, freeze every convention, and then open the eight amplitudes.
The gate passes only if all eight contain \(-7/8\) within absolute tolerance
0.02 and reject the \(+1\) impostor.

For outcomes rescaled to \([-1,1]\), Hoeffding plus a Bonferroni family-wise
failure probability of 0.05 gives

\[
 N\ge {2\log(2m/0.05)\over(0.02)^2}.
\]

This requires 28842 shots per blind observable, or 230736 shots for the eight
held-out seeds. Measuring all 24 at the same family-wise confidence requires
34335 each, or 824040 shots total.

## An independent anomaly test

The oscillator-bilinear family supplies a different failure mode. For a unit
channel \(u\), its diagonal zero mode is \(9/8\) along \(u\) and \(1/8\) on
the 23 orthogonal channels. A construction that contracts the half modes but
omits the twisted-vacuum anomaly predicts zero instead of \(1/8\) in those
orthogonal channels and \(o(\omega)=1/2\) instead of \(2\). The same 0.02
tolerance cleanly separates these hypotheses.

The remaining oscillator eigenchannels are \(+1/2\) and \(-1/2\) for an
off-diagonal pair. After restoring the norm-four channel and norm-two
\(u_\alpha\) conventions, the corresponding cross-sector product coordinate
must be \(-7/4\).

## Promotion rule

These measurements establish the non-universal cross-sector operator law,
not the Monster by themselves. Promotion requires the same physical carrier
to pass the Leech edge, inversion gauging, \(98580+98304\) sector split,
\(2B\) trace 276, marked \(23AB\) and order-46 tests, and held-out
Norton--Sakuma closure. Leakage, metric error, Pauli-frame drift, Clifford
error, higher-level mixing and label-correlated postselection are explicit
nuisance hypotheses.

## Corpus links

- [Cross-sector Griess product oracle](frontier_wave7_154_moonshine_cross_sector_griess_product_oracle.md)
- [Laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
- [Operator-tomography dictionary](frontier_wave7_135_monster_edge_operator_tomography_dictionary.md)
