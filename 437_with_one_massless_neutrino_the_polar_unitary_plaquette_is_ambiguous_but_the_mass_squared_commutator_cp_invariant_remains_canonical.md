# With One Massless Neutrino the Polar-Unitary Plaquette Is Ambiguous, but the Mass-Squared Commutator CP Invariant Remains Canonical

**Date:** 17 October 2026  
**Branches:** B03, B06, B08, B11 and B14  
**Claim status:** exact rank-two polar-extension obstruction and canonical Hermitian-spurion alternative

## 1. Rank-two neutrino amplitude

Let a three-generation Dirac-neutrino amplitude have rank two:

\[
M_\nu=U_L
\operatorname{diag}(0,m_2,m_3)
U_R^\dagger,
\qquad m_2,m_3>0.
\]

Its polar decomposition gives a partial isometry

\[
V_\nu
=U_L\operatorname{diag}(0,1,1)U_R^\dagger.
\]

It is canonical on the support of \(|M_\nu|\), but it does not specify a map from the one-dimensional right kernel to the one-dimensional left kernel.

## 2. Family of full-unitary extensions

Every unitary extension has the form

\[
\widetilde V_\nu(\phi)
=U_L\operatorname{diag}(e^{i\phi},1,1)U_R^\dagger
\]

after fixed choices of normalized kernel vectors. All such extensions agree with \(V_\nu\) on the rank-two support.

The phase \(\phi\) is not fixed by \(M_\nu\). It is an arbitrary identification of the two null lines.

## 3. The naive unitary plaquette is not canonical

Let \(U_e\) be a generic charged-lepton cycle transport. Form

\[
W_\ell(\phi)
=[\widetilde V_\nu(\phi),U_e].
\]

Unless \(U_e\) preserves the neutrino kernel projector, the trace character

\[
\operatorname{ImTr}W_\ell(\phi)
\]

depends on \(\phi\).

Therefore

\[
\boxed{
\text{the full-unitary polar plaquette is not intrinsic when }\operatorname{rank}M_\nu<3.
}
\]

Choosing a convenient extension and reporting its plaquette as physical would introduce an unobservable null-line convention.

## 4. Canonical Hermitian spurions survive rank loss

The left mass-squared operator

\[
H_\nu=M_\nu M_\nu^\dagger
=U_L\operatorname{diag}(0,m_2^2,m_3^2)U_L^\dagger
\]

is independent of \(U_R\) and of every null-line extension phase. Likewise,

\[
H_e=M_eM_e^\dagger
\]

is canonical on the shared left-handed lepton flavor space.

The CP-odd invariant

\[
\boxed{
\mathcal J_\ell
=\operatorname{ImTr}[H_e,H_\nu]^3
}

is therefore well-defined even when one neutrino mass is zero.

One zero eigenvalue does not force it to vanish. The mass-difference prefactor contains

\[
(m_2^2-0)(m_3^2-0)(m_3^2-m_2^2),
\]

which is nonzero when \(m_2,m_3\) are distinct and nonzero.

## 5. PMNS rephasing agrees with the invariant conclusion

The mixing matrix can be written

\[
U_{\rm PMNS}=U_{Le}^\dagger U_{L\nu}.
\]

Rephasing the massless neutrino eigenvector multiplies one column by \(e^{i\phi}\). The Jarlskog quartet

\[
J_{\rm PMNS}
=\operatorname{Im}
\left(U_{11}U_{22}\overline{U_{12}U_{21}}\right)
\]

is unchanged because the column phase cancels.

Thus the physical Dirac-type CP invariant is compatible with a massless neutrino, even though a full polar-unitary extension is not canonical.

## 6. Correct graph object for rank-deficient edges

For rank-deficient amplitudes, the graph should retain:

- the support projectors
  \[
  P_R=V_\nu^\dagger V_\nu,
  \qquad
  P_L=V_\nu V_\nu^\dagger;
  \]
- the partial isometry \(V_\nu:P_R F_R\to P_LF_L\);
- the positive operator \(|M_\nu|\);
- canonical Hermitian composites such as \(M_\nu M_\nu^\dagger\).

Closed-path products must either remain on compatible support subspaces or be formulated using the Hermitian spurions. A full \(U(3)\) graph connection is available only after adding noncanonical kernel transport.

This suggests a groupoid/partial-isometry version of the linking holonomy rather than an ordinary unitary representation of the entire cycle graph.

## 7. Consequence for the plaquette programme

There are now two regimes:

### Full-rank regime

Polar unitaries are canonical and sector plaquettes are well-defined.

### Rank-deficient regime

Polar transports are partial isometries; full-unitary plaquettes depend on null-space extensions. The canonical CP observables are constructed from shared-side Hermitian mass-squared operators or support-projector holonomies.

The commutator-exponential and rectangular-loop theorems remain valid when applied to \(H_e,H_\nu\), regardless of the zero eigenvalue.

## 8. Branch decision

- **Closed:** a rank-two square amplitude has a one-phase family of full-unitary polar extensions.
- **Closed:** a generic unitary plaquette trace depends on that extension phase.
- **Closed:** \(H_\nu=M_\nu M_\nu^\dagger\) and \(\operatorname{ImTr}[H_e,H_\nu]^3\) are extension independent.
- **Closed:** one zero neutrino mass does not force the Dirac-type CP invariant to vanish.
- **Closed:** PMNS Jarlskog quartets are invariant under rephasing of the massless eigenstate.
- **Open:** a complete partial-isometry/groupoid holonomy formulation on the Higgs-augmented Furey graph.
- **Open:** whether the lightest neutrino mass is exactly zero.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** derive a support-projector or groupoid plaquette directly from the Furey/Higgs action whose character equals the leptonic commutator cubic without choosing a null-line extension.

**Extension falsifier:** the proposed rank-deficient polar plaquette is unchanged under every allowed kernel-extension phase for a generic charged-lepton transport.

**Massless-CP falsifier:** claim that one zero neutrino mass alone forces the three-generation Dirac Jarlskog invariant to vanish.

**Canonicality falsifier:** use a chosen full-unitary extension of a partial isometry without checking extension independence.

**Majorana warning:** additional Majorana phases require separate invariants and are not captured by this Dirac commutator cubic.

## 10. Certificate

The [rank-two neutrino polar-extension certificate](scripts/verify_massless_neutrino_polar_extension_ambiguity_and_canonical_cp_invariant.mjs) constructs a rank-two complex amplitude, exhibits phase-dependent full-unitary plaquettes, verifies extension independence and nonvanishing of the Hermitian commutator cubic, and checks PMNS quartet invariance under null-column rephasing.

## Companion documents

- [Flavor-blind one-Higgs locking](436_flavor_blind_one_higgs_locking_cancels_from_sector_plaquettes_and_only_shifts_central_cycle_phases.md)
- [Polar edge transports](434_polar_decomposition_canonically_extracts_cycle_transports_from_invertible_flavor_edge_amplitudes.md)
- [Higgs-augmented four-cycle theorem](435_the_higgs_augmented_linking_graph_has_four_yukawa_cycles_and_the_two_matter_cycles_are_paired_composites.md)
- [Commutator-exponential CP character](429_the_commutator_exponential_has_the_jarlskog_cubic_as_its_leading_cp_odd_character_but_trivial_determinant.md)
