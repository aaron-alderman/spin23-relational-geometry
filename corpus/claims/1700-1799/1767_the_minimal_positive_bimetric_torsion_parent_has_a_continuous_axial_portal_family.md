# The Minimal Positive Bimetric--Torsion Parent Has a Continuous Axial-Portal Family

**Date:** 23 October 2026

**Status:** explicit standard-Ward cross-sector non-selection theorem

**Depends on:** [the standard-positive bimetric selection](1766_positive_reconstruction_selects_the_bimetric_escape_but_still_cannot_select_one_eighth.md) and [the healthy critical pseudoscalar torsion sector](../1600-1699/1622_the_full_local_pgt_route_contains_a_healthy_critical_pseudoscalar_sector_but_not_an_open_quantum_region.md)

**Evidence:** [product-parent ledger](../../../evidence/data/spin23-bimetric-torsion-product-ward-audit-v1.json) and [verifier](../../../verification/verify/verify_spin23_bimetric_torsion_product_ward_audit.mjs)

## Minimal joined parent

At the quadratic reference vacuum, join the positive bimetric eigenmodes
\(h_0,h_m\) to the healthy pseudoscalar torsion coordinate \(\phi\):

\[
 \mathcal L_2=
 {1\over2}h_0K_0h_0+{1\over2}h_mK_mh_m
 +{1\over2}(\partial\phi)^2-{1\over2}m_\phi^2\phi^2
 +J_{\rm TT}(\cos\theta,h_0+\sin\theta,h_m)
 +\eta\,\phi\,\partial_\mu J_5^\mu.
\]

The last term is the reduced pseudoscalar form of the axial-torsion portal.
It is a scalar under diagonal diffeomorphisms and local Lorentz symmetry for
every real \(\eta\).  Those symmetries constrain the tensor/current
structures but do not constrain the coefficient multiplying this separately
invariant operator.

## Finite healthy witnesses

Choose \(\tan\theta=1\), \(m_2^2=1\), and \(m_\phi^2=2\).  The two spin-two
source residues are \((1/2,1/2)\), and all three free poles are positive.
The theories

\[
 \eta=0,\qquad \eta={1\over8},\qquad \eta={1\over4}
\]

have the same free Hessian, pole masses, residues and standard Ward
identities.  The source portal changes, but free health does not.

This construction is deliberately minimal.  It does not claim that a generic
nonlinear coupling of PGT torsion to both metrics preserves the Hassan--Rosen
constraint, nor that loops close on this sparse action.  Those requirements
can reject a candidate parent.  They cannot make the displayed standard
symmetries distinguish the three values at tree level.

## Consequence

The cross-sector relation demanded by the positive-reconstruction checkpoint
is not a hidden consequence of diagonal bimetric diffeomorphisms or ordinary
local Lorentz symmetry.  It must come from additional parent structure that
acts nontrivially across the spin-two, torsion and matter sectors.  Earlier
audits already show that generic local supersymmetry and commuting internal
gradings do not provide that structure.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_bimetric_torsion_product_ward_audit.mjs
~~~
