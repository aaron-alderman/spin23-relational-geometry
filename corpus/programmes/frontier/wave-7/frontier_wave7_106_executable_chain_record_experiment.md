# Frontier Wave 7.106: Executable Chain-Record Experiment

**Date:** 25 October 2026
**Status:** executable hardware-neutral protocol with preregistered gates
**Manifest:** [chain record experiment v1](chain_record_experiment_v1.json)
**Runner:** [Monte Carlo protocol runner](../../../../scripts/run-chain-record-experiment.mjs)
**Certificate:** [protocol verifier](../../../../verification/verify/verify_chain_record_experiment_protocol.mjs)

## Outcome

The finite qutrit--qubit construction is now an executable experimental
protocol.  It joins four previously separate results into one pipeline:

\[
\boxed{
\text{correlated random-Weyl unread channel}
\to
\text{phase-complete commutator}
\to
\text{cubed binary port}
\to
\text{record POVM}.
}
\]

The supplied runner is a seeded, hardware-neutral Monte Carlo emulator.  Its
JSON output is also the required result schema for a physical implementation:
replace simulated counts with apparatus counts while retaining the same gate
calculations and interpretation boundary.

## Run it

From the repository root:

```powershell
node scripts/run-chain-record-experiment.mjs
node scripts/run-chain-record-experiment.mjs --write
node verification/verify/verify_chain_record_experiment_protocol.mjs
```

The write mode saves
`evidence/data/chain-record-experiment-run-v1.json`.

Key parameters can be varied explicitly:

```powershell
node scripts/run-chain-record-experiment.mjs `
  --seed=137036 `
  --eta=0.125 `
  --visibility=0.995 `
  --qubit-phase-error=0.01 `
  --qutrit-phase-error=-0.015 `
  --noncentrality=0 `
  --model=binary-character
```

The available record models are `no-commutator`, `binary-character` and
`phase-complete`.

## Preregistered gate ledger

| gate | measurement | acceptance |
|---|---|---|
| G0 | exact protocol integrity | (N=31104), active records (=172), χ\((z)=z^3\) |
| G1 | unread sampler/channel | total variation ≤0.02; local sectors ≤0.02; connected gain within 0.02 of η |
| G2 | uncubed phase port | every measured quadrature within 0.03 of its calibrated central phase |
| G3 | cubed binary port | qutrit (X>0.9), qubit (X<-0.9), phase-closure residual <0.06 rad |
| G4 | centrality | cubed qutrit (X) spread over six preparations ≤0.06 |
| G5 | record POVM | binary model wins likelihood and exceeds no-commutator by at least five standard errors |

Every gate reports raw counts or sufficient statistics.  A failed upstream
gate blocks interpretation of downstream agreement.

## Physical sequence

### 1. Unread channel

Sample the 36 local Weyl pairs using the exact distribution from Wave 7.105.
Retain the random-label log for calibration but hide it from the primary
analysis.  Estimate the four Fourier-sector eigenvalues.  The target is

\[
(1,0,0,1/8)
\]

on scalar, qubit-local, qutrit-local and connected sectors.

### 2. Phase-complete port

Use a control ancilla to compare (UV) with (VU).  Measure both ancilla
quadratures.  The qutrit port must visibly recover ω or ω²; otherwise a later
binary null could merely be dephasing.

### 3. Cubed port

Repeat (UVU^\dagger V^\dagger) three times on the controlled branch.  The
ideal qutrit output is +1 and the Pauli output is −1.  Compare its phase with
three times the uncubed phase and test the result over six system
preparations.

### 4. Record POVM

Apply the positive effect (E=K/\sqrt6).  The binary-character hypothesis
predicts

\[
p_*=0.002979131709027206.
\]

The default ten-million-shot run is powered to separate this from the nearest
no-commutator probability under the stated ideal independent-shot model.

## Required controls

The physical run must additionally:

- reverse operation order and recover the conjugate uncubed phase;
- sweep control frequency upward and downward;
- report visibility separately from record multiplicity;
- preserve the random-label calibration log;
- publish all failed gates and not only the final POVM average;
- repeat using at least one state set not used during calibration.

## Interpretation boundary

A complete pass establishes an operational finite invariant with a physical
channel, coherent phase quotient and positive detector.  It does not establish
that the invariant is the fine-structure constant.

Photon promotion remains conditional on an independently normalized local
current calculation producing a massless transverse pole with the required
residue.  The executable protocol deliberately takes no measured value of
α as input.

## Verdict

The immediate experimental target is ready to execute in simulation and to
port to any platform offering a qubit, qutrit, control ancilla and controlled
Weyl sequences.  It has explicit nulls, adversarial controls, statistical
alternatives and machine-readable acceptance gates.

## Corpus anchors

- [record-POVM benchmark](frontier_wave7_102_chain_theory_record_povm_benchmark.md)
- [cubed-commutator detector](frontier_wave7_103_cubed_commutator_binary_detector.md)
- [cubed-loop dynamics](frontier_wave7_104_cubed_commutator_dynamics_and_error_budget.md)
- [random-Weyl unread channel](frontier_wave7_105_random_weyl_implementation_of_unread_channel.md)
- [photon-normalization no-go](frontier_wave7_100_chain_theory_photon_normalization_no_go.md)
