# Locking-Potential Hessian: Two Extra Scalars Can Be Heavy, but the Hierarchy Is Not Predicted

**Date:** 17 October 2026  
**Branches:** B01 and B05  
**Claim status:** exact tree-level Hessian for the minimal invariant potential; the minimal hierarchy is now shown not to be scalar-loop protected

## 1. Potential

Take

\[
V(K)=
\alpha\bigl(\operatorname{tr}K^TK-v^2\bigr)^2
+\beta\left[
\bigl(\operatorname{tr}K^TK\bigr)^2
-4\det(K^TK)
\right].
\]

For \(\alpha,\beta>0\), a minimum is

\[
K_0=k
\begin{pmatrix}
1&0\\0&1\\0&0
\end{pmatrix},
\qquad
v^2=2k^2.
\]

The \(\alpha\) term fixes the total norm. The \(\beta\) term is the squared singular-value difference and enforces isotropy.

## 2. Fluctuation coordinates

Write

\[
\delta K=
\begin{pmatrix}
a&b\\
c&d\\
e&f
\end{pmatrix}.
\]

At quadratic order,

\[
V^{(2)}
=4\alpha k^2(a+d)^2
+4\beta k^2(a-d)^2
+4\beta k^2(b+c)^2.
\]

The remaining combinations

\[
b-c,\qquad e,\qquad f
\]

are the three Goldstone directions.

## 3. Exact Hessian spectrum

The six Hessian eigenvalues are

\[
\boxed{
16\alpha k^2,\quad
16\beta k^2,\quad
16\beta k^2,\quad
0,\quad0,\quad0.
}
\]

They correspond to:

- one overall radial mode;
- one singular-value anisotropy mode;
- one symmetric shear mode;
- three orbit/Goldstone modes.

After gauging both compact factors, the three zero modes are eaten.

## 4. Low-energy escape from the scalar-count obstruction

If

\[
\beta\gg\alpha,
\]

the anisotropy and shear modes are much heavier than the radial mode. At energies well below

\[
m_{\rm extra}^2=16\beta k^2,
\]

the effective spectrum contains one light scalar:

\[
m_{\rm radial}^2=16\alpha k^2.
\]

Thus the earlier three-scalar obstruction is not absolute. Two extra modes can decouple while the isotropic lock and residual diagonal \(SO(2)\) survive.

## 5. Why this is not yet an explanation

The hierarchy

\[
\beta/\alpha\gg1
\]

is an input. The present algebra does not predict it. A viable theory must address:

- radiative stability of the hierarchy;
- threshold corrections from the heavy modes;
- whether the radial mode has Standard-Model Higgs couplings;
- whether the heavy modes violate precision electroweak bounds;
- whether the locking scale equals or exceeds the Higgs scale;
- whether a symmetry or compositeness mechanism forces large \(\beta\).

Without such an explanation, the model trades two light extra scalars for one unexplained large coupling ratio.

## 6. Stop-everything and falsification tests

**Positive:** the Furey algebra, boundary dynamics or renormalization group forces \(\beta/\alpha\gg1\) and the radial mode’s couplings match the observed Higgs.

**Negative:** the hierarchy is radiatively unstable, or integrating out the two modes generates excluded operators.

**Current result:** a controlled decoupling limit exists but is not selected, and scalar loops regenerate the radial invariant when only the shape coupling is present.

## 7. Certificate

The [locking-Hessian certificate](../../../verification/verify/verify-locking-potential-hessian.mjs) constructs the exact six-dimensional Hessian, verifies all eigenmodes and demonstrates the \(1+2+3\) radial/extra/Goldstone split.

## Companion documents

- [Locking-field spectrum](80_locking_field_gauge_and_scalar_spectrum.md)
- [Locking-tensor geometry](79_locking_tensor_orbits_and_selector_geometry.md)
- [Standard Model as stress–energy](01_standard_model_as_stress_energy_full_analysis.md)
- [Radiative stability of the locking hierarchy](83_locking_hierarchy_radiative_stability.md)
- [Locking stress tensor and portal backreaction](84_locking_stress_tensor_and_portal_backreaction.md)
