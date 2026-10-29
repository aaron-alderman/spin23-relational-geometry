# Internal stress can become locomotion only through a momentum port

**Date:** 29 October 2026

**Status:** reader-facing Claimipedia article and governed experimental programme; established conservation, locomotion and stochastic-thermodynamic results separated from an unverified substrate-swimming branch

**Parent claim:** [Internal stress, broken symmetry and control loops do not produce reactionless motion](../../claims/1800-1899/1800_internal_stress_broken_symmetry_and_control_loops_require_a_declared_momentum_port.md)

**Evidence:** [medium-locomotion control gate](../../../evidence/data/admissibility-medium-locomotion-control-gate-v1.json)

**Generator:** [control-loop, detailed-balance and momentum-ledger calculation](../../../scripts/run-medium-locomotion-control-gate.mjs)

**Verifier:** [certificate verifier](../../../verification/admissibility/verify_medium_locomotion_control_gate.mjs)

## Abstract

Internal stress can produce travel. A swimmer pushes water, a bird leaves a
vortical wake, a sailing vessel transfers momentum between air and water, a
frictional crawler pushes its substrate, and a molecular motor consumes free
energy while exchanging momentum with a thermal environment. None is
reactionless. Broken spatial symmetry selects a direction, non-reciprocal
dynamics select an oriented cycle, and a medium or boundary receives the
opposite momentum.

This distinction supplies a charitable but demanding reading of claimed
electrostatic propulsion. An asymmetric electrode may be a static selector;
time-dependent charging, polarization or deformation may be an internal
stroke. The resulting apparatus could couple to ordinary ions, chamber walls,
ground, cables, radiation, dielectric memory or mechanical supports. A more
speculative branch may ask whether it couples to an additional vacuum or
substrate degree of freedom. But the substrate branch becomes a model only
when it supplies a state, action, coupling port, constitutive response,
opposite momentum, noise or wake, and a recovery limit for ordinary
electrodynamics.

The practical result is a constrained system-identification programme. Drive
several independent electrode controls through static settings, reciprocal
lines and oppositely oriented loops; measure force together with current,
temperature, vibration, emitted charge and radiation; and require a complete
momentum ledger. This can improve high-voltage metrology under a null result
while retaining a finite route by which a reproducible residual could count
as new physics.

## 1. The common conservation law

Let the electromagnetic momentum density be

\[
 \mathbf g_{\rm EM}=\epsilon_0\mathbf E\times\mathbf B
\]

and let \(\mathbf T_{\rm EM}\) denote the Maxwell stress tensor. With a
consistent sign convention, field and matter satisfy

\[
 \partial_t\mathbf g_{\rm EM}+\nabla\!\cdot\mathbf T_{\rm EM}
 =-\mathbf f_{\rm L},
\]

\[
 \partial_t\mathbf p_{\rm m}+\nabla\!\cdot\boldsymbol\Pi_{\rm m}
 =\mathbf f_{\rm L}.
\]

The Lorentz-force exchange cancels in the sum. For a control volume \(V\),

\[
 \frac{d}{dt}(\mathbf P_{\rm m}+\mathbf P_{\rm EM})
 =-\oint_{\partial V}
 (\boldsymbol\Pi_{\rm m}+\mathbf T_{\rm EM})\cdot\mathbf n\,dA.
\]

Asymmetric fields can therefore produce asymmetric **local** stress without
producing acceleration of a complete isolated system. Net motion requires
momentum to cross the declared boundary, remain temporarily in the field, or
enter a degree of freedom omitted from the model. The last option is allowed
as a hypothesis, but it is not allowed as an unnamed residual.

This is the momentum analogue of the corpus's existing Poynting-continuity
result. That earlier result closes matter-plus-field energy while showing that
screening requires an additional material ledger. Here the same rule becomes:

> a force residual before the complete momentum carrier is declared is a
> missing-port problem, not yet a new-force result.

## 2. What evolved locomotion establishes

Biological examples are valuable because their accounting is unusually clear.
The organism supplies internal actuation and geometry; the environment
receives momentum.

### 2.1 Birds, insects and fish: an observable wake

