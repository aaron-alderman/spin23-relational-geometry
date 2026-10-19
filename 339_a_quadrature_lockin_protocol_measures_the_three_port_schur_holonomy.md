# A Quadrature Lock-In Protocol Measures the Three-Port Schur Holonomy

**Date:** 17 October 2026  
**Branches:** B01, B04, B05, B06, B08 and B11  
**Claim status:** exact response-network measurement identity; a Standard-Model or neutrino implementation remains open and requires lepton-number violation for Majorana sensitivity

## 1. Direct and indirect paths

For a positive Hermitian three-port response, write the direct \(1\leftrightarrow2\) edge as

\[
u=r_{12}.
\]

After eliminating port three with positive diagonal pivot \(c\), the indirect path is

\[
q=\frac{\bar r_{31}\bar r_{23}}{c}.
\]

The effective edge is

\[
u_{\rm eff}=u-q.
\]

The orientation identity is

\[
\boxed{
\operatorname{Im}(u\bar q)
=\frac1c\operatorname{Im}(r_{12}r_{23}r_{31}).}
\]

The problem is to measure the sine quadrature \(\operatorname{Im}(u\bar q)\), rather than only the path powers.

## 2. Insert a controllable phase in the indirect path

Let a phase shifter change

\[
q\longmapsto e^{i\phi}q.
\]

The detected coherent intensity is

\[
\begin{aligned}
I(\phi)
&=\left|u-e^{i\phi}q\right|^2\\
&=|u|^2+|q|^2
-2\operatorname{Re}\!\left(e^{-i\phi}u\bar q\right).
\end{aligned}
\]

At the two lock-in quadratures,

\[
\boxed{
I(-\pi/2)-I(+\pi/2)
=4\operatorname{Im}(u\bar q).}
\]

Therefore

\[
\boxed{
\operatorname{Im}(r_{12}r_{23}r_{31})
=\frac c4\left[I(-\pi/2)-I(+\pi/2)\right].}
\]

This is a direct operational observable for the oriented loop.

## 3. Why ordinary power measurements are insufficient

The separately calibrated path powers

\[
|u|^2,\qquad |q|^2
\]

are CP even. A zero-phase interference measurement gives

\[
|u-q|^2
=|u|^2+|q|^2-2\operatorname{Re}(u\bar q),
\]

which accesses only the cosine quadrature.

For the programme’s checkpoint, \(u\bar q\) is purely imaginary. The zero-phase channel therefore contains no orientation signal at all. The \(\pm\pi/2\) phase reversal is essential.

## 4. Gauge invariance of the protocol

Under port rephasings,

\[
r_{ij}\mapsto e^{i(\theta_i-\theta_j)}r_{ij},
\]

one has

\[
u\mapsto e^{i(\theta_1-\theta_2)}u,
\qquad
q\mapsto e^{i(\theta_1-\theta_2)}q.
\]

Hence

\[
u\bar q
\]

and the intensity difference are port-gauge invariant.

Under complex conjugation,

\[
\operatorname{Im}(u\bar q)\mapsto-\operatorname{Im}(u\bar q),
\]

while \(|u|^2\) and \(|q|^2\) remain fixed. The lock-in difference is therefore the CP-odd channel.

## 5. Explicit checkpoint

Use

\[
u=2\sqrt{35},
\qquad
v=-i\sqrt{77},
\qquad
w=\sqrt{55},
\qquad
c=40.
\]

Then

\[
uvw=-770i
\]

and

\[
\operatorname{Im}(u\bar q)=-\frac{770}{40}.
\]

The phase-reversed intensity difference gives

\[
\frac c4\left[I(-\pi/2)-I(+\pi/2)\right]
=-770,
\]

recovering the complete loop orientation.

## 6. Minimal laboratory response protocol

An analog, photonic, microwave, mechanical or quantum-network implementation needs:

1. three coherently addressable ports;
2. a calibrated direct \(1\to2\) transfer path;
3. a separately switchable or detunable \(1\to3\to2\) path;
4. a phase shifter on one leg of the indirect path;
5. coherent intensity detection at port two;
6. measurements at \(\phi=\pm\pi/2\);
7. calibration of the pivot response \(c\).

Repeating the protocol cyclically for the other two eliminated ports provides a consistency check on the reconstructed loop.

## 7. Production–propagation–detection language

The three stages have a precise response interpretation:

\[
\begin{array}{ccl}
\text{production}&:&\text{prepare a coherent source at port 1},\\
\text{propagation}&:&\text{retain direct and port-3-mediated amplitudes},\\
\text{detection}&:&\text{interfere them at port 2 and extract the sine quadrature}.
\end{array}
\]

The phase shifter supplies an external reference. Without it, intensity data cannot distinguish a loop from its complex conjugate when the cosine quadrature agrees.

## 8. The neutrino caveat is decisive

Standard flavor-oscillation probabilities are lepton-number conserving. Majorana rephasing phases cancel from ordinary oscillation amplitudes. Consequently, the response protocol cannot be identified directly with a conventional neutrino-oscillation experiment.

A neutrino realization would require a lepton-number-violating coherent amplitude, for example:

- neutrino–antineutrino conversion;
- a coherent source/detector analogue of neutrinoless double beta decay;
- sterile-sector resonant conversion with a Majorana insertion;
- another process in which production and detection retain the Majorana mass phase.

This is a hard physical gate, not a minor experimental detail.

## 9. What is established and what remains open

Established:

- an exact intensity-difference observable for the Schur holonomy;
- port-gauge invariance;
- CP oddness of the sine quadrature;
- a complete finite response-network protocol;
- cyclic consistency checks.

Open:

- a Standard-Model process realizing independently controllable direct and indirect flavor paths;
- a lepton-number-violating phase reference;
- coherence and background requirements;
- matching the measured response normalization to \(\mathcal I_\triangle\);
- whether the exceptional coefficient \(c\) controls an experimentally accessible transfer matrix.

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** a lepton-number-violating three-flavor process realizes the two path amplitudes and measures the predicted sine quadrature with the same weak-basis invariant.

**Response trigger:** a passive three-port simulator reproduces the loop reconstruction and its sign reversal under conjugation.

**Oscillation falsifier:** an ordinary lepton-number-conserving oscillation probability is claimed to measure the Majorana triangle.

**Coherence falsifier:** the direct and indirect amplitudes are added as probabilities rather than coherently.

**Gauge falsifier:** the extracted observable changes under independent port phase conventions.

**Quadrature falsifier:** only \(\phi=0\) data are used to infer a purely imaginary loop.

## 11. Certificate

The [three-port quadrature lock-in certificate](scripts/verify_three_port_quadrature_lockin_protocol.mjs) verifies the phase-reversal identity, loop reconstruction, port-gauge invariance, CP parity and the failure of the zero-phase cosine channel at the checkpoint.

## Companion documents

- [Majorana CP as three-port holonomy](331_majorana_cp_is_the_holonomy_obstructing_three_local_spin23_edges_from_one_global_real_carrier.md)
- [Minimal causal spectral orientation](332_two_spectral_modes_are_the_minimum_for_causal_three_port_orientation.md)
- [Weak-basis Majorana triangle invariant](330_the_exceptional_majorana_phase_has_a_weak_basis_three_projector_triangle_invariant.md)
- [Exceptional phase through the aligned seesaw](333_the_exceptional_phase_crosses_the_aligned_seesaw_but_has_a_transmission_zero.md)
