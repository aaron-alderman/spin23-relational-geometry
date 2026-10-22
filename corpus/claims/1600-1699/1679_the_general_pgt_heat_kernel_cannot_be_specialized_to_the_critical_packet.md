# The General PGT Heat Kernel Cannot Be Specialized to the Critical Packet

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** exact principal-rank and gauge-complex obstruction; packet-specific trace target isolated

**Depends on:** [the sparse response inverse](1678_a_sparse_common_momentum_design_inverts_all_nine_derivative_torsion_responses.md), [the packet principal-symbol census](1642_the_packet_hessian_has_one_connection_derivative_direction_and_requires_a_measure_preserving_schur_reduction.md), [the source-blind packet ghosts](1654_ghosts_and_ultralocal_jacobians_are_axial_source_blind_leaving_only_the_mixed_bosonic_hessian.md), and [the complete massive-branch measure](1673_the_complete_second_class_measure_is_ultralocal_on_the_massive_branch.md)

**Evidence:** [specialization-obstruction ledger](../../../evidence/data/spin23-critical-packet-general-pgt-specialization-obstruction-v1.json) and [verifier](../../../verification/verify/verify_spin23_critical_packet_general_pgt_specialization_obstruction.mjs)

## Result

The published one-loop coefficients for the minimal Yang--Mills-like PGT
cannot be specialized to the critical packet by substituting couplings.  At
every nonzero flat momentum the two gauge-fixed connection symbols have
different rank:

\[
\boxed{
\operatorname{rank}\sigma_2(H_{kk}^{\rm packet})=1,
\qquad
\operatorname{rank}\sigma_2(H_{ZZ}^{F^2})=24.
}
\]

This is a discontinuity of the kinetic complex, not a change of basis.  The
twenty-three algebraic packet directions cannot be recovered by taking a
regular limit of an inverse minimal Laplacian on all twenty-four connection
components.  The published heat-kernel coefficients therefore remain useful
for the counterterm basis and methodology, but not as beta coefficients for
the frozen packet.

## Rank proof

Index the connection fluctuation by \(I=(\nu,[ab])\), giving 24 components.
On a flat coframe, the linearized packet pseudoscalar curvature is, up to an
irrelevant nonzero normalization,

\[
\delta\widehat X(p)=v_I(p)k_I(p),
\qquad
v_{\nu,[ab]}(p)=\epsilon^{\mu\nu ab}p_\mu.
\]

Hence the derivative part of the \(b_X\widehat X^2/2\) Hessian is

\[
\sigma_2(H_{kk}^{\rm packet})=b_X,v(p)v(p)^T.
\]

For \(p\ne0\), \(v(p)\ne0\), so this outer product has rank one.  The
Einstein--Hilbert and torsion-square terms add algebraic connection entries
but no second-order connection symbol.

By contrast, the comparison theory starts from a full
\(c_1F_{\mu\nu ab}F^{\mu\nu ab}\) kinetic term.  Its Lorentz gauge
\(\nabla^\nu Z_{\nu ab}=0\) cancels the nonminimal longitudinal term and
leaves

\[
\sigma_2(H_{ZZ}^{F^2})=c_1p^2 I_{24},

\]

which has rank 24 when \(c_1p^2\ne0\).  Rank is invariant under every
invertible local field redefinition, so the two principal symbols are not
equivalent.

## Why the zero-coupling limit is singular

The comparison calculation canonically rescales

\[
Z\longmapsto Z/\sqrt{c_1}
\]

before putting the Hessian into minimal Laplace form.  Its lower-order
operator contains \(a_1/c_1\), and the stated heat-kernel regime requires
\(a_1/c_1\ll E^2\).  Sending the full-curvature coupling \(c_1\) to zero
therefore makes both the field normalization and the expansion parameter
singular.  Replacing \(F^2\) by the rank-one contraction
\(\widehat X^2\) is even more discontinuous: no nonzero value of \(c_1\)
has the packet symbol.

## The ghost determinants also differ

