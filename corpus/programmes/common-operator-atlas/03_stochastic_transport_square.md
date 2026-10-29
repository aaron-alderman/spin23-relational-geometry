# Stochastic transport square

## Result

The closest rigorous bridge in the diagram is not a single identity but a
typed square:

\[
\text{sample paths}\xrightarrow{\text{forward law}}\text{density evolution}
\xrightarrow{\text{variational reading}}\text{measure-space gradient flow},
\]

with a stationary projection from density evolution to a Gibbs law. Each
arrow preserves less than the one before it. A density generally forgets path
couplings; a stationary law forgets transient currents; a variational reading
requires a metric, boundary conditions and regularity not supplied by the PDE
alone.

## The node cards

| Reading | Carrier | Generator or update | Clock | Detector | Authority ceiling |
|---|---|---|---|---|---|
| overdamped Langevin | random path `X_t` | drift plus Wiener increment | stochastic/physical time only when sourced | path samples or functionals | path law |
| Fokker--Planck | normalized density `rho_t` | drift--diffusion operator | density-evolution time | density observables | one-time marginals unless a process is reconstructed |
| Gibbs | stationary probability measure | zero stationary flux under detailed balance | no transient clock | equilibrium averages | stationary law, not trajectory |
| Wasserstein flow | probability measure with finite second moment | metric slope of free energy | variational flow parameter | measure functionals | gradient flow in the declared transport metric |
| score diffusion | time-indexed noised data law | learned score in reverse SDE/ODE | corruption schedule | samples or likelihood estimates | learned generative model |
| flow matching | probability path and velocity field | continuity equation | interpolation parameter | terminal samples and path diagnostics | learned transport, not thermodynamic motion |

## The exact core

For constant symmetric positive mobility `G`, potential `V`, temperature `T`
and Itô noise,

\[
dX_t=-G\nabla V(X_t)\,dt+\sqrt{2TG}\,dW_t
\]

has the forward equation

\[
\partial_t\rho=\nabla\!\cdot\!\bigl(G(\rho\nabla V+T\nabla\rho)\bigr).
\]

Under normalizability and a no-flux or decaying boundary condition,
`rho_* proportional to exp(-V/T)` has zero probability current. Under the
standard regularity assumptions the same density equation is the
Wasserstein-gradient flow of

\[
\mathcal F[\rho]=\int V\rho\,dx+T\int\rho\log\rho\,dx,
\]

with mobility included in the transport geometry. These are source-native
mathematical bridges. They still do not make the relaxation eigenvalues
particle masses, the Wasserstein distance spacetime distance, or the flow
parameter laboratory time.

The Jordan--Kinderlehrer--Otto step makes the metric choice visible:

\[
\rho_{k+1}=\mathop{\rm argmin}_{\rho}
\left[\mathcal F[\rho]+\frac{1}{2h}W_2^2(\rho,\rho_k)\right].
\]

Changing `W_2`, the mobility, the boundary law or the admissible measures
changes the dynamics even if the free-energy functional is unchanged.

## Itô and Stratonovich are a compulsory fork

For state-dependent noise `sigma(X)`, the notation `sigma dW` is incomplete
until the stochastic convention is declared. Converting a Stratonovich SDE to
Itô adds a noise-induced drift. The corpus already meets this issue in its
nonlinear stochastic-frame work; the atlas therefore refuses any
Langevin-to-Fokker--Planck edge lacking convention, regularity and boundary
data. With additive noise the correction vanishes, which is why toy diagrams
often conceal the fork.

## Tweedie's identity: a detector bridge

If `Y=X+sigma Z` with independent standard Gaussian `Z` and sufficiently
regular marginal density `p_Y`, then

\[
\mathbb E[X\mid Y=y]=y+\sigma^2\nabla_y\log p_Y(y).
\]

This is an exact conditional-mean identity. It turns the score of the noisy
detector law into a posterior-mean estimator. It does not recover an actual
hidden sample, and it fails as written for non-Gaussian corruption, singular
laws or an incorrectly learned score. In corpus language, the score is a
selector derived from the detector distribution; it is not the carrier.

## Score diffusion and flow matching

Score-based diffusion specifies a forward corruption SDE and learns the score
needed by a reverse-time SDE or its probability-flow ODE. Flow matching instead
regresses a velocity field for a chosen probability path and transports the
law through a continuity equation. They can share marginal probability paths
under special construction, but their sample-path laws and training targets
need not agree. The admitted relation is **observable equivalence of selected
marginals**, not universal dynamical identity.

## Failure and frontier table

| Tempting promotion | Why it fails | Reopening evidence |
|---|---|---|
| stationary Gibbs law implies detailed balance | non-equilibrium steady states can retain stationary currents | measured current vanishes and generator is reversible in the stated measure |
| same Fokker--Planck equation identifies microscopic paths | distinct processes or couplings can share marginals | path-space statistics or a uniqueness theorem for the process |
| zero-noise Langevin equals physical gradient descent | clock, mobility and units may be algorithmic | sourced constitutive dynamics and calibrated time |
| a learned score is a force | score has inverse-coordinate units, not automatically force units | energy scale, temperature and constitutive derivation |
| flow matching is thermodynamic flow | interpolation time and velocity are designed | entropy production, bath coupling and physical clock independently measured |
| diffusion always has a Gibbs endpoint | non-gradient drift, boundaries and multiplicative noise can prevent it | normalizable invariant measure and recurrence/ergodicity proof |

## Corpus consequence

This square fills the diagram's most important gap while strengthening, rather
than weakening, admissibility. A carrier becomes progressively quotiented as
one passes from path to density to equilibrium record. The quotient scar is
the information required to reverse that passage: path correlations, current,
boundary flux, stochastic convention and clock calibration.
