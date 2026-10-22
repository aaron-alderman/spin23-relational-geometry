# The t132 Xhat-Squared Coframe Completion Is an Exact Rank-24/Rank-6 Pair

**Date:** 22 October 2026

**Status:** exact 34-component source expansion for the packet curvature-square sector

**Depends on:** [the fixed-coframe self-vertices](1696_the_t132_packet_connection_self_vertices_close_in_two_exact_matrices.md)

**Evidence:** [full-vertex ledger](../../../evidence/data/spin23-t132-xhat-full-source-vertices-v1.json) and [verifier](../../../verification/verify/verify_spin23_t132_xhat_full_source_vertices.mjs)

## Result

A truncated Fourier--Taylor algebra now expands

\[
{b_X\over2}\widehat X^2\eta
={b_X\over2}{Y(e,K)^2\over\det e},\qquad
Y={1\over2}\epsilon^{\mu\nu\rho\sigma}R_{ab\mu\nu}e^a_\rho e^b_\sigma,
\]

in the ten symmetric exponential-coframe and twenty-four connection
fluctuations.  For the `t132` source and witness loop momentum
\(p=(2,3,5,7)\), the source-linear matrix has

\[
\boxed{\operatorname{rank}H^{X^2}_1=24}
\]

with nonzero block counts

\[
(hh,hk,kh,kk)=(0,30,30,68)
\]

and block ranks \((0,3,3,24)\).  For the conjugate source pair, the
source-quadratic matrix has

\[
\boxed{\operatorname{rank}H^{X^2}_2=6}
\]

with counts \((18,0,0,1)\) and ranks \((5,0,0,1)\).

The `kk` submatrices reproduce claim 1696 exactly after accounting for the
two conjugate source orderings.  This independently validates the mode
algebra and proves that the coframe completion is finite and executable.

## Path consequence

The curvature-square part of the `t132` Hessian is complete; it is not an
exhaustion boundary.  The same engine must now add the Einstein--Hilbert and
critical torsion-square densities.  Those terms have source-independent
fixed-coframe `kk` Hessians but nontrivial coframe and mixed source vertices.
Only their sum may be Schur-reduced and inserted into the loop trace.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_t132_xhat_full_source_vertices.mjs
~~~
