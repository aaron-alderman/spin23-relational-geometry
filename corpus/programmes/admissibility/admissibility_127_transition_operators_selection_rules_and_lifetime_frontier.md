# Transition operators: from symmetry-allowed channels to widths and lifetimes

**Date:** 26 October 2026
**Status:** established atomic/nuclear bridge; worked admissibility example; operator-opening experiment specified
**Parents:** [dynamic response, detection and metastability](admissibility_06_dynamic_response_geometry_detection_metastability.md), [Casimir as first generative probe](admissibility_02_casimir_as_first_generative_probe.md)
**Boundary:** this packet organizes standard transition theory and a falsifiable measurement programme; it does not derive atomic or nuclear interactions from the corpus's exceptional structures

## Why this bridge was missing

The corpus already treated poles, linewidths, metastability, angular momentum,
selection and detector folding. It did not join them through the piece of mature
physics that makes the relation operational: a **transition operator** between
an initial and a final state.

This omission matters. A state may lie above lower-energy states and still live
for seconds, hours or longer because the dominant interaction operator cannot
connect the two sectors. Conversely, a symmetry-allowed transition can remain
weak because its reduced matrix element is small or because little final-state
phase space is available. “Allowed,” “nonzero” and “fast” are therefore three
different claims.

The missing chain is

\[
\boxed{\text{prepared positive state}}
\to
\boxed{\text{initial/final representation sectors}}
\to
\boxed{\text{typed transition operator}}
\to
\boxed{\text{matrix element and phase space}}
\to
\boxed{\text{partial widths and lifetime}}
\to
\boxed{\text{detector-folded decay record}}.
\]

This is an unusually clean established example of admissibility doing physical
work. Energy conservation says where decay might go. The operator and its
symmetries say which of those destinations are connected at a declared order.
Dynamics fixes the strength. The environment can open additional channels.
The experiment sees only the channels and timescales retained by its acceptance.

## The common rate architecture

For an interaction \(V\) weak enough for the golden-rule limit, a transition
from \(|i\rangle\) to a continuum of final states has rate

\[
\Gamma_{i\to f}
=
\frac{2\pi}{\hbar}
\left|\langle f|V|i\rangle\right|^2
\rho_f(E_i).
\]

For discrete radiative branches, the corresponding density of photon modes is
already included in the Einstein coefficient or multipole transition rate. The
total population-decay rate is

\[
\Gamma_i=\sum_f\Gamma_{i\to f}+\Gamma_{\rm nonrad},
\qquad
\tau_i=\Gamma_i^{-1}.
\]

For one exponentially decaying upper level and a stable lower level, with no
additional pure dephasing, the natural Lorentzian full width is

\[
\Delta\omega_{\rm FWHM}=\Gamma_i,
\qquad
\Delta\nu_{\rm FWHM}=\frac{1}{2\pi\tau_i},
\qquad
\Delta E_{\rm FWHM}=\hbar\Gamma_i.
\]

For two unstable levels or an environment with pure dephasing, the optical
coherence rate must be used instead. Lifetime broadening, collision broadening,
Doppler broadening, power broadening, inhomogeneity and detector resolution are
not interchangeable contributions.

The same information appears in several equivalent but differently useful
languages:

| Language | Width-bearing object | What it exposes |
|---|---|---|
| golden rule | squared matrix element times final-state density | channel and perturbative order |
| scattering/Green function | pole \(E_i+\Delta E_i-i\hbar\Gamma_i/2\) | shift and decay in one analytic object |
| open-system evolution | nonzero Liouvillian eigenvalues or jump operators | decay, dephasing and conditioned records |
| spectroscopy | line profile and branching fractions | detector-facing widths and channel weights |

Equality among these descriptions requires their usual weak-coupling,
Markovian, isolated-line or analytic-continuation assumptions. A measured line
width is not automatically an intrinsic lifetime.

## Rotation supplies the grammar, not the strength

Let \(T_q^{(k)}\) be the \(q\)-component of an irreducible spherical tensor of
rank \(k\). Up to the declared phase and normalization convention, the
Wigner--Eckart theorem factorizes

\[
\langle \alpha_fJ_fM_f|T_q^{(k)}|\alpha_iJ_iM_i\rangle
=
C^{J_fM_f}_{J_iM_i,kq}
\frac{\langle \alpha_fJ_f\|T^{(k)}\|\alpha_iJ_i\rangle}
{\sqrt{2J_f+1}}.
\]

