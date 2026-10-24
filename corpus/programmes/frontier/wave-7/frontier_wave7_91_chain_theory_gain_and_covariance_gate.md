# Frontier Wave 7.91: The Gain and Covariance Gate

**Date:** 25 October 2026
**Status:** exact scaling fork and symmetry no-go
**Certificate:** [gain and covariance verifier](../../../../verification/verify/verify_chain_theory_gain_and_covariance_gate.mjs)

## Result

The completely positive unread channel from Wave 7.90 preserves the shape of
the 24-dimensional correlation carrier, but it does not preserve its absolute
scale.  At maximum completely positive retention,

\[
\Phi_{1/8}(A\otimes B)=\frac18 A\otimes B
\]

for every traceless qubit observable (A) and traceless qutrit observable
(B).  Consequently:

- correlation directions and ratios are unchanged;
- absolute correlation amplitudes are divided by eight;
- support counting still gives (24\cdot36^2=31104);
- the unread channel cannot choose some directions inside the 24 while
  preserving endpoint-unitary covariance.

This separates a legitimate dimension bridge from an unproved normalization
bridge.

## 1. The unavoidable gain fork

Let the proposed dimension-only target be

\[
\alpha_0^{-1}=137.03599918956616.
\]

If its numerator is an absolute response linear in the unread correlation,
then the physical channel gives

\[
\alpha_{\rm abs}=\frac18\alpha_0,
\qquad
\alpha_{\rm abs}^{-1}=1096.2879935165293.
\]

That is not a small correction.  The original value survives only if the
observable is normalized by an independently measured channel gain, or if a
derived conservation identity cancels the same gain between numerator and
denominator.  Merely counting 24 nonzero directions does neither.

For connected observables (X,Y), uniform attenuation does imply

\[
\frac{\langle X\rangle_{\rm out}}
     {\langle Y\rangle_{\rm out}}
=
\frac{\langle X\rangle_{\rm in}}
     {\langle Y\rangle_{\rm in}},
\]

whenever the denominator is nonzero.  Thus a ratio-defined coupling can be
gain-free.  An absolute residue, rate or force cannot be declared gain-free
without an explicit calibration law.

## 2. Covariance no-go for the sign-only rule

Under endpoint transformations, the connected carrier is

\[
\mathfrak{su}(2)\otimes\mathfrak{su}(3),
\]

the external tensor product of the two adjoint representations.  It is an
irreducible representation of (SU(2)\times SU(3)).  Schur's lemma therefore
forces every endpoint-unitary-covariant channel to act on this whole carrier
by one scalar.

The unread channel can:

1. erase the local (3) and (8) sectors;
2. retain or attenuate the connected (24);
3. add scalar noise needed for complete positivity.

It cannot, while retaining that covariance, distinguish a connected record
because it originated in a qubit commutator rather than a qutrit commutator.
The target's asymmetric record rule—retain the three qubit Lie directions but
not the eight qutrit Lie directions—must therefore arise elsewhere:

- in the algebra of the two read copies;
- in a detector functional that is not the unread channel;
- through a declared symmetry-breaking tensor or boundary condition; or
- through a quotient whose kernel is derived and experimentally testable.

Calling the link “unread” does not supply that quotient.

## 3. Minimal experiment

Prepare a spanning set of connected inputs

\[
\rho_{ia}(t)=\frac{I_6}{6}+t\,\sigma_i\otimes\lambda_a
\]

inside their positivity intervals.  For every (i=1,2,3) and
(a=1,\ldots,8), estimate the input and output connected coordinates.  The
covariant-channel hypothesis predicts one common slope:

\[
\frac{c^{\rm out}_{ia}}{c^{\rm in}_{ia}}=\eta,
\qquad \eta\le\frac18.
\]

This gives three useful outcomes:

| observation | implication |
|---|---|
| one common slope | the 24-carrier channel is supported; calibrate η before testing an absolute coupling |
| direction-dependent slopes | endpoint symmetry is broken; the breaking tensor becomes new model data |
| selective zeros matching the record rule | a detector/kernel mechanism exists, but it is not the covariant unread channel |

After measuring η, run the two-read record experiment twice: once on an
absolute response and once on a ratio normalized by a reference connected
observable.  Agreement only in the normalized result identifies the proposed
number as a shape invariant rather than an absolute coupling prediction.

## 4. What has become real

The Chain reconstruction now has three distinct layers:

\[
\boxed{
\text{support geometry}
\;\longrightarrow\;
\text{physical channel and gain}
\;\longrightarrow\;
\text{detector quotient}
}
\]

The first layer explains (36,24) and hence (31104).  The second supplies a
completely positive implementation and the sharp bound η≤1/8.  The third
is still missing and is exactly where the claimed (172=169+3) record count
must be earned.

This is a useful frontier rather than a failure: the next unknown is a finite
detector map, not an unrestricted search for numerology.

## Verdict

The 24-dimensional unread carrier is physically realizable, but its dimension
alone cannot fix an absolute coupling.  Complete positivity introduces a
large, mandatory gain, and covariance prevents that channel from generating
the target's asymmetric Lie-sector selection.  The shortest remaining bridge
is therefore an explicit, calibrated detector kernel on the two read copies.

## Corpus anchors

- [unread-correlation channel](frontier_wave7_90_chain_theory_unread_correlation_channel.md)
- [Jordan--Lie record fork](frontier_wave7_85_chain_theory_jordan_lie_record_fork.md)
- [exchange-type firewall](frontier_wave7_84_chain_theory_exchange_type_firewall.md)
- [rectangular endomorphism bridge](frontier_wave7_86_chain_theory_rectangular_endomorphism_bridge.md)
