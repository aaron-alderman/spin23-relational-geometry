# Equal Furey Triple-Incidence Weights and Cycle Closure Force the Signed \(K_3\) Selector and Isolate the Exact Yukawa Obstruction

**Date:** 17 October 2026  
**Branches:** Jordan/TRO triple incidence, color-resolved Furey cycles, signed synchronization, Yukawa protection, and response dynamics  
**Claim status:** exact derivation from the established incidence classifier and cycle embedding; physical action/trace origin of that classifier remains open  
**Certificate:** [derive_signed_k3_selector_from_furey_triple_incidence_weights_and_cycle_closure.mjs](../../../verification/derive/derive_signed_k3_selector_from_furey_triple_incidence_weights_and_cycle_closure.mjs)

## Executive result

The signed multiplicity triangle is not merely a graph reconstructed from the incidence spectrum. It follows algebraically from two independently established inputs:

1. the Furey ternary-incidence contractions assign equal weight \(5\) to \(u,d,u^c\) and weight \(1\) to \(d^c\);
2. color-resolved cycle closure gives \(d^c=u+d-u^c\).

Let

\[
x=(u,d,u^c)^T,
\qquad
v=(1,1,-1)^T,
\qquad
d^c=v^Tx.
\]

The coordinate metric inherited from the four matter sectors is

\[
H=I_3+vv^T.
\]

The incidence quadratic form is

\[
K=5I_3+vv^T.
\]

Therefore the compressed coordinate operator is

\[
\boxed{
H^{-1}K
=(I+vv^T)^{-1}(5I+vv^T)
=5I-vv^T.
}
\]

This is exactly the previously computed multiplicity matrix

\[
M=
\begin{pmatrix}
4&-1&1\\
-1&4&1\\
1&1&4
\end{pmatrix}.
\]

After switching \(u^c\mapsto-u^c\), it becomes

\[
SMS=2I+L_{K_3}.
\]

Thus the signed triangle is forced by **triple-incidence weight equality plus cycle closure**.

## 1. Why the coordinate Gram is not the identity

The independent local-coefficient variables are \(u,d,u^c\), but the embedded physical vector also contains

\[
d^c=u+d-u^c.
\]

Using the common color-augmentation metric on each sector, its norm is

\[
\begin{aligned}
\|x\|_{\rm phys}^2
&=\|u\|^2+\|d\|^2+\|u^c\|^2+\|d^c\|^2\\
&=x^T(I+vv^T)x.
\end{aligned}
\]

Therefore orthogonal compression is a generalized eigenproblem

\[
Kx=\lambda Hx,
\]

not an ordinary diagonal problem in the \((u,d,u^c)\) parameters.

This explains why a diagonal field-space incidence classifier becomes an off-diagonal signed graph operator after restriction to the cycle kernel.

## 2. General four-weight theorem

Give the primary sectors arbitrary weights

\[
a,b,c
\]

on \(u,d,u^c\), and weight \(e\) to \(d^c\). Then

\[
K(a,b,c,e)=\operatorname{diag}(a,b,c)+e,vv^T.
\]

The selected line \(\mathbb Rv\) is invariant under

\[
M(a,b,c,e)=H^{-1}K(a,b,c,e)
\]

if and only if

\[
\boxed{a=b=c.}
\]

The value of \(e\) is arbitrary.

Indeed, \(Mv=\lambda v\) is equivalent to

\[
Kv=\lambda Hv=4\lambda v.
\]

But

\[
Kv=(a+3e,\ b+3e,\ -c-3e)^T,
\]

which is parallel to \((1,1,-1)\) exactly when \(a=b=c\).

This is the exact Ward condition for diagonal sector weights.

## 3. Closed form with equal primary weights

Set

\[
a=b=c=A,
\qquad
e=E.
\]

Then

\[
\boxed{
M(A,E)
=AI+\frac{E-A}{4}vv^T.
}
\]

After sign switching,

\[
\boxed{
SM(A,E)S
=\frac{A+3E}{4}I
+\frac{A-E}{4}L_{K_3}.
}
\]

The synchronized eigenvalue is

\[
\lambda_{\rm sync}=\frac{A+3E}{4},
\]

while both transverse eigenvalues are

\[
\lambda_\perp=A.
\]

Hence:

- \(A>E\): the synchronized copy is uniquely lowest;
- \(A=E\): the operator is scalar and selection disappears;
- \(A<E\): the synchronized copy is uniquely highest.

For the Furey values \((A,E)=(5,1)\),

\[
\lambda_{\rm sync}=2,
\qquad
\lambda_\perp=5,
\qquad
\gamma=3.
\]

The entire observed spectrum is now derived in one line.

## 4. What the ternary product contributes

The established Furey response calculation constructs quadratic norm equations from the oriented ternary product. Both the deduplicated and multiplicity-preserving contractions give, on the colored sectors relevant here,

\[
\lambda_u=lambda_d=lambda_{u^c}=5,
\qquad
\lambda_{d^c}=1.
\]

