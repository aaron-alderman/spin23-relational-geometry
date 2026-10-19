# The Existing Jordan and Rate Actions Do Not Select \(\operatorname{arsinh}(1)\), but Causal Gram Extremality Does Conditionally

**Date:** 18 October 2026  
**Branches:** loss rapidity, positive-rate dilation, Jordan barrier, constrained silver action, Gram extremality, and causal selection  
**Claim status:** exact selection audit and conditional variational principle; microscopic dynamics remains open  
**Certificate:** [test_whether_existing_actions_select_the_unique_causal_silver_loss.mjs](../../../verification/test/test_whether_existing_actions_select_the_unique_causal_silver_loss.mjs)

## Executive result

Document 1018 found a unique loss

\[
\ell_* = \log(1+\sqrt2)=\operatorname{arsinh}(1)
\]

at which the complex Gram-centre overlap becomes a one-chart causal Schur function. The immediate question is whether this value was already stationary in any action constructed earlier in the programme.

The answer is **no**.

- The positive-rate dilation parametrizes \(\ell\) but supplies no potential for it.
- The diagonal Jordan cubic barrier is flat in logarithmic coordinates and therefore does not prefer one constant rapidity.
- The constrained silver response action selects the lossless Cayley-reactance amplitude \(k=1\), not the dissipative rapidity \(\ell\).
- Natural uncoupled positive quadratic rate costs are minimized at \(\ell=0\), not at \(\ell_*\).
- The Lorentzian rate invariant is independent of \(\ell\), so it is exactly flat along this orbit.

There is nevertheless a precise conditional selector. If the physical environment is required both

1. to choose the Gram-disk centre, hence maximize residual volume and make the two residual port directions orthogonal; and
2. to globalize that centre as a single upper-half-plane causal transfer,

then \(\ell_*\) is forced uniquely. This is a consistency/analyticity selection principle, not yet a microscopic equation of motion.

## 1. The tuned point in positive-rate language

For either response channel,

\[
\kappa_{\rm obs,j}=\gamma_j\cosh\ell,
\qquad
\kappa_{\rm env,j}=\gamma_j\sinh\ell.
\]

At \(\ell_*\),

\[
\cosh\ell_*=\sqrt2,
\qquad
\sinh\ell_*=1,
\]

and therefore

\[
\boxed{
\frac{\kappa_{\rm obs,j}}{\kappa_{\rm env,j}}=\sqrt2
}
\]

in both channels. More importantly, the cross-channel seam is

\[
\boxed{
\kappa_{\rm obs,n}-\kappa_{\rm env,n}
=
\kappa_{\rm obs,t}+\kappa_{\rm env,t}
=1.}
\]

The first expression is the normal zero scale \(a_n\); the second is the tangent pole scale \(b_t\). Thus the causal cancellation has a direct rate interpretation: the difference rate in the normal channel equals the sum rate in the tangent channel.

## 2. Audit of the existing candidate selectors

### 2.1 Positive-rate dilation

Document 948 proves that every \(\ell\geq0\) gives nonnegative observed and environment rates. It is a realization theorem, not a variational law. Nothing in the dilation makes one point on the hyperbola preferred.

### 2.2 Diagonal Jordan barrier

The rank-three barrier metric is Euclidean in logarithmic coordinates. A constant displacement in a log coordinate is therefore not assigned a preferred origin by the Levi-Civita geometry. The barrier can represent the positive loss metric, but it supplies no potential whose minimum is \(\ell_*\).

### 2.3 Constrained silver response action

Documents 988–989 select

\[
K(k)=k(-D),\qquad k=1,
\]

conditional on involutive protection and exact \(A_2\) monodromy. This fixes the lossless reactance normalization. The attenuation coordinate \(\ell\) is a distinct deformation parameter, so that action cannot be reused as its derivation.

### 2.4 Natural rate scalars

Summing the simplest positive quadratic rate norm over the reciprocal channels gives

\[
E_2(\ell)
=\sum_j(\kappa_{\rm obs,j}^2+\kappa_{\rm env,j}^2)
=6\cosh(2\ell).
\]

It is strictly increasing for \(\ell>0\), hence minimized at the lossless boundary. The environment-only cost

\[
E_{\rm env}(\ell)=6\sinh^2\ell
\]

has the same verdict.

Conversely, the natural indefinite invariant

\[
\kappa_{\rm obs,j}^2-\kappa_{\rm env,j}^2=\gamma_j^2
\]

is independent of \(\ell\). Positive uncoupled costs choose zero loss; the hyperbolic invariant chooses nothing. Neither produces \(\operatorname{arsinh}(1)\).

## 3. The exact causal-defect functional

The analytic obstruction itself defines the nonnegative mismatch

\[
\mathcal C(\ell)
=
\left(a_n-b_t\right)^2
=
\left(\gamma_ne^{-\ell}-\gamma_te^{\ell}\right)^2.
\]

Since

\[
\frac{d}{d\ell}(a_n-b_t)=-(a_n+b_t)<0,
\]

