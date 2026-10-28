# Typed translation grammar

## Why arrows require types

Two boxes may share symbols while differing in ontology. The same matrix can be
a Hamiltonian, Markov generator, Hessian, covariance precision, state-transition
operator, attention kernel or learned parameter. A valid bridge must state what
is preserved and what is reinterpreted.

## Node card

For every formalism record:

| Coordinate | Question |
|---|---|
| carrier `X` | What kind of object evolves or is updated? |
| admissible domain `A` | Positivity, normalization, causality, boundary or resource constraints? |
| objective `J` | Energy, action, loss, free energy, likelihood, or undefined? |
| geometry `G` | Euclidean metric, Fisher metric, mobility, symplectic form, covariance, or learned preconditioner? |
| generator/update `L` | Differential operator, vector field, matrix, recurrence or controller? |
| clock `tau` | Physical time, diffusion time, scale, layer, token position or iteration count? |
| detector `D` | What record is actually available? |
| invariants `I` | What survives the transformation or approximation? |

## Nine edge types

1. **Exact identity:** both typed objects and all declared operations coincide.
2. **Conjugacy/change of coordinates:** an invertible map intertwines the
   generators and transports detectors.
3. **Duality/Legendre passage:** primal and dual variables exchange under an
   explicit pairing; convexity and domain assumptions are retained.
4. **Metric/preconditioner change:** the objective may be held fixed while the
   rule defining steepest direction changes; invertibility, positivity and
   coordinate dependence must be declared.
5. **Discretization:** a continuous generator produces an update rule with a
   declared step size, order and stability region.
6. **Continuum or scaling limit:** a family converges in a named topology with
   controlled parameters.
7. **Probabilistic reinterpretation:** a deterministic or operator equation is
   lifted to a density, path or conditional law with normalization declared.
8. **Stationary or observable equivalence:** selected records agree although
   paths or hidden states do not.
9. **Analogy only:** a shared diagram or equation suggests a search but supplies
   no admissible transport of meaning.

## Worked translations

### Damped oscillator to heavy-ball

The physical equation

\[
\ddot x+\gamma\dot x+\nabla V(x)=0
\]

can yield a momentum optimization update after choosing a discretization. The
edge is **discretization**, not exact identity: physical time becomes iteration,
mass and damping become algorithmic hyperparameters, and energy dissipation
becomes a convergence instrument.

### Langevin to Gibbs

For a declared mobility `G`, temperature `T` and compatible noise,

\[
dX_t=-G\nabla V(X_t)dt+\sqrt{2TG}\,dW_t
\]

may admit density proportional to `exp(-V/T)`. This is a
**stationary-equivalence** edge with ergodicity, boundary and normalization
obligations. It does not identify the relaxation spectrum with a physical mass
gap; the corpus already contains an explicit counterexample to that promotion.

### State-space model to convolution

For a stable linear time-invariant system,

\[
\dot x=Ax+Bu,\qquad y=Cx+Du,
\]

eliminating the hidden state produces a causal impulse-response convolution.
This is an exact input--output realization under declared initial conditions,
while internal-state identity is withheld. Minimality requires controllability
and observability.

### Gaussian model to Kalman filter

Linear Gaussian transition and observation laws close under conditioning. The
Kalman cycle is an exact finite-dimensional Gaussian update, but only relative
to its covariance, independence and model assumptions. The innovation is the
detector residual; it is not evidence that the latent state is physically
complete.

### Gibbs weights to softmax

\[
p_i=\frac{e^{-E_i/T}}{\sum_j e^{-E_j/T}}
\qquad\text{and}\qquad
p_i=\frac{e^{z_i}}{\sum_j e^{z_j}}
\]

are algebraically identical after `z_i=-E_i/T`. The edge is a change of
variables. It becomes a physical identification only if logits acquire sourced
energies and the scale acquires thermodynamic temperature.

### Complex rotation to RoPE

A pairwise complex phase can implement a planar rotation in an embedding. The
representation law is exact inside the model, while token position is not
physical angle and the embedding plane is not automatically a spacetime or
internal-symmetry carrier.

## Corpus rule

No edge may be promoted because its endpoint equations look alike. Promotion
requires:

1. source and target node cards;
2. edge type;
3. forward map and, when claimed, inverse;
4. preserved invariants and detectors;
5. changed units, clocks and meanings;
6. assumptions and losses;
7. a falsifier or refusal condition;
8. an authority ceiling.
