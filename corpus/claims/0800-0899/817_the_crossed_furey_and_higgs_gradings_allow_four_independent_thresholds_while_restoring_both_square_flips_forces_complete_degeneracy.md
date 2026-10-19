# The Crossed Furey and Higgs Gradings Allow Four Independent Thresholds, While Restoring Both Square Flips Forces Complete Degeneracy

## Claim status

Exact commutant and degeneracy classification for the four-channel square, plus a sufficient multichannel projector-stability bound.

## 1. Joint grading spectrum

Order the channels as

\[
(u,\nu,d,e).
\]

The Furey handle and Higgs-channel gradings are

\[
H=\operatorname{diag}(+1,-1,-1,+1),
\]

\[
C=\operatorname{diag}(+1,+1,-1,-1).
\]

Their four joint characters are

\[
\begin{array}{c|cc}
u&H=+&C=+\\
\nu&H=-&C=+\\
d&H=-&C=-\\
e&H=+&C=-.
\end{array}
\]

Every sign pair occurs exactly once.

## 2. The gradings force diagonality, not degeneracy

If a four-channel threshold matrix \(D\) commutes with both gradings,

\[
[D,H]=[D,C]=0,
\]

then an entry \(D_{fg}\) can be nonzero only when \(f\) and \(g\) have the same two signs. Since all joint characters are distinct,

\[
\boxed{
D=\operatorname{diag}(m_u,m_\nu,m_d,m_e).
}
\]

The four diagonal values remain independent. Thus the crossed grading structure itself does **not** force the zero spectral gaps that would invalidate perturbation theory.

This is good news for the approximate-center branch: nondegenerate channel thresholds are compatible with both named gradings.

## 3. Extra flip symmetries do force equalities

There are two abstract flips of the square:

- handle flip at fixed Higgs channel:
  \[
  u\leftrightarrow\nu,
  \qquad
  e\leftrightarrow d;
  \]
- channel flip at fixed handle:
  \[
  u\leftrightarrow e,
  \qquad
  \nu\leftrightarrow d.
  \]

Invariance under handle flip forces

\[
m_u=m_\nu,
\qquad
m_e=m_d.
\]

Invariance under channel flip forces

\[
m_u=m_e,
\qquad
m_\nu=m_d.
\]

The two flips generate a transitive Klein four action on the square. Imposing both gives

\[
\boxed{
m_u=m_\nu=m_d=m_e.
}
\]

This complete degeneracy is precisely the regime where arbitrarily weak connected mixing rotates the channel eigenvectors by order one.

The corpus already found that the Standard-Model-typed Furey ribbon does not possess an exact microscopic handle exchange. That obstruction now has a positive stability interpretation: the absence of full square-flip symmetry allows the diagonal thresholds to split and protect approximate channel labels.

## 4. Uniform four-channel perturbation bound

Let

\[
K=D+E,
\]

where \(D\) is the diagonal or block-diagonal channel response and \(E\) contains every cross-channel kernel. Let

\[
\gamma
=\min_f\operatorname{dist}
\left(
\operatorname{spec}D_f,
\operatorname{spec}D_{\bar f}
\right)
>0
\]

be the minimum unperturbed channel gap, and write

\[
\epsilon=\|E\|_{\rm op}<\gamma.
\]

A standard residual/Davis–Kahan envelope gives the sufficient estimate

\[
\|\widetilde P_f-P_f\|_{\rm op}
\le
\frac{\epsilon}{\gamma-\epsilon}.
\]

Requiring the right side to lie below the established leakage tolerance

\[
\rho_*=0.0411022547
\]

gives

\[
\boxed{
\frac{\epsilon}{\gamma}
<
\frac{\rho_*}{1+\rho_*}
=0.039479\ldots .
}

This multichannel condition is conservative. Direct diagonalization and the exact flux-cone quadratic tests can certify maps outside it.

## 5. Inserting the spurion envelope

At leading allowed spurion order,

\[
E_{fg}=c_{fg}y_f^*y_g+\cdots.
\]

If

\[
|c_{fg}|\le c_{\max},
\]

one may bound the operator norm of the weighted off-diagonal matrix and insert it for \(\epsilon\). The relevant comparison is

\[
\frac{\|E(y)\|_{\rm op}}{\gamma},
\]

not \(\|E(y)\|\) or a Yukawa product alone.

This produces a complete symbolic pipeline:

\[
\text{spurion lattice}
\longrightarrow
E(y)
\longrightarrow
\epsilon/\gamma
\longrightarrow
\text{projector stability}
\longrightarrow
\text{flux-cone test}.
\]

## 6. Branch decision

Three possibilities remain:

1. the actual diagonal thresholds are separated and spurion mixing satisfies the bound;
2. the bound fails but direct diagonalization still preserves all four flux signs;
3. restored flip symmetry or accidental threshold coincidence creates a degenerate mixed sector, forcing a noncentral relational description.

The gradings alone select none of these numerical regimes. They make regime one algebraically legal.

## 7. Stop-everything tests

- **Gap-protected success:** measured or derived \(\epsilon/\gamma<0.039479\ldots\).
- **Direct rescue:** the uniform bound fails but every exact quadratic flux score remains correctly signed.
- **Double-flip degeneracy:** both square flips are imposed with nonzero cross mixing; individual channel atoms cease to be perturbatively stable.
- **Accidental crossing:** two diagonal response spectra meet and a connecting spurion edge is nonzero.
- **Symmetry warning:** commuting with the two gradings is misread as equality of their four joint eigenspaces.
- **Bound warning:** the sufficient multichannel estimate is presented as a necessary threshold.

## 8. Executable certificate

    node verification/derive/derive_four_channel_spurion_mixing_bound_and_classify_threshold_degeneracies_under_square_symmetries.mjs

The certificate computes the common grading commutant, classifies degeneracy orbits under each square flip, proves joint transitivity and derives the uniform perturbation-to-gap threshold.

## Companion documents

- [Approximate center requires a spectral gap](816_a_connected_mixing_graph_can_still_leave_an_approximate_channel_center_only_when_off_diagonal_kernels_are_small_relative_to_spectral_gaps.md)
- [Rank-four spurion lattice](815_the_rank_four_channel_spurion_lattice_forces_cross_response_mixing_to_start_quadratically_but_the_single_incidence_grading_is_too_coarse.md)
- [Typed handle-exchange obstruction](../0700-0799/767_the_sewn_furey_ribbon_has_untyped_handle_exchange_but_no_standard_model_typed_exchange_between_c_and_d.md)
- [Two graded Jordan maps](813_the_four_higgs_dressed_response_blocks_have_an_r4_center_exactly_until_cross_channel_mixing_connects_them_and_the_two_gradings_leave_two_jordan_maps.md)
