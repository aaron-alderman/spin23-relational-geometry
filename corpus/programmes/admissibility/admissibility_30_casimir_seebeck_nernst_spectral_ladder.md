# Casimir--Seebeck--Nernst spectral ladder

**Date:** 24 October 2026  
**Status:** typed cross-channel guidepost; shared microscopic descent open  
**Parent:** [Seebeck and anomalous Nernst guideposts](admissibility_29_seebeck_nernst_guideposts_for_response_geometry.md)  
**Earlier anchors:** [Casimir as generative probe](admissibility_02_casimir_as_first_generative_probe.md); [dispersion-force landscape](admissibility_04_dispersion_force_landscape.md)  
**Evidence:** [Spectral-ladder ledger](../../../evidence/data/admissibility-casimir-seebeck-nernst-ladder-v1.json)  
**Verifier:** [Spectral-ladder type certificate](../../../verification/admissibility/verify_casimir_seebeck_nernst_ladder.mjs)

## Result

Casimir can be added to the Seebeck--Nernst map, but only by keeping three meanings separate:

1. a **representation Casimir** classifies modes after a symmetry and representation have been admitted;
2. the **Casimir effect** measures a boundary-dependent change in fluctuation free energy or stress after material response, geometry, state and subtraction have been supplied;
3. **Onsager--Casimir reciprocity** specifies how transport coefficients transpose when time-reversal-odd controls are reversed.

The resulting structure is a spectral ladder:

\[
\boxed{
\begin{aligned}
&\text{admitted symmetry}
\xrightarrow{C_2}
\text{mode sectors and selection rules}
\longrightarrow
\text{material response}\\
&\qquad\longrightarrow
\begin{cases}
\mathcal F_C(d,T):&\text{boundary-integrated spectral response},\\
S_{xx}:&\text{longitudinal energy-slope response},\\
\alpha_{xy}^{A}:&\text{transverse orientation-odd energy-slope response}.
\end{cases}
\end{aligned}}
\]

This is useful because the three observables interrogate different projections of a potentially common spectral object. It is not evidence that they have a common microscopic cause until the response functions are calculated or measured on the same carrier.

## The three experimental rails

### Casimir-force or torque rail

At equilibrium a scattering formulation has the schematic form

\[
\mathcal F_C(d,T)
=k_BT\sum_{n\ge0}'
\log\det\!\left[
I-\mathcal R_1(i\xi_n)\mathcal U(d,i\xi_n)
\mathcal R_2(i\xi_n)\mathcal U(d,i\xi_n)
\right],
\]

where \(\xi_n=2\pi n k_BT/\hbar\). The observable samples response across imaginary frequency and depends explicitly on separation, geometry, temperature, polarization and both bodies. It is therefore the global boundary-conditioned rail.

For ideal zero-temperature parallel plates only,

\[
\frac EA=-\frac{\pi^2\hbar c}{720d^3},
\qquad
P=-\frac{\pi^2\hbar c}{240d^4}.
\]

These powers provide a calibration reference, not a universal material law.

### Seebeck rail

The longitudinal thermopower \(S_{xx}\) probes particle--hole asymmetry and the energy dependence of longitudinal conduction near the chemical potential. It is sensitive to band reconstruction, scattering, drag and criticality, so it locates spectral boundaries without uniquely identifying their origin.

### Anomalous Nernst rail

The tensor-unmixed anomalous thermoelectric conductivity \(\alpha_{xy}^{A}\) probes a transverse, magnetic-orientation-odd entropy flow. In an intrinsic low-temperature regime it can be compared with \(\partial_\mu\sigma_{xy}^{A}\) by the Mott relation. It is the oriented local-spectral rail.

## Why Casimir adds information

Seebeck and Nernst are transport measurements requiring populated mobile excitations and contacts. A Casimir force can respond to virtual and thermal fluctuations through the full causal optical response, including insulating frequency windows where DC transport sees little. It therefore tests whether a proposed spectral reorganization persists beyond the Fermi-level transport slice.

The comparison supplies a useful diagnostic:

| Pattern | Provisional reading | What must still be excluded |
|---|---|---|
| Seebeck anomaly only | longitudinal scattering or particle--hole reorganization | drag, contact offsets, phase transition |
| Hall/Nernst pair only | oriented near-\(\mu\) transverse structure | skew scattering, side jump, domains |
| Casimir change only | optical/boundary spectral redistribution | patches, roughness, distance drift, dielectric refit |
| all three with one response model | candidate shared spectral descent | nuisance covariance and no-refit out-of-sample prediction |
| force torque reverses with orientation | candidate nonreciprocal or anisotropic boundary coupling | magnetic-force background and ordinary shape anisotropy |

The strongest result would not be three simultaneous anomalies. It would be one independently measured causal response model that predicts all three channels without refitting.

## The role of Onsager--Casimir reciprocity

For fluxes and forces with declared time-reversal parities \(\epsilon_a\), linear response obeys

\[
L_{ab}(B,M)=\epsilon_a\epsilon_b L_{ba}(-B,-M).
\]

This controls the transport block and its reversal tests. It is not a theorem that a Casimir force must be odd or even under reversing one magnetic body: equilibrium force and torque depend on the complete reciprocal or nonreciprocal scattering problem. The force parity must be derived from the actual material tensors and geometry.

## Shared-carrier experiment

The cleanest cross-channel experiment uses one material stack characterized by ellipsometry, Hall and thermoelectric transport:

1. measure \(\boldsymbol\sigma(T,\mu,M,\omega)\) and \(\mathbf S(T,\mu,M,\omega)\);
2. reconstruct \(\boldsymbol\alpha=\boldsymbol\sigma\mathbf S\);
3. measure the magneto-optical dielectric tensor and continue a causal fit to imaginary frequency;
4. predict the distance-, temperature- and angle-dependent Casimir force or torque with no force-data refit;
5. reverse magnetic order, temperature gradient, sample orientation and boundary order separately;
6. include electrostatic patches, roughness, thermal gradients and ordinary magnetic backgrounds in one covariance model;
7. compare the observed cross-channel transition surfaces in \((T,\mu,M,\omega,d,\theta)\).

This produces a six-axis admissibility chart rather than a single coefficient.

## Relation to selection

The Casimir channel could become more than a detector if its boundary-dependent free energy changes the stability of an orientation or domain. In that case it may supply a physical contribution to the independent datum \(Y\). The admission criterion is dynamical: adding or removing the boundary must change the measured return-map slope or stationary-state selection in the predicted direction.

A static force, an energy minimum or a Nernst sign by itself is not contractive selection. The programme must measure the map, its fixed point and its approach rate.

## Admission boundary

Admitted:

- representation Casimir as a sector classifier;
- Casimir force as a global boundary-conditioned spectral observable;
- Seebeck as a longitudinal local-spectral guidepost;
- anomalous Nernst as a transverse orientation-sensitive guidepost;
- Onsager--Casimir reciprocity as the transport reversal grammar.

Open:

- a common microscopic carrier and response model for all three observables;
- a protected Casimir-label feature surviving into both transport and boundary force;
- a no-refit force prediction from independently measured optical and transport response;
- boundary-induced change of the selector return map;
- any promotion to fundamental \(Spin(2,3)\) dynamics.

The next gate is a same-film no-refit experiment: use measured electrical, thermoelectric and magneto-optical tensors to predict a distance- and orientation-dependent Casimir force or torque, then test whether the boundary also changes domain or projector selection dynamics.

