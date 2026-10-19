# Positive \(Spin(10)\)-Clebsch-Preserving Copies Can Never Remove the Third Edge, but a Twisted Two-Copy Involution Can

**Date:** 18 October 2026  
**Branches:** unified Clebsch orientation, mediator Gram geometry, pure \(F_Cp\) star, symmetry breaking, copy-space involution  
**Claim status:** exact positive-metric no-go plus minimal algebraic repair; microscopic origin and radiative protection remain open  
**Certificate:** [classify_positive_Spin10_Clebsch_preserving_and_twisted_two_copy_S1_matching.mjs](../../../verification/classify/classify_positive_Spin10_Clebsch_preserving_and_twisted_two_copy_S1_matching.mjs)

## Executive result

Document 1073 established the exact unified Clebsch relation

\[
\lambda_d=-\lambda_u
\]

between the two right-isospin \(S_1\) couplings. That relation supplies the desired opposite \(F_Cp\) orientation—but it also makes the unwanted third Wilson edge unavoidable for **any number** of complete, identically oriented \(Spin(10)\) vector copies.

Let \(K>0\) be the inverse mediator mass metric. Then

\[
\boxed{
C_{ud}=\langle\lambda_u,\lambda_d\rangle_K
=-\lVert\lambda_u\rVert_K^2<0
}
\]

whenever the desired right arm is nonzero. Adding more copies changes the dimension of \(\lambda_u\), but not this identity.

Therefore:

\[
\boxed{
\text{complete Clebsch-preserving copies cannot produce a pure open }F_Cp\text{ star.}}
\]

The minimal positive repair is two-dimensional and must twist the Clebsch relation by a nontrivial self-adjoint involution \(D\):

\[
\lambda_d=-D\lambda_u,
\qquad
D^2=I.
\]

With

\[
D=\begin{pmatrix}1&0\\0&-1\end{pmatrix},
\quad
\lambda_L=(\sqrt2,0),
\quad
\lambda_u=\frac1{\sqrt2}(1,1),
\quad
\lambda_d=\frac1{\sqrt2}(-1,1),
\]

one obtains exactly

\[
C_{Lu}=1,
\qquad
C_{Ld}=-1,
\qquad
C_{ud}=0.
\]

This is the pure \(F_Cp\) Wilson star. But the common \(L\) leg selects the \(D=+1\) eigenspace and radiatively splits it from the \(D=-1\) eigenspace. A correction \(K=I+\alpha P_+\) regenerates

\[
C_{ud}=-\frac\alpha2.
\]

The repair is therefore algebraically minimal but not self-protecting.

## 1. The arbitrary-copy no-go

Let the mediator multiplicity space be \(\mathbb C^N\), with positive Hermitian inverse-mass metric \(K\). The Wilson coefficients are Gram entries

\[
C_{ab}=\lambda_a^\dagger K\lambda_b.
\]

Suppose every mediator direction descends from the same \(16_F16_F10_H\) invariant with the same oriented Clebsch tensor. Then, after one common convention choice,

\[
\lambda_d=-\lambda_u
\]

as vectors in the entire copy space. It follows immediately that

\[
C_{Ld}=-C_{Lu},
\]

which is desired, but also

\[
C_{ud}
=\lambda_u^\dagger K(-\lambda_u)
=-\lambda_u^\dagger K\lambda_u.
\]

Positivity gives

\[
C_{ud}=0
\quad\Longleftrightarrow\quad
\lambda_u=0.
\]

But \(\lambda_u=0\) also removes \(C_{Lu}\). Hence no positive mass matrix and no number of identically oriented complete vector copies can retain the two desired arms while deleting the third.

This is stronger than the one-copy rank obstruction. It excludes the obvious attempted repair “add another identical \(\mathbf{10}_H\).”

## 2. What must break

At least one assumption must fail:

