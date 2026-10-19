# Projector-Quadrilateral Holonomy Recovers the Jarlskog Quartet without Extending Rank-Deficient Polar Transport

**Date:** 17 October 2026  
**Branches:** B03, B06, B08, B11 and B14  
**Claim status:** exact projector/Bargmann invariant theorem; embedding into a dynamical Furey path action remains open

## 1. Canonical replacement for the ambiguous unitary extension

When a neutrino amplitude has rank two, its polar transport is only a partial isometry. Extending it across the null line introduces an arbitrary phase and makes the naive unitary plaquette noncanonical.

The canonical alternative uses spectral projectors of the shared-left Hermitian operators

\[
H_e=M_eM_e^\dagger,
\qquad
H_\nu=M_\nu M_\nu^\dagger.
\]

Assume for now that each has three distinct eigenvalues, allowing one of the neutrino eigenvalues to be zero. Let

\[
P_i^e=|e_i\rangle\langle e_i|,
\qquad
P_j^\nu=|\nu_j\rangle\langle\nu_j|
\]

be their rank-one spectral projectors.

## 2. Projector quadrilateral

For \(i\ne k\) and \(j\ne\ell\), define

\[
\boxed{
\mathcal B_{ik;j\ell}
=\operatorname{Tr}
\left(P_i^eP_j^\nu P_k^eP_\ell^\nu\right).
}
\]

This is a four-vertex Bargmann invariant: a closed projective path alternating between charged-lepton and neutrino eigenlines.

Writing

\[
U_{ij}=\langle e_i|\nu_j\rangle,
\]

one obtains

\[
\mathcal B_{ik;j\ell}
=U_{ij}\overline{U_{kj}}U_{k\ell}\overline{U_{i\ell}}.
\]

Its imaginary part is a PMNS/CKM Jarlskog quartet, up to the ordering sign convention.

## 3. Exact rephasing invariance

Under independent eigenvector rephasings,

\[
|e_i\rangle\mapsto e^{i\alpha_i}|e_i\rangle,
\qquad
|\nu_j\rangle\mapsto e^{i\beta_j}|\nu_j\rangle,
\]

every projector is unchanged. Therefore \(\mathcal B\) is invariant without any phase cancellation calculation.

In particular, rephasing the massless neutrino eigenvector changes neither its projector nor any projector quadrilateral.

This removes the null-line extension ambiguity at the correct categorical level: rays/projectors rather than arbitrarily completed unitaries.

## 4. CP transformation

Coefficient conjugation sends every projector to its complex conjugate, hence

\[
\mathcal B_{ik;j\ell}
\mapsto
\overline{\mathcal B_{ik;j\ell}}.
\]

Thus

