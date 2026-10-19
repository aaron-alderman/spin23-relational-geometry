# Flux Reversal Exchanges the Two Global Furey-to-Projector Assignments, so the Last Bit Is an Orientation Torsor

## Claim status

Exact antiunitary action on handle/side participation weights and on the two remaining assignment classes; causal orientation selection remains open.

## 1. The final binary ambiguity

The orbit-wide bias-square theorem left two source assignments:

\[
\Phi_+:\quad \mathrm{up}\mapsto L,\quad\mathrm{down}\mapsto R,
\]

and

\[
\Phi_-:\quad \mathrm{up}\mapsto R,\quad\mathrm{down}\mapsto L.
\]

Can the Furey-compatible spatial flux-reversal antiunitary choose between them?

## 2. Flux reversal on scattering coordinates

On the four scattering coordinates, let

\[
\Theta_{\rm flux}=XK,
\qquad
X=
\begin{pmatrix}
0&I_2\\
I_2&0
\end{pmatrix}.
\]

For a Hermitian projector \(P\),

\[
P\longmapsto XP^*X.
\]

The first two coordinates are the left block and the last two the right block. The two handles are the interleaved pairs \((0,2)\) and \((1,3)\).

Therefore flux reversal:

- exchanges left and right coordinates;
- preserves the total weight on each handle.

For every projector,

\[
w_C(\Theta P\Theta^{-1})=w_C(P),
\]

and

\[
w_L(\Theta P\Theta^{-1})=1-w_L(P).
\]

## 3. Exact action on bias cells

The induced action is

\[
CL\leftrightarrow CR,
\qquad
DL\leftrightarrow DR.
\]

Applying this to the first source assignment gives the second:

\[
\Theta_{\rm flux}\Phi_+\Theta_{\rm src}^{-1}
=\Phi_-,
\]

at the level of bias-cell labels.

Thus

\[
\boxed{
\Theta_{\rm flux}:\Phi_+\leftrightarrow\Phi_-.
}
\]

Neither assignment is fixed.

## 4. Interpretation

The remaining pair is not an unexplained combinatorial accident. It is a torsor for propagation orientation:

\[
\{\Phi_+,\Phi_-\}\cong\mathbb Z_2
\]

with no preferred origin.

A reversal symmetry cannot choose one orientation over its reverse. Selection requires orientation-breaking data such as:

- retarded rather than advanced response;
- an incoming/outgoing boundary condition;
- a chosen future time orientation;
- an oriented Furey sewing amplitude;
- dissipative preparation of a scattering state.

This is analogous to choosing an orientation on a line: the reflection relates the two choices but does not canonically select either.

## 5. Important representation boundary

Document 785 proved that flux reversal does not permute the four eigenprojector lines of one fixed checkpoint. The present theorem does not contradict that result.

The antiunitary image \(XP^*X\) has the opposite side-bias cell, but need not equal the checkpoint eigenprojector occupying that cell. The statement concerns:

- participation-weight orientation;
- the covariant family of response backgrounds;
- the two candidate source assignments.

It is not a fixed-fiber permutation representation.

## 6. Consequence for the grand synthesis

The source-map ambiguity has now been reduced in stages:

\[
\text{continuous positive maps}
\longrightarrow
24\text{ order-isomorphisms}
\longrightarrow
2\text{ bias-square orientations}
\longrightarrow
\mathbb Z_2\text{ flux-orientation torsor}.
\]

The final bit should remain explicit until the theory specifies retarded/advanced or incoming/outgoing orientation. It should not be removed by convention if the eventual observable is orientation sensitive.

## 7. Stop-everything tests

- **Causal selection:** a derived retarded kernel chooses one assignment and the advanced kernel chooses the other.
- **Sewing selection:** an oriented Furey boundary amplitude fixes the same representative as causal propagation.
- **Equivalence outcome:** all physical observables are reversal even, so only the unoriented pair is measurable.
- **Conflict falsifier:** gauge or CP conjugation demands an antiunitary action inconsistent with the side-bias flip.
- **Overclaim stop:** flux reversal relating the two assignments may not be described as flux reversal selecting one.

## 8. Executable certificate

    node verification/prove/prove_flux_reversal_exchanges_the_two_global_furey_projector_bias_square_assignments.mjs

The certificate reconstructs the checkpoint projectors, applies the antiunitary block exchange, verifies handle-weight preservation and side-weight complementation, and proves that the two candidate field assignments are exchanged.

## Companion documents

- [Orbit-wide bias-square labelling](../0700-0799/799_the_handle_by_side_bias_square_survives_all_18_selector_backgrounds_and_globally_labels_the_discrete_eigenbundle.md)
- [Selected-background bias-square match](../0700-0799/798_the_checkpoint_projectors_form_a_handle_by_side_bias_square_matching_the_furey_handle_by_channel_square_up_to_one_global_reversal.md)
- [Furey survivor exchange has spatial flux-reversal type](../0700-0799/778_the_furey_survivor_exchange_has_exactly_the_spatial_flux_reversal_real_structure_but_preserves_the_sewn_meridian_plane.md)
- [Flux reversal does not permute fixed spectral lines](../0700-0799/785_the_scattering_eigenchannel_quartet_is_not_an_equivariant_permutation_copy_of_the_furey_udenu_grid.md)
