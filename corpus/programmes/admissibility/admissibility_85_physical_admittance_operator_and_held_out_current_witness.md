# A physical admittance operator predicts one held-out current

**Date:** 25 October 2026  
**Status:** one quantity-level operator witness closed; Jordan and measured-record gates open  
**Topics:** OT-026, OT-027  
**Parent:** [AZ-084 record-layer closure](admissibility_84_all_d02_families_pass_common_algebra2_record_layer.md)  
**Evidence:** [physical admittance witness](../../../evidence/data/claimipedia-d02-physical-admittance-witness-v1.json)  
**Generator:** [physical witness runner](../../../scripts/run-claimipedia-d02-physical-admittance-witness.mjs)  
**Verifier:** [physical witness certificate](../../../verification/admissibility/verify_claimipedia_d02_physical_admittance_witness.mjs)

**Continued by:** [AZ-086 positive spectral atom](admissibility_86_positive_spectral_atom_and_measure_evaluation_witness.md)

## Result

The first quantity-level D02 path now closes for an ordinary physical system. A reciprocal two-node RC network is represented by its calibrated nodal-admittance matrix. Its entries carry siemens, not the dimensionless record units used in AZ-084. The fixed-support Schur step maps the two-node matrix to a one-port effective admittance, still in siemens. Applying a declared voltage probe then maps that admittance to a current in amperes.

The strict `common-algebra-2` composer admits exactly the two intended operations:

1. `apply-local-support-schur-theorem-to-calibrated-rc-network`;
2. `apply-calibrated-voltage-probe`.

The second step carries the nonzero SI exponent delta of a volt. If that delta is corrupted, the path disappears. If the calibrated probe operation is removed, the path also disappears. The result therefore distinguishes a response operator from its application to a physical input.

## Withheld consequence

The component values, ground, current sign, phasor convention, frequency and 0.2 V RMS probe were fixed before evaluation. At the held-out frequency of 997 Hz, Schur elimination predicts

\[
Y_{\mathrm{eff}}=(2.64547323247+2.31899555417i)\,\mathrm{mS}
\]

and hence

\[
I=(0.529094646494+0.463799110833i)\,\mathrm{mA}.
\]

An independently implemented Kirchhoff solve of the unreduced two-node circuit recovers the same current with absolute numerical error (1.22\times10^{-19}\,\mathrm{A}). The real part of the effective admittance is positive. No fitted coefficient or authored output edge is used to obtain the current.

## What closed

For this RC witness only, the workflow now carries:

- a physical response quantity with nonzero SI dimensions;
- an explicit port and sign normalization;
- a physical linear operator (I=Y_{\mathrm{eff}}V);
- a loss receipt for the eliminated internal-node voltage;
- a computationally withheld consequence checked by a second calculation.

This is the requested theoretical-engineering improvement. The system has moved from a typed account *of* a response to one executable, unit-bearing response operator.

## What remains open

The witness is deliberately conventional. It does not extract a Jordan product from Claimipedia relations, derive an action, predict an independently measured detector record, or show new physics. It also does not make every D02 family physical: operator-measure, rank-change and boundary families still require their own quantity dictionaries.

OT-027 is narrowed but not closed. One operator assignment exists; the closure condition requires an action or common rule that generates both the operator and a calibrated detector map. OT-026 remains open in full because no product, norm, rank or radical identity has been induced from relation composition.

## Implication and look-here instruction

The next useful fork is now clean.

- **Theoretical engineering:** attach the same prediction to a source-native measured impedance or admittance dataset, freeze the nuisance and calibration model, and predict a genuinely withheld frequency or component configuration.
- **Algebraic frontier:** AZ-086 applies the quantity-layer discipline to `extract-positive-operator-measure`; the remaining question is whether source composition can predict a product identity rather than receive one as an authored edge.
- **New-physics frontier:** only reopen that reading if the calibrated measured record disagrees after the conventional circuit family, parasitics and uncertainty model have been fixed.

The lesson is modest but important: the metadata barrier was real, and now one physical bridge passes it. The remaining question is no longer whether the machinery can carry units. It is whether source-native structure can remove freedom or predict a record that ordinary modeling did not already guarantee.

## Reproduction

~~~powershell
node scripts/run-claimipedia-d02-physical-admittance-witness.mjs --write
node verification/admissibility/verify_claimipedia_d02_physical_admittance_witness.mjs
~~~
