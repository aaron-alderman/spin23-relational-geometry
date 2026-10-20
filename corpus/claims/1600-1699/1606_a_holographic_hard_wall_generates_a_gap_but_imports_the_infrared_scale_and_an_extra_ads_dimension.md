# A Holographic Hard Wall Generates a Gap but Imports the Infrared Scale and an Extra AdS Dimension

**Date:** 21 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** exact hard-wall Sturm--Liouville witness; no finite-N four-dimensional Yang--Mills construction

**Depends on:** [the AdS curvature-box distinction](1602_global_ads_level_spacing_is_a_curvature_box_gap_not_the_yang_mills_gap_or_a_graviton_mass.md), [the compact constructive gate](../1500-1599/1590_four_dimensional_yang_mills_mass_gap_is_a_constructive_qft_gate_not_a_group_theory_corollary.md), and [the shared-scale no-go](../1500-1599/1597_e6_threshold_descent_leaves_lambda_qcd_exponentially_sensitive_and_no_spin5_su3_scale_is_protected.md)

**Evidence:** [hard-wall ledger](../../../evidence/data/spin23-holographic-hard-wall-gap.json) and [deterministic verifier](../../../verification/verify/verify_spin23_holographic_hard_wall_gap.mjs)

## Result

Holography supplies another constructive ansatz for a discrete glueball-like spectrum. A hard infrared wall in AdS\(_5\) turns the bulk radial equation into a Sturm--Liouville problem with a positive first eigenvalue. But the mass scale is exactly proportional to the imposed wall position:

\[
\boxed{m_n={j_{2,n}\over z_0}.}
\]

The model therefore demonstrates how a geometry can encode a gap. It does not derive the wall, prove the duality to finite-\(N\) pure Yang--Mills, or construct the boundary theory required by the Clay problem.

## Exact scalar-glueball witness

For a massless scalar in AdS\(_5\) dual to the dimension-four operator \(\operatorname{Tr}F^2\), the normalizable radial profile has the form

\[
\phi(z)=z^2J_2(mz).
\]

Impose a Dirichlet wall at \(z=z_0\). Then

\[
J_2(m_nz_0)=0.
\]

The verifier independently evaluates the Bessel series at the first three zeros,

\[
j_{2,n}=(5.13562230,,8.41724414,,11.61984117).
\]

For \(z_0^{-1}=0.3\ \mathrm{GeV}\),

\[
m_n=(1.540687,,2.525173,,3.485952)\ \mathrm{GeV},
\qquad {m_2\over m_1}=1.638992.
\]

The dimensionless ratio follows from the boundary problem. The absolute scale does not.

## Wall sensitivity is exact

Changing \(z_0^{-1}\) from \(0.2\) to \(0.3\) to \(0.4\ \mathrm{GeV}\) moves the lightest state through

\[
m_1=(1.027124,,1.540687,,2.054249)\ \mathrm{GeV}.
\]

Thus

\[
{\partial\ln m_1\over\partial\ln z_0^{-1}}=1.
\]

Calling \(z_0^{-1}\) the confinement scale does not explain confinement; it parameterizes it. A top-down model can replace the hard wall with a smooth cigar, blackening geometry or running background, but then must decouple its Kaluza--Klein and string states and demonstrate that the remaining boundary theory is pure four-dimensional Yang--Mills.

## The dimensional Spin(2,3) obstruction

A direct conformal dual of a 3+1-dimensional field theory uses an AdS\(_5\)-type bulk with isometry \(SO(2,4)\). Spin(2,3) is instead the double cover of the AdS\(_4\) isometry group. It naturally organizes a four-dimensional gravitational bulk whose ordinary conformal boundary is 2+1-dimensional.

Therefore

\[
Spin(2,3)\quad\text{alone}\quad
\not\Rightarrow
\quad\text{an AdS dual of four-dimensional Yang--Mills}.
\]

The programme would need an additional radial/scale organization or a larger \(Spin(2,4)\) parent—the same conformal parent already encountered in the cyclic-cosmology branch. That enlargement must be physically typed: the holographic radial coordinate is an energy-scale direction, not automatically a second observable time or ordinary extra space.

## What holography contributes

- A geometry can turn regularity and boundary conditions into a discrete gauge-invariant spectrum.
- Spectral ratios can be less arbitrary than the absolute scale.
- A smooth confining background can join Wilson-loop area behavior, thermodynamics and normal modes in one calculation.
- Large-\(N\), strong-coupling approximations may expose mechanisms inaccessible to perturbation theory.

## What remains unproved

1. Derive the bulk background and radial endpoint from the four-dimensional gauge measure.
2. Establish the duality for nonsupersymmetric finite-\(N\) pure Yang--Mills.
3. Remove unwanted Kaluza--Klein, matter and string excitations without losing control.
4. Recover reflection-positive boundary Schwinger functions and the regulator-independent \(\mathbb R^4\) theory.
5. Derive any relation between \(z_0^{-1}\), \(\Lambda_{\rm QCD}\) and the Spin(2,3) curvature \(\ell^{-1}\) rather than setting them equal.

Consequently, holography remains a high-value spectral and mechanism factory, but it is not a proof bridge unless those five steps are supplied.

## Sources

- [Witten, anti-de Sitter thermal phase transition and confinement](https://arxiv.org/abs/hep-th/9803131)
- [Csaki and Terning, glueball spectrum from supergravity](https://arxiv.org/abs/hep-th/9903142)
- [Boschi-Filho and Braga, AdS scalar glueball spectrum](https://arxiv.org/abs/hep-th/0207071)
- [Official Yang--Mills problem description](https://www.claymath.org/wp-content/uploads/2022/06/yangmills.pdf)

## Reproduction

~~~powershell
node verification/verify/verify_spin23_holographic_hard_wall_gap.mjs
~~~
