# Sector Real Structures Form a Phase Torus, So Their Relative Product Is Not a Canonical Flavor Observable

**Date:** 17 October 2026  
**Branches:** B01, B03, B06, B08 and B11  
**Claim status:** exact classification for nondegenerate Hermitian spurions; source selection of a particular antiunitary remains open

## 1. Refining the sector-mismatch picture

Each nondegenerate Hermitian flavor spurion admits an involutive antiunitary that fixes it. However, that antiunitary is not unique.

Let

\[
H=VDV^\dagger,
\qquad
D=\operatorname{diag}(d_1,d_2,d_3)
\]

with distinct real eigenvalues. In the eigenbasis, every antiunitary

\[
J_{\boldsymbol\eta}
=E_{\boldsymbol\eta}K,
\qquad
E_{\boldsymbol\eta}
=\operatorname{diag}(\eta_1,\eta_2,\eta_3),
\quad |\eta_i|=1,
\]

satisfies

\[
J_{\boldsymbol\eta}^2=1,
\qquad
J_{\boldsymbol\eta}DJ_{\boldsymbol\eta}^{-1}=D.
\]

In the original basis,

\[
J_{\boldsymbol\eta}
=A_{\boldsymbol\eta}K,
\qquad
A_{\boldsymbol\eta}=VE_{\boldsymbol\eta}V^T.
\]

## 2. Exact classification

For a nondegenerate spectrum, an antiunitary fixing \(H\) must preserve each one-dimensional eigenline. Its action on that line is conjugation times a unit phase. Therefore the full family is

\[
\boxed{
\{J:J^2=1, JHJ^{-1}=H\}\cong U(1)^3.
}

Multiplying the whole antiunitary by one common phase does not change its adjoint action, but the relative eigenline phases remain.

This torus is the antiunitary analogue of choosing phases for the three eigenvectors.

## 3. Relative products depend on those choices

Choose antiunitaries

\[
J_u=A_uK,
\qquad
J_d=A_dK
\]

fixing two sectors. Their product is the linear unitary

\[
R_{ud}=J_uJ_d=A_u\overline{A_d}.
\]

Changing the eigenline phases in either \(A_u\) or \(A_d\) changes \(R_{ud}\) while leaving \(H_u,H_d\) completely unchanged.

Thus quantities such as

\[
\operatorname{Tr}R_{ud},
\qquad
\operatorname{spec}R_{ud}
\]

are not canonical functions of the two Hermitian spurions unless an extra rule fixes the sector antiunitaries.

The phrase “CP is the mismatch of sector real structures” is therefore a useful geometric intuition but not yet an invariant formula.

## 4. What is canonical

The spectral projectors

\[
P_i^u,qquad P_j^d
\]

are independent of eigenvector phases. Hence the quadrilateral

\[
\mathcal B_{ik;j\ell}
=\operatorname{Tr}(P_i^uP_j^dP_k^uP_\ell^d)
\]

is canonical, as are

\[
\operatorname{Im}\mathcal B_{ik;j\ell}
\]

and

\[
\operatorname{ImTr}[H_u,H_d]^3.
\]

These measure the relative position of the two spectral flags without choosing conjugations on the individual eigenlines.

Thus the correct refinement is:

\[
\boxed{
\text{flavor CP is encoded by the relative spectral flags, not by an arbitrary product of sector conjugations.}
}

## 5. Common-real-structure obstruction remains canonical

Although individual real structures are nonunique, the **existence** of one antiunitary fixing both sectors is a basis-invariant question.

If such a common antiunitary exists, the pair has a simultaneously real representative and every CP-odd projector quartet vanishes. Conversely, a nonzero commutator cubic proves that no common involutive antiunitary can fix both sectors.

Therefore:

- “which sector antiunitary?” is phase-gauge dependent;
- “does a common sector antiunitary exist?” is canonical;
- the projector quadrilateral quantifies the obstruction without choosing one.

## 6. Degenerate spectra

If \(H\) has a degenerate eigenspace, the family enlarges. Within a multiplicity-\(m\) real eigenspace, compatible conjugations are related by additional unitary choices, not merely eigenline phases.

The nondegenerate \(U(1)^3\) classification must then be replaced by a homogeneous-space analysis of conjugations on each eigenspace.

This reinforces the value of spectral projectors and non-Abelian flag invariants: they adapt naturally to degenerate blocks.

## 7. Implication for Furey/ex-ceptional selection

A source-level conjugation from octonionic, CAR or exceptional data could select a particular point in the antiunitary torus. If two sectors inherit their conjugations from one larger structure, the relative product may become meaningful.

But that is additional data. It cannot be reconstructed from the Hermitian mass-squared matrices alone.

Any claim that Furey conjugation explains CKM/PMNS phases must specify:

1. which antiunitary acts on each generation space;
2. how its eigenline phases are fixed;
3. why those choices are basis covariant;
4. how the resulting invariant reduces to a projector quartet or measured mixing phase.

## 8. Branch decision

- **Closed:** involutive antiunitaries fixing a nondegenerate three-flavor Hermitian matrix form a \(U(1)^3\) family.
- **Closed:** their phase freedom leaves the Hermitian spurion unchanged.
- **Closed:** the relative product of independently chosen sector antiunitaries is not canonical.
- **Closed:** projector quadrilaterals and commutator cubics are canonical relative-flag invariants.
- **Closed:** nonzero Jarlskog invariants canonically obstruct existence of one common real structure.
- **Open:** a Furey, CAR or exceptional source that selects particular sector antiunitaries including eigenline phases.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** a source conjugation uniquely fixes the sector antiunitories modulo a common irrelevant phase and their relative product yields the observed projector quartets.

**Classification falsifier:** find an involutive antiunitary fixing a nondegenerate Hermitian matrix that does not preserve each eigenline up to phase.

**Canonicity falsifier:** vary eigenline phases, keep both Hermitian spurions fixed, and obtain an unchanged claimed relative-antiunitary observable without proving phase cancellation.

**Common-structure falsifier:** a nonzero commutator cubic coexists with one antiunitary fixing both spurions.

**Degeneracy warning:** do not apply the \(U(1)^3\) classification unchanged inside a degenerate eigenspace.

## 10. Certificate

The [sector-real-structure phase-torus certificate](scripts/verify_sector_real_structures_form_phase_torus_and_relative_product_is_noncanonical.mjs) constructs multiple involutive antiunitaries fixing the same complex spurion, demonstrates variation of their relative products, and verifies invariance of the projector quartet and commutator cubic.

## Companion documents

- [Universal flavor real-structure no-go](441_a_universal_flavor_real_structure_stabilizes_only_an_orthogonal_subgroup_and_forces_the_jarlskog_invariant_to_vanish.md)
- [Projector-quadrilateral holonomy](438_projector_quadrilateral_holonomy_recovers_the_jarlskog_quartet_without_extending_rank_deficient_polar_transport.md)
- [Marginal-safe entangler split](440_marginal_safe_sigma_y_entanglers_split_exactly_into_graded_real_and_genuinely_complex_parent_sectors.md)
- [Furey conjugation and opposite spinor](414_dirac_doubling_is_an_internal_weyl_face_exchange_while_charge_conjugation_requires_the_opposite_spinor.md)
