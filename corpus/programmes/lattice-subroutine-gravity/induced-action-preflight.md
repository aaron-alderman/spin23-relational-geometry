# Induced-action preflight: degeneracy is not a stress tensor

**Date:** 24 October 2026  
**Status:** conditional heat-kernel stress test; no admission of Monster coefficients as particle counts  
**Evidence:** [machine-readable result](../../../evidence/data/lattice-subroutine-induced-gravity-preflight-v1.json)  
**Certificate:** [preflight verifier](../../../verification/verify/verify_lattice_subroutine_induced_gravity_preflight.mjs)

## Question

Could the modular subroutine curve spacetime indirectly by supplying many quantum fields whose one-loop effective action induces an Einstein term?

This is the shortest calculable route to EFE, but it requires a typed map from graded CFT states to four-dimensional fields. To expose what that map must contain, take the deliberately naive toy of \(N\) real scalars with operator

\[
\Delta_\xi=-\Box+\xi R.
\]

With a proper-time cutoff \(\Lambda\), the leading one-loop magnitudes are

\[
|\rho_{\rm vac}|
\sim \frac{N\Lambda^4}{64\pi^2},
\qquad
M_{{\rm Pl},{\rm ind}}^2
=\frac{N(1/6-\xi)\Lambda^2}{16\pi^2}.
\]

The power-divergent coefficients are regulator- and renormalization-condition dependent. Their value here is a stress test, not a prediction.

## The decisive fork appears before any large calculation

For minimally coupled scalars, \(\xi=0\),

\[
M_{{\rm Pl},{\rm ind}}^2
=\frac{N\Lambda^2}{96\pi^2}.
\]

For conformally coupled scalars, \(\xi=1/6\), this quadratically divergent Einstein coefficient vanishes. The same degeneracy \(N\) therefore yields different gravity depending on a coupling that the modular character does not encode.

This repeats, in the lattice lane, the corpus's existing curvature-coupling lesson: a state count or flat-space stress normalization does not predict the improvement/curvature term.

## Why \(196884\) is not a species prediction

If the first positive Monster coefficient were naively read as \(N=196884\) independent light scalars, then

\[
\sqrt N\approx443.716,
\qquad
\Lambda_{\rm species}\sim\frac{M_{\rm Pl}}{\sqrt N}
\approx0.002254\,M_{\rm Pl}.
\]

The cutoff required for the minimal-scalar one-loop coefficient itself to generate \(M_{\rm Pl}^2\) is

\[
\Lambda\approx\sqrt{\frac{96\pi^2}{N}}M_{\rm Pl}
\approx0.06937\,M_{\rm Pl},
\]

about \(\sqrt{96\pi^2}\approx30.78\) times the naive species scale. The numerical species bound has order-one qualifications, so this is a strong consistency warning rather than a theorem of impossibility.

The vacuum term is not helped by the multiplicity:

\[
\frac{|\rho_{\rm vac}|}{M_{{\rm Pl},{\rm ind}}^2}
=\frac32\Lambda^2.
\]

The factor \(N\) cancels. Large degeneracy raises both coefficients and does not create the observed hierarchy.

Most importantly, \(196884\) counts states at a conformal grade. Descendants, internal states and members of one representation are not automatically independent four-dimensional particle species. The character supplies none of their masses, spins, statistics, curvature couplings or target-space locality.

## Result

The induced-action route remains open, but its input is now exact:

1. a declared map from VOA/CFT states to four-dimensional fields;
2. spins, statistics, masses and curvature couplings;
3. covariant kinetic operators;
4. regulator, bare gravitational terms and renormalization conditions;
5. a healthy spectrum below the resulting cutoff.

Without those data, the Monster coefficient cannot predict \(G_N\). With them, the heat-kernel calculation becomes straightforward and falsifiable.

## Next model

The next admissible toy should not use all 196884 states. It should select the smallest source-derived multiplet whose 4D field interpretation is explicit, compute \(a_0,a_1,a_2\), and test:

- whether the Einstein coefficient has the correct sign;
- whether the cosmological term is independently controlled;
- whether curvature-squared ghosts lie above the cutoff;
- whether the result survives the corpus's independent-connection and quantization gates.

