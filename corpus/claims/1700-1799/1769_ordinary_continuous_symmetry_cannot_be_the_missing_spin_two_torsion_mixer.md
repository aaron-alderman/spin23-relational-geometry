# Ordinary Continuous Symmetry Cannot Be the Missing Spin-Two--Torsion Mixer

**Date:** 23 October 2026

**Status:** conditional representation and S-matrix symmetry classification

**Depends on:** [the standard bimetric Ward boundary](1768_the_standard_positive_bimetric_route_ends_at_a_genuinely_new_cross_sector_principle.md), [the commuting grading no-go](1742_the_commuting_uv_grading_class_is_closed_and_every_surviving_flavor_selector_changes_the_model.md), and [the minimal supersymmetry audit](1752_local_supersymmetry_fails_as_a_selector_and_string_normalization_is_the_next_model_branch.md)

**Evidence:** [symmetry-classification ledger](../../../evidence/data/spin23-cross-sector-symmetry-classification-v1.json) and [verifier](../../../verification/verify/verify_spin23_cross_sector_symmetry_classification.mjs)

## Exact commutant obstruction

An ordinary internal generator \(B\) commutes with the Poincaré generators.
It therefore commutes with both Casimirs,

\[
 [B,P^2]=[B,W^2]=0.
\]

For massive one-particle states,

\[
 W^2=-m^2s(s+1).
\]

Taking a matrix element between spin-two and spin-zero states gives

\[
 \bigl(w_2-w_0\bigr)\langle 2|B|0\rangle=0.
\]

The eigenvalues are distinct, so \(\langle2|B|0\rangle=0\).  A bosonic
internal symmetry can act within multiplicity spaces, but it cannot rotate
the bimetric spin-two mode into the torsion pseudoscalar.  If it merely assigns
charges to the separately invariant axial portal, it may allow or forbid that
operator; without further dynamics it does not fix its allowed coefficient to
\(1/8\).

## Conditional S-matrix classification

Coleman and Mandula prove a stronger result under explicit assumptions:
Poincaré invariance, finitely many particle species below each mass bound,
analytic nontrivial scattering, and regularity of symmetry generators imply
that a connected bosonic symmetry is locally a direct product of Poincaré and
internal symmetry.  Such a symmetry supplies no bosonic generator that mixes
the spin sectors required here.

This theorem is a conditional route classifier, not an unconditional quantum-
gravity theorem.  Massless long-range gravity complicates ordinary asymptotic
states and scattering analyticity.  AdS, topological, nonlocal, higher-spin or
infinite-tower constructions can lie outside its assumptions.

## Graded loophole

The Haag--Łopuszański--Sohnius classification admits supersymmetric graded
extensions under corresponding S-matrix assumptions.  Supersymmetry can link
different spins, but necessarily enlarges the multiplet.  The minimal
\(N=1\) torsion realization has already been tested: its chiral embedding adds
partners and retains a continuous Kähler coupling.  Extended or broken
supersymmetry is therefore a new-model construction, not an unexecuted
consequence of the bimetric parent.

## Sources

- S. Coleman and J. Mandula, [*All Possible Symmetries of the S Matrix*](https://journals.aps.org/pr/abstract/10.1103/PhysRev.159.1251), for the direct-product theorem and its five stated assumptions.
- R. Haag, J. T. Łopuszański and M. Sohnius, [*All Possible Generators of Supersymmetries of the S Matrix*](https://inspirehep.net/literature/90850), for the graded supersymmetry classification and central-charge extension.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_cross_sector_symmetry_classification.mjs
~~~
