# The Two-Face Sideband Cycle Has a Fixed Ten-Port Conservative Dilation While Reality Prevents Double Counting

**Date:** 17 October 2026  
**Branches:** broadband response, fresh-environment cascade, real-time sidebands, local interface, active Coxeter cycle, and port counting  
**Claim status:** exact fixed-port construction; global minimality and microscopic environment typing remain open  
**Certificate:** [build_the_fixed_ten_port_conservative_dilation_of_the_two_face_sideband_cycle.mjs](scripts/build_the_fixed_ten_port_conservative_dilation_of_the_two_face_sideband_cycle.mjs)

> **Port-minimality correction:** document [950](950_spectral_factorization_compresses_each_squared_loss_channel_to_two_ports_and_the_full_two_face_cycle_to_six.md) replaces each stage-resolved six-port face by a minimal four-port spectral completion, reducing the same fresh-environment two-face architecture from ten to six ports. This ten-port realization remains exact and retains ordered stage labels, but it is not input-output minimal.

## Executive result

Document 948 gives each lossy analytic response face a fixed six-port conservative realization:

\[
2\text{ observed}+4\text{ environment}=6.
\]

The oriented sideband cycle uses two such faces.  If each traversal receives fresh environment inputs, they share the same two observed ports but require separate four-port loss environments.  Hence the full cascade has the fixed count

\[
\boxed{2+4+4=10\text{ ports}.}
\]

Embed the positive-frequency face on \(O\oplus E_+\), the negative-frequency face on \(O\oplus E_-\), and extend the interface grading \(D=\operatorname{diag}(1,-1)\) by the identity on both environments.  The ten-port unitary

\[
\widetilde{\mathcal C}(\omega)
=
\widetilde D\,widetilde S_-(-\omega)\,
\widetilde D\,\widetilde S_+(\omega)
\]

has observed compression

\[
J^*\widetilde{\mathcal C}(\omega)J
=D S_{\rm obs}(-\omega)D S_{\rm obs}(\omega)
\]

exactly.  At the lossless silver-ratio checkpoint this compression is the order-three \(A_2\) Coxeter element.

The construction does **not** turn conjugation into a complex-linear channel.  The same real six-port system already obeys

\[
S_6(-\omega)=\overline{S_6(\omega)}.
\]

Thus the negative sideband is fixed by real-time reality.  A twelve-complex-port sideband double would be a useful bookkeeping space, but half of it is constrained and must not be counted as new matter.

## 1. Why ten ports, not twelve independent ports

One face contains two observed channels and four environment channels: two ordered stages for each of the normal and tangent eigenchannels.  In a sequential two-face experiment the observed output of the first face becomes the observed input of the second.  The observed pair is therefore shared.

Fresh environment inputs, however, cannot be shared silently.  Reusing them would permit amplitude emitted on the first face to re-enter the second face and would generally add cross terms to the desired compressed product.  Keeping the two environments distinct gives

\[
O\oplus E_+\oplus E_-
\cong\mathbb C^2\oplus\mathbb C^4\oplus\mathbb C^4.
\]

This proves ten ports for the canonical fresh-environment cascade.  It does not prove that every possible joint realization needs ten.

## 2. Exact compression identity

Let \(J:O\hookrightarrow O\oplus E_+\oplus E_-\) be the fixed observed embedding.  Extend the first six-port face by the identity on \(E_-\), and the second by the identity on \(E_+\).  Because the second face never acts on \(E_+\), and its own environment input begins in \(E_-\), block multiplication gives

\[
J^*\widetilde S_-\widetilde S_+J
=(J^*\widetilde S_-J)(J^*\widetilde S_+J).
\]

Inserting the two observed \(D\) operations yields the displayed sideband-cycle compression.  Every factor in the ten-port product is unitary for real frequency, so the full cascade is unitary even when its observed corner is strictly contractive.

## 3. Relation to the local real interface

