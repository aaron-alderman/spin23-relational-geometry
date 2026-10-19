# Every Minimal Amplitude of the Middle-Frame Mismatch Gram Is Environment-Gauge Equivalent to a Multiplicity-Times-Color Factorization

**Date:** 17 October 2026  
**Branches:** response-amplitude factorization, Stinespring gauge, multiplicity/color separation, handle alignment, and microscopic typing  
**Claim status:** exact finite-dimensional factorization classification; physical environment-factor labeling remains open  
**Certificate:** [classify_minimal_amplitudes_of_the_factorized_middle_frame_gram_up_to_environment_orthogonal_gauge.mjs](../../../verification/classify/classify_minimal_amplitudes_of_the_factorized_middle_frame_gram_up_to_environment_orthogonal_gauge.mjs)

## Executive result

The product structure of the middle-frame mismatch Gram has no amplitude-level existence obstruction.

Let

\[
K_{\rm shift}
=R_{\rm mult}\otimes G_{A_2},
\]

where

\[
R_{\rm mult}=\frac52S L_{K_3}S
\]

has rank two and \(G_{A_2}\) has rank two. Choose minimal factors

\[
L_{\rm mult}^TL_{\rm mult}=R_{\rm mult},
\qquad
L_{\rm color}^TL_{\rm color}=G_{A_2}.
\]

Then

\[
\boxed{
L_0=L_{\rm mult}\otimes L_{\rm color}
}

is a minimal rank-four amplitude satisfying

\[
L_0^TL_0=K_{\rm shift}.
\]

Moreover, every other minimal amplitude \(L\) with the same Gram is

\[
\boxed{L=O L_0,qquad O\in O(4).}
\]

Thus any apparent multiplicity--color entanglement in a completely unobserved minimal bath is environment gauge. The unresolved physical question is not whether a factorized amplitude exists, but what selects a tensor decomposition of the four-dimensional bath and identifies its multiplicity factor with the handle Kraus plane.

## 1. Explicit minimal factors

Let \(Q\) be a two-by-three matrix whose rows form an orthonormal basis of the zero-sum plane:

\[
Q^TQ=P_{\rm std}.
\]

Since

\[
L_{K_3}=3P_{\rm std},
\]

a minimal multiplicity factor is

\[
L_{\rm mult}
=\sqrt{\frac{15}{2}}\,QS.
\]

It has shape \(2\times3\) and rank two.

For color, one convenient factor is

\[
L_{\rm color}=
\begin{pmatrix}
\sqrt2&-1/\sqrt2\\
0&\sqrt{3/2}
\end{pmatrix},
\]

which obeys

\[
L_{\rm color}^TL_{\rm color}
=
\begin{pmatrix}
2&-1\\
-1&2
\end{pmatrix}.
\]

Their Kronecker product has shape \(4\times6\), rank four and exactly the required full Gram.

## 2. Classification theorem

Suppose \(L,L_0\) are real \(r\times n\) matrices of full row rank \(r\) satisfying

\[
L^TL=L_0^TL_0.
\]

Then their row spaces, singular values and right singular data agree. Consequently there is a unique orthogonal matrix

\[
O\in O(r)
\]

such that

\[
L=OL_0.
\]

For nonminimal factors, the corresponding freedom is an isometric embedding into a larger auxiliary space.

This is the standard uniqueness theorem for minimal Gram/Stinespring factorizations.

## 3. An explicitly entangled-looking representative

The certificate applies a non-product orthogonal rotation mixing two of the four environment coordinates. The resulting amplitude no longer visibly separates into a two-by-two tensor product, but

\[
L_1^TL_1=L_0^TL_0.
\]

Applying the inverse environment rotation recovers \(L_0\) exactly.

Therefore visual nonfactorization of one auxiliary basis is not physical evidence against the product Gram.

## 4. What a fully traced response can observe

If the environment is completely unobserved, quadratic response depends only on

\[
L^TL.
\]

The transformation

\[
L\mapsto OL
\]

is invisible. In Stinespring language it is Kraus/environment gauge.

Thus the middle-frame response already determines everything required for the fully reduced Gaussian channel, up to the cyclic alignment discussed in documents 879 and 880.

## 5. What a named factor requires

The factorization

\[
\mathbb R^4_{\rm env}
\cong
E_{\rm mult}\otimes I_{\rm color}
\]

is additional structure. A generic \(O(4)\) environment rotation does not preserve it.

To identify the first factor with the handle Kraus plane, one needs observables or symmetries that distinguish:

- the microscopic color action on \(I_{\rm color}\);
- the emergent cyclic action on \(E_{\rm mult}\);
- the selector conjugation action on the handle environment.

Color covariance can reduce the allowed environment gauge, but it does not by itself align the multiplicity cycle with selector conjugation.

## 6. Consequence for the programme

The branch now divides cleanly:

### Closed

- the quadratic response Gram factorizes;
- a minimal factorized amplitude exists;
- all minimal amplitudes are equivalent under environment gauge;
- factorization cannot be falsified merely by finding an entangled auxiliary basis.

### Open

- physical identification of the two environment tensor factors;
- canonical cyclic alignment with the handle frame;
- derivation of which environment observables, if any, are measurable;
- extension through the neutral fixed complement and handle exchange.

## 7. Stop-everything and falsification criteria

**Typing trigger:** the environment carries a measured or gauged color action whose commutant canonically isolates the multiplicity factor.

**Alignment trigger:** a Higgs/ribbon/boundary observable fixes the remaining multiplicity-plane orientation and maps it to the handle Kraus basis.

**Operational trigger:** partial access to the environment distinguishes the tensor factors and agrees with the factorized representative.

**Negative trigger:** a physical observable depends on an auxiliary rotation that mixes the proposed factors, showing that it is not pure environment gauge.

**Falsifier:** claiming uniqueness of \(L_{\rm mult}\otimes L_{\rm color}\) from the Gram alone. Only its environment-gauge class is fixed.

## 8. Verdict

The amplitude problem is solved up to the correct equivalence:

\[
\boxed{
L^TL=R_{\rm mult}\otimes G_{A_2}
\Longrightarrow
L\sim_{O(4)}L_{\rm mult}\otimes L_{\rm color}.
}
\]

There is no remaining algebraic obstruction to factorization. The live problem is physical typing of the bath—not existence of a product representative.

## 9. Dependencies

- [exact middle-frame tensor factorization](882_the_canonical_middle_slot_frame_factorizes_exactly_into_signed_multiplicity_response_times_the_a2_color_metric.md)
- [quadratic color contraction and Kraus rank](881_gauge_singlet_color_contraction_is_necessarily_quadratic_and_does_not_enlarge_the_two_kraus_environment_when_the_response_vertex_factorizes.md)
- [triangular frame alignment](879_the_signed_multiplicity_edges_and_the_three_handle_kraus_operators_are_the_same_zero_sum_triangle_as_abstract_frames_but_their_c3_actions_are_differently_typed.md)
