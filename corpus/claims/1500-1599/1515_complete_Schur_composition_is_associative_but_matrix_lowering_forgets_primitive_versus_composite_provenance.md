# Complete Schur Composition Is Associative, but Matrix Lowering Forgets Primitive-versus-Composite Provenance

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact finite categorical construction and limitation theorem; physical spectral/Jordan realization remains open

**Depends on:** [the programme priority decision](1511_the_highest_value_next_investigations_are_the_physical_intertwiner_RG_tangency_and_categorical_closure_tests.md), [the typed-path Schur packet](1508_the_typed_path_matching_law_maps_the_required_composite_to_a_rank_one_Schur_packet_not_an_independent_leakage_arrow.md), [the global alignment theorem](1509_sums_of_rank_one_Schur_packets_preserve_the_texture_only_when_all_mediator_paths_share_one_projective_coupling_ray.md), and [the KO-6 relation-sheet reflection](1505_the_real_completed_two_path_geometry_uniquely_lifts_the_mask_reflection_as_J_odd_relation_sheet_parity.md)

**Evidence:** [Schur-composition ledger](../../../evidence/data/spin23-complete-Schur-composition-category.json) and [exact rational verifier](../../../verification/verify/verify_spin23_complete_Schur_composition_category.mjs)

## Result

The proposed matching middle has a precise finite realization as a category of
quadratic diagrams with Schur-complement composition. When every induced
contact, shifted coupling and mediator mixing is retained, elimination is
independent of order and therefore associative on its domain of invertible
internal blocks.

For a boundary block \(K\), boundary-to-internal incidence \(B\), and
invertible internal block \(A\), define

\[
\mathcal S_A
\begin{pmatrix}K&B\\B^T&A\end{pmatrix}
=K-BA^{-1}B^T.
\]

Successive gluing/elimination agrees with eliminating the joined internal
block at once. This remains true when mediators mix, but only because the
first elimination updates every surviving coupling and mass through its
fill-in terms.

The construction also exposes a decisive limitation:

\[
\boxed{\text{the matrix-lowering map is not faithful on provenance}.}
\]

A factored path and an endpoint diagram with primitive contact coefficients
can lower to exactly the same effective matrix. Associative Schur composition
therefore implements complete matching, but it does not by itself prohibit a
primitive leakage generator or derive the global common ray.

## 1. The quadratic-diagram category

Use finite typed boundary and internal label sets. A morphism is a symmetric
quadratic kernel together with:

- its boundary labels;
- its internal labels;
- primitive-arrow provenance;
- real and relation-sheet involutions when present.

Composition glues equally typed labels and eliminates the newly internal
labels by the complete Schur complement. It is defined on the open stratum
where the eliminated block is invertible. Direct sum supplies parallel
composition.

This formalizes the distinction between:

1. the **source diagram**, where \(L\to P\to N\) is a factored path; and
2. the **lowered kernel**, where the matched \(L\)-\(N\) entry appears alongside
   its correlated \(L\)-\(L\) and \(N\)-\(N\) contacts.

## 2. Associativity and integration-order independence

Let two mediators have block

\[
A=\begin{pmatrix}a_1&q\\q&a_2\end{pmatrix}
\]

and boundary incidence

\[
B=\begin{pmatrix}d_1&d_2\\y_1&y_2\end{pmatrix}.
\]

Eliminating the first mediator changes the surviving data to

\[
a_2'=a_2-\frac{q^2}{a_1},
\qquad
\binom{d_2'}{y_2'}=
\binom{d_2}{y_2}-\frac{q}{a_1}\binom{d_1}{y_1}.
\]

Using these filled-in quantities, either elimination order gives

\[
K-BA^{-1}B^T.
\]

The verifier checks this exactly over rational numbers for a coupled witness.
It also verifies that the common shortcut of summing the two independent
\(q=0\) packets gives the wrong result when \(q\ne0\). Thus order independence
belongs to complete diagram matching, not to a list of isolated path rules.

## 3. Real and relation-sheet compatibility

Duplicate an allowed diagram into two blocks exchanged by \(J\), and set

\[
\Gamma_{\rm rel}=+I\oplus-I.
\]

If the internal set being eliminated is closed under \(J\), and the full
kernel is \(J\)-equivariant and \(\Gamma_{\rm rel}\)-even, its Schur complement
has the same properties on the boundary. The verifier checks both identities
on a doubled \(L\)-\(P\)-\(N\) diagram.

A primitive cross-sheet entry is instead \(\Gamma_{\rm rel}\)-odd. The category
can exclude it by restricting the generating arrows, but that restriction is
additional structure; it is not a consequence of Gaussian elimination.

## 4. The lowering functor is not faithful

The factored diagram

\[
L\xrightarrow{d}P\xrightarrow{y}N,
\qquad M_{PP}=a,
\]

lowers to

\[
-\frac1a\begin{pmatrix}d^2&dy\\dy&y^2\end{pmatrix}.
\]

An endpoint-only diagram can take these three entries as primitive
coefficients. Its lowered matrix is identical, although its source provenance
is different. Consequently the ordinary effective-matrix functor identifies
two distinct source diagrams.

This proves that the endpoint EFT matrix cannot reconstruct whether its
\(L\)-\(N\) coefficient was generated by a complete Schur path or inserted as a
primitive leakage term. Provenance must remain an explicit decoration or be
enforced by a separate universal property.

## 5. Parallel composition does not preserve rank one

Direct sum of internal mediator objects becomes addition after lowering:

\[
\mathcal S(A_1\oplus A_2)=G_1+G_2.
\]

Claim 1509 shows that this is generically rank two. Therefore the category of
all quadratic diagrams is closed and associative, while the rank-one protected
subcategory is not closed under arbitrary parallel composition. Closure
requires one of:

- a common source factorization \(B=u\lambda^T\);
- a restriction to one physical mediator packet;
- a stronger representation theorem forcing aggregate intertwiner
  multiplicity one.

This is exactly why local one-dimensional arrows did not solve claim 1510.

## 6. What has and has not been constructed

The construction supplies:

- a precise associative composition law;
- integration-order independence with complete fill-in;
- compatibility with \(J\) and relation-sheet parity on stable internal sets;
- a formal place to retain primitive/composite provenance.

It does not supply:

- a physical Pati--Salam proof that the primitive cross-sheet generator is
  absent;
- a Spin(2,3) or Jordan derivation of the common aggregate ray;
- closure under quantum counterterms;
- a faithful reconstruction of provenance from endpoint observables.

## 7. Consequence for the next embedding search

A bounded search must encode more than matrices and parity signs. Its witness
format must retain:

1. primitive generators;
2. path factorizations and internal labels;
3. complete Schur fill-in;
4. the aggregate coupling rank;
5. \(J\)-stable elimination sets.

Otherwise it can accept an endpoint matrix that happens to lie on the Schur
cone while silently realizing it with independent primitive coefficients.

## Verdict

The formal categorical middle exists, but its exact lesson is two-sided:

\[
\boxed{
\text{complete Schur composition is associative and graded-real compatible,}
}
\]

while

\[
\boxed{
\text{effective matrices forget path provenance and do not enforce the
common ray.}
}
\]

The physical carrier census and RG-tangency calculation must therefore supply
the missing restrictions; category language alone cannot promote them.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_complete_Schur_composition_category.mjs
node verification/verify/verify_spin23_typed_path_Schur_packet.mjs
node verification/verify/verify_spin23_sum_of_Schur_packets_requires_projective_alignment.mjs
~~~
