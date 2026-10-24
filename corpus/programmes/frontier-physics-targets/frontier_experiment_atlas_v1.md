# Frontier experiment atlas v1

**Date:** 2026-10-24  
**Coverage:** 20/20 frontier areas; 49/49 maintained topics; 35/35 detector bundles.

This atlas converts every canonical frontier into a realistic controlled experiment. “Experiment” is used in the broad scientific sense: a laboratory intervention where a physical carrier exists, a reproducible computation where the object is discrete, and a theorem/falsification benchmark where uniform limits or an action are the actual missing datum. A blocked fundamental frontier is not disguised as build-ready hardware.

## Portfolio

| ID | Frontier | Mode | Readiness | Indicative scale |
|---|---|---|---|---|
| EX-001 | Structural reachability | computational | ready_now | 2–4 weeks; one proof engineer plus one independent reproducer |
| EX-002 | Representation and normalization stability | computational | ready_now | 4–8 weeks; proof engineer and data engineer |
| EX-003 | Detector resolution and semantic fibres | computational_hybrid | ready_now | 6–10 weeks; modelling, statistics and domain-review trio |
| EX-004 | Positivity, rank and response cones | hybrid | ready_after_design | 3–6 months on an existing microwave or transport platform |
| EX-005 | Orientation and phase lifts | laboratory | ready_after_design | 6–12 months using an integrated-photonic or microwave platform |
| EX-006 | Projector holonomy and coherent transport | laboratory | ready_after_design | 9–18 months including foundry cycle |
| EX-007 | Dynamical selection and attraction | laboratory | ready_after_design | 9–18 months; can share EX-006 hardware |
| EX-008 | Measurement backaction and conditioning | laboratory | ready_now_on_existing_hardware | 6–12 months on a superconducting qutrit or continuously monitored qubit |
| EX-009 | Thermodynamic cost and resource budgets | laboratory | ready_now | 4–8 months on an optical-feedback trap |
| EX-010 | Metastability, rare events and hysteresis | laboratory | ready_now | 6–12 months; long unattended acquisition required |
| EX-011 | Spectral boundary dynamics | laboratory | ready_now | 4–9 months with microwave or acoustic resonators |
| EX-012 | Material response and fluctuation forces | laboratory | multi_stage | 18–36 months across materials, transport, optics and force metrology teams |
| EX-013 | Multichannel transport and hydrodynamic rank | laboratory_computational | ready_after_design | 12–24 months including microfabrication |
| EX-014 | Topology, defects and protected transport | laboratory | ready_now | 6–12 months with acoustic or topoelectric resonator arrays |
| EX-015 | Disorder, causal spread and scale | laboratory_computational | ready_after_design | 6–12 months on a programmable resonator or qubit array |
| EX-016 | Arithmetic and code islands | exact_computational | ready_now | 2–6 months; algebra, coding and proof expertise |
| EX-017 | Operator and carrier translation | hybrid | staged | 12–24 months after a source-native map is written |
| EX-018 | Consistency, scattering and continuum control | theorem_computation | ready_now | 6–18 months depending on whether a theorem survives |
| EX-019 | Flavour, gravity and cosmology | conditional_hybrid | conditional_on_action | 12–36 months after a frozen action and matching packet exist |
| EX-020 | Exceptional and unification interpretation | theory_computation | conditional_on_model | 12–36 months for one fully specified candidate |

## Experiment cards

### EX-001 — Pinned-kernel reachability tournament

**Frontier:** FA-01 — Structural reachability (constraint sieve)  
**Mode/readiness:** computational; ready_now  
**Indicative scale:** 2–4 weeks; one proof engineer plus one independent reproducer  
**Topics:** OT-033, OT-035  
**Detector bundles:** DET-001, DET-002

**Platform.** A pinned Lean toolchain and a stratified sample of real declarations, synthetic edge cases and deliberately unreachable constructor trees.

**Hypothesis.** Kernel elaboration and constructor closure identify a strict reachable image whose failures are stable under harmless presentation changes.

**Interventions**

- Vary constructor depth, arity and closure while holding the target type fixed
- Blind the analyst to reachable versus adversarial cases
- Repeat under pinned transparency and compact-constructor policies

**Recorded observables**

- Elaboration outcome and inferred type
- Minimal failed constraint
- Reachability certificate or counterexample
- Runtime and memory

**Controls**

- Alpha renaming
- Literal expansion
- Known overflow witnesses
- Tree Euler and closure identities

**Analysis.** Estimate reachable occupancy by stratum, then require every classifier error to reduce to a named missing constructor, environment dependency or timeout class.

**Decisive positive result.** A held-out reachability sieve predicts all outcomes and emits checkable witnesses.

**Useful null result.** Reachability depends materially on undeclared environment state or resource limits.

**Stop rule.** Stop promotion if two pinned rebuilds disagree on any held-out declaration.

---

### EX-002 — Normalization-orbit stability challenge

**Frontier:** FA-02 — Representation and normalization stability (quotient)  
**Mode/readiness:** computational; ready_now  
**Indicative scale:** 4–8 weeks; proof engineer and data engineer  
**Topics:** OT-033  
**Detector bundles:** DET-001, DET-002

