# Photonic selector chip: coupled-mode preflight and fabrication boundary

**Date:** 25 October 2026  
**Status:** coupled-mode design window established; fabrication admission remains open  
**Topics:** OT-002, OT-003, OT-037  
**Parents:** [robustness window](admissibility_27_robustness_window_for_projective_return_coherent_holonomy_and_selection.md), [platform triage](admissibility_28_platform_triage_for_the_quarter_turn_contraction_experiment.md)  
**Evidence:** [machine-readable sweep](../../../evidence/data/admissibility-photonic-selector-chip-sweep-v1.json)  
**Generator:** [coupled-mode sweep](../../../scripts/run-admissibility-photonic-selector-chip-sweep.mjs)  
**Verifier:** [preflight certificate](../../../verification/admissibility/verify_photonic_selector_chip_sweep.mjs)

## Result

The four-waveguide silicon-nitride architecture is a credible carrier for the corpus's rank-two dark subspace, but it is not yet a fabrication-ready realization of the exact quarter-turn-plus-selector experiment. The coupled-mode model does identify a nonempty numerical window. It also exposes two conflicts hidden by the phrase “implement the holonomy on a chip”:

1. the exact analytic budget requires a large coupling–length product while splitting and differential loss accumulate with that same product;
2. a passive selector strong enough to contract one orientation is itself a splitting or differential-loss mechanism and cannot remain hidden inside the nominally neutral holonomy stage.

The correct device is therefore modular: a calibrated holonomy stage, an external phase reference and a separately switched or spatially separated selector stage.

## Published anchor and firewall

Chen et al. report a four-waveguide, two-layer silicon-nitride-on-insulator device with an approximately (5\times2\times600\,\mu\mathrm m^3) SO(2) footprint, (800\times450\,\mathrm{nm}^2) waveguide cross-sections, more than (100\,\mathrm{nm}) operating bandwidth, less than (2\,\mathrm{dB}) insertion loss, matrix fidelities from (0.991) to (0.999), and approximately (95\%) simulated output power in the dark subspace. The paper supplies the architecture and experimental precedent. It does **not** report, in the units this corpus needs, the coupling scale (\kappa_0), residual dark-doublet split (\delta/\kappa_0), or differential dark-mode attenuation (\gamma/\kappa_0).

