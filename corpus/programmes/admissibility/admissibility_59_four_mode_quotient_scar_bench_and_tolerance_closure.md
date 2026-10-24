# Four-mode quotient-scar bench and tolerance closure

**Packet:** AZ-059  
**Date:** 25 October 2026  
**Status:** hardware specification and tolerance simulation closed; laboratory execution remains active  
**Topics:** OT-010, OT-021  
**Evidence:** [machine-readable bench record](../../../evidence/data/admissibility-four-mode-quotient-scar-bench-v1.json)  
**Reproduction:** `node scripts/run-four-mode-quotient-scar-bench.mjs --write`  
**Verification:** `node verification/admissibility/verify_four_mode_quotient_scar_bench.mjs`

## Result

The four-mode quotient-scar proposal now has a buildable conventional-physics bench rather than a dimensionless Hamiltonian alone. Use four phase-coherent RF or microwave resonators: one hub and three outer modes with independently adjustable resonance frequency, coherent drive and complex readout. The frozen design point is

\[
f_0=100\ \mathrm{MHz},\qquad
g_i=2\ \mathrm{MHz},\qquad
\kappa_i=0.1\ \mathrm{MHz}.
\]

At exact cyclic symmetry, a hub drive sees only the hub and the bright outer sum. Its normalized Krylov rank is two; the two contrast modes are dark. The apparatus must nevertheless expose all three outer ports so that the orthogonal contrasts

\[
U=(S_1-S_2)/\sqrt2,
\qquad
V=(S_1+S_2-2S_3)/\sqrt6
\]

can be driven and read directly. This is the physical difference between observing a quotient and merely fabricating its two-mode image.

## Three settings, not one fit

The experiment has three preregistered settings.

1. **Exact fold:** set all outer detunings to zero. A hub drive must have rank two, while contrast drives reveal the two degenerate dark modes.
2. **Weak centred breaking:** apply the pattern ((1,-0.15,-0.85)\epsilon\) for (epsilon=0.05,0.1,0.2,0.4\,\mathrm{MHz}). Because the first moment vanishes, the eliminated-mode correction to the hub self-energy begins quadratically; the computed difference divided by (epsilon^2) stays between 3.108 and 3.273 over the frozen ladder.
3. **Resolved breaking:** apply detunings ((2,-0.3,-1.7)\,\mathrm{MHz}). The four relative eigenfrequencies are approximately ((-3.774,-1.019,0.944,3.849)\,\mathrm{MHz}). The smallest adjacent gap is (1.962\,\mathrm{MHz}), and every mode has at least 5.6% hub residue. A hub-only record now has Krylov rank four.

The controlled transition (2\to4), followed by restoration (4\to2), is the primary decision surface. It cannot be reproduced by the already-excluded permanent two-mode surrogate without changing its state dimension between held-out settings.

## Orientation record

For the centred detuning pattern, the ordered contrast cubic

\[
I_3=U(U^2-3V^2)
\]

is (-2.1061) in normalized coordinates. Physically exchanging outer ports 1 and 2 sends it to (+2.1061), while the quadratic norm and the unordered product of detunings remain unchanged. This is the orientation control. A sign produced only by relabelling data after acquisition is inadmissible.

## Frozen hardware and calibration budget

Scan 94--106 MHz around the common carrier in 10 kHz steps. The preregistered tolerances are:

- outer-frequency setting error at most 20 kHz;
- coupling error at most 1%;
- linewidth variation at most 10%;
- relative gain calibration within 0.25 dB;
- relative phase calibration within 2 degrees; and
- absolute frequency calibration within 10 kHz.

A deterministic 5,000-sample tolerance audit varies frequencies, couplings and linewidths across those intervals. Every sample passes all three frozen conditions: minimum adjacent gap greater than twelve times the largest linewidth, minimum hub residue above 4%, and minimum normalized Krylov singular value above 0.05. The observed worst cases are 17.60 linewidths, 5.28% and 0.0709 respectively.

The gain and phase tolerances are not absorbed into that eigenvalue audit. They are held-out detector injections: synthetic calibration errors at the declared limits must be applied before the blind analysis, and the physical port exchange must still reverse the corrected cubic.

## Minimum apparatus

The platform needs:

- four resonators and three calibrated hub-to-outer couplers;
- a phase-coherent multiport network analyser or one source with coherent switching;
- independent outer-frequency trims spanning at least (pm2.1\,\mathrm{MHz});
- individual complex port records plus hardware- or software-formed sum, (U) and (V) channels;
- a physical exchange of outer ports 1 and 2, or an independently calibrated switch implementing it before detection;
- ringdown acquisition at a sampling rate comfortably above the 0.1 MHz linewidth; and
- blind exact/weak/resolved setting labels during inference.

Four-module coherent microwave routing and calibrated intermode transfers already have experimental precedent ([npj Quantum Information 9, 63](https://doi.org/10.1038/s41534-023-00723-7)). Higher-order records have also exposed a hidden state while demonstrating that the underlying state model can remain non-unique ([Physical Review B 111, 205412](https://doi.org/10.1103/PhysRevB.111.205412)). These are feasibility neighbours, not evidence that either experiment realizes this quotient.

## Complexity card

| stage | declared cost and boundary |
|---|---|
| existence | fixed four-by-four coupled-mode matrix; exact eigensystem and detector algebra |
| preparation | constant-size hardware; four frequency settings and three couplings calibrated independently |
| sampling | 1,201 frequency points per scan times the frozen drive, setting and reversal schedule; polynomial averaging in desired precision |
| detection | four complex ports plus three derived channels; no exponential tomography |
| independent verification | eigenvalue/rank reconstruction from withheld port subsets, physical exchange, ringdown and exact-symmetry restoration |

The favourable cost applies only to this fixed four-mode carrier. It is not a scaling theorem for large quotient networks.

## Decision and implications

The hardware specification part of OT-010 is closed. OT-010 remains active only for construction and blind execution. Advance when the four poles, rank release, quadratic memory onset and odd orientation record survive the calibration injections and restoration control. Stop if a two-mode model fits the resolved individual-port data, if the cubic fails physical reversal, or if the scars disappear after bandwidth and gain/phase calibration.

A positive result establishes a reusable way to measure information lost and recovered under a controlled quotient. It is useful as network identification and hidden-mode metrology. It does **not** show that a natural material has (D_4), (G_2), triality or exceptional dynamics: an ordinary four-resonator network was deliberately built to realize the same grammar. A fundamental reading requires a source-native system that predicts this detector record without being programmed to do so.
