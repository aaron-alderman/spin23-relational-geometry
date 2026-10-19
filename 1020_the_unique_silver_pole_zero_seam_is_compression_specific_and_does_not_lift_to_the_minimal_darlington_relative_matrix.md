# The Unique Silver Pole–Zero Seam Is Compression-Specific and Does Not Lift to the Minimal Darlington Relative Matrix

**Date:** 18 October 2026  
**Branches:** minimal Darlington dilation, paraconjugate relative transfer, scalar compression, determinant obstruction, and full-matrix causal lift  
**Claim status:** exact no-go for the canonical minimal completion and all constant port gauges; nonminimal typed lifts remain open  
**Certificate:** [test_whether_the_unique_silver_scalar_seam_lifts_to_the_minimal_darlington_matrix.mjs](scripts/test_whether_the_unique_silver_scalar_seam_lifts_to_the_minimal_darlington_matrix.mjs)

## Executive result

At

\[
\ell_* = \operatorname{arsinh}(1),
\]

the scalar Gram-centre continuation

\[
s_c(z)=f_t^\sharp(z)f_n(z)
\]

loses its upper-half-plane pole because the normal zero and reflected tangent pole coincide:

\[
a_n=b_t=1.
\]

This cancellation does **not** lift to the complete canonical minimal Darlington matrices. If \(U_n,U_t\) are the two-port rational-inner completions of the normal and tangent squared-loss factors, then the natural relative transfer

\[
R(z)=U_t^\sharp(z)U_n(z)
\]

still has a double pole at \(z=i\). Its determinant is

\[
\boxed{
\det R(z)
=
\left(\frac{z+ib_t}{z-ib_t}\right)^2
\left(\frac{z-ib_n}{z+ib_n}\right)^2.}
\]

At the tuned loss \(b_t=1\), while \(b_n=(1+\sqrt2)^2\neq1\). Nothing cancels the determinant pole at \(z=i\).

The unique causal seam is therefore a property of the doubly compressed observed/reference subchannel, not of the whole minimal conservative completion.

## 1. Canonical minimal completion

For

\[
f_j(z)=\left(\frac{z-ia_j}{z+ib_j}\right)^2,
\]

document 950 constructs

\[
U_j(z)=\frac1{(z+ib_j)^2}
\begin{pmatrix}
(z-ia_j)^2&-k_j(z-id_j)\\
k_j(z+id_j)&(z+ia_j)^2
\end{pmatrix},
\]

where

\[
d_j^2=\frac{a_j^2+b_j^2}{2},
\qquad
k_j^2=2(b_j^2-a_j^2).
\]

It is two-port rational inner and has \(f_j\) as its observed entry.

With the fixed port metric \(J=\operatorname{diag}(1,-1)\), its analytic paraconjugate is

\[
U_j^\sharp(z)=J U_j(-z)^T J,
\]

which agrees with \(U_j(\omega)^*\) on the real-frequency boundary.

## 2. Determinant obstruction

The determinant of one completion is

\[
\det U_j(z)=\left(\frac{z-ib_j}{z+ib_j}\right)^2.
\]

Consequently,

\[
\det U_t^\sharp(z)
=
\left(\frac{z+ib_t}{z-ib_t}\right)^2,
\]

and multiplication by \(U_n\) gives the boxed formula above.

The scalar cancellation uses the zero of \(f_n\) at \(z=ia_n\). The determinant of the full normal completion instead vanishes at \(z=ib_n\). At the tuned point,

\[
ia_n=ib_t=i,
\qquad
ib_n=i(1+\sqrt2)^2.
\]

The scalar zero is therefore not a determinant zero of the complete normal inner matrix. This is the precise reason the cancellation fails to lift.

## 3. Compression hierarchy

Let

\[
P=|o\rangle\langle o|
\]

project onto the observed/reference port. Three objects must be distinguished:

\[
U_t^\sharp U_n,
\qquad
U_t^\sharp P U_n,
\qquad
\langle o|U_t^\sharp P U_n|o\rangle.
\]

At \(z=i\):

