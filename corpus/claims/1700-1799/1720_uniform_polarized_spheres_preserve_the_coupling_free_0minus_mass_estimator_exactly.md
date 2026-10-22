# Uniform Polarized Spheres Preserve the Coupling-Free 0-Minus Mass Estimator Exactly

**Date:** 23 October 2026

**Status:** exact finite-size convolution for two non-overlapping uniformly polarized spheres

**Depends on:** [the dual-orientation observable](1719_a_dual_orientation_polarized_electron_experiment_separates_the_0minus_mass_from_its_unknown_matching.md)

**Evidence:** [sphere ledger](../../../evidence/data/spin23-polarized-sphere-form-factor-v1.json) and [verifier](../../../verification/verify/verify_spin23_polarized_sphere_form_factor.mjs)

## Result

The compact-source approximation in claim 1719 is not needed for two
non-overlapping, uniformly polarized spherical bodies.  If their radii are
\(R_1,R_2\), their centre separation is \(D>R_1+R_2\), and
\(z_a=m_\varphi R_a\), the exact finite-size correction is

\[
\boxed{F(z)={3\bigl(z\cosh z-\sinh z\bigr)\over z^3},\qquad F(0)=1.}
\]

Both tensor orientation channels acquire the same factor
\(F(z_1)F(z_2)\).  Therefore

\[
\boxed{
-{U_R\over U_T(0)}
=x+1+{1\over x+1},\qquad x=m_\varphi D,
}
\]

remains exact.  Finite spherical source size changes the inferred coupling
but does not contaminate the coupling-free mass estimator.

## Exact convolution

For a uniform sphere containing total polarized count \(N\), the exterior
Yukawa field is

\[
\int_{|\mathbf y|<R}{N\,d^3y\over(4\pi R^3/3)}
{e^{-m|\mathbf r-\mathbf y|}\over4\pi|\mathbf r-\mathbf y|}
=NF(mR){e^{-mr}\over4\pi r},\qquad r>R.
\]

Applying this result to each non-overlapping sphere gives

\[
\int d^3x\,d^3y\,\rho_1(\mathbf x)\rho_2(\mathbf y)
Y_m(|\mathbf D+\mathbf x-\mathbf y|)
=N_1N_2F(z_1)F(z_2)Y_m(D).
\]

Derivatives with respect to the centre separation commute with the two volume
integrals.  Consequently the full Hessian kernel obeys the same factorization,
not merely its scalar trace.

The small-body expansion is

\[
F(z)=1+{z^2\over10}+{z^4\over280}+O(z^6).
\]

At fixed total polarized counts the form factor exceeds unity: near-side spin
pairs receive more Yukawa weight than far-side pairs lose.

## Corrected observable

The transverse torque amplitude becomes

\[
K_T={N_{\rm eff}f_e^2F(z_1)F(z_2)e^{-x}\over4\pi D^3}(x+1),
\]

and the radial energy is

\[
U_R={N_{\rm eff}f_e^2F(z_1)F(z_2)e^{-x}\over4\pi D^3}
(x^2+2x+2).
\]

Thus the coupling reach in claim 1719 improves by
\([F(z_1)F(z_2)]^{1/2}\) relative to the point-count expression.

For the illustrative \(D=10\) cm, \(R_1=R_2=2\) cm and \(x=1\) geometry,

\[
z_1=z_2=0.2,qquad F(0.2)^2=1.00802748.
\]

The torque is enhanced by \(0.803\%\) and the coupling reach by
\(0.401\%\).  The more important result is structural: the mass ratio is
unchanged exactly, not only to this percentage.

## Remaining experimental inputs

This closes finite-volume geometry for the uniform-sphere idealization.  A
real forecast still requires:

1. measured species-weighted polarized electron densities;
2. deviations from spherical geometry and uniform polarization;
3. separation and alignment tolerances;
4. magnetic leakage and shielding transfer functions; and
5. a torque-noise spectrum and modulation protocol.

For arbitrary measured maps the original six-dimensional convolution remains
the correct forward model and can be evaluated numerically.  The analytic
sphere result is a normalization test for such a solver.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_polarized_sphere_form_factor.mjs
~~~
