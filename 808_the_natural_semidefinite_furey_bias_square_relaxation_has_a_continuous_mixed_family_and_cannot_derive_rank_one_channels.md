# The Natural Semidefinite Furey Bias-Square Relaxation Has a Continuous Mixed Family and Cannot Derive Rank-One Channels

## Claim status

Exact convex nonselection theorem at the checkpoint. It identifies what semidefinite optimization can certify and the nonconvex datum it cannot supply.

## 1. The smallest meaningful convex relaxation

Let \(P_j\) be the four rank-one spectral projectors of the scattering checkpoint. Seek four output Gram matrices \(Q_f\) for the four neutral Furey sources, subject to

\[
Q_f\succeq0,
\qquad
\operatorname{Tr}Q_f=1,
\qquad
\sum_fQ_f=I.
\]

Require each \(Q_f\) to commute with the checkpoint, so it remains inside the relational spectral algebra, and impose its prescribed strict handle and side signs:

\[
h_f\operatorname{Tr}(\Gamma_HQ_f)>0,
\qquad
s_f\operatorname{Tr}(\Gamma_RQ_f)>0.
\]

Here \((h_f,s_f)\) labels the four cells

\[
(C,L),\ (C,R),\ (D,L),\ (D,R).
\]

Every condition above is affine or semidefinite. This is the natural convex feasibility problem suggested by the direct Gram certificate.

## 2. Spectral-algebra reduction

Checkpoint commutation gives

\[
Q_f=\sum_j W_{fj}P_j.
\]

Positivity and unit trace require

\[
W_{fj}\ge0,
\qquad
\sum_jW_{fj}=1.
\]

Completeness \(\sum_fQ_f=I\) adds

\[
\sum_fW_{fj}=1.
\]

Thus \(W\) lies in the four-by-four Birkhoff polytope of doubly stochastic matrices. Its vertices are the 24 source-to-projector permutations found previously, but the SDP also contains every convex mixture of them.

## 3. Explicit continuous feasible family

Let \(\pi\) be either bias-square-compatible projector assignment. For

\[
0\le\epsilon\le1,
\]

define

\[
\boxed{
Q_f(\epsilon)
=(1-\epsilon)P_{\pi(f)}+\epsilon\frac I4.
}
\]

The coefficient matrix is

\[
W(\epsilon)
=(1-\epsilon)P_\pi+\epsilon\frac{J}{4},
\]

which is doubly stochastic. The matrices \(Q_f(\epsilon)\) are positive, unit trace, complete and checkpoint-commuting.

Both gradings are traceless, so

\[
\operatorname{Tr}(\Gamma_HQ_f(\epsilon))
=(1-\epsilon)\operatorname{Tr}(\Gamma_HP_{\pi(f)}),
\]

and likewise for \(\Gamma_R\). Therefore every strict cell sign survives for every

\[
0\le\epsilon<1.
\]

At \(\epsilon=1\), all four matrices meet at \(I/4\) and both biases vanish. The feasible set consequently contains an entire open line from each correct spectral permutation toward the maximally mixed boundary.

## 4. The missing condition is purity

For positive unit-trace matrices, rank one is equivalent to

\[
\operatorname{Tr}(Q_f^2)=1.
\]

Along the depolarized family this equality holds only at \(\epsilon=0\). It is a nonconvex constraint. Equivalent formulations are:

- \(Q_f^2=Q_f\);
- \(\operatorname{rank}Q_f=1\);
- preservation of primitive idempotents;
- multiplicativity of the source-to-spectral algebra map;
- positivity of both a map and its inverse, yielding an order isomorphism.

The earlier reduction to 24 permutations used precisely this stronger order-isomorphism content. Positivity, unitality and bias signs alone do not reproduce it.

## 5. Consequence for the computational programme

An SDP is still valuable for:

- falsifying incompatible affine incidence or covariance constraints;
- maximizing a robust bias margin;
- supplying an upper bound for a subsequent rank-constrained problem;
- locating candidate faces before algebraic recovery.

It cannot by itself derive the rank-one Furey-to-projector intertwiner. A defensible search must use a two-stage architecture:

1. convex feasibility in the Gram variables;
2. rank-one, purity or multiplicativity recovery, followed by the exact quadratic flux tests.

If the first stage fails, the proposed affine constraints are impossible. If it succeeds but every rank-one recovery fails, the obstruction is genuinely algebraic rather than merely a sign or positivity problem.

## 6. Stop-everything tests

- **Convex obstruction:** the SDP is infeasible after physically derived Furey covariance constraints are added.
- **Rank obstruction:** the SDP is feasible but the feasible face contains no four-projector resolution of identity.
- **Selector success:** a rank-one solution satisfies Furey incidence, background covariance and the four strict flux-cone inequalities.
- **Vacuity warning:** feasibility under only positivity, completeness, commutation and bias signs is guaranteed by the depolarized family and is not evidence for the microscopic map.
- **Boundary event:** \(\epsilon=1\) reaches \(I/4\), where every orientation sign vanishes.

## 7. Executable certificate

    node scripts/prove_the_convex_gram_relaxation_has_a_continuous_depolarized_feasible_family_and_cannot_select_rank_one_channels.mjs

The certificate checks positivity coefficients, row and column sums, strict bias preservation for \(\epsilon<1\), loss of strictness at \(\epsilon=1\), and loss of purity away from the permutation endpoint.

## Companion documents

- [Restricted-ray and direct quadratic source-map test](807_diagonal_source_gains_are_orientation_invisible_and_only_relative_off_diagonal_leakage_needs_control.md)
- [Positive order-isomorphisms leave 24 assignments](797_positive_unital_source_to_projector_maps_reduce_to_24_order_isomorphisms_but_regular_torsor_covariance_selects_none.md)
- [The two bias-square assignments](798_the_checkpoint_projectors_form_a_handle_by_side_bias_square_matching_the_furey_handle_by_channel_square_up_to_one_global_reversal.md)
- [Orbit-wide bias-square theorem](799_the_handle_by_side_bias_square_survives_all_18_selector_backgrounds_and_globally_labels_the_discrete_eigenbundle.md)