- the full relative matrix retains a double pole;
- the rank-one sewn block still retains a pole in its uncompressed input column;
- only the final observed-to-observed scalar equals \(f_t^\sharp f_n\) and cancels completely.

Thus the causal repair requires compression at both ends. Sharing a reference ray is not the same operation as identifying the complete tangent and normal defect-port spaces.

## 4. Port-gauge robustness

Frequency-independent unitary changes of input and output port bases multiply \(R\) on the left and right by constant invertible matrices. They can redistribute pole residues among entries, but they cannot remove the pole of \(\det R\).

Therefore the no-go covers:

- the canonical minimal Darlington completion;
- every constant unitary relabelling of its two ports;
- every claim that the scalar seam automatically globalizes the entire minimal relative matrix.

It does not cover frequency-dependent gauge transformations with compensating analytic factors, larger nonminimal realizations, or typed constructions in which the two channels do not share their whole environment port.

## 5. Meaning for the joint environment

The Gram-centre vectors can still be represented pointwise with orthogonal residual directions. They can also be spectrally factored channel by channel in a fixed environment basis. What fails is the stronger assertion that the complete tangent paraconjugate can be multiplied by the complete normal inner dilation to form one same-half-plane analytic relative transfer.

This sharpens the architecture:

\[
\text{common reference ray}
\quad\checkmark
\]

\[
\text{complete defect-port identification}
\quad\times\quad\text{in the canonical minimal lift}.
\]

The scalar seam should therefore be treated as a protected compressed observable, while the two residual environment directions remain separately typed.

## 6. Next viable lifts

The determinant obstruction redirects the branch toward three possibilities:

1. **typed partial sewing:** identify only the common reference ray and retain separate normal/tangent residual ports;
2. **nonminimal cancellation:** add an auxiliary inner channel carrying the compensating determinant zero;
3. **two-chart realization:** retain the reflected tangent sector as an oppositely oriented causal chart rather than forcing a same-chart full matrix.

Any successful proposal must state which of these categories it uses.

## 7. Stop-everything and falsification tests

**Typed-lift trigger:** a fixed-port rational-inner matrix realizes the common scalar seam while keeping the two residual directions distinct and carrying the required \(A_2\) action.

**Nonminimal trigger:** an added physical channel supplies the determinant zero at \(z=i\) without introducing an unstable pole or an untyped cancellation.

**Determinant falsifier:** a claimed full minimal lift has a determinant analytic in the upper half-plane despite the displayed uncancelled factor.

**Gauge falsifier:** a frequency-independent port rotation is claimed to remove a determinant pole.

**Scope warning:** this theorem does not exclude all larger, frequency-dependent, two-chart, or partially sewn realizations.

## Verdict

| Question | Verdict |
|---|---|
| Does the scalar Gram-centre seam cancel at \(\ell_*\)? | **Yes** |
| Does \(U_t^\sharp U_n\) become same-half-plane analytic? | **No** |
| Does insertion of the reference projector make the whole rank-one block analytic? | **No** |
| What becomes analytic? | **The doubly compressed observed scalar** |
| Can a constant port gauge repair the full matrix? | **No** |
| Are nonminimal or typed partial lifts excluded? | **No** |

## Position in the corpus

- [minimal Darlington completion](950_spectral_factorization_compresses_each_squared_loss_channel_to_two_ports_and_the_full_two_face_cycle_to_six.md)
- [two-chart full-cycle boundary](951_the_two_face_sideband_cycle_is_boundary_monodromy_not_one_same_half_plane_rational_inner_transfer.md)
- [unequal-transfer Gram disk](1015_unequal_face_transfers_admit_a_joint_environment_exactly_inside_a_gram_overlap_disk_and_relative_phase_can_exclude_real_dephasing.md)
- [unique scalar causal seam](1018_the_unique_silver_loss_asinh1_cancels_the_two_chart_pole_and_turns_the_complex_gram_center_into_a_causal_schur_overlap.md)
- [loss-selection audit](1019_the_existing_jordan_and_rate_actions_do_not_select_asinh1_but_causal_gram_extremality_does_conditionally.md)
