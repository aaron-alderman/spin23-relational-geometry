# The Response and Packet Torsion Conventions Are Related by One Slot Permutation

**Date:** 22 October 2026

**Status:** exact convention bridge and t132 irreducible decomposition

**Depends on:** [the t132 curvature-sector completion](1697_the_t132_xhat_squared_coframe_completion_is_an_exact_rank_30_rank_6_pair.md) and [quantization packet v1](../../programmes/closure/spin23-gravity-route/quantization-packet-v1.md)

**Evidence:** [convention ledger](../../../evidence/data/spin23-response-packet-torsion-convention-bridge-v1.json) and [verifier](../../../verification/verify/verify_spin23_response_packet_torsion_convention_bridge.mjs)

## Result

The Einstein-form response basis and the packet projector basis use different
slot orders for the same torsion tensor.  If

\[
S_{abc}=-S_{cba}
\]

is the response convention and

\[
U_{abc}=-U_{bac}
\]

is the packet convention, then

\[
\boxed{S_{abc}=U_{acb},\qquad U_{abc}=S_{acb}.}
\]

This permutation is an isometric bijection of the 24-dimensional component
spaces.  It removes the apparent convention conflict without changing any
response invariant.

For the selected source (S_{132}=1,S_{231}=-1), the packet tensor is simply

\[
U_{123}=1,\qquad U_{213}=-1.
\]

Its packet trace piece vanishes.  With the packet's Euclidean projector
normalization,

\[
\|{}^{(3)}U\|^2={2\over3},\qquad
\|{}^{(1)}U\|^2={4\over3},\qquad
\|U\|^2=2.
\]

Therefore the critical torsion-square weighting gives

\[
a_1\|{}^{(1)}U\|^2+a_3\|{}^{(3)}U\|^2
={4a_1\over3}-{a_1\over3}=a_1,
\]

using (a_3=-a_1/2).  This is the calibrated raw contraction that the
Hessian engine must reproduce before source differentiation.

## Consequence

The remaining torsion-square implementation is local and executable: form
the coframe-frame components (U_{abc}), apply the already verified packet
projectors, and use the critical weights.  No convention ambiguity remains.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_response_packet_torsion_convention_bridge.mjs
~~~
