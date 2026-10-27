# OPH record-law emulator preflight v1

**Status:** digital logical emulator executed; backend hardware not run
**Date:** 26 October 2026  
**Evidence:** [`oph-emulator-preflight-v1.json`](../../../evidence/data/oph-emulator-preflight-v1.json)  
**Verifier:** `node verification/admissibility/verify_oph_emulator_preflight.mjs`

## Build

Encode the six one-seam occupation keys into a three-qubit logical subspace. Four reusable record ancillas accommodate the largest twelve-label instrument, giving a seven-qubit one-seam build. The adjacent-seam test uses the ten two-load configurations on three active ports plus one spectator, which fit into four system qubits; mid-circuit measurement, logging and reset keep the full design at eight qubits.

The compiler must expose both views of the same operation:

- retain the ancilla outcome to reconstruct the instrument;
- discard the ancilla outcome to reconstruct the unread channel.

The distinction is part of the target, not a software convenience.

## Power boundary

At phase zero the named one-step projector probabilities are

| law | probability |
|---|---:|
| `C0` | 0.7285533906 |
| `C` | 0.625 |
| `E` | 0.375 |
| `T` | 0.375 |
| `C_signed` | 0.125 |

`E` and `T` are intentionally indistinguishable through `g`; the separate empty--full `k` probe distinguishes them. The closest distinct one-step pair is `C0` versus `C`, separated by 0.1035533906. A conservative two-arm Hoeffding design at familywise `alpha=0.01` requires 4,470 shots per arm, so the frozen first-stage plan uses 5,000 per phase and law.

Depth is the cost wall. For `C`, the phase-zero separation from `E` is `2^(-r-1)`. At depth four it is `1/32`, requiring 49,083 shots per arm under the same conservative bound. At depth eight it is `1/512`, requiring 12,565,012. Depths one through four are therefore primary. Depths five through eight proceed only if the fitted visibility, reset and memory model predicts adequate held-out power; exact source arithmetic is not a reason to collect an underpowered physical record.

## Stages

| stage | admission gate |
|---|---|
| A | one common classical table and one-step `g/k` tomography pass |
| B | depths 1--4 plus adjacent reversal and disjoint null pass |
| C | depths 5--8 clear a frozen measured-visibility power calculation |
| D | a second platform is attempted only after one complete conventional instrument/process-tensor model predicts held-out data |

The ideal adjacent-order total-variation distance is 0.25; the disjoint ideal is zero. Five thousand shots per order make the adjacent effect easy in the ideal model. The hard requirement is the null: after self-consistent preparation/readout correction, the inferred underlying disjoint-order distance must remain below total variation 0.02 with a predeclared confidence or equivalence bound. A raw empirical distance is not that bound: the [independent reference run](oph_independent_reference_emulator_v1.md) obtains `0.0204` from two 5,000-shot samples of exactly identical distributions. The [digital Gate-5 execution](oph_gate5_digital_emulator_v1.md) fixes a conservative two-sample bound and shows that even zero empirical distance needs 39,687 shots per order; its 200,000-shot qualification run passes. If both adjacent and disjoint pairs retain statistically resolved order after correction, the device has uncontrolled memory and the OPH-specific comparison fails.

## Interpretation

A pass certifies an engineered realization of the finite record-law benchmark. It does not select OPH as nature's record law or identify the device carrier with spacetime. A failure accounted for by the frozen noise model is a useful compiler or detector result. Only a residual reproduced on an independent platform after instrument and process-tensor alternatives are exhausted becomes eligible for anomaly review.
