# A unitary acoustic rail replaces the hand-shaped capture bath

**Date:** 25 October 2026

**Status:** source-shaped phonon channel closed; source-native transition matrix element and continuum limit open

**Topics:** OT-036

**Parent:** [AZ-055 finite-band Levinson ledger](admissibility_55_finite_band_levinson_and_adaptive_pole_collisions.md)

**Evidence:** [acoustic-phonon capture audit](../../../evidence/data/ssh-acoustic-phonon-capture-gate-v1.json)

**Generator:** [unitary rail evolution](../../../scripts/run-ssh-acoustic-phonon-capture-gate.mjs)

**Verifier:** [norm, energy, reversal and detailed-balance certificate](../../../verification/admissibility/verify_ssh_acoustic_phonon_capture_gate.mjs)

## What changed

AZ-052 showed that a finite unitary bath can move an excited matter state into a lower matter state plus an emitted quantum. Its frequencies and Gaussian-like coupling envelope were chosen directly. This gate replaces that envelope by the acoustic modes of a harmonic rail and replaces arbitrary mode weights by a local bond-strain interaction.

For rail mass (M), spring constant (K) and (N) sites,

\[
H_{\rm ph}=\sum_n\frac{p_n^2}{2M}
+\frac K2(u_{n+1}-u_n)^2,
\qquad
\omega_k=2\sqrt{K/M}\,|\sin(k/2)|.
\]

A transition operator coupled to one bond,

\[
H_{\rm int}=D(u_1-u_0)(|b\rangle\langle e|+|e\rangle\langle b|),
\]

has mode weights

\[
|g_k|=
\frac{2D|\sin(k/2)|}{\sqrt{2MN\omega_k}}.
\]

The translational zero mode decouples automatically. The phonon band, density of states and relative couplings are therefore consequences of the same local harmonic carrier rather than a fitted sink spectrum.

## Finite result

The declared benchmark has 240 rail sites, a matter gap of 1.2 inside the acoustic band (0,2), and a dimensionless transition matrix element (D=0.2). Complete one-excitation evolution to time 100 transfers 0.99662 of the population to bound matter plus phonons. The conditional mean phonon energy is 1.200014. Norm and total energy close within (5 times 10^-11).

The decisive phase check is reversal. Evolving the complete final complex state backward with the same Hamiltonian restores the excited state with bath population below (3 times 10^-20). The transfer is unitary and coherent, not a hidden absorbing term. It looks irreversible only before the finite rail recurrence.

At finite temperature the same coupling supplies downward and upward Bose factors (n+1) and (n). Their ratio is exactly

\[
\frac{n_B(\Delta)}{n_B(\Delta)+1}=e^{-\beta\Delta}.
\]

Thus norm, energy, phase and detailed balance now share one ledger.

## Comparison with the toy bath

The original hand-shaped bath reached 0.99955 transfer at time 80 and emitted mean energy 1.2. The rail reaches a similar pre-recurrence result without choosing a spectral envelope around the transition. This does not make the rail more “fundamental.” It shows that the capture phenomenon survives a recognizable microscopic channel whose band edge, zero-mode behavior and mode weights can be challenged independently.

## The remaining source gate

The scalar (D) is still declared. It has not been computed from the AZ-055 scattering and bound eigenstates or tied to a named material's bond derivative. Consequently this is a source-shaped channel, not yet a source-native capture rate. The one-excitation truncation also omits multiphonon relaxation, anharmonic decay and a thermal mixed initial state; a finite rail eventually recurs.

The next calculation is exact in form: choose the bond-modulation operator on the AZ-055 cluster, evaluate it between the normalized bound state and the energy-normalized incoming scattering state, and use that matrix element in a converged or infinite acoustic rail. Sweep the incoming energy, gap, rail size and temperature. Permanent capture is admitted only if an intermediate-time plateau and emitted spectrum converge before recurrence while the reverse and detailed-balance ledgers continue to close.

## Literature boundary

The microscopic shape follows the bond-displacement origin of the [Su--Schrieffer--Heeger model](https://doi.org/10.1103/PhysRevLett.42.1698). [Shaw and Young](https://doi.org/10.1103/PhysRevB.24.714) provide a one-dimensional acoustic deformation-potential precedent, including phonon spectral restructuring. [Thorwart, Eckel and Mucciolo](https://arxiv.org/abs/cond-mat/0505621) show why acoustic-phonon dynamics can be non-Markovian. None of these sources supplies the particular AZ-055 transition matrix element.

## Reproduction

~~~powershell
node scripts/run-ssh-acoustic-phonon-capture-gate.mjs --write
node verification/admissibility/verify_ssh_acoustic_phonon_capture_gate.mjs
~~~
