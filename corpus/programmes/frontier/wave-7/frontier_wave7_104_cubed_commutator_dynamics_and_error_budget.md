# Frontier Wave 7.104: Cubed-Commutator Dynamics and Error Budget

**Date:** 25 October 2026
**Status:** exact phase-tolerance and dynamical detector analysis
**Certificate:** [cubed-loop dynamics verifier](../../../../verification/verify/verify_cubed_commutator_dynamics.mjs)

## Result

The cubed-commutator detector turns the finite (C_6\to C_2) quotient into a
time-ordered dynamical measurement with a built-in error channel.

Let the realized central commutator phase be

\[
z=e^{i(\phi_0+\delta)},
\]

where φ₀ is an ideal sixth-root phase and δ is coherent phase error.  After
three loops, an ancilla interferometer measures

\[
X_3=V_3\cos(3\phi_0+3\delta),
\qquad
Y_3=V_3\sin(3\phi_0+3\delta),
\]

where (0\le V_3\le1) is the accumulated visibility.

For a qutrit cubic phase,

\[
(X_3,Y_3)=V_3(\cos3\delta,\sin3\delta),
\]

while for a qubit sign,

\[
(X_3,Y_3)=-V_3(\cos3\delta,\sin3\delta).
\]

Thus the desired binary output lies in (X_3), while (Y_3) measures the
coherent phase error.

## 1. Robustness and sensitivity

Near δ=0,

\[
X_3^{(3)}=+V_3\left(1-\frac92\delta^2+O(\delta^4)\right),
\qquad
X_3^{(2)}=-V_3\left(1-\frac92\delta^2+O(\delta^4)\right),
\]

where the superscript labels the qutrit or qubit primary component.  The
binary decision is therefore first-order insensitive to coherent phase
miscalibration.

Meanwhile,

\[
Y_3^{(3)}=+3V_3\delta+O(\delta^3),
\qquad
Y_3^{(2)}=-3V_3\delta+O(\delta^3).
\]

The orthogonal quadrature amplifies small phase error by a factor of three.
The same third power that performs the quotient consequently supplies its own
linear calibration signal.

## 2. Exact classification radius

With positive visibility, sign classification using (X_3) remains correct
whenever

\[
\cos(3\delta)>0.
\]

Around an ideal phase this gives the exact principal tolerance

\[
\boxed{|\delta|<\frac\pi6=30^\circ.}
\]

This is a phase tolerance, not a license for large gate error: visibility may
collapse well before the sign changes, and noncentral errors can introduce
state dependence that this scalar formula does not cover.

## 3. Decoherence model

If each commutator loop retains an independent ancilla coherence factor
(v\), then

\[
V_3=v^3.
\]

Decoherence reduces contrast but does not bias the ideal sign when (v>0).
The calibrated parity estimator is

\[
\widehat\chi
=\frac{X_3}{V_3\cos(3\widehat\delta)}.
\]

Both (V_3) and δ must be estimated from controls.  Treating reduced contrast
as a fractional record count would confuse detector loss with algebraic
selection.

## 4. Frequency, lag and hysteresis protocol

Let each loop be executed at control frequency ω with duration (T(\omega)).
Measure

\[
z_1(\omega)=X_1(\omega)+iY_1(\omega)
\]

from the uncubed port and

\[
z_3(\omega)=X_3(\omega)+iY_3(\omega)
\]

from the cubed port.  The central coherent model predicts

\[
\arg z_3(\omega)=3\arg z_1(\omega)\pmod{2\pi},
\qquad
|z_3(\omega)|\approx|z_1(\omega)|^3
\]

under independent equal loop loss.

Sweep frequency upward and downward.  The diagnostics separate:

- **resonant phase lag:** reproducible frequency dependence in δ(ω);
- **ordinary decoherence:** falling visibility without systematic branch
  dependence;
- **hysteresis or metastability:** different up- and down-sweep curves;
- **noncentral dynamics:** output changes with the prepared system state;
- **time-ordering failure:** reversing (U,V) does not conjugate the uncubed
  phase as expected.

This is the natural place for AM/FM and sideband tests: modulate one gate
phase or loop delay, then check whether the cubed output contains only the
frequency tripling predicted by (z\mapsto z^3) or develops additional
memory-dependent sidebands.

## 5. Centrality test

For an ideal Weyl pair, the commutator is a scalar and the ancilla result is
independent of the system state.  Prepare a spanning set of qutrit--qubit
states and compare (z_1,z_3).  State dependence certifies that the realized
commutator has a noncentral component.

That failure is scientifically useful.  It means the detector is probing
more than a finite phase character—possibly boundary coupling, leakage,
state-dependent geometric phase or a non-Weyl interaction.  Such effects must
be modelled before the (172)-record census is used.

## 6. Relation to the wider admissibility programme

The construction now exhibits the full sequence

\[
\boxed{
\text{ordered dynamics}
\longrightarrow
\text{central holonomy}
\longrightarrow
\text{third-power quotient}
\longrightarrow
\text{binary record}.
}
\]

The “static” record is the stable endpoint of a time-ordered loop.  Its
admissibility depends on visibility, phase closure, state independence and
sweep history.  The detector does not merely observe a pre-existing sign; it
constructs the sign by repeating and closing a dynamical path.

## Verdict

The binary character has a robust dynamical realization.  Its (X)-output is
quadratically protected near the ideal roots, its (Y)-output is a linear
phase-error monitor, and its exact sign radius is ±30 degrees.  Frequency and
hysteresis sweeps now provide concrete tests for resonance, memory,
metastability and noncentral boundary effects.

## Corpus anchors

- [cubed-commutator detector](frontier_wave7_103_cubed_commutator_binary_detector.md)
- [record-POVM benchmark](frontier_wave7_102_chain_theory_record_povm_benchmark.md)
- [drive-to-record AM/FM benchmark](frontier_wave7_65_drive_to_record_am_fm_benchmark.md)
- [unread-correlation channel](frontier_wave7_90_chain_theory_unread_correlation_channel.md)
