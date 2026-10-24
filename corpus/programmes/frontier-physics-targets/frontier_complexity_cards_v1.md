# Complexity cards for the active frontier

**Date:** 25 October 2026  
**Status:** target-level audit complete; packet-level enforcement remains live  
**Machine authority:** [complexity-card register](frontier_complexity_cards_v1.json)  
**Verifier:** [complexity-card verifier](../../../verification/frontier-physics-targets/verify_frontier_complexity_cards.mjs)  
**Open topic:** OT-021

## Result

The first mandatory five-part resource audit is complete for FPT-001 through FPT-010 and FPT-022. It separates five questions that the earlier four-entry rule partly collapsed: whether the object can be shown to exist, whether it can be prepared, whether enough instances can be sampled, whether the declared distinction can be detected, and whether a genuinely independent route can verify it.

The result is useful because the frontier is not uniformly hard. Most proposed records are polynomial once a small carrier has been prepared. The hard walls occur elsewhere: the FPT-004 many-body carrier remains exponential through its Hilbert-space dimension; generic FPT-009 logical tomography is exponential in the number of logical qubits; matched-material yield in FPT-003 and several device lanes is empirically unknown; and the continuum or truncation convergence behind FPT-008 and FPT-010 is not bounded. FPT-022 is exact at four modes but that constant-size theorem is not itself a scaling theorem.

## Reading rule

A favorable cell means only that the named stage has a polynomial route under its stated basis. It does not promote the target, prove the apparatus exists, or make an unknown approximation error small. A question mark is a retained boundary, not missing prose. The baseline sample law `s = O(epsilon^-2)` assumes independent noise; drift, correlation, rare events and conditioning can make the real requirement worse.

## Frontier heat map

| Target | Existence | Preparation | Sampling | Detection | Verification | Verdict |
|---|---|---|---|---|---|---|
| FPT-001 | polynomial | empirical ? | polynomial | polynomial | polynomial | conditionally scalable |
| FPT-002 | polynomial | polynomial | polynomial | polynomial | polynomial | polynomial for declared library |
| FPT-003 | polynomial | empirical ? | polynomial | polynomial | polynomial | measurement polynomial material scaling unknown |
| FPT-004 | exponential | exponential | exponential | polynomial | exponential | exponential compute wall |
| FPT-005 | polynomial | empirical ? | polynomial | polynomial | polynomial | conditionally polynomial |
| FPT-006 | polynomial | polynomial | polynomial | polynomial | polynomial | polynomial linear regime |
| FPT-007 | polynomial | polynomial | polynomial | polynomial | polynomial | polynomial for sparse single particle carriers |
| FPT-008 | limit ? | empirical ? | polynomial | polynomial | polynomial | observable polynomial microscopic origin unknown |
| FPT-009 | polynomial | limit ? | polynomial | exponential | polynomial | polynomial stabilizer sector exponential generic sector |
| FPT-010 | limit ? | polynomial | polynomial | polynomial | limit ? | finite relaxations polynomial convergence unknown |
| FPT-022 | fixed only | polynomial | polynomial | polynomial | polynomial | fixed four mode exact scaling conditional |

## What the map says

- **Nearest clean build:** FPT-022. The four-mode experiment has constant-size exact predictions and a polynomial resolved-readout challenge. Its open risk is calibration and conditioning, not hidden state-space size.
- **Nearest general method:** FPT-002. For a finite preregistered mechanism library, nuisance-projected design and blind held-out challenges are polynomial. The result does not extend to every imaginable mechanism.
- **Most consequential compute wall:** FPT-004. Matrix-free KPM changes constants and memory behavior but does not remove the exponential growth of `D(n)`.
- **Most dangerous verification shortcut:** FPT-009. A stabilizer/symplectic certificate is efficient; generic logical tomography costs `O(4^k)`. The programme must remain inside a source-restricted witness set or say that it has crossed that wall.
- **Most important unknown that is not computational:** FPT-003. The equations are tractable; reproducible same-film preparation, optical-tail closure and nuisance floors decide the experiment.
- **Strongest theorem-risk:** FPT-010. Solving each finite relaxation is not a convergence theorem and does not establish that a new inequality differs from standard positivity in the limit.

## Full cards

### FPT-001 — Open-system contractive selection

**Verdict:** conditionally scalable.