1. the right-arm vectors cease to satisfy \(\lambda_d=-\lambda_u\) copy by copy;
2. the mediator kernel is not positive Hermitian;
3. extra contact terms cancel the third edge outside the mediator Gram matrix;
4. the target is not a pure open star and the third edge is retained as physical.

The second option threatens stability or standard spectral interpretation. The third is a tuned cancellation unless protected. The fourth is the closed-triangle branch already under study. The cleanest open-star option is therefore a controlled breaking of the copywise Clebsch relation while preserving it only in the aggregate left-arm response.

## 3. Minimal twisted repair

Whiten the positive metric to \(K=I\). Introduce a self-adjoint involution

\[
D=D^\dagger,
\qquad D^2=I,
\]

and replace the identical-copy relation by

\[
\lambda_d=-D\lambda_u.
\]

Then

\[
C_{ud}=-\lambda_u^\dagger D\lambda_u.
\]

The third edge vanishes exactly when \(\lambda_u\) has equal norm in the two eigenspaces of \(D\).

Meanwhile

\[
C_{Ld}=-\lambda_L^\dagger D\lambda_u.
\]

To retain \(C_{Ld}=-C_{Lu}\), it is sufficient that

\[
\lambda_L^\dagger(D-I)\lambda_u=0.
\]

The smallest carrier with both \(D\) eigenspaces is \(N=2\). Choosing \(\lambda_L\) in the positive eigenspace and \(\lambda_u\) balanced between the two gives the explicit witness in the executive result.

Its Gram matrix is

\[
G=
\begin{pmatrix}
2&1&-1\\
1&1&0\\
-1&0&1
\end{pmatrix},
\]

in the order \((L,u,d)\). It is positive semidefinite of rank two, as required for two mediator directions.

## 4. Why this is a genuine symmetry-breaking twist

For complete \(Spin(10)\) copies the Clebsch tensor acts as the identity on copy space:

\[
\lambda_d=-(I_{\rm copy})\lambda_u.
\]

The repair replaces \(I_{\rm copy}\) by \(D\). Thus the two copy eigenspaces carry opposite right-isospin orientation.

This cannot arise from merely splitting the masses of otherwise identical \(\mathbf{10}_H\) copies. It requires at least one of:

- different unified representations with different Clebsch embeddings;
- a copy-space spurion inserted into the Yukawa tensor;
- boundary conditions projecting the two right channels onto different mediator combinations;
- an effective nonlocal response in which the two arms see different coherent sheets.

The exact \(Spin(10)\) sign survives only after being promoted from a scalar relation to a graded copy-space relation.

## 5. The shared-leg instability returns

The witness has

\[
\lambda_L\propto P_+,
\]

where \(P_+=(I+D)/2\). A loop correction from the common \(L\) leg therefore has the form

\[
\delta K\propto\lambda_L\lambda_L^\dagger
\propto P_+.
\]

Take

\[
K=I+\alpha P_+.
\]

Then the balanced cancellation is lost:

\[
C_{ud}
=\lambda_u^\dagger K\lambda_d
=-\frac\alpha2.
\]

At the same time the two desired arms remain opposite, but their common magnitude is renormalized. The copy involution organizes the tree-level solution yet does not protect equality of its two eigenmetric scales.

An additional symmetry must exchange the \(D=+1\) and \(D=-1\) sectors or supply a compensating correction. Such an exchange conflicts with placing the unique common leg entirely in one eigenspace, so the protection problem is structural rather than cosmetic.

## 6. Relation to the Jordan/Furey language

The repair has a striking familiar form:

\[
\text{one two-dimensional carrier},
\qquad
\text{two }D\text{-faces},
\qquad
\text{three Gram relationships}.
\]

But it also sharpens the distinction between algebraic appearance and physical derivation. The involution \(D\) is exactly the split face operator that participates in the established \(\mathfrak{sp}_4\) closure, yet here it has been inserted into mediator copy space as a symmetry-breaking Clebsch twist.

