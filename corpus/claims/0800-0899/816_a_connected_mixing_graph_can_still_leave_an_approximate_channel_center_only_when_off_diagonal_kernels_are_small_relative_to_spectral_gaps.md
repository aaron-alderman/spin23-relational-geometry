# A Connected Mixing Graph Can Still Leave an Approximate Channel Center Only When Off-Diagonal Kernels Are Small Relative to Spectral Gaps

## Claim status

Exact two-channel stability threshold and general residual/gap protocol. This replaces binary exact-centrality language by a quantitative approximate-center test when cross-channel mixing is nonzero.

## 1. Exact and approximate centers answer different questions

Let

\[
K=D+E
\]

be a Hermitian channel-response kernel, where \(D\) is block diagonal in \(u,d,e,\nu\) and \(E\) contains cross-channel blocks. Let \(P_f\) be the coordinate projector onto channel \(f\).

Exact centrality requires

\[
[K,P_f]=0.
\]

Because \([D,P_f]=0\),

\[
[K,P_f]=[E,P_f].
\]

Any nonzero edge touching \(f\) destroys exact centrality. This remains true even if the edge is arbitrarily small.

Approximate centrality instead asks whether the spectral subspace of \(K\) remains close to \(P_f\). That depends on a ratio:

\[
\frac{\text{off-block coupling}}{\text{diagonal spectral separation}}.
\]

Small coupling alone is insufficient.

## 2. Exact two-channel model

Consider

\[
K=
\begin{pmatrix}
0&\epsilon\\
\epsilon&\Delta
\end{pmatrix},
\qquad \Delta\ne0.
\]

The spectral line continuing the first coordinate is rotated by

\[
\theta
=\frac12\arctan\frac{2|\epsilon|}{|\Delta|}.
\]

The operator-norm distance between its rank-one projector \(\widetilde P\) and the coordinate projector \(P\) is exactly

\[
\|\widetilde P-P\|_{\rm op}=\sin\theta.
\]

The established restricted-ray orientation tolerance is

\[
\rho_* =0.0411022547.
\]

Requiring \(\sin\theta<\rho_*\) gives the exact two-channel condition

\[
\boxed{
\frac{|\epsilon|}{|\Delta|}
<\frac12\tan\bigl(2\arcsin\rho_*\bigr)
=0.0412067501\ldots .
}
\]

Thus a symmetry-allowed and even nonzero edge need not destroy the orientation certificate when its coupling is below about \(4.12\%\) of the relevant gap.

## 3. Degeneracy is the sharp obstruction

If the diagonal channels are degenerate,

\[
K=
\begin{pmatrix}
0&\epsilon\\
\epsilon&0
\end{pmatrix},
\]

then for every \(\epsilon\ne0\) the eigenvectors are

\[
\frac1{\sqrt2}(1,\pm1).
\]

The channel projector rotates by

\[
\theta=\frac\pi4,
\qquad
\|\widetilde P-P\|_{\rm op}=\frac1{\sqrt2}.
\]

This is independent of how small \(|\epsilon|\) is. Therefore

\[
\boxed{
\text{there is no uniform small-mixing theorem without a nonzero spectral gap}.}
\]

This is the principal danger for any proposal in which the four channel blocks are made identical by a high symmetry.

## 4. Multichannel protocol

For each channel or desired spectral cluster, compute:

\[
\gamma_f
=\operatorname{dist}
\bigl(
\operatorname{spec}D_f,
\operatorname{spec}D_{\bar f}
\bigr),
\]

and the off-block residual

\[
\epsilon_f
=\|(I-P_f)KP_f\|_{\rm op}.
\]

If \(\gamma_f=0\), diagonalize the full degenerate sector; no channel-local conclusion follows from small \(\epsilon_f\).

If \(\gamma_f>0\), use direct diagonalization or a Davis–Kahan/residual theorem to bound

\[
\|\widetilde P_f-P_f\|_{\rm op}.
\]

The orientation branch is uniformly certified when every resulting distance lies below

\[
0.0411022547.
\]

The direct quadratic flux-cone inequalities remain stronger and should be applied once the actual map is known.

## 5. Combining with spurion power counting

The channel-spurion theorem gives

\[
E_{gf}
=c_{gf}y_g^*y_f+\cdots.
\]

It is tempting to call this small because it is quadratic. The correct dimensionless control parameter is instead

\[
\frac{\|c_{gf}y_g^*y_f\|}{\gamma_f}.
\]

A tiny Yukawa product divided by a still smaller near-degeneracy can produce order-one rotation. Conversely, sizable channel gains do not matter if they are diagonal and the off-block/gap ratio remains small.

## 6. Revised branch logic

The central bridge now has three regimes:

1. **Exact center:** all cross kernels vanish.
2. **Approximate center:** cross kernels are nonzero, spectral gaps are nonzero, and projector rotations satisfy the tolerance.
3. **Relational mixed algebra:** gaps close or rotations exceed tolerance; channel atoms are not stable and the full noncentral response must be used.

This avoids discarding a viable approximate bridge merely because the exact mixing graph is connected, while refusing to protect channel labels in a degenerate mixed sector.

## 7. Stop-everything tests

- **Exact success:** every off-block kernel vanishes.
- **Approximate success:** all spectral-projector distances are below \(0.0411022547\).
- **Gap failure:** a required channel gap is zero while a connecting kernel is nonzero.
- **Rotation failure:** direct diagonalization moves a channel projector outside its flux cone.
- **Power-counting falsifier:** small Yukawa degree is used without comparing against the response gap.
- **Degeneracy warning:** a symmetry-enforced equality of diagonal responses is presented as protection despite nonzero mixing.
- **Relational transition:** stable individual channel projectors disappear, requiring a mixed response algebra rather than four atoms.

## 8. Executable certificate

    node verification/derive/derive_spectral_gap_thresholds_for_approximate_channel_center_and_orientation_stability.mjs

The certificate derives the exact two-channel coupling-to-gap threshold, evaluates representative rotations and verifies the degenerate \(45^\circ\) counterexample.

## Companion documents

- [Rank-four spurion lattice and quadratic edge order](815_the_rank_four_channel_spurion_lattice_forces_cross_response_mixing_to_start_quadratically_but_the_single_incidence_grading_is_too_coarse.md)
- [Four-channel center and mixing graph](813_the_four_higgs_dressed_response_blocks_have_an_r4_center_exactly_until_cross_channel_mixing_connects_them_and_the_two_gradings_leave_two_jordan_maps.md)
- [Restricted-ray orientation tolerance](807_diagonal_source_gains_are_orientation_invisible_and_only_relative_off_diagonal_leakage_needs_control.md)
- [Coherent unitary orientation stability](805_coherent_unitary_source_mixing_preserves_the_orientation_below_an_orbit_wide_operator_norm_threshold_with_a_sharp_rotation_boundary.md)