**Platform.** The same declaration corpus expanded into equivalence families by alpha, beta, zeta, metadata, notation and definitional rewrites.

**Hypothesis.** A canonical address is constant on declared equivalence orbits while retaining distinctions needed by later detectors.

**Interventions**

- Generate 20–100 semantics-preserving variants per declaration
- Change normalization policy one rule at a time
- Insert non-equivalent near neighbours with matched surface statistics

**Recorded observables**

- Raw and normalized terms
- Address mobility matrix
- Collision and split rates
- Proof of equivalence or non-equivalence

**Controls**

- Identity transformation
- Known beta/zeta pairs
- Adversarial near-equivalent terms
- Cross-version rebuild

**Analysis.** Treat normalization as a quotient experiment: measure false splits within orbits and false merges between orbits with bootstrap intervals by declaration family.

**Decisive positive result.** A preregistered policy achieves zero false merges and bounded, explained false splits on held-out families.

**Useful null result.** No single policy is stable across source-native families.

**Stop rule.** Retain a multi-chart atlas if global canonicalization requires erasing a detector-relevant distinction.

---

### EX-003 — Blind detector-fibre identification challenge

**Frontier:** FA-03 — Detector resolution and semantic fibres (detector fold)  
**Mode/readiness:** computational_hybrid; ready_now  
**Indicative scale:** 6–10 weeks; modelling, statistics and domain-review trio  
**Topics:** OT-001, OT-010, OT-019, OT-021, OT-033, OT-034, OT-035, OT-043, OT-044, OT-048  
**Detector bundles:** DET-002, DET-003, DET-026, DET-029, DET-030

**Platform.** A benchmark mixing real declaration trees, driven-oscillator records, five-coordinate incidence records and synthetic mechanism pairs with controlled collisions.

**Hypothesis.** Adaptive detector enrichment separates mechanisms at finite cost, or exposes an exact residual equivalence class.

**Interventions**

- Reveal label, role, rooted depth, phase, sideband and intervention channels sequentially
- Hold out complete mechanism families rather than random rows
- Adversarially search for record-equivalent parameter pairs

**Recorded observables**

- Separation depth
- Efficient Fisher singular values
- Global equivalence-class diameter
- Cost per acquired channel
- Coherent three-line AM/FM reconstruction error and the matched power-only residual

**Controls**

- Known tangent-degenerate pairs
- AZ-057 three-mechanism closed benchmark
- Wave 7.65 carrier-plus-two-sideband positive control and exact power-only no-go
- Label permutations
- Noise and calibration folds

**Analysis.** Plot information gained per marginal cost and certify global injectivity only after interval or adversarial optimization over nuisance parameters. For modulation records, compare every richer model with the frozen Wave 7.65 mixed-AM/FM nuisance family before attributing a residual to root geometry or new dynamics.

**Decisive positive result.** Every declared pair is separated on held-out interventions or assigned to an explicit quotient class.

**Useful null result.** A nontrivial model pair remains exactly record-equivalent.

**Stop rule.** Do not add more detectors when the residual equality is algebraic rather than noise-limited.

---

### EX-004 — Two-port positive-response cone tomography

**Frontier:** FA-04 — Positivity, rank and response cones (cone and rank surface)  
**Mode/readiness:** hybrid; ready_after_design  
**Indicative scale:** 3–6 months on an existing microwave or transport platform  
**Topics:** OT-008, OT-047  
**Detector bundles:** DET-004, DET-019

**Platform.** A passive two-port microwave network first, followed by a common-sample particle/energy response implementation.

**Hypothesis.** A source-native 2×2 response remains positive and genuinely rank two over a controlled frequency window.

**Interventions**

- Drive each port independently and coherently
- Sweep frequency, temperature and relative phase
- Change the declared source basis without refitting physics

**Recorded observables**

- Complex 2×2 transfer or Kubo matrix
- Eigenvalues and determinant
- Cross-spectrum phase
- Calibration covariance

**Controls**

- Passive standards
- Rank-one synthetic channel
- Source-basis congruence
- Energy-gauge repartition

**Analysis.** Use covariance-aware cone projection; test whether the smaller eigenvalue remains positive after de-embedding and order-of-limits checks.

**Decisive positive result.** The second response direction survives calibration, basis and low-frequency scaling.

**Useful null result.** Every controlled window becomes rank one or scheme-sheared.

**Stop rule.** Stop physical interpretation if passivity violations exceed the calibrated systematic envelope.

---

### EX-005 — Reversal-calibrated orientation lift

**Frontier:** FA-05 — Orientation and phase lifts (branched cover)  
**Mode/readiness:** laboratory; ready_after_design  
**Indicative scale:** 6–12 months using an integrated-photonic or microwave platform  
**Topics:** OT-003, OT-039  
**Detector bundles:** DET-004, DET-005, DET-007, DET-012, DET-015, DET-017

**Platform.** A three-mode interferometric loop with an independently calibrated birefringent, chiral or boundary reference axis.

