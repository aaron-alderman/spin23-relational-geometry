# Seven Flat Nonaxial Jets and Two Curved Linear-Torsion Probes Close the Quadratic Response Design

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** exact minimal full-rank source design for the missing quadratic responses

**Depends on:** [the nine-direction deficiency](1676_the_quadratic_dimension_four_shell_has_nine_unresolved_response_directions.md)

**Evidence:** [source-design ledger](../../../evidence/data/spin23-nonaxial-quadratic-response-design-v1.json) and [verifier](../../../verification/verify/verify_spin23_nonaxial_quadratic_response_design.mjs)

## Result

The nine-response lower bound of claim 1676 is attainable.  The two existing
axial plane-wave probes, together with seven explicit flat nonaxial torsion
jets, give a nonsingular nine-by-nine response matrix for

\[
(H^{TT}_1,\ldots,H^{TT}_9).
\]

Two additional curved, linear-torsion probes give a nonsingular two-by-two
matrix for \((H^{RT}_3,H^{RT}_5)\).  Since the axial probes are already
computed, precisely the predicted seven flat plus two curved new evaluations
are sufficient to close the dimension-four quadratic source design.

This solves the background-selection problem.  It does not supply the nine
loop coefficients; those require evaluating the packet Hessian on the
specified sources.

## Flat derivative-torsion design

At one flat-space point write

\[
\nabla_\lambda T_{abc}=k_\lambda t_{abc},
\qquad t_{abc}=-t_{cba}.
\]

For a fully antisymmetric axial amplitude, longitudinal and transverse
plane waves give the rows

\[
r_{A,L}=(6,-6,0,0,0,0,0,0,0),
\]

\[
r_{A,T}=(6,-6,0,2,-2,2,-2,0,0).
\]

They have rank two.  To specify seven additional probes without a long list
of tensor components, use the deterministic generator

\[
u_{j+1}=1664525u_j+1013904223\pmod {2^{32}}.
\]

For seed \(s\), take the first four generated values to define
\(k_\lambda=(u\bmod7)-3\).  Continue through lexicographically ordered
triples \(a<c\), \(b=0,\ldots,3\), set

\[
t_{abc}=(u\bmod7)-3,
\qquad t_{cba}=-t_{abc},
\]

and set the other components to zero.  Seeds \(1,\ldots,7\) produce the
rows

\[
\begin{pmatrix}
2670&1020&570&882&318&536&343&127&400\\
2772&429&1111&393&190&526&67&143&324\\
2508&924&154&477&244&1046&221&-95&4\\
1330&469&735&391&117&388&154&171&361\\
4278&1955&805&1200&446&1676&776&636&100\\
3528&540&1332&1310&-283&1606&618&908&1\\
1488&678&522&270&157&508&151&154&25
\end{pmatrix}.
\]

Appending these to \((r_{A,L},r_{A,T})\) gives

\[
\boxed{
\det M_{TT}=-125421711372731400000\ne0.
}
\]

Thus the nine derivative-torsion invariants are separated exactly over the
integers.  The construction is a response design, not a stochastic claim;
the seeds merely compress seven explicit rational tensors.

## Curved linear-torsion design

Let

\[
d_{\beta\gamma}
=(\operatorname{div}_{(1)}T)_{\beta\gamma}.
\]

The two independent invariants evaluate as

\[
H^{RT}_3=R^{\beta\gamma}d_{\beta\gamma},
\qquad
H^{RT}_5=R\,\operatorname{tr}d.
\]

Choose the following pointwise sources:

1. \(R_{\mu\nu}=\operatorname{diag}(3,-1,-1,-1)\) and
   \(d=\operatorname{diag}(1,0,0,0)\), giving \((3,0)\);
2. \(R_{\mu\nu}=\delta_{\mu\nu}\) and \(d=\delta\), giving \((4,16)\).

Both divergence matrices are realized by torsion jets.  For each desired
diagonal entry \(d_{aa}\), choose \(m\ne a\), set
\(\nabla_mT_{maa}=d_{aa}\), and include the required antisymmetric partner
\(\nabla_mT_{aam}=-d_{aa}\).  Conformally flat Riemann tensors realize both
Ricci tensors at the matching point.

The response determinant is

\[
\boxed{
\det M_{RT}=det\begin{pmatrix}3&0\\4&16\end{pmatrix}=48\ne0.
}
\]

## Minimality and execution order

The design uses exactly seven new flat probes because two derivative-torsion
rows were already supplied by the axial longitudinal/transverse calculation.
It uses exactly two curved probes because the Bianchi quotient leaves two
independent \(R\nabla T\) operators.  Hence no design using fewer than nine
new scalar responses can close the missing quadratic directions.

The efficient execution order is:

1. evaluate the seven flat jets, where curvature vertices are absent;
2. invert \(M_{TT}\) and verify the axial rows as internal checks;
3. evaluate the two curved linear-torsion sources;
4. invert \(M_{RT}\); and
5. combine with the known torsionless \((C^2,R^2)\) block.

The remaining hard boundary is computational: the packet's coupled
metric--connection Hessian and ghosts must be traced on these nonaxial
backgrounds.  After that, cubic \(RTT,TT\nabla T\) and quartic \(T^4\)
responses remain a separate field-order programme.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_nonaxial_quadratic_response_design.mjs
~~~
