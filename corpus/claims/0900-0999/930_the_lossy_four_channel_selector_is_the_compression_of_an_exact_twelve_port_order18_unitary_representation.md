# The Lossy Four-Channel Selector Is the Compression of an Exact Twelve-Port Order-18 Unitary Representation

**Date:** 17 October 2026  
**Branches:** full-selector dilation, handle extension, finite-group representation, environmental memory, and open-system carrier geometry  
**Claim status:** exact representation/dilation theorem with an explicit strict-loss witness; local causal and microscopic realizations remain open  
**Certificate:** [lift_the_lossy_cycle_and_handle_to_an_exact_order18_unitary_representation.mjs](../../../verification/lift/lift_the_lossy_cycle_and_handle_to_an_exact_order18_unitary_representation.mjs)

## Executive result

The handle-lift gate left open in document 929 closes positively at finite-dimensional representation level.

In the power-normalized physical basis, the lossless selector generators have the form

\[
R_{m phys}=I_2\oplus C,
\qquad
H_{m phys}=
\begin{pmatrix}
0&I_2\\
I_2&0
\end{pmatrix}.
\]

For the strictly lossy active cycle $C$, let

\[
C=P_0+\zeta P_1+\zeta^2P_2,
\qquad
P_k\succeq0,
\qquad
\sum_kP_k=I_2.
\]

At the explicit loss point $(\ell_n,\ell_t)=(0.05,0.05)$, all three effects have rank two. There is an isometry

\[
J:\mathbb C^4\longrightarrow\mathbb C^{12}
\]

and unitary matrices $\widetilde R,\widetilde H$ such that

\[
\widetilde R^3=I_{12},
\qquad
\widetilde H^2=I_{12},
\qquad
|\langle\widetilde R,\widetilde H\rangle|=18,
\]

while

\[
J^*\widetilde R J=I_2\oplus C,
\qquad
J^*\widetilde HJ=H_{m phys},
\qquad
\widetilde HJ=JH_{m phys}.
\]

Thus the lossy four-channel selector is exactly the compression of a coherent twelve-port representation of the same order-eighteen group.

## 1. Why the three POVM sectors have the right group representations

Let $G=C_3\times S_3$. The physical four-dimensional lossless carrier is the sum of the two centrally twisted standard $S_3$ representations. In a basis adapted to the neutral/active handle pair, each relevant two-dimensional block has

\[
r_k=
\begin{pmatrix}
1&0\\
0&\zeta^k
\end{pmatrix},
\qquad
h=
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix}.
\]

For $k=1,2$, these are the two conjugate central twists of the standard representation. The $k=0$ block is the direct sum of the trivial and sign representations, written in the handle-swapped basis.

Together the three block types distinguish all three active characters

\[
1,\quad\zeta,\quad\zeta^2
\]

while giving every active vector an orthogonal neutral partner fixed by $r$.

## 2. Construction from the operator barycentric coordinates

Choose factors

\[
P_k=B_k^*B_k.
\]

For each $k$, introduce a multiplicity space of dimension $\operatorname{rank}P_k$ and tensor it with one neutral/active pair. Embed a neutral vector $x$ by

\[
Nx=\bigoplus_k (B_kx)\otimes|n_k\rangle
\]

and its active partner by

\[
Ax=\bigoplus_k (B_kx)\otimes|a_k\rangle,
\qquad
|a_k\rangle=h|n_k\rangle.
\]

Because the effects sum to the identity,

\[
N^*N=A^*A=I_2,
\qquad
N^*A=0.
\]

The physical embedding is

\[
J(x_n,x_a)=Nx_n+Ax_a.
\]

The enlarged handle swaps $N$ and $A$ exactly, while the enlarged cycle fixes $N$ and multiplies the $k$th active sector by $\zeta^k$. Therefore

\[
A^*\widetilde RA
=\sum_k\zeta^kB_k^*B_k
=C.
\]

This proves both compression identities without fitting any additional matrix.

## 3. Why twelve dimensions appear

For generic strict loss in the tested family,

\[
\operatorname{rank}(P_0,P_1,P_2)=(2,2,2).
\]

Each active spectral sector needs its orthogonal neutral handle partner. The construction therefore uses

\[
2\sum_k\operatorname{rank}P_k
=2(2+2+2)
=12
\]

dimensions.

At the lossless point the ranks collapse to

\[
(0,1,1),
\]

and the same formula returns four dimensions—the original selector carrier. Loss therefore does not introduce a new group; it unfolds the compressed four-carrier into a larger coherent representation of the same group.

