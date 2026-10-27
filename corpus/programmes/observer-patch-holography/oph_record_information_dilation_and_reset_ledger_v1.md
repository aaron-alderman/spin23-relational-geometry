# OPH record information, dilation and reset ledger

**Date:** 27 October 2026  
**Status:** exact for the four named digital instruments under a uniform six-key input prior  
**Topic:** OT-055  
**Evidence:** [information ledger](../../../evidence/data/oph-record-information-ledger-v1.json)  
**Verification:** `node verification/admissibility/verify_oph_record_information_ledger.mjs`

## Result

The named record ladder now has an explicit information and resource ledger. As the instrument remembers more about each repair, its record alphabet and average stored information increase:

| law | record labels | record qubits | `H(record)` bits | `H(record | input)` bits | `I(input; record)` bits |
|---|---:|---:|---:|---:|---:|
| `C0` | 3 | 2 | 1.5000 | 0.3333 | 1.1667 |
| `C` | 6 | 3 | 2.4591 | 1.0000 | 1.4591 |
| `E` | 10 | 4 | 3.2516 | 1.0000 | 2.2516 |
| `T` | 12 | 4 | 3.5850 | 1.0000 | 2.5850 |

This calculation uses a uniform prior over the six one-seam endpoint keys and the authored computational record basis. It quantifies these instruments; it is not a universal ranking of every Kraus realization of the same unread channels.

## How to picture it

Each repair has a system register and a fresh blank record register. The compiled isometry correlates the system's possible repaired outputs with named record labels. If the record is retained, it can condition a later action. If it is ignored, tracing it out gives the unread channel. Repetition is therefore an exact collision model: a fresh record ancilla meets the system at each discrete step.

This resolves one apparent tension. Every named unread channel is non-injective, so it cannot be the finite-time exponential of a bounded generator acting on the system alone. Yet it has an exact unitary/isometric dilation when fresh environment degrees of freedom are supplied. The missing information has not vanished from the larger construction; it has moved into the record/environment.

The dilation does **not** select a unique Hamiltonian, continuous clock, bath, reset procedure or physical platform. Many larger reversible mechanisms have the same reduced channel.

## Thermodynamic boundary

If the classical record memory is reset at temperature `300 K`, Landauer's bound gives the illustrative minimum

\[
W_{\min}=k_B T\ln 2\,H(R).
\]

For the stated prior this ranges from `4.31e-21 J` per `C0` record to `1.03e-20 J` per `T` record. With the input retained as usable side information, the corresponding classical conditional bound uses `H(R|X)` and is lower.

These are lower bounds for idealized stored-record erasure. They are not measured device costs, refrigerator wall-plug costs, a proof of global entropy growth or a thermodynamic derivation of the record law. Hardware must separately meter control pulses, reset, leakage removal, amplification, refrigeration and discarded calibration data.

## Implications

The same move that strengthens a detector can increase its memory burden. `T` distinguishes the most input detail and destroys the empty--full coherence that `E` retains. This makes the record/coherence trade visible:

- more retained classical identity can mean less surviving quantum coherence;
- closing the unread system requires naming the record/environment that received the distinction;
- erasing a detector distinction can make closure cheaper while also making fewer hypotheses testable;
- subsystem purification or convergence cannot be promoted to a global monotonicity claim without the reset and environment ledger.

This is a practical design criterion. Choose the weakest record law that still preserves the discriminator required by the experiment; otherwise the apparatus pays to acquire and later erase information that does not affect the decision.

## What remains

On a named backend, measure ancilla occupation, leakage, conditional reset fidelity, correlation time and dissipated energy over repeated repairs. Compare those measurements with the logical information ledger and with a fitted process tensor. A residual thermodynamic cost is interesting engineering; it becomes physics-facing only if it is reproducible, cannot be attributed to the control stack and follows a new frozen scaling law.
