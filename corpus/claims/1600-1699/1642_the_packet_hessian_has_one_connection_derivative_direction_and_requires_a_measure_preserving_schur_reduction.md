# The Packet Hessian Has One Connection-Derivative Direction and Requires a Measure-Preserving Schur Reduction

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** exact flat-principal-symbol and axial determinant factorization; identifies the next curved-Hessian calculation

**Depends on:** [quantization packet v1](1641_the_quantization_packet_freezes_the_critical_pgt_hessian_but_exposes_one_second_class_measure_blocker.md)

**Evidence:** [mixed-order Hessian ledger](../../../evidence/data/spin23-critical-pgt-packet-hessian-principal-symbol-v1.json) and [verifier](../../../verification/verify/verify_spin23_critical_pgt_packet_hessian_principal_symbol.mjs)

## Result

The first Hessian step can be completed exactly. At nonzero Euclidean
momentum, the gauge-fixed metric block has ten second-order directions. Of
the 24 independent connection directions, only the longitudinal axial
combination differentiated by (widehat X^2) has a second-order symbol. The
remaining three axial-transverse, four trace and sixteen tensor directions
are algebraic:

\[
24=1_{\partial^2}+3_{\rm axial,alg}+4_{\rm trace,alg}
+16_{\rm tensor,alg}.
\]

Thus the bosonic second-order principal symbol has rank eleven on the
34-component tetrad--connection fluctuation space. The unreduced Hessian is a
mixed-order operator, not an ordinary minimal Laplace-type operator to which
standard heat-kernel coefficients may be applied directly.

The axial block nevertheless admits an exact measure-visible Schur
reduction. For (A,B>0),

\[
K_{\mu\nu}(p)=A\delta_{\mu\nu}+Bp_\mu p_\nu
=A P^T_{\mu\nu}+(A+Bp^2)P^L_{\mu\nu},
\]

so

\[
\det K=A^3(A+Bp^2)=A^3B(p^2+m^2),
\qquad m^2=A/B.
\]

The three transverse axial components are auxiliary. Integrating them out
leaves one positive elliptic pseudoscalar operator, but also the ultralocal
(A^3) determinant. A correct curved reduction must retain its covariant
generalization and the analogous trace/tensor and constraint-measure factors.

## Principal-symbol census

At the packet reference gauges:

| sector | components | second-order symbol | algebraic |
|---|---:|---:|---:|
| symmetric coframe / metric | 10 | 10 | 0 |
| axial connection | 4 | 1 | 3 |
| trace connection | 4 | 0 | 4 |
| tensor connection | 16 | 0 | 16 |
| diffeomorphism ghosts | 4 Grassmann | 4 | 0 |
| Lorentz ghosts | 6 Grassmann | 0 | 6 |
| broken-parent ghosts | 4 Grassmann | 0 | 4 |

The algebraic gauge ghosts have nonzero background FP matrices and therefore
remove gauge volume without supplying propagating poles.

## Exact eigenvalue and pole test

For any (p\ne0), every vector orthogonal to (p) is an eigenvector of
(K) with eigenvalue (A), while (p) has eigenvalue (A+Bp^2). Hence:

- (A>0) makes all three auxiliary eigenvalues positive;
- (B>0) makes the longitudinal symbol positive at large momentum;
- the only momentum-dependent zero after Lorentzian continuation is
  (p^2=-A/B); and
- no transverse connection pole has been hidden by the decomposition.

The verifier checks the determinant both from these eigenvalues and by direct
Gaussian elimination for several rational momentum vectors.

## Why the ultralocal factors cannot be discarded yet

In flat space with constant (A), dimensional regularization often assigns
scaleless ultralocal determinants no logarithmic running. On a general
background, however, the algebraic blocks depend on (e,ar R,T), the
couplings and the constraint Jacobian. Their logarithms can contribute local
volume and curvature terms, and changes of variables carry compensating
Jacobians. Discarding them before combining the Lagrangian and
Faddeev--Senjanovic measures would prejudge the missing cancellation.

## Next calculation

The next well-defined Lagrangian task is to compute the full curved quadratic
block matrix

\[
\mathcal H=
\begin{pmatrix}
H_{ff}&H_{fk}\\
H_{kf}&H_{kk}
\end{pmatrix}
\]

on torsionless Einstein AdS, split (k) into its (4+4+16) irreducible
pieces, and eliminate every invertible algebraic block by the exact Schur
complement

\[
H_{\rm red}=H_{ff}-H_{fk}H_{kk}^{-1}H_{kf}.
\]

Each elimination must record (det H_{kk}). The result must then be combined
with the differential diffeomorphism ghost, algebraic gauge ghosts,
decomposition Jacobians and the second-class factor.

The flat axial block proves that a reduced Laplace-type pseudoscalar exists.
It does not prove that the complete curved (H_{\rm red}) is minimal, nor
that its determinant is the full quantum measure. Those are the next gates.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_critical_pgt_packet_hessian_principal_symbol.mjs
~~~
