# Spectral boundary dynamics: free, Bloch, Efimov and Casimir sectors

**Date:** 24 October 2026  
**Status:** typed synthesis with standard spectral identities; no new Spin(2,3) electron-binding mechanism  
**Targets:** [FPT-003](../frontier-physics-targets/frontier_physics_target_assessments_v1.md#fpt-003), [FPT-007](../frontier-physics-targets/frontier_physics_target_assessments_v1.md#fpt-007), [FPT-010](../frontier-physics-targets/frontier_physics_target_assessments_v1.md#fpt-010), [FPT-017](../frontier-physics-targets/frontier_physics_target_assessments_v1.md#fpt-017)  
**Parents:** [Casimir as first generative probe](admissibility_02_casimir_as_first_generative_probe.md), [dynamic response, geometry, detection and metastability](admissibility_06_dynamic_response_geometry_detection_metastability.md), [the Spin(2,3) pole synthesis](../../claims/0000-0099/40_grand_synthesis_spin23_pole.md)  
**Evidence:** [Machine-readable boundary-dynamics register](../../../evidence/data/admissibility-spectral-boundary-dynamics-v1.json)  
**Verifier:** [Boundary-dynamics type-firewall certificate](../../../verification/admissibility/verify_spectral_boundary_dynamics.mjs)

## Result

The corpus's bound/free intuition becomes dynamically useful after replacing a binary division by a spectral stratification:

\[
\boxed{
\text{free continuum}
\longleftrightarrow
\text{Bloch or interface band}
\longleftrightarrow
\text{resonance/threshold}
\longleftrightarrow
\text{discrete bound sector}.}
\]

The boundary is not an empty separator.  It may support states that are localized normal to an interface but extended tangentially, threshold resonances with long dwell times, or a tower of bound states accumulating at a continuum edge.  Static spectral data specify the admissible places; dynamics transports amplitude, energy and phase within and between them.

This packet also records a controlled semantic observation.  The Greek words used in later discussion of the biblical Fall can describe boundary crossing, deviation, descent and binding as a sequence of type shapes.  That correspondence is heuristic and contributes no evidence for electron binding, Efimov physics, Casimir forces or Spin(2,3).

## 1. Type firewall: stationary is not static

A bound energy eigenstate obeys

\[
H\psi_n=E_n\psi_n,
\qquad
\Psi_n(t)=e^{-iE_nt/\hbar}\psi_n.
\]

Its probability density is stationary, but its phase evolves.  Superpositions have observable beat frequencies \((E_m-E_n)/\hbar\).  A bound composite can also translate through its centre-of-mass coordinate, and an interface state can transport along a boundary while remaining localized across it.  Therefore `bound`, `stationary`, `equilibrium` and `static` are distinct predicates.

The corresponding no-go is equally important.  A free scattering state does not become permanently bound under an autonomous conservative two-body Hamiltonian unless another channel carries away the excess energy.  Radiative capture, phonon emission, collision with a third body, driving or an environment supplies the required energy and phase ledger.

## 2. The stratified spectrum

| Stratum | Spectral signature | Geometry | Characteristic dynamics |
|---|---|---|---|
| free continuum | branch cut or continuously labelled generalized eigenstates | noncompact propagation | scattering and translation |
| Bloch band | \(E_n(k)\) over a Brillouin zone | periodic quotient | group velocity and interband transitions |
| interface band | discrete normal profile and continuous/Bloch tangential label | bound transversely, extended tangentially | edge or surface transport |
| resonance | pole off the physical real sheet with width \(\Gamma>0\) | temporary capture | finite dwell and decay |
| threshold | pole/zero/branch-point collision at \(E_{\rm th}\) | boundary of open and closed channels | large scattering length and delay |
| Efimov tower | log-periodic bound poles with \(E_n\to0^-\) | bound-side accumulation at a three-body threshold | geometric hierarchy of sizes and times |
| discrete bound state | real pole below the continuum and an \(L^2\) eigenvector | localized relational sector | phase evolution and bound--bound transitions |

For a periodic interface a minimal hybrid state has

\[
\psi_{n k_\parallel}(r_\parallel,x_\perp)
=e^{ik_\parallel\cdot r_\parallel}
u_{n k_\parallel}(r_\parallel)f_n(x_\perp),
\]

with \(f_n\) normalizable in the transverse direction.  This is the precise content of a “Bloch-like boundary”: it is not fully free and not point-localized.

## 3. Spectral shift joins bound and free

For a sufficiently controlled comparison \((H,H_0)\), the boundary-induced change in density of states has the schematic one-channel form

\[
\Delta\rho(E)
=\sum_b\delta(E-E_b)
+{1\over\pi}{d\delta(E)\over dE}.
\]

The discrete poles and continuum scattering phase are two parts of one redistributed spectrum.  In its simplest short-range form, Levinson's theorem gives

\[
\delta(0)-\delta(\infty)=N_b\pi,
\]

with dimension-, angular-momentum- and half-bound-state corrections in the cases where they apply.  The continuum therefore retains phase information about states that have crossed into the bound sector.  This is a conventional and testable meaning of a boundary `scar`; it is not evidence for the corpus's quotient-scar carrier without an explicit dictionary.

## 4. Phase becomes time

The Wigner--Smith operator

\[
Q(E)=-i\hbar S^\dagger(E){dS(E)\over dE}
\]

turns spectral phase variation into proper scattering delays for unitary multichannel scattering.  In a single elastic channel, \(\tau_W=2\hbar\,d\delta/dE\) under the standard phase convention.  Resonances give large finite delays; a threshold state can produce anomalous or divergent scale dependence; a true bound pole is no longer an outgoing scattering channel.

The retarded resolvent supplies the common analytic language:

\[
G^R(\omega)=(\omega-H+i0^+)^{-1}.
\]

Bound states are physical-sheet real poles below threshold, resonances are continued-sheet complex poles, continua generate cuts, and Bloch bands add quasi-momentum-labelled pole or cut families.  Dynamics can therefore be tracked as pole motion, residue transfer, linewidth change and motion relative to a branch point.

## 5. Efimov belongs on the bound side of the boundary

For three identical bosons in the standard unitary limit,

\[
s_0\simeq1.00624,
\qquad
\lambda_0=e^{\pi/s_0}\simeq22.7,
\qquad
{E_{n+1}\over E_n}=e^{-2\pi/s_0}\simeq{1\over515}.
\]

Efimov levels are not generic “boundary states.”  They are a discrete-scale-invariant tower on the bound side whose shallow members accumulate at the three-body threshold.  Their characteristic times \(\tau_n\sim\hbar/|E_n|\) inherit the inverse geometric ratio, so the static energy tower is already a hierarchy of dynamical times.

The relevant conformal \(SO(2,1)\)-type Casimir organizes threshold representations, but it does not derive the Faddeev kernel or the universal exponent.  The corpus's existing gate remains: without the correct three-body conditions and \(s_0\), a result is only conformal, scale-organized or Efimov-like.

## 6. Casimir reads the reorganized spectrum

The two Casimir meanings remain typed separately.

1. A Lie or conformal Casimir labels a representation or invariant differential operator.  It is conserved under the symmetry and therefore classifies a sector; by itself it cannot transfer a state between inequivalent sectors.
2. The Casimir effect is a regularized difference of boundary-dependent electromagnetic free energies.  In scattering form it is built from material reflection operators and translation matrices, schematically

\[
E_{\rm Cas}\sim{\hbar\over2\pi}
\int_0^\infty d\xi\,
\log\det(1-\mathcal R_1\mathcal U_{12}\mathcal R_2\mathcal U_{21}).
\]

Surface modes, evanescent waves, resonances, material dispersion and propagating modes all contribute to the boundary spectral rearrangement.  Casimir is therefore an integrated boundary-spectrum readout, whereas Wigner--Smith delay resolves the frequency-dependent dwelling and Efimov physics resolves a specific recurrent threshold tower.  Their shared language is spectral admissibility, not a shared microscopic mechanism.

## 7. A minimal executable dynamics

The smallest model that realizes the proposed stratification is a three-sector Hamiltonian

\[
H=
\begin{pmatrix}
H_F&V_{FB}&0\\
V_{BF}&H_B&V_{BL}\\
0&V_{LB}&H_L
\end{pmatrix},
\]

where \(H_F\) has a continuum, \(H_B\) is a periodic boundary band and \(H_L\) contains a localized level.  Eliminating the continuum gives

\[
H_{B,\mathrm{eff}}(E)
=H_B+V_{BF}(E-H_F+i0)^{-1}V_{FB}
=H_B+\Delta(E)-{i\over2}\Gamma(E).
\]

Below threshold \(\Gamma=0\) permits a stable pole; inside the continuum \(\Gamma>0\) gives a resonance.  Adding an explicitly declared radiation or bath channel permits permanent capture and a complete energy ledger.  A periodic \(H_B\) makes the intermediate sector Bloch-like without equating its Berry curvature with the localizing interaction.

This model also exposes the Casimir-invariant limitation.  If \([C,H]=0\), then \(d\langle C\rangle/dt=0\).  A subsystem can change its apparent Casimir sector only by exchanging invariant content with a boundary, field or environment while an enlarged total invariant is retained, or because the symmetry/domain itself changes.

## 8. Placement relative to Spin(2,3)

The corpus contains three exact neighbours:

- the isolated electron pole is a positive rank-one boundary ray of the two-face Jordan response;
- a sign-changing real Dirac mass conditionally binds a protected wall zero mode;
- global AdS\(_4\) has curvature-and-boundary-induced discrete spacing under reflecting boundary conditions.

They must not be collapsed.  A one-electron pole is not an atomically bound electron; a defect zero mode requires a kinetic operator, gap and mass profile; and a global AdS curvature-box spacing is not an electron mass or a Coulomb binding energy.  Local curvature, global topology, boundary conditions and attractive dynamics are separately necessary or sufficient in different models.

Spin(2,3) can presently organize the total causal/symplectic geometry and contains relevant conformal substructures.  It does not yet supply the microscopic \(H_F,H_B,H_L,V\) that reproduces the hydrogen spectrum, radiative capture and flat-space limit.  The new packet therefore advances a dynamics grammar and an executable bridge target, not physical admission.

[AZ-127](admissibility_127_transition_operators_selection_rules_and_lifetime_frontier.md)
now sharpens that missing datum: a pole or lower state is a possible
destination, while capture requires a typed operator, nonzero matrix element,
phase space and detector-retained event. AZ-120–AZ-122 instantiate that chain
for a scalar phonon surrogate. They still do not supply electromagnetic
hydrogen capture or a Spin(2,3) origin for its operator.

## 9. Greek geometric signpost and authority boundary

The useful lexical sequence is

\[
\textit{eleutheria}
\to
\textit{metaxy}
\to
\textit{horion/peras}
\to
\textit{parabasis/paraptoma}
\to
\textit{desmos},
\]

or freedom, intermediate state, boundary/limit, crossing/deviation, and binding.  Greek *ptōsis* (πτῶσις) also developed the grammatical sense “case,” a declined form relative to a reference form; *paraptōma* (παράπτωμα) conventionally means trespass or false step.  Neither word means curvature, spectral capture or a bound electron.

Accordingly the strongest admissible theological comparison is formal:

> a transition can cross an admissibility boundary and enter a more restricted relational sector while leaving a detectable phase or history record.

The comparison generates questions about transition, memory and reopening.  It is not a derivation, concordance proof or claim that biblical authors encoded modern spectral physics.

## 10. Next finite gate

Implement the three-sector model with a one-dimensional continuum, a finite periodic boundary band, one local level and one radiative sink.  Sweep one control through the continuum edge and record, on the same run family:

1. physical- and continued-sheet pole locations;
2. boundary-band dispersion and normal localization length;
3. scattering phase and Wigner--Smith delay;
4. bound-state count and the applicable Levinson ledger;
5. emitted energy during capture;
6. a regularized spectral-energy difference under a second boundary;
7. the failure or appearance of log-periodicity under an independently implemented three-body kernel.

Success would establish one executable spectral atlas in which free, intermediate, threshold and bound descriptions agree.  It would not establish a fundamental Spin(2,3) identification unless the Hamiltonian and couplings are independently derived from the corpus carrier.

## Primary literature controls

- Braaten and Hammer, [*Universality in Few-body Systems with Large Scattering Length*](https://arxiv.org/abs/cond-mat/0410417).
- Rahi, Emig, Graham, Jaffe and Kardar, [*Scattering Theory Approach to Electrodynamic Casimir Forces*](https://arxiv.org/abs/0908.2649).
- Krivoruchenko and Tyrin, [generalized Levinson theorem and its standard bound-state/phase-shift starting point](https://arxiv.org/abs/2006.09366).
- Xiong et al., [experimental Wigner--Smith eigenstates in a strongly mode-coupled fibre](https://doi.org/10.1103/PhysRevLett.117.053901).

