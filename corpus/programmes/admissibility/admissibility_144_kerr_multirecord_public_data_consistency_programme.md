# Kerr is a held-out relation test across records

**Date:** 26 October 2026  
**Status:** executable public-data programme; no corpus-algebra bridge presently supplied  
**Parents:** [priority assessment](admissibility_141_observer_horizon_and_nuclear_priority_for_next_insight.md), [Kerr packet](admissibility_138_kerr_separates_horizon_ergosurface_and_superradiant_channel.md)  
**Machine contract:** [focused programme register](../frontier-physics-targets/th229_kerr_decision_programmes_v1.json)

## Reason for this experiment

A Kerr black hole ties several unlike records to the same two remnant quantities, mass \(M_f\) and spin \(a_f\). Inspiral and merger constrain the progenitor and remnant; ringdown frequencies and damping times test the final geometry; mode amplitudes and phases test excitation; horizon absorption and superradiant conditions are related but distinct channel statements. This makes Kerr a strong test of whether one inferred state can predict several records without quietly assigning each record its own fitted dictionary.

The corpus adds no new Kerr prediction yet. Its contribution here is a stricter bookkeeping discipline: horizon, stationary-limit surface, light ring, mode spectrum, absorption and superradiant threshold must not be collapsed into one evocative “rotation” label.

## Public-data boundary

GWOSC releases 4,096 seconds of analysis-ready H1 and L1 strain around GW250114 at 4 kHz and 16 kHz, together with data-quality information. The associated [Zenodo release](https://doi.org/10.5281/zenodo.17018009) supplies posterior products for four waveform families: NRSur7dq4, SEOBNRv5PHM, PhenomXPHM and PhenomXO4a. The [GWOSC release documentation](https://gwosc.org/o4_eventdata_docs/) warns that discovery-paper products can be preliminary and may later be superseded by catalogue releases.

That is enough for an executable public analysis. It is not permission to treat one pipeline's posterior samples as independent data, nor to call agreement among waveform families an independent detector replication.

## Analysis stack

1. Verify checksums, calibration version, data-quality segments and the exact release revision.
2. Reproduce one published inspiral–merger–ringdown posterior summary from released samples.
3. Infer a training posterior for \((M_f,a_f)\) from a declared pre-ringdown or full-signal model without using the held-out ringdown statistic.
4. Push each posterior draw through a standard Kerr quasinormal-mode map to predict held-out complex frequencies.
5. Evaluate H1 and L1 ringdown likelihoods over a preregistered start-time grid.
6. Repeat across the four waveform families and at least one noise or calibration alternative.
7. Fit a deliberately non-Kerr frequency/damping deformation and an environmental or analysis-systematic comparator.

The primary object is a posterior-predictive residual, not a best-fit deviation parameter.

## Four gates

### Build gate

Pass only if the released strain, segments and posterior products are fetched by immutable identifier; one published summary is reproduced within a declared tolerance; and the pipeline records sample rate, conditioning, power spectral density, calibration, waveform version, priors and ringdown start convention.

### Bridge gate

Pass only if a source-derived corpus map names physical operators and predicts a new combination of observables before the GW likelihood is inspected. A resemblance between \(\partial_t+\Omega_H\partial_\phi\) and a compact/split generator pair is not enough. With the current corpus this gate is **not supplied**; the experiment therefore tests Kerr/GR and the corpus's bookkeeping, not \(Spin_0(2,3)\).

### Physics gate

A Kerr deviation becomes a new-physics candidate only if the posterior-predictive residual:

1. is stable across H1 and L1, allowed calibration shifts and data-conditioning variants;
2. persists across the preregistered start-time interval;
3. survives the four waveform families and a flexible environmental/systematic comparator;
4. repeats in another suitable event or an independent record class; and
5. is more predictive than the conventional model after the trials factor and added flexibility are charged.

### Propagation gate

| Outcome | Interpretation | Propagation |
|---|---|---|
| common \((M_f,a_f)\) predicts held-out modes | Kerr survives a stronger no-refit check | tighten deviation bounds; retain the corpus bridge as absent |
| residual tracks waveform or start time | analysis/model systematics | improve waveform, noise or ringdown modelling; no new physics |
| stable single-event residual survives internal controls | candidate anomaly | freeze the statistic and require another event or record class |
| cross-event, cross-model residual survives | gravity new-physics candidate | compare explicit alternative metrics/interactions and companion predictions |
| a source-derived corpus map predicts the residual before fitting | corpus bridge candidate | open a separate intertwiner/action audit; do not merge it with the gravity claim |

## Declared statistics and sensitivity

The primary statistic is a held-out posterior-predictive discrepancy for the complex mode frequencies, jointly across detectors and start times. Secondary statistics include leave-one-detector-out prediction, waveform-family dispersion and the Bayes or predictive-score advantage of Kerr over each declared comparator.

Injection/recovery must report the smallest fractional frequency and damping deviation recoverable at the chosen false-promotion rate after scanning start time and alternatives. A deviation interval is not informative without this power curve.

## Go / no-go

**Go for Kerr consistency:** one training posterior predicts the held-out mode records across detector, start-time and waveform checks.  
**Go for a gravity anomaly:** the replicated residual passes the physics gate.  
**Go for a corpus bridge:** a source-native operator map makes an additional preregistered prediction.  
**No-go:** any residual is absorbed by waveform, noise, calibration, start time or environment, or the claimed bridge exists only by renaming standard Kerr quantities.

## Implication

This path can produce useful physics even when the corpus-specific bridge fails. A null result is a sharper Kerr test and a calibrated lesson in remote detector closure. A systematic-dependent discrepancy improves strong-field inference. A stable replicated discrepancy would be new-physics territory. The Jordan–Lie programme enters only if it first earns a typed map and an additional prediction.

