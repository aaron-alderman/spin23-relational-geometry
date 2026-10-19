# The Dispersive Active Cycle and Static Handle Form One Lossless Network Realizing the Order-18 Selector Only at the Checkpoint

**Date:** 17 October 2026  
**Branches:** active boundary monodromy, static handle feedthrough, complete selector network, broadband passivity, and finite-order protection  
**Claim status:** exact checkpoint network theorem and broadband no-go; frequency/pole protection remains open  
**Certificate:** [compose_the_dispersive_active_cycle_with_the_static_handle_and_audit_broadband_selector_relations.mjs](scripts/compose_the_dispersive_active_cycle_with_the_static_handle_and_audit_broadband_selector_relations.mjs)

## Executive result

The dispersive active generator and static handle now coexist in one explicit causal four-channel network.

Let

\[
R(\omega)
=I_2\oplus
T^{-1}
\left[D S(-\omega)D S(+\omega)\right]
T,
\]

where $S(\omega)$ is the positive rational-inner two-face response of document 904 and $T$ is the established Euclidean-to-integral active-plane conjugator. Let

\[
H(\omega)=H
\]

be the constant handle feedthrough of document 924.

At the selected frequency $\omega_0$,

\[
R(\omega_0)=
I_2\oplus
\begin{pmatrix}1&3\\-1&-2\end{pmatrix},
\]

and

\[
R(\omega_0)^3=I,
\qquad
H^2=I.
\]

The generated matrix group has exactly eighteen elements and is the complete selector already established arithmetically.

For every sampled real frequency, both network components remain lossless in the unique metric $G_0$. But away from $\omega_0$,

\[
R(\omega)^3\ne I.
\]

Therefore the full order-eighteen rule is an exact **checkpoint monodromy**, not a broadband symmetry of the transfer function.

## 1. Active block transport

The Euclidean mediator-plane cycle is

\[
C(\omega)=D S(-\omega)D S(+\omega).
\]

At $\omega_0$ the selected positive pole scales give

\[
C(\omega_0)=C_{120^\circ}.
\]

The conjugator

\[
T=PX
\]

combines:

- the Euclidean-to-$A_2$ root-lattice map $P$;
- the integral incidence/active-basis map $X$.

It satisfies

\[
C(\omega_0)T
=T
\begin{pmatrix}1&3\\-1&-2\end{pmatrix}.
\]

Adjoining the neutral identity plane produces the typed four-dimensional $R(\omega)$.

## 2. Complete checkpoint selector

At the checkpoint, the two generators are exactly the integral matrices used in documents 895 and 912. Exhaustive closure under multiplication gives

\[
|\langle R(\omega_0),H\rangle|=18.
\]

Both preserve

\[
J=\varepsilon\oplus(-\varepsilon)
\]

and the unique positive selector metric $G_0$.

Thus the same checkpoint simultaneously carries:

- the primitive symplectic lattice;
- the positive power metric;
- the active order-three monodromy;
- the neutral/active handle involution;
- the complete finite selector group.

## 3. Broadband losslessness

For real $\omega$, each rational-inner face is Euclidean unitary. The $D$ twists are orthogonal, and transport by $T$ converts Euclidean norm to the active block of $G_0$.

Consequently

\[
R(\omega)^\dagger G_0R(\omega)=G_0
\]

throughout the real-frequency axis wherever the transfer is defined.

The static handle also obeys

\[
H^TG_0H=G_0.

\]

The composed network is therefore passive/lossless beyond the special operating point.

## 4. Finite order is not broadband

The eigenphases of $S(\omega)$ vary continuously with frequency. Their selected difference gives the $120^\circ$ cycle only at $\omega_0$ for the fixed pole scales.

The executable certificate evaluates the order-three defect

\[
\Delta_3(\omega)
=\|R(\omega)^3-I\|_{\max}
\]

at several frequencies. It vanishes numerically at $\omega_0$ and is nonzero at every tested off-checkpoint value, while the losslessness defect remains at numerical roundoff throughout.

Thus passivity does not protect finite order.

## 5. Consequence for the programme

The effective dynamic picture is now coherent:

\[
\boxed{
\text{dispersive two-face active monodromy }R(\omega)
+
\text{static canonical handle }H
}
\]

with

\[
\langle R(\omega_0),H\rangle
=G_{18}.
\]

This is a concrete four-channel realization of “one carrier, two faces, three relationships, one twist” at the selected frequency.

It does not make the selector a universal internal symmetry at every energy. It is a finite holonomy/monodromy of the response network at a distinguished spectral point.

## 6. Protection possibilities

Exact finite order could become physical rather than tuned if one of the following fixes the checkpoint:

- a pole/zero Ward identity;
- a topological winding or defect resonance;
- feedback locking to the phase crossing;
- an arithmetic quantization of the boundary holonomy;
- a measured threshold selecting $\omega_0$;
- a self-consistency equation tying $\omega_0$ to the reciprocal pole pair.

None has yet been derived.

There is, however, an exact local robustness short of full dynamical selection. The reciprocal pole relation makes the relative eigenphase stationary at $\omega_0$; the generator therefore drifts only quadratically with frequency detuning. The cascade trace is also stationary at the required relative phase, so the order-three defect is quartic. This does not make the relation broadband and does not protect pole-scale errors. See [the reciprocal-pole detuning theorem](926_the_reciprocal_silver_pole_pair_makes_the_selector_checkpoint_first_order_detuning_protected_but_not_broadband.md).

## 7. Stop-everything and falsification criteria

**Locking trigger:** derive a dynamical equation fixing $\omega_0$ and the reciprocal silver-ratio pole scales.

**Network trigger:** provide a local boundary/state-space realization of the combined active and handle ports with the stated $G_0$ power form.

**Robustness trigger:** prove the checkpoint persists under selector-compatible perturbations or running.

**Broadband falsifier:** claim $R(\omega)^3=I$ for generic frequency with the fixed rational-inner poles.

**Passivity conflation:** infer finite order solely from $G_0$-unitarity.

**Symmetry warning:** describe the checkpoint selector as an ordinary unbroken microscopic gauge group.

## 8. Verdict

| Question | Verdict |
|---|---|
| Are both network components causal and lossless? | **yes** |
| Does the checkpoint reproduce the exact integral $R$ and $H$? | **yes** |
| Is the generated checkpoint group order eighteen? | **yes** |
| Is the order-three relation broadband? | **no** |
| Is the checkpoint frequency-detuning protected to first order? | **yes** |
| Is it dynamically selected or protected against pole drift? | **not yet** |

## 9. Position in the corpus

- [active rational-inner boundary cycle](904_a_sideband_reversing_rational_inner_boundary_cycle_realizes_the_exact_a2_coxeter_element_with_positive_pole_scales.md)
- [constant handle feedthrough](924_the_full_handle_graph_is_a_constant_reciprocal_rational_inner_feedthrough_in_the_unique_selector_metric.md)
- [unique selector metric and complex frame](913_the_full_selector_fixes_a_unique_positive_response_metric_and_a_compatible_complex_structure.md)
- [typed integral carrier](895_normalized_color_contraction_produces_the_primitive_relationship_area_and_the_ordered_neutrino_pair_completes_the_exact_selector_lattice.md)
