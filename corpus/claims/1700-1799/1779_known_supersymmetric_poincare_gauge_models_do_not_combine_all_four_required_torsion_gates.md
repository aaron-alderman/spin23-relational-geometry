# Known Supersymmetric Poincare-Gauge Models Do Not Combine All Four Required Torsion Gates

**Date:** 23 October 2026

**Status:** named torsionful-supergravity compatibility audit

**Depends on:** [the ordinary-uplift closure](1778_the_known_maximal_uplift_closes_the_form_field_shortcut_and_requires_a_torsionful_parent_extension.md) and [the isolated healthy quadratic PGT witness](../1600-1699/1603_the_first_order_spin23_extension_has_a_nonempty_healthy_gapped_pseudoscalar_torsion_sector.md)

**Evidence:** [compatibility ledger](../../../evidence/data/spin23-supersymmetric_pgt_compatibility_audit-v1.json) and [verifier](../../../verification/verify/verify_spin23_supersymmetric_pgt_compatibility_audit.mjs)

## The four simultaneous gates

A useful torsionful supersymmetric parent must possess all of:

1. local supersymmetry;
2. an independent Lorentz connection;
3. a healthy propagating (0^-) torsion pole; and
4. nonlinear or symmetry-protected consistency.

The known constructions distribute these properties across different theories
but do not combine them.

| construction | local SUSY | independent connection | healthy (0^-) | protected/nonlinear completion |
|---|---:|---:|---:|---:|
| isolated corpus PGT witness | no | yes | yes | no |
| unitary local-SUSY extensions in the Dematteis classes | yes | no surviving propagating connection | no | ordinary supergravity |
| supersymmetric Kuhfuss--Nitsch regime | yes | algebraic in the stated regime | no | no target completion |
| Nishino propagating-connection programme | yes | yes | not established | not established |
| symmetry-first unitary torsionlike catalogue | not imposed | yes | no | linear gauge-protected class |

No row passes all four columns.

## Why the nearest constructions fail

Dematteis tested local supersymmetric extensions of the nine-parameter
Sezgin--van Nieuwenhuizen and seventeen-parameter Neville actions.  Within
those analyzed classes, simultaneous unitarity and local supersymmetry leave
ordinary supergravity rather than a propagating torsion multiplet.

Castro gave a supersymmetric construction of the Kuhfuss--Nitsch Lagrangian,
but the ghost/tachyon-free special regime described in the construction has
only the standard graviton propagating.  Its supercovariant torsion can be
gauged to zero and its connection becomes algebraic.  It therefore does not
supersymmetrize the corpus's isolated massive (0^-) pole.

Nishino's work directly treats the Lorentz connection as an independent
propagating field and is the closest structural match.  However, the cited
tensor calculus is explicitly preliminary, and the coupling check reaches
limited interaction order.  It does not supply a complete isolated massive
(0^-) supermultiplet, global nonlinear health, or radiative closure.

The later Hamiltonian analysis supplies an independent obstruction: the
promising Kuhfuss--Nitsch case does not pass the nonlinear constraint test,
and the coupled (0^-)--(2^-) system develops constraint bifurcation.  The
recent symmetry-first linear catalogue sharpens the protection problem: among
its unitary gauge-defined pair-antisymmetric rank-three models, vector torsion
modes survive but scalar and pseudoscalar torsion modes do not.

## Scope

This is not a theorem excluding every imaginable supersymmetric torsion
theory.  It exhausts the named four-dimensional locally supersymmetric PGT
constructions and the cited symmetry-first linear class.  A counterexample
must be a genuinely new action, not a relabeling of auxiliary supergravity
torsion or a quadratic tuning.

## Sources

- G. Dematteis, [*Supersymmetric formulation of gravity theories with nontrivial Lorentz connection*](https://doi.org/10.1103/PhysRevD.32.3184), for the ordinary-supergravity result in the analyzed unitary locally supersymmetric classes.
- C. Castro, [*A Supersymmetric Lagrangian for Poincaré Gauge Theories of Gravity*](https://doi.org/10.1143/PTP.82.616), for the supersymmetric Kuhfuss--Nitsch construction and its algebraic-connection special regime.
- H. Nishino, [*Local Tensor Calculus in Supergravity with Propagating Lorentz Connexion*](https://doi.org/10.1143/PTP.68.975) and [*Consistency of Couplings in Supergravity Theory with Propagating Lorentz Connexion*](https://doi.org/10.1143/PTP.68.1765), for the independent-connection tensor calculus and limited-order coupling result.
- H.-J. Yo and J. M. Nester, [*Hamiltonian Analysis of Poincare Gauge Theory: Higher Spin Modes*](https://arxiv.org/abs/gr-qc/0112030), for constraint bifurcation and failure of the promising Kuhfuss--Nitsch case.
- W. Barker, C. Marzo and A. Santoni, [*Infrared foundations for quantum geometry II*](https://arxiv.org/abs/2507.05349), for the symmetry-first unitary linear catalogue with vector but no scalar/pseudoscalar torsion modes.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_supersymmetric_pgt_compatibility_audit.mjs
~~~
