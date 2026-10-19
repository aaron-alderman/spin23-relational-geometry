# The Crossing-Projector Gap Stabilizes Through Width Six and Its Tail Is Gaussian-Like

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** strong large-finite-width evidence and continuum localization mechanism; uniform infinite-volume theorem remains open

> **Discrete-tail refinement:** the exact lattice recurrence predicts an
> ultimate factorial/transfer-product tail. The Gaussian fit below describes the
> measured finite/intermediate regime, not a proved lattice asymptotic. See
> [The exact discrete linear-mass recurrence predicts a factorial tail beyond the finite Gaussian fit](407_the_exact_discrete_linear_mass_recurrence_predicts_a_factorial_tail_beyond_the_finite_gaussian_fit.md).

## 1. The possible failure

The rank-two crossing projector is useful only if the next singular pair remains
separated as the transverse boundary recedes. Data through \(M=4\) left open
the possibility that this isolation gap was slowly collapsing.

The calculation has now been extended through \(M=6\).

## 2. Root convergence

At fixed \(L=2\), the localized defect root is

| \(M\) | root |
|---:|---:|
| 4 | 1.26646484 |
| 5 | 1.26644824 |
| 6 | 1.26644824 |

The displayed \(M=5,6\) bisection values coincide, and the full spread across
\(M=4,5,6\) is below \(2\times10^{-5}\).

## 3. Next-pair isolation stabilizes

The singular value of the next pair at the root is approximately

| \(M\) | next singular value |
|---:|---:|
| 4 | 0.02210 |
| 5 | 0.02200 |
| 6 | 0.02164 |

The decrease from \(M=4\) to \(M=6\) is small compared with the earlier
\(M=2,3\) transient. All three large-width values remain above \(0.021\).

This is evidence for a nonzero limiting Riesz separation, not yet a proof of
one.

## 4. Edge leakage becomes negligible

Outer-edge weight is

| \(M\) | outer-edge weight |
|---:|---:|
| 4 | \(2.13\times10^{-3}\) |
| 5 | \(1.83\times10^{-4}\) |
| 6 | \(1.23\times10^{-5}\) |

Each additional shell reduces leakage by more than an order of magnitude in
this range. Effective support remains approximately \(10.96\) sites.

At \(M=6\), the radial shell weights are approximately

\[
0.52179, 0.37135, 0.08727, 0.01734,
0.002064, 0.000180, 0.0000123.
\]

## 5. Gaussian-like rather than purely exponential tail

For shells \(\rho=2,\ldots,6\), a linear fit of \(\log w_\rho\) against
\(\rho^2\) gives

\[
\log w_\rho\approx a-0.27665\rho^2,
\qquad R^2\approx0.99692.
\]

On the same shells, a pure exponential fit against \(\rho\) has
\(R^2\approx0.99130\). The Gaussian-like fit is better, although the sample is
too short to claim an asymptotic law from regression alone.

## 6. Continuum mechanism

The transverse continuum operator has the schematic form

\[
H_y=-i\alpha_y\partial_y+\mu y\,\beta_2,
\qquad
\{\alpha_y,\beta_2\}=0.
\]

Let

\[
K=i\alpha_y\beta_2,
\qquad K^2=1.
\]

In the \(K=+1\) eigenspace, the zero-mode equation reduces to

\[
\partial_y\psi=-\mu y\psi,
\]

with normalizable solution

\[
\boxed{\psi(y)\propto e^{-\mu y^2/2}.}
\]

Its density is Gaussian. The finite lattice includes Wilson, selector and
circumference mixing, so the fitted coefficient need not equal the bare
continuum \(\mu\). The continuum calculation explains the qualitative form,
not the measured numerical exponent.

## 7. Consequence for the Riesz-projector branch

The three main finite-volume requirements now point in the same direction:

- the root converges;
- the next-pair gap appears to stabilize;
- leakage decays faster than a simple fixed-ratio exponential over the measured
  shells.

This makes an infinite localized rank-two projector plausible and supplies a
continuum mechanism for its transverse confinement.

## 8. What is still missing

No finite set of widths proves a uniform bound. A rigorous result would require
one of:

- a transfer-matrix or discrete-Agmon estimate;
- a comparison theorem with the continuum harmonic-oscillator operator;
- resolvent bounds uniform in \(M\);
- an analytic lower bound on the next radial excitation.

The circumference limit must also be controlled independently.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** derive a discrete Gaussian/Agmon bound and a
positive volume-independent next-pair gap for the regulated half-line operator,
then identify its crossing flow with the Pin mod-two event index.

**Gap falsifier:** the next singular value resumes systematic decay below every
positive bound at larger \(M\).

**Tail falsifier:** shell weights cease to decay or become boundary dominated at
larger width.

**Fit falsifier:** describe the five-point Gaussian regression as an asymptotic
proof.

**Continuum falsifier:** equate the fitted coefficient \(0.27665\) with the bare
\(\mu=0.7\) without deriving lattice renormalization.

## 10. Pinned dependency and continuation

Pin the uniform theorem, but the numerical transverse-width branch is close to
saturation. The next high-value route is analytic: derive the discrete radial
recurrence in the exact half-line basis and seek an Agmon or transfer-product
bound.

## 11. Certificate

The [large-width projector certificate](scripts/verify_crossing_projector_gap_stabilizes_and_tail_is_gaussian_like.mjs)
checks the \(M=6\) projector, reported large-width root/gap/leakage sequence and
Gaussian-versus-exponential tail fits.

## Companion documents

- [Finite isolated crossing projector](405_the_localized_crossing_projector_is_spectrally_isolated_on_the_path_and_its_edge_leakage_decays_rapidly.md)
- [Exact block-Jacobi half-line](402_each_pin_glide_sector_is_exactly_a_block_jacobi_half_line_with_a_doubled_positive_radius_fiber.md)
- [Localized crossing ledger](404_the_localized_crossing_ledger_retains_defect_parity_when_a_reference_edge_event_cancels_the_global_sign.md)
