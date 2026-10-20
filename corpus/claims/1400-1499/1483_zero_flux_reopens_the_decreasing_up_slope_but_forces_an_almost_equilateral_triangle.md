# Zero flux reopens the decreasing up slope but forces an almost equilateral triangle

**Date:** 20 October 2026

**Gates:** A5 and A6

**Status:** exact boundary identity plus constructive two-hierarchy witness; CKM joining remains open

**Depends on:** [the pi-flux slope theorem](1482_the_pi_flux_signless_triangle_forces_the_up_mass_slope_positive.md)

**Evidence:** [machine-readable seam](../../../evidence/data/spin23-zero-flux-reversed-slope-seam.json) and [executable verifier](../../../verification/verify/verify_spin23_zero_flux_reversed_slope_seam.mjs)

## Result

The decreasing-up affine branch excluded at pi flux is not globally excluded. At zero flux the up operator is the positive weighted triangle Laplacian. Put

\[
S=a+b+c,
\qquad
R^2={1\over2}\left[(a-b)^2+(b-c)^2+(c-a)^2\right].
\]

Its ordered spectrum is

\[
(0,S-R,S+R).
\]

The sorted affine location and its decreasing-slope physical reversal are therefore

\[
r_{\rm sorted}={S-R\over S+R},
\qquad
r_{\rm physical}=1-r_{\rm sorted}={2R\over S+R}.
\]

Matching the common-scale up-quark mass-squared location fixes

\[
\boxed{{R\over S}={r_u\over2-r_u}=6.78879748\times10^{-6}.}
\]

Thus the branch reopens only in an extremely narrow neighbourhood of the equilateral triangle. This is the complementary boundary to claim 1482: pi flux forces the up slope positive, whereas zero flux permits a negative slope by turning the observed hierarchy into an upper-pair near-degeneracy.

## Constructive two-spectrum witness

Choose

\[
a=1+x,
\qquad b=1-x,
\qquad c=1,
\qquad x=\sqrt3\,{r_u\over2-r_u}.
\]

Numerically,

\[
x=1.17585422\times10^{-5}.
\]

With zero loop phase and

\[
\eta=0.012612109310721289,
\]

the decreasing up spectrum and increasing down spectrum give

\[
r_u=1.3577502786\times10^{-5},
\qquad
r_d=3.4973781918\times10^{-4}.
\]

Both quark hierarchy locations are therefore spectrally compatible on a second, nearly equilateral boundary. The extreme anisotropic pi-flux witness of claim 1480 is not the only spectral realization.

## Why this is a seam, not a solution

At exact equilateral shape the degree matrix is scalar and the triangle has a two-dimensional degenerate eigenspace. The required up hierarchy sits only about seven parts per million away from that enhanced-symmetry locus. The construction has not explained that tuning, and it has not transported a unique physical basis through the degeneracy.

A deterministic (512 by 512) audit of the maximal two-phase diagonal orbit on the displayed witness found no joined CKM point. Its best recorded four-observable log score has

\[
(|V_{us}|,|V_{cb}|,|V_{ub}|,|J|)
=(0.99915,0.07622,0.00577,1.71\times10^{-5}),
\]

so the Cabibbo entry is grossly wrong. This is a bounded grid result, not a proof of the global minimum and not a no-go for nonzero general holonomy.

## Boundary

This calculation establishes:

- claim 1482 cannot be extrapolated from pi flux to all holonomies;
- a decreasing up slope can reproduce the up hierarchy at zero flux;
- the same triangle can reproduce the down hierarchy with positive eta;
- the price is an almost equilateral geometry and unresolved basis transport;
- no joined CKM witness has been found on this exact boundary.

The next high-value calculation is a certified neighbourhood bound: combine the centered-cubic spectral surface with interval bounds on the maximal diagonal orbit near the equilateral/zero-flux locus. Physical admission remains false.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_zero_flux_reversed_slope_seam.mjs
~~~
