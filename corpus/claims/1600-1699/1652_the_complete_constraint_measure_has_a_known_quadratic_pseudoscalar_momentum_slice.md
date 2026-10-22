# The Complete Constraint Measure Has a Known Quadratic Pseudoscalar-Momentum Slice

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** exact one-dimensional source slice of the complete 34-constraint measure

**Depends on:** [the complete torsionless constraint factorization](1644_the_complete_massive_0minus_constraint_measure_is_ultralocal_on_the_torsionless_background.md) and [the torsionful source-order audit](1650_torsionless_determinants_do_not_determine_any_of_the_five_axial_loop_responses.md)

**Evidence:** [canonical measure-response ledger](../../../evidence/data/spin23-second-class-pseudoscalar-momentum-response-v1.json) and [verifier](../../../verification/verify/verify_spin23_second_class_pseudoscalar_momentum_response.mjs)

## Result

The complete Faddeev--Senjanovic determinant has one exact nonzero-source
slice already implicit in the published canonical bracket formula. Hold the
spatial density \(J>0\) and all other canonical background fields at their
torsionless massive values, but vary the pseudoscalar momentum
\({}^p\!\pi\). Then, up to field-independent constants,

\[
\boxed{
\sqrt{\det\Delta}
\propto J^{-17}
\left[m^2+\left({{}^p\!\pi\over6J}\right)^2\right]^3 .
}
\]

Its logarithm is even in \({}^p\!\pi\). The linear response vanishes and
the quadratic response is nonzero:

\[
\log\sqrt{\det\Delta}
=\text{constant}
+{({}^p\!\pi)^2\over12J^2m^2}
+O(({}^p\!\pi)^4),
\]

or equivalently

\[
\left.{\partial^2\over\partial({}^p\!\pi)^2}
\log\sqrt{\det\Delta}\right|_0
={1\over6J^2m^2}.
\]

## Derivation

The complete constraint matrix has the block determinant

\[
\det\Delta=\det A\,(\det E)^2.
\]

The known primary block obeys

\[
\det A=J^{-12}
\left[m^2+\left({{}^p\!\pi\over6J}\right)^2\right]^6.
\]

The eleven eigenvalues of \(E\) each carry one factor of \(J^{-1}\), so
\(|\det E|\propto J^{-11}\). Taking the square root gives the displayed
\(J^{-17}\) formula. The derivative-containing cross-blocks continue to
drop out of the determinant identity on this canonical slice.

## What this does and does not determine

This is a genuine partial source-order result for the complete constraint
measure: its first pseudoscalar-momentum derivative vanishes and its second
derivative is fixed.

It is not yet one of the five covariant responses. Converting
\({}^p\!\pi\) into the background axial field requires the packet-specific
Legendre map, lapse/shift treatment, Euclidean continuation, and the
dependence of \(J\) and the other bracket entries on a general spacetime
source. Until that map is constructed, the expression must not be labelled
a contribution to \(A\), \(B\), or either curvature coupling. Its sign in
the effective action must likewise follow the final measure convention,
rather than being inferred from the positive logarithm above.

## New boundary

Two tempting internal sources are now controlled:

- the fixed-coframe pure-axial Lagrangian determinant has no source
  dependence; and
- the complete canonical measure has the nontrivial even momentum response
  shown here.

The next executable bridge is the covariant Legendre/source map for
\({}^p\!\pi\), followed by the mixed coframe/non-axial Hessian vertices.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_second_class_pseudoscalar_momentum_response.mjs
~~~
