# A Higgs-Channel-Times-Flux-Imbalance Cross Correlation Is Orientation-Odd and Distinguishes the Two Global Source Maps

## Claim status

Exact observable construction from the certified source labels and projector participation data; microscopic measurement protocol and normalization remain open.

## 1. Why most current invariants cannot see the last bit

The two source maps are related by spatial flux reversal. Consequently the following data are reversal even:

- scattering eigenvalues as an unordered set;
- characteristic polynomials;
- positive residue weights;
- handle participation;
- determinants and traces;
- absolute side polarization.

These quantities cannot distinguish the two orientations.

An orientation-sensitive observable must combine a matter-channel sign with a propagation-flux sign.

## 2. Propagation grading

Define the left/right grading

\[
\Gamma_R=\operatorname{diag}(1,1,-1,-1).
\]

For a rank-one spectral projector,

\[
\delta_j=\operatorname{Tr}(P_j\Gamma_R)
=w_L(P_j)-w_R(P_j)
=2w_L(P_j)-1.
\]

At the selected checkpoint,

\[
\begin{array}{c|r}
P_j&\delta_j\\ \hline
P_0&-0.416371\\
P_1&+0.316748\\
P_2&+0.903156\\
P_3&-0.803534.
\end{array}
\]

Flux reversal sends

\[
\delta_j\mapsto-\delta_j.
\]

## 3. Higgs-channel grading

Assign the source sign

\[
\chi_f=
\begin{cases}
+1,&f=u,\nu,\\
-1,&f=d,e.
\end{cases}
\]

For a source-to-projector map \(\Phi\), define

\[
\boxed{
\mathcal I_{\rm orient}(\Phi)
=\sum_{f\in\{u,d,e,\nu\}}
\chi_f\,\operatorname{Tr}\!\left(P_{\Phi(f)}\Gamma_R\right).
}
\]

This correlates Higgs-channel orientation with propagation-flux orientation.

## 4. Exact values for the two assignments

For the assignment with up channels mapped to left-biased projectors,

\[
\Phi_+:
\quad
u\mapsto P_1,\quad
\nu\mapsto P_2,\quad
d\mapsto P_3,\quad
e\mapsto P_0,
\]

every term contributes positively:

\[
\mathcal I_{\rm orient}(\Phi_+)
=\sum_j|\delta_j|
\approx2.43980915.
\]

For the reversed assignment,

\[
\mathcal I_{\rm orient}(\Phi_-)
\approx-2.43980915.
\]

Therefore

\[
\boxed{
\mathcal I_{\rm orient}(\Phi_-)
=-\mathcal I_{\rm orient}(\Phi_+)\ne0.
}
\]

The normalized value obtained by dividing by four is approximately

\[
\pm0.60995229.
\]

## 5. Orbit-wide nonvanishing

Document 799 proves that every selector background has one strictly left- and one strictly right-biased projector on each handle. Therefore the map aligning up with left gives

\[
\mathcal I_{\rm orient}(b)
=\sum_j|2w_{L,j}(b)-1|>0
\]

at every one of the eighteen backgrounds. The reversed map gives its negative.

The orbit certificate now reports the complete range of this score. Nonvanishing follows without matching eigenphase labels between backgrounds.

## 6. What would measure it

The observable requires:

1. separately addressable neutral \(u,d,e,\nu\) Gram sources;
2. a port-resolved response measuring \(\Gamma_R\);
3. contact subtraction or a frequency region dominated by the coherent residues;
4. a common normalization of the four source channels.

The rank-four source theorem of document 796 supplies the kinematic source algebra only in the \(\nu_R\)-completed branch.

Total stress alone cannot measure \(\mathcal I_{\rm orient}\), because it aggregates the four source labels to rank at most two. Nor can an unoriented spectral measurement.

## 7. Physical meaning

\(\mathcal I_{\rm orient}\) does not assert that “up particles move left.” It tests the sign of a response correlation:

\[
\text{Higgs-channel grading}
\times
\text{boundary flux grading}.
\]

A microscopic oriented boundary theory may predict its sign. Flux reversal must reverse it. If all accessible observables are flux even, the sign remains a superselection convention and only \(|\mathcal I_{\rm orient}|\) is measurable.

## 8. Stop-everything tests

- **Positive measurement:** a source-resolved retarded response produces nonzero \(\mathcal I_{\rm orient}\) with a fixed sign.
- **Reversal test:** reversing the physical port orientation reverses the measured sign.
- **Even-observable outcome:** every gauge-invariant operational protocol depends only on \(\mathcal I_{\rm orient}^2\) or its absolute value.
- **Normalization result:** positive independent source rescalings change the raw magnitude but not its sign; document 803 gives an exactly normalized \(\pm1\) index.
- **Aggregation falsifier:** total stress data are used as though they retain the four channel signs.

## 9. Executable certificates

    node scripts/compute_the_higgs_channel_times_flux_imbalance_orientation_odd_observable.mjs

    node scripts/audit_the_handle_side_projector_bias_square_across_all_18_selector_backgrounds.mjs

The first certificate computes the signed observable and its reversal. The second verifies orbit-wide nonvanishing and reports its score range.

## Companion documents

- [The last source-map bit is a flux-orientation torsor](800_flux_reversal_exchanges_the_two_global_furey_to_projector_assignments_so_the_last_bit_is_an_orientation_torsor.md)
- [Retarded/advanced values do not select the orientation](801_retarded_and_advanced_boundary_values_share_the_same_projector_residues_so_causality_alone_does_not_select_the_flux_orientation_torsor.md)
- [Four neutral Yukawa sources reach rank four](796_four_higgs_dressed_yukawa_gram_sources_can_supply_rank_four_tomography_only_in_the_nu_right_completed_branch.md)
- [Orbit-wide bias-square labelling](799_the_handle_by_side_bias_square_survives_all_18_selector_backgrounds_and_globally_labels_the_discrete_eigenbundle.md)
