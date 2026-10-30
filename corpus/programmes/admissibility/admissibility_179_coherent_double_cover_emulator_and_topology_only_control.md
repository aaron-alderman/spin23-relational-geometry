# Coherent double-cover emulator and topology-only control

**Date:** 30 October 2026

**Status:** apparatus-independent transfer experiment specified; physical platform and measured calibration open

**Parent:** [experimental capability frontier](admissibility_178_klein_throat_experimental_capability_frontier.md)

## Experimental object

Use a finite orientable double-cover lattice with complex, phase-preserving
ports. The local dynamics may be represented as

\[
M\ddot q+C\dot q+Kq=Bu,
\qquad
H(\omega)=D^{T}
(-\omega^2M+i\omega C+K)^{-1}B.
\]

An active-RC realization replaces the second-order equation with its
first-order analogue; an acoustic or mechanical realization changes the
meaning of \(q\), not the experimental logic.

At the final axial slice, connect the same ports through one of two permutation
and sign matrices:

\[
P_K:q_{j,m}\mapsto q_{0,-m},
\qquad
P_R:q_{j,m}\mapsto q_{0,m}.
\]

For a mirror-odd transverse channel, the effective one-lap multipliers are
\(-1\) and \(+1\). Both close to \(+1\) after two laps.

## Why coherent readout is mandatory

Let the returned complex amplitude be \(z'=rz\), with \(r=\pm1\). An
intensity detector records

\[
|z'|^2=|z|^2
\]

in both cases. A coherent detector records the phase difference and therefore
retains the sign. The topology-only control deliberately makes every other
measured feature equal. Under this control the synthetic verifier finds two
coherent classes and one power class. No amount of power precision restores
the erased distinction.

## Measurement sequence

1. Measure every uncoupled port's complex gain and phase against one reference.
2. Assemble an open cover and identify local \(M,C,K\), or their first-order
   equivalent, before closing the return.
3. Close \(P_R\); sweep frequency and record the full complex transfer matrix.
4. Change only the sewing harness or programmed permutation to \(P_K\).
5. Repeat the sweep without refitting local parameters.
6. For even and odd transverse probes, measure one-lap and two-lap phase.
7. Reverse source and detector ports to test reciprocity where the platform
   claims it.
8. Repeat with a deliberately incorrect sign, missing link and phase offset.

## Primary observables

- complex one-lap multiplier and confidence interval;
- two-lap closure residual;
- full transfer-matrix difference after accounting for the declared sewing;
- reciprocity residual;
- passive work or scattering balance;
- common-mode rejection between the two return configurations.

The decisive topology statistic is the phase-referenced difference between
the matched returns, not the absolute phase of either apparatus.

## Platform ranking for C1--C4

| platform | signed readout | programmable weights | nonlinearity | principal limitation |
|---|---:|---:|---:|---|
| digital real-time graph | excellent | excellent | excellent | demonstrates emulator, not material constitutive physics |
| active RC/RLC network | excellent | excellent | controllable | parasitics and active-port bookkeeping |
| mechanical mass-spring lattice | good | moderate | natural | friction and sensor loading |
| acoustic waveguide lattice | good | moderate | drive-dependent | distributed loss and junction calibration |
| hydraulic network | moderate | difficult | natural | pressure/flow phase and boundary control |

The active electrical or digital platform is the preferred first build. It
provides complex readout and rapid switching between the two returns. Acoustic
or mechanical replication is valuable only after the topology-only control
has closed.

This ranking is now supported by existing Klein-bottle photonic and electrical
implementations. The precise comparison and the remaining novelty are recorded
in the [experimental literature collision](admissibility_183_experimental_literature_collision_and_platform_reprioritization.md).

## Go and stop rules

Proceed to spectral tomography only if:

- the odd channel gives phase \(\pi\) for \(P_K\) and zero for \(P_R\), within
  declared uncertainty;
- both give two-lap phase zero;
- the even calibration channel is unchanged;
- the work ledger closes without an undeclared active path.

Stop if the result exists only after converting amplitudes to power, if the
local model must be separately refitted for the two sewings, or if detector
phase drift is comparable to the return separation.

