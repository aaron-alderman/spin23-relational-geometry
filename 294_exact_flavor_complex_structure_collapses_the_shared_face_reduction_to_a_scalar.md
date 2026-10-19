# Exact Flavor Complex Structure Collapses the Shared Face Reduction to a Scalar

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B06, B08 and B11  
**Claim status:** exact finite-dimensional obstruction and factor-separation repair; physical identification of the two face directions remains open

## 1. A hidden identification in the graded-real construction

The graded-real parent was written as

\[
\mathbb R^2_{\rm face}\otimes\mathbb R^3_{\rm flavor}\cong\mathbb R^6,
\qquad H_6(\mathbb R)=\operatorname{Sym}_6(\mathbb R).
\]

The CP construction then introduced

\[
J=\begin{pmatrix}0&-I_3\\ I_3&0\end{pmatrix},
\qquad J^2=-I_6,
\]

to identify \(\mathbb R^6\cong\mathbb C^3\). This uses the same two-dimensional block index as real/imaginary doubling.

That is a substantive identification:

\[
\boxed{
\text{physical relational face}
\stackrel{?}{=}
\text{real/imaginary complex doubling}.}
\]

It was not derived by the previous CP certificate.

## 2. Exact \(J\)-preservation selects only \(H_3(\mathbb C)\)

A real symmetric matrix commuting with \(J\) has the form

\[
M=\begin{pmatrix}A&-B\\ B&A\end{pmatrix},
\qquad A^T=A,
\qquad B^T=-B.
\]

Therefore

\[
\operatorname{Sym}_6(\mathbb R)\cap\operatorname{Cent}(J)
\cong H_3(\mathbb C),
\]

of dimension \(6+3=9\). This subspace is Jordan closed, inverse closed where invertible, and carries the ordinary complex flavor algebra exactly.

## 3. Positive flavor reduction has only a scalar image

Let a positive flavor state be represented by a real symmetric positive matrix \(W\), and reduce blockwise by

\[
E_W(X)=\frac{\operatorname{Tr}(WX)}{\operatorname{Tr}W}.
\]

For every antisymmetric \(B\),

\[
\operatorname{Tr}(WB)=0.
\]

Hence

\[
(\operatorname{id}_2\otimes E_W)(M)
=\frac{\operatorname{Tr}(WA)}{\operatorname{Tr}W}
\begin{pmatrix}1&0\\0&1\end{pmatrix}.
\]

Thus

\[
\boxed{
(\operatorname{id}_2\otimes E_W)
\big(\operatorname{Sym}_6(\mathbb R)\cap\operatorname{Cent}(J)\big)
=\mathbb R I_2,
}
\]

not \(H_2(\mathbb R)\). The image has dimension one rather than three.

The missing \(\sigma_z\) and \(\sigma_x\) face directions both fail to commute with this \(J\). Exact complex-linearity on the shared two-dimensional index is therefore incompatible with a full positive external face carrier.

## 4. What survives from the previous CP result

The nonzero realified Jarlskog invariant remains correct. It proves that \((H_6(\mathbb R),J,K)\) can encode complex three-flavor CP data.

What it does **not** prove is that this same six-dimensional realization simultaneously contains a full external \(H_2(\mathbb R)\) carrier while preserving \(J\) exactly. The two claims pull in opposite directions when they share the same two-dimensional factor.

This converts the earlier “preserve \(J\)” requirement into a sharper branch point:

1. preserve \(J\) exactly and accept only a scalar external image;
2. allow response operators outside \(\operatorname{Cent}(J)\), so \(J\) is a probe/background rather than an exact dynamical symmetry;
3. make \(J\) covariantly varying or spontaneously selected;
4. separate the physical face factor from flavor complex doubling.

## 5. The clean factor-separation repair

Use

\[
\mathbb R^2_{\rm face}
\otimes
\mathbb R^6_{\rm flavor-realification}
\cong\mathbb R^{12},
\]

with

\[
J_{\rm total}=I_2\otimes J_{\rm flavor}.
\]

Every face operator \(S\otimes I_6\), including \(I,\sigma_x,\sigma_z\), commutes with \(J_{\rm total}\). The full three-dimensional \(H_2(\mathbb R)\) carrier and exact complex flavor structure can then coexist without identifying their two-dimensional indices.

The unconstrained real-symmetric ambient parent is

\[
H_{12}(\mathbb R),
\qquad \dim H_{12}(\mathbb R)=78,
\]

and its extra directions need a symmetry, gap, quotient or source interpretation. If the independent flavor complex structure is preserved exactly, the smaller inverse-closed parent is in fact \(H_6(\mathbb C)\), dimension 36; see [the independent face/flavor envelope](295_independent_face_and_complex_flavor_close_naturally_on_h6c_not_h12r.md).

## 6. Consequence for the \(Spin(2,3)\) narrative

This result strengthens the external/internal distinction:

- \(Spin(2,3)\) may act on an independent relational face carrier;
- flavor CP requires its own complex structure;
- identifying those two structures is an additional intertwiner hypothesis, not a consequence of realification;
- exact shared-index identification collapses the positive external response to a scalar.

The most credible current architecture is therefore

\[
H_2(\mathbb R)_{\rm external}
\quad\text{commuting with}\quad
H_3(\mathbb C)_{\rm flavor},
\]

followed by a carefully controlled interaction algebra, rather than using the same \(\mathbb R^2\) to do both jobs.

## 7. Stop-everything and falsification gates

**Stop-everything trigger:** a physical intertwiner proves that relational face and complex doubling really are the same index while explaining how the non-scalar carrier directions evade the centralizer obstruction.

**Factorization trigger:** Furey’s operators naturally place the face action in the commutant of an independent flavor complex structure.

**Shared-index falsifier:** exact \([M,J]=0\), positive flavor reduction and a full three-dimensional external \(H_2(\mathbb R)\) are asserted simultaneously without an additional mechanism.

**Parent-size falsifier:** the \(12\)-real-dimensional repair is invoked without controlling its \(78\)-dimensional symmetric response algebra.

## 8. Certificate

The [complex-structure/face conflation certificate](scripts/verify_complex_structure_face_factor_conflation_obstruction.mjs) checks the nine-dimensional \(J\)-central symmetric space, scalar positive-reduction image, failure of the two non-scalar face directions to commute with \(J\), and the independent-factor repair.

## Companion documents

- [CP survives graded realification](290_flavor_cp_survives_the_graded_real_parent_when_the_complex_structure_is_retained.md)
- [Graded-real inverse-closed parent](289_the_inverse_closed_graded_real_escape_is_the_full_combined_real_symmetric_algebra.md)
- [Real face carrier with complex flavor CP](120_real_face_carrier_complex_flavor_cp.md)
- [Flavor trace is not a Jordan/Schur homomorphism](291_flavor_trace_is_positive_but_does_not_transmit_parent_jordan_or_schur_dynamics.md)
