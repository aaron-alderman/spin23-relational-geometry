# The Weak Pfaffian Times the \(A_2\) Color Metric Is Exactly \(J_0\) over the Reals but Does Not Select the Known Integral Completion Equivariantly

**Date:** 17 October 2026  
**Branches:** Pfaffian weak lift, color augmentation metric, real symplectic carrier, index-three completion, integral equivariance, and \(Spin(2,3)\) lattice  
**Claim status:** exact real sewing and exact integral-form equivalence; natural product symmetries fail to recover the previously selected completion  
**Certificate:** [sew_the_weak_pfaffian_to_the_a2_color_metric_and_identify_the_index_three_sp4_completion.mjs](scripts/sew_the_weak_pfaffian_to_the_a2_color_metric_and_identify_the_index_three_sp4_completion.mjs)

## Executive result

**Subsequent typing correction:** document 894 proves that the natural color action on this product space has two active color doublets and no fixed plane, whereas the established carrier has one active doublet plus a two-dimensional fixed complement. Thus the form sewing below is exact for the pre-contraction bath, but the product space is not itself the typed physical carrier.

The finite sewing proposed in document 892 works exactly over \(\mathbb R\).

Let

\[
\varepsilon=
\begin{pmatrix}0&1\\-1&0\end{pmatrix}
\]

be the Pfaffian/skew weak lift and let

\[
G_{A_2}=
\begin{pmatrix}2&-1\\-1&2\end{pmatrix}
\]

be the primitive invariant metric on the color augmentation lattice. Then

\[
\boxed{
\Omega=\varepsilon\otimes G_{A_2}
}

\]

is a nondegenerate alternating form on the four-real-dimensional mismatch environment.

If \(G_{A_2}=L^TL\), color whitening gives

\[
(I\otimes L^{-1})^T\Omega(I\otimes L^{-1})
=
\varepsilon\otimes I_2
=
J_0.

\]

Thus the weak Pfaffian and the already-derived color metric sew to the exact canonical carrier form used throughout the \(Sp(4,\mathbb R)\cong Spin_0(2,3)\) branch.

The integral result is subtler. \(\Omega\) has

\[
\operatorname{Pf}(\Omega)=-3,
\qquad
\det\Omega=9,

\]

and elementary divisors \((1,3)\). It is integrally congruent to the earlier equal-area \(A_4\) form of documents 760–761. But the natural product color cycle and joint weak/color reflection retain **two** index-three completions, not one, and neither maps to the previously selected color-average completion under the exhibited congruence.

Therefore:

