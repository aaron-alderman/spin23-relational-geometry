# Seebeck and anomalous Nernst guideposts for response geometry

**Date:** 24 October 2026  
**Status:** exact response-tensor guidepost; physical identification remains conditional  
**Parent:** [Platform triage](admissibility_28_platform_triage_for_the_quarter_turn_contraction_experiment.md)  
**Evidence:** [Thermoelectric guidepost ledger](../../../evidence/data/admissibility-seebeck-nernst-guideposts-v1.json)  
**Verifier:** [Thermoelectric tensor certificate](../../../verification/admissibility/verify_seebeck_nernst_guideposts.mjs)

## Result

Yes: Seebeck and anomalous Nernst measurements can be used as complementary guideposts through the admissibility zone, provided they are treated as response projections rather than as fundamental invariants.

The pairing is useful because it separates two questions:

\[
\boxed{
\begin{array}{ll}
S_{xx}:&\text{How sharply does longitudinal transport vary with energy?}\\[1mm]
\alpha_{xy}^{A}:&\text{Is there a transverse, time-reversal-odd entropy current consistent with Berry curvature?}
\end{array}}
\]

The anomalous Hall conductivity adds the necessary third guidepost. At low temperature the intrinsic terms obey the Mott relation

\[
\alpha_{ij}
\simeq
-\frac{\pi^2 k_B^2T}{3e}
\left.\frac{\partial\sigma_{ij}(\varepsilon)}{\partial\varepsilon}\right|_{\mu}.
\]

Thus \(\sigma_{xy}^{A}\) samples an occupied-state Berry-curvature integral, while \(\alpha_{xy}^{A}\) emphasizes its energy variation near the chemical potential. They are related witnesses, not duplicate measurements.

## The essential tensor correction

With the convention

\[
\mathbf j=\boldsymbol\sigma\mathbf E-\boldsymbol\alpha\nabla T,
\]

open circuit gives

\[
\mathbf E=\mathbf S\nabla T,
\qquad
\mathbf S=\boldsymbol\sigma^{-1}\boldsymbol\alpha.
\]

For an in-plane isotropic magnetic system,

\[
\boldsymbol\sigma=
\begin{pmatrix}\sigma_{xx}&\sigma_{xy}\\-\sigma_{xy}&\sigma_{xx}\end{pmatrix},
\qquad
\boldsymbol\alpha=
\begin{pmatrix}\alpha_{xx}&\alpha_{xy}\\-\alpha_{xy}&\alpha_{xx}\end{pmatrix},
\]

so

\[
S_{xx}=\frac{\sigma_{xx}\alpha_{xx}+\sigma_{xy}\alpha_{xy}}
{\sigma_{xx}^2+\sigma_{xy}^2},
\qquad
S_{xy}=\frac{\sigma_{xx}\alpha_{xy}-\sigma_{xy}\alpha_{xx}}
{\sigma_{xx}^2+\sigma_{xy}^2}.
\]

A measured Nernst thermopower \(S_{xy}\) is therefore not identical to the intrinsic transverse thermoelectric conductivity \(\alpha_{xy}\). Longitudinal thermopower mixed through the Hall angle can enhance, suppress or reverse it. Simultaneous measurement of the full electrical and thermopower tensors is mandatory.

## Placement in the admissibility map

| Corpus question | Seebeck guidepost | Anomalous Nernst guidepost | Required control |
|---|---|---|---|
| energy dependence | slope of longitudinal transport | slope of transverse Hall structure | chemical-potential and temperature sweep |
| orientation | usually even under magnetic reversal | anomalous component odd under reversal | \(+M/-M\) or trained-domain pair |
| geometry/topology | nonspecific by itself | sensitive to Berry curvature near \(\mu\) | paired anomalous Hall measurement and band model |
| metastability | jumps or history dependence | signed domain-sensitive hysteresis | field-training and sweep-direction audit |
| dynamics | thermal lag and diffusion | transverse amplitude and phase | frequency sweep of modulated heating |
| boundaries | contact and heat-path sensitivity | edge, domain-wall and transverse-gradient sensitivity | geometry reversal and thermal imaging |
| detection | longitudinal voltage channel | transverse null channel | contact-swap and gradient-reversal controls |

This makes the pair especially valuable for locating boundaries between filled and unfilled regions. A sign change, peak or hysteretic branch marks a candidate transition surface; it does not by itself identify whether the cause is topology, a Lifshitz transition, magnetic reconstruction, scattering, phonon drag or domains.

