# Positive Unital Source-to-Projector Maps Reduce to 24 Order Isomorphisms, but Regular-Torsor Covariance Selects None

## Claim status

Exact finite classification of positive unital order-isomorphisms and exact torsor-extension theorem; physical selection data remain missing.

## 1. The two four-idempotent algebras

The completed neutral Yukawa source algebra has four primitive positive idempotents

\[
e_u,e_d,e_e,e_\nu,
\qquad
e_fe_g=\delta_{fg}e_f,
\qquad
\sum_fe_f=1.
\]

Abstractly this is the ordered Jordan algebra

\[
\mathcal A_{\rm src}\cong\mathbb R^4.
\]

The checkpoint spectral algebra has four orthogonal rank-one projectors

\[
P_jP_k=\delta_{jk}P_j,
\qquad
\sum_jP_j=I,
\]

and is likewise

\[
\mathcal A_{\rm spec}=\operatorname{span}\{P_1,P_2,P_3,P_4\}
\cong\mathbb R^4.
\]

## 2. Classification of order-isomorphisms

A positive unital map need not preserve primitive idempotents. In the two \(\mathbb R^4\) descriptions it is represented by a nonnegative row-stochastic matrix, forming a continuous family. The uniform averaging map is an explicit non-invertible example.

If the map and its inverse must both be positive—an order-isomorphism—then extreme rays of the positive orthant must map to extreme rays. Therefore every primitive idempotent maps to exactly one primitive idempotent:

\[
\Phi(e_f)=P_{\pi(f)}
\]

for a permutation \(\pi\in S_4\).

Hence

\[
\boxed{
\operatorname{Iso}_{\rm order}(\mathcal A_{\rm src},\mathcal A_{\rm spec})
\cong S_4,
\qquad
|\operatorname{Iso}_{\rm order}|=24.
}
\]

Positivity and unitality remove continuous frame mixing only after positive invertibility is required. They do not choose a particular field-to-projector assignment.

## 3. Amplitude-level sign lifts

Write

\[
P_j=v_jv_j^T
\]

with a real orthonormal eigenframe. Each \(v_j\) is defined only up to sign. A projector assignment therefore has

\[
2^4
\]

signed amplitude lifts, giving

\[
24\cdot16=384
\]

signed frames.

The signs are invisible to diagonal projector moments but can matter after cross-channel amplitudes or cyclic phases are introduced. They must not be counted as distinct projector maps.

## 4. Extension over the eighteen backgrounds

The selector checkpoint orbit is a regular torsor:

\[
\mathcal O_N\cong C_3\times S_3,
\qquad
|\mathcal O_N|=18,
\qquad
\operatorname{Stab}(N)=\{1\}.
\]

Suppose source and spectral fibers have specified transport laws \(\rho_{\rm src}(g)\) and \(\rho_{\rm spec}(g)\). A map \(\Phi_0\) at the base background extends as

\[
\Phi_g
=\rho_{\rm spec}(g)\Phi_0\rho_{\rm src}(g)^{-1}.
\]

Because every orbit point is reached by a unique \(g\), this extension has no path or stabilizer ambiguity.

This is a consistency success: a chosen map can be made background-covariant.

## 5. Why covariance does not select the map

The same trivial stabilizer that makes extension easy removes the usual isotropy constraint. There is no nontrivial \(h\) fixing the base point for which one must impose

\[
\rho_{\rm spec}(h)\Phi_0
=\Phi_0\rho_{\rm src}(h).
\]

Consequently every one of the 24 order-isomorphisms extends. Torsor covariance eliminates zero choices:

\[
\boxed{
\text{regular-background covariance propagates a base map;
it does not derive it.}
}
\]

This explains why moving from a fixed fiber to an eigenbundle repairs the representation inconsistency of document 785 without creating a unique Standard-Model identification.

## 6. Where selection could enter

Additional data must create a nontrivial constraint at the base fiber. Candidates include:

- the unique double-transversal Furey pairing;
- \(C/D\) handle polarization of the projectors;
- CP and sideband real structures;
- a physical subgroup quotient with nontrivial isotropy;
- source residues or thresholds already labelled by matter data;
- cyclic incidence signs visible at amplitude rather than projector level.

Each candidate must reduce the 24 permutations by an explicit invariant, not by naming convention.

## 7. Stop-everything tests

- **Order-map success:** a source-derived positive map sends the four primitive Gram idempotents to the four spectral projectors.
- **Selection success:** physical invariants reduce the 24 maps to one orbit or a controlled finite ambiguity.
- **Covariance overclaim:** unique extension over the regular torsor is called unique selection of \(\Phi_0\).
- **Sign overcount:** the \(2^4\) eigenvector signs are counted as distinct projector maps.
- **Continuous-map warning:** positivity and unitality alone are used without positive invertibility, leaving a continuous stochastic family.

## 8. Executable certificate

    node verification/classify/classify_positive_source_to_projector_order_isomorphisms_and_their_extension_over_the_regular_selector_torsor.mjs

The certificate enumerates all 24 permutations, counts 384 signed lifts, reconstructs the exact regular eighteen-point checkpoint orbit and verifies that every base choice extends to all orbit points.

## Companion documents

- [Four neutral Yukawa sources reach rank four](796_four_higgs_dressed_yukawa_gram_sources_can_supply_rank_four_tomography_only_in_the_nu_right_completed_branch.md)
- [The fixed spectral quartet is not a field permutation representation](785_the_scattering_eigenchannel_quartet_is_not_an_equivariant_permutation_copy_of_the_furey_udenu_grid.md)
- [The regular eighteen-background selector torsor](786_oriented_color_and_handle_exchange_generate_c3_times_s3_and_the_hyperbolic_checkpoint_has_a_regular_18_background_spurion_orbit.md)
- [The typed six-point candidate stratum](789_standard_model_typing_uniquely_selects_the_furey_double_transversal_pairing_and_leaves_at_most_a_six_point_selector_stratum.md)