Flapping wings continuously change camber, twist and angle of attack. Leading-
edge and wake vortices are not decorative consequences: they are records of
momentum imparted to air. Modern reviews of biological flight emphasize the
connection between unsteady wing kinematics, vortex structure and force.
Fish and flexible foils likewise organize shed vorticity into a propulsive
wake. Internal muscle stress becomes motion because the surrounding fluid is
a constitutive carrier with inertia and viscosity.

The lesson is bounded. An asymmetric wing held in otherwise uniform quiescent
air is not an engine. Static form can select the response to an existing flow;
repeated locomotion also needs actuation and exported momentum.

### 2.2 Low-Reynolds-number swimming: the cycle is the object

In Stokes flow, kinematic reversibility gives Purcell's scallop theorem: a
one-parameter reciprocal deformation cannot generate net locomotion. A
swimmer needs a non-reciprocal loop in a shape space of at least two effective
coordinates. Shapere and Wilczek formulated the displacement geometrically as
a gauge-field holonomy over shape space.

For controls \(u_1,u_2\), an adiabatic displacement can take the schematic
form

\[
 \Delta x=\oint_\gamma A_i(u)\,du_i
 =\iint_{\Sigma_\gamma}\mathcal F_{ij}\,du_i\wedge du_j.
\]

The system returns to the same shape while its position changes. This is not
motion from internal force alone: the connection \(A_i\) is derived from the
fluid response, and the fluid carries the compensating momentum.

### 2.3 Tacking and frictional crawling: two carriers or a boundary

A sailing vessel couples wind to its sail and water to its keel. Forward
motion emerges from transferring momentum between two externally maintained
flows. A piezoelectric crawler or ultrasonic motor combines an internal cyclic
actuator with anisotropic contact friction. The floor is the momentum port.

These mechanisms motivate a useful electrostatic analogy. Electrode asymmetry
could supply directional selection, while charging, dielectric relaxation or
mechanical motion supplies a cycle. But if the apparatus is crawling against a
ground lead, chamber wall, balance pivot or support, it has not discovered a
vacuum medium.

## 3. Brownian motion is not the missing fuel

At equilibrium,

\[
 \langle\Delta x(t)\rangle=0,
 \qquad
 \langle\Delta x(t)^2\rangle=2Dt.
\]

Spatial asymmetry may change diffusion and correlations, but detailed balance
matches every equilibrium trajectory with its reverse. The executable
certificate instantiates a three-state ring with symmetric rates and obtains
zero stationary edge current.

Brownian motors work only after detailed balance is broken by chemical free
energy, external switching, unequal reservoirs, feedback, active matter or
another nonequilibrium resource. The same certificate introduces a nonzero
cycle affinity, obtains a directed current and verifies positive entropy
production. Rahav, Horowitz and Jarzynski further show that cyclic stochastic
pumps have a no-pumping boundary and an adiabatic geometric contribution.

Thus the correct grammar is

\[
 \boxed{
 \text{noise}+\text{asymmetry}+\text{free-energy source}
 +\text{oriented dynamics}+\text{momentum port}
 \longrightarrow\text{directed transport}.}
\]

Noise can help cross barriers. It is not the free-energy source.

## 4. Static selection and dynamic transport are different jobs

A compact phenomenological decomposition is