The certified three-mode selector is fixed-size exact. A scalable selector remains polynomial only with local or low-rank system identification; unrestricted process tomography grows exponentially with carrier dimension.

| Stage | Class | Scaling statement | Error boundary | Basis |
|---|---|---|---|---|
| existence | polynomial | local return-map and stability certificates use sparse O(n^3) linear algebra | controlled by residual and spectral-gap bounds | exact finite return map and Hessian certificates |
| preparation | empirical ? | O(n) calibrated local components if a modular carrier exists; yield and cross-talk scaling are unmeasured | calibration and fabrication errors | platform proposal only |
| sampling | polynomial | O(k epsilon^-2) trajectories per initial-condition family under independent-noise sampling | shot noise plus mixing and drift bias | trajectory-resolved return protocol |
| detection | polynomial | O(m k epsilon^-2) for the declared projector, phase and population records | detector folding and finite bandwidth | restricted sufficient record |
| verification | polynomial | O(n^3 + m k epsilon^-2) for local transfer reconstruction, held-out initial states and datum-removal control | confidence interval on contraction and neutral-manifold control | independent system-identification path; full process tomography is excluded |

**Independent check:** Fit local transfer elements on one set of trajectories, predict held-out initial projectors, then remove the second datum and recover neutral orientation.

**Stop rule:** The only verification route is unrestricted process tomography, or apparent contraction vanishes under held-out initialization and loss controls.

**Sources:** [admissibility_26_three_mode_quarter_turn_and_two_datum_contraction.md](../../../corpus/programmes/admissibility/admissibility_26_three_mode_quarter_turn_and_two_datum_contraction.md); [admissibility_38_measurement_creates_branches_not_unique_unconditional_selection.md](../../../corpus/programmes/admissibility/admissibility_38_measurement_creates_branches_not_unique_unconditional_selection.md).

### FPT-002 — Inverse detector design and equivalence classes

**Verdict:** polynomial for declared library.

Inverse detector design is tractable for a finite preregistered mechanism library and differentiable nuisance model. It is not a global injectivity theorem over unrestricted mechanisms.

| Stage | Class | Scaling statement | Error boundary | Basis |
|---|---|---|---|---|
| existence | polynomial | O(p^3 + m p^2) for Fisher/Schur rank tests | local-linearization residual | efficient-score and nuisance-projection theorem |
| preparation | polynomial | O(m) control settings for a declared candidate detector | control calibration | finite design matrix |
| sampling | polynomial | O(m epsilon^-2) baseline, multiplied by mixing time or rare-event factor | sampling variance and model discrepancy | finite held-out mechanism library |
| detection | polynomial | O(s m p) score evaluation after forward simulation | nuisance projection and detector-response calibration | raw-record likelihood |
| verification | polynomial | O(L m s) for L preregistered mechanisms plus adversarial held-out pairs | finite-library coverage error remains explicit | blind simulation challenge and independent nuisance fit |

**Independent check:** A second implementation generates blinded raw records from held-out mechanisms; the proposed added channel must separate them after nuisance refitting.

**Stop rule:** The target score lies in the nuisance span, or success depends on an unrestricted hidden oracle choosing the correct mechanism family.

**Sources:** [admissibility_35_adversarial_detector_equivalence_atlas.md](../../../corpus/programmes/admissibility/admissibility_35_adversarial_detector_equivalence_atlas.md); [739_detector_folding_is_a_positive_markov_compression_that_can_only_contract_cp_fisher_information.md](../../../corpus/claims/0700-0799/739_detector_folding_is_a_positive_markov_compression_that_can_only_contract_cp_fisher_information.md).

### FPT-003 — Same-carrier thermoelectric--Casimir closure

**Verdict:** measurement polynomial material scaling unknown.

Tensor acquisition, Lifshitz propagation and differential-force sampling are polynomial in the declared grid and precision. Reproducible matched-film preparation and broadband tail control do not yet have a defensible asymptotic law.

