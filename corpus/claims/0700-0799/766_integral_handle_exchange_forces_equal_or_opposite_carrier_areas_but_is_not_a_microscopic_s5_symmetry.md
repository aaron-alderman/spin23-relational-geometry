# Integral Handle Exchange Forces Equal or Opposite Carrier Areas but Is Not a Microscopic \(S_5\) Symmetry

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B08, B09, B10, B11, B12, B13, B14 and the equal-area selector branch  
**Claim status:** exact integral symmetry-selection theorem with executable certificate; physical handle exchange remains conditional  
**Certificate:** [verify_handle_exchange_selects_equal_or_opposite_oriented_color_areas.mjs](../../../verification/verify/verify_handle_exchange_selects_equal_or_opposite_oriented_color_areas.mjs)

## Executive result

The two-dimensional ambiguity in the oriented-color carrier has an exact symmetry selector.

In the canonical basis

\[
(p_1,p_2,q_1,q_2),
\]

the first handle is the color-average/weak fixed plane and the second is the color-difference plane. The general invariant form is

\[
J(a,b)=
\begin{pmatrix}
0&0&b&0\\
0&0&0&a\\
-b&0&0&0\\
0&-a&0&0
\end{pmatrix}.
\]

Let

\[
H=
\begin{pmatrix}
0&1&0&0\\
1&0&0&0\\
0&0&0&1\\
0&0&1&0
\end{pmatrix}
\]

exchange the two handles. Then

\[
\boxed{H^TJ(a,b)H=J(b,a).}
\]

Therefore:

\[
\boxed{
H\text{ symplectic}
\iff a=b,
}
\]

and

