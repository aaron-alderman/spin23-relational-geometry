# Frontier Wave 7.234: Translation-Free E8 Coupled Wire and Held-Out Root Tomography

**Date:** 26 October 2026

**Status:** exact continuum-local construction and E8-specific finite detector; few-body microscopic realization open

**Programme:** [translation-free exceptional topology](../../translation-free-exceptional-topology/README.md)

**Protocol:** [coupled-wire tomography](../../translation-free-exceptional-topology/E8_COUPLED_WIRE_TOMOGRAPHY.md)

**Evidence:** [frozen ledger](../../../../evidence/data/translation-free-e8-coupled-wire-tomography-v1.json)

**Certificate:** [exact verifier](../../../../verification/verify/verify_translation_free_e8_coupled_wire_tomography.mjs)

## Result

The first gap identified by Wave 7.232 is now split cleanly. Seven nonchiral
(E_8\oplus(-E_8)) wires, joined by 48 mutually null nearest-neighbor cosine
terms, leave one chiral E8 boundary on each side. A frozen irregular embedding
and nonuniform positive coupling schedule remove transverse translation
symmetry without changing the null-vector pattern. This closes a
source-native, continuum-local B1 construction. It does not yet derive E8
from elementary few-body hardware.

The same tranche makes E8 provenance falsifiable. Eight measured simple-current
products reconstruct (K_{E_8}); Weyl closure then predicts 240 weight-one
currents and their full pair-exponent distribution. Those nonsimple currents
are held out from fitting. Observing only eight co-propagating modes or
(c_-=8) fails the gate.

## Implication

The experimental hierarchy now has a strict order:

\[
\text{one-way heat}
\;<\;
\text{even unimodular current form}
\;<\;
\text{held-out 240-root closure}
\;<\;
\text{rank-24 current/orbifold/defect data}.
\]

This is the first point in the new arm where “E8” is a predictive operator
claim rather than a label inferred from eight channels or central charge. The
remaining physics risk has also become concrete: whether the multi-field
pinning controls can be compiled into a bounded-degree few-body Hamiltonian
whose gap survives width, disorder and imperfect calibration.

## Next execution

1. factor every column cosine into an ancilla-mediated bounded-degree circuit;
2. freeze the resulting local Hamiltonian rather than its infrared target;
3. compute the lowest bulk gap for increasing wire number and disorder;
4. open one edge and simulate pulse transport;
5. fit only the eight simple-current records and score all 232 nonsimple
   currents as held-out predictions.

If the gap collapses, the continuum construction remains correct but the
hardware promotion fails. If the gap remains open while the current shell is
incomplete, the bulk E8 class survives but source/detector access to the affine
E8 enrichment has been lost. That separation is itself a useful boundary of
admissibility.
