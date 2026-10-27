# OPH independent reference emulator v1

**Date:** 27 October 2026  
**Status:** clean-room logical instrument reference complete; native-gate lowering and physical run open  
**Topic:** OT-055  
**Evidence:** [`oph-independent-reference-emulator-v1.json`](../../../evidence/data/oph-independent-reference-emulator-v1.json)  
**Runner:** `node scripts/run-oph-independent-reference-emulator.mjs`  
**Verifier:** `node verification/admissibility/verify_oph_independent_reference_emulator.mjs`

## Result

An independent JavaScript implementation now reproduces the part of the OPH record-law experiment fixed by the public mathematical specification. It does not import the OPH Python implementation, read its result files at runtime or tune against its receipts. From the stated fair-coin seam update and the `g` and `k` detector equations it reconstructs the common six-key classical transition table, simulates phase tomography for `C0`, `C`, `E`, `T`, the signed control and the quarter-turn control, predicts held-out phases from fitted `g`, reproduces repeated-repair contrast, separates `E` from `T` with the empty--full probe, and recovers adjacent-order total variation `1/4` with an exact disjoint-order null.

This is an independent **logical reference**, not yet the Gate-5 physical emulator. It establishes that the proposed records can be generated from the written mathematical contract without borrowing the source implementation. For each named law it also constructs one explicit definite-current Kraus instrument and sparse Stinespring isometry in the declared computational record basis. That construction is not unique, has not been lowered into native gates and does not establish a physical carrier.

## What the reference actually does

The reference begins with ordinary things rather than a group or an abstract closure:

1. two loads occupy twelve labelled ports;
2. a chosen neighbouring pair compares its endpoint loads;
3. a fair coin resolves an odd imbalance;
4. the resulting current moves load between the endpoints;
5. a record law decides which coherence survives that same classical move;
6. a detector converts one retained coherence into phase-dependent counts.

The common classical update is

\[
d=x_a-x_b,\qquad
j=\frac{d-(2c-1)(|d|\bmod 2)}{2},\qquad
x_a\mapsto x_a-j,\quad x_b\mapsto x_b+j.
\]

The phase detector is

\[
p_+(\theta)=\frac38+\frac12\operatorname{Re}(g e^{-i\theta}),
\]

and the empty--full detector is

\[
p_k(\theta)=\frac12+\frac12\operatorname{Re}(k e^{-i\theta}).
\]

Repeated repair replaces `g` by `g^r`. Those three equations are sufficient to produce independent observable predictions. They are not sufficient to determine how a laboratory ancilla must be coupled and read.

## Frozen run

The retained receipt uses seed `0x4f504831` and 5,000 Bernoulli shots per setting. The calibration phases are `0`, `pi` and `pi/2`; `pi/3` and `3pi/2` are held out. All six laws predict both held-out frequencies within the predeclared conservative residual envelope. The quarter-turn control is essential: it makes the imaginary part of `g` visible rather than treating phase as a real sign choice.

For the schedule test, loads begin at ports 5 and 11. Applying seams `(0,1)` then `(0,5)` gives

\[
\tfrac12\{5,11\}+\tfrac12\{0,11\},
\]

whereas reversing the order gives

\[
\tfrac12\{5,11\}+\tfrac14\{0,11\}+\tfrac14\{1,11\}.
\]

Their total-variation distance is exactly `0.25`. Two disjoint seams commute exactly. The sampled adjacent distance is `0.2512`.

## A useful preflight correction

The two independently sampled disjoint schedules have empirical total variation `0.0204`, just above the proposed raw `0.02` engineering threshold, even though their generating distributions are exactly identical and the largest cell difference is well inside a conservative sampling envelope. This does not reveal device memory; it reveals that a raw empirical-distance cutoff is not by itself a calibrated null test at 5,000 shots.

The experiment must therefore report three different statements:

- **algebraic null:** the ideal disjoint channels commute;
- **statistical compatibility:** the observed difference is compatible with samples from one distribution;
- **engineering bound:** after an uncertainty-aware estimate of the underlying distributions and readout correction, residual total variation is below `0.02`.

Five thousand shots can expose the adjacent `0.25` effect. It cannot turn a raw empirical distance into proof that the underlying disjoint distance is below `0.02`. Stage B needs a confidence interval or equivalence test around the corrected latent distance, with its power fixed before data collection.

## Independence boundary

The implementation is clean-room at the equation-to-record layer. Its independence claim is deliberately narrower than “independent reproduction of OPH”:

| layer | result |
|---|---|
| written seam-update equation | independently implemented |
| written `g/k` detector equations | independently implemented |
| held-out phase prediction | passed in seeded simulation |
| adjacent/disjoint schedule witness | exact and sampled reference produced |
| original 78-state channel code | not imported |
| original receipts as runtime oracle | not used |
| named-law definite-current instruments | independently compiled; record counts `3/6/10/12` |
| logical Stinespring isometries | passed completeness to `2.22e-16` |
| native-gate circuit lowering | open |
| device execution and process tomography | open |
| physical attachment to nature | open |

The compiler therefore does not infer a unique environment from the unread channel. It authors the record basis stated by each named law: current for `C0`, coin plus current for `C`, coin plus pre-repair contrast for `E`, and coin plus endpoint loads for `T`. The resulting instruments use 3, 6, 10 and 12 record labels, recover all five declared coherence multipliers and fit the stated five-, six- and seven-qubit one-seam logical budgets. Other Kraus rotations can preserve the unread channel while changing what the record means; they are alternative instruments, not silent equivalents.

## Implications

The main gain is practical. OT-055 now has an external oracle against which a circuit compiler or photonic implementation can be tested without comparing only to the code that inspired it. The reference also sharpens the experiment: phase tomography tests retained coherence, the `k` probe separates laws invisible to `g`, adjacent reversal tests shared-port history, and disjoint reversal measures uncontrolled memory.

The result remains within ordinary quantum-channel and stochastic-process mathematics. A successful device would first be a useful instrument, feedback and compiler benchmark. A new-physics claim becomes eligible only if a frozen physical implementation produces a replicated residual that survives calibration, state-preparation/readout error, general instrument freedom and a complete process-memory model.

## Next decisive build

Lower the compiled sparse isometries into one named platform's native gates. The hardware packet must publish:

- the six logical seam-key basis states and leakage convention;
- the retained generated Kraus branches and their current/coin labels;
- the compiled isometry and ancilla readout basis;
- a decomposition into the chosen platform's native gates;
- process- and instrument-tomography observables;
- an uncertainty-aware disjoint equivalence test;
- held-out phase, depth and order settings generated by this independent reference.

Passing native-gate simulation would complete independent digital compilation. Hardware Gate 5 would still require execution on a named device. The physical bridge would remain a separate Gate 6.
