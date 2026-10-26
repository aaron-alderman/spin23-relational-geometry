# E8 projected-chain width/root grid

**Date:** 26 October 2026

**Status:** finite width/root rectangle promoted; thermodynamic gap open

**Evidence:** [width/root ledger](../../../evidence/data/translation-free-e8-projected-chain-width-root-grid-v1.json)
**Certificate:** [width/root verifier](../../../verification/verify/verify_translation_free_e8_projected_chain_width_root_grid.mjs)

At the admitted quantitative coupling \(J=0.05\), the open projected chain was
solved on the full grid of widths \(N=3,4,5\) and retained local root counts
\(r=6,8,10\). The first gaps are

| roots | width 3 | width 4 | width 5 |
|---:|---:|---:|---:|
| 6 | 0.1853052003 | 0.1838842187 | 0.1832776279 |
| 8 | 0.1856210069 | 0.1841558690 | 0.1835277167 |
| 10 | 0.1855601388 | 0.1840860709 | 0.1834527958 |

Every row has two sub-one-percent width increments; every column has two
sub-one-percent root-count increments. The final 100,000-state corner has a
first-state residual below \(4\times10^{-15}\). Across the grid, the band
minimum remains inversion-odd and reflection-even: the local odd excitation
has become a collective, boundary-symmetric chain mode rather than an edge
doublet.

A three-point \(1/N^2\) fit at ten roots gives 0.1822484, but this is recorded
only as a diagnostic. Three widths cannot certify a thermodynamic lower bound,
and the projected tensor product is not the full multi-cell charge Hilbert
space. The promoted claim is exactly a finite width/root convergence
rectangle. Next come reusable local-operator serialization, larger widths,
periodic-boundary comparison, and a controlled finite-size bound.