The comparison gauge differentiates the connection gauge condition.  It has
differential Lorentz ghosts and a torsion-dependent diffeomorphism ghost
operator.  The frozen packet instead uses

\[
F_\mu(h;\bar e),\qquad G_{ab}=f_{[ab]},\qquad H_a=v_a.
\]

At fixed background coframe these functions do not depend on the independent
background connection.  Consequently the packet FP determinant has zero
first and second derivatives with respect to every torsion source, not just
the axial source.  Importing a published total coefficient would import a
ghost response belonging to a different gauge complex.

The ordinary packet Jacobians are likewise connection-source independent.
The complete Faddeev--Senjanovic factor depends ultralocally on
\(J\) and \(\widehat X\); its functional logarithm is proportional to
\(\delta^{(d)}(0)\) and has no dimensional-regularization MS-bar pole.

## Exact remaining trace target

The recommended first profile is already an explicit connection source.  Set

\[
T_{132}=\tau e^{iqx^0},\qquad
T_{231}=-\tau e^{iqx^0},
\]

with all other torsion components zero.  Solving
\(T_{abc}=K_{abc}-K_{cba}\), with \(K_{abc}=-K_{acb}\), gives

\[
\begin{array}{c|rrrrrr}
abc&123&132&213&231&312&321\\ \hline
K_{abc}/(\tau e^{iqx^0})&-1/2&1/2&1/2&-1/2&1/2&-1/2.
\end{array}
\]

The reconstruction is exact, this source has

\[
(H^{TT}_1,\ldots,H^{TT}_9)=(2,0,0,0,0,0,0,0,0),
\]

and its contraction with the packet derivative vector is nonzero
(\(v\cdot K=-1/2\) in the ledger normalization).  Thus it both isolates
\(H^{TT}_1\) at response level and exercises the propagating rank-one
connection channel.  It is a stronger first implementation test than a
profile that touches only auxiliary directions.

Let \(\tau\) scale any of the seven sparse flat torsion profiles and expand
the packet's complete gauge-fixed bosonic Hessian as

\[
H_B[\tau T]=H_0+\tau H_1[T]+\tau^2H_2[T,T]+O(\tau^3),
\qquad G=H_0^{-1},
\]

where the inverse is understood after the packet's measure-preserving
algebraic Schur reduction.  All non-bosonic source derivatives vanish in the
chosen scheme.  The required quadratic pole is therefore exactly

\[
\boxed{
\Gamma^{(1)}_{T^2}\big|_{\rm pole}
=\left[
{1\over2}\operatorname{Tr}(G H_2)
-{1\over4}\operatorname{Tr}(G H_1G H_1)
\right]_{\rm pole}.
}
\]

This formula includes both seagull and bubble contributions; neither may be
dropped before the packet-specific vertices are known.  Applying it to the
seven rows of claim 1678 and multiplying by the stored rational inverse gives
all nine \((\nabla T)^2\) coefficients.  The two curved rows require the
same construction to first order in curvature.

## New exhaustion boundary

The literature-specialization branch is closed.  No additional background
selection, ghost determinant, ordinary Jacobian or second-class logarithmic
pole remains to be computed for the quadratic response.  The smallest new
object is now unambiguous: construct the packet-gauge tensors \(H_1[T]\) and
\(H_2[T,T]\) for the displayed \(t_{132}\) connection source, which gives
\(h^{TT}_1=y_{132}/2\)), verify the Schur-reduced propagator against the
known axial rows, and only then evaluate the two traces above.

## Primary source

O. Melichev and R. Percacci,
[*On the Renormalization of Poincare Gauge Theories*](https://arxiv.org/abs/2307.02336),
especially equations (2.17), (3.10), (3.21)--(3.26), (3.35)--(3.36), and
(4.17)--(4.18).  Those equations exhibit the full \(F^2\) action, the
connection Lorentz gauge, the \(1/\sqrt{c_1}\) rescaling, the minimal
Laplace operator and its singular \(a_1/c_1\) lower-order term.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_critical_packet_general_pgt_specialization_obstruction.mjs
~~~
