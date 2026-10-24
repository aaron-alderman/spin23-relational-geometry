# Frontier expansion: cost, backaction, scale and rare events

**Date:** 24 October 2026  
**Status:** corpus-wide gap census and seven-lane expansion; most lanes remain underfilled  
**Parent:** [Wide frontier atlas](admissibility_32_wide_frontier_atlas_and_iterative_research_queue.md)  
**Evidence:** [Frontier-expansion ledger](../../../evidence/data/admissibility-frontier-expansion-v1.json)  
**Verifier:** [Frontier-expansion census](../../../verification/admissibility/verify_frontier_expansion.mjs)

## Result

The fourteen-lane atlas is broad in objects—transport, topology, fields, materials, gravity and cosmology—but thin in several **limits on processes**. A new lexical census makes the asymmetry stark. Renormalization/scale language appears in hundreds of corpus documents, while explicit thermodynamic cost, quantum speed/resource bounds and nonequilibrium active dynamics appear in only a handful. Document counts are not evidence, but the imbalance exposes what the present map habitually asks and what it rarely asks.

Seven additional lanes should be charted. They do not replace the first fourteen; they cut across them.

## Lane 15 — thermodynamic cost of selection and learning

The selector programme currently asks whether repeated dynamics converges and whether the contraction is genuinely relational. It does not yet ask what entropy production, work or heat is required to obtain a given contraction rate and precision.

This is a major omission. Thermodynamic uncertainty relations bound current precision by dissipation in broad classes of nonequilibrium steady processes, and stochastic thermodynamics of learning bounds acquired information by energetic cost. A physical selector should therefore be recorded as

\[
(\text{fixed point},\ \rho(D\mathcal R),\ \tau_{\rm mix},\ \dot S_{\rm prod},\ \text{precision}),
\]

not merely as a fixed point and slope.

**First experiment:** implement the AZ-026/AZ-028 contraction in an open, trajectory-resolved emulator; measure jump statistics and environmental heat while changing the independent datum (Y). Test whether faster or sharper selection obeys ordinary precision–dissipation bounds. A violation is not presumed; standard-bound saturation would already give the corpus a physical cost scale.

## Lane 16 — measurement backaction and monitored phases

The detector atlas presently treats detection mainly as a many-to-one compression of an already generated process. Quantum measurement can instead change the process. Monitored circuits exhibit measurement-induced transitions between entangling and disentangling dynamical phases, and a 2026 trapped-ion experiment reports a postselection-free observation on tree circuits with universal gates.

This is a direct laboratory for “closure to open”: increasing record formation changes which correlations remain admissible. But conditioned trajectories, unconditional channel evolution and classical decoding are distinct objects.

**First experiment:** place the selector carrier under tunable weak monitoring and independently reconstruct (i) the unconditional density matrix, (ii) trajectory-conditioned projectors and (iii) the classical record. Determine whether apparent selection survives after averaging or exists only in postselected records.

## Lane 17 — renormalization and scale-stable admissibility

The corpus contains extensive renormalization and fixed-point language but no central admissibility rule across scales. If (C_{ell_2\leftarrow\ell_1}) is a coarse-graining channel and (mathcal A_{ell_1}) the admissible microscopic set, the minimal consistency condition is

\[
C_{ell_2\leftarrow\ell_1}(\mathcal A_{ell_1})\subseteq\mathcal A_{ell_2},
\]

with semigroup consistency across intermediate scales. Equality need not hold: coarse-graining can erase distinctions and make the macro description less identifying. It cannot license a macro state with no admissible micro preimage unless emergence is explicitly defined by approximation or limit.

**First calculation:** take one finite projector/response carrier, define three nested resolutions, push forward both states and detector-equivalence classes, and test composition. Track which invariants survive, which become approximate and which exclusions are stable.

## Lane 18 — rare-event and large-deviation geometry

Means and linear response underdescribe metastability. Two systems can share susceptibility and hysteresis width while differing exponentially in escape rates and path ensembles. The correct objects are dwell-time distributions, first-passage statistics and trajectory rate functions.

**First experiment:** for the same six-basin or two-datum selector landscape, measure switching under forward and reverse sweeps over several waiting times. Fit the full dwell distribution and a large-deviation rate function rather than one relaxation time. This is the natural discriminator between equilibrium breaking, kinetic freezing and a detector-window artifact.

## Lane 19 — complexity and computational admissibility

Existence, efficient preparation, efficient sampling and efficient verification are four different frontiers. A finite group or state space may be mathematically admitted while the required control word grows exponentially, the many-body amplitude has a sign problem, or verification itself requires inaccessible tomography.

