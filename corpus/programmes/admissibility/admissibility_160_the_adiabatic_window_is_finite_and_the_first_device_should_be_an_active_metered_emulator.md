# The adiabatic window is finite, and the first device should be an active metered emulator

**Date:** 28 October 2026

**Status:** quantitative tolerance window and frozen experimental decision rule; fabrication and measurement remain external

**Parents:** [detuned fourth-mode generator](admissibility_159_a_detuned_fourth_mode_generates_the_dark_channel_but_low_frequency_coherence_is_the_hard_gate.md), [finite projector ladder](admissibility_158_four_cells_calibrate_but_a_finite_projector_ladder_pays_for_the_quarter_turn.md), [passive loss](admissibility_153_passive_loss_requires_a_bath_ledger_and_can_destroy_the_holonomy_gap.md), [robustness window](admissibility_27_robustness_window_for_projective_return_coherent_holonomy_and_selection.md)

**Evidence:** [tolerance-window ledger](../../../evidence/data/admissibility-trifilar-tolerance-window-v1.json); [independent verifier](../../../verification/admissibility/verify_trifilar_tolerance_window.mjs)

## Result

The experiment does not improve monotonically as it is made slower.

Let

\[
r=\frac{\Delta}{\Omega}
\]

be the bright-dark gap divided by the loop rate. Nonadiabatic bright leakage
falls approximately as \(A/r^2\) in the verified fixture, with
\(A\approx0.44\). But a traceless dark-doublet splitting
\(\delta_{\mathrm d}\) accumulates an unwanted internal evolution of order

\[
\theta_{\mathrm{split}}
\lesssim \delta_{\mathrm d}T
=2\pi r\frac{\delta_{\mathrm d}}{\Delta}.
\]

Mean loss and damping anisotropy also accumulate over the loop duration
\(T=2\pi r/\Delta\). The admissible rate is therefore a window:

\[
\boxed{
\text{fast enough to outrun splitting and loss}
\quad\cap\quad
\text{slow enough to suppress bright leakage}.}
\]

For the AZ-159 fixture, a one-degree coherent-error allowance and a maximum
1.01 ratio between the returned dark singular values give:

| quantity | \(r=8\) | \(r=32\) |
| --- | ---: | ---: |
| loop duration | 32.63 s | 130.50 s |
| maximum traceless splitting / gap | \(3.47\times10^{-4}\) | \(8.68\times10^{-5}\) |
| maximum splitting | \(8.51\times10^{-5}\) Hz | \(2.13\times10^{-5}\) Hz |
| maximum damping anisotropy / gap | \(1.98\times10^{-4}\) | \(4.95\times10^{-5}\) |
| minimum \(Q\) for 90% mean amplitude | 15,483 | 61,932 |
| finite-rate leakage proxy | 0.00688 | 0.000430 |

The ratio-32 loop is geometrically cleaner but materially more fragile. With
the present low-frequency fixture, \(r=8\) is the more credible starting
point.

## One nuisance matrix, not a list of excuses

The fitted generator must be written as

\[
H_{\mathrm{meas}}(t)
=\Delta n(t)n(t)^T
+\delta H_{\mathrm{dark}}(t)
+H_{\mathrm{direct}}(t)
-\frac{i}{2}\Gamma(t),
\]

with the eliminated bus or full four-mode model retained as required by the
data. The nuisance terms have different signatures:

| channel | principal record | reversal behaviour |
| --- | --- | --- |
| finite-rate leakage | final bright population; rate dependence | decreases when loop is slowed |
| dark splitting | coherent phase/shear inside dark plane | generally does not reverse geometrically |
| mean bath loss | absolute survival | same sign in both directions |
| damping anisotropy | unequal singular values; preferred dark direction | tied to device axes |
| bus error | fourth pole and bus residue | follows detuning and coupling |
| controller error | work, latency, noise sidebands | follows the drive protocol |

Every term must enter one frozen return calculation. Subtracting a separate
best-fit background from each loop direction would erase the test.

