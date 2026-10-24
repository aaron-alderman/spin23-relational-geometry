# Frontier Wave 7.4: Admissibility Coordinates and the Matrix

**Date:** 24 October 2026  
**Status:** synthesis and data-model proposal

## From one matrix to a matrix of maps

The corpus's “matrix to end all matrices” should not be a single numerical array. Different mini-systems live in different categories. Flattening them into one matrix would erase precisely the typing information the investigation has recovered.

The appropriate object is a sparse incidence structure whose rows are carriers and whose columns are admissibility coordinates:

\[
\Sigma(X\xrightarrow{\pi}Y)=
(r_{\rm vis},r_{\rm hid},
\mathcal I_{\mathbb R},
\mathcal I_{\mathbb Z},
\mathcal M,
\mathcal A_{\rm fix},
K,\mathcal F,\mathcal T,\mathcal C).
\]

Here:

- \(r_{\rm vis},r_{\rm hid}\): visible and hidden ranks;
- \(\mathcal I_{\mathbb R}\): real or polynomial invariants;
- \(\mathcal I_{\mathbb Z}\): integral discriminant, torsion or index;
- \(\mathcal M\): monodromy or holonomy;
- \(\mathcal A_{\rm fix}\): retained observable algebra;
- \(K\): memory or self-energy kernel;
- \(\mathcal F\): identifiable Fisher tangent;
- \(\mathcal T\): thermodynamic ledger;
- \(\mathcal C\): preparation, detection and verification cost.

Entries may be numbers, presentations, functions, spectra or explicit “not defined” values. Missing data must not be silently replaced by zero.

## Absolute position is replaced by provenance

There is generally no coordinate-free absolute location of a subsystem inside every possible parent. What is absolute enough for science is a provenance-bearing path:

\[
X_0\xrightarrow{\pi_1}X_1\xrightarrow{\pi_2}\cdots\xrightarrow{\pi_n}\text{records},
\]

with every map, preserved structure and composition defect declared.

Two descriptions occupy the same operational location only if their paths produce equivalent record laws under allowed interventions—not merely isomorphic abstract state spaces.

## Filled and unfilled cells

A cell is **filled** only when it has:

1. a typed definition;
2. a derivation or calibrated measurement;
3. a certificate or uncertainty statement;
4. a transformation law under adjacent maps; and
5. a falsifier.

An **unfilled** cell is not zero. It may be undefined, uncalculated, experimentally inaccessible, destroyed by the quotient or blocked by missing model data. Those states must remain distinct.

## What the matrix already says

The [quotient-scar register](../../quotient-scars/quotient_scar_register_v1.json) now spans sixteen typed reductions and thirteen populated scar types. It contains exact survival, exact erasure, detector recovery, nonlinear visibility, integral memory without orientation, alternating-projection selection, moving-projector holonomy, two-rail closure, metastable wall formation, a wall-localized response determinant, the two-projector oriented-lift boundary, a three-record detector discriminator, a wall-pseudoscalar oriented selector, its coefficient-provenance exhaustion boundary, action-level realization without exceptional selection and topology without a particle operator.

No single scalar can rank all admissibility. The structure is partially ordered: one reduction may preserve topology while losing statistics; another may preserve response while losing embedding orientation.

## Next schema expansion

The register should acquire explicit edges:

- “refines” for added detector faces;
- “serially composes with” for valid reduction chains;
- “same carrier as” for alternative reductions;
- “forgets” for proved loss;
- “recovers via” for sufficient enrichment;
- and “cannot join without” for typed physical boundaries.

That graph can expose missing squares, inconsistent transported invariants and repeated no-go patterns automatically. It—not a largest symmetry algebra—is the plausible growing shape behind the investigations.
