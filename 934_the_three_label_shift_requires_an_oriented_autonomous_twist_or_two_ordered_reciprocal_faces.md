# The Three-Label Shift Requires an Oriented Autonomous Twist or Two Ordered Reciprocal Faces

**Date:** 17 October 2026  
**Branches:** local three-label dynamics, reciprocity obstruction, oriented holonomy, two-face Floquet construction, and cyclic relationship rule  
**Claim status:** exact finite-dimensional realization/classification at one-step level; microscopic pulse protection remains open  
**Certificate:** [classify_continuous_and_two_step_local_realizations_of_the_three_label_cyclic_shift.mjs](scripts/classify_continuous_and_two_step_local_realizations_of_the_three_label_cyclic_shift.mjs)

## Executive result

The orbit-local cyclic update of document 933 has two exact implementations, with different physical meanings.

An autonomous continuous generator is

\[
H_\circlearrowright
=
\frac{2\pi}{3\sqrt3},
i
\begin{pmatrix}
0&1&-1\\
-1&0&1\\
1&-1&0
\end{pmatrix},
\]

up to the choice of orientation sign. It is Hermitian and satisfies

\[
e^{-iH_\circlearrowright}=T,
\]

where $T$ is the directed three-cycle.

But $T^T\ne T$. No single reciprocal symmetric feedthrough or real-symmetric autonomous Hamiltonian can equal this directed shift.

Alternatively, let $S_{01}$ and $S_{12}$ be the local swaps of adjacent labels. Each is a symmetric orthogonal involution. Their ordered products give the two orientations:

\[
S_{12}S_{01}=T^{\pm1},
\qquad
S_{01}S_{12}=T^{\mp1}.
\]

Thus a directed three-cycle requires either one chiral twist or two reciprocal faces with an ordering bit.

## 1. The autonomous logarithm

In the character basis,

\[
T=F\operatorname{diag}(1,\zeta,\zeta^2)F^*.
\]

Choose logarithm phases

\[
(0,-2\pi/3,+2\pi/3).
\]

Then

\[
H=F\operatorname{diag}(0,-2\pi/3,+2\pi/3)F^*
\]

is Hermitian and purely imaginary off diagonal. Transforming back to the orbit basis gives the oriented triangle above.

Complex conjugation reverses it:

\[
\overline H=-H,
\qquad
\overline T=T^{-1}.
\]

The direction of the cycle is therefore precisely an orientation line.

## 2. Reciprocity obstruction for one autonomous face

If a time-independent Hamiltonian is real symmetric, then its exponential is complex symmetric. Likewise a reciprocal instantaneous scattering matrix is symmetric.

The directed permutation satisfies

\[
T^T=T^{-1}\ne T.
\]

Therefore no single reciprocal autonomous face produces the directed cycle. A magnetic/synthetic flux, oriented boundary coefficient or equivalent time-reversal-breaking datum is necessary.

This is the three-label version of the earlier conclusion that topology supplies an orientation component but not the exact angle.

## 3. Two reciprocal faces

The transpositions

\[
S_{01}=
\begin{pmatrix}
0&1&0\\1&0&0\\0&0&1
\end{pmatrix},
\qquad
S_{12}=
\begin{pmatrix}
1&0&0\\0&0&1\\0&1&0
\end{pmatrix}
\]

are individually:

- local on one edge;
- symmetric;
- orthogonal;
- involutive.

Their order matters. Reversing the word reverses the cycle. The orientation is stored in temporal or boundary ordering rather than in either face separately.

This gives a literal realization of

\[
\boxed{\text{two faces}\longrightarrow\text{three relationships}\longrightarrow\text{one oriented cycle}.}
\]

## 4. Relation to the active rational-inner construction

The established active selector also arises from two individually reciprocal faces whose ordered sideband-sewn product gives the Coxeter element. The present three-label construction is its orbit-space counterpart:

- the two-channel response acts on the $A_2$ standard plane;
- the two local swaps act on the three-label permutation module;
- restricting the latter to the zero-sum plane gives the same order-three representation.

This is an exact representation relationship. It does not prove that the physical rational-inner faces are literally label swaps.

## 5. Physical alternatives

The programme now has two sharply distinct implementation branches.

### Autonomous chiral branch

A static oriented flux supplies $H_\circlearrowright$. The open questions are the microscopic source of the flux and protection of its exact integrated phase.

### Ordered reciprocal branch

Two local reciprocal junctions are pulsed or traversed sequentially. The open questions are the clock/order source, pulse-area protection and compatibility with the antiunitary sideband sewing.

Both branches require one orientation bit. Neither obtains direction from an unoriented scalar action.

## 6. Stop-everything and falsification criteria

**Flux trigger:** derive the imaginary oriented hopping from the weak/Pfaffian or $h\chi$ boundary datum.

**Floquet trigger:** identify the two swaps with the two mediator faces and derive their ordering from the real-interface orientation.

**Protection trigger:** obtain the exact $2\pi/3$ holonomy or exact swap pulses from a Ward or arithmetic constraint.

**Reciprocity falsifier:** a single real-symmetric autonomous generator exponentiates to the nonsymmetric directed shift.

**Order falsifier:** reversing the two reciprocal faces does not reverse the three-cycle.

## 7. Verdict

| Question | Verdict |
|---|---|
| Does an autonomous Hermitian generator exist? | **yes** |
| Is it reciprocal/time-reversal even? | **no** |
| Can reciprocal local faces realize the shift sequentially? | **yes, with two swaps** |
| Does ordering carry the orientation? | **exactly** |
| Is the physical orientation/pulse protection derived? | **not yet** |

## 8. Position in the corpus

- [minimal orbit-local/character-diagonal network](933_a_minimal_three_label_boundary_network_is_orbit_local_character_diagonal_and_activates_the_common_mode_exactly_with_loss.md)
- [two mediator faces and completed root orbit](917_the_two_mediator_faces_generate_c3_but_only_the_completed_three_root_a2_orbit_protects_the_response_metric.md)
- [sideband-sewn rational-inner Coxeter cycle](904_a_sideband_reversing_rational_inner_boundary_cycle_realizes_the_exact_a2_coxeter_element_with_positive_pole_scales.md)
- [topology versus exact Coxeter angle](909_topology_protects_the_orientation_reversing_interface_component_but_not_the_exact_a2_coxeter_angle.md)
- [exact label-swap/mediator-face intertwiner](935_the_two_local_label_swaps_are_exactly_the_two_mediator_householder_faces_on_the_zero_sum_plane_up_to_canceling_signs.md)
