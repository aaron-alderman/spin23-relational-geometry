# The t021 Flat Trace Isolates the Fourth Derivative-Torsion Pole

**Status:** analytic-q full-angular response completed

**Depends on:** [the t132 first response](1708_analytic_q_reduction_recovers_the_t132_rational_pole_surface_direction_by_direction.md)

**Evidence:** [profile census](../../../evidence/data/spin23-flat-profile-source-census-v1.json), [t021 ledger](../../../evidence/data/spin23-t021-analytic-q-response-v1.json), [response verifier](../../../verification/verify/verify_spin23_t021_response.py), and [live scan](../../../verification/verify/scan_spin23_t021_analytic_q.py)

The exact contorsion inversion

\[
 K_{abc}=\frac{T_{abc}+T_{bca}-T_{cab}}2
\]

generalizes the packet source engine to all seven flat response profiles.
Every profile has nonzero first- and second-order vertices and zero
reverse-Hermiticity residual at the common witness momentum.

For `t021`, the twelve antipodal representatives of the 24 D4 roots give a
full degree-five spherical cubature, so no profile-specific angular symmetry
is assumed.  Analytic external-momentum differentiation gives the surface

\[
 y_{021}=-\frac{8a_1^2+17a_1+9}{768\pi^2\epsilon},
\]

with maximum twelve-point residual \(2.68\times10^{-5}\).  Since the exact
response row is

\[
 y_{021}=2h^{TT}_1+h^{TT}_4,
\]

claim 1708 immediately yields

\[
 \boxed{h^{TT}_4=-\frac{21a_1^2+27a_1+10}
 {1152\pi^2\epsilon}}.
\]

The next selected profile is `t102`, whose row
\(y_{102}=2h^{TT}_1+2h^{TT}_6\) isolates a second new coefficient at the
same computational cost.

## Reproduction

~~~powershell
& 'C:\Users\aaron\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' verification/verify/scan_spin23_flat_profile_vertices.py
& 'C:\Users\aaron\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' verification/verify/verify_spin23_t021_response.py
~~~
