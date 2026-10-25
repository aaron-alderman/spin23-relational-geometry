# Dynamic admissibility: modulation, resonance, geometry, detection and metastability

**Date:** 23 October 2026  
**Status:** dynamic-response atlas and experimental workbench  
**Parent:** [Invariant atlas](admissibility_05_invariant_atlas_time_force_measure_material_rotation.md)  
**Related:** [Dispersion-force landscape](admissibility_04_dispersion_force_landscape.md)  
**Zone map:** [filled regions, open regions and known/unknown frontiers](admissibility_07_zone_known_unknown_frontiers.md)
**Transition-operator continuation:** [selection rules, widths and lifetimes](admissibility_127_transition_operators_selection_rules_and_lifetime_frontier.md)

## The joined picture

The invariant atlas describes what survives an allowed transformation. A time-varying experiment asks a different but complementary question: how does a system move among its admissible states, and which part of that motion survives the detector chain as a record?

The relevant architecture is

\[
\boxed{\text{drive and modulation}}
\to
\boxed{\text{frequency response and resonance}}
\to
\boxed{\text{geometry, boundary and topology}}
\to
\boxed{\text{magnetic/material memory}}
\to
\boxed{\text{detector and inference}}
\to
\boxed{\text{record}}.
\]

Metastability spans the middle of this chain. It lets a system retain a history long after the initiating drive has changed, producing lag, switching and hysteresis. Detection closes the chain operationally: it converts a physical response into a finite-bandwidth, noisy and model-dependent record.

## Periodic time variation and phase

For a sinusoidal drive,

\[
x(t)=\operatorname{Re}\!\left[x_0e^{-i\omega t}\right],
\]

a linear time-invariant response takes the frequency-domain form

\[
y(\omega)=\chi(\omega)x(\omega),
\qquad
\chi(\omega)=|\chi(\omega)|e^{i\phi(\omega)}.
\]

The magnitude describes gain or susceptibility and \(\phi\) describes phase lag. Absolute phase depends on the time origin. A relative phase between coherently referenced channels at the same frequency survives a common shift of time origin and can therefore be an operational invariant.

The real-time condition for real signals is

\[
\chi(-\omega)=\overline{\chi(\omega)}

\]

for the appropriate reciprocal scalar response. This is why positive- and negative-frequency sidebands are constrained partners rather than automatically independent physical species.

### Phase objects

Several different phase structures must remain typed:

| Phase object | Natural invariant | Boundary |
|---|---|---|
| Oscillator phase | phase difference relative to a reference | absolute phase changes with clock origin |
| Closed parameter cycle | winding or Berry phase modulo gauge | requires an independently defined loop and gapped transport |
| Scattering phase | eigenphase or phase shift relative to asymptotic channels | depends on channel normalization and reference |
| Floquet phase | eigenvalue of one-period evolution | quasienergy is defined modulo the drive quantum |
| Hysteresis loop | oriented loop and dissipated-cycle area | depends on conjugate variables and sweep protocol |

Writing every phase as a sine or complex exponential does not make these the same physical object.

## Frequency dependence and causal response

A causal linear response has a retarded kernel

\[
y(t)=\int_{-\infty}^{t}dt'\,\chi_R(t-t')x(t').
\]

Its Fourier transform has analytic structure tying magnitude and phase through dispersion relations. Poles, branch cuts, zeros and spectral weights encode distinct response content:

- **poles:** resonant or relaxation modes;
- **pole imaginary parts:** damping or lifetime;
- **residues:** coupling of the probe to each mode;
- **zeros:** destructive response or transmission blocking;
- **branch cuts:** continua and thresholds;
- **high-frequency asymptotics:** locality, inertia and sum-rule information.

Under a change of internal basis, a response matrix transforms, while its pole set, determinant, trace and generalized eigenvalues can provide basis-invariant information when domains and normalizations are controlled.

Frequency dependence is not a nuisance appended to a static material number. It is the record of which internal timescales and channels the probe can access.

## Resonance

A damped oscillator provides the minimal model:

