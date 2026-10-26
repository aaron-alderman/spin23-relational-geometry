# E8 kinetic-metric perturbation

**Date:** 26 October 2026

**Status:** one positive metric direction promoted; open tube not certified

**Evidence:** [metric ledger](../../../evidence/data/translation-free-e8-kinetic-metric-perturbation-v1.json)
**Certificate:** [metric verifier](../../../verification/verify/verify_translation_free_e8_kinetic_metric_perturbation.mjs)

The perturbation lane now reaches both halves of the Hamiltonian. Replace the
charging metric by the positive congruence

\[
K_{E8}\longmapsto D K_{E8}D,\qquad
D=\operatorname{diag}(1.05,0.95,1.04,0.96,1.03,0.97,1.02,0.98),
\]

while retaining equal locking amplitudes \(u_i=0.5\). Positivity follows
exactly because \(D\) is invertible and positive; the verifier also constructs
the Cholesky pivots. The original E8 energy shells remain the truncation basis,
so poorer basis adaptation is exposed as boundary weight rather than hidden by
changing the cutoff geometry.

Complete-shell gaps at cutoffs 6, 8 and 10 are 0.2213227430, 0.2197890871 and
0.2196545313. Their successive changes are 0.693% and 0.0612%, with a final
shift of +0.631% from the symmetric reference. The first three low states have
residuals below \(2.7\times10^{-11}\), low-four boundary weight remains below
\(8.5\times10^{-6}\), and the first transition stays odd, cosine-dark and
sine-bright.

Together with the two channel-amplitude directions this gives a finite sampled
stencil in potential and kinetic sectors. It does not prove an open tube:
mixed corners, continuity between samples, rigorous gap bounds and intercell
stability remain open. The next economical test combines one amplitude offset
with this metric before adding a spatial cell index.