The Clebsch--Gordan coefficient carries the universal angular dependence. The
reduced matrix element carries the system-specific radial, spin, many-body and
interaction physics. This is the exact division the corpus needs:

- rotation symmetry organizes possible components and forces some amplitudes
  to vanish;
- the transition operator declares what kind of physical interaction is being
  applied;
- the reduced matrix element determines whether an admitted channel has any
  strength;
- the density of final states and environment determine how that strength
  becomes a rate.

Thus symmetry gives a grammar of transitions, not a complete dynamics. The
triangle condition \(|J_i-k|\leq J_f\leq J_i+k\) and \(M_f=M_i+q\) are necessary
angular conditions. Parity, permutation symmetry, approximate \(LS\) coupling,
isospin and other quantum numbers add further conditions. None supplies the
reduced matrix element by itself.

## Electromagnetic multipoles and polarization

The photon field decomposes into electric and magnetic multipoles
\(E\lambda\) and \(M\lambda\). The lowest available multipole normally
dominates because each additional spatial order is suppressed in the
long-wavelength regime.

| Operator | Tensor rank | Parity relation | Familiar role |
|---|---:|---|---|
| \(E1\) | 1 | changes parity | ordinary electric-dipole line; approximately \(\Delta\ell=\pm1\), \(\Delta S=0\) in \(LS\) coupling |
| \(M1\) | 1 | preserves parity | magnetic/spin reorientation and fine-structure transitions |
| \(E2\) | 2 | preserves parity | quadrupole transition when \(E1\) is closed |
| \(M2\) | 2 | changes parity | higher-order magnetic channel |

“Forbidden” means that a specified leading operator has zero matrix element in
the stated symmetry limit. It does not mean absolutely impossible. A weaker
multipole, relativistic mixing, hyperfine mixing, an external field, two-photon
emission, collisions or symmetry-breaking material structure may open a route.
The size and scaling of the opening diagnose the mechanism.

With the quantization axis declared, circular photon components carry
\(q=+1\) or \(q=-1\), while the longitudinal spherical component carries
\(q=0\). Absorption and emission conventions and the direction of propagation
must be stated before attaching the labels \(\sigma^+\), \(\sigma^-\) and
\(\pi\). Circular polarization therefore does not merely “add spin”: it selects
a component of the transition operator and hence a definite set of magnetic
sublevel connections.

For an electric-dipole atomic transition, the Einstein coefficient is one
normalization of this general architecture:

\[
A_{i\to f}^{E1}
=
\frac{\omega_{if}^{3}}
{3\pi\epsilon_0\hbar c^3}
\left|\langle f|\mathbf d|i\rangle\right|^2
\]

for the usual orientation-averaged convention. NIST tabulates transition
probabilities, line strengths and oscillator strengths and distinguishes
\(E1\), \(M1\), \(E2\), higher multipoles, mixed multipoles, two-photon and
hyperfine-induced lines.

## Metastable helium: an admissibility bottleneck made visible

Neutral helium supplies the concrete picture. The \(2\,^3S_1\) state is far
above the \(1\,^1S_0\) ground state, so energy availability alone does not make
the dominant one-photon electric-dipole channel operative. In the leading
nonrelativistic \(LS\)-coupled description:

- both states have even parity, closing an \(E1\) parity-changing route;
- the transition changes triplet to singlet, while the electric-dipole
  operator does not act on spin, closing the approximate \(\Delta S=0\) route;
- weaker relativistic and higher-order channels remain rather than an absolute
  prohibition.

The result is a lifetime near \(7.8\times10^3\) seconds rather than the
nanosecond scale typical of strong allowed optical lines. The nearby helium
manifold also contains the \(2\,^1S_0\) metastable state with a lifetime of
roughly \(20\) ms and allowed \(P\)-state lines on much shorter timescales. One
atom therefore displays several orders of magnitude of lifetime produced by
different operator access, not simply by different energy gaps.

This is different from barrier metastability. A local free-energy minimum is
long-lived because trajectories must cross or tunnel through a barrier.
Metastable helium is long-lived principally because the low-order transition
operators do not connect the relevant quantum sectors. Both are admissibility
bottlenecks, but their reopening variables and lifetime laws differ.

## Nuclear continuation: same architecture, different operators

The atomic example generalizes, but not by pretending every decay is one
operator.

### Gamma decay

