# The Basis-Independent Middle-Slot Frame of the Furey Triple Selects the Same Signed \(K_3\) Active Module

**Date:** 17 October 2026  
**Branches:** relational middle operator, Jordan/TRO triple response, basis-independent action candidate, signed synchronization, and physical selector  
**Claim status:** exact Hilbert--Schmidt frame theorem; Lorentzian action and quantum-response interpretation remain open  
**Certificate:** [classify_basis_invariant_frame_contractions_of_the_furey_ternary_response_tensor.mjs](../../../verification/classify/classify_basis_invariant_frame_contractions_of_the_furey_ternary_response_tensor.mjs)

## Executive result

The active selector survives replacement of the earlier positive-diagonal incidence bookkeeping by a canonical, basis-independent Hilbert--Schmidt contraction—provided the candidate variable occupies the distinguished middle slot of the Furey triple.

Let

\[
\mathcal B(A,X,Z)
=A\,\widetilde X\,Z+Z\,\widetilde X\,A,
\]

where \(\widetilde X\) is the established Furey middle involution. Define the middle-slot frame quadratic form

\[
\boxed{
q_{\rm mid}(X)
=
\sum_{a,z}
\left\|\mathcal B(e_a,X,e_z)\right\|_{\rm HS}^2,
}
\]

for any orthonormal matter basis \(\{e_a\}\). Because every free tensor index is contracted, the result is independent of the chosen orthonormal coordinates.

Its exact sector weights are

\[
\boxed{
Q:14,qquad
u^c:14,qquad
d^c:4,qquad
L:0,qquad
e^c:6.
}
\]

The quark-doublet block \(Q\) contains both \(u\) and \(d\). Therefore on the color-standard cycle kernel,

\[
(u,d,u^c,d^c)=(14,14,14,4).
\]

By the theorem of document 877, these weights compress to

\[
\boxed{
S M_{\rm mid}S
=\frac{13}{2}I
+\frac{5}{2}L_{K_3}.
}
\]

The spectrum is

\[
\left(\frac{13}{2},14,14\right),
\]

and the selected integral line is exactly the same \((1,1,-1)\) line as before.

This gives a direct mathematical realization of the user’s original relational form \(A,X,B\): the middle operator \(X\) has a canonical response norm whose low mode is the active augmentation carrier.

## 1. The response tensor

The unsymmetrized Furey composition uses

\[
A\,\widetilde X\,Z.
\]

The outer-symmetric response tensor is

\[
\mathcal B(A,X,Z)
=A\widetilde XZ+Z\widetilde XA.
\]

For fixed \(X\), this is a linear map

\[
\mathcal B_X:\mathcal T\otimes\mathcal T\to\mathcal L,
\]

where \(\mathcal T\) is the matter triple space and \(\mathcal L\) its linking-algebra output space.

Then

\[
q_{\rm mid}(X)=\|\mathcal B_X\|_{\rm HS}^2.
\]

Equivalently, the associated positive frame operator is

\[
F_{\rm mid}=\mathcal B^*\mathcal B
\]

with contraction over both outer inputs and the output.

This construction does not select a matrix-unit basis. Any orthonormal change of coordinates transforms the tensor and contracted indices covariantly, leaving \(q_{\rm mid}\) unchanged.

## 2. Why the middle slot is genuinely distinguished

Four related contractions were audited:

| contraction | \(Q\) | \(u^c\) | \(d^c\) | preserves required primary equality? |
|---|---:|---:|---:|---:|
| fully polarized frame | \(10.5\) | \(10\) | \(2.75\) | no |
| first outer slot | \(14\) | \(12\) | \(5\) | no |
| middle slot | \(14\) | \(14\) | \(4\) | **yes** |
| diagonal basis rays | \(7\) | \(7\) | \(1\) | yes, but not basis independent |

The equality needed by the active selector does not arise from every natural contraction. It arises in the middle slot specifically.

This is important for the “relational carrier” interpretation. The central \(X\) in

\[
A\,X\,B
\]

is not just one of three interchangeable arguments. It is conjugated by the Furey involution and is the variable whose full outer response norm respects the required \(Q=u^c\) incidence equality.

## 3. Compression to the cycle kernel

On independent coordinates \(x=(u,d,u^c)\), cycle closure again gives

\[
d^c=v^Tx,
\qquad
v=(1,1,-1).
\]

The physical coordinate Gram is

\[
H=I+vv^T.
\]

The middle-frame response Gram is

\[
K_{\rm mid}=14I+4vv^T.
\]

Therefore

\[
\begin{aligned}
M_{\rm mid}
&=H^{-1}K_{\rm mid}\\
&=14I-\frac52vv^T.
\end{aligned}
\]

