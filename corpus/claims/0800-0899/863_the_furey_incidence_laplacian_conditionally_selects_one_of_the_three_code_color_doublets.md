# The Furey Incidence Laplacian Conditionally Selects One of the Three Code Color Doublets

**Date:** 17 October 2026  
**Branches:** Furey incidence, Standard-Model code, color multiplicity, minimal Kraus environment, and Hilbert–Schmidt geometry  
**Claim status:** exact conditional bridge at environment-representation level; physical response realization remains open  
**Certificate:** [project_furey_incidence_onto_the_three_code_color_doublets.mjs](../../../verification/project/project_furey_incidence_onto_the_three_code_color_doublets.mjs)

## Executive result

The established Furey incidence Laplacian resolves the multiplicity obstruction found in document 861—provided the gauge-neutral code space is compressed using the coordinate/Hilbert–Schmidt metric.

Let \(Q_{\rm std}\) be the orthogonal projector onto the six-real-dimensional standard-color part of the gauge-neutral punctured code. Let

\[
\Lambda
=5(P_{u^c}+P_d+P_u)+P_{d^c}
\]

on the colored sectors. Then the compressed operator

\[
\Lambda_{\rm comp}
=Q_{\rm std}\Lambda Q_{\rm std}
\]

has real spectrum

\[
\boxed{(2,2,5,5,5,5)}.
\]

Equivalently, on the three-dimensional complex multiplicity space its spectrum is

\[
\boxed{(2,5,5)}.
\]

There is exactly one simple complex eigendirection, whose realification is one canonical \(C_3\) doublet relative to the declared metric and incidence data.

This supplies the first concrete candidate for the two-dimensional minimal handle environment derived from the punctured Standard-Model/Furey code.

## 1. Why compression is necessary

The incidence Laplacian commutes with the color cycle, because it is constant on every color orbit. It does not preserve the gauge-neutral relation space:

\[
(I-Q_{\rm std})\Lambda Q_{\rm std}\ne0.
\]

The largest entry of the leakage operator in the exact coordinate calculation is \(1/2\).

Therefore one cannot simply restrict \(\Lambda\) to the code kernel. The correctly typed self-adjoint operator is the orthogonal compression

\[
Q_{\rm std}\Lambda Q_{\rm std}.
\]

This uses additional metric data.

## 2. Why the metric is natural but still conditional

The five-bit/code basis consists of fifteen coordinate vectors. Under the established Furey/code intertwiner, these are mapped bijectively to fifteen matrix units. Both bases carry a natural orthonormal metric:

- the coordinate inner product on the code;
- the Hilbert–Schmidt inner product on the matrix units.

With these choices the intertwiner is an isometry, so \(Q_{\rm std}\) is not an arbitrary numerical projector.

The remaining physical caveat is different: the programme has not shown that the interacting stress/response action uses this finite Hilbert–Schmidt metric without wavefunction, threshold or spectral renormalization. The selection is canonical in the finite algebraic model, not yet protected in the full dynamics.

## 3. Basis-free selected-doublet projector

On the color-standard sector,

\[
\Lambda=5I-4P_{d^c}.
\]

Define

\[
T_{d^c}=Q_{\rm std}P_{d^c}Q_{\rm std}.
\]

The exact calculation gives

\[
\operatorname{rank}T_{d^c}=2,
\qquad
T_{d^c}^2=\frac34T_{d^c}.
\]

Hence

\[
\boxed{
E_{\rm inc}
=\frac43Q_{\rm std}P_{d^c}Q_{\rm std}
}
\]

is an idempotent rank-two projector. It commutes with color and its range is precisely the eigenvalue-two doublet of \(\Lambda_{\rm comp}\).

The selection is therefore not an eigenvector chosen by numerical diagonalization. It has an explicit invariant projector formula.

## 4. Robustness across the two incidence contractions

The programme previously distinguished:

- a deduplicated incidence contraction;
- a multiplicity-preserving Hilbert–Schmidt contraction.

They differ on the fixed charged-lepton coordinate but have identical weights on all four colored triplet sectors. Their compressions to the color-standard gauge kernel are exactly equal.

Thus the selected doublet is insensitive to that earlier normalization ambiguity.

It can still move if independent colored-sector wavefunction or response weights renormalize the finite metric.

## 5. Relation to the minimal handle environment

