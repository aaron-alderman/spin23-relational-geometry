# Spectral tomography and six-hypothesis identifiability

**Date:** 30 October 2026

**Status:** dependency-free synthetic identifiability gate passed; experimental uncertainty model and measured spectra open

**Parents:** [coherent double-cover emulator](admissibility_179_coherent_double_cover_emulator_and_topology_only_control.md), [mixed vector spectra](admissibility_175_mixed_vector_spectra_confirm_all_six_viscosity_kernel_ledgers.md)

## Question

Once the return topology is independently established, can finite-noise
spectral measurements distinguish the six combinations of quotient and
viscosity convention?

The model signatures inherited from the refined corpus calculation are:

| hypothesis | one-lap sign | nullity | first positive gap | \(t_{1\%}\nu\) |
|---|---:|---:|---:|---:|
| Klein/Hodge | -1 | 1 | 1.59148 | 1.4468 |
| Klein/Bochner | -1 | 0 | 0.27427 | 8.3954 |
| Klein/deformation | -1 | 0 | 0.54853 | 4.1977 |
| rotation/Hodge | +1 | 2 | 0.97203 | 2.3689 |
| rotation/Bochner | +1 | 0 | 0.12439 | 18.5103 |
| rotation/deformation | +1 | 1 | 0.54853 | 4.1977 |

The first gap alone is insufficient: the two deformation rows share it. The
joined record of sign, nullity and gap separates all six.

## Dependency-free campaign

[The executable verifier](../../../verification/admissibility/verify_klein_experimental_capability_frontier.mjs)
draws 4,000 seeded noisy records per hypothesis at each noise level and
classifies against the frozen signatures. Noise is applied to signed return,
nullity estimate and logarithmic gap; this is a design identifiability test,
not a substitute for an apparatus-specific likelihood model.

| fractional feature noise | coherent six-way accuracy | power-only six-way accuracy |
|---:|---:|---:|
| 0.01 | 1.00000 | 1.00000 |
| 0.03 | 1.00000 | 1.00000 |
| 0.10 | 0.999875 | 0.999917 |
| 0.20 | 0.984125 | 0.972292 |

The high power-only score does not show that power detects topology. In this
ideal library the nullity and gap often reveal the model indirectly. In the
matched topology-only pair, where those features are deliberately identical,
coherent readout retains two classes and power collapses them to one.

## Experimental tomography

Measure a frequency-domain response matrix over enough ports to reconstruct
both weakly and strongly coupled modes. Fit one frozen state-space model to all
source/detector combinations and then verify it against time-domain ring-down.

Required outputs are:

1. mass or kinetic metric and its conditioning;
2. complex poles and residues;
3. mode shapes transformed under the measured sewing operator;
4. kernel dimension at several observation durations;
5. first positive gap and uncertainty;
6. energy/work residual under free decay;
7. model evidence for all six hypotheses, not only the best fit.

Near-zero poles must be tested by extending the record. A plateau is admitted
as a kernel only when its inferred decay rate remains compatible with zero and
its amplitude exceeds the calibrated detector floor.

## Observation budget

The slowest ideal row is rotation/Bochner, requiring

\[
t_{1\%}\nu\approx18.5103.
\]

The design budget should therefore reach at least \(20/\nu\), followed by one
longer-duration check. If drift or detector noise prevents this duration, the
experiment may measure positive modes but cannot determine kernel dimension.

## What this gate does and does not establish

It establishes that the proposed joined observables are mathematically
identifying before apparatus effects are added. It does not establish that a
particular instrument can estimate nullity as a continuous noisy feature, nor
that its errors are independent or Gaussian. Those assumptions must be
replaced by calibration data at C1 and C2.

