# Frontier Wave 7.171: Conditioning and Tolerance of the Leech Transformer Network

**Date:** 25 October 2026

**Status:** verified worst-case tolerance; basis optimization and hardware calibration open

**Evidence:** [conditioning and tolerance ledger](../../../../evidence/data/leech-transformer-conditioning-tolerance-v1.json)

**Certificate:** [Jacobi-spectrum and perturbation verifier](../../../../verification/verify/verify_leech_transformer_conditioning_tolerance.mjs)

## Mild parts do not imply a mild inverse

Wave 7.170 found positive capacitor values spanning only a factor of 16 and
transformer ratios no larger than (1/2). The complete matrix is nevertheless
ill-conditioned in the recorded coordinates. Direct symmetric Jacobi
diagonalization gives

\[
 \lambda_{\min}(K)=0.000750631043666106,
 \qquad
 \lambda_{\max}(K)=23.882400791660626,
\]

and hence

\[
 \kappa_2(K)=31816.4309792.
\]

With a common inductive scale, the corresponding extreme frequency ratio is
(\sqrt{\kappa}=178.37). The network is therefore not well summarized by its
individual component ranges.

## A conservative fabrication bound

Let the measured capacitance matrix be (C=K+E), and define
(\delta=\lVert E\rVert_2/\lVert K\rVert_2). Standard inverse perturbation
gives, when (\kappa\delta<1),

\[
 {\lVert C^{-1}-K^{-1}\rVert_2\over\lVert K^{-1}\rVert_2}
 \leq {\kappa\delta\over1-\kappa\delta}.
\]

A one-percent worst-case guarantee on the inverse therefore requires
(\delta\leq3.11\times10^{-7}). Merely preserving positive definiteness has
the much weaker sufficient threshold (\delta<3.14\times10^{-5}).

This does not mean every component must be fabricated to 0.31 ppm. It means
nominal scalar tolerances cannot certify the target. Errors are structured,
the full matrix can be measured and compensated, and only a subspace may be
occupied. The adversarial bound tells us what evidence is required.

## Decision

Gate A now requires a full 24-port spectral certificate with propagated
uncertainty, not a bill of materials. The design search should optimize three
objectives jointly across (GL(24,\mathbb Z))-equivalent Leech bases:
conditioning, transformer density and interaction locality. Calibration or
parametric compensation must be included in the Hamiltonian record, and any
subspace-only implementation must supply a measured isometry.

## Boundary

The perturbation bound is sufficient and adversarial. Integral congruence
changes Euclidean conditioning; structured fabrication errors can be less
damaging; calibration can compensate coherent deviations; and the physical
protocol need not demand uniform precision in all 24 eigen-directions. No
claim of practical infeasibility follows yet.

## Corpus links

- [Exact transformer recovery](frontier_wave7_170_leech_transformer_capacitance_recovery.md)
- [Passive-capacitance sign no-go](frontier_wave7_169_leech_passive_capacitance_sign_no_go.md)
- [Unimodular dual-basis compiler](frontier_wave7_139_leech_unimodular_dual_basis_compiler.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
- [Integral hardware-basis search](frontier_wave7_172_leech_integral_hardware_basis_search.md)
