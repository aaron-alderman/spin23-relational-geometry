# Logarithmic Yukawa Rank Counts Dimensions Only When Widths Are Universal

**Date:** 17 October 2026  
**Branches:** B03, B04, B06, B07, B08 and B11  
**Claim status:** exact Gaussian-overlap rank theorem and counterexample; dynamical width universality and phenomenological matching remain open

## 1. Multi-dimensional theorem

For equal isotropic width \(\sigma\) in \(d_\perp\) transverse dimensions,

\[
O_{ij}
=\exp\!\left[-\frac{\|a_i-b_j\|^2}{4\sigma^2}\right].
\]

Define

\[
C_{ij}
=\log|Y_{ij}|-\log|Y_{i0}|-\log|Y_{0j}|+\log|Y_{00}|.
\]

If the seed magnitude is separable,

\[
|\Lambda_{ij}|=\lambda\,r_i c_j,
\]

then all seed terms cancel from \(C\), and

\[
\boxed{
C_{ij}
=\frac{(a_i-a_0)\cdot(b_j-b_0)}{2\sigma^2}.}
\]

Writing the displacement vectors as matrices gives

\[
C=\frac1{2\sigma^2}A_\Delta B_\Delta^T,
\]

so

\[
\boxed{\operatorname{rank}C\leq d_\perp.}
\]

The theorem therefore survives arbitrary positive row and column seed factors, not only one universal constant.

## 2. When the bound is informative

With \(N\) generations, \(C\) has size \((N-1)\times(N-1)\). Hence

\[
\operatorname{rank}C\leq \min(d_\perp,N-1).
\]

Three generations can distinguish rank one from rank two, but cannot distinguish two from more transverse dimensions. A dimensional inference also requires nondegenerate left and right displacement spans; special alignments can lower the rank accidentally.

Thus observed low rank gives an upper bound on the effective displacement dimension, not automatically its exact value.

## 3. Generation-dependent widths destroy the simple invariant

For normalized Gaussians with left width \(s_i\) and right width \(t_j\),

\[
O_{ij}
=\left(\frac{2s_it_j}{s_i^2+t_j^2}\right)^{d_\perp/2}
\exp\!\left[
-\frac{\|a_i-b_j\|^2}{2(s_i^2+t_j^2)}
\right].
\]

The pair-dependent denominator \(s_i^2+t_j^2\) cannot be separated into row and column terms. Even in one transverse dimension, the logarithmic cross-difference can have full rank.

An explicit four-family numerical certificate gives:

\[
\operatorname{rank}C=1\quad(d_\perp=1,\text{ equal widths}),
\]

\[
\operatorname{rank}C=2\quad(d_\perp=2,\text{ equal widths}),
\]

but

\[
\operatorname{rank}C=3\quad(d_\perp=1,\text{ generation-dependent widths}).
\]

Therefore a full-rank matrix does not falsify low-dimensional localization unless width universality is independently justified.

## 4. Seed-orbit interpretation

The robust seed class is not merely a universal coupling. It is the multiplicative orbit

\[
\Lambda_{ij}=\lambda\,r_i c_j e^{i\phi_{ij}}.
\]

The magnitudes \(r_i c_j\) disappear from the logarithmic invariant. Factorized phases \(\phi_{ij}=\alpha_i+\beta_j\) are removable by field rephasings and cannot create physical CP.

A nonfactorizable complex phase matrix may generate CP while leaving the magnitude-rank test intact. This cleanly separates two questions:

- geometry and separable seed magnitudes control hierarchy;
- an oriented nonseparable phase source controls CP.

That division fits the programme's requirement that the real two-face carrier not impose reality on flavor.

## 5. Dynamical gate

Equal widths are natural only if all profiles see the same transverse kinetic operator and the same local curvature of the wall potential. Standard-Model representations generally couple differently to gauge and scalar backgrounds, so radiative corrections can split widths.

A credible model must establish one of:

1. an exact symmetry enforcing common widths;
2. a perturbative bound showing width splittings preserve the approximate rank relation;
3. a generalized invariant incorporating known widths;
4. a source-derived discrete set of widths with new testable relations.

Simply fitting widths generation by generation erases the dimensional prediction.

## 6. Stop-everything and falsification gates

**Dimension trigger:** a seed-corrected magnitude matrix has stable rank \(r\), and the wall construction independently supplies exactly \(r\) transverse displacement directions.

**Width trigger:** Furey/Jordan symmetry enforces universal profile curvature across the required representations.

**CP trigger:** nonfactorizable holonomy phases generate a nonzero Jarlskog invariant without altering the logarithmic magnitude rank.

**Falsifier:** rank is interpreted as transverse dimension while generation-dependent widths or nonseparable seed magnitudes remain free.

## 7. Certificate

The [localization rank/dimension/width certificate](scripts/verify_localization_rank_dimension_width.mjs) verifies rank one and rank two for explicit one- and two-dimensional equal-width data, confirms exact cancellation of row/column seed factors, checks the displacement Gram factorization and exhibits full logarithmic rank from unequal widths in one dimension.

## Companion documents

- [Gaussian localization identifiability](244_gaussian_localization_is_predictive_only_after_seed_yukawas_are_constrained.md)
- [Inhomogeneous-Higgs Schur control](238_inhomogeneous_higgs_requires_schur_self_energy_control.md)
- [Real face carrier with complex flavor CP](120_real_face_carrier_complex_flavor_cp.md)
- [Three-flavor face/PMNS carrier](174_three_flavor_real_face_complex_pmns_spectral_carrier.md)
