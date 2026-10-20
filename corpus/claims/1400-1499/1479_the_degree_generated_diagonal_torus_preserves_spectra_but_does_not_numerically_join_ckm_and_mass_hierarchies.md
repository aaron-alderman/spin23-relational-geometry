# The degree-generated diagonal torus preserves spectra but does not numerically join CKM and mass hierarchies

**Date:** 20 October 2026

**Gates:** A5 and A6

**Status:** exact algebraic closure plus bounded numerical negative result; not a global no-go

**Depends on:** [the Laplacian--signless joining test](1478_the_laplacian_signless_triangle_fits_ckm_magnitudes_only_before_mass_order_is_joined.md)

**Evidence:** [machine-readable audit](../../../evidence/data/spin23-triangle-degree-torus-joining.json), [executable verifier](../../../verification/verify/verify_spin23_triangle_degree_torus_joining.mjs), [PDG 2025 CKM review](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-ckm-matrix.pdf), and [common-scale running masses](https://arxiv.org/abs/2009.04851)

## Result

The commutator proposed in claim 1478 is the tangent to an exact isospectral orbit. With (D=\operatorname{diag}(a+c,a+b,b+c)), (H_-=H_+^*), and (U_\theta=e^{i\theta D}), define

\[
K_u=D-H_+,
\qquad
K_d(\theta)=U_\theta(D+\eta H_-)U_\theta^\dagger.
\]

Then

\[
\left.\frac{dK_d}{d\theta}\right|_{\theta=0}=i[D,D+\eta H_-]=i\eta[D,H_-],
\qquad
\operatorname{spec}K_d(\theta)=\operatorname{spec}(D+\eta H_-).
\]

Thus the degree flow changes the relative eigenbasis without changing the down-sector spectrum. This is exactly the separation requested by the failed join.

A seeded annealing/Nelder--Mead search and an independent differential-evolution search nevertheless found the same conflict. When the two affine mass-squared locations and the CP invariant approach their targets, the Cabibbo block remains large. The better recorded one-parameter witness gives

\[
(|V_{us}|,|V_{cb}|,|V_{ub}|,|J|)
=(0.5731,0.01681,0.02375,1.918\times10^{-5}),
\]

against

\[
(0.22501,0.04183,0.003732,3.115\times10^{-5}).
\]

Its spectral locations are (r_u=2.19\times10^{-5}) and (r_d=2.15\times10^{-4}), already near the hierarchical regime but not enough to repair the mixing.

## Maximal internal diagonal closure

The one-parameter subgroup is not the whole diagonal freedom derivable from (D). If its three diagonal entries are distinct, the Vandermonde determinant

\[
\det\begin{pmatrix}1&d_1&d_1^2\\1&d_2&d_2^2\\1&d_3&d_3^2\end{pmatrix}
=(d_2-d_1)(d_3-d_1)(d_3-d_2)
\]

is nonzero. Hence (I,D,D^2) span every diagonal (3\times3) matrix. Modulo the identity, exponentiating polynomials in (D) gives the full two-phase diagonal torus. This is the maximal basis motion obtainable from the degree algebra without adding an off-diagonal family operator.

A second seeded differential-evolution audit varied

\[
(a/c,b/c,\delta,\eta,\alpha,\beta)
\]

against the four independent CKM targets plus ((r_u,r_d)). Its best recorded score improves only slightly and retains (|V_{us}|\simeq0.527). Because this is numerical optimization over a nonconvex space, failure to find a solution is not proof of nonexistence.

## Convergence verdict

The top-down incidence algebra and bottom-up data have now been joined as far as parameter fitting can responsibly take them:

- (H), (D), their commutator tangent and their full diagonal unitary orbit are derived from one triangle;
- the orbit cleanly separates eigenvalue control from relative-basis control;
- both monotone mass orderings are enforced;
- two independent searches and the maximal diagonal closure exhibit the same Cabibbo tension.

Further stochastic fitting has diminishing evidential value. The next high-value calculation is analytic: eliminate the triangle parameters from the characteristic invariants of (D-H_+) and (D+\eta H_-), then derive a bound or algebraic relation involving (r_u,r_d) and a rephasing-invariant mixing quantity. Only such an invariant can close the triangle realization globally.

## Verdict

\[
\boxed{\text{exact spectrum/basis separation: yes},\quad
\text{joined numerical solution found: no},\quad
\text{global no-go: not yet}.}
\]

## Reproduction

~~~powershell
node verification/verify/verify_spin23_triangle_degree_torus_joining.mjs
~~~
