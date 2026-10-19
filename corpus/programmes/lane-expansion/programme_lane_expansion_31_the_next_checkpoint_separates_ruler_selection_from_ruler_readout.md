# Result 31: the next checkpoint separates ruler selection from ruler readout

## The ordinary-language picture

The programme has built a ruler and found an experiment that can read part of it. Two questions remain:

1. **Who marked the ruler?** The Furey incidence structure fixes which sector is the zero mark, but two natural ways of counting repeated response components put different marks on the charged-lepton sector.
2. **Can the laboratory read every mark?** Kaon production and ALP lifetime read the top--lepton part well. Present data barely read the bottom mark.

These are independent failures. More experimental fitting cannot decide which algebraic counting rule is canonical, and more algebra cannot manufacture bottom sensitivity in existing data.

## Checkpoint A: select or reject an incidence metric

The immediate algebraic calculation is to place the deduplicated and multiplicity-preserving incidence maps in the same response space and test three candidate sources of an inner product:

- the positive absorptive spectral measure already constructed from physical thresholds;
- the trace form inherited from the Furey ternary-operator representation;
- the quadratic form obtained from a declared source action after conserved-current directions are quotiented.

For each candidate, calculate the adjoint incidence operator and its sector weights without inserting the desired coefficients by hand.

**Go:** one independently motivated construction selects the same contraction under allowed basis changes and regulator choices.

**No-go:** the contraction changes with an arbitrary state, trace normalization, subtraction or source calibration. The honest algebraic output is then a family of rays sharing the sterile-neutrino kernel, not one ray.

## Checkpoint B: fit only what present data can see

The eight UV coefficients reduce at low mass to five physical coordinates,

\[
(c_{u_R}-c_{q_L},\ c_{d_R}-c_{q_L},\ c_{e_R}-c_{\ell_L},\ c_G^{\rm eff},\ c_\gamma^{\rm eff}).
\]

Production and total lifetime resolve only three directions at percent-level relative precision and four at per-mille precision. The next likelihood should therefore be a reduced-rank fit, not an eight-dimensional scan.

Its near-term claim is deliberately limited:

> At fixed mass, do kaon/B production and lifetime distinguish the incidence-family top--lepton relation from equal-axial and top-only ALP benchmarks after the experimentally active gauge nuisance directions are profiled?

**Go:** the profile likelihood separates these restricted rays across a nontrivial mass interval.

**No-go:** gauge, flavor-embedding or acceptance nuisance directions continuously connect them.

## Checkpoint C: demand a genuine bottom compass

At 100 MeV and \(f=10^6\) GeV, the incidence prediction for
\(\Upsilon(1S)\to\gamma a\) is \(4.89\times10^{-10}\), while the represented Belle invisible bound is \(1.07\times10^{-6}\). The branching-ratio gap is about 2190.

A background-free extrapolation would require roughly 2190 times the effective sample to close that gap. A background-dominated extrapolation could require roughly \(2190^2\simeq4.8\times10^6\) times the sample. These are feasibility scales, not forecasts.

**Go:** an existing or realistically projected bottom-sensitive observable reaches the \(10^{-9}\)--\(10^{-10}\) branching-ratio scale, or constrains the same bottom coordinate indirectly at comparable ALP scale.

**No-go:** all bottom-sensitive probes remain orders of magnitude behind the kaon/lifetime reach. The full fermion ray is then not measurable in this regime.

## Separate work package: direct current source

The derivative-pseudoscalar ALP completion is now calculationally concrete. It does not compute the anomalous-dimension matrix of the original direct vector source. That calculation remains separate and retains its own gate: a stable quotient under scheme changes, or a proof that no such preferred running plane exists.

## Paper boundary

A paper can now be scoped around a reduced-rank, scale-free test of restricted UV ALP rays, together with the identifiability audit and the quantified missing-bottom direction. It cannot yet claim:

- derivation of a unique Furey ALP ray;
- reconstruction of the full top--bottom--lepton pattern from current data;
- evidence that Spin(2,3), Jordan algebra or E8 is fundamental.

## Reproduction

- Identifiability driver: `scripts/run_programme_alpaca_local_identifiability.py`
- Incidence comparison: `scripts/run_programme_incidence_alpaca_comparators.py`
- Bottom compass: `scripts/run_programme_alpaca_bottom_compass.py`
- Compact data: `programme_alp_identifiability_summary.json`
- Certificate: `verification/verify/verify_programme_alp_identifiability_summary.mjs`
