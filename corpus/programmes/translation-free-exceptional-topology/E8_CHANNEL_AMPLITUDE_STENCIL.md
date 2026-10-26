# E8 channel-amplitude stability stencil

**Date:** 26 October 2026

**Status:** two non-collinear amplitude directions promoted; open ball not certified

**Evidence:** [stencil ledger](../../../evidence/data/translation-free-e8-channel-amplitude-stencil-v1.json)
**Certificate:** [stencil verifier](../../../verification/verify/verify_translation_free_e8_channel_amplitude_stencil.mjs)

The first unequal-channel result is not isolated. A second, non-alternating
direction

\[
(u_1,\ldots,u_8)=(0.60,0.52,0.44,0.48,0.40,0.56,0.46,0.54)
\]

keeps mean locking 0.5 while reaching a 20% channel displacement. It is not
collinear with the earlier 10% direction: the cosine between their centered
amplitude vectors is -0.218.

For the second direction, complete-shell gaps at cutoffs 6, 8 and 10 are
0.2183476531, 0.2171133353 and 0.2170242135. Successive changes are 0.565%
and 0.0410%; the final gap is only 0.574% below the symmetric reference.
The first three Ritz residuals are below \(3.7\times10^{-11}\), final
low-four boundary weight is below \(5.1\times10^{-6}\), and the first
excitation remains odd, cosine-dark and sine-bright.

This promotes a finite two-direction stencil, not a continuous neighbourhood.
No interpolation theorem or dense sweep has yet excluded a gap-closing pocket
between the sampled points. More importantly, both directions perturb the
locking vector while leaving the quadratic kinetic metric fixed. A positive
metric perturbation is therefore the next qualitatively independent gate.
