# OPH physical attachment and hardware handoff

**Date:** 27 October 2026  
**Status:** one named attachment is eligible; transpilation and QPU execution are externally gated  
**Topic:** OT-055  
**Evidence:** [machine-readable handoff](../../../evidence/data/oph-physical-attachment-handoff-v1.json)  
**Verification:** `node verification/admissibility/verify_oph_physical_attachment_handoff.mjs`

## The closest physical attachment

The shortest credible route is a superconducting digital instrument benchmark, not a direct attachment to spacetime or gravity. The named target is `ibm_fez`, a 156-programmable-qubit Heron r2 processor. IBM's current backend documentation reports `CZ`, phase and single-qubit instructions, measurement, reset, combined measurement/reset and classical control. Those capabilities cover the logical needs of the seven-qubit one-seam and eight-qubit adjacent-seam designs in principle. See IBM's [backend information guide](https://quantum.cloud.ibm.com/docs/en/guides/qpu-information), [special mid-circuit instructions](https://quantum.cloud.ibm.com/docs/en/guides/custom-calibration) and [transpilation contract](https://docs.quantum.ibm.com/guides/transpile).

This names a platform; it does not pretend the platform has run the experiment. The workspace has no IBM credential, current backend `Target`, Qiskit installation or QPU record. Calibration and availability also vary with time. The exact next artifact must therefore be a timestamped target export, not a topology copied from an old diagram.

## Why it is eligible

| requirement | corpus design | `ibm_fez` attachment |
|---|---|---|
| logical capacity | 7 qubits one seam; 8 qubits adjacent seams | 156 programmable qubits documented |
| coherent phase control | `g` tomography and `k` probe | `RZ`, `SX`, `X` documented |
| entangling synthesis | two-level isometries need two-qubit compilation | native `CZ` documented |
| retained records | authored record ancilla | measurement and store documented |
| repeated repair | fresh or reset ancilla | reset and measure/reset documented |
| feedback/memory controls | conditioned continuation and delay sweeps | `if_else`, delay and mid-circuit variants documented |

Eligibility is conditional on finding a connected eight-qubit subgraph whose measured error and coherence budget can sustain the transpiled circuits. The present 32/40/38/38 counts are abstract two-level gates, not native `CZ` counts. A target-aware synthesis may be much deeper; that is the first hardware go/no-go.

## Frozen handoff packet

Before any job, export and hash the backend name and version, complete `Target`, selected eight-qubit induced subgraph, instruction errors and durations, readout/reset properties, `T1/T2`, transpiler versions, seed, initial layout and every transpiled circuit. Select the subgraph using calibration records only. Do not inspect held-out OPH outcomes while changing layout or optimization.

The minimum decision sampling is `530,000` shots, excluding calibration and tomography:

| block | circuits | shots each | subtotal |
|---|---:|---:|---:|
| three-phase tomography for four laws | 12 | 5,000 | 60,000 |
| `k` probes | 4 | 5,000 | 20,000 |
| repetition depths | 8 | 5,000 | 40,000 |
| adjacent order | 2 | 5,000 | 10,000 |
| disjoint equivalence | 2 | 200,000 | 400,000 |

The large disjoint block is not excess ceremony. It is what the retained conservative equivalence bound requires to distinguish a small underlying order effect from ordinary multinomial separation.

## Go/no-go

1. **Transpilation pass:** every circuit obeys the frozen backend ISA and connected layout; predicted accumulated error leaves the phase and `k` contrasts resolvable. Otherwise stop as a hardware-depth no-go.
2. **Training pass:** one shared preparation/readout, damping, coherent-error, leakage, reset and finite-memory model fits calibration and training records. Otherwise stop as an uncontrolled implementation.
3. **Engineering pass:** held-out law and schedule records meet their frozen thresholds, including the disjoint equivalence bound. This is a useful instrument/compiler result.
4. **Anomaly trigger:** a structured held-out residual rejects the frozen model and survives recalibration. This is not yet new physics.
5. **Physics eligibility:** the residual repeats on an independent implementation and defeats physically constrained conventional alternatives. Only here may it enter anomaly review.

## Other attachments

Photonic, acoustic and trapped-ion emulators remain plausible alternatives because phase, connectivity or low-loss propagation may be advantageous. None is currently as close in this corpus: each still lacks a complete mapping from the four authored instruments to native preparation, record, reset and schedule operations with the same frozen statistical packet. They are replication candidates after the first digital run, not interchangeable evidence in advance.

## Honest endpoint

The corpus can finish the abstract compiler, equivalence statistics, conventional rival, quotient theorem, dilation and resource ledger without external authority. It cannot manufacture a live backend target, calibration, account access or QPU observations. Those are now the only blockers to hardware Gate 5. Until they exist, `hardwareGate5Pass=false` and no empirical-physics claim is eligible.
