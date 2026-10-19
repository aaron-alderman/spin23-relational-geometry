# Positive Quadratic Dynamics Does Not Protect the Selector Pulse Areas or Its Finite Order

**Date:** 17 October 2026  
**Branches:** bilocal dynamics, finite selector, Floquet control, holonomy, and stability  
**Claim status:** exact local rigidity and perturbative no-protection theorem for the constructed pulses  
**Certificate:** [classify_finite_order_protection_of_the_selector_pulse_areas.mjs](../../../verification/classify/classify_finite_order_protection_of_the_selector_pulse_areas.mjs)

## Executive result

The selector's positive quadratic Hamiltonians establish dynamical feasibility, not dynamical protection.

The exact pulses have active angles

\[
\theta_R=\frac{2\pi}{3},
\qquad
\theta_H=\pi,
\]

and satisfy

\[
R^3=I,\qquad H^2=I,\qquad \operatorname{ord}(HR)=6.
\]

The element

\[
Z=(HR)^2
\]

has order three and commutes with both generators, yielding the established order-18 group.

If either Hamiltonian is run for a slightly rescaled time \(t=1+\epsilon\), its quadratic form remains positive semidefinite for every \(t>0\), but the finite-order relations fail linearly in \(\epsilon\). Thus positivity, passivity and elliptic stability do not quantize the selector.

## 1. Exact timing conditions

For the \(R\) pulse,

\[
R(t)=e^{tK_R}.
\]

The active eigenphases are \(\pm 2\pi t/3\), so

\[
R(t)^3=I
\quad\Longleftrightarrow\quad
t\in\mathbb Z.
\]

For the handle pulse,

\[
H(t)=e^{tK_H},
\]

and the antisymmetric normal mode acquires phase \(e^{i\pi t}\). Therefore

\[
H(t)^2=I
\quad\Longleftrightarrow\quad
t\in\mathbb Z.
\]

In a sufficiently small neighbourhood of the nominal pulse, \(t=1\) is the unique solution for each relation.

## 2. First-order relation defects

At \(t=1+\epsilon\),

\[
R(t)^3=e^{3\epsilon K_R},
\qquad
H(t)^2=e^{2\epsilon K_H}.
\]

Therefore

\[
\|R(t)^3-I\|_F
=3\|K_R\|_F|\epsilon|+O(\epsilon^2),
\]

\[
\|H(t)^2-I\|_F
=2\|K_H\|_F|\epsilon|+O(\epsilon^2).
\]

The verified slopes in the current coordinates are

\[
3\|K_R\|_F
=3c\sqrt{\frac52}
\approx11.4714744,
\qquad
c=\frac{4\pi}{3\sqrt3},
\]

and

\[
2\|K_H\|_F=2\pi\sqrt2\approx8.8857659.
\]

The \(R\) slope differs from the ordinary circular-rotation value because the displayed carrier coordinates are not Euclidean-whitened, although the motion is elliptic in its invariant positive metric.

## 3. Positivity does not quantize

Timing rescaling multiplies each quadratic Hamiltonian by \(t\). For every \(t>0\),

\[
tS_R\succeq0,
\qquad
tS_H\succeq0.
\]

Consequently there is an open interval of healthy, passive and stable controls around the exact selector pulses, while the finite relations hold only at isolated timings.

This excludes a tempting inference:

\[
\text{positive Hamiltonian}
\not\Longrightarrow
\text{finite-order transformation}.
\]

## 4. Generic perturbations

If the perturbed phase divided by \(2\pi\) is irrational, the corresponding transformation has infinite order. Rational perturbations can give another finite order, but generically not the required orders \(3\) and \(2\), nor the complete order-18 presentation.

Hence exact finiteness is locally fine-tuned in the two pulse areas unless another mechanism makes those areas discrete.

## 5. What could protect the angles

The remaining credible mechanisms are:

1. **topological holonomy:** the phase is an integral characteristic number or a discrete conjugacy class of a flat connection;
2. **orbifold or boundary sewing:** admissible gluing maps are restricted directly to the order-three and order-two elements;
3. **symmetry-protected Floquet protocol:** a discrete time-crystalline or chiral symmetry pins the stroboscopic eigenphases;
4. **exact feedback clock:** the same response network that realizes Redheffer composition terminates a pulse at a group-defined return event;
5. **representation quantization:** the microscopic source admits only a discrete finite-image representation.

A freely chosen loop with a continuously variable Berry phase is insufficient. The holonomy must be quantized, not merely geometric.

## 6. Stop-everything and falsification criteria

**Topological trigger:** construct a parameter-space connection for the bilocal Standard-Model/Furey sources whose two specified loops have protected holonomies \(R\) and \(H\), with deformation-invariant conjugacy classes.

**Autonomous trigger:** derive one periodic positive Hamiltonian with a symmetry theorem pinning the required quasienergies to \(0,\pm2\pi/3,\pi\).

**Boundary trigger:** show that admissible causal sewing conditions form the finite order-18 selector rather than a continuous neighbourhood in \(Sp(4,\mathbb R)\).

**Negative trigger:** if every microscopic realization allows arbitrary small symmetry-preserving changes of both pulse areas, the exact finite group is not a robust physical rule set.

**Falsifier of automatic protection:** positivity or linear stability alone quantizes the angles. The explicit positive one-parameter families disprove this.

## 7. Verdict

The programme now has a sharp division:

\[
\boxed{
\text{Hamiltonian construction proves feasibility;}
\quad
\text{topology, discrete symmetry or feedback must prove protection}.
}
\]

Until a protection mechanism is derived, the order-18 selector is an exact and useful kinematic response symmetry whose dynamical coefficients remain tuned inputs.

## 8. Dependencies

- [positive quadratic pulse construction](858_positive_quadratic_hamiltonian_pulses_generate_the_exact_bilocal_selector_without_finite_dimensional_instability.md)
- [full selector class-sum](848_the_quadratic_handle_twirl_is_a_central_class_sum_for_the_full_order_18_selector.md)
- [global Redheffer realization](836_the_selector_redheffer_orbit_is_a_lossless_feedback_cascade_with_global_schur_and_positive_residue_control.md)
- [minimal bilocal carrier](855_no_linear_full_color_singlet_four_quotient_exists_but_the_minimal_bilocal_response_is_c2_with_canonical_j0.md)

