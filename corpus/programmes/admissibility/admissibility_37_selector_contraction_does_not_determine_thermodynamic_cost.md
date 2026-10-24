# Selector contraction does not determine thermodynamic cost

**Date:** 24 October 2026  
**Status:** exact detailed-balance no-go and trajectory-level measurement gate  
**Parent:** [Frontier expansion](admissibility_36_frontier_expansion_cost_backaction_scale_and_rare_events.md)  
**Evidence:** [Selector thermodynamic-cost gate](../../../evidence/data/admissibility-selector-thermodynamic-cost-gate-v1.json)  
**Verifier:** [Two-state thermodynamic certificate](../../../verification/admissibility/verify_selector_thermodynamic_cost_gate.mjs)

## Result

The first thermodynamic-cost calculation produces a guardrail:

\[
\boxed{
\text{return-map contraction does not determine entropy production.}
}
\]

A system can possess one globally attractive selected state, have a return-map multiplier strictly below one, and nevertheless produce zero entropy at stationarity. The missing distinction is between equilibrium relaxation, nonequilibrium maintenance and measurement-conditioned selection.

## Exact two-state selector

Let (p) be the probability of the selected state and let the continuous-time transition rates be (k_+) toward it and (k_-) away from it. Then

\[
\dot p=k_+(1-p)-k_-p
=(k_++k_-)(p_*-p),
\qquad
p_*=\frac{k_+}{k_++k_-}.
\]

After a fixed observation interval (	au),

\[
p' = p_*+r(p-p_*),
\qquad
r=e^{-(k_++k_-)\tau}.
\]

Thus (p_*) is unique and globally attractive whenever both rates are positive, and the slope (r) can be made arbitrarily small by waiting longer or increasing the overall activity.

For a locally detailed-balanced two-state process, the instantaneous entropy-production rate is

\[
\sigma(t)=
\big[k_+(1-p)-k_-p\big]
\ln\frac{k_+(1-p)}{k_-p}\ge0.
\]

At (p=p_*), forward and reverse fluxes are equal and

\[
\sigma_*=0.
\]

The selected state is maintained without a stationary probability current. Entropy is produced during relaxation, and its integral equals the decrease of relative entropy to the stationary distribution:

\[
\Sigma_{0\to\tau}
=D(p_0\Vert p_*)-D(p_\tau\Vert p_*).
\]

The executable witness uses (k_+=4), (k_-=1), (p_0=0.2) and (	au=0.4). It obtains (p_*=0.8), (r=e^{-2}\simeq0.1353), positive transient entropy production and zero stationary production.

## A second no-go: speed needs a resource constraint

Multiply both rates by (c) and divide the protocol time by (c). The stationary state, contraction multiplier, path in probability space and total entropy production are unchanged, although the transformation occurs (c) times faster in laboratory time.

Therefore no universal cost-versus-speed relation follows from the return map alone. A speed limit needs additional physical restrictions: bounded coupling strength, bounded kinetic activity, a fixed control norm, limited reservoir bandwidth, locality, or a specified system-bath Hamiltonian. Without such a restriction, “faster selection costs more” is not a theorem.

## Three thermodynamic classes of selection

### Equilibrium-biased selection

Detailed balance holds and stationary currents vanish. The fixed point is set by an energy/free-energy bias. Costs belong to preparation, transient relaxation, control of the landscape and any reset cycle—not continuous housekeeping at the fixed point.

### Nonequilibrium maintained selection

Detailed balance is broken by multiple reservoirs, chemical driving, feedback or cyclic transition affinities. Stationary currents and housekeeping entropy production can be nonzero. Thermodynamic-uncertainty relations may then bind current precision and dissipation, provided their dynamical assumptions are satisfied.

### Measurement-conditioned selection

The attractive state exists in individual records or postselected trajectories but may disappear in the unconditional channel. The cost ledger must include detector backaction, acquisition, feedback, memory and erasure. Treating the record as passive loses the relevant thermodynamics.

## Required measurement packet

The selector experiment must now measure or bound, in the same protocol:

- state trajectories or jump records;
- forward and reverse rates;
- environmental heat or a calibrated work proxy;
- dynamical activity, meaning total transitions per unit time;
- stationary currents and cycle affinities;
- reset, feedback and measurement work;
- return-map slope and mixing time;
- conditioned and unconditional state evolution.

The slope remains important, but it is only one coordinate of the physical process.

## What would count as a frontier anomaly

An apparent violation of a cost or speed bound is not immediately new physics. First audit hidden reservoirs, coarse-graining, unobserved cycles, non-Markovian memory, feedback, detector work and whether the theorem assumes a steady current that the experiment does not possess.

Only after the complete trajectory model and resource constraint are fixed can a surviving violation become a useful anomaly. This makes the thermodynamic lane conservative but powerful: ordinary outcomes classify the selector, while an anomalous outcome has a sharply stated theorem to violate.

## Consequence for admissibility

Admissibility cannot be identified merely with convergence to an allowed state. The same contractive map can arise from reversible equilibration, driven dissipation or record-conditioned dynamics. A physical admissibility claim therefore needs a typed tuple

\[
(\text{map},\ \text{fixed point},\ \text{activity},\ \text{entropy flow},\ \text{record channel},\ \text{resource bound}).
\]

That tuple is the minimum bridge between the corpus's selection geometry and thermodynamics.

## Primary sources

- Ge and Qian, [*Physical origins of entropy production, free energy dissipation, and their mathematical representations*](https://journals.aps.org/pre/abstract/10.1103/PhysRevE.81.051133).
- Esposito and Van den Broeck, [*Three faces of the second law. I. Master equation formulation*](https://journals.aps.org/pre/abstract/10.1103/PhysRevE.82.011143).
- Barato and Seifert, [*Thermodynamic Uncertainty Relation for Biomolecular Processes*](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.114.158101).
- Goldt and Seifert, [*Stochastic Thermodynamics of Learning*](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.118.010601).