| Stage | Class | Scaling statement | Error boundary | Basis |
|---|---|---|---|---|
| existence | polynomial | O(k p^3) causal tensor fitting and quadrature on a fixed model family | frequency-grid, analytic-continuation and model-tail error | causal response plus Lifshitz forward model |
| preparation | empirical ? | matched-film yield versus area, thickness and domain count is not established | sample mismatch, domains, roughness and contamination | same-carrier requirement |
| sampling | polynomial | O(k m epsilon^-2) spectroscopy and force repeats before drift overhead | correlated drift may exceed shot-noise scaling | finite frequency, angle and separation grid |
| detection | polynomial | O(k m) calibrated transport/optical/force records per sample | bandwidth, patches and magnetic backgrounds | differential parallel-minus-antiparallel observable |
| verification | polynomial | O(k p^3 + k m epsilon^-2) no-refit prediction on held-out separations and angles | propagated tensor covariance plus nuisance envelope | independent force apparatus and matched witness films |

**Independent check:** Freeze the tensor and covariance before force data are opened; predict held-out angle/separation bins and repeat on a witness film from the same growth run.

**Stop rule:** Allowed optical tails, patch potentials, domains or ordinary magnetic forces span the signal, or material matching requires post-force refitting.

**Sources:** [admissibility_31_same_carrier_platform_closure_for_casimir_thermoelectric_response.md](../../../corpus/programmes/admissibility/admissibility_31_same_carrier_platform_closure_for_casimir_thermoelectric_response.md).

### FPT-004 — Two-current Planckian transport

**Verdict:** exponential compute wall.

Exact and matrix-free source-native calculations remain exponential in site count through D(n), even when polynomial in the represented Hilbert dimension. Low-frequency thermodynamic rank is therefore externally gated by symmetry reduction, distributed typicality or a new approximation theorem.

| Stage | Class | Scaling statement | Error boundary | Basis |
|---|---|---|---|---|
| existence | exponential | D(n) grows combinatorially at fixed filling; exact diagonalization is at least polynomial in D(n) | zero for the finite oracle but no thermodynamic inference | source-native many-body carrier |
| preparation | exponential | state/vector memory O(D(n)); sparse Hamiltonian and current assembly O(poly(n) D(n)) | operator convention exact after source audit | compiled symmetry sector still exponential asymptotically |
| sampling | exponential | KPM/typicality O(r k poly(n) D(n)) with stochastic-vector count r | O(r^-1/2) stochastic plus kernel, broadening and finite-size bias | common-sample matrix-free estimator |
| detection | polynomial | O(k) once the 2x2 spectral block is produced | frequency-window and normalization error | determinant and normalized determinant are low-dimensional records |
| verification | exponential | independent exact small-cluster reconstruction plus sum rules; larger-size reproduction inherits D(n) | gauge, moment and size residuals remain separately bounded | exact oracle, continuity identities and independent estimator |

**Independent check:** Reproduce the 3x3 block/cross spectrum on exact clusters, enforce sum rules and gauge convergence, then compare an independently compiled common-sample estimator.

**Stop rule:** Any claimed scalable result hides D(n), uses different random samples for cross channels, or infers dc rank from integrated moments alone.

**Sources:** [admissibility_48_matrix_free_fixed_density_moment_convergence.md](../../../corpus/programmes/admissibility/admissibility_48_matrix_free_fixed_density_moment_convergence.md); [admissibility_50_frequency_moment_bounds_and_compute_boundary.md](../../../corpus/programmes/admissibility/admissibility_50_frequency_moment_bounds_and_compute_boundary.md).

### FPT-005 — Phonon, magnon and hybrid-mode laboratories

**Verdict:** conditionally polynomial.

Sparse multimode preparation and transfer reconstruction can scale polynomially; dense all-to-all mode tomography and uncontrolled material disorder can erase that advantage.

| Stage | Class | Scaling statement | Error boundary | Basis |
|---|---|---|---|---|
| existence | polynomial | O(n^3) dense eigensystem or less for sparse local mode models | model truncation and linewidth uncertainty | linear hybrid-mode dynamics |
| preparation | empirical ? | O(n) nominal local resonators/couplers; yield and mode-crowding scaling unmeasured | disorder, cross-talk and damping spread | programmable versus material platforms differ |
| sampling | polynomial | O(k m epsilon^-2) coherent sweeps or lifetime records | drift, finite linewidth and thermal occupation | complex transfer records |
| detection | polynomial | O(n k epsilon^-2) for resolved ports; O(n^2 k epsilon^-2) for dense transfer tomography | port gain/phase and bandwidth | individual complex readout |
| verification | polynomial | O(n^3 + n k epsilon^-2) for model fit plus reversal and scattering controls | held-out frequency and disorder residual | independent damping/scattering model |

