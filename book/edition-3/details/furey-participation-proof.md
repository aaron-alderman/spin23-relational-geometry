# Furey participation: closure certificate

_The typed calculation behind the ten-generator claim_

> **Claim status — [✓ Established](../reading-key/status-established.md)** — Follows from declared assumptions and has an inspectable certificate.

> **Proof function — [⌕ Auditor](../reading-key/move-auditor.md)** — checks assumptions, certificates, counterexamples and stopping rules.

> **Claim under audit.** On the declared four-real-dimensional response carrier, the three typed generators \(\mathcal A\), \(\mathcal H\) and \(\mathcal C\) generate all of \(\mathfrak{sp}(4,\mathbb R)\). The Furey-shaped source product exponentiates to \(\mathcal C\) on the aggregate channel.

## Start with the picture

Think of three control knobs acting on the same two-channel instrument. One turns phase, one stretches the two channels in opposite ways, and one continuously mixes the channels. The certificate checks that switching these controls in different orders produces ten independent motions—the full set allowed by the declared symplectic carrier.

## Objects and assumptions

| Item | Declared meaning |
|---|---|
| Carrier | \(\mathbb R^2_{\mathrm{phase}}\otimes\mathbb R^2_{\mathrm{channel}}\), with every generator written in the same ordered basis. |
| Preserved form | \(\Omega=J\otimes I\), where \(J\) is the two-dimensional quarter-turn matrix. |
| Typed generators | \(\mathcal A=J\otimes e_-\), \(\mathcal H=K\otimes D\) and \(\mathcal C=I\otimes\varepsilon\), with \(e_-=(I-D)/2\). |
| Meaning of closure | Real linear span after repeated matrix commutators \([X,Y]=XY-YX\). |

## Certificate chain

1. Commuting \(\mathcal C\) with \(\mathcal A\) supplies \(J\otimes X\); commuting once more supplies \(J\otimes D\). Combining \(J\otimes D\) with \(\mathcal A\) supplies \(J\otimes I\).
2. Commuting \(\mathcal C\) with \(\mathcal H\) supplies \(K\otimes X\).
3. The phase turn \(J\otimes I\) rotates \(K\) into \(X\), supplying \(X\otimes D\) and \(X\otimes X\).
4. Further commutators supply \(K\otimes I\) and \(X\otimes I\). Together with the original terms, these form \(I\otimes\varepsilon\) plus \(\{J,X,K\}\otimes\{I,X,D\}\).
5. Those ten matrices are linearly independent and preserve \(\Omega\). Since \(\dim\mathfrak{sp}(4,\mathbb R)=10\), the generated algebra is exactly \(\mathfrak{sp}(4,\mathbb R)\).

## Necessity check

| Input set | Closure dimension | Reading |
|---|---:|---|
| Remove \(\mathcal A\) | 3 | The Jordan translation is necessary. |
| Remove \(\mathcal H\) | 4 | The split dilation is necessary. |
| Remove \(\mathcal C\) | 4 | The continuous channel rotation is necessary. |
| Keep all three | 10 | Full \(\mathfrak{sp}(4,\mathbb R)\) closure. |

## The source flow reaches the channel generator

For the source-space product \(G_{\mathrm{src}}=F_Cp\), the certificate checks \(G_{\mathrm{src}}^{\mathsf T}=-G_{\mathrm{src}}\) and \(G_{\mathrm{src}}^2=-I\), hence \(\exp(tG_{\mathrm{src}})=\cos(t)I+\sin(t)G_{\mathrm{src}}\). The aggregate map \(A\) obeys \(AG_{\mathrm{src}}=\varepsilon A\), so \(A\exp(tG_{\mathrm{src}})=\exp(t\varepsilon)A\). Realification is precisely the channel generator \(\mathcal C\).

> **Authority boundary.** This proves an algebraic participation result on the stated carrier. It does not derive the source product from a local microscopic action; establish gauge, Lorentz or canonical-anticommutation consistency; select a vacuum; recover the Standard Model; or show that nature realizes this carrier.

## Executable and inspectable certificates

- [generate_full_sp4_from_turn_split_dilation_and_channel_rotation.mjs](../../../verification/generate/generate_full_sp4_from_turn_split_dilation_and_channel_rotation.mjs)
- [exponentiate_the_furey_response_product_into_the_sp4_channel_flow.mjs](../../../verification/exponentiate/exponentiate_the_furey_response_product_into_the_sp4_channel_flow.mjs)
- [verify-furey-weak-jordan-ladder.mjs](../../../verification/verify/verify-furey-weak-jordan-ladder.mjs)

## Controlling research documents

- [1058_a_three_generator_jordan_furey_recursion_closes_all_of_sp4_but_requires_the_furey_channel_rotation_as_a_continuous_flow.md](../../../corpus/claims/1000-1099/1058_a_three_generator_jordan_furey_recursion_closes_all_of_sp4_but_requires_the_furey_channel_rotation_as_a_continuous_flow.md)
- [1059_the_linear_furey_product_FCp_exponentiates_exactly_to_the_missing_continuous_sp4_channel_rotation_but_its_action_term_is_open.md](../../../corpus/claims/1000-1099/1059_the_linear_furey_product_FCp_exponentiates_exactly_to_the_missing_continuous_sp4_channel_rotation_but_its_action_term_is_open.md)
- [1060_a_positive_first_order_response_pulse_generates_the_full_furey_channel_flow_without_bulk_degeneracy_but_needs_microscopic_charge_completion.md](../../../corpus/claims/1000-1099/1060_a_positive_first_order_response_pulse_generates_the_full_furey_channel_flow_without_bulk_degeneracy_but_needs_microscopic_charge_completion.md)
- [69_furey_weak_jordan_ladder_spin23.md](../../../corpus/claims/0000-0099/69_furey_weak_jordan_ladder_spin23.md)

---

[← Return to the chapter](../chapters/04-furey-interface.md#the-exact-participation-result) · [Book contents](../README.md)
