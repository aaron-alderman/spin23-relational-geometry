# Optimization dynamics: objective, geometry, memory and clock

## Result

The optimizer family is not a list of alternative forces. It is a controlled
factorization of an update into four independent choices:

\[
\text{update}=\text{discretization}
\circ\text{memory rule}\circ\text{metric selector}\circ\text{objective differential}.
\]

Keeping those choices separate explains both the real mathematical bridges to
physics and the limit on those bridges.

## Typed comparison

| Method | Selector/geometry | Memory | Local promise | Characteristic failure |
|---|---|---|---|---|
| gradient descent | Euclidean inverse metric | none | descent for a stable step on smooth objectives | coordinate dependent; stiffness |
| Newton | inverse Hessian | none | quadratic local convergence near a regular root/minimum | singular or indefinite Hessian; nonlocal divergence |
| natural gradient | inverse Fisher information | none | parameterization-aware local direction on an identifiable statistical model | singular Fisher matrix and model misspecification |
| mirror descent | Legendre map/Bregman divergence | optional | geometry adapted to constrained convex domains | boundary and non-strict-convexity failures |
| heavy-ball | usually Euclidean | velocity/momentum | acceleration on selected spectra | oscillation or instability outside its step/damping region |
| Adam | diagonal running first and second moments | exponential moving averages | adaptive scaling for noisy sparse gradients | bias, epsilon and known nonconvergence cases matter |
| Muon | approximate polar factor of matrix momentum | momentum plus Newton--Schulz state | spectrally normalized matrix update | rectangular/rank-deficient behavior and finite-iteration map matter |

## Metric is the selector

For a differential `dJ`, steepest descent is undefined until a geometry is
chosen. Euclidean descent uses `G=I`; natural gradient uses a Fisher metric;
Newton uses local curvature; mirror descent moves through a dual coordinate
defined by a convex potential. Thus the corpus phrase “dual face = selector”
becomes literal: the covector `dJ` does not itself choose a primal displacement.
The inverse metric or Legendre map performs that selection.

Newton and natural gradient are not interchangeable. The Hessian differentiates
the particular scalar objective and can be indefinite. Fisher information is
positive semidefinite and belongs to a statistical model; it coincides with
selected expected Hessians only under additional likelihood assumptions.

## Heavy-ball is the clean physics bridge

The continuous equation

\[
\ddot x+\gamma\dot x+\nabla J(x)=0
\]

is a damped inertial system. A semi-implicit discretization yields a momentum
recurrence of heavy-ball type. The bridge preserves the second-order recurrence
and spectral damping pattern. It changes physical time to iteration, mass and
damping to hyperparameters, and physical energy loss to a convergence device.
Stability depends on both step size and the Hessian spectrum; formal similarity
does not transfer a physical conservation law.

## Adam and Muon are stateful selectors

Adam enlarges the optimizer carrier from parameters alone to
`(parameters, first moment, second moment, step count)`. Its detector is the
loss/gradient stream; its adaptive diagonal selector depends on the retained
history. Muon similarly enlarges the carrier with matrix momentum, then applies
finite Newton--Schulz iterations to approximate an orthogonal/polar direction.
The finite polynomial is part of the algorithm, not disposable implementation
detail: it can differ from the exact polar map, especially near small singular
values.

This gives a useful corpus distinction:

- a memoryless metric change alters the local face used to read `dJ`;
- momentum introduces an internal dynamical carrier;
- adaptive moments make the selector history dependent;
- a finite spectral iteration introduces a second algorithmic clock.

## Non-equivalences that matter

1. A change of coordinates generally changes Euclidean gradient descent but
   natural gradient transforms covariantly only when the Fisher geometry is
   regular and correctly transported.
2. Newton's update is undefined at a singular Hessian and may point uphill at
   a saddle; “uses curvature” is not an admissibility proof.
3. Momentum can accelerate one spectral band while destabilizing another.
4. Adam's exponential averages are not thermodynamic ensemble averages.
5. Muon's orthogonalized matrix momentum is not a unitary physical evolution;
   it is a learned-parameter update with a chosen norm geometry.

## Frontier experiments without physical equipment

The executable laboratory tests quadratics because their spectra make every
assumption visible. The next useful software experiments are:

1. sweep condition number and compare Euclidean, Newton and diagonal adaptive
   selectors;
2. transform the same objective by an ill-conditioned coordinate map and test
   which trajectories commute with the transformation;
3. chart the heavy-ball stability region against the damped-oscillator roots;
4. compare finite Newton--Schulz Muon directions with exact SVD polar factors
   as singular values approach zero;
5. retain failures as negative edges in the atlas rather than tuning them away.

The scientific payoff is a reusable test of the corpus claim that admissibility
is selected jointly by objective, geometry, memory, clock and detector.