**Independent check:** Fit splitting and damping from complex transfer data, then predict loop reversal, temperature dependence and a held-out port without refitting.

**Stop rule:** The claimed geometric signal is reproduced by loss, gain, skew scattering or unresolved mode crowding within the calibrated nuisance model.

**Sources:** [admissibility_33_hybrid_bosonic_carrier_and_adversarial_thermal_hall_frontier.md](../../../corpus/programmes/admissibility/admissibility_33_hybrid_bosonic_carrier_and_adversarial_thermal_hall_frontier.md).

### FPT-006 — Non-Hermitian and Floquet geometry

**Verdict:** polynomial linear regime.

Finite-dimensional non-Hermitian/Floquet reconstruction is polynomial in mode count, settings and precision. This does not identify nonlinear many-body Floquet phases, whose heating and state complexity remain outside the card.

| Stage | Class | Scaling statement | Error boundary | Basis |
|---|---|---|---|---|
| existence | polynomial | O(n^3 k) eigensystem or propagator analysis along a discretized loop | path discretization and conditioning near exceptional points | linear effective generator |
| preparation | polynomial | O(n+k) local elements and programmed loop segments for a sparse carrier | drive and gain/loss calibration | programmable linear platform |
| sampling | polynomial | O(k m epsilon^-2) forward/reverse and rate sweeps | nonadiabatic, drift and transient bias | finite path family |
| detection | polynomial | O(n^2 k epsilon^-2) worst-case left/right transfer reconstruction | biorthogonal condition number amplifies noise | phase-sensitive port tomography |
| verification | polynomial | O(n^3 k + n^2 k epsilon^-2) singular-value, reversal and rate audit | pseudospectral confidence region | independent coherent versus gain/loss decomposition |

**Independent check:** Reconstruct the passive/coherent generator independently of gain/loss, then predict rate and orientation reversal with singular-value controls.

**Stop rule:** Endpoint exchange changes under rate reversal in a way fully explained by nonadiabatic gain/loss while the inferred topology is unchanged.

**Sources:** [admissibility_33_hybrid_bosonic_carrier_and_adversarial_thermal_hall_frontier.md](../../../corpus/programmes/admissibility/admissibility_33_hybrid_bosonic_carrier_and_adversarial_thermal_hall_frontier.md).

### FPT-007 — Defects, domain walls and index-carrying boundaries

**Verdict:** polynomial for sparse single particle carriers.

Sparse single-particle defect models and localized-mode detection are polynomial. Interacting defects, continuum control and the claim that a wall transports information beyond an index are not covered by that favorable scaling.

| Stage | Class | Scaling statement | Error boundary | Basis |
|---|---|---|---|---|
| existence | polynomial | O(n^3) dense spectral flow or sparse polynomial eigensolvers for a finite carrier | finite volume and spectral truncation | single-particle/Fredholm proxy |
| preparation | polynomial | O(n) local couplings and one defect profile in a programmable lattice | wall width, disorder and boundary mismatch | local sparse device |
| sampling | polynomial | O(k s) spectral/transport records with s=O(epsilon^-2) baseline | disorder and lifetime variance | finite parameter sweep |
| detection | polynomial | O(n k epsilon^-2) resolved local intensity/phase records | detector overlap with localized subspace | spatially resolved readout |
| verification | polynomial | O(c n^3) for c homotopic controls plus disorder ensemble | finite control-family coverage | same-index scrambled-information controls |

**Independent check:** Compare the target defect with homotopic same-index controls that scramble phase, endpoint representation or selector data while preserving mode count.

**Stop rule:** Only the protected mode count survives; every proposed extra datum changes under a same-index control or arbitrary boundary choice.

**Sources:** [frontier_wave7_08_when_memory_becomes_a_wall_and_changes_topology.md](../../../corpus/programmes/frontier/wave-7/frontier_wave7_08_when_memory_becomes_a_wall_and_changes_topology.md); [frontier_wave7_13_lambda_provenance_exhaustion_and_reopen_gates.md](../../../corpus/programmes/frontier/wave-7/frontier_wave7_13_lambda_provenance_exhaustion_and_reopen_gates.md).

