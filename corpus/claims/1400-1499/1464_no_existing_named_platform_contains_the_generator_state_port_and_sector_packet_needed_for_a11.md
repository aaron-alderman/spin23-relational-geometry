# No existing named platform contains the generator--state--port and sector packet needed for A11

**Date:** 20 October 2026

**Gates:** A7, A9 and A11

**Status:** complete local-corpus packet inventory; exact absence result for a named physical (Spin(2,3)/\mathbb Z_3) experiment

**Depends on:** [the generator--state--port underidentification theorem](1459_the_a7_a9_a11_lane_is_underidentified_and_reopens_only_with_a_generator_state_port_packet.md), [the calibrated A11 protocol](1452_the_scheme_invariant_a11_experiment_is_a_calibrated_spectral_pole_and_band_contrast_with_a_device_prediction_gate.md), and [the nearest Aharonov--Casher experiment](../1200-1299/1230_the_nearest_a11_experiment_is_an_aharonov_casher_two_port_while_protected_z3_requires_verified_sector_algebra_and_scaling.md)

**Evidence:** [machine-readable inventory](../../../evidence/data/spin23-a11-named-platform-packet-inventory.json) and [executable verifier](../../../verification/verify/verify_spin23_a11_named_platform_packet_inventory.mjs)

## Result

The corpus contains several response-complete mathematical controls and several named physical platforms. It contains no object that is both.

For a physical A11 prediction one needs, in one frozen packet,

\[
 \mathcal P_{\rm phys}
 =(	ext{named device},\mathcal L_h,\rho_h,
 \mathcal V_b,J_a,D_{ab},
 \text{calibration},
 S^{\rm raw}_{ab}(\omega,h)).
\]

For the stronger protected-sector claim one additionally needs a certificate of (W^3=1), preparation of all three sectors, a validated sector increment, and suppression of local mixing with separation or code size. A fundamental-programme claim further needs a microscopic map from the device variables to the (Spin(2,3)) response carrier.

The inventory gives

\[
 \boxed{
 \text{no current named platform supplies the complete physical packet,}
 }
\]

and therefore no current corpus entry predicts a device-level pole shift, residue, linewidth or protected-(\mathbb Z_3) contrast from the (Spin(2,3)) programme.

## 1. Complete mathematical controls are not physical packets

Three classes are internally response-complete:

1. Documents 664--666 give exact finite Hamiltonian/Feshbach realizations with ports and residues. Their matrices prove realizability but have no sourced microscopic device, sector preparation or laboratory calibration.
2. The passive switched network of document 1226 has a complete synthetic transfer fixture. Its three settings are ordinary controls, not protected sectors, and its topology class is zero.
3. The corrected QWZ Lindblad model of document 1454 supplies a generator, stationary state and current/source map. Precisely because that packet is complete, its declared unital bath gives the exact zero stationary response. It is a control no-go, not an A11 realization.

The localized reader and octonionic two-mode model sit one step earlier. They supply substantial internal dynamics but lack a physical port map or a source-derived identification of their variables with a named device.

## 2. Named platforms are missing different packet blocks

The named Aharonov--Casher devices of Pop, Bell and the Dunstan reader literature supply real circuit scales, spectra or readout precedent. They do not supply one common frozen complex (2\times2) port calibration, raw sector-tagged scattering data at the three preregistered charge settings, and a programme coupling.

The bonded GaAs Outcome Dynamics model supplies a finite-element generator, controlled drives and multiple readouts, but its mass/lateral-convergence gate and same-unit positive two-port definition remain open. The (t)-(J) route still lacks its physical lattice energy-current operator. Parafermion/discrete-gauge proposals have the correct protected-sector semantics but no selected-stack generator, preparation/lifetime model, calibrated ports and dataset in this programme.

The neural/microtubule lane contains observations and a simultaneous-measurement proposal, but not a causal generator--state--port model connecting microtubule variables to the cortical cross-spectrum. The graph/arXiv atlas contains no direct microscopic (Spin(2,3)) derivation.

## 3. Highest-value external datum

The most efficient next acquisition is one public frozen release for a named Aharonov--Casher device containing:

1. the circuit netlist and all fitted energy parameters;
2. the complete port-capacitance/mutual-inductance map and cryogenic reference-plane calibration;
3. the preparation and parity/charge-state tagging rule;
4. raw complex (2\times2) scattering data
   \[
   S_{ab}(\omega,n_g,t),
   \qquad n_g\in\{0,1/3,2/3\},
   \]
   with charge/parity timestamps, drift monitors and path-off controls;
5. measured linewidth, disorder and poisoning distributions.

Approximate energy and linewidth scales already exist in the literature. The most absent marginal block is the calibrated physical input/output map joined to raw complex data. This packet would close the operational continuous-holonomy A11 test. It would not by itself establish protected (\mathbb Z_3) or a fundamental (Spin(2,3)) origin.

## 4. Correct path back to (Spin(2,3))

The evidential chain must remain ordered:

\[
\begin{aligned}
&\text{named microscopic device and environment}\\
&\longrightarrow(\mathcal L_h,\rho_h;\mathcal V_b,J_a,D_{ab})\\
&\longrightarrow Y_{ab,h}(\omega)\\
&\longrightarrow\text{calibrated positive two-port response}\\
&\longrightarrow H_2(\mathbb R)^+\\
&\longrightarrow Sp(4,\mathbb R)\cong Spin_0(2,3).
\end{aligned}
\]

The last arrow is a response-geometry classification. It becomes a physical (Spin(2,3)) result only if the earlier arrows are derived for the same device. Matching an abstract transfer function after the fact is not enough.

## 5. Verdict

\[
\boxed{
\begin{array}{ll}
\text{abstract response-complete controls:}&\textbf{present},\\
\text{named-device precedents:}&\textbf{present},\\
\text{one joined physical packet:}&\textbf{absent},\\
\text{protected-}\mathbb Z_3\text{ certificate:}&\textbf{absent},\\
\text{microscopic }Spin(2,3)\text{ map:}&\textbf{absent},\\
\text{A11 physical admission:}&\textbf{false}.
\end{array}}
\]

## Reproduction

~~~powershell
node verification/verify/verify_spin23_a11_named_platform_packet_inventory.mjs
~~~