\[
\boxed{
\text{real symplectic sewing succeeds; equivariant integral identification remains open.}
}

## 1. The product form

In product coordinates the form is

\[
\Omega=
\begin{pmatrix}
0&0&2&-1\\
0&0&-1&2\\
-2&1&0&0\\
1&-2&0&0
\end{pmatrix}.
\]

It is alternating and nondegenerate. Its Pfaffian equals minus the determinant of the color metric:

\[
\operatorname{Pf}(\varepsilon\otimes G_{A_2})
=-\det G_{A_2}
=-3.

\]

This identifies the factor three directly:

\[
\boxed{
\text{weak primitive area}\times\text{color }A_2\text{ discriminant}
\Longrightarrow
\text{carrier Pfaffian }3.
}

The determinant nine is therefore forced by the color augmentation lattice, not fitted.

## 2. Exact real reduction to \(J_0\)

Choose

\[
L=
\begin{pmatrix}
\sqrt2&-1/\sqrt2\\
0&\sqrt{3/2}
\end{pmatrix},
\qquad
G_{A_2}=L^TL.
\]

Then

\[
B=I_2\otimes L^{-1}

\]

satisfies

\[
B^T\Omega B
=
\begin{pmatrix}
0&0&1&0\\
0&0&0&1\\
-1&0&0&0\\
0&-1&0&0
\end{pmatrix}
=J_0.
\]

No further relative scale remains. The same \(A_2\) metric already selected by the middle-frame color contraction supplies the whitening.

This closes the real-form part of the sewing problem:

\[
\boxed{
\varepsilon_{\rm weak}
\otimes
G_{\rm color}
\cong
J_0.
}

## 3. Symmetry properties

Let \(C\) be the integral order-three action on the \(A_2\) color lattice and \(F\) an integral reflection with

\[
F C F=C^{-1}.

\]

Then the product color action

\[
A=I\otimes C

\]

is symplectic:

\[
A^T\Omega A=\Omega.

\]

The joint weak/color reflection

\[
T=F\otimes F

\]

is anti-symplectic:

\[
T^T\Omega T=-\Omega.

\]

This is the correct signed covariance pattern for the carrier and its induced \(O(2,3)\) action.

## 4. Integral equivalence with the earlier \(A_4\) form

The equal-area \(A_4\) form from document 760 has the same elementary divisors \((1,3)\). The certificate constructs an explicit unimodular matrix \(T_\mathbb Z\) satisfying

\[
T_\mathbb Z^T\Omega T_\mathbb Z=J_{A_4}.

\]

Thus the two are the same integral alternating form up to change of lattice basis.

Consequently both admit four index-three self-dual completions. At the level of bare forms, the new product construction has reached exactly the arithmetic antecedent of the established unimodular \(Sp(4,\mathbb Z)\) carrier.

## 5. The equivariant mismatch

Bare form equivalence does not imply equivalence of the attached group actions.

For the earlier \(A_4\) realization, the oriented color cycle and paired color/weak reflection selected exactly one completion: the color-average line

\[
(1,1,1,0)\in\mathbb F_3^4.

\]

For the natural product realization, the color cycle and joint reflection preserve two completion lines. Under the displayed integral congruence they map to

\[
(0,1,2,1)

\]

and

\[
(1,0,2,2),

\]

not to the color-average line.

Therefore the congruence of forms is not an intertwiner of the two signed group actions.

This is an important boundary:

\[
\boxed{
(L,\Omega)\cong(L',J_{A_4})
\quad\not\Rightarrow\quad
(L,\Omega,A,T)\cong(L',J_{A_4},R,S).
}

## 6. Interpretation

The programme now has two exact constructions of the same real symplectic carrier:

1. the arithmetic \(A_4\) equal-area form and its unique color-average completion;
2. the factorized weak-Pfaffian times color-metric form.

Their bare integral forms are equivalent. Their natural symmetry typings are not yet shown equivalent.

This localizes the remaining bridge to one of two possibilities:

- find a different, physically justified integral intertwiner aligning the product actions with the \(A_4\) actions;
- derive an additional non-product symmetry that selects one of the two product completions and then compare it with the color-average carrier.

Simply whitening over \(\mathbb R\) cannot solve this arithmetic problem because it forgets the index-three lattice data.

## 7. Consequence for \(Spin(2,3)\)

Over \(\mathbb R\), the result supplies the desired carrier immediately:

\[
(E_{\rm weak}\otimes E_{\rm color},\Omega)
\cong
(\mathbb R^4,J_0),

\]

and therefore

\[
\operatorname{Aut}(\Omega)
\cong
Sp(4,\mathbb R)
\cong
Spin_0(2,3).

\]

This is the cleanest current route from Standard Model typed response data to the real \(Spin(2,3)\) carrier.

At the arithmetic level, the correct statement is weaker:

> the product lattice is in the right integral symplectic genus and has the correct index-three completion problem, but its physical symmetries have not selected the already-established unimodular lattice.

## 8. Stop-everything and falsification criteria

**Equivariant-intertwiner trigger:** an integral congruence simultaneously maps \(\Omega\), the product color cycle and joint reflection to the \(A_4\) form and its signed order-six generators.

**Completion trigger:** a physical non-product exchange reduces the two product-stable completion lines to one and transports it to the color-average line.

**Dynamics trigger:** integrating out the Furey/Higgs outer legs yields exactly \(\varepsilon\otimes G_{A_2}\) as the carrier residue.

**Code trigger:** the ternary Standard-Model code selects one of the two product completion lines by a stabilizer or logical condition.

**Negative trigger:** the product and \(A_4\) signed actions are inequivalent over \(\mathbb Z\) even after all admissible basis changes. Then they define different arithmetic refinements of the same real carrier.

**Falsifier:** using the real whitening identity to claim the two integral, symmetry-typed carriers are already identical.

## 9. Verdict

The central real sewing succeeds:

\[
\boxed{
\varepsilon_{\rm weak}\otimes G_{A_2}
\xrightarrow{\text{whitening}}
J_0.
}

\]

It also explains the arithmetic three:

\[
\boxed{
\operatorname{Pf}(\Omega)=\pm3,
\qquad
\det\Omega=9.
}

But the integral equivariant sewing does not yet close. The product construction retains two signed-covariant index-three completions, while the earlier \(A_4\) realization selected one different line.

The next problem is no longer finding \(Sp(4,\mathbb R)\). It is selecting the correct arithmetic refinement of its carrier.

## 10. Dependencies

- [Pfaffian phase lock](892_pfaffian_skewness_or_even_real_structure_collapses_the_higgs_hopf_phase_to_the_two_weak_symplectic_signs.md)
- [exact middle-frame color factorization](882_the_canonical_middle_slot_frame_factorizes_exactly_into_signed_multiplicity_response_times_the_a2_color_metric.md)
- [unique color-average index-three completion](760_signed_color_weak_covariance_uniquely_selects_the_color_average_index_three_unimodular_overlattice_conditional_on_equal_areas.md)
- [canonical integral \(Sp(4)\)/\(Spin(2,3)\) form](761_the_color_average_completion_has_canonical_sp4z_form_and_primitive_lattice_u_plus_u_plus_minus2_with_signed_o23_action.md)

