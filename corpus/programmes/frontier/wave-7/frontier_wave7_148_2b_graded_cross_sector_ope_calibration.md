# Frontier Wave 7.148: \(2B\)-Graded Cross-Sector OPE Calibration

**Date:** 25 October 2026

**Status:** exact universal cross-sector anchor; Monster-specific residual open

**Evidence:** [graded OPE calibration](../../../../evidence/data/moonshine-2b-graded-cross-sector-ope-calibration-v1.json)

**Certificate:** [unit, parity and measurement-count verifier](../../../../verification/verify/verify_moonshine_2b_graded_cross_sector_ope_calibration.mjs)

## Result

The cross-sector product left open in Wave 7.147 is not wholly unknown. Let

\[
B=U\oplus T,
\qquad \dim U=98580,quad \dim T=98304,
\]

be the \(2B\)-graded weight-two Griess space. The grading forces

\[
U\circ U\subset U,qquad U\circ T\subset T,qquad T\circ T\subset U.
\]

Every invariant three-point coefficient with an odd number of twisted
arguments therefore vanishes.

The Griess identity is \(e=\omega/2\). At central charge 24,

\[
e\circ x=x,qquad \langle e,e\rangle={c\over8}=3.
\]

For orthonormal twisted probes \(t_a\), invariance of the bilinear form gives

\[
\langle e,t_a\circ t_b\rangle
=\langle e\circ t_a,t_b\rangle=\delta_{ab},
\]

and hence the exact cross-sector projection

\[
\operatorname{Proj}_e(t_a\circ t_b)={\delta_{ab}\over3}e.
\]

This is a nonzero OPE coupling between the compiled twisted block and the
untwisted block, fixed without fitting.

## Commissioning protocol

Choose 24 physically marked twisted probes. Their symmetric Gram matrix has
300 independent entries. Measure the corresponding 300 three-point
coefficients with one insertion of \(e\); the two matrices must agree. Then:

1. verify representative \(UUT\) and \(TTT\) coefficients vanish;
2. subtract \(\delta_{ab}e/3\) from every \(t_a\circ t_b\); and
3. tomograph the remaining untwisted residual against marked Conway and
   Norton--Sakuma probes.

## Boundary

The identity projection and parity selection are universal to a unitary
\(c=24\), \(\mathbb Z_2\)-graded Griess algebra. They establish that the two
resource blocks interact with the correct grading, but are not yet
Monster-specific. The discriminating object is the residual
\(T\circ T\to U\) tensor and its covariance under the compiled Conway action.

[Wave 7.149](frontier_wave7_149_leech_minimal_pair_to_pauli_cross_sector_action.md)
supplies a noncentral complementary channel: 24 marked untwisted norm-four
vertex operators act on the twisted ground module by explicit, independent
twelve-qubit Pauli labels with commutator matrix \(K\bmod2\). This closes a
covariant pre-projection seed for the \(U\times T\to T\) representation map
while leaving its half-mode lift, absolute OPE normalization and the full
residual tensor open.

## Corpus links

- [Weight-two sector join](frontier_wave7_147_moonshine_weight2_sector_join_and_2b_trace.md)
- [Operator-tomography dictionary](frontier_wave7_135_monster_edge_operator_tomography_dictionary.md)
- [Conway-to-Clifford lift](frontier_wave7_146_leech_co1_to_twelve_qubit_clifford_lift.md)
