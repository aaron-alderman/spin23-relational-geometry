# The Dilation Sectors Are Fourier Dual to the A2 Root Labels, but Are Not the Same Three-Effect Frame

**Date:** 17 October 2026  
**Branches:** mediator-root triangle, dilation characters, discrete Fourier duality, loss channel typing, and environment-versus-matter ontology  
**Claim status:** exact label-space Fourier bridge and exact rank obstruction; physical port identification remains open  
**Certificate:** [show_the_dilation_characters_are_fourier_dual_to_the_a2_root_labels_but_not_the_same_povm.mjs](../../../verification/show/show_the_dilation_characters_are_fourier_dual_to_the_a2_root_labels_but_not_the_same_povm.mjs)

## Executive result

The three sectors in the twelve-port dilation are related to the established mediator-root/edge/handle triangle, but they are not the same three positive effects.

Let $M$ be the three-by-two matrix whose rows are the equal-norm roots

\[
g_+=(1,\sqrt3),
\qquad
g_0=(-2,0),
\qquad
g_-=(1,-\sqrt3).
\]

Then

\[
M^TM=6I_2,
\qquad
MM^T=6P_{\rm std},
\]

where $P_{\rm std}=I_3-\frac13\mathbf1\mathbf1^T$ is the zero-sum projector on the three-label space.

The discrete Fourier transform sends

\[
P_{\rm std}
\longmapsto
\operatorname{diag}(0,1,1).
\]

Therefore the root-label plane contains exactly the two nontrivial $C_3$ characters and excludes the trivial character. This is precisely the support pattern of the lossless selector dilation.

Strict loss activates the formerly absent trivial-character sector. But it also changes the effect ranks, so the lossy dilation POVM cannot be identified with the root tight-frame POVM.

## 1. Orbit labels and characters are different realizations

The mediator roots are an orbit basis:

- the Coxeter generator cyclically permutes the three labels;
- the physical active plane is the zero-sum subspace of that permutation module.

The dilation uses the Fourier basis:

- the generator acts diagonally by $1,\zeta,\zeta^2$;
- the three sectors are spectral characters rather than permuted root directions.

The two descriptions are related by the three-point discrete Fourier transform. They are not related by an arbitrary analogy involving the number three.

## 2. Exact lossless support match

For the normalized root effects

\[
E_j=\frac16g_jg_j^T,
\]

one has

\[
\sum_jE_j=I_2,
\qquad
\operatorname{rank}(E_j)=1
\]

for all three labels.

For the lossless dilation's operator barycentric effects,

\[
\operatorname{rank}(P_0,P_1,P_2)=(0,1,1).
\]

The zero $P_0$ is not a missing mediator root. It states that the exact order-three active representation has no trivial-character spectral component. The two rank-one nontrivial sectors are the Fourier support of the zero-sum plane.

## 3. Strict loss activates the trivial character

At the certified equal-loss point $(0.05,0.05)$,

\[
\operatorname{rank}(P_0,P_1,P_2)=(2,2,2).
\]

Thus the observed active coordinates have nonzero amplitude in all three character sectors of the coherent dilation. In particular, loss activates a full-rank trivial-character effect.

This gives a precise representation-theoretic meaning to the additional environmental memory: it fills the character component excluded by the lossless $A_2$ standard plane.

It does not mean that loss creates a third mediator particle.

## 4. The rank obstruction

The three rank patterns are

\[
\begin{array}{c|c}
\text{frame}&\text{effect ranks}\\
\hline
\text{root tight frame}&(1,1,1)\\
\text{lossless spectral dilation}&(0,1,1)\\
\text{strict-loss spectral dilation}&(2,2,2).
\end{array}
\]

Rank is invariant under invertible congruence. Therefore no unitary, metric whitening or invertible carrier redefinition can identify these three POVMs effect by effect.

The valid bridge lives on the three-label space through Fourier duality, not as equality of positive operators on the active carrier.

## 5. Consequence for the Jordan recursion

The existing recursion can now be typed more carefully:

\[
\text{two primitive mediator faces}
\longrightarrow
\text{three cyclic root labels}
\xrightarrow{\mathrm{DFT}_3}
\text{trivial plus two nontrivial characters}.
\]

The Jordan/Feshbach construction produces the missing third orbit label before Fourier transformation. The coherent-dilation construction instead resolves how observed response amplitude is distributed among the three characters.

These are complementary operations:

- root completion concerns closure of relational directions;
- Naimark completion concerns closure of coherent spectral memory.

No current theorem derives the loss weights $P_k$ from the mediator Gaussian or handle Kraus coefficients.

## 6. Open bridge

A genuine microscopic connection would require a three-label boundary field $\psi_j$ such that:

1. mediator/Furey couplings are local in the orbit-label basis;
2. propagation or defect holonomy is diagonal in the character basis;
3. eliminating unobserved character amplitudes produces the certified $P_k$;
4. the lossless limit suppresses the trivial character without fine tuning.

This is a concrete model-building target rather than a name-level correspondence.

## 7. Stop-everything and falsification criteria

**Boundary-field trigger:** derive one three-label action realizing both orbit-local couplings and character-diagonal propagation.

**Weight trigger:** obtain the Naimark effects $P_k$ from the same mediator Gaussian that produces $P_{\rm std}$.

**Dark-trivial trigger:** identify a Ward identity forcing $P_0=0$ in the lossless limit.

**Rank falsifier:** claim an invertible carrier map identifies the rank-one root effects with the full-rank lossy effects.

**Ontology warning:** call the activated trivial character a new particle or generation without a typed source map.

## 8. Verdict

| Question | Verdict |
|---|---|
| Are the root labels and dilation sectors related? | **yes, by $\mathrm{DFT}_3$** |
| Does the lossless zero-sum plane contain the two nontrivial characters? | **exactly** |
| Are the root and dilation POVMs equal? | **no** |
| Does strict loss activate the trivial character sector? | **yes** |
| Are the dilation weights derived from Jordan/Furey dynamics? | **not yet** |

## 9. Position in the corpus

- [twelve-port order-eighteen dilation](930_the_lossy_four_channel_selector_is_the_compression_of_an_exact_twelve_port_order18_unitary_representation.md)
- [three-way A2 frame theorem](918_the_mediator_root_orbit_multiplicity_edges_and_handle_kraus_operators_are_one_three_way_a2_frame.md)
- [mediator Gaussian to handle class-sum channel](921_the_completed_mediator_root_gaussian_pushes_forward_to_the_exact_handle_class_sum_channel.md)
- [canonical color-contraction closure](922_for_the_canonical_middle_frame_the_color_contraction_gate_is_closed_and_only_physical_cyclic_typing_remains.md)
- [minimal three-label boundary network](933_a_minimal_three_label_boundary_network_is_orbit_local_character_diagonal_and_activates_the_common_mode_exactly_with_loss.md)
