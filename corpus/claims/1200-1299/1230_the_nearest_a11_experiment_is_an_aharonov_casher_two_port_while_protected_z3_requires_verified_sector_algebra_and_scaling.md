# The nearest A11 experiment is an Aharonov–Casher two-port, while protected (Z_3) requires verified sector algebra and scaling

**Date:** 20 October 2026  
**Branches:** blocker A11, superconducting response, Aharonov–Casher interference, topolectrical loops, parafermions and (Z_3) topological response  
**Claim status:** simulation-ready experiment design and exact control-algebra certificate; no device-specific effect size, calibrated noise budget or physical A11 result

## Result in one sentence

The nearest physically meaningful A11 experiment is a two-path superconducting fluxon or phase-slip interferometer measured as one fixed passive two-port at induced charges (n_g=0,1/3,2/3); it tests a real (U(1)) Aharonov–Casher holonomy and the complete response-analysis pipeline, but the experiment becomes a protected (Z_3) test only after three independently prepared eigenstates of a discrete clock operator are verified, sector mixing is nonlocal and decreases with separation, and ordinary (2pi), Landau–Zener and poisoning explanations are excluded.

## 1. The measurement object shared by both experiments

The two implementations should not be compared using unrelated observables. Both are assigned the same two microwave ports, calibration planes and frequency grid.

Measure the complex scattering matrix

\[
S_h(\omega)=
\begin{pmatrix}
S_{11}&S_{12}\\
S_{21}&S_{22}
\end{pmatrix}

\]

in prepared sector or control setting (h). For equal real reference impedances (Z_0), convert it to admittance using

\[
Y_h(\omega)=\frac1{Z_0}(I-S_h)(I+S_h)^{-1}.
\]

With unequal calibrated ports, replace (1/Z_0) by the corresponding square-root reference-admittance factors. The positive response is the dissipative Hermitian part

\[
\boxed{
C_h(\omega)=\frac{Y_h(\omega)+Y_h(\omega)^\dagger}{2}\succeq0.
}
\]

This positivity is the statement that a passive device cannot deliver net small-signal power. If the device is reciprocal and one common port-phase convention is used, (Y_h^T=Y_h) and (C_h) is a real symmetric (2\times2) matrix—the required (H_2(\mathbb R)_+) response.

The primary statistic remains the preregistered transverse first harmonic (A_\perp) from document 1222. Resonance shifts, linewidths, phase-slip amplitudes and Josephson periodicity are auxiliary mechanism checks, not replacements for the fixed two-port test.

## 2. Near experiment: superconducting Aharonov–Casher interferometer

### 2.1 Why this is the nearest physical platform

The Aharonov–Casher effect is the charge–flux counterpart of the familiar Aharonov–Bohm effect. Instead of an electron taking two paths around magnetic flux, a magnetic flux quantum—or fluxon—takes two paths around electric charge. The two path amplitudes interfere according to the enclosed charge.

