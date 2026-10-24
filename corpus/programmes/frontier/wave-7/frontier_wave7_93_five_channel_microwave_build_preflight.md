# Frontier Wave 7.93: Five-Channel Microwave Build Preflight

**Date:** 25 October 2026  
**Status:** topology, bill of materials and error budget frozen; discrete five-channel compilation remains the purchase gate  
**Parent:** [five-channel carrier selection](frontier_wave7_87_five_channel_microwave_carrier_selection.md)  
**Ledger:** [build-preflight record](five_channel_microwave_build_preflight_v1.json)  
**Certificate:** [build-preflight verifier](../../../../verification/verify/verify_five_channel_microwave_build_preflight.mjs)

## Result

The five-channel reciprocal test is bench-buildable, but not honestly as a
nearly lossless universal processor using the demonstrated commercial phase
shifter. The correct first build is a calibrated lossy reciprocal emulator.
Its decisive observable is the signed equality between forward and reverse
complex transfer matrices, not raw throughput or normalized output power.

The direct extrapolation of the demonstrated interlaced architecture is

\[
U(\Phi)=F P^{(6)}F\cdots F P^{(1)}F,
\qquad U\in U(5).
\]

It uses six active phase layers, seven copies of a characterized fixed mixer
(F), and five phase elements per active layer:

\[
N_{\rm phase}=5(5+1)=30.
\]

The count is an extrapolation of the reported (N=4,M=N+1) architecture. It
is not evidence that this particular five-channel hardware has already been
compiled. That claim is reserved for the digital pre-build gate below.

## Minimum bill of materials

### Device under test

| item | count | function | admission requirement |
|---|---:|---|---|
| characterized five-channel mixing layer (F) | 7 | fixed coherent mixing between phase planes | measure its complete complex transfer before assembly |
| 6-bit (360^\circ) digital phase element | 30 | five phases in each of six planes | state-resolved amplitude and phase calibration, not nominal bits |
| controlled-impedance RF board or modular coax backplane | 1 | common reciprocal carrier | equal path depth, thermal monitoring and accessible calibration planes |
| RF connectors or launches | 10 | five input and five output ports | repeatable torque and port-orientation labels |
| serial control system | 1 | deterministic phase-word loading | readback, timestamps and frozen configuration hashes |
| shielded enclosure and temperature probes | 1 | drift control | temperature included in every calibration record |

### Metrology

| item | count | function | admission requirement |
|---|---:|---|---|
| coherent vector network analyser | 1 | complex forward/reverse transfer | at least four coherent measurement paths, or a validated reduced-port schedule |
| absorptive input switch matrix | 1 | VNA-to-five-input routing | inactive ports remain matched |
| absorptive output switch matrix | 1 | five-output-to-VNA routing | independently calibrated in both directions |
| precision (50\,\Omega) terminations | at least 6 active per reduced-port sweep | close all unused DUT ports | return loss retained in the uncertainty record |
| phase-stable cables | one complete set | preserve switch-state calibration | cable reversal and reconnection controls |
| through/reflect/line or electronic calibration standards | one set | move reference planes to DUT launches | calibration residual measured on withheld throughs |
| independent reference through-path | 1 | preserve global sign across settings | acquired alongside every matrix sweep |
| matched attenuator set | 1 | loss-matched nulls | known complex transfer, measured rather than assumed |

The switch architecture follows the published four-channel experiment, which
used a four-port VNA and two (2\times4) RF switch arrays to recover the
eight-port input/output device. The five-channel version needs two
(2\times5) or larger absorptive arrays and ten DUT launches.

## Loss is the first engineering constraint

The phase element used by the published experiment is the MACOM
MAPS-010163 family. Its official specification gives a (5.6^\circ) step,
approximately (3^\circ) RMS phase error and about (5\,\mathrm{dB})
insertion loss for the packaged part near the relevant band. Six serial phase
planes therefore imply approximately

\[
L_{\rm phase}\simeq30\,\mathrm{dB}
\]

before fixed-layer, launch, cable and switch loss. This is not a small
perturbation of the ideal orthogonal dilation.

Common loss does not erase the reciprocity sign: if the measured forward
map is (aM), a reciprocal reverse record is (aM^T) in the same de-embedded
basis. But high loss makes leakage, switch isolation and receiver noise much
more dangerous. Therefore:

- never infer reciprocity from separately normalized output powers;
- retain the unnormalized complex matrices and reference-through record;
- require every nominally zero element to be reported with its noise and
  leakage floor;
- reject any frequency whose weakest required nonzero element has less than
  (20\,\mathrm{dB}) clearance over the measured leakage floor;
- do not insert gain inside the reciprocal core during the first tranche.

An external post-amplifier may improve receiver noise only if it is included
after the reversal plane and separately calibrated. Distributed gain would
change the object under test.

## Discrete compilation gate

The (5.625^\circ) phase quantum has a half-step uncertainty of