**Hypothesis.** An oriented phase changes sign under physical reversal while even overlap and attenuation do not.

**Interventions**

- Run forward and reversed loops
- Flip the external orientation reference
- Remove the reference element while preserving the loop

**Recorded observables**

- Complex output amplitudes
- Wilson-loop or process matrix
- Even intensity overlap
- Odd phase contrast

**Controls**

- Reciprocal phase shifter
- Matched insertion loss
- Basis relabelling
- Reference-off device

**Analysis.** Fit even and odd channels jointly; the claimed lift is the interaction term between loop reversal and reference reversal, not a fitted absolute phase.

**Decisive positive result.** The odd contrast reverses twice as predicted and is stable to gauge choice.

**Useful null result.** The signal is removable by basis phase or reproduced by differential loss.

**Stop rule.** Reject the orientation claim if the reference cannot be calibrated without selected-state data.

**Primary precedents.** [https://doi.org/10.1038/s41467-025-58794-3](https://doi.org/10.1038/s41467-025-58794-3); [https://doi.org/10.1038/s41566-022-00976-2](https://doi.org/10.1038/s41566-022-00976-2)

---

### EX-006 — Three-mode projector-return, holonomy and oriented-seam transfer

**Frontier:** FA-06 — Projector holonomy and coherent transport (loop and lift)  
**Mode/readiness:** laboratory; ready_after_design  
**Indicative scale:** 9–18 months including foundry cycle  
**Topics:** OT-002, OT-009, OT-010, OT-012, OT-013, OT-037, OT-043, OT-044  
**Detector bundles:** DET-004, DET-005, DET-006, DET-013, DET-014

**Platform.** Silicon-nitride, microwave or femtosecond-written modes implementing a closed three-mode coupling loop with programmable edge phases, a dark subspace and calibrated directional ports.

**Hypothesis.** The spectral projector returns after a closed control loop while the coherent frame acquires a nontrivial, order-sensitive holonomy. Independently, the gauge-invariant edge-phase sum survives phase redistribution: resonance poles identify opposite loop orientations, while directional complex transfer distinguishes them. A central \(-I_2\) return is tested separately: it is reversal-even, so it must be identified by coherent endpoint-frame comparison and one-loop/two-loop traversal parity.

**Interventions**

- Fabricate forward, reverse and path-order-swapped coupling profiles
- Inject a tomographically complete input set
- Sweep wavelength and deliberately add calibrated splitting and loss
- Redistribute phase among the three edges while holding the loop sum fixed
- Reverse the loop phase with edge magnitudes and detunings fixed
- Execute one and two identical traversals with the same independently calibrated endpoint reference

**Recorded observables**

- Full complex 3×3 transfer matrix
- Projector distance
- Process singular values
- Forward and reverse complex transfer across the full resonance band
- Flux-reversal-odd directional statistic
- Leakage and insertion loss
- Endpoint frame-overlap matrix \(H=A_{\rm final}A_{\rm initial}^T\), its centrality residual and \(\operatorname{sign}(\operatorname{tr}H/2)\)

**Controls**

- Zero-area loop
- Dynamical-phase echo
- Static splitter
- Differential-loss mimic
- Open-loop control showing that an isolated edge phase is basis-removable
- Direct-feedthrough injection followed by frozen complex background subtraction
- Endpoint-reference recalibration without selected-state data and a static sign-flip/cable-order mimic

**Analysis.** Blindly compare geometric, static-splitting, reciprocal-network and loss models using held-out wavelengths and reversal data. Require fixed-flux phase redistributions to agree before interpreting the flux-reversal-odd directional record. Analyze the central-return channel separately: require projector closure, \(H\) inside a predeclared centrality band around \(-I_2\) after one traversal and \(+I_2\) after two, and stability under endpoint-reference recalibration.

**Decisive positive result.** Projector closure and reversed noncommuting transport survive independent loss calibration; phase redistributions at fixed loop sum agree, opposite loop phases are isospectral and the held-out directional statistic changes sign with its predicted magnitude. If the binary central channel is claimed, the one-loop \(-I_2\) and two-loop \(+I_2\) endpoint returns must also pass their independent centrality and reference controls.

**Useful null result.** A static, reciprocal or non-Hermitian nuisance model predicts every record, improving coherent-network calibration while closing the claimed discriminator at the achieved sensitivity.

**Stop rule.** Do not fabricate until full-wave tolerancing leaves a resolvable process-matrix margin. Stop at an engineering demonstration unless an independent source calculation predicts a continuous loop phase beyond the binary modular sign, coupling ratios or a defect response without fitting them to the device; require replication on a second carrier before a new-physics interpretation.

**Current preflight.** The [three-mode oriented-seam calculation](../lattice-subroutine-gravity/three-mode-loop-seam-preflight.md) verifies phase-redistribution invariance, spectral evenness and directional-transfer oddness for the declared coupled-mode model. The [modular-sign reassignment](../lattice-subroutine-gravity/modular-sign-detector-reassignment.md) proves that the \(\chi_5\) sign reaches only reciprocal \(0/\pi\) sectors. The [metaplectic calculation](../lattice-subroutine-gravity/metaplectic-phase-candidate.md) supplies a conditional \(\pm\pi/4\) target from the free-Majorana sector, pending the complete Baby-Monster multiplier and physical transport map. These are detector certificates, not evidence that nature uses the proposed lattice or Monster carrier.

**Primary precedents.** [https://doi.org/10.1038/s41467-025-58794-3](https://doi.org/10.1038/s41467-025-58794-3); [https://doi.org/10.1038/s41467-025-62481-8](https://doi.org/10.1038/s41467-025-62481-8)

---

### EX-007 — Selector-on/off basin tomography

**Frontier:** FA-07 — Dynamical selection and attraction (basin boundary)  
**Mode/readiness:** laboratory; ready_after_design  
**Indicative scale:** 9–18 months; can share EX-006 hardware  
**Topics:** OT-003, OT-009, OT-013, OT-022, OT-037, OT-039  
**Detector bundles:** DET-004, DET-006, DET-007, DET-008, DET-011, DET-017, DET-025

**Platform.** The holonomy chip or modular acoustic loop extended by a separately addressable dissipative or anisotropic selector segment Y.

**Hypothesis.** A carrier-native Y changes the fixed point and contraction tangent rather than merely relabelling a preselected outcome; its independently declared, correctly typed objective predicts the measured Gram point and, when objectives share that point, a distinct path or cost record.

**Interventions**

- Prepare at least twelve initial states spanning the accessible manifold
- Toggle Y on/off and reverse its axis
- Match total loss and cycle time across conditions
- At each frequency run phase-referenced L, R, L+R and L+iR preparations

**Recorded observables**

- Cycle-by-cycle state tomography
- Return-map Jacobian
- Fixed-point location
- Escape and convergence times
- Complex transfers $f_0$ and $f_1$, coherence $s$, normalized Gram-disk coordinate $u$ and slack $\Delta$

**Controls**

- Loss-matched dummy segment
- Y inferred only from independent calibration
- Multiple initial states
- Axis reversal
- Intensity-only reconstruction as a declared blind detector
- Frequency sweep and pole/zero audit before any causal-volume claim
- Three-ray environment determinant versus two-column channel determinant type audit

**Analysis.** Fit a common generative return map with Y as a preregistered intervention and compare contraction spectra, not endpoint images alone. Separately propagate covariance into $u=|s-\bar f_1f_0|^2/[(1-|f_0|^2)(1-|f_1|^2)]$ and test predeclared centre, nearest-origin, boundary and mixed-objective selector classes. For the convex mixed model fit $\lambda=\alpha/(\alpha+\beta)$, relaxation time $\tau$, phase lag and loop area over frequency; reject it on zero-frequency remanence or multistability. Treat $u=25/256$ as a shared endpoint prediction of channel-volume and nearest-origin entropy in the rational checkpoint; distinguish those principles only with an independently predicted path, intervention or cost observable.

**Decisive positive result.** Y produces the predicted fixed-point shift and subunit tangent eigenvalue across initial states, while the phase-referenced record selects its preregistered Gram/coherence class on held-out frequencies.

**Useful null result.** The same contraction occurs with Y absent or after loss matching.

**Stop rule.** Stop if Y or its objective can only be defined retrospectively from the selected state, if a one-frequency centre hit is used to establish causal globalization, or if endpoint tomography is used to distinguish objectives that select the same point.

---

### EX-008 — Complete-outcome instrument tomography

**Frontier:** FA-08 — Measurement backaction and conditioning (measurement quotient)  
**Mode/readiness:** laboratory; ready_now_on_existing_hardware  
**Indicative scale:** 6–12 months on a superconducting qutrit or continuously monitored qubit  
**Topics:** OT-004, OT-043  
**Detector bundles:** DET-008, DET-009

**Platform.** A three-level superconducting circuit with single-shot IQ readout, real-time feedback and calibrated missed-record efficiency.

**Hypothesis.** Apparent attraction can be separated into unconditional channel dynamics and record-conditioned trajectory branches.

**Interventions**

- Vary measurement strength and efficiency
- Run feedback on/off
- Retain every outcome including null and discarded records

**Recorded observables**

- Raw time-tagged IQ stream
- Conditioned trajectories
- Unconditional density matrix
- Reconstructed quantum instrument

**Controls**

- Detector tomography
- Feedback-disabled channel
- Artificial record erasure
- State-preparation cross-validation

**Analysis.** Reconstruct completely positive outcome maps, sum them to the unconditional channel and propagate efficiency uncertainty.

**Decisive positive result.** Conditioned and unconditional maps are separately identifiable and predict held-out sequences.

**Useful null result.** Only postselected branches contract while the unconditional manifold remains neutral.

**Stop rule.** No selection claim is admitted if unrecorded outcomes can span the effect.

**Primary precedents.** [https://doi.org/10.1038/s41586-019-1287-z](https://doi.org/10.1038/s41586-019-1287-z); [https://doi.org/10.1038/s42005-024-01790-8](https://doi.org/10.1038/s42005-024-01790-8)

---

### EX-009 — Matched-contraction stochastic energetics trial

**Frontier:** FA-09 — Thermodynamic cost and resource budgets (resource tradeoff)  
**Mode/readiness:** laboratory; ready_now  
**Indicative scale:** 4–8 months on an optical-feedback trap  
**Topics:** OT-005, OT-036  
**Detector bundles:** DET-009, DET-010

**Platform.** A 1–2 μm colloidal bead in a programmable double-well optical or feedback potential.

**Hypothesis.** Protocols with matched endpoint contraction can have measurably different heat, work, activity and information-reset costs.

**Interventions**

- Implement equilibrium relaxation, hidden-cycle drive and measurement-feedback protocols
- Match endpoint error and completion time
- Sweep protocol duration

**Recorded observables**

- Full bead trajectory
- Calibrated potential
- Stochastic work and heat
- Jump activity and record-reset bits

**Controls**

- Quasistatic Landauer erasure
- No-feedback cycle
- Time-reversed protocol
- Trap-stiffness calibration

**Analysis.** Infer trajectory-level energetics before comparing equal-precision/equal-speed frontiers; keep controller energy as a separate ledger.

**Decisive positive result.** Distinct protocols occupy separated precision-speed-cost surfaces despite equal contraction.

**Useful null result.** Differences vanish after complete apparatus accounting.

**Stop rule.** Do not infer cost from convergence rate alone.

**Primary precedents.** [https://doi.org/10.1038/nature10872](https://doi.org/10.1038/nature10872); [https://doi.org/10.1038/s41467-018-03686-y](https://doi.org/10.1038/s41467-018-03686-y)

---

### EX-010 — Rare-event and hysteresis trajectory campaign

**Frontier:** FA-10 — Metastability, rare events and hysteresis (large-deviation boundary)  
**Mode/readiness:** laboratory; ready_now  
**Indicative scale:** 6–12 months; long unattended acquisition required  
**Topics:** OT-010, OT-020, OT-023, OT-043  
**Detector bundles:** DET-007, DET-008, DET-011, DET-013

**Platform.** An injection-locked VCSEL, Kerr resonator or nanomagnetic element with tunable bistability and single-event readout.

**Hypothesis.** Waiting-time tails, sweep hysteresis and reversal asymmetry distinguish metastable selection from a unique deterministic attractor.

**Interventions**

- Sweep control in both directions at logarithmically spaced rates
- Hold inside the bistable region for long dwell windows
- Apply calibrated weak perturbation pulses

**Recorded observables**

- Every switching time
- Full drive and output trace
- Residence-time distributions
- Ringdown and sidebands

**Controls**

- Noise-floor injection
- Monostable operating points
- Randomized sweep order
- Detector-dead-time audit

**Analysis.** Fit survival curves and large-deviation rate functions jointly; reserve late trajectories for posterior predictive tests.

**Decisive positive result.** One mechanistic landscape predicts rates, hysteresis width and perturbation response across sweeps.

**Useful null result.** Observed memory is detector lag or ordinary bandwidth filtering.

**Stop rule.** Stop adding dwell time once confidence intervals are dominated by nonstationary drift rather than rare-event count.

---

### EX-011 — Tunable finite-chain pole-to-cut spectrometer

**Frontier:** FA-11 — Spectral boundary dynamics (pole, cut and threshold)  
**Mode/readiness:** laboratory; ready_now  
**Indicative scale:** 4–9 months with microwave or acoustic resonators  
**Topics:** OT-012, OT-013, OT-014, OT-036, OT-041  
**Detector bundles:** DET-006, DET-013, DET-014, DET-022, DET-023

**Platform.** A 10–40 site coupled-resonator chain with one tunable side-coupled defect and access to both end-port scattering and local density of states.

**Hypothesis.** Bound states, edge collisions, resonances, phase winding and time delay form one branch-consistent ledger on the same carrier.

**Interventions**

- Tune defect frequency and coupling through both certified pole collisions
- Repeat for several chain lengths and losses
- Excite locally and from both scattering ports

**Recorded observables**

- Complex S-matrix
- Local spectra
- Ringdown
- Pole fits and phase winding

**Controls**

- Disconnected defect
- Uniform chain
- Known rank-one impurity
- Synthetic branch-choice challenge

**Analysis.** Fit a causal rational model globally, continue poles with uncertainty and compare the finite-band Levinson ledger before extrapolating length.

**Decisive positive result.** Every spectral stratum and both collision laws agree without changing the model family.

**Useful null result.** Crossings depend on sampling, fit order or Riemann-sheet convention.

**Stop rule.** Freeze the result at the finite carrier if loss prevents stable continuation.

---

### EX-012 — Same-film tensor-to-Casimir closure

**Frontier:** FA-12 — Material response and fluctuation forces (response surface)  
**Mode/readiness:** laboratory; multi_stage  
**Indicative scale:** 18–36 months across materials, transport, optics and force metrology teams  
**Topics:** OT-006, OT-007, OT-011  
**Detector bundles:** DET-012, DET-013, DET-014, DET-015, DET-016, DET-017, DET-018, DET-029

**Platform.** One batch of anisotropic magnetic films split into witness coupons and a force/torque device, with common growth and metrology records.

**Hypothesis.** Broadband causal response inferred without force data predicts a differential Casimir force or torque after all ordinary nuisances are propagated.

**Interventions**

- Measure Hall, Seebeck, Nernst and magneto-optical response versus temperature, field and angle
- Freeze a causal tensor posterior
- Measure angle- and distance-dependent parallel-minus-antiparallel force/torque

**Recorded observables**

- Transport and ellipsometry tensors
- Film thickness, roughness and domains
- Force/torque curves
- Patch and magnetic backgrounds

**Controls**

- Nonmagnetic sibling film
- Orientation reversal
- Multiple separations
- Blind force analysis and dummy spacing scans

**Analysis.** Propagate the pre-force tensor posterior through Lifshitz theory with a full nuisance covariance; prohibit response refitting to force data.

**Decisive positive result.** The preregistered differential curve is recovered with nuisance alternatives disfavoured.

**Useful null result.** Optical-tail, patch, roughness or magnetic freedom spans the effect.

**Stop rule.** Do not proceed to force fabrication until OT-006 cross-channel prediction passes on held-out films.

**Primary precedents.** [https://doi.org/10.1103/RevModPhys.81.1827](https://doi.org/10.1103/RevModPhys.81.1827); [https://doi.org/10.1103/PhysRevLett.119.183001](https://doi.org/10.1103/PhysRevLett.119.183001)

---

### EX-013 — Common-sample multichannel Onsager-rank experiment

**Frontier:** FA-13 — Multichannel transport and hydrodynamic rank (rank surface and order of limits)  
**Mode/readiness:** laboratory_computational; ready_after_design  
**Indicative scale:** 12–24 months including microfabrication  
**Topics:** OT-008, OT-016, OT-040, OT-044, OT-047  
**Detector bundles:** DET-012, DET-013, DET-019, DET-020, DET-021, DET-029

**Platform.** A suspended four-terminal microbridge allowing independent electrical and thermal biases, magnetic-field reversal and AC thermometry.

**Hypothesis.** The particle/energy response has a stable second eigen-direction in a declared low-frequency transport window.

**Interventions**

- Independently modulate voltage and heater power
- Sweep frequency, temperature, field, filling and contact geometry
- Reverse injection/emission contacts

**Recorded observables**

- Complex charge and heat currents
- Full 2×2 Onsager matrix
- Noise cross spectra
- Thermal and electrical calibration covariance

**Controls**

- Onsager-Casimir reciprocity
- Open/short thermal standards
- Energy-zero shift
- Contact-swap reversal

**Analysis.** Infer eigenvalues with errors in both currents and forces; test limit ordering and compare with common-sample KPM/typicality.

**Decisive positive result.** Rank two and reciprocity survive frequency-window, size and energy-gauge changes.

**Useful null result.** The second direction is contact leakage or exits every controlled low-frequency window.

**Stop rule.** Stop rank claims when thermal cross-talk exceeds the smaller singular value.

**Primary precedents.** [https://arxiv.org/abs/1306.3694](https://arxiv.org/abs/1306.3694)

---

### EX-014 — Defect information beyond mode count

**Frontier:** FA-14 — Topology, defects and protected transport (topological wall)  
**Mode/readiness:** laboratory; ready_now  
**Indicative scale:** 6–12 months with acoustic or topoelectric resonator arrays  
**Topics:** OT-015, OT-046  
**Detector bundles:** DET-023, DET-024

**Platform.** A reconfigurable 2D acoustic or circuit lattice containing matched trivial, domain-wall, partial-dislocation and threefold-quotient defects.

**Hypothesis.** Defects with the same protected mode count remain distinguishable by oriented transport, spatial texture and scattering phase.

**Interventions**

- Move source and detector around the defect
- Reverse helicity or circulation
- Add controlled symmetry-preserving and symmetry-breaking disorder

**Recorded observables**

- Site-resolved complex field
- Local density of states
- Scattering matrix
- Winding, delay and localization length

**Controls**

- Defect-free lattice
- Same-index inequivalent defects
- Boundary-condition variants
- Blind geometric relabelling

**Analysis.** Condition on equal index and compare the remaining response tensor; demand a held-out observable beyond mode count.

**Decisive positive result.** A non-index record robustly tracks defect geometry and quotient operation.

**Useful null result.** All extra information is arbitrary boundary data.

**Stop rule.** Retain only the topological count if disorder destroys the extra record before the bulk gap closes.

**Primary precedents.** [https://doi.org/10.1038/s41467-022-29785-5](https://doi.org/10.1038/s41467-022-29785-5); [https://doi.org/10.1038/s41467-024-50666-6](https://doi.org/10.1038/s41467-024-50666-6)

---

### EX-015 — Disorder–spread–coarse-graining scaling tube

**Frontier:** FA-15 — Disorder, causal spread and scale (scaling frontier)  
**Mode/readiness:** laboratory_computational; ready_after_design  
**Indicative scale:** 6–12 months on a programmable resonator or qubit array  
**Topics:** OT-011, OT-019, OT-021, OT-022, OT-023  
**Detector bundles:** DET-011, DET-012, DET-014, DET-015, DET-020, DET-021, DET-024, DET-025, DET-026, DET-030

**Platform.** Arrays of 16–128 microwave/acoustic resonators or available quantum-simulator sites with programmable onsite disorder and couplings.

**Hypothesis.** A small set of propagation and memory invariants remains stable across disorder, size, time and coarse-graining.

**Interventions**

- Quench a local excitation
- Sweep disorder distribution and correlation length
- Repeat across array sizes and detector aggregation scales

**Recorded observables**

- Space-time response cone
- Out-of-cone leakage
- Participation ratio
- Memory and return statistics

**Controls**

- Clean ballistic array
- Strongly localized array
- Detector convolution
- Randomized disorder seeds

**Analysis.** Fit a joint finite-size/time scaling model and test semigroup consistency between raw and coarse observations.

**Decisive positive result.** One invariant scaling tube predicts held-out size and disorder ensembles.

**Useful null result.** Every apparent bound is detector- or size-specific.

**Stop rule.** Do not extrapolate if fitted constants drift monotonically with the largest available size.

---

### EX-016 — Code-island operator-law falsification

**Frontier:** FA-16 — Arithmetic and code islands (arithmetic cliff)  
**Mode/readiness:** exact_computational; ready_now  
**Indicative scale:** 2–6 months; algebra, coding and proof expertise  
**Topics:** OT-017, OT-025, OT-045  
**Detector bundles:** DET-027, DET-028

**Platform.** The finite Monster-address, Golay/Leech-neighbour and 24-dimensional form data already represented in the corpus.

**Hypothesis.** At least one source-derived operator family—not labels alone—satisfies preregistered Hecke, modular-trace or product-preserving relations.

**Interventions**

- Define operators before inspecting occupancy coincidences
- Apply them to the full finite atlas
- Compare integral, rational and mod-p reductions

**Recorded observables**

- Exact operator matrices
- Relation residuals
- Graded traces
- Integrality and orbit certificates

**Controls**

- Random label permutations
- Same divisor multiset with destroyed multiplication
- Known Hecke toy module
- Independent exact implementation

**Analysis.** Require exact identities over integers or declared rings; numerical near-equality has no evidential weight.

**Decisive positive result.** A nontrivial operator law holds without fitting prime-address occupancy.

**Useful null result.** Only numerology, dimensions or divisor labels survive.

**Stop rule.** Close the branch after all natural source-derived multiplications fail the preregistered identities.

---

### EX-017 — Two-carrier commuting-square hardware-in-the-loop test

**Frontier:** FA-17 — Operator and carrier translation (translation gap)  
**Mode/readiness:** hybrid; staged  
**Indicative scale:** 12–24 months after a source-native map is written  
**Topics:** OT-017, OT-024, OT-025, OT-026, OT-027, OT-035, OT-038, OT-039, OT-042, OT-045, OT-046, OT-047, OT-048, OT-049  
**Detector bundles:** DET-027, DET-035

**Platform.** A photonic three-mode chip and an acoustic or microwave three-port emulator implementing the same declared A2 operation in native units.

**Hypothesis.** A provenance-bearing transformation transports projector, complex structure, losses and observable records between carriers while preserving composition.

**Interventions**

- Prepare matched labelled states in both carriers
- Apply generators singly and in compositions
- Transport predictions in both directions without basis refitting

**Recorded observables**

- Native process matrices
- Unit and label dictionary
- Composition residual
- Irreversible loss ledger

**Controls**

- Unlabelled matrix similarity
- Fitted basis alignment
- One-generator-only agreement
- Held-out composite paths

**Analysis.** Test path equality in the commuting square on held-out states, with separate structural and calibrated physical error budgets.

**Decisive positive result.** Both paths agree and the map predicts a native observable in the second carrier.

**Useful null result.** Agreement exists only after erasing labels, units or orientation.

**Stop rule.** Do not build the second device until the source-side map preserves products symbolically.

---

### EX-018 — Uniform-limit adversarial scattering benchmark

**Frontier:** FA-18 — Consistency, scattering and continuum control (consistency boundary)  
**Mode/readiness:** theorem_computation; ready_now  
**Indicative scale:** 6–18 months depending on whether a theorem survives  
**Topics:** OT-014, OT-016, OT-018, OT-021, OT-031, OT-040, OT-046  
**Detector bundles:** DET-016, DET-022, DET-023, DET-030, DET-034

**Platform.** Families of finite chains, lattice gauge Hamiltonians and D4 defect operators with controllable volume, regulator, time and observable class.

**Hypothesis.** A proposed positivity, gap or admissibility bound has constants uniform in every declared limiting direction.

**Interventions**

- Search adversarial sequences jointly over volume, regulator and boundary condition
- Enlarge the observable class
- Compare pole, phase, Euclidean and real-time estimators

**Recorded observables**

- Best lower bound by scale
- Extremizing sequence
- Finite-size drift
- Proof-assistant-checkable inequalities where available

**Controls**

- Known gapped and gapless models
- Order-of-limits swaps
- Boundary-localized false gaps
- Synthetic positivity violations

**Analysis.** Attempt to falsify uniformity first; a successful result must supply explicit constants and domain assumptions.

**Decisive positive result.** One bound remains positive and stable under all declared limits.

**Useful null result.** An admissible sequence drives the bound to zero or changes its sign.

**Stop rule.** Record a scoped no-go once a countersequence is certified; do not replace it with larger finite numerics.

---

### EX-019 — Joined torsion–flavour–cosmology likelihood with a polarized null experiment

**Frontier:** FA-19 — Flavour, gravity and cosmology (fundamental firewall)  
**Mode/readiness:** conditional_hybrid; conditional_on_action  
**Indicative scale:** 12–36 months after a frozen action and matching packet exist  
**Topics:** OT-028, OT-029, OT-030, OT-031, OT-042, OT-047, OT-048, OT-049  
**Detector bundles:** DET-029, DET-031, DET-032, DET-033, DET-034, DET-035

**Platform.** A rotating unpolarized source mass near a K–Rb–Ne comagnetometer or polarized spin sensor, joined to collider/flavour and cosmological public likelihoods through one action.

**Hypothesis.** One protected parameter map predicts range, species ratios and signs across laboratory, flavour and cosmological observables.

**Interventions**

- Modulate source distance, velocity and orientation
- Reverse sensor polarization and source rotation
- Freeze threshold matching before opening laboratory data

**Recorded observables**

- Time-series pseudomagnetic field
- Environmental witness channels
- Flavour/collider likelihood terms
- Expansion, lensing and structure likelihoods

**Controls**

- Nonmagnetic dummy source
- Blind rotation phase
- Multiple source distances
- Generic pseudoscalar comparison model

**Analysis.** Perform one hierarchical likelihood with shared parameters and explicit theory errors; report the generic-EFT fit beside the protected model.

**Decisive positive result.** A common no-refit parameter point survives all channels and predicts a held-out reversal or range curve.

**Useful null result.** Generic free pseudoscalar coefficients fit equally well or one dataset requires an incompatible parameter value.

**Stop rule.** No apparatus-specific interpretation begins until the action fixes the measured operator and species ratios.

**Primary precedents.** [https://arxiv.org/abs/2203.07050](https://arxiv.org/abs/2203.07050); [https://arxiv.org/abs/2408.15691](https://arxiv.org/abs/2408.15691)

---

### EX-020 — Exceptional-model end-to-end red-team

**Frontier:** FA-20 — Exceptional and unification interpretation (fundamental firewall)  
**Mode/readiness:** theory_computation; conditional_on_model  
**Indicative scale:** 12–36 months for one fully specified candidate  
**Topics:** OT-026, OT-032, OT-038, OT-042, OT-045, OT-049  
**Detector bundles:** DET-028, DET-035

**Platform.** A symbolic and numerical pipeline accepting one exceptional-group action, representation dictionary, vacuum and symmetry-breaking chain.

**Hypothesis.** A single candidate can pass anomaly, Hessian, gauge-spectrum, threshold and observable gates without freely chosen embeddings.

**Interventions**

- Enumerate the full chiral spectrum and anomaly polynomial
- Compute the complete scalar Hessian and gauge masses including coloured directions
- Run RG and threshold matching to a frozen low-energy likelihood

**Recorded observables**

- Anomaly coefficients
- Hessian eigenpairs
- Gauge and matter spectrum
- Running couplings and held-out observable predictions

**Controls**

- Basis and embedding changes
- Known inconsistent truncations
- Parameter-count audit
- Generic low-energy EFT baseline

**Analysis.** Use a sequential gate: failure at any exact consistency stage prevents phenomenological fitting; successful candidates are compared by predictive compression.

**Decisive positive result.** One anomaly-free stable vacuum produces a no-refit low-energy prediction that beats the independent EFT.

**Useful null result.** The construction relies on dimension matches, arbitrary embeddings or compensating free parameters.

**Stop rule.** Terminate a candidate immediately on anomaly, ghost, unstable coloured direction or underdetermined matching.

## Execution order

1. **Immediate, no new apparatus:** EX-001, EX-002, EX-003, EX-016 and EX-018.
2. **Existing-platform pilots:** EX-004, EX-008, EX-009, EX-010, EX-011 and EX-014.
3. **Shared-device build programme:** EX-005, EX-006 and EX-007, followed by EX-017.
4. **Materials and transport campaign:** EX-012, EX-013 and EX-015.
5. **Model-gated fundamental tests:** EX-019 and EX-020 only after their action/dictionary entry conditions are met.

The shared-device sequence is deliberate: EX-005–EX-007 can use one three-mode carrier, with EX-006 asking which phase and orientation records that carrier can preserve, while EX-012 forces the response tensor to be frozen before the Casimir record is opened. These dependencies make null results informative and limit refitting freedom.
