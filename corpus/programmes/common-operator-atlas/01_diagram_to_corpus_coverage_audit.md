# Diagram-to-corpus coverage audit

## Scope

The source diagram contains thirty-two boxes in five colour-coded families.
This audit evaluates substantive corpus coverage rather than raw word matches.
Names such as Adam, Muon and RoPE generate false lexical positives in a broad
humanities-and-physics corpus; only a document that develops the indicated
mathematics counts as coverage.

This table is the **pre-investigation snapshot**. The follow-on stochastic,
optimization and sequence documents close its twelve unfilled entries at the
level of formal definition, primary literature, typed corpus contact and
selected executable witnesses. The baseline labels remain frozen so the
programme does not erase the gap it was created to repair.

Coverage labels mean:

- **filled:** the corpus contains a derivation, executable use or sustained
  physical/mathematical treatment;
- **partial:** a real component exists, but the diagram's specific bridge or
  algorithm is missing;
- **unfilled:** no substantive treatment was located in the current corpus.

## Probability and generative modelling

| Diagram node | Coverage | Nearest corpus contact | Missing bridge |
|---|---|---|---|
| Heat equation | partial | diffusion, heat transport, Euclidean kernels | canonical heat semigroup and heat-kernel atlas |
| Diffusion | filled | transport, hydrodynamic relaxation and noise | consolidation across physical and probabilistic readings |
| SDE / Brownian motion | partial | Kramers escape and stochastic dynamics | Itô/Stratonovich and generator-level spine |
| Langevin dynamics | filled | nonlinear noise drift, stochastic quantization, Mori--Zwanzig | one typed comparison with optimization time |
| Tweedie's formula | unfilled | Gaussian conditioning only | score/posterior-mean identity |
| Flow matching | unfilled | spectral-flow usages are not generative flow matching | continuity-equation training bridge |
| Wasserstein flow | unfilled | transport and gradient selection exist separately | optimal-transport metric and JKO-type flow |
| Gaussian | filled | Gaussian actions, source Hessians, covariance and SK/KMS | none at quadratic level |
| KL divergence | partial | entropy and relative-state comparisons | explicit information projection and variational role |

## Optimization

| Diagram node | Coverage | Nearest corpus contact | Missing bridge |
|---|---|---|---|
| Gradient descent | partial | positive selector gradients and contraction | discrete algorithm and convergence atlas |
| Newton's method | partial | Hessians and local stability | inverse-Hessian update as an admitted transformation |
| Natural gradient | unfilled | response metrics and information are separate | Fisher metric and reparameterization theorem |
| Mirror descent | unfilled | direct/dual faces and Legendre maps | Bregman geometry and dual update |
| Heavy-ball momentum | unfilled | damped oscillators are developed physically | exact discretization and clock boundary |
| Adam / EMA | unfilled | running moments appear only incidentally | adaptive diagonal metric and bias correction |
| Muon | unfilled | matrix polar/SVD tools occur elsewhere | optimizer-specific orthogonalized update |
| Hessian | filled | stability, response, source kernels and selectors | cross-domain normalization only |

## Sequence models

| Diagram node | Coverage | Nearest corpus contact | Missing bridge |
|---|---|---|---|
| Softmax / Gibbs | partial | physical Gibbs/KMS weights | logits, normalization and temperature typing |
| Attention | unfilled | relational selection and cognitive attention are different objects | query--key kernel and value transport |
| RoPE | unfilled | complex rotations and phase transport | positional representation and representation law |
| Linear attention | unfilled | low-rank kernels and contractions | feature-map factorization and memory law |
| Mamba | unfilled | physical state-space models | selective state-space recurrence and scan |

This is the clearest corpus gap. The repository has rich relation algebras and
state-space physics but no formal modern-sequence-model crosswalk.

## Dynamics, signals and control

| Diagram node | Coverage | Nearest corpus contact | Missing bridge |
|---|---|---|---|
| Convolution | filled | response kernels, frequency loops and group convolution | unified continuous/discrete convention card |
| Fourier transform | filled | spectral, modular, response and lattice transforms | none at operator level |
| State-space model | filled | passive realizations and four-mode emulator | canonical controllability/observability audit |
| Laplace / z-transform | partial | Laplace causal response; discrete transfer structure | continuous/discrete transform comparison |
| Kalman filter | partial | Gaussian covariance and observation models | executable predict--innovation--update lane |
| PID feedback | partial | feedback, controllers and response budgets | explicit closed-loop stability and anti-windup |

## Linear algebra and common dynamics

| Diagram node | Coverage | Nearest corpus contact | Missing bridge |
|---|---|---|---|
| Complex exponential | filled | quarter-turn, phase and spectral evolution | none |
| Eigenvalues and SVD | filled | spectral gaps, residues, singular ratios and conditioning | none |
| Damped oscillator | filled | resonance, linewidth, lag and metastability | optimizer comparison only |
| Matrix exponential | filled | Lie flow, channel divisibility and state evolution | semigroup-domain conditions where unbounded |

## What the diagram omits that the corpus supplies

The diagram is a computational-operator atlas, not a complete physical one. It
does not visibly encode:

- symplectic, Jordan and Lie admission;
- gauge, constraint and quotient structure;
- topology, boundary conditions and holonomy;
- constitutive laws, units, energy and passivity;
- quantum measurement and open-system dilation;
- detector equivalence, nuisance projection and identifiability;
- authority, evidence and experiment gates.

Those omissions explain the corpus's contribution. It can preserve the
diagram's useful common mathematics while refusing false physical
identifications.

## Priority queue

1. Close the Langevin--Fokker--Planck--Gibbs--gradient-flow square with clocks,
   mobility and noise typed separately.
2. Add Wasserstein and information geometry so “optimization” has an explicit
   metric rather than an unnamed steepest direction.
3. Prove the damped-oscillator--heavy-ball bridge as a discretization, not an
   identity of times.
4. Add the Kalman innovation cycle as the minimal detector-update closure.
5. Map attention and selective state-space models into carrier, selector,
   memory and detector coordinates without calling them physical fields.

## Queue disposition

- priorities 1--3 and 5 are completed in documents 03--06 and the executable
  bridge verifier;
- priority 4 remains a real frontier: the corpus has Gaussian/state-space and
  feedback ingredients, but not yet a dedicated Kalman/PID implementation
  suite;
- heat, Laplace and z-transform are mathematically familiar but still merit a
  convention card covering domains, initial conditions and continuous versus
  discrete clocks.