Nuclear gamma transitions use the same \(E\lambda/M\lambda\) multipole
classification. Initial/final spin and parity restrict the possible
multipolarities; reduced transition probabilities \(B(E\lambda)\) and
\(B(M\lambda)\), mixing ratios and internal-conversion coefficients carry the
nuclear structure and competing channel information. A long-lived nuclear
isomer can arise when the available transition requires a high multipole,
has a small energy release, is hindered by structure, or competes with
conversion and environmental channels.

### Beta decay

Allowed beta decay uses different weak operators. In the nonrelativistic
nuclear reduction, the leading Fermi and Gamow--Teller structures are

\[
O_F=\sum_a\tau_a^{\pm},
\qquad
O_{GT}=\sum_a\boldsymbol\sigma_a\tau_a^{\pm}.
\]

The first changes isospin without a spin operator; the second couples spin and
isospin. Leptonic phase space, Coulomb corrections, forbidden operators,
many-body nuclear matrix elements and radiative corrections then determine
the observed spectrum and half-life. Calling both “spin flips” would erase the
operator distinction that gives the classification its power.

### Alpha decay

Alpha decay belongs to the same source-to-record rate architecture but its
leading suppression is barrier penetration and cluster preformation rather
than a photon multipole selection rule. It should therefore remain a separate
mechanism class.

## The Jordan--operator--Lie middle

This example locates the balance more sharply than a group name does.

| Job | Concrete object in transition physics |
|---|---|
| admission and positivity | density operators, populations, positive effects, nonnegative branching probabilities |
| transport/classification | rotation action, angular-momentum irreducibles and Clebsch--Gordan composition |
| typed middle | the physical transition operator as an intertwiner between declared initial and final sectors |
| dynamical strength | reduced matrix element, coupling constants and final-state density |
| selection/reopening | field, mixing interaction, collision, boundary or higher-order process that makes a zero leading element nonzero |
| record | photon/electron/ion counts, polarization, energy, delay, branching fraction and line shape after detector folding |

The transition operator is not “the Lie side acting.” It is an additional
typed physical map whose covariance can be classified by Lie symmetry and
whose probabilities must remain compatible with the positive state/effect
structure. The measurable width lives in the passage between them.

This supplies a correction to loose corpus language: a Casimir can label the
initial and final sectors, but their labels do not determine whether a given
interaction connects them. Degeneracy, representation and selection-rule data
must be followed by an operator, a reduced matrix element, phase space and a
detector model.

## A realistic operator-opening experiment

### Question

Can a deliberately applied perturbation open a nominally forbidden transition
with the amplitude, polarization and lifetime scaling predicted from the
operator that it mixes in?

### Carrier and preparation

Use a single trapped \(^{40}{\rm Ca}^{+}\) ion, where the operator hierarchy is
already an ordinary laboratory tool. Prepare the metastable
\(3d\,^2D_{5/2}\) state through the narrow 729-nm electric-quadrupole
\(4s\,^2S_{1/2}\leftrightarrow3d\,^2D_{5/2}\) transition and read its return by
quantum jumps in the cooling fluorescence. Then apply a calibrated weak
854-nm field that drives the allowed electric-dipole
\(3d\,^2D_{5/2}\to4p\,^2P_{3/2}\) channel; rapid decay from the \(P\) manifold
provides a controllable additional disposal path. Resolve Zeeman sublevels and
rotate the linear or circular polarization relative to the quantization field.

This does not claim to discover a new transition. It makes operator access
programmable on one ion: intrinsic \(E2\) decay, coherent \(E2\) preparation,
polarization-resolved tensor components and an externally opened \(E1\)
quench can be compared without changing the carrier. Metastable helium is the
independent transfer arm: reproduce an ultraweak forbidden-line strength and
lifetime using the low-background direct-detection methods already
demonstrated for \(2\,^3S_1\to3\,^3S_1\).

### Records

Acquire jointly:

1. survival curves over several observation windows;
2. polarization-resolved photon counts and branching fractions;
3. frequency-domain line shape and time-domain decay;
4. dependence on quench intensity, detuning, orientation and helicity;
5. background-gas pressure, trap-light leakage, magnetic noise, motional state
   and detector-dead-time controls.

### Predeclared model

In the weak, unsaturated quench regime, the driven amplitude is linear in the
854-nm field and the added population-decay rate begins as

\[
\Gamma_{\rm opened}(I,\Delta,q)
=C_q(\Delta)I+O(I^2),
\]

