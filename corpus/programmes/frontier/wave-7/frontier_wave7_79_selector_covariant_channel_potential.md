# Frontier Wave 7.79: Selector-Covariant Channel Potential

**Date:** 25 October 2026  
**Status:** exact lowest-degree Gram selection; full target frame remains external  
**Ledger:** [post-Q programme](post_q_five_option_programme_v1.json)  
**Certificate:** [potential verifier](../../../../verification/verify/verify_selector_covariant_channel_potential.mjs)

## Result

Because the invariant cross Hom-space is zero, the nonzero channel must be an
order parameter or a covariant spurion. The lowest-degree transparent
potential that selects its measured Gram data is

\[
V(E;G_*)
=\alpha\,[\operatorname{tr}(E^TE-G_*)]^2
+\beta\,\|E^TE-G_*\|_F^2,
\qquad \alpha\ge0,\ \beta>0,
\]

with

\[
G_*=\begin{pmatrix}1&3/13\\3/13&1\end{pmatrix}.
\]

It is covariant under

\[
E\mapsto RES^T,
\qquad
G_*\mapsto SG_*S^T.
\]

Its minima satisfy

\[
E^TE=G_*.
\]

The squared singular values are consequently

\[
\frac{16}{13},\qquad\frac{10}{13}.
\]

## Scalar anisotropy form

Writing \(x=\sigma_1^2\), \(y=\sigma_2^2\), the equivalent reduced
potential

\[
V=\alpha(x+y-v^2)^2+\beta(x-y)^2-h(x-y)
\]

has the full-rank vacuum

\[
x+y=v^2,
\qquad
x-y=\frac{h}{2\beta}.
\]

The checkpoint follows from

\[
v^2=2,
\qquad
h=\frac{12}{13}\beta.
\]

The Hessian eigenvalues are \(4\alpha\) and \(4\beta\). In the unspurioned
limit \(h=0\), the isolated interior minimum returns to equal singular
values, reproducing Wave 7.60.

## Vacuum manifold

Fixing \(G_*\) does not fix the target frame. The minima are

\[
E=U\sqrt{G_*},
\qquad U\in V_2(\mathbb R^3)\cong SO(3).
\]

Thus the potential selects the measured Gram orbit but leaves a
three-dimensional target-orientation manifold. Selecting the complete matrix
requires a target frame, boundary condition or rectangular cross spurion.

This is the correct division of labour: the source spurion selects
anisotropy; a separate target datum selects spatial/environmental placement.

