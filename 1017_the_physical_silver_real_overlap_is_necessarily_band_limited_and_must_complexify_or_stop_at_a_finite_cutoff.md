# The Physical Silver Real Overlap Is Necessarily Band-Limited and Must Complexify or Stop at a Finite Cutoff

**Date:** 18 October 2026  
**Branches:** full-frequency silver response, Real overlap, Gram disk, causal continuation, and band limitation  
**Claim status:** exact endpoint and asymptotic no-go with certified crossing data; complete algebraic root classification remains open  
**Certificate:** [prove_the_physical_silver_real_overlap_is_necessarily_band_limited.mjs](scripts/prove_the_physical_silver_real_overlap_is_necessarily_band_limited.mjs)

## Executive result

The negative Real overlap found at the silver checkpoint cannot extend as a pointwise-real joint environment over the entire frequency axis.

For the physical normal and tangent transfers, define the real-axis intersection margin

\[
H(\omega,\ell)
=
(1-|f_n|^2)(1-|f_t|^2)
-\left(\operatorname{Im}(\bar f_tf_n)\right)^2.
\]

The unequal-transfer Gram disk intersects the real axis exactly when

\[
H(\omega,\ell)\ge0.
\]

For every strict loss \(\ell>0\):

\[
\boxed{H(0,\ell)=(1-e^{-8\ell})^2>0,}
\]

and document 1016 proves

\[
H(1,\ell)>0.
\]

But the exact high-frequency expansion is

\[
\boxed{
H(\omega,\ell)
=-\frac{64\cosh^2\ell}{\omega^2}
+O(\omega^{-4}).}
\]

Therefore \(H<0\) for all sufficiently large finite frequency. By continuity there is at least one finite terminal crossing.

The conclusion is unavoidable:

\[
\boxed{
\text{no pointwise-real overlap branch covers the whole real-frequency axis.}}
\]

The project must either restrict the joint Jordan/Hopf description to a protected band or allow a complex overlap obeying the frequency-domain reality condition

\[
s(-\omega)=\overline{s(\omega)}.
\]

## 1. Exact low-frequency behavior

At \(\omega=0\), both physical transfers lose their scale dependence:

\[
f_n(0)=f_t(0)=e^{-4\ell}.
\]

The Gram-disk centre is real and the radius is positive. Hence

\[
H(0,\ell)
=(1-e^{-8\ell})^2.
\]

So a real overlap always exists at zero frequency under strict loss.

This low-frequency branch is centred near a positive overlap. It is not automatically the same connected choice as the negative graded branch at \(\omega=1\).

## 2. The unit-frequency island

At \(\omega=1\), reciprocal silver scales force the negative overlap

\[
s_*=-e^{-2\ell}
\]

inside the disk. Thus \(H(1,\ell)>0\) exactly.

For weak loss, the allowed real set can be disconnected as a function of frequency: a small low-frequency interval, a separate interval containing \(\omega=1\), and forbidden gaps between or above them. As loss increases, the lower components can merge.

This topology is certified numerically by the executable check but is not promoted to a complete symbolic root theorem here.

## 3. Exact high-frequency obstruction

For one channel,

\[
f_j(\omega)
=1-\frac{2i(a_j+b_j)}{\omega}
+O(\omega^{-2}),
\]

where

\[
a_j+b_j=2\gamma_j\cosh\ell.
\]

The product of the two Schur defects is only \(O(\omega^{-4})\), while

\[
\operatorname{Im}(\bar f_tf_n)
=\frac{2[(a_t+b_t)-(a_n+b_n)]}{\omega}
+O(\omega^{-2}).
\]

Using

\[
\gamma_n-\gamma_t=2
\]

gives

\[
\left(\operatorname{Im}(\bar f_tf_n)\right)^2
=\frac{64\cosh^2\ell}{\omega^2}
+O(\omega^{-3}).
\]

The phase mismatch therefore dominates the shrinking defect radius. The Gram disk approaches the unit circle away from the real axis faster than its radius can reach the axis.

## 4. Certified crossing examples

The check searches logarithmically over positive frequency and refines every detected sign change. Representative crossings are:

| \(\ell\) | positive-frequency crossings of \(H=0\) |
|---:|---|
| 0.01 | approximately 0.01042, 0.83018, 1.16941 |
| 0.05 | approximately 0.06377, 0.59809, 1.38882 |
| 0.10 | approximately 0.24682, 0.28971, 1.56725 |
| 0.20 | approximately 1.85507 |
| 0.50 | approximately 2.67830 |
| 1.00 | approximately 4.55155 |
| 2.00 | approximately 12.55329 |

These values are diagnostic rather than universal constants. They show that loss changes not only the cutoff but also the number of connected Real-admissible bands.

## 5. Consequences for analyticity and reality

Requiring \(s(\omega)\in\mathbb R\) at every positive frequency is stronger than the usual reality condition for a time-domain kernel. A real causal kernel requires

\[
s(-\omega)=\overline{s(\omega)},
\]

not necessarily real \(s(\omega)\) separately.

Therefore the high-frequency no-go does not kill the joint-environment programme. It kills only the globally pointwise-real version.

Two branches remain:

### Band-limited Real theory

Choose a connected component of \(H\ge0\) containing the physical checkpoint. Treat its terminal zero as the validity boundary of the effective Jordan/Hopf description.

### Complex causal theory

Choose \(s(\omega)\) inside the full complex Gram disk and enforce conjugate-frequency reality. Its phase rotates the local sixfold marking and becomes part of the dispersive connection.

The second branch is broader but must solve analytic selection inside a moving disk.

## 6. Stop-everything and falsification tests

**Band trigger:** identify a physical spectral gap or experimental window wholly contained in the checkpoint component of \(H\ge0\).

**Complex-selection trigger:** construct an analytic Schur function \(s(z)\) whose boundary values lie inside the Gram disks and obey conjugate-frequency reality.

**Connection trigger:** derive the frequency-dependent phase of complex \(s\) as the same Real-bundle connection that rotates the Hopf root.

**Global-Real falsifier:** any claim of a real overlap on the entire real axis contradicts the negative high-frequency asymptotic.

**Low/high gluing warning:** disconnected Real bands cannot be joined without entering the complex disk interior or crossing a boundary singularity.

**Root-table warning:** numerical crossing counts must not be promoted to exact phase-transition values without algebraic root analysis.

## Verdict

| Question | Verdict |
|---|---|
| Does a real overlap exist at zero frequency? | **Yes** |
| Does it exist at the silver checkpoint? | **Yes** |
| Can it exist at all finite frequencies? | **No** |
| Why does it fail at high frequency? | **Relative phase decays as \(1/\omega\), faster than the defect radius can compensate** |
| Is the real theory necessarily band-limited? | **Yes** |
| Can a complex conjugate-frequency overlap remain viable? | **Yes; not yet constructed analytically** |

## Position in the corpus

- [silver-checkpoint negative overlap](1016_the_physical_silver_channels_select_a_negative_real_overlap_inside_the_gram_disk_at_the_unit_frequency_checkpoint.md)
- [unequal-transfer Gram disk](1015_unequal_face_transfers_admit_a_joint_environment_exactly_inside_a_gram_overlap_disk_and_relative_phase_can_exclude_real_dephasing.md)
- [minimal joint environment](1014_a_minimal_three_state_environment_jointly_realizes_scalar_loss_and_partial_dephasing_pointwise_but_causal_globalization_remains_open.md)
- [two-face analytic boundary](951_the_two_face_sideband_cycle_is_boundary_monodromy_not_one_same_half_plane_rational_inner_transfer.md)
