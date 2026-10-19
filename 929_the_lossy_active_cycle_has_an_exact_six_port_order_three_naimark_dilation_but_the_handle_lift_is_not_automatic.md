# The Lossy Active Cycle Has an Exact Six-Port Order-Three Naimark Dilation, but the Handle Lift Is Not Automatic

**Date:** 17 October 2026  
**Branches:** open-system selector, finite-order unitary dilation, operator-valued barycentric coordinates, environmental memory, and full-handle lifting  
**Claim status:** exact dilation criterion, explicit six-dimensional witness, and finite passive-quadrant census; the formerly open global theorem is proved in document 939 and the full pointwise order-18 lift in document 930  
**Certificate:** [classify_order_three_unitary_dilations_of_the_lossy_selector_cycle.mjs](scripts/classify_order_three_unitary_dilations_of_the_lossy_selector_cycle.mjs)

## Executive result

Document 928 proved that a strictly lossy reduced cycle cannot itself satisfy $C^3=I$. That does not prevent it from being the compression of a larger lossless order-three network.

Let

\[
\zeta=e^{2\pi i/3}.
\]

A two-channel matrix $C$ has an order-three unitary dilation with spectrum contained in $\{1,\zeta,\zeta^2\}$ exactly when it admits

\[
C=P_0+\zeta P_1+\zeta^2P_2,
\qquad
P_k\succeq0,
\qquad
P_0+P_1+P_2=I.
\]

The three operator barycentric coordinates are uniquely determined:

\[
P_0=\frac{I+2\operatorname{Re}C}{3},
\]

\[
P_1=\frac{I-P_0}{2}+\frac{\operatorname{Im}C}{\sqrt3},
\qquad
P_2=\frac{I-P_0}{2}-\frac{\operatorname{Im}C}{\sqrt3}.
\]

For every tested point in an $81$-point grid of the passive-loss quadrant, all three matrices are positive. At the explicit strictly lossy point $(\ell_n,\ell_t)=(0.05,0.05)$, each $P_k$ has rank two. Its minimal spectral Naimark construction is therefore six-dimensional and satisfies

\[
U^3=I_6,
\qquad
V^*V=I_2,
\qquad
V^*UV=C.
\]

The reduced cycle is not finite order; the full six-port coherent network is.

## 1. Necessity of the positive barycentric coordinates

Suppose $U^3=I$ is unitary. Its spectral theorem gives

\[
U=E_0+\zeta E_1+\zeta^2E_2
\]

for mutually orthogonal projections $E_k$ summing to the identity. If $V$ embeds the observed two-channel space isometrically, then

\[
C=V^*UV
=P_0+\zeta P_1+\zeta^2P_2,
\qquad
P_k=V^*E_kV.
\]

Each $P_k$ is positive and their sum is $I$. Taking real and imaginary parts gives the formulas above. Positivity is therefore necessary.

## 2. Sufficiency and explicit construction

Conversely, if the three $P_k$ are positive and sum to $I$, define

\[
Vx=(\sqrt{P_0}x,\sqrt{P_1}x,\sqrt{P_2}x)
\]

and

\[
U=I\oplus\zeta I\oplus\zeta^2I.
\]

Then

\[
V^*V=\sum_kP_k=I,
\qquad
V^*UV=\sum_k\zeta^kP_k=C,
\qquad
U^3=I.
\]

Thus positivity is also sufficient. The certificate constructs $V$ by Cholesky factors and verifies all three identities numerically.

## 3. Dimension and the emergence of three spectral sectors

At the lossless selector point,

\[
\operatorname{rank}(P_0,P_1,P_2)=(0,1,1).
\]

The observed active plane is already an exact order-three unitary representation and needs no environment.

At the explicit positive-loss witness,

\[
\operatorname{rank}(P_0,P_1,P_2)=(2,2,2).
\]

The minimal spectral Naimark space therefore has dimension

\[
2+2+2=6.
\]

