# M-Algebra Gauge Supergravity Has an Independent Connection but Its Dynamical Vacuum Does Not Supply the Target Pole

**Date:** 23 October 2026

**Status:** higher-dimensional independent-connection audit

**Depends on:** [the supersymmetric PGT compatibility boundary](1780_the_torsionful_supersymmetry_route_now_ends_at_a_new_four_gate_parent_not_a_known_completion.md) and [the standard eleven-dimensional uplift audit](1778_the_known_maximal_uplift_closes_the_form_field_shortcut_and_requires_a_torsionful_parent_extension.md)

**Evidence:** [M-algebra ledger](../../../evidence/data/spin23-m_algebra_torsion_parent_audit-v1.json) and [verifier](../../../verification/verify/verify_spin23_m_algebra_torsion_parent_audit.mjs)

## A genuine independent-connection parent

The M-algebra gauge-supergravity construction is structurally different from
Cremmer--Julia--Scherk eleven-dimensional supergravity.  Its vielbein, Lorentz
connection, gravitino and two additional Lorentz-tensor one-forms are
components of a single M-algebra connection.  Local supersymmetry and an
independent spin connection are therefore present simultaneously.

That makes it a stronger candidate than simply reinterpreting an (A_3)
pseudoscalar as torsion.  It passes the first two four-gate tests directly.

## Vacuum degeneracy is the obstruction

The same construction reports a multiplicity of degenerate vacua with no
propagating degrees of freedom.  Dynamics appears on a special warped-product
family (S^{10-d}\times X_{d+1}), and a nontrivial graviton propagator occurs
only for (d=4) with positive cosmological constant.  Metric perturbations
then reproduce linearized general relativity on four-dimensional de Sitter
space.

This is not the required result.  The target branch needs an anti-de Sitter or
Spin((2,3)) broken phase with a separately demonstrated, positive-residue
massive axial connection pole.  The cited M-algebra construction derives
neither that pole nor its mass and residue.  Its established four-dimensional
dynamical sector is the graviton sector of de Sitter GR.

It also does not contain the observed matter-fermion sector or a normalized
map from the connection to the axial current.  Consequently no function
(eta=F(	ext{M-algebra data})) is available and (1/8) is not selected.

## Gate result

| gate | result |
|---|---|
| local supersymmetry | pass |
| independent Lorentz connection | pass |
| healthy propagating (0^-) pole | fail/not derived |
| target vacuum and fermion matching | fail/not derived |

The model is therefore an important existence proof for the first two gates,
not a completion of all four.

## Sources

- M. Hassaïne, R. Troncoso and J. Zanelli, [*Poincaré invariant gravity with local supersymmetry as a gauge theory for the M-algebra*](https://arxiv.org/abs/hep-th/0306258), for the M-algebra extension and special four-dimensional positive-cosmological-constant propagator.
- M. Hassaïne, R. Troncoso and J. Zanelli, [*11D Supergravity as a gauge theory for the M-algebra*](https://arxiv.org/abs/hep-th/0503220), for the single-connection field content, degenerate vacua and warped-product reduction.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_m_algebra_torsion_parent_audit.mjs
~~~
