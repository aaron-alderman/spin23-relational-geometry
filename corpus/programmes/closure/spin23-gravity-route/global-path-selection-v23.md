# Spin(2,3) Global Path Selection v23: Cross-Sector Symmetry Classification

**Frozen:** 23 October 2026

The new cross-sector-principle placeholder has been classified.  An internal
generator commuting with Poincaré preserves the spin Casimir and cannot mix
spin two with spin zero.  Under standard analytic S-matrix assumptions this
extends to the Coleman--Mandula direct-product result.  The graded loophole is
supersymmetry, whose minimal realization has already failed as a selector.

| ID | Path | State | Result or blocker |
|---|---|---|---|
| PC | Poincaré-commuting generator | completed | distinct \(W^2\) eigenspaces cannot mix |
| CM | Ordinary bosonic S-matrix symmetry | rejected as selector | conditionally Poincaré times internal |
| S1 | Minimal \(N=1\) graded extension | rejected as selector | extra multiplet plus continuous Kähler coefficient |
| ES | Extended/broken supersymmetry | externally blocked | complete enlarged model absent |
| HS | Higher-spin or nonstandard-S-matrix parent | externally blocked | theory and replacement positivity framework absent |
| SV | Stabilized torsional compactification | externally blocked | microscopic vacuum data absent |

The gravity caveat is explicit: long-range gravity can invalidate ordinary
S-matrix assumptions.  That caveat opens only named new frameworks, not an
inference within the current bimetric-torsion parent.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_cross_sector_symmetry_classification.mjs
node verification/verify/verify_spin23_new_model_path_selection_v11.mjs
~~~
