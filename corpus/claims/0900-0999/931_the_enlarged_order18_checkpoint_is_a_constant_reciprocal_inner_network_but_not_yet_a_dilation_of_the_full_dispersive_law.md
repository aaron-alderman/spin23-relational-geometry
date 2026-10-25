# The Enlarged Order-18 Checkpoint Is a Constant Reciprocal-Inner Network, but Not Yet a Dilation of the Full Dispersive Law

**Date:** 17 October 2026  
**Branches:** causal twelve-port realization, reciprocity, real-time sideband completion, checkpoint versus broadband dilation, and coherent environment ports  
**Claim status:** exact degree-zero checkpoint transfer theorem; frequency-dependent dilation remains open  
**Certificate:** [realize_the_twelve_port_selector_checkpoint_as_a_constant_reciprocal_inner_network_with_sideband_reality.mjs](../../../verification/realize/realize_the_twelve_port_selector_checkpoint_as_a_constant_reciprocal_inner_network_with_sideband_reality.mjs)

## Executive result

The twelve-port order-eighteen representation of document 930 already has a causal reciprocal realization at the selected checkpoint.

In its character-adapted port basis, both generators are symmetric unitary matrices:

\[
\widetilde R^T=\widetilde R,
\qquad
\widetilde H^T=\widetilde H,
\]

\[
\widetilde R^*\widetilde R
=
\widetilde H^*\widetilde H
=I_{12}.
\]

Therefore

\[
S_R(z)=\widetilde R,
\qquad
S_H(z)=\widetilde H
\]

are degree-zero entire reciprocal rational-inner transfers. They need no internal state, pole or propagating bath mode at the checkpoint.

The complex-envelope phases admit the exact real-time completion

\[
S^{\mathbb R}
=S\oplus\overline S
\]

with sideband-exchange real structure $\Xi K$. The doubled transfers remain reciprocal, inner and generate exactly eighteen elements.

This closes causal checkpoint realization. It does not yet dilate the entire frequency-dependent lossy response with one fixed state-space system.

## 1. Why the enlarged generators are reciprocal

The cycle generator is diagonal in the character basis. Each neutral/active pair carries

\[
r_k=\operatorname{diag}(1,\zeta^k),
\qquad
k=0,1,2.
\]

Every such block is symmetric and unitary. The handle block is

\[
h=
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix},
\]

which is real, symmetric and orthogonal. Direct sums preserve these properties.

Reciprocity applies to each physical feedthrough separately. Products of reciprocal scatterers need not themselves be symmetric in an arbitrary external port ordering, so the full nonabelian group action is not being mislabelled as pointwise reciprocal element by element.

## 2. Causality and rational innerness

A constant matrix is an entire rational transfer of McMillan degree zero. Since the checkpoint matrices are unitary on the boundary, they are inner. No stability question arises because there are no finite poles.

This is the same clean mechanism already established for the four-channel handle, now applied to the full coherent selector environment.

The construction is a local instantaneous boundary feedthrough. It is causal in the effective transfer sense, although no microscopic boundary Lagrangian has yet been derived.

## 3. Real-time completion

The $zeta$ and $\zeta^2$ sectors are complex conjugates. Introduce positive- and negative-frequency envelope coordinates and define

\[
S^{\mathbb R}=S\oplus\overline S,
\qquad
\Xi=
\begin{pmatrix}
0&I_{12}\\
I_{12}&0
\end{pmatrix}.
\]

Then

\[
\Xi\overline{S^{\mathbb R}}\Xi=S^{\mathbb R}.
\]

The 24 sideband coordinates are constrained by the real structure. They are not 24 independent matter fields or ports supplied by new particles.

## 4. Compression and apparent loss

At the checkpoint, the four-dimensional physical embedding $J$ from document 930 gives

\[
J^*\widetilde RJ=I_2\oplus C_{\rm loss},
\qquad
J^*\widetilde HJ=H_{\rm phys}.
\]

Thus a lossless instantaneous twelve-port feedthrough appears lossy after only four coherent combinations are retained. The omitted combinations carry amplitude and group memory.

This is a finite-frequency statement. It does not say that the same fixed embedding and constant feedthrough reproduce $C(\omega)$ away from the checkpoint.

## 5. The unsolved broadband problem

For every frequency at which the operator barycentric effects remain positive, one can construct a pointwise Naimark dilation. But the factors $B_k(\omega)$ and hence the embedding $J(\omega)$ generally vary with frequency.

A physical dilation of the full response requires much more:

- one fixed external-to-internal port map;
- an analytic rational-inner $\widetilde S(z)$;
- no upper-half-plane poles;
- the correct sideband reality;
- compression to the complete $C(\omega)$ on the real axis;
- compatibility with the enlarged handle.

Pointwise positivity does not imply such an analytic spectral factorization. This is the next genuine systems-theory gate.

## 6. Stop-everything and falsification criteria

**Broadband-dilation trigger:** construct one rational-inner $\widetilde S(z)$ and one constant isometry $J$ satisfying $J^*\widetilde S(\omega)J=I_2\oplus C(\omega)$ over a nontrivial frequency interval.

**Spectral-factor trigger:** prove the three operator effects form boundary values of positive analytic kernels admitting a common rational factorization.

**Local-action trigger:** derive the constant character-basis feedthroughs from a local real boundary action.

**Checkpoint falsifier:** either enlarged generator fails symmetry, unitarity, sideband reality or order-eighteen closure.

**Broadband overclaim:** use the degree-zero checkpoint completion as evidence for a fixed dilation of the full dispersive law.

## 7. Verdict

| Question | Verdict |
|---|---|
| Is the enlarged checkpoint causal and rational inner? | **yes, degree zero** |
| Are its generators reciprocal? | **yes, in the character port basis** |
| Does it have an exact real-time completion? | **yes** |
| Does the doubled completion still generate order eighteen? | **yes** |
| Is the whole dispersive lossy law dilated by one fixed network? | **not yet** |

## 8. Position in the corpus

- [twelve-port order-eighteen representation](930_the_lossy_four_channel_selector_is_the_compression_of_an_exact_twelve_port_order18_unitary_representation.md)
- [six-port active Naimark dilation](929_the_lossy_active_cycle_has_an_exact_six_port_order_three_naimark_dilation_but_the_handle_lift_is_not_automatic.md)
- [degree-zero four-channel handle](924_the_full_handle_graph_is_a_constant_reciprocal_rational_inner_feedthrough_in_the_unique_selector_metric.md)
- [sideband real-structure completion](../0700-0799/781_a_sideband_exchange_real_structure_gives_the_complex_scattering_checkpoint_a_real_time_reciprocal_passive_completion.md)
- [A2 orbit labels versus dilation characters](932_the_dilation_sectors_are_fourier_dual_to_the_a2_root_labels_but_are_not_the_same_three_effect_frame.md)

## Subsequent progress

Document [948](948_each_lossy_response_face_has_a_fixed_six_port_rational_inner_dilation_with_two_positive_environment_rates.md) solves part of the broadband problem left open here.  One entire lossy analytic response face has a fixed six-port rational-inner dilation with frequency-independent port labels.  The stronger target stated here—one dilation of the full handle-bearing, sideband-reversing cycle—remains open because its opposite-frequency relation is antiunitary real-time sewing.

