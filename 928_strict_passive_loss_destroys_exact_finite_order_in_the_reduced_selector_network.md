# Strict Passive Loss Destroys Exact Finite Order in the Reduced Selector Network

**Date:** 17 October 2026  
**Branches:** passive loss, selector locking, open-system dilation, determinant obstruction, and experimental robustness  
**Claim status:** exact no-go for the minimal reciprocal passive-loss deformation, with a general strict-contraction interpretation  
**Certificate:** [prove_strict_passive_loss_destroys_exact_finite_order_in_the_reduced_selector_network.mjs](scripts/prove_strict_passive_loss_destroys_exact_finite_order_in_the_reduced_selector_network.mjs)

## Executive result

The exact locking curve of document 927 does not continue into the interior of the simplest passive lossy family.

Deform each squared Blaschke eigenchannel to

\[
f_j(\omega)
=
\left(
\frac{\omega-i\gamma_j e^{-\ell_j}}
{\omega+i\gamma_j e^{+\ell_j}}
\right)^2,
\qquad
\ell_j\ge0.
\]

This preserves analyticity and real-time frequency reality, while $\ell_j>0$ makes the boundary response strictly contractive. For the sideband-sewn cycle $C$,

\[
\det C
=
\prod_{j=n,t}
\left(
\frac{\omega^2+\gamma_j^2e^{-2\ell_j}}
{\omega^2+\gamma_j^2e^{+2\ell_j}}
\right)^2.
\]

If either loss parameter is positive, then

\[
0<\det C<1.
\]

But $C^3=I$ would require $(\det C)^3=1$. Therefore exact order three is impossible in the reduced strictly passive two-channel network. The selector lies on the lossless boundary of the passive response class.

## 1. Why phase retuning cannot repair loss

The lossless locking condition controlled a relative phase. Passive loss adds a radial contraction. Pole-ratio or operating-frequency adjustments can change the phase, but they cannot restore the determinant to one while every channel remains passive and at least one is strictly lossy.

This separates two questions:

- the phase equation $\sinh s=\cosh y$ determines the order-three angle;
- unit determinant requires losslessness of the observed two-channel cycle.

Both are necessary. The first cannot compensate for failure of the second.

## 2. General strict-contraction reading

The determinant proof is specific enough to be executable but expresses a broader fact. A finite-order complex matrix has eigenvalues that are roots of unity and hence has spectral radius one. A strictly contractive reduced scattering block has spectral radius below one. It cannot itself be a nontrivial finite-order element.

Thus exact selector monodromy and irreversible information loss cannot coexist on the same closed reduced carrier.

## 3. The legitimate escape hatch

A passive lossy response can be embedded in a larger lossless network carrying environmental output ports. Exact finite order could then act on the enlarged unitary scattering system, even though the observed two-channel compression is not finite order.

This possibility must be typed carefully:

- the environmental ports are response/bath degrees of freedom, not new Standard-Model particles;
- tracing them out destroys exact finite order in the reduced block;
- an experiment can at best see an approximate selector unless those ports are coherently included and recombined.

Balanced gain and loss can also restore determinant modulus one, but it leaves the strictly passive class and introduces stability/noise obligations. It is not a loophole to this no-go.

## 4. Consequence for protection

The checkpoint has three different robustness layers:

1. topology protects orientation-reversing component parity;
2. reciprocal/silver geometry protects frequency detuning and creates the locking curve;
3. exact finite order still requires losslessness on the complete carrier.

The third condition is a hard boundary, not another soft tuning direction.

## 5. Stop-everything and falsification criteria

**Dilation trigger:** construct a local lossless state-space dilation whose full monodromy has finite order and whose reduced block is the measured lossy response.

**Dark-mode trigger:** find a selector-invariant decoherence-free subspace on which the contraction becomes exactly inner.

**Loss-Ward trigger:** derive a symmetry forcing the relevant two response channels to have zero dissipative spectral density at the operating point.

**Determinant falsifier:** within the stated deformation with some $\ell_j>0$, a correctly computed cycle has determinant one.

**Reduced/full conflation:** infer exact finite order for a compressed observed block merely because a unitary dilation exists.

## 6. Verdict

| Question | Verdict |
|---|---|
| Does the exact locking curve survive strict passive loss in the reduced block? | **no** |
| Can phase retuning compensate for determinant contraction? | **no** |
| Is losslessness necessary for exact reduced finite order? | **yes** |
| Could an enlarged lossless network retain exact order? | **yes, conditionally** |
| Has the required physical dilation or dark sector been derived? | **not yet** |

## 7. Position in the corpus

- [exact selector-locking manifold](927_the_silver_checkpoint_is_the_vertex_of_an_exact_selector_locking_manifold_with_protected_tangent_and_unprotected_normal.md)
- [double-stationary silver checkpoint](926_the_reciprocal_silver_pole_pair_makes_the_selector_checkpoint_first_order_detuning_protected_but_not_broadband.md)
- [complete causal selector network](925_the_dispersive_active_cycle_and_static_handle_form_one_lossless_network_realizing_the_order18_selector_only_at_the_checkpoint.md)
- [constant lossless handle feedthrough](924_the_full_handle_graph_is_a_constant_reciprocal_rational_inner_feedthrough_in_the_unique_selector_metric.md)
- [six-port order-three Naimark dilation](929_the_lossy_active_cycle_has_an_exact_six_port_order_three_naimark_dilation_but_the_handle_lift_is_not_automatic.md)
