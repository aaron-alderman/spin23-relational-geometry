# Frontier Wave 7.97: Microwave Drift and Dynamic-Range Frontier

**Date:** 25 October 2026  
**Status:** post-calibration drift envelope and measurement-range gate certified; static measured-mixer compilation remains open  
**Parent:** [discrete compiler decision](frontier_wave7_94_five_channel_discrete_compiler_decision.md)  
**Evidence:** [drift sweep](../../../../evidence/data/five-channel-microwave-drift-envelope-v1.json)  
**Generator:** [drift-envelope simulator](../../../../scripts/run-five-channel-microwave-drift-envelope.mjs)  
**Certificate:** [drift verifier](../../../../verification/verify/verify_five_channel_microwave_drift_envelope.mjs)

## Result

The eight-bit five-channel design has a nonempty post-calibration operating
window. Under a simultaneous independent uniform-drift model across every
mixer and phase plane, all 1,000 frozen trials remain within the (1.5\%)
shape-error allocation when the component-level drift bounds are

\[
\boxed{
|\delta\theta_{\rm coupler}|\le0.15^\circ,
\quad
|\delta\phi_{\rm state}|\le0.30^\circ,
\quad
|\delta A_{\rm state}|\le0.03\,\mathrm{dB}.
}
\]

At that conservative setting the median worst-target error is (1.041\%),
the 95th percentile is (1.207\%), and the largest of 1,000 trials is
(1.482\%). The next tested settings show where the statistical and absolute
boundaries separate:

| coupling drift | phase drift | amplitude drift | p95 shape error | maximum | result |
|---:|---:|---:|---:|---:|---|
| (0.15^\circ) | (0.30^\circ) | (0.030\,\mathrm{dB}) | 1.207% | 1.482% | all trials pass |
| (0.175^\circ) | (0.35^\circ) | (0.035\,\mathrm{dB}) | 1.418% | 1.636% | p95 passes; tail fails |
| (0.1875^\circ) | (0.375^\circ) | (0.0375\,\mathrm{dB}) | 1.520% | 1.791% | p95 fails |

The first row is therefore the preregistered operating envelope. The second
is not admitted merely because its 95th percentile passes: the corpus keeps
the tail visible.

## What was simulated

The calculation uses the frozen eight-bit phase words for

\[
H,\ R,\ RH,\ HR,\ S_+
\]

and perturbs all seven alternating nearest-neighbour mixer layers plus all 30
phase states. It measures global-complex-scale-invariant matrix-shape error.
This correctly removes common attenuation and common phase while retaining
differential amplitude, phase and mixing changes.

The perturbations represent **drift after calibration**. They do not represent
unknown fabrication offsets. Static fabrication error belongs inside the
measured (F(f)) used by the compiler and can in principle be compensated by
new phase words. This packet therefore closes environmental stability
requirements without pretending to close the full-wave layout.

## Dynamic-range requirement

The smallest required nonzero cross-channel amplitude in the scaled channel
is

\[
M_{\min}=\frac4{13}=0.307692,
\]

or (10.2377\,\mathrm{dB}) below the largest normalized path. With
(36\,\mathrm{dB}) phase-element loss and a required (20\,\mathrm{dB})
clearance above leakage and receiver floor, the usable calibrated dynamic
range must satisfy

\[
\boxed{
D_{\rm usable}
\ge66.2377\,\mathrm{dB}+L_{\rm ancillary},
}
\]

where (L_{\rm ancillary}) includes mixer, launch, cable and switch loss.
Examples are:

| ancillary loss | required usable range |
|---:|---:|
| 5 dB | 71.24 dB |
| 10 dB | 76.24 dB |
| 15 dB | 81.24 dB |

The practical design target is (85\,\mathrm{dB}) of verified usable range
at the DUT reference planes if ancillary loss is held below (15\,\mathrm{dB}).
Manufacturer headline dynamic range is not sufficient; the value must be
measured through the selected cables, switch states and terminations.

## Controls implied by the envelope

1. Place temperature sensors on the phase planes and fixed mixers.
2. Acquire a reference through before and after each matrix sweep.
3. Repeat a sentinel column; reject a sweep if the inferred state drift
   exceeds (0.30^\circ) or (0.03\,\mathrm{dB}).
4. Use a physical through to measure switch leakage and receiver floor at
   every analysis frequency.
5. Recompile after any cable reconnection or temperature excursion that
   violates the drift envelope.
6. Preserve common attenuation in the raw record even though the shape metric
   removes it during the target comparison.

## Interpretation

This closes a key feasibility question: the (36\,\mathrm{dB}) phase path
does not automatically kill the experiment. It converts the problem into a
quantified metrology requirement. If the assembled path supplies the required
dynamic range and remains inside the conservative drift box, the signed
transpose test retains its (1.70) branch margin.

Failure would still be useful. Insufficient dynamic range selects a lower-loss
matrix-specific network. Excess drift selects faster reference interleaving or
active thermal stabilization. Neither failure bears on (Spin(2,3)); both are
instrument boundaries.

## Remaining gate

The only pre-build mathematical gate now left is static (F(f)): obtain one
five-channel mixer from full-wave simulation or a single-layer breadboard,
insert its complete complex transfer matrix into the compiler, and rerun all
five targets over the analysis band. That calculation decides whether the
universal eight-bit architecture survives realistic layout physics.