\[
\chi(\omega)=\frac{1}{k-m\omega^2-i\gamma\omega}.
\]

Its response peak, phase rotation and complex poles are related but not identical definitions of resonance once damping is appreciable. In the weakly damped regime, the dimensionless quality factor is approximately

\[
Q\simeq\frac{\omega_0}{\Delta\omega}
\simeq\frac{m\omega_0}{\gamma}.
\]

The resonance frequency is not generally an invariant of the isolated component. It can move with boundary conditions, loading, coupling, temperature, magnetic field, amplitude and detector backaction. The more robust object is the pole of the complete declared response problem.

This gives the admissibility interpretation:

> A resonance is an admitted dynamical mode only after its state space, boundary conditions, causal prescription, damping channels and probe coupling are specified.

## Lag, memory and hysteresis

### Linear phase lag

Linear lag can occur in a unique stationary state with no multistability. The output ellipse formed against the input reflects a complex susceptibility and dissipated power. It need not imply hysteresis in the strong memory sense.

### Hysteresis

Hysteresis means the response depends on history. For conjugate drive and response variables \(X\) and \(Y\), an oriented cycle can carry work or dissipation

\[
W_{\rm cycle}=\oint Y\,dX.
\]

The loop area is physically meaningful only after the conjugate normalization is fixed. It can depend on sweep rate, amplitude, noise, temperature and waiting time. A nonzero loop may arise from metastable switching, domain motion, frictional loss, delayed kinetics or a nonequilibrium dynamic phase transition; its presence does not uniquely identify the mechanism.

### Memory kernels

More generally,

\[
y(t)=\int_{-\infty}^{t}K(t,t')x(t')\,dt'

\]

need not reduce to a time-translation-invariant convolution. Aging, adaptation and changing material state make the kernel depend on both times independently. The system then cannot be characterized by one \(\chi(\omega)\) without a controlled approximation.

## AM, FM, sidebands and sweeping

### Amplitude modulation

For

\[
x_{\rm AM}(t)=A_0[1+m\cos(\Omega t)]\cos(\omega_c t),
\]

the spectrum contains a carrier at \(\omega_c\) and sidebands at \(\omega_c\pm\Omega\). Linear response treats these frequencies independently; nonlinearity and time variation mix them further.

### Frequency or phase modulation

For

\[
x_{\rm FM}(t)=A_0\cos[\omega_ct+\beta\sin(\Omega t)],
\]

the spectrum contains a Bessel-weighted ladder \(\omega_c+n\Omega\). This provides a controlled method for probing a response across neighboring frequencies while preserving coherent phase relations.

### Sweeps and chirps

A sweep declares \(\omega=\omega(t)\). Its interpretation depends on competing timescales:

\[
\tau_{\rm drive},\quad
\tau_{\rm relaxation},\quad
\tau_{\rm escape},\quad
\tau_{\rm detector}.
\]

- If the drive is slow relative to relaxation, the response can track a quasistatic branch.
- If it is fast, lag and nonadiabatic transitions appear.
- If metastable lifetimes are long, upward and downward sweeps can follow different branches.
- If detector integration is slow, switching and sidebands are averaged away.

A sweep direction asymmetry is therefore evidence of history dependence in the complete system-plus-detector chain, not automatically a new microscopic symmetry violation.

## Floquet admissibility

For a periodic Hamiltonian or evolution law

\[
H(t+T)=H(t),
\]

the one-period operator

\[
U_F=\mathcal T\exp\!\left[-\frac{i}{\hbar}\int_0^T H(t)\,dt\right]

\]

has basis-invariant eigenvalues. Writing them as

\[
e^{-i\varepsilon_aT/\hbar}

\]

defines quasienergies only modulo \(\hbar\Omega\), with \(\Omega=2\pi/T\). Exact finite-order returns, anomalous edge modes, winding and protected gaps require global information about the full period, not merely positivity of the instantaneous Hamiltonian.

This directly matches the corpus's warning that a healthy pulse generator does not protect its pulse area or finite group order. Timing and ordering are physical data unless a topology, quantization condition or boundary construction fixes them.

