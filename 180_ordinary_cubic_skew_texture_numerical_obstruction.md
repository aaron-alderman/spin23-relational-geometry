# Ordinary-Cubic Skew Textures: Complete Reduction and Numerical Obstruction

**Date:** 17 October 2026  
**Branches:** B07, B08, B11 and B13  
**Claim status:** complete finite parameterization under stated symmetry assumptions; deterministic numerical obstruction, not an exact no-go theorem

## 1. Remaining question

The direction-aligned helicity ansatz fails, but the mixed \((1,2,2)\) orbit has trivial stabilizer under the 24-element proper cubic rotation group. Its spin lines need not align with its displacement.

The question is therefore:

> Does an all-nonzero, two-component, ordinarily cubic-covariant rank-one texture solve the complete 30-link unitarity equations when the mixed-orbit spin lines are allowed to skew?

This document reduces that class to four real variables and searches it directly.

## 2. Proper-cubic covariance

Let \(G\) be the proper octahedral group. For a spin lift \(S_g\), ordinary covariance means

\[
A_{ge}=S_gA_eS_g^\dagger.
\]

The axis representative \(e_x=(3,0,0)\) is fixed by a fourfold rotation about \(x\). Therefore its amplitude must commute with that spin rotation:

\[
A_x=aI+b\sigma_x.
\]

The antipodal rank-one conditions then force, up to the common helicity convention,

\[
A_x=\alpha P_x^+,
\qquad
A_{-x}=\alpha P_x^-.
\]

All six axis amplitudes follow by cubic covariance.

## 3. Complete mixed-orbit parameterization

Choose \(e_0=(1,2,2)\). Its proper-cubic stabilizer is trivial, so one matrix \(A_0\) determines all 24 amplitudes.

The unique proper rotation sending \(e_0\) to \(-e_0\) is a half-turn about

\[
a_0=\frac1{\sqrt2}(0,1,-1).
\]

For the antipodal output and input spin lines to be orthogonal, their Bloch vectors \(r,d\) must be reversed by this half-turn. Hence both lie in the perpendicular plane

\[
a_0^\perp
=\operatorname{span}\left\{
(1,0,0),\frac1{\sqrt2}(0,1,1)
\right\}.
\]

They can be written

\[
r(\theta_r)=
\left(\cos\theta_r,
\frac{\sin\theta_r}{\sqrt2},
\frac{\sin\theta_r}{\sqrt2}\right),
\]

and similarly for \(d(\theta_d)\). The representative is

\[
A_0=\beta,|r(\theta_r)\rangle\langle d(\theta_d)|.
\]

All spinor phase freedom not fixed by the Bloch vectors is absorbed into the complex coefficient \(\beta\).

## 4. Normalization leaves four real variables

Cubic averaging makes the zero-displacement autocorrelations scalar. With normalized rank-one representatives,

\[
3|\alpha|^2+12|\beta|^2=1.
\]

Remove the irrelevant common phase and write

\[
\alpha=\frac{\cos\gamma}{\sqrt3},
\qquad
\beta=e^{i\phi}\frac{\sin\gamma}{\sqrt{12}}.
\]

The complete class under the assumptions is therefore parameterized by

\[
\boxed{(\gamma,\phi,\theta_r,\theta_d).}
\]

The opposite axis-helicity convention is antiunitarily equivalent to shifting both Bloch textures to their antipodes, so it has the same residual spectrum.

## 5. Deterministic full-equation search

The search evaluates both families of autocorrelations

\[
C_r=\sum_eA_e^\dagger A_{e+r},
\qquad
D_r=\sum_eA_eA_{e+r}^\dagger
\]

over all 327 differences including \(r=0\), and minimizes

\[
\mathcal R=
\|C_0-I\|_F^2+\|D_0-I\|_F^2
+\sum_{r\ne0}
\left(\|C_r\|_F^2+\|D_r\|_F^2\right).
\]

The zero-displacement term is satisfied analytically by the \(\gamma\) parameterization. Twelve deterministic Nelder--Mead restarts gave

\[
1.0875577212854972
\leq\mathcal R_{\rm final}
\leq
1.3333333333333341.
\]

The best point found was approximately

\[
(\gamma,\phi,\theta_r,\theta_d)
=(0.674091,1.972079,2.593451,-0.984611).
\]

No restart approached numerical zero.

## 6. Structured residual

At the best point, the largest equal residuals occur on the twelve displacements in the cubic orbit

\[
(\pm3,\pm3,0)
\]

and coordinate permutations. Each such displacement has pair multiplicity six and contributes approximately

\[
0.0214710644461
\]

to \(\mathcal R\).

This orbit structure is evidence of an algebraic incompatibility between the axis and mixed amplitudes, not a single poorly optimized parameter. It suggests where an exact proof should begin.

## 7. Correct epistemic status

The search establishes:

- the symmetry reduction is finite and explicit;
- a broad deterministic search finds no unitary solution;
- the obstruction is concentrated on a definite cubic displacement orbit;
- the obvious aligned and the complete ordinary-cubic skew families both fail computationally.

It does **not** establish:

- a certified global lower bound on \(\mathcal R\);
- an exact polynomial inconsistency;
- failure of projectively cubic phases;
- failure of sparse support;
- failure of a larger internal carrier.

The ordinary-cubic all-nonzero two-component branch is therefore pinned as numerically obstructed, not formally closed.

## 8. Exact follow-up target

Restrict the autocorrelation system to the twelve \((3,3,0)\)-type differences and eliminate

\[
(\gamma,\phi,\theta_r,\theta_d)
\]

using trigonometric polynomial variables. An exact positive sum-of-squares lower bound or Gröbner-style inconsistency certificate would close the branch.

That calculation should be attempted only with an auditable symbolic representation. A floating-point optimizer cannot substitute for it.

## 9. Stop-everything and falsification gates

**Exact two-component success:** any parameter point makes every autocorrelation vanish to symbolic equality; the numerical search implementation must then be audited for an omitted phase or covariance class.

**Exact ordinary-cubic no-go:** derive a positive lower bound from the \((3,3,0)\) orbit equations.

**Projective rescue:** a nontrivial cubic character or cocycle supplies phases that cancel the obstructing orbit while preserving the axis amplitudes.

**Carrier enlargement:** determine a minimal dimension from the obstruction and obtain it from Furey/Jordan structure without light mirror proliferation.

**Branch demotion:** if neither exact closure nor a selected enlargement emerges, retain the 30-link shell as an isotropic classical cubature rather than a foundational quantum walk.

## 10. Executable search

The deterministic [ordinary-cubic skew-texture search](scripts/search_30_link_skew_texture.mjs) builds the proper cubic group, constructs the complete four-parameter amplitude family, evaluates all autocorrelations and reports restart ranges and dominant residual displacements.

## Companion documents

- [Thirty-link unitarity reduction](179_30_link_unitarity_reduction_and_helicity_ansatz_no_go.md)
- [Weighted 30-link null shell](178_weighted_30_link_null_shell_fourth_order_isotropy.md)
- [Body-diagonal parity theorem](177_body_diagonal_parity_theorem_and_floquet_chirality_balance.md)
- [Furey TRO to walk-coin support](150_furey_tro_to_walk_coin_translation.md)
