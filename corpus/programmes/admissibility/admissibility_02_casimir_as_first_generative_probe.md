# Casimir as the first generative probe of admissibility

**Date:** 23 October 2026  
**Status:** first worked admissibility survey; exact representation facts separated from generative conjecture  
**Parent:** [Admissibility foundations](admissibility_00_foundational_programme.md)  
**Control ledger:** [Physics contact and research docket](admissibility_01_physics_contact_and_research_docket.md)  
**Surrounding landscape:** [London, van der Waals, Casimir--Polder and Lifshitz forces](admissibility_04_dispersion_force_landscape.md)

## Opening question

If admissibility is prior to physical structure, where should the investigation begin?

The Casimir is a productive first probe because it sits exactly at the boundary between **transformation** and **classification**. Once a family of transformations has been admitted as symmetry, a Casimir identifies quantities unchanged by those transformations. Its eigenspaces can organize sectors, thresholds and selection rules. Yet a Casimir usually does not choose the symmetry, representation, dynamics, physical inner product, realized sector or dimensional scale. It therefore provides both a generative opportunity and an immediate guard against overclaiming.

The first working thesis is:

> A Casimir is not yet a law of motion; it is an invariant record of which distinctions survive an admitted transformation structure.

The stronger research question is whether the transformation structure itself can be derived from contextual admissibility, so that the Casimir and its physical sectors appear as outputs rather than inputs.

## First distinction: the different Casimirs

The corpus uses the name in several noninterchangeable senses.

| Use | Object | What it can establish | What it does not establish |
|---|---|---|---|
| Lie-algebra Casimir | central element of an enveloping algebra | representation labels and invariant differential operators | which algebra or representation Nature realizes |
| Poincaré Casimirs | \(P^2\) and \(W^2\) | mass and spin labels in suitable unitary one-particle representations | interactions, particle abundance or ultraviolet completion |
| Compact gauge Casimir | e.g. \(SU(2)\) electric \(C_2\) | representation energy and rigorous spectral-tail floors in a specified Hamiltonian | a volume-uniform continuum mass gap |
| Geometric Casimir | invariant Laplace--Beltrami operator on a homogeneous or arithmetic quotient | a natural self-adjoint spectral problem after domain and measure are fixed | a physical Hamiltonian or special arithmetic spectrum without a dictionary |
| Conformal/threshold Casimir | invariant of \(SO(2,1)\), \(SL(2,\mathbb R)\) or a related conformal algebra | organization of scaling and threshold representations | Efimov physics without the correct three-body dynamics and exponent |
| Casimir effect | renormalized boundary-dependent change in vacuum free energy or stress | a measurable force after geometry, material response and subtraction are fixed | a universal separation or automatic link to a Lie Casimir |
| Onsager--Casimir relation | time-reversal refinement of reciprocal response | parity-dependent transpose relations | a central representation invariant or vacuum force |

The shared name is an invitation to construct typed maps, not evidence that one mechanism underlies every row.

## Corpus anchors

This survey consolidates rather than replaces the corpus's typed results:

- [the Spin(2,3) pole synthesis](../../claims/0000-0099/40_grand_synthesis_spin23_pole.md) separates Casimir operators from the Casimir effect and states the representation-to-stress descent chain;
- [the Poincaré commutant obstruction](../../claims/1700-1799/1769_ordinary_continuous_symmetry_cannot_be_the_missing_spin_two_torsion_mixer.md) uses distinct spin-Casimir eigenspaces to exclude an ordinary internal spin-two/spin-zero mixer;
- [the certified one-plaquette Hamiltonian](../../claims/1600-1699/1617_the_su2_one_plaquette_hamiltonian_gap_is_certifiable_but_its_bounds_are_not_uniform_in_volume_or_continuum_limits.md) uses the compact gauge Casimir as a rigorous spectral-tail floor while rejecting the continuum-gap promotion;
- [the arithmetic Jordan-tube quotient](../../claims/1100-1199/1154_arithmetic_quotient_of_the_jordan_tube_gives_a_real_zeta_scattering_bridge_but_adds_new_structure.md) constructs a natural Laplace--Beltrami/Casimir operator but leaves the quotient and physical dictionary as new data;
- [the conjugate-sector response audit](../../claims/1200-1299/1229_conjugate_z3_sectors_are_degenerate_for_same_parity_probes_but_an_oriented_odd_probe_separates_them_without_solving_a5.md) keeps Onsager--Casimir reciprocity distinct from the representation and vacuum-force meanings; and
- [the comprehensive thesis](../../syntheses/grand-synthesis/aarons_spin23_research_thesis.md) rejects a universal ideal Casimir separation and requires any shared spectral correction to survive laboratory, propagation and CMB constraints with common parameters.

