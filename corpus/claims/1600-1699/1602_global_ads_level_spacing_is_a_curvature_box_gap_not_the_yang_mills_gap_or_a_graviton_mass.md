# Global AdS Level Spacing Is a Curvature-Box Gap, Not the Yang–Mills Gap or a Graviton Mass

**Date:** 20 October 2026

**Gates:** A1, A2, A4, A6, A7 and A8

**Status:** exact global-AdS mode calculation and flat-limit separation

**Depends on:** [the six-gap firewall](../1500-1599/1593_six_inequivalent_gaps_require_a_type_firewall_before_the_yang_mills_problem_can_join_spin23.md), [the explicit minimal Spin(2,3) action](../1500-1599/1596_the_explicit_minimal_spin23_action_has_only_the_massless_graviton_and_torsion_square_does_not_create_a_gap.md), and [the compact-to-noncompact positivity obstruction](../1500-1599/1598_the_naive_compact_to_spin23_gaussian_bridge_fails_reflection_positivity_before_the_mass_gap_question.md)

**Evidence:** [AdS curvature-gap ledger](../../../evidence/data/spin23-ads-curvature-box-gap.json) and [deterministic verifier](../../../verification/verify/verify_spin23_ads_curvature_box_gap.mjs)

## Result

Spin(2,3) naturally supplies a seventh meaning of “gap.” Global AdS\(_4\) has discrete normal-mode energies of order \(1/\ell\), including for locally massless gauge fields and gravitons:

\[
\boxed{
\Delta_{\rm AdS/box}\sim\ell^{-1}
\ne
\Delta_{\rm YM}
\ne
m_{\rm graviton}.}
\]

This is a curvature-and-boundary-condition level spacing. It is not a dynamically generated mass on \(\mathbb R^4\), and it does not mean that the graviton has acquired a Fierz--Pauli mass.

## Exact scalar witness

For a scalar on global AdS\(_4\), standard quantization gives

\[
\Delta={3\over2}+\sqrt{{9\over4}+m^2\ell^2},
\qquad
\omega_{n,L}\ell=\Delta+L+2n.
\]

For a locally massless scalar, \(m^2=0\) and \(\Delta=3\). At \(\ell=2.5\), the first three selected modes are

\[
\omega_{0,0}=1.2,\qquad
\omega_{0,1}=1.6,\qquad
\omega_{1,0}=2.0.
\]

The angular spacing is \(1/\ell=0.4\), while the radial spacing is \(2/\ell=0.8\). No interaction or dimensional transmutation was required: the scale was already supplied by the background and reflecting conformal boundary.

## The massless graviton has the same warning

The unitary massless spin-2 representation of \(SO(2,3)\) is conventionally denoted \(D(3,2)\), with lowest global energy

\[
E_0={3\over\ell}.
\]

Nevertheless it is massless: it retains the linearized diffeomorphism gauge symmetry and two physical helicities. The curvature-shifted equation derived in claim 1596,

\[
\left(\Box+{2\over\ell^2}\right)h^{\rm TT}_{\mu\nu}=0,
\]

is the AdS massless spin-2 equation. Reading \(2/\ell^2\) as an ordinary positive mass squared would misclassify a curvature term as a broken-gauge mass.

## Flat-limit falsifier

For \(\ell=(1,2,4,8,16)\), the lowest global massless spin-2 energies are

\[
E_0=(3,1.5,0.75,0.375,0.1875).
\]

Thus

\[
\lim_{\ell\to\infty}E_0=0.
\]

The level spacing is not uniform in the flat limit. By contrast, the Clay problem asks for a strictly positive dynamically generated physical gap in a continuum Yang--Mills theory on \(\mathbb R^4\). A curvature box that disappears when its radius is removed cannot establish that theorem.

The patch also matters. Global AdS with reflecting boundary conditions produces a discrete spectrum; the Poincaré patch permits continuous boundary momenta. The group name alone therefore does not even specify the spectral question without a spacetime realization and boundary conditions.

## Consequences for the programme

1. The negative cosmological constant \(\Lambda=-3/\ell^2\) in the minimal MacDowell--Mansouri action supplies an AdS curvature scale, not a Yang--Mills confinement scale.
2. A global energy gap above the AdS vacuum does not contradict a massless graviton or long-range local gravitational response within the AdS geometry.
3. It supplies no mass for torsion, selector or other non-Einstein modes; those require kinetic operators and pole calculations.
4. Matching \(1/\ell\) to \(\Lambda_{\rm QCD}\) would be a new numerical assumption unless one action and renormalization law derives the equality.
5. Any spectral claim must state the AdS patch, boundary conditions, physical observables and whether the flat limit is required.

This closes another tempting shortcut: “Spin(2,3) has a natural scale and global spectral spacing, therefore it explains the Yang--Mills gap.” The premise is true; the conclusion changes the type of gap.

## Updated firewall

The programme must now distinguish seven objects:

\[
\Delta_{\rm finite},\quad
\Delta_{\rm Hessian},\quad
\Delta_{\rm band},\quad
\Delta_{\mathcal L},\quad
\Delta_{T,L,a},\quad
\Delta_{\rm AdS/box},\quad
\Delta_{\rm QFT}.
\]

Only the last, with the compact Yang--Mills construction and limiting data specified in claim 1590, addresses the Millennium problem.

## Sources

- [Metsaev, massless bosonic fields in AdS](https://arxiv.org/abs/hep-th/9810231)
- [MacDowell--Mansouri gravity and Cartan geometry](https://arxiv.org/abs/gr-qc/0611154)
- [MacDowell and Mansouri](https://doi.org/10.1103/PhysRevLett.38.739)

## Reproduction

~~~powershell
node verification/verify/verify_spin23_ads_curvature_box_gap.mjs
~~~
