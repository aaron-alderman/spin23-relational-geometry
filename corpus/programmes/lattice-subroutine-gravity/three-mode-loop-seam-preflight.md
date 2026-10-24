# Three-mode intrinsic seam-flux preflight

**Date:** 24 October 2026
**Status:** exact loop invariant and verified directional transfer preflight; hardware execution and modular binding open
**Evidence:** [machine-readable preflight](../../../evidence/data/lattice-subroutine-three-mode-loop-seam-preflight-v1.json)
**Certificate:** [loop verifier](../../../verification/verify/verify_lattice_subroutine_three_mode_loop_seam_preflight.mjs)

## Result

A three-resonator ring is the smallest device that can carry an intrinsic coupling phase. It also repeats the corpus's central detector lesson:

> the spectrum sees the unoriented loop, while directional coherent transport sees its orientation.

Let the three Hermitian hopping amplitudes have equal magnitude \(g\) and phases \(\phi_{12},\phi_{23},\phi_{31}\). Their gauge-invariant flux is

\[
\Phi=\phi_{12}+\phi_{23}+\phi_{31}\pmod{2\pi}.
\]

Local rephasings redistribute the three edge phases but cannot change \(\Phi\).

## What the spectrum retains

For equal onsite frequencies, the characteristic polynomial depends on

\[
\det H=2g^3\cos\Phi.
\]

Consequently the unordered eigenfrequency set is the same for \(+\Phi\) and \(-\Phi\). A resonance-frequency or density-of-states measurement detects \(\cos\Phi\), not the oriented sign of the flux.

This is the loop analogue of replacing \(\chi_5\) by an orientation-blind square.

## What directional transfer retains

Attach coherent ports to two vertices and include the measured linewidths. The resolvent

\[
G(\omega)=
\left[
\left(\omega+i\frac{\kappa}{2}\right)I-H
\right]^{-1}
\]

contains two paths between the ports: the direct edge and the two-edge path through the third resonator. Their relative phase contains \(\Phi\).

The directional statistic

\[
D_{\circlearrowright}
=
|G_{21}|^2-|G_{12}|^2
\]

is odd under \(\Phi\mapsto-\Phi\) when loss and port coupling make the interference observable. It vanishes at the time-reversal-invariant values \(\Phi=0,\pi\).

The stronger complex statistic

\[
C_{\circlearrowright}=G_{21}-G_{12}
\]

retains both amplitude and phase and should be the primary record.

## Run matrix

Program:

\[
\Phi\in
\left\{
0,\frac{\pi}{2},\pi,-\frac{\pi}{2}
\right\}.
\]

For each flux:

1. realize at least four different distributions of the same total phase among the edges;
2. measure all three reciprocal port pairs;
3. sweep through the full three-mode resonance band;
4. repeat after interchanging input and output cables;
5. acquire each individual edge with the third edge disabled;
6. randomize the order of flux signs and phase distributions.

## Decision rules

An intrinsic loop result requires:

- spectra and complex transfer functions invariant under edge-phase redistribution at fixed \(\Phi\);
- spectra identical within uncertainty for \(+\Phi\) and \(-\Phi\);
- directional complex transfer reversing under flux reversal;
- the directional effect vanishing when any edge is opened;
- one calibrated coupled-mode model predicting held-out phase distributions without refit.

A signal that follows one edge phase instead of the loop sum is externally referenced leakage, not intrinsic flux.

## Relation to the corpus

This device realizes the same *type* of object as a Wilson/Bargmann loop phase. It does not by itself realize:

- the genus-two \(\chi_5\) line;
- the Monster \(2A\) duality defect;
- the Rule-60/Golay deck bit;
- the response-root Pfaffian sheet.

Those identifications require source-derived intertwiners. The device supplies a controlled place for such an intertwiner to land.

## Frontier value

The three-mode ring is a stronger platform than the two-mode experiment because its phase survives removal of the external basis convention. The immediate engineering result is a calibrated detector of intrinsic synthetic flux. The frontier test begins only when a modular or lattice calculation predicts \(\Phi\), edge magnitudes or a defect response without fitting them to the device.
