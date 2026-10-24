# The admissibility zone: filled regions, open regions and known/unknown frontiers

**Date:** 23 October 2026  
**Status:** programme map, status grammar and frontier protocol  
**Parent:** [Dynamic admissibility](admissibility_06_dynamic_response_geometry_detection_metastability.md)  
**Register:** [Machine-readable admissibility-zone register](admissibility_zone_register_v1.json)  
**First crossed frontier:** [Finite contextual Casimir experiment](admissibility_08_finite_contextual_casimir_experiment.md)

## The zone

The preceding maps identify invariants, forces, modulation, resonance, geometry, topology, material response, metastability and detectors. The next step is to distinguish where those maps are filled, where they are empty, and what kind of boundary separates them.

The **admissibility zone** is the structured region in which candidate descriptions are tracked through theoretical consistency, dynamical realization, experimental accessibility and observation. It is not simply the set of ideas that have not yet been disproved.

Let \(\mathcal P\) be a declared possibility space. Let \(T_i\) be theoretical admission gates and let \(D_E\) be the calibrated domain of an experimental detector/protocol \(E\). Then

\[
\mathcal A_T
=\mathcal P\cap\bigcap_i T_i
\]

is the theory-admitted region, while

\[
\mathcal A_{T,E}=\mathcal A_T\cap D_E
\]

is the region both theoretically admitted and experimentally addressable by the declared apparatus. Given data \(y\), uncertainty model \(\Sigma\), and a forward map \(M_E\), the data-compatible region is schematically

\[
\mathcal Z(y;E)
=\left\{
x\in\mathcal A_{T,E}:
d_\Sigma\!\left(M_E(x),y\right)\leq c
\right\}.
\]

The realized world is not identified with \(\mathcal Z\). The zone records what the declared theory and experiment can currently distinguish.

## Filled does not mean final

A region is **filled** when it contains typed objects, explicit maps, declared assumptions and reproducible evidence. It need not be fundamental, unique or empirically confirmed.

An **unfilled** region can mean several radically different things:

1. no construction has been supplied;
2. a construction exists but has not been calculated;
3. a calculation exists but no experiment reaches it;
4. an experiment reaches it but cannot identify the relevant parameters;
5. theory excludes it under declared assumptions;
6. the relevant possibility space has not even been defined.

The map must never render these cases with one undifferentiated blank.

## Status legend

| Status | Meaning | Map treatment |
|---|---|---|
| Established | exact result or calibrated empirical fact within a declared domain | solid fill |
| Conditionally filled | complete construction conditional on explicit inputs or assumptions | patterned fill |
| Bounded unknown | unknown value or mechanism inside known upper/lower/domain bounds | bounded open cell |
| Open reachable | defined target with a known calculation or experiment capable of advancing it | open cell with directed gate |
| Underidentified | multiple candidates produce the same accessible records | overlapping or quotient cell |
| Theory undefined | observable or forward model has not been constructed | blank on the theory side |
| Experiment inaccessible | theory defines the effect but current apparatus cannot reach the regime | blank on the experiment side |
| Excluded | fails a declared gate or bound | crossed region, with assumptions attached |
| Uncharted | neither the candidate space nor the boundary is adequately described | grey exterior, not an implied possibility |

“Established” must always retain its scope. A finite-model theorem does not fill the continuum region; a calibrated apparatus does not fill unmeasured frequencies; and an effective theory does not fill its ultraviolet completion.

## Coordinates of the map

The admissibility zone is multidimensional. Any diagram is a projection of at least six coordinates.

### 1. Structural level

\[
\text{distinctions}
\to
\text{transformations}
\to
\text{invariants}
\to
\text{states/modes}
\to
\text{dynamics}
\to
\text{observables}.
\]

### 2. Physical scale

Microscopic, mesoscopic, macroscopic, continuum, cosmological and detector scales can carry different effective descriptions. A filled cell at one scale does not automatically continue to the next.

### 3. Frequency and time

Static, quasistatic, resonant, broadband, driven/Floquet, transient, relaxation and long-time sectors require different gates. The ordering of drive, relaxation, escape and detector times is part of the coordinate.

### 4. Geometry and topology

Bulk, boundary, interface, defect, closed-loop and globally nontrivial sectors must be separated. A topological classification does not fill the material, energy-scale or detector coordinates.

### 5. Theory status

Formal existence, positivity, causality, stable dynamics, quantum closure, scale control and empirical prediction are distinct depths of theoretical filling.

