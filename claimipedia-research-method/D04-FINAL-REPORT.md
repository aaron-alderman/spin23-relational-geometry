# D-04 BRST-complete anomaly strike: final report

## Answer

A BRST-complete **one-loop spectral calculation cannot test the D-03 four-particle anomaly orientation**. The obstruction is topological, not merely computational.

An `n`-particle cut sewn between two form factors begins at `n-1` graph loops. The four-particle cut therefore starts at three loops. Because the `beta_lambda O_4` coefficient itself starts at one loop, its interference in a uniformly graded two-point spectral function begins at order four.

The D-03 expression mixed two legitimate but different statements:

1. a one-loop RG coefficient in a state-level form-factor ratio;
2. a four-particle contribution to a two-point spectral measure.

It remains a special-case amplitude conjecture. It is not a one-loop spectral result.

## What the BRST completion does establish

For the gauge-invariant scalar source

`O_H=Phi^dagger Phi-v^2/2`,

the complete one-loop `R_xi` sum has a gauge-independent positive spectrum consisting of the Higgs pole, the `hh` cut and the massive-vector-pair cut. Goldstone, ghost and longitudinal gauge artifacts do not survive in the physical spectral measure.

At strict uniform one-loop order the trace continuum is its classical mass representative `O_g=c_H O_H`, modulo the declared quotient. The resulting `2 x 2` continuum spectral matrix is a ray and has zero innovation.

This uses the published integral calculation of [Dudal et al.](https://arxiv.org/abs/1912.11390) for the gauge-invariant scalar correlator and the algebraic-renormalization analysis of [Capri et al.](https://arxiv.org/abs/2007.01770). No missing `TT` or `T O_H` integral has been silently inferred from the published `O_H O_H` result.

## Surviving theorem

The correctly completed observable is the beta-vector projective identity. In the physical cohomology write

`[T]=c_H[O_H]+sum_I b_I[X_I]`.

For physical states `n,m`,

`Delta r_nm=b dot (R_n-R_m)`.

It is invariant under a common improvement shear and under invertible anomaly-operator mixing. BRST completion protects this dual pairing. It does **not** protect a quartic-only truncation.

Thus the full version of the old target is

`Q_full=(beta_e/2e) Delta R_F2 + beta_lambda Delta R_lambda + sum_other b_I Delta R_I`.

## Research frontier

The next calculation is now exact rather than aspirational: compute the physical form-factor matrix `Delta R` for the gauge kinetic, quartic and mass-anomalous operators on `hh`, massive-vector and four-body physical states. Enforce Slavnov–Taylor identities, gauge-parameter cancellation, operator-mixing covariance and a uniform loop grading.

If that matrix has sufficient rank, projective spectral data can invert for combinations of beta functions. If its rank collapses, the null space is itself a new Ward or dynamical relation.

This is the surviving anomaly-tomography programme.
