# Frontier Wave 6.15: Four-Mode Quotient-Scar Platform and Experiment

**Date:** 24 October 2026  
**Status:** executable platform specification; conventional physics experiment first

## Best carrier

The closest complete testbed is a programmable four-mode star:

\[
\text{hub }c
\quad\leftrightarrow\quad
o_1,o_2,o_3,
\]

implemented with microwave, photonic or acoustic resonators. Each outer mode must have an individual complex readout, and the apparatus must also expose their summed readout.

The coherent matrix is

\[
H=
\begin{pmatrix}
\omega_c&g_1&g_2&g_3\\
g_1&\omega_1&0&0\\
g_2&0&\omega_2&0\\
g_3&0&0&\omega_3
\end{pmatrix}.
\]

At exact cyclic symmetry, \(g_i=g\) and \(\omega_i=\omega_o\), only the bright outer combination

\[
b=(o_1+o_2+o_3)/\sqrt3
\]

couples to the hub, with coupling \(\sqrt3g\). Two orthogonal contrast modes are dark. This is the coherent counterpart of the quotient graph and its two discarded modes.

## Control and detector requirements

The minimum apparatus needs:

1. independent tuning of \(g_i\), \(\omega_i\) and outer damping rates;
2. phase-coherent drive of the hub and each outer port;
3. individual complex output records \(S_i(\omega,t)\);
4. a hardware or software lumped channel \(S_\Sigma=\sum_iS_i\);
5. two calibrated contrast channels, for example
   \[
   U=(S_1-S_2)/\sqrt2,
   \qquad
   V=(S_1+S_2-2S_3)/\sqrt6;
   \]
6. a physical reversal that exchanges two outer ports while leaving the summed channel unchanged.

## Experimental sequence

### A. Exact fold

Tune exact symmetry and fit individual and summed transfer matrices. Look for:

- one hub--bright avoided crossing with coupling \(\sqrt3g\);
- two dark contrast modes absent from the summed output but present in \(U,V\);
- invariance of the summed response under cyclic relabeling.

### B. Weak breaking

Apply centered perturbations \(\delta_i\), \(\sum_i\delta_i=0\), to detunings, couplings or return rates. Test whether the lumped channel is linearly blind while contrast records respond at first order. For stochastic switching or ring-down records, reconstruct

\[
q=\sum_i\delta_i^2,
\qquad
c=\delta_1\delta_2\delta_3,
\qquad
\Delta^2=\frac{q^3}{2}-27c^2.
\]

### C. Orientation

Use the oriented contrast plane \((U,V)\) to form the cubic

\[
\Delta\propto U(U^2-3V^2).
\]

Exchange ports 1 and 2. The oriented cubic must flip sign, while the summed spectrum, \(q\), \(c\) and \(\Delta^2\) remain invariant.

### D. Dynamics and memory

Compare a fully resolved state-space model to a two-output lumped model over bandwidth and sweep rate. The target signature is not merely a bad two-mode fit; it is the linked package:

- two hidden contrast poles;
- loss of first-order breaking information under lumping;
- quadratic onset of non-Markov memory;
- recovery by one added contrast detector; and
- orientation recovery only with an ordered two-quadrature face.

## Nearest empirical neighbours

- Sifft et al., [*Revealing Hidden States in Quantum Dot Array Dynamics: Quantum Polyspectra Versus Waiting Time Analysis*](https://arxiv.org/abs/2412.14893), experimentally recover a hidden third state from continuous quantum-point-contact records and show nonuniqueness of some lumped three-state models. This is the best waiting-time and hidden-state neighbour, but it lacks the required three equivalent outer channels.
- Zhang and You, [*Higher-order exceptional point in a cavity magnonics system*](https://arxiv.org/abs/1810.09689), give a tunable three-mode cavity/YIG architecture with phase-sensitive input--output control. A three-YIG-sphere extension around one cavity supplies the required four-mode star, but must avoid confusing exceptional-point sensitivity with the Hermitian quotient scar.
- Sriram, Sridhar and Dutt, [*Quantized topological phases beyond square lattices in Floquet synthetic dimensions*](https://arxiv.org/abs/2411.02475), show that modulated ring resonators can directly engineer non-square synthetic lattice Hamiltonians. This makes exact cyclic permutation and oriented phase control plausible, though trajectory thermodynamics would still need a separate implementation.

## Nuisance firewall

The experiment fails as a quotient-scar test if any of the following are not independently fitted:

- unequal port gain or cable phase masquerading as orientation;
- unresolved mode splitting masquerading as memory;
- detector bandwidth creating artificial non-Markov kernels;
- gain/loss attraction being called symmetry selection;
- exceptional-point coalescence being confused with an ordinary symmetry fold;
- fitted relabeling being used to create cyclic symmetry after measurement.

## What outcomes mean

| Outcome | Meaning |
|---|---|
| full linked package observed | physical realization of quotient-scar dynamics and detector loss |
| dark modes but no quadratic memory | coherent fold realized; stochastic/lumped dynamics not realized |
| memory without contrast recovery | hidden-state dynamics present, but not the typed triality quotient |
| orientation signal survives port exchange unchanged | detector systematic or wrong cubic |
| no hidden modes after individual readout | fundamental two-mode description sufficient in tested range |

None of these outcomes alone is new fundamental physics. The successful result would establish a reusable experimental grammar for deciding which information survives a symmetry quotient.

## Branch verdict

R6 is no longer a generic request to “look in phonons or magnons.” It is a specified four-mode experiment with controls, records, invariants, nuisances and kill tests. It directly serves FPT-002, FPT-005, FPT-006, FPT-016 and FPT-018.
