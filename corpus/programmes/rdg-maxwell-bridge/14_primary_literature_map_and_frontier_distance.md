# RDG--Maxwell Bridge 14: primary literature map and frontier distance

**Date:** 26 October 2026

**Status:** primary-source comparison; novelty claims bounded

**Programme:** [RDG--Maxwell bridge](README.md)

## Purpose

The executable certificates are useful only if they are placed at the correct
distance from established mathematics and physics. This review asks three
questions for each branch:

1. What is already standard?
2. What has this programme actually added?
3. What remains a research frontier rather than a renamed known result?

The search emphasized primary papers, theses and author/institution records.
It is a targeted frontier map, not a systematic-review claim of priority.

## Distance map

| Corpus branch | Nearest established framework | Distance from literature | Honest status |
|---|---|---|---|
| cochain carrier and commuting selector | de Rham complexes, FEEC and DEC | essentially zero at the structural level | worked finite certificate and counterexample |
| local macroelement projection | local bounded commuting FEEC projections | small in vocabulary; no new approximation theorem | independently constructed toy retract |
| metric-compatible remeshing | Galerkin pullback, local finite-element assembly and variational-crime analysis | open only in the programme's particular changing-complex implementation and estimates | exact algebra, no convergence claim |
| Maxwell dynamics on the complex | compatible spatial discretization and FEEC evolution problems | essentially zero in principle | exact small model with selector diagnostics |
| boundary power and loss ports | Stokes--Dirac and port-Hamiltonian systems | zero in principle | explicit corpus-normalized balance certificate |
| passive rational response | positive-real/passivity theory | zero in principle | exact one-port witness |
| finite bath and recurrence | Hamiltonian/open-system dilation and bath-limit literature | zero in principle | transparent two-mode counterexample |
| flux, Wilson records and cuts | ordinary/relative cohomology, differential characters and Stokes transgression | zero in principle | explicit finite cut receipt |
| defect-channel nuisance ladder | structure-preserving numerics plus system identification and null testing | the ingredients are standard; their typed end-to-end combination is programme-specific | proposed experimental discipline, not a discovered effect |

## 1. Complexes, selectors and remeshing

Arnold, Falk and Winther place stable mixed finite elements inside Hilbert and
de Rham complexes. Hirani develops the corresponding discrete-exterior-
calculus language. In that setting, preserving (d^2=0), cohomology and
commuting diagrams is foundational rather than a new physical hypothesis.

Falk and Winther go closer to Bridges 09--10: they construct projections that
commute with the exterior derivative, remain bounded independently of mesh
size and are defined locally on overlapping macroelements. This means the
programme must not present sparse local commuting assembly as novel. Its
contribution is narrower:

- one inspectable stellar-collapse transport/restriction pair;
- an exact demonstration that diagonal metrics fail for that pair;
- a minimal sparse macroelement metric that restores weighted adjointness;
- a selector-relative residual channel (Q=I-TR) carried consistently into
  the later detector budget.

The additive assembly lemma in Bridge 10 is standard local-to-global linear
algebra. The genuine unresolved numerical questions are uniform conditioning,
approximation order, nonconforming joins, repeated changing meshes and
continuum convergence. Holst and Stern's variational-crime framework is the
right comparison when geometry or the discrete domain itself is approximate.

## 2. Dynamics and ports

The port-Hamiltonian literature already treats Maxwell equations on bounded
domains with nonzero boundary Poynting flow through Stokes--Dirac structures.
Later mixed-Galerkin work constructs finite-dimensional power-preserving
models, including Whitney-form examples. Bridge 12 therefore does not invent
the idea that a boundary or material-loss channel is an energy port.

What the bridge adds is a small audit object in the same notation as the rest
of this corpus:

\[
 K^{\mathsf T}L+LK=-2C^{\mathsf T}C,
 \qquad
 \dot H=-\lVert Cx\rVert^2.
\]

Adding a conjugate effort (u) and flow (z) gives

\[
 G(s)=\frac{s}{\omega_p^2(s^2+\gamma s+\omega_0^2)},
 \qquad \operatorname{Re}G(i\omega)\geq0.
\]

That is a standard positive-real/passive response, now explicitly certified.
Positive-realness closes reduced input--output admissibility but does not
choose a microscopic bath. The two-oscillator dilation makes the omitted
assumption visible: a finite positive conservative carrier returns energy,
whereas permanent Markovian attenuation requires a continuum/thermodynamic
limit, outgoing condition, resetting or coarse graining.

## 3. Topology, flux and records

The torus and puncture results belong to established topology. Cohomology
distinguishes closed from exact fields; relative cohomology handles a space
with boundary; Stokes' theorem converts bulk differential data into boundary
pairings. Differential cohomology refines this by retaining curvature,
integral class and holonomy together. Freed's treatment of abelian gauge
fields as differential-cohomology cochains and the literature on relative
differential characters provide the natural continuum destination.

Accordingly, the corpus result is not a new flux theorem. It is an executable
receipt discipline:

\[
 \text{nonbounding bulk class}
 \xrightarrow{\text{cut}}
 \text{relative boundary/gluing record}.
\]

The finite examples show why topology change cannot be represented by merely
deleting a state coordinate. A lawful update must retain the lost absolute
class as boundary, transition or holonomy data. Generalizing this to arbitrary
cycles should use the long exact sequence of a pair and differential
characters rather than inventing a competing formalism.

## 4. Detector frontier

No paper found makes the programme's exact eight-channel ladder a recognized
new physical law. That is the point at which the synthesis may still be
useful: it composes known constraints into a prospective null test.

The potentially original research object is not any individual ingredient,
but a single same-device inference protocol in which:

- admission is a declared commuting selector;
- remeshing carries a chain and energy receipt;
- global classes carry topology receipts;
- material memory is retained in the state;
- all boundary and dissipative power is ported;
- detector transfer is calibrated independently;
- a held-out complex response is predicted before unblinding.

This is a methodological conjecture: preserving more typed relations may make
small departures easier to localize. It becomes physics only when a real
device supplies calibrated errors and a reproducible residual.

## 5. What is and is not new

### Established

- complexes, cohomology, commuting cochain projections and local
  macroelements;
- compatible electromagnetic discretization;
- boundary ports, passivity and positive-real transfer functions;
- finite-bath recurrence and continuum-bath limits;
- relative cohomology, holonomy and differential-character descriptions of
  abelian flux.

### Corpus-specific but not yet a theorem of broad scope

- the common `carrier / selector / detector` grammar across all branches;
- exact small counterexamples paired with exact passing controls;
- topology and remeshing receipts treated as mandatory detector nuisances;
- the eight-channel (Q)-residual ladder;
- the proposed same-device held-out phase experiment.

### Genuine open frontiers

- uniform stable transfer on changing, possibly nonconforming meshes;
- a differential-character implementation of arbitrary cut/glue histories;
- a continuum passive material model with calibrated fluctuation--dissipation
  noise and detector ports;
- an end-to-end device experiment with uncertainty propagation;
- evidence that a residual survives that complete conventional model.

None of these open items implies new physics in advance.

## Primary sources

- D. N. Arnold, R. S. Falk and R. Winther,
  [*Finite element exterior calculus: from Hodge theory to numerical stability*](https://arxiv.org/abs/0906.4325)
  (2010).
- A. N. Hirani, [*Discrete Exterior Calculus*](https://resolver.caltech.edu/CaltechETD:etd-05202003-095403)
  (PhD thesis, 2003).
- R. S. Falk and R. Winther,
  [*Local bounded cochain projection*](https://arxiv.org/abs/1211.5893)
  (2012).
- M. Holst and A. Stern,
  [*Geometric variational crimes: Hilbert complexes, finite element exterior calculus, and problems on hypersurfaces*](https://arxiv.org/abs/1005.4455)
  (2010).
- A. Gillette, M. Holst and Y. Zhu,
  [*Finite Element Exterior Calculus for Evolution Problems*](https://arxiv.org/abs/1202.1573)
  (2012).
- A. J. van der Schaft and B. M. Maschke,
  [*Hamiltonian formulation of distributed-parameter systems with boundary energy flow*](https://doi.org/10.1016/S0393-0440(01)00083-3)
  (2002).
- P. Kotyczka, B. Maschke and L. Lefèvre,
  [*Weak Form of Stokes-Dirac Structures and Geometric Discretization of Port-Hamiltonian Systems*](https://arxiv.org/abs/1706.06156)
  (2017).
- A. Brugnoli, G. Haine and D. Matignon,
  [*Stokes-Dirac structures for distributed parameter port-Hamiltonian systems: an analytical viewpoint*](https://arxiv.org/abs/2302.08816)
  (2023).
- T. H. Hughes,
  [*A theory of passive linear systems with no assumptions*](https://arxiv.org/abs/1611.06140)
  (2017).
- D. S. Freed,
  [*Dirac Charge Quantization and Generalized Differential Cohomology*](https://arxiv.org/abs/hep-th/0011220)
  (2000).
- D. S. Freed, G. W. Moore and G. Segal,
  [*Heisenberg Groups and Noncommutative Fluxes*](https://arxiv.org/abs/hep-th/0605200)
  (2006).
- C. Becker,
  [*Cheeger--Chern--Simons theory and differential String classes*](https://arxiv.org/abs/1404.0716)
  (relative differential characters; 2014).
- Y. M. Holtkamp, E. Godinez-Ramirez and U. Kleinekathöfer,
  [*Spectral Densities, Structured Noise and Ensemble Averaging within Open Quantum Dynamics*](https://arxiv.org/abs/2410.04294)
  (2024).

## Verdict

The bridge has not uncovered a new Maxwell theory. It has produced a compact,
executable audit language that lands cleanly inside several mature fields and
shows exactly where each of its claims stops. Its remaining plausible value is
integrative: one typed chain from geometry change through constitutive memory,
topology, ports and detector inference, with no silent loss of records.

