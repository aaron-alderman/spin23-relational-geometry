# The Full Handle Graph Is a Constant Reciprocal Rational-Inner Feedthrough in the Unique Selector Metric

**Date:** 17 October 2026  
**Branches:** full handle, causal transfer realization, rational-inner systems, selector metric, reciprocity, and boundary feedthrough  
**Claim status:** exact effective transfer theorem; microscopic Standard-Model boundary remains open  
**Certificate:** [realize_the_full_handle_graph_as_a_constant_reciprocal_rational_inner_feedthrough.mjs](scripts/realize_the_full_handle_graph_as_a_constant_reciprocal_rational_inner_feedthrough.mjs)

## Executive result

The full selector handle does not require a resonant four-channel device or auxiliary state-space realization. In the unique positive selector metric $G_0$, it is already a reciprocal lossless feedthrough.

Let $H$ be the primitive integral handle and $G_0$ the unique positive metric from document 913. Then

\[
H^2=I,
\qquad
H^TG_0H=G_0,
\qquad
H^TG_0=G_0H.
\]

The constant transfer function

\[
\boxed{S(z)=H}
\]

is therefore:

- analytic on the entire complex plane;
- rational with no finite poles;
- real-time compatible;
- lossless in the $G_0$ power metric;
- reciprocal in power-normalized coordinates;
- causal as an instantaneous boundary feedthrough.

If $G_0=L^TL$ and

\[
O=LHL^{-1},
\]

then

\[
O^TO=I,
\qquad
O^T=O,
\qquad
O^2=I.
\]

Thus the handle graph of document 912 is exactly the graph of a symmetric orthogonal scattering feedthrough after canonical power normalization.

This closes causal effective realization of $H$. It does not derive the microscopic boundary selecting it.

## 1. Why a constant transfer is rational inner

A matrix-valued transfer function is inner when its boundary values are unitary in the appropriate power metric. A constant matrix is a degree-zero rational function and is analytic everywhere.

Since

\[
H^TG_0H=G_0,
\]

the generalized scattering norm is preserved at every frequency. There is no pole scale, resonance tuning or sideband conversion.

This differs fundamentally from the active $C_3$ construction. The active generator arose from two dispersive reflection faces whose common phases had to cancel. The handle is itself a static canonical sewing between the completed neutral and active planes.

## 2. Reciprocity

For a non-Euclidean port metric, the reciprocity condition is $G_0$-self-adjointness:

\[
H^TG_0=G_0H.
\]

It follows here from losslessness and involutivity:

\[
H^TG_0H=G_0,
\qquad
H^{-1}=H.
\]

After whitening by $L$, the transfer $O=LHL^{-1}$ is symmetric. Hence the feedthrough is reciprocal in ordinary power-normalized coordinates.

## 3. Port decomposition

The handle has trace zero and squares to identity. Its $+1$ and $-1$ eigenspaces each have rank two.

The projectors

\[
P_\pm=\frac12(I\pm H)
\]

are $G_0$-orthogonal. The feedthrough acts as

\[
S=P_+-P_-.
\]

It is therefore a four-port sign-changing junction: two power-normalized combinations pass unchanged and two acquire a phase of $\pi$.

No dynamical instability is involved because the sign is a scattering phase, not a negative energy.

## 4. Relation to the Lagrangian graph

Document 912 proved that

\[
\Gamma_H=\{(v,Hv)\}
\]

is a primitive Lagrangian subspace in $V^-\oplus V$. The present result supplies its transfer-system interpretation:

\[
\text{incoming port }v
\longmapsto
\text{outgoing port }Hv.
\]

Symplectic-flux conservation comes from $H^TJH=J$; positive-power conservation comes from $H^TG_0H=G_0$.

The same boundary relation is therefore canonical and passive.

## 5. Physical scope

Closed:

- causal effective transfer realization;
- exact losslessness;
- exact reciprocity;
- real-time compatibility;
- no auxiliary modes or independent particles;
- compatibility with the primitive integral graph.

Open:

- which Higgs/Furey/Standard-Model boundary implements this junction;
- whether the physical kinetic metric is the selector-invariant $G_0$ ray;
- how the four response ports are localized in spacetime;
- whether finite bandwidth corrections deform the constant feedthrough;
- how the defect couples to the dispersive active $C_3$ faces.

## 6. Stop-everything and falsification criteria

**Boundary trigger:** derive a local defect Lagrangian whose scattering matrix on normalized response ports is $O=LHL^{-1}$.

**Metric trigger:** obtain the physical port-power form as a positive multiple of $G_0$.

**Composition trigger:** connect this feedthrough causally to the active rational-inner boundary cycle while preserving both symplectic and power flux.

**Passivity falsifier:** the proposed physical port metric is not preserved by $H$.

**Reciprocity falsifier:** after physical power normalization the transfer is not symmetric.

**Microscopic overclaim:** degree-zero effective realization is presented as derivation of its Standard-Model defect.

## 7. Verdict

| Question | Verdict |
|---|---|
| Is $H$ a rational-inner transfer? | **yes, degree zero** |
| Is it causal? | **yes, as instantaneous feedthrough** |
| Is it lossless in the selector metric? | **yes** |
| Is it reciprocal after power normalization? | **yes** |
| Does it need sideband conversion or an idler? | **no** |
| Is its microscopic boundary derived? | **not yet** |

## 8. Position in the corpus

- [primitive Lagrangian graph defect](912_the_full_selector_handle_is_a_primitive_lagrangian_graph_defect_with_an_invariant_positive_energy_metric.md)
- [unique positive selector metric](913_the_full_selector_fixes_a_unique_positive_response_metric_and_a_compatible_complex_structure.md)
- [active dispersive rational-inner cycle](904_a_sideband_reversing_rational_inner_boundary_cycle_realizes_the_exact_a2_coxeter_element_with_positive_pole_scales.md)
- [typed carrier lattice](895_normalized_color_contraction_produces_the_primitive_relationship_area_and_the_ordered_neutrino_pair_completes_the_exact_selector_lattice.md)