## The exact algebraic seed

Let \(\mathfrak g\) be a semisimple Lie algebra with basis \(T_a\), representation \(\rho\), and a nondegenerate invariant bilinear form \(\kappa\). The quadratic element

\[
C_2=\kappa^{ab}\rho(T_a)\rho(T_b)
\]

commutes with the represented algebra:

\[
[C_2,\rho(T_c)]=0.
\]

On an irreducible complex representation, Schur's lemma makes it scalar:

\[
C_2\big|_{V_R}=c_R I.
\]

This is the first exact admission pattern. If the transformations generated by \(\mathfrak g\) are admitted equivalences, then \(c_R\) is unchanged throughout an irreducible sector. Transformations commuting with the same algebra cannot mix sectors carrying incompatible central characters unless the structure is enlarged or one of the assumptions is relaxed.

The caveats matter. Non-semisimple algebras require their own invariant theory; a degenerate Killing form cannot simply be inverted; noncompact groups have domain, unitarity and continuous-spectrum issues; reducible representations retain multiplicities invisible to the Casimir; and two inequivalent representations can share the same quadratic eigenvalue. A quadratic Casimir is therefore a classifier, often an incomplete one.

## The admissibility inversion

The conventional chain is

\[
G\ \text{given}
\longrightarrow
\mathfrak g
\longrightarrow
C_2
\longrightarrow
\text{representation labels}.
\]

The admissibility programme asks whether a longer chain can be justified:

\[
\begin{aligned}
&\text{possible distinctions and compositions}\\
&\quad\xrightarrow{\text{joint-realizability rules}}
\text{admissibility-preserving transformations}\\
&\quad\xrightarrow{\text{continuous component}}
G\ \text{and}\ \mathfrak g\\
&\quad\xrightarrow{\text{invariant pairing/central structure}}
C_2,C_3,\ldots\\
&\quad\xrightarrow{\text{positive representations}}
\text{admissible sectors}\\
&\quad\xrightarrow{\text{dynamics and empirical realization}}
\text{physical particles, modes or responses}.
\end{aligned}
\]

Only the middle algebraic arrows are automatic in familiar cases. The first arrows must derive the symmetry without assuming it, while the final arrows must supply the physical inner product, dynamics, scale and measurement dictionary.

This identifies a possible foundational role for the Casimir without making the Casimir foundational in isolation: it is the first stable invariant generated after admissible equivalences acquire symmetry.

## What the Poincaré case teaches

For a massive one-particle Poincaré representation, the two standard invariants are

\[
P^2=-m^2,
\qquad
W^2=-m^2s(s+1)

\]

in the convention used by the corpus. These invariants classify mass and spin once a positive-energy unitary representation and one-particle interpretation are already available.

The corpus's cross-sector symmetry obstruction is a clean example of Casimir admissibility. An ordinary internal generator \(B\) commuting with Poincaré obeys

\[
[B,P^2]=[B,W^2]=0.
\]

It cannot rotate a spin-two state into a spin-zero state with a different \(W^2\) eigenvalue. The alternatives are not “anything is possible”; they are typed changes to the framework: graded symmetry, higher-spin or infinite towers, nonstandard asymptotics, nonlocality, AdS structure, or abandonment of the assumed S-matrix conditions.

