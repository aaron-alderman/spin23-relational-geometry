# Symmetry, phonons, experiments and supporting corpora

## `symmetry`

### Structure

The folder contains:

- `0 - overview.md`: the original 66,000-word monolithic conversation arc;
- `0a - atlas of current physics.md`: a more navigable atlas;
- `1 - foundations and language.md`;
- domain files for atomic/optical, molecular/chemical, nuclear/few-body, condensed matter, particle/QFT, and gravity/cosmology;
- `8 - cross-domain patterns.md`;
- `9 - frontiers and anomalies.md`;
- `10 - references and formula sheets.md`;
- `11 - boundary territories.md`;
- `README.md`.

### What it does well

- Connects selection rules, degeneracy, symmetry breaking, boundary conditions, topology and representation theory across many domains.
- Provides a useful educational route from helium and molecular spectra through bands, phonons, Goldstone modes, gauge theory and topology.
- Emphasises that observable quantum numbers follow from group representations and boundary/regularity conditions.
- Collects mechanisms and mathematical language that later Spin(2,3) work can use.

### Older-LLM problems in the monolith

The monolithic overview frequently places a correct textbook discussion beside an overgeneralised thesis without changing tone. Examples requiring correction or qualification include:

- **“Degeneracy plus breaking equals new quantisation.”** Symmetry breaking often splits degeneracies, but quantisation also arises from representation theory, canonical commutation, compact phase space, topology and boundary conditions. Breaking does not generally create quantisation.
- **“Everything dynamic is bosonic.”** False as a literal claim. Fermionic fields have dynamics, carry energy and propagate. Collective observables can be bosonic without making all dynamics bosonic.
- **“Temperature as a boson.”** Temperature is a state variable/parameter, not a particle or quantum field excitation. Thermal modes and imaginary-time methods do not make temperature a boson.
- **“Coherence as the fundamental thing.”** A philosophical organising idea, not an established result.
- **“The Bohr model vindicated” by Rydberg atoms.** Rydberg states exhibit semiclassical scaling and wave-packet orbits, but do not restore the literal classical Bohr model as the fundamental description.
- **“Why spin requires quaternions—established.”** Quaternions offer an elegant representation of rotations/spin, but quantum spin does not physically require a quaternionic scalar field; complex Hilbert-space representations are standard.
- **AdS/RG statements.** Holographic radial flow and renormalisation have deep relations in specific theories, not a universal identity between every RG flow and physical geometry.
- **Anomaly lists.** Time-sensitive “current anomaly” claims require dates, global fits and primary sources. They should not be frozen into a timeless atlas.

### Best use

Treat the split domain files as an educational reference and the cross-domain files as hypothesis generators. The monolith should be archived or clearly marked as an early conversation transcript. No claim from it should enter the theory ledger without being extracted, scoped and sourced.

## `phonons`

### Structure

The folder contains one 7,100-word master landscape plus 36 modular notes:

- conceptual framework;
- conversion mechanisms;
- shape-memory/topological frustration;
- research landscape;
- photon analogy;
- impact assessment;
- kernel projects;
- characterisation methods;
- property reference;
- strategic outlook;
- fifteen individual conversion-mechanism files;
- eight topology files.

### Content summary

The conversion library covers Seebeck, Nernst, Peltier, phonon drag, piezoelectricity, flexoelectricity, triboelectricity, elastocaloric, twistocaloric, barocaloric, magnetocaloric, superconductivity, spin Seebeck and magnon–phonon coupling.

The topology library covers Berry/topological foundations, topological phonons, topological superconductivity, defects/frustration, Floquet and non-Hermitian phases, phononic circuits and frontier opportunities.

The strategic notes propose accessible platforms for spectroscopy, nonlinear phononics, topological circuits, phonon–electron optimisation, frustrated networks and acoustic–thermal interfaces.

### Assessment

This is one of the most practically valuable parts of the corpus. Most mechanisms are established condensed-matter physics, and the proposed platforms are plausible analogue or engineering research systems.

The main weakness is sourcing and calibration. Broad impact rankings, claims of unexplored opportunity and room-temperature-superconductivity relevance require literature dates, material-specific constraints and economic/engineering evidence.

The photon analogy is useful when restricted to:

- linear wave propagation;
- dispersion and bands;
- interference;
- Berry phase/topology;
- cavity and nonlinear-wave analogues.

