# The Unique Silver Loss \(\operatorname{arsinh}(1)\) Cancels the Two-Chart Pole and Turns the Complex Gram Centre into a Causal Schur Overlap

**Date:** 18 October 2026  
**Branches:** complex Gram-centre selection, rational Schur overlap, silver scales, pole-zero cancellation, and causal globalization  
**Claim status:** exact tuned-loss theorem; microscopic selection of the tuned loss remains open  
**Certificate:** [find_the_unique_silver_loss_where_the_gram_center_becomes_same_half_plane_schur.mjs](scripts/find_the_unique_silver_loss_where_the_gram_center_becomes_same_half_plane_schur.mjs)

## Executive result

Document 1017 proved that no pointwise-real overlap can cover the entire frequency axis. The canonical complex choice is the centre of the moving Gram disk:

\[
s_c(\omega)=\overline{f_t(\omega)}f_n(\omega).
\]

It automatically lies inside every disk, maximizes the Gram determinant, and obeys

\[
s_c(-\omega)=\overline{s_c(\omega)}.
\]

Generically, however, its continuation

\[
s_c(z)=f_t(-z)f_n(z)
\]

has an upper-half-plane pole and is a two-chart boundary object rather than one causal Schur transfer.

There is exactly one nonnegative loss at which this obstruction cancels:

\[
\boxed{
\ell_*=log(1+\sqrt2)=\operatorname{arsinh}(1).}
\]

At this value,

\[
\cosh\ell_*=\sqrt2,
\qquad
\sinh\ell_*=1,
\]

and the normal zero equals the reflected tangent pole:

\[
\boxed{a_n=b_t=1.}
\]

The factors cancel exactly, leaving

\[
\boxed{
s_c(z)=
\left(
\frac{z+i(\sqrt2-1)^2}
{z+i(1+\sqrt2)^2}
\right)^2.}
\]

This function is analytic in the upper half-plane, contractive on the real axis, rational, and satisfies conjugate-frequency reality. The complex global repair therefore closes at a unique canonical silver loss.

## 1. The generic Gram-centre selection

For any contractions \(f_n,f_t\), choosing

\[
s=s_c=\bar f_tf_n
\]

sets the residual overlap to zero:

\[
s_c-\bar f_tf_n=0.
\]

The Gram determinant is then maximal:

\[
\det G_c
=(1-|f_n|^2)(1-|f_t|^2).
\]

Geometrically, after projecting away the reference ray, the two environment residuals are orthogonal. This is the cleanest possible realization of the two auxiliary port directions.

On the real frequency axis, the physical response obeys

\[
f_j(-\omega)=\overline{f_j(\omega)}.
\]

Hence

\[
s_c(-\omega)=\overline{s_c(\omega)}.
\]

So the centre selection has the correct Real boundary condition even when it is complex.

## 2. Generic analytic obstruction

Write

\[
f_j(z)=
\left(
\frac{z-ia_j}{z+ib_j}
\right)^2,
\qquad
a_j=\gamma_j e^{-\ell},
\quad
b_j=\gamma_j e^{\ell}.
\]

Then

\[
f_t(-z)=
\left(
\frac{z+ia_t}{z-ib_t}
\right)^2.
\]

Its denominator has a double pole at

\[
z=ib_t
\]

in the upper half-plane. The only available upper-half-plane zero of \(f_n(z)\) is at

\[
z=ia_n.
\]

Thus same-half-plane analyticity requires

\[
a_n=b_t.
\]

## 3. Unique silver cancellation

Using reciprocal scales \(\gamma_t=1/\gamma_n\), the cancellation condition is

\[
\gamma_ne^{-\ell}
=\gamma_te^{\ell}.
\]

Therefore

\[
e^{2\ell}=\frac{\gamma_n}{\gamma_t}=\gamma_n^2,
\]

and the unique solution is

\[
\ell=\log\gamma_n=\log(1+\sqrt2).
\]

At this loss,

\[
a_n=b_t=1,
\qquad
a_t=\gamma_t^2=3-2\sqrt2,
\qquad
b_n=\gamma_n^2=3+2\sqrt2.
\]

After cancellation,

\[
s_c(z)=
\left(
\frac{z+ia_t}{z+ib_n}
\right)^2.
\]

