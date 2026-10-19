# The Handle-by-Side Bias Square Survives All 18 Selector Backgrounds and Globally Labels the Discrete Eigenbundle

## Claim status

Exhaustive exact-orbit/numerical-spectral theorem under one fixed complex polarization and scattering-port convention. Physical covariance of that convention remains open.

## 1. The required orbit-wide test

Document 798 found a handle-by-side bias square at the selected checkpoint:

\[
\{P_{CL},P_{CR},P_{DL},P_{DR}\}.
\]

A one-background coincidence would not support a covariant source map. The relevant question is whether the square persists over the complete selector orbit

\[
\mathcal O_N=\{gNg^{-1}:g\in C_3\times S_3\},
\qquad
|\mathcal O_N|=18.
\]

The certificate performs the full test:

1. enumerate all eighteen exact integral carrier words;
2. convert each word to its Bogoliubov transfer matrix;
3. convert transfer to unitary four-channel scattering;
4. reconstruct all four rank-one spectral projectors;
5. compute their two handle and two side participation weights;
6. classify each projector by the weight exceeding one half.

## 2. Exhaustive result

For every one of the eighteen backgrounds, the four projectors occupy all four bias cells exactly once:

\[
\boxed{
\forall\,b\in\mathcal O_N,\qquad
\mathcal P_b
=\{P_{CL}(b),P_{CR}(b),P_{DL}(b),P_{DR}(b)\}.
}
\]

No background has:

- two projectors in the same bias cell;
- a missing handle-side cell;
- a weight exactly equal to one half;
- a degenerate scattering spectrum.

The smallest distance from any classification boundary over the entire orbit is

\[
\Delta_{\rm orbit}\approx0.04194695.
\]

Thus the result is not caused by numerical equality at one-half, though two backgrounds approach the boundary more closely than the original checkpoint.

## 3. A global label for the discrete eigenbundle

Eigenphase order changes across the orbit and is not the physically useful label. The bias cell itself supplies a background-independent naming rule:

\[
P_j(b)
\longmapsto
\bigl(\operatorname{handle\ bias},\operatorname{side\ bias}\bigr).
\]

Because every cell occurs once at every background, this rule globally labels the four projector lines over the discrete base.

In that precise sense, the bias square trivializes the eigenbundle:

\[
\mathcal E
\cong
\mathcal O_N\times\{CL,CR,DL,DR\}
\]

as a labelled set of lines.

This is stronger than the abstract regular-torsor extension of document 797 because the labels arise from measured participation inequalities rather than an arbitrarily transported base permutation.

## 4. Consequence for the Furey source map

The matter square is

\[
\{(C,\mathrm{up}),(C,\mathrm{down}),
(D,\mathrm{up}),(D,\mathrm{down})\}.
\]

The spectral square is globally

\[
\{(C,L),(C,R),(D,L),(D,R)\}.
\]

Preserving the handle label leaves one global binary choice:

\[
\mathrm{up}\mapsto L,\quad\mathrm{down}\mapsto R,
\]

or

\[
\mathrm{up}\mapsto R,\quad\mathrm{down}\mapsto L.
\]

Because the spectral bias square survives all backgrounds, the same choice works throughout the eighteen-point family. The previous 24 assignments reduce globally to two.

## 5. What remains genuinely physical

The calculation fixes neither of the two orientations. That final bit asks whether Higgs channel orientation is tied to propagation direction.

Candidate selectors include:

- the Furey cyclic orientation;
- the survivor-exchange/flux-reversal real structure;
- boundary incoming/outgoing convention;
- CP or time-reversal action on the dressed Yukawa faces;
- a retarded correlator fixing which composite source injects left-moving versus right-moving flux.

Each must be tested at amplitude level. Projector weights alone are insensitive to eigenvector signs and causal arrow orientation.

## 6. Convention boundary

Every carrier word was converted using the same:

- real canonical coordinate order;
- complex polarization;
- transfer partition;
- left/right scattering convention.

This is the appropriate comparison for a fixed laboratory port frame. It is not yet proved to be the physical transport law over selector backgrounds.

If polarization or port labels must themselves transform with \(g\), the participation weights must be recomputed in that transported frame. The present theorem should then be treated as fixed-frame covariance data, not an invariant of bare symplectic conjugacy.

## 7. Stop-everything tests

- **Orientation trigger:** a causal Furey/boundary calculation fixes the global up-to-left versus up-to-right bit.
- **Transport trigger:** the physical polarization/port frame is derived and preserves the four-cell labelling.
- **Crossing falsifier:** an admitted continuous deformation reaches a weight \(1/2\) and exchanges bias cells.
- **Convention falsifier:** the required transported port frame destroys the orbit-wide square.
- **Selection success:** one of the two global assignments yields positive, gauge-compatible, correctly oriented source residues at every background.

## 8. Executable certificate

    node scripts/audit_the_handle_side_projector_bias_square_across_all_18_selector_backgrounds.mjs

The certificate enumerates the exact selector orbit, performs all eighteen transfer-to-scattering conversions, reconstructs 72 spectral projectors and verifies one projector in every handle-side cell at every background.

## Companion documents

- [The selected-background Furey/projector bias-square match](798_the_checkpoint_projectors_form_a_handle_by_side_bias_square_matching_the_furey_handle_by_channel_square_up_to_one_global_reversal.md)
- [Positive maps leave 24 base assignments](797_positive_unital_source_to_projector_maps_reduce_to_24_order_isomorphisms_but_regular_torsor_covariance_selects_none.md)
- [The regular eighteen-background torsor](786_oriented_color_and_handle_exchange_generate_c3_times_s3_and_the_hyperbolic_checkpoint_has_a_regular_18_background_spurion_orbit.md)
- [Complex polarization and scattering conversion](777_complex_polarization_turns_the_hyperbolic_symplectic_word_into_pseudo_unitary_transfer_and_unitary_scattering_but_the_spatial_real_structure_is_the_gate.md)