Within the class of handle-intertwining spectral constructions, the rank bound also makes twelve minimal at the full-rank witness: each active effect range and its orthogonal handle partner must both occur.

## 4. Exact group closure

The certificate constructs the matrices using only $0$, $1$, $\zeta$ and $\zeta^2$ in the group generators. Exhaustive multiplication gives exactly eighteen distinct matrices.

The group is the familiar

\[
C_3\times S_3.
\]

The direct-sum blocks make the structure transparent:

- diagonal $C_3$ phase is central;
- the handle exchanges the two entries of each pair;
- the anti-diagonal $C_3$ component and handle generate the $S_3$ factor.

This is not merely an arbitrary unitary dilation of $C$. It is a dilation inside the exact finite selector group.

## 5. Relation to the reduced loss no-go

The observed physical subspace is invariant under $\widetilde H$ but not under $\widetilde R$. Therefore

\[
(J^*\widetilde RJ)^3\ne J^*\widetilde R^3J.
\]

The reduced active response remains strictly contractive and fails exact finite order, exactly as document 928 proved. Coherent amplitude entering the additional ports carries the missing group memory.

If those ports are traced out after every step, the order-eighteen law is lost. If they remain coherent across the complete cycle, the full law is exact.

## 6. Interpretation for the programme

The result gives a mathematically clean open-system version of the narrative:

\[
\boxed{
\text{four observed carrier coordinates}
\subset
\text{twelve coherent response coordinates}
}
\]

with the same finite selector acting exactly on the larger space.

The twelve coordinates must not be counted as twelve fermions or additional generations. They are a Stinespring/Naimark-style coherent response environment. Their three character sectors are structurally adjacent to the project's three mediator roots and three handle Kraus directions, but no physical identification has been proved.

The result also clarifies what “loss” means here: not destruction of the rule, but failure to observe the complete carrier on which the rule closes.

## 7. What remains genuinely open

This is a checkpoint matrix construction. It does not yet provide:

- a causal rational transfer $\widetilde R(z)$ on twelve ports;
- a local boundary Lagrangian producing the environmental couplings;
- a Standard-Model/Furey identification of the extra response ports;
- protection of coherence against actual bath tracing;
- a proof that the entire passive-loss quadrant has positive $P_k$.

These are physical and analytic gates, not missing finite-group algebra.

## 8. Stop-everything and falsification criteria

**Local-realization trigger:** construct a passive reciprocal twelve-port state-space model whose checkpoint matrices are $\widetilde R$ and $\widetilde H$.

**Typed-port trigger:** derive the three character sectors from the mediator-root/Furey middle-frame response without adding matter species.

**Coherence trigger:** identify a defect or symmetry that prevents the environmental sectors from being irreversibly traced during one selector cycle.

**Group falsifier:** exact enumeration of the stated matrices produces anything other than eighteen elements.

**Compression falsifier:** the explicit isometry fails either $J^*\widetilde RJ=I_2\oplus C$ or $\widetilde HJ=JH_{m phys}$.

**Ontology warning:** infer twelve microscopic particles from a twelve-dimensional minimal coherent dilation.

## 9. Verdict

| Question | Verdict |
|---|---|
| Does the lossy reduced four-carrier obey the finite group law? | **no** |
| Is it the compression of an exact order-18 unitary representation? | **yes** |
| Does the enlarged handle act exactly on the embedded physical carrier? | **yes** |
| Is the strict-loss witness explicitly certified? | **yes, in dimension twelve** |
| Is the construction local, causal and Standard-Model typed? | **not yet** |

## 10. Position in the corpus

- [active order-three Naimark dilation](929_the_lossy_active_cycle_has_an_exact_six_port_order_three_naimark_dilation_but_the_handle_lift_is_not_automatic.md)
- [reduced passive-loss no-go](928_strict_passive_loss_destroys_exact_finite_order_in_the_reduced_selector_network.md)
- [lossless four-channel checkpoint network](925_the_dispersive_active_cycle_and_static_handle_form_one_lossless_network_realizing_the_order18_selector_only_at_the_checkpoint.md)
- [finite selector group and background torsor](../0700-0799/786_oriented_color_and_handle_exchange_generate_c3_times_s3_and_the_hyperbolic_checkpoint_has_a_regular_18_background_spurion_orbit.md)
- [degree-zero reciprocal-inner checkpoint transfer](931_the_enlarged_order18_checkpoint_is_a_constant_reciprocal_inner_network_but_not_yet_a_dilation_of_the_full_dispersive_law.md)
