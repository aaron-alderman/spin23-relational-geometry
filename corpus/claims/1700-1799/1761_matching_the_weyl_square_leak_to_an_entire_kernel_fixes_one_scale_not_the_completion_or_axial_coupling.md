# Matching the Weyl-Square Leak to an Entire Kernel Fixes One Scale, Not the Completion or Axial Coupling

**Date:** 23 October 2026

**Status:** exact zero-free form-factor matching and non-identifiability theorem

**Depends on:** [the local fixed-point rejection](1759_the_existing_quantum_packet_already_rejects_the_unchanged_spectrum_local_fixed_point_route.md) and [the earlier entire-function escape](../1600-1699/1618_entire_and_bimetric_completions_evade_the_finite_spin2_ghost_but_import_new_parent_structure.md)

**Evidence:** [entire-family ledger](../../../evidence/data/spin23-entire-completion-matching-degeneracy-v1.json) and [verifier](../../../verification/verify/verify_spin23_entire_completion_matching_degeneracy.mjs)

## Explicit enlarged kernel

Cross the local finite-derivative boundary with the one-parameter family

\[
 K_\alpha(p^2)=M_{\rm Pl}^2p^2
 \exp\!\left[x+\alpha x^2\right],
 \qquad x={p^2\over M^2}.
\]

Because the exponential of an entire function has no finite zeros, the
propagator

\[
 D_\alpha(p^2)=
 {\exp[-x-\alpha x^2]\over M_{\rm Pl}^2p^2}
\]

has only the positive-residue Einstein pole for every finite real
\(\alpha\).  This explicitly avoids the additional pole of the resummed
local \(C^2\) truncation.

## What matching determines

The low-momentum expansion is

\[
 K_\alpha=M_{\rm Pl}^2p^2
 +{M_{\rm Pl}^2\over M^2}p^4
 +{M_{\rm Pl}^2(\alpha+1/2)\over M^4}p^6+O(p^8).
\]

Thus a boundary condition together with the packet's unit-log coefficient

\[
 c_C={11\over960\pi^2}
\]

can be represented by

\[
 {M^2\over M_{\rm Pl}^2}={960\pi^2\over11}.
\]

It fixes only the coefficient linear in \(x\).  The parameter \(\alpha\),
all still-higher coefficients in the entire exponent, the Lorentzian
prescription and the loop-dressed analytic structure remain undetermined.

For example \(\alpha=-1,0,2\) have the same Einstein pole, no additional
free poles and the same \(p^4\) coefficient, but different \(p^6\) and
higher responses.  The degeneracy is infinite-dimensional after replacing
\(\alpha x^2\) by an arbitrary entire series beginning at \(x^2\).

## No axial selection

The spin-two matching equation contains no axial-current coefficient.  For
each displayed \(\alpha\), the axial coupling may independently be
\(0\), \(1/8\), or \(1/4\).  Selecting \(1/8\) would require a new Ward
identity or parent relation tying the form factor to the fermion/torsion
vertex.  Zero-free pole structure supplies no such relation.

The entire-function escape is therefore a genuine free-propagator completion
of the local ghost symptom, but not a completed quantum theory and not an
axial-coupling selector.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_entire_completion_matching_degeneracy.mjs
~~~
