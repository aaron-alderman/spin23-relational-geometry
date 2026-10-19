# Two-Parameter Rank Collapse Leaves a Finite Relational Remnant

**Date:** 17 October 2026  
**Branches:** B02, B04, B06, B07, B08, B09 and B11  
**Claim status:** exact polynomial two-parameter model; its identification with a Standard-Model mass, Higgs zero or Furey operator remains a candidate bridge

## 1. A simultaneous crossing without a labelled eigenline

One real parameter permits analytic eigenline tracking for analytic symmetric families. Two parameters already allow a qualitatively different support defect.

Let

\[
v(x,y)=\begin{pmatrix}x\\y\end{pmatrix},
\qquad
C(x,y)=v(x,y)v(x,y)^T
=
\begin{pmatrix}
x^2&xy\\xy&y^2
\end{pmatrix}.
\]

This is a polynomial positive-semidefinite matrix. It has rank one away from the origin and rank zero at the origin. Its active line is radial and therefore depends on the direction of approach.

Choose a fixed two-face vector \(b\in\mathbb R^2\) and coupling

\[
X(x,y)=b,v(x,y)^T.
\]

Both \(C\) and \(X\) vanish at the origin.

## 2. Exact finite remnant

For \((x,y)\neq(0,0)\), writing \(r^2=x^2+y^2\),

\[
C^+=\frac{vv^T}{r^4}.
\]

Therefore

\[
\boxed{
XC^+X^T
=
bv^T\frac{vv^T}{r^4}vb^T
=
bb^T.}
\]

The result is finite, positive and independent of both radius and angle. It extends across the puncture as the constant polynomial matrix \(bb^T\).

At the origin, however, the pointwise Moore--Penrose prescription gives

\[
X(0)C(0)^+X(0)^T=0.
\]

The isolated fiber again misses a finite analytic remnant—but now the active support itself has no direction-independent limit.

## 3. The full positive block is elementary

Taking \(A=bb^T\), the complete block is

\[
\begin{pmatrix}
bb^T&bv^T\\
vb^T&vv^T
\end{pmatrix}
=
\begin{pmatrix}b\\v\end{pmatrix}
\begin{pmatrix}b\\v\end{pmatrix}^{T}
\succeq0.
\]

Away from the origin its Schur complement is exactly zero. At the origin the pointwise Schur complement is \(bb^T\). The continuously reduced family instead uses the off-origin extension and remains zero.

This proves that discontinuity of a pointwise generalized Schur complement need not signal any pathology in the unreduced positive block. It can be an artifact of reducing each fiber independently instead of reducing the analytic family.

## 4. The normalized coupling can diverge while the response stays finite

The support-normalized operator is

\[
R=XC^+=\frac{bv^T}{r^2},
\]

whose norm diverges as \(1/r\). Yet

\[
RCR^T=bb^T
\]

is constant.

This refines the “common sewing kernel” criterion. Boundedness or analyticity of \(R\) is sufficient but not necessary for a finite physical quadratic response. The invariant object may be the contracted form \(RCR^T\), not the normalized operator considered alone.

For cross-channel comparison, demanding equality of divergent \(R_f\) could therefore be too strong near a common rank-collapse defect. One should compare their finite quadratic remnants and transition data.

## 5. The support defect has degree two

On a circle \(v=r(\cos\theta,\sin\theta)^T\), the support projector is

\[
P(\theta)=\frac{vv^T}{r^2}
=
\frac12
\begin{pmatrix}
1+\cos2\theta&\sin2\theta\\
\sin2\theta&1-\cos2\theta
\end{pmatrix}.
\]

Under \(\operatorname{Gr}_1(\mathbb R^2)\cong\mathbb RP^1\cong S^1\), the boundary map winds twice. It cannot extend to a continuous rank-one projector over the disk, which is exactly why the origin loses the active line.

There is an important nuance: the pulled-back real line bundle over the boundary circle is orientable and trivial because the degree is even. Its first Stiefel--Whitney class vanishes. The obstruction is the nonzero degree of the projector map's extension through the rank-collapse point, not a Möbius line bundle on the boundary.

## 6. Relation to the nested-doll intuition

This is the cleanest exact realization so far of

\[
\text{carrier}\to0,
\qquad
\text{coupling}\to0,
\qquad
\text{relational response}\to\text{finite nonzero matrix}.
\]

The surviving object is rank one, \(bb^T\). It is therefore not yet a full \(H_2(\mathbb R)\) carrier and does not by itself produce \(Spin(2,3)\). Multiple independent defects or channels would be needed to span the three-dimensional Jordan cone.

Nor is \(bb^T\) automatically a mass. A mass interpretation requires the remnant to enter a Lorentz-covariant inverse propagator with the correct chirality, gauge transformation, pole and residue.

## 7. New branch opened: defect-generated cone

Suppose several collapsing interiors give remnants

\[
Q_a=b_ab_a^T\succeq0.
\]

Positive sums

\[
Q=\sum_a\lambda_aQ_a,
\qquad \lambda_a\geq0,
\]

can generate higher-rank elements of \(H_2(\mathbb R)_+\). Three suitably oriented rank-one rays can span the full Jordan vector space, while a continuum of rays generates the entire cone.

This suggests a concrete new question: can the four dressed Yukawa channels or three relationship sectors supply canonically oriented defect remnants whose positive hull is the relational carrier?

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** a Higgs, wall or Furey kernel contains this rank-collapse factorization and its finite \(bb^T\) remnant enters a physical inverse propagator without an arbitrary normalization.

**Cone trigger:** canonically supplied defect vectors \(b_a\) span \(\mathbb R^2\) and their symmetric outer products span all of \(H_2(\mathbb R)\).

**Topology trigger:** the projector degree is forced by an existing gauge/helicity winding rather than inserted by hand.

**Physical falsifier:** renormalization, Ward identities or chirality force the contracted remnant to vanish or make it scheme dependent.

**Interpretive falsifier:** only one rank-one ray is ever generated, leaving no route from the defect to the full Jordan carrier.

## 9. Certificate

The [two-parameter rank-collapse certificate](scripts/verify_two_parameter_rank_collapse_remnant.mjs) verifies the range condition, path-independent finite remnant, divergent normalized ratio, nonextendible support projector and degree-two boundary map.

## Companion documents

- [Rank-changing Schur trichotomy](269_rank_changing_schur_channels_have_a_three_way_analytic_gate.md)
- [Analytic support rotation](270_analytic_support_rotation_does_not_change_the_schur_rank_gate.md)
- [Degree-eight selector defects](220_degree_eight_selector_gives_eight_local_spin23_defects.md)
- [Any rank-one selector residue breaks determinant symmetry](257_any_nonzero_rank_one_selector_schur_correction_breaks_lorentz_determinant_symmetry.md)
