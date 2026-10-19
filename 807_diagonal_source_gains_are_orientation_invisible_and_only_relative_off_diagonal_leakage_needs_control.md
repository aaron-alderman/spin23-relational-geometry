# Diagonal Source Gains Are Orientation-Invisible; Only Relative Off-Diagonal Leakage Needs Control

## Claim status

Exact direct sign criterion, exact invariance under arbitrary positive raywise gains, and sufficient leakage-only bounds. This supersedes the global condition number as the primary test for a concrete source map.

## 1. Why the previous polar bound was too severe

The global polar certificate required

\[
\kappa(A)<1.04285
\]

when its unitary factor was ideal. That bound controls every vector in the ambient space by one common scale. The observable does not require that. It normalizes each of the four source images separately.

Let \(P_f=|v_f\rangle\langle v_f|\) be the four source rays and let

\[
a_f=A v_f\ne0.
\]

The normalized output projector is

\[
Q_f=\frac{|a_f\rangle\langle a_f|}{\langle a_f,a_f\rangle}.
\]

Multiplying any column \(a_f\) by an arbitrary nonzero scalar leaves \(Q_f\) unchanged. Therefore a large hierarchy of source gains is not itself an orientation error.

## 2. Exact direct quadratic certificate

For channel sign \(\chi_f\in\{+1,-1\}\) and flux grading \(\Gamma_R\), the required condition is simply

\[
\boxed{
q_f:=\chi_f\,v_f^\dagger A^\dagger\Gamma_R A v_f>0
\quad\text{for every }f.
}
\]

The normalized signed expectation is

\[
\frac{q_f}{v_f^\dagger A^\dagger A v_f},
\]

whose denominator is positive. It cannot alter the sign. Thus a proposed intertwiner should be tested by these four quadratic inequalities before any global norm estimate is used.

In output-Gram language, define

\[
X_f=A P_f A^\dagger\succeq0.
\]

Then the test becomes

\[
\operatorname{Tr}(\chi_f\Gamma_R X_f)>0.
\]

These are linear half-space constraints on positive-semidefinite Gram variables. Rank one, common-map compatibility, and any Furey incidence relations are additional constraints. Consequently the sign portion of a candidate-map search admits a semidefinite formulation even though solving directly for \(A\) is quadratic and nonconvex.

## 3. Arbitrary diagonal gain is exactly invisible

Suppose an ideal map sends \(v_f\) to \(u_f\), and a positive factor acts diagonally on these rays:

\[
A v_f=d_f u_f,
\qquad d_f>0.
\]

Then

\[
Q_f=|u_f\rangle\langle u_f|
\]

for every positive choice of the \(d_f\). The condition number

\[
\frac{\max_f d_f}{\min_f d_f}
\]

may be arbitrarily large without changing a single orientation score.

The executable example uses gains

\[
(1000,3,0.02,17),
\]

whose condition number is \(50{,}000\), while all four normalized signed scores remain exactly \(+1\). This directly proves that the earlier \(1.04285\) limit is a uniform ambient-space safeguard, not a physically necessary gain bound.

## 4. Relative off-diagonal leakage bound

Choose the irrelevant phase of each output so that

\[
a_f=d_f u_f+e_f,
\qquad d_f>0,
\qquad e_f\perp u_f.
\]

Define the relative leakage

\[
\rho_f=\frac{\|e_f\|}{d_f}.
\]

If the ideal signed margin is

\[
\delta_f=\chi_f\langle u_f,\Gamma_Ru_f\rangle>0,
\]

then \(\|\Gamma_R\|=1\) gives

\[
\frac{\chi_f\langle a_f,\Gamma_Ra_f\rangle}{d_f^2}
\ge
\delta_f-2\rho_f-\rho_f^2.
\]

Hence every sign is certainly preserved when

\[
\rho_f<\sqrt{1+\delta_f}-1.
\]

Using the weakest orbit-wide margin

\[
\delta_{\min}=0.0838939048,
\]

gives the uniform sufficient threshold

\[
\boxed{
\rho_f<0.041102\ldots
\quad\text{for all }f.
}
\]

Because \(\Gamma_R^2=I\) and \(e_f\perp u_f\), the cross term can be sharpened using

\[
\|(I-u_fu_f^\dagger)\Gamma_Ru_f\|
=\sqrt{1-\delta_f^2}.
\]

This yields the slightly better sufficient root

\[
\rho_f<
\sqrt{1+\delta_f-\delta_f^2}
-\sqrt{1-\delta_f^2}.
\]

The direct quadratic test remains stronger than either worst-case estimate.

## 5. Revised hierarchy of tests

For any candidate Furey/source intertwiner, use the following order:

1. **Direct ray test:** evaluate the four \(q_f\). This is exact.
2. **Gram/SDP test:** impose \(X_f\succeq0\) and the four linear signed-trace constraints when searching over admissible outputs.
3. **Relative leakage test:** use \(\rho_f\) when the map is known approximately by columns.
4. **Global polar test:** use the condition-number bound only when no source-resolved information is available.

This changes the search target. The desired microscopic construction need not be close to an isometry. It must map each source ray into the correct open flux cone.

## 6. Stop-everything tests

- **Direct success:** all four quadratic scores are nonzero and have the required sign.
- **Boundary event:** one score vanishes; the corresponding source lies exactly on the flux-null cone.
- **Orientation failure:** one or more scores have the wrong sign.
- **Gain rescue:** a map fails the global condition-number test but passes every direct ray test.
- **Incidence obstruction:** the Furey algebraic constraints force at least one output Gram matrix into the wrong cone.
- **Rank obstruction:** some \(A v_f=0\), so its normalized output ray is undefined.

## 7. Executable certificate

    node scripts/derive_restricted_ray_and_direct_quadratic_orientation_tests_for_nonunitary_source_maps.mjs

The certificate verifies exact gain invariance at condition number \(50{,}000\), checks a mixed high-anisotropy example directly, and derives the leakage thresholds.

## Companion documents

- [Global polar sufficient bound](806_a_polar_decomposition_gives_a_joint_condition_number_and_unitary_error_budget_for_nonunitary_source_map_orientation_stability.md)
- [Coherent unitary orientation stability](805_coherent_unitary_source_mixing_preserves_the_orientation_below_an_orbit_wide_operator_norm_threshold_with_a_sharp_rotation_boundary.md)
- [Exact positive-weight orientation index](803_positive_channel_weights_cancel_from_a_normalized_orientation_index_leaving_an_exact_plus_or_minus_one_flux_bit.md)
- [Orbit-wide bias-square theorem](799_the_handle_by_side_bias_square_survives_all_18_selector_backgrounds_and_globally_labels_the_discrete_eigenbundle.md)
