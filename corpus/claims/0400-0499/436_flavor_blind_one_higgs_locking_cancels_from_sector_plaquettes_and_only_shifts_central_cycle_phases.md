# Flavor-Blind One-Higgs Locking Cancels from Sector Plaquettes and Only Shifts Central Cycle Phases

**Date:** 17 October 2026  
**Branches:** B03, B06, B08, B11 and B14  
**Claim status:** exact central-cancellation theorem; dynamical origin of block-locking coefficients remains open

## 1. One physical Higgs in two block channels

The cyclic Furey topology requires two Higgs-shaped block arrows,

\[
h_C:C\to H,
\qquad
h_D:D\to H.
\]

They may be independent doublets, or two block components of one physical Higgs field:

\[
h_{\rm phys}=\alpha h_C+\beta h_D.
\]

If the Higgs carries no generation index, its action on the flavor multiplicity space is scalar. The unitary polar factors of the two block components then have the form

\[
T_{h_C}=z_CI_3,
\qquad
T_{h_D}=z_DI_3,
\qquad z_C,z_D\in U(1).
\]

Their positive polar factors carry \(|\alpha|,|\beta|\) and the electroweak vacuum magnitude.

## 2. Quark cycles

Write the matter-path transports

\[
M_u=T_{u^c}T_Q,
\qquad
M_d=T_{d^c}T_Q.
\]

The Yukawa-cycle holonomies are

\[
U_u=z_CM_u,
\qquad
U_d=z_DM_d.
\]

Their group commutator is

\[
\begin{aligned}
[U_u,U_d]
&=(z_CM_u)(z_DM_d)(z_CM_u)^{-1}(z_DM_d)^{-1}\\
&=M_uM_dM_u^{-1}M_d^{-1}\\
&=[M_u,M_d].
\end{aligned}
\]

Therefore

\[
\boxed{
W_q=[U_u,U_d]\text{ is independent of }z_C,z_D.
}
\]

A flavor-blind Higgs cannot generate or alter the non-Abelian quark plaquette character.

## 3. Lepton cycles

Similarly define

\[
M_e=T_LT_{e^c},
\qquad
M_\nu=T_LT_{\nu^c}.
\]

The return paths use the dagger Higgs transports:

\[
U_e=\bar z_CM_e,
\qquad
U_\nu=\bar z_DM_\nu.
\]

Hence

\[
\boxed{
[U_\nu,U_e]=[M_\nu,M_e].
}

The PMNS-type plaquette is also independent of the scalar Higgs embedding phases.

## 4. What the Higgs phases do affect

They enter the Abelian cycle determinants:

\[
\det U_u=z_C^3\det M_u,
\qquad
\det U_d=z_D^3\det M_d,
\]

and

\[
\det U_e=\bar z_C^3\det M_e,
\qquad
\det U_\nu=\bar z_D^3\det M_\nu.
\]

Thus the block-locking phases affect central line holonomies while cancelling from traceless plaquettes.

The paired matter cycles satisfy

\[
\det(U_eU_u)=\det(M_eM_u),
\qquad
\det(U_\nu U_d)=\det(M_\nu M_d),
\]

so the scalar Higgs phases also cancel between each Yukawa cycle and its conjugate return partner.

## 5. Magnitudes remain physical

For the full nonunitary amplitudes, the coefficients \(|\alpha|,|\beta|\), Yukawa singular values and Higgs vacuum expectation value do not cancel. They control masses, residue strengths and the positive response cone.

The cancellation theorem applies only to normalized unitary holonomy. It does not imply that the two Higgs block components are physically indistinguishable.

In particular, a two-Higgs model can have additional scalar mixing, relative vacuum phases and flavor matrices that introduce new CP sources. The theorem covers the flavor-blind one-doublet locking hypothesis.

## 6. Consequence for the source of CP

Under flavor-blind one-Higgs locking:

\[
\boxed{
\text{non-Abelian flavor CP resides in the matter/Yukawa transports, not in }h_C,h_D.
}

The Higgs block topology selects which paths close and how magnitudes enter, but it does not by itself generate CKM or PMNS phases.

This cleanly separates:

- relational topology: which cycles exist;
- Higgs locking: scalar block weights and central phases;
- flavor orientation: noncommuting matter-path transports;
- response geometry: positive polar magnitudes and \(H_2(\mathbb R)\) residues.

## 7. Relation to the weak determinant phase

The scalar phases \(z_C,z_D\) are possible phase-sensitive inputs for the central line-holonomy branch. However, ordinary Higgs field rephasings and hypercharge gauge transformations act on them. A physical relation to the exceptional weak determinant line must be gauge invariant and cannot use either phase separately.

The paired determinant cancellations suggest that only combinations involving additional exceptional or Pfaffian data could survive as a sewing invariant.

No such relation has yet been derived.

## 8. Branch decision

- **Closed:** flavor-blind Higgs block transports are central scalars on generation space.
- **Closed:** those phases cancel exactly from quark and lepton group-commutator plaquettes.
- **Closed:** they shift individual central cycle determinants by cubes.
- **Closed:** they cancel from the determinants of the paired matter-cycle composites.
- **Open:** source dynamics fixing \(\alpha,\beta\) and whether one or two physical doublets occur.
- **Open:** a gauge-invariant combination tying Higgs block phases to the exceptional/Furey determinant-line sewing.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** derive a gauge-invariant Higgs/exceptional phase combination that fixes the central graph holonomies modulo \(\mathbb Z_6\) while leaving the measured non-Abelian plaquettes unchanged.

**Plaquette falsifier:** scalar multiplication of either cycle generator changes its group commutator.

**Flavor-blindness falsifier:** the physical Higgs block acts by a noncentral generation matrix in the minimal one-Higgs Standard Model without additional flavor spurions.

**Magnitude falsifier:** infer cancellation of Yukawa eigenvalues or Higgs vacuum magnitudes from cancellation of unitary polar phases.

**CP-source falsifier:** attribute CKM/PMNS noncommutativity solely to central Higgs embedding phases.

## 10. Certificate

The [flavor-blind Higgs locking certificate](../../../verification/verify/verify_flavor_blind_higgs_locking_cancels_from_sector_plaquettes.mjs) checks exact central cancellation from quark and lepton plaquettes, the cube shifts of individual determinants and cancellation in paired matter-cycle determinants.

## Companion documents

- [Higgs-augmented four-cycle theorem](435_the_higgs_augmented_linking_graph_has_four_yukawa_cycles_and_the_two_matter_cycles_are_paired_composites.md)
- [Central/traceless two-cycle factorization](433_the_two_cycle_representation_variety_separates_central_line_holonomies_from_the_traceless_cp_plaquette.md)
- [Cyclic Yukawa topology selection](../0100-0199/111_furey_cyclic_yukawa_topology_selection.md)
- [Furey Higgs-doublet nonuniqueness](../0100-0199/105_furey_higgs_doublet_nonuniqueness.md)
