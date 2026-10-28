# Lithium-niobate three-mode estimator and controller

## Design decision

The corpus's [three-mode lithium-niobate ring](../admissibility/admissibility_148_lithium_niobate_as_a_relational_physics_workbench.md)
is the right first embodiment of the completed control grammar. It already
supplies three resolved modes,
programmable pairwise coupling phases, heterodyne-capable readout, detuning,
loss, thermal drift and actuator limits. The control objective is deliberately
narrow:

> stabilize common detuning and optical operating point without feeding the
> orientation-odd closure observable back into the lock.

The experiment remains established photonic control unless a held-out residual
survives the complete conventional model.

## Local linear model

Around a calibrated operating point, collect the three complex modal
amplitudes into `a=(a1,a2,a3)`. In a rotating frame,

\[
\dot a=A(\Phi,\theta)a+B u+w,
\]

where the diagonal of `A` contains linewidths and detunings, off-diagonal
entries contain the calibrated electro-optic or quadratic couplings, `Phi` is
the closed-loop phase, and `theta` contains slow nuisance coordinates such as
common thermal detuning. Real and imaginary parts give an ordinary real
six-state model.

The detector model is

\[
y=C a+D u+v,
\]

with complex heterodyne quadratures retained. Intensity-only detection is
insufficient because it can erase loop orientation. `B` and `C` must include
the actual drive and port maps; nominal modal labels do not prove
controllability or observability.

## Identification tranche

Before closing feedback:

1. sweep each drive separately and fit one shared continuous-time
   `A,B,C,D` across both `+Phi` and `-Phi` configurations;
2. measure detector noise with the drives off and process noise from repeated
   open-loop trajectories to set initial `R` and `Q`;
3. retain the full matrix response so dark or weak modes cannot hide behind a
   scalar port;
4. calculate controllability and observability singular values, not rank alone;
5. choose a sampling rate above the identified bandwidth and verify the exact
   zero-order-hold model against held-out pulse responses;
6. freeze the nuisance parameterization before the phase-reversal trial.

## Estimator allocation

The Kalman state contains:

- six optical quadratures;
- one common-detuning random-walk coordinate;
- optional separately calibrated detector offset states.

The innovation stream is retained in full. A predeclared test checks its mean,
lagged covariance and dependence on phase setting, power and reversal order.
Inflating `Q` until innovations look white is prohibited after unblinding; that
would turn model failure into an adjustable nuisance.

## Controller allocation

Use two separated loops:

| Loop | Error signal | Actuator | Bandwidth | Forbidden input |
|---|---|---|---|---|
| fast optical lock | estimated common detuning | electro-optic frequency/phase drive | below unmodelled sidebands, above dominant drift | orientation-odd transfer residual |
| slow bias lock | long-window common resonance offset | heater or DC bias | below photorefractive/thermal identification limit | phase-reversal label and science statistic |

A PI controller is the default. Derivative action is admitted only if the
measured noise spectrum and delay model show a net robustness gain. Every
actuator has magnitude and slew limits; back-calculation anti-windup and the
applied, not merely requested, command are logged.

## Held-out science record

For the same calibrated coupling magnitudes, prepare `+Phi` and `-Phi`. The
primary science statistic is an orientation-odd coherent transfer combination,
for example a phase-referenced difference between forward and reverse complex
transmission. The exact statistic must be frozen from the device's port map.

The controller may use common-mode sums but never this odd difference. That
creates a block-triangular authority structure:

\[
\text{science record}\longleftarrow\text{physical carrier}
\longleftarrow\text{nuisance controller},
\]

with no arrow from the science record back into actuation during the held-out
trial.

## Decision ladder

1. **Control failure:** the common-detuning lock is unstable, saturated or
   nonstationary. No closure comparison is admitted.
2. **Estimator failure:** innovations are biased, colored or phase dependent
   outside the frozen covariance budget. Re-identify open loop; do not retune
   on the blinded statistic.
3. **Conventional closure:** one frozen electro-optic/nonlinear/thermal/
   photorefractive/acoustic/detector model predicts both phase settings and the
   odd record. The result is a validated relational controller and useful
   photonic technology.
4. **Model residual:** a repeatable held-out discrepancy survives independent
   devices, reversed port labels, power scaling and nuisance controls. This
   opens a targeted physics investigation; it does not itself establish new
   physics.

## What this adds to the corpus

The design makes “detector becomes selector” precise without making it
mystical. A detector record becomes an innovation only relative to a model; an
innovation becomes a selector only through an estimator/controller map; and
that selector is legitimate only inside actuator and authority limits. The
held-out channel prevents the resulting cybernetic loop from becoming
self-confirming.
