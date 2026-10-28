# Source and literature record

## Diagram provenance

The only admitted source evidence for the overview diagram is the
prompt-supplied image URL and the visible title *It's all connected*. Searches
using the title together with distinctive node combinations did not identify a
stable author, publication, version or explanatory source. The image is
therefore recorded as **provenance incomplete**. It may define a candidate
topology for audit, but it cannot establish any edge or priority claim.

Reopening requires an author-controlled post, repository or publication that
contains the same diagram and supplies its intended arrows. Until then, the
corpus's transcription of the thirty-two visible nodes is an observation of
the supplied image, not an attribution.

## Primary mathematical and computational anchors

The literature below supports the local bridges; no source supports the global
claim that all nodes are one physical system.

### Stochastic transport and generation

- Jordan, Kinderlehrer and Otto, “The Variational Formulation of the
  Fokker--Planck Equation,” *SIAM Journal on Mathematical Analysis* 29 (1998),
  DOI [10.1137/S0036141096303359](https://doi.org/10.1137/S0036141096303359),
  supplies the minimizing-movement/Wasserstein bridge.
- Song et al., [“Score-Based Generative Modeling through Stochastic
  Differential Equations”](https://arxiv.org/abs/2011.13456), gives the forward
  corruption SDE, reverse-time score SDE and probability-flow ODE.
- Lipman et al., [“Flow Matching for Generative
  Modeling”](https://arxiv.org/abs/2210.02747), defines simulation-free vector
  field regression for prescribed probability paths and includes diffusion
  paths as a special family.
- Holderrieth et al., [“Generator Matching: Generative Modeling with Arbitrary
  Markov Processes”](https://arxiv.org/abs/2410.20587), makes the generator
  level explicit and extends beyond deterministic flows and diffusions.

### Optimization geometry

- Amari, “Natural Gradient Works Efficiently in Learning,” *Neural
  Computation* 10 (1998), DOI
  [10.1162/089976698300017746](https://doi.org/10.1162/089976698300017746),
  grounds the Fisher-geometric selector.
- Kingma and Ba, [“Adam: A Method for Stochastic
  Optimization”](https://arxiv.org/abs/1412.6980), defines the adaptive first-
  and second-moment update.
- Do, Dereich and Jentzen, [“On MUON optimization: From non-convergence to an
  error analysis...”](https://arxiv.org/abs/2608.04607), is retained as a
  current negative-control source: finite Newton--Schulz details and
  convergence conditions cannot be erased.

### Sequence operators

- Vaswani et al., [“Attention Is All You
  Need”](https://arxiv.org/abs/1706.03762), defines scaled dot-product attention.
- Su et al., [“RoFormer: Enhanced Transformer with Rotary Position
  Embedding”](https://arxiv.org/abs/2104.09864), supplies the relative-position
  rotation identity.
- Katharopoulos et al., [“Transformers are RNNs: Fast Autoregressive
  Transformers with Linear Attention”](https://arxiv.org/abs/2006.16236),
  derives the recurrent feature-sum representation.
- Gu and Dao, [“Mamba: Linear-Time Sequence Modeling with Selective State
  Spaces”](https://arxiv.org/abs/2312.00752), establishes input-dependent
  selective state-space parameters and the hardware-aware scan.

### Estimation, control and physical embodiment

- Kalman, [“A New Approach to Linear Filtering and Prediction
  Problems”](https://doi.org/10.1115/1.3662552), supplies the state-transition,
  innovation and covariance recursion and states the filtering/regulator
  duality.
- Åström and Rundqwist, [“Integrator Windup and How to Avoid
  It”](https://doi.org/10.23919/ACC.1989.4790464), treats actuator saturation
  as a nonlinear break in a nominally linear feedback loop and develops
  anti-windup structure.
- Dinh et al., [“Reconfigurable synthetic dimension frequency lattices in an
  integrated lithium niobate ring cavity”](https://doi.org/10.1038/s42005-024-01676-9),
  demonstrates controlled inter-mode coupling and gauge phase in the selected
  device family. It supports the platform choice, not the proposed estimator
  or any new-physics reading.

## Literature verdict

The diagram is directionally valuable but mathematically under-typed. The
literature supports a network of exact identities, variational readings,
discretizations and endpoint equivalences. It does not support collapsing
physical time, diffusion time, optimization iteration, interpolation time,
token position and layer depth into one clock. That refusal is the corpus's
main contribution to the diagram.
