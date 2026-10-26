# Lenses make many points

_Spectral type, multiscale closure and what a small potential can hide_

**Date:** 26 October 2026  
**Status:** standalone mathematical-physics analysis; the Becker--Yang theorem is exact, the corpus interpretation is bounded, and the experimental programme is proposed  
**Primary source:** Simon Becker and Mengxuan Yang, [“Lenses make many points: Pure point spectrum disproves Simon's \(L^2\) conjecture”](https://arxiv.org/abs/2610.31637), arXiv:2610.31637v1 (2026)  
**Corpus joins:** [spectral boundary dynamics](../programmes/admissibility/admissibility_51_spectral_boundary_dynamics_free_bloch_efimov_casimir.md) · [adversarial detector equivalence](../programmes/admissibility/admissibility_35_adversarial_detector_equivalence_atlas.md) · [the admissibility frontier](the_admissibility_frontier_current_synthesis.md)

## Abstract

A potential can be smooth, nonnegative and arbitrarily small in both uniform size and a weighted square-integral, yet reorganize every propagating state of the free Schrödinger operator into a complete family of localized eigenstates. Becker and Yang prove this in every dimension \(d\geq2\). Their operator and the free Laplacian have the same spectral set, \([0,\infty)\), but opposite spectral character: the free operator has a continuous propagation sector, while the constructed operator has pure point spectrum and no continuous spectral subspace. The result supplies a rigorous warning and a useful design principle. An allowed-energy set is not a complete description of physical possibility. One must also specify the kind of spectral measure, the geometry of its states, the transport they permit, the scales over which closure is assembled and the detector that turns those distinctions into records. The theorem does not establish new fundamental physics, a collapse process, a Jordan--Lie identification or a \(Spin(2,3)\) mechanism. It does show, exactly, that globally coordinated geometry can defeat conclusions drawn from local weakness. Its nearest practical consequence is a programme in structured localization and detector discrimination: build finite versions of the lens-and-barrier construction, hold the perturbation budget fixed, and test whether organized multiscale geometry suppresses transport in a way that radial, random and periodic controls do not.

## 1. The result in ordinary language

For a wave governed by

\[
H_V=-\Delta+V,
\]

the potential \(V\) describes the landscape through which the wave moves. If \(V=0\), a wave packet can disperse and propagate to infinity. It is tempting to expect that a sufficiently small, repulsive potential cannot destroy that extended behaviour everywhere.

The theorem says that this expectation is false in dimensions two and higher. For every \(d\geq2\), every \(0\leq\sigma<1/3\) and every \(\delta>0\), Becker and Yang construct a smooth bounded nonnegative potential satisfying

\[
\lVert V\rVert_\infty
+\int_{\mathbb R^d}|x|^{1-d}|V(x)|^2\,dx
+\int_{\mathbb R^d}|x|^{1-d+\sigma}|V(x)|^2\,dx
<\delta,
\]

while

\[
\sigma(H_V)=\sigma_{\mathrm{ess}}(H_V)=[0,\infty),
\qquad
P_c(H_V)=0.
\]

The first equality says that the set of allowed energies remains the whole nonnegative half-line. The second statement says that the continuous spectral subspace is absent. The Hilbert space is spanned by square-integrable eigenvectors; their positive eigenvalues are dense in \([0,\infty)\).

The surprise is therefore not that a weak perturbation changes an eigenvalue. It is that an arbitrarily small perturbation, when placed with sufficient geometric coordination over infinitely many scales, changes the **kind of spectrum everywhere without changing its support**.

## 2. Four statements that must not be collapsed

The theorem becomes clear once four questions are kept separate.

| Question | Mathematical object | What it tells us |
|---|---|---|
| Which energies are present? | spectral support \(\sigma(H)\) | where the spectrum lies |
| How is spectral weight carried? | pure point, absolutely continuous and singular-continuous parts | whether weight sits on normalizable eigenvectors or a continuum measure |
| What does a prepared packet do? | propagator \(e^{-itH}\), transport moments and return probabilities | whether amplitude spreads, remains localized or returns |
| What can an apparatus distinguish? | source and detector transfer functions, bandwidth, duration and noise | which mathematical differences survive as records |

The free Laplacian and the Becker--Yang operator answer the first question identically: both have spectrum \([0,\infty)\). They answer the second question differently. The theorem proves the pure-point statement; it should not be silently upgraded to every stronger form of dynamical localization without a separate bound. Nor should a finite apparatus be assumed to resolve a dense set of sharp lines from a continuum. Spectral type, dynamics and detection are related, but they are not synonyms.

This is the paper's central gift to an admissibility programme. “Energy \(E\) is allowed” is not yet “a state at \(E\) can propagate,” “a preparation reaches it,” or “a detector distinguishes it.” An admissible spectral description requires at least the typed tuple

\[
\mathcal A_{\rm spectral}
=
(\text{support},\text{measure type},\text{state geometry},
\text{transport},\text{scale},\text{record}).
\]

## 3. How a weak landscape becomes a strong global obstruction

The construction does not rely on deep attractive wells. The potential is nonnegative. Its force comes from arrangement rather than local depth.

In two dimensions, the authors place widely separated structures in growing annuli. Each active annulus combines two devices:

1. an angular lens that directs waves into narrow angular regions; and
2. reflecting barriers containing weak periodic pieces whose spectral gaps cover a prescribed bounded energy window.

The energy window grows from one annulus to the next. The annuli are made sufficiently sparse that the total weighted \(L^2\) cost remains arbitrarily small. On each scale the construction produces a compactly supported approximate inverse, apart from a small exceptional set of energies. The exceptional measures are summable. Borel--Cantelli then implies that almost every energy eventually avoids all remaining exceptional sets. The approximate inverses can be patched into a weighted right inverse, and a spectral-averaging argument converts the resulting resolvent control into pure point spectral type after a small decaying perturbation. Barrier-free balls at arbitrarily large radii still support Weyl sequences, so the spectrum and essential spectrum remain \([0,\infty)\).

The higher-dimensional cases preserve this architecture. Three dimensions use a cylindrical extension with additional confinement; general dimensions are assembled from two- and three-dimensional factors. A final dilation makes both the uniform norm and the weighted square-integrals as small as desired without changing the spectral character, apart from the expected energy rescaling.

A useful picture is not “one wall finally traps the wave.” It is a sequence of weak optical elements, each assigned a larger energy range, whose errors shrink quickly enough that almost every energy is eventually handled. No one annulus supplies the global result. The global result is the convergent organization of local operations.

## 4. Local closure across scales

The word **closure** is dangerous unless its range is named. Here it can be given a precise, modest meaning. At a finite stage, one annular block approximately closes a selected energy window under a local confinement or inverse construction, with a declared residual and an exceptional set. Later blocks extend the handled window while paying a smaller error budget. Global pure point spectral type appears only in the infinite construction and only after the analytic arguments joining those local controls.

This supplies a disciplined model for nested closure:

\[
\text{finite region + finite energy window + residual bound}
\longrightarrow
\text{larger region + larger window + smaller exception}
\longrightarrow
\text{almost-everywhere spectral conclusion}.
\]

It does **not** justify the rule that closure at a smaller scale automatically produces meaningful closure at every larger scale. The join requires compatibility conditions: the errors must be summable, the windows must cover the intended range, the later structures must not undo the earlier estimates, and the limiting operator must retain the required domain and regularity. These are the reasons this example works. They are also a checklist for any corpus claim that ultraviolet closures assemble into an infrared one.

The result therefore sharpens “local closure” into six fields:

\[
(\text{region},\text{scale},\text{energy range},
\text{residual},\text{exception},\text{composition law}).
\]

Without those fields, closure is only a metaphor.

## 5. Dynamics: unitary motion need not mean transport

The operator is self-adjoint, so

\[
U(t)=e^{-itH_V}
\]

is unitary. Norm is preserved and microscopic evolution is reversible. Nevertheless, pure point spectral type can prevent the scattering behaviour associated with the free continuous sector. This is a clean example of a distinction the corpus repeatedly needs:

\[
\text{invertible evolution}
\not\Rightarrow
\text{spatial propagation}
\not\Rightarrow
\text{return through a chosen detector port}.
\]

The potential changes which modes exist as physical carriers, not by deleting the energy half-line but by changing how states at those energies inhabit space. Nothing crosses an ontological seam and collapses. There is no added decay channel. Instead, a different global organization of the same local Schrödinger dynamics selects a different spectral realization.

This “same but different” pattern is the reason the result matters beyond its conjecture:

| Preserved | Changed | Consequence |
|---|---|---|
| energy support \([0,\infty)\) | spectral measure type | energy-domain occupancy alone is incomplete |
| self-adjointness | extended versus localized eigenstate geometry | reversibility does not guarantee transport |
| arbitrarily small local amplitude | coordinated arrangement over unbounded scales | local weakness does not bound global organization |
| smoothness and nonnegativity | scattering subspace | localization need not come from rough disorder or attractive wells |

## 6. The detector is part of the boundary

A finite experiment observes neither an infinite domain nor infinite time. A dense pure-point spectrum convolved with linewidth, loss, finite acquisition time and instrument response may resemble a continuum. Conversely, a finite periodic or disordered sample can display many sharp resonances without approaching the theorem's limiting spectral type.

The detector must therefore close locally over a declared range:

\[
r(\omega,t)
=D_{\Delta\omega,T,\eta}\bigl[S,\,U(t),\,\psi_0\bigr],
\]

where \(S\) is the source coupling, \(D\) includes bandwidth \(\Delta\omega\), observation time \(T\), efficiency and noise \(\eta\), and \(r\) is the retained record. A spectral density by itself is not enough. At least one transport-bearing record is required: boundary-to-boundary transmission, wave-packet spreading, long-time return, delay, or a spatial participation statistic.

This gives a concrete adversarial pair for detector theory:

\[
\text{dense sharp localized lines}
\quad\hbox{versus}\quad
\text{a genuinely extended continuum}.
\]

The practical question is not only whether they are mathematically distinct. It is the time, bandwidth, port geometry and signal-to-noise required to distinguish them. If no available record separates them, the apparatus has quotiented away the distinction.

## 7. Where the result joins the corpus

### 7.1 Jordan admission and Lie transport

The theorem neither uses nor derives Jordan algebras, \(Sp(4,\mathbb R)\), \(Spin_0(2,3)\), the magic square or \(E_8\). It cannot serve as evidence for those structures.

It does, however, clarify the job split. Self-adjoint unitary evolution supplies lawful transport, but that law alone does not say whether the admitted carriers are extended waves or localized eigenvectors. The positive state space, operator domain, spectral measure and multiscale geometry constrain what the evolution can actually carry. In corpus language, the result strengthens the need for a typed middle between admission and transformation. It does not identify that middle with a particular symmetry.

### 7.2 Spectral boundary dynamics

The existing free/Bloch/resonant/bound atlas must be refined. “Continuum” can mean a continuous **set of energies** or a continuous **spectral component**; the two meanings come apart here. Dense positive eigenvalues also show that “discrete state” need not mean isolated energy. The corrected vocabulary is:

- **spectral support:** the set of energies;
- **spectral type:** point, absolutely continuous or singular continuous;
- **multiplicity and geometry:** how many states and how they occupy space;
- **dynamics:** what a prepared state does;
- **detector record:** what survives finite observation.

### 7.3 Quasicrystal, topology and exceptional structure

The construction is a hostile conventional control for structured-wave experiments. Nonperiodic, multiscale geometry can suppress transport without a topological invariant, exceptional algebra or new interaction. A proposed quasicrystal or \(E_8\)-labelled device must therefore show a record tied to its claimed invariant—edge chirality, quantized response, protected defect content, or a source-native reconstruction—not localization alone.

### 7.4 Response and Casimir lanes

The theorem is about a scalar Schrödinger operator, not electromagnetic Casimir response. It does not predict a Casimir anomaly. Its transferable warning is narrower: equal spectral support need not imply equal resolvent, local density of states, transport or response. Any response calculation must carry spectral type, matrix elements, boundary conditions and detector weighting, rather than infer an observable from an energy set alone.

## 8. What is closed, what is open

### Closed by the theorem

- Simon's stated multidimensional \(L^2\) expectation is false for the class constructed.
- Small \(L^\infty\) norm plus the declared weighted \(L^2\) controls do not guarantee a surviving continuous spectral subspace.
- Nonnegative smooth potentials can support dense positive pure point spectrum while the essential spectrum remains \([0,\infty)\).
- Spectral support cannot determine spectral type.

### Not closed by the theorem

- whether \(\sigma=1/3\) is a sharp physical or mathematical boundary, rather than a limit of the construction;
- whether the counterexamples form a robust open family or require strong multiscale tuning;
- quantitative dynamical-localization bounds for the constructed operators;
- the finite number of annuli needed for a detector-resolvable precursor;
- stability under absorption, non-Hermitian coupling, nonlinearities and fabrication disorder;
- which lattice, graph or circuit discretizations preserve the mechanism;
- whether stronger symmetry, monotonicity, isotropy or locality assumptions restore an absolutely continuous sector;
- the observation time at which dense point and continuous spectra become distinguishable.

These questions mark the boundary between an existence theorem and theoretical engineering.

## 9. A finite experimental programme

The theorem's infinite construction cannot be built literally. Its mechanism can be tested as a controlled finite sequence in a reconfigurable two-dimensional acoustic, microwave, photonic or mechanical wave platform.

### 9.1 Intervention families

Fabricate or program four landscapes with matched peak strength, integrated weighted power, outer radius, loss and port geometry:

| Arm | Landscape | Purpose |
|---|---|---|
| A | annular angular lenses plus designed reflecting/periodic barrier sectors | candidate finite Becker--Yang mechanism |
| B | radial annular barriers without angular lenses | tests whether barriers alone explain the record |
| C | randomized angular sectors with the same budget | tests generic disorder/localization |
| D | periodic, quasicrystalline and amorphous comparators | separates this mechanism from band, topological and ordinary localization accounts |

For each arm, increase the number of annular stages \(N\) while preserving a frozen construction rule. Independently calibrate the focusing action of one lens and the stop bands of one barrier before composing them.

### 9.2 Records

Measure, under one shared calibration and covariance model:

- spatially resolved mode profiles, inverse participation ratio and participation entropy;
- boundary-to-boundary complex transmission;
- wave-packet mean-square displacement and survival/return probability;
- Wigner--Smith delay or its platform-specific phase derivative;
- local density of states at several frequency resolutions;
- eigenfrequency drift and mode overlap as \(N\), loss and controlled disorder change.

### 9.3 Gates

**Build gate.** A single lens focuses into its declared angular channel, and a single barrier displays its predicted stop bands, with uncertainty small enough to propagate through the composed model.

**Bridge gate.** At matched perturbation budget, arm A shows a systematic reduction of transport and stable spatial localization over a growing frequency window that arms B and C do not reproduce. Failure sends the programme back to ordinary barrier or disorder physics.

**Scale gate.** The affected window and localization record change with \(N\) in the preregistered direction, and the inferred residual or exceptional fraction decreases. A one-stage resonance is not multiscale closure.

**Robustness gate.** The signal survives a declared interval of placement, component and loss perturbations. If infinitesimal mistuning destroys it, the result remains a fine-tuned demonstrator rather than a technology.

**Detector gate.** Spectral-density-only measurements are shown to confuse at least one dense-line configuration with an extended comparator, while a transport- or phase-bearing record separates them at a predicted acquisition time and resolution.

**Stop rule.** Stop claiming the lens mechanism if a matched random or radial control explains the full joint record, if ordinary loss accounts for the apparent localization, or if the trend fails to strengthen with added scales.

### 9.4 Outcomes and implications

| Outcome | Warranted conclusion | Next move |
|---|---|---|
| A differs from all matched controls and scales as predicted | finite multiscale geometric localization demonstrated | optimize robustness and discretization; no new-physics claim |
| A and C agree | ordinary disorder explanation survives | characterize universality; retire mechanism-specific language |
| spectra agree but transport differs | detector has exposed the support/type or support/dynamics distinction | develop a calibrated dense-point/continuum discriminator |
| effect vanishes with weak loss or mistuning | asymptotic construction lacks present engineering tolerance | quantify tolerance scaling or stop |
| unexplained residual survives all conventional controls | model insufficiency, not yet new physics | independent platform replication and complete nuisance closure |

Every plausible positive outcome first yields theoretical-engineering improvement: new ways to localize, route, store or distinguish waves using weak structured landscapes. “New physics” becomes available only if a replicated residual defeats the complete conventional wave, loss, fabrication and detector model. The theorem itself gives no reason to expect such a residual.

## 10. Alternative ways to picture the theorem

These pictures are optional. None replaces the proof.

- **A city with unchanged addresses but closed roads.** Every energy address still exists, but the routes that once carried traffic across the city have been reorganized into local residences.
- **A weak instruction repeated coherently.** No instruction is strong, yet each acts on the part of the signal passed to it by the preceding lens. Organization, not amplitude, carries the global effect.
- **A detector-resolution trap.** A forest of lines can look like a filled band from far away. Moving closer in frequency is not enough if one never measures whether the states transport.
- **Nested admissibility.** Each annulus handles a bounded range with a bounded error. The limiting statement is earned only because those ranges, errors and exceptions compose.

The pictures explain why the result feels larger than the potential. They must not be used to infer cosmology, consciousness, measurement collapse or theological doctrine.

## 11. Provenance and the role of machine assistance

The paper reports that ChatGPT contributed to the development of an early construction, the spectral-averaging route to pure point spectrum, the extension to full spectrum and editorial work; the authors state that they rewrote the text and take responsibility for the result. This is relevant to the corpus's interest in tool-assisted mathematical discovery, but it is not evidence for the theorem. The evidence is the proof, its expert checking and whatever independent scrutiny follows. Provenance should remain visible without being confused with validity.

## Conclusion

The theorem changes the admissibility map at one precise seam. A small local perturbation budget does not define a small global change when geometry coordinates the perturbation across unbounded scales. An energy set does not tell us whether its states propagate. Unitary evolution does not guarantee transport. A finite detector may erase the difference between a dense collection of localized lines and a continuum.

The resulting rule is simple:

\[
\boxed{\text{Do not call a spectral region admissible until support, type, dynamics, scale and record are all declared.}}
\]

That rule is mathematically forced here, experimentally actionable, and independent of any grander identification. The immediate invitation is not to search for a hidden group. It is to build the finite lens-and-barrier comparison, ask which distinctions survive, and determine how much global structure can be engineered from locally weak parts.

## Sources

- Simon Becker and Mengxuan Yang, [“Lenses make many points: Pure point spectrum disproves Simon's \(L^2\) conjecture”](https://arxiv.org/abs/2610.31637), arXiv:2610.31637v1 (2026). [PDF](https://arxiv.org/pdf/2610.31637)
- Barry Simon's conjecture is stated and discussed in the Becker--Yang paper; this paper relies on their account rather than creating a second historical authority.