\[
\delta_{1/2}=2.8125^\circ=0.04909\ \mathrm{rad}.
\]

Across six phase planes, a naive coherent worst-case bound is (0.2945), far
too large to use as the experimental tolerance. The 2025 four-channel
experiment instead reoptimized over the discrete phase states and reduced
its mean numerical reconstruction error from (6.41\%) to (2.97\%), with
about (0.2\%) normalized experimental error at its calibrated (2.1\,\mathrm{GHz})
settings. Those figures are precedent, not a five-channel guarantee.

Before purchasing the repeated core, one measured or full-wave model of
(F) must compile all three target families using the actual 6-bit alphabet:

1. (H_2\oplus H_3);
2. (R_2\oplus R_3), plus held-out (RH) and (HR);
3. the symmetric orthogonal dilation (S_+).

Every target must achieve normalized Frobenius error at most (0.03) at the
design frequency and at most (0.05) over the preregistered analysis band.
Failure triggers higher-resolution phase control, an extra phase plane or a
matrix-specific low-loss network. It does not trigger a relaxed physics
threshold.

## Error budget for the signed branch

For de-embedded estimates (widehat F) and (widehat B), define directional
errors relative to the programmed cross block (M):

\[
\eta_F=\frac{\|\widehat F-M\|_F}{\|M\|_F},
\qquad
\eta_B=\frac{\|\widehat B-M^T\|_F}{\|M\|_F}.
\]

The frozen per-direction allocation is:

| source | normalized allowance |
|---|---:|
| discrete compilation residual | 0.030 |
| state-dependent amplitude imbalance after calibration | 0.015 |
| switch, cable and reference-plane de-embedding | 0.010 |
| thermal and temporal phase drift | 0.010 |
| receiver noise and leakage | 0.005 |
| unallocated contingency | 0.005 |
| **total per direction** | **0.075** |

Thus

\[
\epsilon=\eta_F+\eta_B\le0.15.
\]

Triangle inequalities give

\[
r_+\le\epsilon,
\qquad
r_-\ge2-\epsilon,
\qquad
r_--r_+\ge2-2\epsilon=1.70.
\]

The branch separation is therefore not statistics-limited under the frozen
budget. The experiment is calibration-limited: a lost or drifting global
(\pi) reference can interchange the hypotheses while leaving every power
record unchanged.

## Measurement schedule

At each frequency and for each programmed word:

1. acquire the reference through;
2. excite each input with all other input and output ports matched;
3. record all five complex outputs;
4. reverse the DUT orientation or the calibrated source/receiver routing;
5. reacquire the reference through;
6. repeat one sentinel column to estimate within-cycle drift;
7. store raw switch state, phase words, temperature and calibration ID.

Run (H) first. Only after its sector traces, determinants and order residuals
pass should (R), held-out words and (S_+) be compiled. A failed order-two
gate prevents a sophisticated channel fit from masking the wrong endpoint
representation.

## Decision table

| result | decision |
|---|---|
| digital compiler misses 3% at the centre frequency | do not fabricate the repeated core |
| required element lacks 20 dB leakage clearance | improve switching/dynamic range or narrow the band |
| (H) misses its sector fingerprints | reject this common-carrier implementation |
| (H,R) pass but (S_+) is not reciprocal | debug de-embedding, reflections and active leakage; make no real-form claim |
| all gates pass inside the 7.5% directional budgets | promote the reciprocal emulator; begin independent photonic replication |
| minus branch survives reference, cable and reversal controls | escalate to a bias-reversed source-native Onsager experiment |

## Literature and specification anchors

Keshavarz et al., [*Programmable circuits for analog matrix
computations*](https://pmc.ncbi.nlm.nih.gov/articles/PMC12475000/) (2025),
supply the interlaced architecture, the (M=N+1) four-channel result, 6-bit
phase optimization, switch-matrix VNA method and reported reconstruction
errors. Their fifth channel is not demonstrated and remains this packet's
compiler gate.

The [MACOM MAPS-010163 product specification](https://www.macom.com/products/product-detail/MAPS-010163-DIE)
supplies the component-level phase resolution, loss and phase-error anchors.
The part number is a feasibility reference, not a procurement mandate.

Keysight's [multiport calibrated measurement procedure](https://helpfiles.keysight.com/csg/pxivna/Applications/Multiport_Calibrated_Measurements/Sample_Measurement_Procedure.htm)
provides a current manufacturer implementation of VNA plus switch-matrix
multiport acquisition. An equivalent independently calibrated system is
admissible.

## Boundary

This packet closes the conceptual BOM and algebraic error budget. It does not
authorize procurement. The next irreversible step is conditioned on a
discrete five-channel compilation using a measured or full-wave (F), a
complete loss/link budget and a quoted switch-isolation floor. Passing that
gate makes the microwave emulator build-ready; it still leaves source-native
Onsager parity as the physics frontier.

