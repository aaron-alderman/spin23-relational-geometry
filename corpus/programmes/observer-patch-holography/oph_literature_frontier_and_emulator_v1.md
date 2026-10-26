# OPH record laws at the research frontier: literature and emulator plan v1

**Status:** literature-qualified experimental programme; no new-physics claim  
**Date:** 26 October 2026  
**Owning topic:** OT-055  
**Exact target:** [channel geometry and local-closure result](oph_channel_geometry_and_local_closure_v1.md)

## The honest placement

The OPH record-law result is not outside known quantum information theory. Completely positive maps, Choi matrices, instruments, fixed-point operator systems, channel divisibility and multi-time process tomography are established fields. What is specific here is the exact finite object: one native repair rule leaves a nine-real-dimensional family of quantum record laws; two idempotent completions differ by 110 coherence directions; five named laws have an exact adjacent/disjoint commutator census; and the entire family has a common non-injectivity witness.

That makes the result a good **benchmark at a live engineering frontier**, not presently a new law of physics. It joins four research arms that are usually studied separately:

1. instrument tomography asks what classical outcome and conditional quantum state a measurement produces;
2. channel divisibility asks whether a discrete map can arise from continuous Markovian evolution;
3. process tensors ask which multi-time records reveal memory and intervention order;
4. fixed-point theory asks what algebra or operator system survives repeated application.

OPH contributes one unusually inspectable test object at their intersection. The corpus contributes the admission--operation--record typing that prevents those four questions from being collapsed into one.

## MECE comparison with established work

### A. One-time channel geometry

Wolf and Cirac's [*Dividing Quantum Channels*](https://arxiv.org/abs/math-ph/0611057) studies which completely positive trace-preserving maps are divisible and which belong to continuous completely positive evolutions. The OPH non-injectivity result is a simple strong obstruction inside that wider problem: a finite-dimensional matrix exponential is invertible, while every OPH record law kills a declared matrix unit. No logarithm search is required.

This is not a claim that all singular channels are physically impossible. A measurement intervention, ancilla discard, collision model or infinite-time limit can produce a singular channel. It says the discrete repair must be typed as such; it cannot simultaneously be treated as one finite interval of autonomous bounded Lindblad flow.

### B. Stable record surfaces

Idempotent completely positive maps are naturally related to operator systems and the Choi--Effros product. Kitaev's [work on almost-idempotent channels](https://arxiv.org/abs/2405.02434) shows why the approximate version matters experimentally: a nearly idempotent unital channel can support an approximate algebra of nearly invariant observables and an approximate encode/decode factorization.

This suggests a better use of the OPH `E` and `T` maps. Do not ask whether their fixed spaces *are spacetime*. Ask whether a noisy implementation approaches the predicted fixed dimensions and whether its almost-invariant observables factor into a stable retained record. The exact `E/T` difference supplies a calibrated target for how much coherence an additional record destroys.

### C. Histories, memory and order

