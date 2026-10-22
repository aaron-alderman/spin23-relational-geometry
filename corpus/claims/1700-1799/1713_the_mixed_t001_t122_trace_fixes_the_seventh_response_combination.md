# The Mixed t001+t122 Trace Fixes the Seventh Response Combination

**Status:** analytic-q sign-reduced angular response completed

**Depends on:** [the t011 ninth response](1712_the_t011_flat_trace_isolates_the_ninth_derivative_torsion_pole.md)

**Evidence:** [mixed ledger](../../../evidence/data/spin23-t001-t122-analytic-q-response-v1.json), [response verifier](../../../verification/verify/verify_spin23_t001_t122_response.py), and [shared scan](../../../verification/verify/scan_spin23_t021_analytic_q.py)

The mixed flat probe gives

\[
y_{001+122}=\frac{3a_1^2+5a_1+2}{2304\pi^2\epsilon}.
\]

Using its response row and the completed first, fourth and sixth
coefficients gives

\[
\boxed{2h^{TT}_2+h^{TT}_7=
\frac{6a_1^2+11a_1+5}{2304\pi^2\epsilon}}.
\]

The worst raw-grid residual is \(4.74\times10^{-4}\) and contracts by the
same approximately fourfold factor under each doubling of \(B\) seen in the
previous radial fits.  The final new flat probe is `t001`; it fixes the last
independent combination containing \(h^{TT}_8\).
