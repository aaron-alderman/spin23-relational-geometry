# A passive model predicts source-native held-out impedance

**Date:** 25 October 2026  
**Status:** one measured-response bridge closed; uncertainty and cross-cell gates open  
**Topics:** OT-027  
**Parent:** [AZ-086 positive spectral atom](admissibility_86_positive_spectral_atom_and_measure_evaluation_witness.md)  
**Evidence:** [held-out passive fit](../../../evidence/data/zenodo-eis-held-out-passive-fit-v1.json)  
**Source:** [Zenodo ID01 provenance](../../../evidence/sources/zenodo-15422339-id01-provenance.md)  
**Verifier:** [held-out fit certificate](../../../verification/admissibility/verify_zenodo_eis_held_out_passive_fit.mjs)

**Continued by:** [AZ-088 population passive baseline](admissibility_88_population_wide_passive_impedance_baseline.md)

## Result

The operator-and-measure chain now reaches a source-native measured record. Zenodo DOI `10.5281/zenodo.15422339` supplies raw galvanostatic complex impedance for 54 NMC811 21700 cells at 30% state of charge. Cell `ID01.csv` contains 44 frequency points from 0.05 Hz to 10 kHz with real and imaginary impedance in ohms.

Before fitting, source rows whose zero-based index is congruent to one modulo three were reserved. This leaves 29 training points and 15 held-out points distributed across the whole frequency range. The conventional model family was fixed as nonnegative series resistance and inductance, five Debye arcs centred at 0.1, 1, 10, 100 and 1000 Hz, and one nonnegative semi-infinite Warburg term. Only training impedances determine coefficients.

The passive constrained fit predicts the held-out complex values with:

- held-out RMSE (2.1201\times10^{-4}\,\Omega);
- median relative complex error (0.462\%\);
- maximum relative complex error (3.575\%\).

The preregistered ceilings were 5% median and 20% maximum. Both pass. Training and held-out errors are comparable, and every fitted coefficient is nonnegative.

## What closed

This is the first end-to-end measured translation in this lane: externally authored frequency, units and complex records enter; a frozen passive family is fitted without seeing the held-out values; and those values are predicted within a declared decision rule. The result shows that Claimipedia/Sourcery-style typed reasoning can be attached to real response data without weakening the scientific firewall.

## What did not close

The source CSV does not provide pointwise measurement uncertainty or a detector likelihood. One cell does not establish generalization across the other 53 cells. The equivalent-circuit family is conventional and flexible; passing it is evidence for ordinary passive modeling, not for the corpus's deeper algebra and certainly not for new physics.

The high-frequency held-out point has the largest error, about 3.6%, but remains below the declared ceiling. That residue cannot be interpreted until fixture inductance, calibration covariance, repeatability and cross-cell variation are included.

## Implication and next gate

The measured-data absence identified after AZ-086 is resolved. The next useful calculation is cross-cell: freeze this basis and split rule, run all 54 cells, estimate population variation, and test whether the same passive cone predicts each held-out spectrum. A detector claim additionally needs instrument uncertainty or replicate-derived covariance. Only a stable, structured residual surviving that expanded conventional model would justify a frontier or new-physics reading.

## Reproduction

~~~powershell
node scripts/run-zenodo-eis-held-out-passive-fit.mjs --write
node verification/admissibility/verify_zenodo_eis_held_out_passive_fit.mjs
~~~