The 2026 postselection-free monitored-circuit experiment is instructive: the tree architecture matters because it changes classical decoding from an otherwise prohibitive task to linear scaling in the implemented protocol.

**First rule:** every emulator or numerical frontier claim should carry a resource card with system-size scaling and approximation error.

**25 October refinement:** the [certified target audit](../frontier-physics-targets/frontier_complexity_cards_v1.md) separates five stages: existence, preparation, sampling, detection and verification. Existence must be explicit because an efficiently measured low-dimensional record can still depend on an exponentially large represented state space; FPT-004 is the concrete example. Fixed-size exactness is also its own class rather than a synonym for scalable access. The original four operational entries remain useful inside the refined card, but they no longer carry the burden of the existence question.

## Lane 20 — causal spread, scrambling and speed limits

The dynamics programme charts frequency and relaxation but rarely asks how quickly an allowed distinction can propagate. Quantum speed limits, locality bounds and scrambling bounds constrain the earliest possible selection, equilibration or record formation. Recent work gives open-system bounds beyond weak Markov coupling and a universal logarithmic lower bound for sustained Hamiltonian scrambling.

**First experiment:** locally perturb a spatial selector or topological carrier, measure the information/response front, and compare its arrival with the observed contraction time. A global fixed point reached faster than the calibrated propagation bound diagnoses hidden long-range coupling, common drive or analysis leakage.

## Lane 21 — disorder, localization and glassy memory

Topology, metastability and selection are currently treated mostly in clean or parametrically perturbed systems. Quenched disorder can localize modes, broaden transitions and create rare regions; self-generated disorder can produce glassy memory that imitates a multiplicity of vacua.

**First experiment:** repeat the same holonomy/selector protocol across disorder strength, physical samples and waiting times. Track gap statistics, projector closure, return-map slope and rare dwell tails jointly. Robust topology should survive declared disorder while its detector overlap may not; kinetic selection should display sample- and history-dependent relaxation.

## Expanded map

| Lane | Principal invariant or bound | Shared carrier with present work | Filled depth | Open frontier |
|---|---|---|---|---|
| thermodynamic cost | precision–dissipation inequality | open-system selector | standard theory known | joint cost/contraction measurement |
| measurement backaction | channel/trajectory distinction | monitored mode or qudit network | current platform exists | insert corpus selector datum (Y) |
| scale stability | coarse-graining semigroup | finite projector/response model | language abundant | explicit three-scale pushforward |
| rare events | rate function / fluctuation symmetry | metastable selector or domains | basic lifetime map | trajectory-level data |
| complexity | scaling of existence/prepare/sample/detect/verify | every emulator | target-level cards certified for FPT-001--010 and FPT-022 | packet-level schema enforcement |
| causal speed | speed/locality bound | spatial open system | external bounds known | compare with selector mixing |
| disorder/glass | disorder-averaged and rare-region scaling | photonic, acoustic, magnetic carriers | scattered mentions | joint topology/selection audit |

## Re-ranking

Lane 15 enters the develop-now band immediately because it attaches to the existing contraction experiment without choosing a new ontology. Lane 16 follows closely because monitored quantum platforms now provide a real experimental bridge. Lane 17 is theoretically central but should begin with a finite carrier rather than another general essay. Lanes 18 and 20 become required diagnostics wherever metastability or fast selection is claimed. Disorder and complexity become mandatory audit columns rather than stand-alone speculative programmes.

The atlas therefore expands from fourteen object-facing lanes to twenty-one combined object/process lanes. The strongest near-term triangle is now:

\[
\boxed{
\text{selection dynamics}
\;\longleftrightarrow\;
\text{detector quotient/backaction}
\;\longleftrightarrow\;
\text{thermodynamic and causal cost}.
}
\]

This triangle stays close to known physics. It asks whether a proposed selection is observable, whether observation changes it, and what it costs in entropy, time and control resources.

## Primary sources

- Barato and Seifert, [*Thermodynamic Uncertainty Relation for Biomolecular Processes*](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.114.158101).
- Goldt and Seifert, [*Stochastic Thermodynamics of Learning*](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.118.010601).
- Feng et al., [*Postselection-free experimental observation of the measurement-induced phase transition in circuits with universal gates*](https://www.nature.com/articles/s42005-025-02443-0).
- Il'in, Aristova and Lychkovskiy, [*Quantum speed limits for an open system in contact with a thermal bath*](https://journals.aps.org/pra/abstract/10.1103/PhysRevA.110.022203).
- Vikram, Shou and Galitski, [*Proof of a Universal Speed Limit on Fast Scrambling in Quantum Systems*](https://journals.aps.org/prl/abstract/10.1103/y9z4-v641).