### FPT-008 — Hydrodynamic stress and multichannel response

**Verdict:** observable polynomial microscopic origin unknown.

A fixed p-channel hydrodynamic response fit is polynomial, but deriving its coefficients and spectral rank from a microscopic strongly coupled carrier can inherit an uncontrolled or exponential many-body cost.

| Stage | Class | Scaling statement | Error boundary | Basis |
|---|---|---|---|---|
| existence | limit ? | effective response algebra O(p^3 k), microscopic derivation not assigned a general scaling | hydrodynamic truncation and constitutive-model error | effective versus microscopic layers kept separate |
| preparation | empirical ? | sample and source preparation depends on the chosen fluid/material carrier | inhomogeneity and boundary conditions | no common platform frozen |
| sampling | polynomial | O(p^2 k epsilon^-2) for all declared auto/cross channels | finite window, correlated noise and long-time tails | linear response matrix |
| detection | polynomial | O(p^2 k) calibrated response records | source/readout mixing and inaccessible stress components | multichannel detector |
| verification | polynomial | O(p^3 k) Ward/KMS/positivity residuals plus held-out cross-channel prediction | model discrepancy remains separate from statistical error | identity checks and independent perturbation channel |

**Independent check:** Fit a subset of auto/cross responses, then predict held-out channels while independently checking Ward identities, KMS relations and positivity.

**Stop rule:** Distinct hidden spectra remain equivalent after every accessible stress probe, or the inferred rank depends on an unmeasured constitutive component.

**Sources:** [admissibility_32_wide_frontier_atlas_and_iterative_research_queue.md](../../../corpus/programmes/admissibility/admissibility_32_wide_frontier_atlas_and_iterative_research_queue.md).

### FPT-009 — Quantum-code and synthetic-gauge emulators

**Verdict:** polynomial stabilizer sector exponential generic sector.

Stabilizer/symplectic certification is polynomial, while generic k-logical-qubit tomography scales as 4^k and unrestricted reachability may require exponential search. Source-restricted generators must be certified without universal tomography.

| Stage | Class | Scaling statement | Error boundary | Basis |
|---|---|---|---|---|
| existence | polynomial | O(n^3) tableau/group closure for declared Clifford-like generators | exact in the finite algebra; excludes generic non-Clifford reachability | finite symplectic shadow |
| preparation | limit ? | compiled word length may be polynomial for declared generators but unrestricted synthesis can grow exponentially | gate synthesis and leakage | source-derived word required |
| sampling | polynomial | O(m epsilon^-2) for selected logical witnesses; generic amplitude estimation is not assumed | SPAM and coherent gate error | restricted witness set |
| detection | exponential | generic logical tomography O(4^k epsilon^-2); stabilizer witnesses remain polynomial | tomographic incompleteness if restricted | explicit favorable/unfavorable fork |
| verification | polynomial | O(poly(n,m,epsilon^-1)) only with generator provenance, randomized/local witnesses and leakage checks | certificate covers the restricted reachable group, not all unitaries | independent compiler and witness schedule |

**Independent check:** Use Wave 7.71's exact reachable and forbidden orbits as preregistered predictions: derive generators from the carrier, compile with an independent implementation, remove each control in turn, and verify held-out logical words with stabilizer witnesses plus leakage records.

**Stop rule:** Success requires O(4^k) unrestricted tomography, exponential word search, or arbitrary universal controls that erase source provenance.

**Sources:** [admissibility_32_wide_frontier_atlas_and_iterative_research_queue.md](../../../corpus/programmes/admissibility/admissibility_32_wide_frontier_atlas_and_iterative_research_queue.md); [admissibility_56_certificate_preserving_descent_and_commuting_square_atlas.md](../../../corpus/programmes/admissibility/admissibility_56_certificate_preserving_descent_and_commuting_square_atlas.md); [frontier_wave7_71_source_restricted_logical_generator_boundary.md](../../../corpus/programmes/frontier/wave-7/frontier_wave7_71_source_restricted_logical_generator_boundary.md).

### FPT-010 — Scattering, causality and positivity bounds

**Verdict:** finite relaxations polynomial convergence unknown.

Each frozen finite bootstrap or moment relaxation can be polynomial in basis dimension b, but b grows with truncation and no corpus result supplies a uniform convergence rate to the physical amplitude region.

