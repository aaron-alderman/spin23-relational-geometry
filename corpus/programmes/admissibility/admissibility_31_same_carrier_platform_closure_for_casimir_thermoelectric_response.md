# Same-carrier platform closure for Casimir--thermoelectric response

**Date:** 24 October 2026  
**Status:** primary-source platform closure audit; no same-carrier experiment admitted  
**Parent:** [Casimir--Seebeck--Nernst spectral ladder](admissibility_30_casimir_seebeck_nernst_spectral_ladder.md)  
**Evidence:** [Same-carrier closure ledger](../../../evidence/data/admissibility-casimir-thermoelectric-platform-closure-v1.json)  
**Verifier:** [Platform-closure certificate](../../../verification/admissibility/verify_casimir_thermoelectric_platform_closure.mjs)

## Result

No published experiment yet closes the Casimir--Seebeck--Nernst ladder on one carrier. Co\(_2\)MnGa is nevertheless a substantially stronger candidate than a generic Weyl-semimetal proposal because the material family already has four separately demonstrated ingredients:

1. longitudinal Seebeck and anomalous Nernst transport;
2. DC anomalous Hall conductivity;
3. complex thin-film anomalous Hall response in the terahertz band;
4. broadband Kramers--Kronig-consistent thin-film longitudinal optical conductivity.

The missing step is not discovery of another effect. It is **metrological closure**: obtain the complete diagonal and off-diagonal causal response tensor, transport tensor and force observable on matched films, and make the force prediction before seeing the force data.

## Why Co2MnGa is the lead carrier

### Thermoelectric tensor

Published bulk-crystal measurements report at room temperature approximately

\[
S_{xx}\simeq-26\,\mu\mathrm{V/K},
\qquad
S_{yx}^{A}\simeq6.0\,\mu\mathrm{V/K},
\qquad
\sigma_{xy}^{A}\simeq845\,\mathrm{S/cm}.
\]

The work measured \(\rho_{xx},\rho_{yx},S_{xx},S_{yx}\) and reconstructed \(\alpha_{yx}\), so the tensor-unmixing requirement of AZ-029 is already demonstrated. The anomalous Nernst signal saturates with magnetic order and is much larger than conventional magnetization scaling predicts.

### Low-frequency off-diagonal optics

Time-domain terahertz measurements on Co\(_2\)MnGa thin films report a room-temperature anomalous Hall conductivity near

\[
\sigma_{xy}(\omega)\simeq600\,\Omega^{-1}\mathrm{cm}^{-1}
\]

that is approximately frequency independent from \(0.2\) to \(1.5\,\mathrm{THz}\). They also report a thickness-independent Faraday rotation of \(59\pm6\) mrad and a Hall angle near \(8.5\%\) over that band. This supplies the experimentally measured off-diagonal low-frequency response required by a magneto-optical scattering calculation.

### Broadband diagonal optics

Separate epitaxial-film work measures reflectance and transmittance from approximately \(2.5\) meV to \(6.2\) eV for film thicknesses from \(10\) to \(80\) nm. A Kramers--Kronig-consistent air/film/substrate model extracts the complex longitudinal conductivity. This is unusually close to the spectral coverage needed for continuation to the imaginary-frequency axis.

### The remaining discontinuity

These results do not constitute a same-film response tensor:

- the thermoelectric record is not on the optically characterized force specimen;
- the broadband optical measurement is primarily longitudinal;
- the transverse optical response is confined to the THz window;
- the separate experiments use different film thicknesses, substrates, caps, strain states and sample histories;
- no Co\(_2\)MnGa Casimir force or torque has been measured.

Interpolating these publications into one synthetic dielectric tensor without propagated model uncertainty would violate the no-refit gate.

## Other pieces of the apparatus

The first direct Casimir-torque experiment already establishes the force-side protocol. It measured the angle and distance dependence between an optically anisotropic crystal and a liquid crystal and found agreement with calculations. It therefore demonstrates orientation-sensitive fluctuation torque, but its materials do not provide the anomalous Hall--Nernst transport rail.

Weyl-semimetal Casimir theory supplies the bridge model. Calculations predict that Hall response, longitudinal conductivity, film thickness, chemical potential and relative orientation can control attraction, repulsion and trapping distances. Those results establish theoretical sensitivity, not a material-specific prediction for Co\(_2\)MnGa.

Mn\(_3\)Sn remains an important secondary carrier. It combines anomalous Nernst response with room-temperature terahertz anomalous Hall conductivity and has small net magnetization, potentially reducing ordinary magnetic backgrounds. Its same-film broadband optical and thermoelectric closure is currently less complete.

