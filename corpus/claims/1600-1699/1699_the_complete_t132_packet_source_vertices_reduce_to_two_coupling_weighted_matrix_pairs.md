# The Complete t132 Packet Source Vertices Reduce to Two Coupling-Weighted Matrix Pairs

**Date:** 22 October 2026

**Status:** complete classical packet H1/H2 vertices before Schur reduction

**Depends on:** [the corrected curvature vertices](1697_the_t132_xhat_squared_coframe_completion_is_an_exact_rank_30_rank_6_pair.md) and [the convention bridge](1698_the_response_and_packet_torsion_conventions_are_related_by_one_slot_permutation.md)

**Evidence:** [complete-vertex ledger](../../../evidence/data/spin23-t132-complete-packet-source-vertices-v1.json) and [verifier](../../../verification/verify/verify_spin23_t132_complete_packet_source_vertices.mjs)

## Result

The exact Fourier--Taylor engine now expands every packet action term that
depends on the independent connection source.  If (X_i,T_i,E_i) denote
the source vertices from (widehat X^2/2), the critically weighted torsion
norm, and the Einstein--Hilbert scalar, it finds

\[
\boxed{T_1=2E_1,\qquad T_2=2E_2.}
\]

Accounting for the two-form norm in the packet action therefore gives

\[
\boxed{H_i^{\rm packet}=b_X X_i+{a_1+1\over2\kappa}E_i,
\qquad i=1,2.}
\]

The cosmological and gauge-fixing terms have no independent-connection
source derivative.  Ghosts, ordinary Jacobians and the complete
second-class factor have already been proved irrelevant to the MS-bar source
pole.  These are therefore the complete classical bosonic source vertices.

At the unit-coupling witness (b_X=(a_1+1)/(2\kappa)=1),

\[
\operatorname{rank}H_1^{\rm packet}=30,
\qquad \operatorname{rank}H_2^{\rm packet}=7.
\]

The identity (T_i=2E_i) independently reproduces the (a_1+1) combination
in the trace-torsion Schur calibration.

## Remaining operation

Vertex construction is no longer the blocker for `t132`.  The next operation
is the zero-source 34-component propagator, exact algebraic Schur reduction,
and evaluation of the seagull and bubble poles.  The result fixes
(h^{TT}_1=y_{132}/2).

## Reproduction

~~~powershell
node verification/verify/verify_spin23_t132_complete_packet_source_vertices.mjs
~~~