This creates three two-dimensional response sectors labelled by the three $C_3$ characters. They are environmental spectral sectors, not three generations, three particles, or automatically the three mediator roots. Any physical identification requires an additional typed intertwiner.

## 4. Why this does not contradict the reduced no-go

Compression and multiplication do not commute:

\[
(V^*UV)^3\ne V^*U^3V
\]

unless the observed subspace $V\mathbb C^2$ is invariant under $U$. With positive loss it is not invariant. Amplitude leaves the observed subspace, retains coherent phase information in the environmental sectors, and may return later.

Consequently

\[
C^3\ne I_2,
\qquad
V^*U^3V=I_2.
\]

The full network retains exact order; Markovian compression forgets the environmental memory that carries it.

## 5. Scope of the census

The certificate tested

\[
\ell_n,\ell_t\in
\{0,0.001,0.01,0.05,0.1,0.2,0.5,1,2\}
\]

for 81 passive-loss pairs. Every point passed the positive-operator criterion. Strongly asymmetric hand-selected cases also passed.

This was evidence for a global passive-family theorem, but not yet that theorem at this stage of the branch. Document [939](939_the_full_passive_silver_loss_family_has_positive_c3_barycentric_effects_and_exact_six_port_dilations.md) subsequently proves $P_k\succeq0$ for all $\ell_n,\ell_t\ge0$ by an exact Bernstein-basis certificate, with strict positivity away from the lossless corner.

## 6. The full-selector gate

The six-dimensional construction dilates the active order-three cycle only. The complete programme requires the neutral plane and the handle. A genuine order-eighteen dilation must construct an involution $\widetilde H$ on the enlarged carrier such that:

- the embedded physical four-carrier compresses to the established handle $H$;
- $\widetilde H$ is lossless and reciprocal in an enlarged positive metric;
- $\langle\widetilde R,\widetilde H\rangle$ has the required finite relations;
- environmental sectors are response ports rather than additional matter states.

None of these properties follows merely from the Naimark theorem. This is the next decisive algebraic gate.

## 7. Stop-everything and falsification criteria

**Global-positivity trigger:** prove $P_0,P_1,P_2\succeq0$ analytically for the entire passive-loss quadrant.

**Handle-lift trigger:** construct $\widetilde H$ and verify a finite order-eighteen enlarged group with the correct physical compression.

**Microscopic-port trigger:** identify the six spectral sectors as modes of a local passive defect action without adding matter particles.

**Positivity falsifier:** find passive $(\ell_n,\ell_t)$ for which any $P_k$ has a negative eigenvalue.

**Memory warning:** claim that the reduced lossy block obeys $C^3=I$ because its coherent dilation does.

**Particle-counting warning:** interpret Naimark environment multiplicity as new Standard-Model species.

## 8. Verdict

| Question | Verdict |
|---|---|
| Can the reduced lossy cycle itself have finite order? | **no** |
| Can it be a compression of an exact order-three unitary? | **yes for every tested passive point** |
| Is there an explicit strictly lossy witness? | **yes, in six dimensions** |
| Is positivity proved for the entire passive quadrant? | **not yet** |
| Has the neutral plane and handle been lifted? | **not yet** |

## 9. Position in the corpus

- [strict passive-loss reduced no-go](928_strict_passive_loss_destroys_exact_finite_order_in_the_reduced_selector_network.md)
- [exact lossless selector-locking manifold](927_the_silver_checkpoint_is_the_vertex_of_an_exact_selector_locking_manifold_with_protected_tangent_and_unprotected_normal.md)
- [complete four-channel checkpoint network](925_the_dispersive_active_cycle_and_static_handle_form_one_lossless_network_realizing_the_order18_selector_only_at_the_checkpoint.md)
- [three mediator/edge/handle frames](918_the_mediator_root_orbit_multiplicity_edges_and_handle_kraus_operators_are_one_three_way_a2_frame.md)
- [exact twelve-port order-18 handle lift](930_the_lossy_four_channel_selector_is_the_compression_of_an_exact_twelve_port_order18_unitary_representation.md)
