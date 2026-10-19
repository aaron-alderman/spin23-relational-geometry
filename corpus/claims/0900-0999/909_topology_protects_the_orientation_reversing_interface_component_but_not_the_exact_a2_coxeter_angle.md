# Topology Protects the Orientation-Reversing Interface Component but Not the Exact A2 Coxeter Angle

**Date:** 17 October 2026  
**Branches:** orthogonal defects, topological protection, $h\chi$ axis selection, and finite-order active monodromy  
**Claim status:** exact $O(2)$ component and deformation classification  
**Certificate:** [classify_which_part_of_the_real_interface_twist_is_topologically_protected.mjs](../../../verification/classify/classify_which_part_of_the_real_interface_twist_is_topologically_protected.mjs)

## Executive result

The local interface in document 908 has a genuine topological datum, but it is not enough to protect the exact $A_2$ cycle.

The orthogonal group has two connected components:

\[
\pi_0(O(2))\cong\mathbb Z_2,
\]

distinguished by determinant. Therefore the fact that the interface reverses relationship orientation, $\det D=-1$, is stable under continuous orthogonal deformation.

However every matrix

\[
T(\theta)=R(\theta)D
\]

is also orthogonal with determinant $-1$. The angle $\theta$ moves continuously within the same component. Topology protects **reflection versus rotation**, not the reflection axis.

For the mediator normal at angle $\alpha=\pi/3$, the product of the original and twisted Householder reflections has

\[
\operatorname{tr}C(\theta)
=2\cos\bigl(2(\theta-2\alpha)\bigr).
\]

At $\theta=0$ this is $-1$ and $C^3=I$. A generic arbitrarily small $\theta$ changes the trace and destroys exact order three while leaving $\det T(\theta)=-1$.

Thus topology can protect the existence of an orientation-reversing twist, but $h\chi$, a discrete defect symmetry, or integral $A_2$ lattice data must pin its axis.

## 1. The protected datum

The two components of $O(2)$ are

\[
SO(2),
\qquad
O(2)\setminus SO(2).
\]

No continuous path inside $O(2)$ changes the determinant. Consequently an interface known to remain orthogonal cannot lose its orientation reversal without leaving the conservative class or passing through a singular/nonorthogonal configuration.

This gives a legitimate $\mathbb Z_2$ defect label. It matches the programme's recurring distinction between relationship orientation and ordinary continuous phase.

## 2. The unprotected axis

The orientation-reversing component is itself continuous. Writing

\[
T(\theta)=R(\theta)D
\]

exhibits a path of reflections. The $+1$ and $-1$ eigendirections rotate with $\theta/2$.

Nothing in the determinant label distinguishes the quark/lepton axis selected by

\[
D=h\chi=\operatorname{diag}(1,-1)
\]

from a rotated mixture of the two neutral response coordinates.

This is physically important: an arbitrary continuous response renormalization that mixes the two channels can preserve flux and orientation reversal while moving the reflection axis.

## 3. Effect on the Coxeter product

Let

\[
n_+=(\cos\alpha,\sin\alpha),
\qquad
\alpha=\pi/3,
\]

and let $H(n)$ be the Householder reflection normal to $n$. The twisted normal is $T(\theta)n_+$, with angle $\theta-\alpha$. Hence

\[
C(\theta)=H(T(\theta)n_+)H(n_+)
\]

is a rotation whose trace is

\[
\operatorname{tr}C(\theta)
=2\cos\bigl(2(\theta-2\alpha)\bigr).
\]

At $\theta=0$,

\[
\operatorname{tr}C(0)=-1,
\qquad
C(0)^3=I.
\]

For a small deformation such as $\theta=0.11$ radians, the interface remains in the same topological component but the trace is no longer $-1$ and $C(\theta)^3\ne I$.

Finite order is therefore a metric/angular condition, not merely a component invariant.

## 4. What can pin the axis

There are three credible mechanisms:

1. **The $h\chi$ grading.** If the microscopic response algebra forbids mixing between its $\pm1$ eigenspaces, the axis is algebraically fixed.
2. **A discrete defect symmetry.** An involution acting separately on lepton and color response sectors may quantize the allowed transition functions to $\pm D$.
3. **Integral $A_2$ data.** Requiring the boundary map to preserve the selected integral incidence lattice may reduce the continuous reflection family to a finite dihedral normalizer.

The third is especially attractive because the active plane already carries an exact integral Coxeter matrix and the pulled-back $A_2$ metric. It should now be tested directly rather than assumed.

**Later result:** document 990 performs this test. The integral normalizer has twelve elements, and every orientation-reversing member is a square-one reflection. Exact lattice preservation therefore quantizes the face phase and forces unit reactance. The remaining gate is whether the physical boundary preserves that lattice exactly.

## 5. Consequence for the grand narrative

The “one twist” has two logically different parts:

\[
\underbrace{\det=-1}_{\text{topological component}}
\quad+
\underbrace{\text{specific }h\chi\text{ axis}}_{\text{algebraic/arithmetic selection}}.
\]

Topology may explain why the interface reverses relationship orientation. It does not by itself explain why the resulting rotation is exactly $120^\circ$.

This is a productive restriction. The exact order-three rule must be tied to the Standard-Model grading or lattice, not attributed to generic defect topology.

## 6. Stop-everything and falsification criteria

**Grading trigger:** prove that all admissible local counterterms commute with $h\chi$, preventing rotation of the interface eigenspaces.

**Arithmetic trigger:** compute the orthogonal normalizer of the integral active lattice and show that its orientation-reversing elements form the finite $A_2$ dihedral reflections.

**Defect-symmetry trigger:** derive a microscopic involution whose representation on the response pair is exactly $D$ up to overall sign.

**Topology falsifier:** claim that $\det=-1$ alone fixes the reflection axis or the $120^\circ$ product angle.

**Robustness warning:** claim exact finite order under arbitrary small orthogonal deformations of the boundary matching.

## 7. Verdict

| Question | Verdict |
|---|---|
| Is orientation reversal topologically stable inside $O(2)$? | **yes** |
| Is the reflection axis topologically fixed? | **no** |
| Does determinant parity protect $C^3=I$? | **no** |
| Can $h\chi$ or the integral $A_2$ lattice pin the axis? | **credible and now testable** |

## 8. Position in the corpus

- [local conservative interface](908_a_local_real_interface_supplies_the_antiunitary_sideband_twist_and_closes_the_boundary_monodromy_model.md)
- [$h\chi$ response grading](902_the_product_of_furey_handle_and_higgs_channel_gradings_is_exactly_the_missing_lepton_color_sign_and_conditionally_reopens_the_a2_route.md)
- [exact integral $A_2$ conjugator](../0800-0899/898_color_multiplicity_and_an_oriented_weak_sign_turn_the_paired_so10_mediator_reflections_into_the_exact_a2_coxeter_generator.md)
- [pulse-area protection no-go](../0800-0899/862_positive_quadratic_dynamics_does_not_protect_the_selector_pulse_areas_or_its_finite_order.md)
