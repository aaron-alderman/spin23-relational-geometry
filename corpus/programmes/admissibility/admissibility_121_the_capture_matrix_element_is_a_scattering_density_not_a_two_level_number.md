# The capture matrix element is a scattering density, not a two-level number

**Date:** 25 October 2026

**Status:** AZ-055 scattering-to-bound form factor closed; wavepacket and material normalization open

**Topics:** OT-036

**Parent:** [AZ-120 acoustic-rail capture channel](admissibility_120_a_unitary_acoustic_rail_replaces_the_hand_shaped_capture_bath.md)

**Evidence:** [scattering-to-bound form-factor audit](../../../evidence/data/ssh-scattering-bound-phonon-form-factor-v1.json)

**Generator:** [bound/scattering normalization and bond scan](../../../scripts/run-ssh-scattering-bound-phonon-form-factor.mjs)

**Verifier:** [normalization and form-factor certificate](../../../verification/admissibility/verify_ssh_scattering_bound_phonon_form_factor.mjs)

## The missing graph factor is now computed

AZ-120 left its matter transition coefficient as a scalar. The AZ-055 graph now supplies the state-dependent part of that coefficient. At zero local-level control on the trivial rail, the lower physical-sheet pole is

\[
E_b=-2.008396372627451.
\]

The bound state is normalized across both the nine-site cluster and its exponentially decaying lead tail. The smallest eigenvalue of its effective bound-state equation is below (1.1 times 10^-14), the maximum component residual is below (1.2 times 10^-15), and the total norm is unity to floating-point precision.

Choose an incoming energy

\[
E_{\rm in}=E_b+1.2=-0.808396372627451
\]

inside the tight-binding band. The incoming state is normalized per unit energy, including its group velocity and the exact side-cluster transmission amplitude. For a bond-modulation operator

\[
B_j=|j\rangle\langle j+1|+|j+1\rangle\langle j|,
\]

the capture form factor is

\[
F_j(E)=\langle b|B_j|E,{\rm in}\rangle.
\]

All eight internal bonds are evaluated. At the chosen energy the strongest is the contact-side bond (0,1), with

\[
|F_{01}|=0.02147052191385749.
\]

The overlap falls rapidly toward the local-level end. Across the allowed scan, the same bond reaches its sampled maximum (0.17755) near emitted phonon energy (0.80044). Capture strength is therefore a function of incoming energy and bond location, not a constant label attached to the pole.

## The normalization correction

The most important result is categorical. AZ-120's (D) couples two normalized discrete matter states and is a discrete Hamiltonian matrix element. The present (F_j) couples a normalized bound state to an energy-normalized continuum state. It is an amplitude density. Multiplying by a material bond derivative gives a flux-normalized capture kernel or a wavepacket amplitude; it does not give a dimensionless number that can be substituted directly for AZ-120's (D).

This prevents a tempting but invalid conclusion that the new overlap simply reduces the old capture probability by the square of 0.02147. A capture probability exists only after the continuum state is integrated against an incoming wavepacket or inserted into a consistently normalized golden-rule calculation.

## What is now source-native and what is not

The following pieces now come from one declared graph:

- the physical bound pole and its lead tail;
- the exact scattering transmission and group velocity;
- the cluster amplitudes of the energy-normalized incoming state;
- the bond-resolved transition form factors and their energy dependence.

Still external are the dimensional bond derivative (dt/du), ionic mass density, the coherent phonon phases of every displaced bond, and any material calibration. The stationary form factor also does not test finite-time arrival, capture probability or recurrence.

## Next experiment in calculation

Choose a finite incoming wavepacket with declared energy width and launch position. Choose a material or engineered rail that fixes (dt/du), masses and spring constants. Couple every displaced bond with its phonon phase, not only the strongest bond. Evolve matter and phonons unitarily while increasing the electronic lead and phonon rail together. Record reflected, transmitted, temporarily trapped and bound-plus-phonon probability; emitted spectrum; energy; reverse recovery; and the thermal upward channel.

The route advances if a nonzero bound population and emitted spectrum converge on a time window that grows with both rails while the ledger closes. It closes if coherent bond cancellation or the material derivative kills the form factor, the required phonon lies outside the band, or the apparent captured population vanishes as wavepacket and rail limits are taken. This is theoretical engineering before it is new physics.

## Reproduction

~~~powershell
node scripts/run-ssh-scattering-bound-phonon-form-factor.mjs --write
node verification/admissibility/verify_ssh_scattering_bound_phonon_form_factor.mjs
~~~
