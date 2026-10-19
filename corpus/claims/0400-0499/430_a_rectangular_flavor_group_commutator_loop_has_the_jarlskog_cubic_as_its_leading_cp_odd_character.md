# A Rectangular Flavor Group-Commutator Loop Has the Jarlskog Cubic as Its Leading CP-Odd Character

**Date:** 17 October 2026  
**Branches:** B03, B06, B08, B10, B11 and B14  
**Claim status:** exact small-loop algebraic theorem with numerical certificate; physical connection realization remains open

## 1. From an algebraic exponential to an actual loop

The previous construction used \(e^{\epsilon[H_u,H_d]}\). A closer Wilson-loop analogue is the group commutator of the two unitary flows:

\[
W(t)
=e^{itH_u}e^{itH_d}e^{-itH_u}e^{-itH_d}.
\]

This is the holonomy of a small rectangular loop for a constant non-Abelian connection whose two components are \(H_u\) and \(H_d\), up to the conventional factors of \(i\) and loop orientation.

Define

\[
C=[H_u,H_d].
\]

## 2. Leading loop logarithm

The Baker–Campbell–Hausdorff expansion gives

\[
\log W(t)=-t^2C+O(t^3).
\]

The trace of \(C\) and of every single nested commutator vanishes. Lower-order trace contributions are CP even. The first CP-odd scalar built from the pair is the degree-six commutator cubic.

Expanding the loop character gives

\[
\boxed{
\operatorname{ImTr}W(t)
=-\frac{t^6}{6}
\operatorname{ImTr}[H_u,H_d]^3
+O(t^7).
}
\]

Reversing the loop orientation replaces \(W\) by \(W^{-1}\) and reverses the imaginary trace.

## 3. Why the order is six

Each infinitesimal plaquette commutator begins at order \(t^2\). The leading CP-odd trace is cubic in that commutator, so it begins at

\[
(t^2)^3=t^6.
\]

This mirrors the six Yukawa/mass-squared factors entering the three-generation Jarlskog commutator invariant. It also explains why a linear or quadratic Berry-response analogy cannot capture the same invariant without further contractions.

## 4. Transformation tests

### Flavor-basis covariance

Under

\[
H_u\mapsto SH_uS^\dagger,
\qquad
H_d\mapsto SH_dS^\dagger,
\]

the loop transforms by conjugation:

\[
W(t)\mapsto SW(t)S^\dagger.
\]

Its trace character is invariant.

### CP

Coefficient conjugation gives

\[
W(t)\mapsto\overline{W(-t)}
\]

with the precise sign convention depending on how the antiunitary acts on the path orientation. For the fixed convention in the certificate, the CP-conjugate flavor pair reverses \(\operatorname{ImTr}W\).

### CP-real case

For a real mixing frame the loop character is real, and

\[
\operatorname{ImTr}W(t)=0.
\]

## 5. Determinant remains blind

Every factor in the group commutator has a determinant that cancels its inverse partner:

\[
\det W(t)=1.
\]

Thus the actual rectangular loop confirms the earlier conclusion:

\[
\boxed{
\text{the CP data are in a non-Abelian trace character, not the determinant line.}
}
\]

An ordinary top-form holonomy sees only the product of eigenphases and misses their traceless distribution.

## 6. Numerical witness

For the certified three-generation CKM-type pair,

\[
\operatorname{ImTr}[H_u,H_d]^3
\approx2.704725\times10^{-5}.
\]

The ratios

\[
\frac{\operatorname{ImTr}W(t)}
{t^6\operatorname{ImTr}[H_u,H_d]^3}
\]

for decreasing \(t\) are approximately

\[
-0.16649,quad-0.16655,quad-0.16670,quad-0.16684,
\]

converging to

\[
-\frac16.
\]

The same certificate verifies CP sign reversal and exact vanishing for a CP-real mixing frame.

## 7. What would make this physical

The loop becomes a physical holonomy only if the programme derives a parameter space and connection for which:

- the two connection components reduce to the two flavor Hermitian spurions, or controlled functions of them;
- the rectangular path is defined by physical deformations rather than formal matrix flows;
- the trace character is invariant under all field-redefinition redundancies;
- its normalization and scale are fixed;
- it enters an observable or the exceptional/Furey sewing law.

Candidate parameter directions include two Higgs backgrounds, independent flavor spurion sources, or a two-dimensional surface in coupling/response space. None has yet been uniquely selected.

## 8. Relation to Jordan and Furey structures

The loop lies in the flavor-unitary sector, whereas the local face response lies in a real Jordan cone. They can coexist if the flavor transport acts in the commutant of the face Jordan action.

The Furey linking algebra already supplies left/right matrix actions and commutators. A concrete next test is whether the flavor group commutator can be realized as an inner automorphism of the completed TRO while preserving its puncture-neutral Standard-Model stabilizer.

On the exceptional side, a flag rather than a determinant line is required to retain the trace-character data.

## 9. Branch decision

- **Closed:** the actual rectangular group commutator has the Jarlskog cubic as its leading CP-odd character.
- **Closed:** the leading coefficient is \(-1/6\) for the stated orientation.
- **Closed:** the character passes basis, CP and CP-real tests.
- **Closed:** the loop determinant is identically one.
- **Open:** derivation of the two matrix flows as components of a physical response or sewing connection.
- **Open:** realization in the Furey TRO and exceptional flag representations.

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** derive this loop from a source-defined two-parameter exceptional/Furey/Higgs connection and connect its character to an observable without an adjustable phase convention.

**Coefficient falsifier:** the small-loop ratio fails to approach \(-1/6\) for the declared orientation.

**CP falsifier:** the loop character does not reverse under the correctly defined CP-conjugate path and flavor data.

**Determinant falsifier:** claim nontrivial determinant holonomy for a group commutator whose factor determinants cancel exactly.

**Physicality warning:** a formal group commutator of spurions is not yet an experimentally traversable parameter loop.

## 11. Certificate

The [rectangular flavor-loop certificate](../../../verification/verify/verify_actual_group_commutator_loop_has_jarlskog_leading_character.mjs) evaluates the loop at decreasing sizes, verifies convergence to the \(-1/6\) coefficient, tests CP reversal and confirms vanishing for a CP-real representative.

## Companion documents

- [Commutator-exponential CP character](429_the_commutator_exponential_has_the_jarlskog_cubic_as_its_leading_cp_odd_character_but_trivial_determinant.md)
- [Two-parameter curvature versus CP](428_two_parameter_frame_curvature_is_real_geometry_but_is_not_automatically_a_jarlskog_cp_invariant.md)
- [Mixed-spurion frame connection](427_the_mixed_spurion_flow_has_an_exact_frame_connection_but_one_parameter_running_has_no_intrinsic_curvature.md)
- [Furey ternary stabilizer](417_the_puncture_neutral_ternary_stabilizer_inside_so10_is_exactly_the_standard_model_lie_algebra.md)
