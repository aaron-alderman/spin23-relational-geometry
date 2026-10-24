# Platform triage for the quarter-turn contraction experiment

**Date:** 24 October 2026  
**Status:** primary-source platform comparison; no platform admitted  
**Parent:** [Robustness window](admissibility_27_robustness_window_for_projective_return_coherent_holonomy_and_selection.md)  
**Evidence:** [Platform triage ledger](../../../evidence/data/admissibility-quarter-turn-platform-triage-v1.json)  
**Verifier:** [Published-number normalization certificate](../../../verification/admissibility/verify_quarter_turn_platform_triage.mjs)

## Result

No surveyed experiment can yet be certified against the AZ-027 condition

\[
\frac{\max(\delta,\gamma)}{\Delta}\lesssim2.406\times10^{-4},
\]

because none reports both residual splitting \(\delta/\Delta\) and differential in-subspace loss \(\gamma/\Delta\) in the form the test requires.

This is not the same as saying that no platform can pass. The survey instead identifies two complementary leaders:

\[
\boxed{
\begin{array}{ll}
\text{integrated silicon-nitride photonics:}
&\text{best structural carrier},\\[2mm]
{}^{87}\mathrm{Rb}\text{ Yang-monopole control:}
&\text{best measurement protocol}.
\end{array}
}
\]

The shortest experimental route is to combine the photonic protected-doublet architecture with the atomic experiment's forward/reverse process tomography and then add the independent selector \(Y\).

## Admission fields

A platform is numerically admissible only if one publication or a declared collection of calibrated measurements supplies:

1. the active singlet–doublet gap \(\Delta\);
2. residual splitting inside the doublet, \(\delta\);
3. differential amplitude-loss or decoherence rate, \(\gamma\);
4. loop rate \(\omega\) or propagation-length equivalent;
5. projector-closure tomography;
6. coherent process tomography in both loop directions;
7. multi-initial-condition return data with and without \(Y\).

Aggregate gate fidelity, insertion loss, coherence time or linewidth cannot substitute automatically for these typed quantities.

## Candidate A — integrated silicon-nitride holonomy

Chen et al. realized chiral-symmetry-protected \(SO(m)\) holonomy up to \(m=6\) in multilayer silicon-nitride waveguides. The \(SO(2)\) device uses four waveguides: one central bright channel and three surrounding channels supporting a two-dimensional degenerate dark subspace. Adiabatic cyclic modulation of the coupling vector produces

\[
U_{\rm dark}=e^{i\theta\sigma_y},
\]

with the sign of \(\theta\) controlled by traversal direction. This is the closest published architecture to the AZ-026 coherent doublet.

Reported performance includes:

- \(>100\,\mathrm{nm}\) operating bandwidth for representative \(SO(2)\) devices;
- matrix fidelities ranging from \(0.991\) to \(0.999\), depending on device and wavelength;
- less than \(2\,\mathrm{dB}\) on-chip insertion loss for the reported \(SO(2)\) devices;
- approximately \(95\%\) simulated output power remaining in the dark subspace;
- explicit acknowledgement that fabrication effects can break the protected degeneracy.

Why it does not yet pass:

- the residual dark-doublet splitting is not reported as \(\delta/\Delta\);
- total insertion loss is not differential loss within the dark doublet;
- matrix fidelity mixes leakage, phase, fabrication and measurement errors;
- the published devices implement fixed spatial transfer, not an iterated \(P\mapsto\mathcal R(P;Y)\) experiment;
- the limiting \(\theta=\pi/2\) path is approached through a separate braiding construction rather than the generic fixed-coupling \(SO(2)\) loop.

Verdict: **best structural candidate; numerical admission open**.

