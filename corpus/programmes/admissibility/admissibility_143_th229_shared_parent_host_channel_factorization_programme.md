# The thorium-229 bridge is a factorization test, not a group search

**Date:** 26 October 2026  
**Status:** decision-complete analysis programme; public-data feasibility partly established; laboratory extension externally controlled  
**Parents:** [priority assessment](admissibility_141_observer_horizon_and_nuclear_priority_for_next_insight.md), [transition-operator ledger](admissibility_127_transition_operators_selection_rules_and_lifetime_frontier.md)  
**Machine contract:** [focused programme register](../frontier-physics-targets/th229_kerr_decision_programmes_v1.json)

## Reason for this experiment

The useful object is not an isolated nuclear line. It is a nested system: one nuclear transition is prepared through light, embedded in a crystal site, modified by temperature and defects, coupled to radiative and non-radiative channels, and reduced to counts, transmission and a clock error signal. This is unusually close to the corpus's central question: can what belongs to the parent be separated from what the surroundings and detector add?

The standard theory already expects host shifts, quadrupole splitting, inhomogeneous broadening, quenching and detector noise. Finding any of them is not new physics. The sharper test is whether one shared nuclear block can predict unlike records in independently prepared hosts after host and detector terms are calibrated independently.

## Public-data boundary

Two current releases make a real first pass possible. Hu et al. release the data and figure scripts for the 2026 clock at [Figshare](https://doi.org/10.6084/m9.figshare.33386191). The independent Vienna clock releases supporting data at [Zenodo](https://doi.org/10.5281/zenodo.22657608). Earlier excitation, lifetime, temperature and controlled-quench results provide additional published constraints.

These releases justify an immediate **release audit and reanalysis**. They do not yet guarantee a valid cross-host hierarchical fit. That requires point-level spectra or time series, acquisition metadata, calibration uncertainty, site assignment and covariance that may not all be present. Missing fields are external blockers to the full fit, not permission to digitize plots and pretend the covariance is known.

## Model in things before names

For record type \(r\), host or site \(h\), intervention \(u\) and detector \(d\), write

\[
y_{rhud}=\mathcal D_{rd}\!\left[
  \mathcal C_{rhu}\!\left(\theta_{\rm nuc},\theta_h,\theta_u\right)
\right]+\epsilon_{rhud}.
\]

- \(\theta_{\rm nuc}\) contains only quantities asserted to travel with the nucleus: a common reference transition and declared reduced nuclear parameters.
- \(\theta_h\) contains crystal-site fields, shifts, broadenings, defect populations and local non-radiative channels.
- \(\theta_u\) contains measured temperature, polarization, optical or X-ray preparation and quench settings.
- \(\mathcal D_{rd}\) contains the PMT or phototube response, bandwidth, dead time, lock-in/filter transfer and clock-servo rule.

The saturated comparator gives every dataset its own line centre, width and lifetime. The factorized model earns its keep only if fewer shared parameters predict held-out records at competitive predictive score.

## Frozen split

1. **Training:** one excitation spectrum and lifetime dataset from one CaF2 site class, plus independently measured detector calibration.
2. **Internal validation:** held-out temperature, polarization, spatial position or feedback interval from the same apparatus.
3. **External validation:** an independently fabricated crystal, site class, thin film or other declared host.
4. **Channel intervention:** a controlled optical or X-ray depopulation arm, with the intervention timing and dose hidden during training.

The split is by specimen or intervention, not by randomly shuffling points from the same scan.

## Four gates

### Build gate

Pass only if each release has checksums, machine-readable point-level records, units, timestamps or scan order where needed, detector settings and a reconstructable figure or headline estimate. Otherwise report exactly which field prevents the fit. Figure reproduction alone is a build check, not a physics result.

### Bridge gate

Pass only if the shared nuclear block and host/channel terms are identifiable under the frozen split; the transported quantities predict at least one external-host frequency or lifetime record without being refit; and the factorized model beats or matches the saturated per-sample model under a declared predictive score with complexity penalty.

This would validate the **parent / surroundings / record decomposition** as useful. It would not identify a Jordan algebra, \(Spin_0(2,3)\), a seam-triggered decay or a universal admissibility law.

### Physics gate

A residual can enter a new-physics lane only if it:

1. survives detector, temperature, position, site-population and line-shape alternatives;
2. repeats in an independently prepared sample or apparatus;
3. follows a predeclared control coordinate rather than an after-the-fact one;
4. is incompatible with a quantitative conventional nuclear-plus-material model; and
5. has a proposed interaction whose sign, scaling and companion nulls were fixed before the confirming data were opened.

### Propagation gate

Every outcome changes a named part of the programme:

| Outcome | Interpretation | Propagation |
|---|---|---|
| shared-parent prediction succeeds | factorization is practically useful | promote OT-053 from design to calibrated bridge; export the ledger to one generic open-nuclear hostile control |
| only host-specific fits succeed | material/site description is incomplete | retain metrology; demote the corpus bridge; improve host and defect modelling |
| stable residual appears in one release | candidate anomaly | freeze it; preregister an independent replication; do not call it new physics |
| residual replicates and defeats conventional controls | new-physics candidate | open a typed interaction model and companion-null programme; still no automatic Jordan/Spin promotion |
| required metadata are absent | external data boundary | publish the missing-field request and stop inference at figure reproduction |

## Sensitivity and no-go rule

Sensitivity is defined in prediction space: simulate the smallest host-invariant shift, lifetime component or controlled-quench effect recoverable after the full covariance and multiplicity penalty. The analysis is not decision-complete until that injection/recovery curve exists.

**No-go for the bridge:** if transported nuclear parameters are non-identifiable, external-host prediction fails, or host and detector freedom span the proposed residual, the shared-parent corpus bridge is not supported by these data. The platform remains important nuclear metrology.

## Implication

This is the closest current route to an honest improvement in the corpus's theoretical engineering: it can show whether a parent, its allowed channels and its detector closure can actually be kept apart in a deeply nested physical system. A success improves the method. A controlled failure tells us exactly where the factorization breaks. Only a replicated, convention-resistant residual would point beyond that engineering result.