\[
\boxed{
H\text{ anti-symplectic}
\iff a=-b.
}

The equal-area premise used in documents 760–762 is thus equivalent to demanding a symplectic exchange of the two canonical handles.

The exchange is integral on the completed color-average lattice, but its matrix has thirds in the original \(A_4\) basis. It is not an ordinary \(S_5\) oscillator permutation. Its physical existence remains a separate gate.

## 1. Identification of the two handles

The canonical basis from document 761 is

\[
\begin{aligned}
p_1&=g_1,
&q_1&=g_4,\\
p_2&=g_2-g_1,
&q_2&=g_3-g_1,
\end{aligned}
\]

where

\[
g_1=\frac{b_1+b_2+b_3}{3}.
\]

The first pair spans the plane joining the color average to the remaining weak coordinate. The second spans the color-difference plane.

The coefficients \(b\) and \(a\) are precisely their respective symplectic areas.

## 2. Symplectic versus anti-symplectic exchange

Exchanging both position and momentum coordinates of the handles sends the first area block to the second and vice versa.

If the exchange is required to preserve the form,

\[
J(b,a)=J(a,b),
\]

so \(a=b\).

If it reverses the form,

\[
J(b,a)=-J(a,b),
\]

so \(a=-b\).

Thus the magnitude equality

\[
|a|=|b|

\]

is selected by a signed exchange symmetry, while the relative sign records whether the exchange is symplectic or anti-symplectic.

## 3. Integral action on the completed lattice

In the canonical completion basis, \(H\) is an ordinary integer permutation matrix. It preserves the completed lattice exactly.

Conjugating back to the original \(A_4\) basis produces entries in thirds. This is expected because the completion contains the color-average vector divided by three.

Consequently:

- \(H\) is an exact automorphism after the index-three extension;
- \(H\) is not an automorphism of the original root lattice generated only by integer \(b_i\);
- \(H\) cannot be identified with a microscopic coordinate permutation in \(S_5\).

The equal-area selector and the ternary completion support each other: the completion makes the exchange integral, while the exchange selects the equal-area form used to define the completion.

This is a consistency loop, not yet a derivation from more primitive dynamics.

## 4. Code and genus-two shadows

On a two-logical Pauli space, the same matrix is

\[
X_1\leftrightarrow X_2,
\qquad
Z_1\leftrightarrow Z_2.
\]

This is the unordered-puncture swap already present in the Weyl groupoid and the handle swap of the genus-two surface.

Thus three descriptions contain the same abstract exchange:

1. swap the two logical coordinates;
2. swap the two genus-two handles;
3. swap the two canonical carrier planes.

The physical labels are not automatically interchangeable. The code punctures \(\nu^c\) and \(e^c\) have different continuous charges, and the sewn Furey handles arise from distinct matter cycles. Their abstract swap need not be an exact physical symmetry.

## 5. Relation to the equal-area branch

Documents 760–762 assumed \(a=b=1\) to construct:

- the unique signed-covariant index-three completion;
- canonical \(Sp(4,\mathbb Z)\);
- the primitive \((2,3)\) lattice;
- the two-qutrit finite shadow.

The present theorem replaces the unexplained numerical equality with a precise conditional statement:

> all those results follow if the physical response admits a symplectic exchange of the two carrier handles.

This is a meaningful reduction of the problem. The missing datum is no longer “why two coefficients happen to match,” but “why two physically different relational planes are exchange-equivalent.”

## 6. Candidate physical origins

### 6.1 Furey conjugation or Hodge duality

An operator exchanging the color-difference and color-average/weak planes would select equal magnitude. Its detailed sign decides symplectic versus anti-symplectic exchange.

### 6.2 Genus-two handle symmetry

A sewn ribbon with an automorphism interchanging its handles would implement \(H\). Existing Furey matter cycles select the handles but may also distinguish them; the graph automorphism must be checked.

### 6.3 Unordered logical boundary

If the two punctures are treated as an unordered boundary pair, the Weyl groupoid supplies a swap. This is exact mod three but questionable physically because \(\nu^c\) and \(e^c\) are not equivalent under continuous Standard-Model charges.

### 6.4 Response reciprocity

An equality of spectral or stress-response Gram norms on the two planes could realize exchange dynamically even without a microscopic matter symmetry.

## 7. Stop-everything and falsification criteria

Stop treating equal areas as unexplained once handle exchange is assumed; they are then forced.

Stop treating handle exchange as an established Standard-Model symmetry; it is not an \(S_5\) permutation on the original lattice and exchanges physically distinguished ports.

Stop using the unordered code swap to claim continuous \(\nu^c\leftrightarrow e^c\) symmetry.

Reopen the unconditional arithmetic carrier only after a Furey, ribbon, code or response construction realizes \(H\) on physical observables.

## 8. Highest-value continuations

1. Compute automorphisms of the sewn Furey genus-two ribbon that exchange the two selected handles.
2. Test Furey conjugation/Hodge operators on the explicit carrier planes.
3. Compare response Gram norms of the up/neutral and down/charged crossed modules.
4. Determine whether the paired anti-symplectic reflection composed with a known duality yields \(H\).
5. Track how handle exchange acts on the 25 minimum logical supports and their mediator families.

## Reproducibility

    node verification/verify/verify_handle_exchange_selects_equal_or_opposite_oriented_color_areas.mjs

## Companion documents

- [Unique color-average completion](760_signed_color_weak_covariance_uniquely_selects_the_color_average_index_three_unimodular_overlattice_conditional_on_equal_areas.md)
- [Canonical integral carrier](761_the_color_average_completion_has_canonical_sp4z_form_and_primitive_lattice_u_plus_u_plus_minus2_with_signed_o23_action.md)
- [One-handle Weil realization](765_the_carrier_color_unipotent_is_exactly_a_one_handle_inverse_twist_fourier_word_not_a_microscopic_color_permutation_or_mutual_gate.md)
- [Weyl puncture swap boundary](764_pure_d5_weyl_puncture_motion_has_only_identity_or_swap_transport_and_cannot_realize_the_order_three_carrier_color_cycle.md)