Those missing quantities are not inferred from total insertion loss or matrix fidelity. The source is Y. Chen et al., [*High-dimensional non-Abelian holonomy in integrated photonics*](https://pmc.ncbi.nlm.nih.gov/articles/PMC12006547/) (2025).

## The dimensionless design window

For the exact latitude used in AZ-026,

\[
s=\frac{\sqrt7}{4},\qquad
\epsilon_{\rm ad}=\frac{2\pi s}{\kappa_0L}.
\]

The reference requirement (\epsilon_{\rm ad}\le 0.02) gives

\[
\boxed{\kappa_0L\ge207.7968.}
\]

At the published (L=0.6\,\mathrm{mm}) footprint this would require

\[
\kappa_0\ge346.33\,\mathrm{mm}^{-1}.
\]

That number is a translation of the corpus tolerance, not a reported property of the published device. A longer illustrative design with

\[
\kappa_0=20\,\mathrm{mm}^{-1},\qquad L=12\,\mathrm{mm},
\qquad \kappa_0L=240
\]

has (\epsilon_{\rm ad}=0.01732). With assumed—not measured—ratios

\[
\frac{\delta}{\kappa_0}=\frac{\gamma}{\kappa_0}=10^{-4},
\]

the integrated splitting and differential-loss budgets are both (0.024<0.05). The numerical propagation retains (0.999689) of the surviving power in the dark subspace, gives log singular-value ratio (0.01174), and fits a projective quarter-turn with phase-blind fidelity (0.999983). Reversing the path flips the externally referenced antisymmetric transfer amplitude.

This is a coupled-mode feasibility witness. It is not a prediction that a fabricated 12 mm device has those ratios.

## Why slower eventually stops helping

The adiabatic error decreases as (1/(\kappa_0L)), but splitting and differential loss accumulate as

\[
\epsilon_\delta=\frac{\delta}{\kappa_0}\kappa_0L,
\qquad
\epsilon_\gamma=\frac{\gamma}{\kappa_0}\kappa_0L.
\]

At (\kappa_0L=240), each relative imperfection must therefore be below

\[
\frac{0.05}{240}=2.083\times10^{-4}.
\]

The earlier (2.406\times10^{-4}) headline is attained only at the fastest allowed adiabatic loop, (\kappa_0L=207.7968). Making the device longer tightens the permitted residual split and loss. The feasible region is a wedge, not an instruction to increase length indefinitely.

## The sign-of-coupling gate

The exact constant-latitude schedule

\[
\boldsymbol\kappa(z)=\kappa_0
\left(
s\cos\frac{2\pi z}{L},
s\sin\frac{2\pi z}{L},
c
\right)
\]

uses signed coupling components. Ordinary passive evanescent couplings controlled only by positive gap distances do not automatically implement those signs. The published work realizes angles below (\pi/2) in its ordinary SO(2) devices and treats the limiting quarter-turn through a distinct construction. Therefore the numerical latitude is a control-level model, not yet a lithography file.

Three honest reopen routes remain:

- add independently calibrated (\pi)-phase sections or auxiliary paths that realize signed effective couplings;
- cascade two returned SO(2) modules calibrated to angles summing to (\pi/2), with a reversed copy of the full cascade;
- replace the latitude by a positive-octant or braiding path and rerun the full-wave and robustness calculations.

If two modules each retain (95\%) dark power, their naive combined retention is (0.95^2=0.9025). That arithmetic does not certify coherent fidelity or differential loss; it merely exposes the cascade cost.

## Why the phase reference is part of the detector

Within the isolated dark doublet, (R(+\pi/2)=-R(-\pi/2)). A phase-insensitive or globally phase-quotiented process fidelity therefore assigns the same value to both orientations. Reversal becomes a signed record only against a bright channel, local oscillator, reference arm, or another declared phase convention. The detector is not an afterthought: it decides whether the central sign remains observable or is quotiented away.

The required record is the full complex (2\times2) transfer matrix together with the reference-channel phase, not output intensities alone.

## Why the selector must be a separate stage

A passive anisotropic section can prefer one dark direction, but it does so through differential phase, loss, or coupling. Leaving that section active during the loop spends the same (\delta) or (\gamma) budget used to certify neutral geometric transport. It can then counterfeit “selection” by ordinary mode filtering.

The admissible architecture is:

1. calibrate (Y) without using the selected-state outcome;
2. run the holonomy stage with (Y) off and measure closure, complex transfer and nonunitarity;
3. switch or spatially separate the (Y) stage;
4. use measurement-conditioned reinjection, or a separately declared dissipative cascade, to iterate the return map;
5. compare (Y)-off and (Y)-on multi-initial-condition slopes.

This preserves the distinction between **transport** and **choice**. A single passive transfer matrix may realize either a nearly neutral holonomy or a strong attracting filter, but it cannot silently count as both.

## Admission matrix

| Layer | Filled | Still required |
|---|---|---|
| algebra | exact dark doublet and SO(2) holonomy | none for the coupled-mode carrier |
| dimensionless dynamics | nonempty (\kappa_0L,\delta,\gamma) wedge | colored noise and correlated fabrication errors |
| measured-unit design | illustrative (20\,\mathrm{mm}^{-1}\), 12 mm schedule | measured (\kappa(z),\delta,\gamma) for one process |
| fabrication path | three explicit reopen routes | signed-effective-coupling or positive-path layout |
| detector | complex transfer, reversal and reference requirements | port/reference layout and covariance |
| selector | separate-stage logic and controls | physical (Y), switching and reinjection implementation |
| validation | reproducible coupled-mode sweep | full-wave model and tolerance ensemble |

## Implications

This result narrows the programme in a useful way. Integrated photonics remains the nearest carrier, but “fabrication-ready” was premature. The first useful engineering deliverable is now unambiguous: a full-wave model for a positive-coupling or phase-assisted two-module layout, with the three missing rates extracted rather than hidden inside one fidelity number. If that model finds a tolerance window, the programme has a buildable detector of the admission–transport distinction. If it finds none, the strict quarter-turn design is closed for this passive platform and the fast-holonomy or active-modulation branch becomes the rational next move.

No outcome here is evidence for a fundamental Spin(2,3) symmetry, a microscopic selector, or new physics. It is theoretical engineering: it says exactly where to look, which numbers must be measured and which apparently similar mechanisms must not be conflated.

## Reproduction

~~~powershell
node scripts/run-admissibility-photonic-selector-chip-sweep.mjs --write
node verification/admissibility/verify_photonic_selector_chip_sweep.mjs
~~~