## The balancing heuristic

For design only, combine the verified leakage proxy with a coherent splitting
proxy:

\[
E(r)\approx\frac{A}{r^2}+2\pi\eta r,
\qquad
\eta=\frac{\delta_{\mathrm d}}{\Delta}.
\]

Its stationary point is

\[
r_*=\left(\frac{A}{\pi\eta}\right)^{1/3}.
\]

This is not a rigorous error bound, because leakage and coherent rotation are
different records. It is a useful warning against choosing \(r\) from
adiabaticity alone:

| measured splitting fraction \(\eta\) | heuristic \(r_*\) |
| ---: | ---: |
| \(10^{-3}\) | about 5.2 |
| \(10^{-4}\) | about 11.2 |
| \(10^{-5}\) | about 24.1 |

Only a device with dark splitting at a few parts in \(10^6\) of the gap
benefits from pushing the present balance toward \(r=32\).

## Component and calibration packet

The first device is an active four-mode emulator because it permits trimming
the quantities that a passive low-frequency network cannot naturally hold
stable. It still has a concrete circuit contract:

1. three primary resonant state variables with independently adjustable
   frequency and damping;
2. one detuned bus state;
3. three signed reciprocal coupling channels implementing \(g n_i(\phi)\);
4. coherent two-quadrature injection into each primary;
5. coherent two-quadrature readout of all primaries and the bus;
6. supply-voltage, supply-current and controller-timing records;
7. a hard bypass state in which all programmed couplings are zero.

An op-amp, transconductance or digital state-space implementation is allowed,
but its active nature is part of the claim label. The emulator demonstrates
the matrix-valued dynamics; it does not demonstrate passive fundamental
physics.

## Frozen measurement sequence

### Calibration

1. Fit the uncoupled frequencies, damping rates and detector transfer
   functions.
2. Turn on one bus coupling at a time and determine its signed magnitude from
   the full complex response.
3. Fit all four poles and matrix residues with all couplings on.
4. Reconstruct \(n(\phi)\), the dark projector, gap, bus participation,
   splitting and damping anisotropy at every frozen control point.

### Predictive loop

1. Freeze one global four-mode nuisance model from the calibration data.
2. Predict \(r=4,8,16,32\) in both directions before running them.
3. Inject both independent dark basis inputs and retain the full complex
   \(2\times2\) return.
4. Record final bright population, absolute survival, both singular values,
   controller work and noise sidebands.
5. Apply no direction-specific refit.

### Negative controls

- hold \(n\) fixed for the same duration;
- traverse the path forward and immediately backward;
- break the dark degeneracy deliberately by a known amount;
- make damping anisotropy deliberately large;
- detune the bus while preserving nominal programmed \(n\);
- run the controller with the resonators disconnected.

## Decision table

| outcome | disposition |
| --- | --- |
| rate ladder matches one frozen four-mode model | controlled classical holonomy emulator |
| angle improves but absolute survival fails | coherence gate; raise frequency or use active compensation |
| return follows dark splitting rather than path orientation | ordinary dynamical phase |
| unequal singular values track damping axes | non-Hermitian selection, not geometric return |
| residual tracks controller power or latency | active-system artefact |
| replicated matrix residual survives all ledgers | missing coupling candidate; only then widen the physics frontier |

## What remains external

The corpus can close the design calculation but cannot fabricate the circuit,
measure its poles or establish its stability. Those are now the only
meaningful continuation of this branch. Further algebraic elaboration without
a device record would mostly move the same boundary labels around.

## Verdict

The trifilar investigation has reached an executable stopping point. The
bare braid supplies a fixed-plane permutation, not holonomy. A moving
projector supplies the geometry; a transformer or detuned bus supplies the
matrix; the four-mode generator supplies dynamics; and the tolerance window
selects a finite loop rate. The next object is not another analogy. It is a
four-mode emulator, its matrix response and its complete energy/noise ledger.
