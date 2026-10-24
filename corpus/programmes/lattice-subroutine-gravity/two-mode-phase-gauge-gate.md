# A two-mode coupling phase is not an intrinsic seam

**Date:** 24 October 2026
**Status:** exact gauge-removability result; externally anchored and three-mode-loop realizations remain open
**Evidence:** [machine-readable gate](../../../evidence/data/lattice-subroutine-two-mode-phase-gauge-gate-v1.json)
**Certificate:** [gauge verifier](../../../verification/verify/verify_lattice_subroutine_two_mode_phase_gauge_gate.mjs)

## Result

The two-resonator experiment measures a real coherent phase relation, but an isolated two-mode Hamiltonian does not contain an intrinsic coupling phase.

Write

\[
H=
\begin{pmatrix}
\omega_1&\epsilon\\
\epsilon^*&\omega_2
\end{pmatrix}.
\]

Under independent mode rephasings

\[
a_1\mapsto e^{i\alpha_1}a_1,
\qquad
a_2\mapsto e^{i\alpha_2}a_2,
\]

the coupling transforms as

\[
\epsilon\mapsto
e^{i(\alpha_1-\alpha_2)}\epsilon.
\]

Choosing \(\alpha_1-\alpha_2=-\arg\epsilon\) makes the coupling real and positive. A further phase shift of \(\pi\) reverses its sign. Therefore neither \(\arg\epsilon\) nor \(\epsilon\mapsto-\epsilon\) is an internal gauge-invariant distinction for a single isolated edge.

## What the detector actually measures

The IQ/homodyne protocol includes a pump phase, port convention and local oscillator. These provide an external phase frame. Relative to that frame,

\[
D_{\rm odd}
\propto
\operatorname{Re}(A_{\rm ref}^*\,\epsilon)
\]

is observable and reproducible.

That is legitimate, but its type must be stated correctly:

> it is an externally anchored relational seam, not yet an intrinsic holonomy of the two-mode device.

Removing or scrambling the reference must remove the odd record. This is a feature of the protocol, not a defect.

## The smallest intrinsic completion

Three modes can carry a closed coupling loop:

\[
\epsilon_{12},\qquad
\epsilon_{23},\qquad
\epsilon_{31}.
\]

The loop product

\[
\mathcal B
=
\epsilon_{12}\epsilon_{23}\epsilon_{31}
\]

is unchanged by all three local mode rephasings. Its phase

\[
\Phi=\arg\mathcal B
\]

is an intrinsic synthetic flux or Bargmann/Wilson phase.

This gives a clean hierarchy:

| Carrier | Phase status |
|---|---|
| one complex coupling | gauge-removable |
| one coupling plus local oscillator/pump | externally relational |
| closed three-mode product | internally gauge-invariant |

The corpus already encountered this distinction in the Wilson-triangle branch. A projective loop can carry a genuine central \(-I\) holonomy, but that central sign is still not automatically a response-Pfaffian sheet flip.

## Experimental continuation

The next device should add a third resonator and independently program the three edge phases. Hold all edge magnitudes and all one-edge spectra fixed while comparing

\[
\Phi=0,\quad\pi,\quad+\frac{\pi}{2},\quad-\frac{\pi}{2}.
\]

Measure:

- nonreciprocal or directional complex transmission;
- eigenmode phase winding;
- loop-sensitive interference;
- invariance under arbitrary software rephasings of the three mode coordinates.

The decisive control is to reassign phases among the edges while keeping \(\Phi\) fixed. All intrinsic records must remain unchanged. If they follow one selected edge phase instead, the measurement is reference-anchored rather than loop-intrinsic.

## Implication for the modular bridge

Mapping the complex sewing normal to a single laboratory coupling cannot produce an intrinsic seam without also mapping the modular phase convention to a physical reference. There are two honest routes:

1. derive the pump/local-oscillator phase as part of the proposed physics;
2. map the seam to a gauge-invariant loop product in a three-or-more-mode network.

The second route is structurally closer to a holonomy and supplies the stronger test.