## Geometry, boundaries and topology

### Geometry

Geometry controls lengths, angles, curvature, mode overlap and propagation. In response language it enters the Green operator

\[
G(\omega;\mathbf x,\mathbf x')

\]

and the translation operators between scattering bodies. Moving a boundary or changing curvature can shift poles, split degeneracies and alter detector coupling without changing material composition.

### Boundaries

Boundary conditions determine which solutions belong to the physical domain. Dirichlet, Neumann, impedance, radiative and interface-matching conditions generally produce different spectra. A boundary may also carry degrees of freedom, dissipation, anomaly inflow or a selected orientation; it is not always a passive edge of the calculation.

### Topology

Topology constrains global composition through winding, holonomy, flux sectors, indices and characteristic classes. It can protect a mode against local perturbations that preserve the relevant gap and symmetry. It does not by itself determine:

- the energy scale or velocity;
- the occupation of the protected sector;
- coupling to an external detector;
- lifetime under symmetry-breaking perturbations;
- or the material response away from the topological limit.

Geometry changes continuously; topology changes only through a singularity, gap closing or change of admissible class. Boundary spectra can reveal bulk topology, but only after the bulk-boundary map and physical operator are specified.

## Magnetic interactions

Magnetic phenomena join rotation, phase, geometry, material response and memory.

### Distinct mechanisms

| Mechanism | Schematic structure | Principal control |
|---|---|---|
| Lorentz coupling | \(q\mathbf v\times\mathbf B\) | charge, velocity and field |
| Zeeman coupling | \(-\boldsymbol\mu\cdot\mathbf B\) | magnetic moment and field |
| Dipole interaction | \(r^{-3}[\mathbf m_1\cdot\mathbf m_2-3(\mathbf m_1\cdot\hat r)(\mathbf m_2\cdot\hat r)]\) | geometry and orientation |
| Exchange | quantum overlap and spin symmetry | electronic structure; not a classical dipole force |
| Spin--orbit coupling | spin, momentum and electric/crystal field | relativistic and material structure |
| Inductive/eddy response | frequency-dependent currents and fields | conductivity, geometry and skin depth |
| Magnetic texture | domains, vortices, skyrmions and walls | exchange, anisotropy, field, topology and defects |

Under microscopic time reversal, magnetic field, magnetization, angular momentum and current reverse sign. This produces Onsager--Casimir relations rather than ordinary symmetric reciprocity at a fixed field. A magnetic response must therefore record which variables are even or odd and whether the comparison also reverses the bias field.

Flux and vector potential add global phase structure. A Wilson or Aharonov--Bohm loop can retain holonomy even where local field strength vanishes along the path. The observable is the loop phase or interference change, not an absolute gauge potential.

### Magnetic hysteresis

Ferromagnetic hysteresis combines metastable domains, pinning, nucleation and dissipative motion. The loop is not a fundamental invariant of the material alone: it depends on specimen shape, demagnetization field, defects, temperature, sweep rate and measurement protocol. Coercivity and remanence are operational parameters of a declared protocol.

## Metastable states

A metastable state is locally persistent but not globally stable. In an energy-landscape description it occupies a local minimum separated by a barrier \(\Delta E\). Thermal activation often gives the schematic lifetime

\[
\tau\sim\tau_0e^{\Delta E/(k_BT)},

\]

with a prefactor determined by curvature, damping and escape geometry. Quantum tunnelling, driven activation and collective nucleation require different rate laws.

The classification depends on observation time:

\[
\tau_{\rm measurement}\ll\tau
\quad\Rightarrow\quad
\text{apparently stable},
\]

while

\[
\tau_{\rm measurement}\gtrsim\tau
\quad\Rightarrow\quad
\text{switching or decay is resolved}.
\]

Metastability can appear as:

- a pole close to the real axis or a small Liouvillian decay rate;
- a local minimum of a free-energy functional;
- a long-lived topological or symmetry-protected sector;
- a pinned domain configuration;
- a supercooled phase awaiting nucleation;
- or a detector state deliberately designed to latch.

These descriptions are not automatically equivalent. A topological label can suppress some decay channels without guaranteeing infinite lifetime; a local energy minimum can be destroyed by a new collective path; and an apparent resonance can be detector-limited rather than intrinsically long lived.

Metastability is the physical bridge from microscopic dynamics to memory. It explains how history can remain present after the drive is removed without requiring a fundamental violation of reversible microscopic laws.

There is a second, physically distinct source of metastability. A quantum state
may have lower-energy destinations but no nonzero matrix element for the
leading interaction operator. Atomic helium makes this visible: energy permits
decay, while parity and spin close the ordinary electric-dipole route, leaving
only much weaker higher-order or mixing-induced channels. The resulting
lifetime is an **operator-access bottleneck**, not a barrier-crossing time. The
[transition-operator bridge](admissibility_127_transition_operators_selection_rules_and_lifetime_frontier.md)
connects Wigner--Eckart factorization, multipole selection rules, partial
widths, atomic metastability and nuclear decay without treating them as one
mechanism.

## Detection and detectors

The detector is part of the physical model. A minimal measurement chain is

\[
s(t)
\xrightarrow{\text{coupling}}
u(t)
\xrightarrow{h_D}
v(t)
\xrightarrow{\text{sampling/threshold}}
d
\xrightarrow{\text{inference}}
\widehat\theta.
\]

A linear detector can be modeled as

\[
v(t)=\int h_D(t-t')u(t')\,dt'+n(t),

\]

where \(h_D\) is its impulse response and \(n\) is noise. Required detector data include:

- gain and phase calibration;
- bandwidth and impulse response;
- noise spectrum and cross-channel covariance;
- saturation and nonlinearities;
- dead time, thresholds and efficiency;
- spatial acceptance and finite detector volume;
- timing reference and clock stability;
- backaction on the measured system;
- and the analysis/selection rule converting samples into events.

The detector can erase information. Finite bandwidth removes fast switching and distant sidebands; averaging removes phase; thresholding discards amplitude; acceptance folds spatial and lifetime distributions; and nuisance fitting can absorb a real signal. A detector-folded null result is therefore a statement about the complete source--propagation--detector model.

### Lock-in and coherent detection

Lock-in detection projects the response onto reference quadratures:

\[
I\propto\langle y(t)\cos\omega_rt\rangle,
\qquad
Q\propto\langle y(t)\sin\omega_rt\rangle.
\]

This preserves relative phase while rejecting out-of-band noise. It is well matched to the corpus's orientation-odd and holonomy proposals, but only if the phase reference, coherence time, integration window and nuisance quadratures are declared before interpretation.

### Detection as admissibility

Detection does not make an otherwise inconsistent state physical. It selects which features of an admitted physical process become stable records. Operationally,

\[
\text{physical possibilities}
\xrightarrow{\text{detector channel}}
\text{record distributions}.
\]

The detector channel is many-to-one. Claims about ontology must therefore not be inferred from detector compression alone.

## Dynamic invariants and robust observables

The following are candidates for the dynamic atlas, each with a declared context:

| Candidate | Transformation under which it is robust | Main caveat |
|---|---|---|
| relative phase | common time-origin shift | requires coherence and common reference |
| phase winding | smooth loop deformation avoiding singularities | loop and branch structure must be physical |
| response pole set | similarity/basis changes | moves with boundary, state and coupling |
| \(Q=\omega_0/\Delta\omega\) | unit rescaling | definition becomes ambiguous for overlapping/non-Lorentzian modes |
| Floquet multipliers | basis change and quasienergy relabelling | depend on the full drive period and timing |
| normalized hysteresis area | coordinate/unit convention after normalization | protocol and rate dependent |
| topological index | gap- and symmetry-preserving deformation | does not set energy or detector coupling |
| magnetic flux/holonomy | gauge change | path and enclosed structure matter |
| escape-rate ratio | common time-unit change | model and observation-window dependent |
| likelihood ratio | reparameterization of data representation | depends on declared hypotheses and nuisance model |

The programme should prefer these relational or dimensionless objects over raw peak heights and visually chosen crossover points.

## Corpus anchors

The existing corpus already contains controlled pieces of this atlas:

- [the quadrature lock-in protocol](../../claims/0300-0399/339_a_quadrature_lockin_protocol_measures_the_three_port_schur_holonomy.md) makes an oriented phase response operational;
- [detector folding and Fisher-information contraction](../../claims/0700-0799/739_detector_folding_is_a_positive_markov_compression_that_can_only_contract_cp_fisher_information.md) proves that detector compression cannot create discriminating information;
- [the real-time sideband completion](../../claims/0700-0799/781_a_sideband_exchange_real_structure_gives_the_complex_scattering_checkpoint_a_real_time_reciprocal_passive_completion.md) types negative frequency as constrained conjugate data;
- [the sideband-reversing rational-inner cycle](../../claims/0900-0999/904_a_sideband_reversing_rational_inner_boundary_cycle_realizes_the_exact_a2_coxeter_element_with_positive_pole_scales.md) gives an exact frequency-domain construction while leaving physical conversion and pole protection open;
- [the oriented-shift theorem](../../claims/0900-0999/934_the_three_label_shift_requires_an_oriented_autonomous_twist_or_two_ordered_reciprocal_faces.md) separates time-reversal-odd autonomous transport from an ordered Floquet word;
- [the paired-wall spectral law](../../claims/1000-1099/1054_the_exact_piecewise_pfaffian_kink_antikink_spectrum_obeys_an_implicit_exponential_law_and_calibrates_the_endpoint_projection.md) gives an exact finite-size level while leaving its physical length scale underived; and
- [the detector-geometry bridge](../worldwright-physics-bridge/initial_dynamics_bridge_2026-10-23.md) shows how finite source and detector volumes materially change an inferred coupling.

These results provide laboratories. None alone derives the full dynamic architecture.

## Research packet R

### R1 — oscillator-to-detector benchmark

Construct a causal driven oscillator with a calibrated detector. Compare pole, peak, phase-crossing and time-domain ringdown definitions of resonance.

**Target:** identify which estimates are invariant under gain, time-origin and channel-basis changes.

### R2 — AM/FM response tomography

Drive the same response with amplitude modulation, frequency modulation and a chirp. Recover the susceptibility from sidebands and compare information loss after detector bandwidth and noise folding.

**Target:** determine the minimal modulation/detection packet that reconstructs magnitude and phase without assuming the response model.

### R3 — boundary and topology comparison

Use one bulk operator with several boundary conditions and one topologically distinct geometry. Track poles, edge modes, winding and detector overlaps separately.

**Target:** distinguish geometric spectral shifts from topological protection.

### R4 — magnetic reciprocity and hysteresis

Construct a two-channel magnetic response with declared time-reversal parities. Reverse both observation direction and magnetic bias as required by Onsager--Casimir reciprocity, then add a metastable domain variable.

**Target:** separate reversible odd response from irreversible-looking hysteresis.

### R5 — metastable time-window audit

Analyze one barrier model over drive, relaxation, escape and detector timescales. Predict dwell-time distributions and sweep-direction dependence.

**Target:** replace the label “metastable” with a falsifiable lifetime and switching model.

### R6 — record-formation boundary

Pass a coherent phase signal through continuous readout, finite integration, thresholding and event selection. Track likelihood, Fisher information and lost phase at each stage.

**Target:** state exactly when a physical distinction ceases to be observable without claiming that it ceases to exist.

## Provisional synthesis

Time variation turns the invariant atlas into dynamics. Phase provides relational orientation; frequency response reveals internal timescales; resonance exposes admitted modes; modulation and sweeps interrogate them; geometry and boundaries select their spectrum; topology constrains global transport; magnetic interactions supply time-reversal-odd coupling and material memory; metastable states retain history; and detectors compress the resulting process into records. The common object is not a sine wave, resonance peak or hysteresis loop by itself. It is the complete typed map from controlled drive to record distribution. That map is the natural experimental unit of admissibility.
