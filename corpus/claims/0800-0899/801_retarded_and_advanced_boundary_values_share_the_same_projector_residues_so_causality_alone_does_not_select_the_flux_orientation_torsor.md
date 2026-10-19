# Retarded and Advanced Boundary Values Share the Same Projector Residues, so Causality Alone Does Not Select the Flux-Orientation Torsor

## Claim status

Exact positive spectral-measure result; a physical correlation between causal prescription and incoming/outgoing port orientation remains open.

## 1. The candidate selector

Document 800 reduced the source-to-projector ambiguity to two assignments exchanged by spatial flux reversal. A natural hope is:

\[
\text{retarded response}\longleftrightarrow\Phi_+,
\qquad
\text{advanced response}\longleftrightarrow\Phi_-.
\]

For an ordinary Hermitian spectral measure, this identification is not automatic.

## 2. Retarded and advanced values of one spectral function

Consider the coherent positive response

\[
H(z)=H_\infty+\sum_j\frac{R_j}{m_j-z},
\qquad
R_j=r_jP_j\succeq0.
\]

Hermiticity gives

\[
H(\bar z)=H(z)^\dagger.
\]

The retarded and advanced boundary values are

\[
H_R(\omega)=H(\omega+i0),
\qquad
H_A(\omega)=H(\omega-i0)=H_R(\omega)^\dagger.
\]

Both use the same positive spectral measure:

\[
\operatorname*{Res}_{z=m_j}H(z)
\quad\text{in the convention }R_j/(m_j-z)
\quad=\quad R_j.
\]

Approaching from above or below changes the sign of the absorptive boundary distribution, not the support projector \(P_j\).

## 3. Consequence for bias labels

The handle and side participation weights are properties of \(P_j\). Since retarded and advanced prescriptions share \(P_j\),

\[
w_H^{R}(P_j)=w_H^{A}(P_j),
\qquad
w_L^{R}(P_j)=w_L^{A}(P_j).
\]

They therefore induce the same bias-square assignment.

Thus

\[
\boxed{
\text{the \(+i0/-i0\) prescription alone does not select
the two source-map orientations.}
}
\]

## 4. Why spatial flux reversal is different

Spatial flux reversal acts by

\[
P_j\longmapsto XP_j^*X,
\]

where \(X\) swaps left and right port blocks. It preserves handle weight but sends

\[
w_L\longmapsto1-w_L.
\]

This is the operation that exchanges the two bias-square maps.

Retarded/advanced conjugation and spatial port reversal are therefore distinct:

| operation | spectral residue support | side bias |
|---|---|---|
| \(+i0\leftrightarrow-i0\) | same \(P_j\) | unchanged |
| spatial flux reversal \(XK\) | \(XP_j^*X\) | reversed |

They can be correlated by a scattering preparation, but one does not mathematically imply the other.

## 5. What extra datum could select the orientation

A selection rule must link analytic causality to spatial ports. Possible mechanisms are:

- a retarded boundary-value problem with a declared outward normal;
- an incoming-wave radiation condition;
- a domain-wall orientation;
- an oriented Furey sewing with a source and sink;
- a microscopic transfer Hamiltonian fixing group velocity relative to channel orientation.

Each combines two structures:

\[
\text{time/causal orientation}
\quad+\quad
\text{spatial port orientation}.
\]

Without both, the \(\mathbb Z_2\) torsor remains unpointed.

## 6. Research consequence

The previous proposed next step must be corrected:

- constructing a retarded coherent response is not enough;
- its residues are already those of document 792;
- the missing calculation is an oriented boundary or transfer problem that identifies which Higgs-channel source injects which propagation direction.

This pins the purely analytic causal branch and redirects work toward oriented boundary dynamics.

## 7. Stop-everything tests

- **Boundary selector:** a derived radiation condition fixes the up-to-left or up-to-right assignment.
- **Advanced partner:** reversing the physical boundary normal and causal prescription produces the opposite assignment.
- **Even-observable outcome:** all measurable quantities depend only on the unoriented projector pair.
- **Causality overclaim:** the sign of \(i0\) is used to relabel unchanged residue projectors.
- **Port overclaim:** left/right scattering labels are treated as time orientation without an outward normal or transfer dynamics.

## 8. Executable certificate

    node verification/prove/prove_retarded_and_advanced_prescriptions_share_projector_residues_while_flux_reversal_changes_bias_orientation.mjs

The certificate builds a four-projector positive spectral response, verifies upper/lower boundary conjugacy and identical pole residues, then separately verifies that flux reversal complements side participation.

## Companion documents

- [The final map pair is a flux-orientation torsor](800_flux_reversal_exchanges_the_two_global_furey_to_projector_assignments_so_the_last_bit_is_an_orientation_torsor.md)
- [Explicit positive coherent-projector residues](../0700-0799/792_checkpoint_spectral_projectors_give_an_explicit_positive_rank_one_relational_residue_model_but_not_furey_typing_or_threshold_prediction.md)
- [Furey survivor exchange has spatial flux-reversal type](../0700-0799/778_the_furey_survivor_exchange_has_exactly_the_spatial_flux_reversal_real_structure_but_preserves_the_sewn_meridian_plane.md)