After sign switching,

\[
SM_{\rm mid}S
=\frac{13}{2}I+\frac52L_{K_3}.
\]

The low eigenspace and integral projector are unchanged:

\[
E_{\rm inc}=\frac13vv^T\otimes1_I.
\]

Only the spectral normalization changes.

## 4. Robustness across two constructions

There are now two independently specified positive operators selecting the same copy:

### Positive-diagonal incidence classifier

\[
(A,E)=(5,1),
\qquad
SM S=2I+L_{K_3}.
\]

### Full middle-slot frame

\[
(A,E)=(14,4),
\qquad
SM_{\rm mid}S=\frac{13}{2}I+\frac52L_{K_3}.
\]

Both satisfy

\[
A>E,
\qquad
a=b=c=A.
\]

Hence both select exactly the same primitive augmentation copy. This shows that the projector is more robust than the original numerical spectrum.

The physically meaningful candidate is now the middle-slot frame because it is a complete tensor contraction rather than a selection of positive diagonal response components.

## 5. What remains nonphysical

The Hilbert--Schmidt frame is canonical as an internal finite-dimensional quadratic form. That does not automatically make it the quadratic action for chiral Standard-Model fields.

Still required:

- Lorentz and spacetime typing of the field/operator represented by \(X\);
- gauge-invariant dressing where necessary;
- a spectral or path-integral derivation of the Hilbert--Schmidt trace;
- normalization and dimensions of the response coefficient;
- proof that quantum corrections preserve the middle-slot frame or at least its signed row sums;
- coupling to the neutral fixed complement and symplectic sewing.

The correct claim is therefore:

> a canonical internal response norm exists and selects the desired active module;

not:

> the Standard Model action already contains this term.

## 6. Relation to Jordan-triple recursion

This construction supplies a concrete recursive verb:

\[
X
\longmapsto
\mathcal B_X
\longmapsto
\mathcal B_X^*\mathcal B_X
\longmapsto
\ker\bigl(F_{\rm mid}-\lambda_{\min}\bigr).
\]

In words:

1. place the candidate carrier in the relational middle slot;
2. evaluate all possible outer relations;
3. form their positive frame operator;
4. select the synchronized low module after cycle closure.

This is recognizably a nested-dolls construction: the middle operator is characterized by the totality of relations it mediates.

It also explains why simply symmetrizing all three slots loses the exact equality: full symmetrization erases the special role of the relational carrier.

## 7. Stop-everything and falsification criteria

**Action trigger:** the middle-slot Hilbert--Schmidt norm appears as the quadratic term obtained by integrating out the two outer Furey/Jordan legs.

**Spectral trigger:** a Källén--Lehmann or Schur-complement calculation yields \(F_{\rm mid}=\mathcal B^*\mathcal B\) with positive residue.

**Ward trigger:** gauge/Higgs-dressed corrections preserve equal signed row sums even when the eigenvalues renormalize.

**Sewing trigger:** the frame construction extends to the Higgs-dressed neutral pair and generates the invariant alternating form or handle exchange.

**Negative trigger:** the physically correct inner product is not the invariant Hilbert--Schmidt metric and splits the three primary weights.

**Falsifier:** presenting the fully polarized or first-slot contraction as equivalent. They fail the exact primary equality and rotate the selected copy.

## 8. Verdict

The relational middle slot now has a canonical selector:

\[
\boxed{
q_{\rm mid}(X)
=\sum_{A,B}\|A\widetilde X B+B\widetilde X A\|^2
\Longrightarrow
(14,14,14,4)
\Longrightarrow
\ker(BS)\otimes I.
}
\]

This is the strongest current bridge from Jordan-triple composition to the active integral module. It replaces coordinate-positive extraction by a full frame norm while preserving the exact signed-\(K_3\) projector.

## 9. Dependencies

- [triple-incidence/cycle-closure derivation](877_equal_furey_triple_incidence_weights_and_cycle_closure_force_the_signed_k3_selector_and_isolate_the_exact_yukawa_obstruction.md)
- [signed-\(K_3\) synchronization theorem](876_the_incidence_selector_is_a_signed_k3_synchronization_laplacian_and_its_factor_three_is_the_sum_of_three_locked_matter_nodes.md)
- [original Furey incidence classifier](../0600-0699/629_the_furey_incidence_laplacian_derives_the_lepton_projector_but_the_raw_response_is_flat.md)
- [Jordan-triple/Feshbach response](../0600-0699/668_the_jordan_triple_is_the_polarization_of_feshbach_relational_self_energy.md)
- [physical protection boundary](867_the_incidence_selected_doublet_is_gap_stable_but_not_exactly_protected_against_yukawa_response_mixing.md)
