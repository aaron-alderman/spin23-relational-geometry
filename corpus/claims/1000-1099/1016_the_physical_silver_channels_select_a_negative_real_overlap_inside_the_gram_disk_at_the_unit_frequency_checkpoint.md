# The Physical Silver Channels Select a Negative Real Overlap Inside the Gram Disk at the Unit-Frequency Checkpoint

**Date:** 18 October 2026  
**Branches:** silver normal/tangent channels, reciprocal scales, negative dephasing overlap, grading, and phase-locking spectrum  
**Claim status:** exact checkpoint theorem; full frequency-band and causal realization remain open  
**Certificate:** [insert_the_silver_normal_tangent_transfers_into_the_gram_disk_at_unit_frequency.mjs](../../../verification/insert/insert_the_silver_normal_tangent_transfers_into_the_gram_disk_at_unit_frequency.mjs)

## Executive result

The physical normal and tangent silver transfers can now be inserted exactly into the unequal-channel Gram disk at the unit-frequency checkpoint.

Let

\[
\gamma_n=1+\sqrt2,
\qquad
\gamma_t=\sqrt2-1,
\]

so that

\[
\gamma_n\gamma_t=1,
\qquad
\gamma_n^2+\gamma_t^2=6.
\]

For common hyperbolic loss \(\ell\ge0\), define

\[
f_j(1)=
\left(
\frac{1-i\gamma_j e^{-\ell}}
{1+i\gamma_j e^{\ell}}
\right)^2.
\]

Writing \(t=e^{-\ell}\), their magnitudes obey the exact reciprocal-scale identity

\[
\boxed{|f_n(1)|\,|f_t(1)|=t^4=e^{-4\ell}.}
\]

The distinguished Real overlap is the **negative** signed geometric mean

\[
\boxed{
s_*(1)=-t^2=-e^{-2\ell}
=-\sqrt{|f_n(1)f_t(1)|}.}
\]

It lies inside the admissible Gram disk for every strict loss \(\ell>0\). The exact Gram determinant is

\[
\boxed{
\det G_*
=
\frac{(1-t^2)^2(1+t^2)^2
\left(1+12t^2+5t^4-2t^6\right)}
{(t^4+6t^2+1)^2}.}
\]

For \(0<t<1\), every factor is positive. At \(t=1\), corresponding to zero loss, the determinant vanishes and \(s_*=-1\).

Thus strict loss moves the physical checkpoint from a rank-reduced graded reflection into the rank-three interior of the common environment, while preserving a real overlap. The sixth-order potential is insensitive to the sign and is suppressed by

\[
\boxed{s_*^6=e^{-12\ell}.}
\]

## 1. Why the negative branch is natural

At zero loss and \(\omega=1\), the two transfers are

\[
f_n=i,
\qquad
f_t=-i.
\]

Their relative phase is \(\pi\), not zero. The Gram disk collapses to the single overlap

\[
s=-1.
\]

This is not ordinary positive dephasing. It is the unitary relative grading action

\[
P\longmapsto DPD,
\qquad
D=\operatorname{diag}(1,-1),
\]

which reverses the off-diagonal relationship coordinate.

For strict loss, \(-1<s_*<0\). The channel

\[
\mathcal E_{s_*}(P)
=\frac{1+s_*}{2}P
+\frac{1-s_*}{2}DPD
\]

remains completely positive. It is a partially noisy continuation of the graded reflection rather than a continuation of the identity channel.

## 2. Exact magnitude identity

For one channel,

\[
|f_j(1)|
=\frac{1+\gamma_j^2t^2}
{1+\gamma_j^2/t^2}.
\]

Using \(\gamma_t=1/\gamma_n\) and

\[
\gamma_n^2+\gamma_n^{-2}=6,
\]

one obtains

\[
|f_n||f_t|
=
\frac{1+6t^2+t^4}
{1+6/t^2+1/t^4}
=t^4.
\]

Hence the signed geometric mean has magnitude \(t^2\) exactly.

This is a special consequence of the reciprocal silver pair. Document 1015 remains correct that a geometric mean is not admissible for generic unequal contractions.

## 3. Exact Gram positivity

Substitute \(s_*=-t^2\) into

