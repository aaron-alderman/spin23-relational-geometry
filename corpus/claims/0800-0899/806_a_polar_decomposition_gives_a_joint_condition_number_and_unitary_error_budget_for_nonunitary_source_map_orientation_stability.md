# A Polar Decomposition Gives a Joint Condition-Number and Unitary-Error Budget for Nonunitary Source-Map Orientation Stability

## Claim status

Exact sufficient uniform bound for invertible source maps; not claimed to be the sharp joint anisotropy/rotation threshold.

## 1. General invertible source map

Let the coherent source map be

\[
A=WU,
\]

with polar factors

\[
W^\dagger W=I,
\qquad
U>0.
\]

The unitary factor rotates the source frame. The positive factor introduces anisotropic gain and nonorthogonality before each output vector is normalized.

Overall positive scale does not affect a normalized rank-one support. We may therefore compare \(cA\) with the identity for an optimized scalar \(c>0\).

## 2. Normalized-vector lemma

Suppose

\[
\|cA-I\|_{\rm op}\le\epsilon<1.
\]

For a unit vector \(v\), let

\[
w=\frac{Av}{\|Av\|}.
\]

Writing \(y=cAv\), one has

\[
\|y-v\|\le\epsilon
\]

and

\[
\left\|\frac{y}{\|y\|}-y\right\|
=|1-\|y\||
\le\epsilon.
\]

Therefore

\[
\|w-v\|\le2\epsilon.
\]

For the unit-norm flux grading,

\[
|\langle w,\Gamma_Rw\rangle
-\langle v,\Gamma_Rv\rangle|
\le4\epsilon.
\]

All orbit-wide orientation signs are consequently preserved if

\[
\epsilon<\frac{\delta_{\min}}4.
\]

With

\[
\delta_{\min}\approx0.0838939048,
\]

the sufficient scaled-map threshold is

\[
\epsilon<0.0209734762.
\]

## 3. Polar-factor bound

Let

\[
\kappa=\frac{s_{\max}(U)}{s_{\min}(U)}.
\]

Choose

\[
c=\frac2{s_{\max}+s_{\min}}.
\]

Then

\[
\|cU-I\|_{\rm op}
=r
=\frac{\kappa-1}{\kappa+1},
\]

and

\[
\|cU\|_{\rm op}=1+r.
\]

If

\[
\eta=\|W-I\|_{\rm op},
\]

then

\[
\|cWU-I\|_{\rm op}
\le r+(1+r)\eta.
\]

The joint sufficient condition is therefore

\[
\boxed{
\frac{\kappa-1}{\kappa+1}
+
\frac{2\kappa}{\kappa+1}\eta
<
\frac{\delta_{\min}}4.
}
\]

## 4. Numerical orbit-wide budgets

With no unitary rotation error, the condition permits

\[
\kappa<1.042845573.
\]

Representative remaining unitary budgets are:

| \(\kappa\) | maximum certified \(\eta\) |
|---:|---:|
| \(1.000\) | \(0.0209735\) |
| \(1.005\) | \(0.0184337\) |
| \(1.010\) | \(0.0159192\) |
| \(1.020\) | \(0.0109639\) |
| \(1.040\) | \(0.00133937\) |

Anisotropic gain rapidly consumes the permitted coherent rotation budget.

## 5. Comparison with the unitary and stochastic results

Three error models are now separated:

| model | control parameter | certified sign condition |
|---|---|---|
| unitary coherent rotation | \(\|W-I\|_{\rm op}\) | \(<0.04194695\) |
| nonunitary coherent map | \(r+(1+r)\eta\) | \(<0.02097348\) |
| dephased stochastic leakage | wrong-side flux fraction \(\epsilon_s\) | \(<1/2\) |

The nonunitary bound is more conservative because it controls normalization and expectation through a general perturbation inequality.

## 6. What remains open

The condition is sufficient, not necessary. A positive factor can have a larger global condition number while acting nearly scalarly on the four relevant source vectors.

Sharper analysis could use:

- restricted singular values on the source subspace;
- the actual matrix elements of \(U\) in the bias-square frame;
- a generalized Davis–Kahan bound;
- direct semidefinite optimization of the minimum flux expectation.

## 7. Stop-everything tests

- **Certified map:** a derived source intertwiner satisfies the joint polar bound.
- **Restricted rescue:** the global condition number fails but all four normalized images retain the correct flux signs.
- **Gain falsifier:** source normalization is performed before, rather than after, the nonunitary map.
- **Rank falsifier:** \(A\) is singular or sends a source vector to zero.
- **Sharpness warning:** failure of this sufficient inequality is not proof of orientation failure.

## 8. Executable certificate

    node verification/derive/derive_polar_condition_number_and_unitary_error_budget_for_nonunitary_source_maps.mjs

The certificate derives the numerical budgets and verifies direct two-dimensional examples inside the certified region.

## Companion documents

- [Coherent unitary orientation bound](805_coherent_unitary_source_mixing_preserves_the_orientation_below_an_orbit_wide_operator_norm_threshold_with_a_sharp_rotation_boundary.md)
- [Stochastic mixing error budget](804_dephased_source_mixing_changes_the_orientation_index_by_exactly_twice_the_wrong_side_flux_fraction_with_a_sharp_50_percent_sign_threshold.md)
- [Orbit-wide bias-square theorem](../0700-0799/799_the_handle_by_side_bias_square_survives_all_18_selector_backgrounds_and_globally_labels_the_discrete_eigenbundle.md)