\[
 F(t)=F_{\rm stat}(u)
 +F_{\rm rate}(u,\dot u)
 +F_{\rm mem}[u(t'<t)]
 +F_{\rm geom}[\gamma]
 +F_{\rm out}.
\]

The terms should not be fitted as though they were interchangeable:

| component | representative origin | discriminating record |
|---|---|---|
| static | image charge, chamber attraction, elastic preload | endpoint state, often even in voltage |
| rate-dependent | current, gas flow, eddy force, viscoelastic drag | ramp-rate and frequency dependence |
| memory | trapped charge, dielectric relaxation, creep, heating | dwell relaxation and hysteresis |
| geometric | non-reciprocal multi-control loop | sign reversal under loop orientation |
| outgoing momentum | ions, photons, acoustic or substrate modes | measured flux or correlated wake |

The friction analogy is exact only when a bath or boundary is named. Static
friction stores stress; slip transfers momentum to the contact and exports
energy into deformation, heat and sound. A hypothetical vacuum friction with
no response kernel, noise, excitations or receiving state is not yet friction.

## 5. Control theory maps mechanisms without deciding them in advance

Treat the apparatus as an unknown multiple-input, multiple-output system:

\[
 \dot x=f(x,u,w),\qquad y=h(x,u,w).
\]

Here \(u\) contains electrode voltages and phases; \(x\) may contain charge,
polarization, temperature, strain, gas and proposed substrate states; \(w\)
contains pressure, orientation, chamber potential, vibration and magnetic
environment; and \(y\) contains force, torque, acceleration, current,
temperature, emitted charge, radiation and vibration.

Linearization gives

\[
 \dot x=Ax+Bu,\qquad y=Cx+Du,
 \qquad G(s)=C(sI-A)^{-1}B+D.
\]

Direct feedthrough, poles, zeros, phase lag and dc gain separate immediate
response from relaxation and resonance. Nonlinear Volterra, block-oriented,
hysteresis or sparse state-space models may then be admitted only when the
linear residual requires them. Recent control-oriented system-identification
work recommends enforcing conservation, passivity, symmetry and stability as
model constraints rather than minimizing prediction error alone.

### 5.1 Opposite loops with identical power

Use two controls

\[
 u_1(t)=a\cos\omega t,
 \qquad
 u_2(t)=a\cos(\omega t+\phi).
\]

Their oriented control-space area is

\[
 \mathcal A(\phi)=-\pi a^2\sin\phi.
\]

The certificate verifies that mean square drive is independent of \(\phi\),
ordinary bilinear mixing is even under \(\phi\mapsto-\phi\), and oriented area
is odd. Define

\[
 F_{\rm even}(\phi)=\frac{F(\phi)+F(-\phi)}2,
 \qquad
 F_{\rm odd}(\phi)=\frac{F(\phi)-F(-\phi)}2.
\]

Heating and many electrostatic terms enter the even channel. A geometric pump
must contribute to the odd channel. This is not by itself evidence of a new
medium: phase-sensitive cable, mechanical and plasma couplings can also be
odd, so every candidate requires its own forward model.

## 6. The four kenotically retained branches

### Branch A: closed-system conventional electrodynamics

The complete isolated device has no static self-acceleration. Local Maxwell
stress cancels after matter, field and the complete closed surface are
included. Time-dependent operation can recoil by emitting photons, but the
directed-radiation bound is

\[
 F\leq P/c.
\]

At \(10\,\mathrm{mN}\), an ideal photon rocket requires approximately
\(3.0\,\mathrm{MW}\) of directed power. A claimed force far above that level
must identify another momentum carrier.

### Branch B: an ordinary external port

Ion wind, field emission, outgassing, chamber image forces, grounding, power
leads, magnetic coupling, thermal expansion and support stress can all create
real forces or false balance records. NASA tests of asymmetric capacitors
found atmospheric and reduced-pressure results consistent with ion momentum
transfer and reported no force in hard vacuum for the tested configurations.
High-accuracy EMDrive work later demonstrated how thermal expansion and
mounting stress produce thrust-like plateaus and found no anomalous force
above the photon-thrust scale in its final configuration.

This branch is not a claim that every new apparatus has already been
explained. It is the best-supported nuisance family and must be quantitatively
defeated on the device under test.

### Branch C: genuine locomotion in a known medium

Electrohydrodynamic, magnetohydrodynamic, plasma, acoustic, optical and
electrodynamic-tether propulsion are propellant-free only in restricted senses.
They exchange momentum with ambient material, radiation or an external field.
Their success supports the locomotion grammar while opposing the word
“reactionless.”

### Branch D: locomotion in a new substrate

This is the strongest charitable interpretation of an Exodus-like effect.
The electrode configuration is the swimmer, the voltage programme is its
stroke, and a new carrier receives the wake. It remains at evidence zone M3
only after specifying

\[
 \mathcal P_{\rm sub}
 =(B,S_B,\{\psi_i\},\{P_i\},\{\Pi_i\},\mathcal N,D,R).
\]

That packet asks for a substrate state and action, modes and dispersion,
physical couplings, noise/dissipation, detector map and recovery of known
physics. It must also survive preferred-frame, fifth-force, equivalence,
radiation-loss and Lorentz-violation constraints. A structured quantum vacuum,
Casimir response or Higgs expectation value does not supply this packet by
itself.

## 7. Application to the Exodus claim

Exodus Propulsion Technologies publicly describes force from controlled
electrostatic interactions without onboard propellant. Its mini-whitepaper
calls the effect a force separate from ordinary Coulomb and magnetic forces,
speaks of coupling to a vacuum or quantum background, and also says no new
physics is required because QED explains it. The public patent attributes net
force to asymmetric electrostatic pressure.

Those statements are not yet one closed theory. Ordinary QED already includes
Maxwell stress and conserves total momentum. If a quantum background receives
momentum, the action and receiving state must be added; if nothing receives
momentum, the claim conflicts with translation symmetry. The available public
apparatus descriptions do not yet provide independent free-flight
confirmation or a complete momentum ledger.

The corpus therefore admits the **question**, not the claimed force:

\[
 \boxed{
 \text{Can a complete electrically floating device exhibit a held-out}
 \atop
 \text{centre-of-mass residual after every ordinary momentum port is bounded?}}
\]

## 8. Experimental programme

### Gate E0: freeze the system boundary

Place the thruster, battery, high-voltage converter, switching electronics and
telemetry inside the measured body. Declare every mechanical, electrical,
optical, gas and radiative connection crossing the boundary.

### Gate E1: characterize static and memory response

Run ramp--hold--return sequences across amplitude, polarity and ramp rate.
Measure force--voltage hysteresis, dwell relaxation, temperature, leakage
current, strain and vibration. A jump after stored preload is not continuous
thrust.

### Gate E2: identify linear and nonlinear dynamics

Use orthogonal multisines and randomized phase programmes to estimate a MIMO
transfer matrix and expose harmonic/intermodulation products. Train on a
subset and preregister held-out waveforms, orientations and power levels.

### Gate E3: reverse the geometry rather than only the voltage

Cross electrode permutation, apparatus rotation, voltage polarity and loop
orientation. Preserve controls with equal rms voltage and dissipated power.
Each candidate mechanism must predict its complete sign table before data are
unblinded.

### Gate E4: close conventional momentum ports

Measure or upper-bound charged-particle flux, neutral outgassing, directional
RF/optical radiation, acoustic power, magnetic coupling, chamber electrostatic
force, thermal centre-of-mass shift and support stress. Report the joint
uncertainty of the complete ledger, not a list of individually small effects.

### Gate E5: remove the laboratory floor

Repeat the surviving configuration with battery power, no grounding or
force-bearing cables, varied chamber dimensions and ultimately free flight,
drop testing or an orbital platform. A force that disappears with the ground
or chamber identifies an external port rather than a spacecraft drive.

### Gate E6: test substrate-specific consequences

Only after E0--E5, preregister frequency, orientation, boost, temperature,
noise or relaxation predictions from one explicit substrate action. A residual
with no action remains an anomaly, not an identified medium.

## 9. Literature review and present best understanding

| side of the question | strongest established result | consequence here |
|---|---|---|
| electromagnetic momentum | Maxwell--matter stress-energy conservation; rigorous charged-body self-force treatments recover Lorentz force plus controlled radiation/self-force corrections | local field asymmetry is not closed-system propulsion |
| asymmetric capacitors | NASA contractor tests found data consistent with ion momentum transfer and no measured vacuum force in tested configurations | gas, leakage current, ground and chamber are mandatory controls |
| anomalous thrust metrology | high-accuracy EMDrive testing traced thrust-like records to thermal/mechanical coupling and reached the photon-thrust scale | black-box mounting, reversals and thermal models are not optional |
| inertial locomotion | bird, insect and fish propulsion is inseparable from unsteady wakes and vortex momentum | evolved mechanisms illustrate port use, not reactionlessness |
| geometric swimming | Purcell's scallop theorem and Shapere--Wilczek shape-space geometry separate reciprocal motion from oriented cycles | two or more independent controls are the minimal useful test |
| Brownian motors | equilibrium detailed balance gives no directed work; stochastic pumps require nonequilibrium modulation and obey no-pumping constraints | Brownian motion cannot be the sole fuel |
| active matter | local energy influx and broken detailed balance support self-propulsion and measurable entropy production | persistent activity requires an energy and dissipation ledger |
| system identification | modern control-oriented identification combines data fit with conservation, passivity, symmetry and stability constraints | unexplained force must not enter as an unconstrained gain |
| substrate theories | viable preferred-frame and emergent-medium theories require actions, modes and couplings and are tightly constrained | “quantum background” is a research label until the full packet exists |

Primary and high-value review sources:

- Gralla, Harte and Wald, [*A Rigorous Derivation of Electromagnetic Self-force*](https://doi.org/10.1103/PhysRevD.80.024031).
- Canning, Melcher and Winet, [*Asymmetrical Capacitors for Propulsion*](https://ntrs.nasa.gov/citations/20040171929).
- Tajmar, Neunzig and Weikert, [*High-accuracy thrust measurements of the EMDrive and elimination of false-positive effects*](https://doi.org/10.1007/s12567-021-00385-1).
- Purcell, [*Life at low Reynolds number*](https://doi.org/10.1119/1.10903).
- Shapere and Wilczek, [*Self-Propulsion at Low Reynolds Number*](https://doi.org/10.1103/PhysRevLett.58.2051).
- Liu, Wang and Liu, [*Vortices and Forces in Biological Flight*](https://doi.org/10.1146/annurev-fluid-120821-032304).
- Lauder, [*Fish Locomotion: Recent Advances and New Directions*](https://doi.org/10.1146/annurev-marine-010814-015614).
- Hänggi and Marchesoni, [*Artificial Brownian motors*](https://doi.org/10.1103/RevModPhys.81.387).
- Rahav, Horowitz and Jarzynski, [*Directed Flow in Nonadiabatic Stochastic Pumps*](https://doi.org/10.1103/PhysRevLett.101.140602).
- Ciliberto, [*Experiments in Stochastic Thermodynamics*](https://doi.org/10.1103/PhysRevX.7.021051).
- Ramaswamy, [*The Mechanics and Statistics of Active Matter*](https://doi.org/10.1146/annurev-conmatphys-070909-104101).
- Chiuso and Pillonetto, [*System Identification: A Machine Learning Perspective*](https://doi.org/10.1146/annurev-control-053018-023744).
- Sivaranjani *et al.*, [*Control-oriented system identification: Classical, learning, and physics-informed approaches*](https://doi.org/10.1016/j.arcontrol.2026.101067).
- Exodus Propulsion Technologies, [company description](https://ept.space/about/), [mini-whitepaper](https://ept.space/assets/docs/EPT-Mini-White-Paper.pdf) and [asymmetric-electrostatic-pressure patent](https://patents.google.com/patent/US11511891B2/en).

## 10. Claimipedia grammar

In the corpus's intuitive language:

- the **carrier** is the complete matter, field, environment and proposed bath
  capable of holding momentum;
- the **selector** is the static geometry, boundary and controlled stroke;
- the **detector** is the joint record that distinguishes internal stress,
  external-port locomotion, emitted momentum and a residual;
- **kenotic symmetry breaking** means reversing each relevant symmetry while
  allowing every rival mechanism to retain the outcome it genuinely predicts.

The final symmetry table is therefore not “force/no force.” It is the response
under polarity, geometry, control-loop orientation, apparatus rotation,
frequency, pressure, grounding, chamber scale and free-flight removal of the
laboratory boundary.

## 11. Admission and stopping rule

**Admitted:** internal stress plus broken symmetry can produce locomotion when
a declared medium or boundary receives momentum; equilibrium Brownian motion
alone cannot; multi-control system identification can separate static,
memory, geometric and outgoing channels.

**Not admitted:** Exodus has demonstrated a new force, a vacuum medium,
reactionless propulsion, gravity cancellation or a corpus \(Spin(2,3)\)
carrier.

**Promote to M2:** an independently reproduced residual survives a complete
floating black-box test and declared conventional nuisance model.

**Promote to M3/M4:** one explicit substrate action predicts a held-out
frequency/orientation/noise/wake signature and independent teams reproduce
the joint signature.

**Close the extraordinary branch:** the residual follows ions, thermal stress,
ground, chamber, emitted radiation or another ordinary port, or disappears in
free flight.

The useful question survives every outcome:

> What is the device swimming in, what stroke does it execute, and where is
> its wake?

