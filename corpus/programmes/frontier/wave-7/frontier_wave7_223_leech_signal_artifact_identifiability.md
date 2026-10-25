# Frontier Wave 7.223: signal--artifact identifiability

## The control problem has a theorem

A signal/blank comparison cannot distinguish a physical signal from an
instrumental artifact keyed to the same signal label. Its design matrix has
three declared columns but rank two: the physical-signal and label-artifact
columns are identical. More shots cannot repair this null direction.

Wave 7.223 supplies a causal control design. Independently randomize signal
state, route assignment between two detectors, detector readout and synthetic
event injection. The complete sixteen-cell factorial model has eight columns:
the routed physical coefficient, common and detector-specific signal-state
artifacts, detector offset, injection response and its signal and detector
interactions. Its exact rank is eight. Within this declared response model,
the physical coefficient is identifiable.

## The irreducible collision

Adding an artifact that follows the same randomized route as the physical
signal produces nine columns but rank eight. That artifact is exactly the
physical-signal column. Neither randomization, more shots nor a more generous
likelihood can separate them. A second physical modality or independently
calibrated causal intervention is required.

This result is useful precisely because it prevents the laboratory programme
from converting an unidentifiable detector assumption into a Monster claim.

## Execution and promotion

Every acquisition block independently randomizes signal, route and injection;
both detectors are recorded on every trial. The analysis fits all declared
interactions and verifies full rank after missing-cell removal. Injection
efficiency must retain its preregistered lower bound in both signal states.
The route-swapped physical coefficient may then feed the Wave 7.222
drift-robust likelihood.

The certificate is for the stated linear response model. Nonlinear memory and
route-following artifacts remain open and must be challenged by another
modality. The carrier itself is still not supplied by this packet.

## Reproduce

```powershell
node scripts/analyze-leech-signal-artifact-identifiability.mjs --write
node verification/verify/verify_leech_signal_artifact_identifiability.mjs
```

## Evidence

- `evidence/data/leech-signal-artifact-identifiability-v1.json`
- `scripts/analyze-leech-signal-artifact-identifiability.mjs`
- `verification/verify/verify_leech_signal_artifact_identifiability.mjs`

## Corpus links

- [Drift-robust likelihood](frontier_wave7_222_leech_drift_robust_likelihood.md)
- [Charge-shell commissioning](frontier_wave7_218_leech_charge_shell_commissioning.md)
- [Monster laboratory promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
