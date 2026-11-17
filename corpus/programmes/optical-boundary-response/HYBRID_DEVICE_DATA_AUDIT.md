# Hybrid device data and source calibration

**Date:** 8 November 2026  
**Status:** public-data audit and source derivation; inductive-strength test unscored  
**Parent:** [programme record](README.md)  
**Evidence:** [device scale inventory](../../../evidence/data/selector-device-physical-scale-audit-v1.json), [source derivation](../../../evidence/data/hcq-device-field-source-derivation-v1.json), [public strength audit](../../../evidence/data/hcq-public-inductive-strength-test-v1.json)

## A named device supplies a spectrum but not every source normalization

The [hybrid charge quantum interference device](https://arxiv.org/abs/2601.06682v1) supplies a concrete circuit and public spectroscopy. Its minimal flux-state model has a flux detuning and a charge-dependent tunneling magnitude. The source audit freezes the reported persistent current and phase-slip parameters; it does not identify the circuit with a fundamental selector.

The [public release](https://osf.io/q4dav/) contains figure-data workbooks. The inspected files include a flux-spectroscopy map, gate sweeps, fitted curves, a transmission-magnitude sweep and one Rabi trace. The release does not provide the complete electromagnetic layout/stack, local pump-flux calibration, physical source/contact dictionary or a Casimir measurement geometry. That is a bounded finding about this inspected release.

## Electrical calibrations recovered from the workbooks

The period annotation in [Fig4a-fit](../../../evidence/data/hcq-device-primary-v1/Fig4a-fit.xlsx), cell A379, is 3.35 mV. A \(2e\) charge period gives \(C_g\simeq95.7\) aF. The second sample's [gate-fit workbook](../../../evidence/data/hcq-device-primary-v1/Fig4b-fit.xlsx), cell A158, gives about 88.5 aF. These are period-derived calibrations, not independent electrostatic geometry solutions or uncertainty-certified line calibrations.

The flux-current period in [Fig3a-fit](../../../evidence/data/hcq-device-primary-v1/Fig3a_fit.xlsx), cell A154, also gives a coil-to-loop mutual calibration. It does not determine a free-space magnetic field map or the complete resonator-drive coupling.

A source-unit check must remain visible. Multiplying the primary paper's printed junction area and printed specific capacitance gives a junction capacitance near 14 aF and a charging frequency about 1.38 THz. The quoted charging frequency instead implies about 1.40 fF and 13.8 GHz. The roughly factor-100 mismatch may be a typographical or unit error; the audit does not silently repair it. Junction and gate capacitances also cannot be interchanged.

Using the quoted junction energies in the printed semiclassical formula gives a tunneling rate around 3.0 GHz; the paper reports a nominal estimate around 2.7 GHz, while the fitted rates used for the principal interference curve are 1.48 and 1.08 GHz. The available nominal inputs do not reproduce that fitted envelope without adjustment. This diagnoses missing microscopic accuracy, not a general impossibility theorem. Replaying fitted curves is not independent validation.

## Source and contact from one action

For node fluxes \(\varphi\), capacitance matrix \(C\), offset charges \(Q_g\), inductive/Josephson potential \(U\), and the direct electrostatic source term \(L_{\rm direct}\), use

\[
L=\tfrac12\dot\varphi^TC\dot\varphi+Q_g^T\dot\varphi-U+L_{\rm direct},
\qquad
H=\tfrac12(p-Q_g)^TC^{-1}(p-Q_g)+U-L_{\rm direct}.
\]

If \(Q_g=Q_{g0}+\eta E\) and \(C,U\) are field independent,

\[
d=\eta^TC^{-1}(p-Q_g)+\partial_E L_{\rm direct},
\qquad
H_{EE}=\eta^TC^{-1}\eta-\partial_E^2L_{\rm direct}.
\]

The field lever arm \(\eta=\partial Q_g/\partial E\) requires the conductor/dielectric boundary-value problem. A gate capacitance determines a voltage derivative, not this free-space field derivative. At microwave and higher frequencies the full dynamic source map may be needed.

For a shared inductive branch, voltage/current sources and their contacts must likewise be derived from the circuit action. A bias-dependent two-state basis introduces a source connection; differentiating a real tunneling magnitude alone does not determine all physical transition vertices.

## What the public flux map can test

The raw [flux map](../../../evidence/data/hcq-device-primary-v1/Fig3a.xlsx) has 401 frequency samples and 151 flux columns. Its 40 MHz frequency spacing and arbitrary readout units are retained in the audit. Fixed-window signed contrast areas were extracted without fitting linewidths or per-bias gains.

At the nearest available positive displacements to 0.02, 0.05 and 0.10 flux quanta, the fixed-model current-strength ratios are approximately 0.784, 0.339 and 0.114. With a 0.20 GHz half-window, raw contrast-area ratios are approximately 1.023, 1.311 and 1.040. These observables are different quantities.

In a weak unsaturated two-tone measurement,

\[
A(\Phi)\propto G_{\rm readout}(\Phi)T_1(\Phi)\Delta p(\Phi)
|\Phi_{\rm ac}(\omega_{01},\Phi)|^2|I_{10}(\Phi)|^2.
\]

An ideal full line area removes an explicit coherence-linewidth factor, but does not remove relaxation, population, local pump field or dispersive readout conversion. At an assumed equilibrium temperature of 12 mK, the population correction is below 0.0073% on this fixed-charge sweep; driven equilibrium and weak saturation are not established by that calculation.

Apparent unfitted half-height widths at the sampled points are about 194–377 MHz. They are not isolated homogeneous qubit linewidths. The lifetime-limited 8 MHz estimate retained in the evidence is only a narrow-line sampling diagnostic, not an explanation of the visibly broadened map.

An unknown smooth pump-transfer factor can compensate an alternative strength law while preserving the complete steady-state Bloch line shape. Consequently the existing public map neither confirms nor rejects the current-strength law. Estimating an arbitrary gain from that law and calling the corrected data a test would be circular.

## Next discriminator

Use the [paired-frequency coherent protocol](INDUCTIVE_STRENGTH_AND_LOCAL_FLUX_PROTOCOL.md) with independently observed local drive, or acquire the missing pump/population/readout corrections before scoring integrated strengths. Freeze instrument calibration before the strength comparison. An unknown field normalization is not set to zero and the illustrative four-state force contrast is not transferred to this device.
