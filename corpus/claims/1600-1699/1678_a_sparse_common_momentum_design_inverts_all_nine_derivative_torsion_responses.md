# A Sparse Common-Momentum Design Inverts All Nine Derivative-Torsion Responses

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** exact sparse replacement and closed-form inverse for the flat nonaxial design

**Depends on:** [the first full-rank nonaxial design](1677_seven_flat_nonaxial_jets_and_two_curved_linear_torsion_probes_close_the_quadratic_response_design.md)

**Evidence:** [sparse-design ledger](../../../evidence/data/spin23-sparse-derivative-torsion-response-inverse-v1.json) and [verifier](../../../verification/verify/verify_spin23_sparse_derivative_torsion_response_inverse.mjs)

## Result

The dense seeded flat design of claim 1677 can be replaced by a substantially
simpler exact design.  All seven new probes use the same momentum

\[
k=e_0
\]

and each contains either one or two nonzero independent torsion amplitudes.
Together with the already computed axial longitudinal and transverse rows,
the response determinant is

\[
\boxed{\det M_{TT}^{\rm sparse}=-48.}
\]

The inverse has entries only in
\(\{0,\pm1/6,\pm1/3,\pm1/2,\pm1,\pm3/2,\pm2,\pm3\}\).
This removes the practical background-design complexity: future loop poles
on nine simple profiles can be converted to all nine derivative-torsion
coefficients by a fixed rational matrix.

## Sparse probes

Use

\[
\nabla_\lambda T_{abc}=k_\lambda t_{abc},
\qquad t_{abc}=-t_{cba},
\qquad k_\lambda=\delta_{\lambda0}.
\]

The notation \(t_{abc}\) below means that component equals \(+1\), its
first/third antisymmetric partner equals \(-1\), and all unlisted independent
components vanish.  The seven new profiles are

\[
t_{001},\quad t_{011},\quad t_{021},\quad t_{102},\quad
t_{112},\quad t_{132},\quad t_{001}+t_{122}.
\]

In the ordered basis \((H^{TT}_1,\ldots,H^{TT}_9)\), their rows are

\[
\begin{pmatrix}
2&1&1&1&0&2&1&1&0\\
2&1&1&1&1&0&0&0&1\\
2&0&0&1&0&0&0&0&0\\
2&0&0&0&0&2&0&0&0\\
2&1&1&0&0&0&0&0&0\\
2&0&0&0&0&0&0&0&0\\
4&2&0&1&0&2&1&0&0
\end{pmatrix}.
\]

Prepending the axial rows

\[
(6,-6,0,0,0,0,0,0,0),
\qquad
(6,-6,0,2,-2,2,-2,0,0)
\]

gives the stated determinant.

## Closed-form inverse

Let the nine measured pole coefficients, in row order, be

\[
y=(y_{A,L},y_{A,T},y_{001},y_{011},y_{021},y_{102},
y_{112},y_{132},y_{001+122})^T.
\]

Then the coefficient vector
\(h=(h^{TT}_1,\ldots,h^{TT}_9)^T\) is

\[
h=M^{-1}_{TT}y,
\]

with

\[
M^{-1}_{TT}=
\begin{pmatrix}
0&0&0&0&0&0&0&1/2&0\\
-1/6&0&0&0&0&0&0&1/2&0\\
1/6&0&0&0&0&0&1&-3/2&0\\
0&0&0&0&1&0&0&-1&0\\
1/6&-1/2&0&0&2&3/2&0&-1/2&-1\\
0&0&0&0&0&1/2&0&-1/2&0\\
1/3&0&0&0&-1&-1&0&-1&1\\
-1/3&0&1&0&0&0&-1&3&-1\\
-1/6&1/2&0&1&-3&-3/2&-1&3/2&1
\end{pmatrix}.
\]

The particularly simple first row gives the internal check

\[
h^{TT}_1={1\over2}y_{132}.
\]

Other triangular-looking entries provide further debugging handles before
the denser combinations are formed.

## Consequence

Claim 1677 established existence of a minimal source suite.  The present
replacement makes its flat part operationally economical: one momentum,
unit amplitudes, at most two components, and an explicit inverse.  The two
curved \((H^{RT}_3,H^{RT}_5)\) probes of claim 1677 are already comparably
sparse.  In the probe order used there, their response matrix and inverse are

\[
M_{RT}=\begin{pmatrix}3&0\\4&16\end{pmatrix},
\qquad
M_{RT}^{-1}=\begin{pmatrix}1/3&0\\-1/12&1/16\end{pmatrix}.
\]

Thus, for measured poles \(z=(z_A,z_B)^T\),

\[
h^{RT}_3={z_A\over3},
\qquad
h^{RT}_5=-{z_A\over12}+{z_B\over16}.
\]

No further background-design work is needed for the quadratic shell.  The
remaining task is the genuinely new functional-trace calculation on these
seven flat profiles and two curved profiles; both coefficient-extraction
blocks are now explicit.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_sparse_derivative_torsion_response_inverse.mjs
~~~