\[
\boxed{
\operatorname{Im}\mathcal B_{ik;j\ell}
\mapsto
-\operatorname{Im}\mathcal B_{ik;j\ell}.
}

The quadrilateral phase is CP odd and basis independent under simultaneous flavor conjugation.

## 5. Relation to the commutator cubic

The Hermitian operators have spectral expansions

\[
H_e=\sum_i a_iP_i^e,
\qquad
H_\nu=\sum_j b_jP_j^\nu.
\]

Expanding \(\operatorname{Tr}[H_e,H_\nu]^3\) produces weighted sums of alternating projector words. In three nondegenerate generations the result factorizes as

\[
\boxed{
\operatorname{ImTr}[H_e,H_\nu]^3
=\pm6J
\prod_{i<k}(a_i-a_k)
\prod_{j<\ell}(b_j-b_\ell),
}

where \(J\) is any consistently oriented nonzero projector-quadrilateral imaginary part.

The overall sign depends on the ordering conventions for the eigenvalues and quartet indices. The certificate verifies equality in magnitude for an explicit massless-neutrino example.

If \(b_1=0\) but \(b_2,b_3\) are distinct and nonzero, the neutrino Vandermonde factor remains nonzero. Hence the commutator cubic and projector phase can both survive.

## 6. Groupoid interpretation

Each rank-one operator

\[
P_i^eP_j^\nu
\]

is a partial map from the neutrino eigenline to the charged-lepton eigenline. The fourfold product closes the path:

\[
e_i\to\nu_j\to e_k\to\nu_\ell\to e_i.
\]

Its trace is the closed-path amplitude. This is precisely the kind of partial-isometry/groupoid holonomy required by the rank-deficient graph.

It does not require a full unitary map between all flavor spaces, only the canonical spectral subspaces.

## 7. Degeneracy gate

If two masses are exactly degenerate, the individual rank-one projectors inside that eigenspace are not canonical. One must use the higher-rank spectral projector and a non-Abelian Wilczek–Zee-type invariant.

Thus:

- a zero but isolated eigenvalue is harmless;
- an exact degeneracy requires non-Abelian projector transport;
- an approximate degeneracy makes eigenprojectors sensitive but still well-defined, with stability controlled by the spectral gap.

## 8. Relation to the completed Furey graph

The Higgs-augmented graph supplies charged-lepton and neutrino paths sharing the left weak vertex. Their Hermitian path composites naturally act on the same left flavor space:

\[
H_e=A_eA_e^\dagger,
\qquad
H_\nu=A_\nu A_\nu^\dagger.
\]

Their spectral projectors can therefore form the quadrilateral without choosing right-handed kernel identifications.

This is a credible canonical lepton plaquette for the completed graph. What remains open is deriving the path amplitudes \(A_e,A_\nu\) from the Furey/Higgs action rather than inserting the observed Yukawa matrices.

## 9. Branch decision

- **Closed:** the alternating four-projector trace equals a rephasing-invariant mixing quartet.
- **Closed:** its imaginary part is basis invariant and CP odd.
- **Closed:** it is insensitive to the arbitrary phase of a massless eigenvector.
- **Closed:** the commutator cubic is the quartet times the charged and neutral Vandermonde factors, up to orientation sign.
- **Closed:** an isolated zero eigenvalue does not obstruct the projector holonomy.
- **Open:** non-Abelian higher-rank projector holonomy at exact degeneracy.
- **Open:** dynamical derivation of the two Hermitian path composites from the completed Furey/Higgs action.

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** derive the charged and neutral path operators from the Furey action and recover the observed PMNS projector quadrilateral together with the exchange-real Jordan response.

**Rephasing falsifier:** the proposed quadrilateral changes under an eigenvector phase or null-line extension.

**CP falsifier:** its imaginary part fails to reverse under coefficient conjugation.

**Massless falsifier:** infer vanishing solely from one isolated zero eigenvalue while all Vandermonde differences remain nonzero.

**Degeneracy warning:** do not choose rank-one eigenvectors inside an exactly degenerate eigenspace and call the resulting phase canonical.

## 11. Certificate

The [projector-quadrilateral CP certificate](../../../verification/verify/verify_projector_quadrilateral_recovers_jarlskog_without_polar_extension.mjs) builds charged and massless-neutrino spectral projectors, verifies the quartet identity, basis and rephasing invariance, CP sign reversal and the Vandermonde relation to the commutator cubic.

## Companion documents

- [Massless-neutrino polar ambiguity](437_with_one_massless_neutrino_the_polar_unitary_plaquette_is_ambiguous_but_the_mass_squared_commutator_cp_invariant_remains_canonical.md)
- [Higgs-augmented four-cycle theorem](435_the_higgs_augmented_linking_graph_has_four_yukawa_cycles_and_the_two_matter_cycles_are_paired_composites.md)
- [Three-flavor real-face/complex-PMNS carrier](../0100-0199/174_three_flavor_real_face_complex_pmns_spectral_carrier.md)
- [Neutrino flavor-orientation observable](../0100-0199/190_neutrino_flavor_orientation_observable_and_factor_locality_gate.md)
