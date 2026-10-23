# The Simple Exponential Spin-Two Escape Fails Standard Positive Spectral Reconstruction

**Date:** 23 October 2026

**Status:** exact physical-channel Källén--Lehmann positivity obstruction

**Depends on:** [the entire matching family](1761_matching_the_weyl_square_leak_to_an_entire_kernel_fixes_one_scale_not_the_completion_or_axial_coupling.md) and [the joint spin-two completion audit](1764_both_healthy_spin_two_escapes_are_inverse_degenerate_and_decoupled_from_axial_selection.md)

**Evidence:** [spectral reconstruction ledger](../../../evidence/data/spin23-spin2-positive-spectral-reconstruction-v1.json) and [verifier](../../../verification/verify/verify_spin23_spin2_positive_spectral_reconstruction.mjs)

## Positive spectral lower bound

For a physical transverse-traceless channel with a standard positive
Hilbert-space reconstruction, the Euclidean two-point function has the form

\[
 D(Q^2)={Z\over Q^2}
 +\int_{0^+}^{\infty}{\rho(s)\over Q^2+s}\,ds,
 \qquad Z>0,\quad \rho(s)\ge0.
\]

The explicit massless pole has residue \(Z\).  Therefore every \(Q^2>0\)
must satisfy

\[
 \boxed{Q^2D(Q^2)\ge Z}.
\]

This inequality needs no knowledge of the continuum: its contribution is
nonnegative.

## Exponential contradiction

The simple zero-free propagator used in the entire-function escape is

\[
 D_{\exp}(Q^2)={Z e^{-Q^2/M^2}\over Q^2}.
\]

For every positive \(Q^2\),

\[
 Q^2D_{\exp}(Q^2)=Ze^{-Q^2/M^2}<Z.
\]

It therefore cannot possess the displayed positive spectral representation.
The absence of extra finite poles is not enough: exponential ultraviolet
suppression subtracts below the contribution already required by its own
positive massless pole.

This is a physical-channel statement, not an assertion about gauge-variant
components.  It also does not prove that every conceivable nonlocal quantum
prescription is inconsistent.  It proves that this simple exponential cannot
claim ordinary Källén--Lehmann positivity; any proposed theory must formulate
and establish a different reconstruction principle.

## Bimetric contrast

The healthy bimetric propagator

\[
 D_{gg}(Q^2)={\cos^2\theta\over Q^2}
 +{\sin^2\theta\over Q^2+m_2^2}
\]

has the positive discrete spectral measure

\[
 \rho(s)=\cos^2\theta\,\delta(s)
 +\sin^2\theta\,\delta(s-m_2^2).
\]

Thus ordinary positivity eliminates the simple exponential representative
but retains the positive-residue bimetric family.  It still gives no equation
for the independent axial torsion coupling.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_spin2_positive_spectral_reconstruction.mjs
~~~
