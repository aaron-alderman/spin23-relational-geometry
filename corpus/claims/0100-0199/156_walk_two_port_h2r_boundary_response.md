# A Finite Walk Produces a Positive Two-Port (H_2(\mathbb R)) Response

**Date:** 17 October 2026  
**Branches:** B04, B07, B08 and B13  
**Claim status:** exact finite real-walk construction and sewing result; no derivation of a physical (Sp(4,\mathbb R)) symmetry

## 1. Objective

The discrete branch has produced causal unitary dynamics but has not yet recovered the Jordan carrier. The most direct interface is a boundary response:

> Retain two physically distinguished boundary channels, eliminate the internal walk amplitudes, and ask whether the resulting response lies in (H_2(\mathbb R)_+).

For a finite real walk, the answer is yes.

## 2. Finite real walk

Take (N) sites with two directional components per site. Use a real rotation coin

\[
C(θ)=e^{-iθσ_y}
=
\begin{pmatrix}
\cos θ&-\sin θ\\
\sin θ&\cos θ
\end{pmatrix}
\]

and a reflecting conditional shift (S). The finite one-step operator

\[
U=SC
\]

is a real orthogonal (2N\times2N) matrix.

Reflection is used only to close the finite unitary model. Different boundary rules will generally change the response.

## 3. Positive Euclidean precision

Choose a real damping or Euclidean spectral parameter

\[
0<r<1
\]

and define

\[
Q=I-rU,
\qquad
H=Q^TQ.
\]

Because (U) is orthogonal and (r<1), (Q) is invertible and

\[
H>0.
\]

This is not the real-time evolution operator. It is a positive quadratic precision derived from the unitary walk.

## 4. Two inward boundary ports

Retain two amplitudes:

- the right-moving component at the left boundary;
- the left-moving component at the right boundary.

Call their two-vector (b). Write all remaining amplitudes as (i), and partition

\[
H=
\begin{pmatrix}
H_{bb}&H_{bi}\\
H_{ib}&H_{ii}
\end{pmatrix}.
\]

Minimizing the positive quadratic form over the internal amplitudes gives

\[
i_*=-H_{ii}^{-1}H_{ib}b
\]

and the effective boundary precision

\[
\boxed{
X=H_{bb}-H_{bi}H_{ii}^{-1}H_{ib}.
}
\]

Schur complementation preserves strict positivity. Since every matrix is real and (X) is symmetric,

\[
\boxed{X\in H_2(\mathbb R)_+.}
\]

Thus a genuine positive two-face Jordan candidate arises from eliminating the interior of a finite walk.

## 5. Exact sewing

Eliminate the internal variables one at a time. Gaussian/Schur elimination is associative whenever the required positive pivots exist. Therefore the same (X) results whether the interior is removed:

- all at once;
- from left to right;
- from right to left;
- in any other admissible order.

The certificate verifies both opposite orders over multiple lengths, damping parameters and coin angles.

This is an exact finite sewing law. It is the closest discrete analogue so far to the subdivision-invariant boundary responses established in the scalar interval branch.

## 6. Why this is not yet (Spin(2,3))

The positive cone (H_2(\mathbb R)_+) is the correct rank-two Lorentz cone, whose conformal group is locally (Sp(4,\mathbb R)\cong Spin_0(2,3)). But obtaining one point (X) in that cone does not prove that the physical transformations of the walk generate its full conformal group.

The construction also contains choices:

- the Euclidean parameter (r);
- the coin angle (θ);
- the reflecting boundary condition;
- which two ports are retained;
- the normalization of the port amplitudes;
- whether (H=Q^TQ) is the physically preferred Euclideanization.

Indeed, any positive real quadratic form compressed to two real variables yields an (H_2(\mathbb R)_+) matrix. The appearance of the cone is therefore mathematically exact but not yet selective evidence for a fundamental (Spin(2,3)) symmetry.

## 7. The next symmetry test

The bridge advances only if the walk supplies more than positivity. Candidate stronger results are:

1. a physically selected class of boundary transformations acting by Jordan fractional linear maps;
2. closure of those transformations as (Sp(4,\mathbb R));
3. a canonical determinant scale stable under subdivision and port redefinition;
4. a real structure forced by charge conjugation or reflection positivity;
5. compatibility of the response with the Furey coin support and gauge links.

Without at least one of these, (H_2(\mathbb R)) is a useful response language rather than a derived symmetry pole.

## 8. Stop-everything and falsification gates

**Advance:** the admissible walk boundary operations generate the full connected (Sp(4,\mathbb R)) conformal action on (X).

**Normalization:** (sqrt{\det X}), or a related transfer exponent, is invariant under exact subdivision and fixes the dressed-carrier scale.

**Furey bridge:** inserting the selected fifteen-dimensional coin preserves a common two-port response rather than producing unrelated channel-by-channel cones.

**Genericity demotion:** every arbitrary positive walk produces the same formal (H_2(\mathbb R)) cone with no additional symmetry or observable restriction.

**Failure:** gauge coupling or Lorentzian continuation destroys positivity or makes the two-port choice frame dependent.

## 9. Certificate

The [walk two-port response certificate](../../../verification/verify/verify_walk_two_port_h2r_response.mjs) verifies finite-walk orthogonality, positivity of (H), positive determinant/eigenvalues of (X), and order-independent Schur sewing across a parameter grid.

## Companion documents

- [Scalar interval Dirichlet-to-Neumann realization](../0000-0099/64_scalar_interval_dirichlet_to_neumann_branch.md)
- [Scalar network sewing and invariants](../0000-0099/66_scalar_network_subdivision_invariants.md)
- [Unique (M_2(\mathbb C)) factor to (H_2(\mathbb R))](116_unique_m2_linking_factor_to_h2r_spin23.md)
- [Full substep gauge covariance](155_spacetime_gauge_split_step_temporal_links.md)
