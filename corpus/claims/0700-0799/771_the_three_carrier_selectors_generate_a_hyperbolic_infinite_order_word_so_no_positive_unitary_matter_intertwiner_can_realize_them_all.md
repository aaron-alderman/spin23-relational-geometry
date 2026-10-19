# The Three Carrier Selectors Generate a Hyperbolic Infinite-Order Word, so No Positive Unitary Matter Intertwiner Can Realize Them All

## Claim

Let \(R\) be the oriented-color order-three carrier action, \(P\) the paired color/weak anti-symplectic reflection, and \(H\) the symplectic handle exchange. Each generator has finite order:

\[
R^3=P^2=H^2=1.
\]

Nevertheless their combined integral carrier group is infinite. The short symplectic word

\[
W=(PHR)^2
\]

satisfies

\[
W^2-3W+I=0
\]

and has eigenvalues

\[
\lambda_\pm=\frac{3\pm\sqrt5}{2},
\]

each with multiplicity two. Since \(\lambda_+>1\), \(W\) is hyperbolic and has infinite order.

It follows that no invertible intertwiner from a positive-definite unitary matter representation can realize all three carrier generators with these matrices. The common physical source, if it exists, must pass through non-unitary response/transfer dynamics, an indefinite representation, or an encoded mapping-class action.

## 1. Exact carrier matrices

In the completed canonical basis, the certificate uses

\[
R=
\begin{pmatrix}
1&0&0&0\\
0&0&0&-1\\
0&0&1&0\\
0&1&0&-1
\end{pmatrix},
\quad
P=
\begin{pmatrix}
1&0&0&0\\
0&-1&0&0\\
-1&0&-1&0\\
0&-1&0&1
\end{pmatrix},
\]

and

\[
H=
\begin{pmatrix}
0&1&0&0\\
1&0&0&0\\
0&0&0&1\\
0&0&1&0
\end{pmatrix}.
\]

They are the same transformations used in the preceding signed-invariant classification, now expressed on the integral completed lattice.

## 2. Hyperbolic word

Direct multiplication gives

\[
W=(PHR)^2=
\begin{pmatrix}
1&0&-1&0\\
0&0&0&1\\
-1&0&2&0\\
0&-1&0&3
\end{pmatrix},
\qquad
\operatorname{tr}W=6.
\]

The quadratic identity

\[
W^2-3W+I=0
\]

is exact over the integers. Its roots are positive reciprocal units, so repeated application expands one pair of directions and contracts the reciprocal pair. This is characteristic symplectic hyperbolicity, not a finite permutation orbit.

## 3. Positive-unitary intertwiner no-go

Suppose a source representation \(\rho\) acts on a positive-definite Hilbert space and an invertible four-dimensional intertwiner \(\Phi\) obeys

\[
\Phi\rho(g)=R_g\Phi
\]

for \(g=R,P,H\). Then it also intertwines every group word, including \(W\). Similar matrices have the same eigenvalues. But a product of unitary source matrices is unitary and all of its eigenvalues have modulus one, whereas

\[
|\lambda_+|>1,
\qquad
|\lambda_-|<1.
\]

Therefore no such invertible positive-unitary intertwiner exists.

This no-go is stronger than the earlier microscopic-color mismatch. It does not depend on a particular basis choice or puncture pair. It follows from the combined group relations of the successful abstract selector package.

## 4. What survives

The unique symplectic-line theorem in document 770 remains correct. What changes is the type of physical realization that can support it.

### 4.1 Response or transfer matrices

Retarded response, transfer and monodromy matrices need not be unitary even when the underlying quantum evolution is. Hyperbolic symplectic actions are natural on phase space and boundary data. This is now the leading branch.

### 4.2 Indefinite or Krein geometry

Pseudo-unitary actions can contain reciprocal real eigenvalues while preserving an indefinite form. A causal or Nambu response space could therefore realize the word, but positivity and physical-state extraction must be demonstrated.

### 4.3 Mapping-class or encoded duality

The arithmetic color matrix already appeared as a one-handle Weil/mapping-class word rather than microscopic color. The infinite group result strengthens that interpretation: the three names \(R,P,H\) should label induced operations on the sewn carrier, not literal compact transformations of fermion labels.

### 4.4 Analytic continuation

A compact gauge action may seed the construction, but reaching the hyperbolic carrier requires analytic continuation, integrating out degrees of freedom, or passing to a noncompact response representation. That step must be explicit.

## 5. Revised central problem

The programme should no longer search for a single positive-unitary four-dimensional matter subrepresentation carrying all three matrices. The appropriate target is a functorial response map

\[
\mathcal F:\text{Furey/left-right matter and sewing data}
\longrightarrow
\text{symplectic boundary response},
\]

where compact microscopic transformations can induce noncompact symplectic monodromies after sewing, elimination or analytic continuation.

The key consistency requirements are then:

1. causality and passivity of the response;
2. gauge covariance before quotienting;
3. preservation of the selected integral lattice;
4. a derivation of the hyperbolic word rather than its insertion; and
5. recovery of a positive physical Hilbert space despite non-unitary carrier dynamics.

## 6. Stop conditions

- Do not call \(R,P,H\) three microscopic compact symmetries on one matter multiplet.
- Do not seek a finite label-permutation model for their complete group.
- Do not infer non-unitary microscopic quantum evolution from non-unitary response transport.
- Do not use indefinite geometry without specifying the positive physical subspace or observable cone.
- Pin the combined selector if no causal response construction can induce \(W\).

## 7. Executable certificate

```powershell
node verification/verify/verify_combined_carrier_selector_group_contains_a_hyperbolic_infinite_order_word.mjs
```

The certificate verifies the generator orders, constructs \(W\), proves its quadratic polynomial and reports its reciprocal real spectrum.

## Companion documents

- [One-handle Weil realization of the carrier color cycle](765_the_carrier_color_unipotent_is_exactly_a_one_handle_inverse_twist_fourier_word_not_a_microscopic_color_permutation_or_mutual_gate.md)
- [Minimal left-right handle-exchange envelope](768_left_right_symmetry_is_the_minimal_gauge_envelope_of_the_furey_handle_exchange_but_equal_area_requires_an_invariant_response_phase.md)
- [Unique full symplectic-line theorem](770_oriented_color_signed_reflection_and_left_right_handle_exchange_select_a_unique_full_symplectic_line_with_no_mixed_block_loophole.md)