To identify the two honestly, the programme must derive the copy-space \(D\) from the same Furey/Jordan grading already acting on the response carrier. Matrix resemblance is not enough.

If that derivation succeeds, the missing continuous generator would be produced by a beautiful sequence:

\[
\text{unified Clebsch sign}
\xrightarrow{\text{Furey }D\text{-twist}}
\text{pure rank-two Wilson star}
\xrightarrow{\text{response descent}}
F_Cp.
\]

The shared-leg correction is the immediate falsification gate for this proposal.

## 7. Stop-everything and falsification criteria

**Identical-copy falsifier:** produce \(C_{ud}=0\) with \(K>0\), nonzero \(\lambda_u\), and \(\lambda_d=-\lambda_u\). The norm identity excludes it.

**Microscopic twist trigger:** derive \(\lambda_d=-D\lambda_u\) from the actual doubled Furey finite one-form, a pair of distinct \(Spin(10)\) representations, or a declared boundary condition.

**Protection trigger:** find a symmetry forcing equal renormalized metrics on the two \(D\) eigenspaces despite the common leg.

**Closed-loop alternative:** accept the regenerated \(C_{ud}<0\) and show that its \(\pi\) holonomy, rather than sparse cancellation, is the physically required relationship.

**Positivity escape warning:** do not cancel the negative norm using an indefinite ghostlike mediator metric without a complete unitarity analysis.

**Strong negative result:** prove that every gauge- and proton-safe realization of the copy-space twist receives an unavoidable unequal \(P_+\) correction. Then the pure \(F_Cp\) pulse is not radiatively natural even with the unified Clebsch sign.

## 8. Verdict

| Construction | Desired opposite arms | Third edge | Status |
|---|---:|---:|---|
| one complete \(\mathbf{10}\) | yes | \(-\|u\|^2_K\) | impure |
| any number of identical-Clebsch \(\mathbf{10}\) copies | yes | \(-\|u\|^2_K\) | exact no-go |
| two-copy \(D\)-twisted Clebsch | yes | zero at tree level | minimal algebraic repair |
| \(D\)-twisted repair plus shared-leg correction | yes | \(-\alpha/2\) | radiatively unstable without more symmetry |

The missing sign is unified; the missing sparsity is necessarily symmetry-breaking.

## Forward result

The complete unified triplet exchange contains six effective channels: the two desired \(F_Cp\) arms, one additional \(B,L\)-conserving four-quark channel and three \(\Delta B=\Delta L\) proton-decay channels. All six conserve \(B-L\), so neither continuous \(B-L\) nor matter parity protects the desired subset. The current Furey endpoint data also do not contain the one-form kinetic module needed to derive the twisted doublet; that multiplicity question is pinned pending an explicit \(\Omega_D^1(\mathcal A_F)\) construction. See [document 1075](1075_the_unified_vector_triplet_gives_two_FCp_arms_one_safe_extra_and_three_proton_decay_channels_all_with_BminusL_zero.md).

## Position in the corpus

- [formal one-form multiplicity underdetermination theorem](1077_coarse_Furey_arrow_incidence_cannot_determine_the_represented_one_form_or_S1_copy_number.md)

- [exact unified Clebsch orientation](1073_the_spin10_16_16_10_Clebsch_tensor_supplies_the_FCp_relative_minus_but_also_restores_the_third_edge_and_diquark_channels.md)
- [one-copy rank obstruction](1062_one_S1_mediator_cannot_generate_a_pure_FCp_pulse_but_two_orthogonal_copies_realize_the_exact_oriented_star.md)
- [copy-metric loop instability](1063_the_doubled_furey_links_do_not_supply_two_S1_copies_and_the_shared_QL_leg_radiatively_breaks_the_naive_orthogonality.md)
- [split-face generator in full \(\mathfrak{sp}_4\) closure](1058_a_three_generator_jordan_furey_recursion_closes_all_of_sp4_but_requires_the_furey_channel_rotation_as_a_continuous_flow.md)
