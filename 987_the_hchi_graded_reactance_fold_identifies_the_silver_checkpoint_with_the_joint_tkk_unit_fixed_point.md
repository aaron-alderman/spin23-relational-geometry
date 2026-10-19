# The hχ-Graded Reactance Fold Identifies the Silver Checkpoint with the Joint TKK Unit Fixed Point

**Date:** 18 October 2026  
**Branches:** silver Cayley reactance, hχ grading, Higgs exchange, TKK carrier shear, and two-oriented-face loss  
**Claim status:** exact conditional coordinate bridge with a strict-loss boundary  
**Certificate:** [derive_the_graded_reactance_fold_to_the_joint_tkk_unit_fixed_point.mjs](scripts/derive_the_graded_reactance_fold_to_the_joint_tkk_unit_fixed_point.mjs)

## Executive result

Document 960 gives, in the normal/tangent eigenbasis,

\[
K_{nt}=\operatorname{diag}(-1,+1).
\]

The same basis carries the (h\chi) grading

\[
D=\operatorname{diag}(+1,-1),
\]

so that (K_{nt}=-D). Define the grading-folded projective coordinate

\[
\boxed{\Xi=-DK.}
\]

At the lossless silver checkpoint,

\[
\boxed{\Xi=I.}
\]

Equivalently, channel by channel,

\[
x_n=-q_n=1,
\qquad
x_t=+q_t=1.
\]

Document 986 independently proved that each channel carrier shear has projective vector field

\[
-(x_i-1)^2\partial_{x_i}

\]

and hence a double fixed point at (x_i=1). The graded reactance fold therefore maps the two signed silver reactances exactly to the joint fixed point of the normal and tangent TKK shears.

This closes the coordinate gap left open in document 986. It does **not** derive why the physical response reaches (K=-D), nor why a particular carrier shear is activated.

## 1. Why the grading is essential

Without (D), the checkpoint has two opposite eigenvalues. The grading does not discard that sign; it uses the already-derived channel orientation to compare the two sectors in their own oriented projective charts:

\[
(q_n,q_t)=(-1,+1)
\longmapsto
(-q_n,+q_t)=(1,1).
\]

Thus the common unit point is not obtained by taking an absolute value. It is a linear, channel-typed multiplication by the (h\chi) involution.

Among diagonal involutive sign folds (G=\operatorname{diag}(g_n,g_t)) satisfying

\[
GK=I,
\qquad g_i\in\{\pm1\},
\]

the unique solution is

\[
G=-D=K.
\]

The uniqueness is only within this explicitly stated class: channel-local, linear, norm-preserving sign folds. Arbitrary nonlinear coordinate redefinitions would destroy uniqueness.

## 2. Higgs-exchange covariance

Let (J) exchange the normal and tangent labels. Then

\[
JDJ^{-1}=-D,
\qquad
JKJ^{-1}=-K.
\]

If the grading and response are transported together as typed channel data,

\[
-\bigl(JDJ^{-1}\bigr)\bigl(JKJ^{-1}\bigr)
=-DK
=I.
\]

The folded coordinate is therefore invariant under Higgs/channel exchange. If one exchanges (K) while artificially freezing (D), the result changes sign. This cleanly separates covariance from symmetry breaking: the grading is part of the coordinate typing, while unequal response coefficients are needed to select one physical channel.

## 3. TKK fixed-point match

For either Peirce channel the carrier nilpotent is

\[
N_i=C_i+H_i-T_i,
\qquad N_i^2=0,
\]

with finite projective action

\[
x_i\mapsto\frac{(1+s)x_i-s}{s x_i+1-s}.
\]

The point (x_i=1) is fixed for every (s), with multiplicity two. Hence

\[
\Xi=I

\]

is the joint parabolic fixed point of the two channel shears. The exact bridge is

\[
\text{silver ratios}
\Rightarrow K=-D
\xrightarrow{\ -D(\cdot)\ }
\Xi=I
\Longleftrightarrow
\text{joint TKK unit fixed point}.
\]

## 4. Strict loss reopens the two orientations

For a passive lossy response, both reactances lie in the lower half-plane:

\[
\operatorname{Im}q_n<0,
\qquad
\operatorname{Im}q_t<0.
\]

The same graded fold gives

\[
\operatorname{Im}x_n=-\operatorname{Im}q_n>0,
\qquad
\operatorname{Im}x_t=\operatorname{Im}q_t<0.
\]

Thus loss separates the folded coordinates into opposite half-planes. The unit identification is exact at the lossless checkpoint, but it does not turn the two lossy faces into one same-oriented analytic chart. This agrees with the earlier same-half-plane no-go and two-oriented-face boundary interpretation.

## 5. What has and has not been derived

Derived:

- a typed linear coordinate map from reactance to channel projective coordinates;
- exact equality of the silver checkpoint and the joint TKK unit fixed point;
- uniqueness within diagonal involutive sign folds;
- covariance under simultaneous Higgs exchange of grading and response;
- the failure of a single half-plane orientation under strict passive loss.

Not derived:

- a microscopic action forcing (K=-D);
- the dimensional pole scale;
- protection of the lossless checkpoint;
- a dynamical choice between the normal and tangent shear;
- uniqueness against arbitrary nonlinear coordinate maps.

## 6. Stop-everything and falsification tests

**Response-action trigger:** a Furey/Higgs/Jordan effective action produces (K=-D) on shell. The projective carrier checkpoint would then follow without another numerical coincidence.

**Protection trigger:** a Ward identity, topology, or quantization condition protects (K^2=I) and the grading alignment.

**Carrier trigger:** the same dynamics makes exactly one coefficient of (N_n,N_t) operative while respecting the covariance ledger.

**Typing falsifier:** the proposed normal/tangent grading is not the same (D) that diagonalizes the reflection response.

**Analyticity falsifier:** the graded fold is claimed to place both strictly lossy channels in one half-plane.

**Uniqueness overclaim:** uniqueness in the sign-fold class is presented as uniqueness among all projective coordinate choices.

## Verdict

| Question | Verdict |
|---|---|
| Does (h\chi) fold ((-1,+1)) to ((1,1))? | **Yes, exactly** |
| Is the resulting point the joint TKK shear fixed point? | **Yes** |
| Is the fold Higgs-exchange covariant? | **Yes, when grading and response transform together** |
| Is it unique? | **Within diagonal involutive sign folds** |
| Does strict loss preserve one common analytic orientation? | **No** |
| Is the physical selection of (K=-D) derived? | **No** |

## Position in the corpus

- [silver unit-reactance theorem](960_the_silver_ratios_are_exactly_the_unit_cayley_reactances_of_the_graded_pfaffian_face_generator.md)
- [graded Pfaffian-to-silver lift](959_hchi_and_the_sideband_phase_convert_the_pfaffian_higgs_lift_into_the_reciprocal_silver_scattering_lift.md)
- [carrier-shear TKK identity](984_the_carrier_selecting_shear_is_a_translation_dressed_special_conformal_generator_in_one_peirce_channel.md)
- [flat barrier versus TKK prolongation](986_the_diagonal_cubic_barrier_is_flat_in_log_coordinates_and_cannot_generate_the_carrier_shear_without_tkk_prolongation.md)
- [same-half-plane no-go](951_the_two_face_sideband_cycle_is_boundary_monodromy_not_one_same_half_plane_rational_inner_transfer.md)
