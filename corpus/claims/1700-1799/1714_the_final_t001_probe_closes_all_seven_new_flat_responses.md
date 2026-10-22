# The Final t001 Probe Closes All Seven New Flat Responses

**Status:** seven-profile flat response block complete

**Depends on:** [the mixed response](1713_the_mixed_t001_t122_trace_fixes_the_seventh_response_combination.md)

**Evidence:** [t001 ledger](../../../evidence/data/spin23-t001-analytic-q-response-v1.json), [response verifier](../../../verification/verify/verify_spin23_t001_response.py), and [shared scan](../../../verification/verify/scan_spin23_t021_analytic_q.py)

The final new flat probe gives the same pole surface as the mixed probe,

\[
y_{001}=y_{001+122}=\frac{3a_1^2+5a_1+2}{2304\pi^2\epsilon},
\]

with maximum raw-grid residual \(2.09\times10^{-5}\).  Subtracting their
exact response rows therefore yields

\[
\boxed{h^{TT}_8=2h^{TT}_1+h^{TT}_2-h^{TT}_3}.
\]

The seven locally missing flat evaluations are now all complete:
`t001`, `t011`, `t021`, `t102`, `t112`, `t132`, and `t001+t122`.
The remaining operation in the flat quadratic block is not another loop
trace.  It is to translate the already completed axial-longitudinal and
axial-transverse poles into the same torsion-source normalization and apply
the exact nine-by-nine response inverse.