Primary source: Y. Chen et al., [*High-dimensional non-Abelian holonomy in integrated photonics*](https://pmc.ncbi.nlm.nih.gov/articles/PMC12006547/) (2025).

## Candidate B — atomic Yang-monopole holonomy

Sugawa et al. used four hyperfine states of a \(^{87}\mathrm{Rb}\) Bose–Einstein condensate to create two doubly degenerate manifolds separated by a controlled gap. They performed closed-loop adiabatic transport, reversed the loop, reconstructed the process matrix from four independent input states and measured the Wilson loop.

Reported operating values include:

\[
\Delta E/h=2.0\,\mathrm{kHz},
\qquad
T=2\,\mathrm{ms},
\qquad
\frac{\Delta E\,T}{\hbar}=8\pi.
\]

The forward and reverse process fidelities were \(0.98\) and \(0.96\). The bias field was \(19.8\,\mathrm{G}\) with quoted long-term stability of \(2.5\) ppm. The experiment explicitly showed the direction-dependent coherent return required by the AZ-027 reversal test.

Why it does not yet pass:

- it is a four-level, two-doublet Hamiltonian rather than the minimal three-mode singlet–doublet model;
- field stability is not itself a measurement of residual doublet splitting;
- process fidelity does not isolate \(\delta/\Delta\) or differential decoherence;
- it did not add an independent selector \(Y\) or measure return-map contraction.

Verdict: **best protocol and tomography precedent; numerical admission open**.

Primary source: S. Sugawa et al., [*Wilson loop and Wilczek–Zee phase from a non-Abelian gauge field*](https://arxiv.org/abs/1910.13991) (2021).

## Comparator C — programmable photonic synthetic frequency dimensions

Cheng et al. realized an \(SU(2)\) lattice gauge field in a polarization-multiplexed fiber ring. The experiment provides programmable polarization rotations, phase-controlled electro-optic modulation and six-input Stokes reconstruction.

Published parameters include:

\[
\Omega_R=2\pi\times4\,\mathrm{MHz},
\qquad
g=0.06\Omega_R\ \text{or}\ 0.14\Omega_R,
\qquad
T_R=250\,\mathrm{ns}.
\]

The simulations use \(1.74\,\mathrm{dB}\) round-trip power loss, while the experiment employs an erbium-doped fiber amplifier to compensate part of the loss. This platform is highly programmable and already supports the necessary polarization tomography.

Why it is a comparator rather than a direct candidate:

- its demonstrated observable is a lattice-band/eigenstate response, not adiabatic transport of a degenerate dark doublet;
- round-trip loss and gain are not the differential doublet loss \(\gamma\);
- no projector-return or contractive selector iteration was performed.

Verdict: **strong control/readout toolbox; requires architectural redesign**.

Primary source: D. Cheng et al., [*Non-Abelian lattice gauge fields in the photonic synthetic frequency dimension*](https://arxiv.org/abs/2406.00321) (published 2025).

## Comparator D — superconducting transmon qutrit

Danilin, Vepsäläinen and Paraoanu demonstrated non-Abelian nonadiabatic holonomic control in a three-level transmon. Simultaneous drives couple the computational \((|0\rangle,|2\rangle)\) subspace through \(|1\rangle\), and a pulse-area condition produces cyclic parallel transport.

Reported values include:

\[
t_d=6.5\,\mathrm{ns},
\qquad
T_{\rm gate}=4t_d\approx26\,\mathrm{ns},
\qquad
T_1\approx430\,\mathrm{ns},
\qquad
T_2\approx250\,\mathrm{ns}.
\]

Hence

\[
\frac{T_{\rm gate}}{T_1}\approx0.0605,
\qquad
\frac{T_{\rm gate}}{T_2}\approx0.104.
\]

This is important because it demonstrates how nonadiabatic holonomy can evade the slow-loop side of the AZ-027 tradeoff.

Why it is not the same test:

- the computational subspace is not an instantaneous degenerate eigenspace transported by a moving spectral projector;
- the operation is pulse-area controlled rather than the Grassmannian latitude loop of AZ-026;
- it therefore tests a different geometric mechanism and cannot be used as evidence that the AZ-027 window has been met.

Verdict: **credible fast-holonomy fallback; not a realization of the current projector experiment**.

Primary source: S. Danilin, A. Vepsäläinen and G. S. Paraoanu, [*Experimental state control by fast non-Abelian holonomic gates with a superconducting qutrit*](https://arxiv.org/abs/1804.01759) (2018).

## Platform matrix

| Platform | Degenerate transported subspace | Reversal | Process tomography | Published \(\delta/\Delta\) | Published differential \(\gamma/\Delta\) | \(Y\)-contraction | Status |
|---|---:|---:|---:|---:|---:|---:|---|
| integrated SiN waveguides | yes | direction controls sign | transfer matrix | no | no | no | closest carrier |
| \(^{87}\mathrm{Rb}\) Yang monopole | yes | yes | yes | no | no | no | closest protocol |
| fiber synthetic-frequency lattice | not in required form | programmable links | Stokes tomography | no | no | no | redesign |
| transmon qutrit | no, nonadiabatic computational subspace | gate-axis control | state/process methods | not applicable | not applicable | no | alternate mechanism |

No row is marked “passes.”

## Recommended build

The most direct build is a four-waveguide \(SO(2)\) chip rather than insisting on literal three-mode hardware. The extra bright channel realizes the same rank-two dark projector more naturally and gives chiral symmetry to protect degeneracy.

The experimental sequence should be:

1. fabricate clockwise and counterclockwise copies of the same coupling loop;
2. characterize the bright–dark gap \(\Delta(z)\) spectroscopically or through coupled-mode inversion;
3. measure the two dark propagation constants separately to bound \(\delta/\Delta\);
4. reconstruct the full complex \(2\times2\) transfer matrix, not intensities alone;
5. polar-decompose it to obtain rotation and singular-value imbalance;
6. introduce a calibrated asymmetric segment supplying \(Y\);
7. cascade repeated prepare–transfer–tomography stages for multiple input projectors;
8. fit the slope and test \(\widehat m+z\,\mathrm{SE}<1\).

The decisive new measurement is not a higher matrix fidelity. It is the typed tuple

\[
\boxed{
\left(
\frac{\delta}{\Delta},
\frac{\gamma}{\Delta},
d_P,
\theta_H^\pm,
\nu,
\widehat m
\right).
}
\]

## Frontier

Established:

- all control and readout ingredients exist separately in published experiments;
- integrated photonics already realizes the required protected \(SO(2)\) dark-subspace transport;
- atomic work already demonstrates loop reversal and process tomography;
- fast superconducting holonomy supplies a fallback if the adiabatic window proves infeasible.

Open:

- no publication reports the full typed tuple;
- no existing fidelity number can be safely converted into the AZ-027 splitting/loss bound;
- no platform has implemented an independent \(Y\) followed by repeated return-map tomography;
- the \(2.406\times10^{-4}\) reference target may be unnecessarily strict if an echo cancels static splitting.

The next gate is an explicit integrated-photonic chip specification and simulation: coupling profiles, device length, dark-doublet perturbation, loss matrix, reversal pair and selector segment.
