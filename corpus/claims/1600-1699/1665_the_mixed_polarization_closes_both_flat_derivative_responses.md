# The Mixed Polarization Closes Both Flat Derivative Responses

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** complete flat quadratic response through two derivatives

**Depends on:** [the explicit mixed polarization tensor](1664_the_flat_derivative_responses_reduce_to_one_explicit_mixed_polarization_tensor.md) and [the pure-axial derivative response](1663_the_pure_axial_loop_fixes_the_longitudinal_response_and_generates_no_transverse_kinetic_term.md)

**Evidence:** [flat-response ledger](../../../evidence/data/spin23-flat-complete-axial-loop-response-v1.json) and [exact rational verifier](../../../verification/verify/verify_spin23_flat_mixed_axial_q2_response.py)

## Result

The one mixed polarization integral isolated in claim 1664 can be reduced
exactly through second order in external momentum.  Its pole is purely
longitudinal:

\[
\boxed{
\delta B_{h-p}=-{\kappa A\over4\pi^2\epsilon},
\qquad
\delta Z_{h-p}=0.
}
\]

Adding the pure-axial result closes all three flat quadratic responses:

\[
\boxed{
\begin{aligned}
\delta A_{\rm flat}
&={\kappa A^2\over24\pi^2\epsilon b_X(a_1+1)},\\
\delta B_{\rm flat}
&=-{\kappa A\over24\pi^2\epsilon}
\left(6+{1\over a_1+1}\right),\\
\delta Z_{\rm flat}&=0.
\end{aligned}
}
\]

These are raw one-loop effective-action poles in the packet's exponential
split and de Donder gauge.  Counterterms carry the opposite sign.

## Reduction of the mixed integral

Let \(l=k+q\).  The axial propagator can be written as

\[
G_s^{\alpha\delta}(l)
={\delta^{\alpha\delta}\over A}
-{b_Xl^\alpha l^\delta\over A(A+b_Xl^2)}.
\]

The first term leaves only a massless \(1/k^2\) denominator multiplying a
polynomial in \(k\) and \(q\), and is scaleless in dimensional
regularization.  The second term gives

\[
\Pi_{\beta\gamma}(q)
={4\kappa b_X\over A}
\int_k{W_{\mu\nu,\beta}P^{\mu\nu,\rho\sigma}
W_{\rho\sigma,\gamma}
\over k^2(A+b_Xl^2)},
\]

where

\[
W_{\mu\nu,\beta}
=l^\alpha V_{\mu\nu,\alpha\beta}(k,-l,q).
\]

Feynman parameterization with \(p=k+xq\) gives

\[
{1\over k^2(A+b_Xl^2)}
={1\over b_X}\int_0^1dx;
{1\over[p^2+\Delta]^2},
\]

\[
\Delta=x{A\over b_X}+x(1-x)q^2.
\]

The required pole moments are

\[
\int_p{(p^2)^n\over(p^2+\Delta)^2}\bigg|_{\rm pole}
={(-1)^n(n+1)\Delta^n\over16\pi^2\epsilon}.
\]

Choose \(q\) along direction zero.  Exact symmetric-tensor contraction,
rotational averaging in four dimensions and the \(x\)-integral give the
two \(q^2\) coefficients, before the common factor
\(4\kappa/[A(16\pi^2\epsilon)]\), as

\[
\boxed{
N_L^{(2)}=-A^2q^2,
\qquad
N_T^{(2)}=0.
}
\]

It follows that

\[
\Pi_{00}^{\rm pole}\big|_{q^2}
=-{\kappa A\over4\pi^2\epsilon}q^2,
\qquad
\Pi_{ii}^{\rm pole}\big|_{q^2}=0\quad(i\perp q),
\]

which matches directly to the displayed \(\delta B_{h-p}\) and
\(\delta Z_{h-p}\).

## Structural meaning of the transverse zero

The vanishing of \(\delta Z\) is now a result for the complete reduced flat
bosonic calculation, not merely for the pure-axial sub-block.  Both the
quartic trace-reduction interaction and the mixed graviton diagram preserve
the rank-one divergence-channel structure at this order.

This does not establish an all-loop protection theorem.  Curvature,
higher-order operators, matter, or a different EFT truncation can generate
the allowed transverse invariant.

## New exhaustion boundary

The flat response problem is complete:

\[
(\delta A,\delta B,\delta Z)
\quad\hbox{are fixed.}
\]

Only

\[
(\delta\xi_R,\delta\xi_{\rm Ric})
\]

remain.  They require the covariant mixed Hessian on curved backgrounds and
cannot be recovered from any further flat-space momentum expansion.

## Reproduction

~~~powershell
python verification/verify/verify_spin23_flat_mixed_axial_q2_response.py
~~~
