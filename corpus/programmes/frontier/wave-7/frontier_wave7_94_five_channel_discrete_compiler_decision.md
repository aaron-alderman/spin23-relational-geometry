# Frontier Wave 7.94: Five-Channel Discrete Compiler Decision

**Date:** 25 October 2026  
**Status:** ideal-mixer compiler gate resolved; 6-bit build rejected and 8-bit route admitted to measured-mixer simulation  
**Parent:** [microwave build preflight](frontier_wave7_93_five_channel_microwave_build_preflight.md)  
**Ledger:** [compiler decision](five_channel_microwave_compile_decision_v1.json)  
**Generator:** [ideal compiler](../../../../scripts/run-five-channel-microwave-ideal-compile.mjs)  
**Certificate:** [compiler verifier](../../../../verification/verify/verify_five_channel_microwave_discrete_compile.mjs)

## Result

The five-channel interlaced topology is expressive enough, but the published
six-bit control alphabet is not accurate enough for the frozen corpus gate.
The minimal practical correction is higher phase resolution, not another
mixing plane.

Using the ideal alternating nearest-neighbour (3\,\mathrm{dB}) mixer, the
deterministic compiler optimized all 30 phases continuously, then rounded and
reoptimized every coordinate over its full digital alphabet. The objective is
the global-phase-invariant normalized Frobenius error

\[
e(T,U)=\sqrt{2-2\frac{|\operatorname{Tr}(T^\dagger U)|}{5}}.
\]

The targets were the order-two and order-three selector operations, both
held-out words, and the reciprocal passive dilation:

\[
\{H,R,RH,HR,S_+\}.
\]

## Comparative result

| architecture | (H) | (R) | (RH) | (HR) | (S_+) | worst | 3% gate |
|---|---:|---:|---:|---:|---:|---:|---|
| 6 layers, 6 bit | 4.638% | 4.611% | 4.092% | 4.092% | 3.531% | 4.638% | fail |
| 6 layers, 7 bit | 1.839% | 1.937% | 2.105% | 1.769% | 2.505% | 2.505% | pass |
| 7 layers, 6 bit | 4.168% | 3.814% | 3.583% | 4.085% | 4.425% | 4.425% | fail |
| 6 layers, 8 bit | 0.909% | 1.096% | 0.933% | 0.968% | 0.981% | 1.096% | pass |

Continuous optimization reaches errors below (0.43\%) for every six-layer
target and approximately machine precision for four of them. With seven
six-bit layers it reaches machine precision for all five. The discrete
failure is therefore not evidence that the topology lacks the target
matrices. It is a phase-alphabet obstruction under this deterministic
compiler.

Adding a seventh six-bit plane does not rescue the tested architecture. That
is a finite negative result, not a theorem about every possible six-bit
network or optimizer. It is sufficient for the engineering decision because
the simpler resolution increase passes with large margin.

## Hardware consequence

A seven-bit mathematical alphabet is enough, but the current component
search did not identify a matching narrow-band (2\,\mathrm{GHz}) seven-bit
part. The available reference is the pSemi PE44820 eight-bit phase shifter:

- (1.7\)--(2.2\,\mathrm{GHz}) nominal band;
- (1.4^\circ) digital step;
- approximately (1^\circ) RMS phase error;
- approximately (0.1\,\mathrm{dB}) RMS amplitude error;
- approximately (6\,\mathrm{dB}) insertion loss.

The resolution and state accuracy are substantially better than the six-bit
anchor, but six serial phase planes now imply roughly

\[
6\times6\,\mathrm{dB}=36\,\mathrm{dB}
\]

of phase-element path loss before the mixer and metrology chain. The eight-bit
route is therefore selected for the measured-mixer simulation, not yet for
purchase. Its improved differential accuracy is bought with another
(6\,\mathrm{dB}) of common loss.

## Updated error allocation

The ideal-mixer compile allowance can be tightened from (3\%) to (1.5\%):

| source | normalized allowance per direction |
|---|---:|
| discrete ideal-mixer compile | 0.015 |
| measured-mixer and layout departure | 0.015 |
| state-dependent amplitude imbalance | 0.010 |
| switch/cable/reference-plane de-embedding | 0.010 |
| drift | 0.010 |
| noise, leakage and contingency | 0.015 |
| **total** | **0.075** |

The overall signed-branch guarantee remains unchanged at (1.70). The new
compiler margin has been reassigned to the part of the problem that is still
unknown: measured mixer and layout departure.

## What is and is not closed

Closed:

- continuous five-channel reachability for the declared target set;
- failure of the tested six-layer six-bit compilation at the frozen 3% gate;
- failure of the tested extra-plane six-bit repair;
- passage of seven- and eight-bit alphabets for all targets;
- one current eight-bit component class overlapping the demonstrated
  processor's (2.1\,\mathrm{GHz}) operating point.

Open:

- the complete complex (F(f)) of one five-channel mixer layout;
- compilation against measured or full-wave (F(f)), rather than the ideal
  mixer;
- the 5% analysis-band gate;
- dynamic range after at least (36\,\mathrm{dB}) phase-path loss;
- switch leakage and thermal drift in the assembled ten-port device.

## Decision

Do not reproduce the four-channel six-bit control plane unchanged. Advance
an eight-bit, six-layer model to full-wave or single-layer breadboard
characterization. Do not order 30 phase elements until one characterized
(F(f)) passes all five matrices at the centre frequency and across the
preregistered band.

The [PE44820 official specification](https://www.psemi.com/products/rf-phase-amplitude-control/phase-shifters/pe44820/)
anchors the eight-bit option. Its existence makes the repair concrete, but
does not substitute for a layout-level loss and calibration model.

