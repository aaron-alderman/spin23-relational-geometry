# Siegel Geodesic Locking Reconciles Positive Relative Modes with Diagonal (Sp(4,mathbb R)) Symmetry

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B07 and B08  
**Claim status:** exact local metric invariance and bounded-domain certificate; microscopic action and physical symmetry subgroup remain open  
**Certificate:** [verify_siegel_metric_diagonal_locking.mjs](scripts/verify_siegel_metric_diagonal_locking.mjs)

## Executive result

The linear locking obstruction of [document 639](639_positive_diagonal_locking_conflicts_with_exact_noncompact_carrier_symmetry.md) can be evaded by moving to the nonlinear causal response domain

\[
\mathfrak H_2
=\{Z=Z^T\in M_2(\mathbb C):\operatorname{Im}Z>0\}
\cong Sp(4,\mathbb R)/U(2).
\]

This space carries the positive invariant Siegel metric

\[
ds^2
=\operatorname{Tr}
\left(Y^{-1}dZ\,Y^{-1}d\bar Z\right),
\qquad
Y=\operatorname{Im}Z>0.
\]

Therefore the diagonal locking potential

\[
\boxed{
V_{\rm lock}(Z_{\rm top},Z_{\rm chi})
=\kappa,d_{\mathfrak H_2}(Z_{\rm top},Z_{\rm chi})^2
}
\]

is nonnegative and invariant under the simultaneous fractional action of the full \(Sp(4,mathbb R)\). Its relative Hessian at the diagonal is positive.

The conflict between positivity and noncompact symmetry was therefore a conflict of **linear unconstrained coordinates**, not a no-go for nonlinear response-domain locking.

## 1. Fractional action and tangent map

For

\[
g=\begin{pmatrix}A&B\\C&D\end{pmatrix}
\in Sp(4,\mathbb R),
\]

the Siegel action is

\[
Z\longmapsto Z'=(AZ+B)(CZ+D)^{-1}.
\]

The tangent transforms as

\[
dZ'=(CZ+D)^{-T}dZ(CZ+D)^{-1},
\]

and the imaginary part as

\[
Y'=(C\bar Z+D)^{-T}Y(CZ+D)^{-1}.
\]

Substitution gives

\[
\operatorname{Tr}(Y'^{-1}dZ'Y'^{-1}d\bar Z')
=\operatorname{Tr}(Y^{-1}dZY^{-1}d\bar Z).
\]

The certificate verifies this directly for explicit linear, upper-translation, lower-shear and Fourier generators. All metric errors are below \(2\times10^{-16}\).

## 2. Positive relative mode

Near the diagonal, write

\[
Z_{\rm top}=Z+\delta Z_{\rm top},
\qquad
Z_{\rm chi}=Z+\delta Z_{\rm chi}.
\]

Then

\[
V_{\rm lock}
=\kappa,g_Z
(\delta Z_{\rm top}-\delta Z_{\rm chi},
\delta Z_{\rm top}-\delta Z_{\rm chi})
+O(\delta Z^3).
\]

Because \(Y>0\), the Siegel metric is positive definite. Thus the relative response mode receives a positive quadratic cost while the diagonal fractional group remains exact.

This differs from using the linear determinant form \(t^2-x^2-y^2\) as an energy. The group acts nonlinearly on a Riemannian homogeneous space instead.

## 3. Bounded realization

The Cayley transform

\[
W=(Z-iI)(Z+iI)^{-1}
\]

maps \(\mathfrak H_2\) to the symmetric matrix ball. The certificate verifies

\[
I-W^\dagger W>0.
\]

Thus the same lock may be expressed in contractive scattering coordinates. Positivity becomes a strict contraction condition rather than a positive polynomial potential on unconstrained Lorentz coordinates.

This connects directly to the earlier [contractive two-port response](68_jordan_response_to_contracting_scattering.md).

## 4. What has been resolved

The following combination is mathematically consistent:

1. positive relative response Hessian;
2. exact diagonal fractional \(Sp(4,mathbb R)\) action;
3. no use of an indefinite linear determinant as the energy norm;
4. a bounded contractive coordinate chart;
5. distinct topology and chiral response points locked on the diagonal.

This supplies a serious candidate for the missing vertical arrow between the two typed carriers.

## 5. Costs and remaining physics

The resolution is not free.

### 5.1 Six real response coordinates

The Siegel matrix is complex symmetric, so \(\mathfrak H_2\) has complex dimension three and real dimension six. The original real Jordan carrier has dimension three. Causality and the full fractional group introduce the dispersive partners.

### 5.2 Domain symmetry versus action symmetry

Metric invariance proves a nonlinear sigma-model or response-domain symmetry is possible. It does not derive such fields from the Standard Model or Furey algebra.

### 5.3 Ultraviolet normalization

A physical Herglotz response has asymptotic normalization. As shown in [document 214](214_uv_normalization_reduces_sp4_to_siegel_parabolic.md), fixing that normalization generally reduces the physical symmetry to a Siegel parabolic or smaller stabilizer. The full group may relate different ultraviolet data rather than act within one theory.

### 5.4 Local quantum field theory

A target-space Riemannian metric avoids an internal negative norm, but locality, spacetime kinetic signs, renormalizability, constraints and quantum anomalies still require an explicit action.

## 6. Revised status of (Spin(2,3))

The strongest supported role is now:

\[
Spin_0(2,3)\cong Sp(4,\mathbb R)
\]

as the nonlinear automorphism group of the causal two-face response domain, with a positive invariant geometry and a possible diagonal locking of differently typed responses.

Whether it is also a microscopic gauge symmetry remains open and is no longer required for the response-domain construction.

## 7. Stop-everything criteria

Stop the nonlinear locking route if:

1. the physical topology or chiral response cannot be embedded in \(\mathfrak H_2\) with positive imaginary part;
2. ultraviolet normalization leaves no nontrivial common diagonal subgroup;
3. the geodesic lock cannot be generated by local or boundary dynamics;
4. six real response coordinates introduce forbidden modes rather than dispersive data;
5. the construction yields no restriction beyond generic passive two-port theory.

## 8. Next gates

1. Intersect the diagonal locking symmetry with the UV-normalized Siegel parabolic and compute the surviving group.
2. Derive the geodesic or bounded-domain lock by integrating out a passive boundary network.
3. Test whether the Furey incidence projector and \(B-L\) current define compatible points or geodesics in \(\mathfrak H_2\).
4. Calculate an invariant distance or cross-ratio that could become an observable discriminator.

## Reproducibility

```powershell
node scripts\verify_siegel_metric_diagonal_locking.mjs
```
