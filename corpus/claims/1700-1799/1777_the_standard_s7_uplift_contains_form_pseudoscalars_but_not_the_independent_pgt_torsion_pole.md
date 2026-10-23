# The Standard S7 Uplift Contains Form Pseudoscalars but Not the Independent PGT Torsion Pole

**Date:** 23 October 2026

**Status:** eleven-dimensional field-provenance audit

**Depends on:** [the maximal N=8 selector audit](1775_maximal_n8_supersymmetry_still_admits_a_continuous_omega_deformation_at_fixed_quadratic_spectrum.md)

**Evidence:** [uplift field-identity ledger](../../../evidence/data/spin23-s7_uplift_pgt_field_identity_audit-v1.json) and [verifier](../../../verification/verify/verify_spin23_s7_uplift_pgt_field_identity_audit.mjs)

## The strongest available uplift

The ordinary (SO(8))-gauged (N=8) theory has a genuine consistent parent:
standard eleven-dimensional supergravity reduced on (S^7).  This removes one
kind of ambiguity.  The four-dimensional scalar fields have nonlinear uplift
formulae into the internal metric, warp factor, three-form and four-form flux.

It does not remove the field-identity obstruction.  The bosonic gauge
potentials of standard eleven-dimensional supergravity are the metric (or
elfbein) and the three-form (A_3).  In the (S^7) reduction, the familiar
pseudoscalar sector is encoded through internal three-form/flux data, while
the scalar geometry is encoded through the internal metric and warp factor.
Neither origin is an independent Lorentz connection.

## Torsion is not a synonym for a pseudoscalar

The PGT target is a four-dimensional independent connection whose axial
component has a propagating longitudinal (0^-) pole.  A mode of (A_3) can
have the same four-dimensional parity and spin without sharing that field
identity.  Matching representations is necessary but insufficient.

Eleven-dimensional supergravity also uses a supercovariant connection with
gravitino-bilinear torsion.  That statement does not introduce a new
independent bosonic connection coordinate or a bosonic connection kinetic
operator.  On the bosonic background it therefore supplies no additional PGT
torsion pole to normalize and match.

The three available candidates all fail the identity test:

| candidate | eleven-dimensional origin | independent PGT connection? |
|---|---|---|
| internal metric mode | metric/elfbein | no |
| internal pseudoscalar mode | (A_3) or (F_4) | no |
| supercovariant torsion | gravitino bilinear | no independent bosonic pole |

Consequently, the known uplift does not define
(eta=F(g,R_{S^7},\ldots)) for the PGT axial portal.  Such a map would require
a torsionful microscopic extension, a consistent reduction retaining its
connection mode, and the full mixing and threshold calculation.

## Sources

- B. de Wit and H. Nicolai, [*Deformations of gauged SO(8) supergravity and supergravity in eleven dimensions*](https://arxiv.org/abs/1302.6219), for the (S^7) truncation, scalar/pseudoscalar flux ansatz and the obstruction to a generic (omega) uplift.
- O. Krüger, [*Non-linear uplift Ansätze for the internal metric and the four-form field-strength of maximal supergravity*](https://arxiv.org/abs/1602.03327), for the direct metric, warp-factor and three-form/flux uplift formulae.
- K. Becker et al., [*Eleven-Dimensional Supergravity in 4D, N=1 Superspace*](https://arxiv.org/abs/1709.07024), for the eleven-dimensional graviton, gravitini, three-form tensor hierarchy and Kaluza--Klein vector organization.
- K. Becker, D. Butter and A. Sengupta, [*Linearized Off-shell 4+7 Supergeometry of 11D Supergravity*](https://arxiv.org/abs/2207.14327), for the relation among supervielbein, spin connection, super-three-form and torsion constraints.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_s7_uplift_pgt_field_identity_audit.mjs
~~~
