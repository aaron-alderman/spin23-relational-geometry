# E8 two-cell local-root audit

**Date:** 26 October 2026

**Status:** projected gap root-stable through ten roots; splitting has one passing increment

**Evidence:** [root-count ledger](../../../evidence/data/translation-free-e8-two-cell-root-count-audit-v1.json)
**Certificate:** [root-count verifier](../../../verification/verify/verify_translation_free_e8_two_cell_root_count_audit.mjs)

The two-cell projection was enlarged from four to six to eight to ten local states per
cell at fixed shell cutoff eight. At \(J=0.05\), the first gap is
0.2002045301, 0.2002039816 and 0.2002631791. At \(J=0.1\), it is
0.1823910704, 0.1824120093 and 0.1826760323. Both sequences have two
successive changes below one percent, so the projected gap is root-count
stable on this ladder. At ten roots the gaps are 0.2002286054 and 0.1825357809.

The fine collective/relative splitting is more sensitive. Its changes are
4.86% then 1.16% at \(J=0.05\), and 10.14% then 2.15% at \(J=0.1\). The
swap-even and swap-odd labels survive, but their separation is still being
renormalized by omitted local states. The eight-to-ten-root changes finally
fall to 0.380% and 0.630%, but that is only one successive passing increment.
The corpus may therefore use the
existence and ordering of the two branches, but not yet their splitting as a
converged effective hopping, velocity or bandwidth.

Shell convergence controls the charge truncation of each retained local state;
root-count convergence controls virtual mixing through omitted local states.
Passing one does not pass the other. Twelve roots or a controlled downfolding
remainder is required before the splitting can seed a longer-chain dispersion.