## Connection to the existing two-current cone

The corpus already places the particle/energy spectral response in a positive \(2\times2\) cone. Replacing energy current by heat current,

\[
J_Q=J_E-\mu J_N,
\]

is a triangular determinant-one congruence. Seebeck response is then an open-circuit Schur-complement projection of the coupled charge/heat system. This is an exact bridge to the existing response geometry.

The transverse anomalous sector adds an orientation-odd block governed by Onsager--Casimir reversal. It can therefore tell us which sheet or magnetic orientation was selected. It does not establish microscopic \(Spin(2,3)\), and it is not automatically the independent selector \(Y\) of AZ-026. At first it should be used as a readout. Only a calibrated thermomagnetic perturbation shown to change the return-map slope may be promoted to a candidate selector.

## Experimental guidepost protocol

For each temperature, chemical potential or composition, drive frequency and trained magnetic state, measure

\[
\mathcal G=
\left(
\sigma_{xx},\sigma_{xy},S_{xx},S_{xy},
\alpha_{xx},\alpha_{xy},
\kappa_{xx},\kappa_{xy},M
\right),
\qquad
\boldsymbol\alpha=\boldsymbol\sigma\mathbf S.
\]

Then require:

1. reversal of the temperature gradient;
2. reversal of magnetization or magnetic-domain training;
3. electrical-contact exchange and transverse misalignment subtraction;
4. simultaneous Hall data so that \(S_{xy}\) can be unmixed;
5. low-temperature Mott comparison between \(\alpha_{xy}/T\) and \(\partial\sigma_{xy}/\partial\mu\);
6. frequency sweeps to measure thermal lag and diffusion rather than assume quasistatic response;
7. sweep-direction and waiting-time tests to separate equilibrium geometry from metastable domain motion;
8. thickness and disorder series to distinguish intrinsic, side-jump, skew-scattering and boundary contributions.

## Empirical precedents

Mn\(_3\)Sn is a strong orientation guidepost: a large anomalous Nernst signal occurs despite very small net magnetization, and the transverse response reverses with a small magnetic field. This shows why magnetization magnitude alone is not the relevant classifier.

Co\(_2\)MnGa is a strong spectral guidepost: its large anomalous Nernst response and chemical-potential sensitivity are associated with Weyl-band Berry curvature and proximity to a Lifshitz transition. It demonstrates that the Nernst channel can sharply locate energy-space structure, while also showing that the Mott regime must be checked rather than presumed.

Magneto-Seebeck measurements supply a complementary warning: large longitudinal anomalies can arise from energy-dependent lifetimes, magnetic fluctuations, Landau quantization or ordinary band reconstruction. Seebeck is therefore an excellent frontier locator but a weak geometric identifier on its own.

## Admission verdict

The effects are admitted as **guideposts and detectors**, not as foundational identifications.

They can provide:

- a scalar longitudinal coordinate \(S_{xx}\);
- an orientation-odd transverse coordinate \(\alpha_{xy}^{A}\);
- a chemical-potential derivative test through the Mott relation;
- hysteretic memory and domain-state readout;
- a frequency-dependent phase-lag channel;
- a direct bridge to the corpus's two-current response cone.

They cannot alone provide:

- a topological invariant;
- proof that Berry curvature is the unique signal source;
- the non-Abelian holonomy matrix;
- projector closure;
- contractive selection;
- or microscopic \(Spin(2,3)\) symmetry.

The next gate is a joint Hall--Seebeck--Nernst response cube over \((T,\mu,M,\omega)\), with tensor unmixing, reversal parity, Mott residuals and hysteresis explicitly recorded.

## Primary sources

- Ikhlas et al., [*Large anomalous Nernst effect at room temperature in a chiral antiferromagnet*](https://www.nature.com/articles/nphys4181).
- Li et al., [*Anomalous Nernst and Righi--Leduc effects in Mn3Sn: Berry curvature and entropy flow*](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.119.056601).
- Sakai et al., [*Giant anomalous Nernst effect and quantum-critical scaling in a ferromagnetic semimetal*](https://www.nature.com/articles/s41567-018-0225-6).
- Fujishiro et al., [*Large magneto-thermopower in MnGe with topological spin texture*](https://www.nature.com/articles/s41467-018-02857-1).

