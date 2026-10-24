# Planckian two-current execution tranches and literature review

**Date:** 24 October 2026  
**Status:** executed 24 October 2026; see [AZ-041](admissibility_41_planckian_two_current_execution_and_convention_boundary.md)  
**Target:** [FPT-004 assessment](../frontier-physics-targets/frontier_physics_target_assessments_v1.md#fpt-004)  
**Parent:** [Periodic physical energy-current bridge](admissibility_39_periodic_physical_energy_current_bridge.md)  
**Evidence:** [Tranche and literature register](../../../evidence/data/admissibility-planckian-two-current-tranches-v1.json)  
**Verifier:** [Programme-shape verifier](../../../verification/admissibility/verify_planckian_two_current_tranches.mjs)

## Decision

FPT-004 should advance through seven gated tranches. The order is not arbitrary. The audited Planckian-tJ source currently destroys individual support identity while assembling exchange and Ewald diagonal entries. A physical energy current depends on commutators between individually located energy terms, so neither a better FTLM estimator nor a larger calculation can recover that information afterward. The first production change must therefore occur at Hamiltonian assembly.

The governing rule is:

> **No statement about the particle/energy response rank may survive unless it is stable under both an operator-definition audit and an estimator audit.**

This is deliberately stronger than “the code runs.” A cone-interior result that moves under energy repartition is an operator-convention result; a rank-one result that moves under shared-random-vector resampling or broadening is an estimator result. Neither is yet physics.

## Tranche map

| Tranche | Purpose | Required output | Exit gate | Failure branch |
|---|---|---|---|---|
| T0 | Freeze the already closed oracle baseline. | Machine-readable dense/sparse, continuity, positivity and determinant fixtures. | All present AZ-039 checks reproduce from a clean run. | Stop and repair the oracle; do not touch production code. |
| T1 | Preserve term provenance in the production two-dimensional builder. | One emitted record per hopping, exchange and density term with family, support, centre, oriented displacement and winding. | Summed tagged terms equal the legacy Hamiltonian entry-for-entry for source-native small clusters and every flux. | If equality fails, split assembly from coefficient application before proceeding. |
| T2 | Resolve the periodic and long-range current convention. | Minimum-image, oriented-seam and energy-twist implementations over the same tagged Hamiltonian. | Hermiticity, continuity, translation covariance, seam tests and open-limit reduction pass; convention differences are either numerically negligible for transport or identified as admissible gauge/total-derivative terms. | If Ewald terms remain ambiguous, quarantine them: compare finite-range cutoffs and explicit image-resolved terms rather than selecting a sign silently. |
| T3 | Integrate the physical operator into the existing spectral engine. | Common-sample spectra for (J_N), (J_E), and (J_N+J_E), retaining the complex cross spectrum before taking its symmetric part. | Exact diagonalization and FTLM agree on source-native clusters within declared stochastic, Lanczos and binning errors. | If three-run reconstruction is noisy, add a native cross-correlator or block estimator before scanning parameters. |
| T4 | Build the validation and uncertainty envelope. | Convergence surfaces over random vectors, Lanczos depth, flux samples, size, temperature, filling, bin width and broadening; plus PSD, detailed-balance and moment/sum-rule residuals. | A preregistered validity region exists in which residuals and uncertainty are below thresholds fixed before rank inspection. | Mark points outside that region “unresolved”; do not interpolate them into a phase diagram. |
| T5 | Produce the physical rank atlas. | (C_{NN},C_{NE},C_{EE}), eigenvalues, determinant and (det C/(operatorname{tr}C)^2) with confidence intervals over the valid region. | Ray, boundary layer and cone interior are distinguishable from zero and from convention/numerical drift. | If classification is unstable, report only bounds on the smaller eigenvalue and identify the dominant uncertainty. |
| T6 | Translate the spectral matrix into thermoelectric observables. | Heat-current basis (J_Q=J_E-mu J_N), longitudinal Onsager coefficients, Seebeck response and open-circuit thermal conductivity, with transverse magnetization terms kept separate. | Basis congruence, Onsager/KMS checks and held-out observable reconstruction pass without refitting the current definition. | If only the matrix geometry is stable, retain the rank result and withhold material thermoelectric claims. |
| T7 | Adjudicate the bridge against conventional physics and the corpus. | A result dossier comparing source-native findings with t-J, FTLM, thermal-current and strange-metal literature. | The outcome is classified as conventional transport, a useful numerical extension, an admissibility-specific discriminator, or unresolved. | Do not infer Spin(2,3) from positivity, a Lorentz determinant or rank alone; require a source-derived transformation law or prediction unavailable to ordinary Kubo theory. |

## T0 — frozen baseline

T0 is short but mandatory. Pin the source revision, Python environment, fixtures, tolerances and the twenty current tests. Store the exact small-cluster spectra and the AZ-039 determinant summaries. This makes the subsequent production refactor a measured change rather than an untraceable rewrite.

**Implication:** this tranche cannot discover new physics. It prevents a later difference from being mistaken for one.

## T1 — production provenance

Refactor `CreateSparseHamiltonian()` so that it can emit a parallel term ledger before duplicate sparse entries are coalesced. Each record must contain:

- interaction family and coefficient channel;
- ordered support sites and local operator kind;
- centre in a declared fundamental cell;
- unwrapped displacement and boundary winding;
- sparse matrix contribution before aggregation; and
- a stable identifier linking the term to the geometry table.

The legacy `matP` array remains useful for coefficients but is insufficient as physical provenance. The non-negotiable test is

\[
H_{\mathrm{tagged}}(\phi_x,\phi_y)=H_{\mathrm{legacy}}(\phi_x,\phi_y)
\]

for every exact-diagonalization-sized cluster, particle sector and tested twist. Compare sparse indices and values, not only eigenvalues.

**Implication:** success closes the current architectural bottleneck. Failure would mean that the source's apparent channel decomposition was not fine-grained enough to define a local energy density without redesign.

## T2 — periodic convention collision

Run three constructions on the identical tagged terms:

1. the AZ-039 oriented minimum-image commutator graph;
2. an explicitly oriented seam/image ledger that retains winding; and
3. an energy-twist or thermal-vector-potential derivative where it can be implemented without circularly assuming the desired current.

Finite-range terms should agree after the declared gauge transformation. The long-range Ewald sector is the real test: Paul and Kotliar show that long-range density interactions contribute explicitly to heat current, while the modern gauge-invariance literature shows why distinct microscopic energy densities may yield the same macroscopic coefficient. Therefore the aim is not to prove that every microscopic current matrix is identical. It is to determine whether their transport spectra agree in the controlled thermodynamic/zero-frequency limit, with any difference accounted for as a bounded total derivative, circulating current or finite-size convention term.

**Implication:** stable transport with operator-level differences is a successful gauge-invariance result, not a failure. Convention-dependent transport is also useful: it blocks the rank claim and identifies exactly where the finite torus or Ewald prescription carries physical ambiguity.

## T3 — common-sample FTLM integration

Use the existing scalar spectral path for the three Hermitian operators

\[
J_N,\qquad J_E,\qquad J_N+J_E,
\]

with identical Hamiltonian, flux realization, random vectors, Lanczos depth, thermal weights and bins. Reconstruct the symmetric cross spectrum only after the three contributions have shared the same stochastic samples. Preserve the complex cross correlator as a diagnostic; dropping its antisymmetric or imaginary part too early can hide a convention, time-reversal or implementation error.

Exact diagonalization is the admission oracle wherever feasible. FTLM is then permitted only inside a validated error envelope. The random-vector count is a statistical control, not a substitute for system-size or low-frequency convergence.

**Implication:** this tranche answers whether the already functioning response machinery can carry the physical operator. It still does not answer the rank question at production scale.

## T4 — validation envelope

Predeclare thresholds and scan axes before looking at the headline determinant. Required checks are:

- Hamiltonian reconstruction and current Hermiticity;
- local continuity and additive-energy-zero invariance;
- seam translation, lattice translation and energy-repartition response;
- spectral Hermiticity and positive semidefiniteness;
- detailed balance/KMS consistency;
- zeroth and available higher spectral moments or thermal sum rules;
- exact-diagonalization versus FTLM residuals;
- random-vector and flux bootstrap intervals;
- Lanczos-depth, size, bin-width and broadening stability; and
- the effective thermal state count or equivalent finite-size temperature floor.

The validity mask is part of the result. Points below the finite-size temperature floor or with an unresolved smaller eigenvalue remain blank rather than becoming a coloured phase.

**Implication:** the filled and unfilled pixels of this mask are literally the numerical admissibility zone—what the calculation is allowed to say, not merely what it attempted to calculate.

## T5 — rank atlas

For every admitted point diagonalize the Hermitian positive matrix

\[
C(\omega)=
\begin{pmatrix}
C_{NN}&C_{NE}\\
C_{EN}&C_{EE}
\end{pmatrix}.
\]

Report both eigenvalues, their correlated uncertainty, the determinant, and the scale-free normalized determinant. Classify a ray only when the upper confidence bound on the smaller eigenvalue is below a preregistered resolution relative to the trace; classify an interior only when its lower bound is positive after all convention and numerical systematics are included. Everything else is a boundary layer.

**Implication:** robust rank two would show that the scalar detailed-balance calculation omitted an independent energy-transport direction. Robust rank one would be more surprising, but it would first demand an ordinary explanation—conservation law, emergent hydrodynamic mode, approximate proportionality of currents or finite-size integrability—before any corpus-level identification.

## T6 — thermoelectric translation

Change basis by congruence from particle/energy to particle/heat current with (J_Q=J_E-\mu J_N). Rank and positivity must be invariant under this invertible basis change, while Seebeck and open-circuit thermal response depend on the corresponding Onsager combinations. Longitudinal coefficients are the first target. Transverse Nernst or thermal-Hall claims require energy-magnetization/circulating-current subtraction and should remain a separate branch.

**Implication:** this is where the matrix becomes experimentally legible. A stable rank result with unstable Seebeck response would still be a valid spectral-geometry result, but not a quantitative thermoelectric prediction.

## T7 — scientific adjudication

The terminal dossier must answer four questions in order:

1. Does the physical current reproduce known exact, sum-rule and small-cluster results?
2. Does it change the published charge-only Planckian interpretation, or merely extend it?
3. Is any low-rank structure enforced by a conventional conservation law or estimator limitation?
4. What additional transformation, scaling law or held-out prediction would make the result specifically informative for the corpus's admissibility programme?

The admissible outcomes are symmetric: stable rank one, stable rank two, a crossover, or an unresolved boundary are all useful. “New physics” is not a fifth numerical label. It requires a failure of the best conventional account plus a positive, independently testable alternative.

## Literature review

### Current construction and transport ambiguity

- Luttinger's mechanical formulation establishes the response-to-thermal-force framework by coupling an external field to energy density. It motivates the energy-twist branch but does not by itself choose a unique lattice energy decomposition. [Luttinger 1964](https://doi.org/10.1103/PhysRev.135.A1505)
- Paul and Kotliar derive thermal current for generalized interacting tight-binding models and explicitly identify a long-range-interaction contribution. This directly supports retaining individual Ewald density terms in T1 and forbids treating them as a harmless diagonal aggregate. [Paul and Kotliar 2003](https://doi.org/10.1103/PhysRevB.67.115131)
- Ercole, Marcolongo, Umari and Baroni show that different microscopic energy gauges can change flux correlation functions while leaving the Green--Kubo thermal conductivity invariant under their stated conservation/extensivity conditions. This is the conceptual basis of the T2 convention-collision test. [Ercole et al. 2016](https://arxiv.org/abs/1601.00158)
- Kapustin and Spodyneiko derive ambiguity-free lattice thermoelectric formulas with additional terms and distinguish symmetric from skew-symmetric response. This cautions against assuming textbook Kubo expressions are automatically complete and supports separating longitudinal T6 from transverse response. [Kapustin and Spodyneiko 2021](https://arxiv.org/abs/2105.01626)
- Qin, Niu and Shi show that circulating energy magnetization must be removed from thermal Hall transport. It is essential for a future Nernst/Hall branch but is not a correction to be inserted indiscriminately into the present longitudinal rank scan. [Qin, Niu and Shi 2011](https://arxiv.org/abs/1108.3879)

### Strong correlations, exact clusters and FTLM

- Jaklic and Prelovsek introduced the finite-temperature Lanczos method using random sampling and applied it to optical conductivity in the t-J model. This is the methodological ancestor of the source calculation and justifies ED as the small-cluster admission oracle. [Jaklic and Prelovsek 1994](https://doi.org/10.1103/PhysRevB.49.5065)
- Prelovsek and Bonca's review makes the relevant limitations explicit: random sampling controls stochastic error, low temperature needs stronger convergence, dynamical response is expensive, and low-frequency resolution is sensitive to finite Lanczos depth. These become mandatory T4 axes rather than footnotes. [Prelovsek and Bonca 2011](https://arxiv.org/abs/1111.5931)
- Schnack, Richter and Steinigeweg find typicality/FTLM estimates reliable across their tested spin systems but slower to converge near the lowest gap. This supports the method while reinforcing the need for a temperature validity floor and random-vector convergence. [Schnack, Richter and Steinigeweg 2020](https://doi.org/10.1103/PhysRevResearch.2.013186)
- Shastry develops finite-frequency thermoelectric coefficients and emphasizes exact cluster spectra for Hubbard and t-J benchmarking; his thermal sum rules supply independent checks beyond visual spectral agreement. [Shastry 2008](https://arxiv.org/abs/0806.4629) and [Shastry 2005](https://arxiv.org/abs/cond-mat/0508711)
- Zotos, Naef and Prelovsek show that in integrable one-dimensional models the energy current can be tied to a conservation law, producing anomalous thermal transport. This is a warning for T5: low rank or a sharp zero-frequency component may reflect conservation/integrability rather than a new response geometry. [Zotos, Naef and Prelovsek 1997](https://doi.org/10.1103/PhysRevB.55.11029)

### Immediate frontier anchor

- Fratini, Duchemin, Ralko and Ciuchi report charge d.c. and optical conductivity for the two-dimensional t-J model using improved FTLM/LTLM resolution, and attribute the Planckian behaviour they observe to the quantum-statistical charge response rather than a temperature-dependent scattering rate. Their public code is the production carrier audited here. The paper does not compute the physical two-current particle/energy matrix, so T1--T7 are a genuine extension rather than a replot of its reported observable. [Fratini et al. 2026](https://doi.org/10.1038/s41567-026-03441-x) and [public source](https://github.com/djfrat/Planckian-tJ)

## Priority and estimated shape

The programme was executed in [AZ-041](admissibility_41_planckian_two_current_execution_and_convention_boundary.md). T0 and T1 pass on source-native small clusters; T2 reaches its explicit quarantine branch because periodic conventions remain transport-distinct; T3 passes as an admission-cluster carriage test; T4 establishes only a provisional small-cluster estimator mask; T5 is unresolved under convention systematics; T6 passes algebraically while withholding material claims; and T7 adjudicates the result as a useful numerical extension rather than new physics.

The shortest plausible route is therefore

\[
\text{freeze}\rightarrow
\text{emit provenance}\rightarrow
\text{collide conventions}\rightarrow
\text{integrate spectra}\rightarrow
\text{bound uncertainty}\rightarrow
\text{classify rank}\rightarrow
\text{translate and adjudicate}.
\]

This route is likely to yield something useful even if the corpus-specific hypothesis fails: a tested physical energy-current implementation for a public two-dimensional t-J FTLM calculation, with explicit long-range, gauge and uncertainty controls, is itself a publishable-quality computational result.

## Admission consequence

AZ-040 did not itself advance the physics verdict beyond AZ-039; its execution did. AZ-041 removes the production-provenance and estimator-carriage bottlenecks, then blocks the physical rank claim at the intended convention gate. The next admissible action is an independent image-resolved Ewald/thermal-twist construction, not a larger scan with the present current. Even a future stable transport-rank result would not be evidence for Spin(2,3) without an additional source-derived law.
