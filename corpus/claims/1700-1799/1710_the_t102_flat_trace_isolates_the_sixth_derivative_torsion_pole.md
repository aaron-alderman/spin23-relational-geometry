# The t102 Flat Trace Isolates the Sixth Derivative-Torsion Pole

**Status:** analytic-q full-angular response completed

**Depends on:** [the first and fourth responses](1709_the_t021_flat_trace_isolates_the_fourth_derivative_torsion_pole.md)

**Evidence:** [t102 ledger](../../../evidence/data/spin23-t102-analytic-q-response-v1.json), [response verifier](../../../verification/verify/verify_spin23_t102_response.py), and [shared live scan](../../../verification/verify/scan_spin23_t021_analytic_q.py)

The full D4 angular cubature and analytic external-momentum reduction give

\[
 y_{102}=\frac{7a_1^2+15a_1+8}{768\pi^2\epsilon},
\]

with maximum residual \(4.1\times10^{-5}\) on the twelve-point coupling
grid.  The response row is

\[
 y_{102}=2h^{TT}_1+2h^{TT}_6.
\]

Combining it with claim 1708 therefore fixes

\[
 \boxed{h^{TT}_6=\frac{3a_1^2+42a_1+31}
 {4608\pi^2\epsilon}}.
\]

For both `t021` and `t102`, the two relative-sign representatives of every
D4 root pair agree.  The next profile may consequently use six rather than
twelve antipodal representatives, with the completed twelve-point scans as
the symmetry certificate.  The selected row is `t112`, which fixes
\(h^{TT}_2+h^{TT}_3\).
