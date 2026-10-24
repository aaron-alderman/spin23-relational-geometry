# Frontier Wave 6.11: Oriented Detector for the Triality Sign

**Date:** 24 October 2026  
**Status:** exact minimal two-contrast detector geometry; physical port assignment open  
**Certificate:** [verify_oriented_triality_detector_recovers_vandermonde_sign.mjs](../../../../verification/verify/verify_oriented_triality_detector_recovers_vandermonde_sign.mjs)

## Result

The sign of the triality Vandermonde is recoverable once the detector retains an oriented basis of the hidden contrast plane.

For \(\delta_1+\delta_2+\delta_3=0\), define two orthonormal detector contrasts

\[
u=\frac{\delta_1-\delta_2}{\sqrt2},
\qquad
v=\frac{\delta_1+\delta_2-2\delta_3}{\sqrt6}.
\]

Then

\[
\boxed{
\Delta
=(\delta_1-\delta_2)(\delta_2-\delta_3)(\delta_3-\delta_1)
=\frac{u(u^2-3v^2)}{\sqrt2}.
}
\]

Equivalently,

\[
\Delta=\frac{1}{\sqrt2}\operatorname{Re}(u+iv)^3.
\]

The oriented triality complex structure acts as the quarter-turn

\[
J_{\rm tri}(u,v)=(-v,u).
\]

A 120-degree cyclic rotation preserves \(\Delta\), while a sheet reflection reverses one contrast coordinate and sends

\[
\Delta\mapsto-\Delta.
\]

The symmetric invariants \(q,c,\Delta^2\) remain unchanged.

## Minimum detector

An unlabeled single-face detector can recover \(q,c,\Delta^2\) but cannot recover \(\operatorname{sgn}\Delta\). The minimum oriented extension is:

1. two independent contrast ports spanning the sum-zero plane; and
2. a declared orientation of their ordered pair.

Reversing the port orientation must flip the cubic signal while preserving the symmetric spectra. This is a falsifiable calibration rule.

## Physical admission test

A candidate apparatus must demonstrate:

- three microscopically distinct channels;
- two linearly independent calibrated contrasts;
- a physical reversal exchanging two channel labels or reversing port orientation;
- invariant \(q,c,\Delta^2\) under reversal; and
- odd \(\Delta\) under reversal.

If the sign change is only a software relabeling with no physical transformation, it is convention rather than an observable orientation.

## Relation to CP

The cubic is an orientation witness, not automatically a CP observable. A CP interpretation additionally requires the detector reversal to coincide with the relevant antiunitary or conjugation operation on the matter/response carrier. This is exactly the missing reflection identification isolated in [the triality--Furey intertwiner audit](frontier_wave6_09_triality_furey_intertwiner_boundary.md).

The branch is closed mathematically and open physically at port typing.

