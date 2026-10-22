# The Reduced Axial Hessian Has One Propagating Channel and a Directional Schur Boundary

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** exact frozen-jet axial symbol and weak-chart boundary

**Depends on:** [the exact covariant trace reduction](1658_exact_trace_elimination_gives_a_covariant_rational_axial_kinetic_factor.md)

**Evidence:** [reduced-Hessian symbol ledger](../../../evidence/data/spin23-reduced-axial-hessian-symbol-v1.json) and [verifier](../../../verification/verify/verify_spin23_reduced_axial_hessian_symbol.mjs)

## Result

The quartic truncation of the trace-reduced axial action is

\[
\mathcal L_p={A\over2}p^2+{b_X\over2}(Dp)^2
+\lambda_4p^2(Dp)^2,
\qquad
\lambda_4={\kappa b_X^2\over3(a_1+1)}.
\]

For \(p=\bar p+s\), write \(\bar X=D\bar p\).  Its complete axial
quadratic term is

\[
\mathcal L_p^{(2)}={A\over2}s^2+{b_X\over2}(Ds)^2
+\lambda_4\left[
\bar p^2(Ds)^2+4(\bar p\cdot s)\bar XDs+\bar X^2s^2
\right].
\]

At a point, freeze the background jets and use a Euclidean covector \(k\).
Define

\[
\mu^2=A+2\lambda_4\bar X^2,
\qquad
Z=b_X+2\lambda_4\bar p^2,
\qquad
c=4\lambda_4\bar X.
\]

The self-adjoint Fourier symbol is

\[
\boxed{
K_{\mu\nu}(k)=
\mu^2\delta_{\mu\nu}+Zk_\mu k_\nu
+ic(\bar p_\mu k_\nu-k_\mu\bar p_\nu).
}
\]

The apparently first-order cross term is essential: the derivative is
antisymmetric under integration by parts while its index matrix is also
antisymmetric, so their product is self-adjoint.

## Exact determinant

Let

\[
\bar p_\perp^2=\bar p^2-{(\bar p\cdot k)^2\over k^2}.
\]

Two directions orthogonal to the plane spanned by \(k\) and \(\bar p\)
remain algebraic with eigenvalue \(\mu^2\).  In that plane the symbol is

\[
\begin{pmatrix}
\mu^2+Zk^2&-ic|k|\,|\bar p_\perp|\\
+ic|k|\,|\bar p_\perp|&\mu^2
\end{pmatrix}.
\]

Consequently

\[
\boxed{
\det K=(\mu^2)^2\left\{
\mu^2(\mu^2+Zk^2)
-c^2\left[k^2\bar p^2-(k\cdot\bar p)^2\right]
\right\}.
}
\]

Thus the second-order principal block has rank one.  Three axial
polarizations are auxiliary before their mixing is eliminated; only the
divergence channel propagates.

## Directional Schur boundary

For \(\mu^2\ne0\), eliminating the single transverse direction inside the
\((k,\bar p)\) plane gives the scalar kinetic coefficient

\[
\boxed{
Z_{\rm eff}(\hat k)=Z-{c^2\over\mu^2}\bar p_\perp^2.
}
\]

On a Euclidean background with \(\mu^2>0\), uniform positivity for every
direction requires and, at frozen-jet level, is equivalent to

\[
\mu^2>0,
\qquad
Z-{c^2\bar p^2\over\mu^2}>0.
\]

In the original parameters the second inequality is

\[
b_X+2\lambda_4\bar p^2
-{16\lambda_4^2\bar X^2\bar p^2
\over A+2\lambda_4\bar X^2}>0.
\]

This is a new background-dependent Schur boundary, distinct from the trace
auxiliary degeneracy \(C_t+4b_Xp^2/9=0\).  If \(A>0\), \(b_X>0\), and
\(\lambda_4>0\), a nonempty neighbourhood of
\((\bar p,\bar X)=(0,0)\) is uniformly positive.  The matching expansion is
therefore internally controlled there, but positivity cannot be extended to
arbitrary source amplitudes without checking the displayed inequality.

For divergence-free backgrounds, \(\bar X=0\), the mixing vanishes exactly:

\[
\det K=A^3\left[A+(b_X+2\lambda_4\bar p^2)k^2\right].
\]

This special slice is one scalar determinant plus three ultralocal factors.
It is a useful check, but it cannot determine response coefficients that
require nonzero \(D\bar p\).

## Remaining calculation

The axial-only fluctuation structure is now explicit.  The unresolved
operation is the covariant one-loop trace of the coupled metric--axial
Hessian on backgrounds with nonzero \(\bar X\), including derivatives of
the frozen coefficients, followed by the five-response projection.  A
constant or divergence-free background would erase precisely the mixing
needed for that projection and therefore is not an admissible shortcut.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_reduced_axial_hessian_symbol.mjs
~~~