It fails if phonons are treated as evidence that spacetime or elementary particles literally use the same microscopic mechanism. Phonons are quasiparticles in a material background with a preferred rest frame and lattice degrees of freedom.

### Best use

Use this folder to design controlled laboratory analogues for response, topology, dissipation and mode conversion. Promote results as condensed-matter/phononics results first. Only after an explicit mathematical functor or shared effective action exists should a result constrain the Spin(2,3) programme.

## `experiments`

### Structure and function

The Node/browser audio laboratory includes:

- a zero-dependency HTTP server;
- live microphone waveform and FFT display;
- sine generation and frequency sweeps;
- FFT heatmaps and CSV export;
- phase-jump and click-transient experiments;
- tracked resonance amplitude, width and offset;
- an adaptive scheduler that explores changing intervals and refines uncertain/strong points;
- shared UI and model code.

All JavaScript files pass syntax checking. The package defines a start command but no automated test suite.

### Scientific value

This is a real operational capability, not only prose. It demonstrates:

- stimulus generation;
- calibration and settling windows;
- repeated sampling;
- response matching;
- uncertainty tracking;
- adaptive experimental design;
- raw-data export.

### Limitations

- Browser audio clocks, microphone/speaker response and room acoustics require calibration.
- The FFT and matching algorithms need synthetic-signal unit tests.
- One-sigma running variation is not automatically a full uncertainty model.
- CSV schemas, device metadata, timestamps, browser version and calibration state should be recorded for reproducibility.
- Acoustic response is an analogue testbed and supplies no direct evidence for hidden time, octonionic transport or fundamental topological sectors.

### Recommended upgrade

Add deterministic tests for scheduler decisions, FFT-bin matching, FWHM estimation, baseline subtraction and CSV round trips. Add a synthetic loopback mode with known resonances before using real hardware.

## `meta`

`meta/0 - meta.md` defines seven layers: statics, dynamics, epistemics, consistency, interpretation, phenomenology and completion. This separation is sound and should remain the corpus-wide organising principle.

Its weakness is that file placement still sometimes substitutes for claim typing. The same claim can appear in an overview, kernel, REL fact and JSON work pack. The meta framework should control one canonical graph from which those views are generated.

## `speculation`

### `0a - 225 relational base.md`

Defines

\[
F=\mathbb R\oplus\mathbb C\oplus\mathbb H\oplus\mathbb O,
\qquad \dim_{\mathbb R}F=15,
\]

and studies \(F\otimes F\) or \(\operatorname{End}_{\mathbb R}(F)\), of dimension 225. The decomposition into symmetric and antisymmetric dimensions

\[
225=120+105
\]

is exact linear algebra.

What is not supplied by the dimension count is a physical metric/phase split, particle spectrum or action. The later SRP16 operator-selection theorem is the appropriate successor: it proves what selected operators exclude while keeping the physical selector origin open.

### `0b - 120 and quaternionic 4D geometry.md`

Explores numerical and geometric associations among 120, quaternionic four-dimensional structures and exceptional algebra. Its own established/speculative division is valuable. Golden-ratio or dimension coincidences should remain flags for investigation, not evidence.

### Verdict

The folder is appropriately named. Retain it as an incubator and link each promoted idea to its later exact successor.

## `research intake`

The `openai-math-2026-10-06` pack contains a README, candidate relational facts, source ledger and inquiry work pack. Its most important rule is non-propagation: external mathematical families sharpen questions but cannot automatically enter the local physical theory.

The selected topics—external orientation selectors, inverse identifiability and invariant robustness—were sensibly chosen because they address the programme's real bottlenecks. Their later use in SRP10–SRP12 respects the authority boundary.

## `other`

Only parking-area READMEs are present. There is no active scientific content to analyse.

## Recommended disposition by area

| Area | Keep canonical | Refactor | Archive/quarantine |
|---|---|---|---|
| symmetry | split domain files and formula/reference notes | source claims and remove umbrella assertions | original 66k-word monolith as historical transcript |
| phonons | mechanism and topology libraries | add citations, dates and material constraints | none broadly; quarantine speculative fundamental links |
| experiments | working web lab | add tests, calibration and metadata | obsolete prototype references when superseded |
| meta | seven-layer framework | generate views from one claim graph | duplicate manual ledgers |
| speculation | exact definitions and later successors | add promotion links | unpromoted numerical coincidence as evidence |
| research intake | governed packs | add source hashes and admission outcomes | stale unexecuted packs |

