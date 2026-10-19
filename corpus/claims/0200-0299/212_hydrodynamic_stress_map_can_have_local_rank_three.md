# A Hydrodynamic Stress Map Can Have Local Rank Three

**Date:** 17 October 2026  
**Branches:** B01, B02, B04, B06, B07 and B11  
**Claim status:** constructive result for a standard leading-order positive hydrodynamic prototype; not a universal theorem and not a microscopic Standard-Model calculation

## 1. From span to local exploration

Three thermal channel Gram matrices can span \(H_2(\mathbb R)\), but a spectrum parameterized only by one frequency remains a curve. To reach a locally open subset of the carrier, the coefficient map

\[
(\omega,k,T)\longmapsto
(a(\omega,k,T),b(\omega,k,T),c(\omega,k,T))
\]

must have Jacobian rank three somewhere.

This document supplies an explicit positive hydrodynamic prototype for which that determinant is nonzero.

## 2. Leading channel shapes

Use a scale-invariant fluid model with

\[
w=w_0T^4,
\qquad
\eta=\eta_0T^3,
\qquad
D=\frac{d_0}{T},
\qquad
\Gamma_s=\frac{g_0}{T},
\qquad
c_s^2=\frac13,
\]

where \(w\) is enthalpy density, \(\eta\) shear viscosity, \(D\) a shear diffusion constant and \(\Gamma_s\) sound attenuation.

For \(\omega,k,T>0\), take the positive channel weights

\[
a=\eta\omega,
\]

\[
b=w\frac{Dk^2\omega}{\omega^2+(Dk^2)^2},
\]

and

\[
c=w\frac{\Gamma_sk^4\omega}
{(\omega^2-c_s^2k^2)^2+(\Gamma_sk^2\omega)^2}.
\]

These are the characteristic dissipative tensor, diffusive shear and attenuated sound shapes, stripped of convention-dependent normalizations and contact terms. They are used as a controlled model, not asserted as exact correlators outside the hydrodynamic regime. Thermal stress spectral functions in shear and bulk/sound channels are standard; a representative microscopic discussion is [Meyer, arXiv:0806.3914](https://arxiv.org/abs/0806.3914).

## 3. Positive Jordan response

With the channel Gram matrices

\[
G_T=\begin{pmatrix}1&0\\0&0\end{pmatrix},
\quad
G_V=\begin{pmatrix}0&0\\0&1\end{pmatrix},
\quad
G_S=\begin{pmatrix}1&1\\1&1\end{pmatrix},
\]

define

\[
\rho(\omega,k,T)=aG_T+bG_V+cG_S.
\]

Every coefficient is nonnegative, so \(\rho\succeq0\). Moreover the linear map from \((a,b,c)\) to \(H_2(\mathbb R)\) is invertible.

## 4. Rank-three witness

Choose the dimensionless constants

\[
w_0=1.7,
\quad \eta_0=0.23,
\quad d_0=0.31,
\quad g_0=0.27.
\]

At the sample point

\[
(\omega,k,T)=(0.8,0.65,1.4),
\]

the executable finite-difference calculation finds

\[
\det\frac{\partial(a,b,c)}{\partial(\omega,k,T)}\ne0.
\]

By the inverse-function theorem, the coefficient image contains a locally open set near that point. Since the Gram-coordinate map is invertible, the corresponding response matrices locally explore a three-dimensional subset of \(H_2(\mathbb R)_+\).

This is an existence proof that hydrodynamic Ward structure and positivity do not by themselves confine the medium response to a surface.

## 5. Why this is not yet \(Spin(2,3)\) dynamics

Local rank three answers a tomography question:

> Can physical controls move the response independently in all three Jordan directions?

It does not answer the symmetry question:

> Is the family closed under a nontrivial \(Sp(4,\mathbb R)\) action with a physical transformation law for \((\omega,k,T,u^\mu)\)?

The hydrodynamic formulas contain transport coefficients and a preferred thermal rest frame. Generic \(Sp(4,\mathbb R)\) transformations need not preserve their pole locations, KMS relations, constitutive expansion or equation of state.

Thus the present ladder is:

1. vacuum: one ray or one plane;
2. medium kinematics: full linear span;
3. hydrodynamic prototype: locally open positive image;
4. still missing: closed composition law or dynamical full-group action.

## 6. New falsification gates

**Hydrodynamic robustness:** replace the prototype with a correctly normalized retarded correlator and verify the rank witness inside its domain of validity.

**KMS gate:** include thermal fluctuation factors and confirm that the same response definition remains positive and rank three.

**Microscopic gate:** calculate the three channels in a free Standard-Model plasma or weakly coupled gauge theory.

**Rank-collapse falsifier:** exact Ward, conformal or constitutive identities force the microscopic Jacobian to vanish identically.

**Composition gate:** derive a sewing operation on medium response regions that preserves positivity and corresponds to Jordan/Schur composition.

**Symmetry gate:** exhibit transformations of physical controls and transport data whose induced action agrees with a nontrivial open subgroup of \(Sp(4,\mathbb R)\).

## 7. Certificate

The [hydrodynamic local-rank certificate](../../../verification/verify/verify_hydrodynamic_stress_rank_three.mjs) checks positive channel weights, positive response matrices, independence of the three Gram matrices and a nonzero numerical Jacobian determinant at the declared sample point.

## Companion documents

- [Thermal stress channels span H2](211_thermal_stress_channels_can_span_full_h2.md)
- [Stress-plane Spin(2,2) stabilizer](210_stress_plane_stabilizer_is_spin22_inside_spin23.md)
- [Free conformal stress ray](209_free_conformal_field_stress_spectrum_is_one_jordan_ray.md)