the only stationary zero on \(\ell\geq0\) is

\[
a_n=b_t
\quad\Longleftrightarrow\quad
\ell=\ell_*.
\]

At the minimum, \(a_n=b_t=1\), and

\[
\mathcal C''(\ell_*)=8.
\]

Equivalently, the logarithmic mismatch is exactly

\[
\log\frac{a_n}{b_t}=2(\ell_*-\ell),
\]

whose square is a globally convex quadratic in the rapidity.

This is a legitimate effective penalty if one has an independent reason to minimize analytic pole-zero mismatch. It is not a microscopic derivation merely because it has the desired minimum: the physical origin and coefficient of this term still have to be produced.

## 4. A non-tautological conditional principle

The stronger reading does not begin by inserting \(\mathcal C\) into an action. It begins with two independently meaningful requirements:

- **Gram extremality:** select the centre \(s_c=\bar f_tf_n\), which uniquely maximizes the Gram determinant and makes the residual environment directions orthogonal;
- **one-chart causality:** demand that this canonical boundary function extend analytically to the same upper half-plane as a Schur transfer.

The first requirement fixes the overlap function. The second tests it. Document 1018 proves that the test passes exactly when \(a_n=b_t\), hence exactly when \(\ell=\ell_*\).

Therefore

\[
\boxed{
\text{Gram-volume maximization}
+
\text{one-chart causality}
\Longrightarrow
\ell=\operatorname{arsinh}(1).}
\]

This is stronger than observing another silver-number coincidence. It is still conditional because nature has not yet been shown to impose Gram-centre selection on this environment sector.

## 5. Research consequences

The search for a generic local potential of \(\ell\) should be deprioritized unless it descends from the analytic matching condition. The higher-value routes are now:

1. derive Gram-centre selection from maximum entropy, maximum determinant, orthogonal minimal dilation, or an environment variational principle;
2. lift the scalar pole-zero cancellation to the full typed response/dilation matrix;
3. test whether the equality of a normal difference rate and tangent sum rate follows from a Furey/Higgs mediator or a Ward identity;
4. determine whether renormalization preserves the unit seam or makes it a single-scale crossing;
5. calculate what observable scale and linewidth would correspond to \(\ell_*\).

## 6. Stop-everything and falsification tests

**Environmental-principle trigger:** tracing out a specified minimal environment yields the Gram-centre overlap by an entropy, determinant, orthogonality, or least-action principle.

**Matrix-lift trigger:** the unit pole-zero seam removes the relevant upper-half-plane obstruction in a complete typed block, not only one scalar overlap.

**Microscopic-rate trigger:** a Furey/Higgs/Jordan kernel enforces

\[
\kappa_{\rm obs,n}-\kappa_{\rm env,n}
=
\kappa_{\rm obs,t}+\kappa_{\rm env,t}.
\]

**Existing-action falsifier:** an earlier claimed action is said to select \(\ell_*\) even though its stationary equation contains only \(k\), is flat in \(\ell\), or minimizes at \(\ell=0\).

**Tautology warning:** writing \((a_n-b_t)^2\) after discovering the cancellation records the selection condition; it does not explain why that defect is dynamically penalized.

**Conditionality warning:** causality selects \(\ell_*\) only after the Gram-centre choice has been justified physically.

## Verdict

| Question | Verdict |
|---|---|
| Does the positive-rate parametrization select \(\ell_*\)? | **No** |
| Does the diagonal Jordan barrier select it? | **No** |
| Does the constrained \(k=1\) silver action select it? | **No; it fixes another variable** |
| Do simple positive rate costs select it? | **No; they select \(\ell=0\)** |
| Is there an exact defect with unique minimum at \(\ell_*\)? | **Yes: \((a_n-b_t)^2\)** |
| Do Gram extremality and one-chart causality force it? | **Yes, conditionally** |
| Is a microscopic dynamical origin known? | **No** |

## Position in the corpus

- [positive-rate dilation](../0900-0999/948_each_lossy_response_face_has_a_fixed_six_port_rational_inner_dilation_with_two_positive_environment_rates.md)
- [Jordan barrier realization](../0900-0999/964_a_rank_three_jordan_cubic_barrier_generates_the_a2_face_loss_metric_subject_to_a_sharp_channel_inequality.md)
- [flat-barrier no-go](../0900-0999/986_the_diagonal_cubic_barrier_is_flat_in_log_coordinates_and_cannot_generate_the_carrier_shear_without_tkk_prolongation.md)
- [minimal constrained silver action](../0900-0999/988_the_minimal_silver_response_action_needs_both_involutive_protection_and_an_oriented_hchi_spurion.md)
- [Furey–Higgs normalization](../0900-0999/989_the_furey_higgs_product_grading_is_the_silver_reactance_direction_and_a2_monodromy_fixes_its_unit_amplitude.md)
- [unique causal silver loss](1018_the_unique_silver_loss_asinh1_cancels_the_two_chart_pole_and_turns_the_complex_gram_center_into_a_causal_schur_overlap.md)
