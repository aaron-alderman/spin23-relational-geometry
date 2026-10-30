# Viscosity kernel dimensions and the quadratic throat-gap law

**Date:** 30 October 2026

**Status:** exact kernel ledger and verified small-throat scaling; mixed finite vector spectrum remains open

**Parent:** [three surface viscosities](admissibility_173_three_surface_viscosities_separate_by_curvature_and_kernel.md)

**Evidence and executable:** [kernel-gap contract](../../../evidence/data/admissibility-surface-viscosity-kernel-gap-scaling-v1.json); [scaling verifier](../../../verification/admissibility/verify_surface_viscosity_kernel_gap_scaling.mjs)

## Result

The zero-mode distinction persists across a throat-strength sweep and becomes
a quantitative scaling law.

For the nonconstant \(x\)-dependent conformal throat, the exact kernel ledger
is:

| quotient | Hodge | Bochner | deformation |
|---|---:|---:|---:|
| Klein | 1 | 0 | 0 |
| rotation torus | 2 | 0 | 1 |

The Hodge dimensions are the real first Betti numbers. The deformation
dimensions count continuous Killing fields compatible with the quotient. The
Bochner kernel counts parallel fields; nonzero curvature on an open set
removes them.

The Klein reflection eliminates the continuous \(y\)-translation symmetry,
so its deformation kernel is zero. The rotation quotient retains that
Killing field.

## Gap sweep

For the Klein \(dx\) circulation:

| \(\varepsilon\) | Hodge | Bochner | deformation |
|---:|---:|---:|---:|
| 0.0125 | 0 | 0.00062495 | 0.00124990 |
| 0.05 | 0 | 0.00998752 | 0.01997504 |
| 0.10 | 0 | 0.03980132 | 0.07960265 |
| 0.25 | 0 | 0.24249961 | 0.48499923 |

For the rotation \(y\)-Killing field the same nonzero values appear with the
roles reversed:

\[
Q_D=0,\qquad Q_B=q(\varepsilon),\qquad Q_H=2q(\varepsilon).
\]

In both witnesses the exact protected channel stays at zero for every throat
strength. The other two gaps open continuously.

## Small-throat law

Using the first two sweep points, every lifted gap has logarithmic exponent

\[
p=1.999662\ldots
\]

in

\[
\lambda_{\rm gap}(\varepsilon)\sim C\varepsilon^p.
\]

Thus the first separation is quadratic:

\[
\boxed{\lambda_{\rm gap}=O(\varepsilon^2).}
\]

This follows physically from the strain/connection dependence on
\(\sigma_x=O(\varepsilon)\), whose dissipative norm is squared. It gives an
experimental discriminator: vary throat strength, measure the slowest decay
rate and fit its exponent rather than relying on one lifetime.

## Detector logic

- A rate remaining at the apparatus floor as \(\varepsilon\) varies is a
  candidate protected channel.
- A rate opening quadratically is a curvature-lifted channel.
- The ratio of the paired lifted gaps is exactly two for these witnesses.
- A linear opening would indicate an unmodelled symmetry-breaking defect,
  moving boundary, anisotropy or detector leakage.

Ideal zeros will become small nonzero rates in a real device. The robust
claim is therefore the scaling and ratio ledger, not literal immortality.

## Bounds

The kernel dimensions follow topology and isometry arguments, while the
reported positive gaps are Rayleigh quotients of named witnesses. A mixed
finite vector basis is still required to prove that no lower positive
combination appears within the chosen numerical window.

## Next gate

Assemble mixed harmonic and coexact vector bases for both quotients, construct
all three generalized quadratic-form matrices, and check:

1. the predicted nullities;
2. convergence of the first positive eigenvalue;
3. persistence of the factor-two witness ratios;
4. shared versus topology-sensitive spectral blocks.

That gate is now closed by the
[mixed vector spectra](admissibility_175_mixed_vector_spectra_confirm_all_six_viscosity_kernel_ledgers.md).
All six nullities are recovered independently and their first positive gaps
remain stable under basis enlargement.

## Verdict

The three viscosity choices remain distinct under continuous deformation.
Their protected modes are exact, while the modes protected by a competing
convention acquire a quadratic throat gap. This converts a semantic operator
choice into a sweepable decay experiment.
