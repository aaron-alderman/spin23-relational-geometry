# The t132 Packet Connection Self-Vertices Close in Two Exact Matrices

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** exact fixed-coframe connection self-block through second source order

**Depends on:** [the packet-specific trace isolation](1679_the_general_pgt_heat_kernel_cannot_be_specialized_to_the_critical_packet.md) and [the global path selector](../../programmes/closure/spin23-gravity-route/global-path-selection-v1.md)

**Evidence:** [vertex ledger](../../../evidence/data/spin23-t132-xhat-connection-self-vertices-v1.json) and [verifier](../../../verification/verify/verify_spin23_t132_xhat_connection_self_vertices.mjs)

## Result

The complete fixed-coframe connection--connection source dependence of the
packet action can be constructed exactly for the first sparse profile.  In
the full-index normalization used by the verifier, write

\[
\widehat X[K]=L(K)+C(K,K),
\]

\[
L(K)=\epsilon^{\mu\nu ab}\partial_\mu K_{\nu ab},
\qquad
C(A,B)=\epsilon^{\mu\nu ab}A_{\mu ac}B_{\nu cb}.
\]

For the `t132` contorsion (P) of claim 1679, with source momentum
\(q=e_0\),

\[
\boxed{L(P)=-1,\qquad C(P,P)=0.}
\]

Moreover the linear cross map

\[
X_P(z)=C(P,z)+C(z,P)
\]

has only one nonzero component in the ordered 24-component connection basis:

\[
\boxed{X_P(z)=2z_{3,[03]}.}
\]

Consequently the source-quadratic self-vertex is the rank-one matrix

\[
H_{kk,2}(z,w)=X_P(z)X_P(w),
\]

with a single nonzero entry equal to (4).

## Source-linear vertex

Let the two quantum connection legs carry momenta (p) and
\(p'=-p-q).  Differentiating (b_X\widehat X^2/2) gives, up to the common
factor (b_X),

\[
\boxed{
\begin{aligned}
H_{kk,1}(z,w)={}&L_p(z)X_P(w)+L_{p'}(w)X_P(z)\\
&+L_q(P)\,[C(z,w)+C(w,z)],\\
H_{kk,2}(z,w)={}&X_P(z)X_P(w)
+C(P,P)[C(z,w)+C(w,z)].
\end{aligned}}
\]

The second term in the last line vanishes for this source.  At the rational
witness momentum

\[
p=(2,3,5,7),\qquad p'=(-3,-3,-5,-7),
\]

the exact matrices obey

\[
\operatorname{rank}H_{kk,1}=24,
\qquad
\operatorname{rank}H_{kk,2}=1.
\]

Thus the sparse seagull does not imply a sparse bubble: the nonzero
background (L(P)) multiplies the second curvature variation and couples all
connection directions in the source-linear Hessian.

## Completeness and remaining block

At fixed coframe, the Einstein--Hilbert and torsion-square terms are at most
quadratic in the total connection, so their connection self-Hessians are
independent of the connection source.  The two matrices above are therefore
the complete (kk) source derivatives of the packet action.

They are not yet the complete (H_1,H_2) needed in the functional trace.
The exponential coframe makes the contractions, Hodge dual, volume density,
torsion and curvature source-dependent.  It supplies (hk,kh,hh) vertices,
and the zero-source propagator itself has metric--connection mixing.  Tracing
the isolated (kk) block would therefore violate the required Schur
reduction.

The selected path remains Q, but its next irreducible subtask is narrower:
construct the coframe completion of these two matrices and verify that its
pure-axial specialization reproduces the already known mixed-polarization
vertex before performing any loop integration.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_t132_xhat_connection_self_vertices.mjs
~~~
