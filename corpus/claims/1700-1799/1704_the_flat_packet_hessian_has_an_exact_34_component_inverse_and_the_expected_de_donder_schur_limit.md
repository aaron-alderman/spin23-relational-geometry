# The Flat Packet Hessian Has an Exact 34-Component Inverse and the Expected de Donder Schur Limit

**Date:** 23 October 2026

**Status:** exact zero-source propagator milestone; the remaining operation is the `t132` logarithmic trace

**Depends on:** [the complete `t132` packet source vertices](../1600-1699/1699_the_complete_t132_packet_source_vertices_reduce_to_two_coupling_weighted_matrix_pairs.md), [the packet principal-symbol census](../1600-1699/1642_the_packet_hessian_has_one_connection_derivative_direction_and_requires_a_measure_preserving_schur_reduction.md), and [the flat de Donder calibration](../1600-1699/1662_the_flat_constant_background_closes_one_of_the_five_axial_loop_responses.md)

**Evidence:** [zero-source propagator ledger](../../../evidence/data/spin23-t132-zero-source-propagator-v1.json) and [joint source/propagator verifier](../../../verification/verify/verify_spin23_t132_complete_packet_source_vertices.mjs)

## Result

The same Fourier--Taylor engine that constructs the two `t132` source
matrices now constructs the complete zero-source quadratic form on the ten
symmetric exponential-coframe coordinates and 24 affine-connection
coordinates.  Restoring the Fourier factors of \(i\), the zero-source
sector ranks at generic nonzero momentum are

\[
 \operatorname{rank}H_X=1,\qquad
 \operatorname{rank}H_T=24,\qquad
 \operatorname{rank}H_E=30.
\]

The one-derivative coframe--connection blocks are negative transposes before
the Fourier factor is restored, and therefore form the required Hermitian
pair after multiplication by \(i\).  The two-derivative blocks acquire the
corresponding continuation sign.

At \(\kappa=1,a_1=2,b_X=1\), the complete connection block has rank 24.
Its exact Schur complement has rank six before diffeomorphism gauge fixing,
as required for the gauge-invariant metric Hessian.  Adding the packet
de Donder term with coefficient

\[
 c_{\rm gf}=-{1\over2\kappa}
\]

in the quadratic form \(c_{\rm gf}F_\mu F^\mu/2\) raises the metric rank to
ten.  The inverse in the packet coordinate \(f=h/2\) is

\[
 G_f(p)=-{\kappa\over p^2}P,
\]

where the overall minus is the chosen Euclidean Einstein-action
continuation.  Continuing back gives exactly the previously calibrated

\[
 G_h(p)={4\kappa\over p^2}P.
\]

The numerical residual at the rational witness momentum \((2,3,5,7)\) is
below \(1.4\times10^{-17}\).  Repeating the Schur reduction at two other
generic pairs \((a_1,b_X)\) changes the reduced metric operator by less than
\(4.0\times10^{-12}\), confirming that auxiliary critical-torsion
coordinates have not contaminated the Einstein graviton block.

## Principal symbol and scope

The gauge-completed coframe symbol has rank ten and the pseudoscalar
connection symbol rank one, reproducing the exact \(11/34\) census.  The
remaining 23 connection directions are algebraic but are retained in the
inverse and determinant rather than discarded.

This closes the propagator-construction subtask.  It does not yet supply the
`t132` counterterm coefficient: the next operation is still

\[
 {1\over2}\operatorname{Tr}(G H_2)
 -{1\over4}\operatorname{Tr}(G H_1G H_1),
\]

with the two propagators evaluated at the loop momenta separated by the
external source momentum.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_t132_complete_packet_source_vertices.mjs
~~~
