# OPH Gate-5 digital emulator v1

**Date:** 27 October 2026  
**Status:** independent digital Gate 5 passed; backend transpilation and hardware execution open  
**Topic:** OT-055  
**Evidence:** [`oph-gate5-digital-emulator-v1.json`](../../../evidence/data/oph-gate5-digital-emulator-v1.json)  
**Runner:** `node scripts/run-oph-gate5-digital-emulator.mjs`  
**Verifier:** `node verification/admissibility/verify_oph_gate5_digital_emulator.mjs`

## Result

The four clean-room named-law instruments now have executable circuit representations independent of the OPH implementation. Each sparse Stinespring isometry is completed on its active logical columns by a sequence of Householder reflections. Every reflection is then factored into real two-level Givens rotations and a computational-basis phase flip. A separate circuit simulator applies those gates to real and complex amplitudes and recovers the instrument columns, phase detector and empty--full detector.

| law | logical qubits | record labels | two-level gates | maximum active-column error |
|---|---:|---:|---:|---:|
| `C0` | 5 | 3 | 32 | below `3.4e-16` |
| `C` | 6 | 6 | 40 | below `3.4e-16` |
| `E` | 7 | 10 | 38 | below `3.4e-16` |
| `T` | 7 | 12 | 38 | below `3.4e-16` |

The circuit-level phase probabilities reproduce the exact `g` detector at calibration and held-out phases. The circuit-level `k` probe gives probability one for `E` and one half for `T`. The result completes the independent digital logical implementation of Gate 5. It is not a device run.

## What the circuit means

A two-level Givens gate acts only on two computational-basis amplitudes:

\[
\begin{pmatrix}a_p'\\a_q'\end{pmatrix}
=
\begin{pmatrix}c&s\\-s&c\end{pmatrix}
\begin{pmatrix}a_p\\a_q\end{pmatrix},
\qquad c^2+s^2=1.
\]

Together with a basis-state phase flip, these gates form an exact universal circuit representation for the real isometries used here. Every such two-level operation has a Gray-code lowering to controlled single-qubit rotations and bit flips. That theorem makes the representation executable, but it does not choose a hardware coupling map, pulse calibration, routing strategy or error budget. Those remain backend-specific.

The compiler acts only on the six admitted seam-key inputs. Its completion on the two unused three-qubit system states and unused record strings is deliberately unspecified. A hardware compiler must preserve the six active columns and report leakage on the complement; it must not turn an arbitrary completion into physical content.

## Corrected disjoint-null design

The original 5,000-shot proposal was sufficient to expose the adjacent-order signal of total variation `0.25`, but not to certify that the underlying disjoint-order distance is below `0.02`. The digital emulator now uses an explicit two-sample upper confidence bound. For `K=4` outcomes it combines the empirical total variation with two multinomial `L1` concentration radii:

\[
U_{TV}=\widehat{TV}
+\frac12\sqrt{\frac{2\log(2(2^K-2)/\alpha)}{n_1}}
+\frac12\sqrt{\frac{2\log(2(2^K-2)/\alpha)}{n_2}}.
\]

At `alpha=0.01`, even an empirical distance of zero requires at least 39,687 shots per order before this conservative upper bound can fall below `0.02`. In the retained seeded runs:

| run | shots per order | upper bound | certifies `TV < 0.02`? |
|---|---:|---:|---|
| pilot | 5,000 | `0.07335` | no |
| qualification | 200,000 | `0.01060` | yes |

This is not a claim that 200,000 is optimal. It is a frozen conservative qualification count. A sharper exact multinomial or likelihood-based equivalence test may reduce cost, but it must be fixed before device data are inspected.

## Decision

Digital Gate 5 passes because:

- the four circuit representations reproduce every active isometry column;
- complex phase inputs recover the exact `g` probabilities;
- the `k` detector separates `E` and `T`;
- the order test retains its exact adjacent/disjoint distinction;
- the null has a powered equivalence rule rather than a raw-frequency cutoff.

Hardware Gate 5 remains open because no named backend has executed the circuits, no calibration model has been fitted, and no outcome-resolved process tomography has been performed.

## Next decisive work

The remaining computational work is no longer another ideal replay. It is to construct the strongest ordinary rival:

1. add preparation/readout error, coherent over-rotation, damping, reset error and finite memory;
2. fit those nuisance parameters only on declared training settings;
3. predict held-out phases, depths and adjacent/disjoint reversals;
4. quantify which residuals are identifiable after nuisance projection;
5. export the circuits to one named backend basis and measure the resource increase from routing.

If the conventional process model explains the records, the result is a useful instrument and compiler benchmark. Only a replicated residual beyond that model can advance toward a physical anomaly.