where \(q\) labels the addressed spherical component. The detuning and
polarization dependence must be propagated from the same level Hamiltonian,
Clebsch--Gordan factors and reduced matrix element used to calibrate the line,
not separately fitted to each survival curve. Collision quenching, off-resonant
trap-light scattering, imperfect state preparation, laser leakage, magnetic
noise, detector dead time and background counts form the named nuisance model.

### Three decisions

- **Build gate:** the apparatus reproduces the dark-state quantum jump, the
  intrinsic \(D_{5/2}\) lifetime and the predicted quench-induced lifetime
  change while independently measured nuisance rates remain below the target
  opening.
- **Bridge gate:** one operator model jointly predicts the reversal, helicity,
  angular and quadratic-amplitude records better than collision, heating or
  detector explanations.
- **Physics gate:** agreement supplies theoretical-engineering improvement—a
  calibrated way to open, close and measure weak channels. A reproducible
  residual becomes a new-physics lead only after known higher multipoles,
  relativistic/hyperfine mixing, environmental channels and independent
  apparatus replication fail quantitatively.

Positive, null and ambiguous outcomes are all useful. A null result bounds the
mixing coefficient or reveals insufficient sensitivity. An ordinary positive
result validates operator control. A mismatched rate with the predicted
polarization pattern points first to missing strength or environment; a rate
with the wrong angular/polarization structure points to a missing operator.

## Implications and non-implications

### Established implication

Selection rules are not verbal prohibitions. They are zero or constrained
matrix elements of typed operators, and their failure has a measurable shape.
Widths and lifetimes are therefore experimental maps of which channels the
system actually admits at a declared scale and perturbative order.

### Programme implication

Every corpus experiment involving a pole, metastable state, decay, capture or
spectral line should now record:

1. initial and final sectors;
2. the operator and its tensor/multipole type;
3. the reduced or full matrix element;
4. phase space and competing channels;
5. intrinsic versus environmental width;
6. polarization and angular information;
7. detector acceptance and time window;
8. the perturbation that reopens a closed channel.

### What this does not show

It does not derive the Standard Model, nuclear matrix elements, atomic radial
wavefunctions or transition strengths from Jordan or exceptional algebra. It
does not make every suppressed channel evidence of new physics. It does not
identify a representation-theoretic permission with a nonzero physical
amplitude. It supplies an established template against which more speculative
admissibility claims can be made precise and defeated.

## Sources

- NIST, [Spectral lines: selection rules, intensities, transition
  probabilities, values and line strengths](https://physics.nist.gov/Pubs/AtSpec/node17.html).
- NIST Atomic Spectra Database, [line data and multipole notation](https://physics.nist.gov/PhysRefData/ASD/Html/lineshelp.html).
- W. Vassen et al., [Cold and trapped metastable noble gases](https://doi.org/10.1103/RevModPhys.84.175) (2012), for metastable-helium states, lifetimes and experimental controls.
- R. P. M. J. W. Notermans and W. Vassen, [High-precision spectroscopy of the forbidden \(2\,^3S_1\to2\,^1P_1\) transition in quantum-degenerate metastable helium](https://doi.org/10.1103/PhysRevLett.112.253002) (2014).
- K. F. Thomas et al., [Direct measurement of the forbidden \(2\,^3S_1\to3\,^3S_1\) atomic transition in helium](https://doi.org/10.1103/PhysRevLett.125.013002) (2020).
- H. Guan et al., [Combined experimental and theoretical probe of the lifetime of the \(3d\,^2D_{5/2}\) state in \(^{40}{\rm Ca}^{+}\)](https://doi.org/10.1103/PhysRevA.91.022511) (2015), for the single-ion quantum-jump measurement and \(E2\) rate calculation.
- IAEA Nuclear Data Section, [Guidelines for Evaluators](https://www-nds.iaea.org/nsdd/docs/Evaluators_Guidelines_2021_V2.pdf), for nuclear multipolarities, mixing ratios and reduced transition probabilities.
- E. Fermi, [An attempt of a theory of beta radiation](https://doi.org/10.1007/BF01351864) (1934), and G. Gamow and E. Teller, [Selection rules for the beta-disintegration](https://doi.org/10.1103/PhysRev.49.895) (1936), for the distinct weak-transition structures.

## Endpoint

The mature result can be stated without jargon:

> A system does not decay merely because a lower state exists. It decays when
> a real interaction supplies a map to that state, the map has nonzero
> strength, phase space is available and the environment and detector retain
> the event. Long lifetime is often the measurable trace of a missing or weak
> map.

This is the admissibility programme in miniature: possible destination,
permitted relation, realized passage and recorded outcome are distinct stages.
