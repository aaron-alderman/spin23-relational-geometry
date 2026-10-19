# Small Width Splittings Only Perturb Logarithmic Rank Continuously

**Date:** 17 October 2026  
**Branches:** B03, B04, B06, B07, B08 and B11  
**Claim status:** exact finite-splitting stability bound and first-order expansion for Gaussian profiles; radiative width calculation remains open

## 1. The robustness question

Exact universal widths give

\[
\operatorname{rank}C\leq d_\perp.
\]

Arbitrary generation-dependent widths can destroy this bound. The physically relevant intermediate case is a small splitting around a common width:

\[
s_i=\sigma(1+\epsilon_i),
\qquad
t_j=\sigma(1+\eta_j),
\qquad
|\epsilon_i|,|\eta_j|\leq\varepsilon<1.
\]

The rank jumps algebraically as soon as a previously zero minor becomes nonzero, but the size of the violation is continuous and bounded.

## 2. Exact overlap and first-order correction

For isotropic \(d_\perp\)-dimensional Gaussians,

\[
\log O_{ij}
=\frac{d_\perp}{2}
\log\!\left(\frac{2s_it_j}{s_i^2+t_j^2}\right)
-\frac{\|a_i-b_j\|^2}{2(s_i^2+t_j^2)}.
\]

At equal widths, the prefactor has no linear variation. Writing

\[
q_{ij}=\frac{\|a_i-b_j\|^2}{4\sigma^2},
\]

gives

\[
\boxed{
\delta\log O_{ij}
=q_{ij}(\epsilon_i+\eta_j)
+O(\varepsilon^2).}
\]

The induced forbidden minors and singular values therefore turn on continuously, generically at first order.

## 3. A finite nonasymptotic bound

Let

\[
R=\max_{ij}\|a_i-b_j\|.
\]

For all widths in the interval \(\sigma[1-\varepsilon,1+\varepsilon]\), each derivative of \(\log O_{ij}\) with respect to a fractional width perturbation is bounded by

\[
L(\varepsilon)=
\frac{d_\perp}{2}
\left[
\frac1{1-\varepsilon}
+\frac{1+\varepsilon}{(1-\varepsilon)^2}
\right]
+\frac{R^2(1+\varepsilon)}
{4\sigma^2(1-\varepsilon)^4}.
\]

Each logarithmic cross difference contains four overlap entries. Hence

\[
\boxed{
|C_{ij}(\varepsilon)-C_{ij}(0)|
\leq 8L(\varepsilon)\varepsilon.}
\]

For an \((N-1)\times(N-1)\) matrix,

\[
\|C(\varepsilon)-C(0)\|_2
\leq
\|C(\varepsilon)-C(0)\|_F
\leq
8(N-1)L(\varepsilon)\varepsilon.
\]

By singular-value perturbation, every singular value beyond the geometric rank \(d_\perp\) is bounded by the same quantity.

## 4. Approximate rank is the observable

With radiative or representation-dependent width corrections, exact matrix rank is too brittle. The meaningful test is a singular-value hierarchy:

\[
s_{d_\perp+1}(C)
\ll
s_1(C).
\]

The ratio should be compared with a width-splitting estimate derived from the wall dynamics. A small forbidden singular value supports approximate common curvature; a large one may indicate unequal widths, nonseparable seed magnitudes, more transverse dimensions or failure of localization.

## 5. Coupling to the Schur error

Width splitting and Higgs inhomogeneity are related but distinct:

- width splitting modifies the zero-mode profiles and the logarithmic flavor invariant;
- Higgs variation mixes wall modes with the transverse bulk through the profile variance.

A viable hierarchy model needs both errors small:

\[
s_{d_\perp+1}(C)
\ \text{controlled},
\qquad
\|\Sigma_{\rm bulk}\|
\ \text{controlled}.
\]

The first is a flavor-identifiability condition; the second is a low-energy projection condition.

## 6. Stop-everything and falsification gates

**Radiative trigger:** the wall/Furey dynamics predicts width splittings small enough to account quantitatively for the forbidden singular values.

**Dimensional trigger:** a clear singular-value gap selects \(d_\perp\) and survives both seed-orbit and Schur-error estimates.

**Failure mode:** the required width tolerance is radiatively unnatural or much smaller than representation-dependent corrections.

**Falsifier:** exact low rank is claimed despite nonzero width splittings, or a small-rank violation is treated as fatal without comparing it to the proven stability bound.

## 7. Certificate

The [width-splitting rank-stability certificate](../../../verification/verify/verify_width_splitting_log_rank_stability.mjs) checks the exact finite bound in a four-profile example, verifies the first-order formula, confirms quadratic scaling of its remainder and demonstrates that formerly zero rank-one minors turn on continuously.

## Companion documents

- [Localization rank and width universality](245_logarithmic_yukawa_rank_counts_dimensions_only_when_widths_are_universal.md)
- [Gaussian localization identifiability](244_gaussian_localization_is_predictive_only_after_seed_yukawas_are_constrained.md)
- [Inhomogeneous-Higgs Schur control](238_inhomogeneous_higgs_requires_schur_self_energy_control.md)
- [Radiative stability of the locking hierarchy](../0000-0099/83_locking_hierarchy_radiative_stability.md)
