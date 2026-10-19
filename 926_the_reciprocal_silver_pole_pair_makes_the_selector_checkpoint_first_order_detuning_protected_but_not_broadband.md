# The Reciprocal Silver Pole Pair Makes the Selector Checkpoint First-Order Detuning Protected, but Not Broadband

**Date:** 17 October 2026  
**Branches:** checkpoint robustness, reciprocal pole geometry, phase stationarity, finite-order error, and active monodromy protection  
**Claim status:** exact first-derivative cancellation, quadratic generator drift and quartic order-relation defect; pole-scale protection remains open  
**Certificate:** [prove_the_reciprocal_silver_pole_pair_makes_the_selector_checkpoint_first_order_detuning_protected.mjs](scripts/prove_the_reciprocal_silver_pole_pair_makes_the_selector_checkpoint_first_order_detuning_protected.mjs)

## Executive result

Document 925 proved that the complete selector is finite only at the operating frequency. The checkpoint nevertheless has an exact first-order robustness property.

For the squared Blaschke eigenphase

\[
\phi(\omega,\gamma)
=-4\arctan\frac{\gamma}{\omega},
\]

the relative normal/tangent phase is

\[
\Delta(\omega)
=\phi(\omega,\gamma_n)-\phi(\omega,\gamma_t).
\]

With

\[
\gamma_n=(1+\sqrt2)\omega_0,
\qquad
\gamma_t=(\sqrt2-1)\omega_0,
\qquad
\gamma_n\gamma_t=\omega_0^2,
\]

one has

\[
\Delta(\omega_0)=-\pi,
\qquad
\Delta'(\omega_0)=0.
\]

For the normalization $\omega_0=1$,

\[
\Delta''(\omega_0)=2,
\]

so

\[
\Delta(1+\epsilon)
=-\pi+\epsilon^2+O(\epsilon^3).
\]

The complete matrix certificate distinguishes two error laws:

\[
\|R(1+\epsilon)-R(1)\|=O(\epsilon^2),
\qquad
\|R(1+\epsilon)^3-I\|=O(\epsilon^4).
\]

Thus the reciprocal pole pair cancels linear frequency-detuning error in the generator. A second, group-theoretic stationarity suppresses the order-three defect by two further powers. The finite selector is not broadband, but its checkpoint is unusually flat.

## 1. Exact derivative cancellation

The phase derivative is

\[
\frac{\partial\phi}{\partial\omega}
=\frac{4\gamma}{\omega^2+\gamma^2}.
\]

If two positive poles satisfy

\[
\gamma_t=\frac{\omega_0^2}{\gamma_n},
\]

then

\[
\frac{\gamma_n}{\omega_0^2+\gamma_n^2}
=
\frac{\gamma_t}{\omega_0^2+\gamma_t^2}.
\]

Therefore their phase slopes agree at $\omega_0$, and the relative slope vanishes.

This cancellation follows from reciprocal pole placement, not from the special numerical value alone.

## 2. Why the silver pair also fixes the phase difference

Reciprocity of the pole scales guarantees stationarity but not the value of the relative phase. Requiring

\[
\Delta(\omega_0)=-\pi
\]

selects the pair

\[
\frac{\gamma_n}{\omega_0}=1+\sqrt2,
\qquad
\frac{\gamma_t}{\omega_0}=\sqrt2-1.
\]

Thus the same conditions perform two jobs:

- reciprocal placement makes the crossing stationary;
- the silver-ratio value places the stationary crossing at the Householder phase difference.

## 3. Why the order-three defect is quartic

Write the relative eigenvalue as $q=e^{i\Delta}$. Direct evaluation of the two-face cascade gives the exact trace law

\[
\operatorname{tr}C
=\frac12+\frac34(q+q^{-1})
=\frac12+\frac32\cos\Delta.
\]

At $\Delta=-\pi$, this trace equals $-1$, the order-three value. If $\eta=\Delta+\pi$, then

\[
\operatorname{tr}C+1
=\frac34\eta^2+O(\eta^4).
\]

