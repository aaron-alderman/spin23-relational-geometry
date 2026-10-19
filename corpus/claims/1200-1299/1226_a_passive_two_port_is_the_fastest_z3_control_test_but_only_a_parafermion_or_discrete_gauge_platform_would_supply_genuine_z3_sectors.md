# A passive two-port is the fastest (Z_3) control test, but only a parafermion or discrete-gauge platform would supply genuine (Z_3) sectors

**Date:** 20 October 2026  
**Branches:** candidate-action blocker A11, Outcome Dynamics, two-current transport, control systems, topolectrical circuits and topological defects  
**Claim status:** explicit readiness audit plus executable passive-network witness; no physical (Z_3)-holonomy response has been observed

## Result in one sentence

A three-setting passive two-port circuit is the smallest immediately executable implementation of the A11 measurement logic and can produce three positive response matrices spanning all of (H_2(\mathbb R)), but its settings are synthetic labels; conventional phase rings, Josephson loops and twisted lattice boundaries add a genuine continuously tunable (U(1)) loop holonomy, while protected discrete (Z_3) sectors require a parafermionic or discrete-gauge platform that is not yet operationally available in this programme.

## 1. Three different meanings of “three sectors”

The phrase must be split before choosing hardware.

### Level 0 — synthetic three-state control

A relay, software flag or boundary-condition table has states (h=0,1,2). The settings are reproducible and can test whether the analysis detects a sector-correlated third response direction.

There is no loop and no topology. Calling this holonomy would be incorrect.

### Level 1 — loop holonomy sampled at three phases

A closed hopping, microwave or Josephson loop has the gauge-invariant phase

\[
W=\prod_{e\in\text{loop}}e^{i\phi_e}=e^{i\Phi}.
\]

Preparing \(\Phi=0,2\pi/3,4\pi/3\) gives three cyclic settings. Opening the loop destroys the gauge-invariant product, providing a decisive control.

This is a real geometric or synthetic (U(1)) holonomy, but it is continuously tunable. Three chosen points on a dial do not turn the dial into a protected (Z_3) gauge theory.

### Level 2 — protected discrete (Z_3) sectors

Here the three labels are superselection or topological sectors. Local operations cannot continuously connect them while the protecting gap and boundary conditions remain intact. A microscopic model must specify:

- the (Z_3) charge or Wilson-loop operator;
- the gap and system-size regime;
- which operators change sectors;
- preparation and lifetime;
- a fixed physical readout.

The corpus's level-three BF theory has exactly this mathematical semantics, but documents 465 and 1200 also show that the pure BF carrier neither derives its own microscopic realization nor remembers the ultraviolet family projector.

## 2. Readiness criteria

Each operational criterion is scored (0) for absent, (1) for specified or partial, and (2) for implemented locally or conventional platform capability:

1. three controlled reproducible sectors;
2. the same two probes in every sector;
3. a native positive (2\times2) response;
4. execution or construction now;
5. negative controls and common calibration.

Topology is not included in that sum. It is reported separately as level 0, 1 or 2 above. This prevents an easy synthetic demonstration from outranking a harder topological platform by quietly changing what “sector” means.

## 3. Ranked platforms

| Operational rank | Platform | Score / 10 | Topology level | Immediate verdict |
|---:|---|---:|---:|---|
| 1 | passive switched two-port | 10 | 0 | execute now as an analysis and calibration witness |
| 2= | conventional Josephson/SQUID loop | 9 | 1 | strong physical phase-loop candidate, not protected (Z_3) |
| 2= | topolectrical or microwave phase ring | 9 | 1 | strongest low-cost loop-holonomy simulator |
| 4 | Planckian (t)-(J) two-current calculation | 5 | 1 | excellent response semantics; physical energy current still missing |
| 5 | Outcome Dynamics GaAs device | 4 | 0 | useful multiphysics plant; positive two-channel object not yet defined and mesh/mass gate open |
| 6 | (Z_3) parafermion/discrete-gauge junction | 3 | 2 | right topology, lowest present operational readiness |

The ranking is generated from `evidence/data/a11-platform-realization-comparison.json`; it is a declared engineering assessment, not an empirical measurement.

## 4. Platform-specific audit

### 4.1 Passive switched two-port — immediate protocol witness

A passive two-port has a conductance or dissipative admittance matrix

\[
C=C^T\succeq0.
\]

The same two current/voltage ports can be retained for every switch position. Positivity follows from nonnegative dissipated power. Sham switching, port recalibration and component substitution are straightforward.