This is already established in Josephson-junction circuits: Pop and collaborators measured coherent fluxon interference in a six-junction chain and compared it with full circuit diagonalization ([Phys. Rev. B 85, 094503](https://journals.aps.org/prb/abstract/10.1103/PhysRevB.85.094503)). It is therefore a substantially nearer platform than a material parafermion junction.

### 2.2 Exact control knob

Let the gate induce offset charge

\[
n_g=\frac{C_g(V_g-V_{\rm offset})}{2e}pmod1.
\]

The Aharonov–Casher loop factor is

\[
W_{\rm AC}=e^{i2\pi n_g}.
\]

Prepare

\[
n_g(h)=\frac h3,
\qquad
V_g(h)=V_{\rm offset}+\frac{2e}{C_g}\frac h3,
\qquad h=0,1,2.
\]

Then (W_{\rm AC}=1,\omega,\omega^2), where (omega=e^{2\pi i/3}).

For two coherent paths, the minimal mechanism model is

\[
t_{\rm slip}(n_g)=t_1+t_2e^{i2\pi n_g}.
\]

Neither (t_1) nor (t_2) is known for the unspecified device. They must be obtained from a circuit Hamiltonian and independent calibration; no effect amplitude is assigned here.

### 2.3 Three preparations

Each preparation is a stabilized gate-charge operating point, not a topological state:

1. lock (n_g=0\pmod1);
2. lock (n_g=1/3\pmod1);
3. lock (n_g=2/3\pmod1).

Randomize the order, repeat each setting at least three times, and measure the offset-charge monitor immediately before and after every response sweep.

### 2.4 Observables

At each (h) and (omega), retain:

- the complete (S_h), (Y_h) and (C_h) matrices;
- eigenvalues and determinant of (C_h);
- the rank of the family ({C_h});
- (A_\perp(\omega)) relative to a plane fixed before revealing the sector labels;
- resonance frequency and linewidth;
- the independently fitted magnitude of (t_{\rm slip}(n_g));
- charge offset, temperature, drive power and magnetic flux.

The primary A11 pass condition is a replicated, positive, sector-correlated third response direction with common calibration—not merely a visible charge-periodic resonance.

### 2.5 Nuisance controls

The minimum controls are:

1. **one-path-off:** disable one coherent fluxon path; the Aharonov–Casher interference term must disappear;
2. **dummy gate:** reproduce electrostatic loading with a gate that does not change enclosed charge;
3. **reverse sweep:** compare (0\to1/3\to2/3) with the reverse order;
4. **sham switch:** exercise control electronics without changing (n_g);
5. **charge record:** reject runs with offset-charge jumps or parity changes;
6. **common ports:** require identical calibration hashes and reference planes;
7. **linear regime:** repeat at lower microwave power;
8. **thermal and flux lock:** hold temperature and ordinary magnetic flux fixed;
9. **reciprocity:** compare (S_{12}) and (S_{21});
10. **contact prescription:** require the sector contrast to survive any admissible common background subtraction.

The one-path-off control is especially important: it separates interference around a loop from local gate-dependent capacitance.

### 2.6 Bill of materials

- a superconducting loop or junction chain with two coherent fluxon/phase-slip paths;
- a gated island with independently calibrated (C_g);
- a charge-stability monitor or electrometer;
- two weak microwave coupling ports or readout resonators;
- a tunable element—or a matched control device—that disables one path;
- independent filtered gate and magnetic-flux lines;
- vector network analyser or coherent two-channel lock-in;
- cryogenic attenuation, isolation, thermometry and magnetic shielding.

### 2.7 Missing inputs before power analysis

No numerical effect size is responsible without:

- (t_1,t_2) and their dynamical relative phase;
- (C_g) and the offset-charge noise spectrum;
- all junction capacitances and Josephson or phase-slip energies;
- port coupling matrices and internal/external linewidths;
- temperature, coherence time and quasiparticle-poisoning rate;
- a predicted (Y_h(\omega)) with parameter uncertainty.

These values determine whether the experiment needs minutes, days or an impossible integration time. Inventing a percentage before specifying them would defeat the workbench's admission rules.

## 3. Topolectrical loop as the room-temperature alternative

A three-edge microwave or topolectrical ring can implement directed link phases

\[
W=e^{i(\phi_1+\phi_2+\phi_3)}.
\]

Electrical circuit Laplacians and their impedance eigenmodes are already an experimentally mature way to emulate topological band structures ([Lee et al., 2018](https://www.nature.com/articles/s42005-018-0035-2)). Its decisive controls are particularly transparent:

- redistribute \((\phi_1,\phi_2,\phi_3)\) while holding their sum fixed;
- cut one edge to remove the loop;
- reverse the total phase;
- audit every active or nonreciprocal component.

This is the cheapest loop-holonomy emulator, but active phase shifters or negative-impedance elements can invalidate the passive positivity interpretation. A passive dilation must include every hidden port in the power ledger before a reduced (2\times2) response is admitted.

The superconducting Aharonov–Casher device is preferred for the nearest *physical* holonomy experiment; the topolectrical ring is preferred for debugging acquisition and loop controls.

## 4. Protected experiment: (Z_3) parafermion sector response

### 4.1 Candidate architecture

The conventional blueprint uses counter-propagating fractional Hall edges with alternating superconducting and charge-preserving gapped regions. Domain walls can support parafermionic zero modes. The general fractional-Hall/superconductor mechanism was developed by Lindner, Berg, Refael and Stern ([Phys. Rev. X 2, 041002](https://journals.aps.org/prx/abstract/10.1103/PhysRevX.2.041002)); a concrete (\nu=2/3) quantum-dot-array route to (Z_3) degeneracy was proposed by Alavirad and collaborators ([Phys. Rev. Lett. 119, 217701](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.119.217701)).

This remains a candidate material platform, not an established device assumed by the protocol. Recent calculations also show that ordinary backscattering and Cooper-pair processes can alter the ideal fractional Josephson periodicity, so a single periodicity trace is not decisive ([Cao, Kou and Fradkin, 2024](https://harvest.aps.org/v2/journals/articles/10.1103/PhysRevB.109.L161106/fulltext)).

### 4.2 Exact sector algebra required for admission

The admitted low-energy space must contain a measured clock operator (W) and increment operator (X):

\[
W|m\rangle=\omega^m|m\rangle,
\qquad
X|m\rangle=|m+1\bmod3\rangle,
\qquad
XW=\omega^{-1}WX.
\]

The three preparations are not three gate voltages. They are:

1. initialize or project (W=1);
2. apply the validated nonlocal (X) operation once and verify (W=\omega);
3. apply (X) twice and verify (W=\omega^2).

In a material device, the physical implementation of (X)—for example an architecture-specific fractional-quasiparticle transfer—must be derived. Writing (X) on paper does not prepare it.

### 4.3 Conditional minimal branch model

For an ideal (Z_3) Josephson branch, use the explicitly conditional low-energy model

\[
E_m(\varphi)=-E_P\cos\left(\frac{\varphi+2\pi m}{3}\right).
\]

It obeys

\[
E_m(\varphi+2\pi)=E_{m+1}(\varphi),
\qquad
E_m(\varphi+6\pi)=E_m(\varphi).
\]

Thus a (2\pi) phase advance permutes sectors and a fixed sector returns after (6\pi). The current scale is proportional to the unknown (E_P):

\[
I_m(\varphi)=\frac{2eE_P}{3\hbar}
\sin\left(\frac{\varphi+2\pi m}{3}\right).
\]

The equation defines what to fit; it does not supply (E_P). Ordinary Josephson terms, finite-size splitting and sector-changing processes must be included in the actual device Hamiltonian.

### 4.4 Protected-sector measurement sequence

For each verified (m=0,1,2):

1. prepare and verify the (W) eigenvalue;
2. freeze the two microwave probes and calibration;
3. sweep a preregistered phase interval while measuring (S_m(\omega,\varphi));
4. construct (C_m=(Y_m+Y_m^\dagger)/2) and require positivity;
5. test the sector-correlated third direction using the same (A_\perp) analysis;
6. advance \(\varphi\) by (2\pi) and test the predicted branch permutation;
7. remeasure (W) and record leakage;
8. repeat for several domain-wall separations or protection settings.

The measurement time must be long enough to resolve the microwave response but short compared with the measured poisoning time. That inequality cannot be evaluated until the linewidth and poisoning rate are supplied.

### 4.5 Protection and false-positive controls

A genuine result requires all of the following:

- (W^3=I) on the measured low-energy space;
- all three eigenvalues prepared and verified;
- local perturbations away from the domain walls do not efficiently mix sectors;
- mixing or splitting decreases systematically with domain-wall separation;
- a (2\pi) phase advance permutes branches and the fixed branch returns after (6\pi);
- an architecture with one required gapped domain removed loses the pattern;
- quasiparticle poisoning is measured rather than absorbed into linewidth;
- ordinary (2\pi) Josephson terms are fitted simultaneously;
- Landau–Zener sweeps and nonequilibrium dynamics cannot reproduce the result;
- the same two-port response remains positive under one common calibration.

Fractional Josephson features can arise in conventional non-topological junction dynamics, which is why periodicity alone is insufficient ([Sau, Berg and Halperin, 2012](https://arxiv.org/abs/1206.4596)).

### 4.6 Bill of materials

- a validated (\nu=2/3) fractional Hall or fractional Chern-insulator channel;
- superconducting contacts compatible with its fractional edge;
- gate-defined charge-preserving gapped or quantum-dot-array segments;
- at least two separated domain walls;
- a superconducting phase-bias loop;
- an architecture-specific quasiparticle injection or nonlocal string-control structure;
- fractional-charge or Wilson-sector verification;
- two weak microwave probes with common calibration;
- cryogenic filtering, thermometry and poisoning monitoring.

### 4.7 Missing inputs

Before predicting (A_\perp), linewidths or run count, the programme needs:

- the microscopic Hamiltonian for the chosen material stack;
- the topological gap and all competing gaps;
- (E_P), ordinary (E_J) and their parameter dependence;
- localization length and finite-size splitting;
- sector-preparation and verification fidelities;
- poisoning, relaxation and dephasing rates;
- physical port-coupling operators;
- predicted (C_m(\omega)), not merely energy levels;
- scaling with local perturbations and wall separation.

## 5. A presently real (Z_3) benchmark that is not yet the material experiment

In 2025, a trapped-ion processor prepared a (Z_3) toric-code ground state on up to 24 encoded qutrits, manipulated parafermion-related defects and demonstrated fusion operations ([Iqbal et al., 2025](https://www.nature.com/articles/s41467-025-61391-z)).

This is important for the programme because it makes the discrete algebra, Wilson strings and three-sector preparation experimentally testable now. It is not yet the same claim as a passively protected material superselection sector, and it does not natively supply the microwave admittance experiment above.

The useful division of labour is:

- use the qutrit processor to debug (W,X), sector verification and local-indistinguishability analyses;
- use the Aharonov–Casher circuit to debug fixed-port response and loop controls;
- require the parafermion material platform to combine both before claiming protected (Z_3) response.

## 6. The exact point where continuous (U(1)) emulation stops

The verifier establishes that the near settings are exact cube roots:

\[
1+\omega+\omega^2=0,
\qquad
\omega^3=1.
\]

It also exhibits an ordinary intermediate control (e^{i2\pi/5}). That value is physically accessible in the near circuit. Therefore its configuration space remains (U(1)), regardless of analysing only three points.

The emulation stops and the protected claim begins only when the experiment demonstrates:

\[
\boxed{
\begin{array}{c}
W^3=I\text{ on one isolated low-energy space},\\
\operatorname{Spec}W=\{1,\omega,\omega^2\},\\
\text{sector change requires the declared nonlocal }X,\\
\text{local mixing falls with separation or size},\\
\text{and the same positive response distinguishes the sectors.}
\end{array}}
\]

Three points on a continuous dial fail the third and fourth lines. A digitally prepared code may satisfy the algebra but not passive material protection. A candidate material parafermion device must satisfy all five.

## 7. Decision table

| Observation | Interpretation |
|---|---|
| Three gate settings give different spectra | ordinary control dependence |
| Dependence vanishes when one path is disabled | Aharonov–Casher loop interference supported |
| Response depends only on total loop phase, not phase distribution | loop holonomy supported |
| Intermediate phases remain accessible | continuous (U(1)), not protected (Z_3) |
| Three prepared (W) eigenvalues but strong local mixing | (Z_3) encoding without demonstrated protection |
| Apparent (6\pi) trace without sector verification | ambiguous fractional periodicity |
| Sector permutation, nonlocal increment and separation scaling all pass | protected-(Z_3) interpretation becomes admissible |
| Those pass plus positive replicated (A_\perp\neq0) | operational A11 advance in a genuine discrete sector |

Even the final row establishes a new protected response structure, not by itself a fundamental (Spin(2,3)) symmetry. That attribution still requires a microscopic action predicting the coupling and effect rather than fitting it afterward.

## Certificate and evidence

- [Machine-readable protocol](../../../evidence/data/a11-nearest-loop-versus-protected-z3-protocol.json) records both protocols, bills of materials, nuisance controls and missing inputs.
- [Executable verifier](../../../verification/verify/verify_a11_nearest_loop_versus_protected_z3_protocol.mjs) verifies the three root settings, continuous-(U(1)) counterexample, loop-phase redistribution invariance, conditional branch permutation, (6\pi) return and protocol completeness.
- `1226_a_passive_two_port_is_the_fastest_z3_control_test_but_only_a_parafermion_or_discrete_gauge_platform_would_supply_genuine_z3_sectors.md` supplies the platform ranking.
- `1222_a_preregistered_z3_holonomy_response_test_can_separate_a_third_physical_direction_from_ambient_spin23_geometry.md` supplies the parent A11 statistic and decision rule.