The selected range \(\operatorname{ran}E_{\rm inc}\) and the minimal handle Kraus-label space are both:

- real two-dimensional;
- equipped with positive inner products;
- standard representations of \(C_3\).

Therefore a \(C_3\)-equivariant orthogonal identification exists. Its continuous rotation ambiguity is not automatically physical: minimal Kraus representations are themselves unique only up to orthogonal/unitary mixing of the environmental labels, and such mixing leaves the completely positive channel unchanged.

This closes the dimension and representation part of the bridge:

\[
\boxed{
\text{punctured code + Furey incidence + HS compression}
\longrightarrow
\text{minimal }C_3\text{ environment type}.
}
\]

It does not yet derive the actual Kraus operators \(K_1,K_2\) acting on the four-real carrier. The code doublet labels an environment; a source-to-carrier coupling must still turn those labels into the established handle operations.

## 6. Yukawa Gram comparison

A simplified Higgs-dressed diagonal Gram operator assigns one weight \(y_u^2\) to \((u^c,u)\) and one \(y_d^2\) to \((d,d^c)\).

- If \(y_u^2=y_d^2\), its compression is scalar on all three multiplicities and selects nothing.
- If \(y_u^2\ne y_d^2\), the three complex eigenvalues are generically distinct.
- For \((y_u^2,y_d^2)=(4,1)\), they are \((1,5/2,4)\).
- For \((100,1)\), they are \((1,101/2,100)\).

Thus Yukawa breaking can completely frame the multiplicity space, but the frame depends on empirical couplings. The incidence projector is more structural because its simple low line follows from the ternary incidence weights.

## 7. Updated implication chain

The current exact chain is

\[
\begin{aligned}
\text{punctured generation}
&\longrightarrow \mathbf2^{\oplus3}
&&\text{after gauge neutrality},\\
\text{Furey incidence + HS metric}
&\longrightarrow \mathbf2\oplus(\mathbf2^{\oplus2})
&&\text{with eigenvalues }2,5,\\
E_{\rm inc}
&\longrightarrow \text{one selected }\mathbf2,\\
\text{Stinespring uniqueness}
&\longrightarrow \text{abstract handle-environment type}.
\end{aligned}
\]

The missing arrow is

\[
\operatorname{ran}E_{\rm inc}
\longrightarrow
\{K_1,K_2\}\subset\operatorname{End}(\mathbb R^4).
\]

## 8. Stop-everything and falsification criteria

**Positive trigger:** derive a bilocal source map

\[
\Gamma:\operatorname{ran}E_{\rm inc}
\longrightarrow
\operatorname{span}\{K_1,K_2\}
\]

that is \(C_3\)-equivariant, isometric, gauge neutral and fixed by the Furey/TRO response rather than chosen by hand.

**Dynamic trigger:** show that radiative or spectral renormalization preserves \(E_{\rm inc}\), equivalently leaves its simple eigenvalue separated from the high multiplicity plane.

**Arithmetic trigger:** reduce the integral form of \(E_{\rm inc}\) modulo three and recover a canonical \(J_2\) subquotient of the previously found \(J_3\) filtration.

**Negative trigger:** physically required response metrics mix the low line with the eigenvalue-five plane without a protecting symmetry.

**Falsifier:** the claim that \(\Lambda\) itself preserves the gauge-neutral code kernel. It does not; only the metric compression is well typed.

## 9. Verdict

The code-to-environment branch has moved from an unselected multiplicity-three obstruction to a conditional rank-two selection theorem. The Furey incidence structure supplies precisely the extra operator that color and anomaly constraints lacked.

The bridge is now credible at representation level, but remains conditional on the Hilbert–Schmidt compression and incomplete at action level.

## 10. Dependencies

- [three-doublet obstruction](861_the_punctured_generation_code_contains_three_gauge_compatible_color_doublets_and_does_not_select_the_unique_handle_environment.md)
- [minimal handle environment](859_the_three_handle_class_sum_has_a_minimal_two_dimensional_relational_environment.md)
- [Furey incidence Laplacian](../0600-0699/629_the_furey_incidence_laplacian_derives_the_lepton_projector_but_the_raw_response_is_flat.md)
- [exact Furey/code intertwiner](../0400-0499/412_the_completed_furey_tro_carries_the_so10_five_bit_code_as_a_cartan_ternary_intertwiner.md)

