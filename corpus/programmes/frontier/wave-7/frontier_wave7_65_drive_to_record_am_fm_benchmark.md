# Frontier Wave 7.65: Drive-to-Record AM/FM Benchmark

**Date:** 25 October 2026  
**Status:** exact small-index LTI benchmark and detector no-go; nonlinear extensions remain open  
**Ledger:** [drive-to-record benchmark](drive_to_record_am_fm_benchmark_v1.json)  
**Certificate:** [benchmark verifier](../../../../verification/verify/verify_drive_to_record_am_fm_benchmark.mjs)

## Result

The minimum record that distinguishes amplitude modulation from
frequency/phase modulation is not a resonance peak, total sideband power or
ringdown. It is a coherently clocked carrier plus both complex sidebands,
together with an independently calibrated transfer at all three frequencies.

In the small-index three-line model, write

\[
x_0=1,
\qquad
x_-={m-\beta\over2},
\qquad
x_+={m+\beta\over2}.
\]

Here \(m\) is the AM depth and \(\beta\) is the FM/phase-modulation index.
Pure AM has equal sideband signs; pure FM has opposite signs.

## 1. Detector folding

Let

\[
F_n=H(\omega_n)D(\omega_n)
\]

be the combined causal oscillator and detector transfer at the carrier and
sidebands. The measured complex record is \(y_n=F_nx_n\), up to calibrated
noise. Arbitrary gain and phase rotation at each frequency do not destroy the
distinction if \(F_n\) is known independently.

A shift of clock origin sends \(y_n\mapsto e^{i\omega_nt_0}y_n\). Since
\(\omega_++\omega_-=2\omega_0\), the calibrated product

\[
K=
{y_+y_-/y_0^2\over F_+F_-/F_0^2}
=x_+x_-
={m^2-\beta^2\over4}
\]

is clock-origin invariant. Its sign distinguishes pure AM from pure FM.

The complete record does more than classify:

\[
\widehat m={x_+\over x_0}+{x_-\over x_0},
\qquad
\widehat\beta={x_+\over x_0}-{x_-\over x_0}.
\]

Thus mixed AM/FM is reconstructed rather than forced into a binary label.

## 2. Exact detector no-go

Equal-index pure AM and FM have identical carrier and sideband powers after
every linear time-invariant oscillator and detector fold. A power-only record
therefore cannot distinguish them. The same loss occurs if either sideband is
outside the detector bandwidth.

A carrier plus only one complex sideband is also insufficient without an
independent sideband phase convention: clock origin can absorb the sign.
Post-drive ringdown identifies the common oscillator pole and damping, but
after a matched final state it contains no modulation-class label.

These are detector quotients, not failures of the underlying drive to differ.

## 3. Held-out sweep

The certificate tests 972 mixed-modulation cases over four carrier
frequencies, three modulation frequencies, three detector cutoffs, three AM
depths, three FM indices and three clock offsets. No response parameter is fit
from the class labels. With independently supplied complex transfer data, the
AM and FM parameters are recovered with the declared noise; the product sign
classifies all cases away from the deliberately unresolved \(m^2\approx
\beta^2\) boundary.

The intensity-only control remains exactly identical for matched pure AM and
FM before noise. This is the benchmark's decisive negative control.

## 4. What this changes

OT-043 closes for the declared small-index LTI family. Its record bundle is
now the nuisance baseline for OT-044: a proposed long-root/short-root scar in
a \(G_2\) response model must survive coherent three-line reconstruction and
must not be reproducible by ordinary AM/FM phase, damping, bandwidth or gain
freedom.

The benchmark also corrects a common experimental shortcut. Ringdown is
valuable for calibrating poles and damping, but it does not replace the
phase-sensitive drive record when the question is how the system was
modulated.

## Boundary

The theorem is scoped to first-order AM/FM sidebands and a calibrated linear
time-invariant response. Large-index Bessel ladders, nonlinear mixing,
time-varying media, intra-record clock drift, metastable switching and true
hysteresis remain separate models. They may require more records; they cannot
invalidate the exact power-only no-go inside this declared family.