Thus the ternary incidence supplies exactly the equality \(a=b=c\) needed to protect the signed synchronized line, as well as the strict inequality \(A>E\) needed to make it the low mode.

Cycle topology supplies the rank-one coupling \(vv^T\). Neither ingredient alone selects the copy:

- equal diagonal weights without cycle closure are merely scalar;
- cycle closure with unequal primary weights generally rotates the line.

Their composition is the selector.

## 5. Exact location of the Yukawa obstruction

Higgs/Yukawa dressing distinguishes the up and down sectors. In the general theorem, that means it can produce

\[
a\ne b
\quad\text{or}\quad
b\ne c.
\]

The selected line then ceases to be an eigenline. This recovers the earlier numerical commutator result as an exact algebraic statement:

\[
\boxed{
\text{bare Furey triple incidence: }a=b=c,
\qquad
\text{generic Yukawa dressing: }a,b,c\text{ split}.
}
\]

The response-protection problem is therefore not “keep every coupling equal.” It is:

> derive a Ward identity, normalization or counterterm organization that keeps the three **primary incidence weights** equal after the physically relevant dressing.

The \(d^c\) weight may run independently without rotating the active copy, although it changes its eigenvalue and gap.

## 6. Relation to positive edge reweighting

Document 876 showed that arbitrary positive edge weights on the signed triangle preserve its kernel. The present theorem concerns diagonal sector weights before compression.

These are different deformation classes:

- **edge reweighting:** preserves the signed-difference kernel automatically;
- **primary on-site splitting:** rotates the kernel unless \(a=b=c\);
- **derived-sector weight change \(E\):** preserves the kernel and changes only the synchronized eigenvalue.

This gives a practical decomposition for any proposed correction. One should first project it into:

1. scalar shift;
2. signed-edge Laplacian;
3. unequal primary on-site potential;
4. residual off-pattern mixing.

Only the last two threaten exact selection.

## 7. How far this reaches toward Jordan-triple recursion

The derivation has the desired recursive form:

\[
\boxed{
\text{ternary incidence weights}
\xrightarrow{\text{cycle-kernel pullback}}
\text{signed graph Laplacian}
\xrightarrow{\ker}
I
\xrightarrow{\text{sewing}}
\text{candidate symplectic carrier}.
}
\]

It shows a concrete way that a triple product can become a relational carrier: not by closing immediately on \(Sp(4,\mathbb R)\), but by generating a positive incidence form whose constrained pullback synchronizes one augmentation module.

The remaining recursion steps are still open:

- promote the incidence sum to a physical action or Ward-controlled response;
- adjoin the neutral fixed pair after Higgs dressing;
- derive the handle exchange and alternating sewing;
- identify the resulting quadratic representation with the full \(Sp(4,\mathbb R)\) action.

## 8. Stop-everything and falsification criteria

**Action trigger:** a basis-independent linking-algebra trace or Jordan quadratic action produces the established \((5,5,5,1)\) weights.

**Ward trigger:** dressed response calculations preserve \(a=b=c\) even while allowing \(E\) to run.

**Edge-decomposition trigger:** all leading corrections decompose into scalar plus positive signed-edge Laplacian, proving exact kernel protection.

**Recursion trigger:** the same Jordan-triple construction that generates \(K\) also supplies the neutral complement and symplectic sewing.

**Negative trigger:** a physically mandatory correction produces unequal primary weights with no compensating off-diagonal term restoring equal signed row sums.

**Falsifier:** claiming that the triple product alone has already generated \(Sp(4,\mathbb R)\). It has generated the exact active selector **conditional on interpreting the incidence form physically**; the rank-four sewing and handle remain separate.

## 9. Verdict

The signed \(K_3\) selector now has an upstream derivation:

\[
\boxed{
(5,5,5,1)_{\rm ternary\ incidence}
+
d^c=u+d-u^c
\Longrightarrow
M=5I-vv^T
\Longrightarrow
SMS=2I+L_{K_3}.
}
\]

This is a substantial step toward Jordan-triple recursion. The next decisive problem is no longer the selector’s algebraic origin; it is the physical status and radiative protection of the incidence quadratic form.

## 10. Dependencies

- [signed-\(K_3\) synchronization theorem](876_the_incidence_selector_is_a_signed_k3_synchronization_laplacian_and_its_factor_three_is_the_sum_of_three_locked_matter_nodes.md)
- [Furey incidence selector](863_the_furey_incidence_laplacian_conditionally_selects_one_of_the_three_code_color_doublets.md)
- [color-resolved cycle/code kernel](870_the_color_resolved_furey_augmentation_cycle_kernel_is_exactly_the_three_doublet_gauge_neutral_code_space.md)
- [Yukawa projector instability](867_the_incidence_selected_doublet_is_gap_stable_but_not_exactly_protected_against_yukawa_response_mixing.md)
- [minimal primitive cochain](872_the_incidence_copy_is_the_primitive_cocycle_kernel_of_a_minimal_two_face_local_coefficient_completion.md)