This is precisely how admissibility should work. The invariant does not explain why the world contains a given mass or spin, but it sharply partitions which transformations are possible without changing the admitted symmetry structure.

The missing generative steps are equally clear:

1. derive or recover Poincaré symmetry as the local transformation structure;
2. derive the positive-energy unitary representation domain;
3. obtain the particle/asymptotic-state interpretation;
4. select the realized values of \(m\) and \(s\);
5. derive interactions that preserve or appropriately break the classification.

## What the compact gauge case teaches

The corpus's one-plaquette \(SU(2)\) Hamiltonian supplies the most concrete constructive laboratory. In its character basis,

\[
h_\kappa=C_2+\kappa(2-\chi_{1/2}),
\]

and the electric Casimir grows along the representation tower. Positivity of the magnetic term lets the Casimir provide a rigorous lower floor for the omitted tail. At zero coupling deformation, the first exact gap is

\[
C_2(1/2)-C_2(0)=\frac34.
\]

Here the Casimir does real mathematical and physical work: it organizes the gauge-invariant basis, enters the Hamiltonian, confines character number and certifies truncation error. Yet the same worked example supplies its boundary. The isolated compact-rotor gap is a cutoff-scale excitation; the estimates are not uniform in volume; and no four-dimensional continuum Yang--Mills mass gap follows.

The lesson is:

> A Casimir can make a finite spectral problem admissible and certifiable without making its gap a fundamental continuum scale.

This is an ideal benchmark for the new programme because it contains an exact success and an exact failed promotion in one model.

## What the noncompact and threshold cases teach

Noncompact real forms place additional pressure on admissibility. The same complexified algebra can support compact discrete spectra, noncompact continuous spectra, complementary or discrete series, and representations with unacceptable norms depending on real form, domain and inner product.

The corpus proposes that compact/noncompact transitions may organize bound, free and threshold behavior around the \(Spin(2,3)\) pole. Casimir data can label those representations, but the physical interpretation requires:

- a declared self-adjoint operator;
- a positive physical inner product;
- boundary conditions and domain;
- a Hamiltonian or scattering dictionary;
- a scale-setting law;
- and an observable channel.

For the Efimov branch, an \(SO(2,1)\)-type Casimir or conformal algebra is not sufficient. The strong claim must reproduce the correct three-body threshold conditions and the universal exponent near \(s_0\simeq1.00624\) under fixed conventions. Otherwise the result is conformal or discretely scale-organized, not specifically Efimov physics.

## What the geometric/arithmetic case teaches

On the arithmetic quotient of the genus-two Jordan tube, the invariant metric supplies a Laplace--Beltrami/Casimir operator \(\Delta_\Gamma\) with a legitimate self-adjoint spectral decomposition after the quotient, domain and measure are specified. This establishes a natural operator and a real scattering framework.

It also exposes where extra structure enters:

\[
Sp(4,\mathbb R)\longrightarrow Sp(4,\mathbb Z)

\]

is not forced by the real cone alone. The arithmetic lattice, quotient and physical probe must be derived or declared. A natural Casimir spectrum does not identify its eigenvalues with particle masses, Riemann zeros or measured resonances.

The admissibility question is therefore not “is there a canonical invariant operator?”—there is—but “what admission principle selects the arithmetic quotient and makes its spectral data physically readable?”

## Looking from Casimir operator to Casimir force

The corpus already gives the only honest bridge:

\[
\text{symmetry representation}
\xrightarrow{C_2}
\text{mode classification}
\xrightarrow{\text{boundary and material data}}
\text{spectral density}
\xrightarrow{\text{renormalized response}}
\langle T_{\mu\nu}\rangle.
\]

Every arrow carries new information. A representation Casimir may help classify the electromagnetic or matter modes, but the measurable Casimir force additionally depends on boundary geometry, constitutive response, temperature, state, subtraction prescription and stress coupling. There is no universal ideal separation selected by the name “Casimir.”

