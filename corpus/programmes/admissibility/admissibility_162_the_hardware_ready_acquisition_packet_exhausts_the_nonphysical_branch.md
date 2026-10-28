# The hardware-ready acquisition packet exhausts the nonphysical branch

## Claim

Everything that can presently be completed without physical equipment has now
been made executable. The four-mode return has been passed through a
deterministic acquisition model with channel calibration, finite resolution,
noise, sample-clock jitter, latency, saturation and slew limits. The packet
also freezes a raw-record schema, coherent-interface capabilities, admission
thresholds and stop conditions. What remains is physical evidence, not an
unspecified software or modelling task.

## Executable packet

- [acquisition runner](../../../scripts/run-trifilar-hardware-ready-acquisition.mjs)
- [frozen configuration](../../../evidence/data/admissibility-trifilar-hardware-ready-config-v1.json)
- [stress-test result](../../../evidence/data/admissibility-trifilar-hardware-ready-result-v1.json)
- [synthetic raw records](../../../evidence/data/admissibility-trifilar-hardware-ready-synthetic-raw-v1.csv)
- [stress figure](../../../evidence/figures/admissibility-trifilar-hardware-ready-stress-v1.svg)
- [acquisition verifier](../../../verification/admissibility/verify_trifilar_hardware_ready_acquisition.mjs)
- [capability handoff](../../../evidence/data/admissibility-trifilar-hardware-handoff-v1.json)
- [handoff verifier](../../../verification/admissibility/verify_trifilar_hardware_handoff.mjs)

Run:

```powershell
node scripts/run-trifilar-hardware-ready-acquisition.mjs --write
node verification/admissibility/verify_trifilar-hardware_ready_acquisition.mjs
node verification/admissibility/verify_trifilar_hardware_handoff.mjs
```

## Timing and detector contract

The carrier is placed at 1 kHz in a 48 kHz stream: 48 samples per carrier
cycle and five cycles in each 240-sample, 5 ms block. Four coherent inputs and
four coherent outputs carry the three primary coordinates and the bus. This is
an acquisition convention, not a claim that the physical geometry is an audio
wave.

Each raw row records stress case, trial, injected basis, output channel, and
the true, measured and calibration-corrected in-phase and quadrature
components. Two independent basis injections reconstruct the complex
dark-return matrix. A separate calibration
tone estimates the complex transfer of every channel; the same calibration
must predict both bases and both loop directions.

## Results

Under the calibrated baseline, the reconstructed matrix differs from the
frozen virtual source by 1.03 × 10⁻⁵, its returned-angle error is
−3.38 × 10⁻⁵ degrees and its trial-to-trial angular standard deviation is
8.70 × 10⁻⁴ degrees. Deliberately breaking the detector
contract separates the nuisance classes:

| stress | diagnostic result |
|---|---:|
| calibration omitted | relative error 1.36 × 10⁻² |
| ten-bit quantization | relative error 3.19 × 10⁻³ |
| high noise | angular standard deviation 4.11 × 10⁻² degrees |
| channel-latency drift | relative error 1.99 × 10⁻² |
| clipping and slew limiting | relative error 5.73 × 10⁻¹ |

These are not forecasts of a particular commercial interface. They are
deterministic fault signatures showing that the reconstruction does not hide
the principal detector failures behind one generic error bar.

## Capability-based first apparatus

No specialist solver or proprietary acquisition package is required. The
minimum apparatus is a computer running Node.js; a full-duplex interface with
at least four phase-coherent inputs and outputs on one clock; suitable level
protection, grounding or isolation; eight labelled short connections; and an
independent loopback path. Brands are deliberately not prescribed. The
scientific requirement is shared-clock complex reconstruction, not a purchase
list.

Before a device is attached, loopback must achieve relative matrix error below
10⁻³, absolute angle error below 0.01 degrees and at least 1,000 raw
rows. Stop on clipping, unresolved polarity or channel order, calibration that
does not generalize across basis injections, direction-specific refitting, a
resolved fixed-control rotation, or missing supply/timing/detector records.

## Physical boundary

The packet contains no measured voltage, current, impedance, supply power,
temperature or timing record from physical equipment. It therefore does not
show that a real four-mode circuit realizes the moving projector or its
holonomy. The next admissible step is ordered: coherent loopback, frozen
forward/reverse/fixed controls, then attachment of the metered emulator. Until
those records exist, the physical gate remains open.

## Verdict

The nonphysical branch is exhausted at the declared model resolution. The
source dynamics, acquisition distortions, calibration, reconstruction, stress
separation, raw schema, plots, interface capabilities, thresholds and stop
rules are all executable. Further numerical elaboration can improve an
engineering design, but cannot substitute for the first coherent loopback and
device record.
