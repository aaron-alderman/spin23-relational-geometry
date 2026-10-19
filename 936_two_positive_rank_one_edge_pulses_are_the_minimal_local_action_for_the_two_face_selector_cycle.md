# Two Positive Rank-One Edge Pulses Are the Minimal Local Action for the Two-Face Selector Cycle

**Date:** 17 October 2026  
**Branches:** local Floquet defect action, positive pulse Hamiltonians, label swaps, mediator Householders, and pulse-area protection  
**Claim status:** exact minimal pulse construction; autonomous timing and protection remain open  
**Certificate:** [construct_the_minimal_positive_edge_pulse_action_for_the_two_face_selector_cycle.mjs](scripts/construct_the_minimal_positive_edge_pulse_action_for_the_two_face_selector_cycle.mjs)

## Executive result

The two local swap faces now have an explicit continuous-time action using positive rank-one Hamiltonians.

For a label transposition $S_{ab}$, define

\[
P^-_{ab}=\frac{I-S_{ab}}2
\]

and apply the unit-time pulse

\[
K_{ab}=\pi P^-_{ab}
=\frac\pi2(I-S_{ab}).
\]

Then

\[
K_{ab}\succeq0,
\qquad
\operatorname{rank}K_{ab}=1,
\qquad
e^{-iK_{ab}}=S_{ab}.
\]

The boundary action during each pulse is

\[
L_{ab}=i\psi^\dagger\dot\psi-\psi^\dagger K_{ab}\psi.
\]

Applying $K_{12}$ and $K_{01}$ in sequence produces the directed order-three cycle; reversing their order produces its inverse.

## 1. Edge locality and positivity

The projector $P^-_{ab}$ is the normalized edge-difference projector. For example,

\[
P^-_{01}
=\frac12
\begin{pmatrix}
1&-1&0\\
-1&1&0\\
0&0&0
\end{pmatrix}.
\]

It depends only on labels $0$ and $1$, is positive semidefinite and has one nonzero eigenvalue. Therefore $K_{01}$ is the smallest positive quadratic pulse capable of changing the relative sign on that edge.

On the antisymmetric edge mode the pulse phase is $e^{-i\pi}=-1$; all orthogonal modes are unchanged. This is exactly the swap.

## 2. Restriction to the mediator plane

Using the normalized root synthesis $Q=M/\sqrt6$,

\[
Q^TK_{01}Q
=\frac\pi2(I+H_{g_-}),
\]

\[
Q^TK_{12}Q
=\frac\pi2(I+H_{g_+}).
\]

Exponentiating gives

\[
Q^Te^{-iK_{01}}Q=-H_{g_-},
\qquad
Q^Te^{-iK_{12}}Q=-H_{g_+}.
\]

These are precisely the signed mediator faces found in document 935. The global signs cancel in the two-pulse product.

## 3. One explicit Floquet period

A complete period is

\[
U_F=e^{-iK_{01}}e^{-iK_{12}}.
\]

It satisfies

\[
U_F^3=I_3.
\]

Its restriction to the zero-sum plane is the selected $A_2$ Coxeter action, up to the established convention for forward orientation. The reverse schedule gives $U_F^{-1}$.

No negative-energy pulse or non-Hermitian step is required.

## 4. Minimality

Each transposition has exactly one $-1$ eigendirection. Any Hermitian logarithm that leaves the $+1$ eigenspace fixed must supply an odd-$\pi$ phase on that line. The smallest nonnegative choice is $\pi P^-_{ab}$.

Higher logarithm branches add $2\pi$ multiples or act unnecessarily on spectator modes. Thus the stated pulse is minimal in rank and positive pulse area within this fixed-face realization.

## 5. Physical interpretation

The action realizes:

\[
\text{positive local relation energy}
\xrightarrow{\pi\text{ pulse}}
\text{one reciprocal face}
\xrightarrow{\text{ordered pair}}
\text{oriented three-cycle}.
\]

The dynamical burden is now explicit:

- protect the integrated edge pulse area at $\pi$;
- select which edge pulse comes first;
- preserve coherence between the two steps;
- derive the edge projectors from mediator/Furey couplings.

## 6. Stop-everything and falsification criteria

**Pulse-Ward trigger:** derive quantization of $\int K_{ab}dt$ to $\pi P^-_{ab}$ modulo $2\pi$.

**Defect-action trigger:** obtain both edge projectors from one local Higgs/Furey boundary action.

**Clock trigger:** derive the two-step schedule from oriented traversal rather than an external pulse controller.

**Positivity falsifier:** the proposed edge Hamiltonian has a negative eigenvalue or rank above one.

**Face falsifier:** its unit-time exponential differs from the stated label swap.

**Protection warning:** exact algebraic pulse area is not itself a dynamically protected value.

## 7. Verdict

| Question | Verdict |
|---|---|
| Is there a positive local Hamiltonian for each face? | **yes** |
| Is it rank one and edge-local? | **yes** |
| Does a unit pulse give the exact swap? | **yes** |
| Does the ordered pair give the selector cycle? | **yes** |
| Are pulse area and timing protected microscopically? | **not yet** |

## 8. Position in the corpus

- [exact label-swap/mediator-face intertwiner](935_the_two_local_label_swaps_are_exactly_the_two_mediator_householder_faces_on_the_zero_sum_plane_up_to_canceling_signs.md)
- [oriented twist versus ordered reciprocal faces](934_the_three_label_shift_requires_an_oriented_autonomous_twist_or_two_ordered_reciprocal_faces.md)
- [minimal three-label boundary network](933_a_minimal_three_label_boundary_network_is_orbit_local_character_diagonal_and_activates_the_common_mode_exactly_with_loss.md)
- [pulse-area nonprotection theorem](862_positive_quadratic_dynamics_does_not_protect_the_selector_pulse_areas_or_its_finite_order.md)
