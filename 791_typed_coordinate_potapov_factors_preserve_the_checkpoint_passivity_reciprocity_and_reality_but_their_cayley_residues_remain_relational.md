# Typed Coordinate Potapov Factors Preserve the Checkpoint, Passivity, Reciprocity and Reality, but Their Cayley Residues Remain Relational

## Claim status

Constructive matrix-valued rational-inner embedding plus an exact coordinate-residue obstruction for the diagonal-factor ansatz.

## 1. The smallest transparent typed extension

Let \(S_0\) be the symmetric unitary scattering checkpoint. For each declared coordinate \(j\in\{u,d,e,\nu\}\), choose a normalized upper-half-plane Blaschke factor

\[
f_j(z)=\frac{b_{\gamma_j}(z)}{b_{\gamma_j}(\omega_0)},
\qquad
b_\gamma(z)=\frac{z-i\gamma}{z+i\gamma},
\qquad \gamma_j>0.
\]

Put

\[
D(z)=\operatorname{diag}(f_u,f_d,f_e,f_\nu)
=\prod_j\bigl[I+(f_j(z)-1)P_j\bigr],
\]

where \(P_j=|j\rangle\langle j|\) are coordinate-local Potapov projectors. Define

\[
S(z)=D(z)S_0D(z).
\]

Distinct \(\gamma_j\) make this genuinely matrix-valued rather than a scalar all-pass dressing.

## 2. Exact analytic properties

At the prescribed checkpoint,

\[
D(\omega_0)=I,
\qquad
S(\omega_0)=S_0.
\]

For real frequency, \(D\) is diagonal unitary. Therefore

\[
S(\omega)^\dagger S(\omega)=I.
\]

Because \(D^T=D\) and \(S_0^T=S_0\),

\[
S(z)^T=S(z).
\]

In the upper half-plane every \(|f_j|<1\), so

\[
\|S(z)\|\le \|D(z)\|^2<1.
\]

The response is strictly Schur, and its Cayley transform

\[
F(z)=(I+S(z))(I-S(z))^{-1}
\]

has positive Hermitian part. The same sideband-exchange construction used in document 781 supplies the real-time relation without adding independent physical states.

Thus coordinate-dependent pole factors do **not** conflict with causality, passivity, reciprocity or frequency reality.

## 3. Why reciprocity uses a congruence

A one-sided factorization \(D(z)S_0\) would be symmetric only when

\[
[D(z),S_0]=0.
\]

Every off-diagonal entry of \(S_0\) is nonzero, so its diagonal commutant contains only scalar matrices. Any genuinely typed diagonal dressing therefore breaks reciprocity if placed on one side only.

The reciprocal local construction must dress the two scattering legs together:

\[
S=D S_0D.
\]

This is not an arbitrary aesthetic choice; it is forced within the diagonal support ansatz.

## 4. Local scattering factors do not imply local spectral residues

At every finite real frequency, each \(f_j(\omega)\) has unit modulus and is nonzero. Hence

\[
S_{jk}(\omega)=f_j(\omega)(S_0)_{jk}f_k(\omega)\ne0
\qquad(j\ne k).
\]

No proper coordinate subspace is invariant under \(S(\omega)\). In particular, no coordinate vector is an eigenvector.

At a simple boundary pole of the Cayley/Herglotz response, the residue range is the unit-eigenspace of \(S(\omega)\). It follows that such a residue cannot be supported on a single \(u,d,e,\nu\) coordinate—or on any proper coordinate block.

This yields the important distinction

\[
\boxed{
\text{coordinate-local analytic factors}
\not\Rightarrow
\text{coordinate-local positive spectral residues}.
}
\]

The matrix-valued extension escapes the scalar commutant no-go of document 783, but it does not solve the physical residue-typing problem. The fixed relational checkpoint mixes the pole eigenspaces.

## 5. Parameter and predictivity audit

With four typed factors, the model introduces at least four positive scales

\[
\gamma_u,\gamma_d,\gamma_e,\gamma_\nu.
\]

Normalization makes every factor equal to one at \(\omega_0\). Consequently the checkpoint imposes **zero constraints** on these four scales. They change frequency derivatives and resonance positions while leaving \(S(\omega_0)=S_0\) identically.

The construction therefore proves analytic compatibility, not threshold prediction. Assigning \(\gamma_j\) to particle masses would merely insert those masses by hand.

## 6. What remains open

Three credible paths survive:

1. **Coherent typed supports.** A source map sends each physical field sector to a non-coordinate relational response vector.
2. **Non-diagonal Potapov projectors.** Source-derived coherent projectors supply positive residue ranges directly.
3. **Multi-point fixed-UV interpolation.** Known thresholds, contacts and several response values constrain the otherwise free factors.

The naive diagonal-local-residue path is pinned.

## 7. Stop-everything tests

- **Positive trigger:** source-derived non-diagonal projectors reproduce the relational Cayley residues with fixed or low-dimensional pole data.
- **Predictivity trigger:** fixed UV data and multiple frequencies determine the \(\gamma_j\) rather than merely accommodate them.
- **Locality falsifier:** any claim of coordinate-local Cayley residues must exhibit a coordinate invariant subspace of the boundary scattering matrix.
- **Reciprocity falsifier:** a one-sided non-scalar diagonal dressing is used while still calling the response reciprocal.
- **Parameter stop:** a model with four freely chosen thresholds and only one checkpoint cannot be called explanatory.

## 8. Executable certificate

    node scripts/build_typed_diagonal_potapov_congruence_and_prove_its_cayley_residues_remain_relational.mjs

The certificate verifies checkpoint recovery, real-axis unitarity, reciprocity, strict upper-half-plane contractivity, Cayley positivity and sideband reality for four distinct typed factors. It also checks the nonzero cross-coordinate graph and the failure of one-sided reciprocal dressing.

## Companion documents

- [Scalar dressing forces relational residue channels](783_scalar_dressing_forces_coherent_relational_residue_channels_and_cannot_supply_nontrivial_coordinate_local_furey_residues.md)
- [The rational-inner positive-real embedding](780_the_selected_unitary_scattering_checkpoint_embeds_in_a_reciprocal_rational_inner_response_with_positive_real_cayley_impedance.md)
- [The real-time sideband completion](781_a_sideband_exchange_real_structure_gives_the_complex_scattering_checkpoint_a_real_time_reciprocal_passive_completion.md)
- [The four relational checkpoint eigenchannels](784_all_four_scattering_eigenchannels_are_rank_one_relational_superpositions_touching_both_handles_and_both_boundary_sides.md)
