# A phase-blind positive response necessarily squares the modular seam

**Date:** 24 October 2026
**Status:** exact local codimension and invariant-theory obstruction; phase-sensitive enrichment remains open
**Evidence:** [machine-readable gate](../../../evidence/data/lattice-subroutine-sewing-response-codimension-gate-v1.json)
**Certificate:** [gate verifier](../../../verification/verify/verify_lattice_subroutine_sewing_response_codimension_gate.mjs)

## Result

Near a separating genus-two surface, the normal sewing coordinate is complex:

\[
\epsilon=x+iy.
\]

The oriented modular form has a linear local zero,

\[
\chi_5\sim C\,\epsilon,
\]

so it retains both the magnitude and phase of the normal displacement. Its scalar square behaves as

\[
\chi_{10}=\chi_5^2\sim C^2\epsilon^2,
\]

while a non-chiral positive quantity behaves as

\[
|\chi_5|^2\sim |C|^2(x^2+y^2).
\]

This distinction reappears whenever the seam is sent into a real positive response.

## The invariant-theory gate

Suppose the phase convention of the sewing coordinate is not physical, so

\[
\epsilon\mapsto e^{i\phi}\epsilon
\]

must leave a scalar detector record unchanged. A smooth real invariant has no nonzero linear term. Its leading nonconstant quadratic term is proportional to

\[
x^2+y^2=|\epsilon|^2.
\]

Therefore a phase-blind positive response:

- vanishes at least quadratically at separation;
- cannot change sign;
- forgets the oriented normal;
- has the structural type of \(|\chi_5|^2\) or \(\chi_{10}\), not \(\chi_5\).

This is not a technological limitation. It follows from the \(SO(2)\) action on the two real normal coordinates.

## Why a real determinant does not solve it unaided

A signed response-root determinant can have a linear term

\[
a_{\phi_0}(x,y)
=x\cos\phi_0+y\sin\phi_0
=\operatorname{Re}(e^{-i\phi_0}\epsilon),
\]

but only after a reference phase \(\phi_0\) has been selected. Its zero set is the full line perpendicular to that selected direction, not just the codimension-two point \(\epsilon=0\).

Conversely, a real scalar that vanishes only at \(x=y=0\) can begin with \(x^2+y^2\), but then it has no sign. Requiring all three properties—

1. smooth real scalar;
2. zero only at the complex separating locus;
3. linear sign-changing zero—

is locally impossible.

## The minimal enrichment

There are two honest ways forward.

### Retain two quadratures

The detector records a vector

\[
(X,Y)\propto(x,y)
\]

or a complex coherent amplitude \(X+iY\). Separation is the simultaneous zero of both records. The phase/orientation remains observable through interference with a declared reference.

### Select a real normal

A boundary condition, preparation history, local oscillator or other independently sourced datum chooses \(\phi_0\). The experiment then measures \(a_{\phi_0}\). This creates a signed codimension-one crossing, but the selector and its transformation law become part of the physics.

Both routes express the corpus's Jordan--Lie balance. The positive Jordan record naturally keeps \(|\epsilon|^2\); transport of the oriented phase requires an enriched coherent carrier. Neither side alone contains the complete seam.

## Detector consequence

A power-only detector will see the squared seam and cannot distinguish \(\epsilon\) from \(-\epsilon\) or \(e^{i\phi}\epsilon\). The minimum discriminating instrument requires:

- two calibrated quadratures or two phase-related ports;
- a stable external or internally generated phase reference;
- coherent rather than incoherent averaging;
- a declared test of whether reversing the seam changes a phase-sensitive record while leaving power unchanged.

The direct observable is

\[
\Delta_{\rm odd}
=
\operatorname{Im}(A_{\rm ref}^*A_{\rm seam})
\]

or its real-quadrature counterpart. The null control is \(|A_{\rm seam}|^2\), which must remain orientation blind.

## Implication

The failed canonical map \(Q=\operatorname{Im}\Omega\) and this local obstruction together locate the missing datum:

> the modular seam cannot become a real positive rank-loss boundary without either being squared or being accompanied by a phase selector.

This does not derive the selector. It states exactly what kind of additional physical information must be found.