### 6. Experimental status

Reach, calibration, resolution, acceptance, identifiability, replication and model-discrepancy control are distinct depths of experimental filling.

## Four principal frontiers

### Theory frontier \(\partial_T\)

The boundary of the region where the equations, state space and approximations are defined and controlled. Examples include a perturbative cutoff, loss of positivity, an unknown continuum limit, an unclassified self-adjoint domain or a missing microscopic action.

### Experimental frontier \(\partial_E\)

The boundary of current apparatus reach: bandwidth, spatial resolution, force sensitivity, temperature, field strength, coherence time, dynamic range, lifetime acceptance or observation duration.

### Inference frontier \(\partial_I\)

The boundary of identifiability. The apparatus may measure accurately while several parameter combinations or mechanisms remain observationally equivalent.

For detector map \(M_E\), define

\[
x\sim_E x'
\quad\Longleftrightarrow\quad
M_E(x)=M_E(x').
\]

The experiment observes equivalence classes \(\mathcal A_{T,E}/\!\sim_E\), not the full underlying state directly.

### Translation frontier \(\partial_X\)

The boundary between a formal object and its physical/operational dictionary: representation label to particle, Casimir eigenvalue to response mode, topological index to detector signal, or free-energy functional to measured force.

Many corpus branches stop here. The mathematics and experiment can each be mature while their bridge is missing.

## Known and unknown frontiers

A **known frontier** has:

1. a declared space on at least one side;
2. a named gate or limiting operation;
3. a pass/fail/open criterion;
4. a certificate, bound or reproducible calculation locating the boundary;
5. and a stated assumption set under which it holds.

Examples include a proven positivity boundary, a measured detector noise floor, a certified finite truncation error, a causal bandwidth limit or a no-go theorem with explicit hypotheses.

An **unknown frontier** is not merely a wide error bar. It occurs when the relevant variables, model class, failure mode or comparison map are missing. Unknown frontiers include unmodeled phases, unforeseen decay channels, unknown material states, missing collective coordinates and regimes where the theory's ontology no longer supplies an observable.

The scientific aim is not to erase every unknown frontier. It is to convert uncharted boundaries into known frontiers, then tighten or cross them.

## Known bounds to experiment

The experimental portion of a cell is bounded by declared quantities such as:

- frequency band and sampling rate;
- temporal resolution, dead time and total observation window;
- spatial resolution and geometric acceptance;
- force, displacement, phase, flux or energy sensitivity;
- noise power spectrum and channel covariance;
- dynamic range, saturation and linearity;
- calibration uncertainty and reference stability;
- detection efficiency and lifetime acceptance;
- background model and nuisance parameters;
- statistical coverage and decision threshold;
- environmental ranges of temperature, pressure and field;
- and repeatability across apparatus, time and operator.

These define a calibrated experimental domain, not only a single error bar.

## Unknown bounds to experiment

An experiment also has boundaries it cannot certify from its present data:

- unmeasured response tails outside calibration;
- correlated noise absent from the likelihood;
- unknown backgrounds or transient disturbances;
- long-term drift beyond the observation window;
- selection effects in rejected or unrecorded events;
- nonlinear response outside tested amplitudes;
- detector backaction omitted from the source model;
- geometry or material heterogeneity below resolution;
- and failure modes shared by calibration and signal channels.

These should be recorded as model-discrepancy risks, not silently absorbed into statistical precision.

## Known bounds to theory

The theoretical portion of a cell should declare:

- axioms, fields, state space and domains;
- symmetry and gauge assumptions;
- positivity, stability, causality and hyperbolicity conditions;
- perturbative order and expansion parameter;
- ultraviolet cutoff and infrared/volume limitations;
- finite-size, discretization and truncation errors;
- boundary and initial conditions;
- convergence or asymptotic control;
- parameter and renormalization scheme dependence;
- known no-go theorems and escape assumptions;
- and the observables actually derived from the action or response.

A theory is filled only over the region where these controls apply.

## Unknown bounds to theory

Theory becomes unbounded or uncharted where it lacks:

- existence or uniqueness of solutions;
- nonperturbative control;
- a continuum or thermodynamic limit;
- a complete phase diagram;
- quantum/radiative closure;
- a ultraviolet completion or justified effective cutoff;
- the relevant collective variables;
- a selector among admissible vacua or representations;
- a mapping from formal states to preparation and measurement;
- or an error model for discrepancy between the theory and the physical system.

These unknowns are not all defects. Some mark the legitimate edge of an effective theory. The defect occurs when a conclusion is promoted beyond that edge without a bridge.

## Filled and unfilled regions in the present programme

| Region | Current fill | Known frontier | Unfilled continuation |
|---|---|---|---|
| Casimir classification | exact for declared groups/representations | representation and commutant assumptions | derivation of the symmetry from thinner admissibility |
| Poincaré mass/spin obstruction | conditional theorem-level fill | S-matrix and asymptotic assumptions | gravity/nonstandard-asymptotic replacements |
| London--Casimir--Lifshitz landscape | conventionally filled across controlled regimes | overlap, retardation, thermal and material-response domains | new protected invariant beyond standard response theory |
| Dynamic response | causal linear and selected nonlinear models filled | bandwidth, poles, stability and approximation order | universal derivation of response structure |
| Geometry/boundary | strong operator and scattering tools | domain and boundary specification | physical selection of a boundary or topology |
| Magnetic response | mature mechanisms and reciprocity controls | material state, field, parity and protocol | corpus-specific magnetic bridge or prediction |
| Metastability | local barrier/rate models conditionally filled | lifetime and observation-window ordering | derived landscape and escape channel in the target theory |
| Detection | calibrated channels can be fully modeled | acceptance, noise, resolution and nuisance model | ontology beyond detector equivalence classes |
| Fundamental admissibility | methodological grammar filled | anti-tautology contract | derived state space, symmetry, dynamics and prediction |

## Frontier motion

A scientific advance changes the map in one of five ways:

1. **Fill:** construct and validate an object inside a previously defined open region.
2. **Bound:** place a rigorous or calibrated limit on an unknown region.
3. **Exclude:** prove that a region fails a declared gate.
4. **Split:** discover that one apparent region contains differently typed mechanisms.
5. **Extend:** define new coordinates or objects beyond the previous frontier.

Null results usually bound or exclude; they do not automatically empty an entire conceptual region. New theories often extend or split; they do not automatically fill. Better detectors may cross \(\partial_E\) while leaving \(\partial_I\) unchanged.

## Minimum cell record

Every zone cell should record:

1. identifier and claim;
2. object and scale;
3. transformations and invariants;
4. theoretical model and validity domain;
5. experimental protocol and detector map;
6. known theoretical bounds;
7. unknown theoretical bounds;
8. known experimental bounds;
9. unknown experimental bounds;
10. identifiability class;
11. current status from the legend;
12. evidence and verifier paths;
13. next gate capable of moving the frontier;
14. falsifier or stopping condition;
15. date and provenance.

The companion JSON register instantiates this structure for the first programme regions.

The first cross-corpus convergence discovered after that register was opened is the exact [distributed \(A_2\) type shape](admissibility_09_distributed_a2_shape_discovery.md): the contextual Casimir, placement projector, family augmentation Gram and signed \(K_3\) selector are affine rescalings of the same operator. This fills a representation-level cell while leaving the physical cross-carrier label and orientation map open.

## A visual grammar

Any future rendered map should use two independent encodings:

- **fill** for epistemic status: established, conditional, bounded, open, excluded or uncharted;
- **border** for frontier type: theory, experiment, inference or translation.

Color alone should not carry the meaning. A cell can be theoretically filled but experimentally blank, empirically bounded but theoretically underidentified, or excluded only within one assumption set. The visual must permit these combinations.

## The admissibility zone as the programme's central object

The programme began by proposing admissibility as prior to physical structure. The zone makes that proposal operational. It shows:

- what possibilities have been defined;
- which survive current theoretical gates;
- which can reach a detector;
- which remain indistinguishable after detection;
- where quantitative bounds exist;
- where the bounds themselves are unknown;
- and which calculation or experiment can move each frontier.

The deepest unknown is no longer represented by a blank page. It is represented by a typed frontier with a reason for being open—or explicitly marked as uncharted when even that reason is unavailable.

## Provisional definition

> **The admissibility zone is the evolving, typed intersection of theoretically coherent possibilities, dynamically realizable structures, experimentally addressable regimes and distinguishable record distributions, together with the excluded, bounded, underidentified and uncharted regions that define its frontiers.**

This zone is not identical to reality. It is the most disciplined map the programme can currently make of the possible, the impossible, the observed and the not-yet-known.