| Stage | Class | Scaling statement | Error boundary | Basis |
|---|---|---|---|---|
| existence | limit ? | finite SDP/moment relaxations are polynomial in b at fixed precision; b versus physical accuracy is unproved | truncation and solver tolerance | finite positivity/causality relaxation |
| preparation | polynomial | O(b^2) or greater to assemble moments, crossing equations and known poles for a fixed relaxation | input and discretization error | declared finite basis |
| sampling | polynomial | O(k epsilon^-2) for held-out cross sections or response points | experimental covariance and unfolding | finite observable grid |
| detection | polynomial | O(k p) likelihood evaluation against the allowed region | detector acceptance and nuisance projection | held-out observable |
| verification | limit ? | repeat under basis enlargement and independent standard-bound derivation; cost polynomial in each b but limit rate unknown | relaxation gap and reparameterization risk | independent theorem comparison |

**Independent check:** Prove non-reducibility against the standard unitarity/analyticity/causality/positivity basis, then test monotone stability under basis enlargement and held-out data.

**Stop rule:** The proposed inequality is a reparameterized standard bound or disappears under the next controlled basis enlargement.

**Sources:** [admissibility_25_current_research_frontier_crosswalk.md](../../../corpus/programmes/admissibility/admissibility_25_current_research_frontier_crosswalk.md).

### FPT-022 — Triality quotient scars and hidden-mode recovery

**Verdict:** fixed four mode exact scaling conditional.

The four-mode quotient-scar experiment is constant-size and completely certifiable. A larger cyclic family is polynomial for resolved linear readout, but oriented invariants can become severely ill-conditioned; no favorable asymptotic claim is made for them.

| Stage | Class | Scaling statement | Error boundary | Basis |
|---|---|---|---|---|
| existence | fixed only | exact constant-size four-mode algebra; generalized n-port linear algebra O(n^3) | zero symbolically at four modes | certified finite quotient-scar model |
| preparation | polynomial | O(n) resonators and calibrated sparse couplings for a hub-plus-n-outer extension | cyclic mismatch and coupling disorder | modular resonator proposal |
| sampling | polynomial | O(k n epsilon^-2) individual and summed complex sweeps plus waiting-time records | drift, nonlinear memory and finite bandwidth | resolved port schedule |
| detection | polynomial | O(k n epsilon^-2) resolved records; oriented high-degree invariant conditioning is not bounded | gain/phase calibration and Vandermonde condition number | individual, summed and oriented faces |
| verification | polynomial | O(n^3 + k n epsilon^-2) linear model challenge, symmetry breaking and cyclic reversal at fixed n | model-selection and calibration residual | independent resolved-versus-lumped fit |

**Independent check:** Blindly fit resolved and lumped models, disable detector faces in turn, weakly break cyclic symmetry and require predicted recovery of the two contrast modes and orientation sign.

**Stop rule:** No contrast modes exist under individual readout, or gain, bandwidth, relabeling and ordinary hidden-state nuisances explain the linked signature package.

**Sources:** [frontier_wave6_15_four_mode_quotient_scar_platform.md](../../../corpus/programmes/frontier/wave-6/frontier_wave6_15_four_mode_quotient_scar_platform.md); [frontier_wave6_16_final_exhaustion_and_branch_register.md](../../../corpus/programmes/frontier/wave-6/frontier_wave6_16_final_exhaustion_and_branch_register.md).

## Implication for admissibility

Computational access is itself part of the practical admissibility boundary. A state, mechanism or distinction may exist mathematically yet remain outside the region that can be prepared, retained by a detector and checked without an oracle. This does not make complexity metaphysically prior to physics. It does force every proposed bridge to state where its evidence can actually enter the world as a record.

The cards also show where theoretical engineering improvement is plausible. Sparse system identification, restricted witnesses, common-sample estimators, differential measurements and certificate-preserving descent can move a boundary without invoking new physics. New physics becomes a live interpretation only after those cheaper routes and their nuisance models fail under a preregistered independent check.

## Remaining OT-021 gate

The target-level audit is not full packet-level closure. OT-021 remains an audit until every newly active computational or experimental packet either links one of these cards unchanged or declares a packet-specific replacement with the same five stages, size/error variables, independent verification path and stop rule. The next enforcement step is therefore schema validation at packet admission, not another general essay about complexity.

