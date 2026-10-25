# Frontier Wave 7.218: Leech charge-shell commissioning packet

## Purpose

Wave 7.217 exposes a new finite-carrier fingerprint before the bulk-gap and
orbifold gates: the exact connectivity of the cutoff-two norm-four charge
shell and its first corona. This packet turns that fingerprint into a
preregistered emulator or hardware commissioning experiment.

The carrier must prepare uniformly selected norm-four charge states, apply
each of the 48 allowed one-coordinate hopping commands, identify the target
charge norm, and coherently prepare the 16 inversion pairs connected to zero
charge.

## Frozen targets

The exact corpus calculation fixes:

- isolated norm-four fraction (0.5609937306627585);
- mean internal degree (0.7720241003093958), with variance
  (1.2912324931498378);
- norm-six fraction (0.17575339502357532) among exterior hops;
- norm-eight fraction (0.36863355819661997);
- zero norm-two hops;
- 16 inversion pairs coupled individually to zero charge;
- even-pair zero-charge matrix element magnitude (1/\sqrt2);
- odd-pair zero-charge matrix element exactly zero.

The even/odd pair test is an orientation-sensitive interference control, not
another count. If the even control passes while the odd state leaks, the
failure is specifically the inversion phase or coherent relative sign.

## Sampling contract

Non-asymptotic Hoeffding and Bernstein bounds set a two-sided structural
failure probability (5.7330314\times10^{-7}):

- split the five-sigma-equivalent family error across four structural tests;
- sample 82,257 norm-four states and execute 48 transition commands on each,
  for 3,948,336 state-survey commands;
- sample 82,257 exterior hops for the norm-six and norm-eight proportions;
- observe zero norm-two targets in at least 29,956 exterior samples to place
  their rate below (10^{-4}) at 95% confidence;
- use 5,766 shots on each of the 16 odd inversion pairs, 92,256 total, to
  place zero-charge leakage below (10^{-3}) with a family-wise 95%
  confidence;
- use 32,308 bounded Hadamard-test samples on each even control, 516,928 total,
  to recover (1/\sqrt2) within 0.02 with family-wise 95% confidence.

The even-arm count uses the actual \(\pm1\) Hadamard estimator
\(\hat m=2\hat p-1\). Thus amplitude tolerance 0.02 is Bernoulli-probability
tolerance 0.01. The earlier 8,077-shot count omitted this factor of two and
was underpowered by a factor of four; Wave 7.227 exposed and repairs it.

The tolerances are 0.01 for the isolated and exterior fractions and 0.03 for
the mean degree. They are fixed before data collection.

## Decision meaning

- A degree or corona mismatch rejects the compiled Gram basis, cutoff map, or
  single-charge hopping operator.
- A norm-two event rejects Leech rootlessness at the commissioned scope or
  diagnoses charge-norm calibration failure.
- Odd leakage with a passing even control rejects coherent inversion parity.
- Failure of both parity arms diagnoses preparation/readout/hopping rather
  than the relative inversion phase.

Passing commissions the finite Leech charging and cosine dictionary. It does
not establish the bulk gap, chiral edge, inversion orbifold, Moonshine
character, Monster defect algebra, or Griess product.

## Reproduce

```powershell
node scripts/design-leech-charge-shell-commissioning.mjs --write
node verification/verify/verify_leech_charge_shell_commissioning.mjs
```

## Evidence

- `evidence/data/leech-charge-shell-commissioning-v1.json`
- `scripts/design-leech-charge-shell-commissioning.mjs`
- `verification/verify/verify_leech_charge_shell_commissioning.mjs`

## Corpus links

- [Exact charge-shell geometry](frontier_wave7_217_leech_cutoff_charge_shell_geometry.md)
- [24-port admittance commissioning](frontier_wave7_177_leech_24port_admittance_commissioning_packet.md)
- [Nonlinear Leech commissioning](frontier_wave7_188_leech_nonlinear_commissioning_packet.md)
- [Digital twin and Hadamard-count repair](frontier_wave7_227_leech_charge_shell_digital_twin_and_hadamard_repair.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