## Readiness matrix

| Requirement | Co\(_2\)MnGa | Mn\(_3\)Sn | birefringent torque apparatus | Weyl Casimir theory |
|---|---:|---:|---:|---:|
| Seebeck and anomalous Nernst | demonstrated in material family | demonstrated | no | model input only |
| DC anomalous Hall | demonstrated | demonstrated | no | assumed/modelled |
| complex low-frequency Hall optics | demonstrated in films | demonstrated in films | no | modelled |
| broadband diagonal optics | demonstrated in films | incomplete for this gate | demonstrated | modelled |
| broadband off-diagonal optics | open | open | not relevant | parameterized |
| same-specimen tensor closure | no | no | force-side only | no specimen |
| Casimir force or torque | no | no | demonstrated | predicted |
| no-refit cross-channel prediction | no | no | optical-to-torque precedent | no material closure |

No column is complete.

## Correct next experiment

The next step should be a **prediction-closure phase**, not an immediate force claim.

### Phase 1 — matched-film response closure

On one fabrication batch and declared thickness/cap/substrate stack:

1. measure DC \(\rho_{xx},\rho_{xy},S_{xx},S_{xy}\) under both magnetic orientations;
2. reconstruct \(\alpha_{xx},\alpha_{xy}\);
3. measure complex \(\sigma_{xx}(\omega)\) and \(\sigma_{xy}(\omega)\) from THz through the broadest feasible optical range;
4. fit a causal tensor model jointly, retaining extrapolation families and covariance;
5. continue each accepted model to \(i\xi\);
6. preregister the predicted parallel/antiparallel differential Casimir force or torque and its uncertainty band.

### Phase 2 — differential boundary measurement

Use two matched films and compare parallel and antiparallel magnetic configurations at identical nominal separation. Include a nonmagnetic reference stack and direct magnetic-force/background characterization. Measure the force gradient or torque versus

\[
(d,T,\theta,M_1M_2).
\]

The primary observable is the preregistered differential quantity

\[
\Delta F_C(d,T,\theta)
=F_C^{\parallel}-F_C^{\mathrm{antiparallel}},
\]

or the corresponding torque difference. A total force consistent with an adjustable dielectric fit is not sufficient.

### Phase 3 — selection test

Only after the force channel closes should one ask whether the boundary changes domain selection or relaxation. Prepare multiple initial magnetic/domain states, switch the opposing boundary configuration and estimate the fixed point and tangent slope of the observed return map. This is the gate for promoting the Casimir boundary from detector to candidate datum \(Y\).

## Failure conditions

The cross-channel hypothesis fails its strongest form if:

- no causal tensor model compatible with the matched-film optical data predicts a resolvable differential force;
- the observed differential follows ordinary magnetic backgrounds rather than the preregistered distance law;
- fitting the force requires changing optical parameters beyond their prior uncertainty;
- the Nernst transition surface does not correspond to any predicted change of the imaginary-frequency tensor;
- or changing the boundary has no reproducible effect on selection dynamics.

These failures would not invalidate the individual Casimir, Seebeck or Nernst phenomena. They would close the proposed shared-descent edge.

## Verdict

Co\(_2\)MnGa is the closest material carrier, the birefringent Casimir-torque experiment is the closest force protocol, and Weyl-semimetal Casimir calculations are the closest bridge theory. The current frontier is to combine them without merging their evidence.

The immediate gate is a matched-film Kramers--Kronig tensor closure and preregistered force-difference calculation. Until that calculation produces a signal above a declared nuisance floor, fabrication of the full force experiment is premature.

## Primary sources

- Guin et al., [*Anomalous Nernst effect beyond the magnetization scaling relation in the ferromagnetic Heusler compound Co2MnGa*](https://www.nature.com/articles/s41427-019-0116-z).
- Han et al., [*Giant intrinsic anomalous terahertz Faraday rotation in the magnetic Weyl semimetal Co2MnGa at room temperature*](https://journals.aps.org/prb/abstract/10.1103/PhysRevB.105.174406).
- Tomarchio et al., [*Optical conductivity and photo-induced polaronic formation in Co2MnGa topological semimetal*](https://pmc.ncbi.nlm.nih.gov/articles/PMC11538699/).
- Somers et al., [*Measurement of the Casimir torque*](https://www.nature.com/articles/s41586-018-0777-8).
- Wilson, Allocca and Galitski, [*Repulsive Casimir force between Weyl semimetals*](https://journals.aps.org/prb/abstract/10.1103/PhysRevB.91.235115).

