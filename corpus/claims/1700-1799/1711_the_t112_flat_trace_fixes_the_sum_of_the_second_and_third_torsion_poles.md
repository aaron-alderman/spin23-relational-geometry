# The t112 Flat Trace Fixes the Sum of the Second and Third Torsion Poles

**Status:** analytic-q sign-reduced angular response completed

**Depends on:** [the t102 response](1710_the_t102_flat_trace_isolates_the_sixth_derivative_torsion_pole.md)

**Evidence:** [t112 ledger](../../../evidence/data/spin23-t112-analytic-q-response-v1.json), [response verifier](../../../verification/verify/verify_spin23_t112_response.py), and [shared scan](../../../verification/verify/scan_spin23_t021_analytic_q.py)

The sign-pair-reduced D4 cubature and analytic external-momentum trace give

\[
y_{112}=\frac{15a_1^2+31a_1+16}{2304\pi^2\epsilon},
\]

with maximum grid residual \(6.1\times10^{-6}\).  Because

\[
y_{112}=2h^{TT}_1+h^{TT}_2+h^{TT}_3,
\]

the known first response fixes

\[
\boxed{h^{TT}_2+h^{TT}_3=
\frac{-3a_1^2+28a_1+23}{2304\pi^2\epsilon}}.
\]

The selected next row is `t011`, whose remaining unknown is then only
\(h^{TT}_9\).