Chiribella, D'Ariano and Perinotti's [quantum-comb framework](https://arxiv.org/abs/0904.4483) describes networks of operations connected through memory channels. Pollock and collaborators' [operational Markov condition](https://arxiv.org/abs/1801.09811) makes multi-time interventions, rather than a sequence of reduced states, the test of detectable memory. White and collaborators developed [non-Markovian process tensor tomography](https://arxiv.org/abs/2106.11722) and demonstrated restricted process-tensor characterization and control on [superconducting quantum processors](https://www.nature.com/articles/s41467-020-20113-3).

The OPH adjacent-seam result belongs here. It does not indicate indefinite causal order: the two schedules are ordinary definite circuits and simply give different maps. It does show why a one-step channel is insufficient. A scheduler-qualified process tensor or comb is the correct object whenever two repairs share a port. The disjoint-seam commutation result is the null control: the emulator must not manufacture memory where the source predicts none.

### D. Instruments rather than terminal measurements

Rudinger and collaborators' [quantum-instrument linear gate-set tomography](https://arxiv.org/abs/2103.03008) characterizes mid-circuit measurements with both classical and quantum outputs on a superconducting transmon platform. A broader instrument-characterization treatment is given in [*Characterizing quantum instruments: from non-demolition measurements to quantum error correction*](https://arxiv.org/abs/2110.06954). These works make Gate 5 technically credible: outcome-resolved process matrices, residual measurement photons, state disturbance and delay dependence can be measured rather than idealized away.

The OPH-specific target is not merely process fidelity. It is whether four implementations with the same classical current table yield the predicted distinct coherence coordinates `g` and `k`, fixed surfaces and repeated-repair decay. That is a sharper discrimination task than verifying one gate against itself.

## What is genuinely distinctive

| item | literature status | OPH/corpus contribution |
|---|---|---|
| Choi positivity and instruments | standard | exact five-multiplier spectrahedron tied to one source repair rule |
| same classical transition, different quantum coherence | standard possibility | four named laws, exact refinement ladder and closed-form phase record |
| non-embeddable singular channel | standard principle | one common killed matrix unit proves it for the whole admitted family |
| idempotent fixed spaces | standard theory | exact dimensions `3236` and `3126` and a typed 110-direction record difference |
| multi-time order dependence | standard process-tensor concern | exhaustive adjacent/disjoint census on all 6,084 matrix units |
| Jordan structure | standard operator-algebra language | exact negative result: 55 `H_2(C)` corners, no canonical `H_2(R)` slice |
| new physics | not established | no physical carrier attachment, source selection or anomalous record exists |

The likely publishable mathematical object is therefore a worked channel benchmark with exact certificates and unusually clear negative gates. Its value rises if the source calculation is made independent, the complete spectrahedral boundary is parameterized constructively and the noisy almost-idempotent geometry is connected to observable confidence regions. Its value does not rise by renaming the fixed space spacetime.

## Gate-5 emulator

### Minimal digital carrier

Use a superconducting processor with mid-circuit measurement and reset. Encode the six endpoint occupation keys

\[
00,10,01,11,20,02
\]

into a three-qubit logical subspace. Add record ancillas whose orthogonal labels implement the declared record granularity. A compiled Stinespring unitary followed by ancilla discard realizes each unread law; retaining and measuring the ancillas realizes the full instrument. A fourth system qubit supplies the smallest adjacent-seam witness, or the ten two-load states on three active ports plus one spectator can be embedded in four qubits.

This is a simulator of the finite channel, not evidence that transmons are OPH's fundamental carrier.

### Frozen run families

1. **Classical equality.** Prepare every logical basis state and verify that `C0`, `C`, `E` and `T` give one common current table within one simultaneous multinomial likelihood.
2. **`g` tomography.** Prepare the empty--waiting coherence at phases `0`, `pi/2`, `pi` and `3pi/2`; measure the source projector and fit one complex `g` across all phases.
3. **`k` tomography.** Repeat for the empty--full coherence and fit one complex `k`.
4. **Repeated repair.** Apply `r=1,...,8` identical updates and test the exact `C^r` and `C0^r` contraction laws without refitting each depth.
5. **Adjacent order.** Apply seam `(0,1)` then `(0,5)` and reverse the order on the same prepared states. Require the predicted diagonal witness and the full process-tensor difference.
6. **Disjoint null.** Repeat with `(0,1)` and `(2,3)`; the order difference must close at zero within preregistered covariance.
7. **Instrument audit.** Retain every ancilla outcome and use QILGST or an equivalent self-consistent method to distinguish state-preparation, gate, readout and residual-memory error.

### Models fitted once

The primary model contains one CPTP instrument per law, preparation/readout maps, ancilla reset error, coherent over-rotation, amplitude/phase damping and a finite-memory process-tensor term. Fit it jointly to calibration and designated training settings. Predict the held-out phases, repetition depths and order reversals without per-family nuisance refits.

Compare it with three rivals:

- a classical dephasing model with the same current table;
- one common quantum channel plus setting-dependent readout bias;
- a Markovian gate model with no cross-step memory.

### Go/no-go

| outcome | decision |
|---|---|
| common classical table fails | implementation failure; do not interpret coherence |
| `g/k` phase law fails but full instrument model predicts the failure | useful calibration result; revise compiler |
| adjacent order differs and disjoint order closes as predicted | benchmark passed; local schedule memory reproduced |
| both adjacent and disjoint pairs show order dependence | uncontrolled hardware memory; no source validation |
| exact target survives held-out data and beats all rivals | engineering result: certified record-law simulator |
| replicated residual survives complete instrument/process-tensor models on a second platform | anomaly worth escalation, not yet new physics |

## Implications

The strongest present implication is methodological. “What is allowed?”, “what operation occurred?”, “what outcome was recorded?” and “what can later observers reconstruct?” are four different questions. The OPH family makes their separation executable. The corpus's Jordan--channel--Lie reading is therefore useful even though the hoped-for canonical Jordan/Spin bridge fails.

The practical hope is correspondingly modest and real: this benchmark can improve mid-circuit measurement tomography, reset characterization, feedback compilation and memory diagnostics. It tells an experimental group exactly where to look—phase retained behind an identical classical record, and order memory confined to overlapping operations. If established quantum-channel theory accounts for everything, the experiment still returns better theoretical engineering. If a calibrated cross-platform residual survives, only then is there a reason to ask whether the admitted record calculus is missing physics.
