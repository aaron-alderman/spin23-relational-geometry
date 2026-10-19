# The Checkpoint Projectors Form a Handle-by-Side Bias Square Matching the Furey Handle-by-Channel Square up to One Global Reversal

## Claim status

Exact classification of the computed participation inequalities and finite assignment reduction; physical identification of Higgs channel with boundary side remains unproved.

## 1. Two independent binary partitions of matter

The four matter labels form the crossed square

| field | sewn handle | Higgs channel |
|---|---|---|
| \(u\) | \(C\) | up |
| \(e\) | \(C\) | down |
| \(d\) | \(D\) | down |
| \(\nu\) | \(D\) | up |

Every pair of binary labels occurs once:

\[
(C,\mathrm{up}),\quad(C,\mathrm{down}),\quad
(D,\mathrm{down}),\quad(D,\mathrm{up}).
\]

The handle partition is the unique double-transversal sewing of document 789.

## 2. Two independent bias partitions of the spectral projectors

Document 784 computed the participation of every rank-one checkpoint projector on the two handles and two boundary sides. Classify a projector by whichever weight exceeds one half.

| projector | first-handle weight | left-side weight | bias pair |
|---|---:|---:|---|
| \(P_0\) | \(0.93653\) | \(0.29181\) | \((C,\mathrm{right})\) |
| \(P_1\) | \(0.85909\) | \(0.65837\) | \((C,\mathrm{left})\) |
| \(P_2\) | \(0.15536\) | \(0.95158\) | \((D,\mathrm{left})\) |
| \(P_3\) | \(0.04902\) | \(0.09823\) | \((D,\mathrm{right})\) |

Again, all four bit pairs occur exactly once.

This does not make any projector support-local: every participation entry remains nonzero. The statement concerns strict majority bias only.

## 3. Reduction of the 24 order-isomorphisms

Document 797 found 24 positive unital order-isomorphisms between matter idempotents and projector idempotents.

Requiring the named handle labels to agree,

\[
\{u,e\}\mapsto\{P_0,P_1\},
\qquad
\{d,\nu\}\mapsto\{P_2,P_3\},
\]

leaves

\[
2!\,2!=4
\]

assignments.

Now require the up/down partition to agree with the left/right bias partition. There are two possible global orientations.

### Up maps to left

\[
u\mapsto P_1,\qquad
e\mapsto P_0,\qquad
d\mapsto P_3,\qquad
\nu\mapsto P_2.
\]

### Up maps to right

\[
u\mapsto P_0,\qquad
e\mapsto P_1,\qquad
d\mapsto P_2,\qquad
\nu\mapsto P_3.
\]

Thus

\[
\boxed{24\longrightarrow4\longrightarrow2.}
\]

One additional physical orientation relating Higgs channel to propagation side would select a unique projector assignment.

## 4. Robustness of the numerical classification

The smallest distance of any handle weight from one half is approximately

\[
\Delta_H=0.34464,
\]

and the smallest side-bias distance is

\[
\Delta_S=0.15837.
\]

Perturbations smaller than these margins in the corresponding participation weights cannot change the bit classification. The square is therefore not caused by a near-tie at the selected checkpoint.

It is nevertheless not topologically protected. Along a continuous deformation or another selector background, a weight can cross one half.

## 5. Why this is interesting

The result aligns two independently obtained relational grids:

\[
\text{Furey handle}\times\text{Higgs channel}
\]

and

\[
\text{checkpoint handle bias}\times\text{boundary-side bias}.
\]

This is substantially stronger than matching four labels by cardinality. It uses two transverse partitions on both sides and reduces the map ambiguity to one global bit.

The unresolved bit has a plausible interpretation as an orientation convention:

\[
\mathrm{up}\leftrightarrow\mathrm{left}
\quad\text{or}\quad
\mathrm{up}\leftrightarrow\mathrm{right}.
\]

But plausibility is not a derivation.

## 6. Why it is not yet the missing intertwiner

Three obstructions remain:

1. handle and side are participation biases, not exact invariant subspaces;
2. no Standard-Model theorem equates Higgs up/down channel with propagation direction;
3. document 785 showed that handle exchange and flux reversal mix rather than permute the fixed-background eigenlines.

The bias-square map is therefore a strong candidate base-fiber assignment, not a symmetry intertwiner.

## 7. Stop-everything tests

- **Orientation trigger:** the sewn boundary real structure derives whether the up channel maps to incoming/left or outgoing/right propagation.
- **Background-covariance trigger:** the two bias partitions remain separated over the physically admitted selector stratum.
- **Crossing falsifier:** a required background forces a participation weight through one half and destroys the square classification.
- **Representation falsifier:** the proposed channel-to-side orientation conflicts with gauge, CP or antiunitary typing.
- **Numerology stop:** the square may not be called physical solely because it reduces 24 assignments to two.

## 8. Executable certificate

    node verification/match/match_the_furey_handle_channel_square_to_the_checkpoint_handle_side_bias_square.mjs

The certificate enumerates all 24 assignments, extracts the two strict bias partitions, counts the four handle-preserving and two square-preserving maps and computes the bias margins.

## Companion documents

- [Positive source-to-projector maps leave 24 choices](797_positive_unital_source_to_projector_maps_reduce_to_24_order_isomorphisms_but_regular_torsor_covariance_selects_none.md)
- [Projector participation across handles and sides](784_all_four_scattering_eigenchannels_are_rank_one_relational_superpositions_touching_both_handles_and_both_boundary_sides.md)
- [The unique double-transversal Furey pairing](789_standard_model_typing_uniquely_selects_the_furey_double_transversal_pairing_and_leaves_at_most_a_six_point_selector_stratum.md)
- [The fixed eigenlines are not a selector permutation representation](785_the_scattering_eigenchannel_quartet_is_not_an_equivariant_permutation_copy_of_the_furey_udenu_grid.md)
