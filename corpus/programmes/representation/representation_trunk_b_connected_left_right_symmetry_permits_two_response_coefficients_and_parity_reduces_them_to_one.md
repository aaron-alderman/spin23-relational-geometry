# Connected Left–Right Symmetry Permits Two Response Coefficients; Parity Reduces Them to One

**Date:** 17 October 2026  
**Scope:** representation/intertwiner trunk  
**Claim status:** complete invariant-form calculation on the minimal left–right carrier

## Result in plain language

The phrase “left–right symmetry” can mean two different things:

- the connected gauge group (SU(2)_L\times SU(2)_R);
- that group plus a separate mirror operation exchanging left and right.

They do not impose the same constraint.

This is also how the left–right construction is presented in [Boyle, *The Standard Model, the Exceptional Jordan Algebra, and Triality*](https://arxiv.org/abs/2006.16265): the connected (SU(3)\times SU(2)_L\times SU(2)_R\times U(1)) group is derived first, while the exchange of left and right fields is introduced as an additional (\mathbb Z_2) combined with spatial parity.

Imagine two identical rulers, one marked (L) and one marked (R). Requiring that each ruler can be rotated without changing its readings does not require the two rulers to use the same unit. A mirror operation that physically swaps the rulers does.

The exact minimal calculation gives:

\[
SU(2)_L\times SU(2)_R:quad 2\text{ coefficients},
\]

\[
(SU(2)_L\times SU(2)_R)\rtimes\mathbb Z_2^{LR}:quad 1\text{ coefficient}.
\]

## 1. Minimal carrier

Take

\[
V=(\mathbf2,\mathbf1)\oplus(\mathbf1,\mathbf2)
=V_L\oplus V_R.
\]

Each (SU(2)) fundamental has its invariant alternating tensor (\epsilon). On all of (\Lambda^2V^*), the certificate solves the infinitesimal invariance equations

\[
X^TK+KX=0
\]

for generators of (\mathfrak{sl}_2\oplus\mathfrak{sl}_2). The invariant space is exactly

\[
\boxed{
(\Lambda^2V^*)^{SU(2)_L\times SU(2)_R}
=\mathbb C\epsilon_L\oplus\mathbb C\epsilon_R.
}
\]

Hence the general minimal response is

\[
K=a_L\epsilon_L+a_R\epsilon_R.
\]

The connected gauge symmetry does not relate (a_L) and (a_R), because (V_L) and (V_R) are inequivalent irreducible representations of the product group.

## 2. What the simultaneous Weyl reflection actually does

The simultaneous nontrivial Weyl operation exchanges the two components inside (V_L) and the two components inside (V_R). This is the operation needed to exchange the up/down and neutrino/electron entries after (\nu_R) is supplied.

But it remains block diagonal in

\[
V_L\oplus V_R.
\]

The certificate adds this finite transformation to the invariant equations and the dimension remains two. It preserves (\epsilon_L) and (\epsilon_R) separately:

\[
a_L\epsilon_L+a_R\epsilon_R
\longmapsto
a_L\epsilon_L+a_R\epsilon_R.
\]

Therefore the simultaneous Weyl element exchanges the **components used to build the two handles**, but it does not by itself identify the left and right response normalizations.

This is the missing distinction in any argument that jumps directly from the left–right gauge envelope to one microscopic coefficient.

## 3. Adding genuine left–right parity

Let (P_{LR}) exchange the two summands:

\[
P_{LR}:V_L\leftrightarrow V_R.
\]

Then

\[
P_{LR}^T\epsilon_LP_{LR}=\epsilon_R,
\qquad
P_{LR}^T\epsilon_RP_{LR}=\epsilon_L.
\]

Invariance under (P_{LR}) forces

\[
a_L=a_R,
\]

and the invariant line becomes

\[
\boxed{K=a(\epsilon_L+\epsilon_R).}
\]

Thus one common coefficient is obtained only after adding a discrete left–right interchange, an equivalent source-derived intertwiner, or dynamics that imposes the same relation.

## 4. Relation to the two Furey handles

The earlier handle calculation remains valid on a response carrier where the physical map to two handles and the handle-swap action have already been assumed. On that reduced carrier, exchange invariance forces equal handle areas.

The present calculation sits one level earlier. It asks whether the connected microscopic gauge group supplies that single normalization before the matter-to-carrier map is known. It does not:

\[
\boxed{
\text{connected left–right gauge covariance}
\not\Rightarrow
\text{one microscopic response coefficient}.
}
\]

The exact conditional chain is instead

\[
\begin{aligned}
&SU(2)_L\times SU(2)_R
&&\Rightarrow a_L\epsilon_L+a_R\epsilon_R,\\
&+\;P_{LR}\text{ or equivalent intertwiner}
&&\Rightarrow a_L=a_R,\\
&+\;\text{typed rank-four response map}
&&\Rightarrow \text{one equal-area handle form}.
\end{aligned}
\]

## 5. Multiplicity warning

The calculation uses one left and one right doublet. Realistic quark/lepton and generation multiplicities enlarge the commutant and can only add coefficients unless color–lepton symmetry, flavor symmetry or a specified interaction relates them. Therefore two is a **minimal** freedom count, not a generous upper bound.

Pati–Salam (SU(4)) can relate quark and lepton component normalizations above its breaking scale, but it still does not turn connected (SU(2)_L\times SU(2)_R) into the discrete interchange (P_{LR}). After ordinary symmetry breaking the independent low-energy coefficients reopen.

There is also a response-type boundary. The certificate classifies complex alternating bilinear forms, equivalently the sector-normalization problem before realifying the pseudoreal doublets. It also separately solves the full real alternating-form problem. On the eight-real-dimensional realification, the quaternionic commutants give six invariant real two-forms; ordinary block-swap parity reduces these to three, not one:

\[
\dim(\Lambda^2V_{\mathbb R}^*)^{SU(2)_L\times SU(2)_R}=6,
\qquad
\dim(\cdots)^{P_{LR}}=3.
\]

That strengthens the non-uniqueness conclusion. The phrase “exactly two” belongs to the stated minimal complex-bilinear sector problem—not to every possible real response construction. A claimed four-real-dimensional symplectic carrier still needs the separate typed quotient/intertwiner.

## 6. Go/no-go verdict

| Question | Verdict |
|---|---|
| Does (SU(2)_R+\nu_R) complete the component exchange? | **Yes** |
| Does the simultaneous Weyl element force one (L/R) response coefficient? | **No** |
| How many minimal connected-group coefficients survive? | **Two** |
| Does an added (L\leftrightarrow R) parity reduce them to one? | **Yes** |
| Is that parity guaranteed by the connected gauge group? | **No** |
| Is the matter-to-handle response map derived? | **No** |

The most valuable continuation is therefore not another group enlargement. It is to derive or rule out the physical map that makes (P_{LR}) act as the already-certified handle swap, including Higgs-breaking spurions and mixed response blocks.

## 7. Certificate

```powershell
node verification/verify/verify_representation_trunk_left_right_response_coefficients.mjs
```

The certificate solves the full six-dimensional complex alternating-form problem, verifies the two-dimensional connected invariant space, shows that the simultaneous Weyl element leaves it two-dimensional, and shows that left–right parity reduces it to one dimension. It then independently solves the 28-direction real alternating-form problem, giving dimensions six and three before and after ordinary block-swap parity.

## Related established results

- [Minimal left–right gauge envelope](../../claims/0700-0799/768_left_right_symmetry_is_the_minimal_gauge_envelope_of_the_furey_handle_exchange_but_equal_area_requires_an_invariant_response_phase.md)
- [Conditional equal-handle theorem](../../claims/0700-0799/769_an_intertwined_left_right_response_forces_equal_handle_areas_in_the_symmetric_phase_but_allows_odd_spurion_splitting.md)
- [Full alternating-form selector after the response action is supplied](../../claims/0700-0799/770_oriented_color_signed_reflection_and_left_right_handle_exchange_select_a_unique_full_symplectic_line_with_no_mixed_block_loophole.md)
- [Pati–Salam high-scale component lock](../../claims/0800-0899/852_pati_salam_su4_collapses_the_full_color_symplectic_pencil_to_the_equal_component_line_but_is_not_a_furey_tro_symmetry.md)