The reciprocal poles already give $\eta=O(\epsilon^2)$, so the trace departure is $O(\epsilon^4)$. Since $C\in SL(2,\mathbb C)$, Cayley--Hamilton makes $C^3-I$ linear to leading order in $\operatorname{tr}C+1$. Hence the finite-order defect is quartic.

The executable certificate rebuilds

\[
C(\omega)=D S(-\omega)D S(+\omega)
\]

and evaluates

\[
\Delta_3(\omega)=\|C(\omega)^3-I\|_{\max}.
\]

For progressively smaller positive and negative detunings, it separately verifies

\[
\frac{\|C(\omega_0\pm\epsilon)-C(\omega_0)\|}{\epsilon^2}
\to c_2\ne0
\]

and

\[
\frac{\Delta_3(\omega_0\pm\epsilon)}{\epsilon^4}
\to c_4\ne0.
\]

The first law prevents an overclaim: the transfer matrix itself is only second-order stationary. The stronger fourth-order law applies specifically to its order-three group relation.

## 4. What is protected

Protected by reciprocal pole placement:

- first-order frequency detuning;
- equality of the two phase slopes at the checkpoint;
- quadratic leading drift of the generator;
- quartic leading error in the order-three relation.

Not protected:

- second-order detuning;
- perturbations moving the pole product away from $\omega_0^2$;
- unequal losses or non-inner corrections;
- drift of the silver-ratio quotient;
- microscopic selection of $\omega_0$.

This is a double stationary-point protection, not a topological invariant.

## 5. Physical interpretation

The reciprocal poles lie on opposite sides of the operating scale in logarithmic frequency:

\[
\log\frac{\gamma_n}{\omega_0}
=-\log\frac{\gamma_t}{\omega_0}.
\]

Their group-delay contributions coincide at the center. The relative phase therefore crosses the required value tangentially rather than transversely.

This makes the exact selector less fragile to frequency error than a generic tuned phase crossing, while preserving the earlier conclusion that finite order is not broadband.

## 6. Stop-everything and falsification criteria

**Pole-Ward trigger:** derive $\gamma_n\gamma_t=\omega_0^2$ from a symmetry, duality or self-consistency equation.

**Silver trigger:** derive the quotient $\gamma_n/\gamma_t=3+2\sqrt2$ rather than fitting it.

**Robustness trigger:** include small loss and pole perturbations and determine whether a selector-compatible feedback restores the stationary checkpoint.

**Linear-error falsifier:** with the exact reciprocal pair, a correctly typed calculation finds a nonzero first derivative of the relative phase or generator at $\omega_0$.

**Quartic-error falsifier:** after preserving the exact cascade and pole pair, the order-three defect has a nonzero quadratic term.

**Protection overclaim:** quadratic detuning robustness is described as broadband or topological protection.

## 7. Verdict

| Question | Verdict |
|---|---|
| Is the selector finite order away from the checkpoint? | **no** |
| Does reciprocal pole placement cancel linear detuning error? | **yes** |
| Is the generator drift quadratic? | **yes** |
| Is the order-three defect quartic? | **yes** |
| Are pole-scale errors also protected? | **not shown** |
| Is the checkpoint dynamically selected? | **not yet** |

## 8. Position in the corpus

- [complete checkpoint selector network](925_the_dispersive_active_cycle_and_static_handle_form_one_lossless_network_realizing_the_order18_selector_only_at_the_checkpoint.md)
- [active rational-inner cycle](904_a_sideband_reversing_rational_inner_boundary_cycle_realizes_the_exact_a2_coxeter_element_with_positive_pole_scales.md)
- [pulse-area protection no-go](862_positive_quadratic_dynamics_does_not_protect_the_selector_pulse_areas_or_its_finite_order.md)
- [topology protects parity but not angle](909_topology_protects_the_orientation_reversing_interface_component_but_not_the_exact_a2_coxeter_angle.md)
- [exact selector-locking manifold and its tangent/normal errors](927_the_silver_checkpoint_is_the_vertex_of_an_exact_selector_locking_manifold_with_protected_tangent_and_unprotected_normal.md)
