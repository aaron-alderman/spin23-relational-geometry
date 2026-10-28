# A Node-only four-mode virtual instrument closes the software gate

**Date:** 28 October 2026

**Status:** deterministic full-model virtual experiment and independent replay certificate; real-time I/O and hardware remain external

**Parents:** [finite adiabatic window and active emulator packet](admissibility_160_the_adiabatic_window_is_finite_and_the_first_device_should_be_an_active_metered_emulator.md), [detuned fourth-mode generator](admissibility_159_a_detuned_fourth_mode_generates_the_dark_channel_but_low_frequency_coherence_is_the_hard_gate.md)

**Executable:** [Node-only simulator](../../../scripts/run-trifilar-four-mode-virtual-emulator.mjs); [configuration](../../../evidence/data/admissibility-trifilar-virtual-emulator-config-v1.json); [recorded 24-run result](../../../evidence/data/admissibility-trifilar-virtual-emulator-result-v1.json); [independent replay verifier](../../../verification/admissibility/verify_trifilar_four_mode_virtual_emulator.mjs)

## Result

No specialist software is required to run the first complete virtual
experiment. The repository now contains a dependency-free Node.js instrument
for the full four-mode system:

\[
i\dot a
=\left(H(t)-\frac{i}{2}\Gamma\right)a,
\]

where \(H(t)\) contains three primary modes, one detuned bus, the moving signed
coupling vector, primary detunings and direct parasitic couplings. A
fixed-step fourth-order Runge–Kutta integrator evolves both independent dark
inputs simultaneously.

Run:

~~~powershell
node scripts/run-trifilar-four-mode-virtual-emulator.mjs --write
node verification/admissibility/verify_trifilar_four_mode_virtual_emulator.mjs
~~~

The first command writes a deterministic 24-run record. The second independently
replays every run from the saved configuration, verifies the configuration
digest and checks the matrix, population and control-work records.

## What is measured

Each run retains:

- the complete complex \(2\times2\) return matrix;
- its common phase, returned angle and two singular values;
- raw and survival-conditioned target overlap;
- final dark, bright and bus populations;
- dissipated norm and population-ledger residual;
- the rotating-frame parameter-work integral;
- duration, integration step count, loop direction and rate.

This is the same record contract required of the eventual hardware. The
simulator does not reduce the output to one amplitude or one angle.

## The 24-run design

Two scenarios are crossed with four rates and three controls:

| dimension | levels |
| --- | --- |
| model | ideal; declared metered nonideal |
| gap/loop-rate \(r\) | 4, 8, 16, 32 |
| path | forward; reverse; fixed |

The metered model declares primary detunings, direct primary coupling,
slightly unequal primary damping and a separately damped bus. These values
are configuration inputs, not fitted to the result.

## Ideal full-bus ladder

| \(r\) | returned angle | bright population | bus population | control work |
| ---: | ---: | ---: | ---: | ---: |
| 4 | \(-92.426^\circ\) | 0.03226 | 0.001274 | 0.05161 |
| 8 | \(-90.553^\circ\) | 0.006889 | 0.000266 | 0.01101 |
| 16 | \(-90.135^\circ\) | 0.001625 | 0.000061 | 0.002592 |
| 32 | \(-90.033^\circ\) | 0.000399 | 0.000016 | 0.000637 |

The fourth mode refines the eliminated-bus approximation without changing its
conclusion. Bright and bus leakage fall with the loop rate, the angle
converges to the quarter-turn, total norm is conserved to numerical precision
and forward/reverse angles are antisymmetric.

## The finite optimum appears directly

| \(r\) | raw target overlap | bright population | dissipated norm |
| ---: | ---: | ---: | ---: |
| 4 | 0.974814 | 0.031983 | 0.008035 |
| 8 | **0.987749** | 0.006774 | 0.015930 |
| 16 | 0.983122 | 0.001570 | 0.031568 |
| 32 | 0.968219 | 0.000373 | 0.062121 |

The raw record peaks at \(r=8\). Slower loops continue to suppress bright
leakage, but their accumulated loss reduces the unnormalized return. This is
the finite-window prediction of AZ-160 appearing in the full dynamical model,
not merely in a heuristic objective.

At \(r=8\), the metered forward result is:

\[
\begin{aligned}
\theta_{\mathrm{return}}&=-90.552^\circ,\\
\text{raw overlap}&=0.987749,\\
\sigma_{\max}/\sigma_{\min}&=1.006896,\\
p_{\mathrm{bright}}&=0.006774,\\
p_{\mathrm{dissipated}}&=0.015930.
\end{aligned}
\]

## Negative controls

The ideal fixed-path runs return identity, zero bright population, zero bus
population and zero controller work at every duration. The metered fixed-path
runs acquire the declared dissipation but retain zero controller work and
essentially zero returned angle. Thus duration alone does not create the
quarter-turn.

Forward and reverse moving paths return opposite angles with matched
populations. That comparison is preserved as a matrix equality check rather
than a visual plot.

## Energy-ledger boundary

The simulator records three related but non-equivalent quantities:

1. **population loss** from the non-Hermitian damping term;
2. **bright and bus occupation** from coherent nonadiabatic transfer;
3. **parameter work** from
   \(\int a^\dagger(\partial_tH)a\,dt\).

The parameter-work value is a rotating-frame model record. It is not yet the
wall-plug energy of an op-amp, DSP or programmable coupler. Hardware must add
supply voltage, supply current, conversion efficiency and controller timing.

## What this software does not simulate

Version 1 is deterministic. It does not yet claim:

- real-time scheduling or guaranteed audio-interface latency;
- ADC/DAC quantization and clock jitter;
- stochastic amplifier or detector noise;
- saturation, slew-rate limits or power-rail clipping;
- a particular op-amp schematic or PCB;
- electromagnetic transformer parasitics beyond the declared mode matrix.

Those are engineering extensions of the same configuration and record schema,
not missing conceptual physics.

## Hardware handoff

The virtual instrument can become a hardware controller without changing its
scientific contract:

1. replace the numerical derivative with measured state input and commanded
   coupling output;
2. retain the same forward, reverse and fixed schedules;
3. reconstruct the same complex return matrix;
4. add ADC/DAC, supply and timing channels to the ledger;
5. compare hardware records to the frozen 24-run model without
   direction-specific refitting.

The first practical architecture can be a desktop computer, a multichannel
audio interface and a four-state digital or analogue emulator. Custom
transformers and RF solvers are unnecessary for this gate.

## Verdict

The software question is closed. A stock Node.js runtime can execute and
replay the complete mathematical experiment, and the declared nonideal model
selects a finite optimum at \(r=8\). What remains is real-time implementation,
I/O calibration and hardware evidence—not specialist simulation software and
not another geometric analogy.

The software-side successor is [AZ-162: the hardware-ready acquisition packet
exhausts the nonphysical branch](admissibility_162_the_hardware_ready_acquisition_packet_exhausts_the_nonphysical_branch.md).