\[
\det G
=(1-|f_n|^2)(1-|f_t|^2)
-|s_*-\bar f_tf_n|^2.
\]

Exact factorization gives the displayed determinant. Its last polynomial satisfies, for \(0<t\le1\),

\[
1+12t^2+5t^4-2t^6
\ge1+12t^2+3t^4>0,
\]

because \(t^6\le t^4\).

Therefore:

- \(\ell=0\): \(\det G_*=0\), a boundary/rank-reduced realization;
- \(\ell>0\): \(\det G_*>0\), a rank-three environment;
- \(\ell\to\infty\): \(s_*\to0^-\), so coherent phase locking eventually collapses.

## 4. Locking scale and comparison with the scalar branch

The mixed Hopf coordinate is

\[
w_{s_*}=s_*w.
\]

The orientation cubic changes sign because \(s_*^3<0\), but its observable even square depends on

\[
s_*^6=e^{-12\ell}.
\]

This differs from the scalar zero-frequency bridge in document 1013, where

\[
s(0)^6=e^{-24\ell}.
\]

The difference is physical rather than contradictory:

- document 1013 used one scalar channel at \(\omega=0\);
- the present result uses the reciprocal normal/tangent pair at \(\omega=1\).

Frequency and channel pairing both matter.

## 5. What this closes

Closed exactly at the checkpoint:

- the actual silver scales have been inserted;
- a Real overlap exists for every \(\ell\ge0\);
- its sign is fixed negative by continuity from the graded lossless point;
- strict loss moves it into the Gram-disk interior;
- the environment rank and locking suppression are explicit.

Still open:

- whether the same branch remains admissible over a finite frequency band;
- whether \(s_*(\omega)\) can be chosen analytically;
- whether the associated two complement directions are the established $A_2$ ports;
- whether a microscopic Furey/Higgs boundary interaction generates common \(\ell\);
- whether the exceptional cubic coefficient follows this signed overlap.

## 6. Stop-everything and falsification tests

**Band trigger:** extend \(s_*=-e^{-2\ell}\) or its analytic continuation to a real admissible overlap over the full protected band.

**Grading trigger:** derive the lossless \(s=-1\) endpoint directly from the Furey product grading or sideband reflection on environment states.

**Port trigger:** identify the two strict-loss Gram-complement directions with the normal/tangent $A_2$ outgoing ports.

**Checkpoint falsifier:** any corrected physical transfer convention moves \(s_*\) outside the Gram disk at \(\omega=1\).

**Sign falsifier:** the microscopic Real structure requires continuation from \(s=+1\) rather than the observed opposite-phase endpoint \(s=-1\).

**Gap trigger:** an independently calculated phase gap follows \(e^{-12\ell}\) at the unit-frequency checkpoint.

**Analyticity warning:** exact pointwise positivity at \(\omega=1\) does not provide a causal frequency-global overlap.

## Verdict

| Question | Verdict |
|---|---|
| Do the physical silver transfers admit a Real joint overlap at \(\omega=1\)? | **Yes** |
| What is the distinguished overlap? | **\(-e^{-2\ell}\)** |
| Is it inside the Gram disk for every strict loss? | **Yes** |
| What is the strict-loss environment rank? | **Three** |
| What happens at zero loss? | **\(s=-1\), on the rank-reduced boundary** |
| What is the sixth-order suppression? | **\(e^{-12\ell}\)** |
| Is the full frequency band solved? | **No** |

## Position in the corpus

- [unequal-transfer Gram disk](1015_unequal_face_transfers_admit_a_joint_environment_exactly_inside_a_gram_overlap_disk_and_relative_phase_can_exclude_real_dephasing.md)
- [minimal pointwise joint environment](1014_a_minimal_three_state_environment_jointly_realizes_scalar_loss_and_partial_dephasing_pointwise_but_causal_globalization_remains_open.md)
- [strict-loss/dephasing spectral bridge](1013_the_strict_loss_schur_defect_fixes_the_partial_dephasing_overlap_conditionally_but_does_not_identify_the_two_channels.md)
- [silver unit Cayley checkpoint](../0900-0999/960_the_silver_ratios_are_exactly_the_unit_cayley_reactances_of_the_graded_pfaffian_face_generator.md)
