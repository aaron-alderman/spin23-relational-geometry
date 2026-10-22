# Two Bianchi-Compatible Fourier Probes Close the Curved Linear-Torsion Poles

**Date:** 23 October 2026

**Status:** complete curved linear-torsion response and quadratic-shell closure

**Depends on:** [the exact sparse response inverse](../1600-1699/1678_a_sparse_common_momentum_design_inverts_all_nine_derivative_torsion_responses.md) and [the complete flat pole vector](1715_the_complete_flat_derivative_torsion_pole_vector_is_exactly_inverted.md)

**Evidence:** [curved response ledger](../../../evidence/data/spin23-curved-rt-analytic-q-response-v1.json), [response verifier](../../../verification/verify/verify_spin23_curved_rt_response.py), and [Fourier-design verifier](../../../verification/verify/verify_spin23_curved_rt_fourier_design.py)

## Result

The two remaining dimension-four quadratic poles are

\[
\boxed{h^{RT}_3={3(a_1+1)\over256\pi^2\epsilon}},\qquad
\boxed{h^{RT}_5=-{459a_1+491\over13824\pi^2\epsilon}}.
\]

Together with claim 1715, this closes every derivative-torsion and
curvature--derivative-torsion direction in the quadratic shell.

## Bianchi-compatible source pair

Take opposite Fourier waves with contorsion momentum \(q=e_0\), metric
momentum \(-q\), and torsion amplitude \(t_{011}=1\).  The metric wave is
implemented as a symmetric exponential-coframe source together with its
linear Levi--Civita connection; hence it produces curvature but no spurious
physical torsion.  The two coframe polarizations \(f_{11}=1\) and \(f_{22}=1\)
give, after dividing the common Fourier factor \(i\),

\[
M_{RT}^{\rm Fourier}=\begin{pmatrix}1&2\\0&2\end{pmatrix},\qquad
\det M_{RT}^{\rm Fourier}=2.
\]

Thus \(h^{RT}_3=y_A-y_B\) and \(h^{RT}_5=y_B/2\).  Unlike arbitrary
pointwise Ricci jets, these waves obey the linearized Bianchi identity mode
by mode.

## Determinant trace

The flat 34-field packet engine was extended only by a background coframe
wave and its torsion-free spin connection.  At each loop momentum the mixed
source coefficient is the \(q^3\) term of

\[
{1\over2}\operatorname{Tr}(G H_{fK}^{(2)})
-{1\over2}\operatorname{Tr}(G H_K^{(1)}G_qH_f^{(1)}).
\]

The external-momentum matrices reconstruct as quartic polynomials with
maximum relative residuals \(9.5\times10^{-15}\) and
\(4.7\times10^{-15}\).  Six antipodal \(D_4\) representatives and seven
radial points isolate the \(r^{-4}\) coefficient.  On
\(a_1=1,2,3,4\) and \(B=1/2,1,2\), the angular candidates are

\[
\bar y_A=-{189a_1+205\over216},\qquad
\bar y_B=-{459a_1+491\over432},
\]

before the universal \(1/(16\pi^2\epsilon)\) factor.  The three \(B\)
values agree within the radial extrapolation error.

The zero external-momentum node is deliberately excluded from interpolation:
there the pure metric-square and torsion-square modes collide at total
momentum zero and contaminate the mixed coefficient.  Five nonzero nodes
plus an independent nonzero check remove that degeneracy.

## Consequence

The complete quadratic one-loop shell is now a local, reproducible result.
The next selected branch is not another quadratic response; it is the
torsion-inclusive order-reduced EFT and its universal running envelope.

## Reproduction

~~~powershell
python verification/verify/verify_spin23_curved_rt_fourier_design.py
python verification/verify/verify_spin23_curved_rt_response.py
~~~