This chain is nevertheless important for admissibility foundations. It shows how a structural invariant can descend into an observable only after successive local, spectral, thermodynamic and empirical admission gates. It is a model of the larger programme in miniature.

## Looking sideways: what a Casimir cannot see

Holding all Casimir eigenvalues fixed can still leave physically decisive freedom:

- multiplicity spaces and mixing angles;
- orientation and phase;
- topology and global boundary conditions;
- interaction coefficients and counterterms;
- vacuum selection and symmetry-breaking direction;
- domain and self-adjoint extension;
- local operator content;
- preparation, probe and measurement maps;
- and which allowed sector is actually populated.

This invisible remainder explains several corpus obstructions. Casimir classification can forbid a proposed mixer, organize a representation tower or define a Laplacian, but it does not supply the missing selector, intertwiner, action or calibration.

## Anti-tautology audit

The first Casimir investigation is registered as follows.

| Contract item | Present answer |
|---|---|
| Prior space | typed composable relations with no preferred continuous symmetry |
| Gate | transformations must preserve joint admissibility in every declared context |
| Provenance | compositional equivalence, not a chosen particle group |
| Candidate output | automorphism group, invariant algebra and central characters |
| Established reduction | once a symmetry representation is fixed, incompatible Casimir sectors cannot be mixed by commuting transformations |
| Not yet derived | the symmetry group, physical representation, dynamics, scale and realized sector |
| Novel consequence | none yet; this document defines the first derivation target |

The programme must not report the standard construction of \(C_2\) from a given Lie algebra as evidence that admissibility generated physics. The genuine result begins only when the relevant symmetry or representation class is forced by thinner contextual assumptions.

## First executable research packet

The first packet should compare three controlled laboratories rather than leap directly to a universal theory.

### Packet C1 — finite relational automorphisms

Construct a small typed composition system with an explicit contextual admission relation. Compute its full automorphism group, representation decomposition and central invariants. Change one admission rule at a time and record which invariant structure survives.

**Pass:** a nontrivial symmetry and sector invariant are derived from the composition/admission data.  
**Failure:** the desired group appears only because it was encoded in labels or adjacency by hand.

### Packet C2 — compact continuous benchmark

Use the certified \(SU(2)\) one-plaquette model to separate four roles: group choice, Casimir classification, Hamiltonian input and continuum promotion. Ask which of these can be reconstructed from an admission-preserving composition law.

**Pass:** at least one normally assumed ingredient becomes a theorem of the thinner structure.  
**Failure:** the exercise merely rewrites the known Hamiltonian.

### Packet C3 — noncompact comparison

Apply the same declared admission principles to a minimal noncompact rank-one model before approaching \(Sp(4,\mathbb R)\). Track positive inner products, self-adjoint domains, discrete versus continuous spectrum and the effect of choosing a real form.

**Pass:** the admission rules exclude unhealthy representations and explain a compact/noncompact spectral distinction.  
**Failure:** positivity and domain choices must be inserted independently for each representation.

### Packet C4 — observable descent

Choose one boundary spectral problem and carry its representation data through the full Casimir-force chain, including material response and subtraction. Determine exactly which observable dependence is fixed by symmetry and which is new boundary data.

**Pass:** a representation invariant produces a protected contribution or selection rule in the force.  
**Failure:** all measurable content enters after the Casimir classification.

## Provisional conclusion

Starting at the Casimir does not yet reveal the foundation of physics, but it gives the admissibility programme its first precise terrain. Casimirs show how an admitted transformation structure produces invariant sectors; Poincaré theory shows those sectors becoming mass and spin; compact gauge theory shows an invariant entering a certifiable Hamiltonian; noncompact and arithmetic settings expose positivity, domain and quotient choices; and the Casimir effect shows the additional descent required to reach measurement. The common pattern is not that one Casimir governs all physics. It is that physical structure appears only when invariant classification is joined to positive realization, admissible composition, dynamics, boundary data and empirical readout. The first genuinely new target is therefore to derive the transformation group—or a restricted class of groups—from contextual admissibility and then determine which Casimir sectors remain realizable under composition.
