# Fourier Locality and Both-Channel Common Mode Reduce the Fifteen Handle Saturations to the Unique P-Induced Plane

**Date:** 17 October 2026  
**Branches:** finite saturation selector, Fourier complex structure, quadrature locality, common-mode activation, Galois environment, and handle descent  
**Claim status:** exact conditional uniqueness theorem; physical derivation of the selector conditions remains open  
**Certificate:** [select_the_unique_common_mode_index_four_saturation_from_the_fifteen_symplectic_candidates.mjs](../../../verification/select/select_the_unique_common_mode_index_four_saturation_from_the_fifteen_symplectic_candidates.mjs)

## Executive result

Document 953 left fifteen symplectically admissible index-four saturations.  Three additional conditions reduce them as follows:

\[
15
\xrightarrow{\text{Fourier complex stability}}
7
\xrightarrow{\text{quadrature-product locality}}
3
\xrightarrow{\text{both-channel common mode}}
1.
\]

The unique survivor is exactly

\[
W_P=operatorname{span}_{\mathbb F_2}
\{e_1+e_2,e_3+e_4\},
\]

the plane induced by the determinant-four handle intertwiner.

This closes uniqueness **conditionally**.  The algebra does not yet prove that nature must impose quadrature-product locality and both-channel common-mode activation.  Those conditions are, however, independently adjacent to the established real-time face structure and the unique common-mode-activating environment of document 944.

## 1. Fourier complex stability: fifteen to seven

Modulo two, the Fourier complex structure exchanges real and imaginary quadrature blocks:

\[
J_F:(x_1,x_2,y_1,y_2)
\longmapsto
(y_1,y_2,x_1,x_2).
\]

Requiring a candidate Lagrangian plane \(W\) to satisfy

\[
J_FW=W
\]

leaves seven of the fifteen symplectic planes.

This condition says that saturation respects the real/imaginary organization of one complex response rather than selecting unrelated half-lattice directions.

## 2. Product locality: seven to three

Let

\[
R=\operatorname{span}(e_1,e_2),
\qquad
I=\operatorname{span}(e_3,e_4).
\]

Require the quotient plane to split into one real and one imaginary line:

\[
W=(W\cap R)\oplus(W\cap I),
\qquad
J_F(W\cap R)=W\cap I.
\]

Exactly three planes survive:

\[
\begin{aligned}
W_1&=\langle e_1,e_3\rangle,\\
W_2&=\langle e_2,e_4\rangle,\\
W_P&=\langle e_1+e_2,e_3+e_4\rangle.
\end{aligned}
\]

The first two saturate only one response eigenchannel.  The third is diagonal across both.

## 3. Common-mode activation: three to one

Demand that the real quotient generator have nonzero projection to both response eigenchannels.  Over \(\mathbb F_2\), the only line in \(R\) with both coordinates nonzero is

\[
\langle e_1+e_2\rangle.
\]

Fourier stability then forces the imaginary partner

\[
\langle e_3+e_4\rangle.
\]

Therefore \(W_P\) is unique.

This criterion is the finite-lattice analogue of document 944's representation-level result: among minimum reflection-stable environments, only the nontrivial \(A_2\) doublet activates the trivial/common response sector.

## 4. What is proved and what is assumed

Proved exactly:

- the finite counts \(15\to7\to3\to1\);
- uniqueness of \(W_P\) under the three conditions;
- equality of the survivor with the saturation induced by \(P\).

Assumed as selector data:

- the half-lattice quotient must respect the Fourier complex structure;
- locality means a product of real and imaginary quotient lines;
- both normal and tangent response eigenchannels must participate in the saturation.

The first condition is strongly natural for real-time response.  The second and third are physically motivated but not derived from the microscopic Furey/Standard-Model action.

## 5. Cross-branch consequence

Two formerly separate appearances of common-mode activation now agree:

1. the cyclotomic-to-selector channel requires the unique \(\chi_1\oplus\chi_2\) environment to activate the trivial character;
2. the sideband-to-handle lattice requires the diagonal half-sum plane to activate both response eigenchannels.

This does not prove the environments are identical.  It gives a new typed target: construct an intertwiner taking the \(A_2\) environment doublet to the two quotient generators of \(W_P\), respecting reflection and Fourier conjugation.

## 6. Stop-everything and falsification criteria

**Environment-intertwiner trigger:** the document-944 \(A_2\) doublet maps equivariantly to \(e_1+e_2\) and \(e_3+e_4\).

**Microscopic-locality trigger:** a local real boundary action forces product locality of the quotient plane.

**Both-channel trigger:** a Ward identity or nondegenerate coupling proves that neither response eigenchannel may be saturated alone.

**Jordan trigger:** triple polarization produces exactly the diagonal common-mode line before complexification.

**Uniqueness falsifier:** the three selector conditions are omitted while \(W_P\) is called unique; fifteen symplectic candidates exist without them.

**Channel-degeneracy falsifier:** a microscopic model consistently couples only one eigenchannel, leaving \(W_1\) or \(W_2\) admissible.

## 7. Verdict

| Question | Verdict |
|---|---|
| How many symplectic saturations exist? | **15** |
| How many preserve the Fourier complex structure? | **7** |
| How many are quadrature-product local? | **3** |
| How many activate both response eigenchannels? | **1** |
| Is the survivor the \(P\)-induced plane? | **yes** |
| Are all selector conditions microscopically derived? | **no** |

## 8. Position in the corpus

- [index-four saturation census](953_an_index_four_saturation_turns_the_realified_twist_into_the_primitive_selector_handle_but_fifteen_symplectic_saturations_compete.md)
- [unique common-mode cyclotomic environment](944_a_unique_minimal_a2_doublet_environment_embeds_the_cyclotomic_source_into_the_balanced_selector_dilation.md)
- [realified twist/handle comparison](952_the_realified_sideband_twist_is_rationally_conjugate_to_the_selector_handle_but_not_in_its_natural_symplectic_typing.md)
- [local real sideband interface](908_a_local_real_interface_supplies_the_antiunitary_sideband_twist_and_closes_the_boundary_monodromy_model.md)
