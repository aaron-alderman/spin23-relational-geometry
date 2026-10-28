# Common Operator Atlas

**Date:** 28 October 2026
**Status:** canonical cross-domain translation lane; no physical identifications

## Purpose

The prompt-supplied diagram [*It's all connected*](https://pbs.twimg.com/media/HVnVRCXbAAAFX1i?format=jpg&name=4096x4096)
places probability and generative modelling, optimization, sequence models,
linear algebra, and dynamics/signals/control in one network. Its central insight
is sound: a small family of operators, flows, transforms and recurrences is
reused across many domains. Its central danger is equally important: shared
mathematics does not establish a shared carrier, clock, energy, probability
law, causal structure or detector.

This lane imports the diagram as a **candidate translation atlas**, not as an
authority and not as a taxonomy of physical systems. It asks two questions:

1. Which boxes already have substantive counterparts in the corpus?
2. What kind of arrow, with what losses, actually joins any two boxes?

The result fills a missing middle layer between the corpus's deep
Jordan--Lie--spectral mathematics, its stochastic and response physics, and
modern computational formalisms.

## Canonical documents

1. [Diagram-to-corpus coverage audit](01_diagram_to_corpus_coverage_audit.md)
   classifies all thirty-two visible boxes as filled, partial or unfilled and
   identifies the nearest corpus anchors.
2. [Typed translation grammar](02_typed_translation_grammar.md) defines the
   common carrier--generator--metric--flow--detector card and nine admissible
   edge types.
3. [Machine-readable atlas](common_operator_atlas_v1.json) records the nodes,
   families, corpus links, dynatology roles, typed edges and authority
   boundaries.
4. [Stochastic transport square](03_stochastic_transport_square.md) joins
   Langevin paths, Fokker--Planck densities, Gibbs stationarity, Wasserstein
   gradient flow, Tweedie denoising and flow matching while recording exactly
   where each equivalence fails.
5. [Optimization dynamics](04_optimization_dynamics.md) separates objective,
   geometry, memory and discretization across gradient, Newton, natural and
   mirror descent, heavy-ball, Adam and Muon.
6. [Sequence operators](05_sequence_operator_crosswalk.md) gives an exact
   carrier--selector--relation--memory--detector crosswalk for softmax
   attention, RoPE, linear attention and Mamba.
7. [Executable bridge laboratory](06_executable_bridge_laboratory.md) states
   the commuting diagrams, noncommuting counterexamples and reproducible
   numerical witnesses.
8. [Source and literature record](07_source_and_literature_record.md) records
   the prompt image's limited provenance and the primary literature used to
   adjudicate its links.
9. [Control-and-inference closure](08_control_and_inference_closure.md) closes
   state space, Laplace/z transforms, controllability, observability, Kalman
   innovation and saturated PID into one typed feedback loop.
10. [Lithium-niobate estimator/controller design](09_lithium_niobate_estimator_controller.md)
    applies that loop to the corpus's three-mode synthetic-frequency ring while
    preventing nuisance control from erasing the held-out closure observable.
11. [Machine-readable control register](control_inference_closure_v1.json)
    freezes the equations, tests, physical channel allocation and authority
    boundary.

## Finding

The baseline audit found the corpus already strong in three regions:

- linear algebra and spectral evolution;
- Gaussian, Gibbs/KMS, stochastic and relaxation physics;
- oscillators, convolution, Fourier response, state-space realization,
  passivity and detector records.

At that baseline it was incomplete in three different senses:

- **unconsolidated:** diffusion, Langevin, Fokker--Planck and stochastic
  quantization exist but are dispersed across programmes;
- **underdeveloped:** estimation and control appear through state-space,
  causal response and detector language, while Kalman and PID structure remain
  thin;
- **absent as formal lanes:** Tweedie identities, score diffusion, flow
  matching, Wasserstein gradient flow, mirror/natural-gradient geometry,
  heavy-ball/Adam/Muon dynamics, softmax/attention, RoPE, linear attention and
  Mamba.

This tranche closes the twelve **unfilled** boxes at literature-and-operator
level through the stochastic, optimization and sequence documents above. It
does not relabel them as experimentally or physically filled. Kalman, PID and
Laplace/z were the thinner implementation frontiers; documents 08--09 and the
third verifier now close them at linear-Gaussian/software-design level. The
remaining frontier is nonlinear, non-Gaussian and hardware-calibrated rather
than a missing operator definition. The largest gap was
therefore not another exceptional group but a typed calculus explaining when
the same operator can be read as physical evolution, probability transport,
optimization, inference, filtering or computation; that calculus and its
first executable witnesses now exist here.

## Common card

Every node is represented by

\[
\mathcal O=(X,A,J,G,L,\tau,D,I),
\]

where `X` is the carrier, `A` its admissible domain, `J` an objective or
energy when one exists, `G` a metric/mobility/preconditioner, `L` the
generator or update, `tau` the clock or iteration parameter, `D` the
detector/readout and `I` the retained invariants. Undefined entries remain
undefined; they are never filled by analogy.

This is a focused view of the wider Dynatology object

\[
\mathfrak D=(X,A,T,J,\rho,L,D,I,R).
\]

## Authority boundary

An equation-level match proposes a bridge. It does not prove that optimization
time is physical time, that a logit is an energy, that attention is a physical
interaction, that diffusion noise is a thermal bath, or that a state-space
sequence model is passive or causal in the physical sense. Those promotions
require source-native carrier, units, clock, constitutive law, noise,
conservation, detector and intervention data.

## Verification

Run:

```powershell
node verification/verify/verify_common_operator_atlas.mjs
node verification/verify/verify_common_operator_bridges.mjs
node verification/verify/verify_common_operator_control_loop.mjs
```