Document 908 supplies the local matching condition

\[
q_2=Dq_1,
\qquad p_2=Dp_1
\]

for real neutral fields.  Fourier reality supplies \(K\):

\[
q_2(-\omega)=D\overline{q_1(+\omega)}.
\]

The ten-port network supplies the conservative propagation and loss routing on both sides of that interface.  The interface supplies the real-structure identification.  These are complementary operations; neither should be asked to manufacture the other.

## 4. The lossless and lossy regimes

At \(\ell_n=\ell_t=0\), all four environment couplings on each face vanish.  At \(\omega_0=1\) with pole scales \(1+\sqrt2\) and \(\sqrt2-1\), the observed cycle obeys

\[
\mathcal C^3=I_2.
\]

For strict loss, the ten-port dynamics remains exactly unitary, but the observed two-port cycle is contractive and need not have finite order.  This is precisely the distinction established earlier: group closure survives in the enlarged conservative system only when the complete environment action is retained; it is not a law of the reduced lossy corner.

## 5. What this advances

- a fixed-port broadband conservative construction now covers the ordered two-face response cycle;
- the positive and negative sideband faces use one real transfer law rather than two unrelated fits;
- the local \(DK\) interface and passive-loss dilation coexist without violating the no-conjugation theorem;
- the lossless observed checkpoint recovers exact order three;
- the independent environment count is explicit.

## 6. What remains open

- global minimality below ten ports through a joint, non-cascade realization;
- a reflection-equivariant action on the eight environment ports;
- identification or distinction of the face environments from the two-dimensional Galois trace pair;
- a fixed intertwiner to the twelve-port order-18 character dilation;
- microscopic derivation of the interface and the hyperbolic loss rates;
- extension from the active cycle to the neutral plane and full handle-bearing selector.

## 7. Stop-everything and falsification criteria

**Joint-minimality trigger:** a realization theorem proves that the two faces can share an environment without altering the compressed product and reduces the port count below ten.

**Trace-sector trigger:** the eight stage/environment ports reduce covariantly to repeated appearances of the two Galois trace modes with the exact ninth-root traversal.

**Full-selector trigger:** the ten-port active construction and the neutral handle sew into one fixed rational-inner dilation satisfying the complete order-18 relations.

**Cross-term falsifier:** environment ports are recycled between faces but the induced observed cross terms are omitted.

**Reality-counting falsifier:** the constrained negative sideband is counted as an independent particle or second Standard-Model carrier.

**Finite-order overclaim:** strict-loss observed compression is claimed to retain exact \(C_3\) closure.

## 8. Verdict

| Question | Verdict |
|---|---|
| Is there a fixed conservative dilation of the ordered two-face response? | **yes, ten ports in the fresh-environment construction** |
| Is its observed corner exactly the desired sideband cycle? | **yes** |
| Does it recover exact \(C_3\) at the lossless checkpoint? | **yes** |
| Does the negative sideband add independent matter? | **no; it is reality-constrained** |
| Is ten globally minimal? | **not proved** |
| Is the full handle-bearing selector dilated broadband? | **not yet** |

## 9. Position in the corpus

- [six-port broadband face dilation](948_each_lossy_response_face_has_a_fixed_six_port_rational_inner_dilation_with_two_positive_environment_rates.md)
- [local real sideband interface](908_a_local_real_interface_supplies_the_antiunitary_sideband_twist_and_closes_the_boundary_monodromy_model.md)
- [no unitary generation of conjugation](907_a_neutral_idler_swap_routes_but_cannot_generate_the_antiunitary_sideband_sewing.md)
- [lossless sideband Coxeter cycle](904_a_sideband_reversing_rational_inner_boundary_cycle_realizes_the_exact_a2_coxeter_element_with_positive_pole_scales.md)
- [strict-loss finite-order no-go](928_strict_passive_loss_destroys_exact_finite_order_in_the_reduced_selector_network.md)