Its limitation is equally exact: a three-position switch is not holonomy. This platform validates the entire A11 acquisition, positivity, rank and control pipeline without providing evidence for a topological sector or (Spin(2,3)).

### 4.2 Topolectrical or microwave phase ring — best intermediate platform

Electrical networks are described by a measured circuit Laplacian or admittance matrix, and topological boundary responses have already been implemented and read through impedance measurements in conventional circuits ([Lee et al., 2018](https://www.nature.com/articles/s42005-018-0035-2)). Tunable complex link phases can implement a gauge-invariant product around a loop.

This makes a phase ring the cleanest bridge between the synthetic fixture and a genuine loop observable. The required controls are:

- cut one link while preserving local component values as closely as possible;
- redistribute the edge phases at fixed total loop phase;
- reverse the loop phase;
- hold the two readout ports fixed;
- verify that the Hermitian dissipative response remains positive.

A surviving dependence on total phase but not its edge distribution establishes loop holonomy. It still establishes (U(1)), not protected (Z_3), unless a separate discrete symmetry and gap quantize the sectors.

### 4.3 Conventional Josephson or SQUID loop — physical flux holonomy

A superconducting loop supplies a physical phase sum tied to enclosed flux. Two microwave ports can measure the same dissipative response matrix at

\[
\Phi_h=h\Phi_0/3,
\qquad h=0,1,2.
\]

This is more physical than a software label. But ordinary Josephson phase is continuous and flux sweeps can move between the three settings. Fractional-looking Josephson signatures can also arise from non-topological dynamics, so periodicity alone is not a topology certificate ([Sau, Berg and Halperin, 2012](https://arxiv.org/abs/1206.4596)).

This platform is best regarded as a controlled (U(1))-holonomy experiment with a (Z_3)-sampled protocol.

### 4.4 Planckian (t)-(J) transport — best native two-current calculation

The particle and physical energy currents give the exact positive spectral matrix

\[
C_{ab}(\omega)\succeq0,
\qquad a,b\in\{N,E\}.
\]

The probe semantics and positivity are therefore better founded than in the other current programme platforms. Twisted periodic boundaries can introduce a real flux holonomy; twisted-boundary (t)-(J) models are conventional rather than speculative constructions ([Liu and Wang, 1996](https://arxiv.org/abs/solv-int/9610012)).

However, document 1216 found that the current code has only the charge-current autocorrelation. The physical lattice energy current remains the first gate. Moreover, three twists (0,2\pi/3,4\pi/3) are three (U(1)) flux samples, not protected (Z_3) sectors.

Once (J_E) exists, this becomes the strongest microscopic simulation on the present tech tree.

### 4.5 Outcome Dynamics GaAs — mature plant, wrong response object so far

The GaAs model already has controlled mechanical sources and charge, optical-displacement and stress readouts. These outputs are valuable, but charge and displacement have different units and do not automatically form the entries of one positive response matrix.

The repair is to define two generalized drives and their conjugate fluxes, then form the dissipative work-response matrix or a same-unit spectral Gram matrix. Three drive patterns can then serve as synthetic labels.

Two gates precede this extension:

1. close the consistent-mass lateral/support refinement identified in checkpoint 194;
2. derive the positive two-port object rather than placing unrelated readouts into a symmetric matrix.

GaAs is therefore not the smallest A11 experiment despite being the most developed multiphysics model.

### 4.6 (Z_3) parafermion or discrete-gauge junction — right semantics, long horizon

Parafermionic Josephson proposals possess genuinely different topological-sector semantics and predict enlarged phase periodicities; explicit (Z_3) junction analyses exist ([Svetogorov, Loss and Klinovaja, 2021](https://journals.aps.org/prb/abstract/10.1103/PhysRevB.103.L180505)). More recent heterostructure proposals connect (Z_3) parafermions to fractional Josephson, interferometric and thermal signatures ([Amire, 2025](https://arxiv.org/abs/2512.16025)).

For this programme, however, no device Hamiltonian, protected gap, sector preparation, poisoning lifetime or fixed two-probe response has been implemented. It is the correct long-term topology target, not the next experiment.

## 5. Smallest executable experiment

Use three passive conductance branches with fixed two-port vectors

\[
u_1=(1,0),\qquad
u_2=(0,1),\qquad
u_b=(1,-1).
\]

For nonnegative branch conductances (g_{kh}), define

\[
C_h=\sum_{k=1,2,b}g_{kh}u_ku_k^T.
\]

Choose the three settings

\[
(g_{1h},g_{2h},g_{bh})
=
(4,2,1),\ (1,4,2),\ (2,1,4).
\]

The resulting fixed-port responses are

\[
C_0=\begin{pmatrix}5&-1\\-1&3\end{pmatrix},\quad
C_1=\begin{pmatrix}3&-2\\-2&6\end{pmatrix},\quad
C_2=\begin{pmatrix}6&-4\\-4&5\end{pmatrix}.
\]

Each has determinant (14), each is positive definite, and their three coordinate vectors span all three dimensions of (H_2(\mathbb R)). Relative to the diagonal reference plane, the normalized first-harmonic transverse statistic is approximately

\[
A_\perp=0.32644.
\]

This can be executed immediately as code, as a SPICE model, or with three resistor branches and a three-position relay. The required run order is:

1. freeze the two port definitions and calibration;
2. randomize repeated sector settings;
3. reconstruct the full (2\times2) response by driving each port;
4. verify reciprocity and positive dissipation;
5. pass a sham switch with unchanged conductances;
6. remove the inter-port branch and verify loss of the transverse direction.

The interpretation is deliberately modest:

\[
\boxed{\text{This validates the A11 instrument; it is not a holonomy experiment.}}
\]

## 6. Smallest experiment that actually tests loop holonomy

The next rung is the same fixed two-port measurement on a three-edge phase ring:

\[
W=e^{i(\phi_1+\phi_2+\phi_3)}.
\]

For each total phase (0,2\pi/3,4\pi/3):

- use at least two different distributions of phase among the edges;
- require equal response within uncertainty at fixed (W);
- open one edge and require the sector-correlated component to disappear;
- reverse (W\mapsto W^*);
- retain only the positive Hermitian dissipative part for the (H_2) test.

Passing these controls would establish a loop-holonomy-correlated third response direction. It would still be labelled **synthetic (U(1)) holonomy sampled in three sectors**, not (Z_3) topological order.

## 7. Decision rule for genuine (Z_3)

No platform may be promoted from level 1 to level 2 merely because three phase values close cyclically. Promotion requires all of:

1. an operator (W) with (W^3=1) on the admitted low-energy space;
2. a gap separating that space from local excitations;
3. local perturbations unable to mix sectors beyond a bounded finite-size correction;
4. explicit preparation and sector-changing operators;
5. a measured lifetime and leakage rate;
6. the same fixed two-probe positive response in every sector;
7. loop-cut, sham, calibration and ordinary-periodicity controls.

Without these, (h=0,1,2) remains a control label or three-point sampling scheme.

## 8. Programme consequence

The platform path is now staged rather than all-or-nothing:

\[
\begin{array}{c}
\text{passive switched two-port}\quad\text{(validate instrument)}\\
\downarrow\\
\text{phase ring or Josephson loop}\quad\text{(validate loop holonomy)}\\
\downarrow\\
\text{physical }J_N/J_E\text{ calculation}\quad\text{(microscopic positive response)}\\
\downarrow\\
\text{parafermion/discrete gauge platform}\quad\text{(test protected }Z_3\text{)}.
\end{array}
\]

Outcome Dynamics remains a parallel multiphysics route after its numerical and two-port-definition gates close.

This staging prevents two opposite mistakes: dismissing an easy synthetic experiment because it is not fundamental, and promoting an engineered three-state switch into topological evidence.

## Certificate and evidence

- `evidence/data/a11-platform-realization-comparison.json` contains the criteria, scores, topology classes and passive fixture.
- `verification/verify/verify_a11_platform_realization_comparison.mjs` recomputes the ranking, response matrices, positivity, determinants, span rank and transverse harmonic, and checks that the synthetic fixture is not labelled holonomy.
- `1222_a_preregistered_z3_holonomy_response_test_can_separate_a_third_physical_direction_from_ambient_spin23_geometry.md` defines the parent A11 protocol.
- `1219_outcome_dynamics_consistent_mass_converges_but_disagrees_with_lumped_mass_so_the_gate_remains_open.md` records the current GaAs boundary.
- `corpus/claims/1200-1299/1216_planckian_tj_transport_is_a_scalar_detailed_balance_ray_and_a_testable_two_current_spin23_response_extension.md` records the two-current transport boundary.
- `corpus/claims/0400-0499/465_level_three_bf_theory_realizes_the_hyperbolic_two_qutrit_carrier_and_its_missing_mutual_phase.md` gives the exact level-three topological target.
- `corpus/claims/1200-1299/1200_the_pure_z3_bf_carrier_forgets_the_projector_so_reflexive_closure_requires_non_topological_boundary_memory.md` prevents overclaiming what the protected sector remembers.
