# The Silver Checkpoint Is the Vertex of an Exact Selector-Locking Manifold with a Protected Tangent and an Unprotected Normal

**Date:** 17 October 2026  
**Branches:** pole Ward identity, checkpoint protection, rational-inner monodromy, error geometry, and feedback target  
**Claim status:** exact locking-manifold theorem and executable sensitivity certificate; microscopic enforcement remains open  
**Certificate:** [derive_the_exact_selector_locking_manifold_and_its_normal_tangent_sensitivities.mjs](scripts/derive_the_exact_selector_locking_manifold_and_its_normal_tangent_sensitivities.mjs)

## Executive result

The reciprocal silver pole pair is not an isolated solution once frequency and both pole scales are allowed to vary together. Introduce logarithmic coordinates

\[
y=\log\frac{\sqrt{\gamma_n\gamma_t}}{\omega},
\qquad
s=\frac12\log\frac{\gamma_n}{\gamma_t}.
\]

The two-face response has the exact order-three selector phase precisely when

\[
\boxed{\sinh s=\cosh y.}
\]

The familiar reciprocal silver point is the vertex

\[
y=0,
\qquad
s=s_0=\operatorname{arsinh}(1)=\log(1+\sqrt2).
\]

Near it, the locking curve is

\[
s-s_0=\frac{y^2}{2\sqrt2}+O(y^4).
\]

Therefore common frequency/pole-center mismatch is tangent to the selector manifold and protected at first order. Pole-separation error is normal to it and changes the generator at first order. This replaces the vague phrase “pole tuning” with an exact error geometry.

## 1. Exact derivation

At fixed positive frequency, define

\[
A=\frac{\gamma_n}{\omega}=e^{y+s},
\qquad
B=\frac{\gamma_t}{\omega}=e^{y-s}.
\]

The relative squared-Blaschke phase is

\[
\Delta=-4(\arctan A-\arctan B).
\]

The selected Coxeter value is $\Delta=-\pi$. Since the arctangent difference lies in its principal positive range, this is equivalent to

\[
\tan(\arctan A-\arctan B)=1.
\]

Using the tangent subtraction formula gives

\[
\frac{A-B}{1+AB}=1.
\]

But

\[
A-B=2e^y\sinh s,
\qquad
1+AB=1+e^{2y}=2e^y\cosh y,
\]

and hence $\sinh s=\cosh y$.

## 2. The silver point is the vertex

On the reciprocal slice $y=0$, the locking equation becomes

\[
\sinh s=1,
\]

whose positive solution is $s_0=\operatorname{arsinh}(1)$. Therefore

\[
e^{s_0}=1+\sqrt2,
\qquad
e^{-s_0}=\sqrt2-1.
\]

Thus the silver pair is uniquely selected once the pole geometric mean is matched to the operating frequency.

For fixed silver separation $s=s_0$, the condition becomes $\cosh y=1$, so $y=0$ is likewise the unique positive-frequency checkpoint. Document 926's checkpoint-only conclusion is therefore exact on the fixed-pole slice.

## 3. Tangent and normal sensitivities

Let

\[
F(y,s)=\sinh s-\cosh y.
\]

At the silver point,

\[
\nabla F(0,s_0)=(0,\sqrt2).
\]

Consequently:

- the $y$ direction is tangent and has no linear error;
- the $s$ direction is normal and is linearly sensitive;
- correlated quotient adjustment can remain exactly on the curve.

The local phase expansion is

\[
\Delta+\pi
=-2\sqrt2\,\delta s+y^2+(\delta s)^2+\cdots.
\]

Setting the leading expression to zero gives the curvature

\[
\delta s=\frac{y^2}{2\sqrt2}+O(y^4),
\]

which the executable certificate verifies numerically.

## 4. Consequences for the group relation

The exact cascade trace remains

\[
\operatorname{tr}C=\frac12+\frac32\cos\Delta.
\]

Therefore:

- fixed silver separation with center mismatch $y$ gives generator drift $O(y^2)$ and order-three defect $O(y^4)$;
- fixed center with separation error $\delta s$ gives generator drift $O(\delta s)$ and order-three defect $O((\delta s)^2)$;
- movement along $\sinh s=\cosh y$ preserves $C^3=I$ exactly, up to numerical roundoff.

This is the complete local sensitivity classification for the lossless two-pole family.

## 5. What a physical locking law must do

The target is no longer necessarily two separate equations fixing $omega$, $gamma_n$ and $gamma_t$ absolutely. A physical feedback or Ward mechanism could instead constrain the dimensionless combination

\[
\sinh\!\left(\frac12\log\frac{\gamma_n}{\gamma_t}\right)
=
\cosh\!\left(\log\frac{\sqrt{\gamma_n\gamma_t}}{\omega}\right).
\]

Absolute scale may then remain free while the monodromy stays exact. This is compatible with the programme's relational emphasis: the selector needs a relation among scales, not necessarily an independently predicted mass.

No current Standard-Model, Furey or defect calculation supplies this equation. It is a sharply specified target, not a derived physical law.

## 6. Uncomfortable branches now open

1. **Self-tuned defect:** a boundary saddle equation may force $F(y,s)=0$ while leaving motion along the curve marginal.
2. **Running selector:** renormalization may move the poles and operating scale together along the locking manifold, preserving the finite monodromy without fixed microscopic masses.
3. **Normal instability:** quotient renormalization may move transversely and destroy the generator at first order even though ordinary frequency detuning looks robust.
4. **Loss obstruction:** non-inner corrections may remove the exact one-dimensional manifold altogether.
5. **Arithmetic pinning:** lattice or modular data may select only the vertex $y=0$, rather than the full analytic curve.

The second possibility is especially important: exact finite order need not mean broadband constancy; it could mean covariant motion of the response data along a constraint surface.

## 7. Stop-everything and falsification criteria

**Ward trigger:** derive $F(y,s)=0$ as a defect equation of motion, Ward identity or RG invariant.

**Running trigger:** show the beta functions obey $dF/d\log\mu=0$ on $F=0$.

**Vertex trigger:** derive an additional symmetry forcing $y=0$, thereby selecting the reciprocal silver point from the full curve.

**Loss trigger:** add the smallest reciprocal passive loss deformation and determine whether a nearby real locking manifold survives.

**Algebraic falsifier:** a correctly typed two-face calculation finds $C^3\ne I$ at a positive point satisfying $\sinh s=\cosh y$.

**Protection overclaim:** describe tangential protection as insensitivity to arbitrary independent pole perturbations.

## 8. Verdict

| Question | Verdict |
|---|---|
| Is the silver point isolated in full pole/frequency space? | **no** |
| Is there an exact selector-locking manifold? | **yes: $\sinh s=\cosh y$** |
| Is frequency/pole-center mismatch first-order protected? | **yes, tangentially** |
| Is pole separation first-order protected? | **no** |
| Can correlated running preserve exact order three? | **kinematically yes** |
| Is such running or feedback physically derived? | **not yet** |

## 9. Position in the corpus

- [first-order detuning and quartic group-defect theorem](926_the_reciprocal_silver_pole_pair_makes_the_selector_checkpoint_first_order_detuning_protected_but_not_broadband.md)
- [complete causal checkpoint network](925_the_dispersive_active_cycle_and_static_handle_form_one_lossless_network_realizing_the_order18_selector_only_at_the_checkpoint.md)
- [rational-inner active cycle](904_a_sideband_reversing_rational_inner_boundary_cycle_realizes_the_exact_a2_coxeter_element_with_positive_pole_scales.md)
- [topological versus arithmetic interface protection](909_topology_protects_the_orientation_reversing_interface_component_but_not_the_exact_a2_coxeter_angle.md)
- [strict passive-loss finite-order no-go](928_strict_passive_loss_destroys_exact_finite_order_in_the_reduced_selector_network.md)
