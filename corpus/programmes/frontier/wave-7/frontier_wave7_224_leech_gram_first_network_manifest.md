# Frontier Wave 7.224: Gram-first ideal network manifest

## From a matrix to a build interface

Wave 7.174 selected the Gram-first exact factor but left its 252 signed ratios
inside an analysis programme. Wave 7.224 emits the complete ideal component
manifest. It contains 24 relative positive capacitances, 24 unity mode paths,
252 nonzero signed off-diagonal transformer ratios, the integral coordinate
transform and the target 24-port Gram matrix.

The constitutive law is

\[
G=L D L^T,\qquad x=L^T\phi .
\]

Every rational coefficient is named by input port and capacitor coordinate.
The generator reconstructs all 576 entries of the selected Gram matrix with
exact rational arithmetic; the independent verifier reconstructs it in
floating arithmetic with maximum error below \(10^{-10}\).

## Commissioning handoff

An emulator or circuit team now has an unambiguous target:

1. compile the 276 mode-mixing terms and 24 capacitor branches;
2. choose one positive global capacitance scale;
3. measure the complete symmetric 24-port capacitance or admittance matrix in
   the declared operating band;
4. fit only that common scale and retain the full covariance;
5. require positive definiteness and less than one-percent propagated
   inverse-metric error globally, or on a preregistered occupied subspace.

Finite bandwidth, loss tangent, transformer phase, stray capacitance, mutual
inductance error and routing crosstalk are mandatory next-layer model fields.

## Boundary

This removes coefficient and port-assignment ambiguity from the ideal carrier.
It is not a planar layout, electromagnetic model, foundry design or fabricated
device. Passing it commissions the Leech quadratic metric only; nonlinear
cosines, inversion gauging, edge transport and Monster-sector witnesses remain
separate gates.

## Reproduce

```powershell
node scripts/generate-leech-gram-first-network-manifest.mjs --write
node verification/verify/verify_leech_gram_first_network_manifest.mjs
```

## Evidence

- `evidence/data/leech-gram-first-ideal-network-manifest-v1.json`
- `scripts/generate-leech-gram-first-network-manifest.mjs`
- `verification/verify/verify_leech_gram_first_network_manifest.mjs`

## Corpus links

- [Transformer-factor audit](frontier_wave7_174_leech_pareto_transformer_factor_audit.md)
- [Exact transformer recovery](frontier_wave7_170_leech_transformer_capacitance_recovery.md)
- [Monster laboratory promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
- [24-port commissioning digital twin](frontier_wave7_225_leech_24port_commissioning_digital_twin.md)
