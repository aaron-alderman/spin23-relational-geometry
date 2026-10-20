# Any Ordinary \(\mathbb Z_2\) Preserving the Required Dirac and Majorana Vertices Also Allows the Composite Leakage

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact physical-vertex no-go and correction of the field-parity interpretation; categorical realization remains open

**Depends on:** [the tensor-stable relation grading](1506_arbitrary_physical_multiplicity_preserves_relation_sheet_parity_and_generalized_fluctuations_cannot_create_odd_leakage.md), [the sector-reflection naturalness candidate](1503_the_sector_reflection_forbids_odd_leakage_sources_but_exact_protection_requires_its_unbroken_positive_mass_phase.md), and [the sequential-seesaw correlation theorem](../1400-1499/1497_the_selected_heavy_neutrino_bridge_generates_an_apparent_Dirac_leakage_but_its_complete_Schur_package_preserves_the_texture_zero.md)

**Evidence:** [ordinary-parity no-go ledger](../../../evidence/data/spin23-ordinary-Z2-composite-leakage-no-go.json) and [exhaustive field-sign verifier](../../../verification/verify/verify_spin23_ordinary_Z2_cannot_forbid_composite_Dirac_leakage.mjs)

## Result

The relation-sheet reflection cannot be interpreted as an ordinary
\(\mathbb Z_2\) acting on the unduplicated physical fields.

The model must retain both required renormalizable vertices

\[
\mathcal O_D=L_P H\nu_P^c,
\qquad
\mathcal O_M=S\nu_P^c\nu_N^c.
\]

Their product contains the dangerous dimension-five operator

\[
\mathcal O_5=S L_P H\nu_N^c.
\]

For every multiplicative field parity,

\[
\boxed{
\epsilon(\mathcal O_5)
=\epsilon(\mathcal O_D)\epsilon(\mathcal O_M),}
\]

because \(\epsilon(\nu_P^c)^2=1\). Therefore both required vertices even
implies the composite leakage is even.

## 1. Exhaustive field-sign audit

Assign independent signs to \(L_P,H,\nu_P^c,S,\nu_N^c\). There are
\(2^5=32\) assignments. Exactly eight make both required renormalizable
vertices even. All eight also make \(\mathcal O_5\) even. None protects the
mask.

This exhausts every ordinary \(\mathbb Z_2\) assignment on the five fields,
not merely one guessed charge table.

## 2. Why relation-sheet parity is not contradicted

Claims 1504--1506 place \(\Gamma_{\rm rel}\) on lifted relation states or
arrows, not on the five unduplicated endpoints. The safe Dirac and desired
Majorana relations occupy different typed modules even though they share the
visible field \(\nu_P^c\).

An arrow grading need not factor as endpoint signs. Claim 1504 proved that
such factorization is impossible on the coarse graph; the present theorem
shows that the obstruction survives after including \(H\) and \(S\).

Thus

\[
\boxed{\Gamma_{\rm rel}\text{ is a relation grading, not an ordinary
zero-form field parity}.}
\]

## 3. The sequential seesaw resolves the apparent paradox

Integrating out the selected heavy neutrino uses precisely the two required
vertices and produces an apparent \(S L_P H\nu_N^c\) coupling. The no-go
predicts that the same ordinary symmetry cannot forbid it.

Claim 1497 supplies the resolution: the apparent Dirac term is one member of
a complete Schur-complement packet. A correlated contact term and shifted
Majorana exchange cancel its contribution to the protected cofactor exactly.

The physical distinction is therefore

\[
\boxed{\text{correlated reducible composite versus independent leakage
coefficient}.}
\]

That is a relation/composition distinction, not an endpoint-charge
distinction.

## 4. Correction to the naturalness interpretation

Claim 1503 correctly derives an involution on the two-channel relation bundle
and removes odd terms in a relation-level action. It cannot be invoked as a
conventional field symmetry to forbid every local dimension-five monomial.
Consequently:

- an ordinary discrete-symmetry naturalness claim is unavailable;
- a conventional \(\mathbb Z_2\) anomaly audit is premature;
- the projector energy is a relation-bundle action, not yet a standard
  particle-field potential;
- exact protection must use typed composition or complete matching
  correlations.

## 5. Fan downward: EFT consequence

The Wilson coefficient must be classified by origin:

1. a Schur-correlated coefficient fixed by the required vertices and
   accompanied by its canceling packet;
2. an independent coefficient not tied to that packet, which linearly lifts
   the texture zero as in claim 1495.

Relation typing may exclude the second from the primitive arrow calculus, but
it cannot erase the first monomial from an ordinary EFT operator list.

## 6. Fan upward: categorical target

The missing middle must distinguish primitive arrows from composites and
remember their matching packet. Candidate languages include a graded
correspondence category, a quiver with typed path relations, a relation-bundle
superconnection, or a groupoid/defect calculus.

The action must assign parity to morphisms, preserve the Schur identities,
and exclude independent odd generators without declaring a symmetry of the
unduplicated fields that this theorem proves cannot exist.

## 7. Spin(2,3) joining interpretation

The twin-wheel distinction cannot be collapsed onto particles at vertices.
It belongs to how relationships compose:

\[
\boxed{\text{same physical endpoints and charges, but different typed
arrows and matching laws}.}
\]

That is the precise sense in which the proposed Spin(2,3) middle is
relational rather than another internal gauge factor.

## Boundaries

**Group boundary:** the theorem is exact for multiplicative \(\mathbb Z_2\)
field signs. Non-Abelian, higher, categorical or non-invertible symmetries
require separate analysis.

**Coefficient boundary:** allowing the operator does not prove an independent
Wilson coefficient is generated; matching correlations can fix it inside a
canceling packet.

**Quantum boundary:** no functorial or path-integral implementation of the
relation grading has yet been constructed.

**Physical-completion boundary:** the full Pati--Salam inventory still needs
a primitive-versus-composite classification.

## Verdict

The ordinary-field-symmetry route is closed:

\[
\boxed{\mathcal O_D\text{ even and }\mathcal O_M\text{ even}
\Longrightarrow\mathcal O_5\text{ even for every field }\mathbb Z_2.}
\]

The next viable construction is categorical: represent the two required
vertices as typed arrows, retain their correlated Schur composite, and prove
that no independent leakage arrow belongs to the generated relation calculus.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_ordinary_Z2_cannot_forbid_composite_Dirac_leakage.mjs
node verification/verify/verify_spin23_relation_sheet_parity_survives_tensor_multiplicity_and_generalized_fluctuation.mjs
node verification/verify/verify_spin23_sequential_seesaw_bridge_cancellation.mjs
~~~
