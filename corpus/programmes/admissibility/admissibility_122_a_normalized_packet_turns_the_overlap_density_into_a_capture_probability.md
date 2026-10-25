# A normalized packet turns the overlap density into a capture probability

**Packet:** AZ-122

**Status:** source-native finite benchmark closed; material prediction open

**Primary target:** OT-036

**Evidence:** `evidence/data/ssh-wavepacket-phonon-capture-gate-v1.json`

**Generator:** `scripts/run-ssh-wavepacket-phonon-capture-gate.mjs`

**Verifier:** `verification/admissibility/verify_ssh_wavepacket_phonon_capture_gate.mjs`

## Reason

AZ-121 found the missing electronic matrix element, but it also exposed a type error. Its incoming state was normalized per unit energy, so the reported overlap was an amplitude density. It could not be inserted into AZ-120 as though it were a dimensionless coupling between two discrete levels. The smallest honest bridge is to integrate that density against a normalized incoming packet and the discrete modes of a finite acoustic rail.

## Construction

The calculation keeps the AZ-055 trivial SSH attachment and its lower physical-sheet pole at

\[
E_b=-2.008396372627451.
\]

An energy-space packet is centred at \(E_0=-0.808396372627451\), has width \(0.12\), and is phased as a right-moving packet initially centred thirty lead sites from the contact. Every energy-normalized scattering state is multiplied by \(\sqrt{\Delta E}\) before the packet is normalized. That is the step that converts AZ-121's continuum density into finite amplitudes.

The outgoing sector contains the bound electronic state plus one acoustic phonon. All eight displaced bonds of the finite cluster contribute coherently. Their electronic form factors retain their complex scattering phase, while each phonon mode contributes its own bond-centre phase and strain factor. The full matter-packet plus bound-and-phonon state evolves under one finite Hermitian Hamiltonian. No sink, rate equation, absorbing boundary or fitted spectral envelope is introduced.

The one remaining coefficient is declared rather than hidden: every bond is assigned the same benchmark derivative \(D=0.2\). It is a controlled engineered-model number, not a value inferred for polyacetylene or any named material.

## Result

At the finest declared discretization, with 96 matter-energy bins and a 240-site phonon rail,

- initial norm is \(1+2.2\times10^{-16}\);
- the final bound-plus-phonon probability at \(t=60\) is \(1.0892760899\times10^{-3}\);
- the maximum probability is \(1.0893463134\times10^{-3}\), reached near \(t=32\);
- the conditional emitted-phonon energy is \(1.2182161952\);
- norm and total-energy drift are below \(1.1\times10^{-9}\);
- backward evolution leaves less than \(5.2\times10^{-21}\) in the captured sector and recovers the initial amplitude to \(1.37\times10^{-9}\).

Joint refinement from 64/160 to 96/240 matter/phonon resolution changes the final capture probability by only \(0.258\%\). The preceding 32/80 to 64/160 change is \(2.26\%\), so the refinement trend is visible rather than asserted.

## What this closes

For the declared finite graph and benchmark derivative, “capture” is now a properly normalized probability. The calculation joins four objects without changing their types:

1. a normalized incoming matter packet;
2. the source-derived bound state;
3. the energy-dependent scattering-to-bound bond form factors;
4. a source-shaped acoustic phonon rail.

The resulting sub-percent number is less dramatic than AZ-120's deliberately strong two-level transfer, and that is the point. Correct normalization turns a suggestive overlap into a modest quantitative benchmark. It also preserves phase, energy and reversibility, so the number is not manufactured by a sink.

## What remains open

This is not yet a material capture prediction. A named realization must supply bond-resolved \(dt/du\), ionic masses, spring constants, geometry and temperature. The equal derivative on all bonds is a declared simplification. The calculation also retains a one-phonon truncation and finite matter and phonon continua. Thermal absorption, multiphonon relaxation and anharmonic irreversibility remain outside the certificate.

The next frontier is therefore no longer “invent a capture mechanism.” It is narrower and experimentally legible: calibrate one material or engineered device, replace the common benchmark by its bond-resolved mechanical derivatives, and test whether the same probability and emitted spectrum survive joint continuum refinement and finite-temperature detailed balance.
