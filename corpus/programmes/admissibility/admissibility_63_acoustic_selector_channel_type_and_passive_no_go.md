# Acoustic selector channel: type correction and passive no-go

**Date:** 25 October 2026  
**Status:** passive coherent selector interpretation closed; ensemble and feedback implementations specified  
**Topics:** OT-003, OT-009  
**Parents:** [three-mode two-datum contraction](admissibility_26_three_mode_quarter_turn_and_two_datum_contraction.md), [hybrid bosonic frontier](admissibility_33_hybrid_bosonic_carrier_and_adversarial_thermal_hall_frontier.md)  
**Evidence:** [channel ledger](../../../evidence/data/admissibility-acoustic-selector-channel-v1.json)  
**Generator:** [channel calculation](../../../scripts/run-admissibility-acoustic-selector-channel.mjs)  
**Verifier:** [channel certificate](../../../verification/admissibility/verify_acoustic_selector_channel.mjs)

## Result

The proposed acoustic repeated-return experiment contained a type ambiguity. Its neutral transport acts on coherent pressure vectors. Its exact selector map acts affinely on projectors, density matrices or ensemble covariances:

\[
\mathcal R(\rho;Y)=m\rho+(1-m)Y\operatorname{Tr}\rho,
\qquad m=\frac13.
\]

No fixed deterministic linear pressure-transfer matrix realizes this map on every input. A lossless matrix preserves projective distance and cannot attract. A passive nonunitary matrix can attract after normalization, but the attraction is exactly ordinary singular-value filtering. The passive loop-plus-selector proposal therefore cannot count as a distinct nonloss selection test.

This does not end the acoustic branch. It separates three experiments that had been folded into one:

1. coherent noncommuting acoustic transport;
2. an exact ensemble replacement-channel emulator;
3. a single-trajectory active-feedback or nonlinear-reservoir selector.

## Why a unitary block cannot select

For a lossless coherent block \(U\),

\[
\rho\mapsto U\rho U^\dagger
\]

preserves trace distance and projective angle. Repeating it may rotate, permute or return a state, but it cannot make distinct preparations converge to one attracting projector. This is the same reason projector-preserving holonomy does not choose an orientation: transport preserves the alternatives it moves.

The acoustic non-Abelian Thouless pump and quaternionic phase elements are excellent precedents for order-sensitive transport and noncommuting endpoint classes. They do not by themselves supply attraction. See You et al., [*Observation of Non-Abelian Thouless Pump*](https://arxiv.org/abs/2110.08789), and Sun et al., [*Non-Abelian Topological Phases and Their Quotient Relations in Acoustic Systems*](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.132.216602).

## Why a passive filter is not the affine selector

Take the calibrated selector axis

\[
Y=\begin{pmatrix}1&0\\0&0\end{pmatrix}.
\]

A passive filter with singular values \((1,r)\) induces

\[
\rho\mapsto
\frac{F\rho F^\dagger}{\operatorname{Tr}(F\rho F^\dagger)}.
\]

Choosing \(r=1/3\) matches the local angular slope of the affine selector near \(Y\). But it necessarily has

\[
\nu=\log\frac{s_{\max}}{s_{\min}}=\log3\approx1.0986
\]

and transmits the orthogonal input with only \(r^2=1/9\) of its power. It also scales coherence and population perturbations differently, whereas the affine replacement channel scales every traceless covariance perturbation exactly by \(m=1/3\).

Thus a normalized endpoint image can look almost identical while the unnormalized power and covariance response tell different stories. This is the reason the detector must retain what normalization would erase.

## Exact acoustic ensemble implementation

The affine map is a valid replacement channel. It can be implemented exactly across indexed acoustic shots or time slots:

1. with probability \(m=1/3\), route the coherently returned field;
2. with probability \(1-m=2/3\), inject the independently calibrated \(Y\) preparation;
3. retain the branch label rather than discarding it;
4. reconstruct the ensemble \(2\times2\) covariance before and after the channel.

The averaged covariance obeys the exact corpus map. Individual coherent shots do not contract; the ensemble does. Calling this “spontaneous selection” would be false. It is an engineered stochastic emulator of the mathematical operation, useful precisely because every source of contraction is visible.

## Single-trajectory implementation

A single evolving acoustic state requires either:

- measurement, computation and active synthesis of the next input; or
- a separately characterized nonlinear reservoir whose state-dependent dynamics realizes the declared update.

The record must then include measurement noise, latency, amplifier noise, reset cost, control work and the full branch/intervention history. The resulting dynamics can test attraction and causal propagation, but it is an active feedback system. Its scientific value is in comparing a known engineered selector with later natural systems, not in disguising the controller as an emergent physical law.

## Required detector bundle

Every run must retain:

- the complex pressure vector for each shot;
- the branch or time-slot label;
- unnormalized transmitted power;
- the ensemble covariance;
- deterministic-block singular values;
- coherence-direction and population-direction perturbations about (Y);
- \(Y\)-off, \(Y\)-on, loss-matched dummy and reversed-axis conditions.

The decision rule is:

\[
\boxed{
\begin{array}{ll}
\text{neutral transport:}&d_{\rm out}/d_{\rm in}=1,\\
\text{affine replacement:}&d_{\rm out}/d_{\rm in}=1/3\text{ in every traceless covariance direction},\\
\text{passive filter:}&\nu>0,\text{ power loss and direction-dependent tangent response}.
\end{array}}
\]

## Open and closed

Closed:

- a fixed lossless acoustic block cannot create an attracting selector;
- a fixed passive attracting block is completely explained by nonunitary filtering;
- complex pressure-vector tomography alone is not the correct record for the affine selector map.

Executable now:

- the exact indexed-shot replacement-channel emulator;
- loss-matched covariance tomography separating affine mixing from passive filtering;
- the existing noncommuting transport precedents as a separate neutral block.

Open:

- build the modular switch/injection apparatus and close its covariance budget;
- implement and cost a single-trajectory feedback version;
- identify a natural nonlinear acoustic element whose independently predicted dynamics reproduces the same map without postselected normalization;
- test OT-022's causal propagation bound on the feedback or reservoir implementation.

## Implication

The acoustic route remains useful, but its meaning changes. It is the cleanest place to demonstrate why transport, selection and detection are different operations even when their normalized endpoint pictures look alike. That is a theoretical-engineering result and a detector design lesson. New physics would require a natural carrier whose independently derived dynamics produces a residual not reducible to the declared controller, mixture or loss model.

## Reproduction

~~~powershell
node scripts/run-admissibility-acoustic-selector-channel.mjs --write
node verification/admissibility/verify_acoustic_selector_channel.mjs
~~~