Its only pole is at \(-ib_n\), in the lower half-plane. On real frequency,

\[
|s_c(\omega)|
=\frac{\omega^2+a_t^2}
{\omega^2+b_n^2}<1.
\]

Thus it is a same-half-plane Schur function.

## 4. Why \(\operatorname{arsinh}(1)\) is structurally notable

The tuned loss is not a fitted decimal:

\[
e^{\ell_*}=1+\sqrt2,
\qquad
e^{-\ell_*}=\sqrt2-1.
\]

It is exactly the logarithm of the silver unit and the hyperbolic angle with

\[
(\cosh\ell_*,\sinh\ell_*)=(\sqrt2,1).
\]

The response zero and reflected pole both land at the unit scale. This is the same arithmetic checkpoint that previously fixed the reciprocal silver reactances, now reappearing as the unique causal-gluing condition.

This recurrence is strong structural evidence. It is not yet a derivation that the physical loss must equal \(\ell_*\).

## 5. Coherence cost of the analytic centre

At \(\omega=1\), document 1016 selected the largest natural negative Real overlap

\[
|s_*|=e^{-2\ell}.
\]

The analytic Gram-centre selection instead has magnitude

\[
|s_c(1)|=|f_n(1)f_t(1)|=e^{-4\ell}.
\]

Its sixth-order locking suppression is therefore

\[
\boxed{|s_c(1)|^6=e^{-24\ell_*},}
\]

rather than \(e^{-12\ell_*}\).

Causal globalization selects a more strongly dephased interior point than the checkpoint-optimal Real branch.

## 6. Relation to the two-chart no-go

Document 951 proved that the full sideband product containing \(S(-z)\) is boundary monodromy rather than one same-half-plane rational-inner transfer. The present result is the scalar-overlap analogue:

- generic \(\ell\): two-chart obstruction remains;
- \(\ell=\ell_*\): one reflected pole is cancelled by the reciprocal-channel zero;
- the cancellation concerns the overlap function, not automatically the entire two-face response matrix.

Therefore this theorem does not erase document 951. It identifies a special scalar subchannel that globalizes despite the larger matrix obstruction.

## 7. Stop-everything and falsification tests

**Microscopic-loss trigger:** a Furey/Jordan/environment action fixes

\[
\ell=\operatorname{arsinh}(1)
\]

from positivity, arithmetic or a stationary principle.

**Full-matrix trigger:** the same pole-zero cancellation extends from the scalar Gram centre to a typed block of the rational-inner dilation.

**Port trigger:** the orthogonal residual directions at the disk centre transform as the established $A_2$ environment doublet.

**Tuning falsifier:** the physical loss differs from \(\ell_*\) and no other analytic disk selection exists.

**Cancellation falsifier:** corrected transfer conventions move the normal zero or reflected tangent pole away from the unit scale.

**Overclaim warning:** uniqueness of the cancellation loss does not prove nature selects it.

## Verdict

| Question | Verdict |
|---|---|
| Does the complex Gram centre satisfy frequency-domain reality? | **Yes** |
| Is it generically one same-half-plane Schur function? | **No** |
| Is there a loss where the obstruction cancels? | **Yes, uniquely** |
| What is that loss? | **\(\log(1+\sqrt2)=\operatorname{arsinh}(1)\)** |
| What cancels? | **The normal zero and reflected tangent pole at unit scale** |
| Is the resulting overlap causal and contractive? | **Yes** |
| Is the tuned loss dynamically derived? | **No** |

## Position in the corpus

- [full-band Real-overlap no-go](1017_the_physical_silver_real_overlap_is_necessarily_band_limited_and_must_complexify_or_stop_at_a_finite_cutoff.md)
- [silver-checkpoint negative overlap](1016_the_physical_silver_channels_select_a_negative_real_overlap_inside_the_gram_disk_at_the_unit_frequency_checkpoint.md)
- [two-face analytic boundary](951_the_two_face_sideband_cycle_is_boundary_monodromy_not_one_same_half_plane_rational_inner_transfer.md)
- [silver unit Cayley checkpoint](960_the_silver_ratios_are_exactly_the_unit_cayley_reactances_of_the_graded_pfaffian_face_generator.md)
